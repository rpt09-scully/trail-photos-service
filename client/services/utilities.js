let getTrailIdURL = () => {
  let urlId = window.location.pathname.slice(1);
  if (urlId.length === 0 || urlId < 0 || isNaN(Number(urlId))) {
    return 1;
  } else {
    return urlId;
  }
};

export default getTrailIdURL;