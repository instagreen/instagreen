import Main from './components/main.jsx';
import App from './components/app.jsx';
import LogIn from './components/login.jsx';
import Profile from './components/profile.jsx';
import Post from './components/post.jsx';
import PostCreator from './components/postCreator.jsx';
import Explore from './components/explore.jsx';
import router from './clientRouter.jsx';
import wrapWithMainComponent from './componentWrapper.jsx';

// *** refer to ./clientRouter.jsx for dynamic component rendering
// *** reder to ./componentWrapper.jsx for higher order component function
router.setup({
  main: Main,
  app: wrapWithMainComponent(App),
  explore: wrapWithMainComponent(Explore),
  profile: wrapWithMainComponent(Profile),
  post: wrapWithMainComponent(Post),
  postCreator: wrapWithMainComponent(PostCreator),
  login: LogIn,
});

router.setRoute('main');

