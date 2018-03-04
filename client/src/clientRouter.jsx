import React from 'react';
import ReactDOM from 'react-dom';

class ClientRouter {
  setup(routes) {
    this.routes = routes;
  }
  // dynamic component rendering, determined by passed in route
  setRoute(routeName, id = null) {
    const CurrentComponent = this.routes[routeName];
    ReactDOM.render(<CurrentComponent authorId={id} />, document.getElementById('app'));
  }
}

const router = new ClientRouter();
export default router;
