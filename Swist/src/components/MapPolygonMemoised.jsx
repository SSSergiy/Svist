import React, { memo} from "react";
import hexToRgba from "hex-to-rgba";
import {Polygon} from "react-native-maps";


const  MapPolygonMemoised = ({item}) =>{
    return(
        <Polygon
            key={item.id}
            coordinates={item?.polygon}
            strokeColor={hexToRgba(item?.color)}
            strokeWidth={2}
            fillColor={
                item.color !== '#FE7B01' && hexToRgba(item?.color, 0.24)
            }
        />
    )
}

export default memo(MapPolygonMemoised, (prev, next)=> prev.item.id === next.item.id)
