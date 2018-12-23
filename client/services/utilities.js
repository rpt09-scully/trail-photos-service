let getTrailIdURL = () => {
  let urlId = window.location.pathname.slice(1);
  if (urlId.length === 0 || isNaN(Number(urlId))) {
    return 1;
  } else {
    return urlId;
  }
};

let detectEnvironment = () => {
  let SERVICE_HOSTS = {};
  if (process.env.NODE_ENV === 'production') {
    SERVICE_HOSTS =
    {
      trails: '',
      profile: '',
      photos: 'http://trail-photos-service-dev.us-west-1.elasticbeanstalk.com',
      reviews: '',
      paths: ''
    };
  } else {
    SERVICE_HOSTS = {
      trails: 'http://localhost:3001',
      profile: 'http://localhost:3002',
      photos: 'http://localhost:3003',
      reviews: 'http://localhost:3004',
      paths: 'http://localhost:3005'
    };
  }
  return SERVICE_HOSTS;
};

export {getTrailIdURL, detectEnvironment};