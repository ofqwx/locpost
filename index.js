import { getCurrentPosition } from './utils/geolocation.js'

const getLocationButton = document.querySelector('#get-location');

getLocationButton.addEventListener('click', async (e) => {
  if (!navigator.geolocation) {
    alert("Geolocation not available. Please choose another method.");
    return;
  }
  try {
    const coords = (await getCurrentPosition())?.coords;
    console.info("Got location:", coords);
    redirectToContext(getLocationContext(coords))
  }
  catch (error) {
    alert(error.message);
  }
});

function getLocationContext(coords, { decimals = 2 } = {}) {
  const { latitude, longitude } = coords;
  const lat = latitude.toFixed(decimals);
  const lon = longitude.toFixed(decimals);
  return `${lat},${lon}`
}

function redirectToContext(context, queryParams = {}) {
  const pathname = `./posts/`;
  const url = new URL(pathname, location);
  url.search = new URLSearchParams({ ...queryParams, context });
  window.location.href = url;
}