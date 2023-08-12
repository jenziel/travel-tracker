/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n:root {\n  --lime-green: #b4ec34;\n  --dark-lime-green: #1a6d0d;\n  --black: #142122;\n  --gray: #828b94;\n  --dark-gray: #4e535c;\n  --light-gray: #e5e7eb;\n  --white: #ffffff;\n  --blue: #1f80f3;\n  --red: #c5031a;\n  --orange: #ff9c1b;\n  --green: #347d4e;\n  --purple: rgb(85, 48, 156);\n  --pink: #e770be;\n}\nbody,\nhtml {\n  font-family: 'Electrolux Sans', sans-serif;\n  height: 100%;\n  overflow: hidden;\n}\n\n* {\n  margin: 0;\n  box-sizing: border-box;\n}\nmain {\n  width: 100%;\n  display: flex;\n  height: 100%;\n  flex-direction: column;\n  overflow: hidden;\n  position: relative;\n}\n\nheader {\n  display: flex;\n  align-items: center;\n  padding: 10px;\n  padding-left: 7vw;\n  padding-right: 8vw;\n  height: 10vh;\n  justify-content: space-between;\n}\n\nheader > p {\n font-family: 'Roboto Mono', monospace;\n}\n\n.circle {\n    width: 40px; \n    height: 40px; \n    border-radius: 50%; \n    background-size: cover;\n}\n\n.circle > img {\n  height: 100%;\n  width: 100%;\n}\n\nheader > h1 {\n  font-size: 2.7em;\n  margin-left: .5vw;\n}\n\n.header-left-side {\n  display: flex;\n  align-items: center;\n}\n\n.header-right-side {\n  width: 25vw;\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  font-family: 'Roboto Mono', monospace;\n}\n\n.notifications {\n  height: 20px;\n  width: 20px;\n}\n\n.user-profile > img {\n  height: 20px;\n  width: 20px;\n }\n\n button.user-profile,\n .notifications,\n .trips,\n .language {\n  height: 35px;\n  width: 35px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: white;\n  border: none;\n  font-size: 15px;\n  font-weight: bold;\n  margin-left: 30px;\n }\n\n .notifications> img {\n  height: 20px; \n  width: 20px;\n }\n\n #globe {\n  height: 15px;\n  width: 15px;\n  margin-right: 10px;\n }\n\n .language {\n  margin-right: 10px;\n }\n\n .trips {\n  margin-left: 60px;\n  margin-right: 20px;\n }\n\n/* lower pane styling */\n\n.lower-pane-1 {\n  background-color: skyblue;\n  padding: 20px;\n  height: 90vh;\n  width: 100%;\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  align-items: center;\n  font-family: 'Roboto Mono', monospace;\n}\n\n.login-box {\n  height: 100%;\n  width: 300px;\n}\n\n.login-box > p {\n  color: black;\n  font-family: 'Roboto Mono', monospace;\n  font-weight: 400;\n  margin-bottom: 5vh;\n}\n\n\nform > button {\n  font-family: 'Roboto Mono', monospace;\n}\n\naside {\n  background-color: lightgrey;\n  height: 90vh;\n  width: 30vw;\n}\n.booking-panel,\n.login-box {\n  padding: 10px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: space-evenly;\n  height: 50vh;\n  width: 35vw;\n}\n.location-error-box,\n.password-error-box,\n.username-error-box{\n  display:flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: baseline;\n}\n.password-error,\n.username-error{\n  margin-left: 5vw;\n}\n.login-email {\n  display: flex;\n  flex-direction: column;\n}\n\n.login-password {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  height: 20vh;\n  margin-top: 2vh;\n}\n\n button {\n  width: 50%;\n  height: 5vh;\n }\n\n .create-acct {\n  color: navy;\n  cursor: pointer;\n }\n\n input {\n  height: 5vh;\n }\n\n #toggle-password {\n  margin-left: 17vw;\n  font-family: 'Roboto Mono', monospace;\n  background-color: transparent;\n  border: none;\n  cursor: pointer;\n }\n\n #go-back-btn,\n #confirm-btn,\n#go-to-booking-page,\n.submitBtn {\n  cursor: pointer;\n  padding: 10px 20px;\n  border-radius: 10px;\n  width: 10vw;\n  margin-bottom: 5vh;\n  background-color: lightgoldenrodyellow;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\nbutton {\n  cursor: pointer;\n}\n\nh1,\n.location {\n  font-family: 'Electrolux Sans', 'san-serif';\n}\n\n.booking-panel,\n.login-box {\n  padding: 20px;\n  background-color: #f0f0f0;\n  border: 1px solid #ccc;\n  border-radius: 15px;\n  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1); \n  margin: 100px auto;\n}\n\n.sign-in {\n  margin-bottom: 10px;\n  font-size: 24px;\n  text-align: center;\n}\n\nbutton > p {\n  font-family: 'Roboto Mono', monospace;\n}\n\n/* Trips Page */\n\n.lower-pane-2 {\n  padding: 30px;\n  padding-bottom: 60px;\n  background-color: skyblue;\n  min-height: 90vh;\n  overflow-y: auto;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  font-family: 'Roboto Mono', monospace;\n}\n\n#annual-spending {\n  font-weight: bold;\n  font-size: 20px;\n  margin-bottom: 10px;\n}\n\n.lower-pane-2 > h1 {\n  margin-bottom: 20px;\n}\n\n.center-container {\n  display:flex;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: flex-start;\n  width: 30vw;\n  height: auto;\n}\n.trip-card {\n  height: auto;\n  width: 30vw;\n  border-radius: 30px;\n  margin-top: 20px;\n  margin-bottom: 20px;\n  font-size: 200;\n  position: relative;\n}\n\n.trip-card img {\n  max-width: 100%;\n  height: auto;\n  display: block;\n}\n\n.location {\n  font-weight: bold;\n  font-size: 30px;\n}\n.location-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 40px;\n  background-color: skyblue;\n  padding: 10px;\n  width: auto;\n  border-radius: 15px;\n}\n.trip-info-container {\n  background-color:rgba(255, 255, 255, 0.5);\n   padding: 10px; \n   display: flex;\n   flex-direction: column;\n   justify-content: space-evenly;\n}\n\n.trips-header {\n  margin-top: 10px;\n  margin-bottom: 3vh;\n}\n\n.type-of-trip {\n  margin-bottom: 5vh;\n  height: auto;\n}\n\n.lower-pane-3 {\n  background-color: skyblue;\n  padding: 20px;\n  height: 90vh;\n  width: 100%;\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  align-items: center;\n  font-family: 'Roboto Mono', monospace;\n}\n.booking-panel {\n  padding-left: 40px;\n  height: 60vh;\n  width: 50vw;\n  background-color: var(--light-gray);\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  font-family: 'Roboto Mono', monospace;\n}\n.new-booking-header,\n.date-section > input {\n  margin-top: 30px;\n}\n#end-date {\n  margin-left: 18px;\n}\n#num-travelers,\n#end-date,\n#start-date {\n  width: 15vw;\n}\n.flatpickr {\n  height: 100%;\n  width: 100%;\n}\n\n.location-dropdown {\n  position: relative;\n  width: 15vw;\n}\n.location-section {\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n  margin-bottom: 4vh;\n  margin-top: .5vh;\n  background-size: cover;\n}\n\n.location-section > label {\n  margin-top: 1vh;\n}\n.booking-panel-2 {\n  padding: 30px;\n  padding-bottom: 60px;\n  background-color: skyblue;\n  min-height: 100vh;\n  width: 100%;\n  align-items: center;\n  font-family: 'Roboto Mono', monospace;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  height: 90vh;\n}\n\n\n#location-dropdown {\n  padding: 8px;\n  border: 1px solid #ccc;\n  width: 200px;\n}\n\n#location-dropdown::-ms-expand {\n  display: none;\n}\n\n\n#location-dropdown:focus {\n  outline: none;\n  border-color: blue;\n}\n#new-booking-title {\n  display:flex;\n  flex-direction: row;\n  justify-content: space-between;\n}\n#go-back-btn,\n#confirm-btn {\n  height: 50px;\n  width: 150px;\n  font-size: 16px;\n  font-family: 'Roboto Mono', monospace;\n  margin-top: 1vh;\n}\n#go-back-btn{\n  width: 300px;\n}\n#pending-trip-container {\n  width: 35vw;\n}\n.button-box {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  width:35vw;\n}\n.location-error,\n.password-error,\n.username-error,\n.numTravelersError,\n.dates-error {\n  color: var(--red);\n  margin-top: 10px;\n}\n.hidden {\n  display: none;\n}", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"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","sourcesContent":["\n:root {\n  --lime-green: #b4ec34;\n  --dark-lime-green: #1a6d0d;\n  --black: #142122;\n  --gray: #828b94;\n  --dark-gray: #4e535c;\n  --light-gray: #e5e7eb;\n  --white: #ffffff;\n  --blue: #1f80f3;\n  --red: #c5031a;\n  --orange: #ff9c1b;\n  --green: #347d4e;\n  --purple: rgb(85, 48, 156);\n  --pink: #e770be;\n}\nbody,\nhtml {\n  font-family: 'Electrolux Sans', sans-serif;\n  height: 100%;\n  overflow: hidden;\n}\n\n* {\n  margin: 0;\n  box-sizing: border-box;\n}\nmain {\n  width: 100%;\n  display: flex;\n  height: 100%;\n  flex-direction: column;\n  overflow: hidden;\n  position: relative;\n}\n\nheader {\n  display: flex;\n  align-items: center;\n  padding: 10px;\n  padding-left: 7vw;\n  padding-right: 8vw;\n  height: 10vh;\n  justify-content: space-between;\n}\n\nheader > p {\n font-family: 'Roboto Mono', monospace;\n}\n\n.circle {\n    width: 40px; \n    height: 40px; \n    border-radius: 50%; \n    background-size: cover;\n}\n\n.circle > img {\n  height: 100%;\n  width: 100%;\n}\n\nheader > h1 {\n  font-size: 2.7em;\n  margin-left: .5vw;\n}\n\n.header-left-side {\n  display: flex;\n  align-items: center;\n}\n\n.header-right-side {\n  width: 25vw;\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  font-family: 'Roboto Mono', monospace;\n}\n\n.notifications {\n  height: 20px;\n  width: 20px;\n}\n\n.user-profile > img {\n  height: 20px;\n  width: 20px;\n }\n\n button.user-profile,\n .notifications,\n .trips,\n .language {\n  height: 35px;\n  width: 35px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: white;\n  border: none;\n  font-size: 15px;\n  font-weight: bold;\n  margin-left: 30px;\n }\n\n .notifications> img {\n  height: 20px; \n  width: 20px;\n }\n\n #globe {\n  height: 15px;\n  width: 15px;\n  margin-right: 10px;\n }\n\n .language {\n  margin-right: 10px;\n }\n\n .trips {\n  margin-left: 60px;\n  margin-right: 20px;\n }\n\n/* lower pane styling */\n\n.lower-pane-1 {\n  background-color: skyblue;\n  padding: 20px;\n  height: 90vh;\n  width: 100%;\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  align-items: center;\n  font-family: 'Roboto Mono', monospace;\n}\n\n.login-box {\n  height: 100%;\n  width: 300px;\n}\n\n.login-box > p {\n  color: black;\n  font-family: 'Roboto Mono', monospace;\n  font-weight: 400;\n  margin-bottom: 5vh;\n}\n\n\nform > button {\n  font-family: 'Roboto Mono', monospace;\n}\n\naside {\n  background-color: lightgrey;\n  height: 90vh;\n  width: 30vw;\n}\n.booking-panel,\n.login-box {\n  padding: 10px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: space-evenly;\n  height: 50vh;\n  width: 35vw;\n}\n.location-error-box,\n.password-error-box,\n.username-error-box{\n  display:flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: baseline;\n}\n.password-error,\n.username-error{\n  margin-left: 5vw;\n}\n.login-email {\n  display: flex;\n  flex-direction: column;\n}\n\n.login-password {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  height: 20vh;\n  margin-top: 2vh;\n}\n\n button {\n  width: 50%;\n  height: 5vh;\n }\n\n .create-acct {\n  color: navy;\n  cursor: pointer;\n }\n\n input {\n  height: 5vh;\n }\n\n #toggle-password {\n  margin-left: 17vw;\n  font-family: 'Roboto Mono', monospace;\n  background-color: transparent;\n  border: none;\n  cursor: pointer;\n }\n\n #go-back-btn,\n #confirm-btn,\n#go-to-booking-page,\n.submitBtn {\n  cursor: pointer;\n  padding: 10px 20px;\n  border-radius: 10px;\n  width: 10vw;\n  margin-bottom: 5vh;\n  background-color: lightgoldenrodyellow;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\nbutton {\n  cursor: pointer;\n}\n\nh1,\n.location {\n  font-family: 'Electrolux Sans', 'san-serif';\n}\n\n.booking-panel,\n.login-box {\n  padding: 20px;\n  background-color: #f0f0f0;\n  border: 1px solid #ccc;\n  border-radius: 15px;\n  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1); \n  margin: 100px auto;\n}\n\n.sign-in {\n  margin-bottom: 10px;\n  font-size: 24px;\n  text-align: center;\n}\n\nbutton > p {\n  font-family: 'Roboto Mono', monospace;\n}\n\n/* Trips Page */\n\n.lower-pane-2 {\n  padding: 30px;\n  padding-bottom: 60px;\n  background-color: skyblue;\n  min-height: 90vh;\n  overflow-y: auto;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  font-family: 'Roboto Mono', monospace;\n}\n\n#annual-spending {\n  font-weight: bold;\n  font-size: 20px;\n  margin-bottom: 10px;\n}\n\n.lower-pane-2 > h1 {\n  margin-bottom: 20px;\n}\n\n.center-container {\n  display:flex;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: flex-start;\n  width: 30vw;\n  height: auto;\n}\n.trip-card {\n  height: auto;\n  width: 30vw;\n  border-radius: 30px;\n  margin-top: 20px;\n  margin-bottom: 20px;\n  font-size: 200;\n  position: relative;\n}\n\n.trip-card img {\n  max-width: 100%;\n  height: auto;\n  display: block;\n}\n\n.location {\n  font-weight: bold;\n  font-size: 30px;\n}\n.location-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 40px;\n  background-color: skyblue;\n  padding: 10px;\n  width: auto;\n  border-radius: 15px;\n}\n.trip-info-container {\n  background-color:rgba(255, 255, 255, 0.5);\n   padding: 10px; \n   display: flex;\n   flex-direction: column;\n   justify-content: space-evenly;\n}\n\n.trips-header {\n  margin-top: 10px;\n  margin-bottom: 3vh;\n}\n\n.type-of-trip {\n  margin-bottom: 5vh;\n  height: auto;\n}\n\n.lower-pane-3 {\n  background-color: skyblue;\n  padding: 20px;\n  height: 90vh;\n  width: 100%;\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  align-items: center;\n  font-family: 'Roboto Mono', monospace;\n}\n.booking-panel {\n  padding-left: 40px;\n  height: 60vh;\n  width: 50vw;\n  background-color: var(--light-gray);\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  font-family: 'Roboto Mono', monospace;\n}\n.new-booking-header,\n.date-section > input {\n  margin-top: 30px;\n}\n#end-date {\n  margin-left: 18px;\n}\n#num-travelers,\n#end-date,\n#start-date {\n  width: 15vw;\n}\n.flatpickr {\n  height: 100%;\n  width: 100%;\n}\n\n.location-dropdown {\n  position: relative;\n  width: 15vw;\n}\n.location-section {\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n  margin-bottom: 4vh;\n  margin-top: .5vh;\n  background-size: cover;\n}\n\n.location-section > label {\n  margin-top: 1vh;\n}\n.booking-panel-2 {\n  padding: 30px;\n  padding-bottom: 60px;\n  background-color: skyblue;\n  min-height: 100vh;\n  width: 100%;\n  align-items: center;\n  font-family: 'Roboto Mono', monospace;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  height: 90vh;\n}\n\n\n#location-dropdown {\n  padding: 8px;\n  border: 1px solid #ccc;\n  width: 200px;\n}\n\n#location-dropdown::-ms-expand {\n  display: none;\n}\n\n\n#location-dropdown:focus {\n  outline: none;\n  border-color: blue;\n}\n#new-booking-title {\n  display:flex;\n  flex-direction: row;\n  justify-content: space-between;\n}\n#go-back-btn,\n#confirm-btn {\n  height: 50px;\n  width: 150px;\n  font-size: 16px;\n  font-family: 'Roboto Mono', monospace;\n  margin-top: 1vh;\n}\n#go-back-btn{\n  width: 300px;\n}\n#pending-trip-container {\n  width: 35vw;\n}\n.button-box {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  width:35vw;\n}\n.location-error,\n.password-error,\n.username-error,\n.numTravelersError,\n.dates-error {\n  color: var(--red);\n  margin-top: 10px;\n}\n.hidden {\n  display: none;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/turing-logo.png");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/arrow-down.png");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/logo3.png");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/globe_logo.jpg");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/logo9.png");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/profile-logo.png");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/bell1.png");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/globe-icon.png");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loginPage": () => (/* binding */ loginPage),
/* harmony export */   "tripsPage": () => (/* binding */ tripsPage),
/* harmony export */   "bookingPage": () => (/* binding */ bookingPage),
/* harmony export */   "confirmationPage": () => (/* binding */ confirmationPage),
/* harmony export */   "allPages": () => (/* binding */ allPages),
/* harmony export */   "signInButton": () => (/* binding */ signInButton),
/* harmony export */   "newBookingBtn": () => (/* binding */ newBookingBtn),
/* harmony export */   "confirmBtn": () => (/* binding */ confirmBtn),
/* harmony export */   "backToBookingBtn": () => (/* binding */ backToBookingBtn),
/* harmony export */   "tripsHeaderBtn": () => (/* binding */ tripsHeaderBtn),
/* harmony export */   "userName": () => (/* binding */ userName),
/* harmony export */   "passWord": () => (/* binding */ passWord),
/* harmony export */   "startDate": () => (/* binding */ startDate),
/* harmony export */   "endDate": () => (/* binding */ endDate),
/* harmony export */   "selectedLocation": () => (/* binding */ selectedLocation),
/* harmony export */   "numberTravelers": () => (/* binding */ numberTravelers),
/* harmony export */   "datesError": () => (/* binding */ datesError),
/* harmony export */   "numTravelersError": () => (/* binding */ numTravelersError),
/* harmony export */   "usernameError": () => (/* binding */ usernameError),
/* harmony export */   "passwordError": () => (/* binding */ passwordError),
/* harmony export */   "locationError": () => (/* binding */ locationError),
/* harmony export */   "tripsTitle": () => (/* binding */ tripsTitle),
/* harmony export */   "tripsTest": () => (/* binding */ tripsTest),
/* harmony export */   "upcomingTrip1": () => (/* binding */ upcomingTrip1),
/* harmony export */   "timeline": () => (/* binding */ timeline),
/* harmony export */   "numBookings": () => (/* binding */ numBookings),
/* harmony export */   "annualSpendingMsg": () => (/* binding */ annualSpendingMsg),
/* harmony export */   "goToBookingBtn": () => (/* binding */ goToBookingBtn),
/* harmony export */   "locationDropdown": () => (/* binding */ locationDropdown),
/* harmony export */   "locationSection": () => (/* binding */ locationSection),
/* harmony export */   "location": () => (/* binding */ location),
/* harmony export */   "bookingPanel": () => (/* binding */ bookingPanel),
/* harmony export */   "pendingTripBox": () => (/* binding */ pendingTripBox),
/* harmony export */   "showPage": () => (/* binding */ showPage),
/* harmony export */   "updateTripsPage": () => (/* binding */ updateTripsPage),
/* harmony export */   "createUpcomingCards": () => (/* binding */ createUpcomingCards),
/* harmony export */   "createPendingCards": () => (/* binding */ createPendingCards),
/* harmony export */   "createPastCards": () => (/* binding */ createPastCards),
/* harmony export */   "populateLocationDropdown": () => (/* binding */ populateLocationDropdown),
/* harmony export */   "createNewBookingCard": () => (/* binding */ createNewBookingCard)
/* harmony export */ });
//Query Selectors:

