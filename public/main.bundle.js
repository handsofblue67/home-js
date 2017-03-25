webpackJsonp([1,4],{

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(60);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    AuthGuard.prototype.canActivate = function () {
        var _this = this;
        return this.authService.auth$.map(function (loggedIn) {
            if (loggedIn) {
                return true;
            }
            _this.router.navigate(['/login']);
            return false;
        }).take(1);
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === "function" && _b || Object])
], AuthGuard);

var _a, _b;
//# sourceMappingURL=auth-guard.service.js.map

/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_service__ = __webpack_require__(60);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeviceService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DeviceService = (function () {
    // TODO: figure out how to not get a new token everytime a service is called...
    function DeviceService(authService) {
        var _this = this;
        this.authService = authService;
        this.deviceSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        this.devices$ = this.deviceSource.asObservable().share();
        this.devices = [];
        this.feathersService = this.authService.getService('devices');
        this.feathersService.find().then(function (update) {
            var devices = update.data;
            _this.devices = devices;
            _this.deviceSource.next(_this.devices);
        });
        this.feathersService
            .on('created', function (device) { return _this.onCreated(device); })
            .on('updated', function (device) { return _this.onUpdated(device); })
            .on('removed', function (device) { return _this.onRemoved(device); });
    }
    DeviceService.prototype.onCreated = function (device) {
        this.devices = this.devices.concat([device]);
        this.deviceSource.next(this.devices);
    };
    DeviceService.prototype.onUpdated = function (updatedDevice) {
        if (typeof updatedDevice === 'number')
            return;
        this.devices = __WEBPACK_IMPORTED_MODULE_3_lodash__["map"](this.devices, function (device) {
            return __WEBPACK_IMPORTED_MODULE_3_lodash__["cloneDeep"]((device.deviceID === updatedDevice.deviceID) ? updatedDevice : device);
        });
        this.deviceSource.next(this.devices);
    };
    DeviceService.prototype.onRemoved = function (removedDevice) {
        this.devices = __WEBPACK_IMPORTED_MODULE_3_lodash__["reject"](this.devices, ['deviceID', removedDevice.deviceID]);
        this.deviceSource.next(this.devices);
    };
    DeviceService.prototype.toggle = function (device, index) {
        this.feathersService.update(device.deviceID, device);
    };
    return DeviceService;
}());
DeviceService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__auth_service__["a" /* AuthService */]) === "function" && _a || Object])
], DeviceService);

var _a;
//# sourceMappingURL=device.service.js.map

/***/ }),

/***/ 253:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__device_service__ = __webpack_require__(252);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__device_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__devices_component__ = __webpack_require__(419);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__devices_component__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__users_service__ = __webpack_require__(255);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__users_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__users_component__ = __webpack_require__(424);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__users_component__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_service__ = __webpack_require__(60);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UsersService = (function () {
    // TODO: figure out how to not get a new token everytime a service is called...
    function UsersService(authService) {
        var _this = this;
        this.authService = authService;
        this.dataStore = { users: [] };
        this.users$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) { return _this.usersObserver = observer; }).share();
        // authService.auth$.subscribe(loggedIn => {
        this.feathersService = this.authService.getService('users');
        this.feathersService
            .on('created', function (user) { return _this.onCreated(user); })
            .on('updated', function (user) { return _this.onUpdated(user); })
            .on('removed', function (user) { return _this.onRemoved(user); });
        this.find();
        // })
    }
    UsersService.prototype.find = function () {
        var _this = this;
        this.feathersService.find({ query: {} })
            .then(function (users) {
            _this.dataStore.users = users;
            _this.usersObserver.next(_this.dataStore.users);
        });
    };
    UsersService.prototype.getIndex = function (id) {
        return __WEBPACK_IMPORTED_MODULE_3_lodash__["findIndex"](this.dataStore.users, function (user) { return user.id === id; });
    };
    UsersService.prototype.onCreated = function (user) {
        this.dataStore.users = this.dataStore.users.concat([user]);
        this.usersObserver.next(this.dataStore.users);
    };
    UsersService.prototype.onUpdated = function (user) {
        var index = this.getIndex(user.id);
        this.dataStore.users[index] = user;
        this.usersObserver.next(this.dataStore.users);
    };
    UsersService.prototype.onRemoved = function (user) {
        this.dataStore.users = __WEBPACK_IMPORTED_MODULE_3_lodash__["without"](this.dataStore.users, user);
        this.usersObserver.next(this.dataStore.users);
    };
    return UsersService;
}());
UsersService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__auth_service__["a" /* AuthService */]) === "function" && _a || Object])
], UsersService);

