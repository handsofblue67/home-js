webpackJsonp([0,3],{

/***/ 125:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.message = '';
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.currentUser = __WEBPACK_IMPORTED_MODULE_3_lodash__["pick"](currentUser, ['username', 'firstname', 'lastName', 'picture']);
        this.token = currentUser && currentUser.token;
    }
    AuthService.prototype.login = function (username, password) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post('auth/local', JSON.stringify({ username: username, password: password }), options)
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var token = response.json() && response.json().token;
            if (token) {
                // set token property
                _this.token = token;
                _this.currentUser = __WEBPACK_IMPORTED_MODULE_3_lodash__["assign"]({}, __WEBPACK_IMPORTED_MODULE_3_lodash__["pick"](response.json(), ['firstName', 'lastName', 'picture']), { username: username });
                console.log(_this.currentUser);
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(__WEBPACK_IMPORTED_MODULE_3_lodash__["assign"]({}, _this.currentUser, { token: token })));
                // return true to indicate successful login
                return true;
            }
            else {
                // return false to indicate failed login
                _this.message = response.json().message;
                return false;
            }
        });
    };
    AuthService.prototype.logout = function () {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    };
    AuthService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === 'function' && _a) || Object])
    ], AuthService);
    return AuthService;
    var _a;
}());
//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/auth.service.js.map

/***/ },

/***/ 269:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_service__ = __webpack_require__(125);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return BackendService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BackendService = (function () {
    function BackendService(http, authService) {
        this.http = http;
        this.authService = authService;
    }
    BackendService.prototype.getDevicesByType = function (type) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */](this.generateHeaders());
        return this.http.get("devices/" + type, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BackendService.prototype.getDeviceData = function (device) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */](this.generateHeaders());
        return this.http.get("statuses/" + device.deviceID, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BackendService.prototype.publish = function (mqtt) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */](this.generateHeaders());
        return this.http.post('publish', JSON.stringify(mqtt), options)
            .map(function (res) { return res; })
            .catch(this.handleError);
    };
    BackendService.prototype.handleError = function (err) {
        var errMsg = (err.message) ? err.message :
            err.status ? err.status + " - " + err.statusTest : 'Server error';
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    };
    BackendService.prototype.getGeofenceDevices = function () {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */](this.generateHeaders());
        return this.http.get('geofence', options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BackendService.prototype.getGeofenceByDevice = function (id) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */](this.generateHeaders());
        return this.http.get("geofence/" + id, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BackendService.prototype.generateHeaders = function () {
        return { headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'x-access-token': this.authService.token }) };
    };
    BackendService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__auth_service__["a" /* AuthService */]) === 'function' && _b) || Object])
    ], BackendService);
    return BackendService;
    var _a, _b;
}());
//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/backend.service.js.map

/***/ },

/***/ 450:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(265);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// Import our authentication service
var AuthGuard = (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        // If user is not logged in we'll send them to the homepage 
        if (localStorage.getItem('currentUser')) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    };
    AuthGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object])
    ], AuthGuard);
    return AuthGuard;
    var _a;
}());
//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/auth-guard.service.js.map

/***/ },

/***/ 451:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared__ = __webpack_require__(49);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return BrokerService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BrokerService = (function () {
    function BrokerService() {
    }
    BrokerService.prototype.getLog = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            _this.socket = __WEBPACK_IMPORTED_MODULE_1_socket_io_client__('/');
            _this.socket.on('log', function (event) { return observer.next(event); });
            return function () { return _this.socket.disconnect(); };
        });
    };
    BrokerService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], BrokerService);
    return BrokerService;
}());
//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/broker.service.js.map

/***/ },

/***/ 452:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__broker_component__ = __webpack_require__(705);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__broker_service__ = __webpack_require__(451);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__broker_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__broker_service__["a"]; });


//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/index.js.map

/***/ },

