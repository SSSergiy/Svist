import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet } from "react-native";
import { useDrawerStatus } from "@react-navigation/drawer";
import { BlurView } from "@react-native-community/blur";
import { setViewCoordinates } from "../redux/rideReducer";
import { useDispatch } from "react-redux";

const MainMap = ({
  onMapPress,
  children,
  reservation,
  mapRef,
  region,
  setMapBounds,
  setZoomLevel,
  ...props
}) => {
  const dispatch = useDispatch();
  if (
    mapRef?.current?.__lastRegion?.latitudeDelta > 20 ||
    mapRef?.current?.__lastRegion?.longitudeDelta > 20
  ) {
    mapRef?.current?.animateToRegion(
      {
        ...region,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      1000
    );
  }
  const isOpen = useDrawerStatus() === "open";
  return (
    <>
      {isOpen && (
        <BlurView style={styles.overlay} blurType="light" blurAmount={32} />
      )}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        trackViewChanges={false}
        showsTraffic={false}
        showsMyLocationButton={false}
        showsIndoors={false}
        showsIndoorsPicker={false}
        rotateEnabled={false}
        showsScale={false}
        showsBuildings={false}
        minZoomLevel={6} // default => 0
        maxZoomLevel={20} // default => 20
        onPress={(e) => {
          e.stopPropagation();
          onMapPress();
        }}
        initialRegion={region}
        ref={mapRef}
        onRegionChangeComplete={(region) => {
          if (!!region?.longitudeDelta) {
            dispatch(setViewCoordinates(region));
            const zoom = Math.round(
              Math.log(360 / region?.longitudeDelta) / Math.LN2
            );
            setZoomLevel(zoom);
          }
        }}
        onMapReady={() => {
          mapRef?.current?.animateToRegion(
            {
              ...region,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            },
            1000
          );
        }}
        {...props}
      >
        {children}
      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    opacity: 1,
    bottom: 0,
    zIndex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
});

export default React.memo(MainMap);