//PAGES:
const loginPage = document.querySelector(".lower-pane-1");
const tripsPage = document.querySelector(".lower-pane-2");
const bookingPage = document.querySelector(".lower-pane-3");
const confirmationPage = document.querySelector(".booking-panel-2");
const allPages = document.querySelectorAll('.page')

//BUTTONS:
const signInButton = document.querySelector("#signin");
const newBookingBtn = document.querySelector("#newBookingBtn");
const confirmBtn = document.querySelector("#confirm-btn");
const backToBookingBtn = document.querySelector('#go-back-btn')
const tripsHeaderBtn = document.querySelector(".trips")

//LOGIN INPUTS:
const userName = document.querySelector('#username')
const passWord = document.querySelector('#current-password')

//BOOKING INPUTS:
const startDate = document.getElementById("start-date");
const endDate = document.getElementById("end-date");
const selectedLocation = document.getElementById('selected-location')
const numberTravelers = document.getElementById("num-travelers");

//ERROR MESSAGES
const datesError = document.querySelector(".dates-error")
const numTravelersError = document.querySelector(".numTravelersError")
const usernameError = document.querySelector(".username-error")
const passwordError = document.querySelector(".password-error")
const locationError = document.querySelector(".location-error")

const tripsTitle = document.querySelector(".trips-header");
const tripsTest = document.querySelector(".user-trips");
const upcomingTrip1 = document.querySelector(".location");
const timeline = document.querySelector(".timeline");
const numBookings = document.querySelector(".numBookings");
const annualSpendingMsg = document.querySelector("#annual-spending");
const goToBookingBtn = document.querySelector("#go-to-booking-page");
const locationDropdown = document.getElementById("location-dropdown");
const locationSection = document.querySelector(".location-section");
const location = document.getElementById("selected-location");
const bookingPanel = document.querySelector(".booking-panel");
const pendingTripBox = document.querySelector("#pendingTripContainer");

