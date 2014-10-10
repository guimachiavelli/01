window.React = require('react');

var Story = require('./components/story.jsx');

var Main = React.renderComponent(
	<Story />,
	document.getElementById('content')
);
