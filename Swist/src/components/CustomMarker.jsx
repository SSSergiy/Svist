import React, { useState } from "react";
import ScooterMarker from "./ScooterMarker";
import OutZoomMarker from "./OutZoomMarker";
import { Marker } from "react-native-maps";

const CustomMarker = ({
  item,
  onPress,
  onCalloutPress,
  onSelect,
  zoomLevel,
  selectScooter,
}) => {
  // const [tracksViewChanges,setTracksViewChanges]=useState(false)
  return (
    <Marker
      coordinate={{
        // latitude: parseFloat(item?.latitude) || 0.5,
        // longitude: parseFloat(item?.longitude) || 0.5,
        latitude: 1,
        longitude: 1,
      }}
      tracksViewChanges={false}
      tracksInfoWindowChanges={false}
      onCalloutPress={onCalloutPress}
      onSelect={onSelect}
      onPress={onPress}
      style={{ alignItems: "center", justifyContent: "center", width: 80 }}
    >
      {zoomLevel.longitudeDelta <= 0.035896338522420024 &&
      zoomLevel.latitudeDelta <= 0.057341003097498344 ? (
        <ScooterMarker
          item={item}
          selectMarker={selectScooter}
          selected={selectScooter?.scooter_id === item?.scooter_id}
        />
      ) : selectScooter?.scooter_id === item?.scooter_id ? (
        <ScooterMarker item={item} selectMarker={selectScooter} />
      ) : (
        <OutZoomMarker />
      )}
    </Marker>
  );
};

export default React.memo(CustomMarker);
