(function() {
	'use strict';

	var React = require('react');

	var Beacon = require('./beacon.jsx');

	var TextWindow = React.createClass({

		parseTextItems: function(text) {
			var matches, beaconName, textArray = [], self = this;
			matches = text.match(/\[\[.+?\]\]/gi);

			if (matches === null) {
				return text;
			}

			text = text.match(/(?:[^\s\[\[]+|\[\[[^\]\]]*\])+/gi).map(function(match){
				if (matches.indexOf(match) > -1) {
					beaconName =  match.replace('[[','').replace(']]','');
					return (
						<Beacon
							pubsub={ self.props.pubsub }
							name={ beaconName }
							key={ 'key-' + beaconName }
						/>);
				} else {
					return match;
				}
			});

			text.reduce(function(prev, cur, index, original) {
				if (index + 1 === original.length) {

					if (typeof prev === 'string' && typeof cur === 'string') {
						textArray.push(prev + ' ' + cur);
					}

					if (typeof prev === 'string' && typeof cur !== 'string') {
						textArray.push(prev + ' ');
						textArray.push(cur);
					}

					if (typeof prev !== 'string' && typeof cur === 'string') {
						textArray.push(prev);
						textArray.push(' ' + cur);
					}

				}

				if (typeof prev === 'string' && typeof cur === 'string') {
					return prev + ' ' + cur;
				}

				if (typeof prev === 'string' && typeof cur !== 'string') {
					textArray.push(prev + ' ');
					textArray.push(cur);
					return '';
				}

			});

			return textArray;

		},

		printText: function(textArray) {
			var key, self = this;
			if (typeof textArray === 'string') {
				return <p>{textArray}</p>;
			}

			return textArray.map(function(text, i){
				key = Math.floor(Math.random() * 1000);

				if (!text) {
					return null;
				}

				text = self.parseTextItems(text);

				if (typeof text === 'string') {
					return <p key={key}>{text}</p>;
				}

				//FIXME: find a better way to output this and avoid everything
				// being wrapped in <span>s
				return (<p key={key}>{ text.map(function(t) {
					key = Math.floor(Math.random() * 1000);
					if (typeof t === 'string') {
						return <span key={key}>{t}</span>;
					}
					return t;
				})}</p>);

			});
		},

		componentDidUpdate: function() {

		},

		render: function() {
			var text = this.printText(this.props.text);

			return (
				<div className="textWindow">
					{text}
				</div>
				);
		}
	});

	module.exports = TextWindow;
}());
