(function() {
	'use strict';

	var PubSub = function() {
		this.topics = {};
		this.id = -1;
	};

	PubSub.prototype.publish = function (topic, args) {
		if (this.topics[topic] === undefined) {
			return false;
		}

		var subscribers, len;

		subscribers = this.topics[topic];
		len = subscribers ? subscribers.length : 0;


		while (len > 0) {
			len -= 1;
			subscribers[len].func(topic, args);
		}

		return this;
	}

	PubSub.prototype.subscribe = function(topic, func) {

		if (this.topics[topic] === undefined) {
			this.topics[topic] = [];
		}

		var token;

		this.id += 1;

		token = this.id.toString();

		this.topics[topic].push({
			'token': token,
			'func': func
		});

		return token;
	}

	PubSub.prototype.unsubscribe = function(token) {
		var topic, i, len;
        for (topic in this.topics) {
			if (this.topics[topic]) {
				len = this.topics[topic].length;
                for (i = 0; i < len; i += 1) {
                    if (this.topics[topic][i].token === token) {
                        this.topics[topic].splice(i, 1);
                        return token;
                    }
                }
            }
		}

		return this;

	}

	module.exports = PubSub;

}());
