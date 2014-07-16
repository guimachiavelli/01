window.React = require('react');

var App = require('./app.jsx');

var Main = React.renderComponent(
	<App />,
	document.getElementById('content')
);
