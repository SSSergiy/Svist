import React, {useCallback, useEffect, useState, BackHandler} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import {normalize} from "../../responsive/fontSize";
import BackButton from "../../../assets/payment/backButton.svg";
import {getCategoryProblems, sendMessage} from "../../api/problemApi";
import {useAuth} from "../../provider/AuthProvider";
import ReserveButton from "../../../assets/reserveButton.svg";
import AddNewCardFilledButton from "../../../assets/payment/addNewCardFilledButton.svg";
import { StackActions} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {setSelectScooter} from "../../redux/rideReducer"

const Problems = ({navigation, route}) => {
  let params = route?.params
  const {authToken, i18n} = useAuth()
    const dispatch = useDispatch()
  const [problems, setProblems] = useState([])
  const [selectedProblems, setSelectedProblems] = useState([])
  const [isSent, setIsSent] = useState(false)
  const sendMessages = useCallback(async (selectedProblems) => {
    for (let problem of selectedProblems) {
      sendMessage(authToken, {text: problem})
        .then(data => console.log(data))
        .catch((error) => console.log(error))
    }
      dispatch(setSelectScooter({}))
    navigation.dispatch(StackActions.popToTop())
    navigation.dispatch(StackActions.push('ChatScreen'))
    // navigation.reset({
    //   index: 0,
    //   routes: [{name: 'MainScreen'}, {name: 'ChatScreen'}],
    // })
  }, [])

  useEffect(() => {
    if (params?.category) {
      getCategoryProblems(authToken, params?.category?.alias)
        .then((data) => setProblems(data))
    }
  }, [params])

  function handleBackButtonClick() {

    navigation.goBack()
    return true;
  }
  // useEffect(() => {

  //   BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

  //   return () => {

  //     BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
  //   }
  // }, [])
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{position: 'absolute', left: 0, top: normalize(48)}}
                        onPress={() => navigation.goBack()}>
        <BackButton/>
      </TouchableOpacity>
      <View style={styles.mainBlock}>
        <Text style={styles.mainBlock__title}>{params?.category?.title}</Text>
        <Text style={styles.mainBlock__description}>{params?.category?.description}</Text>
        <ScrollView style={styles.mainBlock__problems}>
          {problems.map((problem, index) => (
            <TouchableOpacity key={index}
                              style={styles.mainBlock__problem}
                              onPress={() => {
                                if (selectedProblems.indexOf(problem.title) !== -1) {
                                  setSelectedProblems([...selectedProblems].filter(p => p !== problem.title))
                                } else {
                                  setSelectedProblems([...selectedProblems, problem.title])
                                }
                              }}>
              {selectedProblems.indexOf(problem.title) !== -1 ?
                <AddNewCardFilledButton width={'100%'} height={normalize(56)}/> :
                <ReserveButton width={'100%'} height={normalize(56)}/>}
              <Text
                style={[styles.mainBlock__problemText, selectedProblems.indexOf(problem.title) !== -1 && {color: 'white'}]}>
                {problem.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.mainButton}
                        disabled={selectedProblems.length === 0 || isSent}
                        onPress={() => {
                          setIsSent(true)
                          sendMessages(selectedProblems)
                        }}>
        {selectedProblems.length > 0 ? <AddNewCardFilledButton width={'100%'} height={normalize(56)}/> :
          <ReserveButton width={'100%'} height={normalize(56)}/>}
        <Text style={[styles.buttonText, selectedProblems.length > 0 && {color: 'white'}]}>{i18n.t('send')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Problems;
