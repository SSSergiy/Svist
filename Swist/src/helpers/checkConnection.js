import NetInfo from "@react-native-community/netinfo";
import {
  setIsConnectedErrorOpen,
  setIsConnectedError,
} from "../redux/rideReducer";

const checkConnection = (dispatch) => {
  NetInfo.refresh().then((state) => {
    if (state.isConnected) {
      dispatch(setIsConnectedErrorOpen(false));
      dispatch(setIsConnectedError(false));
    } else {
      dispatch(setIsConnectedErrorOpen(true));
      dispatch(setIsConnectedError(true));
    }
  });
};
export default checkConnection;
