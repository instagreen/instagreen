import React from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';

const componentConfig = {
  iconFiletypes: ['.jpg', '.png', '.gif'],
  showFiletypeIcon: true,
  postUrl: '/instagreen/post/create',
};

// const djsConfig = {
//   previewTemplate: ReactDOMServer.renderToStaticMarkup(
//     <div className="dz-preview dz-file-preview">
//       <div className="dz-details">
//         <div className="dz-filename"><span data-dz-name="true"></span></div>
//         <img data-dz-thumbnail="true" />
//       </div>
//       <div className="dz-progress"><span className="dz-upload" data-dz-uploadprogress="true"></span></div>
//       <div className="dz-success-mark"><span>✔</span></div>
//       <div className="dz-error-mark"><span>✘</span></div>
//       <div className="dz-error-message"><span data-dz-errormessage="true"></span></div>
//     </div>
//   )
// };

// const componentConfig = {
//   iconFiletypes: ['.jpg', '.png', '.gif'],
//   showFiletypeIcon: true,
//   postUrl: '/instagreen/post/upload',
//   params: {
//     myParameter: "I'm a parameter!",
//   },
// };

// const eventHandlers = { addedfile: file => console.log('Here is the file ----', file) };
// <DropzoneComponent config={componentConfig} eventHandlers={eventHandlers} djsConfig={djsConfig} />


export default componentConfig;
// export default eventHandlers;
