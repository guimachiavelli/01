window.React = require('react');

var App = require('./app.jsx');

var Main = React.renderComponent(
  <App url="../src/game/intro.json" />,
  document.getElementById('content')
);

