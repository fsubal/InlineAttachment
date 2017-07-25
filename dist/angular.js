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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var Utils = (function () {
    function Utils() {
    }
    /**
     * Simple function to merge the given objects
     *
     * @returns {Object}
     */
    Utils.merge = function () {
        var objects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            objects[_i] = arguments[_i];
        }
        var result = {};
        for (var i = objects.length - 1; i >= 0; i--) {
            var obj = objects[i];
            for (var k in obj) {
                if (obj.hasOwnProperty(k)) {
                    result[k] = obj[k];
                }
            }
        }
        return result;
    };
    /**
     * @param str
     * @returns {string} Returns the string with the first letter as lowercase
     */
    Utils.lcfirst = function (str) {
        return str.charAt(0).toLowerCase() + str.substr(1);
    };
    /**
     * Append a line of text at the bottom, ensuring there aren't unnecessary newlines
     *
     * @param {String} appended Current content
     * @param {String} previous Value which should be appended after the current content
     */
    Utils.appendInItsOwnLine = function (previous, appended) {
        return (previous + "\n\n[[D]]" + appended)
            .replace(/(\n{2,})\[\[D\]\]/, "\n\n")
            .replace(/^(\n*)/, "");
    };
    /**
     * Inserts the given value at the current cursor position of the textarea element
     *
     * @param  {HTMLElement} el
     * @param  {String} text Text which will be inserted at the cursor position
     */
    Utils.insertTextAtCursor = function (el, text) {
        var scrollPos = el.scrollTop;
        var strPos = 0;
        var browser = false;
        var range;
        if ((el.selectionStart || el.selectionStart === 0)) {
            browser = "ff";
        }
        else if (document.selection) {
            browser = "ie";
        }
        if (browser === "ie") {
            el.focus();
            range = document.selection.createRange();
            range.moveStart('character', -el.value.length);
            strPos = range.text.length;
        }
        else if (browser === "ff") {
            strPos = el.selectionStart;
        }
        var front = (el.value).substring(0, strPos);
        var back = (el.value).substring(strPos, el.value.length);
        el.value = front + text + back;
        strPos = strPos + text.length;
        if (browser === "ie") {
            el.focus();
            range = document.selection.createRange();
            range.moveStart('character', -el.value.length);
            range.moveStart('character', strPos);
            range.moveEnd('character', 0);
            range.select();
        }
        else if (browser === "ff") {
            el.selectionStart = strPos;
            el.selectionEnd = strPos;
            el.focus();
        }
        el.scrollTop = scrollPos;
    };
    return Utils;
}());
/* harmony default export */ __webpack_exports__["default"] = (Utils);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__defaults__ = __webpack_require__(2);


