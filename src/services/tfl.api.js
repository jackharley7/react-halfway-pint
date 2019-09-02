import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.tfl.gov.uk/'
});

// TODO add app_id and app_key to env variable
export const getJourney = async (start, end) => (
  instance.get(`https://api.tfl.gov.uk/Journey/JourneyResults/${start.lat},${start.lng}/to/${end.lat},${end.lng}?nationalSearch=false&app_id=336ba1db&app_key=75c6bb7d4b9031a5877c6a0ff6975a69`)
);

// TODO add app_id and app_key to env variable
export const getStopPointInfo = (naptionId) => (
  instance.get(`https://api.tfl.gov.uk/StopPoint/${naptionId}?includeCrowdingData=false&app_id=336ba1db&app_key=75c6bb7d4b9031a5877c6a0ff6975a69`)
);