// Event Handlers:

const showPage = (desiredPage) => {
    const pagesArray = Array.from(allPages);
    const currentPage = pagesArray.find(page => !page.classList.contains('hidden'))
    currentPage.classList.add("hidden")
    desiredPage.classList.remove("hidden")
}

const updateTripsPage = (travelerName, annualSpending) => {
  tripsTitle.innerText = `${travelerName}'s Trips`;
  annualSpendingMsg.innerText = `This year you've spent $${annualSpending}.`;
};
const createUpcomingCards = (userTrips) => {
  const upcomingContainer = document.getElementById("upcomingContainer");
  const cardsHTML = userTrips.reduce((html, card) => {

    const flightCost = (card.fullDestinationInfo.estimatedFlightCostPerPerson * card.travelers)
    const lodgingCost = (card.fullDestinationInfo.estimatedLodgingCostPerDay * card.travelers * card.duration)
    const total = (flightCost + lodgingCost)
    const totalPlusFees = total + (total * .1)
    let bookingQty = ' booking'
    if (card.travelers > 1){
        bookingQty = ' bookings'
    }
    return (html += `
            <div class="trip-card">
            <img src=${card.fullDestinationInfo.image} alt=${card.fullDestinationInfo.alt}>
             <div class="trip-info-container">
                <p class="location">${card.fullDestinationInfo.destination}</p>
                <p class="timeline">${card.startDate} - ${card.endDate}</p>
                <p class="numBookings">${card.travelers}${bookingQty}</p>
                <p class="total-nights">${card.duration} nights</p>
                <p class="total-cost">$${totalPlusFees}
            </div>
        `);
  }, "Upcoming:");
  upcomingContainer.innerHTML = cardsHTML;
};

