import React from "react";
import { normalize } from "../responsive/fontSize";
import DrawerMenu from "../../assets/drawerMenu.svg";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MenuIcon from "../../assets/menuIcon.svg";
const DrawerMenuButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      style={{
        zIndex: 100,
        position: "absolute",
        top: normalize(50),
        left: 0,
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        flexDirection: "row",
      }}
    >
      <DrawerMenu width={normalize(76)} height={normalize(48)} />
      <MenuIcon style={{ position: "absolute" }} />

      {/*<Entypo name={"menu"} style={{ fontSize: normalize(24),position:'absolute' }} />*/}
    </TouchableOpacity>
  );
};

export default DrawerMenuButton;
