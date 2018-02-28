const Utils = {
  checkValidImgUrl: (url, cb) => {
    const img = new Image();
    img.onload = () => cb(true);
    img.onerror = () => cb(false);
    img.src = url;
  },
};

export default Utils;
