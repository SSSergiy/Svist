import { createSlice } from "@reduxjs/toolkit";
import { defaultLocation } from "../constants/locations";

const rideSlice = createSlice({
  name: "ride",
  initialState: {
    selectScooter: {},
    rideArea: "none",
    rideTime: 0,
    pauseTime: 0,
    startRide: false,
    endRide: false,
    pauseRide: false,
    rideChange: false,
    isConnectedErrorOpen: false,
    isConnectedError: false,
    dangerZoneOpen: false,
    redZoneOpen: false,
    picture: {},
    claimFreeRide: false,
    reservation: false,
    isFirstRide: false,
    coordinates: null,
    isShowedLocationError: false,
    scooters: [],
    // polygons: [],
    showLocation: false,
    showMarkers: false,
    endRideDate: "",
    freeMinutes: 0,
    mapPermission: false,
    seconds: 0,
    costSettings: {},
    secondsReserve: 0,
    viewCoordinates: null,
  },
  reducers: {
    setSelectScooter(state, action) {
      state.selectScooter = action.payload;
    },
    setClaimFreeRide(state, action) {
      state.claimFreeRide = action.payload;
    },
    setIsFirstRide(state, action) {
      state.isFirstRide = action.payload;
    },
    setIsConnectedError(state, action) {
      state.isConnectedErrorOpen = action.payload;
    },
    setIsConnectedErrorOpen(state, action) {
      state.isConnectedErrorOpen = action.payload;
    },
    setReservation(state, action) {
      state.reservation = action.payload;
    },
    setCoordinates(state, action) {
      state.coordinates = action.payload;
    },
    setShowLocation(state, action) {
      state.showLocation = action.payload;
    },
    setMapPermission(state, action) {
      state.mapPermission = action.payload;
    },
    setPicture(state, action) {
      state.picture = action.payload;
    },
    setFreeMinutes(state, action) {
      state.freeMinutes = action.payload;
    },
    setRideArea(state, action) {
      state.rideArea = action.payload;
    },
    setRideTime(state, action) {
      state.rideTime = action.payload;
    },
    setStartRide(state, action) {
      state.startRide = action.payload;
    },
    setPauseRide(state, action) {
      state.pauseRide = action.payload;
    },
    setEndRide(state, action) {
      state.endRide = action.payload;
    },
    setDangerZoneOpen(state, action) {
      state.dangerZoneOpen = action.payload;
    },
    setRedZoneOpen(state, action) {
      state.redZoneOpen = action.payload;
    },
    setEndRideDate(state, action) {
      state.endRideDate = action.payload;
    },
    setPauseTime(state, action) {
      state.pauseTime = action.payload;
    },
    setRideChange(state, action) {
      state.rideChange = action.payload;
    },
    setIsShowedLocationError(state, action) {
      state.isShowedLocationError = action.payload;
    },
    setSeconds(state, action) {
      state.seconds = action.payload;
    },
    setSecondsReserve(state, action) {
      state.secondsReserve = action.payload;
    },
    setCostSettings(state, action) {
      state.costSettings = action.payload;
    },
    setViewCoordinates(state, action) {
      state.viewCoordinates = action.payload;
    },
  },
});

const { actions, reducer } = rideSlice;
export const {
  setSelectScooter,
  setClaimFreeRide,
  setIsFirstRide,
  setIsConnectedErrorOpen,
  setReservation,
  setCoordinates,
  // setScooters,
  // setPolygons,
  setShowLocation,
  setIsConnectedError,
  setMapPermission,
  setPicture,
  setFreeMinutes,
  setRideArea,
  setRideTime,
  setStartRide,
  setPauseRide,
  setEndRide,
  setDangerZoneOpen,
  setRedZoneOpen,
  setEndRideDate,
  setPauseTime,
  setRideChange,
  setIsShowedLocationError,
  setSeconds,
  setCostSettings,
  setSecondsReserve,
  setViewCoordinates,
} = actions;
export default reducer;
