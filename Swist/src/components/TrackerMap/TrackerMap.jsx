import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from "react-native-maps";
import TrackingMarker from "../TrackingMarker/TrackingMarker";
import { Platform, StyleSheet } from "react-native";
import { normalize } from "../../responsive/fontSize";
import { GT } from "../../constants/fonts";
import LoadingModal from "../LoadingModal";
import MapPolygon from "../MapPolygon";
import hexToRgba from "hex-to-rgba";
import { defaultLocation } from "../../constants/locations";
import { useSelector } from "react-redux";
import { setViewCoordinates } from "../../redux/rideReducer";
import { useDispatch } from "react-redux";

const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = 0.05;

const TrackerMap = ({
  startPosition,
  rideArea,
  startRide,
  mapRef,
  locationFocused,
}) => {
  const markerRef = useRef();
  const [key, setKey] = useState(2);
  const [zoomLevel, setZoomLevel] = useState(13);
  const dispatch = useDispatch();

  const { selectScooter } = useSelector((state) => state.ride);

  useEffect(() => {
    if (zoomLevel <= 11 && key !== 1) {
      setKey(1);
    }
    if (11 < zoomLevel && zoomLevel <= 14 && key !== 2) {
      setKey(2);
    }
    if (14 < zoomLevel && zoomLevel < 17 && key !== 3) {
      setKey(3);
    }
    if (17 < zoomLevel && key !== 4) {
      setKey(4);
    }
  }, [zoomLevel]);

  useEffect(() => {
    animate(
      parseFloat(selectScooter?.latitude),
      parseFloat(selectScooter?.longitude)
    );
  }, [
    selectScooter?.id,
    selectScooter?.latitude,
    selectScooter?.longitude,
    locationFocused,
  ]);

  useEffect(() => {
    if (selectScooter?.latitude) {
      animate(
        parseFloat(selectScooter?.latitude),
        parseFloat(selectScooter?.longitude)
      );
    }
  }, []);

  const animate = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };
    startPosition
      .timing({
        ...newCoordinate,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      })
      .start();
    setTimeout(() => {
      mapRef?.current?.animateToRegion(
        {
          ...newCoordinate,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        700
      );
    }, 700);
  };

  return (
    <>
      {selectScooter?.latitude && (
        <MapView
          ref={mapRef}
          style={styles.map}
          minZoomLevel={6} // default => 0
          maxZoomLevel={20} // default => 20
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude:
              parseFloat(selectScooter?.latitude) || defaultLocation.latitude,
            longitude:
              parseFloat(selectScooter?.longitude) || defaultLocation.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          onRegionChangeComplete={(region) => {
            dispatch(setViewCoordinates(region));
            const zoom = Math.round(
              Math.log(360 / (region?.longitudeDelta || LATITUDE_DELTA)) /
                Math.LN2
            );
            setZoomLevel(zoom);
          }}
        >
          <Marker.Animated
            ref={markerRef}
            coordinate={startPosition}
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 80,
            }}
          >
            <TrackingMarker
              rideArea={rideArea}
              startRide={startRide}
              selectScooter={selectScooter}
            />
          </Marker.Animated>
          <MapPolygon poligonKey={key} />
        </MapView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reserveBlock: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: normalize(25),
    width: "100%",
    marginTop: normalize(15),
  },
  reserveTitle: {
    fontFamily: GT,
    fontSize: normalize(24),
    fontWeight: "500",
  },
  buttonText: {
    fontSize: normalize(24),
    color: "#FE7B01",
    fontFamily: GT,
    position: "absolute",
  },
});
export default TrackerMap;
