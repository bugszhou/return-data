/*
 * @Author: youzhao.zhou
 * @Date: 2021-08-19 16:51:33
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-09-08 20:25:22
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

  /**
   * 判断是否成功
   * @param {ReturnData} data
   * @returns boolean
   */
  static isOk(data: ReturnData): boolean {
    return getStatusIsFunction(data) && data.getStatus() === "ok";
  }

  static isFail(data: ReturnData): boolean {
    return getStatusIsFunction(data) && data.getStatus() === "fail";
  }

  static isDeny(data: ReturnData): boolean {
    return getStatusIsFunction(data) && data.getStatus() === "deny";
  }

  /**
   * 返回成功
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
  static deny() {
    return new ReturnData("deny", null);
  }
}

function getStatusIsFunction(param: any) {
  return param && typeof param.getStatus === "function";
}