const createPendingCards = (userTrips) => {
  const pendingContainer = document.getElementById("pendingContainer");
  const cardsHTML = userTrips.reduce((html, card) => {
    const flightCost = (card.fullDestinationInfo.estimatedFlightCostPerPerson * card.travelers)
    const lodgingCost = (card.fullDestinationInfo.estimatedLodgingCostPerDay * card.travelers * card.duration)
    const total = (flightCost + lodgingCost)
    const totalPlusFees = total + (total * .1)
    let bookingQty = ' booking'
    if (card.travelers > 1){
        bookingQty = ' bookings'
    }
    return (html += `
            <div class="trip-card">
            <img src=${card.fullDestinationInfo.image} alt=${card.fullDestinationInfo.alt}>
             <div class="trip-info-container">
                <p class="location">${card.fullDestinationInfo.destination}</p>
                <p class="timeline">${card.startDate} - ${card.endDate}</p>
                <p class="numBookings">${card.travelers}${bookingQty}</p>
                <p class="total-nights">${card.duration} nights</p>
                <p class="total-cost">$${totalPlusFees}
            </div>
        `);
  }, "Pending:");
  pendingContainer.innerHTML = cardsHTML;
};

const createPastCards = (userTrips) => {
  const pastContainer = document.getElementById("pastContainer");
  const cardsHTML = userTrips.reduce((html, card) => {
    const flightCost = (card.fullDestinationInfo.estimatedFlightCostPerPerson * card.travelers)
    const lodgingCost = (card.fullDestinationInfo.estimatedLodgingCostPerDay * card.travelers * card.duration)
    const total = (flightCost + lodgingCost)
    const totalPlusFees = total + (total * .1)
    let bookingQty = ' booking'
    if (card.travelers > 1){
        bookingQty = ' bookings'
    }
    return (html += `
            <div class="trip-card">
            <img src=${card.fullDestinationInfo.image} alt=${card.fullDestinationInfo.alt}>
             <div class="trip-info-container">
                <p class="location">${card.fullDestinationInfo.destination}</p>
                <p class="timeline">${card.startDate} - ${card.endDate}</p>
                <p class="numBookings">${card.travelers}${bookingQty}</p>
                <p class="total-nights">${card.duration} nights</p>
                <p class="total-cost">$${totalPlusFees}
            </div>
        `);
  }, "Past:");
  pastContainer.innerHTML = cardsHTML;
};

