window.angular.module("cabi.account", [ "cabi.shared" ]), window.angular.module("cabi.blog", [ "ngSanitize", "ngCookies" ]), 
function(angular, CABI_STYLIST_INFO) {
    angular.module("cabi.browseLook", [ "btford.modal", "cabi.quicklook", "ngSanitize", "pascalprecht.translate", "slick" ]).config(function($translateProvider) {
        $translateProvider.translations("en.brand", {
            BROWSE_LOOK_LABEL: "Shop This Look"
        }), $translateProvider.translations("en.replicated", {
            BROWSE_LOOK_LABEL: "Shop This Look"
        }), $translateProvider.preferredLanguage(angular.isDefined(CABI_STYLIST_INFO) ? "en.replicated" : "en.brand");
    });
}(window.angular, window.CABI_STYLIST_INFO), window.angular.module("cabi.cabi-cuties", [ "ui.router", "angularModalService", "cabi.browseLook" ]).config([ "$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    if (-1 === window.location.href.indexOf("/cabi-cuties")) return !1;
    $stateProvider.state({
        name: "cabi_cuties",
        url: "/"
    }).state({
        name: "cabi_cuties.detail",
        url: "view/:id",
        params: {
            collection: null
        }
    });
} ]), function(angular) {
    function CabiTapVideoPlayerController($timeout) {
        var $ctrl = this;
        $ctrl.$onInit = function() {
            $ctrl.poster = window.videoLoop, $ctrl.videos = [ {
                video_id: "L22i3F8MH8E",
                image: "wp-content/uploads/2017/01/cabitv-whatiscabi.jpg",
                title: "cabi Tap"
            } ], $ctrl.autoplay = {
                value: !1
            };
        }, $ctrl.onPlay = function($event) {
            $ctrl.autoplay = {
                value: !0
            };
            var videos = angular.extend([], $ctrl.videos);
            angular.forEach(videos, function(video) {
                video.playing = $event.video === video;
            }), $ctrl.videos = videos;
        }, jQuery("body").on("youtube", function(e, data) {
            if ("ended" === data.state) !function() {
                var currentIdx;
                if (angular.forEach($ctrl.videos, function(video, i) {
                    if (video.playing) currentIdx = parseInt(i);
                }), currentIdx < $ctrl.videos.length - 1) console.log(currentIdx), $timeout(function() {
                    console.log("Next"), $ctrl.onPlay({
                        video: $ctrl.videos[currentIdx + 1]
                    });
                }); else $timeout(function() {
                    console.log("restart"), $ctrl.onPlay({
                        video: $ctrl.videos[0]
                    }), $ctrl.autoplay = {
                        value: !1
                    };
                });
            }();
        });
    }
    CabiTapVideoPlayerController.$inject = [ "$timeout" ], angular.module("cabi-tap", []).component("cabiTapVideoPlayer", {
        controller: CabiTapVideoPlayerController,
        template: '<video-player poster="$ctrl.poster" videos="$ctrl.videos" on-play="$ctrl.onPlay($event)" autoplay="$ctrl.autoplay"></video-player>'
    });
}(window.angular), angular.module("cabi.cart", [ "cabi.ecommerce", "btford.modal" ]), 
angular.module("cabi.catalog", [ "ngAnimate", "cabi.shared" ]).filter("to_trusted", [ "$sce", function($sce) {
    return function(text) {
        return $sce.trustAsHtml(text);
    };
} ]), window.angular.module("cabi.contextual-email-promotes", [ "ngAnimate", "angularModalService", "cabi.mailinglist", "cabi.ui" ]), 
window.angular.module("cabi.create-cultivate", [ "ngAnimate", "angularModalService", "cabi.mailinglist", "cabi.ui" ]), 
function(angular) {
    "use strict";
    angular.module("angular-preload-image", []), angular.module("angular-preload-image").factory("preLoader", function() {
        return function(url, successCallback, errorCallback) {
            angular.element(new Image()).bind("load", function() {
                successCallback();
            }).bind("error", function() {
                errorCallback();
            }).attr("src", url);
        };
    }), angular.module("angular-preload-image").directive("preloadImage", [ "preLoader", function(preLoader) {
        return {
            restrict: "A",
            terminal: !0,
            priority: 100,
            link: function(scope, element, attrs) {
                scope.default = attrs.defaultImage || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wEWEygNWiLqlwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAMSURBVAjXY/j//z8ABf4C/tzMWecAAAAASUVORK5CYII=", 
                attrs.$observe("ngSrc", function() {
                    var url = attrs.ngSrc;
                    attrs.$set("src", scope.default), preLoader(url, function() {
                        console.log(url), attrs.$set("src", url);
                    }, function() {
                        if (void 0 != attrs.fallbackImage) attrs.$set("src", attrs.fallbackImage);
                    });
                });
            }
        };
    } ]), angular.module("angular-preload-image").directive("preloadBgImage", [ "preLoader", function(preLoader) {
        return {
            restrict: "A",
            link: function(scope, element, attrs) {
                if (void 0 != attrs.preloadBgImage) scope.default = attrs.defaultImage || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wEWEygNWiLqlwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAMSURBVAjXY/j//z8ABf4C/tzMWecAAAAASUVORK5CYII=", 
                attrs.$observe("preloadBgImage", function() {
                    element.css({
                        "background-image": 'url("' + scope.default + '")'
                    }), preLoader(attrs.preloadBgImage, function() {
                        element.css({
                            "background-image": 'url("' + attrs.preloadBgImage + '")'
                        });
                    }, function() {
                        if (void 0 != attrs.fallbackImage) element.css({
                            "background-image": 'url("' + attrs.fallbackImage + '")'
                        });
                    });
                });
            }
        };
    } ]);
}(angular), angular.module("cabi.directives.profileDropdown", [ "cabi.auth" ]), 
angular.module("cabi.directives.sendConsultantEmail", []), angular.module("cabi.directives.sizeChart", []), 
function(angular, window) {
    angular.module("cabi.ecommerce.components", [ "cabi.api", "cabi.ecommerce.filters", "cabi.shared" ]).constant("COMPONENT_URI", window.TEMPLATE_DIR + "/assets/js/angular/ecommerce/components");
}(angular, window), function(angular) {
    angular.module("cabi.analytics", []).service("Analytics", [ "$window", function($window) {
        var exports = {
            ga: function() {
                if (angular.isFunction($window.ga)) $window.ga.apply(arguments); else console.log("Google Analytics error", arguments);
            },
            gaq: function(data) {
                if (angular.isObject($window._gaq) || !angular.isFunction($window._gaq.push)) _gaq.push(data); else console.log("Google Analytics error", data);
            },
            sendEvent: function(fieldsObject) {
                var fields = [ "_trackEvent" ];
                if (angular.isDefined(fieldsObject.eventCategory)) fields.push(fieldsObject.eventCategory);
                if (angular.isDefined(fieldsObject.eventAction)) fields.push(fieldsObject.eventAction);
                if (angular.isDefined(fieldsObject.eventLabel)) fields.push(fieldsObject.eventLabel);
                if (angular.isDefined(fieldsObject.eventValue)) fields.push(Math.round(fieldsObject.eventValue));
                exports.ga(fields);
            }
        };
        return exports;
    } ]);
}(angular), function() {
    var ApiAdapters = angular.module("cabi.api.adapters", [ "cabi.schemas" ]);
    ApiAdapters.constant("API_URL", window.AJAX_URL + "?action=clio_api"), ApiAdapters.factory("cabiAdapter", [ "$http", "$q", "API_URL", "errorEnum", "Schemas", function($http, $q, API_URL, errorEnum, Schemas) {
        var buildUrl = function(method, query, requestType, enableNullAndFalse) {
            switch (requestType) {
              case "GET":
                var queryString = function(obj, enableNullAndFalse) {
                    var tempObj = {};
                    if (angular.isUndefined(enableNullAndFalse)) enableNullAndFalse = !1;
                    if (angular.isObject(obj.params)) angular.forEach(obj.params, function(value, key) {
                        if (!enableNullAndFalse) {
                            if (0 !== value && !value) return;
                            tempObj[key] = value;
                        } else tempObj[key] = value;
                    }), obj.params = tempObj;
                    return jQuery.param(obj);
                }({
                    params: query
                }, enableNullAndFalse);
                return API_URL + "&endpoint=" + method + "&" + queryString;

              default:
                return API_URL + "&endpoint=" + method;
            }
        }, serializer = function(method, data) {
            var _data = data, schema = Schemas[method];
            if (angular.isObject(schema)) angular.forEach(schema, function(value, key) {
                if (!angular.isDefined(_data[key])) return !1;
                if (angular.isFunction(value)) _data[key] = value(_data[key], _data);
            });
            return _data;
        };
        return {
            get: function(method, query, enableNullAndFalse) {
                var defer = $q.defer(), url = buildUrl(method, query, "GET", enableNullAndFalse);
                return $http.get(url).then(function(result) {
                    var data;
                    if (angular.isDefined(result.data.error)) return defer.reject(function(error) {
                        var _error = null;
                        if (angular.forEach(errorEnum, function(errorObject) {
                            if (!_error) if (errorObject.code == error.code) if (_error = errorObject, angular.isDefined(errorObject.message)) _error.message = errorObject.message; else _error.message = error.message;
                        }), !_error) (_error = errorEnum.GENERAL).message = error.message ? error.message : errorEnum.GENERAL.message;
                        return _error;
                    }(result.data.error) || result.data.error);
                    if ("CreateUpdateAddress" == method) if (result.data.cartData) data = serializer("GetCart", result.data); else data = serializer("MyProfile", result.data); else if ("CreateUpdateCreditCard" == method) if (result.data.cartData) data = serializer("GetCart", result.data); else data = serializer("CreateUpdateCreditCard", result.data); else if (result.data.cartData) data = serializer("GetCart", result.data); else data = serializer(method, result.data);
                    return defer.resolve(data);
                }, function(error) {
                    return defer.reject(error);
                }), defer.promise;
            }
        };
    } ]);
}(), angular.module("cabi.api", [ "cabi.api.service" ]), angular.module("cabi.api.service", [ "cabi.api.adapters", "cabi.constants" ]).constant("apiURL", window.AJAX_URL + "?action=clio_api"), 
angular.module("cabi.ecommorce.checkout", [ "cabi.notification", "cabi.api", "cabi.auth", "cabi.ecommerce.filters" ]), 
angular.module("cabi.ecommerce.confirmation", [ "cabi.api" ]), angular.module("cabi.constants", []), 
angular.module("cabi.directives", [ "ngDialog", "cabi.notification", "cabi.api", "cabi.auth" ]), 
function(angular, window) {
    var ecommerce = angular.module("cabi.ecommerce", [ "ui.router", "clio.templates", "cabi.utils", "cabi.directives", "cabi.auth", "cabi.ecommerce.login", "cabi.ecommerce.profile", "cabi.ecommorce.checkout", "cabi.ecommerce.confirmation", "cabi.analytics", "ngSanitize" ]).constant("VIEW_PATH", "../assets/js/angular/ecommerce/_views");
    if (0 === window.location.pathname.indexOf("/account")) ecommerce.config([ "$stateProvider", "$urlRouterProvider", "$logProvider", "VIEW_PATH", function($stateProvider, $urlRouterProvider, $logProvider, VIEW_PATH) {
        $logProvider.debugEnabled(!0), $urlRouterProvider.rule(function($injector, $location) {
            var path = $location.path();
            if ("/" === path[path.length - 1]) return path.substr(0, path.length - 1);
        }), $urlRouterProvider.otherwise("/"), $stateProvider.state("profile", {
            url: "/",
            controller: "profileController",
            templateUrl: VIEW_PATH + "/profile.html",
            data: {
                protected: !0,
                roles: [ "customer" ]
            }
        }).state("login", {
            url: "/login?redirectTo",
            controller: "loginController",
            templateUrl: VIEW_PATH + "/login.html",
            data: {
                protected: !1
            }
        }).state("reset-password", {
            url: "/forgot",
            controller: "resetPasswordController",
            templateUrl: VIEW_PATH + "/resetPassword.html",
            data: {
                protected: !1
            }
        }).state("change-password", {
            url: "/change-password",
            controller: "changePasswordController",
            templateUrl: VIEW_PATH + "/changePassword.html",
            data: {
                protected: !1
            }
        }).state("create-account", {
            url: "/create-account?redirectTo",
            controller: "createAccountController",
            templateUrl: VIEW_PATH + "/createAccount.html",
            data: {
                protected: !1
            }
        }).state("checkout", {
            url: "/checkout",
            controller: "checkOutController",
            templateUrl: VIEW_PATH + "/checkout.html",
            data: {
                protected: !1,
                roles: [ "customer", "guest" ]
            },
            resolve: {
                states: [ "stateService", function(stateService) {
                    return stateService.all();
                } ]
            }
        }).state("order-confirmation", {
            url: "/confirmation/:confirmationId",
            params: {
                giftCards: null,
                lastOrder: null,
                guestStylist: null,
                guestPartyId: null,
                firstName: null,
                lastName: null,
                guestCheckout: null
            },
            controller: "confirmationController",
            templateUrl: VIEW_PATH + "/orderConfirmation.html",
            data: {
                protected: !1,
                roles: [ "customer", "guest" ]
            }
        });
    } ]), ecommerce.run([ "$q", "$timeout", "$rootScope", "$state", "authServiceNew", "authService", "$transitions", function($q, $timeout, $rootScope, $state, authServiceNew, authService, $transitions) {
        authServiceNew.consultant = window.CABI_STYLIST_INFO, $transitions.onEnter({}, function(trans, options) {
            if (!authService.isAuthenticated() && options.data.protected) return authServiceNew.isLogin().then(function(result) {
                if ("login" == options.name) return $state.transitionTo("profile");
                $state.go(options.name);
            }, function() {
                if (options.data.protected) return $state.transitionTo("login", {
                    redirectTo: options.name
                });
            }); else if (authService.isAuthenticated() && "login" === options.name) return $state.transitionTo("profile");
        });
    } ]);
}(angular, window), function(angular) {
    angular.module("cabi.ecommerce.filters", []);
}(angular), angular.module("cabi.ecommerce.login", [ "cabi.notification", "cabi.auth", "cabi.api", "cabi.auth" ]), 
function(angular) {
    var notification = angular.module("cabi.notification", [ "angular-growl", "ngAnimate" ]);
    notification.service("Notification", [ "growl", function(growl) {
        return {
            notify: function(message) {
                growl.notify(message);
            },
            success: function(message) {
                growl.success('<i class="fa fa-check"></i> ' + message);
            },
            error: function(message) {
                growl.error('<i class="fa fa-exclamation-circle"></i> ' + message);
            }
        };
    } ]), notification.config([ "growlProvider", function(growlProvider) {
        growlProvider.globalTimeToLive(5e3), growlProvider.globalDisableCloseButton(!0), 
        growlProvider.globalDisableIcons(!0), growlProvider.globalDisableCountDown(!0);
    } ]), notification.run([ "$templateCache", function($templateCache) {
        "use strict";
        $templateCache.put("templates/growl/growl.html", '<div class="growl-container" ng-class=""><div class="growl-item alert" ng-repeat="message in growlMessages.directives[referenceId].messages" ng-class="alertClasses(message)" ng-click="stopTimeoutClose(message)"><button type="button" class="close" data-dismiss="alert" aria-hidden="true" ng-click="growlMessages.deleteMessage(message)" ng-show="!message.disableCloseButton">&times;</button><button type="button" class="close" aria-hidden="true" ng-show="showCountDown(message)">{{message.countdown}}</button><h4 class="growl-title" ng-show="message.title" ng-bind="message.title"></h4><div class="growl-message" ng-bind-html="message.text"></div></div></div>');
    } ]);
}(angular), angular.module("cabi.ecommerce.profile", [ "ngDialog", "cabi.auth", "cabi.notification", "cabi.api", "cabi.ecommerce.components" ]).config([ "ngDialogProvider", "growlProvider", function(ngDialogProvider) {
    ngDialogProvider.setDefaults({
        closeByDocument: !1,
        closeByEscape: !1
    });
} ]), function(angular) {
    angular.module("cabi.schemas", [ "cabi.constants" ]).service("Schemas", [ "creditCardTypes", "$filter", function(creditCardTypes, $filter) {
        var _getState = function(state) {
            if (!angular.isObject(state)) return {};
            if (state.stateProvinceGeoId) state.stateProvinceGeoObj = {
                code: state.stateProvinceGeoId
            };
            return state;
        }, _creditCardDataModel = function(creditCard) {
            var creditCartType = creditCard.cardType;
            if (angular.forEach(creditCardTypes, function(value) {
                if (value.id === creditCartType) creditCard.cardType = value;
            }), angular.isString(creditCard.expireDate)) {
                var expireDate = creditCard.expireDate.split("/", 2);
                creditCard.expMonth = {
                    id: parseInt(expireDate[0], 10),
                    name: parseInt(expireDate[0], 10)
                }, creditCard.expYear = {
                    id: expireDate[1],
                    name: expireDate[1].slice(-2)
                };
            }
            if (creditCard.billingAddress) creditCard.billingAddress = _getState(creditCard.billingAddress);
            return creditCard;
        }, cartDataModel = {
            cartData: function(cartData) {
                if (!angular.isObject(cartData)) return cartData;
                if (!angular.isArray(cartData.paymentMethods)) return cartData; else return angular.forEach(cartData.paymentMethods, function(paymentMethod) {
                    if ("CREDIT_CARD" == paymentMethod.paymentMethodTypeId) _creditCardDataModel(paymentMethod);
                }), cartData;
            },
            carrierShipmentMethodList: function(carrierShipmentMethodList) {
                var shippingMethod, shippingMethodKey, shippingMethodPrice, shippingTitle, _carrierShipmentMethodList = [], shipmentMethodTitles = {
                    "GROUND@UPS": "Standard (10-13 Business Days)",
                    "SECOND_DAY@UPS": "Expedited (2-4 Business Days)",
                    "NEXT_DAY@UPS": "Express (1-3 Business Days)"
                }, getShipmentMethodTitle = function(key) {
                    if (angular.isDefined(shipmentMethodTitles[key])) return shipmentMethodTitles[key]; else return !1;
                };
                if (!angular.isArray(carrierShipmentMethodList)) return _carrierShipmentMethodList;
                for (var i = 0; i < carrierShipmentMethodList.length; i++) shippingMethodKey = (shippingMethod = carrierShipmentMethodList[i]).shippingMethodKey, 
                shippingMethodPrice = $filter("currency")(shippingMethod.price, "$"), shippingTitle = getShipmentMethodTitle(shippingMethodKey) || shippingMethod.description, 
                shippingMethod.title = shippingTitle + " - " + shippingMethodPrice, _carrierShipmentMethodList.push(shippingMethod);
                return _carrierShipmentMethodList;
            },
            selectedShippingMethod: function(selectedShippingMethod, cartData) {
                if (!angular.isArray(cartData.carrierShipmentMethodList)) return selectedShippingMethod;
                for (var i = 0; i < cartData.carrierShipmentMethodList.length; i++) if (selectedShippingMethod == cartData.carrierShipmentMethodList[i].shippingMethodKey) return cartData.carrierShipmentMethodList[i];
                return selectedShippingMethod;
            },
            shippingAddress: function(shippingAddress) {
                return _getState(shippingAddress);
            }
        }, myProfileDataModel = {
            creditCards: function(creditCards) {
                var _creditCards = [];
                if (!angular.isArray(creditCards)) return _creditCards; else return angular.forEach(creditCards, function(creditCard) {
                    _creditCards.push(_creditCardDataModel(creditCard));
                }), _creditCards;
            },
            mailingAddress: function(mailingAddress) {
                return _getState(mailingAddress);
            },
            shippingAddress: function(shippingAddress, profile) {
                if (!angular.isObject(shippingAddress) && angular.isObject(profile.mailingAddress) && profile.mailingAddress.contactMechId) (shippingAddress = angular.copy(profile.mailingAddress)).copy = !0; else if (angular.isObject(shippingAddress) && angular.isObject(profile.mailingAddress)) if (shippingAddress.uniqueHash == profile.mailingAddress.uniqueHash) shippingAddress.copy = !0;
                return _getState(shippingAddress);
            }
        };
        return {
            GetStateProvinceList: {
                list: function(stateProvinceList) {
                    var _states = [];
                    return angular.forEach(stateProvinceList, function(state) {
                        _states.push({
                            name: state.geoName,
                            code: state.geoId
                        });
                    }), _states;
                }
            },
            ValidatePostalAddress: {
                matches: function(matches) {
                    if (!angular.isArray(matches) && !matches.length) return [];
                    for (var i = 0; i < matches.length; i++) matches[i] = _getState(matches[i]);
                    return matches;
                }
            },
            GetCart: cartDataModel,
            CreateUpdateAddress: cartDataModel,
            SetShippingAddressType: cartDataModel,
            SetShippingMethod: cartDataModel,
            MyProfile: myProfileDataModel,
            Login: myProfileDataModel,
            CreateUpdateCreditCard: {
                creditCard: _creditCardDataModel
            },
            RemoveCreditCard: myProfileDataModel
        };
    } ]);
}(angular), angular.module("cabi.utils", []).directive("compareTo", [ function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            }, scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
} ]), window.angular.module("cabi.exchange-and-return", [ "cabi.shared" ]), function() {
    function FashionExperienceVideoPlayerController($timeout) {
        var $ctrl = this;
        $ctrl.subTitle = "THE cabi FASHION EXPERIENCE", $ctrl.$onInit = function() {
            $ctrl.poster = window.videoLoop, $ctrl.videos = [ {
                video_id: "cxEZNbp5O84",
                image: "wp-content/themes/cabi/assets/images/host/poster-video.jpg",
                title: ""
            } ], $ctrl.autoplay = {
                value: !1
            };
        }, $ctrl.onPlay = function($event) {
            $ctrl.autoplay = {
                value: !0
            };
            var videos = angular.extend([], $ctrl.videos);
            angular.forEach(videos, function(video) {
                video.playing = $event.video === video;
            }), $ctrl.videos = videos;
        }, jQuery("body").on("youtube", function(e, data) {
            if ("ended" === data.state) !function() {
                var currentIdx;
                if (angular.forEach($ctrl.videos, function(video, i) {
                    if (video.playing) currentIdx = parseInt(i);
                }), currentIdx < $ctrl.videos.length - 1) console.log(currentIdx), $timeout(function() {
                    console.log("Next"), $ctrl.onPlay({
                        video: $ctrl.videos[currentIdx + 1]
                    });
                }); else $timeout(function() {
                    console.log("restart"), $ctrl.onPlay({
                        video: $ctrl.videos[0]
                    }), $ctrl.autoplay = {
                        value: !1
                    };
                });
            }();
        });
    }
    FashionExperienceVideoPlayerController.$inject = [ "$timeout" ];
    var FashionExperienceVideoPlayerComponent = {
        controller: FashionExperienceVideoPlayerController,
        template: '<video-player class="bg-transparent" poster="$ctrl.poster" videos="$ctrl.videos" sub-title="$ctrl.subTitle" on-play="$ctrl.onPlay($event)" autoplay="$ctrl.autoplay"></video-player>'
    };
    angular.module("cabi.fashionExperience", []).component("fashionExperienceVideoPlayer", FashionExperienceVideoPlayerComponent);
}(), window.angular.module("cabi.fashionShow", [ "ngAnimate", "ui.router" ]).value("EmailAddress", {
    value: null
}).run([ "$rootScope", "$window", function($rootScope, $window) {
    if ($rootScope.user = {}, $window.location.pathname.search("fashionshow") > -1) $window.fbAsyncInit = function() {
        FB.init({
            appId: window.FB_FASHION_SHOW_APP_ID,
            status: !0,
            cookie: !0,
            xfbml: !0,
            oauth: !1
        });
    };
} ]), window.angular.module("cabi.find-my-stylist", [ "cabi.shared" ]), function() {
    function FoundationVideoPlayerController($timeout) {
        var $ctrl = this;
        $ctrl.$onInit = function() {
            $ctrl.videos = [ {
                video_id: "SnGc9_jat8M",
                image: "wp-content/themes/cabi/assets/images/foundation/cover-765x430.jpg",
                title: "WHAT IS",
                subtitle: "W.E. are cabi?",
                playing: !0
            }, {
                video_id: "WzNTzYSbePg",
                image: "wp-content/uploads/cabi-templates/f18/foundation/yvette.jpg",
                title: "YVETTE'S STORY",
                subtitle: "See how W.E. are cabi is paying it forward."
            }, {
                video_id: "VjeSsOUEGME",
                image: "wp-content/uploads/cabi-templates/s19/foundation/rwanada-video-thumbnail.png",
                title: "W.E. are cabi | Kenya & Rwanda 2018",
                subtitle: "Cabi Stylists travel to Africa to meet Sister Entrepreneurs."
            }, {
                video_id: "y6n47kTwbC0",
                image: "wp-content/uploads/2018/01/heart-of-cabi.png",
                title: "HEART OF cabi",
                subtitle: "See how cabi Stylists serve and love their communities."
            } ], $ctrl.autoplay = {
                value: !1
            };
        }, $ctrl.onPlay = function($event) {
            $ctrl.autoplay = {
                value: !0
            };
            var videos = angular.extend([], $ctrl.videos);
            angular.forEach(videos, function(video) {
                video.playing = $event.video === video;
            }), $ctrl.videos = videos;
        }, jQuery("body").on("youtube", function(e, data) {
            if ("ended" === data.state) !function() {
                var currentIdx;
                if (angular.forEach($ctrl.videos, function(video, i) {
                    if (video.playing) currentIdx = parseInt(i);
                }), currentIdx < $ctrl.videos.length - 1) $timeout(function() {
                    $ctrl.onPlay({
                        video: $ctrl.videos[currentIdx + 1]
                    });
                }); else $timeout(function() {
                    $ctrl.onPlay({
                        video: $ctrl.videos[0]
                    }), $ctrl.autoplay = {
                        value: !1
                    };
                });
            }();
        });
    }
    FoundationVideoPlayerController.$inject = [ "$timeout" ];
    var FoundationVideoPlayerComponent = {
        controller: FoundationVideoPlayerController,
        template: '<video-player videos="$ctrl.videos" on-play="$ctrl.onPlay($event)" autoplay="$ctrl.autoplay"></video-player>'
    };
    angular.module("cabi.foundation", []).component("foundationVideoPlayer", FoundationVideoPlayerComponent);
}(), window.angular.module("cabi.homepage", []), angular.module("cabi.homeshow", []), 
window.angular.module("cabi.hot-flash", []).config([ "$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    if (-1 === window.location.href.indexOf("/hot-flashes")) return !1;
    $stateProvider.state({
        name: "hot_flashes",
        url: "/",
        component: "hotFlashList"
    }).state({
        name: "hot_flash",
        url: "/view/:id/",
        component: "hotFlashListItem",
        resolve: {
            object: [ "HotFlashService", "$stateParams", function(HotFlashService, $stateParams) {
                return HotFlashService.getOne($stateParams.id);
            } ]
        }
    }).state({
        name: "hot_flash_instructions",
        url: "/instructions",
        component: "hotFlashInstructions"
    }), $urlRouterProvider.otherwise("/");
} ]), window.angular.module("cabi.items-in-look", []), function() {
    function JoinUsVideoPlayerController($timeout) {
        var $ctrl = this;
        $ctrl.$onInit = function() {
            $ctrl.videos = [ {
                video_id: "-xoW5w1xUVk",
                image: "wp-content/uploads/cabi-templates/f18/career-overview/video-poster.jpg",
                title: "THE cabi CAREER OPPORTUNITY",
                playing: !0
            }, {
                video_id: "ZsT8rznOrAQ",
                image: "wp-content/uploads/cabi-templates/f18/career-overview/cabitv-whatiscabi.jpg",
                title: "WHAT IS cabi?"
            }, {
                video_id: "37nnFOyDjpY",
                image: "wp-content/uploads/cabi-templates/f18/career-overview/videoposter-defying.jpg",
                title: "OUR COMMUNITY, OUR CULTURE"
            }, {
                video_id: "MWQvxjMIkA8",
                image: "wp-content/uploads/cabi-templates/f18/career-overview/videoposter-tenets.jpg",
                title: "LEADING FORWARD"
            } ], $ctrl.autoplay = {
                value: !1
            };
        }, $ctrl.onPlay = function($event) {
            $ctrl.autoplay = {
                value: !0
            };
            var videos = angular.extend([], $ctrl.videos);
            angular.forEach(videos, function(video) {
                video.playing = $event.video === video;
            }), $ctrl.videos = videos;
        }, jQuery("body").on("youtube", function(e, data) {
            if ("ended" === data.state) !function() {
                var currentIdx;
                if (angular.forEach($ctrl.videos, function(video, i) {
                    if (video.playing) currentIdx = parseInt(i);
                }), currentIdx < $ctrl.videos.length - 1) console.log(currentIdx), $timeout(function() {
                    console.log("Next"), $ctrl.onPlay({
                        video: $ctrl.videos[currentIdx + 1]
                    });
                }); else $timeout(function() {
                    console.log("restart"), $ctrl.onPlay({
                        video: $ctrl.videos[0]
                    }), $ctrl.autoplay = {
                        value: !1
                    };
                });
            }();
        });
    }
    JoinUsVideoPlayerController.$inject = [ "$timeout" ];
    var JoinUsVideoPlayerComponent = {
        controller: JoinUsVideoPlayerController,
        template: '<video-player videos="$ctrl.videos" on-play="$ctrl.onPlay($event)" autoplay="$ctrl.autoplay"></video-player>'
    };
    angular.module("cabi.joinUs", []).component("joinUsVideoPlayer", JoinUsVideoPlayerComponent);
}(), window.angular.module("cabi.lead-form", [ "angularModalService" ]), function() {
    angular.module("cabi.localeRedirect", [ "btford.modal" ]).run([ "ipLookupService", "localeService", "$location", "currentDomainService", "currentLocaleService", "LocaleSelectModal", "$rootScope", function(ipLookupService, LocaleService, $location, CurrentDomain, CurrentLocale, LocaleSelectModal, $rootScope) {
        if (!window.CABI_CONSULTANT_IS_MICROSITE.length) {
            $rootScope.CurrentLocale = CurrentLocale;
            var domainLocale = LocaleService.getDomainLocale();
            if (angular.isDefined(QueryString.__locale)) CurrentLocale.set(QueryString.__locale), 
            CurrentDomain.set($location.host()); else if (angular.isUndefined(CurrentDomain.get())) ipLookupService.getInfo().then(function(response) {
                var country = response.data.country, locale = LocaleService.findLocaleByCode(country), invalidCountry = !1;
                if (angular.isUndefined(locale)) country = "US", locale = LocaleService.findLocaleByCode(country), 
                invalidCountry = !0;
                if (CurrentLocale.set(locale.code), CurrentDomain.set(locale.url), invalidCountry) LocaleSelectModal.activate({
                    source: {
                        source: "INVALID_LOCALE",
                        country: response.data.country,
                        city: response.data.city
                    }
                }); else if (domainLocale.code !== country) LocaleSelectModal.activate({
                    source: "WRONG_LOCALE"
                });
            }); else if (CurrentLocale.get() !== domainLocale.code) LocaleSelectModal.activate({
                source: "WRONG_LOCALE"
            });
        }
    } ]);
    var QueryString = function() {
        for (var query_string = {}, vars = window.location.search.substring(1).split("&"), i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (void 0 === query_string[pair[0]]) query_string[pair[0]] = decodeURIComponent(pair[1]); else if ("string" == typeof query_string[pair[0]]) {
                var arr = [ query_string[pair[0]], decodeURIComponent(pair[1]) ];
                query_string[pair[0]] = arr;
            } else query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
        return query_string;
    }();
}(), window.angular.module("cabi.looks", []), angular.module("cabi.mailinglist", []), 
function() {
    function NewArrivalsGraceVideoPlayerController($timeout) {
        var $ctrl = this;
        $ctrl.$onInit = function() {
            $ctrl.poster = window.videoLoop, $ctrl.videos = [ {
                video_id: "06QHjbT11hw",
                image: "wp-content/themes/cabi/assets/images/host/poster-video.jpg",
                title: ""
            } ], $ctrl.autoplay = {
                value: !1
            };
        }, $ctrl.onPlay = function($event) {
            $ctrl.autoplay = {
                value: !0
            };
            var videos = angular.extend([], $ctrl.videos);
            angular.forEach(videos, function(video) {
                video.playing = $event.video === video;
            }), $ctrl.videos = videos;
        }, jQuery("body").on("youtube", function(e, data) {
            if ("ended" === data.state) !function() {
                var currentIdx;
                if (angular.forEach($ctrl.videos, function(video, i) {
                    if (video.playing) currentIdx = parseInt(i);
                }), currentIdx < $ctrl.videos.length - 1) console.log(currentIdx), $timeout(function() {
                    console.log("Next"), $ctrl.onPlay({
                        video: $ctrl.videos[currentIdx + 1]
                    });
                }); else $timeout(function() {
                    console.log("restart"), $ctrl.onPlay({
                        video: $ctrl.videos[0]
                    }), $ctrl.autoplay = {
                        value: !1
                    };
                });
            }();
        });
    }
    NewArrivalsGraceVideoPlayerController.$inject = [ "$timeout" ];
    var NewArrivalsGraceVideoPlayerComponent = {
        controller: NewArrivalsGraceVideoPlayerController,
        template: '<video-player class="bg-transparent" poster="$ctrl.poster" videos="$ctrl.videos" on-play="$ctrl.onPlay($event)" autoplay="$ctrl.autoplay" muted></video-player>'
    };
    angular.module("cabi.newArrivalsGrace", []).component("newArrivalsGraceVideoPlayer", NewArrivalsGraceVideoPlayerComponent);
}(), function() {
    function NewArrivalsVideoPlayerController($timeout) {
        var $ctrl = this;
        $ctrl.$onInit = function() {
            $ctrl.poster = window.videoLoop, $ctrl.videos = [ {
                video_id: "FdQuN7FY6CA",
                image: "wp-content/themes/cabi/assets/images/host/poster-video.jpg",
                title: ""
            } ], $ctrl.autoplay = {
                value: !1
            };
        }, $ctrl.onPlay = function($event) {
            $ctrl.autoplay = {
                value: !0
            };
            var videos = angular.extend([], $ctrl.videos);
            angular.forEach(videos, function(video) {
                video.playing = $event.video === video;
            }), $ctrl.videos = videos;
        }, jQuery("body").on("youtube", function(e, data) {
            if ("ended" === data.state) !function() {
                var currentIdx;
                if (angular.forEach($ctrl.videos, function(video, i) {
                    if (video.playing) currentIdx = parseInt(i);
                }), currentIdx < $ctrl.videos.length - 1) console.log(currentIdx), $timeout(function() {
                    console.log("Next"), $ctrl.onPlay({
                        video: $ctrl.videos[currentIdx + 1]
                    });
                }); else $timeout(function() {
                    console.log("restart"), $ctrl.onPlay({
                        video: $ctrl.videos[0]
                    }), $ctrl.autoplay = {
                        value: !1
                    };
                });
            }();
        });
    }
    NewArrivalsVideoPlayerController.$inject = [ "$timeout" ];
    var NewArrivalsVideoPlayerComponent = {
        controller: NewArrivalsVideoPlayerController,
        template: '<video-player class="bg-transparent" poster="$ctrl.poster" videos="$ctrl.videos" on-play="$ctrl.onPlay($event)" autoplay="$ctrl.autoplay" muted></video-player>'
    };
    angular.module("cabi.newArrivals", []).component("newArrivalsVideoPlayer", NewArrivalsVideoPlayerComponent);
}(), angular.module("cabi.outfit", []), angular.module("cabi.product", []).config([ "$sceProvider", function($sceProvider) {
    $sceProvider.enabled(!1);
} ]), angular.module("cabi.quicklook", []), window.angular.module("cabi.shared", []), 
angular.module("ab.socialShare", [ "btford.modal" ]), window.angular.module("cabi.ui", [ "cabi.shared" ]), 
function($) {
    var VideoPlayer = {
        bindings: {
            autoplay: "<",
            poster: "<",
            videos: "<",
            onPlay: "&",
            subTitle: "<"
        },
        controller: function() {
            var autoplay_flag, $ctrl = this;
            $ctrl.$onChanges = function(changes) {
                if (changes.autoplay) autoplay_flag = changes.autoplay.currentValue.value ? "1" : "0";
                if (changes.videos) $ctrl.video_for_player = null, $ctrl.videos = angular.extend([], changes.videos.currentValue), 
                angular.forEach($ctrl.videos, function(video) {
                    if (video.playing) if ($ctrl.video_for_player = {
                        url: "/wp-content/plugins/cabi-youtube-embed/embed.php?youtube_id=" + video.video_id + "&autoplay=" + autoplay_flag
                    }, window.outerWidth < 1024) !function(video) {
                        if ($(".video-player__thumbnail--playing").length) {
                            var $li = $(".video-player__thumbnail--playing"), $ul = $(".video-player__thumbnail--playing").parent(), $default_li = $ul.find("li:not(.video-player__thumbnail--playing):first"), li_idx = parseInt($.map($ctrl.videos, function(video, i) {
                                if (video.playing) return i;
                            })[0]), scroll_left = 0 === li_idx ? 0 : $default_li.outerWidth() * (li_idx - 1) + $li.outerWidth() / 4 - 2 * parseInt($li.css("marginLeft"));
                            $ul.animate({
                                scrollLeft: scroll_left
                            }, 250);
                        }
                    }();
                });
            }, $ctrl.onPlayRequest = function(video) {
                if ($ctrl.poster = !1, video) $ctrl.onPlay({
                    $event: {
                        video: video
                    }
                }); else $ctrl.onPlay({
                    $event: {
                        video: $ctrl.videos[0]
                    }
                });
            }, $ctrl.hasMp4 = function() {
                return Array.isArray($ctrl.poster) && $ctrl.poster.length >= 2 && "object" == typeof $ctrl.poster[1] && $ctrl.poster[1].hasOwnProperty("mp4");
            }, $ctrl.hasWebm = function() {
                return Array.isArray($ctrl.poster) && $ctrl.poster.length >= 3 && "object" == typeof $ctrl.poster[2] && $ctrl.poster[1].hasOwnProperty("webm");
            }, $ctrl.hasOgg = function() {
                return Array.isArray($ctrl.poster) && $ctrl.poster.length >= 4 && "object" == typeof $ctrl.poster[3] && $ctrl.poster[1].hasOwnProperty("ogg");
            };
        },
        templateUrl: "/wp-content/themes/cabi/assets/js/angular/video-player/video-player.html"
    };
    angular.module("cabi").component("videoPlayer", VideoPlayer);
}(jQuery), angular.module("cabi.favorites", []), angular.module("clio.templates", []).run([ "$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("../assets/js/angular/account/account.html", '<div class="attached-ecomm"><login-gateway ng-if="$ctrl.isComponentActive($ctrl.components.loginGateway)" attrs="$ctrl.getAttrs()"></login-gateway><login-authenticate ng-if="$ctrl.isComponentActive($ctrl.components.loginAuthenticate)" attrs="$ctrl.getAttrs()"></login-authenticate><forgot-password ng-if="$ctrl.isComponentActive($ctrl.components.forgotPassword)" attrs="$ctrl.getAttrs()"></forgot-password><change-password ng-if="$ctrl.isComponentActive($ctrl.components.changePassword)" attrs="$ctrl.getAttrs()"></change-password><new-customer-registration ng-if="$ctrl.isComponentActive($ctrl.components.newCustomerRegistration)" attrs="$ctrl.getAttrs()"></new-customer-registration><existing-customer-registration ng-if="$ctrl.isComponentActive($ctrl.components.existingCustomerRegistration)" attrs="$ctrl.getAttrs()"></existing-customer-registration><already-logged-in ng-if="$ctrl.isComponentActive($ctrl.components.alreadyLoggedIn)" attrs="$ctrl.getAttrs()"></already-logged-in></div>'), 
    $templateCache.put("../assets/js/angular/account/components/already-logged-in/already-logged-in.html", '<div class="already-logged-in"><h2 class="title">You are already logged in</h2><div class="row"><button type="submit" class="btn btn-black montserrat btn-continue" ng-click="$ctrl.close()">Continue</button></div><div class="row"><a class="montserrat link-cancel" ng-click="$ctrl.logout()">Logout</a></div></div>'), 
    $templateCache.put("../assets/js/angular/account/components/change-password/change-password.html", '<div class="change-password"><form name="changePasswordForm" ng-submit="$ctrl.changePasswordAndLogin()" ng-if="$ctrl.attrs.from === $ctrl.componentsConstant.account.loginAuthenticate"><h2 class="title">Change password</h2><p class="subtitle">You are required to change your password for this email address.</p><div class="form-field"><custom-input type="password" name="pass" placeholder="current password *" ng-model="$ctrl.form.oldPassword" disabled="$ctrl.isLoading" required></custom-input><custom-input type="password" name="pass2" placeholder="new password *" ng-model="$ctrl.form.newPassword" disabled="$ctrl.isLoading" required></custom-input><custom-input type="password" name="pass3" placeholder="new password *" ng-model="$ctrl.form.confirmedNewPassword" disabled="$ctrl.isLoading" required></custom-input></div><p class="error" ng-if="$ctrl.error">{{$ctrl.error}}</p><div class="row"><button type="submit" class="ae-btn btn-continue" ng-disabled="changePasswordForm.$invalid || $ctrl.isLoading">Change password <span ng-show="$ctrl.isLoading" class="spinner ng-animate-disabled"></span></button></div></form><form name="resetPasswordForm" ng-submit="$ctrl.resetPassword()" ng-if="$ctrl.attrs.from === $ctrl.componentsConstant.account.forgotPassword"><h2 class="title">Set password</h2><p class="subtitle">We\'ve sent a verification code to your email address.<br>Check your inbox and enter the verification code below along with a new desired password.</p><div class="form-field"><custom-input type="text" name="pass" placeholder="verification code" ng-model="$ctrl.form.oldPassword" disabled="$ctrl.isLoading" required></custom-input><custom-input type="password" name="pass2" placeholder="new password" ng-model="$ctrl.form.newPassword" disabled="$ctrl.isLoading" required></custom-input><custom-input type="password" name="pass3" placeholder="new password" ng-model="$ctrl.form.confirmedNewPassword" disabled="$ctrl.isLoading" required></custom-input></div><p class="error" ng-if="$ctrl.error">{{$ctrl.error}}</p><div class="row"><button type="submit" class="ae-btn btn-continue" ng-disabled="resetPasswordForm.$invalid || $ctrl.isLoading">Set password <span ng-show="$ctrl.isLoading" class="spinner ng-animate-disabled"></span></button></div></form><form name="verifyRegisterCodeForm" ng-submit="$ctrl.validateRegisterCode()" ng-if="$ctrl.attrs.from === $ctrl.componentsConstant.account.newCustomerRegistration ||\n                 $ctrl.attrs.from === $ctrl.componentsConstant.account.existingCustomerRegistration"><h2 class="title">{{$ctrl.attrs.from === $ctrl.componentsConstant.account.newCustomerRegistration ? \'It looks like we already have your email address in our records\' : \'Verify email address\'}}</h2><p class="subtitle">We\'ve sent a verification code to your email address.<br>Check your inbox and enter the code below.</p><div class="form-field"><custom-input type="text" name="pass" placeholder="verification code" ng-model="$ctrl.form.oldPassword" disabled="$ctrl.isLoading" required></custom-input></div><p class="error" ng-if="$ctrl.error">{{$ctrl.error}}</p><div class="row"><button type="submit" class="ae-btn btn-continue" ng-disabled="verifyRegisterCodeForm.$invalid || $ctrl.isLoading">Verify <span ng-show="$ctrl.isLoading" class="spinner ng-animate-disabled"></span></button></div></form></div>'), 
    $templateCache.put("../assets/js/angular/account/components/existing-customer-registration/existing-customer-registration.html", '<div class="existing-customer-registration"><form name="existingCustomerRegistrationForm" ng-submit="$ctrl.continue()"><h2 class="title">Set a password</h2><div class="form-field"><custom-input type="text" name="firstName" placeholder="first name *" ng-model="$ctrl.form.firstName" disabled="$ctrl.isLoading" required></custom-input></div><div class="form-field"><custom-input type="text" name="lastName" placeholder="last name *" ng-model="$ctrl.form.lastName" disabled="$ctrl.isLoading" required></custom-input></div><div class="form-field"><custom-input type="email" name="email" placeholder="email *" ng-model="$ctrl.form.email" disabled="$ctrl.isLoading" required></custom-input></div><div class="form-field"><custom-input type="password" name="password" placeholder="set password *" ng-model="$ctrl.form.password" disabled="$ctrl.isLoading" required></custom-input></div><div class="form-field"><custom-input type="password" name="confirmPassword" placeholder="confirm password *" ng-model="$ctrl.form.confirmPassword" disabled="$ctrl.isLoading" required></custom-input></div><div class="form-field align-left"><span class="custom-checkbox"><input type="checkbox" name="newsMail" id="wantsNewsMail" ng-model="$ctrl.form.wantsNewsMail" ng-disabled="$ctrl.isLoading"><label for="wantsNewsMail">Sign me up for exclusive emails on the latest fashion tips, cabi events, and Collection announcements.</label></span></div><p class="error" ng-if="$ctrl.error">{{$ctrl.error}}</p><div class="row"><button type="submit" class="ae-btn btn-continue" ng-disabled="existingCustomerRegistrationForm.$invalid || $ctrl.isLoading">Continue <span ng-show="$ctrl.isLoading" class="spinner ng-animate-disabled"></span></button></div></form><div class="row"><a class="montserrat link-cancel" ng-click="$ctrl.navigateToLogin()">I already have a profile</a></div></div>'), 
    $templateCache.put("../assets/js/angular/account/components/forgot-password/forgot-password.html", '<div class="forgot-password"><form name="forgotPasswordForm" ng-submit="$ctrl.getPassword()"><h2 class="title">Request / Reset password</h2><p class="subtitle">Enter your email address to receive instructions for setting a password</p><div class="form-field"><custom-input type="email" name="email" placeholder="your email address *" ng-model="$ctrl.form.email" disabled="$ctrl.isLoading" required></custom-input></div><p class="error" ng-if="$ctrl.error">{{$ctrl.error}}</p><div class="row"><button type="submit" class="ae-btn btn-continue" ng-disabled="forgotPasswordForm.$invalid || $ctrl.isLoading">Get password <span ng-show="$ctrl.isLoading" lass="spinner ng-animate-disabled"></span></button></div></form></div>'), 
    $templateCache.put("../assets/js/angular/account/components/login-authenticate/login-authenticate.html", '<div class="login-authenticate"><form name="loginAuthenticateForm" ng-submit="$ctrl.continue()"><h2 class="title">Welcome!</h2><p class="subtitle">Enter your password, or click the link below to request a password.</p><div class="form-field"><custom-input type="password" name="password" placeholder="password *" ng-model="$ctrl.form.password" disabled="$ctrl.isLoading" required></custom-input></div><p class="error" ng-if="$ctrl.error">{{$ctrl.error}}</p><div class="row"><button type="submit" class="ae-btn btn-continue" ng-disabled="loginAuthenticateForm.$invalid || $ctrl.isLoading">Continue <span ng-show="$ctrl.isLoading" class="spinner ng-animate-disabled"></span></button></div></form><div class="row"><a class="montserrat link-cancel" ng-click="$ctrl.requestPassword()">Request a password</a></div></div>'), 
    $templateCache.put("../assets/js/angular/account/components/login-gateway/login-gateway.html", '<div class="login-gateway"><div class="loading" ng-if="$ctrl.isFullLoading">Loading <span ng-show="$ctrl.isFullLoading" class="spinner ng-animate-disabled"></span></div><form name="loginGateWayForm" ng-if="!$ctrl.isFullLoading" ng-submit="$ctrl.continue()"><h2 class="title">{{$ctrl.attrs.module.loginTitle || \'Sign in / Create account\'}}</h2><p class="subtitle">Enter your email address to sign in or create a new account.</p><div class="form-field"><custom-input type="email" name="email" placeholder="your email address *" ng-model="$ctrl.form.email" disabled="$ctrl.isLoading" required></custom-input></div><div class="form-field align-left"><span class="custom-checkbox"><input type="checkbox" name="rememberMe" id="rememberMe" ng-model="$ctrl.form.rememberMe" ng-disabled="$ctrl.isLoading"><label for="rememberMe">Remember me</label></span></div>\x3c!-- country selector: visible only on brand site --\x3e<div class="row" ng-if="!$ctrl.isReplicatedSite"><custom-dropdown options="$ctrl.countries" ng-model="$ctrl.selectedCountry" on-change="$ctrl.changeCountry(model)" display-property="label" disabled="$ctrl.isLoading" required></custom-dropdown></div>\x3c!-- end of country selector --\x3e<p class="error" ng-if="$ctrl.error">{{$ctrl.error}}</p><div class="row"><button type="submit" class="ae-btn btn-continue" ng-disabled="loginGateWayForm.$invalid || $ctrl.isLoading">Continue <span ng-show="$ctrl.isLoading" class="spinner ng-animate-disabled"></span></button></div><div class="row" ng-if="!$ctrl.attrs.module.showGuestCheckout"><a class="montserrat link-cancel" ng-click="$ctrl.close()">Cancel</a></div><div class="row" ng-if="$ctrl.attrs.module.showGuestCheckout"><a class="montserrat link-cancel" ng-click="$ctrl.guestCheckout()">Checkout as a guest</a></div></form></div>'), 
    $templateCache.put("../assets/js/angular/account/components/new-customer-registration/new-customer-registration.html", '<div class="new-customer-registration"><form name="newCustomerRegistrationForm" ng-submit="$ctrl.continue()"><h2 class="title">New to cabi?</h2><p class="subtitle no-margin">Based on your email address, it looks like you&apos;re new to cabi.<br>Here\'s what you get when you create an account.</p><div class="horizontal-list"><div class="benefit"><i class="fa fa-heart benefit-icon"></i><div>save your favorites</div></div><div class="benefit"><i class="fa fa-cart-plus benefit-icon"></i><div>check out quicker</div></div><div class="benefit"><i class="fa fa-truck benefit-icon"></i><div>track orders easily</div></div></div><p class="subtitle second-subtitle">Plus, we\'ll connect you with a personal cabi Stylist in your area to help with sizing, returns, and offer styling tips for your cabi purchases.</p><div class="form-field"><custom-input type="text" name="firstName" placeholder="first name *" ng-model="$ctrl.form.firstName" disabled="$ctrl.isLoading" required></custom-input></div><div class="form-field"><custom-input type="text" name="lastName" placeholder="last name *" ng-model="$ctrl.form.lastName" disabled="$ctrl.isLoading" required></custom-input></div><div class="form-field"><custom-input type="email" name="email" placeholder="email address *" ng-model="$ctrl.form.email" disabled="$ctrl.isLoading" required></custom-input></div><div class="form-field"><phone-input type="text" name="phone" placeholder="your phone number (optional)" ng-model="$ctrl.form.phoneNumber" disabled="$ctrl.isLoading"></phone-input></div><div class="form-field" ng-if="!$ctrl.isReplicatedSite"><custom-input type="text" name="text" placeholder="your {{$ctrl.countryLabels.zipCode.toLowerCase()}} *" ng-model="$ctrl.form.zipCode" disabled="$ctrl.isLoading" required="!$ctrl.isReplicatedSite"></custom-input></div><div class="form-field" ng-if="!$ctrl.isReplicatedSite"><custom-dropdown placeholder="how did you hear about cabi? *" options="$ctrl.sourceOptions" ng-model="$ctrl.form.source" class="source-dropdown" display-property="label" disabled="$ctrl.isLoading" track-by="value" required="!$ctrl.isReplicatedSite"></custom-dropdown></div><div ng-if="$ctrl.isFriendSource()"><div class="form-field"><custom-input type="text" name="text" placeholder="friend\'s first name *" ng-model="$ctrl.form.friend.firstName" disabled="$ctrl.isLoading" required="$ctrl.isFriendSource()"></custom-input></div><div class="form-field"><custom-input type="text" name="text" placeholder="friend\'s last name *" ng-model="$ctrl.form.friend.lastName" disabled="$ctrl.isLoading" required="$ctrl.isFriendSource()"></custom-input></div><div class="form-field"><custom-input type="text" name="text" placeholder="friend\'s city" ng-model="$ctrl.form.friend.city" disabled="$ctrl.isLoading"></custom-input></div><div class="form-field"><custom-dropdown placeholder="friend\'s {{$ctrl.countryLabels.state.toLowerCase()}} *" options="$ctrl.states" ng-model="$ctrl.form.friend.state" display-property="name" class="source-dropdown" disabled="$ctrl.isLoading" track-by="code" required="$ctrl.isFriendSource()"></custom-dropdown></div></div><div class="form-field" ng-if="$ctrl.isOutletStoreSource()"><custom-dropdown placeholder="tell us the name of the store you visited *" options="$ctrl.outletStoreOptions" ng-model="$ctrl.form.outletStore" class="source-dropdown" display-property="label" disabled="$ctrl.isLoading" track-by="value" required="$ctrl.isOutletStoreSource()"></custom-dropdown></div><div class="form-field"><custom-input type="password" name="password" placeholder="set password *" ng-model="$ctrl.form.password" disabled="$ctrl.isLoading" required></custom-input></div><div class="form-field"><custom-input type="password" name="confirmPassword" placeholder="confirm password *" ng-model="$ctrl.form.confirmPassword" disabled="$ctrl.isLoading" required></custom-input></div><div class="form-field"><div class="communication-preferences"><p class="subtitle no-margin">How would you like your personal Stylist to communicate with you? (Select all that apply) *</p><div class="horizontal-list"><div class="preference"><i class="fa fa-envelope"></i><br><span class="custom-checkbox"><input type="checkbox" name="preference-email" id="preference-email" ng-model="$ctrl.form.communication.email" ng-change="$ctrl.preferenceSelection()" ng-disabled="$ctrl.isLoading"><label for="preference-email" class="preference-name">email</label></span></div><div class="preference"><i class="fa fa-comment"></i><br><span class="custom-checkbox"><input type="checkbox" name="preference-txt" id="preference-txt" ng-model="$ctrl.form.communication.txt" ng-change="$ctrl.preferenceSelection()" ng-disabled="$ctrl.isLoading"><label for="preference-txt" class="preference-name">text</label></span></div><div class="preference"><i class="fa fa-phone"></i><br><span class="custom-checkbox"><input type="checkbox" name="preference-phone" id="preference-phone" ng-model="$ctrl.form.communication.phone" ng-change="$ctrl.preferenceSelection()" ng-disabled="$ctrl.isLoading"><label for="preference-phone" class="preference-name">call</label></span></div><div class="preference"><i class="fa fa-ban"></i><br><span class="custom-checkbox"><input type="checkbox" name="preference-no" id="preference-no" ng-model="$ctrl.form.communication.no" ng-change="$ctrl.deselectAllPreferences()" ng-disabled="$ctrl.isLoading"><label for="preference-no" class="preference-name">no thanks</label></span></div></div></div></div><div class="form-field align-left"><div class="warning-message" ng-if="$ctrl.phoneWarning"><i class="fa fa-exclamation-triangle"></i> <span>{{$ctrl.phoneWarning}}</span></div><span class="custom-checkbox"><input type="checkbox" name="newsMail" id="wantsNewsMail" ng-model="$ctrl.form.wantsNewsMail" ng-disabled="$ctrl.isLoading"><label for="wantsNewsMail">Sign me up for exclusive emails on the latest fashion tips, cabi events, and Collection announcements.</label></span></div><p class="error" ng-if="$ctrl.error">{{$ctrl.error}}</p><div class="row"><button type="submit" class="ae-btn btn-continue" ng-disabled="$ctrl.isCommunicationInvalid() || newCustomerRegistrationForm.$invalid || $ctrl.isLoading">Continue <span ng-show="$ctrl.isLoading" class="spinner ng-animate-disabled" data-ng-animate="0"></span></button></div></form><div class="row"><a class="montserrat link-cancel" ng-click="$ctrl.navigateToLogin()">I already have a profile</a> <a class="montserrat link-cancel" ng-if="$ctrl.attrs.module.showGuestCheckout" ng-click="$ctrl.guestCheckout()">Checkout as a guest</a></div></div>'), 
    $templateCache.put("../assets/js/angular/blog/wp-popular-posts.html", '<div class="blog__post-item"><div class="blog__popular"><h4 class="blog__popular__title">popular posts</h4><ul class="popular-posts__list"><li class="popular-post-list-item" ng-repeat="post in $ctrl.popular_posts"><a ng-href="{{post.link}}" ng-bind-html="post.title"></a></li></ul></div></div>'), 
    $templateCache.put("../assets/js/angular/blog/wp-post-loop.html", '<div class="wp-post-loop"><div class="blog__row" ng-repeat="post_row in $ctrl.post_rows track by $index"><wp-post post="post" ng-repeat="post in post_row" class="blog__post-item row-{{$parent.$index}}" ng-class="{\'blog__col-12\': post_row.length == 1 && $parent.$index != 4, \'blog__col-6\': post_row.length == 2 || $parent.$index == 4}"></wp-post><wp-popular-posts ng-if="$ctrl.popularPost && $index == 4" class="blog__col-6"></wp-popular-posts></div><div class="align-center"><a ng-click="$ctrl.loadMore()" class="btn btn-transparent" ng-if="$ctrl.post_rows.length && $ctrl.ui.showLoadMore">See More</a><loading-icon ng-if="$ctrl.ui.loading"></loading-icon></div></div>'), 
    $templateCache.put("../assets/js/angular/blog/wp-post.html", '<div class="wp-post"><a ng-href="{{$ctrl.post.link}}"><div class="blog__post-thumb"><img class="blog__post-img" ng-src="{{$ctrl.post.featured_image_url}}" ng-alt="$ctrl.post.title.rendered"></div></a><div class="blog__post-meta clearfix"><p class="blog__post-cat" ng-bind-html="$ctrl.post.category_name"></p><p class="blog__post-title"><a ng-href="{{$ctrl.post.link}}" ng-bind-html="$ctrl.post.title.rendered"></a></p><p ng-bind-html="$ctrl.post.excerpt.rendered"></p></div></div>'), 
    $templateCache.put("../assets/js/angular/browse-look/modal/modal.html", '<div id="modal-knockout" class="quicklook" ng-click="$ctrl.closeModal();"></div><div id="modal" class="quicklook browse-look-modal modal---mobile-fullscreen" ng-class="{initialized: data}" ng-init="$ctrl.idx = 0;" browse-look-modal><header class="browse-look-modal__heading"><a ng-click="$ctrl.closeModal();" id="quicklook-close"><span>+</span></a><h1 class="browse-look-modal__title">{{"BROWSE_LOOK_LABEL" | translate}}</h1><span ng-hide="$ctrl.wishlist.added" class="browse-look-modal__add-look-to-wishlist" add-to-favorites="\'{{$ctrl.productIds}}\'" is-loading="$ctrl.wishlist.loading" is-added="$ctrl.wishlist.added"><i class="fa fa-spinner fa-spin" ng-if="$ctrl.wishlist.loading"></i> Add Look to Favorites </span><span ng-show="$ctrl.wishlist.added" class="browse-look-modal__add-look-to-wishlist-confirmation">Look Added to Favorites!</span></header><nav class="browse-look-modal__navigation"><ul slick vertical="true" infinite="false" slides-to-scroll="3" slides-to-show="3"><li class="browse-look-modal__navigation-item" ng-class="{\'browse-look-modal__navigation-item--active\': $ctrl.idx == $index}" ng-repeat="product in $ctrl.products track by $index"><a class="browse-look-modal__navigation-link" ng-click="$ctrl.idx = $index; $ctrl.products[$index].images[0].active = true;"><img class="browse-look-modal__navigation-thumbnail" ng-src="{{product.images[0].url}}"></a></li></ul></nav><section class="browse-look-modal__content"><quicklook-images images="$ctrl.products[$ctrl.idx].images"></quicklook-images><section class="browse-look-modal__information"><quicklook-content product="$ctrl.products[$ctrl.idx]"></quicklook-content><add-to-cart product-id="{{$ctrl.products[$ctrl.idx].productId}}"></add-to-cart></section></section></div>'), 
    $templateCache.put("../assets/js/angular/cabi-cuties/components/cabi-cutie-modal/cabi-cutie-modal.html", '<div class="o-modal o-modal--for-cabi-cutie"><div class="o-modal-knockout" ng-click="$ctrl.close()"></div><div class="o-modal-content"><a class="o-modal__close" ng-click="$ctrl.close()"></a><div class="c-cabi-cutie-modal__pagination"><a ng-if="$ctrl.previousItem" ng-click="$ctrl.goToItem($ctrl.previousItem)" class="c-cabi-cutie-modal__pagination-item c-cabi-cutie-modal__pagination-item--previous"></a> <a ng-if="$ctrl.nextItem" ng-click="$ctrl.goToItem($ctrl.nextItem)" class="c-cabi-cutie-modal__pagination-item c-cabi-cutie-modal__pagination-item--next"></a></div><cabi-cutie cutie="$ctrl.cutie"></cabi-cutie></div></div>'), 
    $templateCache.put("../assets/js/angular/cabi-cuties/components/cabi-cutie-thumbnail/cabi-cutie-thumbnail.html", '<div class="c-cabi-cutie-thumbnail"><img ng-src="{{$ctrl.item.image}}"></div>'), 
    $templateCache.put("../assets/js/angular/cabi-cuties/components/cabi-cutie/cabi-cutie.html", '<loading-icon ng-if="!$ctrl.object.id" style="margin: 1em"></loading-icon><div ng-if="$ctrl.object.id"><div class="c-cabi-cutie-modal"><div class="c-cabi-cutie-modal__detail-panel"><div class="c-cabi-cutie-modal__title">#cabicuties</div><div class="c-cabi-cutie-modal__image"><img ng-src="{{$ctrl.object.image}}"></div><div class="c-cabi-cutie-modal__handle"><a href="">{{$ctrl.object.title}}</a></div><div class="c-cabi-cutie-modal__message" ng-bind-html="$ctrl.object.message"></div><social-share-buttons url="$ctrl.getShareUrl()"></social-share-buttons></div><div class="c-cabi-cutie-modal__product-panel"><div class="c-cabi-cutie-modal__product-panel-title">{{"BROWSE_LOOK_LABEL" | translate}}</div><div class="c-cabi-cutie-modal__products"><div class="c-cabi-cutie-modal__product-carousel" slick vertical="true" infinite="false" slides-to-show="2" dots="true" touch-move="true" slick-mousewheel-support><div ng-repeat="product in $ctrl.object.products track by product.id" class="c-cabi-cutie-modal__product" ng-click="$ctrl.goTo(product.permalink)"><div class="c-cabi-cutie-modal__product-image"><img ng-src="{{product.images.main}}?w=131"></div><div class="c-cabi-cutie-modal__product-name">{{product.title}}</div><div class="c-cabi-cutie-modal__product-price">{{product.price}}</div></div></div><div class="c-cabi-cutie-modal__product-grid"><div ng-repeat="product in $ctrl.object.products track by product.id" class="c-cabi-cutie-modal__product" ng-click="$ctrl.goTo(product.permalink)"><div class="c-cabi-cutie-modal__product-image"><img ng-src="{{product.images.main}}?w=131"></div><div class="c-cabi-cutie-modal__product-name">{{product.title}}</div><div class="c-cabi-cutie-modal__product-price">{{product.price}}</div></div></div></div></div></div></div>'), 
    $templateCache.put("../assets/js/angular/cabi-cuties/components/cabi-cuties-archive/cabi-cuties-archive.html", '<div class="c-cabi-cuties-archive"><div align="center"><loading-icon ng-if="!$ctrl.collection.length"></loading-icon></div><div class="c-cabi-cuties-archive__collection"><cabi-cutie-thumbnail item="item" ng-repeat="item in $ctrl.collection track by item.id" ng-click="$ctrl.openIntent(item)"></cabi-cutie-thumbnail></div></div>'), 
    $templateCache.put("../assets/js/angular/cart/directives/cart.html", '<div id="page-body_content" class="container" ng-show="cart.data.qtyTotal"><div id="dropdown-header" class="clearfix"><h3 class="h3 archer-light color-gold" style="float:left">Most recent item(s)</h3><h3 class="h3 archer-light color-gold" style="float:right" ng-if="cart.getItemCount() >= options.itemsToShow">Items in bag: {{cart.getItemCount()}}</h3></div><div id="shopping-cart" class="shop-table">\x3c!-- TABLE CONTENT START --\x3e<div class="shop-tr" ng-repeat="item in cart.data.items | limitTo: options.itemsToShow"><div class="shop-td image"><img ng-src="{{item.image}}?w=95"></div><div class="shop-td title"><p>{{item.productName}}</p><span class="color-gold" ng-show="item.parentId != \'GC-CABI\'">Item #{{item.styleId}}</span> <span class="estimated-ship-date color-gold" ng-if="item.backorderShipDate">Est. Ship Date: {{item.backorderShipDate}}</span></div><div class="shop-td"><p ng-if="item.color" ng-show="item.parentId != \'GC-CABI\'"><label>Color:</label>{{item.color.description}}</p><p ng-if="item.size" ng-show="item.parentId != \'GC-CABI\'"><label>Size:</label>{{item.size.description}}</p><p ng-if="item.length.description" ng-show="item.parentId != \'GC-CABI\'"><label>Length:</label>{{item.length.description}}</p></div><div class="shop-td qty"><label>Qty:</label>{{item.quantity}}</div><div class="shop-td"><p><label>{{item.subTotal | cabiCurrency}}</label></p></div><div class="shop-td options" ng-show="options.showOptions == \'true\'"><p><a ng-click="showLineItemModal(item, $index)"><i class="fa fa-pencil-square-o"></i> Edit</a></p><p><a ng-click="requestLineItemRemoval(item)"><i class="fa fa-times"></i> Remove</a></p><p><a ng-click="requestMoveToFavorites(item)"><i class="fa fa-heart-o"></i> Move To Favorites</a></p></div></div>\x3c!-- TABLE CONTENT END --\x3e</div><div id="product-promotion" class="shop-table align-left" ng-hide="true"><div class="shop-tr bg-warm-tan"><div class="shop-td uppercase"><img src="//placehold.it/95x152?text=Item"></div><div id="product-promotion-price" class="shop-td"><p>Add a Scarf to your order</p><p class="color-gold">$<span>00.00</span></p><p><a href="javascript://">Add to bag now</a></p></div><div id="product-promotion-add" class="shop-td uppercase"><a class="color-blue-grey" href="javascript://"><i class="icon icon-close"></i></a></div></div></div><div class="shopping-checkout-bottom" class="container" ng-show="cart.data.qtyTotal"><div id="checkout-left" class="pull-left"><p class="color-gold inline-block subtotal-label archer-medium">Subtotal of Items:</p><p class="archer-bold inline-block subtotal-amount">{{cart.data.itemTotal | cabiCurrency}}</p></div><div id="checkout-right" class="pull-right"><div class="inline-block view-cart cart__view-cart-button" ng-show="options.showViewCart == \'true\'"><p class="uppercase"><a class="btn btn-gold" href="{{cart.getUrl()}}"><svg viewBox="-204 295 139.2 182.5"><path d="M-75.2,337.1h-22c0.1-1.2,0.4-2.3,0.4-3.5c0-21.3-17.1-38.6-38.2-38.6c-21.1,0-38.2,17.3-38.2,38.6c0,1.2,0.2,2.3,0.4,3.5\n                                h-20.7L-204,477.5h139.2L-75.2,337.1z M-165.4,365.1c-4.5,0-8.1-3.6-8.1-8.1c0-4.5,3.6-8.1,8.1-8.1s8.1,3.6,8.1,8.1\n                                C-157.3,361.4-160.9,365.1-165.4,365.1z M-159,337.1c-0.2-1.2-0.4-2.3-0.4-3.5c0-13.6,10.9-24.6,24.3-24.6s24.3,11,24.3,24.6\n                                c0,1.2-0.2,2.4-0.4,3.5H-159z M-102.8,365.2c-4.5,0-8.2-3.7-8.2-8.2c0-4.6,3.7-8.2,8.2-8.2c4.5,0,8.2,3.7,8.2,8.2\n                                C-94.7,361.5-98.3,365.2-102.8,365.2z"/></svg> <span>View Shopping bag</span></a></p></div><div class="inline-block clear-bag__wrapper" ng-hide="options.hideClearBag == \'true\'"><p class="uppercase"><a class="color-gold archer-bold clear-bag__link" ng-click="requestClearCart();"><i class="fa fa-times"></i> <span>Clear bag</span></a></p></div>&nbsp;<div class="inline-block check-out-button" ng-hide="options.q == \'true\'"><a ng-click="goToCheckoutIntent()" id="checkout-btn" class="btn btn-black">Check Out</a></div></div></div></div>'), 
    $templateCache.put("../assets/js/angular/cart/modals/clearCart/clearCart.html", '<div id="modal-knockout" ng-click="closeModal();"></div><div id="modal" class="cart-modal__modal"><a ng-click="modal.closeModal()" id="modal-close"><span>+</span></a><div class="align-center"><h2 class="archer-book mb20 cart-modal__text">Are you sure you want to clear all items from your bag?</h2><button class="btn cart-modal__cancel-button" ng-click="modal.closeModal()">Cancel</button> <button class="btn btn-gold" ng-click="modal.clearCart()"><span ng-if="!modal.clearingBag">Clear All</span><loading-icon ng-show="modal.clearingBag"></loading-icon></button></div></div>'), 
    $templateCache.put("../assets/js/angular/cart/modals/removeItem/removeItem.html", '<div id="modal-knockout" ng-click="closeModal();"></div><div id="modal" class="cart-modal__modal"><a ng-click="modal.closeModal()" id="modal-close"><span>+</span></a><div class="align-center"><h2 class="archer-book mb20 cart-modal__text">Are you sure you want to remove {{modal.item.productName}}<br>from your bag?</h2><button class="btn cart-modal__cancel-button" ng-click="modal.closeModal()">Cancel</button> <button class="btn btn-gold" ng-click="modal.removeItem(modal.item)"><span ng-if="!modal.removingItem">Yes</span><loading-icon ng-show="modal.removingItem"></loading-icon></button></div></div>'), 
    $templateCache.put("../assets/js/angular/catalog/directives/addtoCart/add-to-cart.html", '<div><loading-icon ng-hide="productData !== null"></loading-icon><div ng-show="productData" class="add-to-cart-form"><div class="attribute" id="attribute-{{attribute}}" ng-repeat="attribute in productData.attributes">\x3c!--<label>\n                {{attribute | ucfirst}}:\n            </label>--\x3e<div ng-if="attributeOptions[attribute].length > 1" class="input-select"><select ng-options="attrOption as attrOption.description_for_select disable when attrOption.disabled == true for attrOption in attributeOptions[attribute]" ng-model="selectedAttributes[attribute]" ng-change="onSelectChange(attribute)" ng-disabled="shouldDisableSelect(attribute)" class="{{attribute}}-selector"><option class="disabled-option" value="">{{attribute | capitalize}}</option></select></div><span ng-if="attributeOptions[attribute].length == 1">{{attribute}}: {{selectedAttributes[attribute].description_for_select}} </span>\x3c!-- <size-chart ng-show="config.showSizeChart == \'true\'" ng-if="attribute == \'size\'" id="sizeChart" class="color-pink archer-medium"></size-chart>--\x3e</div><div class="estimated-ship-date-wrapper" ng-show="finalProduct.productId && finalProductIsBackOrdered(finalProduct.productId);"><label></label><span class="color-gold estimated-ship-date-message">*Estimated Ship Date {{finalProductIsBackOrdered(finalProduct.productId).estimatedShipDate}}</span></div><div class="qty"><label>Qty</label><input size="2" type="number" min="1" ng-model="finalProduct.quantity" ng-change="onQuantityChange()"></div><div class="add-to-bag-wrapper" ng-if="productData"><button ng-if="productData" ng-hide="cartItem" ng-disabled="!currentProduct.data[productData.productId].canAddToCart" ng-click="addToCart()" class="btn btn-transparent" id="add-to-bag-pixel-tracker"><span ng-if="!updatingCart">Add item to Bag</span><loading-icon ng-show="updatingCart"></loading-icon></button> <button ng-show="cartItem" ng-disabled="!currentProduct.data[productData.productId].canAddToCart" ng-click="updateCartItem()" class="btn btn-black"><span ng-if="!updatingCart">Update Item</span><loading-icon ng-show="updatingCart"></loading-icon></button><quick-look-favorites ng-if="inQuickLookModal!==true" product-id="productData.productId" selected-variant="finalProduct.productId" selected-color="selectedAttributes.color.description" product-data="productData" format="\'icon\'"></quick-look-favorites></div></div><div class="add-to-cart__error-message" ng-show="error">{{error.message}}</div></div>'), 
    $templateCache.put("../assets/js/angular/catalog/directives/collectionItem.html", '<article ng-if="collectionItem" ng-class="getClassNames()" rel="{{collectionItem.id}}" data-id="{{collectionItem.id}}" ng-mouseenter="settings.isHovering = true" ng-mouseleave="settings.isHovering = false"><div class="entry-content"><div class="item_photos"><a ng-hide="collectionItem.postType == \'looks\'" class="collection-item__add-to-favorites" href="#" ng-click="toggleFavorite();" ng-class="{\'collection-item__add-to-favorites--added\': addedToFavorites}">&nbsp;</a><div class="item_image_main"><a href="{{collectionItem.permalink}}" title="cabi\'s {{collectionItem.title}}" rel="bookmark"><img ng-if="collectionItem.postType == \'items\'" ng-repeat="(color, images) in collectionItem.relatedImages" ng-src="{{images.PRODUCT_FRONT_IMAGE}}?w=330" alt="cabi\'s {{collectionItem.title}}" class="post_thumbnail post_thumbnail center" ng-class="{active: settings.activeColor == color}" data-color="{{color}}"> <img class="active" ng-if="collectionItem.postType == \'looks\'" ng-src="{{collectionItem.images.main}}?w=330&cw=47" class="post_thumbnail post_thumbnail center"></a></div><div class="product-info" ng-class="{\'hovering\': settings.isHovering}"><a href="{{collectionItem.permalink}}" title="cabi\'s {{collectionItem.title}}" rel="bookmark"><div ng-hide="collectionItem.postType == \'looks\'" class="inner"><div class="content"><div quicklook product-id="{{collectionItem.productId}}" class="quick-look" ng-hide="settings.disableQuickLook" data-post-id="{{collectionItem.id}}"><span>Quick Look</span></div><div class="collecion-item__remove-from-wishlist" ng-if="onRemove"><span ng-click="onRemove(collectionItem.id); $event.preventDefault();">Remove</span></div></div></div><div class="collection-item__hover-image-mask"><img ng-if="collectionItem.postType == \'items\' && getHoverImage(images)" ng-repeat="(color, images) in collectionItem.relatedImages" ng-src="{{getHoverImage(images)}}" alt="cabi\'s {{collectionItem.title}}" class="post_thumbnail post_thumbnail center" ng-class="{active: settings.activeColor == color}" data-color="{{color}}"></div></a></div></div><div class="item_description"><h2><a href="{{collectionItem.permalink}}" title="{{collectionItem.title}}" rel="bookmark"><span ng-bind-html="collectionItem.title | to_trusted"></span></a></h2><a ng-if="collectionItem.price" class="price" href="{{collectionItem.permalink}}" title="{{collectionItem.title}}" rel="bookmark">{{collectionItem.price}}</a><div ng-if="collectionItem.isMultiColor" class="color-choice"><div ng-repeat="(color, images) in collectionItem.relatedImages" class="color color-{{color | spacesToDashes | lowercase}}" ng-class="{active: $first}" data-color="{{color}}" ng-style="{background: getHexCode(color)}" ng-mouseenter="setActiveColor(color);"></div></div></div></div></article>'), 
    $templateCache.put("../assets/js/angular/catalog/directives/collectionItemsSlider.html", '<div class="collection-items-slider"><loading-icon ng-hide="!isLoading"></loading-icon><div class="collection-items-slider-container" ng-hide="isLoading"><div ng-repeat="itemGroup in collectionItemsIds" class="items" ng-if="$even"><collection-item post-id="{{collectionItemsIds[$index]}}"></collection-item><collection-item post-id="{{collectionItemsIds[$index + 1]}}"></collection-item></div></div></div>'), 
    $templateCache.put("../assets/js/angular/contextual-email-promotes/components/contextual-email-promote/contextual-email-promote.html", '<div on-page-scroll-amount page-scroll-callback="$ctrl.showModalIntent()" page-scroll-percentage="{{$ctrl.scrollAmount}}"></div>'), 
    $templateCache.put("../assets/js/angular/contextual-email-promotes/components/modal/modal.html", '<div class="o-modal o-modal--for-contextual-email-promote" on-esc-keypress="$ctrl.close()"><div class="o-modal-knockout" ng-click="$ctrl.close()"></div><div class="o-modal-content o-modal-content--without-bg"><div class="c-contextual-email-promote"><div class="c-contextual-email-promote__wrapper"><div class="c-contextual-email-promote__background-image" ng-if="$ctrl.backgroundImage" style="background-image: url({{$ctrl.backgroundImage}})"></div><div class="c-contextual-email-promote__content"><div ng-if="!$ctrl.ui.mailinglist_submitted"><h3 class="c-contextual-email-promote__title">Stay in the know!</h3><img ng-src="{{$ctrl.thumbnail}}" class="c-contextual-email-promote__thumbnail"><p class="c-contextual-email-promote__message" ng-bind-html="$ctrl.message"></p><p class="c-contextual-email-promote__standard">Sign up for exclusive emails on the latest fashion tips, cabi events, and Collection announcements!</p><a class="c-contextual-email-promote__mailing-list-page-button btn btn-black" href="/mailinglist" class="btn btn-black">Sign Up</a><mailinglist-inline-form class="c-contextual-email-promote__mailing-list-form" on-success="$ctrl.onMailingListSuccess()"></mailinglist-inline-form><a class="c-contextual-email-promote__close" ng-click="$ctrl.close()">No thanks</a></div><div ng-if="$ctrl.ui.mailinglist_submitted" class="align-center"><p class="just-lovely h1 mb20">Thank you for signing up!</p><a class="c-contextual-email-promote__close" ng-click="$ctrl.close()">Close</a></div></div></div></div></div></div>'), 
    $templateCache.put("../assets/js/angular/create-cultivate/components/create-cultivate/create-cultivate.html", '<div on-page-scroll-amount page-scroll-callback="$ctrl.showModalIntent()" page-scroll-percentage="{{$ctrl.scrollAmount}}"></div>'), 
    $templateCache.put("../assets/js/angular/create-cultivate/components/modal/modal.html", '<div class="o-modal o-modal--create-cultivate" on-esc-keypress="$ctrl.close()"><div class="o-modal-knockout o-modal-knockout--create-cultivate" ng-click="$ctrl.close()"></div><div class="o-modal-content o-modal-content--create-cultivate"><div class="c-create-cultivate"><a href="#" ng-click="$ctrl.close()" id="modal-close" class="modal-close modal-close--create-cultivate modal-close--create-cultivate-desktop"><span>+</span></a><div class="c-create-cultivate__wrapper"><div class="c-create-cultivate__mobile-bar"></div><div class="c-create-cultivate__background-image"></div><div class="c-create-cultivate__content"><div class="c-create-cultivate__welcome-wrapper c-create-cultivate__welcome-wrapper--desktop"><span class="c-create-cultivate__welcome-message">WELCOME</span> <img src="/wp-content/themes/cabi/assets/images/create-cultivate/create-white.svg" class="c-create-cultivate__svg" alt="create cultivate"> <span class="c-create-cultivate__welcome-message">READERS</span></div><div class="c-create-cultivate__welcome-wrapper c-create-cultivate__welcome-wrapper--mobile"><img src="/wp-content/themes/cabi/assets/images/create-cultivate/create-black.svg" class="c-create-cultivate__svg" alt="create cultivate"> <span class="c-create-cultivate__welcome-message c-create-cultivate__welcome-message--black">WELCOME<br>ATTENDEES!</span><p class="c-create-cultivate__message c-create-cultivate__message--black c-create-cultivate__message--mobile">See something you love? Click "Get this Item" to purchase through a Stylist. Want to become a Stylist? Connect with one near you to learn more.</p></div><div class="c-create-cultivate__messsage-wrapper"><h3 class="c-create-cultivate__title">Thanks for stopping by!</h3><p class="c-create-cultivate__message c-create-cultivate__message--desktop" ng-bind-html="$ctrl.message"></p><div class="c-create-cultivate__btn-wrapper c-create-cultivate__btn-wrapper--desktop"><a href="/collection/clothes/" onclick="ga(\'send\', \'event\', \'CreateCultivate\', \'Browse\');" class="c-create-cultivate__button btn btn-white">Shop Now</a> <a href="/lead-form/?lead=brand-header-bar" onclick="ga(\'send\', \'event\', \'CreateCultivate\', \'StylistLead\');" class="c-create-cultivate__button btn btn-white">Connect with<br>a Stylist</a></div><div class="c-create-cultivate__btn-wrapper c-create-cultivate__btn-wrapper--mobile"><a href="#" ng-click="$ctrl.close()" id="modal-close" class="modal-close modal-close--create-cultivate modal-close--create-cultivate-mobile"><span>+</span></a> <a href="/collection/clothes/" onclick="ga(\'send\', \'event\', \'CreateCultivate\', \'Browse\');" class="c-create-cultivate__button btn btn-black">Shop Now</a> <a href="/lead-form/?lead=brand-header-bar" onclick="ga(\'send\', \'event\', \'CreateCultivate\', \'StylistLead\');" class="c-create-cultivate__button btn btn-black">Connect with<br>a Stylist</a></div></div></div></div></div></div></div>'), 
    $templateCache.put("../assets/js/angular/directives/cartCount/cartCount.html", '<a href="/cart"><svg id="bag-icon" viewBox="-204 295 139.2 182.5" style="width: 15px"><path d="M-75.2,337.1h-22c0.1-1.2,0.4-2.3,0.4-3.5c0-21.3-17.1-38.6-38.2-38.6c-21.1,0-38.2,17.3-38.2,38.6c0,1.2,0.2,2.3,0.4,3.5\n            h-20.7L-204,477.5h139.2L-75.2,337.1z M-165.4,365.1c-4.5,0-8.1-3.6-8.1-8.1c0-4.5,3.6-8.1,8.1-8.1s8.1,3.6,8.1,8.1\n            C-157.3,361.4-160.9,365.1-165.4,365.1z M-159,337.1c-0.2-1.2-0.4-2.3-0.4-3.5c0-13.6,10.9-24.6,24.3-24.6s24.3,11,24.3,24.6\n            c0,1.2-0.2,2.4-0.4,3.5H-159z M-102.8,365.2c-4.5,0-8.2-3.7-8.2-8.2c0-4.6,3.7-8.2,8.2-8.2c4.5,0,8.2,3.7,8.2,8.2\n            C-94.7,361.5-98.3,365.2-102.8,365.2z"/></svg> <span class="count" ng-if="!cart.isEmpty()">{{cart.getItemCount()}}</span></a><div class="dropdown" ng-show="dropdown.open"><cart hide-clear-bag="true" show-view-cart="true" items-to-show="3"></cart></div>'), 
    $templateCache.put("../assets/js/angular/directives/giftCard/giftCard.html", '<div class="gift-card-view"><span class="title">Electronic Gift Card</span><p>Purchase a Gift Card today! Select one of the pre-determined amounts and add it to your cart</p><form name="giftCardForm" class="form-group" ng-submit="giftCardForm.$valid && addOrUpdateGC()" novalidate><div class="horizontal-form" style="height: 95px"><label class="label-field">Gift Card Amount</label><div class="switch-field" ng-repeat="giftCard in giftCards track by giftCard.cardId" ng-hide="(giftCard.cardId == \'GC-OTHER\') && (parameters.add_product_id == \'GC-OTHER\')"><input type="radio" id="{{giftCard.cardId}}" name="add_product_id" ng-model="parameters.add_product_id" value="{{giftCard.cardId}}"><label for="{{giftCard.cardId}}">{{(giftCard.cardId == \'GC-OTHER\') ? giftCard.price : (giftCard.price | cabiCurrency)}}</label></div><div class="left-inner-addon" ng-if="parameters.add_product_id == \'GC-OTHER\'"><span>{{currencySymbol}}</span> <input type="text" ng-model="parameters.add_amount" ng-blur="validateNumber()" name="giftCardAmount" autofocus></div></div><div class="clearfix underline"></div><div class="horizontal-form"><label class="label-field">Delivery Method</label><div class="switch-field"><input type="radio" id="email" name="gc_del_method" ng-model="parameters.answers_GC_DEL_METHOD" value="Email"><label for="email">Email</label><input type="radio" id="print" name="gc_del_method" ng-model="parameters.answers_GC_DEL_METHOD" value="Print"><label for="print">Print</label></div></div><div class="clearfix underline"></div><div class="form-group"><label class="label-field">Gift Card Type <i>(select one)</i></label><div class="card-type-container"><div class="card-type" ng-repeat="gcType in gcTypes" ng-class="(parameters.answers_GC_TYPE == gcType.type) ? [\'selected-card-type\'] : [\'\']" ng-click="onSelectCardTypeClick($event, gcType.type)"><img src="{{gcType.image}}" alt="" width="200px"> <input type="radio" name="gc-type" value="{{gcType.type}}"> <i class="fa fa-search" ng-click="openImageOnModal(gcType.image)"></i><label>{{gcType.title}}</label></div></div></div><div class="clearfix underline"></div><div class="form-group"><label class="label-field">Recipient Information</label><div class="form-block-group"><label>First Name <span>(required)</span></label><input type="text" ng-model="parameters.answers_GC_RECT_FNAME" name="answers_GC_RECT_FNAME" class="required-field" required><div ng-show="giftCardForm.$submitted && giftCardForm.answers_GC_RECT_FNAME.$invalid" class="error-message"><div ng-show="giftCardForm.answers_GC_RECT_FNAME.$error.required">This is a required field</div></div></div><div class="form-block-group"><label>Last Name <span>(required)</span></label><input type="text" ng-model="parameters.answers_GC_RECT_LNAME" class="required-field" name="answers_GC_RECT_LNAME" required><div ng-show="giftCardForm.$submitted && giftCardForm.answers_GC_RECT_LNAME.$invalid" class="error-message"><div ng-show="giftCardForm.answers_GC_RECT_LNAME.$error.required">This is a required field</div></div></div><div class="form-block-group"><label>Email <span>(required)</span></label><input type="email" ng-model="parameters.answers_GC_RECT_EMAIL" class="required-field" name="answers_GC_RECT_EMAIL" required><div ng-show="giftCardForm.$submitted && giftCardForm.answers_GC_RECT_EMAIL.$invalid" class="error-message"><div ng-show="giftCardForm.answers_GC_RECT_EMAIL.$error.required">This is a required field</div><div ng-show="giftCardForm.answers_GC_RECT_EMAIL.$error.email">Invalid Email</div></div></div></div><div class="clearfix underline"></div><div class="form-group"><label class="label-field">Sender Information</label><div class="form-block-group"><label>First Name <span>(required)</span></label><input type="text" ng-model="parameters.answers_GC_SEND_FNAME" class="required-field" name="answers_GC_SEND_FNAME" required><div ng-show="giftCardForm.$submitted && giftCardForm.answers_GC_SEND_FNAME.$invalid" class="error-message"><div ng-show="giftCardForm.answers_GC_SEND_FNAME.$error.required">This is a required field</div></div></div><div class="form-block-group"><label>Last Name <span>(required)</span></label><input type="text" ng-model="parameters.answers_GC_SEND_LNAME" class="required-field" name="answers_GC_SEND_LNAME" required><div ng-show="giftCardForm.$submitted && giftCardForm.answers_GC_SEND_LNAME.$invalid" class="error-message"><div ng-show="giftCardForm.answers_GC_SEND_LNAME.$error.required">This is a required field</div></div></div><div class="form-block-group"><label>Email <span>(required)</span></label><input type="email" ng-model="parameters.answers_GC_SEND_EMAIL" class="required-field" name="answers_GC_SEND_EMAIL" required><div ng-show="giftCardForm.$submitted && giftCardForm.answers_GC_SEND_EMAIL.$invalid" class="error-message"><div ng-show="giftCardForm.answers_GC_SEND_EMAIL.$error.required">This is a required field</div><div ng-show="giftCardForm.answers_GC_SEND_EMAIL.$error.email">Invalid Email</div></div></div></div><div class="clearfix underline" ng-show="parameters.answers_GC_DEL_METHOD == \'Email\'"></div><div class="form-group" ng-if="parameters.answers_GC_DEL_METHOD == \'Email\'"><label class="label-field">Custom Message</label><textarea ng-model="parameters.answers_GC_MSG" name="answers_GC_MSG" required></textarea><div ng-show="giftCardForm.$submitted && giftCardForm.answers_GC_MSG.$invalid" class="error-message answers_gc_msg"><div ng-show="giftCardForm.answers_GC_MSG.$error.required">This is a required field</div></div></div><div class="form-group"><button class="btn btn-black" type="submit" ng-disabled="parameters.add_product_id == \'GC-OTHER\'  && !parameters.add_amount">{{buttonText}}</button></div></form></div>'), 
    $templateCache.put("../assets/js/angular/directives/giftCard/giftCardImageModal/giftCardImage.html", '<div id="modal-knockout" ng-click="modal.closeModal()"></div><div id="modal" class="zoomed-image"><a ng-click="modal.closeModal()" id="modal-close"><span>+</span></a><div class="align-center"><img ng-src="{{modal.imgSrc}}" alt="" width="700px"></div></div>'), 
    $templateCache.put("../assets/js/angular/directives/profileDropdown/profileDropdown.html", '<div ng-show="authServiceNew.user"><span id="profile-dropdown-toggle" ng-click="dropdown.open = !dropdown.open;"><i class="fa fa-user"></i> Hi, <a href="#">{{getProfileName()}}</a> <i class="fa fa-caret-down"></i></span><div class="dropdown" ng-show="authServiceNew.user && dropdown.open"><ul><li ng-hide="authServiceNew.user.isGuestUser"><a href="/account">My Information</a></li><li><a ng-click="signOut();">Sign Out</a></li></ul></div></div>'), 
    $templateCache.put("../assets/js/angular/directives/sendConsultantEmail/sendConsultantEmailModal.html", '<div id="modal-knockout" ng-click="closeModal()"></div><div id="modal" data-sendconsultantemailmodal><a ng-click="closeModal()" id="modal-close"><span>+</span></a><div id="form-panel" ng-show="!formSubmitted"><h1 class="send_email__title h2 align-center archer-medium">Contact {{stylistInfo.data.FirstName}} {{stylistInfo.data.LastName}}</h1><form name="contactStylistForm"><div class="send_email__fieldset"><label class="send_email__label">Your First Name<span>*</span></label><input type="text" name="firstName" class="send_email__input" ng-model="contactForm.firstName" required> <span class="error color-pink" ng-show="contactStylistForm.firstName.$invalid && !contactStylistForm.firstName.$pristine">Required!</span></div><div class="send_email__fieldset"><label class="send_email__label">Your Last Name<span>*</span></label><input type="text" name="lastName" class="send_email__input" ng-model="contactForm.lastName" required> <span class="error color-pink" ng-show="contactStylistForm.lastName.$invalid && !contactStylistForm.lastName.$pristine">Required!</span></div><div class="send_email__fieldset"><label class="send_email__label">Your Email Address<span>*</span></label><input type="email" name="email" class="send_email__input" ng-model="contactForm.emailAddress" required> <span class="error color-pink" ng-show="contactStylistForm.email.$invalid && !contactStylistForm.email.$pristine">Required!</span></div><div class="send_email__fieldset"><label class="send_email__label">Subject<span>*</span></label><input type="text" name="subject" class="send_email__input" ng-model="contactForm.subject" required> <span class="error color-pink" ng-show="contactStylistForm.subject.$invalid && !contactStylistForm.subject.$pristine">Required!</span></div><div class="send_email__fieldset"><label class="send_email__label">Message<span>*</span></label><textarea name="messsage" class="send_email__input" ng-model="contactForm.message" rows="10" required></textarea><span class="error color-pink" ng-show="contactStylistForm.messsage.$invalid && !contactStylistForm.messsage.$pristine">Required!</span></div><a class="btn btn-black" id="submit" ng-click="submit(contactForm)" ng-disabled="contactStylistForm.$invalid">Send</a><div class="align-center" ng-show="!formSubmitted && failedToSend"><p class="color-pink">Message failed to send. Please try again.</p></div></form></div><div id="submitted-panel" class="align-center" ng-show="formSubmitted"><h2 class="h2 stag-light color-gold mb10">Thanks!</h2><p class="mb20">Your message has been sent.<br>Your cabi Stylist will reach out to you soon!</p><a class="btn btn-black" ng-click="closeModal()">Continue Shopping</a></div></div>'), 
    $templateCache.put("../assets/js/angular/directives/sizeChart/sizeChart.html", '<div id="modal-knockout"></div><div id="modal" class="modal-for-size-chart"><a ng-click="closeModal()" id="modal-close"><span>+</span></a><div id="size-chart-modal"><div id="size-chart-header"><div class="align-center mb20"><object type="image/svg+xml" data="{{themePath}}/assets/svgs/cabilogo-black.svg"><img src="{{themePath}}/assets/images/global/cabi-logo-fallback.png"></object></div><h1 class="h2 stag-light align-center mb20 uppercase">Size Chart</h1><p class="archer-book" style="text-align: center; margin-bottom: 1em">All sizes are U.S.</p></div><div id="size-chart-table" class="mb20"><table class="size-chart-table-large"><thead><tr><th></th><th class="uppercase archer-bold align-center">XXS (00)</th><th class="uppercase archer-bold align-center">XS (0/2)</th><th class="uppercase archer-bold align-center">S (4/6)</th><th class="uppercase archer-bold align-center">M (8/10)</th><th class="uppercase archer-bold align-center">L (12/14)</th><th class="uppercase archer-bold align-center">XL (16)</th></tr></thead><tbody><tr><th class="uppercase archer-bold align-left">Bust</th><td class="archer-book">31.5"</td><td class="archer-book">32.5"-34"</td><td class="archer-book">35.5"-36.5"</td><td class="archer-book">37.5"-38.5"</td><td class="archer-book">40"-41.5"</td><td class="archer-book">43.5"</td></tr><tr><th class="uppercase archer-bold align-left">Waist</th><td class="archer-book">23.5"</td><td class="archer-book">24.5"-26"</td><td class="archer-book">27.5"-28.5"</td><td class="archer-book">29.5"-30.5"</td><td class="archer-book">32"-33.5"</td><td class="archer-book">35.5"</td></tr><tr><th class="uppercase archer-bold align-left">Hip</th><td class="archer-book">34"</td><td class="archer-book">35"-36.5"</td><td class="archer-book">38"-39"</td><td class="archer-book">40"-41"</td><td class="archer-book">42.5"-44"</td><td class="archer-book">46"</td></tr></tbody></table><table class="size-chart-table-small"><thead><th></th><th class="uppercase archer-bold align-center">Bust</th><th class="uppercase archer-bold align-center">Waist</th><th class="uppercase archer-bold align-center">Hip</th></thead><tbody><tr><th class="uppercase archer-bold align-left">XXS (00)</th><td class="archer-book">30"</td><td class="archer-book">23.5"</td><td class="archer-book">34"</td></tr><tr><th class="uppercase archer-bold align-left">XS (0/2)</th><td class="archer-book">32.5"-34"</td><td class="archer-book">24.5"-26"</td><td class="archer-book">35"-36.5"</td></tr><tr><th class="uppercase archer-bold align-left">S (4/6)</th><td class="archer-book">35.5"-36.5"</td><td class="archer-book">27.5"-28.5"</td><td class="archer-book">38"-39"</td></tr><tr><th class="uppercase archer-bold align-left">M (8/10)</th><td class="archer-book">37.5"-38.5"</td><td class="archer-book">29.5"-30.5"</td><td class="archer-book">40"-41"</td></tr><tr><th class="uppercase archer-bold align-left">L (12/14)</th><td class="archer-book">40"-41.5"</td><td class="archer-book">32"-33.5"</td><td class="archer-book">42.5"-44"</td></tr><tr><th class="uppercase archer-bold align-left">XL (16)</th><td class="archer-book">43.5"</td><td class="archer-book">35.5"</td><td class="archer-book">46"</td></tr></tbody></table></div><div id="size-chart-body" class="mb20"><div><object type="image/svg+xml" data="{{themePath}}/assets/svgs/size-chart.svg"><img src="{{themePath}}/assets/images/global/cabi-logo-fallback.png"></object></div><div><div class="size-chart-details"><p class="archer-book"><strong class="uppercase archer-bold">Bust</strong> Measured at fullest point around back and apex</p><p class="archer-book"><strong class="uppercase archer-bold">Waist</strong> Measured at narrowest point of natural waist</p><p class="archer-book"><strong class="uppercase archer-bold">Hip</strong> Measured at fullest point around butt &amp; thighs</p><p class="archer-book"><strong class="uppercase archer-bold">Inseam</strong> Measure from the bottom of the crotch seam to the bottom of the hem along the inside seam*</p></div></div></div></div></div>'), 
    $templateCache.put("../assets/js/angular/directives/stickyMessage/stickyMessage.html", '<div class="row sticky-message"><div class="col-lg-12 align-center"><h2>{{customMessage}}</h2></div></div>'), 
    $templateCache.put("../assets/js/angular/directives/stylistInfo/stylistInfo.html", '<span ng-if="stylistInfo.data"><a id="stylistinfo-toggle" class="color-pink" ng-click="dropdown.open = !dropdown.open;">My Stylist <i class="fa fa-caret-down"></i></a><div class="dropdown" ng-show="stylistInfo && dropdown.open"><ul><li id="stylistInfo-fullname">{{stylistInfo.data.FirstName}} {{stylistInfo.data.LastName}}</li><li ng-if="stylistInfo.data.contactNumber"><a href="tel: {{stylistInfo.data.contactNumber}}"><i class="fa fa-phone"></i> {{stylistInfo.data.contactNumber}}</a></li><li ng-if="stylistInfo.data.Email" class="email"><a show-contact-stylist-modal><i class="fa fa-envelope-o"></i> Email</a></li><li class="not-my-stylist"><a href="/not-my-stylist" class="color-pink underline">Not my stylist?</a></li></ul></div></span>'), 
    $templateCache.put("../assets/js/angular/ecommerce/_components/addressCard/addressCard.html", '<div><div class="address-card" ng-show="!_state.isEditing && model.contactMechId"><div class="tools"><button class="edit-btn" ng-click="editAddress()">{{model.contactMechId ? \'Edit\' : \'Add\'}}</button></div><div ng-show="model.contactMechId"><span class="info">{{model.address1}}</span><div ng-if="model.address2"><span>{{model.address2}}</span></div><span class="info">{{model.city}}, {{model.stateProvinceGeoId}}</span> <span class="info">{{model.postalCode}}</span></div></div><div class="address-card-form" ng-if="_state.isEditing || !model.contactMechId"><address-form mode="\'PROFILE\'" address="model" profile="profile" set-on-profile="true" set-on-cart="false" address-type="_props.type" show-submit-btn="true" show-cancel-btn="!!model.contactMechId" show-clear-btn="!model.contactMechId" on="addressFormEvents(eventType, data)"></address-form></div></div>'), 
    $templateCache.put("../assets/js/angular/ecommerce/_components/addressForm/addressForm.html", '<div class="form-component horizontal-form"><form class="address-form" name="addressForm" ng-submit="saveAddress()" novalidate><div ng-if="mode !== \'CHECKOUT\' && addressType === \'SHIPPING_LOCATION\' && profile.mailingAddress.contactMechId"><label><input type="checkbox" ng-model="address.copy" ng-change="onChangeSimilarAddress()"> <span>Same as mailing address</span></label></div><div ng-if="profile.isGuestUser || profile.guestCheckout"><div class="form-field"><label for="first-name" class="label-control">First Name <span class="required">*</span></label><div class="input-control"><input type="text" id="first-name" ng-model="profile.firstName" name="firstName" required><div class="clearfix"></div><div class="error-message" ng-show="addressForm.$submitted && addressForm.firstName.$invalid"><div ng-show="addressForm.firstName.$error.required">First name is required</div></div></div></div><div class="form-field"><label for="last-name" class="label-control">Last Name <span class="required">*</span></label><div class="input-control"><input type="text" id="last-name" ng-model="profile.lastName" name="lastName" required><div class="clearfix"></div><div class="error-message" ng-show="addressForm.$submitted && addressForm.lastName.$invalid"><div ng-show="addressForm.lastName.$error.required">Last name is required</div></div></div></div></div><div class="form-field"><label for="address1" class="label-control">Address <span class="required">*</span></label><div class="input-control"><input type="text" id="address1" ng-model="address.address1" name="address1" required ng-change="onChangeForm()"><div class="clearfix"></div><div class="error-message" ng-show="addressForm.$submitted && addressForm.address1.$invalid"><div ng-show="addressForm.address1.$error.required">Address is required</div></div></div></div><div class="form-field"><label for="address2" class="label-control">Apt Suite</label><div class="input-control"><input type="text" id="address2" ng-model="address.address2" name="address2" ng-change="onChangeForm()"><div class="clearfix"></div></div></div><div class="form-field"><label for="city" class="label-control">City <span class="required">*</span></label><div class="input-control"><input type="text" id="city" ng-model="address.city" name="city" required ng-change="onChangeForm()"><div class="clearfix"></div><div class="error-message" ng-show="addressForm.$submitted && addressForm.city.$invalid"><div ng-show="addressForm.city.$error.required">City is required</div></div></div></div><div class="form-field"><label for="stateProvince" class="label-control">{{countryLabels.state}} <span class="required">*</span></label><div class="input-control"><div class="input-select"><select id="stateProvince" name="stateProvinceGeoId" ng-options="option.name for option in states track by option.code" ng-model="address.stateProvinceGeoObj" ng-change="onChangeForm()" required></select></div><div class="clearfix"></div><div class="error-message" ng-show="addressForm.$submitted && addressForm.stateProvinceGeoId.$invalid"><div ng-show="addressForm.stateProvinceGeoId.$error.required">{{countryLabels.state}} is required</div></div></div></div><div class="form-field"><label for="postal-code" class="label-control">{{countryLabels.zipCode}} <span class="required">*</span></label><div class="input-control"><input type="text" id="postal-code" ng-model="address.postalCode" name="postalCode" required ng-change="onChangeForm()"><div class="clearfix"></div><div class="error-message" ng-show="addressForm.$submitted && addressForm.postalCode.$invalid"><div ng-show="addressForm.postalCode.$error.required">{{countryLabels.zipCode}} is required</div></div></div></div><div ng-if="profile.isGuestUser || profile.guestCheckout"><div class="form-field"><label for="emailAddress" class="label-control">E-mail <span class="required">*</span></label><div class="input-control"><input type="email" id="emailAddress" ng-model="profile.emailAddress" name="emailAddress" required><div class="clearfix"></div><div class="error-message" ng-show="addressForm.$submitted && addressForm.emailAddress.$invalid"><div ng-show="addressForm.emailAddress.$error.required">E-mail is required</div><div ng-show="addressForm.emailAddress.$error.email">E-mail is invalid</div></div></div></div></div><div ng-if="profile.isGuestUser || profile.guestCheckout"><div class="form-field"><label for="mobilePhone" class="label-control">Phone Number (optional)</label><div class="input-control"><phone-input-checkout type="text" name="mobilePhone" ng-model="profile.mobilePhone"></phone-input-checkout><div class="clearfix"></div><div class="error-message" ng-show="addressForm.$submitted && addressForm.mobilePhone.$invalid">Phone is invalid</div></div></div></div><div class="form-footer" ng-class="{validating: isValidating, saving: isSaving}"><div class="validating-address-preloader"><preloader color="000"></preloader><span>Validating Address</span></div><div class="buttons"><submit-btn is-loading="isSaving" is-disabled="isSaving" ng-if="showSubmitBtn"></submit-btn><button type="button" class="pull-right btn" ng-click="cancelForm()" ng-if="showCancelBtn">Cancel</button> <button type="button" class="pull-right btn" ng-click="restoreForm()" ng-if="showClearBtn">Clear</button></div><div class="clearfix"></div></div></form></div>'), 
    $templateCache.put("../assets/js/angular/ecommerce/_components/bagSummary/bagSummary.html", '<div class="module cart-summary"><div class="module-head"><div class="title"><span>BAG SUMMARY</span></div><div class="buttons"><a href="/cart"><i class="fa fa-pencil-square-o"></i>Edit</a></div></div><div class="module-body"><div class="product-list"><ul><li ng-repeat="product in cart.cartData.items" class="product"><span class="product-image"><img ng-src="{{product.image}}?w=95"> </span><span class="name">{{product.productName}}</span> <span class="subtotal">({{product.quantity}}) {{product.subTotal | cabiCurrency}}</span></li></ul></div><div class="cart-total"><div class="cart-subtotal"><span class="label">Subtotal of items</span> <span class="value">{{cart.cartData.itemTotal | cabiCurrency}}</span></div><div class="cart-subtotal"><span class="label">Shipping</span> <span class="value">{{cart.cartData.shippingTotal | cabiCurrency}}</span></div><div class="cart-subtotal"><span class="label">Tax</span> <span class="value">{{cart.cartData.totalSalesTax | cabiCurrency}}</span></div><div class="cart-subtotal" ng-if="(cart.cartData.paymentMethods | giftCardAmount) > 0"><span class="label">Gift card</span> <span class="value">-{{cart.cartData.paymentMethods | giftCardAmount | cabiCurrency}}</span></div><div class="cart-subtotal gran-total"><span class="label">Grand total</span> <span class="value">{{cart.cartData.grandTotal | cabiCurrency}}</span></div></div></div></div>'), 
    $templateCache.put("../assets/js/angular/ecommerce/_components/cartSummary/cartSummary.html", '<div class="cart-total cart-verify"><div class="cart-subtotal"><span class="label">Subtotal of items</span> <span class="value">{{cart.cartData.itemTotal | cabiCurrency}}</span></div><div class="cart-subtotal"><span class="label">(+) Shipping</span> <span class="value">{{cart.cartData.shippingTotal | cabiCurrency}}</span></div><div class="cart-subtotal"><span class="label">(+) Tax</span> <span class="value">{{cart.cartData.totalSalesTax | cabiCurrency}}</span></div><div class="cart-subtotal" ng-if="(cart.cartData.paymentMethods | giftCardAmount) > 0"><span class="label">Gift card</span> <span class="value">-{{cart.cartData.paymentMethods | giftCardAmount | cabiCurrency}}</span></div><div class="cart-subtotal gran-total"><span class="label">Order total</span> <span class="value">{{cart.cartData.grandTotal | cabiCurrency}}</span></div></div>'), 
    $templateCache.put("../assets/js/angular/ecommerce/_components/checkOut/checkOut.html", '\x3c!-- First step --\x3e<check-out-step name="STEPS.SHIPPING_INFORMATION" invalid-message="Please enter shipping address and a shipping method" show-footer-btn="!globalState.steps.SHIPPING_INFORMATION.showNextButton" is-enable="true" is-valid="cart.carrierShipmentMethodList.length ? cart.selectedShippingMethod : true"><checkout-shipping-address profile="profile" cart-data="cart"></checkout-shipping-address></check-out-step>\x3c!-- Second step - Payment information--\x3e<check-out-step name="STEPS.PAYMENT_INFORMATION" invalid-message="Please update the payment amounts to cover the full order balance" is-disabled="globalState.steps.PAYMENT_INFORMATION.isLoading || ((!globalState.creditCard || globalState.creditCard == -1 || globalState.creditCard == 0) && remainingTotalOrder != 0)" is-enable="cart.shippingAddress.contactMechId && cart.selectedShippingMethod" is-valid="remainingTotalOrder == 0 || (globalState.creditCard && globalState.creditCard != -1 && globalState.creditCard != 0)" show-footer-btn="true">\x3c!--Total remaining--\x3e<total-remaining></total-remaining>\x3c!--Make a change component, add a donation to cart--\x3e<make-a-change></make-a-change>\x3c!--Payment method 1: Pay with gift cards--\x3e<payment-method title="Pay with Gift Card(s)" active="checkout.totatGiftCardsAdded > 0" type="GIFT_CARD"><gift-cards profile="profile" cart-data="cart"></gift-cards></payment-method>\x3c!--Payment method 2: Pay with one credit card--\x3e<payment-method title="Pay with Credit Card" active="checkout.totalCreditCardsAdded > 0" classes="make-a-change-section" type="CREDIT_CARD"><div ng-if="!profile.isGuestUser && !profile.guestCheckout && profile.creditCards.length > 0">Click to select one of your saved cards below, or add a new card.</div><div ng-if="(profile.isGuestUser || profile.guestCheckout) && profile.creditCards.length > 0">Remove existing credit card if you want to add a new one.</div><credit-card-list profile="profile" mode="CHECK_OUT" cart-data="cart"></credit-card-list></payment-method></check-out-step>\x3c!-- Third step - Verify information--\x3e<check-out-step name="STEPS.VERIFY_INFORMATION" props="{nextBtnLabel:\'COMPLETE ORDER\'}" show-order-flows="showOrderFlows" show-footer-btn="true" is-enable="remainingTotalOrder == 0" is-valid="remainingTotalOrder == 0" cart-data="cart" profile="profile"><order-confirmation cart-data="cart" profile="profile"></order-confirmation></check-out-step>'), 
    $templateCache.put("../assets/js/angular/ecommerce/_components/checkOutCart/checkOutCart.html", '<table><thead><tr><th>Style</th><th>Name</th><th>Color</th><th>Size</th><th>Length</th><th>Qty</th><th>Price</th></tr></thead><tbody><tr ng-repeat="product in cart.cartData.items"><td class="column-image"><img ng-src="{{product.image}}?w=150" alt=""></td><td class="table-column column-name"><span>{{product.productName}}</span> <span>Item #{{product.styleId}}</span></td><td class="table-column column-light column-color">{{product.color.description}}</td><td class="table-column column-light column-size">{{product.size.description}}</td><td class="table-column column-length">-</td><td class="table-column column-quantity">{{product.quantity}}</td><td class="table-column column-price">{{product.subTotal | cabiCurrency}}</td></tr></tbody></table>'), 
    $templateCache.put("../assets/js/angular/ecommerce/_components/checkOutStep/checkOutStep.html", '<div class="panel-list" ng-class="{invalid: !isValid}"><div class="panel" ng-class="{active: globalState.currentStep == name}"><div class="panel-header" ng-click="setAsCurrentTab()"><span>{{globalState.steps[name].title}}</span></div><div ng-show="globalState.currentStep == name"><div class="panel-body"><ng-transclude></ng-transclude></div><div ng-if="domainLocale.code == \'GBR\' && props.nextBtnLabel"><div class="returnConsent"><input type="checkbox" name="returnConsent" id="returnConsent" ng-click="returnConsentCheck()"> <span class="cb-designed checkbox-text bold">I have read and understand <u ng-click="showReturnConsentModal(true)">cabi\'s return policy</u></span></div></div><div class="o-modal returnConsentModal" ng-if="showReturnConsent"><div class="o-modal-knockout"><div class="o-modal-content o-modal-content--without-bg"><a class="o-modal__close" ng-click="showReturnConsentModal(false)"></a><div class="o-modal-border"><h2>cabi RETURNS POLICY (U.K.)</h2><ol class="numbered-list"><li>Cabi Experience, Ltd. is the seller of these products to you. Full payment is to be made with your order, and the total price shown on the front of the form includes any VAT or delivery costs.</li><li>By law, your products must be of satisfactory quality, correspond to their description, and be reasonably fit for purpose. If, for any reason, you are not satisfied with your purchase, we will provide you with a refund if the following conditions are met:<ol type="a"><li>Give us notice within 30 days from the date of delivery of the products to you that you wish to cancel your order.</li><li>Return the products to us at Landmark U.S.A., P.O. Box 9674, 892C Brucargo, EMC 1934, Belgium within 14 days from the date of your notice of cancellation.</li></ol></li><li>Your refund will include your delivery costs of just the item(s) being returned. (Excepting any supplementary delivery costs if you choose a delivery method which is more expensive than our standard delivery cost.)</li><li>You can use the notice of cancellation provided below if you wish to do so, or you can give us notice in some other way (e.g. through your Independent cabi Stylist, letter, email, or telephone) as long as we receive a clear statement of your decision to cancel.</li><li>When you request a cancellation, you’re responsible for the cost of shipping it back to cabi. If the cancelled item is included with other items that are being returned for exchange, or an add-on order is placed within 7 calendar days to replace the cancelled item, or the cancellation is due to damage during delivery, or an unnatural defect in the garment was reported at time of delivery to you, you can elect to use cabi’s shipping process and cabi will cover the cost at no charge to you.</li><li>If the item does not fall into one of the categories above, the standard shipping cost using cabi’s return process is £3. If you choose to ship the item back through your own method, there is no cabi charge.</li><li>If the products are returned by you for any reason other than damage to or a defect in the products and they have suffered any reduction in value as a result of handling beyond what is necessary to establish the nature, characteristics, and functioning of the products, then you will be charged for that diminution in value and that charge will be deducted from your refund.</li><li>We will refund you without undue delay and no later than 14 days from the day you return the products to us or you have supplied evidence of having sent back the products, whichever is the earliest. We will refund you by the same means of payment that you used for your initial transaction, provided that method of payment is still a valid and active account, and you will not incur any charges for that refund. We may withhold your refund until we have received the products back or you have supplied evidence of having sent back the products, whichever is the earliest. If the original means of payment is no longer active or for any reason declines the credit to the account, a physical cheque will be sent to you via your address on file.</li><li>Please note that for health and hygiene reasons, we do not accept returns of underwear or similar garments intended to be worn in close body contact which are delivered sealed and have been unsealed after delivery.</li><li>This does not affect your statutory rights.</li></ol><h3>NOTICE OF THE RIGHT TO CANCEL</h3><span>Cabi Experience, Ltd. hereby gives you the following notice of cancellation rights:<br>You have the right to cancel this contract within a period of 30 days from the date of delivery of the products to you without giving any reason by providing a clear statement of your decision to cancel to cabi or to your Independent cabi Stylist.<br>To meet the 30 day cancellation deadline, it is sufficient for you to send your cancellation notice to us before that cancellation period has expired. If you wish to cancel the contract, you may e-mail teaminternational@cabiexperience.com.<br></span></div></div></div></div><div class="panel-footer" ng-show="showFooterBtn"><span class="pull-left retail-message" ng-show="name === \'VERIFY_INFORMATION\' && !showOrderFlows && isReplicatedSite"><p><span style="font-weight: bolder">REMINDER:</span> Planning to add your order to a Hostess’ show? Right now, your order isn’t connected to a show. Check your inbox for the email sent from your Stylist or Hostess—use the shopping link in that email to ensure you’re shopping the show! If you didn’t receive an email, reach out to your Stylist or Hostess.</p></span><button class="btn pull-right" ng-class="{loading: state.isLoading ||  false}" ng-disabled="isCommunicationInvalid() || state.isInvalid || state.isLoading || isDisabled || false || (domainLocale.code == \'GBR\' && props.nextBtnLabel && !isReturnPolicyChecked)" ng-style="showOrderFlows && {\'margin-top\' : \'50px\'}" ng-click="next()"><preloader></preloader><span>{{props.nextBtnLabel || \'Save and Continue\'}}</span></button></div></div></div></div>'), 
    $templateCache.put("../assets/js/angular/ecommerce/_components/checkoutShippingAddress/checkoutShippingAddress.html", '<div ng-if="needsShowBackorderAddress()" class="shipping-address-message"><div class="container-fluid"><div class="row"><div class="pull-left"><span>Shipping address:</span></div><div class="col-lg-9"><p>When shopping a show online, a shipping address is required for your profile. Input your shipping address, then select “show address” on the next step to ship your order with the show!</p></div></div></div><hr></div>\x3c!-- \n   Hiding the radio buttons when she\'s a new guest \n   and doesn\'t have any shipping address saved.\n--\x3e<div ng-show="showAddressTypeRadioButtons()"><div class="option-title"><span>Ship to <span class="required">*</span></span></div><div class="option-content"><div class="address-list"><div class="address" ng-repeat="addressType in cart.availableShipAddrTypes"><input type="radio" name="addressType" id="address-type-{{addressType}}" value="{{addressType}}" class="customradio" ng-model="cart.selectedSippingAddressType" ng-change="setShippingAddressType(addressType)"><label for="address-type-{{addressType}}"><span ng-bind-html="addressType | addressTypeName"></span></label></div></div></div></div><div ng-show="cart.shippingAddress.contactMechId && !isEditing"><div class="option-title"><span>Shipping Location</span></div><div class="option-content current-address-description"><div class="current-address"><span>{{cart.shippingAddress.address1}}</span><br><div ng-if="cart.shippingAddress.address2"><span>{{cart.shippingAddress.address2}}</span></div><span>{{cart.shippingAddress.city}}</span>, <span>{{cart.shippingAddress.stateProvinceGeoObj.code | uppercase}}</span><br><span>{{cart.shippingAddress.postalCode}}</span><br></div><button ng-show="cart.selectedSippingAddressType == \'oth\'" ng-click="editShippingAddress()" class="edit-button"><i class="fa fa-pencil-square-o"></i>Edit</button></div></div><address-form ng-show="isEditing" mode="\'CHECKOUT\'" address="currentShippingAddress" profile="profile" set-on-cart="needsSetOnCart()" set-on-profile="needsSetOnProfile()" address-type="\'SHIPPING_LOCATION\'" show-cancel-btn="showAddressTypeRadioButtons()" show-submit-btn="true" on="addressFormEvents(eventType, data)"></address-form><div ng-show="!isEditing"><div class="shipping-method" ng-show="cart.selectedSippingAddressType == \'shloc\'">Shipping options: Your order will ship within 10-13 business days after the show is closed. Contact your Stylist for timing details.</div><div class="shipping-method" ng-show="cart.selectedSippingAddressType != \'shloc\' && cart.carrierShipmentMethodList.length > 1"><label for="shipping-options">Shipping Options <span class="required">*</span></label><div class="input-select"><select id="shipping-options" ng-options="shippingMethod.title for shippingMethod in cart.carrierShipmentMethodList track by shippingMethod.shippingMethodKey" ng-model="cart.selectedShippingMethod"></select></div><div class="shipping-method-description"><div class="option-title">Delivery Timeframes:</div><div class="current-address-description"><p>When estimating delivery date, day one is the first business day after your order is submitted.</p></div></div></div></div>'), 
    $templateCache.put("../assets/js/angular/ecommerce/_components/creditCardForm/creditCardForm.html", '<div class="form-component horizontal-form"><form class="credit-card-form" novalidate name="creditCardForm" ng-submit="saveCreditCard()"><div class="form-field"><label for="creditcard-card-type" class="label-control">Card Type <span class="required">*</span></label><div class="input-control"><div class="input-select"><select id="creditcard-card-type" name="cardType" required ng-options="option.name for option in creditCardTypes track by option.id" ng-model="model.cardType" ng-disabled="model.paymentMethodId"><option>Select</option></select></div><div class="clearfix"></div><div class="error-message" ng-show="creditCardForm.$submitted && creditCardForm.cardType.$invalid"><div ng-show="creditCardForm.cardType.$error.required">Card Type is required</div></div></div></div><div class="form-field"><label for="creditcard-first-name" class="label-control">First Name <span class="required">*</span></label><div class="input-control"><input type="text" id="creditcard-first-name" ng-model="model.firstName" name="firstName" required ng-disabled="model.paymentMethodId"><div class="clearfix"></div><div class="error-message" ng-show="creditCardForm.$submitted && creditCardForm.firstName.$invalid"><div ng-show="creditCardForm.firstName.$error.required">First name is required</div></div></div></div><div class="form-field"><label for="creditcard-last-name" class="label-control">Last Name <span class="required">*</span></label><div class="input-control"><input type="text" id="creditcard-last-name" ng-model="model.lastName" name="lastName" required ng-disabled="model.paymentMethodId"><div class="clearfix"></div><div class="error-message" ng-show="creditCardForm.$submitted && creditCardForm.lastName.$invalid"><div ng-show="creditCardForm.lastName.$error.required">Last name is required</div></div></div></div><div class="form-field"><label for="creditcard-card-number" class="label-control">Card Number <span class="required">*</span></label><div class="input-control"><input type="text" id="creditcard-card-number" name="cardNumber" required ng-model="model.cardNumber" ng-disabled="model.paymentMethodId"><div class="clearfix"></div><div class="error-message" ng-show="creditCardForm.$submitted && creditCardForm.cardNumber.$invalid"><div ng-show="creditCardForm.cardNumber.$error.required">Card number is required</div></div></div></div><div class="form-field expiration-data-field"><label class="label-control">Expiration Date <span class="required">*</span></label><div class="input-control"><div class="input-select"><select id="creditcard-expiration-month" name="expMonth" required ng-options="option.name for option in expirationDateOptions.months track by option.id" ng-model="model.expMonth"></select></div><div class="input-select"><select id="creditcard-expiration-year" name="expYear" required ng-options="option.name for option in expirationDateOptions.years track by option.id" ng-model="model.expYear"></select></div><div class="clearfix"></div><div class="error-message" ng-show="creditCardForm.$submitted && (creditCardForm.expMonth.$invalid || creditCardForm.expYear.$invalid)"><div ng-show="creditCardForm.expMonth.$error.required || creditCardForm.expYear.$error.required">Expiration Date is required</div></div></div></div><div class="billing-location"><div class="container-fluid"><div class="row"><div class="col-lg-12"><span class="label-title">Billing Location</span></div></div></div><div ng-if="_addresses.length > 1"><div class="container-fluid"><div class="row"><div class="col-lg-6 col-md-6 col-sm-6" ng-repeat="address in _addresses" ng-if="address.copy !== true"><div class="address"><label for="{{address.contactMechId}}"><div class="name"><input type="radio" name="address" class="customradio" ng-model="model.contactMechId" ng-value="address.contactMechId" id="{{address.contactMechId}}"> <span>{{address.title}}</span></div><div class="description" ng-if="address.contactMechId != -1"><span>{{address.address1}}</span><br><span>{{address.city}}, {{address.stateProvinceGeoObj.code}}</span><br><span>{{address.postalCode}}</span></div></label></div></div></div></div></div></div><div ng-if="model.contactMechId == -1"><div class="form-field"><label for="creditcard-address1" class="label-control">Address <span class="required">*</span></label><div class="input-control"><input type="text" id="creditcard-address1" name="address1" required ng-model="model.address1"><div class="clearfix"></div><div class="error-message" ng-show="creditCardForm.$submitted && creditCardForm.address1.$invalid"><div ng-show="creditCardForm.address1.$error.required">Address is required</div></div></div></div><div class="form-field"><label for="creditcard-address2" class="label-control">Apt Suite</label><div class="input-control"><input type="text" id="creditcard-address2" name="address2" ng-model="model.address2"><div class="clearfix"></div></div></div><div class="form-field"><label for="creditcard-city" class="label-control">City <span class="required">*</span></label><div class="input-control"><input type="text" id="creditcard-city" name="city" required ng-model="model.city"><div class="clearfix"></div><div class="error-message" ng-show="creditCardForm.$submitted && creditCardForm.city.$invalid"><div ng-show="creditCardForm.city.$error.required">City is required</div></div></div></div><div class="form-field"><label for="stateProvince" class="label-control">{{countryLabels.state}} <span class="required">*</span></label><div class="input-control"><div class="input-select"><select id="stateProvince" name="stateProvinceGeoId" ng-options="option.code as option.name for option in states track by option.code" ng-model="model.stateProvinceGeoId" required></select></div><div class="clearfix"></div><div class="error-message" ng-show="creditCardForm.$submitted && creditCardForm.stateProvinceGeoId.$invalid"><div ng-show="creditCardForm.stateProvinceGeoId.$error.required">{{countryLabels.state}} is required</div></div></div></div><div class="form-field"><label for="postal-code" class="label-control">{{countryLabels.zipCode}} <span class="required">*</span></label><div class="input-control"><input type="text" id="postal-code" ng-model="model.postalCode" name="postalCode" required><div class="clearfix"></div><div class="error-message" ng-show="creditCardForm.$submitted && creditCardForm.postalCode.$invalid"><div ng-show="creditCardForm.postalCode.$error.required">{{countryLabels.zipCode}} is required</div></div></div></div></div><div class="form-footer">\x3c!--Confirmation to delete credit card--\x3e<div class="delete-confirmation" ng-if="pendingToDelete"><div class="container-fluid"><div class=""><div class="pull-right"><div class="confirmation-options"><button type="button" class="btn" ng-click="onCancelDeleteCreditCardClick()"><span>CANCEL</span></button> <button type="button" class="btn" ng-click="onDeleteCreditCardClick(true)" ng-class="{loading: state.isRemoving}" ng-disabled="state.isRemoving"><preloader></preloader><span>REMOVE</span></button></div></div><div><p>Are you sure you want to remove this Credit Card</p></div></div></div></div>\x3c!--Form\'s call to actions--\x3e<div ng-if="!pendingToDelete"><div ng-if="model.paymentMethodId && model.paymentMethodId != -1"><a ng-click="onDeleteCreditCardClick()" class="btn-remove">REMOVE THIS CREDIT CARD</a></div><div class="buttons"><button ng-if="profile.creditCards.length > 0" type="button" class="pull-right btn" ng-click="cancelForm()">Cancel</button><submit-btn is-loading="state.isSaving" is-disabled="state.isSaving" ng-if="props.submitBtn"></submit-btn></div></div><div class="clearfix"></div></div></form></div>'), 
    $templateCache.put("../assets/js/angular/ecommerce/_components/creditCardList/creditCardList.html", '<div class="credit-card-list-component"><div class="credit-card-list list card-list" ng-if="profile.creditCards && profile.creditCards.length > 0"><div class="container-fluid"><div class="row"><div class="col-sm-6 col-md-6 col-lg-6" ng-repeat="creditCard in profile.creditCards"><div class="credit-card item item-list" ng-class="{selected: globalState.creditCard == creditCard.paymentMethodId}"><div ng-if="props.showEditBtn"><label class="click-area" for="creditCard-{{creditCard.paymentMethodId}}"><input type="radio" name="creditCard" id="creditCard-{{creditCard.paymentMethodId}}" ng-model="globalState.creditCard" ng-value="creditCard.paymentMethodId" ng-change="creditCardSelected()"></label><div class="tools"><button class="edit-btn" ng-click="onEditCreditCardClick(creditCard)"><span>Edit/Remove</span></button></div><div class="info"><div class="name">{{creditCard.firstName}} {{creditCard.lastName}}</div><div class="number">{{creditCard.cardNumber | creditCardNumber}}</div><div class="type"><div class="{{creditCard.cardType.id}} card-type"></div></div></div></div><div ng-if="!props.showEditBtn"><label class="click-area" for="creditCard-{{creditCard.paymentMethodId}}"><input type="radio" name="creditCard" id="creditCard-{{creditCard.paymentMethodId}}" ng-model="globalState.creditCard" ng-value="creditCard.paymentMethodId" ng-change="creditCardSelected()"></label><div class="info"><div class="name">{{creditCard.firstName}} {{creditCard.lastName}}</div><div class="number">{{creditCard.cardNumber | creditCardNumber}}</div><div class="type"><div class="{{creditCard.cardType.id}} card-type"></div></div></div></div></div></div></div></div><hr ng-show="state.isEditing"><div class="container-fluid"><div class="row"><div class="col-lg-12"><div class="credit-card-buttons" ng-if="!state.isEditing && !profile.isGuestUser && !profile.guestCheckout"><button class="btn pull-right" ng-click="onCreateCreditCardButtonClick()">Add another Card</button></div></div></div></div></div><div class="credit-card-form" ng-if="state.isEditing"><credit-card-form id="credit-card-form" model="state.currentCreditCard" mode="mode" profile="profile" cart-data="cartData" on="creditCardFormEvents(eventType, data)" document-position dp-animated="true" dp-automatic="false"></credit-card-form></div></div>'), 
    $templateCache.put("../assets/js/angular/ecommerce/_components/giftCards/giftCards.html", '<div class="git-card" id="gift-card-module"><div class="gift-card-list"><ul><li class="gift-card-added" ng-repeat="paymentMethod in cart.cartData.paymentMethods | filter:isGiftCard" ng-class="{last: $last}"><div class="gc-number"><span>Gift Card: </span><span class="gift-card-number">{{paymentMethod.cardNumber }}</span></div><div class="gc-amount"><span class="gift-card-amount">{{paymentMethod.amount | cabiCurrency}}</span></div><div class="payment-method-options"><button ng-click="removeGiftCard(paymentMethod.cardNumber)"><i class="fa fa-times"></i><span>Remove</span></button> <button ng-click="updateGifCard(paymentMethod)"><i class="fa fa-pencil"></i><span>Update</span></button></div></li></ul></div><div class="gift-card-verification"><label for="gift-card-number">Gift Card Number:</label><div class="gift-card-input"><input type="text" ng-model="newGitCardModel.cardNumber" id="gift-card-number" ng-disabled="newGitCardModel.paymentMethodId"><div class="error-message" ng-if="error && error.code != null"><div>{{error.message}}</div></div></div><button class="btn btn-verify" ng-disabled="state.isConsulting || !newGitCardModel.cardNumber" ng-class="{loading: state.isConsulting}" ng-click="getGiftCard(newGitCardModel.cardNumber)" ng-if="!newGitCardModel.paymentMethodId"><preloader color="000"></preloader><span>Check gift card Balance</span></button><div class="gift-card-balance" ng-if="newGitCardModel.paymentMethodId && newGitCardModel.balance"><span>Gift Card Balance: {{newGitCardModel.balance | cabiCurrency}}</span></div></div><div class="gift-card-validated" ng-if="newGitCardModel.paymentMethodId" ng-style="error.message && {\'margin-bottom\': \'42px\'}"><label for="git-card-amount">Amount to use from Gift Card</label><div class="gift-card-input-amount"><input type="number" ng-model="newGitCardModel.amount" id="git-card-amount" min="0"><div class="error-message" ng-show="error.message"><div>{{error.message}}</div></div></div><button class="btn" ng-disabled="state.isSaving" ng-class="{loading: state.isSaving}" ng-click="setGiftCard()"><preloader color="000"></preloader><span>Apply Gift Card</span></button></div></div>'), 
    $templateCache.put("../assets/js/angular/ecommerce/_components/makeAChange/makeAChange.html", '<div class="make-a-change"><input type="checkbox" name="makeADonation" ng-model="_state.isSelected" ng-change="makeAChange()"><div class="label"><div class="label-title"><span class="icon"></span><span>Make a Change</span></div><div class="label-description"><p>Check this box to round your order total up to the nearest {{currencyName}}. The "change" added to the order is donated to the<br>Heart of cabi Foundation</p></div></div></div>'), 
    $templateCache.put("../assets/js/angular/ecommerce/_components/orderConfirmation/orderConfirmation.html", '<div class="verify-information"><div class="profile-information information-detail"><span class="first-name">{{profile.firstName}}</span> <span class="last-name">{{profile.lastName}}</span> <span class="e-mail">{{profile.emailAddress}}</span> <span class="phone-number">{{profile.mobilePhone | phoneNumberFormat}}</span><hr></div><div class="shipping-information information-detail"><div class="information-detail-title"><button ng-click="globalState.goToStep(\'SHIPPING_INFORMATION\')"><i class="fa fa-pencil-square-o"></i> Edit</button> <span>Shipping Information</span></div><span class="location">{{cart.shippingAddress.address1}}</span><div ng-if="cart.shippingAddress.address2"><span>{{cart.shippingAddress.address2}}</span></div><span class="city">{{cart.shippingAddress.city}}, {{cart.shippingAddress.stateProvinceGeoId}}</span> <span class="postal-code">{{cart.shippingAddress.postalCode}}</span><hr></div><div class="payment-information information-detail"><div class="information-detail-title"><button ng-click="globalState.goToStep(\'PAYMENT_INFORMATION\')"><i class="fa fa-pencil-square-o"></i> Edit</button> <span>Payment Information</span></div><div class="payment-methods"><div class="payment-method-item" ng-repeat="paymentMethod in cart.cartData.paymentMethods | filter:isCreditCardAdded"><div class="payment-method-title"><span ng-if="paymentMethod.paymentMethodTypeId == \'GIFT_CARD\'">Gif Card</span> <span ng-if="paymentMethod.paymentMethodTypeId == \'CREDIT_CARD\'">Credit card: {{paymentMethod.cardType.name}}</span></div><div><span class="billing-contact" ng-if="paymentMethod.firstName">{{paymentMethod.firstName}} {{paymentMethod.lastName}}</span> <span class="card-number">{{paymentMethod.cardNumber}}</span> <span class="expiration-date" ng-if="paymentMethod.expireDate">{{paymentMethod.expireDate}}</span></div><div ng-if="paymentMethod.billingAddress"><div class="information-detail-title"><span>Billing Address</span></div><span class="billing-address">{{paymentMethod.billingAddress.address1}}</span><div ng-if="cart.billingAddress.address2"><span>{{cart.billingAddress.address2}}</span></div><span class="billing-address">{{paymentMethod.billingAddress.city}}, {{paymentMethod.billingAddress.stateProvinceGeoId}}</span> <span class="billing-address">{{paymentMethod.billingAddress.postalCode}}</span></div></div></div><hr></div></div><div class="verify-information"><div class="information-detail"><div class="information-detail-title"><button ng-click="goToCartPage()"><i class="fa fa-pencil-square-o"></i> Edit</button> <span>Items on Order</span></div><div class="order-items verified-step"><check-out-cart cart-data="cart"></check-out-cart><cart-summary cart-data="cart"></cart-summary></div></div></div><form name="commForm"><div class="verify-information attached-ecomm" ng-if="(profile.isGuestUser || profile.guestCheckout) && !profile.hideCommPref"><hr><div class="order-items verified-step"><div class="row guest-checkout-text"><div class="col-lg-10"><div>At cabi, all clients get the benefit of working with their own personal Stylist, who can help with sizing, styling ideas, and returns or exchanges. We’ll share your Stylist’s contact info when you complete your order.</div><div><strong>If you\'d like your cabi Stylist to contact you, select your preferred communication method below.*</strong></div><div class="communication-preferences"><div class="horizontal-list"><div class="preference"><i class="fa fa-envelope"></i><br><span class="custom-checkbox"><input type="checkbox" name="comm-pref-email" id="comm-pref-email" ng-model="profile.communication.email" ng-change="deselectNoPreference()"><label for="comm-pref-email" class="preference-name">email</label></span></div><div class="preference"><i class="fa fa-comment"></i><br><span class="custom-checkbox"><input type="checkbox" name="comm-pref-txt" id="comm-pref-txt" ng-model="profile.communication.txt" ng-change="deselectNoPreference()"><label for="comm-pref-txt" class="preference-name">text</label></span></div><div class="preference"><i class="fa fa-phone"></i><br><span class="custom-checkbox"><input type="checkbox" name="comm-pref-phone" id="comm-pref-phone" ng-model="profile.communication.phone" ng-change="deselectNoPreference()"><label for="comm-pref-phone" class="preference-name">call</label></span></div><div class="preference"><i class="fa fa-ban"></i><br><span class="custom-checkbox"><input type="checkbox" name="comm-pref-no" id="comm-pref-no" ng-model="profile.communication.no" ng-change="deselectAllPreferences()"><label for="comm-pref-no" class="preference-name">no thanks</label></span></div></div><div class="form-component phone-again-form" ng-if="(!profile.mobilePhone || profile.mobilePhone.length === 0) && (profile.communication.txt || profile.communication.phone)"><div class="form-field"><label for="mobilePhone2" class="label-control">Phone number <span class="required">*</span></label><div class="input-control"><phone-input-checkout type="text" name="mobilePhone2" ng-model="profile.mobilePhone2" required></phone-input-checkout><div class="clearfix"></div><div class="warning-message" ng-if="!profile.mobilePhone2 || commForm.mobilePhone2.$invalid"><i class="fa fa-exclamation-triangle"></i> <span>You\'ve selected phone or text as your preferred communication method. Please provide a phone number above to continue.</span></div></div></div></div></div></div></div></div></div></form>'), 
    $templateCache.put("../assets/js/angular/ecommerce/_components/paymentMethod/paymentMethod.html", '<div class="payment-method {{classes}}"><div class="payment-method-header"><input type="checkbox" ng-model="isActive" ng-change="selectDeSelectPaymentMethod()"><div class="payment-method-title"><span>{{title}}</span></div></div><ng-transclude ng-if="isActive"></ng-transclude></div>'), 
    $templateCache.put("../assets/js/angular/ecommerce/_components/profileForm/profileForm.html", '<div class="form-component horizontal-form"><form class="my-information-form" name="profileForm" ng-submit="updateProfile()" novalidate><div class="form-field"><label for="first-name" class="label-control">First name <span class="required">*</span></label><div class="input-control"><input type="text" id="first-name" ng-model="model.firstName" name="firstName" required><div class="clearfix"></div><div class="error-message" ng-show="profileForm.$submitted && profileForm.firstName.$invalid"><div ng-show="profileForm.firstName.$error.required">First name is required</div></div></div></div><div class="form-field"><label for="last-name" class="label-control">Last name <span class="required">*</span></label><div class="input-control"><input type="text" id="last-name" ng-model="model.lastName" name="lastName" required><div class="clearfix"></div><div class="error-message" ng-show="profileForm.$submitted && profileForm.lastName.$invalid"><div ng-show="profileForm.lastName.$error.required">Last name is required</div></div></div></div><div class="form-field"><label for="email" class="label-control">Email <span class="required">*</span></label><div class="input-control"><input type="text" id="email" ng-model="model.emailAddress" name="email" required><div class="clearfix"></div><div class="error-message" ng-show="profileForm.$submitted && profileForm.email.$invalid"><div ng-show="profileForm.email.$error.required">Email is required</div></div></div></div><div class="form-footer"><label class="label-control"><a ng-click="forgotPassword()">Reset my password</a></label><submit-btn is-loading="_state.isLoading" is-disabled="_state.isLoading"><div class="clearfix"></div></div></form></div>'), 
    $templateCache.put("../assets/js/angular/ecommerce/_components/totalRemainig/totalRemainig.html", '<div class="payment-information"><div class="remaining-total"><div>Remaining Order Total: <span class="total">{{cart.remainingTotalOrder | cabiCurrency}}</span></div></div></div>'), 
    $templateCache.put("../assets/js/angular/ecommerce/_views/changePassword.html", '<div id="login-page"><div class="container"><div class="row"><div class="col-sm-6 col-md-6 col-lg-6 center-block"><div class="form-component horizontal-form"><form class="change-passsword-form" ng-submit="changePassword()" novalidate name="changePasswordForm"><div class="form-header"><h2>Change password:</h2><p class="form-description">Have you previously created an account when shopping with us online? Or do you have Hostess username and password? Sign in below.</p></div><div class="form-field"><label for="change-password-email" class="label-control">Email</label><div class="input-control"><input type="email" id="change-password-email" name="email" ng-model="changePasswordModel.username" required><div class="clearfix"></div><div class="error-message" ng-show="changePasswordForm.email.$invalid && changePasswordForm.email.$touched"><div ng-show="changePasswordForm.email.$error.required">Email is required</div><div ng-show="changePasswordForm.email.$error.email">Invalid Email</div></div></div></div><div class="form-field"><label for="current-password" class="label-control">Temporary Password</label><div class="input-control"><input type="password" id="current-password" class="" ng-model="changePasswordModel.password" name="currentPassword" required><div class="clearfix"></div><div class="error-message" ng-show="changePasswordForm.currentPassword.$invalid && changePasswordForm.currentPassword.$touched"><div ng-show="changePasswordForm.currentPassword.$error.required">Current password is required</div></div></div></div><div class="form-field"><label for="new-password" class="label-control">New password</label><div class="input-control"><input type="password" id="new-password" ng-model="changePasswordModel.newPassword" ng-minlength="8" name="newPassword" required><div class="clearfix"></div><div class="error-message" ng-show="changePasswordForm.newPassword.$invalid && changePasswordForm.newPassword.$touched"><div ng-show="changePasswordForm.newPassword.$error.required">New password is required</div><div ng-show="changePasswordForm.newPassword.$error.minlength">The password must be at least 8 characters</div></div></div></div><div class="form-field"><label for="new-password-validation" class="label-control">Confirm Password</label><div class="input-control"><input type="password" id="new-password-validation" ng-model="changePasswordModel.newPasswordVerify" compare-to="changePasswordModel.newPassword" name="newPasswordVerify" required><div class="clearfix"></div><div class="error-message" ng-show="changePasswordForm.newPasswordVerify.$invalid && changePasswordForm.newPasswordVerify.$touched"><div ng-show="changePasswordForm.newPasswordVerify.$error.required">New password is required</div><div ng-show="changePasswordForm.newPasswordVerify.$error.compareTo">The password does not match.</div></div></div></div><div class="form-footer"><button type="submit" class="pull-right btn" ng-class="{loading: isLoading}" ng-disabled="changePasswordForm.$invalid || isLoading"><preloader></preloader>Change password</button><div class="clearfix"></div></div></form></div></div></div></div></div>'), 
    $templateCache.put("../assets/js/angular/ecommerce/_views/checkout.html", '<sticky-message custom-message="{{customMessage}}" ng-hide="showOrderFlows || !isReplicatedSite"></sticky-message><div id="checkout-page"><div class="container"><div class="row"><div class="col-lg-12"><h1 class="page-title">Checkout</h1></div></div></div><div class="container"><div ng-show="!state.isLoading"><div class="row"><div class="col-lg-8"><check-out profile="profile.user" cart-data="checkout.generalData" remaining-total-order="checkout.remainingTotalOrder" show-order-flows="showOrderFlows"></check-out></div><div class="col-lg-4"><bag-summary cart-data="checkout.generalData"></bag-summary></div></div></div></div></div>'), 
    $templateCache.put("../assets/js/angular/ecommerce/_views/checkoutError.html", '<div class="dialog"><div class="dialog-body"><div class="dialog-header"><h2>{{checkoutError.title}}</h2><p>{{checkoutError.message}}</p></div><div class="dialog-footer"><button class="btn" ng-click="clearShowId()" ng-disabled="state.isLoading">OK</button></div></div></div>'), 
    $templateCache.put("../assets/js/angular/ecommerce/_views/createAccount.html", '<div id="login-page"><div class="container"><div class="row"><div class="col-sm-6 col-mg-6 col-lg-6 center-block"><div class="form-component white-component horizontal-form"><form class="create-profile-form" ng-submit="createProfile()" novalidate name="createProfileForm"><div class="form-header"><h2>Create An Account</h2><p class="form-description" ng-show="showPasswordInput">Create an account and make checking out fast and easy.</p><p class="form-description" ng-hide="showPasswordInput">Input your information below, then click "Create an Account" to receive an email with instructions to set your password.</p></div><div class="form-field"><label for="firstName" class="label-control">First Name <span class="required">*</span></label><div class="input-control"><input type="text" id="firstName" ng-model="createProfileModel.firstName" name="firstName" required><div class="clearfix"></div><div class="error-message" ng-show="createProfileForm.$submitted && createProfileForm.firstName.$invalid"><div ng-show="createProfileForm.firstName.$error.required">First name is required</div></div></div></div><div class="form-field"><label for="lastName" class="label-control">Last Name <span class="required">*</span></label><div class="input-control"><input type="text" id="lastName" ng-model="createProfileModel.lastName" name="lastName" required><div class="clearfix"></div><div class="error-message" ng-show="createProfileForm.$submitted && createProfileForm.lastName.$invalid"><div ng-show="createProfileForm.lastName.$error.required">Last name is required</div></div></div></div><div class="form-field"><label class="label-control" for="email">Email <span class="required">*</span></label><div class="input-control"><input type="email" id="email" ng-model="createProfileModel.email" name="email" ng-if="!newAccountEmail" required> <span ng-if="newAccountEmail">{{createProfileModel.email}}</span><div class="error-message" ng-show="createProfileForm.$submitted && createProfileForm.email.$invalid"><div ng-show="createProfileForm.email.$error.required">Email is required</div><div ng-show="createProfileForm.email.$error.email">Invalid Email</div></div></div></div><div ng-if="showPasswordInput"><div class="form-field"><label for="password" class="label-control">Password <span class="required">*</span></label><div class="input-control"><input type="password" id="password" ng-model="createProfileModel.password" ng-minlength="8" name="password" required><div class="clearfix"></div><div class="error-message" ng-show="createProfileForm.$submitted && createProfileForm.password.$invalid"><div ng-show="createProfileForm.password.$error.required">Password is required</div><div ng-show="createProfileForm.password.$error.minlength">Password must be at least 8 characters</div></div></div></div><div class="form-field"><label for="password-validation" class="label-control">Confirm Password <span class="required">*</span></label><div class="input-control"><input type="password" id="password-validation" ng-model="createProfileModel.passwordVerify" compare-to="createProfileModel.password" name="passwordVerify" required><div class="clearfix"></div><div class="error-message" ng-show="createProfileForm.$submitted && createProfileForm.passwordVerify.$invalid"><div ng-show="createProfileForm.passwordVerify.$error.required">Password is required</div><div ng-show="createProfileForm.passwordVerify.$error.compareTo">The password does not match.</div></div></div></div></div><div class="suscription-field"><div class="checkbox"><input id="suscription" type="checkbox" name="suscription" ng-model="createProfileModel.suscription"><label for="suscription">Stay in the know and receive our weekly emails with style tips, fashion trends, cabi events, and more.</label></div></div><div class="form-footer"><span class="required">* Required fields</span> <button type="submit" class="pull-right btn" ng-class="{loading: isLoading}" ng-disabled="isLoading"><preloader></preloader>Create an account</button><div class="clearfix"></div></div></form></div></div></div></div></div>'), 
    $templateCache.put("../assets/js/angular/ecommerce/_views/login.html", '<div id="login-page"><div class="container"><div class="row"><div class="col-sm-6 col-md-6 col-lg-6"><div class="login-form-container form-component horizontal-form"><form name="loginForm" class="login-form" ng-submit="loginForm.$valid && onSubmitLoginForm()" novalidate><div class="form-header"><h2>Returning Online Customer & Hostesses</h2><p class="form-description">Have you previously created an account when shopping with us online? Or do you have a Hostess username and password? Sign in below.</p></div><div class="form-field"><label for="login-email" class="label-control">Email</label><div class="input-control"><input type="email" id="login-email" name="email" ng-model="loginModel.email" ng-class="{\'invalid\': loginErrors.email}" required><div class="clearfix"></div><div class="error-message" ng-show="loginForm.$submitted && loginForm.email.$invalid || loginErrors.email"><div ng-show="loginForm.email.$error.required">Email is required</div><div ng-show="loginForm.email.$error.email">Invalid Email</div><div ng-show="loginErrors.email"><div ng-if="loginErrors.email.code === -30506">Shopping with a new Stylist? Please verify your information and <a ng-click="onSetNewPasswordLinkClick(loginModel)">set a new password</a>.</div><div ng-if="loginErrors.email.code !== -30506">{{loginErrors.email.message}}</div></div></div></div></div><div class="form-field"><label for="login-password" class="label-control">Password</label><div class="input-control"><input type="password" id="login-password" name="password" ng-model="loginModel.password" ng-class="{\'invalid\': loginErrors.password}" required><div class="clearfix"></div><div class="error-message" ng-show="loginForm.$submitted && loginForm.password.$invalid || loginErrors.password"><div ng-show="loginForm.password.$error.required">Password is required</div><div ng-show="loginErrors.password">Password does not match email provided.</div></div></div></div><div class="form-footer"><a href="" ng-click="onClickForgotPasswordLink()" id="forgot-password-btn">Forgot password</a> <button type="submit" class="pull-right btn" ng-class="{loading: isLoginFormSending}" ng-disabled="isLoginFormSending"><preloader></preloader>Sign in</button></div></form></div></div><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-component white-component horizontal-form"><form novalidate name="guestUserForm"><div class="form-header"><h2>New Online Customer:</h2><p class="form-description">Shopped at a show, or with a Stylist, but never shopped online? Input your email address below to receive an email with instructions to set your password.</p><p class="form-description">New to cabi? Input your email address to create an account.</p></div><div class="form-field"><label for="guest-user-email" class="label-control">Email</label><div class="input-control"><input type="email" id="guest-user-email" ng-model="guestUserModel.email" name="email" required><div class="clearfix"></div><div class="error-message" ng-show="guestUserForm.$submitted && guestUserForm.email.$invalid || customSearchEmailError"><div ng-show="guestUserForm.email.$error.required">Email is required</div><div ng-show="guestUserForm.email.$error.email">Invalid Email Address</div><div ng-show="emailExists">This email is already associated with a customer profile. <a ui-sref="reset-password">Set a new password</a></div></div></div></div><div class="form-footer"><div class="container-fluid"><div class="row"><div class="col-lg-7 col-md-7 login-guest" ng-hide="showOrderFlows" ng-if="comesFromCheckout"><button type="button" class="btn btn-text" ng-class="{loading: isLoginAsGuestUser}" ng-disabled="isLoginAsGuestUser || isValidatingEmail" ng-click="onClickLoginAsGuest()"><preloader color="000"></preloader><span>No thanks, continue as guest</span></button></div><div class="col-lg-5 col-md-5 create-account" ng-show="!isLoginAsGuestUser"><button type="button" class="btn btn-full" ng-class="{loading: isValidatingEmail}" ng-disabled="isValidatingEmail" ng-click="onClickCreateAccount()"><preloader></preloader>Create account</button></div></div></div></div></form></div></div></div></div></div><div class="container" style="margin-top: 40px"><div class="row"><div class="col-sm-12 col-md-12 col-lg-12"><sticky-message custom-message="{{customMessage}}" ng-hide="showOrderFlows"></sticky-message></div></div></div>'), 
    $templateCache.put("../assets/js/angular/ecommerce/_views/orderConfirmation.html", '<div class="attached-ecomm" id="confirmation-page" document-position="0"><div class="container" ng-if="!lastOrder"><div class="row justify-content-center"><div class="col-lg-12"><h1>Oops!</h1><div class="col-lg-12"><p>Sorry, we couldn\'t find the page you were looking for, but don\'t rush off...</p></div><p class="col-lg-12"><button type="submit" class="ae-btn btn-continue montserrat learn-more" ng-click="whatIsCabi()">LEARN MORE ABOUT cabi</button></p></div></div></div><div class="container" ng-if="lastOrder"><div class="row justify-content-center"><div class="col-lg-12"><h1>Thank you for your order, {{firstName}} {{lastName}}!</h1><div class="col-lg-12"><p>Your fabulous pieces will be on their way soon&mdash;brace yourself for a barrage of compliments!</p></div><p class="col-lg-12">Your order number: <span class="order-number">{{confirmationId}}</span></p></div><div class="col-lg-12 gift-cards" ng-show="giftCards.length"><span>YOUR GIFT CARDS</span><table class="table"><thead><tr><th>SENDER NAME</th><th>RECIPIENT NAME</th><th>AMOUNT</th><th></th></tr></thead><tbody><tr ng-repeat="giftCard in giftCards"><td>{{giftCard.sender}}</td><td>{{giftCard.recipient}}</td><td>{{giftCard.amount | cabiCurrency}}</td><td><a href="{{giftCard.gcurl}}" target="_blank" class="btn">Print</a></td></tr></tbody></table></div></div><div class="row meet-stylist" ng-if="guestStylist"><div class="meet-stylist-info-card"><div class="stylist-info"><div ng-show="!guestStylist.imageLoaded" class="spinner-wrapper"><span class="spinner ng-animate-disabled"></span></div><div ng-show="guestStylist.imageLoaded" class="selected-stylist"><img ng-src="{{guestStylist.profilePhoto}}" image-onload="imageLoaded(guestStylist)"></div></div><div class="info-card-wrapper"><div class="info-card"><h2 class="title">{{\'Meet your cabi Stylist, \' + guestStylist.firstName + \' \' + guestStylist.lastName + \'!\'}}</h2><div class="contacts col-sm-12"><div><i class="fa fa-envelope"></i> <a href="{{\'mailto:\' + guestStylist.emailAddress}}" target="_top">Email</a></div><div><i class="fa fa-phone"></i> <a href="{{\'tel:\' + guestStylist.phoneNumber | phoneNumber}}">{{guestStylist.phoneNumber}}</a></div></div></div></div></div><div class="row"><p class="subtitle col-sm-12" ng-if="guestCheckout">{{guestStylist.firstName}} lives near you in {{guestStylist.city}}. She can offer you personal styling services&mdash;for free! She’ll also take care of any returns or exchanges for you.</p><p class="subtitle col-sm-12" ng-if="!guestCheckout">{{guestStylist.firstName + \' \' + guestStylist.lastName}} lives near you in {{guestStylist.city}}! She can help you find just what you’re looking for, styled in a way that’ll have you feeling better than ever. Need help with sizing, a return, or exchange? Want to see a piece in person? Interested in having your own Fashion Experience? Contact {{guestStylist.firstName + \' \' + guestStylist.lastName}} any time by email or phone.</p></div></div><div class="row" ng-if="guestStylist"><p class="ps-text" ng-if="!guestCheckout"><strong>P.S.</strong> You can access {{guestStylist.firstName}}’s contact information anytime by clicking on her photo on the menu bar once you’re logged in.</p><button type="submit" class="ae-btn btn-continue montserrat" ng-click="gotIt()">Got it - Thanks!</button></div>\x3c!-- Google Code for Purchase Conversion Page --\x3e<script type="text/javascript">var google_conversion_id = 1031435614;\n            var google_conversion_language = "en";\n            var google_conversion_format = "3";\n            var google_conversion_color = "ffffff";\n            var google_conversion_label = "IMIRCLr5gHAQ3urp6wM";\n            var google_conversion_value = \'{{lastOrder.grandTotal}}\';\n            var google_conversion_currency = \'{{currencyCode}}\';\n            var google_remarketing_only = false;<\/script><script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js"><\/script><noscript><div style="display:inline"><img height="1" width="1" style="border-style:none" alt="" src="//www.googleadservices.com/pagead/conversion/1031435614/?value={{lastOrder.grandTotal}}&amp;currency_code={{currencyCode}}&amp;label=IMIRCLr5gHAQ3urp6wM&amp;guid=ON&amp;script=0"></div></noscript><script>window.addEventListener(\'load\', function() {\n                  if (document.getElementById(\'item-information\')) {\n                    //product\n' + "                    var pid = document.getElementById('detail-images-wrapper').getAttribute('product-thumbnail-images');\n                    var price = document.getElementsByClassName('price')[0].innerText.replace(/[^0-9.]/g, '');\n                      google_tag_params = {\n                          ecomm_prodid: pid,\n                          ecomm_pagetype: \"product\",\n                          ecomm_totalvalue: parseFloat(price)\n                      };\n                  } else if (window.location.pathname === \"/cart/\") {\n                      //cart\n                      var pid = [];\n                      var len = jQuery('.shop-td.image img:odd').length;\n                      var price = jQuery('.subtotal-amount:last').text().replace(/[^0-9.]/g, '');\n                      for (i = 0; i < len; i++) {\n                          pid.push(jQuery('.shop-td.image img:odd')[i].getAttribute('ng-src').split('/').reverse()[0].split('-')[0]);\n                      }\n                      google_tag_params = {\n                          ecomm_prodid: pid,\n                          ecomm_pagetype: \"cart\",\n                          ecomm_totalvalue: parseFloat(price)\n                      };\n                  } else if (window.location.pathname === \"/\") {\n                      //home\n                      google_tag_params = {\n                          ecomm_pagetype: \"home\"\n                      };\n                  } else if (document.getElementById('item-category-filter')) {\n                      //category\n                      google_tag_params = {\n                          ecomm_pagetype: \"category\"\n                      };\n                  } else if (window.location.href.indexOf(\"success url\") !== -1) {\n                      //purchase\n                      google_tag_params = {\n                          ecomm_pagetype: \"purchase\"\n                      };\n                  } else {\n                      //other\n                      google_tag_params = {\n                          ecomm_pagetype: \"other\"\n                      };\n                  }\n                  var gtp = window.google_tag_params;\n                  gtag('event', 'page_view', {\n                      'send_to': 'AW-1031435614',\n                      'ecomm_prodid': (gtp && gtp.ecomm_prodid) ? gtp.ecomm_prodid : '',\n                      'ecomm_pagetype': (gtp && gtp.ecomm_pagetype) ? gtp.ecomm_pagetype : '',\n                      'ecomm_totalvalue': (gtp && gtp.ecomm_totalvalue) ? gtp.ecomm_totalvalue : ''\n                  });\n                })<\/script></div></div>"), 
    $templateCache.put("../assets/js/angular/ecommerce/_views/profile.html", '<div id="profile-page"><div class="container"><div class="row"><div class="hidden-xs hidden-sm col-md-3 col-lg-3"><div class="sidebar"><div class="module"><ul class="menu vertical-menu"><li ui-sref-active="active"><a ui-sref="profile">My information</a></li><li><a ng-click="signOut()">Sign out</a></li></ul></div><div class="module"><div class="consultant-card"><div class="profile-image"><img id="avatar-img" ng-src="{{avatar}}" alt="Cabi Stylist" onerror="this.onerror = null; this.src = TEMPLATE_DIR + \'/assets/images/404/avatar.png\';"></div><div class="profile-data"><span class="profile-label">YOUR CABI STYLIST</span> <span class="profile-name">{{profile.consultant.FirstName}} {{profile.consultant.LastName}}</span> <span ng-if="profile.consultant.contactNumber" class="profile-telephone-number"><a href="tel: {{profile.consultant.contactNumber}}"><i class="fa fa-phone"></i>{{profile.consultant.contactNumber}} </a></span><span class="profile-email"><i class="fa fa-envelope-o"></i> <a show-contact-stylist-modal>Email</a></span></div></div></div></div></div><div class="col-sm-12 col-md-7 col-lg-7"><div class="main-content"><div class="module"><div class="module-title"><h2>My Information</h2></div><div class="module-content"><div class="container-fluid"><div class="row"><div class="col-lg-10"><profile-form model="profile.user"></div></div></div></div></div>\x3c!-- Addresses --\x3e<div class="module address-card-module"><div class="module-title"><h2>Mailing Address</h2></div><div class="module-content"><address-card model="profile.user.mailingAddress" props="{type: \'GENERAL_LOCATION\'}" profile="profile.user"></address-card></div></div><div class="module address-card-module"><div class="module-title"><h2>Shipping Address</h2></div><div class="module-content"><address-card model="profile.user.shippingAddress" props="{type: \'SHIPPING_LOCATION\'}" profile="profile.user"></address-card></div></div>\x3c!-- Payment --\x3e<div class="module"><div class="module-title"><h2>Payment information</h2></div><div class="module-content" ng-if="profile.user"><credit-card-list profile="profile.user" mode="PROFILE"></credit-card-list></div></div></div></div></div></div></div>'), 
    $templateCache.put("../assets/js/angular/ecommerce/_views/resetPassword.html", '<div id="login-page"><div class="container"><div class="row"><div class="col-sm-6 col-md-6 col-lg-6 center-block"><div class="form-component horizontal-form white-component"><form class="reset-password-form" ng-submit="resetPassword()" novalidate name="resetPasswordForm"><div class="form-header"><h2>Set/Reset Password:</h2><p class="form-description">Enter your email address to receive an email with a temporary password and instructions to set or reset your password.</p></div><div class="form-field"><label for="search-email" class="label-control">Email</label><div class="input-control"><input type="email" id="search-email" class="" ng-model="resetPasswordModel.email" name="email" required><div class="error-message" ng-show="resetPasswordForm.email.$invalid && resetPasswordForm.email.$touched || resetPasswordErrors"><div ng-show="resetPasswordForm.email.$error.required">Email is required</div><div ng-show="resetPasswordForm.email.$error.email">Invalid email</div><div ng-show="resetPasswordErrors.contactFoundInOtherAddressBook">We found your email, but it looks like you\'re shopping with a new Stylist. <a ui-sref="create-account" ng-click="setGlobalVariables()">Click here</a> to verify your information and set a new password.</div><div ng-show="resetPasswordErrors.contactNotFoundInAddressBook">Shopping with a new Stylist? Please verify your information and <a ui-sref="create-account" ng-click="setGlobalEmailToCreateAccount(resetPasswordModel.email)">set a new password</a>.</div></div></div></div><div class="form-footer"><button type="submit" class="pull-right btn" ng-class="{loading: isLoading}" ng-disabled="resetPasswordForm.$invalid || isLoading"><preloader></preloader>Send email</button><div class="clearfix"></div></div></form></div></div></div></div></div>'), 
    $templateCache.put("../assets/js/angular/ecommerce/_views/validateAddressesPopup.html", '<div class="dialog"><div class="dialog-body"><div class="dialog-header"><h2>Oops!</h2><p>We can\'t verify the address you entered.<br>Please select one of the suggested addresses below:</p></div><div class="dialog-content"><ul class="valid-address-list"><li ng-repeat="address in validateAddresses" ng-click="selectAddress(address)"><span>{{address.address1}}, </span><span ng-if="address.address2">{{address.address2}}, </span><span>{{address.city}}, </span><span>{{address.stateProvinceGeoId}}, </span><span>{{address.postalCode}}</span></li><li ng-click="selectAddress(false)">Original entered address</li></ul></div></div></div>'), 
    $templateCache.put("../assets/js/angular/exchange-and-return/components/any-result/any-result.html", '<div class="any-result"><h2 class="title">Returns & Exchanges</h2><p class="heavy subtitle">We found your order(s)!</p><div class="table-wrapper"><table><thead><tr><th>Order #</th><th>Date</th><th>Total</th><th>Ship To</th><th>Stylist Name</th></tr></thead><tbody><tr ng-repeat="order in $ctrl.orders"><td>{{order.orderId}}</td><td>{{order.orderDate | date:\'MM/dd/yyyy\'}}</td><td>{{order.grandTotal | cabiCurrency}}</td><td>{{order.shipTo}}</td><td>{{order.stylist.firstName + \' \' + order.stylist.lastName}}</td></tr></tbody></table></div><div class="row"><p class="subtitle">Cabi accepts returns and exchanges within 30 days of receiving your order. To process your return, contact the cabi Stylist that is associated with your order at the contact information below.</p></div><div class="stylist-info-wrapper"><div class="stylist-info" ng-repeat="stylist in $ctrl.stylists"><div ng-show="!stylist.imageLoaded" class="profile-photo spinner-wrapper"><span class="spinner ng-animate-disabled"></span></div><div ng-show="stylist.imageLoaded" class="profile-photo"><img ng-src="{{stylist.profilePhoto}}" image-onload="$ctrl.imageLoaded(stylist)"></div><p>{{stylist.firstName + \' \' + stylist.lastName}}</p><p>{{stylist.city}}, {{stylist.stateId}}</p><div class="contacts"><div><i class="fa fa-envelope"></i> <a href="{{\'mailto:\' + stylist.emailAddress}}" target="_top">Email</a></div><div><i class="fa fa-phone"></i> <a href="{{\'tel:\' + stylist.phoneNumber | phoneNumber}}">{{stylist.phoneNumber}}</a></div></div></div></div><div class="row"><button type="submit" class="ae-btn btn-continue" ng-disabled="$ctrl.isLoading" ng-click="$ctrl.continue()">Got it - thanks! <span ng-show="$ctrl.isLoading" class="spinner ng-animate-disabled"></span></button></div><div><a class="montserrat link-cancel" ng-click="$ctrl.back()">I don\'t see my order</a></div></div>'), 
    $templateCache.put("../assets/js/angular/exchange-and-return/components/exchange-and-return-form/exchange-and-return-form.html", '<div class="exchange-and-return-form"><h2 class="title">Returns & Exchanges</h2><div class="subtitle-row"><p class="subtitle">We want you to love it! That\'s why every cabi customer gets assigned a personal cabi Stylist to help pick things you love and ensure you get just the right fit.</p><p class="subtitle">We\'re sorry your purchase didn\'t work out. Your cabi Stylist is standing by to help with your return. Enter your information below to get yout Stylist\'s contact information.</p></div><form name="exchangeAndReturnForm" ng-submit="$ctrl.continue()"><div class="form-field"><custom-input type="text" name="orderNumber" placeholder="order number (if available)" ng-model="$ctrl.form.orderNumber" disabled="$ctrl.isLoading"></custom-input></div><div class="form-field"><custom-input type="email" name="email" placeholder="email address *" ng-model="$ctrl.form.email" disabled="$ctrl.isLoading" required></custom-input></div><div class="form-field"><custom-input type="text" name="address1" placeholder="street address *" ng-model="$ctrl.form.address1" disabled="$ctrl.isLoading" required></custom-input></div><div class="form-field"><custom-input type="text" name="address2" placeholder="street address 2" ng-model="$ctrl.form.address2" disabled="$ctrl.isLoading"></custom-input></div><div class="form-field"><custom-input type="text" name="city" placeholder="city *" ng-model="$ctrl.form.city" disabled="$ctrl.isLoading" required></custom-input></div><div class="form-field"><custom-dropdown options="$ctrl.states" ng-model="$ctrl.form.state" display-property="name" disabled="$ctrl.isLoading" placeholder="{{$ctrl.countryLabels.state.toLowerCase()}} *" track-by="code" required></custom-dropdown></div><div class="form-field"><custom-input type="text" name="zipCode" placeholder="{{$ctrl.countryLabels.zipCode.toLowerCase()}} *" ng-model="$ctrl.form.zipCode" disabled="$ctrl.isLoading" required></custom-input></div><p class="error" ng-if="$ctrl.error">{{$ctrl.error}}</p><div class="row"><button type="submit" class="ae-btn btn-continue" ng-disabled="exchangeAndReturnForm.$invalid || $ctrl.isLoading">Continue <span ng-show="$ctrl.isLoading" class="spinner ng-animate-disabled"></span></button></div></form></div>'), 
    $templateCache.put("../assets/js/angular/exchange-and-return/components/no-result/no-result.html", '<div class="no-result"><h2 class="title">Returns & Exchanges</h2><p class="subtitle">We couldn\'t find your order based on the information provided. Please try again.</p><div class="row"><button type="submit" class="ae-btn btn-try-again" ng-click="$ctrl.tryAgain()">Try again</button></div></div>'), 
    $templateCache.put("../assets/js/angular/exchange-and-return/exchange-and-return.html", '<div class="attached-ecomm"><exchange-and-return-form ng-if="$ctrl.isComponentActive($ctrl.components.exchangeAndReturnForm)" attrs="$ctrl.getAttrs()"></exchange-and-return-form><no-result ng-if="$ctrl.isComponentActive($ctrl.components.noResult)" attrs="$ctrl.getAttrs()"></no-result><any-result ng-if="$ctrl.isComponentActive($ctrl.components.anyResult)" attrs="$ctrl.getAttrs()"></any-result></div>'), 
    $templateCache.put("../assets/js/angular/fashion-show/fashionShow.html", '<div class="fashion__header"><object class="fashion__logo" type="image/svg+xml" data="/wp-content/themes/cabi/assets/svgs/cabilogo-white.svg"><img class="fashion__logo" src="/wp-content/themes/cabi/assets/images/global/cabi-logo-fallback-white.png"></object></div><ui-view><script src="//connect.facebook.net/en_US/all.js" type="text/javascript" charset="utf-8" async defer="defer" id="facebook-jssdk"><\/script>'), 
    $templateCache.put("../assets/js/angular/fashion-show/login-form/form.html", '<div class="container"><div class="fashion__body"><h2 class="fashion__body-title h2">login</h2><form method="post" class="fashion__form" ng-submit="$ctrl.onLogin()"><div class="fashion__form-fieldset" ng-class="{\'has-error\': $ctrl.error}"><input type="email" name="login[email]" ng-model="$ctrl.form.email" placeholder="Email Address"></div><div ng-if="$ctrl.error" class="fashionshow__error-message"><span>{{$ctrl.error}}</span></div><input type="hidden" name="form" value="fashionshow_login"> <button type="submit" class="btn fashion__btn--white">LOGIN</button></form><div class="fashion__breadcrumb"><a class="fashion__breadcrumb-link color-white" ng-click="$ctrl.$state.go(\'fs.register\')">Not registered?</a></div><div class="fashion__breadcrumb montserrat uppercase" style="font-size: .85em">Learn about our <a class="fashion__breadcrumb-link color-white" href="/privacy-policy">privacy policy</a></div></div></div>'), 
    $templateCache.put("../assets/js/angular/fashion-show/login/login.html", '<div class="fashion__header"><p class="fashion__pretitle h3">Watch our</p><h1 class="fashion__title h2">Spring 2019 Fashion Show!</h1><p class="fashion__sub-title">Already registered? Log in below with your email address and the password received in your email.<br>Not registered? Click "need to register" below.</p></div><div class="container"><div class="fashion__body"><div class="fashion__body"><div ng-if="$ctrl.access_denied" class="fashionshow__error-message fashionshow__error-message--login">You must log in to access the fashion show video</div><a class="btn fashion__btn fashion__btn--white" href="" ng-click="$ctrl.$state.go(\'fs.login-form\')"><i class="fa fa-envelope" aria-hidden="true"></i> <span class="fashion__btn-span">Registered w/ Email</span></a> <a class="btn fashion__btn fashion__btn--blue" ng-click="$ctrl.onLoginWithFacebook()"><i class="fa fa-facebook"></i> <span class="fashion__btn-span">Connected w/ Facebook</span></a></div><div class="fashion__breadcrumb"><a class="fashion__breadcrumb-link color-white" ng-click="$ctrl.$state.go(\'fs.register\');">Need to register?</a></div></div></div>'), 
    $templateCache.put("../assets/js/angular/fashion-show/password-check/password-check.html", '<div class="container"><div class="fashion__body"><h2 class="fashion__body-title h2">Enter Password</h2><p>Check your inbox for {{$ctrl.EmailAddress.value}} for your exclusive Fashion Show password!</p><form method="post" class="fashion__form" ng-submit="$ctrl.onCheckPassword()"><div class="fashion__form-fieldset"><input type="password" name="password" ng-model="$ctrl.form.password" required placeholder="Enter Password"></div><div ng-if="$ctrl.error" class="fashionshow__error-message">{{$ctrl.error}}</div><button class="btn fashion__btn--white" type="submit">Submit</button></form><div class="fashion__breadcrumb"><a class="fashion__breadcrumb color-white" ng-click="$ctrl.$state.go(\'fs.register\')">Forgot the password?</a></div></div></div>'), 
    $templateCache.put("../assets/js/angular/fashion-show/register/fashionShowRegister.html", '<div class="fashion__header"><p class="fashion__pretitle h3">Countdown to our</p><h1 class="fashion__title h2">Spring 2019 Fashion Show!</h1><p class="fashion__sub-title">Get insider access to the debut of our highly-anticipated Spring 2019 Collection on the runway!</p></div><div class="container"><div class="fashion__body"><h2 class="fashion__body-title fashion__body-title--no-italic">Register now to watch the recorded broadcast</h2><a class="btn fashion__btn fashion__btn--white" href="" ng-click="$ctrl.$state.go(\'fs.registration-form\')"><i class="fa fa-envelope" aria-hidden="true"></i> <span class="fashion__btn-span">Register by Email</span></a> <a class="btn fashion__btn fashion__btn--blue" ng-click="$ctrl.onFacebookRegister()"><i class="fa fa-facebook"></i> <span class="fashion__btn-span">Connect by Facebook</span></a><div class="fashion__breadcrumb"><a class="fashion__breadcrumb-link color-white" ng-click="$ctrl.$state.go(\'fs.login\')">Already registered?</a></div></div></div>'), 
    $templateCache.put("../assets/js/angular/fashion-show/registration-form/form.html", '<div class="container"><div class="fashion__body"><h2 class="fashion__body-title h2">register with email</h2><form class="fashion__form" ng-submit="$ctrl.onRegister()" novalidate><p class="mb2em">We\'ll email you when the Spring 2019 Fashion Show re-broadcast is available to watch, and you\'ll be added to our mailing list for future cabi fashion shows so you won\'t have to register again in the future.</p><div class="fashion__form-fieldset"><input type="text" name="registration[name]" ng-model="$ctrl.form.name" placeholder="First & Last Name"></div><div class="fashion__form-fieldset fashion__form-fieldset--flex-row" ng-class="{\'has-error\': $ctrl.error_message}"><label class="" ng-class="{ \'active\' : $ctrl.settings.emailFocused }"><i class="fa fa-envelope" aria-hidden="true"></i></label><input type="email" name="registration[email]" ng-model="$ctrl.form.email" ng-focus="$ctrl.settings.emailFocused = true" placeholder="Email Address"></div><div class="fashionshow__error-message" ng-if="$ctrl.error_message"><span>{{$ctrl.error_message}}</span></div><div class="fashion__form-field fashion__form-field--flex-row"><input type="checkbox" name="registration[mailinglist]" ng-model="$ctrl.form.mailing_list_opt_in" value="true"><label>Sign me up for exclusive emails on the latest fashion tips, cabi events, and Collection announcements! <a class="fashion__breadcrumb-link color-white" href="/privacy-policy">Privacy Policy</a></label></div><button class="btn fashion__btn--white" type="submit">Register</button></form><div class="fashion__breadcrumb"><a class="fashion__breadcrumb color-white" ng-click="$ctrl.$state.go(\'fs.login\')">Already registered?</a></div></div></div>'), 
    $templateCache.put("../assets/js/angular/favorites/directives/favorite-item.html", '<div class="item-product" ng-mouseenter="vm.settings.isHovering = true" ng-mouseleave="vm.settings.isHovering = false"><div class="favorite-product collection-item"><button class="m-remove-btn" ng-click="vm.onRemoveFromFavorite($event, vm.product.productId);" ng-if="vm.showRemoveBtn"><i class="fa fa-times"></i></button><div class="entry-content"><div class="item_photos"><div class="item_image_main" ng-style="{\'background-image\': \'url(\'+vm.getProductImage()+\'?h=356)\'}"></div><div class="product-info" ng-class="{\'hovering\': vm.settings.isHovering}"><a ng-href="/redirect.php?{{vm.product.productId ? \'product_id=\'  + vm.product.productId : \'\'}}" title="cabi\'s {{vm.product.name}}" rel="bookmark"><div class="inner"><div class="content"><div quicklook product-id="{{vm.product.productId}}" preselected-product="vm.favoriteId" class="quick-look" ng-hide="vm.settings.disableQuickLook"><span>Quick Look</span></div><div class="collecion-item__remove-from-wishlist" ng-click="vm.onRemoveFromFavorite($event, vm.product.productId);" ng-if="vm.showRemoveBtn"><span>Remove</span></div></div></div></a></div></div><div class="item_description"><h2><a href="/collection/clothes/cinch-belt/" title="{{vm.product.productName}}"><span ng-bind-html="vm.product.name | to_trusted" class="ng-binding"></span></a></h2><a class="price" href="/collection/clothes/cinch-belt/" title="{{vm.product.productName}}"><span>{{vm.product.price}}</span></a></div></div></div></div>'), 
    $templateCache.put("../assets/js/angular/favorites/directives/favorites-listing.html", '<div class="favorites-listing"><div class="products item-grid"><ul><li ng-repeat="(favoriteId, favoriteInfo) in favoritesInfo" class="item"><favorite-item favorite-id="favoriteId" product="favoriteInfo" on-remove-item="vm.onRemoveFromFavorite(favoriteId)" show-remove-btn="showRemoveBtn"></favorite-item></li></ul></div></div>'), 
    $templateCache.put("../assets/js/angular/favorites/directives/quicklook-favorites.html", '<a class="quicklook-favorites-btn" ng-disabled="!$ctrl.productData || $ctrl.isDataLoading|| $ctrl.isProductOnFavorites || $ctrl.disabled" ng-click="$ctrl.addOrMoveToFavorites($event)" ng-if="$ctrl.format === \'icon\'"><loading-icon ng-show="$ctrl.isDataLoading"></loading-icon><span ng-if="!$ctrl.isProductOnCart && $ctrl.isProductOnFavorites && !$ctrl.isDataLoading"><svg xmlns="http://www.w3.org/2000/svg" height="23" viewBox="0 0 19 16" width="26"><path d="m9.23504704 1.86603129c-.92947852-.82690182-2.41821621-1.86603129-4.03350446-1.86603129-3.20856771 0-5.20154258 1.95642455-5.20154258 5.10564712 0 2.63319496 2.37694972 4.74525313 2.38009383 4.74682518l6.01311685 5.8008892c.22323205.2236251.52192282.3466385.84183636.3466385.31952052 0 .61821129-.1230134.83319006-.3383852l6.0115448-5.78949179-.4087348-.4244553.4264204.40755569c.5565081-.53292721 2.3726266-2.45005035 2.3726266-4.74957628 0-3.14922257-1.9933679-5.10564712-5.2019356-5.10564712-1.6152883 0-3.104026 1.03912947-4.03311146 1.86603129z" fill-rule="evenodd"/></svg> </span><span ng-if="!$ctrl.isProductOnCart && !$ctrl.isProductOnFavorites && !$ctrl.isDataLoading"><svg xmlns="http://www.w3.org/2000/svg" height="23" viewBox="0 0 19 16" width="26"><path d="m5.20154258 2.41428607c1.11969738 0 2.57817298 1.30755815 3.10599101 1.93795288.22323205.26921471.56083123.42366928.92751345.42366928.36628921 0 .7042814-.15445457.92436936-.42052516.5309621-.63353885 1.9894377-1.941097 3.1087421-1.941097 1.8758566 0 2.7876495.88035174 2.7876495 2.69136105 0 1.41878117-1.4569035 2.84306453-1.6333669 3.01048857l-5.18739406 4.99953331-5.20586574-5.01800498c-.60013264-.56594041-1.61528825-1.8330181-1.61528825-2.9920169 0-1.81100931.9121859-2.69136105 2.78764953-2.69136105m8.06661592-2.41428607c-1.6152883 0-3.104026 1.03912947-4.03311146 1.86603129-.92947852-.82690182-2.41821621-1.86603129-4.03350446-1.86603129-3.20856771 0-5.20154258 1.95642455-5.20154258 5.10564712 0 2.63319496 2.37694972 4.74525313 2.38009383 4.74682518l6.01311685 5.8008892c.22323205.2236251.52192282.3466385.84183636.3466385.31952052 0 .61821129-.1230134.83319006-.3383852l6.0115448-5.78949179-.4087348-.4244553.4264204.40755569c.5565081-.53292721 2.3726266-2.45005035 2.3726266-4.74957628 0-3.14922257-1.9933679-5.10564712-5.2019356-5.10564712" fill-rule="evenodd"/></svg> </span><span ng-if="$ctrl.isProductOnCart && !$ctrl.isDataLoading"><svg xmlns="http://www.w3.org/2000/svg" height="23" viewBox="0 0 19 16" width="26"><path d="m9.23504704 1.86603129c-.92947852-.82690182-2.41821621-1.86603129-4.03350446-1.86603129-3.20856771 0-5.20154258 1.95642455-5.20154258 5.10564712 0 2.63319496 2.37694972 4.74525313 2.38009383 4.74682518l6.01311685 5.8008892c.22323205.2236251.52192282.3466385.84183636.3466385.31952052 0 .61821129-.1230134.83319006-.3383852l6.0115448-5.78949179-.4087348-.4244553.4264204.40755569c.5565081-.53292721 2.3726266-2.45005035 2.3726266-4.74957628 0-3.14922257-1.9933679-5.10564712-5.2019356-5.10564712-1.6152883 0-3.104026 1.03912947-4.03311146 1.86603129z" fill-rule="evenodd"/></svg> </span></a><button class="btn btn-black" ng-disabled="!$ctrl.productData || $ctrl.isDataLoading|| $ctrl.isProductOnFavorites || $ctrl.disabled" ng-click="$ctrl.addOrMoveToFavorites($event)" ng-if="$ctrl.format === \'text\'"><loading-icon ng-show="$ctrl.isDataLoading"></loading-icon><span ng-if="!$ctrl.isProductOnCart && $ctrl.isProductOnFavorites && !$ctrl.isDataLoading">Added to Favorites!</span> <span ng-if="!$ctrl.isProductOnCart && !$ctrl.isProductOnFavorites && !$ctrl.isDataLoading">Add to Favorites</span> <span ng-if="$ctrl.isProductOnCart && !$ctrl.isDataLoading">Move to Favorites</span></button>'), 
    $templateCache.put("../assets/js/angular/favorites/favorites-consultant-modal.html", '<div id="modal-knockout"></div><div id="modal"><a ng-click="$ctrl.closeModal();" id="modal-close"><span>+</span></a><div id="favorites-consultant-content"><div class="align-center"><div class="message-body" ng-if="$ctrl.stylistList.length > 1"><h3>Looks like you have worked with multiple Stylists</h3><p>Select the stylist you\'re currently working with to continue</p></div><div class="message-body" ng-if="$ctrl.stylistList.length === 1"><h3>We found your stylist!</h3><p>Please confirm below</p></div><div class="message-body" ng-if="!$ctrl.stylistList || $ctrl.stylistList.length === 0"><h3>We couldn’t find your Stylist</h3><p>From what we can tell, it doesn\'t look like you have a cabi Stylist just yet. Let\'s solve that problem, so you can sign in and view your favorites.</p><p>Click "Continue" below to answer a few questions, and we\'ll get you hooked up with cabi Stylist.</p></div><div ng-if="$ctrl.stylistList.length > 0"><div class="stylist-listing"><div class="stylist-listing--item" ng-repeat="stylist in $ctrl.stylistList" ng-class="{selected: $ctrl.selected.partyId === stylist.partyId}" ng-click="$ctrl.selectStylist(stylist)"><span class="avatar" ng-style="{\'background-image\': \'url(\' + stylist.profilePhoto + \')\'}"></span> <span class="stylist-item--name"><span>{{stylist.firstName}}</span> <span>{{stylist.lastName}}</span></span></div></div></div><div class="message-footer"><button class="btn btn-black" ng-click="$ctrl.goToNext()">Continue</button> <a class="btn-link" ng-click="$ctrl.closeModal();" ng-if="!$ctrl.stylistList || $ctrl.stylistList.length === 0">Already have a Stylist? Check your email address and try signing in again</a> <a href="/become-a-consultant/?lead=help-menu" class="btn-link" ng-if="$ctrl.stylistList.length > 0">I don\'t see my stylist</a></div></div></div></div>'), 
    $templateCache.put("../assets/js/angular/favorites/favorites-share-modal.html", '<div id="modal-knockout"></div><div id="modal"><a ng-click="$ctrl.closeModal();" id="modal-close"><span>+</span></a><div id="wishlist-share-content"><div class="align-center"><h1 class="uppercase mb10 montserrat">Share this link:</h1><input style="width: 100%" type="text" id="wishlist-link-input" ng-value="$ctrl.url" class="mb10"> <span class="mb20">or, <a id="wishlist-share-link" ng-href="{{$ctrl.url}}">Click here to view</a></span><social-share-buttons type="\'wishlist\'" title="\'My Favorites\'" url="$ctrl.url"></social-share-buttons></div></div></div>'), 
    $templateCache.put("../assets/js/angular/find-my-stylist/components/confirm-stylist/confirm-stylist.html", '<div class="confirm-stylist"><div class="loading" ng-if="$ctrl.isLoading">Loading <span ng-show="$ctrl.isLoading" class="spinner ng-animate-disabled"></span></div><form name="confirmStylistForm" ng-if="!$ctrl.isLoading" ng-submit="$ctrl.confirm()"><h2 class="title">{{$ctrl.profileInfo ? \'Great news, \' + $ctrl.profileInfo.firstName : \'Voilà\'}}! We found your cabi Stylist.</h2><div class="stylist-info"><div ng-show="!$ctrl.stylist.imageLoaded" class="spinner-wrapper"><span class="spinner ng-animate-disabled"></span></div><div ng-show="$ctrl.stylist.imageLoaded" class="selected-stylist"><img ng-src="{{$ctrl.stylist.profilePhoto}}" image-onload="$ctrl.imageLoaded($ctrl.stylist)"></div><p>{{$ctrl.stylist.firstName + \' \' + $ctrl.stylist.lastName}}</p><p>{{$ctrl.stylist.city}}, {{$ctrl.stylist.stateId}}</p></div><p class="error" ng-if="$ctrl.error">{{$ctrl.error}}</p><div class="row"><button type="submit" class="ae-btn btn-continue">Confirm</button></div><a class="montserrat link-cancel" ng-click="$ctrl.findMyStylist()">Not my stylist</a></form></div>'), 
    $templateCache.put("../assets/js/angular/find-my-stylist/components/find-my-stylist-gateway/find-my-stylist-gateway.html", '<div class="find-my-stylist-gateway"><div class="row"><div class="stylist-finder-card"><div ng-click="$ctrl.toggleFindMyStylistForm()"><div class="card-title">Find My <span>cabi</span> Stylist</div><div class="card-description">Search for your Stylist by entering her information or your Hostess\'s info.</div></div><div ng-if="$ctrl.isFindMyStylistFormOpen"><form name="alreadyHasStylistForm" ng-submit="$ctrl.submitFindMyStylistForm()"><div class="row stylist-or-hostess"><span class="custom-checkbox"><input type="radio" name="stylist-info" id="stylist-info" ng-model="$ctrl.findMyStylistForm.stylistOrHostess" value="stylist" ng-disabled="$ctrl.isLoading"><label class="round" for="stylist-info">Enter Stylist info</label></span><span class="custom-checkbox"><input type="radio" name="hostess-info" id="hostess-info" ng-model="$ctrl.findMyStylistForm.stylistOrHostess" value="hostess" ng-disabled="$ctrl.isLoading"><label class="round" for="hostess-info">Enter Hostess info</label></span></div><div class="form-field"><custom-input type="text" name="firstName" placeholder="first name *" ng-model="$ctrl.findMyStylistForm.firstName" disabled="$ctrl.isLoading" required></custom-input></div><div class="form-field"><custom-input type="text" name="lastName" placeholder="last name *" ng-model="$ctrl.findMyStylistForm.lastName" disabled="$ctrl.isLoading" required></custom-input></div><div class="form-field"><custom-input type="email" name="email" placeholder="email address" ng-model="$ctrl.findMyStylistForm.email" disabled="$ctrl.isLoading"></custom-input></div><div class="form-field"><custom-dropdown options="$ctrl.states" ng-model="$ctrl.findMyStylistForm.selectedState" display-property="name" disabled="$ctrl.isLoading" placeholder="{{$ctrl.countryLabels.state.toLowerCase()}}" track-by="code"></custom-dropdown></div><p class="error" ng-if="$ctrl.error">{{$ctrl.error}}</p><div class="row"><button type="submit" class="ae-btn btn-continue" ng-disabled="alreadyHasStylistForm.$invalid || $ctrl.isLoading">Continue <span ng-show="$ctrl.isLoading" class="spinner ng-animate-disabled"></span></button></div></form></div></div><br><div class="stylist-finder-card"><div ng-click="$ctrl.toggleNoStylistForm()"><div class="card-title">I Don\'t Have A Stylist</div><div class="card-description">Get connected with a Stylist in your area.</div></div><div ng-show="$ctrl.isNoStylistFormOpen"><form name="noStylistForm" ng-submit="$ctrl.submitNoStylistForm()"><div class="form-field"><custom-input type="text" name="firstName" placeholder="first name *" ng-model="$ctrl.noStylistForm.firstName" disabled="$ctrl.isLoading" required></custom-input></div><div class="form-field"><custom-input type="text" name="lastName" placeholder="last name *" ng-model="$ctrl.noStylistForm.lastName" disabled="$ctrl.isLoading" required></custom-input></div><div class="form-field"><custom-input type="email" name="email" placeholder="your email address *" ng-model="$ctrl.noStylistForm.email" disabled="$ctrl.isLoading" required></custom-input></div><div class="form-field"><phone-input type="text" name="phone" placeholder="your phone number (optional)" ng-model="$ctrl.noStylistForm.phoneNumber" disabled="$ctrl.isLoading"></phone-input></div><div class="form-field"><custom-input type="text" name="text" placeholder="your {{$ctrl.countryLabels.zipCode.toLowerCase()}} *" ng-model="$ctrl.noStylistForm.zipCode" disabled="$ctrl.isLoading" required></custom-input></div><div class="form-field"><custom-dropdown placeholder="how did you hear about cabi? *" options="$ctrl.sourceOptions" ng-model="$ctrl.noStylistForm.selectedSource" class="source-dropdown" display-property="label" disabled="$ctrl.isLoading" track-by="value" required></custom-dropdown></div><div ng-if="$ctrl.isFriendSource()"><div class="form-field"><custom-input type="text" name="friendFirstName" placeholder="friend\'s first name *" ng-model="$ctrl.noStylistForm.friendFirstName" disabled="$ctrl.isLoading" required="$ctrl.isFriendSource()"></custom-input></div><div class="form-field"><custom-input type="text" name="friendLastName" placeholder="friend\'s last name *" ng-model="$ctrl.noStylistForm.friendLastName" disabled="$ctrl.isLoading" required="$ctrl.isFriendSource()"></custom-input></div><div class="form-field"><custom-input type="text" name="friendCity" placeholder="friend\'s city" ng-model="$ctrl.noStylistForm.friendCity" disabled="$ctrl.isLoading"></custom-input></div><div class="form-field"><custom-dropdown options="$ctrl.states" ng-model="$ctrl.noStylistForm.friendState" display-property="name" disabled="$ctrl.isLoading" placeholder="friend\'s {{$ctrl.countryLabels.state.toLowerCase()}} *" track-by="code" required="$ctrl.isFriendSource()"></custom-dropdown></div></div><div class="form-field" ng-if="$ctrl.isOutletStoreSource()"><custom-dropdown placeholder="tell us the name of the store you visited *" options="$ctrl.outletStoreOptions" ng-model="$ctrl.noStylistForm.outletStore" class="source-dropdown" display-property="label" disabled="$ctrl.isLoading" track-by="value" required="$ctrl.isOutletStoreSource()"></custom-dropdown></div><div class="form-field wide"><div class="communication-preferences"><p class="subtitle no-margin">How would you like your personal Stylist to communicate with you? (Select all that apply) *</p><div class="horizontal-list"><div class="preference"><i class="fa fa-envelope"></i><br><span class="custom-checkbox"><input type="checkbox" name="preference-email" id="preference-email" ng-model="$ctrl.noStylistForm.communication.email" ng-change="$ctrl.preferenceSelection()" ng-disabled="$ctrl.isLoading"><label for="preference-email" class="preference-name">email</label></span></div><div class="preference"><i class="fa fa-comment"></i><br><span class="custom-checkbox"><input type="checkbox" name="preference-txt" id="preference-txt" ng-model="$ctrl.noStylistForm.communication.txt" ng-change="$ctrl.preferenceSelection()" ng-disabled="$ctrl.isLoading"><label for="preference-txt" class="preference-name">text</label></span></div><div class="preference"><i class="fa fa-phone"></i><br><span class="custom-checkbox"><input type="checkbox" name="preference-phone" id="preference-phone" ng-model="$ctrl.noStylistForm.communication.phone" ng-change="$ctrl.preferenceSelection()" ng-disabled="$ctrl.isLoading"><label for="preference-phone" class="preference-name">call</label></span></div><div class="preference"><i class="fa fa-ban"></i><br><span class="custom-checkbox"><input type="checkbox" name="preference-no" id="preference-no" ng-model="$ctrl.noStylistForm.communication.no" ng-change="$ctrl.deselectAllPreferences()" ng-disabled="$ctrl.isLoading"><label for="preference-no" class="preference-name">no thanks</label></span></div></div></div></div><p class="error" ng-if="$ctrl.error">{{$ctrl.error}}</p><div class="warning-message" ng-if="$ctrl.phoneWarning"><i class="fa fa-exclamation-triangle"></i> <span>{{$ctrl.phoneWarning}}</span></div><div class="row"><button type="submit" class="ae-btn btn-continue" ng-disabled="$ctrl.isCommunicationInvalid() || noStylistForm.$invalid || $ctrl.isLoading">Continue <span ng-show="$ctrl.isLoading" class="spinner ng-animate-disabled"></span></button></div></form></div></div></div><div class="row"><a class="montserrat link-cancel" ng-click="$ctrl.close()">Cancel</a></div></div>'), 
    $templateCache.put("../assets/js/angular/find-my-stylist/components/meet-stylist/meet-stylist.html", '<div class="meet-stylist"><form name="meetStylistForm" ng-submit="$ctrl.confirm()"><div class="meet-stylist-info-card"><div class="stylist-info"><div ng-show="!$ctrl.stylist.imageLoaded" class="spinner-wrapper"><span class="spinner ng-animate-disabled"></span></div><div ng-show="$ctrl.stylist.imageLoaded" class="selected-stylist"><img ng-src="{{$ctrl.stylist.profilePhoto}}" image-onload="$ctrl.imageLoaded($ctrl.stylist)"></div></div><div class="info-card-wrapper"><div class="info-card"><h2 class="title">{{\'Meet your cabi Stylist, \' + $ctrl.stylist.firstName + \' \' + $ctrl.stylist.lastName + \'!\'}}</h2><div class="contacts"><div><i class="fa fa-envelope"></i> <a href="{{\'mailto:\' + $ctrl.stylist.emailAddress}}" target="_top">Email</a></div><div><i class="fa fa-phone"></i> <a href="{{\'tel:\' + $ctrl.stylist.phoneNumber | phoneNumber}}">{{$ctrl.stylist.phoneNumber}}</a></div></div></div></div></div><div class="row"><p class="subtitle" ng-if="$ctrl.attrs.from !== $ctrl.componentsConstant.findMyStylist.findMyStylistGateway">{{$ctrl.stylist.firstName + \' \' + $ctrl.stylist.lastName}} lives near you in {{$ctrl.stylist.city + \', \' + $ctrl.stylist.stateId}}. She is available to help with any questions that you have. Need help with sizing? Want to see an item in person? Interested in hosting a Fashion Experience? Contact {{$ctrl.stylist.firstName + \' \' + $ctrl.stylist.lastName}} at the email address or phone number below.</p><p class="subtitle" ng-if="$ctrl.attrs.from === $ctrl.componentsConstant.findMyStylist.findMyStylistGateway">{{$ctrl.stylist.firstName + \' \' + $ctrl.stylist.lastName}} lives near you in {{$ctrl.stylist.city}}! She’s eager to help you find just what you’re looking for, styled in a way that’ll have you feeling better than ever. Need help with sizing? Want to see a piece in person? Interested in having your own Fashion Experience? Contact {{$ctrl.stylist.firstName + \' \' + $ctrl.stylist.lastName}} any time by email or phone.</p></div><p class="error" ng-if="$ctrl.error">{{$ctrl.error}}</p><div class="row"><button type="submit" class="ae-btn btn-continue" ng-disabled="$ctrl.isLoading">Got it - thanks! <span ng-show="$ctrl.isLoading" class="spinner ng-animate-disabled"></span></button></div></form></div>'), 
    $templateCache.put("../assets/js/angular/find-my-stylist/components/no-stylist/no-stylist.html", '<div class="no-stylist"><form name="noStylistForm" ng-submit="$ctrl.tryAgain()"><h2 class="title">Sorry-we couldn\'t find your Stylist.</h2><p class="subtitle">There isn\'t a match based on the info provided. Tap below to try again.</p><div class="row"><button type="submit" class="ae-btn btn-try-again">Try again</button></div></form></div>'), 
    $templateCache.put("../assets/js/angular/find-my-stylist/components/select-stylist/select-stylist.html", '<div class="select-stylist"><form name="selectStylistForm" ng-submit="$ctrl.continue()"><h2 class="title">We found multiple Stylists matching the<br>information you provided</h2><p class="subtitle">Please select your Stylist to continue.</p><div class="stylist-info-wrapper"><div class="stylist-info" ng-repeat="stylist in $ctrl.stylists" ng-click="$ctrl.selectedStylist = stylist"><div ng-show="!stylist.imageLoaded" class="spinner-wrapper"><div class="spinner ng-animate-disabled"></div></div><div ng-show="stylist.imageLoaded" ng-class="{\'selected-stylist\' : stylist === $ctrl.selectedStylist}"><img ng-src="{{stylist.profilePhoto}}" image-onload="$ctrl.imageLoaded(stylist)"></div><p>{{stylist.firstName + \' \' + stylist.lastName}}</p><p>{{stylist.city}}, {{stylist.stateId}}</p></div></div><p class="error" ng-if="$ctrl.error">{{$ctrl.error}}</p><div class="row"><button type="submit" class="ae-btn btn-continue" ng-disabled="!$ctrl.selectedStylist || $ctrl.isLoading">Continue <span ng-show="$ctrl.isLoading" class="spinner ng-animate-disabled"></span></button></div><a class="montserrat link-cancel" ng-click="$ctrl.findMyStylist()">I don\'t see my stylist</a></form></div>'), 
    $templateCache.put("../assets/js/angular/find-my-stylist/find-my-stylist.html", '<div class="attached-ecomm"><find-my-stylist-gateway ng-if="$ctrl.isComponentActive($ctrl.components.findMyStylistGateway)" attrs="$ctrl.getAttrs()"></find-my-stylist-gateway><select-stylist ng-if="$ctrl.isComponentActive($ctrl.components.selectStylist)" attrs="$ctrl.getAttrs()"></select-stylist><no-stylist ng-if="$ctrl.isComponentActive($ctrl.components.noStylist)" attrs="$ctrl.getAttrs()"></no-stylist><confirm-stylist ng-if="$ctrl.isComponentActive($ctrl.components.confirmStylist)" attrs="$ctrl.getAttrs()"></confirm-stylist><meet-stylist ng-if="$ctrl.isComponentActive($ctrl.components.meetStylist)" attrs="$ctrl.getAttrs()"></meet-stylist></div>'), 
    $templateCache.put("../assets/js/angular/homepage/cabi-homepage/cabi-homepage.html", '<contextual-email-promote ng-if="$ctrl.ui.allow_contextual_email_promote" message="\'Get all the latest cabi news, fashion advice, and style inspiration straight to your inbox.\'" scroll-amount="35" cookie="\'default-email-signup-popup\'"></contextual-email-promote>'), 
    $templateCache.put("../assets/js/angular/homepage/mailinglist/homepage-mailinglist.html", '<div class="c-homepage-mailinglist"><div class="fashion-watch__mailinglist"><div class="fashion-watch__message"><div class="fashion-watch__confirmation-message mb20" ng-if="$ctrl.success"><p class="fashion-watch__content-title h1 mb20 color-white">Thank you for signing up!</p><p class="fashion-watch__content-copy color-white">You’ll now start receiving the latest fashion tips, collection announcements and more straight in your inbox!</p></div><div class="fashion-watch__introduction-message mb20" ng-if="!$ctrl.success"><p class="fashion-watch__content-title h1 mb20 color-white">Stay in the know!</p><p class="fashion-watch__content-copy color-white">Join our mailing list and get all the latest cabi news, fashion advice, and style inspiration straight to your inbox.</p></div></div><mailinglist-form on-success="$ctrl.onSuccess()"></mailinglist-form></div></div>'), 
    $templateCache.put("../assets/js/angular/homeshow/directives/homeShowBanner/home-show-banner.html", '<p class="home-show-banner-message"><object type="image/svg+xml" data="/wp-content/themes/cabi/assets/svgs/hanger.svg" alt="Home Show" class="home-show-banner-icon"></object>You are currently shopping <strong>{{cart.fullData.Hostess.firstName}} {{cart.fullData.Hostess.lastName}}\'s</strong> show. <a class="home-show-banner-cta" ng-click="showCancelModal()">Not My Hostess</a></p>'), 
    $templateCache.put("../assets/js/angular/homeshow/directives/homeShowToggle/homeShowToggle.html", '<div ng-if="show.isHomeShow()">Home Show <i class="fa fa-remove" ng-click="show.removeShow()"></i></div>'), 
    $templateCache.put("../assets/js/angular/homeshow/modal/showModal.html", '<div id="modal-knockout"></div><div id="modal" class="show-modal"><div class="p20"><div class="align-center"><div ng-if="showIsSet()"><div class="show-modal__header"><img class="show-modal__avatar" src="//media.cabionline.com/wp-content/uploads/avatars/{{stylist.data.Site|lowercase}}.jpg" onerror="this.onerror=null; this.src = \'/wp-content/themes/cabi/assets/images/404/avatar.png\';"><p class="show-modal__message">You are shopping <strong>{{show.Hostess.firstName}} {{show.Hostess.lastName}}\'s</strong> show.</p></div><div class="show-modal__button-wrapper"><button class="btn btn-pink" ng-click="closeModal();">Continue shopping the show</button></div><div class="show-modal__button-wrapper"><button class="btn btn-transparent" ng-click="removeShow()">Shop without a show</button></div></div><div ng-if="!showIsSet()"><div ng-if="canSetShow()"><img class="show-modal__avatar" src="//media.cabionline.com/wp-content/uploads/avatars/{{stylist.data.Site|lowercase}}.jpg" onerror="this.onerror=null; this.src = \'/wp-content/themes/cabi/assets/images/404/avatar.png\';"><h2 class="h2 archer-medium mb20">Welcome!</h2><p class="mb20"><span ng-if="show.CoHostess">You\'ve been exclusively invited to shop {{show.Hostess.firstName}} {{show.Hostess.lastName}} and {{show.CoHostess.firstName}} {{show.CoHostess.lastName}}\'s show. Make your selections quickly to be included in this shopping event--the show will close soon! </span><span ng-if="!show.CoHostess">You\'ve been exclusively invited to shop {{show.Hostess.firstName}} {{show.Hostess.lastName}}\'s show. Make your selections quickly to be included in this shopping event &mdash; the show will close soon!</span></p><button class="btn btn-pink" ng-click="setShow();">Start Shopping</button><br></div><div ng-if="!show.showTodayOrEarlier"><h2 class="h2 stag-light color-gold mb20">Sorry!</h2><p class="mb20">Adding an order to this show is not available, as this show has not yet occurred. Connect with your Stylist for the updated show date.</p><button class="btn btn-black" ng-click="closeModal();">Start Shopping</button><br></div><div ng-if="showIsClosed()"><h2 class="h2 stag-light color-gold mb20">Sorry!</h2><p class="mb20">This show has closed, but you can shop anyway!</p><button class="btn btn-black" ng-click="closeModal();">Start Shopping</button><br></div></div></div></div></div>'), 
    $templateCache.put("../assets/js/angular/hot-flash/components/hot-flash-instructions/hot-flash-instructions.html", '<div class="c-hot-flash-instructions"><p>iOS devices do not support downloading videos from the web, so we recommending using an app called <a href="https://itunes.apple.com/us/app/documents-6-file-manager-pdf-reader-and-browser/id364901807" target="_blank">Documents</a> which allows you to.</p><p>Once you have <a href="https://itunes.apple.com/us/app/documents-6-file-manager-pdf-reader-and-browser/id364901807" target="_blank">Documents</a> installed, follow the following instructions to save a video to your iOS device:</p><ul><li><p>Copy the URL of the hot flash video you would like to download in the browser\'s address bar</p><img src="//media.cabionline.com/wp-content/uploads/2018/01/hf-step1.1.jpg"></li><li><p>Open <a href="https://itunes.apple.com/us/app/documents-6-file-manager-pdf-reader-and-browser/id364901807" target="_blank">Documents</a> and click the Safari icon in the bottom-right corner of the app</p><img src="//media.cabionline.com/wp-content/uploads/2018/01/hf-step2.jpg"></li><li><p>Paste the URL copied in your clipboard into the browser\'s address bar and press "Go"</p></li><li><p>Once the page loads, and you click the black download button or pink download link, a Save File prompt will appear. Press "Save" in the top-right corner.</p><img src="//media.cabionline.com/wp-content/uploads/2018/01/hf-step3.jpg"></li><li><p>Wait for the video to finish downloading</p><img src="//media.cabionline.com/wp-content/uploads/2018/01/hf-step4.jpg"></li><li><p>Once finished downloading, open the <strong>Downloads</strong> folder in the Documents app</p><img src="//media.cabionline.com/wp-content/uploads/2018/01/hf-step5.jpg"></li><li><p>You will see the video you have downloaded. Clicking on the video should open a drawer on the bottom of the device. Click the "Move" icon inside of the drawer.</p><img src="//media.cabionline.com/wp-content/uploads/2018/01/hf-step6.jpg"></li><li><p>You will now see a "Move To" window asking you where to move the video to. Choose "Camera Roll".</p><img src="//media.cabionline.com/wp-content/uploads/2018/01/hf-step7.jpg"></li><li><p>Finally, when the Camera Roll is open, press the blue \'Move to "Camera Roll"\' button at the bottom of your device.</p><img src="//media.cabionline.com/wp-content/uploads/2018/01/hf-step8.jpg"></li><li><p>The video should now be saved to your device which you can access any time by opening your Photos app</p></li></ul></div>'), 
    $templateCache.put("../assets/js/angular/hot-flash/components/hot-flash-list-filter/hot-flash-list-filter.html", '<div class="c-hot-flash-list-filter"><div class="c-hot-flash-list-filter__search"><label>Search</label><input type="text" ng-model="$ctrl.selectedFilters.search"></div><button ng-click="$ctrl.updateFilter();" class="btn btn-black">Filter</button></div>'), 
    $templateCache.put("../assets/js/angular/hot-flash/components/hot-flash-list-item/hot-flash-list-item.html", '<div class="c-hot-flash-list-item"><div class="mb20" ng-if="$ctrl.object.video_url || $ctrl.object.video_urls.length"><a class="btn-transparent montserrat uppercase no-decoration" ui-sref="hot_flashes"><i class="fa fa-angle-double-left"></i> Back to the Library</a></div><div class="c-hot-flash-list__playlist-instructions" ng-if="$ctrl.object.type == \'playlist\'"><div class="c-hot-flash-list__playlist-instruction-col"><div class="video-ellipse"><div class="video-button-center"><em>1</em></div></div><div class="video-playlist-text"><p>In order to access the additional chapters, click on the <span class="playlist-icon">PLAYLIST ICON &#9776</span> link below.</p></div></div><div class="c-hot-flash-list__playlist-instruction-col"><div class="video-ellipse"><div class="video-button-center"><em>2</em></div></div><div class="video-playlist-text last"><p>Once the <span class="playlist-icon">PLAYLIST &#9776</span> is open, use the scrollbar on the left to access additional chapters. Each chapter can be downloaded through the links below the video.</p></div></div></div><div class="c-hot-list-item__video" ng-bind-html="$ctrl.object.video_embed_code"></div><footer class="c-hot-flash-list-item__footer"><div ng-if="$ctrl.object.video_urls.length"><table class="hot-flash-video-item__video-table"><thead><tr><th>Video</th><th>&nbsp;</th></tr></thead><tbody><tr ng-repeat="video in $ctrl.object.video_urls track by $index"><td>{{video.name}}</td><td><a ng-href="/wp-admin/admin-ajax.php?action=cabi_hot_flash_download&url={{video.url}}">DOWNLOAD</a></td></tr></tbody></table></div><div ng-if="$ctrl.object.video_url.length" ng-if="$ctrl.object.video_url !== \'\'"><a class="btn btn-black" ng-href="/wp-admin/admin-ajax.php?action=cabi_hot_flash_download&url={{$ctrl.object.video_url}}" target="_blank">Download</a></div></footer><p style="text-align: center; margin-top: 1em" ng-if="$ctrl.object.video_url || $ctrl.object.video_urls.length"><i class="fa fa-apple">iPad users, click <a href="/hot-flash-download-instructions-iphone-ipad/" target="_blank">here</a> for download instructions</i></p></div>'), 
    $templateCache.put("../assets/js/angular/hot-flash/hot-flash-list.html", '<div ng-if="$ctrl.collection"><div class="c-hot-flash-list"><div ng-if="$ctrl.collection"><h2 class="h3 montserrat uppercase">Training Videos</h2><div class="mb20"><div ng-repeat="hot_flash in $ctrl.collection.playlist"><div class="c-hot-flash-list__item" ng-click="$ctrl.openIntent(hot_flash)"><div class="c-hot-flash-list__item-header" ng-bind-html="hot_flash.title"></div><a class="c-hot-flash-list__item-toggle">Show Video</a></div></div></div><div align="center" class="mb10"><a ng-click="showMore = !!!showMore" class="montserrat uppercase under-line font-size-sm"><span ng-if="!showMore">View</span><span ng-if="showMore">Hide</span> Video Archive</a></div><div ng-if="showMore"><div class="c-hot-flash-library__filter-wrapper" ng-init="show_filter = false"><a ng-click="show_filter = !show_filter"><i class="fa fa-sliders"></i> Filter <i class="fa fa-caret-down" ng-if="!show_filter"></i><i class="fa fa-caret-up" ng-if="show_filter"></i></a><hot-flash-list-filter ng-if="show_filter" filters="$ctrl.filterableProperties" on-filter-update="$ctrl.onFilterUpdate($event);"></hot-flash-list-filter></div><h2 class="h3 montserrat uppercase">Archive</h2><div ng-repeat="hot_flash in $ctrl.collection.single | filter:$ctrl.search"><div class="c-hot-flash-list__item c-hot-flash-list__item--thin"><div class="c-hot-flash-list__item-header" ng-bind-html="hot_flash.title"></div><a ng-if="!hot_flash.show_video" ng-click="$ctrl.openIntent(hot_flash)" class="c-hot-flash-list__item-toggle">Show Video</a></div></div><div class="mt1em" ng-if="($ctrl.collection.single | filter:$ctrl.search).length === 0"><em>No videos match this filter</em></div></div></div></div><p style="text-align: center"><i class="fa fa-apple">iPad users, click <a href="/hot-flash-download-instructions-iphone-ipad/" target="_blank">here</a> for download instructions</i></p></div><div align="center"><div ng-if="!$ctrl.collection" class="c-hot-flash-library__loading"><loading-icon></loading-icon>Loading..</div></div>'), 
    $templateCache.put("../assets/js/angular/items-in-look/items-in-look.html", '<div class="container c-items-in-look"><hr class="c-items-in-look__hr"><h2 class="c-items-in-look__title">featured items</h2><div class="item-grid" id="collection-archive-item-grid"><div align="center" ng-hide="collection_items"><loading-icon></loading-icon></div><ul><li ng-repeat="item in collection_items track by item.id" class="item" ng-if="item.displayOnFrontend" ng-hide="item.hide"><collection-item item="item"></collection-item></li></ul></div></div>'), 
    $templateCache.put("../assets/js/angular/lead-form/lead-form.html", '<div class="c-cabi-lead-form"><script type="text/javascript" src="//www.googleadservices.com/pagead/conversion_async.js"><\/script><form ng-class="{complete: $ctrl.ui.submitted}" method="post" id="lead-form" name="consultant_form" ng-submit="$ctrl.onSubmit()"><div id="leadform-embed-fields"><ul id="lead-form-errors" ng-if="$ctrl.errors.length"><li ng-repeat="error in $ctrl.errors track by $index">{{error}}</li></ul><div class="row"><label id="qualifier-list-label">What are you interested in?</label><cabi-select-list options="{\'InterestInHostingShow\': \'hosting a cabi Fashion Experience\', \'InterestInBecomingConsultant\': \'learning more about becoming a cabi Stylist\', \'InterestInClothing\': \'connecting with a cabi Stylist to purchase clothing\'}" on-select="$ctrl.onInterestSelect($event)" value="$ctrl.data.qualifier"></cabi-select-list><div class="input-wrapper" ng-class="{\'input-wrapper--disabled\': !$ctrl.data.qualifier}"><input placeholder="First Name" name="FirstName" type="text" required class="leadform-full-width" ng-model="$ctrl.data.FirstName" autocomplete="on" ng-blur="$ctrl.gaCapture($ctrl.data.FirstName)"> <span class="leadform-static-label">First Name</span></div><div class="input-wrapper" ng-class="{\'input-wrapper--disabled\': !$ctrl.data.FirstName}"><input placeholder="Last Name" name="LastName" type="text" required class="leadform-full-width" ng-model="$ctrl.data.LastName" autocomplete="on" ng-blur="$ctrl.gaCapture($ctrl.data.LastName)"> <span class="leadform-static-label">Last Name</span></div><div class="input-wrapper" ng-class="{\'input-wrapper--disabled\': !$ctrl.data.LastName}"><input placeholder="Email" name="Email" type="text" id="EmailAddress" class="required text email leadform-full-width" ng-model="$ctrl.data.Email" required autocomplete="on" ng-blur="$ctrl.gaCapture($ctrl.data.Email)"> <span class="leadform-static-label">Email Address</span></div><div class="input-wrapper" ng-class="{\'input-wrapper--disabled\': !$ctrl.data.Email}"><input placeholder="Daytime Phone Number" name="DayPhone" type="text" class="required text leadform-half-width" ng-model="$ctrl.data.DayPhone" required autocomplete="on" ng-blur="$ctrl.gaCapture($ctrl.data.DayPhone)" ng-minlength="10"> <span class="leadform-static-label">Phone Number</span></div><div class="input-wrapper" ng-class="{\'input-wrapper--disabled\': !$ctrl.data.DayPhone}"><input placeholder="ZIP/Postal Code" name="PostalCode" type="text" ng-model="$ctrl.data.PostalCode" required autocomplete="on" ng-blur="$ctrl.gaCapture($ctrl.data.PostalCode)"> <input placeholder="HP" name="HP" type="text" style="display: none" ng-model="$ctrl.data.HP"> <input name="Domain" type="text" style="display: none" ng-model="$ctrl.data.Domain"> <span class="leadform-static-label">Zip Code</span></div></div><div class="row"><div class="input-wrapper" ng-class="{\'input-wrapper--disabled\': !$ctrl.data.PostalCode}"><label id="leadsources-list-label">How did you hear about <span style="text-transform: lowercase">cabi</span>?</label><cabi-select-list options="$ctrl.LeadSources" on-select="$ctrl.onLeadSourceSelect($event)"></cabi-select-list></div></div><div id="additional" class="empty"><div class="additional" ng-if="$ctrl.data.LeadSource === \'1\' || $ctrl.data.LeadSource === \'2\'"><div class="row"><label class="question-label">Please provide the name of the Cabi stylist or the host of the fashion experience you attended.</label><div class="input-wrapper"><input name="ConsultantFirstName" type="text" ng-model="$ctrl.data.ConsultantFirstName" autocomplete="on" class="text fn" placeholder="First Name"> <span class="leadform-static-label">First Name</span></div><div class="input-wrapper"><input name="ConsultantLastName" type="text" ng-model="$ctrl.data.ConsultantLastName" autocomplete="on" class="text" placeholder="Last Name"> <span class="leadform-static-label">Last Name</span></div></div><div class="row"><label class="question-label">Please provide the city and state of the Cabi experience you or your contact attended.</label><div class="input-wrapper"><input name="ShowCity" type="text" ng-model="$ctrl.data.ShowCity" placeholder="City" class="text" autocomplete="off"> <span class="leadform-static-label">City</span></div></div><div class="row"><div id="StateSelectedRow" class="input-wrapper"><label id="select-state-list-label">Select a State</label><cabi-select-list options="$ctrl.StateProvinceList" on-select="$ctrl.onStateProvinceSelect($event)"></cabi-select-list><ul id="select-state-list"><li><a href="#" data-value="0">--Please Select--</a></li></ul></div></div><div class="row" id="SameConsultantRow" class="checkbox-wrapper"><label class="control control--checkbox"><input id="ContinueWithConsultantHidden" type="hidden" name="ContinueWithConsultant" value="N" disabled="disabled"> <input id="ContinueWithConsultantCheckbox" ng-model="$ctrl.data.ContinueWithConsultant" name="ContinueWithConsultant" type="checkbox" checked="checked" class="leadform-checkbox" ng-blur="$ctrl.gaCapture($ctrl.data.ContinueWithConsultant)"><div class="control__indicator"></div><span class="checkbox-message">Please put me in contact with my initial Stylist (if applicable)</span></label></div><div class="row" ng-if="!$ctrl.data.ContinueWithConsultant"><textarea style="width: 100%" ng-model="$ctrl.data.DontContinueExplanation" name="DontContinueExplanation" placeholder="Please explain"></textarea></div></div><div class="additional" ng-if="$ctrl.data.LeadSource === \'3\'"><div id="StoreVisitedRow" class="input-wrapper"><label id="store-visited-list-label">Tell us the name of the store you visited</label><cabi-select-list options="$ctrl.OutletStores" on-select="$ctrl.onOutletStoreSelect($event)"></cabi-select-list></div></div></div><div class="row"><div class="input-wrapper" ng-class="{\'input-wrapper--disabled\': !$ctrl.data.LeadSource}"><label class="control control--checkbox"><input type="hidden" name="email_opt_in" value="0"> <input type="checkbox" name="email_opt_in" class="leadform-checkbox" ng-model="$ctrl.data.email_opt_in" ng-blur="$ctrl.gaCapture($ctrl.data.email_opt_in)"><div class="control__indicator"></div><span class="checkbox-message sign-up">Sign me up for exclusive emails on the latest fashion tips, cabi events, and Collection announcements!</span></label></div></div></div>\x3c!-- TODO: Submit this if signed in --\x3e\x3c!-- <input type="hidden" name="DebugMode" value="on" /> --\x3e <input name="submit_url" type="hidden" value="<?php print CONSULTANT_FORM_SUBMIT_URL; ?>"> <input name="initialized" type="hidden"> <input name="url" type="hidden" id="fieldUrl" value="n/a"> <input name="urlReferrer" type="hidden" id="fieldUrlReferrer" value="n/a"> <input id="ShowRegion" name="ShowRegion" value="" type="hidden"><p class="align-center lead-form__get-started"><input name="SubmitLead" type="submit" class="btn btn-black" id="ga-submit-tracking" value="Get Me Started" class="btn btn-black" ng-if="!$ctrl.ui.submitting"></p><div class="align-center montserrat uppercase mt1em" style="font-size: .9em">Learn more about our <a class="btn-cta--black" href="/privacy-policy">privacy policy</a>.</div><loading-icon ng-if="$ctrl.ui.submitting"></loading-icon><p></p></form><div ng-class="{reveal: $ctrl.ui.submitted}" id="lead-form-confirmation" class="align-center"><span class="h2 stag-light">Thank you for contacting us!</span><p>A fabulous cabi Stylist will be in touch</p></div></div><script type="text/javascript">(function($){\n\t\t// setURLParameters(getCookie("ToCabiSiteURL"), getCookie("ToCabiSiteReferrer"));\n\n\t})( jQuery );\n\n\n// Track form fill out\n$(document).ready(function() { \n\n //  $("#hear-about-us-proxy").on("click mousedown", function(e) {\n //  \te.preventDefault();\n\n //  \t$select = $("#SelectLeadSource");\n //  \tproxyMouseEvent(e, $select[0]);\n //  });\n\n  // $("input[id=\'Domain\']").val(<?php echo json_encode(LocaleUtils::getCurrentTld()); ?>);\n  // var selectedCountry = (<?php echo json_encode(LocaleUtils::getCurrentTld()); ?>);\n  // var postalCodeInput = $("[name=\'PostalCode\']");\n  // var stateSelectorFirst = $("#selectState");\n\n  // switch (selectedCountry) {\n  // \tcase \'ca\':\n  //     // On CA site\n  //     postalCodeInput.attr("placeholder", "ZIP Code");\n  //     stateSelectorFirst.text("Select a Province");\n  //     break;\n  //   case \'uk\':\n  //   case \'co.uk\':\n  //     // On UK site\n  //     postalCodeInput.attr("placeholder", "Postcode");\n  //     stateSelectorFirst.text("Select a County");\n  //     break;\n  //     default:\n  //     // On US site\n  //     postalCodeInput.attr("placeholder", "ZIP Code");\n  //     stateSelectorFirst.text("Select a State");\n  // }\n\n  // var dataObj = {\n  // \t"id":(Math.floor((Math.random() * 100000) + 1)).toString(),\n  // \t"method":"GetStateProvinceList",\n  // \t"jsonrpc":"2.0"\n  // };\n});\n\n$(\'#lead-form\').submit( function (e) {\n\tga(\'send\', \'event\', \'Submitted\', \'Lead Form\');\n})\n\n// function setURLParameters(url, referrer) {\n// \tif( "undefined" == typeof(url) ) {\n// \t\turl = "n/a";\n// \t}\n// \tif( "undefined" == typeof(referrer) ) {\n// \t\treferrer = "n/a";\n// \t}\n// \t$("#fieldUrl").val(url);\n// \t$("#fieldUrlReferrer").val(referrer);\n// }\n\n// function getCookie(c_name) {\n// \tvar i,x,y,ARRcookies=document.cookie.split(";");\n// \tfor (i=0;i<ARRcookies.length;i++) {\n// \t\tx=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));\n// \t\ty=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);\n// \t\tx=x.replace(/^\\s+|\\s+$/g,"");\n// \t\tif (x==c_name) {\n// \t\t\treturn unescape(y);\n// \t\t}\n// \t}\n// }<\/script>'), 
    $templateCache.put("../assets/js/angular/lead-form/modal.html", '<div class="o-modal o-modal--for-lead-form"><div class="o-modal-knockout" ng-click="$ctrl.removeModal()"></div><div class="o-modal-content" scroll-to-top-when="{{$ctrl.form_failed_time}}"><div class="o-modal-content-inner"><a class="o-modal__close" ng-click="$ctrl.removeModal()"></a><cabi-lead-form on-failure="$ctrl.onFormFail($event)" qualifier="$ctrl.qualifier"></cabi-lead-form></div>\x3c!-- .o-modal-content-inner --\x3e</div>\x3c!-- .o-modal-content --\x3e</div>'), 
    $templateCache.put("../assets/js/angular/localeRedirect/localeFlag/localeFlag.html", '<svg viewBox="-165.9 349.8 140.9 93.9" style="enable-background:new -165.9 349.8 140.9 93.9" xml:space="preserve" ng-if="locale == \'GBR\'"><g><g><rect x="-165.9" y="349.8" fill="#273376" width="140.9" height="93.9"/><g><polygon fill="#ffffff" points="-25,382.6 -81.4,382.6 -81.4,349.8 -109.6,349.8 -109.6,382.6 -165.9,382.6 -165.9,410.8\n\t\t\t\t-109.6,410.8 -109.6,443.7 -81.4,443.7 -81.4,410.8 -25,410.8 \t\t\t"/><polygon fill="#ffffff" points="-25,432.9 -149.7,349.8 -165.9,349.8 -165.9,360.6 -41.3,443.7 -25,443.7 \t\t\t"/><polygon fill="#ffffff" points="-165.9,432.9 -41.2,349.8 -25,349.8 -25,360.6 -149.6,443.7 -165.9,443.7 \t\t\t"/><polygon fill="#ce202c" points="-25,388.5 -87.3,388.5 -87.3,349.8 -103.7,349.8 -103.7,388.5 -165.9,388.5 -165.9,404.9\n\t\t\t\t-103.7,404.9 -103.7,443.7 -87.3,443.7 -87.3,404.9 -25,404.9 \t\t\t"/><polygon fill="#ce202c" points="-25,443.4 -25,436 -62.9,410.8 -74.1,410.8 \t\t\t"/><polygon fill="#ce202c" points="-25,349.8 -36.2,349.8 -81.4,379.8 -81.4,382.6 -74.4,382.6 -25,349.8 \t\t\t"/><polygon fill="#ce202c" points="-116.9,410.8 -165.9,443.4 -165.9,443.7 -155.1,443.7 -109.6,413.4 -109.6,410.8 \t\t\t"/><polygon fill="#ce202c" points="-165.9,349.8 -165.9,357.3 -127.7,382.6 -116.6,382.6 \t\t\t"/></g></g></g></svg> <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-165.9 349.8 140.9 93.9" style="enable-background:new -165.9 349.8 140.9 93.9" xml:space="preserve" ng-if="locale == \'US\'"><g><g><rect x="-165.9" y="414.9" fill="#FFFFFF" width="140.9" height="7.2"/><rect x="-165.9" y="407.7" fill="#BE2033" width="140.9" height="7.2"/><rect x="-165.9" y="429.4" fill="#FFFFFF" width="140.9" height="7.2"/><rect x="-165.9" y="436.6" fill="#BE2033" width="140.9" height="7.2"/>O<rect x="-165.9" y="422.2" fill="#BE2033" width="140.9" height="7.2"/><rect x="-165.9" y="400.5" fill="#FFFFFF" width="140.9" height="7.2"/><rect x="-165.9" y="378.8" fill="#BE2033" width="140.9" height="7.2"/><rect x="-165.9" y="357.1" fill="#FFFFFF" width="140.9" height="7.2"/><rect x="-165.9" y="364.4" fill="#BE2033" width="140.9" height="7.2"/><rect x="-165.9" y="393.3" fill="#BE2033" width="140.9" height="7.2"/><rect x="-165.9" y="349.9" fill="#BE2033" width="140.9" height="7.2"/><rect x="-165.9" y="371.6" fill="#FFFFFF" width="140.9" height="7.2"/><rect x="-165.9" y="386" fill="#FFFFFF" width="140.9" height="7.2"/></g><g><rect x="-165.9" y="349.9" fill="#212F64" width="56.3" height="50.6"/><polygon fill="#FFFFFF" points="-123.6,352.6 -123.2,353.8 -121.9,353.8 -123,354.6 -122.6,355.8 -123.6,355 -124.6,355.8\n\t\t\t-124.2,354.6 -125.2,353.8 -124,353.8 \t\t"/><polygon fill="#FFFFFF" points="-123.6,363.1 -123.2,364.3 -121.9,364.3 -123,365.1 -122.6,366.3 -123.6,365.5 -124.6,366.3\n\t\t\t-124.2,365.1 -125.2,364.3 -124,364.3 \t\t"/><polygon fill="#FFFFFF" points="-123.6,373.7 -123.2,374.9 -121.9,374.9 -123,375.6 -122.6,376.8 -123.6,376.1 -124.6,376.8\n\t\t\t-124.2,375.6 -125.2,374.9 -124,374.9 \t\t"/><polygon fill="#FFFFFF" points="-123.6,384.4 -123.2,385.6 -121.9,385.6 -123,386.4 -122.6,387.6 -123.6,386.8 -124.6,387.6\n\t\t\t-124.2,386.4 -125.2,385.6 -124,385.6 \t\t"/><polygon fill="#FFFFFF" points="-123.6,394.7 -123.2,395.9 -121.9,395.9 -123,396.6 -122.6,397.8 -123.6,397.1 -124.6,397.8\n\t\t\t-124.2,396.6 -125.2,395.9 -124,395.9 \t\t"/><polygon fill="#FFFFFF" points="-133,352.6 -132.6,353.8 -131.4,353.8 -132.4,354.6 -132,355.8 -133,355 -134,355.8 -133.6,354.6\n\t\t\t-134.7,353.8 -133.4,353.8 \t\t"/><polygon fill="#FFFFFF" points="-133,363.1 -132.6,364.3 -131.4,364.3 -132.4,365.1 -132,366.3 -133,365.5 -134,366.3 -133.6,365.1\n\t\t\t-134.7,364.3 -133.4,364.3 \t\t"/><polygon fill="#FFFFFF" points="-133,373.7 -132.6,374.9 -131.4,374.9 -132.4,375.6 -132,376.8 -133,376.1 -134,376.8 -133.6,375.6\n\t\t\t-134.7,374.9 -133.4,374.9 \t\t"/><polygon fill="#FFFFFF" points="-133,384.4 -132.6,385.6 -131.4,385.6 -132.4,386.4 -132,387.6 -133,386.8 -134,387.6 -133.6,386.4\n\t\t\t-134.7,385.6 -133.4,385.6 \t\t"/><polygon fill="#FFFFFF" points="-133,394.7 -132.6,395.9 -131.4,395.9 -132.4,396.6 -132,397.8 -133,397.1 -134,397.8 -133.6,396.6\n\t\t\t-134.7,395.9 -133.4,395.9 \t\t"/><polygon fill="#FFFFFF" points="-142.4,352.6 -142.1,353.8 -140.8,353.8 -141.8,354.6 -141.4,355.8 -142.4,355 -143.5,355.8\n\t\t\t-143.1,354.6 -144.1,353.8 -142.8,353.8 \t\t"/><polygon fill="#FFFFFF" points="-142.4,363.1 -142.1,364.3 -140.8,364.3 -141.8,365.1 -141.4,366.3 -142.4,365.5 -143.5,366.3\n\t\t\t-143.1,365.1 -144.1,364.3 -142.8,364.3 \t\t"/><polygon fill="#FFFFFF" points="-142.4,373.7 -142.1,374.9 -140.8,374.9 -141.8,375.6 -141.4,376.8 -142.4,376.1 -143.5,376.8\n\t\t\t-143.1,375.6 -144.1,374.9 -142.8,374.9 \t\t"/><polygon fill="#FFFFFF" points="-142.4,384.4 -142.1,385.6 -140.8,385.6 -141.8,386.4 -141.4,387.6 -142.4,386.8 -143.5,387.6\n\t\t\t-143.1,386.4 -144.1,385.6 -142.8,385.6 \t\t"/><polygon fill="#FFFFFF" points="-142.4,394.7 -142.1,395.9 -140.8,395.9 -141.8,396.6 -141.4,397.8 -142.4,397.1 -143.5,397.8\n\t\t\t-143.1,396.6 -144.1,395.9 -142.8,395.9 \t\t"/><polygon fill="#FFFFFF" points="-151.9,352.6 -151.5,353.8 -150.2,353.8 -151.2,354.6 -150.9,355.8 -151.9,355 -152.9,355.8\n\t\t\t-152.5,354.6 -153.5,353.8 -152.3,353.8 \t\t"/><polygon fill="#FFFFFF" points="-151.9,363.1 -151.5,364.3 -150.2,364.3 -151.2,365.1 -150.9,366.3 -151.9,365.5 -152.9,366.3\n\t\t\t-152.5,365.1 -153.5,364.3 -152.3,364.3 \t\t"/><polygon fill="#FFFFFF" points="-151.9,373.7 -151.5,374.9 -150.2,374.9 -151.2,375.6 -150.9,376.8 -151.9,376.1 -152.9,376.8\n\t\t\t-152.5,375.6 -153.5,374.9 -152.3,374.9 \t\t"/><polygon fill="#FFFFFF" points="-151.9,384.4 -151.5,385.6 -150.2,385.6 -151.2,386.4 -150.9,387.6 -151.9,386.8 -152.9,387.6\n\t\t\t-152.5,386.4 -153.5,385.6 -152.3,385.6 \t\t"/><polygon fill="#FFFFFF" points="-151.9,394.7 -151.5,395.9 -150.2,395.9 -151.2,396.6 -150.9,397.8 -151.9,397.1 -152.9,397.8\n\t\t\t-152.5,396.6 -153.5,395.9 -152.3,395.9 \t\t"/><polygon fill="#FFFFFF" points="-161.3,352.6 -160.9,353.8 -159.7,353.8 -160.7,354.6 -160.3,355.8 -161.3,355 -162.3,355.8\n\t\t\t-161.9,354.6 -163,353.8 -161.7,353.8 \t\t"/><polygon fill="#FFFFFF" points="-161.3,363.1 -160.9,364.3 -159.7,364.3 -160.7,365.1 -160.3,366.3 -161.3,365.5 -162.3,366.3\n\t\t\t-161.9,365.1 -163,364.3 -161.7,364.3 \t\t"/><polygon fill="#FFFFFF" points="-161.3,373.7 -160.9,374.9 -159.7,374.9 -160.7,375.6 -160.3,376.8 -161.3,376.1 -162.3,376.8\n\t\t\t-161.9,375.6 -163,374.9 -161.7,374.9 \t\t"/><polygon fill="#FFFFFF" points="-161.3,384.4 -160.9,385.6 -159.7,385.6 -160.7,386.4 -160.3,387.6 -161.3,386.8 -162.3,387.6\n\t\t\t-161.9,386.4 -163,385.6 -161.7,385.6 \t\t"/><polygon fill="#FFFFFF" points="-161.3,394.7 -160.9,395.9 -159.7,395.9 -160.7,396.6 -160.3,397.8 -161.3,397.1 -162.3,397.8\n\t\t\t-161.9,396.6 -163,395.9 -161.7,395.9 \t\t"/><polygon fill="#FFFFFF" points="-118.8,357.9 -118.4,359.1 -117.1,359.1 -118.1,359.8 -117.8,361 -118.8,360.3 -119.8,361\n\t\t\t-119.4,359.8 -120.4,359.1 -119.2,359.1 \t\t"/><polygon fill="#FFFFFF" points="-118.8,368.7 -118.4,369.9 -117.1,369.9 -118.1,370.7 -117.8,371.9 -118.8,371.1 -119.8,371.9\n\t\t\t-119.4,370.7 -120.4,369.9 -119.2,369.9 \t\t"/><polygon fill="#FFFFFF" points="-118.9,379.4 -118.5,380.6 -117.2,380.6 -118.2,381.3 -117.8,382.5 -118.9,381.8 -119.9,382.5\n\t\t\t-119.5,381.3 -120.5,380.6 -119.3,380.6 \t\t"/><polygon fill="#FFFFFF" points="-119,389.9 -118.6,391.1 -117.3,391.1 -118.3,391.8 -117.9,393 -119,392.3 -120,393 -119.6,391.8\n\t\t\t-120.6,391.1 -119.4,391.1 \t\t"/><polygon fill="#FFFFFF" points="-128.2,357.9 -127.8,359.1 -126.6,359.1 -127.6,359.8 -127.2,361 -128.2,360.3 -129.2,361\n\t\t\t-128.8,359.8 -129.8,359.1 -128.6,359.1 \t\t"/><polygon fill="#FFFFFF" points="-128.2,368.7 -127.8,369.9 -126.6,369.9 -127.6,370.7 -127.2,371.9 -128.2,371.1 -129.2,371.9\n\t\t\t-128.8,370.7 -129.8,369.9 -128.6,369.9 \t\t"/><polygon fill="#FFFFFF" points="-128.3,379.4 -127.9,380.6 -126.6,380.6 -127.7,381.3 -127.3,382.5 -128.3,381.8 -129.3,382.5\n\t\t\t-128.9,381.3 -129.9,380.6 -128.7,380.6 \t\t"/><polygon fill="#FFFFFF" points="-128.4,389.9 -128,391.1 -126.7,391.1 -127.8,391.8 -127.4,393 -128.4,392.3 -129.4,393 -129,391.8\n\t\t\t-130,391.1 -128.8,391.1 \t\t"/><polygon fill="#FFFFFF" points="-137.6,357.5 -137.2,358.7 -136,358.7 -137,359.4 -136.6,360.7 -137.6,359.9 -138.7,360.7\n\t\t\t-138.3,359.4 -139.3,358.7 -138,358.7 \t\t"/><polygon fill="#FFFFFF" points="-137.6,368.4 -137.2,369.6 -136,369.6 -137,370.3 -136.6,371.5 -137.6,370.8 -138.7,371.5\n\t\t\t-138.3,370.3 -139.3,369.6 -138,369.6 \t\t"/><polygon fill="#FFFFFF" points="-137.7,379 -137.3,380.2 -136.1,380.2 -137.1,380.9 -136.7,382.1 -137.7,381.4 -138.7,382.1\n\t\t\t-138.4,380.9 -139.4,380.2 -138.1,380.2 \t\t"/><polygon fill="#FFFFFF" points="-137.8,389.5 -137.4,390.7 -136.2,390.7 -137.2,391.5 -136.8,392.7 -137.8,391.9 -138.8,392.7\n\t\t\t-138.5,391.5 -139.5,390.7 -138.2,390.7 \t\t"/><polygon fill="#FFFFFF" points="-147.1,357.4 -146.7,358.6 -145.4,358.6 -146.4,359.4 -146,360.5 -147.1,359.8 -148.1,360.5\n\t\t\t-147.7,359.4 -148.7,358.6 -147.5,358.6 \t\t"/><polygon fill="#FFFFFF" points="-147.1,368.3 -146.7,369.5 -145.4,369.5 -146.4,370.2 -146,371.4 -147.1,370.7 -148.1,371.4\n\t\t\t-147.7,370.2 -148.7,369.5 -147.5,369.5 \t\t"/><polygon fill="#FFFFFF" points="-147.2,378.9 -146.8,380.1 -145.5,380.1 -146.5,380.8 -146.1,382 -147.2,381.3 -148.2,382\n\t\t\t-147.8,380.8 -148.8,380.1 -147.6,380.1 \t\t"/><polygon fill="#FFFFFF" points="-147.2,389.4 -146.9,390.6 -145.6,390.6 -146.6,391.4 -146.2,392.6 -147.2,391.8 -148.3,392.6\n\t\t\t-147.9,391.4 -148.9,390.6 -147.6,390.6 \t\t"/><polygon fill="#FFFFFF" points="-156.5,357.2 -156.1,358.4 -154.8,358.4 -155.9,359.2 -155.5,360.4 -156.5,359.6 -157.5,360.4\n\t\t\t-157.1,359.2 -158.1,358.4 -156.9,358.4 \t\t"/><polygon fill="#FFFFFF" points="-156.5,368.1 -156.1,369.3 -154.8,369.3 -155.9,370 -155.5,371.2 -156.5,370.5 -157.5,371.2\n\t\t\t-157.1,370 -158.1,369.3 -156.9,369.3 \t\t"/><polygon fill="#FFFFFF" points="-156.6,378.7 -156.2,379.9 -154.9,379.9 -156,380.7 -155.6,381.9 -156.6,381.1 -157.6,381.9\n\t\t\t-157.2,380.7 -158.2,379.9 -157,379.9 \t\t"/><polygon fill="#FFFFFF" points="-156.7,389.2 -156.3,390.4 -155,390.4 -156.1,391.2 -155.7,392.4 -156.7,391.6 -157.7,392.4\n\t\t\t-157.3,391.2 -158.3,390.4 -157.1,390.4 \t\t"/><polygon fill="#FFFFFF" points="-114.2,352.6 -113.8,353.8 -112.5,353.8 -113.5,354.6 -113.1,355.8 -114.2,355 -115.2,355.8\n\t\t\t-114.8,354.6 -115.8,353.8 -114.5,353.8 \t\t"/><polygon fill="#FFFFFF" points="-114.2,363.1 -113.8,364.3 -112.5,364.3 -113.5,365.1 -113.1,366.3 -114.2,365.5 -115.2,366.3\n\t\t\t-114.8,365.1 -115.8,364.3 -114.5,364.3 \t\t"/><polygon fill="#FFFFFF" points="-114.2,373.7 -113.8,374.9 -112.5,374.9 -113.5,375.6 -113.1,376.8 -114.2,376.1 -115.2,376.8\n\t\t\t-114.8,375.6 -115.8,374.9 -114.5,374.9 \t\t"/><polygon fill="#FFFFFF" points="-114.2,384.4 -113.8,385.6 -112.5,385.6 -113.5,386.4 -113.1,387.6 -114.2,386.8 -115.2,387.6\n\t\t\t-114.8,386.4 -115.8,385.6 -114.5,385.6 \t\t"/><polygon fill="#FFFFFF" points="-114.2,394.7 -113.8,395.9 -112.5,395.9 -113.5,396.6 -113.1,397.8 -114.2,397.1 -115.2,397.8\n\t\t\t-114.8,396.6 -115.8,395.9 -114.5,395.9 \t\t"/></g><path d="M-25,443.8v-0.3V443.8z"/></g></svg> <svg viewBox="-165.9 349.8 140.9 93.9" style="enable-background:new -165.9 349.8 140.9 93.9" xml:space="preserve" ng-if="locale == \'CA\'"><g><g><rect x="-165.9" y="349.8" fill="#e31d38" width="35.2" height="93.9"/><rect x="-130.7" y="349.8" fill="#ffffff" width="70.4" height="93.9"/><rect x="-60.3" y="349.8" fill="#e31d38" width="35.2" height="93.9"/></g><path fill="#e31d38" d="M-95.5,428.4h1.1l-0.4-14.8l1-0.9c4.6,0.6,8.8,1.1,13.5,1.6l-1.2-4c-0.2-0.7,0.1-1.5,0.6-1.9l13.5-11.5\n\t\tl-2.8-1.4c-1.2-0.5-0.9-1.2-0.4-2.9l2.1-7.8l-7.8,1.7c-0.8,0.1-1.3-0.4-1.4-0.9l-1-3.7l-6.2,7.3c-0.9,1.2-2.7,1.2-2.1-1.5l2.7-14.7\n\t\tl-3.5,1.9c-1,0.6-2,0.7-2.6-0.4l-5-9.6l-5,9.6c-0.6,1-1.6,0.9-2.5,0.4l-3.6-1.9l2.6,14.7c0.6,2.7-1.2,2.7-2.1,1.5l-6.2-7.3l-1,3.7\n\t\tc-0.1,0.5-0.6,1-1.4,0.9l-7.8-1.7l2.1,7.8c0.4,1.7,0.8,2.5-0.4,2.9l-2.8,1.4l13.5,11.5c0.5,0.4,0.8,1.2,0.6,1.9l-1.2,4\n\t\tc4.6-0.6,8.8-1.1,13.5-1.6l1,0.9l-0.4,14.8H-95.5z"/><path d="M-25.1,443.7v-0.3V443.7z"/></g></svg>'), 
    $templateCache.put("../assets/js/angular/localeRedirect/localeIndicator/localeIndicator.html", '<locale-flag ng-click="showModal()" class="locale-indicator--flag" ng-class="{\'locale-indicator__with-caret\': showCaret}" locale="locale"></locale-flag>'), 
    $templateCache.put("../assets/js/angular/localeRedirect/localeSelector/localeSelector.html", '<ul class="locale-selector__list"><li ng-repeat="locale in locales track by $index" class="locale-selector__list-item" ng-class="{\'locale-selector__list-item--active\': locale.code == state.currentLocale.code}" ng-click="state.currentLocale = locale"><locale-flag locale="locale.code" class="locale-selector__flag"></locale-flag></li></ul><div class="align-center"><a class="btn-underline uppercase" style="display: inline-block; margin-bottom: 10px" ng-click="submitLocale( state.currentLocale )">Confirm Region</a></div>'), 
    $templateCache.put("../assets/js/angular/localeRedirect/modal/modal.html", '<div id="modal-knockout" class="quicklook"></div><div id="modal" class="modal--for-locale-selector"><a ng-if="$ctrl.state.showCloseBtn" ng-click="$ctrl.modal.deactivate()" id="modal-close"><span>+</span></a><h2 ng-if="$ctrl.source.source && $ctrl.source.source === \'INVALID_LOCALE\'" class="align-center archer-light">It looks like you are located in <strong class="archer-semibold">{{$ctrl.source.country}} - {{$ctrl.source.city}}</strong>.<br>Please choose a supported region below to continue.</h2><h2 ng-if="!$ctrl.source.source" class="align-center archer-light">It looks like you are located in <strong class="archer-semibold">{{$ctrl.currentLocale.name}}</strong>.<br>Please confirm, or choose another region below.</h2><locale-selector></locale-selector></div>'), 
    $templateCache.put("../assets/js/angular/looks/components/looks-footer/looks-footer.html", '<div class="looks__footer-wrapper"><div class="container"><div class="looks-landing__intro looks-landing__intro--looks-footer container"><h1 class="looks-landing__title">get inspired.</h1><p class="looks-landing__subtitle">Browse more of our featured looks.</p></div><div class="looks__footer" slick slides-to-show="3" center-mode="false" responsive="$ctrl.slideSettings.responsive"><div ng-repeat="slide in $ctrl.slides track by $index" class="looks-landing-grid-item"><div class="looks-landing-grid-item__content looks-landing-grid-item__content--nowrap"><h2 class="looks-landing-grid-item__title looks-landing-grid-item__title--looks-landing" ng-bind-html="slide.title"></h2></div><div class="looks-landing-grid-item__img-wrapper img-swell-on-hover"><a href="/styles/{{slide.key}}/"><img ng-src="{{slide.img}}" alt="{{slide.key}}"></a></div></div></div><div class="looks-landing__back-to-looks"><a href="/collection/outfits/" class="looks-landing__back-to-looks-link">Back to all looks</a></div></div></div>\x3c!-- usage see below, this is not used anymore but in case needs the similar solution for the future --\x3e\x3c!-- <looks-footer current-style="\'<?php print get_queried_object()->slug; ?>\'"></looks-footer> --\x3e'), 
    $templateCache.put("../assets/js/angular/looks/components/looks-header/looks-header.html", '<div class="tax-styles__nav mb40 mt30"><div class="tax-styles__footer-table align-center"><a href="/styles/{{$ctrl.previousLook}}/" class="tax-styles__block"><div class="tax-styles__block-text"><p class="tax-styles__block-sup"><span>Previous Look</span></p></div></a><a href="/collection/outfits/" class="tax-styles__block tax-styles__block--square tax-styles__block--bordered"><p class="tax-styles__back-block-text"><span>Back to<br>Looks</span></p></a><a href="/styles/{{$ctrl.nextLook}}/" class="tax-styles__block"><div class="tax-styles__block-text"><p class="tax-styles__block-sup"><span>Next Look</span></p></div></a></div><div class="tax-styles__header-break"></div></div>'), 
    $templateCache.put("../assets/js/angular/mailinglist/blogMailinglist/blog-mailinglist.html", '\x3c!-- REMOVE COMMENTS TO ADD MAILING LIST POP UP FUNCTIONALITY --\x3e\x3c!-- <div class="blog__mailinglist blog__mailinglist--toggle {{$ctrl.mailingListAttrs.klass}}">\n\t<div class="blog__mailinglist-container container-wide" ng-class="{\'blog__mailinglist-container--success\': $ctrl.success}">\n\t\t<div class="blog__message">\n\t\t\t<div class="blog__confirmation-message" ng-if="$ctrl.success">\n\t\t\t\t<p class="blog__content-title h1 color-white">Thank you for signing up!</p>\n\t\t\t\t<p class="blog__content-copy color-white">You’ll now start receiving the latest fashion tips, collection announcements and more straight in your inbox!</p>\n\t\t\t</div>\n\t\t\t<div class="blog__introduction-message" ng-if="!$ctrl.success">\n\t\t\t\t<p class="blog__content-title h1 color-white only-desktop">her</p>\n\t\t\t\t<p class="blog__content-title h1 color-white only-mobile">Sign up for exclusive emails!</p>\n\t\t\t\t<p class="blog__content-copy color-white only-desktop">Sign up for exclusive emails on the latest fashion tips, cabi events, and Collection announcements!</p>\n\t\t\t</div>\n\t\t</div>\n\t\t<mailinglist-form on-success="$ctrl.onSuccess()" ng-class="{hide: $ctrl.success}"></mailinglist-form>\n\t</div>\n\t<a class="blog__mailinglist-close" ng-click="$ctrl.closePanel()" href="javascript://" ng-if="!$ctrl.hasCookie"><i class="icon-close"></i></a>\n</div> --\x3e<div class="blog__mailinglist blog__mailinglist--static"><div class="blog__mailinglist-container container-wide" ng-class="{\'blog__mailinglist-container--success\': $ctrl.success}"><div class="blog__message"><div class="blog__confirmation-message" ng-if="$ctrl.success"><p class="blog__content-title h1 color-white">Thank you for signing up!</p><p class="blog__content-copy color-white">You’ll now start receiving the latest fashion tips, collection announcements and more straight in your inbox!</p></div><div class="blog__introduction-message" ng-if="!$ctrl.success"><p class="blog__content-title h1 color-white only-desktop">Stay in the know!</p><p class="blog__content-title h1 color-white only-mobile">Sign up for exclusive emails!</p><p class="blog__content-copy color-white only-desktop">Sign up for exclusive emails on the latest fashion tips, cabi events, and Collection announcements!</p></div></div><mailinglist-form on-success="$ctrl.onSuccess()" ng-class="{hide: $ctrl.success}"></mailinglist-form></div></div>'), 
    $templateCache.put("../assets/js/angular/mailinglist/mailinglist-form/mailinglist-form.html", '<form class="mailinglist-form" name="form" ng-submit="$ctrl.onSubmit()" ng-class="{\'success\': $ctrl.success}" novalidate><div class="mailinglist-form__fieldset" ng-class="{\'has-error\': $ctrl.error_message}"><input ng-disabled="$ctrl.success" name="email" ng-model="$ctrl.form.email" type="email" placeholder="Email Address" required></div><div class="mailinglist-form__error-message" ng-if="$ctrl.error_message" ng-bind-html="$ctrl.error_message"></div><button ng-if="!$ctrl.success" type="submit" name="submit" class="mailinglist-form__submit btn btn-transparent--white" onclick="ga(\'send\', \'event\', \'Content Interaction\', \'click\', \'Send\', \'Homepage: Mailing List Sign up\');"><i class="fa fa-spin fa-spinner" ng-if="$ctrl.settings.loading">Sign Up</button></form>'), 
    $templateCache.put("../assets/js/angular/mailinglist/mailinglist-form/mailinglist-inline-form.html", '<form class="mailinglist-form mailinglist-form--inline" name="form" ng-submit="$ctrl.onSubmit()" ng-class="{\'success\': $ctrl.success}" novalidate><div class="mailinglist__fieldset"><div class="mailinglist-form__fieldset" ng-class="{\'has-error\': $ctrl.error_message}"><input ng-disabled="$ctrl.success" name="email" ng-model="$ctrl.form.email" type="email" placeholder="Email Address" required></div><button ng-if="!$ctrl.success" type="submit" name="submit" class="mailinglist-form__submit btn btn-black" onclick="ga(\'send\', \'event\', \'Content Interaction\', \'click\', \'Send\', \'Homepage: Mailing List Sign up\');"><i class="fa fa-spin fa-spinner" ng-if="$ctrl.settings.loading">Sign Up</button></div><div class="mailinglist-form__error-message" ng-if="$ctrl.error_message" ng-bind-html="$ctrl.error_message"></div></form>'), 
    $templateCache.put("../assets/js/angular/product/productColorSelector.html", '<label class="product-color-selector__label">Choose a color</label><div class="product-color-selector__select-wrapper input-select" style="color: {{catalogColorChoices[selectedValue.description]}}"><select class="product-color-selector__select" ng-model="selectedValue" ng-options="option as option.description for option in color.options"></select></div>'), 
    $templateCache.put("../assets/js/angular/quicklook/directives/content/content.html", '<div class="quicklook-content"><div class="quicklook-content__title catalog-title" ng-hide="product.is_look"><h3 ng-class="{\'long-title\': product.title.length > 20}" ng-bind-html="product.title"></h3></div><ul class="quicklook-content__meta list-unstyled"><li ng-if="product[\'item-id\']" class="item-number">No. <span>{{product[\'item-id\']}}</span></li><li ng-id="product[\'item-price\']" itemprop="offers" itemscope="" itemtype="http://schema.org/Offer"><div class="price" itemprop="price">{{product[\'item-price\']}}</div><meta itemprop="priceCurrency" content="USD"></li></ul><div class="quicklook-content__description" ng-bind-html="product.description"></div></div>'), 
    $templateCache.put("../assets/js/angular/quicklook/directives/images/images.html", '<a href="#" class="quicklook-images__btn btn-slide" data-direction="left" ng-if="images.length > 1" ng-click="showPreviousImage()"></a> <a href="#" class="quicklook-images__btn btn-slide" data-direction="right" ng-if="images.length > 1" ng-click="showNextImage()"></a><div class="quicklook-images"><ul><li ng-repeat="image in images" ng-class="{active: image.active}"><img class="image-full-width" src="{{image.url}}"></li></ul></div>'), 
    $templateCache.put("../assets/js/angular/quicklook/directives/quicklook.html", '<div id="modal-knockout" class="quicklook"></div><div id="modal" class="quicklook" ng-class="{initialized: data}"><a ng-click="closeModal()" id="quicklook-close"><span>+</span></a><div class="align-center" ng-hide="data"><loading-icon></loading-icon></div><div ng-if="data"><div id="quick-look-inner"><div id="quick-look-content"><div class="image-thumbnail image-thumbnail__mobile-only"><img ng-show="cartItem" class="image-full-width" src="{{cartItem.image}}?w=188"></div><quicklook-content product="data"></quicklook-content><div ng-show="product.multicolor && !stylistInfo.data"><ul class="quick-look__color-selector"><li ng-repeat="color in product.colors" ng-click="setColor(color.description)" ng-class="{active: currentColor.name == color.description}"><i class="fa fa-circle quick-look__color-selector-circle" style="color: {{catalogColorChoices[color.description]}}"></i></li></ul></div><div ng-if="!data.is_look" class="add-to-cart"><add-to-cart product-id="{{data.productId}}" selected-product="modal.currentProductId" cart-item="cartItem" on-change="onCurrentProductChange(finalProductId)" preselected-color="preselectedColor" on-product-loaded="onProductLoaded(productData)" in-quick-look-modal="true"></add-to-cart></div><div id="in-this-look" ng-if="data.is_look"><h3 class="h2">In This Look</h3><ul><li ng-repeat="item in data.items"><a href="{{item.url}}">{{item.title}}</a></li></ul></div></div><div id="quick-look-images"><quicklook-images images="data.images"></quicklook-images></div><div id="wishlist-confirmation">Added to wishlist!</div></div><ul id="quick-look-actions" class="catalog-actions" ng-class="{\'for-look\': data.productType == \'Look\', \'clio-enabled\': CLIO_ENABLED}"><li id="quick-look-get-this-item"><button class="btn btn-black" ng-if="data.productType == \'Item\' && !cartItem" ng-disabled="!currentProduct.data[productId].canAddToCart" ng-click="addToCart()"><span ng-if="!loading">Add Item to Bag</span><loading-icon ng-show="loading"></loading-icon></button> <button class="btn btn-black" ng-if="data.productType == \'Item\' && cartItem" ng-disabled="!currentProduct.data[productId].canAddToCart" ng-click="updateCartItem()"><span ng-if="!loading">Update Item</span><loading-icon ng-show="loading"></loading-icon></button></li><li id="quicklook-wishlist-add-link"><quick-look-favorites product-id="modal.currentProductId" selected-variant="finalProductId" selected-color="currentColor.name" product-data="data" data-item-id="{{data.id}}" on-reject="closeModal()" format="\'text\'"></quick-look-favorites></li><li class="quicklook-actions--view-this"><a href="{{data.url}}" id="quick-look-permalink">View This {{data.productType}}</a></li></ul></div></div>'), 
    $templateCache.put("../assets/js/angular/shared/components/custom-dropdown/custom-dropdown.html", '<div ng-if="!$ctrl.ngModel.icon" class="custom-dropdown {{$ctrl.class}}"><select ng-model="$ctrl.ngModel" ng-disabled="$ctrl.disabled" ng-options="option as $ctrl.getLabel(option) for option in $ctrl.options track by option[$ctrl.trackBy]" ng-change="$ctrl.changeOption($ctrl.ngModel)"></select><span class="placeholder" ng-class="{\'above\': !(!$ctrl.ngModel || $ctrl.ngModel.length === 0)}" ng-if="$ctrl.placeholder">{{$ctrl.placeholder}}</span></div><div ng-if="$ctrl.ngModel.icon" class="custom-dropdown-icon" ng-class="{\'active\': $ctrl.isDropdownOpen}"><a class="dropdown-toggle" ng-class="{\'disabled\': $ctrl.disabled}" ng-click="$ctrl.toggleDropdown()"><span class="placeholder" ng-class="{\'above\': !(!$ctrl.ngModel || $ctrl.ngModel.length === 0)}" ng-if="$ctrl.placeholder">{{$ctrl.placeholder}} </span><img ng-if="$ctrl.ngModel.icon" ng-src="{{$ctrl.ngModel.icon}}" alt="{{$ctrl.getLabel($ctrl.ngModel)}}"> <span>{{$ctrl.getLabel($ctrl.ngModel)}}</span></a><div class="dropdown-content"><ul><li ng-repeat="option in $ctrl.options track by $index" ng-click="$ctrl.changeOption(option)"><img ng-if="option.icon" ng-src="{{option.icon}}" alt="{{$ctrl.getLabel(option)}}"> <span>{{$ctrl.getLabel(option)}}</span></li></ul></div></div>'), 
    $templateCache.put("../assets/js/angular/shared/components/custom-input/custom-input.html", '<div class="custom-input" ng-class="{\'password\': $ctrl.type === \'password\'}"><input type="{{$ctrl.showPassword ? \'text\' : $ctrl.type}}" name="{{$ctrl.name}}" ng-model="$ctrl.ngModel" ng-model-options="{allowInvalid: true}" ng-focus="$ctrl.showPlaceholder = false" ng-blur="$ctrl.showPlaceholder = true" ng-disabled="$ctrl.disabled" ng-required="$ctrl.required"> <span class="placeholder" ng-class="{\'above\': !($ctrl.showPlaceholder && (!$ctrl.ngModel || $ctrl.ngModel.length === 0))}" ng-if="$ctrl.placeholder">{{$ctrl.placeholder}} </span><span class="show-hide-button" ng-if="$ctrl.type === \'password\'" ng-click="$ctrl.showPassword = !$ctrl.showPassword">{{$ctrl.showPassword ? \'Hide\' : \'Show\'}}</span></div>'), 
    $templateCache.put("../assets/js/angular/shared/components/phone-input/phone-input-checkout.html", '<input type="text" name="{{$ctrl.name}}" id="{{$ctrl.name}}" ng-model="$ctrl.ngModel" ng-model-options="{allowInvalid: true}" ng-disabled="$ctrl.disabled" ng-required="$ctrl.required" ng-minlength="{{$ctrl.minLength}}" clean="true" mask="{{$ctrl.mask}}" restrict="reject" pattern="{{$ctrl.pattern}}" ng-change="$ctrl.ukNumberPrefix($ctrl.ngModel)">'), 
    $templateCache.put("../assets/js/angular/shared/components/phone-input/phone-input.html", '<div class="custom-input"><input type="text" name="{{$ctrl.name}}" ng-model="$ctrl.ngModel" ng-model-options="{allowInvalid: true}" ng-focus="$ctrl.showPlaceholder = false" ng-blur="$ctrl.showPlaceholder = true" ng-disabled="$ctrl.disabled" ng-required="$ctrl.required" ng-minlength="{{$ctrl.minLength}}" clean="true" mask="{{$ctrl.mask}}" restrict="reject" pattern="{{$ctrl.pattern}}" ng-change="$ctrl.ukNumberPrefix($ctrl.ngModel)"> <span class="placeholder" ng-class="{\'above\': !($ctrl.showPlaceholder && (!$ctrl.ngModel || $ctrl.ngModel.length === 0))}" ng-if="$ctrl.placeholder">{{$ctrl.placeholder}}</span></div>'), 
    $templateCache.put("../assets/js/angular/social/emailShareModal.html", '<div id="modal-knockout" ng-click="$ctrl.close()"></div><div id="modal"><div class="modal-style"><h3 class="send_email__title h2 align-center archer-medium">Send to a friend</h3><form name="email" novalidate ng-submit="email.$valid && $ctrl.send()"><div ng-if="$ctrl.type != \'wishlist\'"><fieldset class="send_email__fieldset" ng-class="{invalid: email.$submitted && email.from_name.$invalid}"><label class="send_email__label" for="from_name"><span>Name</span></label><input class="send_email__input text required" name="from_name" type="text" ng-model="$ctrl.data.from_name" required></fieldset><fieldset class="send_email__fieldset" ng-class="{invalid: email.$submitted && email.from_email.$invalid}"><label class="send_email__label" for="from_email"><span>Email Address</span></label><input class="send_email__input text required email" name="from_email" type="email" ng-model="$ctrl.data.from_email" required></fieldset></div><fieldset class="send_email__fieldset" ng-class="{invalid: email.$submitted && email.to_name.$invalid}"><label class="send_email__label"><span>Recipient Name</span></label><input class="send_email__input text required" name="to_name" type="text" ng-model="$ctrl.data.to_name" required></fieldset><fieldset class="send_email__fieldset" ng-class="{invalid: email.$submitted && email.to_email.$invalid}"><label class="send_email__label"><span>Recipient Email(s)</span></label><input class="send_email__input text required to_email" multiple-emails name="to_email" ng-model="$ctrl.data.to_email" required></fieldset><small class="send_email__helper_text">Separate multiple addresses with a comma.</small><fieldset class="send_email__fieldset"><label class="send_email__label">Subject</label><input class="send_email__input" name="subject" class="text" type="text" ng-model="$ctrl.data.subject"></fieldset><fieldset class="send_email__fieldset"><label class="send_email__label">Message</label><textarea class="send_email__input" name="message" ng-model="$ctrl.data.message"></textarea></fieldset><input id="send" type="submit" value="Send" class="btn btn-black">&nbsp; <a ng-click="$ctrl.close()">Close</a></form></div></div>'), 
    $templateCache.put("../assets/js/angular/social/socialShareButtons.html", '<div class="c-social-share-buttons"><a ng-if="!hide.facebook" class="b-social-share-link b-social-link_fb" ng-click="shareToFb()" href="#" title="Share on Facebook"><i class="fa fa-facebook"></i></a> <a ng-if="!hide.twitter" class="b-social-share-link b-social-link_tw" href="http://twitter.com/intent/tweet?text={{title}} - {{url}}" target="_blank" title="Share on Twitter"><i class="fa fa-twitter"></i></a> <a ng-if="!hide.pinterest" class="b-social-share-link b-social-link_pint" href="http://pinterest.com/pin/create/button/?url={{url}}&media={{image}}" target="_blank" title="Share on Pinterest"><i class="fa fa-pinterest"></i></a> <a ng-if="!hide.email && !hide.shareModal" email-share-modal class="b-social-link_mail" title="Share via email"><i class="fa fa-envelope"></i></a> <a ng-if="!hide.email && hide.shareModal" class="b-social-link_mail" href="mailto:?subject={{title}}&body={{title}}%20-%20{{url}}" title="Share via email"><i class="fa fa-envelope"></i></a></div>'), 
    $templateCache.put("../assets/js/angular/ui/dropdown/dropdown.html", '<div class="c-cabi-dropdown" ng-class="{\'js-open\': $ctrl.ui.open}" ng-mouseenter="$ctrl.ui.open = true" ng-mouseleave="$ctrl.ui.open = false"><div class="c-cabi-dropdown__label"><div class="c-cabi-dropdown__label-icon" ng-if="$ctrl.icon"><i class="fa fa-{{$ctrl.icon}}"></i></div><div class="c-cabi-dropdown__label-text">{{$ctrl.label}}</div></div><ul class="c-cabi-dropdown__options"><li class="c-cabi-dropdown__option" ng-repeat="option in $ctrl.options track by $index"><a ng-click="$ctrl.onSelectOption(option)">{{option.label}}</a></li></ul></div>'), 
    $templateCache.put("../assets/js/angular/ui/select-list/select-list.html", '<div class="c-select-list" cabi-select-list="$ctrl.onSelect" cabi-select-list-value="$ctrl.value"><ul><li><a href="#" data-value="no-quilifier">--Please Select--</a></li><li ng-repeat="(val, name) in $ctrl.options track by $index" cabi-select-list-item><a href="#" data-value="{{val}}">{{name}}</a></li></ul></div>'), 
    $templateCache.put("../assets/js/angular/video-player/video-player.html", '<div class="video-player__player"><div ng-if="$ctrl.poster" ng-click="$ctrl.onPlayRequest()" class="video-player__poster-wrapper"><div class="video-player__play-btn"><span class="btn-play"></span></div><div class="video-player__sub-title" ng-if="$ctrl.subTitle">{{::$ctrl.subTitle}}</div><video class="video-player__poster" autoplay loop poster="{{::$ctrl.poster[0].image}}"><source ng-if="$ctrl.hasMp4()" src="{{::$ctrl.poster[1].mp4}}" type="video/mp4"><source ng-if="$ctrl.hasWebm()" src="{{::$ctrl.poster[2].webm}}" type="video/webm"><source ng-if="$ctrl.hasOgg()" src="{{::$ctrl.poster[3].ogg}}" type="video/ogg"></video></div><iframe ng-src="{{$ctrl.video_for_player.url}}"></iframe></div><div class="video-player__thumbnails" ng-if="$ctrl.videos.length > 1"><ul><li ng-repeat="video in $ctrl.videos track by $index" class="video-player__thumbnail" ng-click="$ctrl.onPlayRequest(video)" ng-class="{\'video-player__thumbnail--playing\': video.playing}"><div class="video-player__thumbnail-image"><div class="video-player__thumbnail-image-mask"><span>Now<br>Playing</span></div><img ng-src="https://media.cabionline.com/{{::video.image}}"></div><div class="video-player__thumbnail-text"><span class="video-player__text-title">{{::video.title}}</span> <span class="video-player__text-subtitle">{{::video.subtitle}}</span></div></li></ul></div>');
} ]), window.angular.module("cabi.account").component("account", {
    bindings: {
        component: "@",
        attrs: "<",
        moduleData: "<"
    },
    controller: "AccountController",
    templateUrl: TEMPLATE_DIR + "/assets/js/angular/account/account.html"
}), function(angular) {
    window.angular.module("cabi.account").controller("AccountController", [ "$scope", "componentsConstant", "componentHandlerService", function($scope, componentsConstant, componentHandlerService) {
        const $ctrl = this;
        $ctrl.components = componentsConstant.account, $ctrl.$onInit = function() {
            componentHandlerService.init($scope, $ctrl.component, componentsConstant.account.loginGateway, $ctrl.attrs, $ctrl.moduleData);
        }, $ctrl.isComponentActive = componentHandlerService.isComponentActive, $ctrl.getAttrs = componentHandlerService.getAttrs;
    } ]);
}(), window.angular.module("cabi.account").component("alreadyLoggedIn", {
    bindings: {
        attrs: "<"
    },
    controller: "AlreadyLoggedInController",
    templateUrl: TEMPLATE_DIR + "/assets/js/angular/account/components/already-logged-in/already-logged-in.html"
}), function(angular) {
    window.angular.module("cabi.account").controller("AlreadyLoggedInController", [ "$rootScope", "authService", "componentsConstant", function($rootScope, authService, componentsConstant) {
        this.close = function() {
            $rootScope.$broadcast("navigate", {
                from: componentsConstant.account.loginGateway,
                to: null
            });
        }, this.logout = function() {
            authService.logout().then(function() {
                $rootScope.$broadcast("navigate", {
                    from: componentsConstant.account.alreadyLoggedIn,
                    to: componentsConstant.account.loginGateway
                });
            }).catch(function() {
                $rootScope.$broadcast("navigate", {
                    from: componentsConstant.account.alreadyLoggedIn,
                    to: componentsConstant.account.loginGateway
                });
            });
        };
    } ]);
}(), window.angular.module("cabi.account").component("changePassword", {
    bindings: {
        attrs: "<"
    },
    controller: "ChangePasswordController",
    templateUrl: TEMPLATE_DIR + "/assets/js/angular/account/components/change-password/change-password.html"
}), function(angular) {
    window.angular.module("cabi.account").controller("ChangePasswordController", [ "$rootScope", "componentsConstant", "accountService", "urlParametersService", "findMyStylistService", "commonService", function($rootScope, componentsConstant, accountService, urlParametersService, findMyStylistService, commonService) {
        const $ctrl = this;
        function stylistCheck() {
            findMyStylistService.getMyStylistsWithReplicated($ctrl.form.email).then(function(response) {
                if (response.myStylists.length > 1) {
                    const stylistSource = urlParametersService.getParameter(urlParametersService.parameterTypes.STYLIST_SOURCE);
                    findMyStylistService.checkIfCurrentConsultantIsValid($ctrl.form.email, stylistSource).then(function(res) {
                        if ($ctrl.isLoading = !1, res) commonService.redirectToRSOrCallback(res.replicatedSiteUrl, $ctrl.attrs && $ctrl.attrs.module ? $ctrl.attrs.module.callback : null); else $rootScope.$broadcast("navigate", {
                            from: componentsConstant.account.changePassword,
                            to: componentsConstant.findMyStylist.selectStylist,
                            data: {
                                stylists: response.myStylists
                            }
                        });
                    }).catch(function(error) {
                        $ctrl.isLoading = !1, $ctrl.error = error.message;
                    });
                } else $ctrl.isLoading = !1, commonService.redirectToRSOrCallback(response.myStylists[0].replicatedSiteUrl, $ctrl.attrs && $ctrl.attrs.module ? $ctrl.attrs.module.callback : null);
            }).catch(function(error) {
                $ctrl.isLoading = !1, $ctrl.error = error.message;
            });
        }
        $ctrl.isLoading = !1, $ctrl.error = null, $ctrl.isReplicatedSite = !!window.CABI_STYLIST_INFO, 
        $ctrl.form = {
            email: "",
            oldPassword: "",
            newPassword: "",
            confirmedNewPassword: ""
        }, $ctrl.componentsConstant = componentsConstant, $ctrl.$onInit = function() {
            urlParametersService.loadParametersFromUrl(), $ctrl.form.email = urlParametersService.getParameter(urlParametersService.parameterTypes.EMAIL);
        }, $ctrl.resetPassword = function() {
            if ($ctrl.form.newPassword !== $ctrl.form.confirmedNewPassword) $ctrl.error = "Oops, your password confirmation does not match your password."; else $ctrl.isLoading = !0, 
            $ctrl.error = null, accountService.resetPassword($ctrl.form.oldPassword, $ctrl.form.newPassword, $ctrl.form.confirmedNewPassword, $ctrl.form.email).then(function() {
                $ctrl.isLoading = !1, $rootScope.$broadcast("navigate", {
                    from: componentsConstant.account.changePassword,
                    to: componentsConstant.account.loginGateway
                });
            }).catch(function(error) {
                $ctrl.isLoading = !1, $ctrl.error = error.message;
            });
        }, $ctrl.changePasswordAndLogin = function() {
            if ($ctrl.form.newPassword !== $ctrl.form.confirmedNewPassword) $ctrl.error = "Oops, your password confirmation does not match your password."; else $ctrl.isLoading = !0, 
            $ctrl.error = null, accountService.changePasswordAndLogin($ctrl.form.oldPassword, $ctrl.form.newPassword, $ctrl.form.email).then(function() {
                stylistCheck();
            }).catch(function(error) {
                $ctrl.isLoading = !1, $ctrl.error = error.message;
            });
        }, $ctrl.validateRegisterCode = function() {
            $ctrl.isLoading = !0, $ctrl.error = null, accountService.validateRegisterCode($ctrl.form.oldPassword, $ctrl.form.email).then(function() {
                stylistCheck();
            }).catch(function(error) {
                $ctrl.isLoading = !1, $ctrl.error = error.message;
            });
        };
    } ]);
}(), window.angular.module("cabi.account").component("existingCustomerRegistration", {
    bindings: {
        attrs: "<"
    },
    controller: "ExistingCustomerRegistrationController",
    templateUrl: TEMPLATE_DIR + "/assets/js/angular/account/components/existing-customer-registration/existing-customer-registration.html"
}), function(angular) {
    window.angular.module("cabi.account").controller("ExistingCustomerRegistrationController", [ "$rootScope", "componentsConstant", "commonService", "accountService", "findMyStylistService", "urlParametersService", "GoogleAnalytics", function($rootScope, componentsConstant, commonService, accountService, findMyStylistService, urlParametersService, GoogleAnalytics) {
        const $ctrl = this;
        $ctrl.isLoading = !1, $ctrl.form = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            wantsNewsMail: !1
        }, $ctrl.$onInit = function() {
            if ($ctrl.attrs.module && $ctrl.attrs.module.modalSource) GoogleAnalytics.sendEvent($ctrl.attrs.module.modalSource, "NewProfile");
            urlParametersService.loadParametersFromUrl(), $ctrl.form.email = urlParametersService.getParameter(urlParametersService.parameterTypes.EMAIL);
        }, $ctrl.continue = function() {
            if ($ctrl.error = null, $ctrl.form.password !== $ctrl.form.confirmPassword) $ctrl.error = "Oops, your password confirmation does not match your password."; else urlParametersService.setParameter(urlParametersService.parameterTypes.EMAIL, $ctrl.form.email), 
            $ctrl.isLoading = !0, accountService.registerExistingCustomer($ctrl.form.firstName, $ctrl.form.lastName, $ctrl.form.email, $ctrl.form.password, $ctrl.form.wantsNewsMail).then(function(res) {
                if (res.verificationRequired) $ctrl.isLoading = !1, $rootScope.$broadcast("navigate", {
                    from: componentsConstant.account.existingCustomerRegistration,
                    to: componentsConstant.account.changePassword
                }); else findMyStylistService.getMyStylistsWithReplicated($ctrl.form.email).then(function(response) {
                    if ($ctrl.isLoading = !1, response.myStylists.length > 1) $rootScope.$broadcast("navigate", {
                        from: componentsConstant.account.existingCustomerRegistration,
                        to: componentsConstant.findMyStylist.selectStylist,
                        data: {
                            stylists: response.myStylists,
                            stylistAssociationSource: commonService.stylistAssociationSource.CUSTOMER
                        }
                    }); else commonService.redirectToRSOrCallback(response.myStylists[0].replicatedSiteUrl, $ctrl.attrs && $ctrl.attrs.module ? $ctrl.attrs.module.callback : null);
                }).catch(function(error) {
                    $ctrl.isLoading = !1, $ctrl.error = error.message;
                });
            }).catch(function(error) {
                $ctrl.isLoading = !1, $ctrl.error = error.message;
            });
        }, $ctrl.navigateToLogin = function() {
            $rootScope.$broadcast("navigate", {
                from: componentsConstant.account.existingCustomerRegistration,
                to: componentsConstant.account.loginGateway
            });
        };
    } ]);
}(), window.angular.module("cabi.account").component("forgotPassword", {
    bindings: {
        attrs: "<"
    },
    controller: "ForgotPasswordController",
    templateUrl: TEMPLATE_DIR + "/assets/js/angular/account/components/forgot-password/forgot-password.html"
}), function(angular) {
    window.angular.module("cabi.account").controller("ForgotPasswordController", [ "$rootScope", "componentsConstant", "accountService", "urlParametersService", function($rootScope, componentsConstant, accountService, urlParametersService) {
        const $ctrl = this;
        $ctrl.isLoading = !1, $ctrl.error = null, $ctrl.form = {
            email: ""
        }, $ctrl.$onInit = function() {
            urlParametersService.loadParametersFromUrl(), $ctrl.form.email = urlParametersService.getParameter(urlParametersService.parameterTypes.EMAIL);
        }, $ctrl.getPassword = function() {
            urlParametersService.setParameter(urlParametersService.parameterTypes.EMAIL, $ctrl.form.email), 
            $ctrl.isLoading = !0, $ctrl.error = null, accountService.sendResetPasswordRequest($ctrl.form.email).then(function() {
                $ctrl.isLoading = !1, $rootScope.$broadcast("navigate", {
                    from: componentsConstant.account.forgotPassword,
                    to: componentsConstant.account.changePassword
                });
            }).catch(function(error) {
                $ctrl.isLoading = !1, $ctrl.error = error.message;
            });
        };
    } ]);
}(), window.angular.module("cabi.account").component("loginAuthenticate", {
    bindings: {
        attrs: "<"
    },
    controller: "LoginAuthenticateController",
    templateUrl: TEMPLATE_DIR + "/assets/js/angular/account/components/login-authenticate/login-authenticate.html"
}), function(angular) {
    window.angular.module("cabi.account").controller("LoginAuthenticateController", [ "$rootScope", "componentsConstant", "commonService", "authService", "accountService", "findMyStylistService", "urlParametersService", "errorEnum", "GoogleAnalytics", function($rootScope, componentsConstant, commonService, authService, accountService, findMyStylistService, urlParametersService, errorEnum, GoogleAnalytics) {
        const $ctrl = this;
        $ctrl.isLoading = !1, $ctrl.error = null, $ctrl.form = {
            email: "",
            password: "",
            rememberMe: void 0
        }, $ctrl.$onInit = function() {
            if ($ctrl.attrs.module && $ctrl.attrs.module.modalSource) GoogleAnalytics.sendEvent($ctrl.attrs.module.modalSource, "SignIn");
            if (urlParametersService.loadParametersFromUrl(), $ctrl.form.email = urlParametersService.getParameter(urlParametersService.parameterTypes.EMAIL), 
            $ctrl.form.rememberMe = urlParametersService.getParameter(urlParametersService.parameterTypes.REMEMBER_ME), 
            void 0 === $ctrl.form.rememberMe) $ctrl.form.rememberMe = !1;
        }, $ctrl.continue = function() {
            $ctrl.isLoading = !0, $ctrl.error = null, authService.login($ctrl.form.email, $ctrl.form.password, $ctrl.form.rememberMe).then(function() {
                findMyStylistService.getMyStylistsWithReplicated($ctrl.form.email).then(function(response) {
                    if (response.myStylists.length > 1) {
                        const stylistSource = urlParametersService.getParameter(urlParametersService.parameterTypes.STYLIST_SOURCE);
                        findMyStylistService.checkIfCurrentConsultantIsValid($ctrl.form.email, stylistSource).then(function(res) {
                            if ($ctrl.isLoading = !1, res) commonService.redirectToRSOrCallback(res.replicatedSiteUrl, $ctrl.attrs && $ctrl.attrs.module ? $ctrl.attrs.module.callback : null); else $rootScope.$broadcast("navigate", {
                                from: componentsConstant.account.loginAuthenticate,
                                to: componentsConstant.findMyStylist.selectStylist,
                                data: {
                                    stylists: response.myStylists
                                }
                            });
                        }).catch(function(error) {
                            $ctrl.isLoading = !1, $ctrl.error = error.message;
                        });
                    } else $ctrl.isLoading = !1, commonService.redirectToRSOrCallback(response.myStylists[0].replicatedSiteUrl, $ctrl.attrs && $ctrl.attrs.module ? $ctrl.attrs.module.callback : null);
                }).catch(function(error) {
                    $ctrl.isLoading = !1, $ctrl.error = error.message;
                });
            }).catch(function(error) {
                if ($ctrl.isLoading = !1, error.code === errorEnum.PASSWORD_CHANGE_REQUIRED.code) urlParametersService.setParameter(urlParametersService.parameterTypes.EMAIL, $ctrl.form.email), 
                $rootScope.$broadcast("navigate", {
                    from: componentsConstant.account.loginAuthenticate,
                    to: componentsConstant.account.changePassword
                }); else $ctrl.error = error.message;
            });
        }, $ctrl.requestPassword = function() {
            $rootScope.$broadcast("navigate", {
                from: componentsConstant.account.loginAuthenticate,
                to: componentsConstant.account.forgotPassword
            });
        };
    } ]);
}(), window.angular.module("cabi.account").component("loginGateway", {
    bindings: {
        attrs: "<"
    },
    controller: "LoginGatewayController",
    templateUrl: TEMPLATE_DIR + "/assets/js/angular/account/components/login-gateway/login-gateway.html"
}), function(angular) {
    const ACCOUNT_ASSET_URL_PATH = "/wp-content/themes/cabi/assets/images/account";
    window.angular.module("cabi.account").controller("LoginGatewayController", [ "$rootScope", "componentsConstant", "localeService", "accountService", "authService", "findMyStylistService", "urlParametersService", "errorEnum", "currentLocaleService", "GoogleAnalytics", function($rootScope, componentsConstant, localeService, accountService, authService, findMyStylistService, urlParametersService, errorEnum, currentLocaleService, GoogleAnalytics) {
        const $ctrl = this;
        function persistFormValues() {
            urlParametersService.setParameter(urlParametersService.parameterTypes.COMPONENT, componentsConstant.account.loginGateway), 
            urlParametersService.setParameter(urlParametersService.parameterTypes.EMAIL, $ctrl.form.email), 
            urlParametersService.setParameter(urlParametersService.parameterTypes.REMEMBER_ME, $ctrl.form.rememberMe);
        }
        $ctrl.countries = [ {
            key: "USA",
            label: "USA",
            icon: ACCOUNT_ASSET_URL_PATH + "/flag_usa.png",
            errorCode: -30085,
            locale: localeService.getLocales().US
        }, {
            key: "CAN",
            label: "CAN",
            icon: ACCOUNT_ASSET_URL_PATH + "/flag_can.png",
            errorCode: -30083,
            locale: localeService.getLocales().CA
        }, {
            key: "GBR",
            label: "UK",
            icon: ACCOUNT_ASSET_URL_PATH + "/flag_uk.png",
            errorCode: -30084,
            locale: localeService.getLocales().GBR
        } ], $ctrl.selectedCountry = $ctrl.countries[0], $ctrl.isDropdownOpen = !1, $ctrl.isLoading = !1, 
        $ctrl.isFullLoading = !0, $ctrl.error = null, $ctrl.form = {
            email: "",
            rememberMe: !1
        }, $ctrl.isReplicatedSite = !!window.CABI_STYLIST_INFO, $ctrl.$onInit = function() {
            authService.isAuthenticated().then(function() {
                $ctrl.isFullLoading = !1, $rootScope.$broadcast("navigate", {
                    from: componentsConstant.account.loginGateway,
                    to: componentsConstant.account.alreadyLoggedIn
                });
            }, function() {
                $ctrl.isFullLoading = !1;
            }), urlParametersService.loadParametersFromUrl(), $ctrl.form.email = urlParametersService.getParameter(urlParametersService.parameterTypes.EMAIL), 
            $ctrl.form.rememberMe = urlParametersService.getParameter(urlParametersService.parameterTypes.REMEMBER_ME);
            const locale = localeService.findLocaleByCode(currentLocaleService.get(), localeService.getDomainLocale());
            $ctrl.selectedCountry = $ctrl.countries.find(country => country.key === locale.key);
        }, $ctrl.toggleDropdown = function() {
            if (!$ctrl.isLoading) $ctrl.isDropdownOpen = !$ctrl.isDropdownOpen;
        }, $ctrl.changeCountry = function(country) {
            if (persistFormValues(), window.location.host !== country.locale.url) urlParametersService.switchLocale(country.locale, !0);
            $ctrl.selectedCountry = country, $ctrl.isDropdownOpen = !1;
        }, $ctrl.continue = function() {
            persistFormValues(), $ctrl.isLoading = !0, $ctrl.error = null, accountService.validateUserLogin($ctrl.form.email).then(function() {
                $ctrl.isLoading = !1, $rootScope.$broadcast("navigate", {
                    from: componentsConstant.account.loginGateway,
                    to: componentsConstant.account.loginAuthenticate
                });
            }).catch(function(error) {
                if (error.code === errorEnum.LOGIN_ID_IS_NOT_GUEST_OR_CONSULTANT.code) findMyStylistService.getMyStylists($ctrl.form.email).then(function() {
                    $ctrl.isLoading = !1, $rootScope.$broadcast("navigate", {
                        from: componentsConstant.account.loginGateway,
                        to: componentsConstant.account.existingCustomerRegistration
                    });
                }).catch(function() {
                    $ctrl.isLoading = !1, $rootScope.$broadcast("navigate", {
                        from: componentsConstant.account.loginGateway,
                        to: componentsConstant.account.newCustomerRegistration
                    });
                }); else {
                    $ctrl.isLoading = !1;
                    const errorCountry = $ctrl.countries.find(country => country.errorCode === error.code);
                    if (errorCountry && errorCountry.domain) urlParametersService.switchLocale(errorCountry.locale, !0); else $ctrl.error = error.message;
                }
            });
        }, $ctrl.close = function() {
            $rootScope.$broadcast("navigate", {
                from: componentsConstant.account.loginGateway,
                to: null
            });
        }, $ctrl.guestCheckout = function() {
            GoogleAnalytics.sendEvent("CheckOut", "GuestCheckout", window.CABI_STYLIST_INFO ? window.CABI_STYLIST_INFO.PartyId : null), 
            $ctrl.attrs.module.callback("");
        };
    } ]);
}(), window.angular.module("cabi.account").component("newCustomerRegistration", {
    bindings: {
        attrs: "<"
    },
    controller: "NewCustomerRegistrationController",
    templateUrl: TEMPLATE_DIR + "/assets/js/angular/account/components/new-customer-registration/new-customer-registration.html"
}), function(angular) {
    window.angular.module("cabi.account").controller("NewCustomerRegistrationController", [ "$rootScope", "$scope", "errorEnum", "componentsConstant", "sourcesConstant", "outletStoresConstant", "localeService", "accountService", "commonService", "urlParametersService", "currentLocaleService", "GoogleAnalytics", function($rootScope, $scope, errorEnum, componentsConstant, sourcesConstant, outletStoresConstant, localeService, accountService, commonService, urlParametersService, currentLocaleService, GoogleAnalytics) {
        const $ctrl = this;
        function isSource(sourceValue) {
            return $ctrl.form.source && $ctrl.form.source.value === sourceValue;
        }
        $ctrl.isLoading = !1, $ctrl.isReplicatedSite = !!window.CABI_STYLIST_INFO, $ctrl.sourceOptions = sourcesConstant, 
        $ctrl.outletStoreOptions = outletStoresConstant, $ctrl.form = {
            firstName: "",
            lastName: "",
            email: "",
            zipCode: void 0,
            phoneNumber: "",
            password: "",
            confirmPassword: "",
            wantsNewsMail: !1,
            communication: {
                email: !1,
                txt: !1,
                phone: !1,
                no: !1
            },
            friend: {
                firstName: "",
                lastName: "",
                city: "",
                state: ""
            },
            source: "",
            countryCode: "",
            outletStore: ""
        }, $ctrl.countryLabels = commonService.getCountryLabels(), $ctrl.$onInit = function() {
            if ($ctrl.attrs.module && $ctrl.attrs.module.modalSource) GoogleAnalytics.sendEvent($ctrl.attrs.module.modalSource, "NewCustomer");
            if (urlParametersService.loadParametersFromUrl(), $ctrl.form.email = urlParametersService.getParameter(urlParametersService.parameterTypes.EMAIL), 
            $ctrl.attrs && $ctrl.attrs.data) $ctrl.form = $ctrl.attrs.data.form;
            const locale = localeService.findLocaleByCode(currentLocaleService.get(), localeService.getDomainLocale());
            $ctrl.form.countryCode = locale.key, $ctrl.isLoading = !0, commonService.getStateProvinceList().then(function(result) {
                $ctrl.isLoading = !1, $ctrl.states = result.list;
            }).catch(function(error) {
                $ctrl.isLoading = !1, $ctrl.error = error.message;
            });
        }, $ctrl.isCommunicationInvalid = function() {
            if ($ctrl.determineCommunicationPhoneError()) return !0; else return !($ctrl.form.communication.email || $ctrl.form.communication.txt || $ctrl.form.communication.phone || $ctrl.form.communication.no);
        }, $ctrl.determineCommunicationPhoneError = function() {
            if ($ctrl.form.communication.txt || $ctrl.form.communication.phone) {
                if (!$ctrl.form.phoneNumber || $scope.newCustomerRegistrationForm.phone.$invalid) return $ctrl.phoneWarning = "You've selected phone or text as your preferred communication method. Please provide a phone number above to continue.", 
                !0;
            } else if ($ctrl.form.phoneNumber && $scope.newCustomerRegistrationForm.phone.$error.minlength) return $ctrl.phoneWarning = "Phone number is too short!", 
            !0;
            return $ctrl.phoneWarning = null, !1;
        }, $ctrl.continue = function() {
            if ($ctrl.error = null, $ctrl.form.password !== $ctrl.form.confirmPassword) $ctrl.error = "Oops, your password confirmation does not match your password."; else !function() {
                urlParametersService.setParameter(urlParametersService.parameterTypes.EMAIL, $ctrl.form.email), 
                urlParametersService.setParameter(urlParametersService.parameterTypes.ZIP_CODE, $ctrl.form.zipCode), 
                $ctrl.isLoading = !0, $ctrl.error = null;
                const searchStylistWrapperParams = {
                    zipCode: $ctrl.form.zipCode,
                    clioCountryCode: $ctrl.form.countryCode,
                    firstName: $ctrl.form.firstName,
                    lastName: $ctrl.form.lastName,
                    friendFirstName: $ctrl.isFriendSource() ? $ctrl.form.friend.firstName : void 0,
                    friendLastName: $ctrl.isFriendSource() ? $ctrl.form.friend.lastName : void 0,
                    state: $ctrl.isFriendSource() ? $ctrl.form.friend.state.code : void 0
                }, createAccountParams = {
                    emailAddress: $ctrl.form.email,
                    firstName: $ctrl.form.firstName,
                    lastName: $ctrl.form.lastName,
                    password: $ctrl.form.password,
                    optInMailingList: $ctrl.form.wantsNewsMail ? "Y" : "N"
                }, communication = [];
                Object.keys($ctrl.form.communication).forEach(function(key) {
                    if ("no" !== key && $ctrl.form.communication[key]) communication.push(key);
                });
                let stylistSource = $ctrl.isFriendSource() ? commonService.stylistAssociationSource.HOSTESS : commonService.stylistAssociationSource.GEO;
                if ($ctrl.isReplicatedSite) stylistSource = urlParametersService.getParameter(urlParametersService.parameterTypes.STYLIST_SOURCE);
                accountService.registerNewCustomer(searchStylistWrapperParams, createAccountParams, communication, stylistSource, $ctrl.form.phoneNumber).then(function(response) {
                    if ($ctrl.isLoading = !1, response.verificationRequired) $rootScope.$broadcast("navigate", {
                        from: componentsConstant.account.newCustomerRegistration,
                        to: componentsConstant.account.changePassword
                    }); else if (response.assignedStylist) if ($ctrl.attrs && $ctrl.attrs.module && $ctrl.attrs.module.showGuestCheckout) commonService.redirectToRSOrCallback("", $ctrl.attrs && $ctrl.attrs.module ? $ctrl.attrs.module.callback : null); else $rootScope.$broadcast("navigate", {
                        from: componentsConstant.account.newCustomerRegistration,
                        to: componentsConstant.findMyStylist.meetStylist,
                        data: {
                            stylist: response.assignedStylist,
                            stylistAssociationSource: stylistSource
                        }
                    }); else $rootScope.$broadcast("navigate", {
                        from: componentsConstant.account.newCustomerRegistration,
                        to: componentsConstant.findMyStylist.noStylist,
                        data: {
                            form: $ctrl.form
                        }
                    });
                }).catch(function(error) {
                    if ($ctrl.isLoading = !1, error.code === errorEnum.STYLIST_SEARCH_FAIL.code || error.code === errorEnum.NO_RESULT_FOUND.code) $rootScope.$broadcast("navigate", {
                        from: componentsConstant.account.newCustomerRegistration,
                        to: componentsConstant.findMyStylist.noStylist,
                        data: {
                            form: $ctrl.form
                        }
                    });
                    $ctrl.error = error.message;
                });
            }();
        }, $ctrl.isFriendSource = function() {
            return isSource("Friend");
        }, $ctrl.isOutletStoreSource = function() {
            return isSource("Store");
        }, $ctrl.navigateToLogin = function() {
            $rootScope.$broadcast("navigate", {
                from: componentsConstant.account.newCustomerRegistration,
                to: componentsConstant.account.loginGateway
            });
        }, $ctrl.preferenceSelection = function() {
            $ctrl.form.communication.no = !1, $ctrl.determineCommunicationPhoneError();
        }, $ctrl.deselectAllPreferences = function() {
            $ctrl.form.communication.email = !1, $ctrl.form.communication.txt = !1, $ctrl.form.communication.phone = !1, 
            $ctrl.determineCommunicationPhoneError();
        }, $ctrl.guestCheckout = function() {
            GoogleAnalytics.sendEvent("CheckOut", "GuestCheckout", window.CABI_STYLIST_INFO ? window.CABI_STYLIST_INFO.PartyId : null), 
            $ctrl.attrs.module.callback("");
        };
    } ]);
}(), function(angular) {
    function WP_Archive_Service($http, $q) {
        this.get = function(endpoint, params) {
            return $http({
                url: endpoint,
                params: params
            });
        };
    }
    WP_Archive_Service.$inject = [ "$http", "$q" ], angular.module("cabi.blog").service("WP_Archive_Service", WP_Archive_Service);
}(window.angular), window.angular.module("cabi.blog").component("wpPopularPosts", {
    templateUrl: "/wp-content/themes/cabi/assets/js/angular/blog/wp-popular-posts.html",
    controller: "WP_Popular_Posts_Controller"
}), function(angular) {
    function WP_Popular_Posts_Controller($http) {
        var $ctrl = this;
        $ctrl.$onInit = function() {
            $http({
                url: "/wp-json/wp/v2/pages/14691/"
            }).then(function(response) {
                $ctrl.popular_posts = response.data.popular_posts;
            });
        };
    }
    WP_Popular_Posts_Controller.$inject = [ "$http" ], angular.module("cabi.blog").controller("WP_Popular_Posts_Controller", WP_Popular_Posts_Controller);
}(window.angular), window.angular.module("cabi.blog").component("wpPostLoop", {
    templateUrl: "/wp-content/themes/cabi/assets/js/angular/blog/wp-post-loop.html",
    controller: "WP_Post_Loop_Controller",
    bindings: {
        endpoint: "<",
        categoryName: "<",
        popularPost: "<",
        hideFeatured: "<"
    }
}), function(angular) {
    function WP_Post_Loop_Controller(WP_Archive) {
        var params, $ctrl = this;
        function getPosts() {
            return $ctrl.ui.loading = !0, WP_Archive.get($ctrl.endpoint, params).then(function(response) {
                if (!$ctrl.settings.hideFeatured) $ctrl.post_rows.push([ response.data.shift() ]);
                for (var i = 0; i < response.data.length; i += 2) {
                    for (var post_row = [], j = i; j < i + 2; j++) if (angular.isDefined(response.data[j])) response.data[j] = preparePost(response.data[j]), 
                    post_row.push(response.data[j]);
                    $ctrl.post_rows.push(post_row);
                }
                $ctrl.ui = angular.merge($ctrl.ui, {
                    loading: !1,
                    showLoadMore: params.page < parseInt(response.headers("x-wp-totalpages"))
                });
            });
        }
        function preparePost(post) {
            if (angular.isDefined($ctrl.categoryNameOveride)) post.category_name = $ctrl.categoryNameOveride;
            return post;
        }
        $ctrl.post_rows = [], $ctrl.settings = {
            popularPost: !0,
            hideFeatured: !1
        }, $ctrl.ui = {
            loading: !1
        }, $ctrl.$onInit = function() {
            if ($ctrl.settings.hideFeatured) params = {
                page: 1,
                per_page: 10
            }; else if (!$ctrl.settings.popularPost) params = {
                page: 1,
                per_page: 9
            }; else params = {
                page: 1,
                per_page: 8
            };
            getPosts().then(function() {
                if ($ctrl.settings.popularPost) params.offset = 8, params.page = 0, params.per_page = 9;
            });
        }, $ctrl.$onChanges = function(changes) {
            if ($ctrl.endpoint = changes.endpoint.currentValue, $ctrl.settings.popularPost = changes.popularPost.currentValue, 
            $ctrl.settings.hideFeatured = changes.hideFeatured.currentValue, angular.isDefined($ctrl.endpoint.split("categories=")[1])) $ctrl.category_id = $ctrl.endpoint.split("categories=")[1];
            $ctrl.categoryNameOveride = angular.copy(changes.categoryName.currentValue);
        }, $ctrl.loadMore = function(changes) {
            params.page += 1, getPosts();
        };
    }
    WP_Post_Loop_Controller.$inject = [ "WP_Archive_Service" ], angular.module("cabi.blog").controller("WP_Post_Loop_Controller", WP_Post_Loop_Controller);
}(window.angular), window.angular.module("cabi.blog").component("wpPost", {
    templateUrl: "/wp-content/themes/cabi/assets/js/angular/blog/wp-post.html",
    bindings: {
        post: "<"
    },
    controller: "WP_Post_Controller"
}), function(angular) {
    function WP_Post_Controller() {
        var $ctrl = this;
        this.$onChanges = function(changes) {
            $ctrl.post = angular.copy(changes.post.currentValue);
        };
    }
    WP_Post_Controller.$inject = [], angular.module("cabi.blog").controller("WP_Post_Controller", WP_Post_Controller);
}(window.angular), function(angular) {
    angular.module("cabi.browseLook").directive("browseLook", [ "quicklookService", "BrowseLookModal", "currentProduct", function(Quicklook, BrowseLookModal, currentProduct) {
        return {
            restrict: "A",
            link: function($scope, elm, attributes) {
                if (elm.on("click", function(e) {
                    e.preventDefault();
                    var productIds = function(productIds) {
                        productIds = productIds.split(",");
                        for (var prepedIds = [], i = 0; i < productIds.length; i++) {
                            var productId = productIds[i];
                            if (0 !== productId.indexOf("33")) productId = "33" + productId;
                            if (-1 === prepedIds.indexOf(productId)) prepedIds.push(productId);
                        }
                        return prepedIds.join(",");
                    }(elm.attr("browse-look"));
                    angular.element(document.body).append("<div id='modal-knockout'></div>"), Quicklook.getQuicklooks(productIds).then(function(response) {
                        angular.element(document.querySelector("#modal-knockout")).remove(), BrowseLookModal.activate({
                            products: response.data
                        });
                    });
                }), angular.isDefined(attributes.forCurrentProduct)) elm.hide(), $scope.$watch(function() {
                    return currentProduct.data[attributes.forCurrentProduct].outfitIds;
                }, function(outfitIds, oV) {
                    if (angular.isDefined(outfitIds) && null !== outfitIds) elm.show(), elm.attr("browse-look", outfitIds); else elm.hide();
                });
            }
        };
    } ]), angular.module("cabi.browseLook").directive("browseLookModal", [ "BrowseLookModal", function(BrowseLookModal) {
        return {
            restrict: "A",
            link: function($scope, elm, attributes) {
                angular.element("html").bind("keyup", function(e) {
                    if (27 === e.keyCode) $scope.$apply(function() {
                        BrowseLookModal.deactivate();
                    });
                });
            }
        };
    } ]);
}(window.angular), function(angular) {
    function BrowseLookModalCtrl(products, BrowseLookModal) {
        if (this.products = products.length ? products : [ products ], this.productIds = this.products.map(function(product) {
            return product.productId;
        }).join(","), this.closeModal = BrowseLookModal.deactivate, ga("send", "event", "Browse Look", "select", this.productIds), 
        this.wishlist = {
            loading: !1,
            added: !1
        }, angular.isDefined(window.CABI_STYLIST_INFO)) this.ecommerceEnabled = !0;
    }
    angular.module("cabi.browseLook").service("BrowseLookModal", [ "btfModal", function(btfModal) {
        return btfModal({
            controller: [ "products", "BrowseLookModal", BrowseLookModalCtrl ],
            controllerAs: "$ctrl",
            templateUrl: "/wp-content/themes/cabi/assets/js/angular/browse-look/modal/modal.html"
        });
    } ]);
}(window.angular), function(angular) {
    function CabiCutieModalController(cutie, collection, onOpen, close) {
        var $ctrl = this;
        function _setPaginationItems() {
            if ($ctrl.collection) {
                $ctrl.previousItem = $ctrl.nextItem = null;
                for (var i = 0; i < collection.length; i++) if (collection[i].id === $ctrl.cutie.id) {
                    if (i > 0) $ctrl.previousItem = collection[i - 1];
                    if (i + 1 !== collection.length) $ctrl.nextItem = collection[i + 1];
                }
            }
        }
        $ctrl.cutie = cutie, $ctrl.collection = collection, $ctrl.close = close, _setPaginationItems(), 
        $ctrl.goToItem = function(item) {
            $ctrl.cutie = angular.copy(item), onOpen(item), _setPaginationItems();
        };
    }
    CabiCutieModalController.$inject = [ "cutie", "collection", "onOpen", "close", "CabiCuties", "CabiCutieModal", "$state" ], 
    angular.module("cabi.cabi-cuties").controller("CabiCutieModalController", CabiCutieModalController);
}(window.angular), function(angular) {
    angular.module("cabi.cabi-cuties").service("CabiCutieModal", function(ModalService) {
        this.show = function(config) {
            var settings = angular.extend({}, {
                templateUrl: "/wp-content/themes/cabi/assets/js/angular/cabi-cuties/components/cabi-cutie-modal/cabi-cutie-modal.html",
                controller: "CabiCutieModalController",
                controllerAs: "$ctrl",
                bodyClass: "o-modal--knockout"
            }, config);
            return ModalService.showModal(settings);
        }, ModalService.$inject = [ "ModalService" ];
    });
}(window.angular), window.angular.module("cabi.cabi-cuties").component("cabiCutieThumbnail", {
    bindings: {
        item: "<"
    },
    templateUrl: "/wp-content/themes/cabi/assets/js/angular/cabi-cuties/components/cabi-cutie-thumbnail/cabi-cutie-thumbnail.html"
}), window.angular.module("cabi.cabi-cuties").component("cabiCutie", {
    bindings: {
        cutie: "<"
    },
    templateUrl: "/wp-content/themes/cabi/assets/js/angular/cabi-cuties/components/cabi-cutie/cabi-cutie.html",
    controller: "CabiCutieController"
}), function(angular) {
    function CabiCutieController(CabiCuties, CabiCutieModal, $state, $timeout) {
        var $ctrl = this;
        $ctrl.$onChanges = function(changes) {
            if (changes.cutie.currentValue) $ctrl.object = null, $timeout(function() {
                $ctrl.object = angular.copy(changes.cutie.currentValue);
            }, 250);
        }, $ctrl.goTo = function(url) {
            window.location.href = url;
        }, $ctrl.getShareUrl = function() {
            return window.location.origin + "/cabi-cuties/#/view/" + $ctrl.object.id;
        };
    }
    CabiCutieController.$inject = [ "CabiCuties", "CabiCutieModal", "$state", "$timeout" ], 
    angular.module("cabi.cabi-cuties").controller("CabiCutieController", CabiCutieController);
}(window.angular), function(angular) {
    angular.module("cabi.cabi-cuties").directive("slickMousewheelSupport", function() {
        return {
            restrict: "A",
            link: function($scope, elm) {
                angular.element(elm).on("wheel", function(event) {
                    if (event.originalEvent.deltaY < 0) angular.element(elm).slick("slickPrev"); else if (event.originalEvent.deltaY > 0) angular.element(elm).slick("slickNext");
                });
            }
        };
    });
}(window.angular), function(angular) {
    var component = {
        template: '<cabi-cuties-archive on-cutie-change="$ctrl.onCutieChange($event);" initial-cutie="$ctrl.initialCutie"></cabi-cuties-archive>',
        controller: [ "$state", "CabiCuties", function($state, CabiCuties) {
            var $ctrl = this;
            $ctrl.$onInit = function() {
                if (window.location.hash.length) {
                    var cutie_id = window.location.hash.replace(/^\D+/g, "");
                    CabiCuties.one(cutie_id).then(function(response) {
                        $ctrl.initialCutie = response.data;
                    });
                }
            }, $ctrl.onCutieChange = function($event) {
                $state.go("cabi_cuties.detail", {
                    id: $event.cutie.id
                });
            };
        } ]
    };
    window.angular.module("cabi.cabi-cuties").component("cabiCutiesArchivePage", component);
}(), window.angular.module("cabi.cabi-cuties").component("cabiCutiesArchive", {
    bindings: {
        params: "<",
        initialCutie: "<",
        onCutieChange: "&"
    },
    templateUrl: "/wp-content/themes/cabi/assets/js/angular/cabi-cuties/components/cabi-cuties-archive/cabi-cuties-archive.html",
    controller: [ "CabiCuties", "CabiCutieModal", "$state", "$timeout", function(CabiCuties, CabiCutieModal, $state, $timeout) {
        var $ctrl = this;
        $ctrl.collection = [], $ctrl.$onInit = function() {
            CabiCuties.find($ctrl.params).then(function(response) {
                $ctrl.collection = $ctrl.collection.concat(response.data);
            });
        }, $ctrl.$onChanges = function(changes) {
            if (changes.initialCutie.currentValue) $ctrl.openIntent(changes.initialCutie.currentValue);
        }, $ctrl.openIntent = function(item) {
            $ctrl.onCutieChange({
                $event: {
                    cutie: item
                }
            }), $timeout(function() {
                CabiCutieModal.show({
                    inputs: {
                        cutie: item,
                        collection: $ctrl.collection,
                        onOpen: $ctrl.openIntent
                    }
                });
            });
        };
    } ]
}), function(angular) {
    function CabiCuties($http) {
        this.find = function(params) {
            return $http({
                url: "/wp-json/wp/v2/cabi-cuties",
                cache: !0,
                params: params
            });
        }, this.one = function(id) {
            return $http({
                url: "/wp-json/wp/v2/cabi-cuties/" + id,
                cache: !0
            });
        };
    }
    CabiCuties.$inject = [ "$http" ], angular.module("cabi.cabi-cuties").service("CabiCuties", CabiCuties);
}(window.angular), angular.module("cabi.cart").controller("CartController", [ "$scope", "cartService", "$state", "authService", "AttachedEcommModalService", function($scope, cartService, $state, authService, AttachedEcommModalService) {
    $scope.cart = cartService, $scope.goToCheckoutIntent = function() {
        authService.isAuthenticated().then(function(response) {
            window.location.href = "/account/#!/checkout";
        }, function(response) {
            AttachedEcommModalService.open({
                component: "account.login-gateway",
                moduleData: {
                    modalSource: "CheckOut",
                    showGuestCheckout: !0,
                    callback: function(rsUrl) {
                        window.location.href = rsUrl + "/account/#!/checkout";
                    }
                }
            });
        });
    };
} ]), angular.module("cabi.cart").directive("cart", [ "cartService", "removeItemModalFactory", "quicklookModal", "clearCartModal", "currentProduct", "Notification", "$window", "authService", "AttachedEcommModalService", "$window", function(cartService, removeItemModalFactory, quicklookModal, clearCartModal, currentProduct, Notification, $window, authService, AttachedEcommModalService) {
    return {
        scope: {},
        templateUrl: "../assets/js/angular/cart/directives/cart.html",
        link: function($scope, iElm, iAttrs, controller) {
            function updateCartClass() {
                iElm.removeClass("small medium large");
                var klass = "small";
                if (iElm[0].clientWidth >= 619 && iElm[0].clientWidth < 720) klass = "medium";
                if (iElm[0].clientWidth >= 720) klass = "large";
                iElm.addClass(klass);
            }
            $scope.cart = cartService, $scope.options = angular.extend({
                showOptions: !1,
                hideClearBag: !0,
                hideCheckOut: !1,
                showViewCart: !1,
                itemsToShow: null
            }, iAttrs), $scope.goToCheckoutIntent = function() {
                authService.isAuthenticated().then(function(response) {
                    window.location.href = "/account/#!/checkout";
                }, function(response) {
                    if (window.location.href.endsWith("/account/#!/checkout")) window.location.reload(!0); else AttachedEcommModalService.open({
                        component: "account.login-gateway",
                        moduleData: {
                            modalSource: "CheckOut",
                            showGuestCheckout: !0,
                            callback: function(rsUrl) {
                                window.location.href = rsUrl + "/account/#!/checkout";
                            }
                        }
                    });
                });
            }, $scope.requestClearCart = function() {
                clearCartModal.activate();
            }, $scope.clearCartItem = function(productId) {
                cartService.setCartItem(productId, 0).then();
            }, $scope.requestLineItemRemoval = function(item) {
                removeItemModalFactory.activate({
                    item: item
                });
            }, $scope.requestMoveToFavorites = function(item) {
                cartService.moveToFavorites(item.productId).then(function() {
                    Notification.success(item.productName + " moved to favorites");
                });
            }, $scope.showLineItemModal = function(item, $index) {
                if ("GC-CABI" == item.parentId) $window.location.href = "/gift-cards?cartIndex=" + $index; else currentProduct.create(item.parentId), 
                currentProduct.data[item.parentId].color = item.color, quicklookModal.activate({
                    productId: item.parentId,
                    preselectedProduct: null,
                    cartItem: item
                });
            }, angular.element(window).on("resize", updateCartClass), updateCartClass();
        }
    };
} ]), angular.module("cabi.cart").factory("clearCartModal", [ "btfModal", function(btfModal) {
    return btfModal({
        controller: "clearCartModalController",
        controllerAs: "modal",
        templateUrl: "../assets/js/angular/cart/modals/clearCart/clearCart.html"
    });
} ]), angular.module("cabi.cart").controller("clearCartModalController", [ "clearCartModal", "cartService", function(clearCartModal, cartService, $scope) {
    var self = this;
    this.closeModal = clearCartModal.deactivate, this.clearingBag = !1, this.clearCart = function() {
        this.clearingBag = !0, cartService.clearCart().then(function() {
            self.clearingBag = !1, self.closeModal();
        });
    };
} ]), angular.module("cabi.cart").controller("removeItemModalController", [ "removeItemModalFactory", "cartService", "$scope", "item", function(removeItemModalFactory, cartService, $scope, item) {
    this.item = item, this.closeModal = removeItemModalFactory.deactivate, this.removingItem = !1, 
    this.removeItem = function(item) {
        this.removingItem = !0, cartService.removeItem(item.productId).then(function() {
            removeItemModalFactory.deactivate();
        });
    };
} ]), angular.module("cabi.cart").factory("removeItemModalFactory", [ "btfModal", function(btfModal) {
    return btfModal({
        controller: "removeItemModalController",
        controllerAs: "modal",
        templateUrl: "../assets/js/angular/cart/modals/removeItem/removeItem.html"
    });
} ]), angular.module("cabi.cart").factory("cartService", [ "clioApiAdapter", "favoritesService", function(clioApiAdapter, favoritesService) {
    var exports = {};
    function _syncData(data) {
        exports.data = data.cartData, exports.fullData = data;
    }
    return exports.data = null, exports.fullData = null, exports.clearCart = function() {
        return clioApiAdapter.get("ClearCart").then(function(response) {
            return _syncData(response), response;
        });
    }, exports.getCart = function() {
        return clioApiAdapter.get("GetCart").then(function(response) {
            return _syncData(response), response;
        });
    }, exports.getUrl = function() {
        return "/cart";
    }, exports.getItemCount = function() {
        if (angular.isUndefined(exports.data) || !angular.isObject(exports.data)) return 0; else return exports.data.qtyTotal;
    }, exports.isEmpty = function() {
        if (angular.isUndefined(exports.data) || !angular.isObject(exports.data)) return !0; else return 0 == exports.data.qtyTotal;
    }, exports.setCartItem = function(productId, quantity, overrideQuantity) {
        return clioApiAdapter.get("SetCartItem", {
            productId: productId,
            quantity: quantity
        }).then(function(response) {
            return _syncData(response), favoritesService.removeItem(productId), window.fbq("track", "AddToCart", {
                content_ids: [ productId.substr(0, 6) ],
                content_type: "product"
            }), response;
        });
    }, exports.removeItem = function(productId) {
        return clioApiAdapter.get("SetCartItem", {
            productId: productId,
            quantity: 0
        }).then(function(response) {
            return _syncData(response), response;
        });
    }, exports.moveToFavorites = function(productId) {
        return favoritesService.addToFavorites(productId).then(function(res) {
            return exports.removeItem(productId).then(function() {
                if (res && res.redirect) res.redirect();
            });
        });
    }, exports.forceCartUpdate = function(data) {
        _syncData(data);
    }, exports;
} ]), angular.module("cabi.cart").factory("productInventory", function() {
    return function(productData) {
        var self = this;
        this.productData = productData, self.decorateOptions = function(attribute, options, selectedAttributes, nextAttribute) {
            if (angular.forEach(options, function(option, i) {
                options[i].description_for_select = options[i].description;
            }), angular.isDefined(nextAttribute)) angular.forEach(options, function(option, i) {
                if ("color" == attribute) {
                    var dummySelectedAttributes = {};
                    dummySelectedAttributes[attribute] = option, selectedAttributes = dummySelectedAttributes;
                }
                for (var variantBranch = self.getVariantBranch(selectedAttributes, attribute), out_of_stock = !0, j = 0; j < Object.keys(variantBranch).length; j++) {
                    var inventory = self.getInventoryForProduct(variantBranch[Object.keys(variantBranch)[j]]);
                    if (angular.isUndefined(inventory) || "OOS" !== inventory.status) out_of_stock = !1;
                }
                if (out_of_stock) option.disabled = !0, option.description_for_select = option.description + " - Out of Stock";
                options[i] = option;
            }); else {
                var variantBranch = self.getVariantBranch(selectedAttributes, attribute);
                angular.forEach(options, function(option, i) {
                    angular.forEach(variantBranch[option.description], function(productId, ii) {
                        if (option.disabled = !1, "OUT" == self.getInventoryForProduct(productId).status) option.disabled = !0, 
                        option.description_for_select = option.description + " - Out of Stock";
                        if ("BO" == self.getInventoryForProduct(productId).status) option.description_for_select = option.description + " *";
                    }), options[i] = option;
                });
            }
            return options;
        }, self.getVariantBranch = function(selectedAttributes, attribute) {
            for (var variantBranch = this.productData.variantTree, i = 0; i < Object.keys(selectedAttributes).length; i++) {
                try {
                    var varient_attribute = self.productData.attributes[i];
                    variantBranch = variantBranch[selectedAttributes[varient_attribute].description];
                } catch (e) {
                    variantBranch = variantBranch[Object.keys(variantBranch)[0]];
                }
                if (attribute && varient_attribute === attribute) break;
            }
            return variantBranch;
        }, self.getInventoryForProduct = function(productId) {
            return self.productData.variantInventory[productId];
        }, self.getFinalProductId = function(selectedAttributes) {
            if (Object.keys(selectedAttributes).length === self.productData.attributes.length) return self.getVariantBranch(selectedAttributes)[0]; else return null;
        }, self.finalProductIsBackOrdered = function(productId) {
            if (!productId) return !1;
            var inventory = self.getInventoryForProduct(productId);
            if ("BO" == inventory.status) return inventory; else return !1;
        };
    };
}), angular.module("cabi.catalog").service("catalogColorChoices", [ function() {
    return {
        Acorn: "#b8a090",
        "Aurora Floral": "#000000",
        Bougainvillea: "#d0d",
        Black: "#000",
        "Black Spacedye": "#000",
        "Black Floral": "#222",
        "Blue Sky": "#a6c9ce",
        Blush: "#ffb6c1",
        "Brick Dust": "#d88578",
        Buff: "#D2B48C",
        Camel: "#a48767",
        Caramel: "#a48767",
        Cement: "#EAE7E4",
        Chalk: "#e8e8e8",
        Charcoal: "#505050",
        "Classic Navy": "#224",
        Cloud: "#ccc",
        "Cornflower Floral": "#bababa",
        Daffodil: "#f7e78f",
        "Dandelion Print": "#222134",
        Dusk: "#35353d",
        "Eternity Damask": "#365459",
        Fawn: "#d0a291",
        Fiery: "#f00",
        Fireworks: "#f66b5e",
        Fuchsia: "#FF0080",
        "Heather Black": "#454449",
        "Heather Gray": "#b1bdcd",
        "Heather Nantucket": "#e85050",
        "Heather Oatmeal": "#e6e0e0",
        "Heather Red": "#944B59",
        "Heather Rose": "#944B59",
        "Heather Rhubarb": "#8a142e",
        "Heather Taupe": "#a89482",
        "Heather Teal": "#3e5754",
        "Heather Tidal": "#b7e8e5",
        "Heather Tiger Lily": "#f43",
        "Heather Turquoise": "#548F93",
        "Heather White": "#e9e9e9",
        Hibiscus: "#f4252f",
        Hunter: "#040",
        "Jelly Bean": "#3a3",
        "Light Heather Grey": "#BEBBBB",
        "Light Heather Gray": "#bdbcb9",
        "Meadow Print": "#2c75b0",
        "Morocco Print": "#afd2d2",
        "Night Light": "#f8fb8a",
        Nude: "#EFCCB6",
        "New Checkerboard": "#3a3d46",
        "Picnic Day": "#302b4c",
        "Pink Dot": "#e35d63",
        "Plaid Cheer": "#6d1926",
        Prism: "#05c4af",
        Raspberry: "#E30B5D",
        Rhubarb: "#ad071d",
        "Scroll Print": "#4784b6",
        "Shades of Blue": "#556082",
        "Summer Flowers": "#dcdc59",
        Teal: "#203e40",
        Tigerlily: "#f43",
        "Trail Stripe": "#383a3f",
        "True White": "#fdfdfd",
        "True Red": "#ff0000",
        Turmeric: "#D64A2F",
        "Washed Black": "#d2d2d2",
        White: "#fff",
        "As Shown": "#e0e0e0"
    };
} ]), angular.module("cabi.catalog").service("catalogService", [ "$http", function($http) {
    var exports = {}, sendRequest = function(endpoint, params) {
        return $http({
            url: "/wp-admin/admin-ajax.php?action=" + endpoint,
            method: "GET",
            params: params
        });
    };
    return exports.getCatalog = function(params) {
        if (!params) params = {};
        return sendRequest("cabi_ajax_clothing_items", params);
    }, exports.getOutfits = function(params) {
        if (!params) params = {};
        return sendRequest("cabi_ajax_outfits", params);
    }, exports;
} ]), function(angular, $) {
    angular.module("cabi.catalog").controller("ItemCatalogCtrl", [ "$scope", "catalogService", "CatalogSorter", "favoritesService", "$timeout", function($scope, catalogService, CatalogSorter, favoritesService, $timeout) {
        var _collection_item_cache, params = {}, is_taxonomy_page = !!angular.element(document)[0].querySelector("body[data-page-id^=collection-clothes-category]"), promo_injector = new window.CollectionPromotionInjector($("#bbi-promotions .promotion-collection"), $("#collection-archive-item-grid"));
        if ($scope.sortOptions = [ {
            property: "title",
            reverse: !1,
            label: "Name: A-Z"
        }, {
            property: "title",
            reverse: !0,
            label: "Name: Z-A"
        }, {
            property: "price",
            reverse: !1,
            label: "Price: Low to High"
        }, {
            property: "price",
            reverse: !0,
            label: "Price: High to Low"
        }, {
            property: "category",
            reverse: !1,
            label: "Category"
        } ], is_taxonomy_page) params.category = window.location.pathname.split("/")[window.location.pathname.split("/").length - 2];
        catalogService.getCatalog(params).then(function(response) {
            $scope.collection_items = prepareCollectionItems(response.data), _collection_item_cache = angular.copy($scope.collection_items), 
            favoritesService.getFavorites(), $timeout(function() {
                promo_injector.inject();
            }, 125);
        });
        var prepareCollectionItems = function(items) {
            var prepared_items = [];
            return angular.forEach(items, function(category_items) {
                angular.forEach(category_items, function(item) {
                    prepared_items.push(item);
                });
            }), prepared_items;
        };
        $scope.sortBy = function(option) {
            $scope.collection_items = CatalogSorter.sort(angular.copy(_collection_item_cache), option.property, option.reverse);
        };
    } ]);
}(window.angular, window.jQuery), angular.module("cabi.catalog").controller("OutfitCatalogCtrl", [ "$scope", "catalogService", function($scope, catalogService) {
    var params = {};
    if ($('body[data-page-id^="styles-"]').length) params.category = window.location.pathname.split("/")[window.location.pathname.split("/").length - 2];
    catalogService.getOutfits(params).then(function(response) {
        $scope.collection_items = response.data.data;
        var promo_injector = new CollectionPromotionInjector($("#bbi-promotions .promotion-collection"), $("#collection-archive-item-grid"));
        setTimeout(function() {
            promo_injector.inject();
        }, 125);
    });
} ]), angular.module("cabi.catalog").directive("addToCart", [ "$rootScope", "productService", "cartService", "productInventory", "$q", "quicklookModal", "Notification", "stylistInfoService", "clioEnabled", "currentProduct", function($rootScope, productService, cartService, productInventory, $q, quicklookModal, Notification, stylistInfoService, clioEnabled, currentProduct) {
    return {
        scope: {
            productId: "@",
            cartItem: "=",
            onChange: "&?",
            inQuickLookModal: "="
        },
        restrict: "E",
        templateUrl: TEMPLATE_DIR + "/assets/js/angular/catalog/directives/addtoCart/add-to-cart.html",
        controller: function($scope) {
            var ProductInventory;
            $scope.productData = null, $scope.attributeOptions = {}, $scope.selectedAttributes = {}, 
            $scope.finalProduct = {
                productId: null,
                quantity: 1
            }, $scope.originalFinalProductId = null, $scope.updatingCart = !1, $scope.stylistInfo = stylistInfoService, 
            $scope.CLIO_ENABLED = clioEnabled, $scope.currentProduct = currentProduct, $scope.postId = null, 
            $scope.loadingWishlist = !1, $scope.addedToWishlist = !1;
            var updateOptions = function() {
                $scope.attributeOptions = {}, set_attribute_with_single_option_as_selected(), angular.forEach($scope.productData.attributes, function(attribute, i) {
                    var attributes = $scope.productData[attribute];
                    attributes = ProductInventory.decorateOptions(attribute, attributes, $scope.selectedAttributes, $scope.productData.attributes[i + 1]), 
                    $scope.attributeOptions[attribute] = attributes;
                });
            }, set_attribute_with_single_option_as_selected = function() {
                angular.forEach($scope.productData.attributes, function(attribute, i) {
                    if (1 === $scope.productData[attribute].length) $scope.selectedAttributes[attribute] = $scope.productData[attribute][0];
                });
            };
            $scope.setFinalProductId = function() {
                var finalProductId = ProductInventory.getFinalProductId($scope.selectedAttributes);
                if (null !== finalProductId) if ("OUT" == ProductInventory.getInventoryForProduct(finalProductId).status) $scope.attributeOptions[$scope.productData.attributes[$scope.productData.attributes.length - 1]][0].description_for_select += " - Out of Stock", 
                $scope.finalProduct.productId = null; else $scope.finalProduct.productId = finalProductId; else $scope.finalProduct.productId = null;
                if ($scope.onChange) $scope.onChange({
                    finalProductId: $scope.finalProduct.productId
                });
            };
            var setFinalProductId = $scope.setFinalProductId;
            $scope.onQuantityChange = function() {
                if (void 0 === $scope.finalProduct.quantity) $scope.finalProduct.quantity = 1;
                setFinalProductId();
            }, $scope.addToCart = function() {
                $scope.updatingCart = !0, cartService.setCartItem($scope.finalProduct.productId, $scope.finalProduct.quantity).then(function() {
                    Notification.success($scope.productData.name + " added to your bag"), $scope.selectedAttributes = {}, 
                    updateOptions(), setFinalProductId(), $rootScope.$emit("PRODUCT_ADDED");
                }, function() {
                    Notification.error("Could not add " + $scope.productData.name + " to your bag");
                }).finally(function() {
                    $scope.updatingCart = !1, quicklookModal.deactivate();
                });
            }, $scope.updateCartItem = function() {
                $scope.updatingCart = !0;
                var queue_items = [];
                if ($scope.finalProduct.productId !== $scope.originalFinalProductId) queue_items.push(cartService.removeItem($scope.originalFinalProductId));
                queue_items.push(cartService.setCartItem($scope.finalProduct.productId, $scope.finalProduct.quantity)), 
                $q.all(queue_items).then(function(responses) {}).finally(function() {
                    $scope.updatingCart = !1, quicklookModal.deactivate();
                });
            }, $scope.onSelectChange = function(attribute) {
                if (pruneSelectedAttributes(), removeSubsequentSelectedAttributes(attribute), set_attribute_with_single_option_as_selected(), 
                Object.keys($scope.selectedAttributes).length !== $scope.productData.attributes.length) updateOptions();
                setFinalProductId();
            };
            var pruneSelectedAttributes = function() {
                removeNullSelectedAttributes(), makeSelectedAttributesNullBasedOnOrder();
            }, removeNullSelectedAttributes = function() {
                angular.forEach($scope.selectedAttributes, function(value, key) {
                    if (null === value) delete $scope.selectedAttributes[key];
                });
            }, makeSelectedAttributesNullBasedOnOrder = function() {
                var makeAttributeNull = !1;
                for (i in $scope.productData.attributes) {
                    var attribute = $scope.productData.attributes[i];
                    if (makeAttributeNull || void 0 !== $scope.selectedAttributes[attribute]) {
                        if (makeAttributeNull) delete $scope.selectedAttributes[attribute];
                    } else makeAttributeNull = !0;
                }
            }, removeSubsequentSelectedAttributes = function(currentAttribute) {
                var makeAttributeNull = !1;
                for (i in $scope.productData.attributes) {
                    var attribute = $scope.productData.attributes[i];
                    if (attribute != currentAttribute) {
                        if (makeAttributeNull) delete $scope.selectedAttributes[attribute];
                    } else makeAttributeNull = !0;
                }
            };
            if ($scope.shouldDisableSelect = function(attribute) {
                var idx = null, i = 0;
                if (angular.forEach($scope.selectedAttributes, function(currentAttr, attrKey) {
                    if (attrKey === attribute) idx = i;
                    i++;
                }), null !== idx) return !1; else if (attribute === $scope.productData.attributes[0]) return !1; else if ($scope.productData.attributes[Object.keys($scope.selectedAttributes).length] == attribute) return !1; else return !0;
            }, $scope.finalProductIsBackOrdered = function(productId) {
                if (void 0 === ProductInventory) return !1; else return ProductInventory.finalProductIsBackOrdered(productId);
            }, clioEnabled) $scope.$watch("productId", function(nV, oV) {
                $scope.productData = null, $q.all([ productService.getProduct($scope.productId), productService.getProductInventory($scope.productId) ]).then(function(responses) {
                    var firstInventoryKey = Object.keys(responses[1].variantInventory)[0];
                    if (0 === firstInventoryKey.indexOf($scope.productId)) if ($scope.productData = responses[0], 
                    $scope.productData.variantInventory = responses[1].variantInventory, ProductInventory = new productInventory($scope.productData), 
                    $scope.selectedAttributes = {}, updateOptions(), $scope.currentProduct.create($scope.productData.productId), 
                    $scope.$watchGroup([ "finalProduct.productId", "updatingCart" ], function(nV, oV) {
                        $scope.currentProduct.data[$scope.productData.productId].canAddToCart = !!nV[0] && !nV[1];
                    }), $scope.cartItem) angular.forEach($scope.productData.attributes, function(attribute, i) {
                        var options = $scope.attributeOptions[attribute];
                        angular.forEach(options, function(option, i) {
                            if (option.description == $scope.cartItem[attribute].description) $scope.selectedAttributes[attribute] = option;
                        });
                    }), $scope.finalProduct.quantity = $scope.cartItem.quantity, $scope.setFinalProductId(), 
                    $scope.originalFinalProductId = $scope.finalProduct.productId; else $scope.setFinalProductId();
                }, function(responses) {
                    $scope.productData = !1;
                }), $scope.isFashionFlash = function(productData) {
                    var categories = productData.categories.map(function(category, idx) {
                        return category.slug;
                    });
                    return -1 !== categories.indexOf("fashionflash");
                };
            });
        },
        link: function($scope, iElm, iAttrs) {
            $scope.postId = iAttrs.postId, $scope.$watch("selectedAttributes.color", function(nV, oV) {
                currentProduct.create($scope.productId), currentProduct.data[$scope.productId].color = nV;
            }), $scope.$watch("currentProduct.data[" + $scope.productId + "].color", function(nV, oV) {
                if (!angular.isUndefined(nV) && null !== nV) if (angular.isUndefined(oV) || nV.description != oV.description) angular.forEach($scope.attributeOptions.color, function(color) {
                    if (nV.description == color.description && !("disabled" in nV)) $scope.selectedAttributes.color = color;
                });
            }), $scope.config = angular.extend({
                showSizeChart: !1
            }, iAttrs);
        }
    };
} ]), angular.module("cabi.catalog").directive("collectionItem", [ "catalogColorChoices", "$http", "currentProduct", "favoritesService", "$rootScope", "$timeout", "authService", "AttachedEcommModalService", function(catalogColorChoices, $http, currentProduct, favoritesService, $rootScope, $timeout, authService, AttachedEcommModalService) {
    var settings, getHexCode = function(color) {
        return catalogColorChoices[color];
    };
    return {
        scope: {
            collectionItem: "=?item",
            onRemove: "=?onRemove"
        },
        templateUrl: TEMPLATE_DIR + "/assets/js/angular/catalog/directives/collectionItem.html",
        controller: function($scope) {
            (settings = {
                isHovering: !1,
                activeColor: null,
                disableQuickLook: !1
            }).activeColor = $scope.collectionItem ? Object.keys($scope.collectionItem.relatedImages)[0] : null, 
            $scope.toggleFavorite = function() {
                $scope.addedToFavorites ? removeFromFavorites() : addToFavorites();
            };
            var removeFromFavorites = function() {
                determineFavoriteItem(), favoritesService.removeItem($scope.favoriteItemId).then(function() {
                    $scope.addedToFavorites = !1, $scope.favoriteItemId = null;
                });
            }, addToFavorites = function() {
                favoritesService.addToFavorites($scope.collectionItem.productId).then(function(res) {
                    if ($scope.addedToFavorites = !0, $scope.favoriteItemId = $scope.collectionItem.productId, 
                    res && res.redirect) res.redirect();
                });
            };
            function determineFavoriteItem() {
                if (!angular.isUndefined(favoritesService.data.products)) for (var i = 0; i < favoritesService.data.favorites.products.length; i++) if ($scope.collectionItem && -1 !== favoritesService.data.favorites.products[i].indexOf($scope.collectionItem.productId)) $scope.favoriteItemId = favoritesService.data.favorites.products[i], 
                $timeout(function() {
                    $scope.addedToFavorites = !0;
                });
            }
            $scope.$watch(function() {
                return favoritesService.data;
            }, function(nV, oV) {
                determineFavoriteItem();
            }), $scope.getHoverImage = function(images) {
                if ($scope.collectionItem.outfits) if (angular.isDefined($scope.collectionItem.outfits) && $scope.collectionItem.outfits.length) return $scope.collectionItem.outfits[0].image + "?cw=48"; else if (angular.isDefined(images.PRODUCT_BACK_IMAGE)) return images.PRODUCT_BACK_IMAGE + "?w=330"; else if (angular.isDefined(images.ADDITIONAL_IMAGE_1)) return images.ADDITIONAL_IMAGE_1 + "?w=330";
            };
        },
        link: function($scope, iElm, iAttrs, controller) {
            if ($scope.settings = settings, $scope.settings.disableQuickLook = iAttrs.disableQuickLook ? iAttrs.disableQuickLook : settings.disableQuickLook, 
            $scope.getHexCode = getHexCode, $scope.getClassNames = function() {
                var classNames = [ "collection-item", $scope.collectionItem.category, "collection-item-" + $scope.collectionItem.postType ];
                if ($scope.collectionItem.outOfStock) classNames.push("out-of-stock");
                if ($scope.collectionItem.exclusiveAccess) classNames.push("exclusive-access");
                return classNames;
            }, $scope.setActiveColor = function(color) {
                $scope.settings.activeColor = color, currentProduct.create($scope.collectionItem.productId), 
                currentProduct.data[$scope.collectionItem.productId].color = {
                    description: color
                };
            }, iAttrs.postId) $http.get(window.AJAX_URL + "?action=cabi_ajax_clothing_item&postId=" + iAttrs.postId).then(function(response) {
                $scope.collectionItem = response.data.data, $scope.setActiveColor(Object.keys($scope.collectionItem.relatedImages)[0]), 
                $scope.$emit("collectionItem:ready", response.data.data);
            });
            $scope.setHoverBorder = function() {
                var item_photos = iElm[0].querySelector(".item_photos"), inner = item_photos.querySelector(".inner"), img_mask = item_photos.querySelector(".collection-item__hover-image-mask"), height = item_photos.offsetHeight, width = item_photos.offsetWidth;
                inner.style.height = height + "px", inner.style.width = width + "px", img_mask.style.height = height + "px", 
                img_mask.style.width = width + "px";
            }, iElm.on("mouseenter", function() {
                $scope.setHoverBorder();
            });
        }
    };
} ]), angular.module("cabi.catalog").directive("collectionItemsSlider", [ "$rootScope", function($rootScope) {
    return {
        scope: {
            collectionItems: "=?items"
        },
        templateUrl: TEMPLATE_DIR + "/assets/js/angular/catalog/directives/collectionItemsSlider.html",
        link: function($scope, iElm, iAttrs, controller) {
            if ($scope.collectionItemsIds = [], $scope.collectionItemsData = [], $scope.isLoading = !0, 
            angular.isString($scope.collectionItems)) $scope.collectionItemsIds = $scope.collectionItems.split(",");
            let dispatcher = $scope.$on("collectionItem:ready", function(data) {
                if ($scope.collectionItemsData.push(data), $scope.collectionItemsData.length === $scope.collectionItemsIds.length && $scope.isLoading) $scope.isLoading = !1, 
                setTimeout(function() {
                    angular.element(".collection-items-slider-container").slick({
                        dots: !0
                    });
                });
            });
            $scope.$on("$destroy", function() {
                dispatcher();
            });
        }
    };
} ]), function(angular) {
    window.angular.module("cabi.catalog").service("CatalogSorter", function() {
        this.sort = function(collection, property, reverse) {
            if ("category" !== property) collection.sort(_sorters[property]);
            if (reverse) collection.reverse();
            return collection;
        };
        var _sorters = {
            title: function(a, b) {
                var titleA = a.title.toUpperCase(), titleB = b.title.toUpperCase(), comparison = 0;
                if (titleA > titleB) comparison = 1; else if (titleA < titleB) comparison = -1;
                return comparison;
            },
            price: function(a, b) {
                var priceA = parseInt(a.price.replace("$", "").replace(".", "")), priceB = parseInt(b.price.replace("$", "").replace(".", "")), comparison = 0;
                if (priceA > priceB) comparison = 1; else if (priceA < priceB) comparison = -1;
                return comparison;
            }
        };
    });
}(), function(angular) {
    var component = {
        bindings: {
            message: "<",
            thumbnail: "<",
            backgroundImage: "<",
            scrollAmount: "<",
            cookie: "<"
        },
        templateUrl: "/wp-content/themes/cabi/assets/js/angular/contextual-email-promotes/components/contextual-email-promote/contextual-email-promote.html",
        controller: [ "ContextualEmailPromoteModal", "$cookies", function(ContextualEmailPromoteModal, $cookies) {
            var $ctrl = this;
            function showModal() {
                ContextualEmailPromoteModal.show({
                    inputs: {
                        message: $ctrl.message,
                        thumbnail: $ctrl.thumbnail,
                        backgroundImage: $ctrl.backgroundImage
                    }
                });
            }
            this.showModalIntent = function() {
                var cookie_key = "cabi.contextual-email-promote", cookie_value = angular.isDefined($cookies.get(cookie_key)) ? $cookies.get(cookie_key) : "";
                if (angular.isDefined($ctrl.cookie)) {
                    if (-1 === cookie_value.indexOf($ctrl.cookie)) {
                        var cookie_parts = 0 === cookie_value.length ? [] : cookie_value.split(",");
                        cookie_parts.push($ctrl.cookie), $cookies.put(cookie_key, cookie_parts.join(","), {
                            path: "/"
                        }), showModal();
                    }
                } else showModal();
            };
        } ]
    };
    angular.module("cabi.contextual-email-promotes").component("contextualEmailPromote", component);
}(window.angular), function(angular) {
    function ContextualEmailPromoteModalController(close, message, thumbnail, backgroundImage) {
        var $ctrl = this;
        $ctrl.close = close, $ctrl.message = message, $ctrl.thumbnail = thumbnail, $ctrl.backgroundImage = backgroundImage, 
        $ctrl.ui = {
            mailinglist_submitted: !1
        }, $ctrl.onMailingListSuccess = function() {
            $ctrl.ui.mailinglist_submitted = !0;
        };
    }
    ContextualEmailPromoteModalController.$inject = [ "close", "message", "thumbnail", "backgroundImage" ], 
    angular.module("cabi.contextual-email-promotes").controller("ContextualEmailPromoteModalController", ContextualEmailPromoteModalController);
}(window.angular), function(angular) {
    angular.module("cabi.contextual-email-promotes").service("ContextualEmailPromoteModal", function(ModalService) {
        this.show = function(config) {
            var settings = angular.extend({}, {
                templateUrl: "/wp-content/themes/cabi/assets/js/angular/contextual-email-promotes/components/modal/modal.html",
                controller: "ContextualEmailPromoteModalController as $ctrl",
                controllerAs: "$ctrl"
            }, config);
            return ModalService.showModal(settings);
        }, ModalService.$inject = [ "ModalService" ];
    });
}(window.angular), function(angular) {
    var component = {
        bindings: {
            title: "<",
            message: "<",
            thumbnail: "<",
            backgroundImage: "<",
            scrollAmount: "<",
            cookie: "<"
        },
        templateUrl: "/wp-content/themes/cabi/assets/js/angular/create-cultivate/components/create-cultivate/create-cultivate.html",
        controller: [ "CreateCultivateModal", "$cookies", function(CreateCultivateModal, $cookies) {
            var $ctrl = this;
            this.showModalIntent = function() {
                if (window.location.search.indexOf("utm_source=createcultivate") > -1) CreateCultivateModal.show({
                    inputs: {
                        title: $ctrl.title,
                        message: $ctrl.message,
                        thumbnail: $ctrl.thumbnail,
                        backgroundImage: $ctrl.backgroundImage
                    }
                });
            };
        } ]
    };
    window.angular.module("cabi.create-cultivate").component("createCultivate", component);
}(), function(angular) {
    function CreateCultivateModalController(close, message, thumbnail, backgroundImage) {
        var $ctrl = this;
        $ctrl.close = close, $ctrl.message = message, $ctrl.thumbnail = thumbnail, $ctrl.backgroundImage = backgroundImage, 
        $ctrl.ui = {
            mailinglist_submitted: !1
        }, $ctrl.onMailingListSuccess = function() {
            $ctrl.ui.mailinglist_submitted = !0;
        };
    }
    CreateCultivateModalController.$inject = [ "close", "message", "thumbnail", "backgroundImage" ], 
    angular.module("cabi.create-cultivate").controller("CreateCultivateModalController", CreateCultivateModalController);
}(window.angular), function(angular) {
    angular.module("cabi.create-cultivate").service("CreateCultivateModal", function(ModalService) {
        this.show = function(config) {
            var settings = angular.extend({}, {
                templateUrl: "/wp-content/themes/cabi/assets/js/angular/create-cultivate/components/modal/modal.html",
                controller: "CreateCultivateModalController",
                controllerAs: "$ctrl"
            }, config);
            return ModalService.showModal(settings);
        }, ModalService.$inject = [ "ModalService" ];
    });
}(window.angular), angular.module("cabi").directive("cartCount", [ "cartService", "breakPointFactory", function(cartService, breakPointFactory) {
    return {
        scope: {},
        templateUrl: "../assets/js/angular/directives/cartCount/cartCount.html",
        link: function($scope, iElm) {
            if ($scope.cart = cartService, $scope.dropdown = {
                open: !1
            }, "mobile" !== breakPointFactory.getBreakpoint()) angular.element(iElm).on("mouseenter", function($event) {
                $scope.$apply(function() {
                    $scope.dropdown.open = !cartService.isEmpty();
                });
            }), angular.element(iElm).on("mouseleave", function($event) {
                $scope.$apply(function() {
                    $scope.dropdown.open = !1;
                });
            });
        }
    };
} ]), angular.module("cabi").directive("autofocus", [ "$timeout", function($timeout) {
    return {
        restrict: "A",
        link: function($scope, $element) {
            $timeout(function() {
                $element[0].focus();
            });
        }
    };
} ]).directive("giftCard", [ "giftCardService", "$q", "$filter", "cartService", "Notification", "$timeout", "giftCardImageModal", "localeService", function(giftCardService, $q, $filter, cartService, Notification, $timeout, giftCardImageModal, localeService) {
    return {
        scope: {},
        templateUrl: "../assets/js/angular/directives/giftCard/giftCard.html",
        link: function($scope, iElm) {},
        controller: function($scope) {
            function scrollToTop() {
                $("body").animate({
                    scrollTop: $("body").offset().top
                }, "slow");
            }
            function resetOtherValue() {
                if ("GC-OTHER" != $scope.parameters.add_product_id) $scope.parameters.add_amount = "";
            }
            function isAShowOrder(result) {
                cartService.getCart().then(function(response) {
                    if (angular.isDefined(response.cartData.workEffortId) && response.cartData.workEffortId) result(!0);
                    result(!1);
                });
            }
            function setFormToCreate() {
                $scope.parameters.eventType = "Add", $scope.buttonText = "CREATE";
            }
            function setFormToUpdate() {
                $scope.parameters.eventType = "Update", $scope.buttonText = "UPDATE";
            }
            function filterCurrencyNumber(number, fractionSize) {
                return number = number.toString(), $filter("currency")(number, "", fractionSize).replace(new RegExp(",", "g"), "");
            }
            $scope.parameters = {
                eventType: "Add",
                cartItemIndex: "",
                add_product_id: "GC-10",
                add_amount: "",
                surveyId: "CABI_GC",
                surveyResponseId: "",
                answers_GC_DEL_METHOD: "Email",
                answers_GC_TYPE: "GC_GENERIC",
                answers_GC_RECT_FNAME: "",
                answers_GC_RECT_LNAME: "",
                answers_GC_RECT_EMAIL: "",
                answers_GC_SEND_FNAME: "",
                answers_GC_SEND_LNAME: "",
                answers_GC_SEND_EMAIL: "",
                answers_GC_MSG: ""
            }, $scope.buttonText = "CREATE", $scope.currencySymbol = localeService.getCurrencySymbol(), 
            $scope.giftCards = [], $scope.addOrUpdateGC = function() {
                if ("GC-OTHER" != $scope.parameters.add_product_id) $scope.parameters.add_amount = 1;
                if (1 == $scope.giftCardForm.$valid) isAShowOrder(function(response) {
                    if (1 == response) scrollToTop(); else giftCardService.setCartGiftCard($scope.parameters).then(function(response) {
                        if (response.errors) {
                            var errorMessage = "";
                            angular.forEach(response.errors, function(value, key) {
                                var newValue = value.replace(/^answers_[a-zA-Z_]*\~/, "");
                                errorMessage += newValue + "</br>";
                            }), resetOtherValue(), Notification.error(errorMessage), scrollToTop();
                        } else if (cartService.getCart(), resetOtherValue(), "Add" === $scope.parameters.eventType) Notification.success("Gift Card added to your bag"), 
                        $scope.parameters.cartItemIndex = response.cartItemIndex, $scope.parameters.surveyResponseId = response.surveyResponseId, 
                        setFormToUpdate(); else Notification.success("Gift Card was updated");
                    }, function(error) {
                        Notification.error(error.message), scrollToTop(), resetOtherValue();
                    });
                });
            }, $scope.onSelectCardTypeClick = function(event, cardType) {
                $(event.currentTarget).closest(".card-type-container").find("div").removeClass("selected-card-type"), 
                $(event.currentTarget).addClass("selected-card-type"), $scope.parameters.answers_GC_TYPE = cardType;
            }, $scope.openImageOnModal = function(imgUrl) {
                giftCardImageModal.activate({
                    imgSrc: imgUrl
                });
            }, $scope.$watch("parameters.add_amount", function(newValue, oldValue) {
                if (newValue) if (!newValue.match(/^([0-9]{0,6})(\.[0-9]{0,2})?$/)) $scope.parameters.add_amount = oldValue;
            }), $scope.validateNumber = function() {
                var amount = parseFloat($scope.parameters.add_amount) || 1;
                if (amount < 1) amount = 1;
                if (!(amount = filterCurrencyNumber(amount)).match(/^([0-9]{0,6})(\.[0-9]{0,2})?$/)) amount = filterCurrencyNumber(1), 
                Notification.error("Other amount can't have more than 6 digits"), scrollToTop();
                $scope.parameters.add_amount = amount;
            }, function() {
                var cartIndex = function(param, dummyPath) {
                    for (var response, sURLVariables = (dummyPath || window.location.search.substring(1)).split(/[&||?]/), i = 0; i < sURLVariables.length; i += 1) {
                        var sParameterName = (sURLVariables[i] || "").split("=");
                        if (sParameterName[0] === param) response = sParameterName[1];
                    }
                    return response;
                }("cartIndex");
                if (cartIndex) !function(cartIndex) {
                    var params = {
                        cartIndex: cartIndex
                    };
                    giftCardService.getCartGiftCard(params).then(function(response) {
                        $scope.parameters = response, setFormToUpdate();
                    }, function(error) {
                        setFormToCreate(), Notification.error(error.message), scrollToTop();
                    });
                }(cartIndex); else setFormToCreate();
                giftCardService.getGiftCards().then(function(response) {
                    var giftCards, giftCardList;
                    $scope.giftCards = (giftCards = response, giftCardList = [], angular.forEach(giftCards.variantTree, function(value, key) {
                        giftCardList.push({
                            cardId: value[0],
                            price: key
                        });
                    }), giftCardList), $scope.gcTypes = response.gcTypes;
                }), isAShowOrder(function(response) {
                    if (1 == response) Notification.error("Gift Cards can not be purchased in a show order.");
                });
            }();
        }
    };
} ]), angular.module("cabi").factory("giftCardImageModal", [ "btfModal", function(btfModal) {
    return btfModal({
        controller: "giftCardImageModalController",
        controllerAs: "modal",
        templateUrl: "../assets/js/angular/directives/giftCard/giftCardImageModal/giftCardImage.html"
    });
} ]), angular.module("cabi").controller("giftCardImageModalController", [ "giftCardImageModal", "$scope", "imgSrc", function(giftCardImageModal, $scope, imgSrc) {
    this.closeModal = giftCardImageModal.deactivate, this.imgSrc = imgSrc;
} ]), angular.module("cabi").directive("loadingIcon", [ function() {
    return {
        template: '<?xml version="1.0" encoding="utf-8"?> \x3c!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --\x3e <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 243 243" style="enable-background:new 0 0 243 243;" xml:space="preserve"> <style type="text/css"> .st0{fill-rule:evenodd;clip-rule:evenodd;} .st1{opacity:0.95;fill-rule:evenodd;clip-rule:evenodd;} .st2{opacity:0.9;fill-rule:evenodd;clip-rule:evenodd;} .st3{opacity:0.85;fill-rule:evenodd;clip-rule:evenodd;} .st4{opacity:0.8;fill-rule:evenodd;clip-rule:evenodd;} .st5{opacity:0.75;fill-rule:evenodd;clip-rule:evenodd;} .st6{opacity:0.7;fill-rule:evenodd;clip-rule:evenodd;} .st7{opacity:0.65;fill-rule:evenodd;clip-rule:evenodd;} .st8{opacity:0.6;fill-rule:evenodd;clip-rule:evenodd;} .st9{opacity:0.55;fill-rule:evenodd;clip-rule:evenodd;} .st10{opacity:0.5;fill-rule:evenodd;clip-rule:evenodd;} .st11{opacity:0.45;fill-rule:evenodd;clip-rule:evenodd;} .st12{opacity:0.4;fill-rule:evenodd;clip-rule:evenodd;} .st13{opacity:0.35;fill-rule:evenodd;clip-rule:evenodd;} .st14{opacity:0.3;fill-rule:evenodd;clip-rule:evenodd;} .st15{opacity:0.25;fill-rule:evenodd;clip-rule:evenodd;} .st16{opacity:0.2;fill-rule:evenodd;clip-rule:evenodd;} .st17{opacity:0.15;fill-rule:evenodd;clip-rule:evenodd;} .st18{opacity:8.000000e-02;fill-rule:evenodd;clip-rule:evenodd;} .st19{opacity:3.000000e-02;fill-rule:evenodd;clip-rule:evenodd;} .st20{opacity:0;} </style> <title>cabi-tv-lockup</title> <path d="M130.2,0.4L128,30c-2.3-0.2-4.6-0.3-7-0.3c-2.4,0-4.7,0.1-7,0.3l-2.2-29.7c3-0.2,6.1-0.4,9.2-0.4 C124.1,0,127.2,0.1,130.2,0.4z"/> <path class="st0" d="M98.4,2.5l5.5,29c-2.2,0.4-4.5,0.9-6.7,1.5c-2.2,0.6-4.4,1.3-6.6,2.1L80.8,7.2c2.8-1,5.7-1.9,8.7-2.7 C92.5,3.7,95.4,3,98.4,2.5z"/> <path class="st0" d="M68.2,12.4L81,39c-2.1,1-4.1,2-6.1,3.2c-2,1.2-3.9,2.4-5.8,3.7L52.5,21.5c2.5-1.7,5.1-3.3,7.7-4.9 C62.8,15.2,65.5,13.7,68.2,12.4z"/> <path class="st0" d="M41.8,29.8L61,52.2c-1.7,1.5-3.4,3-5.1,4.7c-1.6,1.6-3.2,3.4-4.7,5.1L28.9,42.7c2-2.3,4-4.5,6.2-6.7 C37.3,33.9,39.5,31.8,41.8,29.8z"/> <path class="st1" d="M20.8,53.5l24.4,16.6c-1.3,1.9-2.5,3.8-3.7,5.8c-1.2,2-2.2,4.1-3.2,6.1L11.7,69.3c1.3-2.7,2.7-5.4,4.3-8.1 C17.5,58.6,19.1,56,20.8,53.5z"/> <path class="st2" d="M6.7,81.8l27.8,9.7c-0.8,2.2-1.5,4.3-2.1,6.6c-0.6,2.2-1.1,4.5-1.5,6.7L2,99.4c0.6-3,1.2-5.9,2-8.9 C4.8,87.6,5.7,84.7,6.7,81.8z"/> <path class="st3" d="M0.3,112.9l29.4,2.2c-0.2,2.3-0.3,4.6-0.3,6.9s0.1,4.6,0.3,6.9l-29.4,2.2c-0.2-3-0.3-6-0.3-9.1 S0.1,115.9,0.3,112.9z"/> <path class="st4" d="M1.9,143.8l29-5.5c0.4,2.2,0.9,4.5,1.5,6.7c0.6,2.2,1.3,4.4,2.1,6.6l-27.8,9.7c-1-2.8-1.9-5.7-2.7-8.7 C3.1,149.7,2.5,146.8,1.9,143.8z"/> <path class="st5" d="M11.6,173.9l26.6-12.8c1,2.1,2,4.1,3.2,6.1c1.2,2,2.4,3.9,3.7,5.8l-24.4,16.6c-1.7-2.5-3.3-5.1-4.9-7.7 C14.4,179.3,12.9,176.6,11.6,173.9z"/> <path class="st6" d="M28.9,200.4l22.3-19.2c1.5,1.7,3,3.4,4.7,5.1c1.6,1.6,3.4,3.2,5.1,4.7l-19.2,22.3c-2.3-2-4.5-4-6.7-6.2 C32.9,205,30.9,202.7,28.9,200.4z"/> <path class="st7" d="M52.5,221.6l16.6-24.4c1.9,1.3,3.8,2.5,5.8,3.7c2,1.2,4.1,2.2,6.1,3.2l-12.8,26.6c-2.7-1.3-5.4-2.7-8.1-4.3 C57.6,225,55,223.3,52.5,221.6z"/> <path class="st8" d="M80.8,236l9.7-27.8c2.2,0.8,4.3,1.5,6.6,2.1s4.5,1.1,6.7,1.5l-5.5,29c-3-0.6-5.9-1.2-8.9-2 C86.6,237.9,83.7,237,80.8,236z"/> <path class="st9" d="M111.9,242.7l2.2-29.4c2.3,0.2,4.6,0.3,6.9,0.3s4.6-0.1,6.9-0.3l2.2,29.4c-3,0.2-6,0.3-9.1,0.3 S114.9,242.9,111.9,242.7z"/> <path class="st10" d="M143.4,241.3l-5.5-29.2c2.3-0.4,4.6-0.9,6.8-1.5c2.3-0.6,4.5-1.3,6.7-2.1l9.8,28.1c-2.9,1-5.8,1.9-8.8,2.7 S146.4,240.7,143.4,241.3z"/> <path class="st11" d="M173.5,231.4l-12.9-26.8c2.1-1,4.2-2.1,6.2-3.2c2-1.2,4-2.4,5.9-3.8l16.8,24.6c-2.5,1.7-5.1,3.4-7.8,4.9 C179,228.7,176.3,230.1,173.5,231.4z"/> <path class="st12" d="M200.1,214.1l-19.4-22.6c1.8-1.5,3.5-3.1,5.2-4.7c1.7-1.7,3.2-3.4,4.7-5.2l22.6,19.4c-2,2.3-4.1,4.6-6.3,6.8 C204.7,210,202.5,212.1,200.1,214.1z"/> <path class="st13" d="M221.5,190.5l-24.6-16.8c1.3-1.9,2.6-3.9,3.8-5.9c1.2-2,2.2-4.1,3.2-6.2l26.8,12.9c-1.3,2.8-2.8,5.5-4.3,8.2 C224.9,185.4,223.2,188,221.5,190.5z"/> <path class="st14" d="M236,162.3l-28.1-9.8c0.8-2.2,1.5-4.4,2.1-6.7c0.6-2.3,1.1-4.6,1.5-6.8l29.2,5.5c-0.6,3-1.2,6-2.1,9 C237.9,156.4,237,159.4,236,162.3z"/> <path class="st15" d="M242.6,131.2L213,129c0.2-2.3,0.3-4.6,0.3-7c0-2.4-0.1-4.7-0.3-7l29.7-2.2c0.2,3,0.4,6.1,0.4,9.2 S242.9,128.2,242.6,131.2z"/> <path class="st16" d="M240.7,98.8l-29.2,5.5c-0.4-2.3-0.9-4.6-1.5-6.8c-0.6-2.3-1.3-4.5-2.1-6.7l28.1-9.8c1,2.9,1.9,5.8,2.7,8.8 C239.5,92.8,240.1,95.8,240.7,98.8z"/> <path class="st17" d="M230.6,68.6l-26.8,12.9c-1-2.1-2.1-4.2-3.2-6.2s-2.4-4-3.8-5.9l24.6-16.8c1.7,2.5,3.4,5.1,4.9,7.8 S229.3,65.9,230.6,68.6z"/> <path class="st18" d="M213.2,42.1l-22.6,19.4c-1.5-1.8-3.1-3.5-4.7-5.2c-1.7-1.7-3.4-3.2-5.2-4.7L200.1,29c2.3,2,4.6,4.1,6.8,6.3 C209.1,37.5,211.2,39.8,213.2,42.1z"/> <path class="st19" d="M189.6,21l-16.8,24.6c-1.9-1.3-3.9-2.6-5.9-3.8c-2-1.2-4.1-2.2-6.2-3.2l12.9-26.8c2.8,1.3,5.5,2.8,8.2,4.3 C184.5,17.6,187.1,19.2,189.6,21z"/> <g class="st20"> <g> <path d="M152.5,4c-3-0.8-6-1.5-9-2.1l-5.5,29.2c2.3,0.4,4.6,0.9,6.8,1.5c2.3,0.6,4.5,1.3,6.7,2.1l9.8-28.1 C158.4,5.7,155.5,4.8,152.5,4z"/> </g> </g> </svg>'
    };
} ]), window.angular.module("cabi").directive("mobileToggle", function() {
    return {
        restrict: "E",
        template: '<svg version="1.1" class="mobile-toggle__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 58.1 69.7" style="enable-background:new 0 0 58.1 69.7;" xml:space="preserve"><g><polygon points="52.3,63.9 0,63.9 0,69.7 58.1,69.7 58.1,37.8 52.3,37.8"/><path d="M15.9,22.2c5.3-3.8,13.9-4.2,19.7-3.4l-10,10l4.1,4.1l16.4-16.4L29.7,0l-4.1,4.1l8.7,8.7c-6.9-0.6-15.8,0.3-21.9,4.7 C3.7,23.9,0,33,0,47.9h5.8C5.8,34.9,8.7,27.4,15.9,22.2z"/></g></svg>'
    };
}), angular.module("cabi.directives.profileDropdown").directive("profileDropdown", [ "authServiceNew", "authService", "$window", function(authServiceNew, authService, $window) {
    return {
        scope: {},
        controller: function($scope, $element, $attrs, $transclude) {
            $scope.authServiceNew = authServiceNew, $scope.signOut = function() {
                authService.logout().then(function() {
                    $window.location = "/";
                });
            }, $scope.getProfileName = function() {
                if (authServiceNew.user) if (authServiceNew.user.isGuestUser) return "Guest"; else return authServiceNew.user.firstName;
            };
        },
        templateUrl: "../assets/js/angular/directives/profileDropdown/profileDropdown.html",
        link: function($scope, iElm) {
            $scope.dropdown = {
                open: !1
            }, angular.element(iElm).on("mouseleave", function($event) {
                $scope.$apply(function() {
                    $scope.dropdown.open = !1;
                });
            });
        }
    };
} ]), angular.module("cabi.directives.sendConsultantEmail").directive("showContactStylistModal", [ "sendConsultantEmailFactory", function(sendConsultantEmailFactory) {
    return {
        restrict: "A",
        scope: {},
        link: function($scope, iElm, $attrs, controller) {
            iElm.on("click", function($event) {
                sendConsultantEmailFactory.activate({
                    config: $scope.$eval($attrs.showContactStylistModal)
                });
            });
        }
    };
} ]), angular.module("cabi.directives.sendConsultantEmail").controller("sendConsultantEmailModalController", [ "config", "$scope", "sendConsultantEmailFactory", "sendConsultantEmailService", "stylistInfoService", function(config, $scope, sendConsultantEmailFactory, sendConsultantEmailService, stylistInfoService) {
    $scope.stylistInfo = stylistInfoService, $scope.formSubmitted = !1, $scope.failedToSend = !1, 
    $scope.contactForm = {}, function() {
        if (angular.isDefined(config)) {
            if (angular.isDefined(config.subject)) $scope.contactForm.subject = config.subject;
            if (angular.isDefined(config.message)) $scope.contactForm.message = config.message;
        }
    }(), $scope.closeModal = function() {
        sendConsultantEmailFactory.deactivate(), angular.element(document.body)[0].style.overflow = "initial", 
        angular.element(document.documentElement)[0].style.overflow = "initial";
    }, angular.element(document.body)[0].style.overflow = "hidden", angular.element(document.documentElement)[0].style.overflow = "hidden", 
    $scope.submit = function(formFields) {
        var fields;
        fields = formFields, sendConsultantEmailService.deliver(fields).then(function() {
            $scope.formSubmitted = !0;
        }, function() {
            $scope.failedToSend = !0;
        });
    };
} ]), angular.module("cabi.directives.sendConsultantEmail").factory("sendConsultantEmailFactory", [ "btfModal", function(btfModal) {
    return btfModal({
        controller: "sendConsultantEmailModalController",
        controllerAs: "modal",
        templateUrl: "../assets/js/angular/directives/sendConsultantEmail/sendConsultantEmailModal.html"
    });
} ]), angular.module("cabi.api.service").factory("sendConsultantEmailService", [ "clioApiAdapter", function(clioApiAdapter) {
    return {
        deliver: function(fields) {
            return clioApiAdapter.get("SendConsultantEmail", fields);
        }
    };
} ]), app.directive("signInButton", [ "authServiceNew", function(authServiceNew) {
    return {
        scope: {},
        controller: [ "$scope", "$element", "$attrs", "$transclude", function($scope, $element, $attrs, $transclude) {
            $scope.authServiceNew = authServiceNew;
        } ],
        template: '<a ng-show="authServiceNew.user === null" id="header-signin-btn" class="btn btn-pink" href="/account">Sign In</a>'
    };
} ]), angular.module("cabi.directives.sizeChart").factory("sizeChartModalFactory", [ "btfModal", function(btfModal) {
    return btfModal({
        controller: "sizeChartModalController",
        controllerAs: "modal",
        templateUrl: TEMPLATE_DIR + "/assets/js/angular/directives/sizeChart/sizeChart.html"
    });
} ]), angular.module("cabi.directives.sizeChart").directive("sizeChart", [ "sizeChartModalFactory", "breakPointFactory", "$window", function(sizeChartModalFactory, breakPointFactory, $window) {
    return {
        restrict: "E",
        scope: {},
        template: '<a class="montserrat uppercase" href="javascript://">Size Chart</a>',
        link: function($scope, iElm, $attrs, controller) {
            iElm.on("click", function($event) {
                if (breakPointFactory.mobileView()) $window.open("/size-chart/", "_blank"); else sizeChartModalFactory.activate();
            });
        }
    };
} ]), angular.module("cabi.directives.sizeChart").controller("sizeChartModalController", [ "$scope", "sizeChartModalFactory", function($scope, sizeChartModalFactory) {
    $scope.closeModal = sizeChartModalFactory.deactivate, $scope.themePath = TEMPLATE_DIR;
} ]), angular.module("cabi.directives").directive("stickyMessage", [ function() {
    return {
        scope: {
            customMessage: "@"
        },
        templateUrl: "../assets/js/angular/directives/stickyMessage/stickyMessage.html"
    };
} ]), app.directive("stylistInfo", [ "stylistInfoService", function(stylistInfoService) {
    return {
        scope: {},
        templateUrl: "../assets/js/angular/directives/stylistInfo/stylistInfo.html",
        controller: function($scope) {
            $scope.stylistInfo = stylistInfoService;
        },
        link: function($scope, iElm, iAttrs, controller) {
            $scope.dropdown = {
                open: !1
            }, angular.element(iElm).on("mouseleave", function($event) {
                $scope.$apply(function() {
                    $scope.dropdown.open = !1;
                });
            });
        }
    };
} ]), function(angular, exports) {
    exports.cabiApp = exports.cabiApp || {}, exports.cabiApp.componentURL = "../assets/js/angular/ecommerce/_components", 
    exports.cabiApp.baseComponentName = "baseComponent", exports.cabiApp.componentModuleName = "cabi.ecommerce.components", 
    exports.cabiApp.extendDirective = function(newDirective) {
        var scope = angular.extend({
            props: "=?",
            state: "=?",
            on: "&on"
        }, newDirective.scope || {});
        return angular.extend({}, newDirective, {
            scope: scope
        });
    };
}(angular, window), function(angular, exports) {
    exports.cabiApp = exports.cabiApp || {};
    var controller = [ "$scope", "Notification", function($scope, Notification) {
        $scope._defaultProps = {
            type: "SHIPPING_LOCATION",
            submitBtn: !0
        }, $scope._defaultState = {
            isEditing: !1
        }, $scope.$watch("props", function(newValue) {
            $scope._props = angular.extend({}, $scope._defaultProps, newValue);
        }), $scope.$watch("state", function(newValue) {
            $scope._state = angular.extend({}, $scope._defaultState, newValue);
        }), $scope.editAddress = function() {
            $scope._state.isEditing = !0;
        }, $scope.addressFormEvents = function(eventType, data) {
            switch (eventType) {
              case "SAVED":
                $scope._state.isEditing = !1, Notification.success("The address has been saved!");
                break;

              case "CANCELED":
                $scope._state.isEditing = !1;
                break;

              case "ERROR":
                $scope._state.isEditing = !0, Notification.error(data.message);
            }
        };
    } ], templateUrl = exports.cabiApp.componentURL + "/addressCard/addressCard.html", directive = [ function() {
        return exports.cabiApp.extendDirective({
            scope: {
                model: "=",
                profile: "="
            },
            controllerAs: "addressCardCtrl",
            controller: controller,
            templateUrl: templateUrl
        });
    } ];
    angular.module(exports.cabiApp.componentModuleName).directive("addressCard", directive);
}(angular, window), function(angular, exports) {
    function AddressFormController($scope, $rootScope, $q, ngDialog, errorEnum, stateService, addressService, VIEW_PATH, urlParametersService, localeService, currentLocaleService, findMyStylistService, AttachedEcommModalService, GoogleAnalytics, commonService, checkoutService, authServiceNew) {
        if ($scope.currentShippingAddress = {}, $scope.modelIsUpdated = !1, $scope.isSaving = !1, 
        $scope.isSaved = !1, $scope.isValidating = !1, $scope.addressCopy = angular.copy($scope.address), 
        $scope.saveAddress = function() {
            if ($scope.addressForm.$invalid) return;
            $scope.isSaving = !0;
            var deferred = $q.defer(), address = $scope.address;
            return $scope.isValidating = !0, address.type = $scope.addressType, address.setOnCart = $scope.setOnCart, 
            function($model) {
                var deferred = $q.defer();
                return addressService.validatePostalAddress($model.address1, $model.address2, $model.city, $model.postalCode, $model.stateProvinceGeoObj.code).then(function(response) {
                    if (angular.isArray(response.matches) && response.matches.length > 0) deferred.resolve(response); else if ("true" == response.valid) deferred.resolve(response); else deferred.reject({
                        message: "Invalid address"
                    });
                    return response;
                }, function(error) {
                    return deferred.reject(error), error;
                }), deferred.promise;
            }(address).then(function(response) {
                if ($scope.validateAddresses = response.matches, $scope.isValidating = !1, $scope.addressForm.$setPristine(), 
                "true" == response.valid) return address.isValidated = !0, void saveAddressOnServer(address).then(function(response) {
                    return deferred.resolve(response), response;
                }, function(error) {
                    $scope.isSaving = !1, $scope.on({
                        eventType: "ERROR",
                        data: error
                    }), deferred.reject(error);
                });
                displayValidatedAddressPopup();
            }, function(error) {
                if ($scope.isValidating = !1, errorEnum.NO_MATCHED_ADDRESS_FOUND.code == error.code) return $scope.validateAddresses = [], 
                void displayValidatedAddressPopup();
                $scope.on({
                    eventType: "ERROR",
                    data: error
                }), deferred.reject(error);
            }), deferred.promise;
        }, $scope.restoreForm = function() {
            angular.copy($scope.addressCopy, $scope.address), $scope.addressForm.$setPristine(), 
            $scope.addressForm.$setUntouched(), $scope.on({
                eventType: "RESTORED",
                data: {}
            });
        }, $scope.cancelForm = function() {
            angular.copy($scope.addressCopy, $scope.address), $scope.on({
                eventType: "CANCELED",
                data: {}
            });
        }, $scope.onChangeForm = function() {
            if ($scope.address.copy) $scope.address.copy = !1;
        }, $scope.onChangeSimilarAddress = function() {
            if ($scope.address.copy) {
                if ($scope.profile.mailingAddress) angular.copy($scope.profile.mailingAddress, $scope.profile.shippingAddress), 
                $scope.profile.shippingAddress.copy = !0;
            } else $scope.profile.shippingAddress = {};
        }, $scope.isReplicatedSite = !!window.CABI_STYLIST_INFO, $scope.countryLabels = commonService.getCountryLabels(), 
        $scope.profile && ($scope.profile.isGuestUser || $scope.profile.guestCheckout)) urlParametersService.loadParametersFromUrl(), 
        $scope.profile.emailAddress = urlParametersService.getParameter(urlParametersService.parameterTypes.EMAIL), 
        $scope.profile.mobilePhone = urlParametersService.getParameter(urlParametersService.parameterTypes.PHONE_NUMBER), 
        $scope.profile.firstName = urlParametersService.getParameter(urlParametersService.parameterTypes.GUEST_FIRST_NAME), 
        $scope.profile.lastName = urlParametersService.getParameter(urlParametersService.parameterTypes.GUEST_LAST_NAME), 
        $scope.address = {}, $scope.address.postalCode = urlParametersService.getParameter(urlParametersService.parameterTypes.ZIP_CODE);
        function saveAddressOnServer($address) {
            var deferred = $q.defer();
            const locale = localeService.findLocaleByCode(currentLocaleService.get(), localeService.getDomainLocale());
            return addressService.saveAddress($scope.profile.isGuestUser || $scope.profile.guestCheckout ? $scope.profile.firstName : null, $scope.profile.isGuestUser || $scope.profile.guestCheckout ? $scope.profile.lastName : null, $address.type, $address.address1, $address.address2, $address.city, $address.stateProvinceGeoObj.code, $address.postalCode, locale.key, $address.isValidated, $scope.setOnCart, $scope.setOnProfile).then(function(response) {
                (function() {
                    var deferred = $q.defer();
                    if ($scope.profile.isGuestUser || $scope.profile.guestCheckout) if (urlParametersService.setParameter(urlParametersService.parameterTypes.EMAIL, $scope.profile.emailAddress), 
                    urlParametersService.setParameter(urlParametersService.parameterTypes.PHONE_NUMBER, $scope.profile.mobilePhone), 
                    urlParametersService.setParameter(urlParametersService.parameterTypes.GUEST_FIRST_NAME, $scope.profile.firstName), 
                    urlParametersService.setParameter(urlParametersService.parameterTypes.GUEST_LAST_NAME, $scope.profile.lastName), 
                    urlParametersService.setParameter(urlParametersService.parameterTypes.ZIP_CODE, $scope.address.postalCode), 
                    urlParametersService.setParameter(urlParametersService.parameterTypes.HIDE_COMM_PREF, !1), 
                    $scope.profile.hideCommPref = !1, !$scope.isReplicatedSite) (function() {
                        var deferred = $q.defer();
                        return findMyStylistService.getMyStylistsWithReplicated($scope.profile.emailAddress).then(function(res) {
                            if (res && res.myStylists && 1 === res.myStylists.length) urlParametersService.setParameter(urlParametersService.parameterTypes.HIDE_COMM_PREF, !0), 
                            $scope.profile.hideCommPref = !0, GoogleAnalytics.sendEvent("GuestCheckOut", "OneStylist"), 
                            prepareGuestOrder(res.myStylists[0].partyId).then(function() {
                                deferred.resolve();
                            }).catch(function(error) {
                                deferred.reject(error);
                            }); else if (res && res.myStylists && res.myStylists.length > 1) AttachedEcommModalService.open({
                                component: "find-my-stylist.select-stylist",
                                moduleData: {
                                    comingFromCheckout: !0,
                                    stylists: res.myStylists,
                                    callback: function(partyId) {
                                        if (partyId) urlParametersService.setParameter(urlParametersService.parameterTypes.HIDE_COMM_PREF, !0), 
                                        $scope.profile.hideCommPref = !0;
                                        prepareGuestOrder(partyId).then(function() {
                                            deferred.resolve();
                                        }).catch(function(error) {
                                            deferred.reject(error);
                                        });
                                    }
                                }
                            }); else prepareGuestOrder(null).then(function() {
                                deferred.resolve();
                            }).catch(function(error) {
                                deferred.reject(error);
                            });
                        }).catch(function() {
                            prepareGuestOrder(null).then(function() {
                                deferred.resolve();
                            }).catch(function(error) {
                                deferred.reject(error);
                            });
                        }), deferred.promise;
                    })().then(function() {
                        deferred.resolve();
                    }).catch(function(error) {
                        deferred.reject(error);
                    }); else prepareGuestOrder(window.CABI_STYLIST_INFO.PartyId).then(function() {
                        deferred.resolve();
                    }).catch(function(error) {
                        deferred.reject(error);
                    }); else deferred.resolve();
                    return deferred.promise;
                })().then(function() {
                    if (response.cartData) checkoutService.syncData(response); else authServiceNew.sync(response);
                    return $rootScope.$broadcast("CreateUpdateAddress", response), function(response) {
                        $scope.isSaved = !0, $scope.isSaving = !1, $scope.on({
                            eventType: "SAVED",
                            data: response
                        });
                    }(response), deferred.resolve(response), response;
                }).catch(function(error) {
                    $scope.isSaving = !1, $scope.on({
                        eventType: "ERROR",
                        data: error
                    }), deferred.reject(error);
                });
            }, function(error) {
                deferred.reject(error);
            }), deferred.promise;
        }
        function prepareGuestOrder(partyId) {
            return checkoutService.prepareGuestOrder($scope.profile.emailAddress, $scope.profile.mobilePhone, $scope.profile.firstName, $scope.profile.lastName, partyId);
        }
        function displayValidatedAddressPopup() {
            var address = $scope.address;
            ngDialog.open({
                template: VIEW_PATH + "/validateAddressesPopup.html",
                controller: addressValidationController,
                scope: $scope
            }).closePromise.then(function(data) {
                var deferred = $q.defer();
                if ("$closeButton" !== data.value) return address = angular.extend(address, data.value), 
                $scope.isSaving = !0, saveAddressOnServer(address).then(function(response) {
                    return address.isValidated = !0, deferred.resolve(response), response;
                }, function(error) {
                    $scope.isSaving = !1, $scope.on({
                        eventType: "ERROR",
                        data: error
                    }), deferred.reject(error);
                }), deferred.promise; else $scope.isSaving = !1;
            });
        }
        stateService.all().then(function(result) {
            $scope.states = result.list;
        });
    }
    exports.cabiApp = exports.cabiApp || {}, AddressFormController.$inject = [ "$scope", "$rootScope", "$q", "ngDialog", "errorEnum", "stateService", "addressService", "VIEW_PATH", "urlParametersService", "localeService", "currentLocaleService", "findMyStylistService", "AttachedEcommModalService", "GoogleAnalytics", "commonService", "checkoutService", "authServiceNew" ];
    var addressValidationController = [ "$scope", function($scope) {
        $scope.selectAddress = function(address) {
            $scope.closeThisDialog(address);
        };
    } ], templateUrl = exports.cabiApp.componentURL + "/addressForm/addressForm.html";
    function AddressFormDirective() {
        return {
            scope: {
                addressType: "=?",
                address: "=?",
                profile: "=?",
                mode: "=?",
                showSubmitBtn: "=?",
                showCancelBtn: "=?",
                showClearBtn: "=?",
                setOnCart: "=?",
                setOnProfile: "=?",
                on: "&?"
            },
            controller: AddressFormController,
            templateUrl: templateUrl
        };
    }
    AddressFormDirective.$inject = [], angular.module(exports.cabiApp.componentModuleName).directive("addressForm", AddressFormDirective);
}(angular, window), function(angular, exports) {
    exports.cabiApp = exports.cabiApp || {};
    var controller = [ "$scope", "checkoutService", function($scope, checkoutService) {
        $scope._defaultProps = {}, $scope._defaultState = {}, $scope.$watch("props", function(newValue) {
            $scope._props = angular.extend({}, $scope._defaultProps, newValue);
        }), $scope.$watch("state", function(newValue) {
            $scope._state = angular.extend({}, $scope._defaultState, newValue);
        }), $scope.addDemoProducts = function() {
            checkoutService.setCartItem("263005OZC0", 5);
        };
    } ], templateUrl = exports.cabiApp.componentURL + "/bagSummary/bagSummary.html", directive = [ function() {
        return exports.cabiApp.extendDirective({
            scope: {
                cart: "=cartData"
            },
            controllerAs: "bagSummaryCtrl",
            controller: controller,
            templateUrl: templateUrl
        });
    } ];
    angular.module(exports.cabiApp.componentModuleName).directive("bagSummary", directive);
}(angular, window), function(angular, exports) {
    exports.cabiApp = exports.cabiApp || {};
    var controller = [ "$scope", "checkoutService", function($scope, checkoutService) {} ], templateUrl = exports.cabiApp.componentURL + "/cartSummary/cartSummary.html", directive = [ function() {
        return exports.cabiApp.extendDirective({
            scope: {
                cart: "=cartData"
            },
            controllerAs: "cartSummaryCtrl",
            controller: controller,
            templateUrl: templateUrl
        });
    } ];
    angular.module(exports.cabiApp.componentModuleName).directive("cartSummary", directive);
}(angular, window), function(angular, exports) {
    exports.cabiApp = exports.cabiApp || {};
    var controller = [ "$scope", "$q", "checkoutService", "checkOutState", "Analytics", "GoogleAnalytics", function($scope, $q, checkoutService, checkOutState, Analytics, GoogleAnalytics) {
        if ($scope.STEPS = {
            SHIPPING_INFORMATION: "SHIPPING_INFORMATION",
            PAYMENT_INFORMATION: "PAYMENT_INFORMATION",
            VERIFY_INFORMATION: "VERIFY_INFORMATION"
        }, $scope.globalState = checkOutState, $scope.checkout = checkoutService, $scope.$on("deselectPaymentMethod", function(event, type) {
            if ("CREDIT_CARD" === type) $scope.globalState.creditCard = -1;
            $scope.globalState.steps.PAYMENT_INFORMATION.isLoading = !0, checkoutService.removePaymentMethodsByType(type).then(function() {
                $scope.globalState.steps.PAYMENT_INFORMATION.isLoading = !1;
            });
        }), $scope.$on("selectPaymentMethod", function(event, type) {
            if ("CREDIT_CARD" === type && $scope.profile.creditCards && $scope.profile.creditCards.length > 0) $scope.globalState.creditCard = $scope.profile.creditCards[0].paymentMethodId;
        }), !$scope.profile) $scope.profile = {
            guestCheckout: !0
        };
        var _sendEcommerceAnalytics = function(cart, result) {
            ga("require", "ecommerce"), ga("ecommerce:addTransaction", {
                id: result.orderId,
                affiliation: cart.partyId,
                revenue: cart.itemTotal,
                shipping: cart.shippingTotal,
                tax: cart.totalSalesTax
            });
            for (var items = cart.items, i = 0; i < items.length; ++i) ga("ecommerce:addItem", {
                id: result.orderId,
                name: items[i].productName,
                sku: items[i].productId,
                price: items[i].subTotal,
                quantity: items[i].quantity
            });
            ga("ecommerce:send");
        };
        checkOutState.steps.VERIFY_INFORMATION.next = function() {
            GoogleAnalytics.sendEvent($scope.profile.isGuestUser || $scope.profile.guestCheckout ? "GuestCheckOut" : "CheckOut", "VerifyInfo");
            var deferred = $q.defer();
            if ($scope.profile.isGuestUser || $scope.profile.guestCheckout) {
                const communication = [];
                Object.keys($scope.profile.communication).forEach(function(key) {
                    if ("no" !== key && $scope.profile.communication[key]) communication.push(key);
                });
                for (let i = 0; i < communication.length; i++) GoogleAnalytics.sendEvent("GuestCheckOut", "ContactMethod", communication[i]);
                return checkoutService.submitGuestOrder(communication, $scope.profile.mobilePhone2).then(function(result) {
                    return Analytics.sendEvent({
                        eventCategory: "Checkout - Final Step",
                        eventAction: "button-click",
                        eventLabel: "complete-order",
                        eventValue: $scope.cart.cartData.grandTotal
                    }), deferred.resolve(result), _sendEcommerceAnalytics($scope.cart.cartData, result), 
                    result;
                }, function(error) {
                    deferred.reject(error);
                }), deferred.promise;
            } else {
                if (window.CABI_STYLIST_INFO) checkoutService.submitOrder().then(function(result) {
                    return Analytics.sendEvent({
                        eventCategory: "Checkout - Final Step",
                        eventAction: "button-click",
                        eventLabel: "complete-order",
                        eventValue: $scope.cart.cartData.grandTotal
                    }), deferred.resolve(result), _sendEcommerceAnalytics($scope.cart.cartData, result), 
                    result;
                }, function(error) {
                    deferred.reject(error);
                }); else checkoutService.submitOrderWithStylist().then(function(result) {
                    return Analytics.sendEvent({
                        eventCategory: "Checkout - Final Step",
                        eventAction: "button-click",
                        eventLabel: "complete-order",
                        eventValue: $scope.cart.cartData.grandTotal
                    }), result.submitOrderWithStylist = !0, deferred.resolve(result), _sendEcommerceAnalytics($scope.cart.cartData, result), 
                    result;
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
        };
    } ], templateUrl = exports.cabiApp.componentURL + "/checkOut/checkOut.html", directive = [ function() {
        return exports.cabiApp.extendDirective({
            scope: {
                cart: "=cartData",
                profile: "=profile",
                remainingTotalOrder: "=",
                showOrderFlows: "="
            },
            controllerAs: "checkOutCtrl",
            controller: controller,
            templateUrl: templateUrl
        });
    } ];
    angular.module(exports.cabiApp.componentModuleName).directive("checkOut", directive);
}(angular, window), function(angular, exports) {
    exports.cabiApp = exports.cabiApp || {}, angular.module(exports.cabiApp.componentModuleName).service("checkOutState", [ "$q", function($q) {
        var exports = {
            currentStep: "SHIPPING_INFORMATION",
            creditCard: 0
        }, defaultNext = function() {
            return $q(function(resolve) {
                resolve();
            });
        };
        return exports.restoreNextFunction = function(step) {
            exports.steps[step].next = defaultNext;
        }, exports.steps = {
            SHIPPING_INFORMATION: {
                title: "1. Shipping information",
                isValid: !0,
                nextStep: "PAYMENT_INFORMATION",
                next: defaultNext
            },
            PAYMENT_INFORMATION: {
                title: "2. Payment information",
                isValid: !1,
                nextStep: "VERIFY_INFORMATION",
                next: defaultNext
            },
            VERIFY_INFORMATION: {
                title: "3. Verify & complete information",
                nextStep: "CONFIRMATION_ORDER",
                isValid: !1,
                next: defaultNext
            }
        }, exports.goToStep = function(name) {
            if (exports.steps[name]) exports.currentStep = name;
        }, exports;
    } ]);
}(angular, window), function(angular, exports) {
    exports.cabiApp = exports.cabiApp || {};
    var templateUrl = exports.cabiApp.componentURL + "/checkOutCart/checkOutCart.html", directive = [ function() {
        return {
            scope: {
                cart: "=cartData"
            },
            templateUrl: templateUrl
        };
    } ];
    angular.module(exports.cabiApp.componentModuleName).directive("checkOutCart", directive);
}(angular, window), function(angular, exports) {
    exports.cabiApp = exports.cabiApp || {};
    var controller = [ "$scope", "$q", "$state", "Notification", "checkOutState", "urlParametersService", "localeService", function($scope, $q, $state, Notification, checkOutState, urlParametersService, localeService) {
        if (!$scope.state) $scope.state = {};
        if (!$scope.props) $scope.props = {};
        $scope.globalState = checkOutState, $scope.domainLocale = localeService.getDomainLocale(), 
        $scope.isCommunicationInvalid = function() {
            if ($scope.profile && ($scope.profile.isGuestUser || $scope.profile.guestCheckout) && "VERIFY_INFORMATION" === checkOutState.currentStep) if (urlParametersService.loadParametersFromUrl(), 
            $scope.profile.hideCommPref = urlParametersService.getParameter(urlParametersService.parameterTypes.HIDE_COMM_PREF), 
            !$scope.profile.hideCommPref) {
                if ($scope.profile.communication) {
                    let ret = !($scope.profile.communication.email || $scope.profile.communication.txt || $scope.profile.communication.phone || $scope.profile.communication.no);
                    if ((!$scope.profile.mobilePhone || 0 === $scope.profile.mobilePhone.length) && (!$scope.profile.mobilePhone2 || 0 === $scope.profile.mobilePhone2.length || $scope.profile.mobilePhone2Invalid) && ($scope.profile.communication.txt || $scope.profile.communication.phone)) ret = !0;
                    return ret;
                }
                return !0;
            }
            return !1;
        }, $scope.setAsCurrentTab = function() {
            if ($scope.isEnable) checkOutState.goToStep($scope.name);
        }, $scope.isReplicatedSite = !!window.CABI_STYLIST_INFO, $scope.next = next;
        var hooks = {};
        function next() {
            triggerHook("beforeNext").then(function() {
                !function() {
                    if (!$scope.isValid) return void Notification.error($scope.invalidMessage || "Please, complete the step");
                    $scope.state.isLoading = !0, checkOutState.steps[$scope.name].next().then(function(result) {
                        $scope.state.isLoading = !1;
                        var nextStep = checkOutState.steps[$scope.name].nextStep;
                        if ("CONFIRMATION_ORDER" == nextStep) {
                            var orderData = angular.copy($scope.cart);
                            if (result.submitResult) if (result.submitOrderWithStylist) $state.go("order-confirmation", {
                                confirmationId: result.submitResult.orderId,
                                lastOrder: orderData.cartData,
                                giftCards: result.submitResult.giftCards,
                                guestStylist: result.stylistToAssigned ? result.stylistToAssigned : null,
                                guestPartyId: $scope.$parent.profile.partyId,
                                firstName: $scope.$parent.profile.firstName,
                                lastName: $scope.$parent.profile.lastName,
                                guestCheckout: !1
                            }); else $state.go("order-confirmation", {
                                confirmationId: result.submitResult.orderId,
                                lastOrder: orderData.cartData,
                                giftCards: result.submitResult.giftCards,
                                guestStylist: result.stylistToAssigned ? result.stylistToAssigned : null,
                                guestPartyId: $scope.$parent.profile.partyId,
                                firstName: $scope.$parent.profile.firstName,
                                lastName: $scope.$parent.profile.lastName,
                                guestCheckout: result.submitResult
                            }); else $state.go("order-confirmation", {
                                confirmationId: result.orderId,
                                lastOrder: orderData.cartData,
                                giftCards: result.giftCards,
                                firstName: $scope.$parent.profile.firstName,
                                lastName: $scope.$parent.profile.lastName
                            });
                        } else checkOutState.currentStep = checkOutState.steps[$scope.name].nextStep;
                    }, function(error) {
                        if (error.message) Notification.error(error.message);
                        $scope.state.isLoading = !1;
                    });
                }(), triggerHook("afterNext");
            });
        }
        function triggerHook(hookName) {
            return $q(function(resolve, reject) {
                var _hooks = hooks[hookName], allHooks = [];
                if (_hooks) {
                    for (var hookIndex in _hooks) {
                        var hook = _hooks[hookIndex];
                        allHooks.push(hook.apply(this));
                    }
                    $q.all(allHooks).then(function() {
                        resolve();
                    }, function() {
                        reject();
                    });
                } else resolve();
            });
        }
        this.next = next, this.addHook = function(hookName, callback) {
            if (!hooks[hookName]) hooks[hookName] = [];
            hooks[hookName].push(callback);
        }, this.triggerHook = triggerHook, this.setLoadingMode = function(isLoading) {
            $scope.state.isLoading = isLoading;
        }, $scope.showReturnConsentModal = function(showReturnConsent) {
            $scope.showReturnConsent = showReturnConsent;
        }, $scope.returnConsentCheck = function() {
            $scope.isReturnPolicyChecked = !$scope.isReturnPolicyChecked;
        };
    } ], templateUrl = exports.cabiApp.componentURL + "/checkOutStep/checkOutStep.html", directive = [ function() {
        return exports.cabiApp.extendDirective({
            scope: {
                cart: "=?cartData",
                profile: "=?profile",
                name: "=",
                showFooterBtn: "=",
                isValid: "=",
                isEnable: "=",
                isDisabled: "=",
                showOrderFlows: "=",
                invalidMessage: "@"
            },
            transclude: !0,
            controllerAs: "checkOutStepCtrl",
            controller: controller,
            templateUrl: templateUrl
        });
    } ];
    angular.module(exports.cabiApp.componentModuleName).directive("checkOutStep", directive);
}(angular, window), function(angular, exports) {
    function checkoutShippingAddressController($scope, $q, Notification, checkoutService, checkOutState, authServiceNew, GoogleAnalytics) {
        function setEditMode(isEditing) {
            console.log("settingEdit mode: " + isEditing), $scope.isEditing = isEditing, checkOutState.steps.SHIPPING_INFORMATION.showNextButton = isEditing;
        }
        function refresh() {
            var cart = $scope.cart, profile = $scope.profile;
            if (angular.isObject(cart) && angular.isObject(profile) && 0 != Object.keys(cart).length && 0 != Object.keys(profile).length) {
                setEditMode(isShowBackorderAddress(cart, profile) || !cart.shippingAddress);
            }
        }
        $scope.checkoutService = checkoutService, $scope.isSaved = !1, $scope.isEditing = !1, 
        $scope.$watch("profile", function() {
            refresh();
        }), $scope.$watch("cart", function() {
            refresh();
        }), $scope.$watch("cart.selectedSippingAddressType", function(newValue, oldValue) {
            if (newValue !== oldValue) if (!$scope.isSaved) if (oldValue && "oth" === newValue) setEditMode(!0), 
            $scope.backUpSippingAddressType = oldValue;
        }), $scope.setShippingAddressType = function(type) {
            if ("oth" === type) $scope.currentShippingAddress = {}, setEditMode(!0); else setEditMode(!1), 
            checkoutService.setShippingAddressType(type).catch(function(error) {
                Notification.error(error.message), checkoutService.getCart();
            });
        }, $scope.editShippingAddress = function() {
            $scope.backUpShippingAddressModel = angular.copy($scope.cart.shippingAddress), $scope.shippingModel = $scope.cart.shippingAddress, 
            $scope.currentShippingAddress = angular.copy($scope.cart.shippingAddress), setEditMode(!0);
        }, $scope.addressFormEvents = function(eventType, data) {
            switch (eventType) {
              case "SAVED":
                if ($scope.isSaved = !0, Notification.success("Address has been updated"), !data.hasOwnProperty("cartData")) checkoutService.getCart(); else if (!$scope.profile.isGuestUser && !$scope.profile.guestCheckout) authServiceNew.getProfile();
                setEditMode(!1);
                break;

              case "CANCELED":
                if ($scope.backUpShippingAddressModel) angular.copy($scope.backUpShippingAddressModel, $scope.cart.shippingAddress); else if ($scope.backUpSippingAddressType) $scope.cart.selectedSippingAddressType = $scope.backUpSippingAddressType;
                setEditMode(!1);
                break;

              case "ERROR":
                setEditMode(!0), Notification.error(data.message);
            }
        }, refresh(), checkOutState.steps.SHIPPING_INFORMATION.next = function() {
            GoogleAnalytics.sendEvent($scope.profile.isGuestUser || $scope.profile.guestCheckout ? "GuestCheckOut" : "CheckOut", "ShippingInfo");
            var $shippingMethodModel = $scope.cart.selectedShippingMethod;
            return $q(function(resolve, reject) {
                if ($shippingMethodModel || $scope.cart.carrierShipmentMethodList.length) checkoutService.setShippingMethod($shippingMethodModel.carrierPartyId, $shippingMethodModel.shippingMethodId).then(function(result) {
                    checkoutService.generalData = result, resolve(result);
                }, function(error) {
                    reject(error);
                }); else resolve();
            });
        };
    }
    function CheckoutShippingAddressDirective($q, ngDialog, Notification, checkoutService, authServiceNew, addressService, VIEW_PATH, localeService, currentLocaleService, $rootScope) {
        return {
            scope: {
                profile: "=",
                cart: "=cartData"
            },
            require: "^^checkOutStep",
            controller: checkoutShippingAddressController,
            link: function(scope, element, attrs, checkOutStepController) {
                function openSuggestedAddressPopup() {
                    var deferred = $q.defer(), dialog = ngDialog.open({
                        template: VIEW_PATH + "/validateAddressesPopup.html",
                        controller: [ "$scope", function($scope) {
                            $scope.selectAddress = function(address) {
                                $scope.closeThisDialog(address);
                            };
                        } ],
                        scope: scope
                    });
                    return dialog.closePromise.then(function(data) {
                        var shippingAddress = scope.cart.shippingAddress;
                        if ("$closeButton" !== data.value) (shippingAddress = angular.extend({}, shippingAddress, data.value)).isValidated = !0, 
                        checkOutStepController.setLoadingMode(!0), function(shippingAddress) {
                            var deferred = $q.defer();
                            const locale = localeService.findLocaleByCode(currentLocaleService.get(), localeService.getDomainLocale());
                            return addressService.saveAddress(scope.profile.isGuestUser || scope.profile.guestCheckout ? scope.profile.firstName : null, scope.profile.isGuestUser || scope.profile.guestCheckout ? scope.profile.lastName : null, "SHIPPING_LOCATION", shippingAddress.address1, shippingAddress.address2, shippingAddress.city, shippingAddress.stateProvinceGeoObj.code, shippingAddress.postalCode, locale.key, shippingAddress.isValidated, needsSetOnCart(), needsSetOnProfile()).then(function(response) {
                                if (response.cartData) checkoutService.syncData(response); else authServiceNew.sync(response);
                                return $rootScope.$broadcast("CreateUpdateAddress", response), deferred.resolve(response), 
                                response;
                            }, function(error) {
                                deferred.reject(error);
                            }), deferred.promise;
                        }(shippingAddress).then(function(response) {
                            deferred.resolve(response);
                        }, function(error) {
                            deferred.reject(error);
                        }).finally(function() {
                            checkOutStepController.setLoadingMode(!1);
                        });
                    }), deferred.promise;
                }
                function needsSetOnCart() {
                    var cart = scope.cart, profile = scope.profile;
                    if (isScopeReady(cart, profile)) {
                        if (profile.isGuestUser || profile.guestCheckout) return !0;
                        if (!cart.shippingAddress) return !0;
                        if (isShowBackorderAddress(cart, profile)) return !1;
                        if ("oth" == cart.selectedSippingAddressType) return !0; else return !1;
                    }
                }
                function needsSetOnProfile() {
                    var cart = scope.cart, profile = scope.profile;
                    if (isScopeReady(cart, profile)) {
                        if (profile.isGuestUser || profile.guestCheckout) return !1;
                        if (needsProfileAddress(profile)) return !0;
                        if (isShowBackorderAddress(cart, profile)) return !0;
                        if ("oth" == cart.selectedSippingAddressType) return !1; else return !1;
                    }
                }
                checkOutStepController.addHook("beforeNext", function() {
                    return $q(function(resolve, reject) {
                        var cart = scope.cart, shippingAddress = cart.shippingAddress;
                        if (!shippingAddress) return reject();
                        if ("Y" === shippingAddress.isValidated || "shloc" == cart.selectedSippingAddressType) return resolve(); else return checkOutStepController.setLoadingMode(!0), 
                        void addressService.validatePostalAddress(shippingAddress.address1, shippingAddress.address2, shippingAddress.city, shippingAddress.postalCode, shippingAddress.stateProvinceGeoObj.code).then(function(response) {
                            if (angular.isArray(response.matches) && response.matches.length > 0) scope.validateAddresses = response.matches, 
                            openSuggestedAddressPopup().then(function() {
                                resolve();
                            }, function() {
                                reject();
                            }); else if ("true" == response.valid) resolve(); else reject();
                        }, function() {
                            Notification.error("The shipping address can not be validated"), reject();
                        }).finally(function() {
                            checkOutStepController.setLoadingMode(!1);
                        });
                    });
                }), scope.needsSetOnCart = needsSetOnCart, scope.needsSetOnProfile = needsSetOnProfile, 
                scope.needsShowBackorderAddress = function() {
                    var cart = scope.cart, profile = scope.profile;
                    if (!isScopeReady(cart, profile)) return;
                    return isShowBackorderAddress(cart, profile);
                }, scope.showAddressTypeRadioButtons = function() {
                    var cart = scope.cart, profile = scope.profile;
                    if (!isScopeReady(cart, profile)) return;
                    return !isShowBackorderAddress(cart, profile) && cart.availableShipAddrTypes.length > 1;
                }, scope.goToNextStep = checkOutStepController.next;
            },
            templateUrl: exports.cabiApp.componentURL + "/checkoutShippingAddress/checkoutShippingAddress.html"
        };
    }
    function needsProfileAddress(profile) {
        return !isPopulatedAddress(profile.mailingAddress) && !isPopulatedAddress(profile.shippingAddress);
    }
    function isScopeReady(cart, profile) {
        return angular.isObject(cart) && Object.keys(cart).length > 0 && angular.isObject(profile) && Object.keys(profile).length > 0;
    }
    function isShowBackorderAddress(cart, profile) {
        return function(cart) {
            return void 0 != cart.ShowStatus;
        }(cart) && needsProfileAddress(profile);
    }
    function isPopulatedAddress(address) {
        return address && null != address.address1;
    }
    exports.cabiApp = exports.cabiApp || {}, angular.module(exports.cabiApp.componentModuleName).directive("checkoutShippingAddress", CheckoutShippingAddressDirective), 
    checkoutShippingAddressController.$inject = [ "$scope", "$q", "Notification", "checkoutService", "checkOutState", "authServiceNew", "GoogleAnalytics" ], 
    CheckoutShippingAddressDirective.$inject = [ "$q", "ngDialog", "Notification", "checkoutService", "authServiceNew", "addressService", "VIEW_PATH", "localeService", "currentLocaleService", "$rootScope" ];
}(angular, window), function(angular, exports) {
    exports.cabiApp = exports.cabiApp || {};
    var controller = [ "$scope", "$q", "$timeout", "Notification", "creditCardService", "creditCardTypes", "expirationDateOptions", "stateService", "checkOutState", "checkoutService", "localeService", "currentLocaleService", "commonService", function($scope, $q, $timeout, Notification, creditCardService, creditCardTypes, expirationDateOptions, stateService, checkOutState, checkoutService, localeService, currentLocaleService, commonService) {
        if ($scope.state = {
            isRemoving: !1,
            isSaved: !1,
            isSaving: !1
        }, "CHECK_OUT" == $scope.mode) $scope.props = {
            setOnCart: !0,
            submitBtn: !0
        }; else $scope.props = {
            setOnCart: !1,
            submitBtn: !0
        };
        var _isSavedAddress = function(addressType) {
            var profile = $scope.profile;
            if (($scope.profile.isGuestUser || $scope.profile.guestCheckout) && $scope.cartData) profile = $scope.cartData;
            var _hasId = function(addressType) {
                if (angular.isObject(profile[addressType])) if (angular.isDefined(profile[addressType].contactMechId)) return !0;
            };
            if (!angular.isObject(profile)) return null;
            switch (addressType) {
              case "shipping":
                return _hasId("shippingAddress");

              case "mailing":
              case "general":
                return _hasId("mailingAddress");
            }
        };
        stateService.all().then(function(result) {
            $scope.states = result.list;
        }), $scope.countryLabels = commonService.getCountryLabels(), $scope.pendingToDelete = !1, 
        $scope.creditCardTypes = creditCardTypes, $scope.expirationDateOptions = expirationDateOptions, 
        $scope.addressCopy = angular.copy($scope.model), $scope.$watch("model.paymentMethodId", function(newValue) {
            if (newValue) $scope.updateAddressesAvailable();
        }), $scope.$watch("profile", function(newValue) {
            if (newValue) $scope.updateAddressesAvailable();
        }), $scope.$watch("cartData", function(newValue) {
            if (newValue) $scope.updateAddressesAvailable();
        }), $scope.updateAddressesAvailable = function() {
            if ($scope._addresses = [], ($scope.profile.isGuestUser || $scope.profile.guestCheckout) && $scope.cartData) {
                if (_isSavedAddress("shipping")) $scope.cartData.shippingAddress.title = "Shipping Address", 
                $scope._addresses.push($scope.cartData.shippingAddress);
            } else {
                if (_isSavedAddress("shipping")) $scope.profile.shippingAddress.title = "Shipping Address", 
                $scope._addresses.push($scope.profile.shippingAddress);
                if (_isSavedAddress("mailing")) $scope.profile.mailingAddress.title = "Mailing Address", 
                $scope._addresses.push($scope.profile.mailingAddress);
            }
            if ($scope.model) if ($scope.model.billingAddress) if ($scope.model.contactMechId = $scope.model.billingAddress.contactMechId, 
            function(contactMechId) {
                if (($scope.profile.isGuestUser || $scope.profile.guestCheckout) && $scope.cartData && $scope.cartData.shippingAddress) return contactMechId !== $scope.cartData.shippingAddress.contactMechId; else return contactMechId !== $scope.profile.shippingAddress.contactMechId && contactMechId !== $scope.profile.mailingAddress.contactMechId;
            }($scope.model.billingAddress.contactMechId)) $scope.model.billingAddress.title = "Custom Address", 
            $scope._addresses.push($scope.model.billingAddress);
            if ($scope._addresses.push({
                title: "Add new",
                contactMechId: -1
            }), $scope.model) if (!$scope.model.contactMechId || -1 == $scope.model.contactMechId) $scope.model.contactMechId = $scope._addresses[0].contactMechId;
        }, $scope.onDeleteCreditCardClick = function(agreeToDelete) {
            if (agreeToDelete) paymentMethodId = $scope.model.paymentMethodId, $scope.state.isRemoving = !0, 
            creditCardService.removeCreditCard(paymentMethodId, $scope.profile.isGuestUser || $scope.profile.guestCheckout).then(function(result) {
                $scope.state.isRemoving = !1, $scope.pendingToDelete = !1, $scope.on({
                    eventType: "DELETED",
                    data: {
                        paymentMethodId: paymentMethodId,
                        totalCreditCards: result.creditCards ? result.creditCards.length : 0,
                        creditCards: result.creditCards
                    }
                });
            }, function(error) {
                Notification.error(error.message);
            }); else $scope.pendingToDelete = !0;
            var paymentMethodId;
        }, $scope.onCancelDeleteCreditCardClick = function() {
            $scope.pendingToDelete = !1;
        }, $scope.saveCreditCard = function(amount) {
            fbq("track", "AddPaymentInfo");
            var $model, deferred = $q.defer();
            $scope.creditCardForm.$setSubmitted();
            const locale = localeService.findLocaleByCode(currentLocaleService.get(), localeService.getDomainLocale());
            if ($scope.creditCardForm.$valid) $scope.state.isSaving = !0, $model = $scope.model, 
            creditCardService.saveCreditCard($model.paymentMethodId, $model.firstName, $model.lastName, $model.cardType.id, $model.expMonth.id, $model.expYear.id, $model.cardNumber, $model.contactMechId && -1 != $model.contactMechId ? $model.contactMechId : null, $model.address1, $model.address2, $model.city, $model.stateProvinceGeoId, $model.postalCode, locale.key, $scope.props.setOnCart ? amount : null).then(function(response) {
                return $scope.state.isSaved = !0, $scope.state.isSaving = !1, $scope.creditCardForm.$setPristine(), 
                $scope.on({
                    eventType: "SAVED",
                    data: response
                }), deferred.resolve(response), checkOutState.creditCard = response.creditCard.paymentMethodId, 
                response;
            }, function(error) {
                return $scope.state.isSaving = !1, $scope.on({
                    eventType: "ERROR",
                    data: error
                }), deferred.reject(error), error;
            }); else $timeout(function() {
                deferred.reject({});
            });
            return deferred.promise;
        }, $scope.restoreForm = function() {
            angular.copy($scope.addressCopy, $scope.model), $scope.creditCardForm.$setPristine(), 
            $scope.creditCardForm.$setUntouched(), $scope.updateAddressesAvailable(), $scope.on({
                eventType: "RESTORED",
                data: {}
            });
        }, $scope.cancelForm = function() {
            angular.copy($scope.addressCopy, $scope.model), $scope.on({
                eventType: "CANCELED",
                data: {}
            });
        }, $scope.updateAddressesAvailable(), checkOutState.steps.PAYMENT_INFORMATION.saveCreditCardForm = $scope.saveCreditCard;
    } ], templateUrl = exports.cabiApp.componentURL + "/creditCardForm/creditCardForm.html", directive = [ function() {
        return exports.cabiApp.extendDirective({
            scope: {
                model: "=",
                mode: "=",
                profile: "=",
                cartData: "=?"
            },
            controllerAs: "creditCardFormCtrl",
            controller: controller,
            templateUrl: templateUrl
        });
    } ];
    angular.module(exports.cabiApp.componentModuleName).directive("creditCardForm", directive);
}(angular, window), function(angular, exports) {
    exports.cabiApp = exports.cabiApp || {};
    var controller = [ "$scope", "$timeout", "$q", "Notification", "checkoutService", "creditCardService", "checkOutState", "dpPositionService", "GoogleAnalytics", function($scope, $timeout, $q, Notification, checkoutService, creditCardService, checkOutState, dpPositionService, GoogleAnalytics) {
        if ($scope.globalState = checkOutState, $scope.state = {}, "CHECK_OUT" == $scope.mode) $scope.props = {
            showEditBtn: !0
        }; else $scope.props = {
            showEditBtn: !0
        };
        var editCreditCard = function(creditCard) {
            $scope.state.isEditing = !0, $scope.state.currentCreditCard = creditCard;
        }, createCreditCard = function() {
            $scope.creditCardBeforeAdd = $scope.globalState.creditCard, checkOutState.creditCard = -1, 
            editCreditCard({
                contactMechId: -1
            });
        };
        $scope.onEditCreditCardClick = function(creditCard) {
            $scope.globalState.creditCard = creditCard.paymentMethodId, editCreditCard(creditCard), 
            $timeout(function() {
                dpPositionService.triggerScrollBehaviour("credit-card-form");
            }, 300);
        }, $scope.onCreateCreditCardButtonClick = function() {
            createCreditCard(), $timeout(function() {
                dpPositionService.triggerScrollBehaviour("credit-card-form");
            }, 300);
        }, $scope.creditCardSelected = function() {
            $scope.state.isEditing = !1;
        }, $scope.creditCardFormEvents = function(eventType, data) {
            switch (eventType) {
              case "SAVED":
                if (!$scope.profile.isGuestUser && !$scope.profile.guestCheckout) Notification.success("Credit card has been saved");
                checkoutService.lastCreditCardSelected = data.creditCard, $scope.state.isEditing = !1;
                break;

              case "DELETED":
                if ($scope.state.isEditing = !1, data.creditCards && data.creditCards.length > 0) $scope.globalState.creditCard = data.creditCards[0].paymentMethodId;
                !function(totalCreditCards) {
                    if (0 == totalCreditCards) createCreditCard();
                }(data.totalCreditCards), Notification.success("Credit card has been removed");
                break;

              case "CANCELED":
                if ($scope.state.isEditing = !1, $scope.creditCardBeforeAdd) $scope.globalState.creditCard = $scope.creditCardBeforeAdd, 
                $scope.creditCardBeforeAdd = void 0;
                break;

              case "ERROR":
                Notification.error(data.message);
            }
        }, $scope.addCreditCardAsPaymentMethod = function(paymentMethodId, amount) {
            var deferred = $q.defer();
            return checkoutService.setCreditCard(paymentMethodId, amount).then(function(response) {
                deferred.resolve(response);
            }, function(error) {
                deferred.reject(error);
            }), deferred.promise;
        }, $scope.$on("$destroy", function() {
            checkOutState.restoreNextFunction("PAYMENT_INFORMATION");
        }), checkOutState.steps.PAYMENT_INFORMATION.next = function() {
            return GoogleAnalytics.sendEvent($scope.profile.isGuestUser || $scope.profile.guestCheckout ? "GuestCheckOut" : "CheckOut", "PaymentInfo"), 
            $q(function(resolve, reject) {
                var amount = checkoutService.remainingTotalOrder;
                if (checkOutState.creditCard) checkoutService.removePaymentMethodsByType("CREDIT_CARD").then(function() {
                    if (amount = checkoutService.remainingTotalOrder, -1 == checkOutState.creditCard) checkOutState.steps.PAYMENT_INFORMATION.saveCreditCardForm(amount).then(function(response) {
                        resolve(response);
                    }, function(error) {
                        return reject(error), error;
                    }); else $scope.addCreditCardAsPaymentMethod(checkOutState.creditCard, amount).then(function(response) {
                        resolve(response);
                    }, function(error) {
                        reject(error);
                    });
                }, function(error) {
                    reject(error);
                }); else if (0 == amount) resolve({
                    amount: amount
                }); else reject({});
            });
        }, function() {
            if (!$scope.profile.creditCards) if ($scope.profile.creditCards = [], $scope.cartData && $scope.cartData.cartData && $scope.cartData.cartData.paymentMethods && $scope.cartData.cartData.paymentMethods.length > 0) $scope.profile.creditCards = $scope.cartData.cartData.paymentMethods;
            if (0 == $scope.profile.creditCards.length) createCreditCard();
        }();
    } ], templateUrl = exports.cabiApp.componentURL + "/creditCardList/creditCardList.html", directive = [ function() {
        return exports.cabiApp.extendDirective({
            scope: {
                profile: "=",
                mode: "@",
                cartData: "=?"
            },
            controllerAs: "creditCardListCtrl",
            controller: controller,
            templateUrl: templateUrl
        });
    } ];
    angular.module(exports.cabiApp.componentModuleName).directive("creditCardList", directive);
}(angular, window), function(angular, exports) {
    var element, attributes;
    exports.cabiApp = exports.cabiApp || {};
    var controller = [ "$scope", "$log", "dpPositionService", function($scope, $log, dpPositionService) {
        $scope.$on("documentPositionManualScroll", function() {
            if (attributes.id == dpPositionService.lastQueued()) triggerScrolling();
        });
    } ], link = function(scope, elmt, attrs) {
        if (element = elmt, attributes = attrs, angular.isUndefined(attributes.dpAutomatic) || angular.isDefined(attributes.dpAutomatic) && ("true" == attributes.dpAutomatic || "" == attributes.dpAutomatic)) triggerScrolling();
    }, triggerScrolling = function() {
        if ("" === attributes.documentPosition) if (angular.isDefined(attributes.dpAnimated) && "true" == attributes.dpAnimated) jQuery("body").animate({
            scrollTop: $(element).position().top
        }, 1e3); else jQuery(document).scrollTop($(element).position().top); else if (angular.isDefined(attributes.dpAnimated) && "true" == attributes.dpAnimated) jQuery("body").animate({
            scrollTop: attributes.documentPosition
        }, 1e3); else jQuery(document).scrollTop(attributes.documentPosition);
    }, directive = [ function() {
        return {
            controllerAs: "documentPositionCtrl",
            controller: controller,
            link: link
        };
    } ];
    angular.module(exports.cabiApp.componentModuleName).directive("documentPosition", directive);
}(angular, window), function(angular, exports) {
    exports.cabiApp = exports.cabiApp || {};
    var controller = [ "$scope", "checkoutService", "Notification", function($scope, checkoutService, Notification) {
        $scope.error = null, $scope._syncPaymentMethodData = function(cart) {
            if (angular.isObject(cart)) if (angular.isDefined(cart.cartData)) $scope.cart.cartData.paymentMethods = cart.cartData.paymentMethods;
        }, $scope.newGitCardModel = {}, $scope.isGiftCard = function(paymentMethod) {
            return "GIFT_CARD" == paymentMethod.paymentMethodTypeId;
        }, $scope.getGiftCard = function(cardNumber) {
            $scope.error = null, $scope.state.isConsulting = !0, checkoutService.getGiftCard(cardNumber).then(function(result) {
                $scope.state.isConsulting = !1, $scope.newGitCardModel = angular.extend({}, $scope.newGitCardModel, result), 
                $scope.newGitCardModel.amount = Math.min($scope.newGitCardModel.balance, checkoutService.remainingTotalOrder);
            }, function(error) {
                $scope.error = error, $scope.state.isConsulting = !1;
            });
        }, $scope.setGiftCard = function() {
            var $model = $scope.newGitCardModel;
            if (fbq("track", "AddPaymentInfo"), $scope.state.isSaving = !0, $model.amount = Math.abs($model.amount), 
            $model.amount > $model.balance) $scope.state.isSaving = !1, $scope.error = {
                message: "Amount exceeds available amount on this Gift Card"
            }; else $scope.error = !1, $scope.removeGiftCard($model.cardNumber).then(function() {
                if ($model.amount > checkoutService.remainingTotalOrder) $model.amount = checkoutService.remainingTotalOrder;
                checkoutService.setGiftCard($model.cardNumber, $model.amount).then(function(result) {
                    $scope._syncPaymentMethodData(result), $scope.state.isSaving = !1, $scope.newGitCardModel = {};
                }, function(error) {
                    Notification.error(error.message), $scope.state.isSaving = !1;
                });
            }, function() {
                Notification.error(error.message), $scope.state.isSaving = !1;
            });
        }, $scope.removeGiftCard = function(cardNumber) {
            return $scope.state.isRemoving = !0, $scope.state.isSaving = !0, checkoutService.setGiftCard(cardNumber, 0).then(function(result) {
                return $scope._syncPaymentMethodData(result), $scope.state.isRemoving = !1, $scope.state.isSaving = !1, 
                result;
            }, function(error) {
                return Notification.error(error.message), $scope.state.isRemoving = !1, $scope.state.isSaving = !1, 
                error;
            });
        }, $scope.updateGifCard = function(giftCard) {
            $scope.newGitCardModel = angular.copy(giftCard);
        };
    } ], templateUrl = exports.cabiApp.componentURL + "/giftCards/giftCards.html", directive = [ function() {
        return exports.cabiApp.extendDirective({
            scope: {
                profile: "=",
                cart: "=cartData"
            },
            controllerAs: "giftCardsCtrl",
            controller: controller,
            templateUrl: templateUrl,
            link: function(scope) {
                if (!scope.state) scope.state = {};
                if (!scope.props) scope.props = {};
            }
        });
    } ];
    angular.module(exports.cabiApp.componentModuleName).directive("giftCards", directive);
}(angular, window), function(angular, exports) {
    exports.cabiApp = exports.cabiApp || {};
    var controller = [ "$scope", "Notification", "checkoutService", "checkOutState", "localeService", function($scope, Notification, checkoutService, checkOutState, localeService) {
        $scope._defaultProps = {}, $scope._defaultState = {
            isSelected: !1
        }, $scope.$watch("props", function(newValue) {
            $scope._props = angular.extend({}, $scope._defaultProps, newValue);
        }), $scope.$watch("state", function(newValue) {
            $scope._state = angular.extend({}, $scope._defaultState, newValue);
        }), $scope.makeAChange = function() {
            return $scope._state.isSaving = !0, checkOutState.steps.PAYMENT_INFORMATION.isLoading = !0, 
            checkoutService.setMakeAChange($scope._state.isSelected).then(function(result) {
                checkOutState.steps.PAYMENT_INFORMATION.isLoading = !1, $scope._state.isSaving = !1, 
                checkoutService.generalData.cartData = result.cartData;
            }, function(error) {
                $scope._state.isSaving = !1, Notification.error(error.message);
            });
        }, $scope.currencyName = "GBP" === localeService.getCurrencyCode() ? "pound" : "dollar";
    } ], templateUrl = exports.cabiApp.componentURL + "/makeAChange/makeAChange.html", directive = [ function() {
        return exports.cabiApp.extendDirective({
            controllerAs: "makeAChangeCtrl",
            controller: controller,
            templateUrl: templateUrl
        });
    } ];
    angular.module(exports.cabiApp.componentModuleName).directive("makeAChange", directive);
}(angular, window), function(angular, exports) {
    exports.cabiApp = exports.cabiApp || {};
    var controller = [ "$scope", "checkOutState", "urlParametersService", function($scope, checkOutState, urlParametersService) {
        urlParametersService.loadParametersFromUrl(), $scope.profile.hideCommPref = urlParametersService.getParameter(urlParametersService.parameterTypes.HIDE_COMM_PREF), 
        $scope.globalState = checkOutState, $scope.isCreditCardAdded = function(paymentMethod) {
            if (!paymentMethod) return !1;
            if (!angular.isObject($scope.cart)) return !1;
            if (!angular.isObject($scope.cart.cartData)) return !1;
            for (var i = 0; i < $scope.cart.cartData.paymentMethods.length; i++) {
                if ($scope.cart.cartData.paymentMethods[i].paymentMethodId === paymentMethod.paymentMethodId) return !0;
            }
        }, $scope.goToCartPage = function() {
            location.href = "/cart";
        }, $scope.isCreditCard = function(paymentMethod) {
            return "CREDIT_CARD" === paymentMethod.paymentMethodTypeId;
        }, $scope.profile.communication = {
            email: !1,
            txt: !1,
            phone: !1,
            no: !1
        }, $scope.deselectNoPreference = function() {
            $scope.profile.communication.no = !1;
        }, $scope.deselectAllPreferences = function() {
            $scope.profile.communication.email = !1, $scope.profile.communication.txt = !1, 
            $scope.profile.communication.phone = !1;
        }, $scope.$watch("profile.mobilePhone2", function() {
            if ($scope.commForm.mobilePhone2) $scope.profile.mobilePhone2Invalid = $scope.commForm.mobilePhone2.$invalid;
        });
    } ], templateUrl = exports.cabiApp.componentURL + "/orderConfirmation/orderConfirmation.html", directive = [ function() {
        return {
            scope: {
                cart: "=cartData",
                profile: "="
            },
            controllerAs: "orderConfirmationCtrl",
            controller: controller,
            templateUrl: templateUrl
        };
    } ];
    angular.module(exports.cabiApp.componentModuleName).directive("orderConfirmation", directive);
}(angular, window), function(angular, exports) {
    exports.cabiApp = exports.cabiApp || {};
    var controller = [ "$scope", "$rootScope", function($scope, $rootScope) {
        if ($scope.props) $scope.props = {};
        if ($scope.state) $scope.state = {};
        $scope.$watch("active", function() {
            if ($scope.active) $scope.isActive = !0;
        }), $scope.selectDeSelectPaymentMethod = function() {
            if (!$scope.isActive) $rootScope.$broadcast("deselectPaymentMethod", $scope.type); else $rootScope.$broadcast("selectPaymentMethod", $scope.type);
        };
    } ], templateUrl = exports.cabiApp.componentURL + "/paymentMethod/paymentMethod.html", directive = [ function() {
        return exports.cabiApp.extendDirective({
            scope: {
                title: "@",
                description: "@",
                active: "=",
                classes: "@",
                type: "@"
            },
            transclude: !0,
            controllerAs: "paymentMethodCtrl",
            controller: controller,
            templateUrl: templateUrl
        });
    } ];
    angular.module(exports.cabiApp.componentModuleName).directive("paymentMethod", directive);
}(angular, window), function(angular, exports) {
    exports.cabiApp = exports.cabiApp || {};
    var controller = [ "$scope", "Notification", "authServiceNew", "AttachedEcommModalService", function($scope, Notification, authServiceNew, AttachedEcommModalService) {
        $scope._defaultProps = {}, $scope._defaultState = {}, $scope.$watch("props", function(newValue) {
            $scope._props = angular.extend({}, $scope._defaultProps, newValue);
        }), $scope.$watch("state", function(newValue) {
            $scope._state = angular.extend({}, $scope._defaultState, newValue);
        }), $scope.updateProfile = function() {
            if (!$scope.profileForm.$invalid) {
                var $model = $scope.model;
                $scope._state.isLoading = !0, authServiceNew.updateProfile($model.firstName, $model.lastName, $model.emailAddress).then(function() {
                    $scope._state.isLoading = !1, Notification.success("Profile has been updated");
                }, function(error) {
                    $scope._state.isLoading = !1, Notification.error(error.message);
                });
            }
        }, $scope.forgotPassword = function() {
            AttachedEcommModalService.open({
                component: "account.forgot-password",
                moduleData: {
                    callback: function() {
                        window.location.href = "/?component=account.login-gateway";
                    }
                }
            });
        };
    } ], templateUrl = exports.cabiApp.componentURL + "/profileForm/profileForm.html", directive = [ function() {
        return exports.cabiApp.extendDirective({
            scope: {
                model: "="
            },
            controllerAs: "profileFormCtrl",
            controller: controller,
            templateUrl: templateUrl
        });
    } ];
    angular.module(exports.cabiApp.componentModuleName).directive("profileForm", directive);
}(angular, window), function(angular) {
    var controller = [ "$scope", function($scope) {
        $scope.classes = $scope.classes || "pull-right btn", $scope.buttonType = $scope.buttonType || "submit", 
        $scope.caption = $scope.caption || "Save";
    } ], directive = [ function() {
        return {
            replace: !0,
            scope: {
                buttonType: "@",
                isLoading: "=?",
                isDisabled: "=",
                classes: "@"
            },
            controllerAs: "submitBtnCtrl",
            controller: controller,
            template: '<button type="{{buttonType}}" class="{{classes}}" ng-class="{loading: isLoading}"ng-disabled="isDisabled || isLoading"><preloader></preloader><span>{{caption}}</span></button>'
        };
    } ];
    angular.module("cabi.ecommerce.components").directive("submitBtn", directive);
}(angular), function(angular, exports) {
    exports.cabiApp = exports.cabiApp || {};
    var controller = [ "$scope", "checkoutService", function($scope, checkoutService) {
        $scope.cart = checkoutService;
    } ], templateUrl = exports.cabiApp.componentURL + "/totalRemainig/totalRemainig.html", directive = [ function() {
        return exports.cabiApp.extendDirective({
            controllerAs: "totalRemainigCtrl",
            controller: controller,
            templateUrl: templateUrl
        });
    } ];
    angular.module(exports.cabiApp.componentModuleName).directive("totalRemainig", directive);
}(angular, window), angular.module("cabi.api.adapters").constant("errorEnum", {
    GENERAL: {
        code: 0,
        message: "Server error"
    },
    EMAIL_ADDRESS_REQUIRED: {
        code: -30001
    },
    ADDRESS_TYPE_REQUIRED: {
        code: -30002
    },
    ADDRESS_FIELDS_REQUIRED: {
        code: -30003
    },
    NO_CONSULTANT_FOUND: {
        code: -30004
    },
    CONSULTANT_PARTYID_REQUIRED: {
        code: -30004
    },
    REQUIRED_PARAMETER_MISSING: {
        code: -30005
    },
    REPLICATED_SITE_NOT_EXISTS: {
        code: -30006
    },
    CONTACT_NOT_FOUND: {
        code: -30007
    },
    REQUIRED_PRODUCT_ID: {
        code: -30008
    },
    MINIMUM_ADDRESS_FIELDS: {
        code: -30009
    },
    INVALID_CONSULTANT: {
        code: -30010
    },
    INVALID_ADDRESS: {
        code: -30011
    },
    REPLICATED_SITE_NAME_REQUIRED: {
        code: -30012
    },
    SHOW_ID_REQUIRED: {
        code: -30013
    },
    NO_RESULT_FOUND: {
        code: -30022
    },
    GUEST_DOESNT_HAVE_AN_USER_LOGIN: {
        code: -30031
    },
    STYLIST_SEARCH_FAIL: {
        code: -30036
    },
    PASSWORD_CHANGE_REQUIRED: {
        code: -30067
    },
    LOGIN_ID_IS_NOT_GUEST_OR_CONSULTANT: {
        code: -30080
    },
    BAD_DOMAIN_CAN: {
        code: -30083
    },
    BAD_DOMAIN_GBR: {
        code: -30084
    },
    BAD_DOMAIN_USA: {
        code: -30085
    },
    NO_USERLOGIN_FOUND: {
        code: -30501,
        message: "Your username is incorrect or cannot be found."
    },
    USERNAME_EMPTY: {
        code: -30502
    },
    PASSWORD_EMPTY: {
        code: -30503
    },
    INCORRECT_PASSWORD: {
        code: -30504,
        message: "Password does not match email provided."
    },
    INVALID_CREDENTIALS: {
        code: -30505
    },
    NO_GUEST_IN_ADDRESSBOOK: {
        code: -30506,
        message: "Shopping with a new Stylist? Please verify your information and set a new password."
    },
    MULTIPLE_GUEST_IN_ADDRESSBOOK: {
        code: -30507
    },
    PASSWORD_CHANGE_NOT_ALLOWED: {
        code: -30508
    },
    UNABLE_PASSWORD_UPDATE: {
        code: -30509
    },
    INVALID_USER: {
        code: -300510
    },
    USERLOGIN_DISABLED: {
        code: -300511
    },
    LOGOUT_ERROR: {
        code: -30512
    },
    NOT_LOGGED_IN: {
        code: -30513
    },
    REQUIRED_PASSWORD_FIELD: {
        code: -30514
    },
    MATCHING_NEW_PASSWORD: {
        code: -30515
    },
    PASSWORD_TOO_SHORT: {
        code: -30516
    },
    ERROR_CREATING_GUEST_USERLOGIN: {
        code: -30517
    },
    NO_PERMISSION_UPDATE_PASSWORD: {
        code: -30518
    },
    OLD_PASSWORD_WRONG: {
        code: -30519
    },
    PASSWORD_MUST_DIFF_TO_LAST: {
        code: -30520
    },
    PASSWORD_DIFF_TO_USERNAME: {
        code: -30521
    },
    ERROR_CREATE_UPDATE_CREDIT_CARD: {
        code: -30522
    },
    CREDIT_CARD_NUMBER_MISSING: {
        code: -30523
    },
    CREDIT_CARD_NUMBER_INVALID: {
        code: -30524
    },
    CREDIT_CARD_EXXPIRY_DATE: {
        code: -30525,
        message: "This card is expired; please update the expiration date."
    },
    USER_LOGIN_EXISTS: {
        code: -30526
    },
    ERROR_IN_LOGIN: {
        code: -30527
    },
    ERROR_CHANGE_PASSWORD: {
        code: -30528
    },
    NO_PERMISSION_CREATE_USER_LOGIN: {
        code: -30529
    },
    MUST_LOGIN_TO_CREATE_USER_LOGIN: {
        code: -30530
    },
    ERROR_CREATE_CONTACT: {
        code: -30531
    },
    ERROR_CREATE_USER_LOGIN: {
        code: -30532
    },
    ERROR_UPDATE_CONTACT: {
        code: -30533
    },
    ERROR_UPDATE_USER_LOGIN: {
        code: -30534
    },
    NO_PRIMARY_EMAIL_SET: {
        code: -30535
    },
    CONTACT_FOUND_IN_CONSULTANT_ADDRESSBOOK: {
        code: -30536
    },
    CONTACT_FOUND_IN_OTHER_ADDRESSBOOK: {
        code: -30537
    },
    CONSULTANT_EMAIL_ADDRESS: {
        code: -30538
    },
    NO_MATCHED_ADDRESS_FOUND: {
        code: -30539
    },
    INVALID_PRODUCT: {
        code: -30601
    },
    PRODUCT_NOT_ALLOWED: {
        code: -30602
    },
    PRODUCT_NOT_ALLOWED_FOR_SHOW: {
        code: -30605,
        message: "This product isn't available for purchase on a show order"
    },
    PRODUCT_OUT_OF_STOCK: {
        code: -30603
    },
    PRODUCT_CATEGORY_NOT_FOUND: {
        code: -30604
    },
    SHOW_NOT_FOUND: {
        code: -30701
    },
    INVALID_CONSULTANT_FOR_SHOW: {
        code: -30702
    },
    NO_PERMISSION_TO_ADD_GUEST: {
        code: -300703
    },
    ERROR_ON_ADD_GUEST_IN_SHOW: {
        code: -300704
    },
    SHOW_CLOSED: {
        code: -30705
    },
    SHOW_NOT_STARTED: {
        code: -30706
    },
    UNABLE_TO_UPDATE_ITEM: {
        code: -30801
    },
    SHIPPING_ADDR_TYPE_REQUIRED: {
        code: -30802
    },
    INVALID_SHIPPING_ADDR_TYPE: {
        code: -30803
    },
    UNABLE_TO_CREATE_ORDER: {
        code: -30804
    },
    SHIPPING_ADDRESS_MISSING: {
        code: -30805
    },
    PAYMENT_INFO_MISSING: {
        code: -30806
    },
    UNABLE_TO_UPDATE_ORDER: {
        code: -30807
    },
    SHOW_NOT_IN_OPEN_STATUS: {
        code: -30808
    },
    PAYMENT_METOHD_REQUIRED: {
        code: -30809
    },
    PAYMENT_AMOUNT_REQUIRED: {
        code: -30810
    },
    MANUAL_DISCOUNT_EXCEED: {
        code: -30811
    },
    QUANTITY_EMPTY_OR_NON_INTEGER: {
        code: -30812
    },
    CHECKOUT_GUEST_REQUIRED: {
        code: -30813
    },
    INVALID_PAYMENT_METHOD: {
        code: -30814
    },
    INVALID_PLACING_CUSTOMER: {
        code: -30815
    },
    GUEST_HAS_SHOW_ORDER: {
        code: -30816,
        message: "It looks like your Stylist already has an order in the works for you. Contact your Stylist to add items to your existing order."
    },
    GUEST_IS_HOSTESS: {
        code: -30819
    },
    GUEST_IS_COHOSTESS: {
        code: -30820
    },
    GUEST_IS_REFERRER: {
        code: -30821
    },
    INVALID_EMAIL_ADDRESS: {
        code: -30824,
        message: "Invalid e-mail address"
    },
    NOT_ENOUGH_BALANCE: {
        code: -30901
    },
    INSUFFICIENT_BALANCE: {
        code: -30902
    },
    LESS_PAYMENT_THAN_ORDER: {
        code: -30903
    },
    GREATER_PAYMENT_THAN_ORDER: {
        code: -30904
    },
    INVALID_GIFT_CARD: {
        code: -31100
    },
    GIFT_CARD_NOT_APPROVED: {
        code: -31101
    },
    GIFT_CARD_NOT_ACTIVE: {
        code: -31102
    },
    GIFT_CARD_EXPIRED: {
        code: -31103
    },
    CARD_BALANCE_NULL: {
        code: -31104
    }
}), angular.module("cabi.api.service").factory("addressService", [ "$rootScope", "$http", "clioApiAdapter", "authServiceNew", "checkoutService", function($rootScope, $http, clioApiAdapter, authServiceNew, checkoutService) {
    return {
        validatePostalAddress: function(address1, address2, city, postalCode, stateProvinceGeoId) {
            return clioApiAdapter.get("ValidatePostalAddress", {
                address1: address1,
                address2: address2,
                city: city,
                postalCode: postalCode,
                stateProvinceGeoId: stateProvinceGeoId
            });
        },
        saveAddress: function(firstName, lastName, type, address1, address2, city, stateProvinceGeoId, postalCode, countryGeoId, isValidated, setOnCart, setOnProfile) {
            return clioApiAdapter.get("CreateUpdateAddress", {
                firstName: firstName,
                lastName: lastName,
                type: type,
                address1: address1,
                address2: address2,
                city: city,
                stateProvinceGeoId: stateProvinceGeoId,
                postalCode: postalCode,
                countryGeoId: countryGeoId,
                isValidated: isValidated ? "Y" : "N",
                setOnCart: setOnCart ? "Y" : "N",
                setOnProfile: setOnProfile ? "Y" : "N"
            });
        }
    };
} ]), function(angular) {
    angular.module("cabi.api.service").factory("checkoutService", [ "$rootScope", "$q", "$timeout", "$http", "$filter", "clioApiAdapter", "checkOutState", "cartService", function($rootScope, $q, $timeout, $http, $filter, clioApiAdapter, checkOutState, cartService) {
        var exports = {
            data: null,
            generalData: {},
            lastOrder: null,
            remainingTotalOrder: 0,
            totalCreditCardsAdded: 0,
            totatGiftCardsAdded: 0
        };
        exports.syncData = _syncData;
        function _syncData(data) {
            var lastCreditCardSelected;
            if (data.cartData) if (cartService.forceCartUpdate(data), exports.generalData = data, 
            exports.remainingTotalOrder = $filter("remainingCartTotal")(data.cartData.paymentMethods, data.cartData.grandTotal), 
            exports.totalCreditCardsAdded = $filter("getTotalPaymentMethodAddedByType")(data.cartData.paymentMethods, "CREDIT_CARD"), 
            exports.totatGiftCardsAdded = $filter("getTotalPaymentMethodAddedByType")(data.cartData.paymentMethods, "GIFT_CARD"), 
            lastCreditCardSelected = $filter("getLastCreditCardAdded")(data.cartData.paymentMethods)) exports.lastCreditCardSelected = lastCreditCardSelected, 
            checkOutState.creditCard = lastCreditCardSelected.paymentMethodId;
        }
        return exports.setShowId = function(showId) {
            return clioApiAdapter.get("SetShowId", {
                showId: showId
            }, !0).then(function(result) {
                return $rootScope.$broadcast("SetShowId", result), result;
            });
        }, exports.preCheckout = function() {
            return clioApiAdapter.get("PreCheckout", {}).then(function(result) {
                return $rootScope.$broadcast("PreCheckout", result), result;
            });
        }, exports.isShippingAddressSameAsShow = function() {
            return "shloc" === exports.generalData.selectedSippingAddressType;
        }, exports.getCurrentSelectedSippingAddressType = function() {
            return exports.generalData.selectedSippingAddressType;
        }, exports.setShippingAddressType = function(shippingAddressType) {
            return clioApiAdapter.get("SetShippingAddressType", {
                shippingAddressType: shippingAddressType
            }).then(function(result) {
                return $rootScope.$broadcast("SetShippingAddressType", result), _syncData(result), 
                result;
            });
        }, exports.setShippingMethod = function(carrierPartyId, shipmentMethodTypeId) {
            return clioApiAdapter.get("SetShippingMethod", {
                carrierPartyId: carrierPartyId,
                shipmentMethodTypeId: shipmentMethodTypeId
            }).then(function(result) {
                return $rootScope.$broadcast("SetShippingMethod", result), _syncData(result), result;
            });
        }, exports.setMakeAChange = function(apply) {
            return clioApiAdapter.get("SetMakeAChange", {
                apply: apply ? "true" : "false"
            }).then(function(result) {
                return $rootScope.$broadcast("SetMakeAChange", result), _syncData(result), result;
            });
        }, exports.submitOrder = function() {
            return clioApiAdapter.get("SubmitOrder", {}).then(function(result) {
                return $rootScope.$broadcast("SubmitOrder", result), exports.getCart(), result;
            });
        }, exports.submitOrderWithStylist = function() {
            return clioApiAdapter.get("SubmitOrderWithStylist", {}).then(function(result) {
                return $rootScope.$broadcast("SubmitOrderWithStylist", result), exports.getCart(), 
                result;
            });
        }, exports.prepareGuestOrder = function(emailAddress, phoneNumber, firstName, lastName, guestConsultantPartyId) {
            return clioApiAdapter.get("PrepareGuestOrder", {
                emailAddress: emailAddress,
                phoneNumber: phoneNumber,
                firstName: firstName,
                lastName: lastName,
                consultantPartyId: guestConsultantPartyId
            });
        }, exports.submitGuestOrder = function(communication, phoneNumber) {
            return clioApiAdapter.get("SubmitGuestOrder", {
                communication: communication,
                phoneNumber: phoneNumber
            }).then(function(result) {
                return $rootScope.$broadcast("SubmitGuestOrder", result), exports.getCart(), result;
            });
        }, exports.setPaymentAmount = function(paymentMethodId, cardNumber, amount) {
            return clioApiAdapter.get("SetPaymentAmount", {
                paymentMethodId: paymentMethodId,
                cardNumber: cardNumber,
                amount: amount
            }).then(function(result) {
                return $rootScope.$broadcast("SetPaymentAmount", result), _syncData(result), result;
            });
        }, exports.removePaymentMethodsByType = function(type) {
            var deferred = $q.defer(), creditCards = function(type) {
                var creditCards = [];
                if (!angular.isObject(exports.generalData.cartData)) return [];
                if (!angular.isArray(exports.generalData.cartData.paymentMethods)) return []; else return angular.forEach(exports.generalData.cartData.paymentMethods, function(paymentMethod) {
                    if (paymentMethod.paymentMethodTypeId != type) return !1;
                    creditCards.push(paymentMethod);
                }), creditCards;
            }(type), creditCardsRemoved = 0;
            if (!creditCards.length) $timeout(function() {
                deferred.resolve(creditCards);
            }); else angular.forEach(creditCards, function(creditCard) {
                exports.setPaymentAmount(creditCard.paymentMethodId, null, 0).then(function(response) {
                    if ((creditCardsRemoved += 1) === creditCards.length) deferred.resolve(creditCards);
                });
            });
            return deferred.promise;
        }, exports.removePaymentAmount = function(paymentMethodId, cardNumber) {
            return clioApiAdapter.get("SetPaymentAmount", {
                paymentMethodId: paymentMethodId,
                cardNumber: cardNumber,
                amount: 0
            }).then(function(result) {
                return $rootScope.$broadcast("SetPaymentAmount", result), _syncData(result), result;
            });
        }, exports.setCartItem = function(productId, quantity) {
            return clioApiAdapter.get("SetCartItem", {
                productId: productId,
                quantity: quantity
            }).then(function(result) {
                return $rootScope.$broadcast("SetCartItem", result), _syncData(result), result;
            });
        }, exports.getGiftCard = function(cardNumber) {
            return clioApiAdapter.get("GetGiftCard", {
                cardNumber: cardNumber
            });
        }, exports.setGiftCard = function(cardNumber, amount) {
            return exports.setPaymentAmount(null, cardNumber, amount);
        }, exports.setCreditCard = function(creditCardId, amount) {
            return exports.setPaymentAmount(creditCardId, null, amount);
        }, exports.getCart = function() {
            return clioApiAdapter.get("GetCart", {}).then(function(result) {
                return $rootScope.$broadcast("GetCart", result), _syncData(result), result;
            });
        }, exports;
    } ]);
}(angular), function(angular) {
    angular.module("cabi.api.service").factory("creditCardService", [ "$http", "$timeout", "$q", "clioApiAdapter", "checkoutService", "authServiceNew", function($http, $timeout, $q, clioApiAdapter, checkoutService, authServiceNew) {
        var exports = {}, _updateIndexes = function() {
            exports.dataIndexes = [];
            for (var i = 0; i < exports.data.length; i++) exports.dataIndexes.push(exports.data[i].paymentMethodId);
        }, _getCreditCartFromProfile = function(creditCardNumber) {
            var creditCardFound = !1, user = authServiceNew.user;
            if (angular.isObject(user)) return !1;
            if (angular.isArray(user.creditCards)) return !1; else return angular.forEach(user.creditCards, function(creditCard) {
                if (creditCardNumber == creditCard.cardNumber) creditCardFound = creditCard;
            }), creditCardFound;
        }, _synCheckOutData = function(data) {
            checkoutService.syncData(data);
        }, _syncProfileData = function(creditCard, isNew) {
            var profileData = angular.copy(authServiceNew.user);
            if (angular.isObject(profileData)) {
                if (isNew) {
                    if (!profileData.creditCards) profileData.creditCards = [];
                    profileData.creditCards.push(creditCard);
                } else for (var i = 0; i < profileData.creditCards.length; i++) {
                    if (profileData.creditCards[i].paymentMethodId == creditCard.paymentMethodId) profileData.creditCards[i] = creditCard;
                }
                authServiceNew.sync(profileData);
            }
        };
        return exports.data = [], exports.dataIndexes = [], exports.sync = function(data) {
            if (angular.isArray(data)) _updateIndexes(); else if (angular.isObject(data)) !function(creditCard) {
                if (creditCard) {
                    var position = exports.dataIndexes.indexOf(creditCard.paymentMethodId);
                    if (-1 != position) exports.data[position] = creditCard; else {
                        if (!creditCard.paymentMethodId) return;
                        exports.data.push(creditCard), _updateIndexes();
                    }
                }
            }(data.creditCard);
        }, exports.saveCreditCard = function(paymentMethodId, firstName, lastName, cardType, expMonth, expYear, cardNumber, contactMechId, address1, address2, city, stateProvinceGeoId, postalCode, countryGeoId, cartAmount) {
            return $q(function(resolve, reject) {
                var isNew = !paymentMethodId;
                if (!_getCreditCartFromProfile(creditCardNumber)) {
                    var creditCardNumber;
                    if (!((firstName + lastName).length > 35)) if (contactMechId) clioApiAdapter.get("CreateUpdateCreditCard", {
                        paymentMethodId: paymentMethodId,
                        firstName: firstName,
                        lastName: lastName,
                        cardType: cardType,
                        expMonth: expMonth,
                        expYear: expYear,
                        cardNumber: cardNumber,
                        contactMechId: contactMechId,
                        cartAmount: cartAmount
                    }).then(function(result) {
                        if (result.cartData) _synCheckOutData(result), authServiceNew.getProfile(); else if (result.creditCard) _syncProfileData(result.creditCard, isNew);
                        resolve(result);
                    }, function(error) {
                        reject(error);
                    }); else clioApiAdapter.get("CreateUpdateCreditCard", {
                        paymentMethodId: paymentMethodId,
                        firstName: firstName,
                        lastName: lastName,
                        cardType: cardType,
                        expMonth: expMonth,
                        expYear: expYear,
                        cardNumber: cardNumber,
                        contactMechId: contactMechId,
                        address1: address1,
                        address2: address2,
                        city: city,
                        stateProvinceGeoId: stateProvinceGeoId,
                        postalCode: postalCode,
                        countryGeoId: countryGeoId,
                        cartAmount: cartAmount
                    }).then(function(result) {
                        if (result.cartData) _synCheckOutData(result); else if (result.creditCard) _syncProfileData(result.creditCard, isNew);
                        resolve(result);
                    }, function(error) {
                        reject(error);
                    }); else reject({
                        message: "The maximum size of the name cannot exceed 35 characters"
                    });
                } else reject({
                    message: "Sorry, this card is a duplicate of one you already have on your profile"
                });
            });
        }, exports.removeCreditCard = function(paymentMethodId, guestCheckout = !1) {
            return $q(function(resolve, reject) {
                clioApiAdapter.get("RemoveCreditCard", {
                    paymentMethodId: paymentMethodId
                }).then(function(result) {
                    if (!guestCheckout) !function(profileData) {
                        authServiceNew.sync(profileData);
                    }(result); else {
                        var profileData = angular.copy(authServiceNew.user);
                        if (!angular.isObject(profileData)) return;
                        profileData.creditCards = [], authServiceNew.sync(profileData);
                    }
                    resolve(result);
                }, function(error) {
                    reject(error);
                });
            });
        }, exports;
    } ]);
}(angular), angular.module("cabi.api.service").factory("profileService", [ "$http", "$rootScope", "clioApiAdapter", "stylistInfoService", function($http, $rootScope, clioApiAdapter, stylistInfoService) {
    var exports = {
        getProfile: function() {
            return clioApiAdapter.get("MyProfile", {}).then(function(result) {
                return $rootScope.$broadcast("MyProfile", result), result;
            });
        },
        updateProfile: function(firstName, lastName, emailAddress) {
            return clioApiAdapter.get("UpdateProfile", {
                firstName: firstName,
                lastName: lastName,
                emailAddress: emailAddress
            }).then(function(result) {
                return $rootScope.$broadcast("UpdateProfile", result), result;
            });
        },
        createProfile: function(firstName, lastName, emailAddress, password, passwordVerify) {
            return clioApiAdapter.get("CreateProfile", {
                firstName: firstName,
                lastName: lastName,
                emailAddress: emailAddress,
                password: password,
                passwordVerify: passwordVerify,
                loginUrl: "https://" + window.location.hostname + "/account/#/change-password"
            });
        },
        changePassword: function(username, password, newPassword, newPasswordVerify) {
            return clioApiAdapter.get("ChangePassword", {
                username: username.trim(),
                password: password.trim(),
                newPassword: newPassword,
                newPasswordVerify: newPasswordVerify
            });
        },
        login: function(email, password) {
            return clioApiAdapter.get("Login", {
                username: email,
                password: password
            });
        },
        logout: function() {
            return clioApiAdapter.get("Logout", {});
        },
        searchEmail: function(email) {
            return clioApiAdapter.get("ValidateEmailAddress", {
                emailAddress: email
            });
        },
        setGuestEmail: function(email) {
            return clioApiAdapter.get("SetGuestEmail", {
                emailAddress: email
            });
        },
        resetPassword: function(email) {
            return clioApiAdapter.get("ResetPassword", {
                emailAddress: email,
                loginUrl: "https://" + window.location.hostname + "/account/#/change-password"
            });
        }
    };
    return exports;
} ]), angular.module("cabi.api.service").factory("stateService", [ "states", "$q", "clioApiAdapter", function(states, $q, clioApiAdapter) {
    var exports = {
        stateProvinceList: null,
        stateLabel: null,
        all: function() {
            return $q(function(resolve, reject) {
                if (exports.stateProvinceList) return resolve({
                    list: exports.stateProvinceList,
                    label: exports.stateLabel
                }), exports.stateProvinceList;
                clioApiAdapter.get("GetStateProvinceList", {}).then(function(result) {
                    return exports.stateProvinceList = result.list, exports.stateLabel = result.label, 
                    resolve(result), result;
                }, function(result) {
                    reject(result);
                });
            });
        }
    };
    return exports;
} ]), function(angular) {
    "use strict";
    angular.module("cabi.auth", [ "cabi.api" ]).factory("authServiceNew", [ "$http", "$q", "$log", "clioApiAdapter", "profileService", function($http, $q, $log, clioApiAdapter, profileService) {
        var exports = {
            user: null,
            consultant: {}
        };
        exports.login = function(username, password) {
            return clioApiAdapter.get("Login", {
                username: username.trim(),
                password: password.trim(),
                consultantPartyId: CABI_STYLIST_INFO.PartyId
            }).then(function(response) {
                return response;
            });
        }, exports.loginAsGuest = function(email) {
            var defer = $q.defer();
            return profileService.setGuestEmail(email).then(function(result) {
                return defer.resolve(result), result;
            }, function(error) {
                defer.reject(error);
            }), defer.promise;
        }, exports.logout = function() {
            return clioApiAdapter.get("Logout").finally(function(result) {
                return exports.forceLogout(), result;
            });
        }, exports.getProfile = function() {
            var defer = $q.defer();
            return profileService.getProfile().then(function(result) {
                return _syncUser(result), defer.resolve(result), result;
            }, function(error) {
                defer.reject(error);
            }), defer.promise;
        }, exports.updateProfile = function(firstName, lastName, emailAddress) {
            var defer = $q.defer();
            return profileService.updateProfile(firstName, lastName, emailAddress).then(function(result) {
                return exports.sync(result), defer.resolve(result), result;
            }, function(error) {
                defer.reject(error);
            }), defer.promise;
        }, exports.changePassword = function(username, password, newPassword, newPasswordVerify) {
            var defer = $q.defer();
            return profileService.changePassword(username, password, newPassword, newPasswordVerify).then(function(result) {
                return exports.sync(result), defer.resolve(result), result;
            }, function(error) {
                defer.reject(error);
            }), defer.promise;
        }, exports.createProfile = function(firstName, lastName, email, password, passwordVerify) {
            var defer = $q.defer();
            return profileService.createProfile(firstName, lastName, email, password, passwordVerify).then(function(result) {
                return _syncUser(result), defer.resolve(result), result;
            }, function(error) {
                defer.reject(error);
            }), defer.promise;
        }, exports.subscribeToMailingList = function(emailAddress) {
            var defer = $q.defer(), url = "/wp-admin/admin-ajax.php?action=mailinglist_signup&email=" + emailAddress;
            return $http.get(url).then(function(result) {
                if (!angular.isObject(result.data)) return defer.reject({
                    message: "Server error, Please try again."
                }); else $log.debug(result.data);
                return defer.resolve(result.data);
            }, function(error) {
                return defer.reject(error);
            }), defer.promise;
        }, exports.isAuthenticated = function() {
            return !!exports.user;
        }, exports.refreshProfile = function() {
            var defer = $q.defer();
            return profileService.getProfile().then(function(result) {
                return _syncUser(), defer.resolve(result), result;
            }, function(error) {
                defer.reject(error);
            }), defer.promise;
        }, exports.haveSession = function() {
            return profileService.getProfile();
        }, exports.getSession = function() {
            return exports.haveSession();
        }, exports.forceLogin = function(user) {
            _syncUser(user);
        }, exports.forceLogout = function() {
            _syncUser(null);
        }, exports.isLogin = function() {
            return $q(function(resolve, reject) {
                if (exports.isAuthenticated()) resolve(exports.user); else exports.haveSession().then(function(result) {
                    exports.forceLogin(result), resolve(result);
                }, function(error) {
                    reject(error);
                });
            });
        }, exports.sync = function(data) {
            _syncUser(data);
        };
        var _syncUser = function(user) {
            exports.user = user;
        };
        return exports;
    } ]);
}(angular), function() {
    var modalErrorController = [ "$scope", "$window", "checkoutService", function($scope, $window, checkoutService) {
        $scope.state = {}, $scope.clearShowId = function() {
            $scope.state.isLoading = !0, checkoutService.setShowId("").then(function() {
                $scope.state.isLoading = !1, $window.location.reload();
            }, function(error) {
                $scope.state.isLoading = !1, alert(error.message);
            });
        };
    } ], modalErrorController2 = [ "$scope", function($scope) {
        $scope.state = {}, $scope.clearShowId = function() {
            $scope.state.isLoading = !0, window.location.href = "/collection/clothes";
        };
    } ];
    angular.module("cabi.ecommorce.checkout").controller("checkOutController", [ "$scope", "$state", "ngDialog", "authServiceNew", "checkoutService", "VIEW_PATH", "errorEnum", "Notification", function($scope, $state, ngDialog, authServiceNew, checkoutService, VIEW_PATH, errorEnum, Notification) {
        $scope.profile = authServiceNew, $scope.checkout = checkoutService, $scope.state = {}, 
        $scope.customMessage = "", $scope.isReplicatedSite = !!window.CABI_STYLIST_INFO;
        $scope.state.isLoading = !0, checkoutService.preCheckout().then(function(result) {
            return $scope.state.isLoading = !1, checkoutService.getCart().then(function(result2) {
                if ($scope.showOrderFlows = null !== result2.cartData.workEffortId, $scope.customMessage = "Planning to add your order to a Hostess’ show? Right now, your order isn’t connected to a show. Check your inbox for the email sent from your Stylist or Hostess—use the shopping link in that email to ensure you’re shopping the show! If you didn’t receive an email, reach out to your Stylist or Hostess", 
                result2 && result2.cartData && result2.cartData.items && result2.cartData.items.length > 0) return $scope.state.hasError = !1, 
                result2; else $scope.state.hasError = !0, $scope.checkoutError = {
                    title: "Oops!",
                    message: "Your bag is empty."
                }, ngDialog.open({
                    template: VIEW_PATH + "/checkoutError.html",
                    controller: modalErrorController2,
                    scope: $scope,
                    showClose: !1
                });
            }), result;
        }, function(error) {
            switch ($scope.state.hasError = !0, $scope.state.isLoading = !1, $scope.checkoutError = error, 
            $scope.checkoutError.title = "Oops!", error.code) {
              case errorEnum.GUEST_IS_HOSTESS.code:
                $scope.checkoutError.title = "Hello, Hostess!", $scope.checkoutError.message = "Since you are the host (with the most) of this show, your Stylist will complete your order for you, rather than you processing it online.";
                break;

              case errorEnum.GUEST_IS_COHOSTESS.code:
                $scope.checkoutError.title = "Hello, Co-Hostess!", $scope.checkoutError.message = "Since you are the co-host (with the most) of this show, your Stylist will complete your order for you, rather than you processing it online.";
                break;

              case errorEnum.GUEST_IS_REFERRER.code:
                $scope.checkoutError.title = "Hello, helpful Hostess Referrer!", $scope.checkoutError.message = "Since your order falls in a special category, your Stylist will complete your order for you, rather than you processing it online.";
            }
            ngDialog.open({
                template: VIEW_PATH + "/checkoutError.html",
                controller: modalErrorController,
                scope: $scope,
                showClose: !1
            });
        });
    } ]);
}(), angular.module("cabi.ecommerce.confirmation").controller("confirmationController", [ "$scope", "$stateParams", "authServiceNew", "localeService", "checkoutService", "GoogleAnalytics", function($scope, $stateParams, authServiceNew, localeService, checkoutService, GoogleAnalytics) {
    if ($stateParams.guestCheckout) GoogleAnalytics.sendEvent("GuestCheckOut", "OrderConfirmation", $scope.guestStylist ? $scope.guestStylist.consultantId : null); else GoogleAnalytics.sendEvent("CheckOut", "OrderConfirmation");
    if ($scope.guestCheckout = $stateParams.guestCheckout, $scope.confirmationId = $stateParams.confirmationId, 
    $scope.giftCards = $stateParams.giftCards, $scope.lastOrder = $stateParams.lastOrder, 
    $scope.guestStylist = $stateParams.guestStylist, $scope.firstName = $stateParams.firstName, 
    $scope.lastName = $stateParams.lastName, $scope.currencyCode = localeService.getCurrencyCode(), 
    $scope.auth = authServiceNew, $scope.imageLoaded = function(stylist) {
        $scope.$apply(function() {
            stylist.imageLoaded = !0;
        });
    }, $scope.gotIt = function() {
        window.location.href = $scope.guestStylist ? $scope.guestStylist.replicatedSiteUrl : "/";
    }, $scope.whatIsCabi = function() {
        window.location.href = "/what-is-cabi";
    }, $scope.lastOrder) fbq("track", "Purchase", {
        value: $scope.lastOrder.grandTotal,
        currency: localeService.getCurrencyCode()
    });
} ]), angular.module("cabi.constants").constant("creditCardTypes", [ {
    id: "AmericanExpress",
    name: "American Express"
}, {
    id: "Discover",
    name: "Discover"
}, {
    id: "MasterCard",
    name: "Master Card"
}, {
    id: "Visa",
    name: "Visa"
} ]), angular.module("cabi.constants").constant("expirationDateOptions", {
    months: function() {
        for (var months = [], i = 1; i <= 12; i++) months.push({
            id: i,
            name: i
        });
        return months;
    }(),
    years: function() {
        for (var years = [], currentYear = new Date().getFullYear(), i = 0; i <= 20; i++) {
            var year = currentYear + i, yearLabel = year.toString().substr(2, 2);
            years.push({
                id: year,
                name: yearLabel
            });
        }
        return years;
    }()
}), angular.module("cabi.constants").constant("states", [ {
    name: "Alabama",
    code: "AL"
}, {
    name: "Alaska",
    code: "AK"
}, {
    name: "Arizona",
    code: "AZ"
}, {
    name: "Arkansas",
    code: "AR"
}, {
    name: "California",
    code: "CA"
}, {
    name: "Colorado",
    code: "CO"
}, {
    name: "Connecticut",
    code: "CT"
}, {
    name: "Delaware",
    code: "DE"
}, {
    name: "District of Columbia",
    code: "DC"
}, {
    name: "Florida",
    code: "FL"
}, {
    name: "Georgia",
    code: "GA"
}, {
    name: "Hawaii",
    code: "HI"
}, {
    name: "Idaho",
    code: "ID"
}, {
    name: "Illinois",
    code: "IL"
}, {
    name: "Indiana",
    code: "IN"
}, {
    name: "Iowa",
    code: "IA"
}, {
    name: "Kansa",
    code: "KS"
}, {
    name: "Kentucky",
    code: "KY"
}, {
    name: "Lousiana",
    code: "LA"
}, {
    name: "Maine",
    code: "ME"
}, {
    name: "Maryland",
    code: "MD"
}, {
    name: "Massachusetts",
    code: "MA"
}, {
    name: "Michigan",
    code: "MI"
}, {
    name: "Minnesota",
    code: "MN"
}, {
    name: "Mississippi",
    code: "MS"
}, {
    name: "Missouri",
    code: "MO"
}, {
    name: "Montana",
    code: "MT"
}, {
    name: "Nebraska",
    code: "NE"
}, {
    name: "Nevada",
    code: "NV"
}, {
    name: "New Hampshire",
    code: "NH"
}, {
    name: "New Jersey",
    code: "NJ"
}, {
    name: "New Mexico",
    code: "NM"
}, {
    name: "New York",
    code: "NY"
}, {
    name: "North Carolina",
    code: "NC"
}, {
    name: "North Dakota",
    code: "ND"
}, {
    name: "Ohio",
    code: "OH"
}, {
    name: "Oklahoma",
    code: "OK"
}, {
    name: "Oregon",
    code: "OR"
}, {
    name: "Pennsylvania",
    code: "PA"
}, {
    name: "Rhode Island",
    code: "RI"
}, {
    name: "South Carolina",
    code: "SC"
}, {
    name: "South Dakota",
    code: "SD"
}, {
    name: "Tennessee",
    code: "TN"
}, {
    name: "Texas",
    code: "TX"
}, {
    name: "Utah",
    code: "UT"
}, {
    name: "Vermont",
    code: "VT"
}, {
    name: "Virginia",
    code: "VA"
}, {
    name: "Washington",
    code: "WA"
}, {
    name: "West Virginia",
    code: "WV"
}, {
    name: "Wisconsin",
    code: "WI"
}, {
    name: "Wyoming",
    code: "WY"
} ]), function(angular) {
    angular.module("cabi.directives").directive("preloader", [ function() {
        return {
            replace: !0,
            scope: {
                color: "@"
            },
            controller: [ "$scope", function($scope) {
                $scope.color = angular.isDefined($scope.color) ? $scope.color : "fff";
            } ],
            template: '<div class="loader"><svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"width="20px" height="20px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"> <path fill="#{{color}}" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"> <animateTransform attributeType="xml"attributeName="transform"type="rotate"from="0 25 25"to="360 25 25"dur="0.6s"repeatCount="indefinite"/></path></svg></div>'
        };
    } ]);
}(angular), function(angular) {
    angular.module("cabi.ecommerce.filters").filter("addressTypeName", [ "$filter", "localeService", "currentLocaleService", function($filter, localeService, currentLocaleService) {
        return function(name) {
            switch (name) {
              case "ga":
              case "myaddr":
                return 'My Address <br> <span class="sub-description">(standard shipping rates will apply)</span>';

              case "oth":
                return 'Other Address <br> <span class="sub-description">(standard shipping rates will apply)</span>';

              case "shloc":
                if ("US" === localeService.findLocaleByCode(currentLocaleService.get(), localeService.getDomainLocale()).code) return 'Show Address <br> <span class="sub-description">(free shipping in the 48 contiguous states)</span>'; else return 'Show Address <br> <span class="sub-description">(standard shipping rates will apply)</span>';

              default:
                return name + " Address";
            }
        };
    } ]);
}(angular), function(angular) {
    angular.module("cabi.ecommerce.filters").filter("cabiCurrency", [ "$filter", "localeService", function($filter, localeService) {
        return function(input) {
            return $filter("currency")(input, localeService.getCurrencySymbol());
        };
    } ]);
}(angular), function(angular) {
    angular.module("cabi.ecommerce.filters").filter("creditCardNumber", function() {
        return function(input) {
            if (angular.isString(input)) if (input.length < 16) return "**** **** **** ****"; else return "**** **** **** " + input.substr(input.length - 4); else return input;
        };
    });
}(angular), function(angular) {
    angular.module("cabi.ecommerce.filters").filter("getLastCreditCardAdded", function() {
        return function(paymentMethods, type) {
            var creditCard = null;
            if (!angular.isArray(paymentMethods)) return creditCard; else return angular.forEach(paymentMethods, function(method) {
                if ("CREDIT_CARD" == method.paymentMethodTypeId) creditCard = method;
            }), creditCard;
        };
    });
}(angular), function(angular) {
    angular.module("cabi.ecommerce.filters").filter("getTotalPaymentMethodAddedByType", function() {
        return function(paymentMethods, type) {
            var count = 0;
            if (!angular.isArray(paymentMethods)) return count; else return angular.forEach(paymentMethods, function(method) {
                if (method.paymentMethodTypeId == type) count++;
            }), count;
        };
    });
}(angular), function(angular) {
    angular.module("cabi.ecommerce.filters").filter("giftCardAmount", function() {
        return function(paymentMethods) {
            var total = 0;
            if (!angular.isArray(paymentMethods)) return total; else return angular.forEach(paymentMethods, function(method) {
                if ("GIFT_CARD" == method.paymentMethodTypeId) total += method.amount;
            }), total;
        };
    });
}(angular), function(angular) {
    angular.module("cabi.ecommerce.filters").filter("remainingCartTotal", function() {
        return function(paymentMethods, totalOrder) {
            if (!angular.isArray(paymentMethods)) return totalOrder;
            var paymentMethodsTotal = 0;
            return angular.forEach(paymentMethods, function(method) {
                paymentMethodsTotal += method.amount;
            }), totalOrder - paymentMethodsTotal;
        };
    });
}(angular), angular.module("cabi.ecommerce.login").controller("changePasswordController", [ "$scope", "$state", "Notification", "profileService", "sharedVariables", "authServiceNew", function($scope, $state, Notification, profileService, sharedVariables, authServiceNew) {
    $scope.isLoading = !1, $scope.changePassword = function() {
        var $model = $scope.changePasswordModel;
        $scope.isLoading = !0, profileService.changePassword($model.username, $model.password, $model.newPassword, $model.newPasswordVerify).then(function(result) {
            authServiceNew.forceLogin(result), Notification.success(result.message ? result.message : "Password updated"), 
            $scope.isLoading = !1, $state.go("profile");
        }, function(error) {
            Notification.error(error.message), $scope.isLoading = !1;
        });
    }, function() {
        $scope.changePasswordModel = $scope.changePasswordModel || {};
        var globalEmail = sharedVariables.get("globalEmail");
        if (globalEmail) $scope.changePasswordModel.userLoginId = globalEmail;
    }();
} ]), angular.module("cabi.ecommerce.login").controller("createAccountController", [ "$scope", "$state", "$stateParams", "$log", "$window", "errorEnum", "authServiceNew", "sharedVariables", "Notification", function($scope, $state, $stateParams, $log, $window, errorEnum, authServiceNew, sharedVariables, Notification) {
    var newAccountEmail = sharedVariables.get("newAccountEmail");
    $scope.showPasswordInput = angular.isUndefined(sharedVariables.get("registerFormWithPassword")) ? !0 : sharedVariables.get("registerFormWithPassword"), 
    $scope.createProfileModel = {}, $scope.createProfileModel.email = newAccountEmail, 
    $scope.createProfileErrors = !1, $scope.isLoading = !1, $scope.createProfile = function() {
        if (!$scope.createProfileForm.$invalid) {
            var $model = $scope.createProfileModel;
            $scope.isLoading = !0, $scope.createProfileErrors = !0, authServiceNew.createProfile($model.firstName, $model.lastName, $model.email, $model.password, $model.passwordVerify).then(function(response) {
                if ($model.suscription) authServiceNew.subscribeToMailingList($model.email).then(function(response) {}, function(error) {
                    $log.debug(error);
                });
                if (sharedVariables.get("contactFoundInOtherAddressBook")) return $scope.isLoading = !1, 
                Notification.success("Thanks for registering, an email has been sent to your account with a temporary password"), 
                void $state.go("login");
                if (Notification.success("Thanks for registering! Your account has been successfully created."), 
                response.session) authServiceNew.getSession().then(function(response) {
                    if ($scope.isLoading = !1, authServiceNew.forceLogin(response), $stateParams.redirectTo) switch ($stateParams.redirectTo) {
                      case "favorites":
                        $window.location.href = "/clothing-collection/wish-list/";
                        break;

                      default:
                        $state.go($stateParams.redirectTo ? $stateParams.redirectTo : "profile");
                    } else $state.go("profile");
                }, function() {
                    $state.go("login");
                }); else $scope.isLoading = !1, $state.go("login");
            }, function(error) {
                $scope.isLoading = !1, $scope.createProfileErrors = {}, Notification.error(error.message);
            });
        }
    };
} ]), function(angular) {
    function LoginController($scope, $q, $window, $location, $stateParams, $state, Notification, errorEnum, profileService, authServiceNew, sharedVariables, checkoutService, Analytics, favoritesService) {
        $scope.isLoginFormSending = !1, $scope.isValidatingEmail = !1, $scope.isLoginAsGuestUser = !1, 
        $scope.loginErrors = !1, $scope.customSearchEmailError = !1, $scope.comesFromCheckout = "checkout" === $stateParams.redirectTo, 
        $scope.customMessage = "", $scope.showOrderFlows = !0;
        function makeRedirectionAfterLogin() {
            switch ($stateParams.redirectTo) {
              case "favorites":
                $window.location.href = "/clothing-collection/wish-list/";
                break;

              default:
                $state.go($stateParams.redirectTo ? $stateParams.redirectTo : "profile");
            }
        }
        $scope.$watch("loginModel", function() {
            $scope.loginErrors = !1;
        }), $scope.onSubmitLoginForm = function() {
            var $model;
            Analytics.sendEvent({
                eventCategory: "Checkout Login Page",
                eventAction: "button-click",
                eventLabel: "sign-in"
            }), $model = $scope.loginModel, $scope.isLoginFormSending = !0, $scope.loginErrors = !1, 
            authServiceNew.login($model.email, $model.password).then(function(response) {
                var data = response;
                if (angular.isDefined(data.requirePasswordChange) && "Y" === data.requirePasswordChange) return sharedVariables.set("globalEmail", $model.email), 
                $state.go("change-password");
                $scope.isLoginFormSending = !1, makeRedirectionAfterLogin();
            }, function(error) {
                switch ($scope.loginErrors = {}, $scope.isLoginFormSending = !1, error.code) {
                  case errorEnum.INCORRECT_PASSWORD.code:
                    return $scope.loginErrors.password = error;

                  case errorEnum.NO_USERLOGIN_FOUND.code:
                  case errorEnum.NO_CONSULTANT_FOUND.code:
                  case errorEnum.INVALID_CREDENTIALS.code:
                  case errorEnum.USERLOGIN_DISABLED.code:
                  default:
                    return $scope.loginErrors.email = error;
                }
            });
        }, $scope.onClickForgotPasswordLink = function() {
            Analytics.sendEvent({
                eventCategory: "Checkout Login Page",
                eventAction: "link-click",
                eventLabel: "forgot-password"
            }), $state.go("reset-password");
        }, $scope.onClickLoginAsGuest = function() {
            Analytics.sendEvent({
                eventCategory: "Checkout Login Page",
                eventAction: "link-click",
                eventLabel: "no-thanks-continue-as-a-guest"
            }), function() {
                if ($scope.guestUserForm.$setSubmitted(), !$scope.guestUserForm.$invalid) {
                    var $model = $scope.guestUserModel;
                    $scope.isLoginAsGuestUser = !0, authServiceNew.loginAsGuest($model.email).then(function() {
                        $scope.isLoginAsGuestUser = !1, $state.go($stateParams.redirectTo ? $stateParams.redirectTo : "checkout");
                    }, function(error) {
                        $scope.isLoginAsGuestUser = !1, Notification.error(error.message);
                    });
                }
            }();
        }, $scope.onClickCreateAccount = function() {
            Analytics.sendEvent({
                eventCategory: "Checkout Login Page",
                eventAction: "button-click",
                eventLabel: "create-account"
            }), function() {
                if ($scope.guestUserForm.$setSubmitted(), !$scope.guestUserForm.$invalid) {
                    var $model = $scope.guestUserModel;
                    $scope.customSearchEmailError = !1, $scope.isValidatingEmail = !0, $scope.emailExists = !1, 
                    $scope.isNewUser = !1, profileService.searchEmail($model.email).then(function() {
                        if (sharedVariables.set("newAccountEmail", $model.email), $scope.isValidatingEmail = !1, 
                        $scope.emailExists = !1, $scope.isNewUser = !1, $scope.emailExists = !0, $scope.customSearchEmailError = !0, 
                        $stateParams.redirectTo) $state.go("create-account", {
                            redirectTo: $stateParams.redirectTo
                        }); else $state.go("create-account");
                    }, function(error) {
                        switch (error.code) {
                          case errorEnum.CONTACT_FOUND_IN_OTHER_ADDRESSBOOK.code:
                            if (sharedVariables.set("registerFormWithPassword", !1), sharedVariables.set("registerFormWithPassword", !1), 
                            sharedVariables.set("newAccountEmail", $model.email), $stateParams.from) $state.go("create-account", {
                                redirectTo: $stateParams.redirectTo
                            }); else $state.go("create-account");
                            break;

                          default:
                            $scope.customSearchEmailError = error, $scope.isValidatingEmail = !1, $scope.emailExists = !0;
                        }
                    });
                }
            }();
        }, $scope.onSetNewPasswordLinkClick = function($model) {
            sharedVariables.set("newAccountEmail", $model.email), sharedVariables.set("registerFormWithPassword", !1), 
            sharedVariables.set("contactFoundInOtherAddressBook", !0), $state.go("create-account");
        }, function() {
            sharedVariables.resetVariables();
            var favoriteIds = $location.search().favoriteIds;
            if (favoriteIds) {
                var productIds = favoriteIds.split("-");
                favoritesService.addToFavorites(!1, productIds).finally(function() {
                    authServiceNew.isLogin().then(function() {
                        makeRedirectionAfterLogin();
                    });
                });
            } else authServiceNew.isLogin().then(function() {
                makeRedirectionAfterLogin();
            });
            checkoutService.getCart().then(function(result) {
                $scope.showOrderFlows = null !== result.cartData.workEffortId, $scope.customMessage = "Planning to add your order to a Hostess’ show? Right now, your order isn’t connected to a show. Check your inbox for the email sent from your Stylist or Hostess—use the shopping link in that email to ensure you’re shopping the show! If you didn’t receive an email, reach out to your Stylist or Hostess";
            });
        }();
    }
    angular.module("cabi.ecommerce.login").controller("loginController", LoginController), 
    LoginController.$inject = [ "$scope", "$q", "$window", "$location", "$stateParams", "$state", "Notification", "errorEnum", "profileService", "authServiceNew", "sharedVariables", "checkoutService", "Analytics", "favoritesService" ];
}(angular), angular.module("cabi.ecommerce.login").controller("resetPasswordController", [ "$scope", "$state", "Notification", "profileService", "sharedVariables", "errorEnum", function($scope, $state, Notification, profileService, sharedVariables, errorEnum) {
    $scope.resetPasswordModel = {}, $scope.resetPasswordModel.email = sharedVariables.get("newAccountEmail"), 
    $scope.isLoading = !1, $scope.resetPasswordErrors = null, $scope.setGlobalVariables = function() {
        sharedVariables.set("registerFormWithPassword", !1), sharedVariables.set("contactFoundInOtherAddressBook", !0), 
        sharedVariables.set("newAccountEmail", $scope.resetPasswordModel.email);
    }, $scope.setGlobalEmailToCreateAccount = function($email) {
        sharedVariables.set("newAccountEmail", $email);
    }, $scope.resetPassword = function() {
        var $model = $scope.resetPasswordModel;
        $scope.resetPasswordErrors = null, $scope.isLoading = !0, profileService.resetPassword($model.email).then(function(result) {
            Notification.success("An email has been sent to your email address with instructions to set/reset your password."), 
            $scope.isLoading = !1, $state.go("profile");
        }, function(error) {
            switch ($scope.isLoading = !1, error.code) {
              case errorEnum.CONTACT_FOUND_IN_OTHER_ADDRESSBOOK.code:
                $scope.resetPasswordErrors = {}, $scope.resetPasswordErrors.contactFoundInOtherAddressBook = !0;
                break;

              case errorEnum.NO_GUEST_IN_ADDRESSBOOK.code:
                $scope.resetPasswordErrors = {}, $scope.resetPasswordErrors.contactNotFoundInAddressBook = !0;
                break;

              default:
                Notification.error(error.message);
            }
        });
    };
} ]), angular.module("cabi.ecommerce.login").factory("sharedVariables", [ function() {
    var variables = {
        registerFormWithPassword: !0
    };
    return {
        get: function(key) {
            return variables[key];
        },
        set: function(key, value) {
            return variables[key] = value;
        },
        resetVariables: function() {
            variables = {
                registerFormWithPassword: !0
            };
        }
    };
} ]), angular.module("cabi.ecommerce.profile").controller("profileController", [ "$scope", "$state", "Notification", "authServiceNew", function($scope, $state, Notification, authServiceNew) {
    if ($scope.isSavingProfile = !1, $scope.profile = authServiceNew, $scope.avatar = CDN_UPLOADS_URL + "/avatars/" + CABI_CONSULTANT_IS_MICROSITE + ".jpg", 
    authServiceNew.user) if (authServiceNew.user.isGuestUser) $state.go("checkout");
    $scope.signOut = function() {
        authServiceNew.logout().then(function() {
            $state.go("login");
        }, function(error) {
            Notification.error(error.message);
        });
    };
} ]), window.angular.module("cabi.exchange-and-return").component("anyResult", {
    bindings: {
        attrs: "<"
    },
    controller: "AnyResultController",
    templateUrl: TEMPLATE_DIR + "/assets/js/angular/exchange-and-return/components/any-result/any-result.html"
}), function(angular) {
    window.angular.module("cabi.exchange-and-return").controller("AnyResultController", [ "componentsConstant", "$scope", "$rootScope", "GoogleAnalytics", function(componentsConstant, $scope, $rootScope, GoogleAnalytics) {
        const $ctrl = this;
        $ctrl.isLoading = !1, $ctrl.error = null, $ctrl.orders = [], $ctrl.stylists = [], 
        $ctrl.$onInit = function() {
            GoogleAnalytics.sendEvent("ReturnsExchanges", "OrderFound"), document.body.scrollTop = 0, 
            document.documentElement.scrollTop = 0, $ctrl.orders = $ctrl.attrs.data.orders;
            for (let i = 0; i < $ctrl.orders.length; i++) {
                $ctrl.orders[i].orderDate = new Date($ctrl.orders[i].orderDate.substring(0, 10));
                let found = !1, stylist = $ctrl.orders[i].stylist;
                for (let j = 0; j < $ctrl.stylists.length; j++) if ($ctrl.stylists[j].partyId === stylist.partyId) {
                    found = !0;
                    break;
                }
                if (!found) $ctrl.stylists.push(stylist);
            }
        }, $ctrl.imageLoaded = function(stylist) {
            $scope.$apply(function() {
                stylist.imageLoaded = !0;
            });
        }, $ctrl.continue = function() {
            window.location.href = "/";
        }, $ctrl.back = function() {
            $rootScope.$broadcast("navigate", {
                from: componentsConstant.exchangeAndReturn.anyResult,
                to: componentsConstant.exchangeAndReturn.exchangeAndReturnForm,
                data: $ctrl.attrs.data
            });
        };
    } ]);
}(), window.angular.module("cabi.exchange-and-return").component("exchangeAndReturnForm", {
    bindings: {
        attrs: "<"
    },
    controller: "ExchangeAndReturnFormController",
    templateUrl: TEMPLATE_DIR + "/assets/js/angular/exchange-and-return/components/exchange-and-return-form/exchange-and-return-form.html"
}), function(angular) {
    angular.module("cabi.exchange-and-return").controller("ExchangeAndReturnFormController", [ "commonService", "exchangeAndReturnService", "componentsConstant", "$rootScope", "addressService", "$q", "ngDialog", "$scope", "VIEW_PATH", "GoogleAnalytics", function(commonService, exchangeAndReturnService, componentsConstant, $rootScope, addressService, $q, ngDialog, $scope, VIEW_PATH, GoogleAnalytics) {
        const $ctrl = this;
        $ctrl.components = componentsConstant.exchangeAndReturn, $ctrl.isLoading = !1, $ctrl.form = {
            orderNumber: "",
            email: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            zipCode: ""
        }, $ctrl.error = null, $ctrl.countryLabels = commonService.getCountryLabels(), $ctrl.$onInit = function() {
            if (document.body.scrollTop = 0, document.documentElement.scrollTop = 0, $ctrl.attrs && $ctrl.attrs.data) $ctrl.form = $ctrl.attrs.data.form;
            commonService.getStateProvinceList().then(function(result) {
                $ctrl.states = result.list, $ctrl.isLoading = !1;
            }).catch(function(error) {
                $ctrl.error = error.message, $ctrl.isLoading = !1;
            });
        }, $ctrl.validateAddress = function() {
            const deferred = $q.defer();
            return addressService.validatePostalAddress($ctrl.form.address1, $ctrl.form.address2, $ctrl.form.city, $ctrl.form.zipCode, $ctrl.form.state.code).then(function(response) {
                if (angular.isArray(response.matches) && response.matches.length > 0) deferred.resolve(response); else if ("true" === response.valid) deferred.resolve(response); else deferred.reject({
                    message: "Invalid address"
                });
                return response;
            }, function(error) {
                return deferred.reject(error), error;
            }), deferred.promise;
        }, $ctrl.displayValidatedAddressPopup = function() {
            ngDialog.open({
                template: VIEW_PATH + "/validateAddressesPopup.html",
                controller: [ "$scope", function($scope) {
                    $scope.selectAddress = function(address) {
                        $scope.closeThisDialog(address);
                    };
                } ],
                scope: $scope
            }).closePromise.then(function(data) {
                if (data.value && "$closeButton" !== data.value) $ctrl.form.address1 = data.value.address1, 
                $ctrl.form.address2 = data.value.address2, $ctrl.form.city = data.value.city, $ctrl.form.zipCode = data.value.postalCode, 
                $ctrl.form.state = data.value.stateProvinceGeoObj, $ctrl.findOrderAndNavigate();
            });
        }, $ctrl.continue = function() {
            GoogleAnalytics.sendEvent("ReturnsExchanges", "Continue"), $ctrl.isLoading = !0, 
            $ctrl.error = null;
            const NO_MATCHED_ADDRESS_FOUND_code = -30539;
            $ctrl.validateAddress().then(function(response) {
                if ($scope.validateAddresses = response.matches, "true" === response.valid) return $ctrl.isLoading = !1, 
                void $ctrl.findOrderAndNavigate();
                $ctrl.displayValidatedAddressPopup();
            }, function(error) {
                if (NO_MATCHED_ADDRESS_FOUND_code === error.code) $scope.validateAddresses = [], 
                $ctrl.displayValidatedAddressPopup();
            }).finally(function() {
                $ctrl.isLoading = !1;
            });
        }, $ctrl.findOrderAndNavigate = function() {
            exchangeAndReturnService.getGuestOrderHistory($ctrl.form.orderNumber, $ctrl.form.email, $ctrl.form.city, $ctrl.form.state.code, $ctrl.form.address1, $ctrl.form.address2, $ctrl.form.zipCode).then(function(result) {
                $ctrl.isLoading = !1;
                const orders = result.orderHistoryMap.orders;
                if (orders.length > 0) $rootScope.$broadcast("navigate", {
                    from: componentsConstant.exchangeAndReturn.exchangeAndReturnForm,
                    to: componentsConstant.exchangeAndReturn.anyResult,
                    data: {
                        orders: orders,
                        form: $ctrl.form
                    }
                }); else $rootScope.$broadcast("navigate", {
                    from: componentsConstant.exchangeAndReturn.exchangeAndReturnForm,
                    to: componentsConstant.exchangeAndReturn.noResult,
                    data: {
                        form: $ctrl.form
                    }
                });
            }).catch(function(error) {
                $ctrl.isLoading = !1, $ctrl.error = error.message;
            });
        };
    } ]);
}(window.angular), window.angular.module("cabi.exchange-and-return").component("noResult", {
    bindings: {
        attrs: "<"
    },
    controller: "NoResultController",
    templateUrl: TEMPLATE_DIR + "/assets/js/angular/exchange-and-return/components/no-result/no-result.html"
}), function(angular) {
    window.angular.module("cabi.exchange-and-return").controller("NoResultController", [ "componentsConstant", "$rootScope", "GoogleAnalytics", function(componentsConstant, $rootScope, GoogleAnalytics) {
        const $ctrl = this;
        $ctrl.$onInit = function() {
            GoogleAnalytics.sendEvent("ReturnsExchanges", "OrderNotFound"), document.body.scrollTop = 0, 
            document.documentElement.scrollTop = 0;
        }, $ctrl.tryAgain = function() {
            $rootScope.$broadcast("navigate", {
                from: componentsConstant.exchangeAndReturn.noResult,
                to: componentsConstant.exchangeAndReturn.exchangeAndReturnForm,
                data: $ctrl.attrs.data
            });
        };
    } ]);
}(), window.angular.module("cabi.exchange-and-return").component("exchangeAndReturn", {
    bindings: {
        component: "@",
        attrs: "<",
        moduleData: "<"
    },
    controller: "ExchangeAndReturnController",
    templateUrl: TEMPLATE_DIR + "/assets/js/angular/exchange-and-return/exchange-and-return.html"
}), function(angular) {
    window.angular.module("cabi.exchange-and-return").controller("ExchangeAndReturnController", [ "$scope", "componentsConstant", "componentHandlerService", function($scope, componentsConstant, componentHandlerService) {
        const $ctrl = this;
        $ctrl.components = componentsConstant.exchangeAndReturn, $ctrl.$onInit = function() {
            componentHandlerService.init($scope, $ctrl.component, componentsConstant.exchangeAndReturn.exchangeAndReturnForm, $ctrl.attrs, $ctrl.moduleData);
        }, $ctrl.isComponentActive = componentHandlerService.isComponentActive, $ctrl.getAttrs = componentHandlerService.getAttrs;
    } ]);
}(), window.angular.module("cabi.fashionShow").component("fashionShow", {
    controller: "FashionShowController",
    templateUrl: "/wp-content/themes/cabi/assets/js/angular/fashion-show/fashionShow.html"
}), function(angular) {
    function FashionShowController() {}
    FashionShowController.inject = [], angular.module("cabi.fashionShow").controller("FashionShowController", FashionShowController);
}(window.angular), function(angular, AJAX_URL) {
    function FashionShowService($http, $q) {
        this.login = function(email) {
            return $http({
                url: AJAX_URL + "?action=cabi_fashion_show_login",
                method: "post",
                data: {
                    email: email
                }
            });
        }, this.register = function(data) {
            if (angular.isUndefined(data.mailing_list_opt_in)) data.mailing_list_opt_in = !1;
            return $http({
                url: AJAX_URL + "?action=cabi_fashion_show_register",
                method: "post",
                data: {
                    name: data.name,
                    email: data.email,
                    mailing_list_opt_in: data.mailing_list_opt_in
                }
            });
        }, this.checkAccess = function(email) {
            return $http({
                url: AJAX_URL + "?action=cabi_fashion_show_check_access",
                method: "post",
                data: {
                    email: email
                }
            });
        }, this.checkPassword = function(data) {
            return $http({
                url: AJAX_URL + "?action=cabi_fashion_show_check_password",
                method: "post",
                data: {
                    password: data.password,
                    email: data.email
                }
            });
        };
    }
    FashionShowService.inject = [ "$http", "$q" ], angular.module("cabi.fashionShow").service("FashionShowService", FashionShowService);
}(window.angular, window.AJAX_URL), function(angular) {
    function FashionShowRouter($stateProvider, $urlRouterProvider) {
        if (-1 !== [ "/fashionshow", "/fashionshow/" ].indexOf(window.location.pathname)) $urlRouterProvider.otherwise("/"), 
        $stateProvider.state("fs", {
            abstract: !0,
            component: "fashionShow"
        }).state("fs.home", {
            url: "/",
            redirectTo: "fs.login"
        }).state("fs.register", {
            url: "/register",
            component: "fashionShowRegister"
        }).state("fs.registration-form", {
            url: "/registration-form",
            component: "fashionShowRegistrationForm"
        }).state("fs.login", {
            url: "/login",
            component: "fashionShowLogin"
        }).state("fs.login-form", {
            url: "/login-form?email",
            component: "fashionShowLoginForm"
        }).state("fs.password-check", {
            url: "/password-check",
            component: "fashionShowPasswordCheck"
        });
    }
    FashionShowRouter.$inject = [ "$stateProvider", "$urlRouterProvider" ], angular.module("cabi.fashionShow").config(FashionShowRouter);
}(window.angular), window.angular.module("cabi.fashionShow").component("fashionShowLoginForm", {
    templateUrl: "/wp-content/themes/cabi/assets/js/angular/fashion-show/login-form/form.html",
    controller: "FashionShowLoginFormController"
}), function(angular) {
    function FashionShowLoginFormController($state, FashionShowService, EmailAddress) {
        var $ctrl = this;
        $ctrl.$state = $state, $ctrl.form = {}, this.$onInit = function() {
            if (angular.isDefined($state.params.email)) $ctrl.error = "Your email already exists in our database. Please continue to login.", 
            $ctrl.form.email = $state.params.email;
        }, $ctrl.onLogin = function() {
            $ctrl.error = null, FashionShowService.login($ctrl.form.email).then(function(response) {
                if (response.data.success) EmailAddress.value = $ctrl.form.email, $state.go("fs.password-check"); else $ctrl.error = response.data.data.error;
            });
        };
    }
    FashionShowLoginFormController.$inject = [ "$state", "FashionShowService", "EmailAddress" ], 
    angular.module("cabi.fashionShow").controller("FashionShowLoginFormController", FashionShowLoginFormController);
}(window.angular), function(angular) {
    window.angular.module("cabi.fashionShow").component("fashionShowLogin", {
        templateUrl: "/wp-content/themes/cabi/assets/js/angular/fashion-show/login/login.html",
        controller: "FashionShowLoginController"
    });
}(), function(angular) {
    function FashionShowLoginController($state, $location, FashionShowService, EmailAddress) {
        this.$state = $state, this.$onInit = function() {
            this.access_denied = angular.isDefined($location.search().access_denied);
        }, this.onLoginWithFacebook = function() {
            FB.login(function(response) {
                if (response.authResponse) FB.api("/me?fields=email,name", function(response) {
                    FashionShowService.login(response.email).then(function(response2) {
                        if (response2.data.success) EmailAddress.value = response.email, $state.go("fs.password-check"); else {
                            var data = {
                                name: response.name,
                                email: response.email
                            };
                            FashionShowService.register(data).then(function(response2) {
                                if (response2.data.success) EmailAddress.value = data.email, $state.go("fs.password-check"); else window.alert("Registration unsuccessful");
                            });
                        }
                    });
                });
            }, {
                scope: "public_profile,email"
            });
        };
    }
    FashionShowLoginController.$inject = [ "$state", "$location", "FashionShowService", "EmailAddress" ], 
    angular.module("cabi.fashionShow").controller("FashionShowLoginController", FashionShowLoginController);
}(window.angular), function(angular) {
    function FashionShowPasswordCheckController($state, FashionShowService, EmailAddress) {
        var $ctrl = this;
        $ctrl.$onInit = function() {
            if ($ctrl.EmailAddress = EmailAddress, $ctrl.$state = $state, $ctrl.error = null, 
            null === EmailAddress.value) $state.go("fs.login");
        }, $ctrl.onCheckPassword = function() {
            $ctrl.error = null;
            var data = {
                password: $ctrl.form.password,
                email: EmailAddress.value
            };
            FashionShowService.checkPassword(data).then(function(response) {
                if (response.data.success) window.location.href = "/fashionshow/watch?email=" + EmailAddress.value; else $ctrl.error = "Incorrect password. Please try again.";
            });
        };
    }
    FashionShowPasswordCheckController.$inject = [ "$state", "FashionShowService", "EmailAddress" ];
    var FashionShowPasswordCheck = {
        templateUrl: "/wp-content/themes/cabi/assets/js/angular/fashion-show/password-check/password-check.html",
        controller: FashionShowPasswordCheckController
    };
    angular.module("cabi.fashionShow").component("fashionShowPasswordCheck", FashionShowPasswordCheck);
}(window.angular), function(angular) {
    function FashionShowPlayerController($state, FashionShowService, $scope) {
        var $ctrl = this;
        $ctrl.can_access = !1, FashionShowService.checkAccess(window.location.search.substr(1).split("=")[1]).then(function(response) {
            if (response.data.success) $ctrl.can_access = !0; else window.location.href = "/fashionshow/#login?access_denied";
        });
    }
    FashionShowPlayerController.$inject = [ "$state", "FashionShowService", "$scope" ], 
    angular.module("cabi.fashionShow").controller("FashionShowPlayerController", FashionShowPlayerController);
}(window.angular), function(angular) {
    function FashionShowRegisterController($state, FashionShowService, EmailAddress) {
        this.$state = $state, this.onFacebookRegister = function() {
            FB.login(function(response) {
                if (response.authResponse) FB.api("/me?fields=email,name", function(response) {
                    var data = {
                        name: response.name,
                        email: response.email
                    };
                    FashionShowService.register(data).then(function(response2) {
                        if (response2.data.success) EmailAddress.value = response.email, $state.go("fs.password-check"); else if ("Email address is already registered" === response2.data.data.error) EmailAddress.value = response.email, 
                        $state.go("fs.password-check"); else window.alert("Registration unsuccessful");
                    });
                });
            }, {
                scope: "public_profile,email"
            });
        };
    }
    FashionShowRegisterController.$inject = [ "$state", "FashionShowService", "EmailAddress" ];
    var FashionShowRegister = {
        templateUrl: "/wp-content/themes/cabi/assets/js/angular/fashion-show/register/fashionShowRegister.html",
        controller: FashionShowRegisterController
    };
    angular.module("cabi.fashionShow").component("fashionShowRegister", FashionShowRegister);
}(window.angular), function(angular) {
    function FashionShowRegistrationFormController($state, FashionShowService, EmailAddress) {
        var $ctrl = this;
        $ctrl.$state = $state, $ctrl.settings = {
            emailFocused: !1
        }, $ctrl.onRegister = function() {
            if ($ctrl.error_message = null, !validate()) $ctrl.error_message = "This doesn’t appear to be a valid email address. Please double-check the address and try again.";
            var data = {
                name: $ctrl.form.name,
                email: $ctrl.form.email,
                mailing_list_opt_in: $ctrl.form.mailing_list_opt_in
            };
            FashionShowService.register(data).then(function(response) {
                if (response.data.success) EmailAddress.value = $ctrl.form.email, $state.go("fs.password-check"); else if (/already/.test(response.data.data.error)) $state.go("fs.login-form", {
                    email: $ctrl.form.email
                }); else $ctrl.error_message = response.data.data.error;
            });
        };
        var validate = function() {
            var valid = !0;
            if (angular.isUndefined($ctrl.form) || !/.+@.+/.test($ctrl.form.email)) valid = !1;
            return valid;
        };
    }
    FashionShowRegistrationFormController.$inject = [ "$state", "FashionShowService", "EmailAddress" ];
    var FashionShowRegistrationForm = {
        templateUrl: "/wp-content/themes/cabi/assets/js/angular/fashion-show/registration-form/form.html",
        controller: FashionShowRegistrationFormController
    };
    angular.module("cabi.fashionShow").component("fashionShowRegistrationForm", FashionShowRegistrationForm);
}(window.angular), function(angular) {
    function AddToFavoritesDirective($rootScope, $timeout, favoritesService) {
        return {
            scope: {
                loadingFavorites: "=?loadingFavorites",
                productId: "=?",
                isAdded: "=?isAdded",
                isLoading: "=?isLoading",
                selectedVariant: "=?selectedVariant",
                selectedColor: "=?selectedColor",
                productData: "=?productData"
            },
            restrict: "A",
            link: function($scope, iElm, iAttrs) {
                if (!favoritesService.hasBeenLoaded()) favoritesService.getFavorites();
                function refreshState() {
                    $scope.isAdded = !1, $scope.isLoading = !0;
                    var favoritesList = favoritesService.transformFavoritesToList();
                    angular.forEach(favoritesList, function(product) {
                        var prodAndColSuffix = $scope.productId + function() {
                            var colorFeatureId = "";
                            if ($scope.selectedColor) colorFeatureId = $scope.selectedColor.productFeatureId;
                            return colorFeatureId;
                        }();
                        if (($scope.selectedVariant || $scope.selectedColor) && product.variantId.includes(prodAndColSuffix)) $scope.isAdded = !0; else if (!product.variantId && product.productId === $scope.productId) $scope.isAdded = !0;
                    }), $scope.isLoading = !1;
                }
                $rootScope.$on("favorites:change", function() {
                    refreshState();
                }), $scope.$watch("selectedColor", function() {
                    refreshState();
                }), $scope.$watch("selectedVariant", function() {
                    refreshState();
                }), $scope.addToFavorites = function(productId) {
                    if ($scope.isLoading = !0, $scope.variantId) productId = $scope.variantId; else if ($scope.selectedColor && $scope.productData) {
                        var variantsForColor = $scope.productData.variantTree[$scope.selectedColor.description_for_select];
                        productId = variantsForColor[Object.keys(variantsForColor)[0]][0];
                    } else productId = productId.substr(0, 6);
                    favoritesService.addToFavorites(productId).then(function(res) {
                        if ($scope.isLoading = !1, $scope.isAdded = !0, window.fbq("track", "AddToWishlist"), 
                        res && res.redirect) res.redirect();
                    });
                }, iElm.on("click", function(event) {
                    event.preventDefault();
                    var product_ids, product_payload = $scope.productId ? $scope.productId : iAttrs.addToFavorites;
                    if (function(raw_product_id) {
                        if (raw_product_id.indexOf(",") > -1) return !0;
                    }(product_payload)) product_ids = product_payload, $scope.isLoading = !0, favoritesService.addToFavorites(null, function(raw_product_ids) {
                        var list = raw_product_ids.replace(/'/g, "").split(","), newList = [];
                        for (i = 0; i <= list.length; i++) if (void 0 != list[i]) newList.push(list[i].replace(/'/g, ""));
                        return newList;
                    }(product_ids)).then(function(res) {
                        if ($scope.isLoading = !1, $scope.isAdded = !0, res && res.redirect) res.redirect();
                    }); else $scope.addToFavorites(product_payload);
                }), $scope.$watch(iAttrs.addToFavorites, function() {
                    refreshState();
                }), $scope.$watch("productId", function() {
                    refreshState();
                });
            }
        };
    }
    angular.module("cabi.favorites").directive("addToFavorites", AddToFavoritesDirective), 
    AddToFavoritesDirective.$inject = [ "$rootScope", "$timeout", "favoritesService" ];
}(window.angular), function(angular) {
    function FavoriteItem() {
        return {
            restrict: "E",
            scope: {
                product: "=?",
                favoriteId: "=?",
                showRemoveBtn: "=?",
                onRemoveItem: "&?"
            },
            controller: FavoriteItemController,
            controllerAs: "vm",
            bindToController: !0,
            link: FavoriteItemLink,
            templateUrl: "../assets/js/angular/favorites/directives/favorite-item.html"
        };
    }
    function FavoriteItemController() {
        var vm = this;
        vm.settings = {
            isHovering: !1,
            disableQuickLook: !1
        }, vm.onRemoveFromFavorite = function(event, productId) {
            if (event.preventDefault(), event.stopPropagation(), !vm.onRemoveItem) return;
            vm.onRemoveItem({
                productId: productId
            });
        }, vm.getProductImage = function() {
            var favoriteId = vm.favoriteId, product = vm.product;
            if (!favoriteId || !product) return;
            return function(productId) {
                var product = vm.product;
                for (var variantImagesIndex in product.variantsImages) {
                    var variantImages = product.variantsImages[variantImagesIndex];
                    if (variantImages.productId === productId) return variantImages.PRODUCT_FRONT_IMAGE;
                }
                return product.imageURL;
            }(favoriteId);
        };
    }
    function FavoriteItemLink(scope, element) {
        element.on("mouseenter", function() {
            var item_photos, inner, height, width;
            item_photos = element[0].querySelector(".item_photos"), inner = item_photos.querySelector(".inner"), 
            height = item_photos.offsetHeight, width = item_photos.offsetWidth, inner.style.height = height + "px", 
            inner.style.width = width + "px";
        });
    }
    window.angular.module("cabi.favorites").directive("favoriteItem", FavoriteItem), 
    FavoriteItem.$inject = [], FavoriteItemController.$inject = [];
}(), function(angular) {
    function FavoritesListing() {
        return {
            restrict: "E",
            scope: {
                favoritesInfo: "=?",
                showRemoveBtn: "=?"
            },
            controller: FavoritesListingController,
            controllerAs: "vm",
            templateUrl: "../assets/js/angular/favorites/directives/favorites-listing.html"
        };
    }
    function FavoritesListingController(favoritesService) {
        this.onRemoveFromFavorite = function(productId) {
            favoritesService.removeItem(productId);
        };
    }
    window.angular.module("cabi.favorites").directive("favoritesListing", FavoritesListing), 
    FavoritesListing.$inject = [], FavoritesListingController.$inject = [ "favoritesService" ];
}(), function() {
    function quickLookFavoritesController($scope, favoritesService, productService, cartService) {
        const $ctrl = this;
        function formatColorData() {
            var colorArray = [], colorData = $ctrl.productData.colors ? $ctrl.productData.colors : $ctrl.productData.color;
            if (colorData) angular.forEach(colorData, function(value) {
                colorArray.push({
                    description: value.description,
                    productFeatureId: value.productFeatureId
                });
            });
            $ctrl.colorArray = colorArray;
        }
        function getFavoriteInfoForProduct() {
            $ctrl.isProductOnFavorites = !1, $ctrl.isDataLoading = !0, $ctrl.isProductOnCart = !1;
            var prodAndColSuffix = $ctrl.productId + function() {
                var colorFeatureId = "";
                if ($ctrl.colorArray && $ctrl.selectedColor) colorFeatureId = $ctrl.colorArray.filter(function(value) {
                    return value.description === $ctrl.selectedColor;
                })[0].productFeatureId; else if (!$ctrl.colorArray && $ctrl.productData.color) formatColorData();
                return colorFeatureId;
            }(), favoritesList = favoritesService.transformFavoritesToList();
            angular.forEach(favoritesList, function(product) {
                if (!product.variantId && product.productId === $ctrl.productId) $ctrl.isProductOnFavorites = !0; else if (($ctrl.selectedVariant || $ctrl.selectedColor) && product.variantId.includes(prodAndColSuffix)) $ctrl.isProductOnFavorites = !0;
            });
            var cartItems = [];
            if (null !== $ctrl.cart.data) cartItems = $ctrl.cart.data.items;
            if (cartItems.length > 0 && prodAndColSuffix.length > 6) angular.forEach(cartItems, function(cartItem) {
                if (cartItem.productId.includes(prodAndColSuffix)) $ctrl.isProductOnCart = !0, $ctrl.productIdOnCart = cartItem.productId;
            });
            $ctrl.isDataLoading = !1;
        }
        $ctrl.$onInit = function() {
            if (!favoritesService.hasBeenLoaded()) favoritesService.getFavorites();
            $ctrl.isProductOnFavorites = !1, $ctrl.isDataLoading = !1, $ctrl.cart.getCart(), 
            $ctrl.isProductOnCart = !1, formatColorData(), getFavoriteInfoForProduct();
        }, $ctrl.$onChanges = function(changes) {
            getFavoriteInfoForProduct();
        }, $ctrl.addOrMoveToFavorites = function($event) {
            if ($event.preventDefault(), $ctrl.isDataLoading = !0, $ctrl.isProductOnCart) favoritesService.addToFavorites($ctrl.productIdOnCart).then(function(res) {
                $ctrl.cart.removeItem($ctrl.productIdOnCart).then(function() {
                    if ($ctrl.isProductOnFavorites = !0, $ctrl.isProductOnCart = !1, $ctrl.productIdOnCart = "", 
                    $ctrl.isDataLoading = !1, res && res.redirect) res.redirect();
                });
            }), $ctrl.isDataLoading = !1; else productService.getProduct($ctrl.productId).then(function(getProductResponse) {
                var productId = "";
                if ($ctrl.variantId) productId = $ctrl.variantId; else if ($ctrl.selectedColor) {
                    var variantsForColor = getProductResponse.variantTree[$ctrl.selectedColor], firstVariantId = variantsForColor[Object.keys(variantsForColor)[0]][0];
                    productId = firstVariantId ? firstVariantId : $ctrl.productId;
                } else productId = $ctrl.productId;
                favoritesService.addToFavorites(productId).then(function(res) {
                    if ($ctrl.isProductOnFavorites = !0, res && res.redirect) res.redirect();
                }), $ctrl.isDataLoading = !1;
            });
        }, $ctrl.cart = cartService, $scope.$watch(function() {
            getFavoriteInfoForProduct();
        });
    }
    angular.module("cabi.favorites").component("quickLookFavorites", {
        transclude: !0,
        bindings: {
            productId: "<",
            selectedVariant: "<?",
            selectedColor: "<?",
            disabled: "<?",
            productData: "<",
            onReject: "&?",
            format: "<"
        },
        templateUrl: "../assets/js/angular/favorites/directives/quicklook-favorites.html",
        controller: quickLookFavoritesController
    }), quickLookFavoritesController.$inject = [ "$scope", "favoritesService", "productService", "cartService" ];
}(window.angular), function(angular) {
    function FavoritesConsultantModalCtrl(FavoritesConsultantModal, stylistList, favoritesService) {
        var $ctrl = this;
        function selectStylist(stylist) {
            $ctrl.selected = stylist;
        }
        $ctrl.stylistList = stylistList, $ctrl.closeModal = FavoritesConsultantModal.deactivate, 
        $ctrl.goToNext = function() {
            if (!$ctrl.stylistList || !$ctrl.stylistList.length) return void (window.location.href = "/become-a-consultant/?lead=help-menu");
            if ($ctrl.selected) {
                var productIds = favoritesService.getProductIds().join("-"), replicatedPath = "/account#/login?redirectTo=favorites&favoriteIds=" + productIds;
                window.location = $ctrl.selected.replicatedSiteUrl + replicatedPath;
            }
        }, $ctrl.selectStylist = selectStylist, function() {
            if (angular.isArray($ctrl.stylistList)) if ($ctrl.stylistList.length > 0) selectStylist($ctrl.stylistList[0]);
        }();
    }
    FavoritesConsultantModalCtrl.$inject = [ "FavoritesConsultantModal", "stylistList", "favoritesService" ], 
    angular.module("cabi.favorites").factory("FavoritesConsultantModal", [ "btfModal", function(btfModal) {
        return btfModal({
            controller: FavoritesConsultantModalCtrl,
            controllerAs: "$ctrl",
            templateUrl: "/wp-content/themes/cabi/assets/js/angular/favorites/favorites-consultant-modal.html"
        });
    } ]).directive("favoritesConsultantModal", [ "FavoritesConsultantModal", function(FavoritesShareModal) {
        return {
            restrict: "A",
            link: function($scope) {
                angular.element("html").bind("keyup", function(e) {
                    if (27 === e.keyCode) $scope.$apply(function() {
                        FavoritesShareModal.deactivate();
                    });
                });
            }
        };
    } ]);
}(window.angular), angular.module("cabi.favorites").directive("favoritesCount", [ "favoritesService", function(favoritesService) {
    return {
        scope: {},
        template: '<div id="wishlist-count" ng-show="favoritesService.data.count"><a href="/clothing-collection/wish-list" title="View the Favorites"><span>{{favoritesService.data.count}}</span></a></div>',
        link: function($scope) {
            $scope.favoritesService = favoritesService, favoritesService.getCount();
        }
    };
} ]), function(angular) {
    function FavoritesCtrl($scope, $rootScope, Notification, favoritesService, FavoritesShareModal, FavoritesConsultantModal, authServiceNew, clioEnabled) {
        function showStylist(stylists) {
            FavoritesConsultantModal.activate({
                stylistList: stylists
            });
        }
        function _ah(func) {
            return function() {
                $scope.isLoading = !0, func.apply(null, arguments).finally(function() {
                    $scope.isLoading = !1;
                }).catch(function(error) {
                    Notification.error(error.message);
                });
            };
        }
        $scope.favoritesService = favoritesService, $scope.authServiceNew = authServiceNew, 
        $scope.openFavoritesShareModal = function() {
            FavoritesShareModal.activate({
                url: favoritesService.getUniqueFavoritesUrl(favoritesService.data.favoriteId)
            }), ga("send", "event", "Content Interaction", "click", "Wishlist Share");
        }, $scope.goToLoginPage = function() {
            window.location.href = "/account/#/login?redirectTo=favorites";
        }, $scope.getStylistByEmail = _ah(function(email) {
            return favoritesService.getStylistByEmail(email).then(function(result) {
                return showStylist(result.myStylists), result;
            }).catch(function() {
                showStylist(null);
            });
        }), $scope.onFavoritesChange = _ah(function() {
            return favoritesService.getFavorites();
        }), $scope.isLoading = !1, $scope.clioEnabled = clioEnabled, favoritesService.getFavorites(), 
        $rootScope.$on("PRODUCT_ADDED", function() {
            favoritesService.getFavorites();
        });
    }
    window.angular.module("cabi.favorites").controller("FavoritesCtrl", FavoritesCtrl), 
    FavoritesCtrl.$inject = [ "$scope", "$rootScope", "Notification", "favoritesService", "FavoritesShareModal", "FavoritesConsultantModal", "authServiceNew", "clioEnabled" ];
}(), function(angular) {
    angular.module("cabi.favorites").service("favoritesService", [ "$http", "$location", "$rootScope", "clioApiAdapter", "$q", "authService", "AttachedEcommModalService", function($http, $location, $rootScope, clioApiAdapter, $q, authService, AttachedEcommModalService) {
        var loaded = !1, exports = {};
        function _syncData(response) {
            var favoritesId, favoritesInfo, products, selectedVariants, data = {};
            data.favoriteId = response.favorites.favoriteId, data.favorites = response.favorites, 
            data.products = response.productsInfo, data.favoritesInfo = (favoritesId = data.favorites.products, 
            favoritesInfo = data.products, products = {}, selectedVariants = function(products) {
                var variants = {};
                return angular.forEach(products, function(product) {
                    if (product.variantSelected) variants[product.productId] = product.variantSelected, 
                    angular.forEach(product.variantSelected, function(variantProductId) {
                        variants[variantProductId] = product.productId;
                    });
                }), variants;
            }(favoritesInfo), angular.forEach(favoritesId, function(favoriteId) {
                if (favoritesInfo[favoriteId]) products[favoriteId] = favoritesInfo[favoriteId]; else {
                    var favoriteInfoId = selectedVariants[favoriteId];
                    if (!favoriteInfoId) return;
                    products[favoriteId] = favoritesInfo[favoriteInfoId];
                }
            }), products), data.count = response.totalFavorites, exports.data = data, $rootScope.$emit("favorites:change", data);
        }
        return exports.data = {
            count: null
        }, exports.addToFavorites = function(productId, productIds) {
            return $q(function(resolve, reject) {
                authService.isAuthenticated().then(function() {
                    exports.addToFavoritesAfterAuth(productId, productIds).then(function(response) {
                        resolve(response);
                    }).catch(function(response) {
                        reject(response);
                    });
                }).catch(function() {
                    AttachedEcommModalService.open({
                        component: "account.login-gateway",
                        moduleData: {
                            loginTitle: "Sign in to save or view Favorites.",
                            modalSource: "Wish List",
                            callback: function(rsURL) {
                                exports.addToFavoritesAfterAuth(productId, productIds).then(function() {
                                    resolve({
                                        redirect: function() {
                                            if (window.location.hostname !== rsURL) window.location.href = rsURL + window.location.pathname;
                                        }
                                    });
                                }).catch(function() {
                                    reject({
                                        redirect: function() {
                                            if (window.location.hostname !== rsURL) window.location.href = rsURL + window.location.pathname;
                                        }
                                    });
                                });
                            }
                        }
                    });
                });
            });
        }, exports.addToFavoritesAfterAuth = function(productId, productIds) {
            loaded = !0;
            var params = {};
            if (angular.isArray(productIds)) params.productIds = productIds; else params.productId = productId;
            return clioApiAdapter.get("AddToFavorites", params).then(function(response) {
                if (_syncData(response), angular.isDefined(productId) && productId) window.ga("send", "event", "Wish List", "add", response.productsInfo[productId.substr(0, 6)].name);
            });
        }, exports.getFavorites = function(favoriteId) {
            return loaded = !0, clioApiAdapter.get("GetFavorites", {
                favoriteId: favoriteId
            }).then(function(response) {
                if (!favoriteId) _syncData(response);
                return $rootScope.$emit("favorites:loaded", response), response;
            });
        }, exports.getCount = function() {
            return exports.getFavorites();
        }, exports.removeItem = function(productId) {
            return loaded = !0, clioApiAdapter.get("RemoveFromFavorites", {
                productId: productId
            }).then(function(response) {
                _syncData(response);
            });
        }, exports.getProducts = function() {
            return exports.data.products;
        }, exports.getProductIds = function() {
            if (!exports.data.favorites) return []; else return exports.data.favorites.products;
        }, exports.hasBeenLoaded = function() {
            return loaded;
        }, exports.getUniqueFavoritesUrl = function(favoritesId) {
            return $location.protocol() + "://" + $location.host() + "/wishlist-share?id=" + favoritesId;
        }, exports.sendFavoritesEmail = function(consultantPartyId, recipientName, recipientEmails, subject, message) {
            return clioApiAdapter.get("SendFavoritesEmail", {
                consultantPartyId: consultantPartyId,
                recipientName: recipientName,
                recipientEmails: recipientEmails,
                subject: subject,
                message: message
            });
        }, exports.getStylistByEmail = function(emailAddress) {
            return clioApiAdapter.get("GetMyStylists", {
                emailAddress: emailAddress
            });
        }, exports.getTotalProducts = function(favorites) {
            if (!favorites) return 0; else return favorites.products.length;
        }, exports.transformFavoritesToList = function() {
            if (!exports.data.products) return [];
            var favoritesList = [];
            return angular.forEach(exports.data.products, function(product) {
                favoritesList.push({
                    productId: product.productId,
                    imageURL: product.imageURL ? product.imageURL : null,
                    productName: product.name,
                    price: isFinite(product.price.substring(0, 1)) ? product.price : product.price.slice(1),
                    styleId: product.styleId,
                    variantId: product.variantSelected[0] ? product.variantSelected[0] : ""
                });
            }), angular.forEach(exports.data.products, function(product) {
                if (product.variantSelected.length > 0) angular.forEach(product.variantSelected, function(variantId) {
                    var imageUrl, imageUrlData = product.variantsImages.filter(function(value) {
                        return value.productId === variantId;
                    })[0];
                    if (imageUrlData.PRODUCT_FRONT_IMAGE) imageUrl = imageUrlData.PRODUCT_FRONT_IMAGE; else imageUrl = imageUrlData.ADDITIONAL_IMAGE_1;
                    favoritesList.push({
                        productId: product.productId,
                        imageURL: imageUrl,
                        productName: product.name,
                        price: isFinite(product.price.substring(0, 1)) ? product.price : product.price.slice(1),
                        styleId: product.styleId,
                        variantId: variantId
                    });
                }); else favoritesList.push({
                    productId: product.productId,
                    imageURL: product.imageURL ? product.imageURL : null,
                    productName: product.name,
                    price: isFinite(product.price.substring(0, 1)) ? product.price : product.price.slice(1),
                    styleId: product.styleId,
                    variantId: product.variantSelected[0] ? product.variantSelected[0] : ""
                });
            }), favoritesList;
        }, exports;
    } ]);
}(window.angular), function(angular) {
    function FavoritesShareCtrl($scope, $location, favoritesService, authServiceNew) {
        $scope.favoritesService = favoritesService, $scope.authServiceNew = authServiceNew, 
        $scope.favorites = null, favoritesService.getFavorites(function(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var results = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)").exec(url);
            if (!results) return null;
            if (!results[2]) return ""; else return decodeURIComponent(results[2].replace(/\+/g, " "));
        }("id")).then(function(response) {
            $scope.favorites = response;
        });
    }
    window.angular.module("cabi.favorites").controller("FavoritesShareCtrl", FavoritesShareCtrl), 
    FavoritesShareCtrl.$inject = [ "$scope", "$location", "favoritesService", "authServiceNew" ];
}(), function(angular) {
    function FavoritesShareModalCtrl(url, FavoritesShareModal) {
        this.url = url, this.closeModal = FavoritesShareModal.deactivate;
    }
    FavoritesShareModalCtrl.$inject = [ "url", "FavoritesShareModal" ], angular.module("cabi.favorites").service("FavoritesShareModal", [ "btfModal", function(btfModal) {
        return btfModal({
            controller: FavoritesShareModalCtrl,
            controllerAs: "$ctrl",
            templateUrl: "/wp-content/themes/cabi/assets/js/angular/favorites/favorites-share-modal.html"
        });
    } ]).directive("favoritesShareModal", [ "FavoritesShareModal", function(FavoritesShareModal) {
        return {
            restrict: "A",
            link: function($scope) {
                angular.element("html").bind("keyup", function(e) {
                    if (27 === e.keyCode) $scope.$apply(function() {
                        FavoritesShareModal.deactivate();
                    });
                });
            }
        };
    } ]);
}(window.angular), window.angular.module("cabi").filter("spacesToDashes", function() {
    return function(input) {
        return input.replace(/\s/g, "-");
    };
}), angular.module("cabi").filter("ucfirst", function() {
    return function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
}), window.angular.module("cabi.find-my-stylist").component("confirmStylist", {
    bindings: {
        attrs: "<"
    },
    controller: "ConfirmStylistController",
    templateUrl: TEMPLATE_DIR + "/assets/js/angular/find-my-stylist/components/confirm-stylist/confirm-stylist.html"
}), function(angular) {
    window.angular.module("cabi.find-my-stylist").controller("ConfirmStylistController", [ "$scope", "$rootScope", "commonService", "profileService", "findMyStylistService", "componentsConstant", "GoogleAnalytics", function($scope, $rootScope, commonService, profileService, findMyStylistService, componentsConstant, GoogleAnalytics) {
        const $ctrl = this;
        $ctrl.isLoading = !0, $ctrl.stylist = null, $ctrl.profileInfo = null, $ctrl.error = null, 
        $ctrl.$onInit = function() {
            GoogleAnalytics.sendEvent("StylistFound", "OneStylist"), $ctrl.stylist = $ctrl.attrs.data.stylists[0], 
            profileService.getProfile().then(function(result) {
                $ctrl.isLoading = !1, $ctrl.profileInfo = result;
            }, function() {
                $ctrl.isLoading = !1;
            });
        }, $ctrl.imageLoaded = function(stylist) {
            $scope.$apply(function() {
                stylist.imageLoaded = !0;
            });
        }, $ctrl.confirm = function() {
            if (GoogleAnalytics.sendEvent("StylistFound", "Confirm"), $ctrl.error = null, $ctrl.profileInfo) $ctrl.isLoading = !0, 
            findMyStylistService.setStylist($ctrl.stylist.partyId, $ctrl.attrs.data.stylistAssociationSource).then(function() {
                $ctrl.isLoading = !1, commonService.redirectToRSOrCallback($ctrl.stylist.replicatedSiteUrl, $ctrl.attrs && $ctrl.attrs.module ? $ctrl.attrs.module.callback : null);
            }).catch(function(error) {
                $ctrl.isLoading = !1, $ctrl.error = error.message;
            }); else commonService.redirectToRSOrCallback($ctrl.stylist.replicatedSiteUrl, $ctrl.attrs && $ctrl.attrs.module ? $ctrl.attrs.module.callback : null);
        }, $ctrl.findMyStylist = function() {
            GoogleAnalytics.sendEvent("StylistFound", "NotMyStylist"), $rootScope.$broadcast("navigate", {
                from: componentsConstant.findMyStylist.confirmStylist,
                to: componentsConstant.findMyStylist.findMyStylistGateway,
                data: $ctrl.attrs.data
            });
        };
    } ]);
}(), window.angular.module("cabi.find-my-stylist").component("findMyStylistGateway", {
    bindings: {
        attrs: "<"
    },
    controller: "FindMyStylistGatewayController",
    templateUrl: TEMPLATE_DIR + "/assets/js/angular/find-my-stylist/components/find-my-stylist-gateway/find-my-stylist-gateway.html"
}), function(angular) {
    window.angular.module("cabi.find-my-stylist").controller("FindMyStylistGatewayController", [ "$rootScope", "$scope", "componentsConstant", "sourcesConstant", "outletStoresConstant", "findMyStylistService", "commonService", "localeService", "currentLocaleService", "urlParametersService", "GoogleAnalytics", function($rootScope, $scope, componentsConstant, sourcesConstant, outletStoresConstant, findMyStylistService, commonService, localeService, currentLocaleService, urlParametersService, GoogleAnalytics) {
        const $ctrl = this;
        function isSource(sourceValue) {
            return $ctrl.noStylistForm.selectedSource && $ctrl.noStylistForm.selectedSource.value === sourceValue;
        }
        function getCurrentCountryCode() {
            return localeService.findLocaleByCode(currentLocaleService.get(), localeService.getDomainLocale()).key;
        }
        $ctrl.findMyStylistForm = {
            stylistOrHostess: "stylist",
            firstName: "",
            lastName: "",
            email: "",
            selectedState: void 0
        }, $ctrl.noStylistForm = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            zipCode: "",
            selectedSource: void 0,
            friendFirstName: "",
            friendLastName: "",
            friendCity: "",
            friendState: void 0,
            outletStore: "",
            communication: {
                email: !1,
                txt: !1,
                phone: !1,
                no: !1
            }
        }, $ctrl.sourceOptions = sourcesConstant, $ctrl.outletStoreOptions = outletStoresConstant, 
        $ctrl.isDropdownOpen = !1, $ctrl.isLoading = !1, $ctrl.error = null, $ctrl.phoneWarning = null, 
        $ctrl.isFindMyStylistFormOpen = !1, $ctrl.isNoStylistFormOpen = !1, $ctrl.countryLabels = commonService.getCountryLabels(), 
        $ctrl.$onInit = function() {
            if ($ctrl.isLoading = !0, $ctrl.attrs && $ctrl.attrs.data && $ctrl.attrs.data.isFindMyStylistFormOpen) $ctrl.isFindMyStylistFormOpen = $ctrl.attrs.data.isFindMyStylistFormOpen, 
            $ctrl.findMyStylistForm = $ctrl.attrs.data.form; else if ($ctrl.attrs && $ctrl.attrs.data && $ctrl.attrs.data.isNoStylistFormOpen) $ctrl.isNoStylistFormOpen = $ctrl.attrs.data.isNoStylistFormOpen, 
            $ctrl.noStylistForm = $ctrl.attrs.data.form;
            commonService.getStateProvinceList().then(function(result) {
                $ctrl.states = result.list, $ctrl.isLoading = !1;
            }).catch(function(error) {
                $ctrl.error = error.message, $ctrl.isLoading = !1;
            });
        }, $ctrl.isCommunicationInvalid = function() {
            if ($ctrl.determineCommunicationPhoneError()) return !0; else return !($ctrl.noStylistForm.communication.email || $ctrl.noStylistForm.communication.txt || $ctrl.noStylistForm.communication.phone || $ctrl.noStylistForm.communication.no);
        }, $ctrl.determineCommunicationPhoneError = function() {
            if ($ctrl.noStylistForm.communication.txt || $ctrl.noStylistForm.communication.phone) {
                if (!$ctrl.noStylistForm.phoneNumber || $scope.noStylistForm.phone.$invalid) return $ctrl.phoneWarning = "You've selected phone or text as your preferred communication method. Please provide a phone number above to continue.", 
                !0;
            } else if ($ctrl.noStylistForm.phoneNumber && $scope.noStylistForm.phone.$error.minlength) return $ctrl.phoneWarning = "Phone number is too short!", 
            !0;
            return $ctrl.phoneWarning = null, !1;
        }, $ctrl.preferenceSelection = function() {
            $ctrl.noStylistForm.communication.no = !1, $ctrl.determineCommunicationPhoneError();
        }, $ctrl.deselectAllPreferences = function() {
            $ctrl.noStylistForm.communication.email = !1, $ctrl.noStylistForm.communication.txt = !1, 
            $ctrl.noStylistForm.communication.phone = !1, $ctrl.determineCommunicationPhoneError();
        }, $ctrl.toggleFindMyStylistForm = function() {
            if (!$ctrl.isLoading) $ctrl.isFindMyStylistFormOpen = !$ctrl.isFindMyStylistFormOpen, 
            $ctrl.isNoStylistFormOpen = !1, GoogleAnalytics.sendEvent("StylistModal", "FindStylist");
        }, $ctrl.toggleNoStylistForm = function() {
            if (!$ctrl.isLoading) $ctrl.isNoStylistFormOpen = !$ctrl.isNoStylistFormOpen, $ctrl.isFindMyStylistFormOpen = !1, 
            GoogleAnalytics.sendEvent("StylistModal", "NoStylist");
        }, $ctrl.submitFindMyStylistForm = function() {
            GoogleAnalytics.sendEvent("StylistChoice", "Continue"), $ctrl.isLoading = !0, findMyStylistService.searchStylistByName($ctrl.findMyStylistForm.stylistOrHostess, $ctrl.findMyStylistForm.firstName, $ctrl.findMyStylistForm.lastName, $ctrl.findMyStylistForm.email, getCurrentCountryCode(), $ctrl.findMyStylistForm.selectedState ? $ctrl.findMyStylistForm.selectedState.code : void 0).then(function(result) {
                $ctrl.isLoading = !1;
                const stylistSource = "stylist" === $ctrl.findMyStylistForm.stylistOrHostess ? commonService.stylistAssociationSource.STYLIST : commonService.stylistAssociationSource.HOSTESS;
                if (urlParametersService.setParameter(urlParametersService.parameterTypes.STYLIST_SOURCE, stylistSource), 
                result.data.length > 1) $rootScope.$broadcast("navigate", {
                    from: componentsConstant.findMyStylist.findMyStylistGateway,
                    to: componentsConstant.findMyStylist.selectStylist,
                    data: {
                        stylists: result.data,
                        form: $ctrl.findMyStylistForm,
                        isFindMyStylistFormOpen: $ctrl.isFindMyStylistFormOpen,
                        stylistAssociationSource: stylistSource
                    }
                }); else if (1 === result.data.length) $rootScope.$broadcast("navigate", {
                    from: componentsConstant.findMyStylist.findMyStylistGateway,
                    to: componentsConstant.findMyStylist.confirmStylist,
                    data: {
                        stylists: result.data,
                        form: $ctrl.findMyStylistForm,
                        isFindMyStylistFormOpen: $ctrl.isFindMyStylistFormOpen,
                        stylistAssociationSource: stylistSource
                    }
                }); else $rootScope.$broadcast("navigate", {
                    from: componentsConstant.findMyStylist.findMyStylistGateway,
                    to: componentsConstant.findMyStylist.noStylist,
                    data: {
                        form: $ctrl.findMyStylistForm,
                        isFindMyStylistFormOpen: $ctrl.isFindMyStylistFormOpen
                    }
                });
            }).catch(function(error) {
                $ctrl.isLoading = !1, $ctrl.error = error.message;
            });
        }, $ctrl.submitNoStylistForm = function() {
            GoogleAnalytics.sendEvent("NoStylist", "Continue"), $ctrl.isLoading = !0, findMyStylistService.searchStylistWrapper($ctrl.noStylistForm.firstName, $ctrl.noStylistForm.lastName, $ctrl.noStylistForm.email, $ctrl.noStylistForm.zipCode, $ctrl.isFriendSource() ? $ctrl.noStylistForm.friendFirstName : void 0, $ctrl.isFriendSource() ? $ctrl.noStylistForm.friendLastName : void 0, $ctrl.isFriendSource() && $ctrl.noStylistForm.friendState ? $ctrl.noStylistForm.friendState.code : void 0, getCurrentCountryCode()).then(function(result) {
                $ctrl.isLoading = !1;
                const stylistSource = $ctrl.isFriendSource() ? commonService.stylistAssociationSource.HOSTESS : commonService.stylistAssociationSource.GEO;
                if (urlParametersService.setParameter(urlParametersService.parameterTypes.STYLIST_SOURCE, stylistSource), 
                result.data.length > 1) $rootScope.$broadcast("navigate", {
                    from: componentsConstant.findMyStylist.findMyStylistGateway,
                    to: componentsConstant.findMyStylist.selectStylist,
                    data: {
                        stylists: result.data,
                        form: $ctrl.noStylistForm,
                        isNoStylistFormOpen: $ctrl.isNoStylistFormOpen,
                        stylistAssociationSource: stylistSource
                    }
                }); else if (result.myStylistsFound) $rootScope.$broadcast("navigate", {
                    from: componentsConstant.findMyStylist.findMyStylistGateway,
                    to: componentsConstant.findMyStylist.confirmStylist,
                    data: {
                        stylists: result.data,
                        form: $ctrl.noStylistForm,
                        isNoStylistFormOpen: $ctrl.isNoStylistFormOpen,
                        stylistAssociationSource: stylistSource
                    }
                }); else {
                    const communication = [];
                    Object.keys($ctrl.noStylistForm.communication).forEach(function(key) {
                        if ("no" !== key && $ctrl.noStylistForm.communication[key]) communication.push(key);
                    }), $rootScope.$broadcast("navigate", {
                        from: componentsConstant.findMyStylist.findMyStylistGateway,
                        to: componentsConstant.findMyStylist.meetStylist,
                        data: {
                            stylist: result.data[0],
                            stylistAssociationSource: stylistSource,
                            contact: $ctrl.noStylistForm,
                            communication: communication
                        }
                    });
                }
            }).catch(function() {
                $ctrl.isLoading = !1, $rootScope.$broadcast("navigate", {
                    from: componentsConstant.findMyStylist.findMyStylistGateway,
                    to: componentsConstant.findMyStylist.noStylist,
                    data: {
                        form: $ctrl.noStylistForm,
                        isNoStylistFormOpen: $ctrl.isNoStylistFormOpen
                    }
                });
            });
        }, $ctrl.close = function() {
            if ($ctrl.isFindMyStylistFormOpen) GoogleAnalytics.sendEvent("StylistChoice", "Cancel"); else if ($ctrl.isNoStylistFormOpen) GoogleAnalytics.sendEvent("NoStylist", "Close"); else GoogleAnalytics.sendEvent("StylistModal", "Close");
            $rootScope.$broadcast("navigate", {
                from: componentsConstant.findMyStylist.findMyStylistGateway,
                to: null
            });
        }, $ctrl.isFriendSource = function() {
            return isSource("Friend");
        }, $ctrl.isOutletStoreSource = function() {
            return isSource("Store");
        };
    } ]);
}(), window.angular.module("cabi.find-my-stylist").component("meetStylist", {
    bindings: {
        attrs: "<"
    },
    controller: "MeetStylistController",
    templateUrl: TEMPLATE_DIR + "/assets/js/angular/find-my-stylist/components/meet-stylist/meet-stylist.html"
}), function(angular) {
    window.angular.module("cabi.find-my-stylist").controller("MeetStylistController", [ "$scope", "$rootScope", "commonService", "findMyStylistService", "componentsConstant", "authService", "GoogleAnalytics", function($scope, $rootScope, commonService, findMyStylistService, componentsConstant, authService, GoogleAnalytics) {
        const $ctrl = this;
        function showError(error) {
            $ctrl.isLoading = !1, $ctrl.error = error.message;
        }
        function redirectToRSOrCallback() {
            commonService.redirectToRSOrCallback($ctrl.stylist.replicatedSiteUrl, $ctrl.attrs && $ctrl.attrs.module ? $ctrl.attrs.module.callback : null);
        }
        $ctrl.isLoading = !0, $ctrl.stylist = null, $ctrl.error = null, $ctrl.componentsConstant = componentsConstant, 
        $ctrl.$onInit = function() {
            $ctrl.stylist = $ctrl.attrs.data.stylist, GoogleAnalytics.sendEvent("NoStylist", "StylistAssigned", $ctrl.stylist.partyId), 
            authService.isAuthenticated().then(function() {
                $ctrl.isLoading = !1, $ctrl.isAuthenticated = !0;
            }, function() {
                $ctrl.isLoading = !1;
            });
        }, $ctrl.imageLoaded = function(stylist) {
            $scope.$apply(function() {
                stylist.imageLoaded = !0;
            });
        }, $ctrl.confirm = function() {
            if ($ctrl.error = null, $ctrl.isLoading = !0, $ctrl.isAuthenticated) findMyStylistService.setStylist($ctrl.stylist.partyId, $ctrl.attrs.data.stylistAssociationSource).then(redirectToRSOrCallback).catch(showError); else if ($ctrl.attrs.data && $ctrl.attrs.data.contact) findMyStylistService.addToContacts($ctrl.stylist.partyId, $ctrl.attrs.data.contact.email, $ctrl.attrs.data.contact.firstName, $ctrl.attrs.data.contact.lastName, $ctrl.attrs.data.contact.phoneNumber, $ctrl.attrs.data.communication).then(redirectToRSOrCallback).catch(showError); else redirectToRSOrCallback();
        };
    } ]);
}(), window.angular.module("cabi.find-my-stylist").component("noStylist", {
    bindings: {
        attrs: "<"
    },
    controller: "NoStylistController",
    templateUrl: TEMPLATE_DIR + "/assets/js/angular/find-my-stylist/components/no-stylist/no-stylist.html"
}), function(angular) {
    window.angular.module("cabi.find-my-stylist").controller("NoStylistController", [ "$rootScope", "componentsConstant", "GoogleAnalytics", function($rootScope, componentsConstant, GoogleAnalytics) {
        const $ctrl = this;
        $ctrl.$onInit = function() {
            GoogleAnalytics.sendEvent("StylistFound", "StylistNotFound");
        }, $ctrl.tryAgain = function() {
            if ($ctrl.attrs.from === componentsConstant.account.newCustomerRegistration) $rootScope.$broadcast("navigate", {
                from: componentsConstant.findMyStylist.noStylist,
                to: componentsConstant.account.newCustomerRegistration,
                data: $ctrl.attrs.data
            }); else $rootScope.$broadcast("navigate", {
                from: componentsConstant.findMyStylist.noStylist,
                to: componentsConstant.findMyStylist.findMyStylistGateway,
                data: $ctrl.attrs.data
            });
        };
    } ]);
}(), window.angular.module("cabi.find-my-stylist").component("selectStylist", {
    bindings: {
        attrs: "<"
    },
    controller: "SelectStylistController",
    templateUrl: TEMPLATE_DIR + "/assets/js/angular/find-my-stylist/components/select-stylist/select-stylist.html"
}), function(angular) {
    window.angular.module("cabi.find-my-stylist").controller("SelectStylistController", [ "$scope", "$rootScope", "commonService", "profileService", "componentsConstant", "findMyStylistService", "urlParametersService", "GoogleAnalytics", function($scope, $rootScope, commonService, profileService, componentsConstant, findMyStylistService, urlParametersService, GoogleAnalytics) {
        const $ctrl = this;
        $ctrl.isLoading = !1, $ctrl.stylists = [], $ctrl.selectedStylist = null, $ctrl.profileInfo = null, 
        $ctrl.error = null, $ctrl.$onInit = function() {
            if ($ctrl.attrs.module && $ctrl.attrs.module.comingFromCheckout) GoogleAnalytics.sendEvent("GuestCheckOut", "MultipleStylist"), 
            $ctrl.stylists = $ctrl.attrs.module.stylists; else GoogleAnalytics.sendEvent("StylistFound", "MultipleStylist"), 
            $ctrl.stylists = $ctrl.attrs.data.stylists;
            $ctrl.isLoading = !0, profileService.getProfile().then(function(result) {
                $ctrl.isLoading = !1, $ctrl.profileInfo = result;
            }, function() {
                $ctrl.isLoading = !1;
            });
        }, $ctrl.imageLoaded = function(stylist) {
            $scope.$apply(function() {
                stylist.imageLoaded = !0;
            });
        }, $ctrl.continue = function() {
            if ($ctrl.attrs.module && $ctrl.attrs.module.comingFromCheckout) GoogleAnalytics.sendEvent("GuestCheckOut", "StylistConfirm"); else GoogleAnalytics.sendEvent("StylistFound", "Confirm");
            if ($ctrl.error = null, $ctrl.attrs.module && $ctrl.attrs.module.comingFromCheckout) $rootScope.$broadcast("navigate", {
                from: componentsConstant.findMyStylist.selectStylist,
                to: null,
                data: $ctrl.attrs.data
            }), $ctrl.attrs.module.callback($ctrl.selectedStylist.partyId); else if ($ctrl.profileInfo) $ctrl.isLoading = !0, 
            findMyStylistService.setStylist($ctrl.selectedStylist.partyId, $ctrl.attrs.data.stylistAssociationSource).then(function() {
                $ctrl.isLoading = !1, commonService.redirectToRSOrCallback($ctrl.selectedStylist.replicatedSiteUrl, $ctrl.attrs && $ctrl.attrs.module ? $ctrl.attrs.module.callback : null);
            }).catch(function(error) {
                $ctrl.isLoading = !1, $ctrl.error = error.message;
            }); else commonService.redirectToRSOrCallback($ctrl.selectedStylist.replicatedSiteUrl, $ctrl.attrs && $ctrl.attrs.module ? $ctrl.attrs.module.callback : null);
        }, $ctrl.findMyStylist = function() {
            if ($ctrl.attrs.module && $ctrl.attrs.module.comingFromCheckout) GoogleAnalytics.sendEvent("GuestCheckOut", "NotMyStylist"), 
            $ctrl.stylists = $ctrl.attrs.module.stylists; else GoogleAnalytics.sendEvent("StylistFound", "NotMyStylist"), 
            $ctrl.stylists = $ctrl.attrs.data.stylists;
            let to = componentsConstant.findMyStylist.findMyStylistGateway;
            if ($ctrl.attrs.module && $ctrl.attrs.module.comingFromCheckout) to = null, $ctrl.attrs.module.callback(null);
            $rootScope.$broadcast("navigate", {
                from: componentsConstant.findMyStylist.selectStylist,
                to: to,
                data: $ctrl.attrs.data
            });
        };
    } ]);
}(), window.angular.module("cabi.find-my-stylist").component("findMyStylist", {
    bindings: {
        component: "@",
        attrs: "<",
        moduleData: "<"
    },
    controller: "FindMyStylistController",
    templateUrl: TEMPLATE_DIR + "/assets/js/angular/find-my-stylist/find-my-stylist.html"
}), function(angular) {
    window.angular.module("cabi.find-my-stylist").controller("FindMyStylistController", [ "$scope", "componentsConstant", "componentHandlerService", function($scope, componentsConstant, componentHandlerService) {
        const $ctrl = this;
        $ctrl.components = componentsConstant.findMyStylist, $ctrl.$onInit = function() {
            componentHandlerService.init($scope, $ctrl.component, componentsConstant.findMyStylist.findMyStylistGateway, $ctrl.attrs, $ctrl.moduleData);
        }, $ctrl.isComponentActive = componentHandlerService.isComponentActive, $ctrl.getAttrs = componentHandlerService.getAttrs;
    } ]);
}(), function(angular) {
    var component = {
        templateUrl: "/wp-content/themes/cabi/assets/js/angular/homepage/cabi-homepage/cabi-homepage.html",
        controller: [ function() {
            var $ctrl = this;
            $ctrl.$onInit = function() {
                if ($ctrl.ui = {
                    allow_contextual_email_promote: !0
                }, window.location.search.indexOf("utm_source=createcultivate") > -1) $ctrl.ui.allow_contextual_email_promote = !1;
            };
        } ]
    };
    window.angular.module("cabi.homepage").component("cabiHomepage", component);
}(), function(angular) {
    var directive = [ "$cookies", function($cookies) {
        return {
            restrict: "A",
            link: function($scope, $elm, attrs) {
                var cookie_key = "cabi.contextual-email-promote", cookie_value = angular.isDefined($cookies.get(cookie_key)) ? $cookies.get(cookie_key) : "";
                if (-1 === cookie_value.indexOf("fb-live")) {
                    var cookie_parts = 0 === cookie_value.length ? [] : cookie_value.split(",");
                    cookie_parts.push("fb-live"), $cookies.put(cookie_key, cookie_parts.join(","), {
                        path: "/"
                    }), $elm.show();
                }
                $elm.find(".close-button").on("click", function() {
                    $elm.remove();
                });
            }
        };
    } ];
    angular.module("cabi.homepage").directive("fbLiveBanner", directive);
}(window.angular), function(angular) {
    window.angular.module("cabi.homepage").component("homepageMailinglist", {
        templateUrl: "/wp-content/themes/cabi/assets/js/angular/homepage/mailinglist/homepage-mailinglist.html",
        controller: "HomepageMailinglistController"
    }).controller("HomepageMailinglistController", function() {
        var $ctrl = this;
        $ctrl.success = !1, $ctrl.onSuccess = function() {
            $ctrl.success = !0;
        };
    });
}(), function(angular) {
    angular.module("cabi.homeshow").directive("homeShowBanner", [ "showService", "cartService", "stylistInfoService", "showModalFactory", function(showService, cartService, stylistInfoService, showModalFactory) {
        return {
            scope: {},
            templateUrl: "/wp-content/themes/cabi/assets/js/angular/homeshow/directives/homeShowBanner/home-show-banner.html",
            controller: function($scope) {
                $scope.showCancelModal = function() {
                    var data = cartService.fullData;
                    data.showData = data.cartData.workEffortId, data.showIsSet = !0, showModalFactory.activate({
                        show: data
                    });
                };
            },
            link: function($scope, iElm, iAttrs, controller) {
                $scope.showService = showService, $scope.cart = cartService, $scope.$watch(function() {
                    return showService.isHomeShow();
                }, function(isHomeShow) {
                    if (angular.isDefined(isHomeShow) && isHomeShow) iElm.show(), angular.element(document.body).addClass("has-home-show"); else iElm.hide(), 
                    angular.element(document.body).removeClass("has-home-show");
                });
            }
        };
    } ]);
}(window.angular), angular.module("cabi.homeshow").directive("homeshowToggle", [ "showService", function(showService) {
    return {
        scope: {},
        templateUrl: TEMPLATE_DIR + "/assets/js/angular/homeshow/directives/homeShowToggle/homeShowToggle.html",
        link: function($scope, iElm, iAttrs, controller) {
            $scope.show = showService;
        }
    };
} ]), angular.module("cabi.homeshow").directive("homeshowModalLoader", [ "showModalFactory", "QueryString", "showService", function(showModalFactory, QueryString, showService) {
    return {
        scope: {},
        link: function($scope, iElm, iAttrs, controller) {
            var showId = QueryString.showId;
            if (showId) showService.getShow(showId).then(function(data) {
                data.showId = showId, showModalFactory.activate({
                    show: data
                });
            });
        }
    };
} ]), angular.module("cabi.homeshow").service("showService", [ "clioApiAdapter", "cartService", function(clioApiAdapter, cartService) {
    var exports = {
        getShow: function(showId) {
            return clioApiAdapter.get("GetShow", {
                showId: showId
            });
        },
        isHomeShow: function() {
            if (angular.isUndefined(cartService.data) || !angular.isObject(cartService.data)) return !1; else return "CAbiShowStore" == cartService.data.productStoreId;
        },
        removeShow: function() {
            return clioApiAdapter.get("SetShowId", {
                showId: null
            }).then(function(response) {
                cartService.forceCartUpdate(response);
            });
        },
        setShow: function(showId) {
            return clioApiAdapter.get("SetShowId", {
                showId: showId
            }).then(function(response) {
                cartService.forceCartUpdate(response);
            });
        }
    };
    return exports;
} ]), function(angular) {
    angular.module("cabi.homeshow").controller("showModalController", [ "show", "$scope", "stylistInfoService", "showModalFactory", "showService", function(show, $scope, stylistInfoService, showModalFactory, showService) {
        $scope.show = show, $scope.closeModal = showModalFactory.deactivate, $scope.stylist = stylistInfoService, 
        $scope.showIsSet = function() {
            return angular.isDefined(show.showIsSet);
        }, $scope.removeShow = function() {
            showService.removeShow().then(function(response) {
                $scope.closeModal();
            });
        }, $scope.setShow = function() {
            showService.setShow(show.showId).then(function(response) {
                $scope.closeModal();
            });
        }, $scope.canSetShow = function() {
            return show.showTodayOrEarlier && "Open" == show.ShowStatus;
        }, $scope.showIsClosed = function() {
            return show.showTodayOrEarlier && "Open" != show.ShowStatus;
        };
    } ]);
}(window.angular), angular.module("cabi.homeshow").factory("showModalFactory", [ "btfModal", function(btfModal) {
    return btfModal({
        controller: "showModalController",
        templateUrl: TEMPLATE_DIR + "/assets/js/angular/homeshow/modal/showModal.html"
    });
} ]), window.angular.module("cabi.hot-flash").component("hotFlashInstructions", {
    templateUrl: "/wp-content/themes/cabi/assets/js/angular/hot-flash/components/hot-flash-instructions/hot-flash-instructions.html"
}), function(angular, _) {
    var component = {
        bindings: {
            filters: "<",
            onFilterUpdate: "&"
        },
        templateUrl: "/wp-content/themes/cabi/assets/js/angular/hot-flash/components/hot-flash-list-filter/hot-flash-list-filter.html",
        controller: function() {
            var $ctrl = this;
            $ctrl.selectedFilters = {}, this.updateFilter = function(arg) {
                var selected_filters = {
                    categories: Object.keys(_.pick($ctrl.selectedFilters.categories, function(v, k) {
                        return v;
                    })),
                    search: $ctrl.selectedFilters.search && $ctrl.selectedFilters.search.length ? $ctrl.selectedFilters.search : null
                };
                $ctrl.onFilterUpdate({
                    $event: selected_filters
                });
            };
        }
    };
    angular.module("cabi.hot-flash").component("hotFlashListFilter", component);
}(window.angular, window._), window.angular.module("cabi.hot-flash").component("hotFlashListItem", {
    bindings: {
        object: "<"
    },
    templateUrl: "/wp-content/themes/cabi/assets/js/angular/hot-flash/components/hot-flash-list-item/hot-flash-list-item.html"
}), angular.module("cabi.hot-flash").component("hotFlashList", {
    controller: "HotFlashListController",
    controllerAs: "$ctrl",
    templateUrl: "/wp-content/themes/cabi/assets/js/angular/hot-flash/hot-flash-list.html"
}), function(angular, _) {
    function HotFlashListController(HotFlashService, $filter, $state) {
        var $ctrl = this, collection = {
            single: [],
            playlist: []
        };
        this.$onInit = function() {
            HotFlashService.getAll().then(function(response) {
                angular.forEach(response.data.data.items, function(hot_flash, i) {
                    if (hot_flash.is_training_video) collection.playlist.push(hot_flash); else collection.single.push(hot_flash);
                }), angular.copy(collection), $ctrl.collection = collection;
            });
        }, this.onFilterUpdate = function($event) {
            if ($event.search && $event.search.length) $ctrl.search = $event.search; else $ctrl.search = !1;
        }, $ctrl.openIntent = function(item) {
            $state.go("hot_flash", {
                id: item.ID
            });
        };
    }
    HotFlashListController.$inject = [ "HotFlashService", "$filter", "$state" ], angular.module("cabi.hot-flash").controller("HotFlashListController", HotFlashListController);
}(window.angular, window._), function() {
    function HotFlashService($http) {
        this.getAll = function() {
            return $http({
                method: "GET",
                url: "/wp-admin/admin-ajax.php?action=cabi_hot_flash_videos",
                cache: !0
            });
        }, this.getOne = function(id) {
            return $http({
                method: "GET",
                url: "/wp-admin/admin-ajax.php?action=cabi_hot_flash_video&id=" + id,
                cache: !0
            }).then(function(response) {
                return response.data.data.item;
            });
        };
    }
    HotFlashService.$inject = [ "$http" ], angular.module("cabi.hot-flash").service("HotFlashService", HotFlashService);
}(), window.angular.module("cabi.items-in-look").component("itemsInLook", {
    bindings: {
        products: "<"
    },
    templateUrl: "/wp-content/themes/cabi/assets/js/angular/items-in-look/items-in-look.html",
    controller: "ItemsInLookController"
}), function(angular, $) {
    angular.module("cabi.items-in-look").controller("ItemsInLookController", [ "$scope", "itemsInLookService", function($scope, itemsInLookService) {
        var params = {
            productIds: []
        };
        this.$onInit = function() {
            itemsInLookService.getCatalog(params.productIds).then(function(response) {
                $scope.collection_items = response.data;
            });
        }, this.$onChanges = function(changes) {
            params.productIds = changes.products.currentValue;
        };
    } ]);
}(window.angular, window.jQuery), angular.module("cabi.items-in-look").service("itemsInLookService", [ "$http", function($http) {
    var exports = {};
    return exports.getCatalog = function(params) {
        if (!params) params = {};
        return $http({
            url: "/wp-admin/admin-ajax.php?action=cabi_ajax_clothing_items&productIds=" + params,
            method: "GET",
            params: {}
        });
    }, exports;
} ]), function(angular) {
    function LeadFormModal(ModalService, $timeout) {
        this.open = function(config) {
            ModalService.showModal({
                templateUrl: "/wp-content/themes/cabi/assets/js/angular/lead-form/modal.html",
                controller: function(close) {
                    var $ctrl = this;
                    if (this.form_failed_time = void 0, this.close = close, this.removeModal = function() {
                        this.close(), angular.element("html").removeClass("no-scroll");
                    }, config.qualifier) $ctrl.qualifier = config.qualifier;
                    $ctrl.onFormFail = function() {
                        $timeout(function() {
                            $ctrl.form_failed_time = Date.now();
                        });
                    };
                },
                controllerAs: "$ctrl"
            });
        };
    }
    LeadFormModal.$inject = [ "ModalService", "$timeout" ], angular.module("cabi.lead-form").service("LeadFormModal", LeadFormModal);
}(window.angular), function(angular) {
    var component = {
        bindings: {
            campaign: "<",
            qualifier: "<",
            onFailure: "&"
        },
        templateUrl: "/wp-content/themes/cabi/assets/js/angular/lead-form/lead-form.html",
        controller: [ "LeadForm", "$timeout", function(LeadForm, $timeout) {
            var $ctrl = this;
            this.errors = [], this.ui = {
                submitting: !1,
                submitted: !1
            }, this.data = angular.copy(LeadForm._INTERFACE_), this.LeadSources = angular.copy(LeadForm.LEAD_SOURCES), 
            this.OutletStores = angular.copy(LeadForm.OUTLET_STORES), this.$onInit = function() {
                LeadForm.getStateProvinceList().then(function(response) {
                    $ctrl.StateProvinceList = response.data.result.list;
                });
            }, this.$onChanges = function(changes) {
                if (this.data.Comments = this.data.LeadIdentifier = changes.campaign.currentValue, 
                angular.isDefined(changes.qualifier.currentValue)) $ctrl.data.qualifier = changes.qualifier.currentValue;
            }, this.onInterestSelect = function($event) {
                $timeout(function() {
                    $ctrl.data.qualifier = $event.item;
                });
            }, this.onLeadSourceSelect = function($event) {
                $timeout(function() {
                    $ctrl.data.LeadSource = $event.item;
                });
            }, this.onOutletStoreSelect = function($event) {
                $timeout(function() {
                    $ctrl.data.Store = $event.item;
                });
            }, this.onStateProvinceSelect = function($event) {
                $timeout(function() {
                    $ctrl.data.ShowState = $event.item;
                });
            }, this.gaCapture = function(value) {
                window.ga("send", "event", "input_exit", value);
            }, this.prepareDataForValidation = function(data) {
                return (data = this.loadDomain(data)).PostalCode = data.PostalCode.toUpperCase(), 
                data;
            }, this.loadDomain = function(data) {
                if (window && window.location && window.location.host) {
                    var hostParts = window.location.host.split(".");
                    data.Domain = hostParts[hostParts.length - 1];
                }
                return data;
            }, this.onSubmit = function() {
                $timeout(function() {
                    $ctrl.ui.submitting = !0;
                }), $ctrl.data = this.prepareDataForValidation($ctrl.data), LeadForm.submit($ctrl.data).then(function(response) {
                    if ("Success" === response.data.Status) $timeout(function() {
                        $ctrl.ui.submitted = !0, $ctrl.ui.submitting = !1;
                    }); else $timeout(function() {
                        $ctrl.errors = response.data.ValidationErrors, $ctrl.ui.submitting = !1, $ctrl.onFailure();
                    });
                });
            };
        } ]
    };
    angular.module("cabi.lead-form").component("cabiLeadForm", component);
}(window.angular), function(angular) {
    function LeadFormDirective(LeadFormModal) {
        return {
            restrict: "A",
            link: function($scope, elm, attributes) {
                angular.element(elm).on("click", function() {
                    LeadFormModal.open({
                        qualifier: attributes.showLeadFormOnClick
                    }), angular.element("html").addClass("no-scroll");
                });
            }
        };
    }
    LeadFormDirective.$inject = [ "LeadFormModal" ], angular.module("cabi.lead-form").directive("showLeadFormOnClick", LeadFormDirective);
}(window.angular), function(angular) {
    function LeadFormService($http) {
        this._INTERFACE_ = {
            qualifier: null,
            FirstName: null,
            LastName: null,
            Email: null,
            DayPhone: null,
            PostalCode: null,
            LeadSource: null,
            Store: null,
            ShowCity: null,
            ShowState: null,
            ContinueWithConsultant: !0,
            DontContinueExplanation: null,
            email_opt_in: !1,
            HP: null,
            Domain: null,
            ConsultantFirstName: null,
            ConsultantLastName: null
        }, this.LEAD_SOURCES = {
            1: "At a Fashion Experience",
            2: "Through a Stylist, Hostess, Friend, or Family Member",
            3: "At a cabi Outlet Store",
            6: "Online Advertising",
            7: "Social Media (Facebook, Twitter, blog, etc.)",
            8: "zulily",
            9: "Create & Cultivate",
            5: "Other"
        }, this.OUTLET_STORES = {
            8: "Allen Outlet",
            10: "Cabazon Outlet",
            2: "Castle Rock Outlet",
            11: "Cincinnati Outlet",
            3: "Houston Outlet",
            13: "Leesburg Outlet",
            16: "Mebane Outlet",
            9: "Napa Outlet",
            7: "North Georgia Outlet",
            5: "Philadelphia Outlet",
            12: "San Marcos Outlet",
            17: "Savannah Outlet",
            6: "Woodburn Outlet"
        }, this.getStateProvinceList = function() {
            return $http({
                url: window.AJAX_SECURE_URL,
                method: "POST",
                data: {
                    id: Math.floor(1e5 * Math.random() + 1).toString(),
                    method: "GetStateProvinceList",
                    jsonrpc: "2.0"
                }
            }).then(function(response) {
                for (var list = response.data.result.list, mapped_list = {}, i = 0; i < list.length; i++) mapped_list[list[i].geoId] = list[i].geoName;
                return response.data.result.list = mapped_list, response;
            });
        }, this.submit = function(data) {
            return window.ga("send", "event", "Submitted", "Lead Form"), data[data.qualifier] = "on", 
            $http({
                url: "/wp-content/plugins/cabi-lead-forms/process-form.php",
                method: "POST",
                data: data
            }).then(function(response) {
                if ("Success" === response.data.Status) log_ga_event(data), function(form_data_raw) {
                    switch (window.google_conversion_id = 1031435614, window.google_remarketing_only = !1, 
                    window.google_conversion_format = "3", window.google_is_call = !0, form_data_raw.qualifier) {
                      case "InterestInHostingShow":
                        "shows", window.google_conversion_label = "pCUHCPbpjVoQ3urp6wM";
                        break;

                      case "InterestInBecomingConsultant":
                        "career", window.google_conversion_label = "LwfECIyRxVwQ3urp6wM";
                        break;

                      case "InterestInClothing":
                        "shopping", window.google_conversion_label = "tVjDCOrfnwMQ3urp6wM", window.google_conversion_value = 1, 
                        window.google_conversion_currency = "USD";
                    }
                    var conv_handler = window.google_trackConversion;
                    if ("function" == typeof conv_handler) conv_handler();
                }(data);
                return response;
            });
        };
    }
    var log_ga_event = function(data) {
        var label;
        switch (data.qualifier) {
          case "InterestInHostingShow":
            label = "shows";
            break;

          case "InterestInBecomingConsultant":
            label = "careers";
            break;

          case "InterestInClothing":
            label = "shop";
        }
        window.ga("send", "event", "leads", "confirm", label);
    };
    LeadFormService.$inject = [ "$http" ], angular.module("cabi.lead-form").service("LeadForm", LeadFormService);
}(window.angular), function() {
    function getDomain() {
        const hostName = window.location.hostname;
        let ret = hostName;
        if (hostName) {
            const parts = hostName.split(".").reverse();
            if (parts && parts.length > 1) if (ret = parts[1] + "." + parts[0], -1 !== hostName.toLowerCase().indexOf(".co.uk") && parts.length > 2) ret = parts[2] + "." + domain;
        }
        return ret;
    }
    angular.module("cabi.localeRedirect").service("currentDomainService", [ "$cookies", function($cookies) {
        var exports = {
            get: function() {
                return $cookies.get("cabi.domain");
            },
            set: function(domain) {
                let cookieDate = new Date();
                cookieDate.setFullYear(cookieDate.getFullYear() + 1), $cookies.put("cabi.domain", domain, {
                    path: "/",
                    domain: getDomain(),
                    expires: cookieDate.toUTCString()
                });
            }
        };
        return exports;
    } ]);
}(), function() {
    angular.module("cabi.localeRedirect").service("currentLocaleService", [ "$cookies", function($cookies) {
        var exports = {
            get: function() {
                return $cookies.get("cabi.locale");
            }
        };
        return exports.set = function(locale) {
            let cookieDate = new Date();
            cookieDate.setFullYear(cookieDate.getFullYear() + 1), $cookies.put("cabi.locale", locale, {
                path: "/",
                domain: function() {
                    const hostName = window.location.hostname;
                    let ret = hostName;
                    if (hostName) {
                        const parts = hostName.split(".").reverse();
                        if (parts && parts.length > 1) if (ret = parts[1] + "." + parts[0], -1 !== hostName.toLowerCase().indexOf(".co.uk") && parts.length > 2) ret = parts[2] + "." + domain;
                    }
                    return ret;
                }(),
                expires: cookieDate.toUTCString()
            });
        }, exports;
    } ]);
}(), function() {
    angular.module("cabi.localeRedirect").service("ipLookupService", [ "$http", function($http) {
        var exports = {
            getInfo: function() {
                return $http.get("https://ipinfo.io?token=9bcdfcd1adf164");
            }
        };
        return exports;
    } ]);
}(), function() {
    angular.module("cabi.localeRedirect").directive("localeFlag", [ "localeService", "currentLocaleService", "LocaleSelectModal", function(LocaleService, CurrentLocale, LocaleSelectModal) {
        return {
            scope: {
                locale: "="
            },
            controller: function($scope) {},
            templateUrl: TEMPLATE_DIR + "/assets/js/angular/localeRedirect/localeFlag/localeFlag.html"
        };
    } ]);
}(), function() {
    angular.module("cabi.localeRedirect").directive("localeIndicator", [ "localeService", "currentLocaleService", "LocaleSelectModal", function(LocaleService, CurrentLocale, LocaleSelectModal) {
        return {
            scope: {
                locale: "=",
                showCaret: "=?"
            },
            controller: function($scope) {
                $scope.showModal = function() {
                    LocaleSelectModal.activate({
                        source: "LOCALE_INDICATOR"
                    });
                };
            },
            link: function($scope, elm) {
                if ($scope.showCaret) elm.addClass("localeindicator--with-caret");
            },
            templateUrl: "../assets/js/angular/localeRedirect/localeIndicator/localeIndicator.html"
        };
    } ]);
}(), function(angular) {
    window.angular.module("cabi.localeRedirect").directive("localeSelector", [ "currentLocaleService", "localeService", "urlParametersService", function(CurrentLocale, LocaleService, urlParametersService) {
        return {
            controller: function($scope) {
                $scope.state = {
                    currentLocale: LocaleService.findLocaleByCode(CurrentLocale.get(), LocaleService.getDomainLocale())
                }, $scope.locales = LocaleService.getLocales(), $scope.submitLocale = function(locale) {
                    urlParametersService.switchLocale(locale);
                };
            },
            templateUrl: "../assets/js/angular/localeRedirect/localeSelector/localeSelector.html"
        };
    } ]);
}(), function() {
    var Locales = {
        US: {
            key: "USA",
            code: "US",
            domain: "com",
            name: "The United States"
        },
        CA: {
            key: "CAN",
            code: "CA",
            domain: "ca",
            name: "Canada"
        },
        GBR: {
            key: "GBR",
            code: "GBR",
            domain: "uk",
            name: "Great Britain"
        }
    };
    angular.module("cabi.localeRedirect").service("localeService", [ "$location", function($location) {
        var exports = {};
        function addUrlToLocales() {
            for (key in Locales) regex = new RegExp(getCurrentDomainSuffix() + "$", "g"), Locales[key].url = $location.host().replace(regex, Locales[key].domain);
        }
        function getCurrentDomainSuffix() {
            for (var key in Locales) {
                var domain = Locales[key].domain;
                if (new RegExp(domain + "$").test($location.host())) return domain;
            }
        }
        return exports.getDomainLocale = function() {
            for (var key in addUrlToLocales(), Locales) if (new RegExp(Locales[key].domain + "$").test($location.host())) return Locales[key];
        }, exports.getCurrencySymbol = function() {
            switch ((exports.getDomainLocale() || Locales.US).code) {
              case "USA":
              case "CAN":
                return "$";

              case "GBR":
                return "£";

              default:
                return "$";
            }
        }, exports.getCurrencyCode = function() {
            switch ((exports.getDomainLocale() || Locales.US).code) {
              case "USA":
                return "USD";

              case "CAN":
                return "CAD";

              case "GBR":
                return "GBP";

              default:
                return "USD";
            }
        }, exports.getLocales = function() {
            return addUrlToLocales(), Locales;
        }, exports.findLocaleByCode = function(code, default_value) {
            for (var key in addUrlToLocales(), Locales) if (Locales[key].code === code) return Locales[key];
            return default_value;
        }, exports;
    } ]);
}(), function() {
    function LocaleSelectModalCtrl(CurrentLocale, source, LocaleService, LocaleSelectModal) {
        this.currentLocale = LocaleService.findLocaleByCode(CurrentLocale.get(), LocaleService.getDomainLocale()), 
        this.source = source, this.state = {
            showCloseBtn: -1 !== [ "LOCALE_INDICATOR" ].indexOf(source)
        }, this.modal = LocaleSelectModal;
    }
    angular.module("cabi.localeRedirect").factory("LocaleSelectModal", [ "btfModal", function(btfModal) {
        return btfModal({
            templateUrl: "../assets/js/angular/localeRedirect/modal/modal.html",
            controller: [ "currentLocaleService", "source", "localeService", "LocaleSelectModal", LocaleSelectModalCtrl ],
            controllerAs: "$ctrl"
        });
    } ]);
}(), function(angular) {
    function LooksFooterController($scope, LooksService) {
        var $ctrl = this, slides = LooksService.getLooks();
        $ctrl.slideSettings = {
            responsive: [ {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1
                }
            } ]
        }, $ctrl.$onChanges = function(changes) {
            var currentStyle = changes.currentStyle.currentValue, nextStyleIdx = LooksService.getNext(currentStyle);
            if (0 === nextStyleIdx) $ctrl.slides = slides; else {
                var first_chunk = slides.slice(0, nextStyleIdx), last_chunk = slides.slice(nextStyleIdx, slides.length);
                $ctrl.slides = last_chunk.concat(first_chunk);
            }
        };
    }
    LooksFooterController.$inject = [ "$scope", "LooksService" ], angular.module("cabi.looks").component("looksFooter", {
        templateUrl: "/wp-content/themes/cabi/assets/js/angular/looks/components/looks-footer/looks-footer.html",
        controller: "LooksFooterController",
        bindings: {
            currentStyle: "<?"
        }
    }).controller("LooksFooterController", LooksFooterController);
}(window.angular), function(angular) {
    window.angular.module("cabi.looks").component("looksHeader", {
        templateUrl: "/wp-content/themes/cabi/assets/js/angular/looks/components/looks-header/looks-header.html",
        controller: "LooksHeaderController",
        bindings: {
            currentStyle: "<?"
        }
    }).controller("LooksHeaderController", function($scope, LooksService) {
        var $ctrl = this, slides = LooksService.getLooks();
        $ctrl.$onChanges = function(changes) {
            var currentStyle = changes.currentStyle.currentValue, nextLookIndex = LooksService.getNext(currentStyle), previousLookIndex = LooksService.getPrevious(currentStyle);
            $ctrl.nextLook = slides[nextLookIndex].key, $ctrl.previousLook = slides[previousLookIndex].key;
        };
    });
}(), function() {
    angular.module("cabi.looks").service("LooksService", function() {
        var self = this;
        this.getLooks = function() {
            return [ {
                key: "casual",
                title: "casual",
                img: "https://media.cabionline.com/wp-content/uploads/cabi-templates/f18/looks/landing/casual-thumb.jpg"
            }, {
                key: "dressy",
                title: "dressy",
                img: "https://media.cabionline.com/wp-content/uploads/cabi-templates/f18/looks/landing/dressy-thumb.jpg"
            }, {
                key: "work",
                title: "work",
                img: "https://media.cabionline.com/wp-content/uploads/cabi-templates/f18/looks/landing/work-thumb.jpg"
            }, {
                key: "cabi-clothing-classy-outfits",
                title: "jet set",
                img: "https://media.cabionline.com/wp-content/uploads/cabi-templates/f18/looks/landing/jet-set-thumb.jpg"
            }, {
                key: "off-the-clock",
                title: "off the clock",
                img: "https://media.cabionline.com/wp-content/uploads/cabi-templates/f18/looks/landing/off-the-clock-thumb.jpg"
            } ];
        }, this.getNext = function(look_key) {
            var nextStyleIdx;
            return self.getLooks().map(function(slide, i) {
                if (slide.key === look_key) if (i === self.getLooks().length - 1) nextStyleIdx = 0; else nextStyleIdx = i + 1;
            }), nextStyleIdx;
        }, this.getPrevious = function(look_key) {
            var nextStyleIdx;
            return self.getLooks().map(function(slide, i) {
                if (slide.key === look_key) if (0 === i) nextStyleIdx = self.getLooks().length - 1; else nextStyleIdx = i - 1;
            }), nextStyleIdx;
        };
    });
}(), function(angular) {
    function BlogMailinglistController(breakPointFactory, $timeout, $cookies) {
        var $ctrl = this;
        $ctrl.success = !1, $ctrl.mailingListAttrs = {}, $ctrl.hasCookie = !1, $ctrl.triggerElement = ".blog__mailinglist--static", 
        $ctrl.$onInit = function() {
            if ($ctrl.hasCookie = _getCookies(), angular.isDefined($ctrl.ifCookiePresent)) if ($ctrl.triggerElement = ".home__blog-right", 
            $cookies.get($ctrl.ifCookiePresent)) $ctrl.showMailingList(); else return; else $ctrl.showMailingList();
        }, $ctrl.onSuccess = function() {
            $ctrl.success = !0, $timeout(function() {
                $ctrl.closePanel();
            }, 5e3);
        };
        var _getCookies = function() {
            return $cookies.get($ctrl.cookieName);
        };
        $ctrl.closePanel = function() {
            $cookies.put($ctrl.cookieName, 1), $ctrl.mailingListAttrs = angular.merge($ctrl.mailingListAttrs, {
                klass: ""
            });
        }, $ctrl.showMailingList = function() {
            if (!$ctrl.hasCookie) if ("desktop-large" !== breakPointFactory.getBreakpoint()) $timeout(function() {
                $ctrl.mailingListAttrs = angular.merge($ctrl.mailingListAttrs, {
                    klass: "blog__mailinglist--fixed"
                }), $ctrl.startPin();
            }, 1e4); else $timeout(function() {
                $ctrl.mailingListAttrs = angular.merge($ctrl.mailingListAttrs, {
                    klass: "blog__mailinglist--fixed"
                });
            }, 5e3).finally(function() {
                $ctrl.startPin();
            });
        }, $ctrl.startPin = function() {
            var controller = new ScrollMagic.Controller();
            if (angular.isDefined($ctrl.ifCookiePresent)) window.scene = new ScrollMagic.Scene({
                triggerElement: $ctrl.triggerElement,
                triggerHook: "onEnter",
                reverse: !1
            }).setTween(".blog__mailinglist--toggle", .5, {
                yPercent: "100"
            }).addTo(controller); else window.scene = new ScrollMagic.Scene({
                triggerElement: $ctrl.triggerElement,
                triggerHook: "onEnter",
                reverse: !1
            }).setTween(".blog__mailinglist--toggle", .5, {
                yPercent: "100",
                zIndex: "-1"
            }).addTo(controller);
        };
    }
    BlogMailinglistController.$inject = [ "breakPointFactory", "$timeout", "$cookies" ], 
    angular.module("cabi.mailinglist").component("blogMailinglist", {
        templateUrl: "/wp-content/themes/cabi/assets/js/angular/mailinglist/blogMailinglist/blog-mailinglist.html",
        controller: "BlogMailinglistController",
        bindings: {
            cookieName: "<?",
            ifCookiePresent: "<?"
        }
    }).controller("BlogMailinglistController", BlogMailinglistController);
}(window.angular);

var MailinglistFormComponent = {
    templateUrl: "/wp-content/themes/cabi/assets/js/angular/mailinglist/mailinglist-form/mailinglist-form.html",
    controller: "MailinglistFormController",
    bindings: {
        onSuccess: "&"
    }
};

function MailinglistFormController($timeout, $http, $sce) {
    var $ctrl = this;
    $ctrl.settings = {
        loading: !1
    }, $ctrl.onSubmit = function() {
        if ($ctrl.error_message = null, !validate()) $ctrl.error_message = "This doesn’t appear to be a valid email address. Please double-check the address and try again.";
        if (validate()) $timeout(function() {
            $ctrl.settings.loading = !0;
        }), $http({
            url: window.AJAX_URL + "?action=mailinglist_signup&email=" + $ctrl.form.email
        }).then(function(response) {
            if (response.data.success) $timeout(function() {
                $ctrl.settings.loading = !1, $ctrl.success = !0, $ctrl.onSuccess();
            }); else $timeout(function() {
                $ctrl.settings.loading = !1, $ctrl.error_message = $sce.trustAsHtml(response.data.data.message);
            });
        }).catch(function(response) {
            $ctrl.settings.loading = !1;
        });
    };
    var validate = function() {
        var valid = !0;
        if (angular.isUndefined($ctrl.form) || !/.+@.+/.test($ctrl.form.email)) valid = !1;
        return valid;
    };
}

angular.module("cabi.mailinglist").component("mailinglistForm", MailinglistFormComponent), 
MailinglistFormController.$inject = [ "$timeout", "$http", "$sce" ], angular.module("cabi.mailinglist").controller("MailinglistFormController", MailinglistFormController);

var MailinglistInlineFormComponent = {
    templateUrl: "/wp-content/themes/cabi/assets/js/angular/mailinglist/mailinglist-form/mailinglist-inline-form.html",
    controller: "MailinglistFormController",
    bindings: {
        onSuccess: "&"
    }
};

angular.module("cabi.mailinglist").component("mailinglistInlineForm", MailinglistInlineFormComponent), 
angular.module("cabi.outfit").directive("scrollInsideContainer", [ "breakPointFactory", function(breakPointFactory) {
    return {
        restrict: "A",
        link: function($scope, elm, attributes) {
            if (breakPointFactory.desktopView()) {
                var $container = jQuery(attributes.scrollInsideContainer), container_top = $container.offset().top;
                $container.outerHeight(), $(elm).addClass("scroll-inside-container__scrolling-box"), 
                $container.addClass("scroll-inside-container__bounding-box"), $(document).on("scroll", function() {
                    updateTopPosition();
                });
                var updateTopPosition = function() {
                    $(elm).css("margin-top", getTopMargin());
                }, getTopMargin = function() {
                    var max = $container.outerHeight() - $(elm).outerHeight(), top_margin = $(window).scrollTop() - container_top + 10;
                    return Math.max(0, Math.min(top_margin, max));
                };
            }
        }
    };
} ]), function() {
    angular.module("cabi.product").directive("productColorSelector", [ "currentProduct", "catalogColorChoices", function(currentProduct, catalogColorChoices) {
        return {
            templateUrl: TEMPLATE_DIR + "/assets/js/angular/product/productColorSelector.html",
            link: function($scope, elm, attributes) {
                var colors = eval(attributes.colors);
                $scope.selectedValue = colors[0], $scope.catalogColorChoices = catalogColorChoices, 
                $scope.color = {
                    options: colors
                }, $scope.$watch("selectedValue", function(color, oV) {
                    currentProduct.color = color;
                }), elm.addClass("product-color-selector");
            }
        };
    } ]);
}(), angular.module("cabi.product").service("currentProduct", function() {
    var exports = {
        data: [],
        create: function(productId) {
            if (!(productId in exports.data)) exports.data[productId] = {
                canAddToCart: !1
            };
        }
    };
    return exports;
}), window.angular.module("cabi.product").directive("mainImageStage", [ "currentProduct", function(currentProduct) {
    return {
        restrict: "A",
        controller: function($scope) {
            $scope.isVideo = !1, $scope.video = !1, $scope.currentProduct = currentProduct;
        },
        link: function($scope, $elm, $attrs) {
            $scope.$watch(function() {
                return $scope.currentProduct.data[$attrs.mainImageStage].mainImage;
            }, function(mainImage, oV) {
                if ($scope.isVideo = $scope.currentProduct.data[$attrs.mainImageStage].is_video, 
                $scope.isVideo) $scope.video = "https://player.vimeo.com/video/" + $scope.currentProduct.data[$attrs.mainImageStage].mainImage + "?autoplay=1&loop=1&title=0&byline=0&portrait=0", 
                console.log(currentProduct); else $scope.video = !1;
            });
        }
    };
} ]), angular.module("cabi.product").directive("productMainImage", [ "currentProduct", function(currentProduct) {
    return {
        restrict: "A",
        link: function($scope, iElm, attributes) {
            var main_image = new window.MainImage();
            $scope.currentProduct = currentProduct, $scope.currentProduct.create(attributes.productMainImage), 
            $scope.isVideo = !1, $scope.$watch("currentProduct.data[" + attributes.productMainImage + "].mainImage", function(mainImage, oV) {
                if (!angular.isUndefined(mainImage) && null !== mainImage) main_image.set_main_image(mainImage);
            }), $scope.$on("destroy", function() {
                main_image.clear_main_image();
            });
        }
    };
} ]), function(jQuery) {
    angular.module("cabi.product").directive("scrollIntoView", function() {
        return {
            restrict: "A",
            link: function($scope, elm, attributes) {
                elm.on("click", function() {
                    jQuery("html, body").animate({
                        scrollTop: jQuery("#" + attributes.scrollIntoView).offset().top
                    });
                });
            }
        };
    });
}(jQuery), angular.module("cabi.product").directive("productThumbnailImages", [ "currentProduct", function(currentProduct) {
    var getThumbnails = function() {
        return document.querySelectorAll("#item-image-thumbnails .detail-images li a");
    };
    return {
        restrict: "A",
        link: function($scope, iElm, attributes) {
            var THUMBNAIL_LOCK = !1;
            $scope.currentProduct = currentProduct, $scope.activeThumbnailIdx = null, $scope.onThumbnailClick = function(idx) {
                THUMBNAIL_LOCK = !0, setActiveThumbnail(idx), currentProduct.data[attributes.productThumbnailImages].color = {
                    description: angular.element(getThumbnails()[idx]).attr("data-color")
                };
                var $a = angular.element(getThumbnails()[idx]);
                if ($a.attr("data-item-ids")) currentProduct.data[attributes.productThumbnailImages].outfitIds = $a.attr("data-item-ids"); else currentProduct.data[attributes.productThumbnailImages].outfitIds = null;
            }, $scope.onPrevClick = function() {
                if (null !== $scope.activeThumbnailIdx && $scope.activeThumbnailIdx >= 1) {
                    var targetElement = angular.element(".item-non-mobile-view #detail-images-wrapper .detail-images li:nth-of-type(" + $scope.activeThumbnailIdx + ") > a");
                    if (targetElement.hasClass("image-thumbnail-video-trigger")) {
                        var youtubeVideoId = targetElement.attr("set-youtube-video-id");
                        $scope.onThumbnailVideoClick(youtubeVideoId, $scope.activeThumbnailIdx - 1);
                    } else setActiveThumbnail($scope.activeThumbnailIdx - 1);
                }
            }, $scope.onNextClick = function() {
                if (null !== $scope.activeThumbnailIdx && $scope.activeThumbnailIdx < getThumbnails().length - 1) {
                    var targetElement = angular.element(".item-non-mobile-view #detail-images-wrapper .detail-images li:nth-of-type(" + ($scope.activeThumbnailIdx + 2) + ") > a");
                    if (targetElement.hasClass("image-thumbnail-video-trigger")) {
                        var youtubeVideoId = targetElement.attr("set-youtube-video-id");
                        $scope.onThumbnailVideoClick(youtubeVideoId, $scope.activeThumbnailIdx + 1);
                    } else setActiveThumbnail($scope.activeThumbnailIdx + 1);
                }
            };
            var setActiveThumbnail = function(idx) {
                $scope.activeThumbnailIdx = idx, $scope.currentProduct.create(attributes.productThumbnailImages), 
                currentProduct.data[attributes.productThumbnailImages].mainImage = angular.element(getThumbnails()[$scope.activeThumbnailIdx]).attr("data-full-image"), 
                currentProduct.data[attributes.productThumbnailImages].is_video = !1;
            };
            $scope.onThumbnailVideoClick = function(youtube_id, idx) {
                $scope.activeThumbnailIdx = idx, currentProduct.data[attributes.productThumbnailImages].mainImage = youtube_id, 
                currentProduct.data[attributes.productThumbnailImages].is_video = !0, delete currentProduct.data[attributes.productThumbnailImages].outfitIds;
            }, $scope.$watch("currentProduct.data[" + attributes.productThumbnailImages + "].color", function(color, oV) {
                if (!angular.isUndefined(color) && null !== color) {
                    if (!THUMBNAIL_LOCK) setActiveThumbnail(function(color) {
                        var idx = null, thumbnails = getThumbnails();
                        return angular.forEach(thumbnails, function(thumbnail, idxCandidate) {
                            if (angular.element(thumbnail).attr("data-color") == color.description && null == idx) idx = idxCandidate;
                        }), idx;
                    }(color));
                    THUMBNAIL_LOCK = !1;
                }
            }), setActiveThumbnail(0), setTimeout(function() {
                window.Item_Thumbnails_Scroll_Helper.init();
            }, 25);
        }
    };
} ]), window.angular.module("cabi.quicklook").directive("quicklookContent", [ function() {
    return {
        scope: {
            product: "=product"
        },
        templateUrl: "../assets/js/angular/quicklook/directives/content/content.html",
        controller: function($scope) {}
    };
} ]), function(angular) {
    function getActiveIndex(images) {
        for (var i = 0; i < images.length; i++) if (images[i].active) return i;
    }
    window.angular.module("cabi.quicklook").directive("quicklookImages", [ function() {
        return {
            scope: {
                images: "=images"
            },
            templateUrl: "../assets/js/angular/quicklook/directives/images/images.html",
            controller: function($scope) {
                $scope.showNextImage = function() {
                    var current_active_idx = getActiveIndex($scope.images);
                    $scope.images[current_active_idx].name;
                    if ($scope.images[current_active_idx].active = !1, current_active_idx === $scope.images.length - 1) $scope.images[0].active = !0; else $scope.images[current_active_idx + 1].active = !0;
                }, $scope.showPreviousImage = function() {
                    var current_active_idx = getActiveIndex($scope.images);
                    if ($scope.images[current_active_idx].active = !1, 0 === current_active_idx) $scope.images[$scope.images.length - 1].active = !0; else $scope.images[current_active_idx - 1].active = !0;
                }, $scope.images[0].active = !0;
            }
        };
    } ]);
}(), angular.module("cabi.quicklook").directive("quicklook", [ "quicklookModal", function(quicklookModal) {
    return {
        scope: {
            preselectedProduct: "=?"
        },
        restrict: "A",
        link: function($scope, iElm, iAttrs, controller) {
            iElm.on("click", function(event) {
                event.preventDefault(), quicklookModal.activate({
                    productId: iAttrs.productId,
                    preselectedProduct: $scope.preselectedProduct,
                    cartItem: null
                });
            });
        }
    };
} ]), angular.module("cabi.quicklook").controller("quicklookController", [ "productId", "cartItem", "preselectedProduct", "$scope", "quicklookModal", "quicklookService", "currentProduct", "clioEnabled", "stylistInfoService", "favoritesService", "$rootScope", "catalogColorChoices", function(productId, cartItem, preselectedProduct, $scope, quicklookModal, quicklookService, currentProduct, clioEnabled, stylistInfoService, favoritesServices, $rootScope, catalogColorChoices) {
    if ($scope.addedToWishlist = !1, $scope.loading = !1, $scope.loadingWishlist = !1, 
    $scope.productId = productId, $scope.currentProduct = currentProduct, $scope.currentColor = null, 
    $scope.CLIO_ENABLED = clioEnabled, $scope.stylistInfo = stylistInfoService, $scope.catalogColorChoices = catalogColorChoices, 
    $scope.modal = {
        currentProductId: null
    }, cartItem) $scope.cartItem = cartItem; else $scope.cartItem = null;
    if (preselectedProduct) $scope.preselectedProduct = preselectedProduct;
    $scope.closeModal = function() {
        quicklookModal.deactivate();
    }, $scope.setColor = function(colorName) {
        $scope.currentColor = {
            name: colorName
        }, goToImageForColor(colorName);
    }, $scope.onCurrentProductChange = function(finalProductId) {
        $scope.finalProductId = finalProductId;
    };
    var goToImageForColor = function(colorName) {
        var current_active_idx = function(images) {
            for (var i = 0; i < images.length; i++) if (images[i].active) return i;
        }($scope.data.images);
        $scope.data.images[current_active_idx].active = !1;
        for (var i = 0; i < $scope.data.images.length; i++) if ($scope.data.images[i].name == colorName) return void ($scope.data.images[i].active = !0);
    };
    function findProductIdOnSizeList(sizeList, productId) {
        for (var sizeName in sizeList) if (sizeList[sizeName][0] === productId) return sizeName;
    }
    $scope.$watch("currentProduct.data['" + $scope.productId + "'].color", function(nV, oV) {
        if (angular.isDefined(nV) && angular.isDefined(nV.description)) $scope.setColor(nV.description);
    }), $scope.onProductLoaded = function(productData) {
        if ($scope.preselectedColor = function(productData, productId) {
            var variantTree = productData.variantTree;
            for (var colorName in variantTree) if (findProductIdOnSizeList(variantTree[colorName], productId)) return colorName;
        }(productData, $scope.preselectedProduct), $scope.preselectedColor) $scope.setColor($scope.preselectedColor);
    }, $scope.addToCart = function() {
        $scope.loading = !0;
        var addToCartDirective = document.querySelector("add-to-cart");
        if (addToCartDirective) angular.element(addToCartDirective).isolateScope().addToCart(), 
        fbq("track", "AddToCart");
    }, $scope.updateCartItem = function() {
        $scope.loading = !0;
        var addToCartDirective = document.querySelector("add-to-cart");
        if (addToCartDirective) angular.element(addToCartDirective).isolateScope().updateCartItem();
    }, $scope.isFashionFlash = function(productData) {
        return -1 !== $scope.data.categories.indexOf("fashion-flash");
    }, quicklookService.getQuicklook(productId).then(function(response) {
        if ($scope.data = response.data, $scope.modal.currentProductId = $scope.data.productId, 
        $scope.data.multicolor) if (!angular.isUndefined(currentProduct.data[$scope.productId])) $scope.setColor(currentProduct.data[$scope.productId].color.description); else $scope.setColor($scope.data.colors[0].description);
    });
} ]), angular.module("cabi.quicklook").factory("quicklookModal", [ "btfModal", function(btfModal) {
    return btfModal({
        controllerAs: "modal",
        controller: "quicklookController",
        templateUrl: "../assets/js/angular/quicklook/directives/quicklook.html"
    });
} ]), function(angular, AJAX_URL) {
    angular.module("cabi.quicklook").service("quicklookService", [ "$http", function($http) {
        var exports = {
            getQuicklook: function(productId) {
                return $http.get(AJAX_URL + "?action=cabi_quick_look&productId=" + productId);
            }
        };
        return exports.getQuicklooks = exports.getQuicklook, exports;
    } ]);
}(window.angular, window.AJAX_URL), app.factory("breakPointFactory", [ "$window", function($window) {
    var exports = {}, getCurrentWidth = function() {
        return $window.innerWidth;
    };
    return exports.getBreakpoint = function() {
        if (getCurrentWidth() < 480) return "mobile"; else if (getCurrentWidth() >= 480 && getCurrentWidth() < 768) return "tablet"; else if (getCurrentWidth() >= 768 && getCurrentWidth() < 1e3) return "desktop-small"; else if (getCurrentWidth() >= 1e3) return "desktop-large";
    }, exports.mobileView = function() {
        if (getCurrentWidth() <= 768) return !0; else return !1;
    }, exports.desktopView = function() {
        if (getCurrentWidth() > 768) return !0; else return !1;
    }, exports;
} ]), function(angular) {
    app.service("clioApiAdapter", [ "$http", "$q", "Schemas", "errorEnum", function($http, $q, Schemas, errorEnum) {
        var exports = {
            get: function(method, params, enableNullAndFalseValues) {
                var defer = $q.defer(), data = prepareData(method, params, enableNullAndFalseValues), url = prepareRequestUrl();
                return $http.post(url, data).then(function(response) {
                    if (!angular.isObject(response.data)) return defer.reject(errorEnum.GENERAL);
                    if (!angular.isUndefined(response.data.error)) return defer.reject(getError(response.data.error) || response.data.error);
                    if (!angular.isObject(response.data.result)) return defer.reject(errorEnum.GENERAL);
                    if ("CreateUpdateAddress" == method) if (response.data.result.cartData) data = serializer("GetCart", response.data.result); else data = serializer("MyProfile", response.data.result); else if ("CreateUpdateCreditCard" == method) if (response.data.result.cartData) data = serializer("GetCart", response.data.result); else data = serializer("CreateUpdateCreditCard", response.data.result); else if (response.data.result.cartData) data = serializer("GetCart", response.data.result); else data = serializer(method, response.data.result);
                    return defer.resolve(data);
                }, function(response) {
                    return defer.reject(response);
                }), defer.promise;
            }
        }, prepareData = function(method, params, enableNullAndFalseValues) {
            var tempObj = {};
            if (angular.isUndefined(params)) params = {};
            if (angular.isObject(params)) angular.forEach(params, function(value, key) {
                if (!enableNullAndFalseValues) {
                    if (0 !== value && !value) return;
                    if ("boolean" != typeof value && !angular.isObject(value)) value = "" + value;
                    tempObj[key] = value;
                } else tempObj[key] = value;
            }), params = tempObj;
            if (!angular.isUndefined(window.CONSULTANT_PARTY_ID)) params.consultantPartyId = window.CONSULTANT_PARTY_ID;
            return angular.toJson({
                id: 1,
                jsonrpc: "2.0",
                method: method,
                params: params
            });
        }, prepareRequestUrl = function() {
            return AJAX_SECURE_URL;
        }, serializer = function(method, data) {
            var _data = data, schema = Schemas[method];
            if (angular.isObject(schema)) angular.forEach(schema, function(value, key) {
                if (!angular.isDefined(_data[key])) return !1;
                if (angular.isFunction(value)) _data[key] = value(_data[key], _data);
            });
            return _data;
        }, getError = function(error) {
            var _error = null;
            if (angular.forEach(errorEnum, function(errorObject) {
                if (!_error) if (errorObject.code == error.code) if (_error = errorObject, angular.isDefined(errorObject.message)) _error.message = errorObject.message; else _error.message = error.message;
            }), !_error) (_error = errorEnum.GENERAL).message = error.message ? error.message : errorEnum.GENERAL.message;
            return _error;
        };
        return exports;
    } ]);
}(angular), function() {
    app.service("dpPositionService", [ "$log", "$rootScope", function($log, $rootScope) {
        var exports = {
            queue: []
        };
        return exports.lastQueued = function() {
            return exports.queue[exports.queue.length - 1];
        }, exports.triggerScrollBehaviour = function(dirId) {
            exports.queue.push(dirId), $rootScope.$broadcast("documentPositionManualScroll");
        }, exports;
    } ]);
}(), angular.module("cabi").service("gaTrackingService", [ "cabiAdapter", "$window", function(cabiAdapter, $window) {
    var exports = {
        setUserId: function(id) {
            return $window.ga("set", "userId", id);
        }
    };
    return exports;
} ]), angular.module("cabi").service("giftCardService", [ "clioApiAdapter", function(clioApiAdapter) {
    var exports = {
        getGiftCards: function() {
            return clioApiAdapter.get("GetGiftCardProduct", {
                productId: "GC-CABI"
            });
        },
        setCartGiftCard: function(parameters) {
            return clioApiAdapter.get("SetCartGiftCard", parameters);
        },
        getCartGiftCard: function(parameters) {
            return clioApiAdapter.get("GetCartGiftCard", parameters);
        }
    };
    return exports;
} ]), angular.module("cabi").service("productService", [ "cabiAdapter", function(cabiAdapter) {
    var exports = {
        getProduct: function(productId) {
            return cabiAdapter.get("GetProduct", {
                productId: productId
            });
        },
        getProductInventory: function(productId) {
            return cabiAdapter.get("GetProductInventory", {
                productId: productId
            });
        }
    };
    return exports;
} ]), app.service("Profile", function(CLIO_API) {
    var _response = null;
    return {
        get: function() {
            if (!_response) _response = CLIO_API.request("MyProfile");
            return _response;
        }
    };
}), angular.module("cabi").factory("QueryString", function() {
    for (var query_string = {}, vars = window.location.search.substring(1).split("&"), i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (void 0 === query_string[pair[0]]) query_string[pair[0]] = decodeURIComponent(pair[1]); else if ("string" == typeof query_string[pair[0]]) {
            var arr = [ query_string[pair[0]], decodeURIComponent(pair[1]) ];
            query_string[pair[0]] = arr;
        } else query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
    return query_string;
}), angular.module("cabi.api.service").factory("stylistInfoService", [ "clioApiAdapter", "$q", function(clioApiAdapter, $q) {
    var exports = {};
    return exports.data = window.CABI_STYLIST_INFO, exports;
} ]), window.angular.module("cabi.shared").component("customDropdown", {
    require: {
        ngModelCtrl: "ngModel"
    },
    bindings: {
        placeholder: "@?",
        ngModel: "=",
        options: "=",
        class: "@?",
        displayProperty: "@?",
        disabled: "=?",
        onChange: "&",
        trackBy: "@"
    },
    controller: "CustomDropdownController",
    templateUrl: TEMPLATE_DIR + "/assets/js/angular/shared/components/custom-dropdown/custom-dropdown.html"
}), function(angular) {
    window.angular.module("cabi.shared").controller("CustomDropdownController", [ function() {
        const $ctrl = this;
        $ctrl.isDropdownOpen = !1, $ctrl.getLabel = function(label) {
            if ($ctrl.displayProperty) if (label && label[$ctrl.displayProperty]) return label[$ctrl.displayProperty]; else return "";
            return label;
        }, $ctrl.toggleDropdown = function() {
            if (!$ctrl.disabled) $ctrl.isDropdownOpen = !$ctrl.isDropdownOpen;
        }, $ctrl.changeOption = function(option) {
            $ctrl.ngModel = option, $ctrl.isDropdownOpen = !1, $ctrl.onChange({
                model: $ctrl.ngModel
            });
        };
    } ]);
}(), window.angular.module("cabi.shared").component("customInput", {
    require: {
        ngModelCtrl: "ngModel"
    },
    bindings: {
        type: "@",
        name: "@",
        placeholder: "@?",
        ngModel: "=",
        disabled: "=?"
    },
    controller: "CustomInputController",
    templateUrl: TEMPLATE_DIR + "/assets/js/angular/shared/components/custom-input/custom-input.html"
}), function(angular) {
    window.angular.module("cabi.shared").controller("CustomInputController", [ function() {
        this.showPassword = !1, this.showPlaceholder = !0;
    } ]);
}(), window.angular.module("cabi.shared").component("phoneInputCheckout", {
    require: {
        ngModelCtrl: "ngModel"
    },
    bindings: {
        name: "@",
        ngModel: "=",
        disabled: "=?"
    },
    controller: "PhoneInputController",
    templateUrl: TEMPLATE_DIR + "/assets/js/angular/shared/components/phone-input/phone-input-checkout.html"
}), window.angular.module("cabi.shared").component("phoneInput", {
    require: {
        ngModelCtrl: "ngModel"
    },
    bindings: {
        name: "@",
        placeholder: "@?",
        ngModel: "=",
        disabled: "=?"
    },
    controller: "PhoneInputController",
    templateUrl: TEMPLATE_DIR + "/assets/js/angular/shared/components/phone-input/phone-input.html"
}), function(angular) {
    window.angular.module("cabi.shared").controller("PhoneInputController", [ "localeService", "currentLocaleService", function(localeService, currentLocaleService) {
        const $ctrl = this;
        $ctrl.showPlaceholder = !0, $ctrl.locale = localeService.findLocaleByCode(currentLocaleService.get(), localeService.getDomainLocale()), 
        $ctrl.mask = "GBR" === $ctrl.locale.key ? "9-9999-999999" : "(999) 999-9999", $ctrl.pattern = "GBR" === $ctrl.locale.key ? "0-[^0].*" : ".*", 
        $ctrl.minLength = "GBR" === $ctrl.locale.key ? "13" : "14", $ctrl.ukNumberPrefix = function(model) {
            if ("GBR" === $ctrl.locale.key && model && 1 === model.length && "0" !== model.charAt(0)) model = "0-" + model[0], 
            $ctrl.ngModel = model;
        };
    } ]);
}(), window.angular.module("cabi.shared").constant("componentsConstant", {
    account: {
        loginGateway: "account.login-gateway",
        loginAuthenticate: "account.login-authenticate",
        forgotPassword: "account.forgot-password",
        changePassword: "account.change-password",
        newCustomerRegistration: "account.new-customer-registration",
        existingCustomerRegistration: "account.existing-customer-registration",
        alreadyLoggedIn: "account.already-logged-in"
    },
    findMyStylist: {
        findMyStylistGateway: "find-my-stylist.find-my-stylist-gateway",
        selectStylist: "find-my-stylist.select-stylist",
        noStylist: "find-my-stylist.no-stylist",
        confirmStylist: "find-my-stylist.confirm-stylist",
        meetStylist: "find-my-stylist.meet-stylist"
    },
    exchangeAndReturn: {
        exchangeAndReturnForm: "exchange-and-return.exchange-and-return-form",
        noResult: "exchange-and-return.no-result",
        anyResult: "exchange-and-return.any-result"
    }
}), window.angular.module("cabi.shared").constant("outletStoresConstant", [ {
    value: "ALLEN",
    label: "Allen Outlet"
}, {
    value: "CABAZON",
    label: "Cabazon Outlet"
}, {
    value: "CASTLE_ROCK",
    label: "Castle Rock Outlet"
}, {
    value: "CINCINNATI",
    label: "Cincinnati Outlet"
}, {
    value: "HOUSTON",
    label: "Houston Outlet"
}, {
    value: "LEESBURG",
    label: "Leesburg Outlet"
}, {
    value: "MEBANE",
    label: "Mebane Outlet"
}, {
    value: "NAPA",
    label: "Napa Outlet"
}, {
    value: "NORTH_GEORGIA",
    label: "North Georgia Outlet"
}, {
    value: "PHILADELPHIA",
    label: "Philadelphia Outlet"
}, {
    value: "SAN_MARCOS",
    label: "San Marcos Outlet"
}, {
    value: "SAVANNAH",
    label: "Savannah Outlet"
}, {
    value: "WOODBURN",
    label: "Woodburn Outlet"
} ]), window.angular.module("cabi.shared").constant("sourcesConstant", [ {
    label: "referred by a friend or family member",
    value: "Friend"
}, {
    label: "at a cabi Outlet Store",
    value: "Store"
}, {
    label: "online advertising",
    value: "Online"
}, {
    label: "social media (Facebook, Twitter, blog, etc.)",
    value: "Social Media"
}, {
    label: "zulily",
    value: "Zulily"
}, {
    label: "other",
    value: "Other"
} ]), function(angular) {
    angular.module("cabi.shared").directive("imageOnload", function() {
        return {
            restrict: "A",
            scope: {
                method: "&imageOnload"
            },
            link: (scope, element, attrs) => {
                angular.element(element).on("load", function() {
                    scope.method();
                }), angular.element(element).on("error", function() {
                    scope.method(), angular.element(element).css("display", "none");
                });
            }
        };
    });
}(window.angular), function(angular) {
    window.angular.module("cabi.shared").filter("capitalize", function() {
        return function(str) {
            if (str) return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase(); else return "";
        };
    });
}(), function(angular) {
    window.angular.module("cabi.shared").filter("phoneNumber", function() {
        return function(str) {
            if (str) return (str + "").replace(new RegExp(/-|\/| |\(|\)/, "g"), ""); else return "";
        };
    });
}(), function(angular) {
    window.angular.module("cabi.shared").filter("phoneNumberFormat", [ "currentLocaleService", "localeService", function(currentLocaleService, localeService) {
        return function(input) {
            const locale = localeService.findLocaleByCode(currentLocaleService.get(), localeService.getDomainLocale());
            if (input && input.length >= 10) {
                const str = input + "";
                if ("GBR" === locale.key) return str.slice(0, 1) + "-" + str.slice(1, 5) + "-" + str.slice(5); else return "(" + str.slice(0, 3) + ") " + str.slice(3, 6) + "-" + str.slice(6);
            }
            return "";
        };
    } ]);
}(), function(angular) {
    window.angular.module("cabi.shared").service("accountService", [ "clioApiAdapter", function(clioApiAdapter) {
        let accountService = {
            sendResetPasswordRequest: function(email) {
                return clioApiAdapter.get("ResetPasswordRequest", {
                    username: email
                });
            },
            resetPassword: function(oldPassword, newPassword, confirmedNewPassword, email) {
                return clioApiAdapter.get("ResetPassword", {
                    temporaryPassword: oldPassword,
                    password: newPassword,
                    passwordConfirmation: confirmedNewPassword,
                    username: email
                });
            },
            changePasswordAndLogin: function(oldPassword, newPassword, email) {
                return clioApiAdapter.get("ChangePasswordAndLogin", {
                    password: oldPassword,
                    newPassword: newPassword,
                    username: email
                });
            },
            validateUserLogin: function(email) {
                return clioApiAdapter.get("ValidateUserLogin", {
                    loginId: email
                });
            },
            registerExistingCustomer: function(firstName, lastName, email, password, wantsNewsMail) {
                return clioApiAdapter.get("CreateAccount", {
                    emailAddress: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: password,
                    optInMailingList: wantsNewsMail ? "Y" : "N"
                });
            },
            registerNewCustomer: function(searchStylistWrapperParams, createAccountParams, communication, stylistSource, phoneNumber) {
                return clioApiAdapter.get("RegisterAndAssign", {
                    searchStylistWrapperParams: searchStylistWrapperParams,
                    createAccountParams: createAccountParams,
                    communication: communication,
                    stylistAssociationSource: stylistSource,
                    phoneNumber: phoneNumber
                });
            },
            validateRegisterCode: function(tempCode, emailAddress) {
                return clioApiAdapter.get("ValidateRegisterCode", {
                    tempCode: tempCode,
                    emailAddress: emailAddress
                });
            }
        };
        return accountService;
    } ]);
}(), function(angular) {
    const STORAGE_PREFIX = "auth_", DEVICE_ID_LENGTH = 10;
    window.angular.module("cabi.account").service("authService", [ "$q", "$cookies", "clioApiAdapter", function($q, $cookies, clioApiAdapter) {
        let authService = {}, _loggedIn = !1;
        function getDomain() {
            const hostName = window.location.hostname;
            let ret = hostName;
            if (hostName) {
                const parts = hostName.split(".").reverse();
                if (parts && parts.length > 1) if (ret = parts[1] + "." + parts[0], -1 !== hostName.toLowerCase().indexOf(".co.uk") && parts.length > 2) ret = parts[2] + "." + domain;
            }
            return ret;
        }
        return authService.parameterTypes = {
            DEVICE_ID: "deviceId",
            TOKEN: "token"
        }, authService.getDeviceId = function() {
            let deviceId = $cookies.get(STORAGE_PREFIX + authService.parameterTypes.DEVICE_ID);
            if (!deviceId || deviceId.length !== DEVICE_ID_LENGTH) {
                deviceId = btoa(Math.random().toString()).substr(5, DEVICE_ID_LENGTH);
                let cookieDate = new Date();
                cookieDate.setFullYear(cookieDate.getFullYear() + 1), $cookies.put(STORAGE_PREFIX + authService.parameterTypes.DEVICE_ID, deviceId, {
                    path: "/",
                    domain: getDomain(),
                    expires: cookieDate.toUTCString()
                });
            }
            return deviceId;
        }, authService.getAuthToken = function() {
            return $cookies.get(STORAGE_PREFIX + authService.parameterTypes.TOKEN);
        }, authService.login = function(email, password, rememberMe) {
            return $q(function(resolve, reject) {
                clioApiAdapter.get("LoginWithoutConsultantPartyId", {
                    username: email,
                    password: password,
                    deviceId: rememberMe ? authService.getDeviceId() : void 0
                }).then(function(response) {
                    if (rememberMe && response.authToken) {
                        let cookieDate = new Date();
                        cookieDate.setFullYear(cookieDate.getFullYear() + 1), $cookies.put(STORAGE_PREFIX + authService.parameterTypes.TOKEN, response.authToken, {
                            path: "/",
                            domain: getDomain(),
                            expires: cookieDate.toUTCString()
                        });
                    }
                    resolve(response);
                }).catch(function(error) {
                    reject(error);
                });
            });
        }, authService.isAuthenticated = function() {
            return $q(function(resolve, reject) {
                if (_loggedIn) return resolve(!0); else {
                    const deviceId = authService.getDeviceId(), authToken = authService.getAuthToken(), payload = deviceId && authToken ? {
                        deviceId: deviceId,
                        authToken: authToken
                    } : {};
                    clioApiAdapter.get("CheckLogin", payload).then(function(response) {
                        resolve(response);
                    }).catch(function(error) {
                        reject(error);
                    });
                }
            });
        }, authService.logout = function() {
            return authService.invalidate(), clioApiAdapter.get("Logout", {
                clearCart: !0
            });
        }, authService.invalidate = function() {
            _loggedIn = !1;
            let cookieDate = new Date();
            cookieDate.setFullYear(cookieDate.getFullYear() - 1), $cookies.put(STORAGE_PREFIX + authService.parameterTypes.TOKEN, "", {
                path: "/",
                domain: getDomain(),
                expires: cookieDate.toUTCString()
            });
        }, authService;
    } ]);
}(), function(angular) {
    window.angular.module("cabi.shared").service("commonService", [ "$q", "clioApiAdapter", "localeService", "currentLocaleService", "$window", function($q, clioApiAdapter, localeService, currentLocaleService, $window) {
        let _stateProvinceList, commonService = {
            stylistAssociationSource: {
                GEO: "GEO",
                STYLIST: "STYLIST",
                HOSTESS: "HOSTESS",
                CUSTOMER: "CUSTOMER"
            },
            countryLabels: {
                USA: {
                    zipCode: "Zip Code",
                    state: "State"
                },
                CAN: {
                    zipCode: "Zip Code",
                    state: "Province"
                },
                GBR: {
                    zipCode: "Postal Code",
                    state: "County"
                }
            }
        };
        return commonService.getStateProvinceList = function() {
            return $q(function(resolve, reject) {
                if (_stateProvinceList) return resolve(_stateProvinceList); else clioApiAdapter.get("GetStateProvinceList").then(function(response) {
                    _stateProvinceList = response, resolve(response);
                }).catch(function(error) {
                    reject(error);
                });
            });
        }, commonService.redirectToRSOrCallback = function(rsURL, cb) {
            if (cb) cb(rsURL); else $window.location = rsURL + $window.location.pathname;
        }, commonService.getCountryLabels = function() {
            const locale = localeService.findLocaleByCode(currentLocaleService.get(), localeService.getDomainLocale());
            if (locale) return commonService.countryLabels[locale.key]; else return commonService.countryLabels.USA;
        }, commonService;
    } ]);
}(), function(angular) {
    window.angular.module("cabi.shared").service("componentHandlerService", [ function() {
        let componentHandlerService = {}, _activeComponent = "", _attrs = {}, _prev = [];
        function navigate(component) {
            if (function(component) {
                if (component) return !!Object.keys(_activeComponent).filter(function(key) {
                    return _activeComponent[key] === component;
                }); else return !1;
            }(component)) _activeComponent = component;
            if (component && _prev && _prev.length > 0 && _prev[_prev.length - 1] && component.split(".")[0] === _prev[_prev.length - 1].split(".")[0]) _prev.pop();
        }
        return componentHandlerService.init = function($scope, startComponent, activeComponent, attrs, moduleData) {
            if (activeComponent && "" !== activeComponent) _prev.push(activeComponent);
            _activeComponent = activeComponent, _attrs = Object.assign(attrs || {}, {
                module: moduleData
            }), navigate(startComponent), $scope.$on("navigate", function(event, attrs) {
                navigate((_attrs = Object.assign(attrs || {}, {
                    module: moduleData
                })).to);
            });
        }, componentHandlerService.isComponentActive = function(component) {
            return _activeComponent === component || -1 !== _prev.indexOf(component);
        }, componentHandlerService.getAttrs = function() {
            return _attrs;
        }, componentHandlerService;
    } ]);
}(), function(angular) {
    window.angular.module("cabi.shared").service("exchangeAndReturnService", [ "clioApiAdapter", function(clioApiAdapter) {
        let exchangeAndReturnService = {
            getGuestOrderHistory: function(orderId, emailAddress, city, state, address1, address2, zip) {
                return clioApiAdapter.get("GuestOrderHistory", {
                    orderId: orderId,
                    emailAddress: emailAddress,
                    city: city,
                    state: state,
                    address1: address1,
                    address2: address2,
                    zip: zip
                });
            }
        };
        return exchangeAndReturnService;
    } ]);
}(), function(angular) {
    window.angular.module("cabi.shared").service("findMyStylistService", [ "$q", "clioApiAdapter", function($q, clioApiAdapter) {
        let findMyStylistService = {
            getMyStylists: function(email) {
                return clioApiAdapter.get("GetMyStylists", {
                    emailAddress: email
                });
            },
            getMyStylistsWithReplicated: function(email) {
                return clioApiAdapter.get("GetMyStylistsWithReplicated", {
                    emailAddress: email
                });
            },
            checkIfCurrentConsultantIsValid: function(email, stylistSource) {
                return $q(function(resolve, reject) {
                    if (window.CABI_STYLIST_INFO) findMyStylistService.getMyStylists(email).then(function(response) {
                        const currentStylist = response.myStylists.find(stylist => stylist.partyId === window.CONSULTANT_PARTY_ID);
                        if (currentStylist) findMyStylistService.setStylist(currentStylist.partyId, stylistSource).then(function() {
                            resolve(currentStylist);
                        }).catch(function(error) {
                            reject(error);
                        }); else resolve(!1);
                    }).catch(function(error) {
                        reject(error);
                    }); else resolve(!1);
                });
            },
            setStylist: function(consultantPartyId, stylistAssociationSource) {
                return clioApiAdapter.get("SetStylist", {
                    consultantPartyId: consultantPartyId,
                    stylistAssociationSource: stylistAssociationSource,
                    unknownContactEnabled: !0
                });
            },
            addToContacts: function(consultantPartyId, emailAddress, firstName, lastName, phoneNumber, communication) {
                return clioApiAdapter.get("AddEmailToContacts", {
                    owningPartyId: consultantPartyId,
                    emailAddress: emailAddress,
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phoneNumber,
                    communication: communication
                });
            },
            searchStylistByName: function(searchType, firstName, lastName, email, country, state) {
                return clioApiAdapter.get("SearchStylistByName", {
                    searchType: searchType,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    clioCountryCode: country,
                    state: state
                });
            },
            searchStylistWrapper: function(firstName, lastName, email, zipCode, friendFirstName, friendLastName, state, clioCountryCode) {
                return clioApiAdapter.get("SearchStylistWrapper", {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    zipCode: zipCode,
                    friendFirstName: friendFirstName,
                    friendLastName: friendLastName,
                    state: state,
                    clioCountryCode: clioCountryCode
                });
            }
        };
        return findMyStylistService;
    } ]);
}(), function(angular) {
    window.angular.module("cabi.shared").service("GoogleAnalytics", [ "$window", function($window) {
        let googleAnalytics = {
            sendEvent: function(category, action, value) {
                $window.ga("send", "event", category, action, value);
            }
        };
        return googleAnalytics;
    } ]);
}(), function(angular) {
    const STORAGE_PREFIX = "angular_";
    angular.module("cabi.shared").service("urlParametersService", [ "$location", "$cookies", "currentLocaleService", "currentDomainService", "$window", function($location, $cookies, currentLocaleService, currentDomainService, $window) {
        let urlParametersService = {}, _storage = {};
        function mapValue(value) {
            if ("undefined" !== value) {
                if ("null" === value) return null;
                if ("true" === value) return !0;
                if ("false" === value) return !1;
                if (!isNaN(parseFloat(value)) && isFinite(value)) return Number(value); else return value;
            }
        }
        return urlParametersService.parameterTypes = {
            EMAIL: "email",
            REMEMBER_ME: "rememberMe",
            COMPONENT: "component",
            ZIP_CODE: "zipCode",
            PHONE_NUMBER: "phoneNumber",
            GUEST_FIRST_NAME: "guestFirstName",
            GUEST_LAST_NAME: "guestLastName",
            STYLIST_SOURCE: "stylistSource",
            HIDE_COMM_PREF: "hideCommPref"
        }, urlParametersService.exludeFromStorage = [ urlParametersService.parameterTypes.COMPONENT ], 
        urlParametersService.excludeFromURLExtend = [ urlParametersService.parameterTypes.PHONE_NUMBER, urlParametersService.parameterTypes.GUEST_FIRST_NAME, urlParametersService.parameterTypes.GUEST_LAST_NAME, urlParametersService.parameterTypes.STYLIST_SOURCE, urlParametersService.parameterTypes.ZIP_CODE, urlParametersService.parameterTypes.HIDE_COMM_PREF ], 
        urlParametersService.loadParametersFromUrl = function() {
            const urlQueryString = $location.absUrl().split("?")[1], urlParameters = angular.isDefined(urlQueryString) ? JSON.parse('{"' + decodeURIComponent(urlQueryString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}') : "";
            Object.keys(urlParametersService.parameterTypes).map(function(parameterType) {
                const key = urlParametersService.parameterTypes[parameterType];
                if (!_storage[key]) _storage[key] = mapValue(urlParameters[key]);
            }), Object.keys(urlParametersService.parameterTypes).map(function(parameterType) {
                const key = urlParametersService.parameterTypes[parameterType];
                if (!_storage[key] && !urlParametersService.exludeFromStorage.includes(key)) _storage[key] = mapValue($cookies.get(STORAGE_PREFIX + key));
            });
        }, urlParametersService.getParameter = function(key) {
            return _storage[key];
        }, urlParametersService.setParameter = function(key, value) {
            if (_storage[key] = value, !urlParametersService.exludeFromStorage.includes(key)) {
                let cookieDate = new Date();
                cookieDate.setFullYear(cookieDate.getFullYear() + 1), $cookies.put(STORAGE_PREFIX + key, value, {
                    path: "/",
                    domain: function() {
                        const hostName = $window.location.hostname;
                        let ret = hostName;
                        if (hostName) {
                            const parts = hostName.split(".").reverse();
                            if (parts && parts.length > 1) if (ret = parts[1] + "." + parts[0], -1 !== hostName.toLowerCase().indexOf(".co.uk") && parts.length > 2) ret = parts[2] + "." + domain;
                        }
                        return ret;
                    }(),
                    expires: cookieDate.toUTCString()
                });
            }
        }, urlParametersService.switchLocale = function(locale, extendWithURLParameters = !1) {
            let queryParams = [];
            currentLocaleService.set(locale.code), currentDomainService.set(locale.url);
            let redirectUrl = $window.location.href.replace($window.location.host, locale.url);
            if (extendWithURLParameters) Object.keys(_storage).map(function(key) {
                if (redirectUrl = urlParametersService.removeParamFromURL(key, redirectUrl), void 0 !== _storage[key] && null !== _storage[key] && "" !== _storage[key] && !urlParametersService.excludeFromURLExtend.includes(key)) queryParams.push(key + "=" + encodeURIComponent(_storage[key]));
            });
            redirectUrl = urlParametersService.removeParamFromURL("__locale", redirectUrl), 
            queryParams.push("__locale=" + encodeURIComponent(locale.code));
            const prefix = -1 === redirectUrl.split("/").pop().indexOf("?") ? "?" : "&";
            $window.location.href = redirectUrl + prefix + queryParams.join("&");
        }, urlParametersService.removeParamFromURL = function(key, url) {
            return url.replace(new RegExp(`&?${key}=[^&]*`, "gi"), "").replace("?&", "?").replace(/\?$/, "");
        }, urlParametersService;
    } ]);
}(window.angular), window.jQuery, window.angular.module("ab.socialShare").directive("socialShareButtons", [ "$timeout", function($timeout) {
    return {
        scope: {
            url: "=?",
            title: "=?",
            image: "=?",
            postId: "=?",
            description: "=?",
            imageShare: "=?imageShare",
            type: "=?type",
            onChooseOption: "=?"
        },
        templateUrl: "/wp-content/themes/cabi/assets/js/angular/social/socialShareButtons.html",
        controller: function($scope, $http) {
            $scope.shareToFb = function() {
                event.preventDefault(), function() {
                    if (!angular.isDefined(window.FB)) !function(d, s, id) {
                        var js, fjs = d.getElementsByTagName(s)[0];
                        if (!d.getElementById(id)) (js = d.createElement(s)).id = id, js.src = "//connect.facebook.net/en_US/sdk.js", 
                        fjs.parentNode.insertBefore(js, fjs);
                    }(document, "script", "facebook-jssdk");
                }(), $http({
                    method: "POST",
                    url: "/wp-admin/admin-ajax.php?action=cabi_facebook_sharer",
                    data: {
                        url: $scope.url,
                        title: $scope.title,
                        image: $scope.image,
                        description: $scope.description
                    }
                }).then(function(response) {
                    var id = JSON.parse(response.data.data).id, site = window.origin;
                    FB.ui({
                        method: "share",
                        href: site + "/cabi-facebook-sharer/" + id
                    });
                }, function(response) {
                    $scope.error = response.statusText;
                }), ga("send", "social", "Facebook", "share", $scope.url);
            }, window.fbAsyncInit = function() {
                FB.init({
                    appId: window.FB_APP_ID,
                    xfbml: !0,
                    version: "v2.1"
                });
            };
        },
        link: function($scope, elm, attributes) {
            if ($scope.hide = {}, angular.isUndefined($scope.url)) $scope.url = window.location.href;
            if (angular.isUndefined($scope.title)) $scope.title = document.title;
            if (angular.isDefined(attributes.hide)) angular.forEach(attributes.hide.split(","), function(key) {
                $scope.hide[key] = !0;
            });
            if (angular.isUndefined($scope.image)) $scope.image = document.querySelector("meta[property='og:image']") ? document.querySelector("meta[property='og:image']").content : "";
            if (angular.isUndefined($scope.description)) $scope.description = document.querySelector("meta[property='og:description']") ? document.querySelector("meta[property='og:description']").content : document.querySelector("title").innerHTML;
            $scope.mailLink = "mailto:?subject=" + encodeURI($scope.title) + "&body=" + encodeURI($scope.url), 
            $scope.$watch("title", function(nV, oV) {
                $scope.title = nV.replace("|", "-");
            });
        }
    };
} ]).directive("bSocialShareLink", [ "socialService", function(socialService) {
    return {
        restrict: "C",
        require: "^socialShareButtons",
        link: function($scope, element, attributes, controller) {
            element.on("click", function(event) {
                if (!angular.isDefined(attributes.ngClick)) if (!angular.isDefined(attributes.ngHref)) event.preventDefault(), 
                socialService.share(attributes.title, attributes.href);
            });
        }
    };
} ]).factory("EmailShareModal", [ "btfModal", function(btfModal) {
    return btfModal({
        controller: "EmailShareModalCtrl",
        controllerAs: "$ctrl",
        templateUrl: TEMPLATE_DIR + "/assets/js/angular/social/emailShareModal.html"
    });
} ]).service("EmailShareService", [ "$http", "favoritesService", function($http, favoritesService) {
    var exports = {
        send: function(type, data) {
            switch (type) {
              case "wishlist":
                return favoritesService.sendFavoritesEmail(data.consultantPartyId, data.to_name, data.to_email, data.subject, data.message);

              default:
                return data.type = type, $http({
                    method: "POST",
                    url: window.AJAX_URL + "?action=cabi_social_share_buttons_send_email",
                    data: {
                        data: data
                    }
                });
            }
        }
    };
    return exports;
} ]).controller("EmailShareModalCtrl", [ "type", "data", "EmailShareModal", "EmailShareService", "Notification", function(type, data, EmailShareModal, EmailShareService, Notification) {
    var $ctrl = this;
    $ctrl.data = data, $ctrl.type = type, $ctrl.data.subject = "Here's something from cabi I wanted to share with you!", 
    this.close = EmailShareModal.deactivate, this.send = function() {
        var data;
        EmailShareService.send(type, (data = $ctrl.data, data.permalink = window.location.href, 
        data)).then(function() {
            $ctrl.close(), Notification.success("Your message has been sent");
        });
    };
} ]).directive("multipleEmails", function() {
    return {
        require: "ngModel",
        link: function(scope, element, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                var re = /\S+@\S+\.\S+/;
                if (-1 === viewValue.split(",").map(function(str) {
                    return re.test(str.trim());
                }).indexOf(!1)) return ctrl.$setValidity("multipleEmails", !0), viewValue; else ctrl.$setValidity("multipleEmails", !1);
            });
        }
    };
}).directive("emailShareModal", [ "EmailShareModal", function(EmailShareModal) {
    return {
        restrict: "A",
        link: function($scope, elm, attributes) {
            var type = $scope.$parent.type;
            elm.on("click", function() {
                if (null !== document.querySelector("#modal")) angular.element(document.querySelector("#modal")).scope().$ctrl.closeModal();
                EmailShareModal.activate({
                    type: type,
                    data: {
                        image: $scope.$parent.image,
                        post_id: $scope.$parent.postId
                    }
                });
            });
        }
    };
} ]), angular.module("ab.socialShare").service("socialService", [ "$http", function($http) {
    var exports = {
        share: function(title, url) {
            var top = window.screen.height / 2 - 315, left = window.screen.width / 2 - 290, features = "resizable=yes,scrollbars=yes,menubar=no,status=no,location=no,directories=no,top=" + top + ",left=" + left + ",screenX=" + left + ",screenY=" + top + ",width=560,height=530";
            window.open(url, title, features);
        }
    };
    return exports;
} ]), angular.module("cabi.ui").directive("addClassIfAuthenticated", [ "authServiceNew", function(authServiceNew) {
    return {
        restrict: "A",
        scope: {},
        controller: [ "$scope", "$element", "$attrs", "$transclude", function($scope, $element, $attrs, $transclude) {
            $scope.authServiceNew = authServiceNew;
        } ],
        link: function($scope, elm) {
            $scope.authServiceNew.isLogin().then(function(response) {
                elm.addClass("cabi-is-authenticated");
            });
        }
    };
} ]), function(angular) {
    function AttachedEcommModalService(ModalService, $rootScope) {
        let attachedEcommModalService = {};
        function getModule(component) {
            if (angular.isDefined(component)) return component.split(".")[0]; else return "";
        }
        return attachedEcommModalService.open = function(config) {
            const template = '<div class="o-modal ae-modal">    <div class="o-modal-knockout">        <a class="o-modal__close" ng-click="$ctrl.close()"></a>        <div class="o-modal-content">            <div class="ae-modal-content">                ' + function(config) {
                if (angular.isDefined(config.component)) {
                    let html = "<" + getModule(config.component) + ' component="' + config.component + '"';
                    if (angular.isDefined(config.moduleData)) html += ' module-data="$ctrl.moduleData"';
                    if (angular.isDefined(config.attrs)) html += ' attrs="$ctrl.attrs"';
                    return html += "></" + getModule(config.component) + ">";
                }
                return "";
            }(config) + "            </div>        </div>    </div></div>";
            ModalService.showModal({
                template: template,
                controller: function(close) {
                    const $ctrl = this;
                    $ctrl.moduleData = config.moduleData, $ctrl.attrs = config.attrs;
                    const removeListener = $rootScope.$on("navigate", function(event, attrs) {
                        if (!attrs.to) $ctrl.close(); else if (getModule(attrs.from) !== getModule(attrs.to)) $ctrl.close(), 
                        attachedEcommModalService.open({
                            component: attrs.to,
                            moduleData: $ctrl.moduleData,
                            attrs: attrs
                        });
                    });
                    document.documentElement.classList.add("ae-modal-opened"), $ctrl.close = function() {
                        document.documentElement.classList.remove("ae-modal-opened"), removeListener(), 
                        close();
                    };
                },
                controllerAs: "$ctrl"
            });
        }, attachedEcommModalService;
    }
    AttachedEcommModalService.$inject = [ "ModalService", "$rootScope" ], angular.module("cabi.ui").service("AttachedEcommModalService", AttachedEcommModalService);
}(window.angular), function(angular) {
    function directive($window, AttachedEcommModalService, urlParametersService) {
        return {
            restrict: "A",
            scope: {},
            link: function($scope, elm, attrs) {
                urlParametersService.loadParametersFromUrl();
                const component = urlParametersService.getParameter(urlParametersService.parameterTypes.COMPONENT);
                angular.element(document).on("ready", function() {
                    if (component) AttachedEcommModalService.open({
                        component: component
                    });
                });
            }
        };
    }
    directive.$inject = [ "$window", "AttachedEcommModalService", "urlParametersService" ], 
    angular.module("cabi.ui").directive("attachedEcommUrlObserver", directive);
}(window.angular), window.angular.module("cabi.ui").component("cabiDropdown", {
    bindings: {
        label: "<",
        options: "<",
        icon: "<?",
        onSelect: "&"
    },
    controller: function() {
        var $ctrl = this;
        this.ui = {
            open: !1
        }, this.onSelectOption = function(option) {
            $ctrl.ui.open = !1, this.onSelect({
                $event: {
                    option: option
                }
            });
        };
    },
    templateUrl: "/wp-content/themes/cabi/assets/js/angular/ui/dropdown/dropdown.html"
}), angular.module("cabi.ui").directive("hideIfLoggedIn", [ "authService", function(authService) {
    return {
        restrict: "A",
        scope: {},
        controller: [ "$scope", "$element", "$attrs", "$transclude", function($scope, $element, $attrs, $transclude) {
            $scope.authService = authService;
        } ],
        link: function($scope, elm) {
            $scope.authService.isAuthenticated().then(angular.noop, function() {
                elm.addClass("show");
            });
        }
    };
} ]), function(angular) {
    angular.module("cabi.ui").directive("onEscKeypress", function() {
        return {
            restrict: "A",
            link: function($scope, elm, attrs) {
                var events = "keydown.onEscKeypress keypress.onEscKeypress";
                angular.element(document).on(events, function(event) {
                    if (27 === event.which) $scope.$apply(function() {
                        $scope.$eval(attrs.onEscKeypress);
                    }), event.preventDefault();
                }), elm.on("$destroy", function(event) {
                    angular.element(document).unbind(events);
                });
            }
        };
    });
}(window.angular), function(angular) {
    function directive($window) {
        return {
            restrict: "A",
            scope: {
                pageScrollCallback: "&"
            },
            link: function($scope, elm, attrs) {
                var page_height = angular.element("html").height(), page_scroll_percentage = parseInt(attrs.pageScrollPercentage);
                if (0 !== page_scroll_percentage) angular.element($window).bind("load.onPageScrollAmount", function() {
                    angular.element($window).bind("scroll.onPageScrollAmount", function() {
                        if (this.pageYOffset / page_height * 100 >= page_scroll_percentage) $scope.pageScrollCallback(), 
                        angular.element($window).unbind("scroll.onPageScrollAmount");
                    });
                }); else $scope.pageScrollCallback();
            }
        };
    }
    directive.$inject = [ "$window" ], angular.module("cabi.ui").directive("onPageScrollAmount", directive);
}(window.angular), function(angular) {
    function directive($window, AttachedEcommModalService, componentsConstant) {
        return {
            restrict: "A",
            scope: {},
            link: function($scope, elm, attrs) {
                angular.element(elm).on("click", function() {
                    AttachedEcommModalService.open({
                        component: componentsConstant.exchangeAndReturn.exchangeAndReturnForm
                    });
                });
            }
        };
    }
    directive.$inject = [ "$window", "AttachedEcommModalService", "componentsConstant" ], 
    angular.module("cabi.ui").directive("openExchangeReturnModal", directive);
}(window.angular), function(angular) {
    function directive($window, AttachedEcommModalService, GoogleAnalytics) {
        return {
            restrict: "A",
            scope: {},
            link: function($scope, elm, attrs) {
                angular.element(elm).on("click", function() {
                    GoogleAnalytics.sendEvent("TopNav", "FindStylistButton"), AttachedEcommModalService.open({
                        component: attrs.openFindStylistModal
                    });
                });
            }
        };
    }
    directive.$inject = [ "$window", "AttachedEcommModalService", "GoogleAnalytics" ], 
    angular.module("cabi.ui").directive("openFindStylistModal", directive);
}(window.angular), function(angular) {
    function directive($window, AttachedEcommModalService, authService) {
        return {
            restrict: "A",
            scope: {},
            link: function($scope, elm, attrs) {
                angular.element(elm).on("click", function() {
                    if (attrs.favorites) authService.isAuthenticated().then(function() {
                        window.location = "/clothing-collection/wish-list/";
                    }, function() {
                        AttachedEcommModalService.open({
                            component: "account.login-gateway",
                            moduleData: {
                                loginTitle: "Sign in to save or view Favorites.",
                                modalSource: "Wish List",
                                callback: function(rsURL) {
                                    window.location = rsURL + "/clothing-collection/wish-list/";
                                }
                            }
                        });
                    }); else AttachedEcommModalService.open({
                        component: "account.login-gateway",
                        moduleData: {
                            modalSource: "TopNav"
                        }
                    });
                });
            }
        };
    }
    directive.$inject = [ "$window", "AttachedEcommModalService", "authService" ], angular.module("cabi.ui").directive("openLoginRegisterModal", directive);
}(window.angular), function(angular) {
    angular.module("cabi.ui").directive("scrollToTopWhen", function($timeout) {
        return {
            link: function($scope, element, attrs) {
                $scope.$watch(function() {
                    return attrs.scrollToTopWhen;
                }, function(nV, oV) {
                    $timeout(function() {
                        angular.element(element)[0].scrollTop = 0;
                    });
                });
            }
        };
    });
}(window.angular), window.angular.module("cabi.ui").component("cabiSelectList", {
    templateUrl: "/wp-content/themes/cabi/assets/js/angular/ui/select-list/select-list.html",
    bindings: {
        options: "<",
        value: "<",
        onSelect: "&"
    },
    controller: function() {
        this.$onInit = function() {};
    }
}), function(angular, $) {
    angular.module("cabi.ui").directive("cabiSelectList", function() {
        return {
            restrict: "A",
            link: function($scope, elm, attrs) {
                var config = {
                    selected_item: $(elm).find("li").first(),
                    id: "dropdown-list-" + $scope.$id,
                    onSelect: $scope.$eval(attrs.cabiSelectList)
                };
                $scope.$on("itemsDidRender.cabiSelectList", function(e) {
                    $(elm).prepend(function(elm, config) {
                        var $wrapper = $("<div />", {
                            class: "dropdown-list",
                            id: config.id
                        });
                        $wrapper.prepend("<a href='#' data-selected-item>" + $(config.selected_item).find("a").html() + "</a>");
                        var $clone = $(elm).find("ul").clone();
                        return $clone.attr("id", null).find("ul").remove(), $clone.hide(), $wrapper.append($clone), 
                        $(elm).find("ul").remove(), $wrapper.append($("<input />", {
                            type: "hidden",
                            name: config.id,
                            value: $(config.selected_item).find("a").attr("data-value") || $(config.selected_item).find("a").attr("href")
                        })), $wrapper;
                    }(elm, config)), function(config) {
                        $(document).on("click", "#" + config.id + " a[data-selected-item]", function(e) {
                            e.preventDefault(), $("ul", "#" + config.id).slideToggle("fast");
                        }), $(document).on("mouseleave", "#" + config.id, function(e) {
                            $("ul", "#" + config.id).hide();
                        }), $(document).on("click", "#" + config.id + " ul *", function(e) {
                            var _elements = function(e) {
                                var $li, $a;
                                if ($(e.target).is("a")) e.stopPropagation(), e.preventDefault(), $li = $(e.target).parents("li").first(); else $li = $(e.target);
                                return $a = $li.find("a"), [ $li, $a ];
                            }(e), $li = _elements[0];
                            if (_elements[1], config.onSelect) config.onSelect({
                                $event: {
                                    item: $li.find("a").attr("data-value")
                                }
                            }), setTextByValue($li.find("a").attr("data-value"), config);
                            $("ul", "#" + config.id).hide();
                        });
                    }(config);
                    var default_value = $scope.$eval(attrs.cabiSelectListValue);
                    if (default_value) setTextByValue(default_value, config);
                }), $scope.$watch(function() {
                    return $scope.$eval(attrs.cabiSelectListValue);
                }, function(nV, oV) {
                    if (nV != oV) setTextByValue(nV, config);
                });
            }
        };
        function setTextByValue(value, config) {
            var $a = $("[data-value=" + value + "]", $("ul", "#" + config.id));
            $("[data-selected-item]", "#" + config.id).text($a.text());
        }
    });
}(window.angular, window.jQuery), function(angular, $) {
    function Directive($timeout) {
        return {
            restrict: "A",
            link: function($scope, elm, attrs) {
                if ($scope.$last) $timeout(function() {
                    $scope.$emit("itemsDidRender.cabiSelectList");
                });
            }
        };
    }
    Directive.inject = [ "$timeout" ], angular.module("cabi.ui").directive("cabiSelectListItem", Directive);
}(window.angular, window.jQuery), angular.module("cabi.ui").directive("showIfLoggedIn", [ "authService", function(authService) {
    return {
        restrict: "A",
        scope: {},
        controller: [ "$scope", "$element", "$attrs", "$transclude", function($scope, $element, $attrs, $transclude) {
            $scope.authService = authService;
        } ],
        link: function($scope, elm) {
            $scope.authService.isAuthenticated().then(function(response) {
                elm.addClass("show");
            });
        }
    };
} ]);
//# sourceMappingURL=../../.tmp/angular-compiled.js.map