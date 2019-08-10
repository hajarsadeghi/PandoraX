/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./dev/js/getStarted/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dev/css/getStarted/getStarted.scss":
/*!********************************************!*\
  !*** ./dev/css/getStarted/getStarted.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./dev/css/getStarted/getStarted.scss?");

/***/ }),

/***/ "./dev/js/api.js":
/*!***********************!*\
  !*** ./dev/js/api.js ***!
  \***********************/
/*! exports provided: verify_email */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"verify_email\", function() { return verify_email; });\nvar verify_email = function verify_email(url, params, callback) {\n  return fetch(url, {\n    method: \"POST\",\n    body: JSON.stringify(params)\n  }).then(function (response) {\n    if (response.status >= 200 && response.status <= 299) {\n      response.json().then(function (res) {\n        callback(true, res);\n      });\n    } else {\n      callback(false, res);\n    }\n  });\n};\n\n//# sourceURL=webpack:///./dev/js/api.js?");

/***/ }),

/***/ "./dev/js/getStarted/index.js":
/*!************************************!*\
  !*** ./dev/js/getStarted/index.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_animate_css_animate_min_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/animate.css/animate.min.css */ \"./node_modules/animate.css/animate.min.css\");\n/* harmony import */ var _node_modules_animate_css_animate_min_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_animate_css_animate_min_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _css_getStarted_getStarted_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../css/getStarted/getStarted.scss */ \"./dev/css/getStarted/getStarted.scss\");\n/* harmony import */ var _css_getStarted_getStarted_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_getStarted_getStarted_scss__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main.js */ \"./dev/js/getStarted/main.js\");\n\n\n\n\n//# sourceURL=webpack:///./dev/js/getStarted/index.js?");

/***/ }),

/***/ "./dev/js/getStarted/main.js":
/*!***********************************!*\
  !*** ./dev/js/getStarted/main.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helper_countdown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../helper/countdown */ \"./dev/js/helper/countdown.js\");\n\n\nvar API = __webpack_require__(/*! ./../api.js */ \"./dev/js/api.js\");\n\nvar $inputs = $(\".digit-cell\");\nvar intRegex = /^\\d+$/; // ... navigate through get started boxes\n\n$('.get-started-link').click(function () {\n  var box = '.' + $(this).attr('box');\n  $('.get-started-box').removeClass('d-block');\n  $('.get-started-box').addClass('d-none');\n  $(box).addClass('d-block');\n}); // Prevents user from manually entering non-digits.\n\n$inputs.on(\"input.fromManual\", function () {\n  // ... change focus on type\n  var cellIndex = $(this).attr('index');\n\n  if ($(this).val().length == 1) {\n    $(this).blur();\n    setTimeout(function () {\n      $('input[name=\"char[' + (Number(cellIndex) + 1) + ']\"]').focus();\n    }, 100);\n  } // ... check for NaN\n\n\n  if (!intRegex.test($(this).val())) {\n    $(this).val(\"\");\n  }\n});\n$inputs.on('contextmenu', function () {\n  console.log('on context menu');\n}); // Prevents pasting non-digits and if value is 6 characters long will parse each character into an individual box.\n\n$inputs.on(\"paste\", function () {\n  var $this = $(this);\n  var originalValue = $this.val();\n  $this.val(\"\");\n  $this.one(\"input.fromPaste\", function () {\n    var pastedValue = $(this).val();\n\n    if (pastedValue.length == 6 && intRegex.test(pastedValue)) {\n      pasteValues(pastedValue);\n    } else {\n      $this.val(originalValue);\n    }\n\n    $inputs.attr(\"maxlength\", 1);\n  });\n  $inputs.attr(\"maxlength\", 6);\n});\n$inputs.on(\"keydown\", function (e) {\n  var $this = $(this);\n  var cellIndex = $this.attr('index'); // ... arrowLeft\n\n  if (e.keyCode == 37) {\n    $this.blur();\n    setTimeout(function () {\n      $('input[name=\"char[' + (Number(cellIndex) - 1) + ']\"]').focus();\n    }, 100);\n  } // ... arrowRight\n\n\n  if (e.keyCode == 39) {\n    $this.blur();\n    setTimeout(function () {\n      $('input[name=\"char[' + (Number(cellIndex) + 1) + ']\"]').focus();\n    }, 100);\n  } // ... check verification\n\n\n  setTimeout(function () {\n    var otp = $('input[name=\"char[1]\"]').val() + $('input[name=\"char[2]\"]').val() + $('input[name=\"char[3]\"]').val() + $('input[name=\"char[4]\"]').val() + $('input[name=\"char[5]\"]').val() + $('input[name=\"char[6]\"]').val();\n\n    if (otp.length == 6) {\n      if ($this.closest('.get-started-box').hasClass('new-email-code-box')) {\n        checkVerification({\n          \"user_email\": $('.new-space-email-box').find('#adminEmail').val(),\n          \"user_otp\": otp\n        }, function (res) {\n          window.location.replace('space');\n        });\n      } else if ($this.closest('.get-started-box').hasClass('find-space-code-box')) {\n        checkVerification({\n          \"user_email\": $('.find-space-email-box').find('#userEmail').val(),\n          \"user_otp\": otp\n        }, function (res) {\n          window.location.replace('/');\n        });\n      }\n    }\n  }, 200);\n}); // ... verify email ...\n\n$('.send-otp, #resendEmail').on('click', function () {\n  var temp = $(this);\n  $('.' + $(this).attr('box')).find('input').val('');\n  RequestOtp({\n    \"user_email\": $(this).closest('form').find('[type=\"email\"]').val()\n  }, $('.' + $(this).attr('box')).find('.countdown'));\n}); // Parses the individual digits into the individual boxes.\n\nfunction pasteValues(element) {\n  var values = element.split(\"\");\n  $(values).each(function (index) {\n    var $inputBox = $('.digit-cell[name=\"char[' + (index + 1) + ']\"]');\n    $inputBox.val(values[index]);\n  });\n}\n\n; // ... request otp\n\nfunction RequestOtp(params, countdownElement) {\n  API.verify_email('api/user/login/otp/request/', params, function (status, res) {\n    if (status) {\n      var countdown = new _helper_countdown__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n      countdown.startTimer(res.expire, countdownElement);\n    } else {\n      console.log('error');\n    }\n  });\n} // ... verify otp\n\n\nfunction checkVerification(params, callback) {\n  API.verify_email('api/user/login/otp/verify/', params, function (status, res) {\n    if (status, res) {\n      callback(res);\n    } else {\n      console.log('error');\n    }\n  });\n}\n\n//# sourceURL=webpack:///./dev/js/getStarted/main.js?");