/***/ 453:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__backend_service__ = __webpack_require__(269);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ChartService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ChartService = (function () {
    function ChartService(backend) {
        var _this = this;
        this.backend = backend;
        this.charts = [];
        this.chartSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        this.chart$ = this.chartSource.asObservable();
        backend.getDevicesByType('analogInput').subscribe(function (devices) {
            __WEBPACK_IMPORTED_MODULE_4_lodash__["each"](devices, function (device) {
                backend.getDeviceData(device)
                    .subscribe(function (status) { return _this.createChart(_this.normalize(device, status)); });
            });
        });
    }
    ChartService.prototype.createChart = function (device) {
        this.charts = this.charts.concat([
            {
                chart: { zoomType: 'x', type: 'line' },
                title: { text: 'Light Sensor' },
                xAxis: {
                    type: 'datetime',
                    title: { text: 'Time' },
                    dateTimeFormat: {
                        day: 'HH:mm:ss'
                    }
                },
                yAxis: { title: { text: 'Light levels' } },
                series: this.separateByDay(device.status),
            }
        ]);
        this.chartSource.next(this.charts);
    };
    ChartService.prototype.separateByDay = function (deviceStatus) {
        return __WEBPACK_IMPORTED_MODULE_4_lodash__["chain"](deviceStatus)
            .groupBy(function (dataPoint) {
            return __WEBPACK_IMPORTED_MODULE_3_moment__(+dataPoint.timestamp).startOf('day').format('MM/DD/YY');
        })
            .map(function (dayOfData, date) {
            return {
                name: date,
                data: __WEBPACK_IMPORTED_MODULE_4_lodash__["reduce"](dayOfData, function (acc, dataPoint) {
                    var time = new Date(+dataPoint.timestamp);
                    time.setDate(1);
                    time.setMonth(1);
                    time.setFullYear(1971);
                    return acc.concat([[+__WEBPACK_IMPORTED_MODULE_3_moment__(+time), dataPoint.pins[0].status]]);
                }, [])
            };
        })
            .value();
    };
    ChartService.prototype.normalize = function (device, statuses) {
        return {
            deviceID: device.deviceID,
            name: device.name,
            topics: device.topics,
            timestamp: device.timestamp,
            primaryType: device.primaryType,
            status: statuses,
            checkinFreq: device.checkinFreq,
        };
    };
    ChartService.prototype.getData = function (device) {
        var _this = this;
        var updatedDevice;
        this.backend.getDeviceData(device)
            .subscribe(function (status) { return updatedDevice = _this.normalize(device, status); });
        return updatedDevice;
    };
    ChartService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__backend_service__["a" /* BackendService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__backend_service__["a" /* BackendService */]) === 'function' && _a) || Object])
    ], ChartService);
    return ChartService;
    var _a;
}());
//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/chart.service.js.map

/***/ },

/***/ 454:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chart_component__ = __webpack_require__(706);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chart_service__ = __webpack_require__(453);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__chart_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__chart_service__["a"]; });


//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/index.js.map

/***/ },

/***/ 455:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_lodash__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ChatService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ChatService = (function () {
    function ChatService() {
        this.messages = [];
    }
    // TODO: break backend into modules, so there are separate websocket endpoints
    ChatService.prototype.getMessages = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) {
            _this.socket = __WEBPACK_IMPORTED_MODULE_1_socket_io_client__('/');
            _this.socket.emit('join', { username: JSON.parse(localStorage.getItem('currentUser')).username });
            _this.socket.on('init', function (messages) {
                _this.messages = __WEBPACK_IMPORTED_MODULE_5_lodash__["map"](messages, function (message) {
                    return {
                        text: message.text,
                        user: message.user,
                        timestamp: __WEBPACK_IMPORTED_MODULE_2_moment__(message.timestamp).calendar(),
                        avatar: message.avatar,
                    };
                });
                observer.next(_this.messages);
            });
            _this.socket.on('newMessage', function (message) {
                _this.messages = [
                    {
                        text: message.text,
                        user: message.user,
                        timestamp: __WEBPACK_IMPORTED_MODULE_2_moment__(message.timestamp).calendar(),
                        avatar: message.avatar,
                    }
                ].concat(_this.messages);
                observer.next(_this.messages);
            });
            return function () { return _this.socket.disconnect(); };
        });
    };
    ChatService.prototype.sendMessage = function (message) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.socket.emit('addMessage', JSON.stringify({
            text: message,
            user: currentUser.username,
            timestamp: __WEBPACK_IMPORTED_MODULE_2_moment__(),
            avatar: currentUser.picture,
        }));
    };
    ChatService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], ChatService);
    return ChatService;
}());
//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/chat.service.js.map

/***/ },

/***/ 456:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chat_component__ = __webpack_require__(707);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chat_service__ = __webpack_require__(455);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__chat_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__chat_service__["a"]; });


//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/index.js.map

/***/ },

/***/ 457:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared__ = __webpack_require__(49);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return FoodDispenserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FoodDispenserService = (function () {
    function FoodDispenserService() {
        this.currentStatus = {};
    }
    FoodDispenserService.prototype.getStatus = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            _this.socket = __WEBPACK_IMPORTED_MODULE_1_socket_io_client__('/');
            _this.socket.emit('joinFoodDispenser', { username: JSON.parse(localStorage.getItem('currentUser')).username });
            _this.socket.on('initFoodDispenser', function (currentStatus) {
                console.log(currentStatus);
                _this.currentStatus = currentStatus;
                observer.next(_this.currentStatus);
            });
            _this.socket.on('stateChange', function (currentStatus) {
                _this.currentStatus = currentStatus;
                observer.next(_this.currentStatus);
            });
            return function () { return _this.socket.disconnect(); };
        });
    };
    FoodDispenserService.prototype.updateStatus = function (status) {
        var publish = {
            topic: '/update/12658677',
            message: JSON.stringify(status)
        };
        this.socket.emit('publish', publish);
    };
    FoodDispenserService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], FoodDispenserService);
    return FoodDispenserService;
}());
//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/food-dispenser.service.js.map

