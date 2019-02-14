let getTrailIdURL = () => {
  let urlId = window.location.pathname.slice(1);
  if (urlId.length === 0 || isNaN(Number(urlId))) {
    console.log('default behave')
    return 1;
  } else {
    console.log('URLID:', urlId);
    return urlId;
  }
};

let detectEnvironment = () => {
  let SERVICE_HOSTS = {};
  if (process.env.NODE_ENV === 'production') {
    SERVICE_HOSTS =
    {
      trails: 'http://localhost:3001',
      profile: 'http://profile-service.be6c6ztrma.us-west-2.elasticbeanstalk.com',
      photos: 'http://trail-photos-service-dev.us-west-1.elasticbeanstalk.com',
      reviews: 'http://reviewservice.jsxvmg3wq3.us-west-1.elasticbeanstalk.com',
      paths: 'http://ec2-54-172-80-40.compute-1.amazonaws.com'
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