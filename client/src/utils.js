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
      // responseFromServer[0] is the created post we get back from the server
      console.log('THING!: ', responseFromServer);
      // in here we can update the state of our app or add the post somewhere
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
