import AsyncStorage from "@react-native-async-storage/async-storage";
import {getCards} from "../api/authApi";
import {setUserCards} from "../redux/paymentReducer";

const getUserCards=(dispatch)=>{
    AsyncStorage.getItem('auth').then(res => {
        const token = res;
        getCards(token).then((res) => {
            const array=res?.data?.data.sort((a, b) => a.is_main < b.is_main ? 1 : -1)
            dispatch(setUserCards(array))
        })
        console.log('Token retrieved successfully', token);
    }).catch(e => {
        console.error('Error retrieving token', e);
    });
}
export default getUserCards