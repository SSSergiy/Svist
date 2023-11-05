import React from "react";
import { Marker } from "react-native-maps";
import ScooterMarker from "./ScooterMarker";
import OutlineMarker from "./OutlineMarker";
import OutZoomMarker from "./OutZoomMarker";
import { Platform } from "react-native";

const Markers = ({
  scooters,
  zoomLevel,
  setShowInfo,
  setSelectScooter,
  selectScooter,
  reservation,
  isConnectedErrorOpen,
  tracksViewChanges,
  mapRef,
}) => {
  const scooterView = (val, zoomLevel) => {
    if (zoomLevel >= 15 && selectScooter?.scooter_name === val?.scooter_name) {
      return (
        <>
          <ScooterMarker item={val} selectMarker={selectScooter} />
          <OutlineMarker item={val} selectMarker={selectScooter} />
        </>
      );
    } else if (
      zoomLevel >= 15 &&
      selectScooter?.scooter_name !== val?.scooter_name
    ) {
      return <OutlineMarker item={val} selectMarker={selectScooter} />;
    }
    if (zoomLevel < 15 && selectScooter?.scooter_name === val?.scooter_name) {
      return (
        <>
          <ScooterMarker item={val} selectMarker={selectScooter} />
          <OutlineMarker item={val} selectMarker={selectScooter} />
        </>
      );
    } else {
      return <OutZoomMarker />;
    }
  };
  return scooters?.map((item, index) => {
    return (
      zoomLevel > 11 &&
      !!item?.battery_power &&
      !!item?.scooter_id && (
        <Marker
          coordinate={{
            latitude: parseFloat(item?.latitude) || 0,
            longitude: parseFloat(item?.longitude) || 0,
          }}
          stopPropagation
          key={`id_${item?.scooter_id}_${index}`}
          zIndex={
            selectScooter?.scooter_name === item?.scooter_name ||
            selectScooter?.name_scooter === item?.scooter_name
              ? 99999
              : index++
          }
          tracksViewChanges={
            Platform.OS === "android" ? tracksViewChanges : null
          }
          tracksInfoWindowChanges={Platform.OS !== "android"}
          onPress={(e) => {
            e.stopPropagation();
            // console.log('Marker item:::: ', item?.scooter_id);
            if (!reservation && !isConnectedErrorOpen) {
              setSelectScooter(item);
              // setReserveName(item?.scooter_name)
              setShowInfo(true);
              mapRef?.current.animateCamera(
                {
                  center: {
                    latitude: item?.latitude,
                    longitude: item?.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  },
                },
                { duration: 1000 }
              );
            }
          }}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          {scooterView(item, zoomLevel)}
        </Marker>
      )
    );
  });
};

export default React.memo(Markers);
