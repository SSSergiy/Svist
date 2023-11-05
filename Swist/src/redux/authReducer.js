import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  isNewUser: false,
  name: "",
  surname: "",
  email: "",
  phone: "",
  countryCode: "+421",
  age: "",
  isSent: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState: { ...defaultState },
  reducers: {
    setIsNewUser(state, action) {
      state.isNewUser = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setSurname(state, action) {
      state.surname = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPhone(state, action) {
      state.phone = action.payload;
    },
    setCountryCode(state, action) {
      state.countryCode = action.payload;
    },
    setAge(state, action) {
      state.age = action.payload;
    },
    setIsSent(state, action) {
      state.isSent = action.payload;
    },
    setExit() {
      return { ...defaultState };
    },
  },
});

const { actions, reducer } = authSlice;

export const {
  setIsNewUser,
  setName,
  setSurname,
  setEmail,
  setPhone,
  setCountryCode,
  setAge,
  setIsSent,
  setExit,
} = actions;

export default reducer;