/***/ },

/***/ 458:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__food_dispenser_component__ = __webpack_require__(708);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__food_dispenser_service__ = __webpack_require__(457);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__food_dispenser_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__food_dispenser_service__["a"]; });


//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/index.js.map

/***/ },

/***/ 459:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__backend_service__ = __webpack_require__(269);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GeofenceService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var GeofenceService = (function () {
    function GeofenceService(backend) {
        var _this = this;
        this.backend = backend;
        this.devices = [];
        this.mapSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](this.devices);
        this.map$ = this.mapSource.asObservable();
        backend.getGeofenceDevices().subscribe(function (devices) {
            __WEBPACK_IMPORTED_MODULE_3_lodash__["each"](devices, function (device) { return backend.getGeofenceByDevice(device)
                .subscribe(function (entries) {
                _this.devices = _this.devices.concat(entries);
                _this.mapSource.next(_this.devices);
            }); });
        });
    }
    GeofenceService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__backend_service__["a" /* BackendService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__backend_service__["a" /* BackendService */]) === 'function' && _a) || Object])
    ], GeofenceService);
    return GeofenceService;
    var _a;
}());
//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/geofence.service.js.map

/***/ },

/***/ 460:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__map_component__ = __webpack_require__(713);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__geofence_service__ = __webpack_require__(459);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__map_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__geofence_service__["a"]; });


//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/index.js.map

/***/ },

/***/ 461:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__temperature_component__ = __webpack_require__(716);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__temperature_service__ = __webpack_require__(462);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__temperature_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__temperature_service__["a"]; });


//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/index.js.map

/***/ },

/***/ 462:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_socket_io_client__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_socket_io_client__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TemperatureService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TemperatureService = (function () {
    function TemperatureService() {
        this.states = [];
    }
    TemperatureService.prototype.getTemps = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) {
            _this.socket = __WEBPACK_IMPORTED_MODULE_4_socket_io_client__('/');
            _this.socket.emit('joinTemperature', { username: JSON.parse(localStorage.getItem('currentUser')).username });
            _this.socket.on('initTemperature', function (currentStatus) {
                _this.states = currentStatus;
                observer.next(_this.states);
            });
            _this.socket.on('digitalInputChange', function (update) {
                _this.states = __WEBPACK_IMPORTED_MODULE_3_lodash__["map"](_this.states, function (device) {
                    if (device.deviceID === update.status.deviceID) {
                        device.status = update.status;
                    }
                    return device;
                });
                observer.next(_this.states);
            });
            return function () { return _this.socket.disconnect(); };
        });
    };
    TemperatureService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], TemperatureService);
    return TemperatureService;
}());
//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/temperature.service.js.map

/***/ },

/***/ 463:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__toggle_component__ = __webpack_require__(717);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__toggle_service__ = __webpack_require__(464);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__toggle_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__toggle_service__["a"]; });


//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/index.js.map

/***/ },

/***/ 464:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_socket_io_client__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_socket_io_client__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ToggleService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ToggleService = (function () {
    function ToggleService() {
        this.states = [];
    }
    ToggleService.prototype.toggle = function (device) {
        var topic = device.topics.sub.toggle;
        var mqtt = { topic: topic, message: (new Date()).toString() };
        this.socket.emit('publish', mqtt);
    };
    ToggleService.prototype.getStates = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) {
            _this.socket = __WEBPACK_IMPORTED_MODULE_4_socket_io_client__('/');
            _this.socket.emit('joinToggle', { username: JSON.parse(localStorage.getItem('currentUser')).username });
            _this.socket.on('initToggle', function (currentStatus) {
                _this.states = currentStatus;
                observer.next(_this.states);
            });
            _this.socket.on('stateChange', function (update) {
                _this.states = __WEBPACK_IMPORTED_MODULE_3_lodash__["map"](_this.states, function (device) {
                    if (device.deviceID === update.status.deviceID) {
                        device.status = update.status;
                    }
                    return device;
                });
                observer.next(_this.states);
            });
            return function () { return _this.socket.disconnect(); };
        });
    };
    ToggleService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], ToggleService);
    return ToggleService;
}());
//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/toggle.service.js.map

/***/ },

/***/ 465:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_service__ = __webpack_require__(125);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserService = (function () {
    function UserService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
    }
    UserService.prototype.getUsers = function () {
        // add authorization header with jwt token
        if (!this.headers['Authorization']) {
            this.headers.append('Authorization', this.authService.token);
        }
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: this.headers });
        // get users from api
        return this.http.get('user', options)
            .map(function (response) { return response.json(); });
    };
    UserService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__auth_service__["a" /* AuthService */]) === 'function' && _b) || Object])
    ], UserService);
    return UserService;
    var _a, _b;
}());
//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/user.service.js.map

/***/ },

