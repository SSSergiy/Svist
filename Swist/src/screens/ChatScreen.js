import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { normalize } from "../responsive/fontSize";
import { GT, GT_BOLD } from "../constants/fonts";
import BackButton from "../components/BackButton";
import ChatInput from "../../assets/chat/chatInput.svg";
import ChatButton from "../../assets/chat/chatButton.svg";
import MessageBlock from "../../assets/chat/messageBlock.svg";
import AdminMessageBlock from "../../assets/chat/adminMessageBlock.svg";
import ChatImage from "../../assets/chat/chatImage.svg";
import { useAuth } from "../provider/AuthProvider";
import { getChat, sendMessage } from "../api/chatApi";
import ScrollViewIndicator from "react-native-scroll-indicator";
import SocketIOClient from "socket.io-client";
import { BASE_URL } from "../api/apiKeys";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ExpoFastImage from "expo-fast-image";

const ChatScreen = ({ route, navigation }) => {
  let params = route?.params;
  const { i18n, authToken } = useAuth();
  const [chat, setChat] = useState({});
  const [text, setText] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [marginBottom, setMarginBottom] = useState(new Animated.Value(0));
  const [loadPage, setLoadPage] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(null);
  const [selectImg, setSelectImg] = useState(null);
  const [page, setPage] = useState(1);
  let listRef;
  let ref = useRef(null);
  const socket = SocketIOClient(`${BASE_URL}:36502?token=${authToken}`, {
    transports: ["websocket"],
  });

  useEffect(() => {
    getChat(authToken, page).then((res) => {
      setChat(res.data);
    });
  }, []);
  useEffect(() => {
    if (chat?.chat_room_name) {
      socket.on("connect", () => {
        console.log("connect", chat?.chat_room_name);
        socket.emit("subscribe", chat?.chat_room_name, (data) => {});
        socket.on(chat?.chat_room_name, (data) => {
          // Keyboard.dismiss()
          if (
            chat?.messages?.find((m) => m?.is_admin) === undefined &&
            data.data.is_admin
          )
            Keyboard.dismiss();
          setChat({ ...chat, messages: chat?.messages?.concat(data.data) });
          ref?.current?.scrollToEnd({ animated: true });
        });
      });
    }
    return () => {
      socket.emit("disconnect");
      socket.disconnect(true);
      socket.close();
    };
  }, [chat]);
  const send = () => {
    sendMessage(authToken, text).then((res) => {
      setIsSent(!isSent);
      // setChat(res.data)
      setText("");
    });
  };
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
      ref?.current?.scrollToEnd({ animated: true });
      setIsKeyboardShow(true);
      Animated.timing(marginBottom, {
        toValue: e.endCoordinates.height,
        // easing: Easing.back(),
        duration: 20,
        useNativeDriver: false,
      }).start();
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardShow(false);
      Animated.timing(marginBottom, {
        toValue: 0,
        // easing: Easing.back(),
        duration: 20,
        useNativeDriver: false,
      }).start();
      setTimeout(() => {
        ref?.current?.scrollToEnd({ animated: true });
      }, 500);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  useEffect(() => {
    if (scrollPosition === 0) {
      setLoadPage(true);
      getChat(authToken, page + 1).then((res) => {
        if (res.data?.messages?.length > 0) {
          setPage(page + 1);
          let table = {};
          let table1 = {};
          setChat({
            ...res.data,
            messages: res.data?.messages
              ?.concat(chat?.messages)
              .filter(({ id }) => (id in table ? 0 : (table[id] = 1))),
          });
          // setChat({...res.data})
        }
        setLoadPage(false);
      });
    }
  }, [scrollPosition]);

  return (
    <>
      {selectImg && <MessageImage image={selectImg} setImage={setSelectImg} />}
      <View style={styles.container}>
        <BackButton
          onPress={() => {
            if (params?.isFromReport) {
              navigation.reset({
                index: 0,
                routes: [{ name: "MainScreen" }],
              });
            } else {
              navigation.goBack();
            }
          }}
        />
        <View
          style={{
            ...styles.content,
            paddingTop: normalize(72),
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.infoTitle}>{i18n.t("tellProblem")}</Text>
          {!chat?.chat_id ? (
            <ActivityIndicator
              size={"large"}
              color={"#FE7B01"}
              style={{ flex: 1 }}
            />
          ) : chat?.messages?.length === 0 ? (
            <Text style={{ alignSelf: "center", color: "black", opacity: 0.3 }}>
              {i18n.t("noMessages")}
            </Text>
          ) : (
            <KeyboardAwareScrollView
              // keyboardShouldPersistTaps={'always'}

              resetScrollToCoords={{ x: 0, y: 0 }}
              ref={ref}
              onContentSizeChange={() =>
                scrollPosition === 0
                  ? ref?.current?.scrollToTop?.({ animated: true })
                  : ref?.current.scrollToEnd({ animated: true })
              }
              onScroll={(e) => {
                setScrollPosition(e.nativeEvent.contentOffset.y);
              }}
              style={{ paddingTop: normalize(40) }}
              showsVerticalScrollIndicator={false}
            >
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  paddingBottom: !isKeyboardShow
                    ? normalize(50)
                    : normalize(85),
                }}
              >
                {chat?.messages?.map((item, index) => {
                  return (
                    <View key={item?.id}>
                      {chat?.messages[index - 1]?.created_at_day_formated !==
                        item?.created_at_day_formated && (
                        <View style={styles.dateBlock}>
                          <Text style={styles.dateBlock__text}>
                            {item?.created_at_day_formated}
                          </Text>
                        </View>
                      )}
                      <View
                        style={{
                          alignSelf: item?.is_owner ? "flex-end" : "flex-start",
                          marginTop: normalize(8),
                        }}
                      >
                        {!chat?.messages[index - 1]?.is_owner &&
                          item?.is_owner && <ChatImg />}
                        {!chat?.messages[index - 1]?.is_admin &&
                          item?.is_admin && <ChatImg admin />}
                        <View
                          style={
                            item?.is_admin
                              ? item?.text?.length > 5
                                ? {
                                    ...styles.messageBigContainer,
                                    borderWidth: 1,
                                    borderColor: "#DEDEDE",
                                  }
                                : {
                                    ...styles.messageOwnerContainer,
                                    borderWidth: 0,
                                    borderColor: "#DEDEDE",
                                  }
                              : item?.text?.length > 5 || item?.image
                              ? {
                                  ...styles.messageBigContainer,
                                  backgroundColor: "#FE7B01",
                                  // borderRadius: 5,
                                  // padding: 5
                                }
                              : {
                                  ...styles.messageOwnerContainer,
                                  backgroundColor: "white",
                                }
                          }
                        >
                          {item?.text?.length <= 5 &&
                            !item?.image &&
                            item?.is_owner && (
                              <MessageBlock
                                style={{ position: "absolute" }}
                                width={normalize(82)}
                              />
                            )}
                          {item?.text?.length <= 5 &&
                            !item?.image &&
                            item?.is_admin && (
                              <AdminMessageBlock
                                style={{ position: "absolute" }}
                                width={normalize(82)}
                              />
                            )}
                          {item?.image && (
                            <Pressable onPress={() => setSelectImg(item)}>
                              <ExpoFastImage
                                uri={item?.image} // image address
                                cacheKey={item.id} // could be a unque id
                                style={{
                                  width: normalize(100),
                                  height: normalize(100),
                                  borderTopLeftRadius: 5,
                                  borderTopRightRadius: 5,
                                }} // your custom style object
                                // any supported props by Image
                              />
                              {/*<Image source={{uri: item?.image}}*/}
                              {/*       style={{width: normalize(100), height: normalize(100),*/}
                              {/*         borderTopLeftRadius: 5, borderTopRightRadius: 5}}/>*/}
                            </Pressable>
                          )}
                          <Text
                            style={{
                              color: item?.is_admin ? "black" : "white",
                              ...styles.messageText,
                            }}
                          >
                            {item?.text}
                          </Text>
                        </View>
                        {((chat?.messages[index - 1]
                          ?.created_at_day_formated !==
                          item?.created_at_day_formated &&
                          chat?.messages[index - 1]
                            ?.created_at_time_formated !==
                            item?.created_at_time_formated) ||
                          chat?.messages[index - 1]
                            ?.created_at_time_formated !==
                            item?.created_at_time_formated) && (
                          <Text style={styles.timeMessage}>
                            {item?.created_at_time_formated}
                          </Text>
                        )}
                      </View>
                    </View>
                  );
                })}
              </TouchableOpacity>
            </KeyboardAwareScrollView>
          )}
          <Animated.View
            style={[
              styles.chatBottom,
              Platform.OS === "ios" &&
                isKeyboardShow && {
                  position: "absolute",
                  bottom: marginBottom,
                  left: 24,
                  backgroundColor: "white",
                },
            ]}
          >
            <View style={styles.input}>
              <ChatInput
                width={normalize(260)}
                height={normalize(56)}
                style={{ position: "absolute" }}
              />
              <TextInput
                style={{ width: "100%", height: "100%" }}
                placeholder={`${i18n.t("type")}...`}
                value={text}
                onChangeText={(e) => setText(e)}
                onFocus={() => {
                  console.log("focus");
                  ref?.current?.scrollToEnd?.({ animated: true });
                }}
              />
            </View>
            <TouchableOpacity onPress={send}>
              <ChatButton width={normalize(72)} height={normalize(56)} />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </>
  );
};
const ChatImg = ({ admin, image }) => {
  return (
    <View
      style={{
        ...styles.chatImg,
        alignSelf: admin ? "flex-start" : "flex-end",
      }}
    >
      <ChatImage width={"100%"} height={"100%"} />
    </View>
  );
};
const MessageImage = ({ image, setImage }) => {
  return (
    <Pressable style={styles.imageModal} onPress={() => setImage("")}>
      <ExpoFastImage
        uri={image?.image} // image address
        cacheKey={image.id} // could be a unque id
        style={{ width: "100%", height: "100%" }}
        resizeMode="contain"
        // any supported props by Image
      />
    </Pressable>
  );
};
export const styles = StyleSheet.create({
  imageModal: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.48)",
    padding: normalize(20),
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    height: Dimensions.get("window").height,
    paddingTop: normalize(48),
  },
  infoTitle: {
    color: "#1F1E1D",
    fontSize: normalize(24),
    fontFamily: GT_BOLD,
    marginBottom: 10,
  },
  content: {
    padding: normalize(24),
    paddingTop: normalize(48),
    flex: 1,
    height: Dimensions.get("window").height,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  chatImg: {
    backgroundColor: "white",
    width: normalize(41),
    height: normalize(41),
    borderRadius: 100,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    padding: normalize(3.5),
    zIndex: 2,
    elevation: 2,
    bottom: normalize(-5),
    right: 0,
  },
  messageOwnerContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "white",
    minWidth: normalize(82),
    minHeight: normalize(48),
    paddingTop: normalize(12),
    paddingBottom: normalize(12),
    paddingLeft: normalize(24),
    paddingRight: normalize(24),
  },
  messageText: {
    fontSize: normalize(16),
    fontFamily: GT,
  },
  timeMessage: {
    fontSize: normalize(12),
    fontFamily: GT,
    color: "#BDBDBD",
    alignSelf: "flex-end",
  },
  chatBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 5,
  },
  input: {
    alignItems: "center",
    justifyContent: "center",
    width: normalize(260),
    height: normalize(56),
    paddingRight: normalize(16),
    paddingLeft: normalize(20),
  },
  dateBlock: {
    alignSelf: "center",
    backgroundColor: "#FE7B01",
    paddingTop: normalize(5),
    paddingBottom: normalize(5),
    paddingRight: normalize(10),
    paddingLeft: normalize(10),
    borderRadius: 10,
    marginTop: normalize(10),
  },
  dateBlock__text: {
    textAlign: "center",
    color: "white",
    fontSize: normalize(16),
    fontFamily: GT,
  },
  messageBigContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "white",
    minWidth: normalize(82),
    minHeight: normalize(48),
    paddingTop: normalize(12),
    paddingBottom: normalize(12),
    paddingLeft: normalize(24),
    paddingRight: normalize(24),
  },
});
export default ChatScreen;