const populateLocationDropdown = (destinations) => {
  destinations.forEach((destination) => {
    const option = document.createElement("option");
    option.value = destination.destination;
    option.textContent = destination.destination;
    locationDropdown.appendChild(option);
  });
};

const createNewBookingCard = (booking, destinationObj) => {
    const flightCost = (destinationObj.estimatedFlightCostPerPerson * booking.travelers);
    const lodgingCost = (destinationObj.estimatedLodgingCostPerDay * booking.travelers * booking.duration);
    const total = (flightCost + lodgingCost);
    const totalPlusFees = total + (total * .1);
  pendingTripContainer.innerHTML = `
            <div class="trip-card">
            <img src=${destinationObj.image} alt=${destinationObj.alt}>
             <div class="trip-info-container">
                <p class="location">${destinationObj.destination}</p>
                <p class="timeline">${booking.startDate} - ${booking.endDate}</p>
                <p class="numBookings">${booking.travelers} booking(s)</p>
                <p class="total-nights">${booking.duration} nights</p>
                <p class="total-cost">$${totalPlusFees}
            </div>
        `;
};


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dayjs": () => (/* binding */ dayjs),
/* harmony export */   "getUserTrips": () => (/* binding */ getUserTrips),
/* harmony export */   "addDates": () => (/* binding */ addDates),
/* harmony export */   "sortSequentially": () => (/* binding */ sortSequentially),
/* harmony export */   "addLocationInfo": () => (/* binding */ addLocationInfo),
/* harmony export */   "sortTripsByDate": () => (/* binding */ sortTripsByDate),
/* harmony export */   "getPending": () => (/* binding */ getPending),
/* harmony export */   "getUpcoming": () => (/* binding */ getUpcoming),
/* harmony export */   "getPast": () => (/* binding */ getPast),
/* harmony export */   "getAnnualArray": () => (/* binding */ getAnnualArray),
/* harmony export */   "getAnnualSpending": () => (/* binding */ getAnnualSpending),
/* harmony export */   "searchDestinationByName": () => (/* binding */ searchDestinationByName),
/* harmony export */   "calculateNumDays": () => (/* binding */ calculateNumDays),
/* harmony export */   "accessUserById": () => (/* binding */ accessUserById),
/* harmony export */   "checkForValidUsername": () => (/* binding */ checkForValidUsername),
/* harmony export */   "checkPassword": () => (/* binding */ checkPassword),
/* harmony export */   "checkValidDates": () => (/* binding */ checkValidDates),
/* harmony export */   "checkValidNumPassengers": () => (/* binding */ checkValidNumPassengers),
/* harmony export */   "justDigits": () => (/* binding */ justDigits)
/* harmony export */ });
const dayjs = __webpack_require__(16);


const getUserTrips = (allTrips, currentUserId) => {
    const filteredTrips = allTrips.filter(trip => {
    return trip.userID === currentUserId
 })
 return filteredTrips
}

const addDates = (userTrips) => {
    const updatedTrips = userTrips.map((trip) => {
        const startDate = dayjs(trip.date);
        const formattedStartDate = startDate.format('MM-DD-YYYY');
        const endDate = startDate.add(trip.duration, 'day');
        const formattedEndDate = endDate.format('MM-DD-YYYY');
       trip.endDate = formattedEndDate;
       trip.startDate = formattedStartDate;
       delete trip.date
       return trip
    })
    return updatedTrips
}
const sortSequentially = (updatedTrips) => {
    const sortedByClosestDate = updatedTrips.sort((a,b) =>{
        const startDateA = dayjs(a.startDate)
        const startDateB = dayjs(b.startDate)
        return startDateA.diff(startDateB, 'day')
    })
    return sortedByClosestDate
}
const addLocationInfo = (userTrips, allDestinations) => {
    const updatedTrips = userTrips.map(trip => {
        const destination =  allDestinations.find(destination => destination.id === trip.destinationID);
          if(destination) {
            trip.locationName = destination.destination
            trip.fullDestinationInfo = destination
          }
          return trip
        })
        return updatedTrips
    };
   

const sortTripsByDate = (userTrips) => {
   const today = dayjs();
    const updatedTrips = userTrips.map(trip => {
        let otherDate = dayjs(trip.startDate)
        if(trip.status !== "approved") {
            trip.category = "pending"
        }
        else if (otherDate.isBefore(today)) {
            trip.category = "past"
        } else if (otherDate.isAfter(today)) {
           trip.category = "upcoming"
        }
        return trip
    })
    return updatedTrips
}
const getPending = (userTrips) => {
    const justPending = userTrips.filter(trip => trip.category === "pending");
    return justPending
}