/***/ 49:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rxjs_extensions__ = __webpack_require__(714);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rxjs_extensions___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__rxjs_extensions__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shadow_directive__ = __webpack_require__(715);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__rxjs_extensions__, "ShadowOnScrollDirective")) __webpack_require__.d(exports, "ShadowOnScrollDirective", function() { return __WEBPACK_IMPORTED_MODULE_0__rxjs_extensions__["ShadowOnScrollDirective"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "ShadowOnScrollDirective", function() { return __WEBPACK_IMPORTED_MODULE_1__shadow_directive__["a"]; });


//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/index.js.map

/***/ },

/***/ 543:
/***/ function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 543;


/***/ },

/***/ 544:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(719);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__polyfills_ts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(673);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(718);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_module__ = __webpack_require__(703);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/main.js.map

/***/ },

/***/ 702:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_service__ = __webpack_require__(125);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(authService) {
        this.authService = authService;
        this.atTop = true;
    }
    AppComponent.prototype.scrolling = function (event) {
        console.log(event.target.value);
    };
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(913),
            styles: [__webpack_require__(903)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* AuthService */]) === 'function' && _a) || Object])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/app.component.js.map

/***/ },

/***/ 703:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__(654);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_highcharts__ = __webpack_require__(733);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_highcharts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_highcharts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_google_maps_core__ = __webpack_require__(723);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_google_maps_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angular2_google_maps_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(702);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__backend_service__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__chat__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__map__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__chart__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__toggle__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__broker__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__auth_service__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__user_service__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__auth_guard_service__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__app_routing__ = __webpack_require__(704);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__food_dispenser__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__temperature__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__shared__ = __webpack_require__(49);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_17__app_routing__["a" /* routedComponents */],
                __WEBPACK_IMPORTED_MODULE_20__shared__["ShadowOnScrollDirective"],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_6_angular2_google_maps_core__["AgmCoreModule"].forRoot({ apiKey: 'AIzaSyDb-Foka_83ay6ofqqwuB33F_p11vtlBjY' }),
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["e" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_5_angular2_highcharts__["ChartModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["MaterialModule"].forRoot(),
                __WEBPACK_IMPORTED_MODULE_17__app_routing__["b" /* routing */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_16__auth_guard_service__["a" /* AuthGuard */],
                __WEBPACK_IMPORTED_MODULE_14__auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_8__backend_service__["a" /* BackendService */],
                __WEBPACK_IMPORTED_MODULE_13__broker__["b" /* BrokerService */],
                __WEBPACK_IMPORTED_MODULE_11__chart__["b" /* ChartService */],
                __WEBPACK_IMPORTED_MODULE_9__chat__["b" /* ChatService */],
                __WEBPACK_IMPORTED_MODULE_18__food_dispenser__["b" /* FoodDispenserService */],
                __WEBPACK_IMPORTED_MODULE_10__map__["b" /* GeofenceService */],
                __WEBPACK_IMPORTED_MODULE_19__temperature__["b" /* TemperatureService */],
                __WEBPACK_IMPORTED_MODULE_12__toggle__["b" /* ToggleService */],
                __WEBPACK_IMPORTED_MODULE_15__user_service__["a" /* UserService */],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/app.module.js.map

/***/ },

/***/ 704:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_guard_service__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__broker__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chart__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__chat__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__food_dispenser__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home__ = __webpack_require__(710);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__login__ = __webpack_require__(711);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__map__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__temperature__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__toggle__ = __webpack_require__(463);
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return routing; });
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return routedComponents; });











var appRoutes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_7__login__["a" /* LoginComponent */] },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_6__home__["a" /* HomeComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__auth_guard_service__["a" /* AuthGuard */]] },
    { path: 'maps', component: __WEBPACK_IMPORTED_MODULE_8__map__["a" /* MapComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__auth_guard_service__["a" /* AuthGuard */]] },
    { path: 'charts', component: __WEBPACK_IMPORTED_MODULE_3__chart__["a" /* ChartComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__auth_guard_service__["a" /* AuthGuard */]] },
    { path: 'lights', component: __WEBPACK_IMPORTED_MODULE_10__toggle__["a" /* ToggleComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__auth_guard_service__["a" /* AuthGuard */]] },
    { path: 'debug', component: __WEBPACK_IMPORTED_MODULE_2__broker__["a" /* BrokerComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__auth_guard_service__["a" /* AuthGuard */]] },
    { path: 'chat', component: __WEBPACK_IMPORTED_MODULE_4__chat__["a" /* ChatComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__auth_guard_service__["a" /* AuthGuard */]] },
    { path: 'food-dispenser', component: __WEBPACK_IMPORTED_MODULE_5__food_dispenser__["a" /* FoodDispenserComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__auth_guard_service__["a" /* AuthGuard */]] },
    { path: 'temperature', component: __WEBPACK_IMPORTED_MODULE_9__temperature__["a" /* TemperatureComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__auth_guard_service__["a" /* AuthGuard */]] },
    { path: '**', redirectTo: '' },
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forRoot(appRoutes);
var routedComponents = [
    __WEBPACK_IMPORTED_MODULE_2__broker__["a" /* BrokerComponent */],
    __WEBPACK_IMPORTED_MODULE_3__chart__["a" /* ChartComponent */],
    __WEBPACK_IMPORTED_MODULE_4__chat__["a" /* ChatComponent */],
    __WEBPACK_IMPORTED_MODULE_5__food_dispenser__["a" /* FoodDispenserComponent */],
    __WEBPACK_IMPORTED_MODULE_6__home__["a" /* HomeComponent */],
    __WEBPACK_IMPORTED_MODULE_7__login__["a" /* LoginComponent */],
    __WEBPACK_IMPORTED_MODULE_8__map__["a" /* MapComponent */],
    __WEBPACK_IMPORTED_MODULE_9__temperature__["a" /* TemperatureComponent */],
    __WEBPACK_IMPORTED_MODULE_10__toggle__["a" /* ToggleComponent */],
];
//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/app.routing.js.map

