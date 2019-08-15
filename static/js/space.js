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
/******/ 	return __webpack_require__(__webpack_require__.s = "./dev/js/space/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dev/css/space/space.scss":
/*!**********************************!*\
  !*** ./dev/css/space/space.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./dev/css/space/space.scss?");

/***/ }),

/***/ "./dev/js/api.js":
/*!***********************!*\
  !*** ./dev/js/api.js ***!
  \***********************/
/*! exports provided: verify_email, create_space */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"verify_email\", function() { return verify_email; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"create_space\", function() { return create_space; });\nvar verify_email = function verify_email(url, params, callback) {\n  return fetch(url, {\n    method: \"POST\",\n    body: JSON.stringify(params)\n  }).then(function (response) {\n    if (response.status >= 200 && response.status <= 299) {\n      response.json().then(function (res) {\n        callback(true, res);\n      });\n    }\n  });\n}; // ... check company slug, create space, add teammates\n\nvar create_space = function create_space(url, params, callback) {\n  return fetch(url, {\n    method: \"POST\",\n    body: JSON.stringify(params)\n  }).then(function (response) {\n    if (response.status >= 200 && response.status <= 299) {\n      response.json().then(function (res) {\n        callback(true, res);\n      });\n    } else {\n      callback(false, res);\n    }\n  });\n};\n\n//# sourceURL=webpack:///./dev/js/api.js?");

/***/ }),

/***/ "./dev/js/helper/dropdown.js":
/*!***********************************!*\
  !*** ./dev/js/helper/dropdown.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Dropdown =\n/*#__PURE__*/\nfunction () {\n  function Dropdown(_ref) {\n    var _this = this;\n\n    var root = _ref.root;\n\n    _classCallCheck(this, Dropdown);\n\n    this.root = $(root);\n    this.index = -1;\n    this.target = '';\n    this.dropdownInput = this.root.find('.dropdown-input');\n    this.dropdownMenu = this.root.find('.dropdown-custom-menu');\n    this.link = this.dropdownMenu.find('a.dropdown-item'); // ... Bind events ...\n\n    document.addEventListener('click', function (ev) {\n      return _this._closeDropdown(ev);\n    });\n    this.dropdownInput.on('click', function (ev) {\n      return _this._openDropdown(ev);\n    });\n    this.dropdownInput.on('keyup', function (ev) {\n      return _this._onKeyup(ev);\n    });\n    this.dropdownInput.on('change', function (ev) {\n      return _this._onChange(ev);\n    });\n    this.link.on('click', function (ev) {\n      return _this._handleClick(ev);\n    });\n  }\n\n  _createClass(Dropdown, [{\n    key: \"_closeDropdown\",\n    value: function _closeDropdown(ev) {\n      this.checkValue();\n      this.index = -1;\n      this.target = '';\n\n      if (!$(ev.target).hasClass('dropdown-input')) {\n        this.dropdownMenu.removeClass('d-block');\n      }\n    }\n  }, {\n    key: \"_openDropdown\",\n    value: function _openDropdown(ev) {\n      this.dropdownInput.addClass('has-val');\n      this.dropdownMenu.addClass('d-block');\n    }\n  }, {\n    key: \"_onKeyup\",\n    value: function _onKeyup(ev) {\n      ev.stopPropagation();\n\n      if (ev.key == 'Enter') {\n        this.setValue(this.target);\n      } // ... search\n\n\n      var arr = this.search(ev.target.value); // ... keyup & keydown navigation\n\n      for (var i = 0; i < arr.length; i++) {\n        if (arr[i].className.includes('active')) {\n          this.index = i;\n        }\n      }\n\n      $(arr).removeClass('active');\n\n      if (ev.key == 'ArrowUp') {\n        if (this.index != 0) {\n          this.target = $(arr[this.index - 1]);\n          this.target.addClass('active');\n        } else if (this.index == 0) {\n          this.target = $(arr[arr.length - 1]);\n          this.target.addClass('active');\n        } else {\n          this.target = $(arr[0]);\n          this.target.addClass('active');\n        }\n      } else if (ev.key == 'ArrowDown') {\n        if (this.index != arr.length - 1) {\n          this.target = $(arr[this.index + 1]);\n          this.target.addClass('active');\n        } else if (this.index == arr.length - 1) {\n          this.target = $(arr[0]);\n          this.target.addClass('active');\n        } else {\n          this.target = $(arr[this.index]);\n          this.target.addClass('active');\n        }\n      }\n    }\n  }, {\n    key: \"search\",\n    value: function search(str) {\n      var arr = [];\n      this.link.removeClass('d-none');\n\n      for (var i = 0; i < this.link.length; i++) {\n        if (!this.link[i].innerText.trim().toLowerCase().includes(str.trim().toLowerCase())) {\n          $(this.link[i]).addClass('d-none');\n        } else {\n          arr.push(this.link[i]);\n        }\n      }\n\n      return arr;\n    }\n  }, {\n    key: \"_onChange\",\n    value: function _onChange(ev) {\n      this.checkValue();\n    }\n  }, {\n    key: \"checkValue\",\n    value: function checkValue() {\n      if (this.dropdownInput.val()) {\n        this.dropdownInput.addClass('has-val');\n      } else {\n        this.dropdownInput.removeClass('has-val');\n      }\n    }\n  }, {\n    key: \"_handleClick\",\n    value: function _handleClick(ev) {\n      this.dropdownInput.addClass('has-val');\n      this.setValue($(ev.target));\n    }\n  }, {\n    key: \"setValue\",\n    value: function setValue(target) {\n      this.dropdownInput.val(target.text());\n      this.dropdownInput.attr('id', target.attr('id'));\n    }\n  }]);\n\n  return Dropdown;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Dropdown);\n\n//# sourceURL=webpack:///./dev/js/helper/dropdown.js?");

/***/ }),

