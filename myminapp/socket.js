// let wx;
// class WxSocket {
// 	helper = {
// 		messageIndex: 0,
// 		isFunction(any) {
// 			return typeof any === "function";
// 		},
// 		isString(any) {
// 			return Object.prototype.toString.call(any) === "[object String]";
// 		},
// 		isObject(any) {
// 			return typeof any === "object" && any !== null;
// 		},
// 		isPlainObject(any) {
// 			return Object.prototype.toString.call(any) === "[object Object]";
// 		},
// 		get nextId() {
// 			return this.messageIndex++;
// 		},
// 		get id() {
// 			return Date.now() + "." + this.nextId;
// 		},
// 	};
// 	retryCount = 0;
// 	listener = {};
// 	promiseMaps = {};
// 	socketOpen = false;
// 	messageQueue = [];
// 	ALL = "";
// 	constructor(config) {
// 		this.config = config;
// 		this.listen().connect().afterConnect();
// 	}
// 	listen() {
// 		wx.onSocketOpen((result) => {
// 			console.info("WebSocket已连接");
// 			this.retryCount = 0;
// 			this.socketOpen = true;
// 			this.messageQueue.forEach((MessageQueueItem) =>
// 				this.send(MessageQueueItem.content, MessageQueueItem.config)
// 			);
// 			this.messageQueue = [];
// 		});
// 		wx.onSocketError(() => {
// 			console.error("WebSocket连接打开失败，请检查！");
// 			this.socketOpen = false;
// 		});
// 		return this;
// 	}
// 	on(typeOrCallBack, callback) {
// 		let type;

// 		switch (arguments.length) {
// 			case 1:
// 				type = this.ALL;
// 				callback = arguments[0];
// 				break;
// 			case 2:
// 				type = arguments[0];
// 				callback = arguments[1];
// 				break;
// 			default:
// 				throw new Error("Invalid argument");
// 		}

// 		if (!WxSocket.helper.isString(type)) {
// 			throw new Error("type argument must be a string");
// 		}
// 		if (!WxSocket.helper.isFunction(callback)) {
// 			throw new Error("callback argument must be a function");
// 		}

// 		this.listener[type] = this.listener[type] || [];

// 		this.listener[type].push(callback);

// 		let index = this.listener[type].length - 1;

// 		return () => {
// 			return this.listener[type].splice(index, 1);
// 		};
// 	}
// 	send(msg, config) {
// 		let content = this.wrapMsg(msg);
// 		config = config || {};
// 		const WxSocket = this;
// 		return new Promise(function (resolve, reject) {
// 			WxSocket.promiseMaps[content.id] = {
// 				resolve,
// 				reject,
// 				promise: this,
// 			};

// 			// socket未连接上，先放到消息队列里面
// 			if (!WxSocket.socketOpen) {
// 				WxSocket.messageQueue.push({
// 					content,
// 					config,
// 					timestamp: new Date().getTime(),
// 				});
// 			}
// 			// socket已连接，尝试发送消息
// 			else {
// 				try {
// 					wx.sendSocketMessage({
// 						data: JSON.stringify(content),
// 						success() {
// 							WxSocket.finishRequest(content.id);
// 							resolve();
// 						},
// 						fail() {
// 							WxSocket.finishRequest(content.id);
// 							reject();
// 						},
// 					});
// 				} catch (err) {
// 					reject(err);
// 					WxSocket.finishRequest(content.id);
// 				}
// 			}
// 		});
// 	}
// 	connect() {
// 		wx.connectSocket({
// 			url: this.config.url,
// 			header: {
// 				"content-type": "application/json",
// 			},
// 		});
// 		return this;
// 	}
// 	afterConnect() {
// 		wx.onSocketClose(() => {
// 			this.socketOpen = false;
// 			setTimeout(() => this.retry(), this.config.retryInterval);
// 		});
// 		wx.onSocketMessage(({ data }) => {
// 			try {
// 				data = JSON.parse(data);
// 			} catch (err) {}

// 			// resolve the request promise
// 			let deferred = this.promiseMaps[data.id];
// 			if (data.id && deferred) {
// 				this.finishRequest(data.id);
// 				deferred.resolve.call(deferred.promise, data);
// 			}

// 			let callbacks = [];

// 			for (let type in this.listener) {
// 				if (this.listener.hasOwnProperty(type)) {
// 					data.type === type && (callbacks = this.listener[type]);
// 				}
// 			}

// 			callbacks = (this.listener[this.ALL] || []).concat(callbacks);

// 			callbacks.forEach(
// 				(func) => WxSocket.helper.isFunction(func) && func(data)
// 			);
// 		});
// 		return this;
// 	}
// 	wrapMsg(msg) {
// 		if (WxSocket.helper.isPlainObject(msg)) {
// 			if (msg.type) {
// 				!msg.id ? (msg.id = WxSocket.helper.id) : 0;
// 				return msg;
// 			}
// 			return this.wrapMsg({
// 				type: "message",
// 				msg: msg,
// 				id: WxSocket.helper.id,
// 			});
// 		}
// 		return this.wrapMsg({ type: "message", msg: msg, id: WxSocket.helper.id });
// 	}
// 	finishRequest(requestID) {
// 		this.promiseMaps[requestID] = null;
// 		delete this.promiseMaps[requestID];
// 		return this;
// 	}
// 	retry() {
// 		// 服务器已经连上，或者超出了最大重连次数
// 		if (
// 			this.socketOpen ||
// 			(this.config.retryTimes > 0 && this.config.retryTimes <= this.retryCount)
// 		) {
// 			return;
// 		}
// 		this.retryCount += 1;
// 		console.warn(`第[ ${this.retryCount} ]次尝试重连WebSocket`);
// 		this.connect();
// 		return this;
// 	}
// }

// export default WxSocket;
