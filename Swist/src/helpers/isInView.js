const setInView = (mapBounds, extraPadding = 0.3, parking = false) => {
  if (mapBounds?.northEast && mapBounds?.northEast) {
    const { northEast, southWest } = mapBounds;
    const latPadding =
      Math.abs(northEast?.latitude - southWest?.latitude) * extraPadding;
    const lngPadding =
      Math.abs(northEast?.longitude - southWest?.longitude) * extraPadding;
    return (
      latitude >= southWest?.latitude - latPadding &&
      latitude <= northEast?.latitude + latPadding &&
      longitude >= southWest?.longitude - lngPadding &&
      longitude <= northEast?.longitude + lngPadding
    );
  }
};

export default setInView;
