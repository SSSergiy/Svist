import { createSlice } from "@reduxjs/toolkit";

const initialUser = {
  user: {},
  userCards: [],
  debt: {},
  card: {
    number: "",
    date: "",
    cvv: "",
  },
  isConnectedErrorOpen: false,
  isConnectedError: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState: { ...initialUser },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserCards: (state, action) => {
      state.userCards = action.payload;
    },
    setDebt: (state, action) => {
      state.debt = action.payload;
    },
    setCard: (state, action) => {
      state.card = action.payload;
    },
    clearUserAccount: (state) => {
      return { ...initialUser };
    },
  },
});

const { actions, reducer } = paymentSlice;

export const { setUser, setUserCards, setDebt, setCard } = actions;

export default reducer;
