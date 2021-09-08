export interface IReturnData<T = any> {
  getStatus(): string;
  getData(): T;
  getMsg(): string;
}

export default class BaseReturn<IData = any> implements IReturnData {
  private status = "";

  private msg = "";

  private data: IData | null = null;

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

  static getStatusIsFunction(param: any) {
    return param && typeof param.getStatus === "function";
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
}
