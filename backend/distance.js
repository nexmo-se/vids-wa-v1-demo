function getDistance(lat1, lon1, lat2, lon2) {
  var earthRadiusInKM = 6371;
  var diffInLat = deg2rad(lat2 - lat1);
  var difInLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(diffInLat / 2) * Math.sin(diffInLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(difInLon / 2) *
      Math.sin(difInLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distanceInKM = earthRadiusInKM * c;
  return convertKilToMiles(distanceInKM);
}
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
function convertKilToMiles(kilometers) {
  var conversionFactor = 0.621371;
  var miles = kilometers * conversionFactor;
  return Math.round(miles * 10) / 10;
}

module.exports = { getDistance };
