"use strict";
/*
 * @Author: youzhao.zhou
 * @Date: 2021-08-19 16:51:33
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-09-08 21:01:35
 * @Description 统一返回格式
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseReturn = void 0;
var BaseReturn_1 = require("./BaseReturn");
exports.BaseReturn = BaseReturn_1.default;
/**
 * 统一返回格式
 */
var ReturnData = /** @class */ (function () {
    function ReturnData(status, data, msg) {
        if (data === void 0) { data = null; }
        if (msg === void 0) { msg = "success"; }
        this.msg = "";
        this.extraData = null;
        this.status = status;
        this.data = data;
        this.msg = msg;
    }
    ReturnData.prototype.getStatus = function () {
        return this.status;
    };
    ReturnData.prototype.getData = function () {
        return this.data;
    };
    ReturnData.prototype.getMsg = function () {
        return this.msg;
    };
    ReturnData.prototype.setMsg = function (msg) {
        this.msg = msg;
    };
    ReturnData.prototype.getExtraData = function () {
        return this.extraData;
    };
    ReturnData.prototype.setExtraData = function (data) {
        this.extraData = data;
    };
    /**
     * 判断是否成功
     * @param {any} data
     * @returns boolean
     */
    ReturnData.isOk = function (data) {
        return getStatusIsFunction(data) && data.getStatus() === "ok";
    };
    ReturnData.isFail = function (data) {
        return getStatusIsFunction(data) && data.getStatus() === "fail";
    };
    ReturnData.isDeny = function (data) {
        return getStatusIsFunction(data) && data.getStatus() === "deny";
    };
    /**
     * 判断data是不是null或者undefined
     * @param param
     * @returns
     */
    ReturnData.hasData = function (param) {
        if (!param || typeof param.getData !== "function") {
            return false;
        }
        var data = param.getData();
        return !(typeof data === "undefined" || data === null);
    };
    /**
     * 是否是网络错误
     * @param data
     * @returns
     */
    ReturnData.isNetWorkError = function (data) {
        return (BaseReturn_1.default.getStatusIsFunction(data) &&
            data.getStatus() === "NETWORK_ERROR");
    };
    /**
     * 返回成功
     * @param data
     * @returns ReturnData
     */
    ReturnData.success = function (data) {
        return new ReturnData("ok", data);
    };
    /**
     * 返回失败
     * @returns ReturnData
     */
    ReturnData.fail = function (msg) {
        var data = new ReturnData("fail", null);
        data.setMsg(msg || "");
        return data;
    };
    /**
     * 统一异常处理
     * @param {IReturnData} ex
     * @returns
     */
    ReturnData.exception = function (ex) {
        return new ReturnData(ex.getStatus(), ex.getData(), ex.getMsg());
    };
    /**
     * 返回拒绝
     * @returns ReturnData
     */
    ReturnData.deny = function (msg) {
        return new ReturnData("deny", null, msg || "");
    };
    /**
     * 网络异常返回类
     * @returns ReturnData
     */
    ReturnData.networkError = function (msg) {
        return new ReturnData("NETWORK_ERROR", null, msg || "网络异常，请重试");
    };
    return ReturnData;
}());
exports.default = ReturnData;
function getStatusIsFunction(param) {
    return param && typeof param.getStatus === "function";
}
//# sourceMappingURL=index.js.map