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

/*
 * @Author: youzhao.zhou
 * @Date: 2021-08-19 16:51:33
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-09-08 21:01:35
 * @Description 统一返回格式
 */
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
        return ((ReturnData.getStatusIsFunction(data) &&
            data.getStatus() === "NETWORK_ERROR") ||
            (data === null || data === void 0 ? void 0 : data.status) === "NETWORK_ERROR");
    };
    /**
     * 覆盖原有的逻辑
     * @param data
     * @returns
     */
    ReturnData.cover = function (keyName, value) {
        ReturnData[keyName] = value;
    };
    /**
     * 返回成功
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
    /**
     * 中断类
     * @returns ReturnData
     */
    ReturnData.interrupt = function (msg) {
        return new ReturnData("INTERRUPT", null, msg || "程序中断，请重试");
    };
    /**
     * 是否是中断返回
     * @param data
     * @returns
     */
    ReturnData.isInterrupt = function (data) {
        return ReturnData.getStatusValue(data) === "INTERRUPT";
    };
    /**
     * 取消返回类
     * @returns ReturnData
     */
    ReturnData.cancel = function (msg) {
        return new ReturnData("CANCEL", null, msg || "网络异常，请重试");
    };
    /**
     * 是否是取消返回
     * @param data
     * @returns
     */
    ReturnData.isCancel = function (data) {
        return ReturnData.getStatusValue(data) === "CANCEL";
    };
    /**
     * 顶级错误类
     * @returns ReturnData
     */
    ReturnData.error = function (msg) {
        return new this("ERROR", null, msg || "程序中断，请重试");
    };
    /**
     * 是否是顶级错误
     * @param data
     * @returns
     */
    ReturnData.isError = function (data) {
        return ReturnData.getStatusValue(data) === "ERROR";
    };
    ReturnData.getStatusIsFunction = function (param) {
        return param && typeof param.getStatus === "function";
    };
    ReturnData.getStatusValue = function (obj) {
        var _a;
        if (ReturnData.getStatusIsFunction(obj)) {
            return obj.getStatus();
        }
        return (_a = obj === null || obj === void 0 ? void 0 : obj.status) !== null && _a !== void 0 ? _a : "";
    };
    return ReturnData;
}());
function getStatusIsFunction(param) {
    return param && typeof param.getStatus === "function";
}

export { BaseReturn, ReturnData as default };
//# sourceMappingURL=return-data.es.js.map