var _a;
//# sourceMappingURL=users.service.js.map

/***/ }),

/***/ 369:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 369;


/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(415);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 414:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_service__ = __webpack_require__(60);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
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
    function AppComponent(authService, iconRegistry, sanitizer) {
        this.authService = authService;
        this.iconRegistry = iconRegistry;
        this.sanitizer = sanitizer;
        this.atTop = true;
        iconRegistry.addSvgIcon('homejs', sanitizer.bypassSecurityTrustResourceUrl('assets/homejs.svg'));
    }
    AppComponent.prototype.scrolling = function (event) {
        console.log(event.target.value);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(698),
        styles: [__webpack_require__(653)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MdIconRegistry */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MdIconRegistry */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["e" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["e" /* DomSanitizer */]) === "function" && _c || Object])
], AppComponent);

var _a, _b, _c;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 415:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_calendar__ = __webpack_require__(444);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_material__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__auth_guard_service__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__auth_service__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__devices__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_routing__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__users__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__keys_pipe__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__devices_sensor_sensor_component__ = __webpack_require__(420);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_11__app_routing__["a" /* routedComponents */],
            __WEBPACK_IMPORTED_MODULE_13__keys_pipe__["a" /* KeysPipe */],
            __WEBPACK_IMPORTED_MODULE_14__devices_sensor_sensor_component__["a" /* SensorComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2_angular_calendar__["CalendarModule"].forRoot(),
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_material__["a" /* MaterialModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_11__app_routing__["b" /* routing */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_8__auth_guard_service__["a" /* AuthGuard */],
            __WEBPACK_IMPORTED_MODULE_9__auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_10__devices__["a" /* DeviceService */],
            __WEBPACK_IMPORTED_MODULE_6__angular_material__["b" /* MdSnackBar */],
            __WEBPACK_IMPORTED_MODULE_12__users__["a" /* UsersService */],
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_guard_service__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__calendar__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__devices__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__users__ = __webpack_require__(254);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return routing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routedComponents; });






var appRoutes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_4__login__["a" /* LoginComponent */] },
    { path: 'devices', component: __WEBPACK_IMPORTED_MODULE_3__devices__["b" /* DevicesComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__auth_guard_service__["a" /* AuthGuard */]] },
    { path: 'users', component: __WEBPACK_IMPORTED_MODULE_5__users__["b" /* UsersComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__auth_guard_service__["a" /* AuthGuard */]] },
    { path: 'calendar', component: __WEBPACK_IMPORTED_MODULE_2__calendar__["a" /* CalendarComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__auth_guard_service__["a" /* AuthGuard */]] },
    { path: '**', redirectTo: '' },
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forRoot(appRoutes);
var routedComponents = [
    __WEBPACK_IMPORTED_MODULE_2__calendar__["a" /* CalendarComponent */],
    __WEBPACK_IMPORTED_MODULE_3__devices__["b" /* DevicesComponent */],
    __WEBPACK_IMPORTED_MODULE_5__users__["b" /* UsersComponent */],
    __WEBPACK_IMPORTED_MODULE_4__login__["a" /* LoginComponent */],
];
//# sourceMappingURL=app.routing.js.map

/***/ }),

