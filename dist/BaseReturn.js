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
        this.extraData = null;
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
    BaseReturn.prototype.getExtraData = function () {
        return this.extraData;
    };
    BaseReturn.prototype.setExtraData = function (data) {
        this.extraData = data;
    };
    BaseReturn.getStatusIsFunction = function (param) {
        return param && typeof param.getStatus === "function";
    };
    BaseReturn.getStatusValue = function (obj) {
        if (BaseReturn.getStatusIsFunction(obj)) {
            return obj.getStatus();
        }
        return "";
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
    /**
     * 是否是网络错误
     * @param data
     * @returns
     */
    BaseReturn.isNetWorkError = function (data) {
        return ((BaseReturn.getStatusIsFunction(data) &&
            data.getStatus() === "NETWORK_ERROR") ||
            (data === null || data === void 0 ? void 0 : data.status) === "NETWORK_ERROR");
    };
    /**
     * 判断data是不是null或者undefined
     * @param param
     * @returns
     */
    BaseReturn.hasData = function (param) {
        if (!param || typeof param.getData !== "function") {
            return false;
        }
        var data = param.getData();
        return !(typeof data === "undefined" || data === null);
    };
    /**
     * 取消返回类
     * @returns ReturnData
     */
    BaseReturn.cancel = function (msg) {
        return new this("CANCEL", null, msg || "网络异常，请重试");
    };
    /**
     * 是否是取消返回
     * @param data
     * @returns
     */
    BaseReturn.isCancel = function (data) {
        return BaseReturn.getStatusValue(data) === "CANCEL";
    };
    /**
     * 中断类
     * @returns ReturnData
     */
    BaseReturn.interrupt = function (msg) {
        return new this("INTERRUPT", null, msg || "程序中断，请重试");
    };
    /**
     * 是否是中断返回
     * @param data
     * @returns
     */
    BaseReturn.isInterrupt = function (data) {
        return BaseReturn.getStatusValue(data) === "INTERRUPT";
    };
    /**
     * 顶级错误类
     * @returns ReturnData
     */
    BaseReturn.error = function (msg) {
        return new this("ERROR", null, msg || "程序中断，请重试");
    };
    /**
     * 是否是顶级错误
     * @param data
     * @returns
     */
    BaseReturn.isError = function (data) {
        return BaseReturn.getStatusValue(data) === "ERROR";
    };
    return BaseReturn;
}());
exports.default = BaseReturn;
//# sourceMappingURL=BaseReturn.js.map