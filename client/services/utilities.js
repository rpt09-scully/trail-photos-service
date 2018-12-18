let getTrailIdURL = () => {
  let urlId = window.location.pathname.slice(1);
  if (urlId.length === 0 || urlId < 0 || typeof urlId !== Number) {
    return 1;
  } else {
    return urlId;
  }
};

export default getTrailIdURL;