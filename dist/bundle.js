'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var TextInput = function TextInput(_ref) {
  var inputID = _ref.inputID,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? '' : _ref$value,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? 'Please Enter Value' : _ref$placeholder,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? 'Text Input: ' : _ref$label,
      _ref$containerClassNa = _ref.containerClassName,
      containerClassName = _ref$containerClassNa === void 0 ? '' : _ref$containerClassNa,
      _ref$validate = _ref.validate,
      validate = _ref$validate === void 0 ? false : _ref$validate,
      _ref$regexType = _ref.regexType,
      regexType = _ref$regexType === void 0 ? 'personName' : _ref$regexType,
      customRegex = _ref.customRegex,
      _ref$errorMessage = _ref.errorMessage,
      errorMessage = _ref$errorMessage === void 0 ? 'Error: Please check value' : _ref$errorMessage,
      _ref$onChangeCallBack = _ref.onChangeCallBack,
      onChangeCallBack = _ref$onChangeCallBack === void 0 ? undefined : _ref$onChangeCallBack,
      inputAttributes = _ref.inputAttributes,
      labelAttributes = _ref.labelAttributes,
      errorMessageAttributes = _ref.errorMessageAttributes;
  var onChangeCallback = onChangeCallBack || undefined;
  var regexOptions = {
    personName: /^[a-zA-Z]+$/,
    // phoneNumber: undefined,
    email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    postalCode: /^[a-zA-Z0-9äöüÄÖÜ]*$/
  };

  var validateInput = function validateInput(passedValue) {
    var regex = regexOptions[regexType];
    customRegex ? regex = customRegex : regex;
    var isValid = regex.test(passedValue);
    return isValid;
  };

  var onInputValueChange = function onInputValueChange(e) {
    setInputValue(e.target.value);
    var isValid = validateInput(e.target.value);

    if (validate) {
      setError(!isValid);
    }

    if (onChangeCallback !== undefined) {
      var params = {
        event: e,
        value: e.target.value,
        validate: validate ? isValid : undefined
      };
      onChangeCallback(params);
    }
  };

  if (validate === true) {
    var _useState = React.useState(!validateInput(inputValue)),
        _useState2 = _slicedToArray(_useState, 2),
        errorExist = _useState2[0],
        setError = _useState2[1];
  }

  var _useState3 = React.useState(value),
      _useState4 = _slicedToArray(_useState3, 2),
      inputValue = _useState4[0],
      setInputValue = _useState4[1];

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "text-input ".concat(containerClassName)
  }, /*#__PURE__*/React__default['default'].createElement("label", _extends({
    htmlFor: inputID
  }, labelAttributes), label), /*#__PURE__*/React__default['default'].createElement("input", _extends({
    type: "text",
    id: inputID,
    placeholder: placeholder,
    value: inputValue
  }, inputAttributes, {
    onChange: function onChange(e) {
      onInputValueChange(e);
    }
  })), errorExist === true && /*#__PURE__*/React__default['default'].createElement("p", _extends({
    className: "errorMessage"
  }, errorMessageAttributes), errorMessage));
};

// TODO: Figure out how to handle default choices and also after the user selects

var RadioSelect = function RadioSelect(_ref) {
  var options = _ref.options,
      groupName = _ref.groupName,
      selectCallBack = _ref.selectCallBack;

  var returnValueOfOptionSelected = function returnValueOfOptionSelected(options) {
    var found = options.find(function (option) {
      return option.selected === true;
    });
    return found !== undefined ? found.value : undefined;
  };

  var _useState = React.useState(optionSelected || returnValueOfOptionSelected(options) || undefined),
      _useState2 = _slicedToArray(_useState, 2),
      optionSelected = _useState2[0],
      changeOptionSelected = _useState2[1];

  var handleClick = function handleClick(e) {
    if (selectCallBack !== undefined) {
      selectCallBack(groupName, e.target.id);
    } else {
      changeOptionSelected(e.target.id);
    }
  };

  var renderOptions = function renderOptions(options) {
    var optionArray = [];
    options.map(function (option, index) {
      optionArray.push( /*#__PURE__*/React__default['default'].createElement("p", {
        className: "radioSelectOption ".concat(optionSelected === option.value ? 'selected' : ''),
        key: index,
        id: option.value,
        onClick: function onClick(e) {
          return handleClick(e);
        },
        name: groupName
      }, option.name));
    });
    return optionArray;
  };

  return options ? renderOptions(options) : undefined;
};

exports.RadioSelect = RadioSelect;
exports.TextInput = TextInput;