/***/ },

/***/ 705:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__broker_service__ = __webpack_require__(451);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return BrokerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BrokerComponent = (function () {
    function BrokerComponent(brokerService) {
        this.brokerService = brokerService;
        this.log = [];
        this.systemMessages = false;
    }
    BrokerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.connection = this.brokerService.getLog().subscribe(function (event) {
            _this.log = [event].concat(_this.log);
        });
    };
    BrokerComponent.prototype.ngOnDestroy = function () {
        this.connection.unsubscribe();
    };
    BrokerComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-broker',
            template: __webpack_require__(914),
            styles: [__webpack_require__(904)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__broker_service__["a" /* BrokerService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__broker_service__["a" /* BrokerService */]) === 'function' && _a) || Object])
    ], BrokerComponent);
    return BrokerComponent;
    var _a;
}());
//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/broker.component.js.map

/***/ },

/***/ 706:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chart_service__ = __webpack_require__(453);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ChartComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ChartComponent = (function () {
    function ChartComponent(chartService) {
        this.chartService = chartService;
    }
    ChartComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-chart',
            template: __webpack_require__(915),
            styles: [__webpack_require__(905)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__chart_service__["a" /* ChartService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__chart_service__["a" /* ChartService */]) === 'function' && _a) || Object])
    ], ChartComponent);
    return ChartComponent;
    var _a;
}());
//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/chart.component.js.map

/***/ },

/***/ 707:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chat_service__ = __webpack_require__(455);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ChatComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ChatComponent = (function () {
    function ChatComponent(chatService) {
        this.chatService = chatService;
        this.messages = [];
        this.message = '';
    }
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.connection = this.chatService
            .getMessages()
            .subscribe(function (messages) {
            _this.messages = messages;
        });
    };
    ChatComponent.prototype.sendMessage = function () {
        this.chatService.sendMessage(this.message);
        this.message = '';
    };
    ChatComponent.prototype.ngOnDestroy = function () {
        this.connection.unsubscribe();
    };
    ChatComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-chat',
            template: __webpack_require__(916),
            styles: [__webpack_require__(906)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__chat_service__["a" /* ChatService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__chat_service__["a" /* ChatService */]) === 'function' && _a) || Object])
    ], ChatComponent);
    return ChatComponent;
    var _a;
}());
//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/chat.component.js.map

/***/ },

/***/ 708:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__food_dispenser_service__ = __webpack_require__(457);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return FoodDispenserComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FoodDispenserComponent = (function () {
    function FoodDispenserComponent(foodDispenserService) {
        this.foodDispenserService = foodDispenserService;
    }
    FoodDispenserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.connection = this.foodDispenserService
            .getStatus()
            .subscribe(function (currentStatus) { return _this.currentStatus = currentStatus; });
    };
    FoodDispenserComponent.prototype.ngOnDestroy = function () {
        this.connection.unsubscribe();
    };
    FoodDispenserComponent.prototype.update = function (clock, duty) {
        this.foodDispenserService.updateStatus({ clock: clock, duty: duty });
    };
    FoodDispenserComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-food-dispenser',
            template: __webpack_require__(917),
            styles: [__webpack_require__(907)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__food_dispenser_service__["a" /* FoodDispenserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__food_dispenser_service__["a" /* FoodDispenserService */]) === 'function' && _a) || Object])
    ], FoodDispenserComponent);
    return FoodDispenserComponent;
    var _a;
}());
//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/food-dispenser.component.js.map

/***/ },

/***/ 709:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_service__ = __webpack_require__(465);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = (function () {
    function HomeComponent(userService) {
        this.userService = userService;
        this.users = [];
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get users from secure api end point
        this.userService.getUsers()
            .subscribe(function (users) { return _this.users = users; });
    };
    HomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(918),
            styles: [__webpack_require__(908)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__user_service__["a" /* UserService */]) === 'function' && _a) || Object])
    ], HomeComponent);
    return HomeComponent;
    var _a;
}());
//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/home.component.js.map