const getUpcoming = (userTrips) => {
    const justUpcoming = userTrips.filter(trip => {
        return trip.category === "upcoming" 
    })
    return justUpcoming
}
const getPast = (userTrips) => {
    const justPast = userTrips.filter(trip => trip.category === "past" );
    return justPast
}

const getAnnualArray = (userTrips) => {
    const today = dayjs();
    const oneYearAgo = today.subtract(1, 'year');
    const pastYearData = userTrips.filter(trip => {
        const tripDate = dayjs(trip.startDate);
        return tripDate.isAfter(oneYearAgo) && tripDate.isBefore(today);
    })
    return pastYearData
}

const getAnnualSpending = (annualTrips) => {
    const annualCost = annualTrips.reduce((sum, trip) => { 
        const numDays = trip.duration;
        const numBookings = trip.travelers;
        const dailyHotelCost = trip.fullDestinationInfo.estimatedLodgingCostPerDay;
        const roundTripFlight = trip.fullDestinationInfo.estimatedFlightCostPerPerson;
        const flightsTotal = (roundTripFlight * numBookings) 
        const lodgingsTotal = (numDays * dailyHotelCost) * numBookings 
        const totalBeforeTax = (flightsTotal) + (lodgingsTotal);
        const AllFeesIncluded = (totalBeforeTax * .1) + totalBeforeTax;
        sum += AllFeesIncluded;
        return sum
    }, 0)
    const dollarAmtFormat =  annualCost.toFixed(2)
    const convertedToNum = parseFloat(dollarAmtFormat)
    return convertedToNum
}
const searchDestinationByName = (locationName, destinations) => {
    const destinationObject = destinations.find(destination => 
        destination.destination === locationName)
        return destinationObject
 }

 const calculateNumDays = (startDate, endDate) => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const numDays = end.diff(start, 'day');
    return numDays
 }

 const accessUserById = (uniqueID, travelers) => {
    const travelerObject = travelers.find(traveler => 
        traveler.id === uniqueID)
        return travelerObject
 }

 const checkForValidUsername = (username) => {
    if (typeof username !== 'string' || username.length < 9) {
        return false
    }
    const firstPart = username.slice(0, 8);
    if(firstPart !== 'traveler') {
        return false
    }
    const secondPart = username.slice(8);
    if (secondPart.length > 2) {
        return false
    }
    const remainingNumber = Number(secondPart);
    if(isNaN(secondPart) || remainingNumber > 50 || remainingNumber === 0){
        return false
    }
    return true
  }
  const checkPassword = (password) => {
    if (password === 'traveler'){
        return true
    }
    else return false
  }

  const checkValidDates = (startDate, endDate) => {
    const today = dayjs();
    const parsedStartDate = dayjs(startDate);
    const parsedEndDate = dayjs(endDate);

  if (!parsedStartDate.isValid() || !parsedEndDate.isValid()) {
    return 'Invalid dates';
  }

  if (parsedStartDate.isAfter(parsedEndDate)) {
    return 'Start date must be before end date';
  }

  if (parsedStartDate.isBefore(today)) {
    return 'Start date cannot be in the past';
  }

  return 'Dates are valid';
}

const checkValidNumPassengers = (number) => {
    if (number < 1 || number > 14){
        return 'Please enter a number between 1 and 14.'
    }
    return 'Number of passengers is valid'
}

const justDigits = (username) => {
    const secondPart = username.slice(8);
    const parsedNum = parseInt(secondPart)
    return parsedNum
}

/***/ }),
/* 16 */
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",f="quarter",h="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,u=e.clone().add(r+(s?-1:1),c);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:h,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p=function(t){return t instanceof b},S=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,i=a}return!r&&i&&(g=i),i||!r&&g},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new b(n)},O=v;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var b=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===l)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,f=O.p(t),l=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(f){case h:return r?l(1,0):l(31,11);case c:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),f="set"+(this.$u?"UTC":""),l=(n={},n[a]=f+"Date",n[d]=f+"Date",n[c]=f+"Month",n[h]=f+"FullYear",n[u]=f+"Hours",n[s]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===c||o===h){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,f){var d,l=this;r=Number(r);var $=O.p(f),y=function(t){var e=w(l);return O.w(e.date(e.date()+Math.round(t*r)),l)};if($===c)return this.set(c,this.$M+r);if($===h)return this.set(h,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,c=n.months,f=n.meridiem,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},d=function(t){return O.s(s%12||12,t,"0")},$=f||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(y,(function(t,r){return r||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return O.s(e.$y,4,"0");case"M":return a+1;case"MM":return O.s(a+1,2,"0");case"MMM":return h(n.monthsShort,a,c,3);case"MMMM":return h(c,a);case"D":return e.$D;case"DD":return O.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return h(n.weekdaysMin,e.$W,o,2);case"ddd":return h(n.weekdaysShort,e.$W,o,3);case"dddd":return o[e.$W];case"H":return String(s);case"HH":return O.s(s,2,"0");case"h":return d(1);case"hh":return d(2);case"a":return $(s,u,!0);case"A":return $(s,u,!1);case"m":return String(u);case"mm":return O.s(u,2,"0");case"s":return String(e.$s);case"ss":return O.s(e.$s,2,"0");case"SSS":return O.s(e.$ms,3,"0");case"Z":return i}return null}(t)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=this,M=O.p(d),m=w(r),v=(m.utcOffset()-this.utcOffset())*e,g=this-m,D=function(){return O.m(y,m)};switch(M){case h:$=D()/12;break;case c:$=D();break;case f:$=D()/3;break;case o:$=(g-v)/6048e5;break;case a:$=(g-v)/864e5;break;case u:$=g/n;break;case s:$=g/e;break;case i:$=g/t;break;default:$=g}return l?$:O.a($)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),_=b.prototype;return w.prototype=_,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",h],["$D",d]].forEach((function(t){_[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,b,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=D[g],w.Ls=D,w.p={},w}));

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "postNewTripBooking": () => (/* binding */ postNewTripBooking),
/* harmony export */   "signInUser": () => (/* binding */ signInUser)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
console.log("fetch requests go here");
const tripsUrl = "https://ziel-travel-tracker-cdnarcynv-jenziel.vercel.app/api/v1/trips";
const travelersUrl = "https://ziel-travel-tracker-cdnarcynv-jenziel.vercel.app/api/v1/travelers";
const specificTravelersUrl = `https://ziel-travel-tracker-cdnarcynv-jenziel.vercel.app/api/v1/travelers/50`;
const destinationsUrl = "https://ziel-travel-tracker-cdnarcynv-jenziel.vercel.app/api/v1/destinations";
const newTripUrl = "https://ziel-travel-tracker-cdnarcynv-jenziel.vercel.app/api/v1/trips";
const endpoints = [tripsUrl, travelersUrl, destinationsUrl];



const getData = () => {
  console.log("fetch requests go here 2");
  return endpoints.map((url) =>
    fetch(url)
      .then((response) => response.json())
      .catch((error) => console.log(error))
  );
};


const postNewTripBooking = (
  currentUser,
  bookingObj,
  destinationObj,
) => {
  const parsedDate = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(bookingObj.startDate, "YYYY-MM-DD");
  const formattedDate = parsedDate.format("YYYY/MM/DD");
  let booking = {
    id: Date.now(),
    userID: parseInt(currentUser.id),
    destinationID: parseInt(destinationObj.id),
    locationName: bookingObj.locationName,
    travelers: parseInt(bookingObj.travelers),
    date: formattedDate,
    duration: bookingObj.duration,
    status: "pending",
    suggestedActivities: [],
  };
  return (
    fetch(newTripUrl, {
      method: "POST",
      body: JSON.stringify(booking),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed status: ${response.status}");
        }
        return response.json();
      })
      .then((data) => {
        console.log("response data:", data);
      })
      // .then(generatePage())
      .catch((error) => {
        console.log("Request error:", error);
        throw error;
      })
  );
};

