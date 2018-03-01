const Utils = {
  checkValidImgUrl: (url, cb) => {
    const img = new Image();
    img.onload = () => cb(true);
    img.onerror = () => cb(false);
    img.src = url;
  },

  eventHandlers: { // these are callbacks that would fire on the following events
    addedfile: file => console.log('fiiiile: ', file),
    success: (file, responseFromServer) => {
      // responseFromServer is now the URL of the image
    },
  },

  djsConfig: {
    addRemoveLinks: true,
    params: { // ============ this is where our description and user_id would go
      description: "I'm a parameter!",
      user_id: 1,
    },
  },
};

export default Utils;