/***/ },

/***/ 710:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_component__ = __webpack_require__(709);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__home_component__["a"]; });

//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/index.js.map

/***/ },

/***/ 711:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login_component__ = __webpack_require__(712);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__login_component__["a"]; });

//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/index.js.map

/***/ },

/***/ 712:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(125);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = (function () {
    function LoginComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.model = {};
        this.loading = false;
        this.error = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authService.logout();
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.authService.login(this.model.username, this.model.password)
            .subscribe(function (result) {
            if (result === true) {
                // login successful
                console.log('login successful');
                _this.loading = false;
                _this.router.navigate(['/home']);
            }
            else {
                // login failed
                console.log('login failed');
                _this.error = _this.authService.message;
                _this.loading = false;
            }
        });
    };
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(919),
            styles: [__webpack_require__(909)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === 'function' && _b) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/login.component.js.map

/***/ },

/***/ 713:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__geofence_service__ = __webpack_require__(459);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return MapComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MapComponent = (function () {
    function MapComponent(geofenceService) {
        this.geofenceService = geofenceService;
        this.maps = [];
    }
    MapComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.geofenceService.map$.subscribe(function (maps) {
            _this.maps = __WEBPACK_IMPORTED_MODULE_2_lodash__["map"](maps, function (map) {
                return {
                    lat: +map.latitude,
                    lng: +map.longitude,
                    info: __WEBPACK_IMPORTED_MODULE_1_moment__(+map.timestamp * 1000).calendar(),
                    marker: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=M|" + ((map.trigger === 'enter') ? '3FFF33' : 'FF3333')
                };
            });
        });
    };
    MapComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-map',
            template: __webpack_require__(920),
            styles: [__webpack_require__(910)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__geofence_service__["a" /* GeofenceService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__geofence_service__["a" /* GeofenceService */]) === 'function' && _a) || Object])
    ], MapComponent);
    return MapComponent;
    var _a;
}());
//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/map.component.js.map

/***/ },

/***/ 714:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_of__ = __webpack_require__(523);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_throw__ = __webpack_require__(929);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_fromEvent__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_fromEvent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_fromEvent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime__ = __webpack_require__(930);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__(931);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_distinctUntilChanged__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_do__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_filter__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__ = __webpack_require__(934);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_takeWhile__ = __webpack_require__(935);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_takeWhile___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_takeWhile__);











//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/rxjs-extensions.js.map

/***/ },

/***/ 715:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ShadowOnScrollDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ShadowOnScrollDirective = (function () {
    function ShadowOnScrollDirective(el, renderer) {
        this._atTop = true;
        renderer.setElementStyle(el.nativeElement, 'box-shadow', '0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)');
    }
    Object.defineProperty(ShadowOnScrollDirective.prototype, "scrollHeight", {
        set: function (scrollHeight) {
            this._atTop = scrollHeight ? false : true;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], ShadowOnScrollDirective.prototype, "scrollHeight", null);
    ShadowOnScrollDirective = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({ selector: '[shadowOnScoll]' }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]) === 'function' && _b) || Object])
    ], ShadowOnScrollDirective);
    return ShadowOnScrollDirective;
    var _a, _b;
}());
//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/shadow.directive.js.map

/***/ },

/***/ 716:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__temperature_service__ = __webpack_require__(462);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TemperatureComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TemperatureComponent = (function () {
    function TemperatureComponent(temperatureService) {
        this.temperatureService = temperatureService;
        this.states = [];
    }
    TemperatureComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.connection = this.temperatureService
            .getTemps()
            .subscribe(function (states) { return _this.states = states; });
    };
    TemperatureComponent.prototype.ngOnDestroy = function () {
        this.connection.unsubscribe();
    };
    TemperatureComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-temperature',
            template: __webpack_require__(921),
            styles: [__webpack_require__(911)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__temperature_service__["a" /* TemperatureService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__temperature_service__["a" /* TemperatureService */]) === 'function' && _a) || Object])
    ], TemperatureComponent);
    return TemperatureComponent;
    var _a;
}());
//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/temperature.component.js.map

/***/ },

/***/ 717:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__toggle_service__ = __webpack_require__(464);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ToggleComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ToggleComponent = (function () {
    function ToggleComponent(toggleService) {
        this.toggleService = toggleService;
        this.states = [];
    }
    ToggleComponent.prototype.toggle = function (device) { this.toggleService.toggle(device); };
    ToggleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.connection = this.toggleService
            .getStates()
            .subscribe(function (states) { return _this.states = states; });
    };
    ToggleComponent.prototype.ngOnDestroy = function () {
        this.connection.unsubscribe();
    };
    ToggleComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-toggle',
            template: __webpack_require__(922),
            styles: [__webpack_require__(912)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__toggle_service__["a" /* ToggleService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__toggle_service__["a" /* ToggleService */]) === 'function' && _a) || Object])
    ], ToggleComponent);
    return ToggleComponent;
    var _a;
}());
//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/toggle.component.js.map

