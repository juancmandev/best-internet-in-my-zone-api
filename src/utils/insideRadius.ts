const deg2rad = (degrees: number) => degrees * (Math.PI / 180);

const isInsideRadius = (
  centerLat: number,
  centerLng: number,
  pointLat: number,
  pointLng: number,
  radius: number
) => {
  const earthRadiusMeters = 6371000;
  const dLat = deg2rad(pointLat - centerLat);
  const dLon = deg2rad(pointLng - centerLng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(centerLat)) *
      Math.cos(deg2rad(pointLat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceMeters = earthRadiusMeters * c;

  return distanceMeters <= radius;
};

export default isInsideRadius;
