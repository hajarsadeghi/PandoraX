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
/******/ 	return __webpack_require__(__webpack_require__.s = "./dev/js/dashboard/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dev/css/dashboard/index.scss":
/*!**************************************!*\
  !*** ./dev/css/dashboard/index.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./dev/css/dashboard/index.scss?");

/***/ }),

/***/ "./dev/js/dashboard/index.js":
/*!***********************************!*\
  !*** ./dev/js/dashboard/index.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_dashboard_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css/dashboard/index.scss */ \"./dev/css/dashboard/index.scss\");\n/* harmony import */ var _css_dashboard_index_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_dashboard_index_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.js */ \"./dev/js/dashboard/main.js\");\n\n\n\n//# sourceURL=webpack:///./dev/js/dashboard/index.js?");

/***/ }),

/***/ "./dev/js/dashboard/main.js":
/*!**********************************!*\
  !*** ./dev/js/dashboard/main.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helper_highlightSidebar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../helper/highlightSidebar */ \"./dev/js/helper/highlightSidebar.js\");\n\n$(document).ready(function () {\n  // ... hightlight active sidebar \n  var sidebar = new _helper_highlightSidebar__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n    root: '.navbar-nav'\n  });\n  sidebar.hightlight();\n  $('.navbar-profile-wrapper').click(function () {\n    $(this).find('.material-icons').toggleClass('toggle');\n  }); // ... responsive sidebar ...\n\n  $('.menu-collapse-btn').click(function () {\n    $(this).toggleClass('navbar-is-visible');\n\n    if ($('.bilino-navbar').hasClass('side-is-visible')) {\n      $('.bilino-navbar').removeClass('side-is-visible');\n      $('.bilino-main').removeClass('main-is-partially-visible');\n      $('.bilino-navbar').addClass('side-is-hidden');\n      $('.bilino-main').addClass('main-is-fully-visible');\n    } else {\n      $('.bilino-navbar').removeClass('side-is-hidden');\n      $('.bilino-main').removeClass('main-is-fully-visible');\n      $('.bilino-navbar').addClass('side-is-visible');\n      $('.bilino-main').addClass('main-is-partially-visible');\n    }\n  });\n});\n\n//# sourceURL=webpack:///./dev/js/dashboard/main.js?");

/***/ }),

/***/ "./dev/js/helper/highlightSidebar.js":
/*!*******************************************!*\
  !*** ./dev/js/helper/highlightSidebar.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar HighlightSidebar =\n/*#__PURE__*/\nfunction () {\n  function HighlightSidebar(_ref) {\n    var root = _ref.root;\n\n    _classCallCheck(this, HighlightSidebar);\n\n    this.navbar = $(root);\n    this.navItem = $(this.navbar).find('.nav-item');\n    this.pathname = document.location.pathname;\n  }\n\n  _createClass(HighlightSidebar, [{\n    key: \"hightlight\",\n    value: function hightlight() {\n      for (var i = 0; i < this.navItem.length; i++) {\n        if ($(this.navItem[i]).attr('url') == this.pathname) {\n          $(this.navItem[i]).find('.nav-link').closest('.nav-item').addClass('active');\n        }\n      }\n    }\n  }]);\n\n  return HighlightSidebar;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (HighlightSidebar);\n\n//# sourceURL=webpack:///./dev/js/helper/highlightSidebar.js?");

/***/ })

/******/ });