const signInUser = (id) => {
  console.log("sign in fetch request:");
  return fetch(`https://ziel-travel-tracker-cdnarcynv-jenziel.vercel.app/api/v1/travelers/${id}`)
    .then((response) => {
      if (!response.status === 404) {
        throw new Error("Username not found");
      }
      return response.json();
    }).then((userObj) => {
    console.log('user object from fetch call', userObj)
    })
    .catch((error) => console.log(error));
};


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _images_turing_logo_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _images_arrow_down_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _images_logo3_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _images_globe_logo_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _images_logo9_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _images_profile_logo_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
/* harmony import */ var _images_bell1_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(12);
/* harmony import */ var _images_globe_icon_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(13);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(14);
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(15);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(17);
// An example of how you tell webpack to use a CSS (SCSS) file


// IMAGES









//DOM UPDATES


//FUNCTIONS


// API CALLS


//DATA MODEL:
const mainData = {
  today: (0,_functions__WEBPACK_IMPORTED_MODULE_10__.dayjs)(),
  currentUser: {
    id: 1,
    name: "Ham Leadbeater",
    travelerType: "relaxer",
  },
};

// ON-PAGE-LOAD EVENTS:
window.addEventListener("load", () => {
  loadPage();
});

// BUTTON CLICK EVENTS:
_domUpdates__WEBPACK_IMPORTED_MODULE_9__.tripsHeaderBtn.addEventListener("click", () => {
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_9__.showPage)(_domUpdates__WEBPACK_IMPORTED_MODULE_9__.tripsPage);
});

_domUpdates__WEBPACK_IMPORTED_MODULE_9__.goToBookingBtn.addEventListener("click", () => {
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_9__.showPage)(_domUpdates__WEBPACK_IMPORTED_MODULE_9__.bookingPage);
});

_domUpdates__WEBPACK_IMPORTED_MODULE_9__.backToBookingBtn.addEventListener("click", () => {
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_9__.showPage)(_domUpdates__WEBPACK_IMPORTED_MODULE_9__.bookingPage);
});

//SUBMIT LOGIN INFO EVENT:
_domUpdates__WEBPACK_IMPORTED_MODULE_9__.signInButton.addEventListener("click", (e) => {
  e.preventDefault();
  const usernameInput = _domUpdates__WEBPACK_IMPORTED_MODULE_9__.userName.value;
  console.log(usernameInput);
  const passwordInput = _domUpdates__WEBPACK_IMPORTED_MODULE_9__.passWord.value;
  console.log(passwordInput);
  const signInData = {
    un: usernameInput,
    pw: passwordInput,
  };
  if (!(0,_functions__WEBPACK_IMPORTED_MODULE_10__.checkForValidUsername)(signInData.un)) {
    _domUpdates__WEBPACK_IMPORTED_MODULE_9__.usernameError.innerText = "Username not found";
  }
  if (!(0,_functions__WEBPACK_IMPORTED_MODULE_10__.checkPassword)(signInData.pw)) {
    _domUpdates__WEBPACK_IMPORTED_MODULE_9__.passwordError.innerText = "Password incorrect";
  }
  if ((0,_functions__WEBPACK_IMPORTED_MODULE_10__.checkForValidUsername)(signInData.un) && (0,_functions__WEBPACK_IMPORTED_MODULE_10__.checkPassword)(signInData.pw)) {
    const uniqueID = (0,_functions__WEBPACK_IMPORTED_MODULE_10__.justDigits)(signInData.un);
    mainData.currentUser = (0,_functions__WEBPACK_IMPORTED_MODULE_10__.accessUserById)(uniqueID, mainData.travelers);
    console.log("mainData.currentUser", mainData.currentUser);
    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_11__.signInUser)(uniqueID).then(loadPage()).then((0,_domUpdates__WEBPACK_IMPORTED_MODULE_9__.showPage)(_domUpdates__WEBPACK_IMPORTED_MODULE_9__.tripsPage));
  }
});

