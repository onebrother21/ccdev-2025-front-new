export type Coordinate = Record<"lat"|"lng",number>;
export const getDistanceBetweenTwoPoints = (c1:Coordinate,c2:Coordinate) => {
  if (c1.lat == c2.lat && c1.lng == c2.lng) return 0;
  const {PI,sin,cos,acos} = Math;
  const radlat1 = (PI * c1.lat)/180;
  const radlat2 = (PI * c2.lat)/180;
  const theta = c1.lng - c2.lng;
  const radtheta = (PI * theta)/180;
  let dist = sin(radlat1) * sin(radlat2) + cos(radlat1) * cos(radlat2) * cos(radtheta);
  if (dist > 1) dist = 1;
  dist = acos(dist);
  dist = (dist * 180) / PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344; //convert miles to km
  return dist;
};
export const getTotalDistance = (coordinates: Coordinate[]) => {
  if(!coordinates) return 0;
  if (coordinates.length < 2) return 0;
  coordinates = coordinates.filter((c) => "number" == typeof c.lat && "number" == typeof c.lng);
  let dist = 0;
  for(let i = 0,l = coordinates.length;i < l;i++) dist += !i?0:getDistanceBetweenTwoPoints(coordinates[i-1],coordinates[i]);
  return dist.toFixed(2);
};