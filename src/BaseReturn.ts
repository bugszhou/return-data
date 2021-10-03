export interface IReturnData<T = any> {
  getStatus(): string;
  getData(): T;
  getMsg(): string;
  /**
   * 获取额外数据
   */
  getExtraData(): any;
  /**
   * 设置额外数据
   */
  setExtraData(data: any): void;
}

export default class BaseReturn<IData = any> implements IReturnData {
  private status = "";

  private msg = "";

  private data: IData | null = null;

  private extraData: any = null;

  constructor(status = "", data: IData | null | undefined = null, msg = "") {
    this.status = status;
    this.msg = msg;
    this.data = data;
  }

  setStatus(status: string) {
    this.status = status;
  }

  setMsg(msg: string) {
    this.msg = msg;
  }

  setData(data: IData) {
    this.data = data;
  }

  getStatus() {
    return this.status;
  }

  getData(): IData | null {
    return this.data;
  }

  getMsg() {
    return this.msg;
  }

  getExtraData() {
    return this.extraData;
  }

  setExtraData(data: any) {
    this.extraData = data;
  }

  static getStatusIsFunction(param: any) {
    return param && typeof param.getStatus === "function";
  }

  static getStatusValue(obj: any) {
    if (BaseReturn.getStatusIsFunction(obj)) {
      return obj.getStatus();
    }

    return "";
  }

  /**
   * 判断是否成功
   * @param {any} data
   * @returns boolean
   */
  static isOk(data: any): boolean {
    return BaseReturn.getStatusIsFunction(data) && data.getStatus() === "ok";
  }

  static isFail(data: any): boolean {
    return BaseReturn.getStatusIsFunction(data) && data.getStatus() === "fail";
  }

  static isDeny(data: any): boolean {
    return BaseReturn.getStatusIsFunction(data) && data.getStatus() === "deny";
  }

  /**
   * 是否是网络错误
   * @param data
   * @returns
   */
  static isNetWorkError(data: any) {
    return (
      BaseReturn.getStatusIsFunction(data) &&
      data.getStatus() === "NETWORK_ERROR"
    );
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
}