/***/ "./dev/js/helper/index.js":
/*!********************************!*\
  !*** ./dev/js/helper/index.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Notif; });\nfunction Notif(msg) {\n  iziToast.show({\n    message: msg,\n    backgroundColor: '#4a5cc5',\n    messageColor: '#ffffff',\n    progressBarColor: '#ffffff',\n    position: 'topRight'\n  });\n}\n\n//# sourceURL=webpack:///./dev/js/helper/index.js?");

/***/ }),

/***/ "./dev/js/space/index.js":
/*!*******************************!*\
  !*** ./dev/js/space/index.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_animate_css_animate_min_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/animate.css/animate.min.css */ \"./node_modules/animate.css/animate.min.css\");\n/* harmony import */ var _node_modules_animate_css_animate_min_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_animate_css_animate_min_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _css_space_space_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../css/space/space.scss */ \"./dev/css/space/space.scss\");\n/* harmony import */ var _css_space_space_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_space_space_scss__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main.js */ \"./dev/js/space/main.js\");\n\n\n\n\n//# sourceURL=webpack:///./dev/js/space/index.js?");

/***/ }),

/***/ "./dev/js/space/main.js":
/*!******************************!*\
  !*** ./dev/js/space/main.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helper_dropdown_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../helper/dropdown.js */ \"./dev/js/helper/dropdown.js\");\n/* harmony import */ var _helper_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../helper/index.js */ \"./dev/js/helper/index.js\");\n\n\n\nvar API = __webpack_require__(/*! ./../api.js */ \"./dev/js/api.js\"); // ... initialize dropdown ...\n\n\nnew _helper_dropdown_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  root: '.dropdown-container'\n});\n$('#spaceNameBtn').attr('disabled', true); // ... login form transition ...\n\n$('.form-input').on('keyup', function () {\n  if ($(this).val()) {\n    $(this).addClass('has-val');\n  } else {\n    $(this).removeClass('has-val');\n  }\n});\nvar check_slug,\n    is_slug_changed_manually = false;\n$('#companyName').on('keyup', function () {\n  if (!is_slug_changed_manually) {\n    var slug_value = $(this).val().toLowerCase();\n\n    if (/^[a-zA-Z0-9-_ ]*$/.test(slug_value)) {\n      $('#companySlug').val(slug_value.replace(/ +/g, \"\"));\n    }\n\n    checkSlug(slug_value.replace(/ +/g, \"\"));\n  }\n});\n$('#companySlug').on('keydown', function (e) {\n  var key_arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '-', '_', 'Backspace', 'Shift', 'ArrowRight', 'ArrowLeft', 'Delete'];\n\n  if (!key_arr.includes(e.key)) {\n    return false;\n  } else {\n    is_slug_changed_manually = true;\n  }\n});\n$('#companySlug').on('keyup', function () {\n  checkSlug($(this).val().toLowerCase());\n});\n\nfunction checkSlug(slug_value) {\n  $('#spaceNameBtn').attr('disabled', true);\n\n  if (slug_value) {\n    $('#companySlug').addClass('has-val');\n  } else {\n    $('#companySlug').removeClass('has-val');\n  }\n\n  clearTimeout(check_slug);\n  var slug = $('#companySlug').val();\n  check_slug = setTimeout(function () {\n    if (slug.length > 0) {\n      API.create_space('/api/space/check_slug/', {\n        slug: slug\n      }, function (status, res) {\n        if (status) {\n          if (res.valid) {\n            $('#spaceNameBtn').attr('disabled', false);\n            $('.red-border').addClass('d-none');\n          } else {\n            $('.red-border').removeClass('d-none');\n          }\n        }\n      });\n    }\n  }, 750);\n} // ... check company slug\n\n\n$('#spaceNameBtn').on('click', function () {\n  ToggleSpaceBoxes($(this));\n}); // ... create slug\n\n$('#createSpaceBtn').on('click', function () {\n  var _this = this;\n\n  var space = {\n    name: $('#companyName').val(),\n    slug: $('#companySlug').val(),\n    industry_id: $('.industry').attr('id'),\n    members_count: $('.members-count').val()\n  };\n\n  if (space.name && space.slug && space.industry_id && space.members_count) {\n    API.create_space('/api/space/create/', space, function (status, res) {\n      if (status) {\n        if (res.id) {\n          $('#spaceTeammatesBox').attr('space-id', res.id);\n          ToggleSpaceBoxes($(_this));\n        }\n      } else {\n        console.log('error');\n      }\n    });\n  } else {\n    Object(_helper_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('Please provide the company info');\n  }\n}); // ... add team mates\n\n$('#addTeammatesBtn').on('click', function () {\n  var _this2 = this;\n\n  var teammates = {\n    space_id: $('#spaceTeammatesBox').attr('space-id'),\n    members: []\n  };\n  var forms = $('#spaceTeammatesBox').find('.form-input');\n\n  for (var i = 0; i < forms.length; i++) {\n    if ($(forms[i]).val().trim()) {\n      teammates.members.push($(forms[i]).val());\n    }\n  }\n\n  if (teammates.space_id && teammates.members.length) {\n    API.create_space('/api/space/invite/', teammates, function (status) {\n      if (status) {\n        ToggleSpaceBoxes($(_this2));\n      } else {\n        console.log('error');\n      }\n    });\n  } else {\n    Object(_helper_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('Please Provide your teams email address');\n  }\n});\n$('#skipTeammates').on('click', function () {\n  ToggleSpaceBoxes($(this));\n});\n$('#tadaBtn').click(function () {\n  window.location.replace('/');\n});\n\nfunction ToggleSpaceBoxes($this) {\n  var box = '.' + $this.attr('box');\n  $('.space-row').removeClass('d-flex');\n  $('.space-row').addClass('d-none');\n  $(box).addClass('d-flex');\n}\n\n$('#addAnother').click(function (event) {\n  $('#spaceTeammatesBox').find('.form-group.forms').last().after(\"\\n        <div class=\\\"form-group forms\\\">\\n            <input type=\\\"email\\\" class=\\\"form-control form-input\\\" aria-describedby=\\\"email\\\" autocomplete=\\\"off\\\">\\n            <span class=\\\"input-line\\\" data-placeholder=\\\"Ex. name@example.com\\\"></span>\\n        </div>\\n    \");\n});\n\n//# sourceURL=webpack:///./dev/js/space/main.js?");

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