/***/ },

/***/ 718:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/environment.js.map

/***/ },

/***/ 719:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(751);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(744);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(740);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(746);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(745);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(743);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(742);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(750);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(739);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(738);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(748);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(741);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(749);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(747);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(752);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(971);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=/Users/michaelrobison/workspace/home-js/web/polyfills.js.map

/***/ },

/***/ 903:
/***/ function(module, exports) {

module.exports = ".card-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: column nowrap;\n      flex-flow: column nowrap;\n  padding: 16px;\n  padding-top: 80px;\n  overflow: auto;\n}\n\nmd-sidenav {\n  padding: 16px;\n  padding-top: 80px;\n  overflow: hidden;\n}\n\n.sidenav-layout { min-height: 100%; }\n\n.toolbar {\n  position: fixed;\n  z-index: 1;\n}"

/***/ },

/***/ 904:
/***/ function(module, exports) {

module.exports = ".debugWindow {\n    height: 400px;\n    overflow-y: auto;\n}"

/***/ },

/***/ 905:
/***/ function(module, exports) {

module.exports = "md-card {\n  margin: 0 16px 16px 0;\n  width: 600px;\n}"

/***/ },

/***/ 906:
/***/ function(module, exports) {

module.exports = ".chatContainer {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: column nowrap;\n      flex-flow: column nowrap;\n}\n.chatContainer md-card {\n  margin: 16px;\n}"

/***/ },

/***/ 907:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 908:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 909:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 910:
/***/ function(module, exports) {

module.exports = ".sebm-google-map-container {\n    height: 300px;\n}\n\n.black {\n    color: black;\n}"

/***/ },

/***/ 911:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 912:
/***/ function(module, exports) {

module.exports = "md-card {\n  margin: 0 16px 16px 0;\n  width: 110px;\n}\n\nmd-card-actions {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}"

/***/ },

/***/ 913:
/***/ function(module, exports) {

module.exports = "<md-toolbar color=\"primary\" shadowOnScoll=\"atTop\" class=\"toolbar\">\n\t<button md-icon-button (click)=\"nav.toggle()\">\n\t\t\t<md-icon>menu</md-icon>\n\t\t</button>\n\t<md-icon svgSrc=\"/assets/homejs.svg\"></md-icon>\n\t<span>HomeJS</span>\n\t<span class=\"fill\"></span>\n\t<button md-button *ngIf=\"authService.currentUser\" routerLink=\"/home\">{{authService.currentUser.firstName}}</button>\n\t<span *ngIf=\"authService.currentUser?.picture\"><img md-card-avatar [src]=\"authService.currentUser.picture\"></span>\n</md-toolbar>\n\n<md-sidenav-layout class=\"sidenav-layout\" (swipeleft)=\"nav.close()\" (scroll)=\"scrolling($event)\">\n\t<md-sidenav #nav mode=\"side\">\n\t\t<div *ngIf=\"authService.currentUser\"><button md-button routerLink=\"/charts\">Charts</button></div>\n\t\t<div *ngIf=\"authService.currentUser\"><button md-button routerLink=\"/lights\">Lights</button></div>\n\t\t<div *ngIf=\"authService.currentUser\"><button md-button routerLink=\"/maps\">Map</button></div>\n\t\t<div *ngIf=\"authService.currentUser\"><button md-button routerLink=\"/chat\">Chat</button></div>\n\t\t<div *ngIf=\"authService.currentUser\"><button md-button routerLink=\"/temperature\">Temperature</button></div>\n\t\t<div *ngIf=\"authService.currentUser\"><button md-button routerLink=\"/debug\">Debug</button></div>\n\t\t<!--<div *ngIf=\"authService.currentUser\"><button md-button routerLink=\"/food-dispenser\">Food Dispenser</button></div>-->\n\t</md-sidenav>\n\n\t<div class=\"card-container\" >\n\t\t<router-outlet></router-outlet>\n\t</div>\n</md-sidenav-layout>"

/***/ },

/***/ 914:
/***/ function(module, exports) {

module.exports = "<md-card *ngIf=\"log.length\" class=\"debugWindow\">\n  <md-list>\n    <md-list-item dense *ngFor=\"let event of log\">\n      <h3 md-line>{{event.event.topic}}</h3> \n      <p md-line>{{event.event.message}}</p>\n    </md-list-item>\n  </md-list>\n</md-card>"

/***/ },

/***/ 915:
/***/ function(module, exports) {

module.exports = "<md-card *ngFor=\"let chart of chartService.chart$ | async\">\n  <md-card-title>{{chart.title.title}}</md-card-title>\n  <md-card-content>\n    <chart [options]=\"chart\"></chart>\n\t</md-card-content>\n</md-card>"

/***/ },