var InlineAttachment = (function () {
    function InlineAttachment(instance, options) {
        this.settings = __WEBPACK_IMPORTED_MODULE_0__utils__["default"].merge(options, __WEBPACK_IMPORTED_MODULE_1__defaults__["a" /* default */]);
        this.editor = instance;
        this.filenameTag = '{filename}';
        this.lastValue = null;
    }
    /**
     * Uploads the blob
     *
     * @param  {Blob} file blob data received from event.dataTransfer object
     * @return {XMLHttpRequest} request object which sends the file
     */
    InlineAttachment.prototype.uploadFile = function (file) {
        var _this = this;
        var formData = new FormData();
        var xhr = new XMLHttpRequest();
        var settings = this.settings;
        var extension = settings.defaultExtension;
        if (typeof settings.setupFormData === 'function') {
            settings.setupFormData(formData, file);
        }
        // Attach the file. If coming from clipboard, add a default filename (only works in Chrome for now)
        // http://stackoverflow.com/questions/6664967/how-to-give-a-blob-uploaded-as-formdata-a-file-name
        if (file.name) {
            var fileNameMatches = file.name.match(/\.(.+)$/);
            if (fileNameMatches) {
                extension = fileNameMatches[1];
            }
        }
        var remoteFilename = "image-" + Date.now() + "." + extension;
        if (typeof settings.remoteFilename === 'function') {
            remoteFilename = settings.remoteFilename(file);
        }
        formData.append(settings.uploadFieldName, file, remoteFilename);
        // Append the extra parameters to the formdata
        if (typeof settings.extraParams === "object") {
            for (var key in settings.extraParams) {
                if (settings.extraParams.hasOwnProperty(key)) {
                    formData.append(key, settings.extraParams[key]);
                }
            }
        }
        xhr.open('POST', settings.uploadUrl);
        // Add any available extra headers
        if (typeof settings.extraHeaders === "object") {
            for (var header in settings.extraHeaders) {
                if (settings.extraHeaders.hasOwnProperty(header)) {
                    xhr.setRequestHeader(header, settings.extraHeaders[header]);
                }
            }
        }
        xhr.onload = function () {
            // If HTTP status is OK or Created
            if (xhr.status === 200 || xhr.status === 201) {
                _this.onFileUploadResponse(xhr);
            }
            else {
                _this.onFileUploadError(xhr);
            }
        };
        if (settings.beforeFileUpload(xhr) !== false) {
            xhr.send(formData);
        }
        return xhr;
    };
    /**
     * Returns if the given file is allowed to handle
     *
     * @param {File} file clipboard data file
     */
    InlineAttachment.prototype.isFileAllowed = function (file) {
        if (file.kind === 'string') {
            return false;
        }
        if (this.settings.allowedTypes.indexOf('*') === 0) {
            return true;
        }
        else {
            return this.settings.allowedTypes.indexOf(file.type) >= 0;
        }
    };
    /**
     * Handles upload response
     *
     * @param  {XMLHttpRequest} xhr
     * @return {void}
     */
    InlineAttachment.prototype.onFileUploadResponse = function (xhr) {
        if (this.settings.onFileUploadResponse.call(this, xhr) !== false) {
            var result = JSON.parse(xhr.responseText), filename = result[this.settings.jsonFieldName];
            if (result && filename) {
                var newValue;
                if (typeof this.settings.urlText === 'function') {
                    newValue = this.settings.urlText.call(this, filename, result);
                }
                else {
                    newValue = this.settings.urlText.replace(this.filenameTag, filename);
                }
                var text = this.editor.getValue().replace(this.lastValue, newValue);
                this.editor.setValue(text);
                this.settings.onFileUploaded.call(this, filename);
            }
        }
    };
    /**
     * Called when a file has failed to upload
     *
     * @param  {XMLHttpRequest} xhr
     * @return {void}
     */
    InlineAttachment.prototype.onFileUploadError = function (xhr) {
        if (this.settings.onFileUploadError.call(this, xhr) !== false) {
            var text = this.editor.getValue().replace(this.lastValue, this.settings.errorText);
            this.editor.setValue(text);
        }
    };
    /**
     * Called when a file has been inserted, either by drop or paste
     *
     * @param  {File} file
     * @return {void}
     */
    InlineAttachment.prototype.onFileInserted = function (file) {
        if (this.settings.onFileReceived.call(this, file) !== false) {
            this.lastValue = this.settings.progressText;
            this.editor.insertValue(this.lastValue);
        }
    };
    /**
     * Called when a paste event occured
     * @param  {Event} e
     * @return {Boolean} if the event was handled
     */
    InlineAttachment.prototype.onPaste = function (e) {
        var clipboardData = e.clipboardData;
        var result = false;
        var items;
        if (typeof clipboardData === "object") {
            items = clipboardData.items || clipboardData.files || [];
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (this.isFileAllowed(item)) {
                    result = true;
                    this.onFileInserted(item.getAsFile());
                    this.uploadFile(item.getAsFile());
                }
            }
        }
        if (result) {
            e.preventDefault();
        }
        return result;
    };
    /**
     * Called when a drop event occures
     * @param  {Event} e
     * @return {Boolean} if the event was handled
     */
    InlineAttachment.prototype.onDrop = function (e) {
        var result = false;
        for (var i = 0; i < e.dataTransfer.files.length; i++) {
            var file = e.dataTransfer.files[i];
            if (this.isFileAllowed(file)) {
                result = true;
                this.onFileInserted(file);
                this.uploadFile(file);
            }
        }
        return result;
    };
    return InlineAttachment;
}());
/* harmony default export */ __webpack_exports__["a"] = (InlineAttachment);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Default Options
 */