// SUBMIT BOOKING INFO EVENT:
_domUpdates__WEBPACK_IMPORTED_MODULE_9__.newBookingBtn.addEventListener("click", () => {
  if ((0,_functions__WEBPACK_IMPORTED_MODULE_10__.checkValidDates)(_domUpdates__WEBPACK_IMPORTED_MODULE_9__.startDate.value, _domUpdates__WEBPACK_IMPORTED_MODULE_9__.endDate.value) !== "Dates are valid") {
    return (_domUpdates__WEBPACK_IMPORTED_MODULE_9__.datesError.innerText = (0,_functions__WEBPACK_IMPORTED_MODULE_10__.checkValidDates)(
      _domUpdates__WEBPACK_IMPORTED_MODULE_9__.startDate.value,
      _domUpdates__WEBPACK_IMPORTED_MODULE_9__.endDate.value
    ));
  }
  if ((0,_functions__WEBPACK_IMPORTED_MODULE_10__.checkValidDates)(_domUpdates__WEBPACK_IMPORTED_MODULE_9__.startDate.value, _domUpdates__WEBPACK_IMPORTED_MODULE_9__.endDate.value) === "Dates are valid") {
    _domUpdates__WEBPACK_IMPORTED_MODULE_9__.datesError.innerText = "";
  }
  if (
    (0,_functions__WEBPACK_IMPORTED_MODULE_10__.checkValidNumPassengers)(_domUpdates__WEBPACK_IMPORTED_MODULE_9__.numberTravelers.value) !==
    "Number of passengers is valid"
  ) {
    return (_domUpdates__WEBPACK_IMPORTED_MODULE_9__.numTravelersError.innerText = (0,_functions__WEBPACK_IMPORTED_MODULE_10__.checkValidNumPassengers)(
      _domUpdates__WEBPACK_IMPORTED_MODULE_9__.numberTravelers.value
    ));
  }
 
  if (
    (0,_functions__WEBPACK_IMPORTED_MODULE_10__.checkValidNumPassengers)(_domUpdates__WEBPACK_IMPORTED_MODULE_9__.numberTravelers.value) ===
    "Number of passengers is valid"
  ) {
    _domUpdates__WEBPACK_IMPORTED_MODULE_9__.numTravelersError.innerText = "";
  }
  if(!_domUpdates__WEBPACK_IMPORTED_MODULE_9__.locationDropdown.value){
   return _domUpdates__WEBPACK_IMPORTED_MODULE_9__.locationError.innerText = 'Please select a location'
  }

  const vacation = {
    startDate: _domUpdates__WEBPACK_IMPORTED_MODULE_9__.startDate.value,
    endDate: _domUpdates__WEBPACK_IMPORTED_MODULE_9__.endDate.value,
    locationName: _domUpdates__WEBPACK_IMPORTED_MODULE_9__.locationDropdown.value,
    travelers: _domUpdates__WEBPACK_IMPORTED_MODULE_9__.numberTravelers.value,
  };
console.log("vacation", vacation)
  mainData.pendingVacation = vacation;
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_9__.showPage)(_domUpdates__WEBPACK_IMPORTED_MODULE_9__.confirmationPage);
  const newDuration = (0,_functions__WEBPACK_IMPORTED_MODULE_10__.calculateNumDays)(
    mainData.pendingVacation.startDate,
    mainData.pendingVacation.endDate
  );
  mainData.pendingVacation.duration = newDuration;
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_9__.createNewBookingCard)(
    mainData.pendingVacation,
    (0,_functions__WEBPACK_IMPORTED_MODULE_10__.searchDestinationByName)(vacation.locationName, mainData.destinations)
  );
  const errorElements = [_domUpdates__WEBPACK_IMPORTED_MODULE_9__.locationError, _domUpdates__WEBPACK_IMPORTED_MODULE_9__.numTravelersError,  _domUpdates__WEBPACK_IMPORTED_MODULE_9__.datesError]
  errorElements.forEach(error => {
    error.innerText = ""
  })

});

_domUpdates__WEBPACK_IMPORTED_MODULE_9__.confirmBtn.addEventListener("click", () => {
  (0,_apiCalls__WEBPACK_IMPORTED_MODULE_11__.postNewTripBooking)(mainData.currentUser,
    mainData.pendingVacation,
    (0,_functions__WEBPACK_IMPORTED_MODULE_10__.searchDestinationByName)( mainData.pendingVacation.locationName,mainData.destinations)
  ).then(() => {
    loadPage();
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_9__.showPage)(_domUpdates__WEBPACK_IMPORTED_MODULE_9__.tripsPage);
  });
});

const getUserData = () => {
  mainData.userTrips = (0,_functions__WEBPACK_IMPORTED_MODULE_10__.getUserTrips)(mainData.trips, mainData.currentUser.id);
};

const getDescriptiveData = () => {
  (0,_functions__WEBPACK_IMPORTED_MODULE_10__.addDates)(mainData.userTrips);
  (0,_functions__WEBPACK_IMPORTED_MODULE_10__.addLocationInfo)(mainData.userTrips, mainData.destinations);
  (0,_functions__WEBPACK_IMPORTED_MODULE_10__.sortTripsByDate)(mainData.userTrips);
  console.log("mainData.userTrips", mainData.userTrips);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_9__.populateLocationDropdown)(mainData.destinations);
};

const generatePage = () => {
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_9__.updateTripsPage)(
    mainData.currentUser.name,
    (0,_functions__WEBPACK_IMPORTED_MODULE_10__.getAnnualSpending)((0,_functions__WEBPACK_IMPORTED_MODULE_10__.getAnnualArray)(mainData.userTrips))
  );
  const pendingTrips = (0,_functions__WEBPACK_IMPORTED_MODULE_10__.getPending)(mainData.userTrips);
  const sortedPending = (0,_functions__WEBPACK_IMPORTED_MODULE_10__.sortSequentially)(pendingTrips);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_9__.createPendingCards)(sortedPending);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_9__.createUpcomingCards)((0,_functions__WEBPACK_IMPORTED_MODULE_10__.getUpcoming)(mainData.userTrips));
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_9__.createPastCards)((0,_functions__WEBPACK_IMPORTED_MODULE_10__.sortSequentially)((0,_functions__WEBPACK_IMPORTED_MODULE_10__.getPast)(mainData.userTrips)));
};

const loadPage = () => {
  _apiCalls__WEBPACK_IMPORTED_MODULE_11__.getData;
  Promise.all((0,_apiCalls__WEBPACK_IMPORTED_MODULE_11__.getData)()).then((promises) => {
    mainData.trips = promises[0].trips;
    mainData.travelers = promises[1].travelers;
    mainData.destinations = promises[2].destinations;
    const signedInUser = mainData.currentUser;
    getUserData(signedInUser);
    getDescriptiveData();
    generatePage();
  });
};

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map