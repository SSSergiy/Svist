import { animated, useTransition } from "@react-spring/native"
import React, { useRef, useState } from "react"
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native"
import Card1 from "../../../assets/payment/card1.svg"
import Card1Sk from "../../../assets/payment/card1Sk.svg"
import Card1Ukr from "../../../assets/payment/card1Ukr.svg"
import Card3 from "../../../assets/payment/card3.svg"
import Card3Sk from "../../../assets/payment/card3Sk.svg"
import Card3Ukr from "../../../assets/payment/card3Ukr.svg"
import { GT } from "../../constants/fonts"
import { useAuth } from "../../provider/AuthProvider"
import { normalize } from "../../responsive/fontSize"
import SwapCardLabel from "./SwapCardLabel"

const AnimatedView = animated(Pressable)
const CardsList = ({
  rows,
  setHideButtons,
  closeUserCards,
  select,
  setSelect,
  setSelectCard,
  selectCard,
  shuffle,
  setRows,
  setDeleteCardOpen,
  setOpenBalanceErrorModal,
  setChangeMainCard,
}) => {
  const DOUBLE_PRESS_DELAY = 300
  const { locale, authToken } = useAuth()
  const [lastPress, setLastPress] = useState(0)

  let ref = useRef(null)
  const getCardImg = (index, item) => {
    if (item?.id === select?.id) {
      if (locale === "sk") {
        return <Card1Sk />
      } else if (locale === "ukr") {
        return <Card1Ukr />
      } else return <Card1 />
    } else {
      if (locale === "sk") {
        return <Card3Sk width={normalize(342)} />
      } else if (locale === "ukr") {
        return <Card3Ukr width={normalize(342)} />
      } else return <Card3 width={normalize(342)} />
    }
  }
  const transitions = useTransition(
    rows?.map((data, i) => ({ ...data, y: i * normalize(100) })),
    {
      key: (item) => item.id,
      // from: { height: 0},
      // leave: { height: 0},
      enter: ({ y, height }) => ({ y, height }),
      update: ({ y, height }) => ({ y, height }),
      config: { duration: 200 },
      onChange: () => {
        let timeout = setTimeout(() => {
          closeUserCards()
          setHideButtons(false)
        }, 600)
        return () => clearTimeout(timeout)
      },

      delay: 0,
    }
  )

  // DOUBLE CLICK & HIDE ON FIRST ELEMENT
  const handleDoublePress = (item, index, ref) => {
    setSelect(item)
    const time = new Date().getTime()
    const delta = time - lastPress
    if (delta < DOUBLE_PRESS_DELAY) {
      ref?.current?.scrollTo({ x: 0, y: 0, animated: true })
      setRows(shuffle(index, item))
      setSelectCard(item)
      setChangeMainCard(true)
    }
    setLastPress(time)
  }
  const handleHideList = (item, index, ref) => {
    if (index === 0) {
      ref?.current?.scrollTo({ x: 0, y: 0, animated: true })
      setRows(shuffle(index, item))
    }
  }
  const handleCardChange = (index, item, ref) => {
    setSelectCard(item)
    ref?.current?.scrollTo({ x: 0, y: 0, animated: true })
    setRows(shuffle(index, item))
    setChangeMainCard(true)
  }

  return (
    <ScrollView
      ref={ref}
      style={{ width: "100%", height: "100%" }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ ...styles.cardsContainer, paddingBottom: normalize(100) }}>
        {transitions((style, item, _, index) => (
          <AnimatedView
            style={{
              zIndex: item?.id === select?.id ? 1000 : rows.length - index,
              top: -(index * normalize(95)),
              // height: style.height,
              alignItems: "center",
              // backgroundColor:'yellow',
              transform: [{ translateY: style.y }],
              width: normalize(342),
              // marginTop:20
            }}
            key={item.id}
            onPress={() => {
              handleDoublePress(item, index, ref)
              handleHideList(item, index, ref)
            }}
          >
            {item?.id === select?.id && (
              <SwapCardLabel
                open={true}
                changeCard={() => {
                  handleCardChange(index, item, ref)
                }}
                setDeleteCardOpen={setDeleteCardOpen}
                setOpenBalanceErrorModal={setOpenBalanceErrorModal}
              />
            )}
            {getCardImg(index, item)}
            <Text style={styles.cardPanText}>
              {item?.card_pan?.substr(item?.card_pan?.length - 4)}
            </Text>
          </AnimatedView>
        ))}
      </View>
      {/*<Text style={{...styles.switchClickText,marginTop:rows?.length>4?(normalize(rows?.length*195/2.7)*(-1)):(normalize((rows?.length-1)*195/2.7)*(-1))}}>{i18n.t('clickToSelectCard')}</Text>*/}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  cardsContainer: {
    width: "100%",
    marginTop: normalize(32),
    alignItems: "center",
  },

  switchClickText: {
    fontSize: normalize(16),
    fontFamily: GT,
    color: "#FE7B01",
    textAlign: "center",
    // position:'absolute',
    // bottom:'5%'
  },
  cardPanText: {
    position: "absolute",
    zIndex: 1,
    color: "white",
    top: "51%",
    right: "25%",
    letterSpacing: 1,
    fontFamily: GT,
  },
})
export default CardsList
