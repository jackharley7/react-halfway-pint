const R = 6371; // radius of earth in km

const rad = x => x*Math.PI/180;

export default (lat, lng, locations) => {
  if (locations.length === 0) { return null };

  const distances = [];
  let closest = -1;

  locations.forEach(({geometry}, i) => {
    const mlat = geometry.location.lat();
    const mlng = geometry.location.lng();
    const dLat  = rad(mlat - lat);
    const dLong = rad(mlng - lng);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c;
    distances[i] = d;

    if ( closest == -1 || d < distances[closest] ) {
      closest = i;
    }
  });

  return locations[closest];
}