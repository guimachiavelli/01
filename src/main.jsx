window.React = require('react');

var App = require('./components/app.jsx');

var Main = React.renderComponent(
	<App />,
	document.getElementById('content')
);
