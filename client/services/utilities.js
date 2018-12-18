let getTrailIdURL = () => {
  let urlId = window.location.pathname.slice(1);
  (urlId.length === 0) && (urlId = 1);
  return urlId;
};

export default getTrailIdURL;