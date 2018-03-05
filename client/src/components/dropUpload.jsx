import ReactDOMServer from 'react-dom/server';
import React from 'react';

const dropzoneConfigs = {
  componentConfig: {
    iconFiletypes: ['.jpg', '.png', '.mp4', '.jpeg'],
    showFiletypeIcon: true,
    // postUrl: '/instagreen/post/create', for dropzone component auto upload
    postUrl: 'no-url',
  },
  djsConfig: {
    addRemoveLinks: true,
    autoProcessQueue: false,
    previewTemplate: ReactDOMServer.renderToStaticMarkup(
      <div className="dz-preview dz-file-preview">
        <div className="dz-details">
          <img data-dz-thumbnail="true" alt="uploaded file" />
        </div>
      </div>
    )
  },
};


export default dropzoneConfigs;