/***/ 417:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var CalendarComponent = (function () {
    function CalendarComponent() {
        this.events = [];
        this.viewDate = new Date();
        // weekdays = moment.weekdaysShort()
        // tiles: Array<any>
        // ngOnInit() {
        //   this.tiles = _.times(31, iter => {
        //     return {
        //       text: iter + 1,
        //       cols: 1,
        //       rows: 1,
        //       color: 'lightpink',
        //       state: 'inactive',
        //     }
        //   })
        // }
        // enter(tile: any): void {
        //   tile.state = 'active'
        // }
        // leave(tile: any): void {
        //   tile.state = 'inactive'
        // }
    }
    return CalendarComponent;
}());
CalendarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: 'app-calendar',
        template: __webpack_require__(699),
        styles: [__webpack_require__(654)],
    })
], CalendarComponent);

//# sourceMappingURL=calendar.component.js.map

/***/ }),

/***/ 418:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calendar_component__ = __webpack_require__(417);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__calendar_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 419:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__device_service__ = __webpack_require__(252);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DevicesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DevicesComponent = (function () {
    function DevicesComponent(deviceService, snackBar) {
        var _this = this;
        this.deviceService = deviceService;
        this.snackBar = snackBar;
        this.devices = [];
        this.connection = deviceService.devices$.subscribe(function (devices) { return _this.devices = devices; });
    }
    DevicesComponent.prototype.toggle = function (device, index) {
        this.deviceService.toggle(device, index);
        var snackBarRef = this.snackBar.open('Pushed new state to device', null, { duration: 1000 });
        snackBarRef.afterOpened().subscribe(function () { return console.log('snackBar closed'); });
    };
    DevicesComponent.prototype.ngOnDestroy = function () {
        this.connection.unsubscribe();
    };
    return DevicesComponent;
}());
DevicesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: 'app-devices',
        template: __webpack_require__(700),
        styles: [__webpack_require__(655)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__device_service__["a" /* DeviceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__device_service__["a" /* DeviceService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MdSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MdSnackBar */]) === "function" && _b || Object])
], DevicesComponent);

var _a, _b;
//# sourceMappingURL=devices.component.js.map

/***/ }),

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SensorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SensorComponent = (function () {
    function SensorComponent() {
    }
    Object.defineProperty(SensorComponent.prototype, "component", {
        set: function (component) {
            this._component = component;
        },
        enumerable: true,
        configurable: true
    });
    return SensorComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Input */])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], SensorComponent.prototype, "component", null);
SensorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: 'app-sensor',
        template: "<span [@growShrink]=\"'in'\">\n    <strong>{{_component.name}}:</strong> {{_component.controlState}}\n    <span [ngSwitch]=\"_component?.units\">\n      <span *ngSwitchCase=\"'percent'\">%</span>\n      <span *ngSwitchCase=\"'celsius'\">&deg;C</span>\n    </span>\n  </span>",
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* trigger */])('growShrink', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* state */])('in', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* style */])({ transform: 'scale(1)', opacity: 1 })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* transition */])('void => *', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* style */])({ transform: 'scale(0)', opacity: 0 }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_25" /* group */])([
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* animate */])('1.3s ease', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* style */])({ transform: 'scale(1)' })),
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* animate */])('1.3s ease', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* style */])({ opacity: 1 })),
                    ])
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* transition */])('* => void', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_25" /* group */])([
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* animate */])('1.3s ease', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* style */])({ transform: 'scale(0)' })),
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* animate */])('1.3s ease', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* style */])({ opacity: 0 }))
                    ])
                ])
            ])
        ],
    }),
    __metadata("design:paramtypes", [])
], SensorComponent);

//# sourceMappingURL=sensor.component.js.map

/***/ }),

/***/ 421:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeysPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var KeysPipe = (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value, args) {
        return __WEBPACK_IMPORTED_MODULE_1_lodash__["keys"](value);
    };
    return KeysPipe;
}());
KeysPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* Pipe */])({ name: 'keys' })
], KeysPipe);

