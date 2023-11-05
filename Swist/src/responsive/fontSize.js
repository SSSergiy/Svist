import {Dimensions, PixelRatio, Platform} from "react-native";


const heightMobileUI = 876;
const widthMobileUI = 414;
export const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('screen');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
    // const newSize = size * scale
    if (Platform.OS === 'ios') {
        return PixelRatio.roundToNearestPixel(size*(Dimensions.get('screen').width/widthMobileUI))
        // return Math.round(PixelRatio.roundToNearestPixel(newSize))-2
    } else {
        return PixelRatio.roundToNearestPixel(size*(Dimensions.get('screen').width/widthMobileUI)-2)
        // return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2.5
    }
    // const pixelRatio = PixelRatio.get();
    // const deviceHeight = Dimensions.get('window').height;
    // const deviceWidth = Dimensions.get('window').width;
    // if (pixelRatio >= 2 && pixelRatio < 3) {
    //     // iphone 5s and older Androids
    //     if (deviceWidth < 360) {
    //         return size * 0.95;
    //     }
    //     // iphone 5
    //     if (deviceHeight < 667) {
    //         return size;
    //         // iphone 6-6s
    //     } if (deviceHeight >= 667 && deviceHeight <= 735) {
    //         return size * 1.15;
    //     }
    //     // older phablets
    //     return size * 1.25;
    // } if (pixelRatio >= 3 && pixelRatio < 3.5) {
    //     // catch Android font scaling on small machines
    //     // where pixel ratio / font scale ratio => 3:3
    //     if (deviceWidth <= 360) {
    //         return size;
    //     }
    //     // Catch other weird android width sizings
    //     if (deviceHeight < 667) {
    //         return size * 1.15;
    //         // catch in-between size Androids and scale font up
    //         // a tad but not too much
    //     }
    //     if (deviceHeight >= 667 && deviceHeight <= 735) {
    //         return size * 1.2;
    //     }
    //     // catch larger devices
    //     // ie iphone 6s plus / 7 plus / mi note 等等
    //     return size * 1.27;
    // } if (pixelRatio >= 3.5) {
    //     // catch Android font scaling on small machines
    //     // where pixel ratio / font scale ratio => 3:3
    //     if (deviceWidth <= 360) {
    //         return size;
    //         // Catch other smaller android height sizings
    //     }
    //     if (deviceHeight < 667) {
    //         return size * 1.2;
    //         // catch in-between size Androids and scale font up
    //         // a tad but not too much
    //     }
    //     if (deviceHeight >= 667 && deviceHeight <= 735) {
    //         return size * 1.25;
    //     }
    //     // catch larger phablet devices
    //     return size * 1.4;
    // } return size;
    // const scale = (SCREEN_WIDTH / SCREEN_HEIGHT) * 2;
    //
    // const newSize = size * scale;
    //
    // return Math.round(PixelRatio.roundToNearestPixel(newSize));

    // return RFValue(size,SCREEN_HEIGHT)
}
export const responsiveWidth = width => {
    // const sizePerc=(width/widthMobileUI)*100
    // const sizeForDev=(sizePerc*Dimensions.get('screen').width)/100
    // return PixelRatio.roundToNearestPixel(sizeForDev)
    return (Dimensions.get('window').width * width) / widthMobileUI;
};

export const responsiveHeight = height => {
    // const sizePerc=(height/heightMobileUI)*100
    // const sizeForDev=(sizePerc*Dimensions.get('screen').height)/100
    // return PixelRatio.roundToNearestPixel(sizeForDev)
    return (Dimensions.get('window').height * height) / heightMobileUI;
};
