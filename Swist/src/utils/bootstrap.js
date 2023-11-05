import * as Font from "expo-font";

export async function bootstrap() {
  await Font.loadAsync({
    'GT': require('../../assets/fonts/GT-Eesti-Text-Medium-Italic.ttf'),
    anticon: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/AntDesign.ttf"),
    'GTB': require('../../assets/fonts/GTEestiProText-BoldItalic.ttf'),
    'AR': require('../../assets/fonts/Averta-Regular.ttf'),
  });
}
