"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseReturn = /** @class */ (function () {
    function BaseReturn(status, data, msg) {
        if (status === void 0) { status = ""; }
        if (data === void 0) { data = null; }
        if (msg === void 0) { msg = ""; }
        this.status = "";
        this.msg = "";
        this.data = null;
        this.status = status;
        this.msg = msg;
        this.data = data;
    }
    BaseReturn.prototype.setStatus = function (status) {
        this.status = status;
    };
    BaseReturn.prototype.setMsg = function (msg) {
        this.msg = msg;
    };
    BaseReturn.prototype.setData = function (data) {
        this.data = data;
    };
    BaseReturn.prototype.getStatus = function () {
        return this.status;
    };
    BaseReturn.prototype.getData = function () {
        return this.data;
    };
    BaseReturn.prototype.getMsg = function () {
        return this.msg;
    };
    BaseReturn.getStatusIsFunction = function (param) {
        return param && typeof param.getStatus === "function";
    };
    /**
     * 判断是否成功
     * @param {any} data
     * @returns boolean
     */
    BaseReturn.isOk = function (data) {
        return BaseReturn.getStatusIsFunction(data) && data.getStatus() === "ok";
    };
    BaseReturn.isFail = function (data) {
        return BaseReturn.getStatusIsFunction(data) && data.getStatus() === "fail";
    };
    BaseReturn.isDeny = function (data) {
        return BaseReturn.getStatusIsFunction(data) && data.getStatus() === "deny";
    };
    return BaseReturn;
}());
exports.default = BaseReturn;
//# sourceMappingURL=BaseReturn.js.map