/***/ 916:
/***/ function(module, exports) {

module.exports = "<div class=\"chatContainer\">\n  <md-card>\n    <md-card-content>\n      <md-input dividerColor=\"accent\" placeholder=\"Send Message\" [(ngModel)]=\"message\"></md-input>\n      <button md-raised-button color=\"accent\" (click)=\"sendMessage()\">Send</button>\n    </md-card-content>\n  </md-card>\n  <md-card *ngFor=\"let message of messages\">\n    <md-card-header>\n      <img *ngIf=\"message.avatar\" md-card-avatar [src]=\"message.avatar\">\n      <md-card-title>{{message.user}}</md-card-title>\n      <md-card-subtitle>{{message.timestamp}}</md-card-subtitle>\n    </md-card-header>\n    <md-card-content>{{message.text}}</md-card-content>\n  </md-card>\n</div>"

/***/ },

/***/ 917:
/***/ function(module, exports) {

module.exports = "Duty\n<md-slider #duty min=\"0\" max=\"1023\" value=\"500\" (slide)=\"update(clock.value, duty.value)\"></md-slider>\nClock\n<md-slider #clock min=\"1\" max=\"1000\" value=\"300\" (slide)=\"update(clock.value, duty.value)\"></md-slider>\n"

/***/ },

/***/ 918:
/***/ function(module, exports) {

module.exports = "<div class=\"col-md-6 col-md-offset-3\">\n    <h1>Home</h1>\n    <p>You're logged in with JWT!!</p>\n    <div>\n        Users from secure api end point:\n        <ul>\n            <li *ngFor=\"let user of users\">{{user.firstName}} {{user.lastName}}</li>\n        </ul>\n    </div>\n    <p><a [routerLink]=\"['/login']\">Logout</a></p>\n</div>"

/***/ },

/***/ 919:
/***/ function(module, exports) {

module.exports = "<md-card>\n  <md-card-title>Login</md-card-title>\n  <md-card-content>\n    <form id=\"login-form\" name=\"login-form\" (ngSubmit)=\"f.form.valid && login()\" #f=\"ngForm\" novalidate>\n      <div><md-input placeholder=\"username\" name=\"username\" [(ngModel)]=\"model.username\" #username=\"ngModel\" required></md-input></div>\n      <div><md-input type=\"password\" placeholder=\"password\" name=\"password\" [(ngModel)]=\"model.password\" #password=\"ngModel\" required></md-input></div>\n      <div><button md-raised-button [disabled]=\"loading\" color=\"primary\">Login</button></div>\n    </form>\n    <md-spinner *ngIf=\"loading\"></md-spinner>\n    <div *ngIf=\"error\">{{error}}</div>\n  </md-card-content>\n</md-card>"

/***/ },

/***/ 920:
/***/ function(module, exports) {

module.exports = "<div *ngIf=\"maps.length\">\n  <sebm-google-map  [latitude]=\"maps[0]?.lat\" [longitude]=\"maps[0]?.lng\">\n      <sebm-google-map-marker *ngFor=\"let map of maps\" [latitude]=\"map?.lat\" [longitude]=\"map?.lng\" [iconUrl]=\"map.marker\">\n        <sebm-google-map-info-window><strong class=\"black\">{{map?.info}}</strong></sebm-google-map-info-window>\n      </sebm-google-map-marker>\n  </sebm-google-map>\n</div>"

/***/ },

/***/ 921:
/***/ function(module, exports) {

module.exports = "<div *ngIf=\"states.length\">\n\t<md-card *ngFor=\"let switch of states\">\n\t\t<md-card-title>{{switch.name || switch.deviceID}}</md-card-title>\n    <md-card-subtitle>{{switch.status?.timestamp | date:'shortTime'}}</md-card-subtitle>\n    <md-card-content>\n      <p>Temperature: {{switch.status?.pins[0].status.temp}}&deg;</p>\n      <p>Humidity: {{switch.status?.pins[0].status.humi}}%</p>\n    </md-card-content>\n\t</md-card>\n</div>\n"

/***/ },

/***/ 922:
/***/ function(module, exports) {

module.exports = "<div *ngIf=\"states.length\">\n\t<md-card *ngFor=\"let switch of states\">\n\t\t<md-card-title>{{switch.name || switch.deviceID}}</md-card-title>\n\t\t<md-slide-toggle [(ngModel)]=\"switch.status.pins[0].status\" color=\"accent\" (change)=\"toggle(switch)\"></md-slide-toggle>\n\t\t<!--<button *ngIf=\"!switch.status?.pins[0].status\" md-raised-button color=\"warn\" (click)=\"toggle(switch)\">Off</button>-->\n\t</md-card>\n</div>"

/***/ },

/***/ 972:
/***/ function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 972;


/***/ },

/***/ 973:
/***/ function(module, exports) {

/* (ignored) */

/***/ },

/***/ 974:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(544);


/***/ }

},[974]);
//# sourceMappingURL=main.bundle.map