/* harmony default export */ __webpack_exports__["a"] = ({
    /**
     * URL where the file will be send
     */
    uploadUrl: 'upload_attachment.php',
    /**
     * Which method will be used to send the file to the upload URL
     */
    uploadMethod: 'POST',
    /**
     * Name in which the file will be placed
     */
    uploadFieldName: 'file',
    /**
     * Extension which will be used when a file extension could not
     * be detected
     */
    defaultExtension: 'png',
    /**
     * JSON field which refers to the uploaded file URL
     */
    jsonFieldName: 'filename',
    /**
     * Allowed MIME types
     */
    allowedTypes: [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'image/gif'
    ],
    /**
     * Text which will be inserted when dropping or pasting a file.
     * Acts as a placeholder which will be replaced when the file is done with uploading
     */
    progressText: '![Uploading file...]()',
    /**
     * When a file has successfully been uploaded the progressText
     * will be replaced by the urlText, the {filename} tag will be replaced
     * by the filename that has been returned by the server
     */
    urlText: "![file]({filename})",
    /**
     * Text which will be used when uploading has failed
     */
    errorText: "Error uploading file",
    /**
     * Extra parameters which will be send when uploading a file
     */
    extraParams: {},
    /**
     * Extra headers which will be send when uploading a file
     */
    extraHeaders: {},
    /**
     * Before the file is send
     */
    beforeFileUpload: function () {
        return true;
    },
    /**
     * Triggers when a file is dropped or pasted
     */
    onFileReceived: function () {
        return true;
    },
    /**
     * Custom upload handler
     *
     * @return {Boolean} when false is returned it will prevent default upload behavior
     */
    onFileUploadResponse: function () {
        return true;
    },
    /**
     * Custom error handler. Runs after removing the placeholder text and before the alert().
     * Return false from this function to prevent the alert dialog.
     *
     * @return {Boolean} when false is returned it will prevent default error behavior
     */
    onFileUploadError: function () {
        return true;
    },
    /**
     * When a file has succesfully been uploaded
     */
    onFileUploaded: function () { }
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _input = __webpack_require__(4);

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var directiveName = 'inlineattachment';
var _module = angular.module(directiveName, []);

/**
 * Read all parameters from the given attributes object
 *
 * @param  {Object} obj attributes
 * @param scope Angular Scope
 * @return {Object}
 */
function readParameters(obj, scope) {
  var result = {},
      attrs = obj.$attr,
      option,
      value;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(attrs)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      option = _utils2.default.lcfirst(key.substr(directiveName.length));
      value = obj[key];
      // Check if the given key is a valid string type, not empty and starts with the attribute name
      if (option.length > 0 && key.substring(0, directiveName.length) === directiveName) {
        result[option] = value;
        if (typeof scope[value] === 'function') {
          result[option] = scope[value];
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
}

_module.directive(directiveName, function () {
  return function (scope, element, attrs) {
    var options = readParameters(attrs, scope);
    new _input2.default(element[0], options);
  };
});

exports.default = _module;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__inline_attachment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);


var InputInlineAttachment = (function () {
    function InputInlineAttachment(instance, options) {
        this.instance = instance;
        this.options = options;
        this.bind();
    }
    InputInlineAttachment.prototype.getValue = function () {
        return this.instance.value;
    };
    InputInlineAttachment.prototype.insertValue = function (val) {
        __WEBPACK_IMPORTED_MODULE_1__utils__["default"].insertTextAtCursor(this.instance, val);
    };
    InputInlineAttachment.prototype.setValue = function (val) {
        this.instance.value = val;
    };
    InputInlineAttachment.prototype.bind = function () {
        var inlineAttachment = new __WEBPACK_IMPORTED_MODULE_0__inline_attachment__["a" /* default */](this, this.options);
        this.instance.addEventListener('paste', function (e) {
            inlineAttachment.onPaste(e);
        }, false);
        this.instance.addEventListener('drop', function (e) {
            e.stopPropagation();
            e.preventDefault();
            inlineAttachment.onDrop(e);
        }, false);
        this.instance.addEventListener('dragenter', function (e) {
            e.stopPropagation();
            e.preventDefault();
        }, false);
        this.instance.addEventListener('dragover', function (e) {
            e.stopPropagation();
            e.preventDefault();
        }, false);
    };
    return InputInlineAttachment;
}());
/* harmony default export */ __webpack_exports__["default"] = (InputInlineAttachment);


/***/ })
/******/ ]);