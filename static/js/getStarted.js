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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"verify_email\", function() { return verify_email; });\nvar verify_email = function verify_email(params, callback) {\n  return fetch(\"api/user/login/otp/request/\", {\n    method: \"POST\",\n    body: JSON.stringify(params)\n  }).then(function (response) {\n    if (response.status >= 200 && response.status <= 299) {\n      response.json().then(function (res) {\n        callback(true, res);\n      });\n    } else {\n      callback(false, res);\n    }\n  });\n};\n\n//# sourceURL=webpack:///./dev/js/api.js?");

/***/ }),

/***/ "./dev/js/getStarted/index.js":
/*!************************************!*\
  !*** ./dev/js/getStarted/index.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_animate_css_animate_min_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/animate.css/animate.min.css */ \"./node_modules/animate.css/animate.min.css\");\n/* harmony import */ var _node_modules_animate_css_animate_min_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_animate_css_animate_min_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _css_getStarted_getStarted_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../css/getStarted/getStarted.scss */ \"./dev/css/getStarted/getStarted.scss\");\n/* harmony import */ var _css_getStarted_getStarted_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_getStarted_getStarted_scss__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main.js */ \"./dev/js/getStarted/main.js\");\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_main_js__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\n//# sourceURL=webpack:///./dev/js/getStarted/index.js?");

/***/ }),

/***/ "./dev/js/getStarted/main.js":
/*!***********************************!*\
  !*** ./dev/js/getStarted/main.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// import verify_email from './../api.js';\nvar API = __webpack_require__(/*! ./../api.js */ \"./dev/js/api.js\");\n\n$('.get-started-link').click(function () {\n  $('.get-started-box').removeClass('d-block');\n  $('.get-started-box').addClass('d-none');\n});\n$('#newSpaceBtn').click(function () {\n  $('.validate-email-box').addClass('d-block');\n});\n$('#confirmEmailBtn').click(function () {\n  $('.validate-code-box').addClass('d-block');\n});\n$('.find-space-btn').click(function () {\n  $('.find-space-email-box').addClass('d-block');\n});\n$('#checkEmailBtn').click(function () {\n  $('.check-inbox-box').addClass('d-block');\n});\nvar $inputs = $(\".digit-cell\");\nvar intRegex = /^\\d+$/; // Prevents user from manually entering non-digits.\n\n$inputs.on(\"input.fromManual\", function () {\n  // ... change focus on type\n  var cellIndex = $(this).attr('index');\n\n  if ($(this).val().length == 1) {\n    $(this).blur();\n    setTimeout(function () {\n      $('input[name=\"char[' + (Number(cellIndex) + 1) + ']\"]').focus();\n    }, 100);\n  } // ... check for NaN\n\n\n  if (!intRegex.test($(this).val())) {\n    $(this).val(\"\");\n  }\n}); // Prevents pasting non-digits and if value is 6 characters long will parse each character into an individual box.\n\n$inputs.on(\"paste\", function () {\n  var $this = $(this);\n  var originalValue = $this.val();\n  $this.val(\"\");\n  $this.one(\"input.fromPaste\", function () {\n    $currentInputBox = $(this);\n    var pastedValue = $currentInputBox.val();\n\n    if (pastedValue.length == 6 && intRegex.test(pastedValue)) {\n      pasteValues(pastedValue);\n    } else {\n      $this.val(originalValue);\n    }\n\n    $inputs.attr(\"maxlength\", 1);\n  });\n  $inputs.attr(\"maxlength\", 6);\n});\n$inputs.on(\"keydown\", function (e) {\n  var $this = $(this);\n  var cellIndex = $this.attr('index'); // ... arrowLeft\n\n  if (e.keyCode == 37) {\n    $this.blur();\n    setTimeout(function () {\n      $('input[name=\"char[' + (Number(cellIndex) - 1) + ']\"]').focus();\n    }, 100);\n  } // ... arrowRight\n\n\n  if (e.keyCode == 39) {\n    $this.blur();\n    setTimeout(function () {\n      $('input[name=\"char[' + (Number(cellIndex) + 1) + ']\"]').focus();\n    }, 100);\n  }\n}); // Parses the individual digits into the individual boxes.\n\nfunction pasteValues(element) {\n  var values = element.split(\"\");\n  $(values).each(function (index) {\n    var $inputBox = $('.digit-cell[name=\"char[' + (index + 1) + ']\"]');\n    $inputBox.val(values[index]);\n  });\n}\n\n; // ... verify email ...\n\n$('#confirmEmailBtn').on('click', function () {\n  API.verify_email({\n    \"user_email\": $('.validate-email-box').find('#adminEmail').val()\n  }, function (status) {\n    if (status, res) {\n      console.log('callback success');\n    } else {\n      console.log('callback error');\n    }\n  });\n});\n\n//# sourceURL=webpack:///./dev/js/getStarted/main.js?");

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