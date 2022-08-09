/*
 * @Author: youzhao.zhou
 * @Date: 2021-08-19 16:51:33
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-09-08 21:01:35
 * @Description 统一返回格式
 */

import BaseReturn, { IReturnData } from "./BaseReturn";

export { BaseReturn };

/**
 * 统一返回格式
 */
export default class ReturnData<T = any> {
  /**
   * 状态值类型
   *
   * ok -- 成功
   * deny -- 用户拒绝或系统拒绝
   * fail -- 执行失败
   */
  private status: string;

  private data: T | null;

  private msg = "";

  private extraData: any = null;

  constructor(
    status: string,
    data: T | null | undefined = null,
    msg = "success",
  ) {
    this.status = status;
    this.data = data;
    this.msg = msg;
  }

  getStatus(): string {
    return this.status;
  }

  getData(): T | null {
    return this.data;
  }

  getMsg(): string {
    return this.msg;
  }

  setMsg(msg: string): void {
    this.msg = msg;
  }

  getExtraData() {
    return this.extraData;
  }

  setExtraData(data: any) {
    this.extraData = data;
  }

  /**
   * 判断是否成功
   * @param {any} data
   * @returns boolean
   */
  static isOk(data: any): boolean {
    return getStatusIsFunction(data) && data.getStatus() === "ok";
  }

  static isFail(data: any): boolean {
    return getStatusIsFunction(data) && data.getStatus() === "fail";
  }

  static isDeny(data: any): boolean {
    return getStatusIsFunction(data) && data.getStatus() === "deny";
  }

  /**
   * 判断data是不是null或者undefined
   * @param param
   * @returns
   */
  static hasData(param: any): boolean {
    if (!param || typeof param.getData !== "function") {
      return false;
    }
    const data = param.getData();
    return !(typeof data === "undefined" || data === null);
  }

  /**
   * 是否是网络错误
   * @param data
   * @returns
   */
  static isNetWorkError(data: any): boolean {
    return (
      BaseReturn.getStatusIsFunction(data) &&
      data.getStatus() === "NETWORK_ERROR"
    );
  }

  /**
   * 覆盖原有的逻辑
   * @param data
   * @returns
   */
  static cover<T = boolean>(keyName: string, value: (data: any) => T): void {
    (ReturnData as any)[keyName] = value;
  }

  /**
   * 返回成功
   * @param data
   * @returns ReturnData
   */
  static success<IData = any>(data?: IData) {
    return new ReturnData<IData>("ok", data);
  }

  /**
   * 返回失败
   * @returns ReturnData
   */
  static fail(msg?: string) {
    const data = new ReturnData("fail", null);
    data.setMsg(msg || "");
    return data;
  }

  /**
   * 统一异常处理
   * @param {IReturnData} ex
   * @returns
   */
  static exception(ex: IReturnData<null>) {
    return new ReturnData<null>(ex.getStatus(), ex.getData(), ex.getMsg());
  }

  /**
   * 返回拒绝
   * @returns ReturnData
   */
  static deny(msg?: string) {
    return new ReturnData("deny", null, msg || "");
  }

  /**
   * 网络异常返回类
   * @returns ReturnData
   */
  static networkError(msg?: string) {
    return new ReturnData("NETWORK_ERROR", null, msg || "网络异常，请重试");
  }

  /**
   * 中断类
   * @returns ReturnData
   */
  static interrupt(msg?: string) {
    return new ReturnData("INTERRUPT", null, msg || "程序中断，请重试");
  }

  /**
   * 是否是中断返回
   * @param data
   * @returns
   */
  static isInterrupt(data: any) {
    return BaseReturn.getStatusValue(data) === "INTERRUPT";
  }

  /**
   * 取消返回类
   * @returns ReturnData
   */
  static cancel(msg?: string) {
    return new ReturnData("CANCEL", null, msg || "网络异常，请重试");
  }

  /**
   * 是否是取消返回
   * @param data
   * @returns
   */
  static isCancel(data: any) {
    return BaseReturn.getStatusValue(data) === "CANCEL";
  }

  /**
   * 顶级错误类
   * @returns ReturnData
   */
  static error(msg?: string) {
    return new this("ERROR", null, msg || "程序中断，请重试");
  }

  /**
   * 是否是顶级错误
   * @param data
   * @returns
   */
  static isError(data: any) {
    return BaseReturn.getStatusValue(data) === "ERROR";
  }
}

function getStatusIsFunction(param: any) {
  return param && typeof param.getStatus === "function";
}