/***/ }),

/***/ "./dev/js/helper/countdown.js":
/*!************************************!*\
  !*** ./dev/js/helper/countdown.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar CountDown =\n/*#__PURE__*/\nfunction () {\n  function CountDown() {\n    _classCallCheck(this, CountDown);\n  }\n\n  _createClass(CountDown, [{\n    key: \"startTimer\",\n    value: function startTimer(time, view) {\n      var timer = time,\n          minutes = '',\n          seconds = '',\n          display = view,\n          displayMinutes = display.find('.minutes'),\n          displaySeconds = display.find('.seconds');\n      $('input').removeAttr('readonly');\n      display.find('.timer').removeClass('d-none');\n      display.find('.resend-email').addClass('d-none');\n      var countdown = setInterval(function () {\n        minutes = parseInt(timer / 60, 10);\n        seconds = parseInt(timer % 60, 10);\n        minutes = minutes < 10 ? \"0\" + minutes : minutes;\n        seconds = seconds < 10 ? \"0\" + seconds : seconds;\n        displayMinutes.text(minutes);\n        displaySeconds.text(seconds);\n\n        if (timer > 0) {\n          --timer;\n        } else {\n          timer = time;\n          clearInterval(countdown);\n          $('input').attr('readonly', true);\n          display.find('.timer').addClass('d-none');\n          display.find('.resend-email').removeClass('d-none');\n        }\n      }, 1000);\n    }\n  }]);\n\n  return CountDown;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (CountDown);\n\n//# sourceURL=webpack:///./dev/js/helper/countdown.js?");

/***/ }),

/***/ "./node_modules/animate.css/animate.min.css":
/*!**************************************************!*\
  !*** ./node_modules/animate.css/animate.min.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./node_modules/animate.css/animate.min.css?");

/***/ })

/******/ });