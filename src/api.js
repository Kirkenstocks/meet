import mockData from "./mock-data";

// pulls locations from event data and returns as an array
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

// checks to see if a token is present
const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

// tidies the url shown by removing queries
const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname;
    window.history.pushState('','', newurl);
  } else {
    newurl = window.location.protocol + '//' + window.location.host;
    window.history.pushState('', '', newurl)
  }
};

// gets event data from mockdata if local, from google api if live
export const getEvents = async () => {
  if (window.location.href.startsWith('http://localhost')) {
    return mockData;
  }

  if(!navigator.onLine) {
    const events = localStorage.getItem('lastEvents');
    // NProgress.done();
    return events ? JSON.parse(events) : [];
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url = 'https://sgk4ahq6fe.execute-api.us-west-2.amazonaws.com/dev/api/get-events'
      + '/' + token;
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      // NProgress.done();
      localStorage.setItem('lastEvents', JSON.stringify(result.events));
      return result.events;
    } else return null;
  }
};

// takes code from google api and retrieves token
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(
    // eslint-disable-next-line no-useless-concat
    'https://sgk4ahq6fe.execute-api.us-west-2.amazonaws.com/dev/api/token' + '/' + encodeCode
  );
  const { access_token } = await response.json();
  access_token && localStorage.setItem('access_token', access_token);
  return access_token;
};

// retrieves token from local storage if present or from api if not present
export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem('access_token');
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get('code');
    if (!code) {
      const response = await fetch(
        'https://sgk4ahq6fe.execute-api.us-west-2.amazonaws.com/dev/api/get-auth-url'
      );
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};