//# sourceMappingURL=keys.pipe.js.map

/***/ }),

/***/ 422:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login_component__ = __webpack_require__(423);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__login_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 423:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(60);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
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
        // this.authService.logout()
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        // this.loading = true
        this.authService.login(this.model.username, this.model.password)
            .subscribe(function (result) {
            if (result) {
                // login successful
                console.log('login successful');
                _this.loading = false;
                _this.router.navigate(['/users'])
                    .then(function (didRoute) { return console.log("redirection " + (didRoute ? 'succeeded' : 'failed')); })
                    .catch(console.warn);
            }
            else {
                // login failed
                console.log('login failed', result);
                _this.error = _this.authService.message;
                _this.loading = false;
            }
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: 'app-login',
        template: __webpack_require__(701),
        styles: [__webpack_require__(656)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === "function" && _b || Object])
], LoginComponent);

var _a, _b;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 424:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__users_service__ = __webpack_require__(255);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UsersComponent = (function () {
    function UsersComponent(usersService) {
        this.usersService = usersService;
    }
    UsersComponent.prototype.ngOnInit = function () { };
    return UsersComponent;
}());
UsersComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: 'app-users',
        template: __webpack_require__(702),
        styles: [__webpack_require__(657)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__users_service__["a" /* UsersService */]) === "function" && _a || Object])
], UsersComponent);

var _a;
//# sourceMappingURL=users.component.js.map

/***/ }),

/***/ 425:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(706);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_feathers_client__ = __webpack_require__(662);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_feathers_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_feathers_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_socket_io_client__ = __webpack_require__(948);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_socket_io_client__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
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
    function AuthService(router) {
        var _this = this;
        this.router = router;
        // private _url: string = 'http://localhost:3030'
        this.authenticated = false;
        this.authSource = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](this.authenticated);
        this.auth$ = this.authSource.asObservable().skipWhile(function (x) { return x === false; }).share();
        this.message = '';
        this.socket = __WEBPACK_IMPORTED_MODULE_6_socket_io_client__('/');
        this.feathersApp = __WEBPACK_IMPORTED_MODULE_5_feathers_client__()
            .configure(__WEBPACK_IMPORTED_MODULE_5_feathers_client__["socketio"](this.socket))
            .configure(__WEBPACK_IMPORTED_MODULE_5_feathers_client__["hooks"]())
            .configure(__WEBPACK_IMPORTED_MODULE_5_feathers_client__["authentication"]({ storage: localStorage }));
        this.feathersApp.authenticate().then(function () {
            _this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            _this.authenticated = true;
            _this.authSource.next(_this.authenticated);
            router.navigate(['/users']);
        }).catch(function (error) {
            // if (error.code === 401) {
            router.navigate(['/login']);
            // }
            console.error(error);
        });
    }
    AuthService.prototype.login = function (username, password) {
        var _this = this;
        this.feathersApp.configure(__WEBPACK_IMPORTED_MODULE_5_feathers_client__["authentication"]({ storage: localStorage }));
        return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].fromPromise(this.feathersApp.authenticate({
            type: 'local',
            username: username,
            password: password
        }))
            .map(function (result) {
            _this.token = result && result.token;
            _this.currentUser = result.data;
            localStorage.setItem('currentUser', JSON.stringify(_this.currentUser));
            _this.authenticated = _this.token ? true : false;
            return _this.authenticated;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.logout = function () {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('feathers-jwt');
        this.currentUser = null;
        this.authenticated = false;
        this.router.navigate(['/login']);
    };
    AuthService.prototype.handleError = function (err) {
        var errMsg = err.message || err.status ?
            err.status + " - " + err.statusTest :
            'Server error';
        return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].throw(errMsg);
    };
    AuthService.prototype.getService = function (route) {
        return this.feathersApp.service(route);
    };
    return AuthService;
}());
AuthService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === "function" && _a || Object])
], AuthService);

