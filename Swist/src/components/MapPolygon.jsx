import React, { useEffect, useState } from "react";
import { Marker, Polygon } from "react-native-maps";
import parkingIcon from "../../assets/parkingIcon13.png";
import hexToRgba from "hex-to-rgba";
import { getPolygons } from "../api/scooterApi";
import { useAuth } from "../provider/AuthProvider";
import {
  parseBlack,
  parseMedium,
  parseOrange,
  parseParking,
  setHoles,
} from "../../polygons/parser";
import { useSelector } from "react-redux";
import MapPolygonMemoised from "./MapPolygonMemoised";

const MapPolygon = ({ poligonKey }) => {
  const { viewCoordinates } = useSelector((state) => state.ride);
  const [polygons, setPolygons] = useState([]);
  const { authToken } = useAuth();

  function coordinate(coordinates) {
    let x = coordinates.map((c) => c.latitude);
    let y = coordinates.map((c) => c.longitude);

    let minX = Math.min.apply(null, x);
    let maxX = Math.max.apply(null, x);

    let minY = Math.min.apply(null, y);
    let maxY = Math.max.apply(null, y);
    return {
      latitude: (minX + maxX) / 2,
      longitude: (minY + maxY) / 2,
    };
  }

  useEffect(() => {
    !!viewCoordinates &&
      getPolygons(authToken, viewCoordinates)
        .then((res) => setPolygons(res))
        .catch((err) => console.error(err));
  }, [viewCoordinates]);

  return (
    <>
      <Polygon
        coordinates={[
          { latitude: 40.8417, longitude: -7.1269 },
          { latitude: 51.5074, longitude: -0.1278 },
          { latitude: 51.5074, longitude: 0.963 },
          { latitude: 55.7558, longitude: 37.6173 },
          { latitude: 40.7558, longitude: 37.6173 },
        ]}
        holes={!!polygons && setHoles(polygons)}
        fillColor={hexToRgba("#ffffff", 0.1)}
        strokeColor={"transparent"}
      />
      {poligonKey === 1 &&
        !!parseOrange(polygons)?.length &&
        parseOrange(polygons)?.map((item) => (
          <Polygon
            key={item.id}
            coordinates={item?.polygon}
            strokeColor={hexToRgba("#FE7B01", 1)}
            strokeWidth={2}
            fillColor={hexToRgba("#ffffff", 0.0)}
          />
        ))}
      {poligonKey === 2 &&
        !!parseBlack(polygons)?.length &&
        parseBlack(polygons)?.map((item) => (
          <MapPolygonMemoised item={item} key={item.id} />
        ))}
      {poligonKey > 2 &&
        !!parseMedium(polygons)?.length &&
        parseMedium(polygons)?.map((item) => (
          <MapPolygonMemoised item={item} key={item.id} />
        ))}
      {poligonKey === 3 &&
        !!parseParking(polygons)?.length &&
        parseParking(polygons)?.map((item) => (
          <Marker
            key={item.id}
            coordinate={coordinate(item.polygon)}
            tracksViewChanges={false}
            icon={parkingIcon}
            anchor={{ x: 0.5, y: 0.5 }}
            flat={true}
          />
        ))}
      {poligonKey === 4 &&
        !!parseParking(polygons)?.length &&
        parseParking(polygons)?.map((item) => (
          <MapPolygonMemoised item={item} key={item.id} />
        ))}
    </>
  );
};

export default React.memo(MapPolygon);
