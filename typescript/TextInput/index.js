"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialFunction = exports.text = void 0;
const react_1 = __importDefault(require("react"));
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
