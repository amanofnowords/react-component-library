import react from 'react';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var TextInput = createCommonjsModule(function (module, exports) {
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialFunction = exports.text = void 0;
const react_1 = __importDefault(react);
const text = {
    message: 'Matthew fixing dev aye run both',
    id: 2
};
exports.text = text;
const SpecialFunction = () => {
    console.log('Message Here', text.message);
    return react_1.default.createElement("p", null, text.message);
};
exports.SpecialFunction = SpecialFunction;
});

unwrapExports(TextInput);
var TextInput_1 = TextInput.SpecialFunction;
var TextInput_2 = TextInput.text;

var main = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialFunction = exports.text = void 0;
// import TextInput from './TextInput/index.jsx'
// import RadioSelect from './RadioSelect/index.jsx'

Object.defineProperty(exports, "text", { enumerable: true, get: function () { return TextInput.text; } });
Object.defineProperty(exports, "SpecialFunction", { enumerable: true, get: function () { return TextInput.SpecialFunction; } });
});

var main$1 = unwrapExports(main);
var main_1 = main.SpecialFunction;
var main_2 = main.text;

export default main$1;
export { main_1 as SpecialFunction, main_2 as text };