var _a;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 653:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(42)();
// imports


// module
exports.push([module.i, ".card-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: column nowrap;\n          flex-flow: column nowrap;\n  padding: 16px;\n  padding-top: 80px;\n  overflow: auto;\n}\n\n.sidenav-container {\n  width: 100%;\n  height: 300px;\n  border: 1px solid rgba(0, 0, 0, 0.5);\n}\n\n.sidenav-container md-sidenav {\n  /*max-width: 200px;*/\n  padding: 16px;\n  padding-top: 80px;\n  /*overflow: hidden;*/\n}\n\n.sidenav-container .md-sidenav-content,\n.sidenav-container md-sidenav {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  overflow: visible;\n}\n\n.sidenav-container { min-height: 100%; }\n\n.toolbar {\n  position: fixed;\n  z-index: 1;\n  box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);\n}\n\n.avatar {\n  height: 45px;\n  width: 45px;\n  border-radius: 100%;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 654:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(42)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 655:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(42)();
// imports


// module
exports.push([module.i, "md-slide-toggle {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 656:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(42)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 657:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(42)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 698:
/***/ (function(module, exports) {

module.exports = "<md-toolbar color=\"primary\" shadowOnScoll=\"atTop\" class=\"toolbar\">\n\t<button md-icon-button (click)=\"nav.toggle()\">\n\t\t\t<md-icon>menu</md-icon>\n\t\t</button>\n\t<md-icon svgIcon=\"homejs\"></md-icon>\n\t<span>HomeJS</span>\n\t<span class=\"fill\"></span>\n\t<button md-button *ngIf=\"authService.currentUser\" routerLink=\"/users\">{{authService.currentUser.firstName}}</button>\n\t<span *ngIf=\"authService.currentUser?.picture\"><img [src]=\"authService.currentUser.picture\" class=\"avatar\"></span>\n</md-toolbar>\n\n<md-sidenav-container class=\"sidenav-container\" (scroll)=\"scrolling($event)\">\n\t\n\t<md-sidenav #nav mode=\"side\">\n\t\t<div class=\"scrolling-content\">\n\t\t\t<div *ngIf=\"authService.authenticated\"><button md-button routerLink=\"/devices\">Devices</button></div>\n\t\t\t<div *ngIf=\"authService.authenticated\"><button md-button routerLink=\"/calendar\">Calendar</button></div>\n\t\t</div>\n\t</md-sidenav>\n\n\t<div class=\"card-container scrolling-content\">\n\t\t<router-outlet></router-outlet>\n\t</div>\n</md-sidenav-container>"

/***/ }),

/***/ 699:
/***/ (function(module, exports) {

module.exports = "<!--<iframe src=\"https://calendar.google.com/calendar/embed?src=michaelrobison168%40gmail.com&ctz=America/Denver\" style=\"border: 0\" width=\"800\" height=\"600\" frameborder=\"0\" scrolling=\"no\"></iframe>-->\n\n<!--<md-grid-list cols=\"7\" rowHeight=\"100px\">\n  <md-grid-tile *ngFor=\"let tile of tiles\" colspan=\"7\" rowspan=\"5\" [style.background]=\"'lightblue'\">num</md-grid-tile>\n</md-grid-list>-->\n<!--<md-grid-list cols=\"7\" rowHeight=\"20px\">\n  <md-grid-tile *ngFor=\"let weekday of weekdays\" [colspan]=\"'1'\" [rowspan]=\"'1'\">{{weekday}}</md-grid-tile>\n</md-grid-list>\n\n<md-grid-list cols=\"7\" rowHeight=\"1:1\">\n  <md-grid-tile *ngFor=\"let tile of tiles\" [colspan]=\"tile.cols\" [rowspan]=\"tile.rows\" [style.background]=\"tile.color\" [@tileState]=\"tile.state\"\n    (mouseenter)=\"enter(tile)\" (mouseleave)=\"leave(tile)\">\n    {{tile.text}}\n    </md-grid-tile>\n</md-grid-list>-->\n\n<md-button-toggle-group #group=\"mdButtonToggleGroup\" >\n  <md-button-toggle value=\"month\" [checked]=\"true\">Month</md-button-toggle>\n  <md-button-toggle value=\"week\">Week</md-button-toggle>\n  <md-button-toggle value=\"day\">Day</md-button-toggle>\n</md-button-toggle-group>\n\n<div class=\"example-selected-value\">Selected value: {{group.value}}</div>\n\n<div [ngSwitch]=\"group.value\">\n  <mwl-calendar-month-view *ngSwitchCase=\"'month'\" [viewDate]=\"viewDate\" [events]=\"events\"></mwl-calendar-month-view>\n  <mwl-calendar-week-view *ngSwitchCase=\"'week'\" [viewDate]=\"viewDate\" [events]=\"events\"></mwl-calendar-week-view>\n  <mwl-calendar-day-view *ngSwitchCase=\"'day'\" [viewDate]=\"viewDate\" [events]=\"events\"></mwl-calendar-day-view>\n</div>"

/***/ }),

/***/ 700:
/***/ (function(module, exports) {

module.exports = "<md-card *ngIf=\"devices.length === 0\">\n  <md-card-title>No Devices</md-card-title>\n  <md-card-content>Any devices connected to your HomeJS system will appear here</md-card-content>\n</md-card>\n<md-card *ngFor=\"let device of devices\">\n  <md-card-title>{{device.name || device.deviceID}}</md-card-title>\n  <md-card-content>{{device.deviceType}}</md-card-content>\n  <div *ngFor=\"let component of device.components; let i = index\">\n    <md-slide-toggle *ngIf=\"component.type === 'toggle'\" color=\"accent\" [(ngModel)]=\"component.controlState\" (change)=\"toggle(device, i)\"\n      [mdTooltip]=\"'Slide to toggle ' + device.name || device.deviceID\" mdTooltipPosition=\"right\"></md-slide-toggle>\n    <app-sensor *ngIf=\"component.type === 'sensor'\" [component]=\"component\"></app-sensor>\n  </div>\n</md-card>"

/***/ }),

/***/ 701:
/***/ (function(module, exports) {

module.exports = "<md-card>\n  <md-card-title>Login</md-card-title>\n  <md-card-content>\n    <!--<form id=\"login-form\" name=\"login-form\" (ngSubmit)=\"f.form.valid && login()\" #f=\"ngForm\" novalidate>-->\n    <form id=\"login-form\" name=\"login-form\" (ngSubmit)=\"login()\" #f=\"ngForm\" novalidate>\n      <div><md-input placeholder=\"username\" name=\"username\" [(ngModel)]=\"model.username\" #username=\"ngModel\" required></md-input></div>\n      <div><md-input type=\"password\" placeholder=\"password\" name=\"password\" [(ngModel)]=\"model.password\" #password=\"ngModel\" required></md-input></div>\n      <div><button md-raised-button [disabled]=\"loading\" color=\"primary\">Login</button></div>\n    </form>\n    <md-spinner *ngIf=\"loading\"></md-spinner>\n    <div *ngIf=\"error\">{{error}}</div>\n  </md-card-content>\n</md-card>"

/***/ }),

/***/ 702:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-6 col-md-offset-3\">\n    <h1>Home</h1>\n    <p>You're logged in with JWT!!</p>\n    Users from secure api end point:\n    <ul>\n        <li *ngFor=\"let user of (usersService.users$ | async)?.data\">{{user.firstName}} {{user.lastName}}</li>\n    </ul>\n    <p><a [routerLink]=\"['/login']\">Logout</a></p>\n</div>"

/***/ }),

/***/ 956:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 957:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(370);


/***/ })

},[957]);
//# sourceMappingURL=main.bundle.js.map