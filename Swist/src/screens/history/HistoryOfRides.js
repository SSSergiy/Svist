import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { normalize } from "../../responsive/fontSize";
import BackButton from "../../components/BackButton";
import { useAuth } from "../../provider/AuthProvider";
import { GT_BOLD } from "../../constants/fonts";
import { getRideHistory } from "../../api/historyApi";
import { styles } from "./styles";
import PromocodeItem from "../promocode/PromocodeItem";
import RideHistoryItem from "./RideHistoryItem";
import { getChat } from "../../api/chatApi";
const HistoryOfRides = () => {
  const { i18n, authToken } = useAuth();
  const [rides, setRides] = useState([]);
  const [page, setPage] = useState(1);
  const [scrollPosition, setScrollPosition] = useState(null);
  const [loadPage, setLoadPage] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setPage(1);
    setLoading(true);
    getRideHistory(authToken).then((res) => {
      setRides(res?.history_list);
    });
    setLoading(false);
  }, []);
  useEffect(() => {
    if (page > 0) {
      setLoadPage(true);
      getRideHistory(authToken, page).then((res) => {
        if (res?.history_list?.length > 0) {
          let table = {};
          let table1 = {};
          setRides(
            rides
              .concat(res?.history_list)
              .filter(({ id }) => (id in table ? 0 : (table[id] = 1)))
          );
        }
        setLoadPage(false);
      });
    }
  }, [page]);
  // useEffect(()=>{
  //   console.log(rides.length)
  // },[rides])
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  return (
    <View style={styles.container}>
      <BackButton black />
      <View style={styles.content}>
        <Text style={styles.title}>{i18n.t("historyOfRides")}</Text>
        {loading ? (
          <ActivityIndicator
            size={"large"}
            color={"#FE7B01"}
            style={{ flex: 1 }}
          />
        ) : rides?.length === 0 ? (
          <Text style={styles.noData}>{i18n.t("historyNotFound")}</Text>
        ) : (
          <FlatList
            data={rides}
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent)) {
                setPage(page + 1);
              }
            }}
            scrollEventThrottle={400}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <RideHistoryItem item={item} />}
            keyExtractor={(item) => item?.id}
            ListFooterComponent={
              loadPage ? (
                <ActivityIndicator
                  size={"large"}
                  color={"#FE7B01"}
                  style={{ flex: 1 }}
                />
              ) : (
                <></>
              )
            }
          />
        )}
      </View>
    </View>
  );
};

export default HistoryOfRides;
