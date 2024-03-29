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
    private status;
    private data;
    private msg;
    private extraData;
    constructor(status: string, data?: T | null | undefined, msg?: string);
    getStatus(): string;
    getData(): T | null;
    getMsg(): string;
    setMsg(msg: string): void;
    getExtraData(): any;
    setExtraData(data: any): void;
    /**
     * 判断是否成功
     * @param {any} data
     * @returns boolean
     */
    static isOk(data: any): boolean;
    static isFail(data: any): boolean;
    static isDeny(data: any): boolean;
    /**
     * 判断data是不是null或者undefined
     * @param param
     * @returns
     */
    static hasData(param: any): boolean;
    /**
     * 是否是网络错误
     * @param data
     * @returns
     */
    static isNetWorkError(data: any): boolean;
    /**
     * 覆盖原有的逻辑
     * @param data
     * @returns
     */
    static cover<T = boolean>(keyName: string, value: (data: any) => T): void;
    /**
     * 返回成功
     * @param data
     * @returns ReturnData
     */
    static success<IData = any>(data?: IData): ReturnData<IData>;
    /**
     * 返回失败
     * @returns ReturnData
     */
    static fail(msg?: string): ReturnData<null>;
    /**
     * 统一异常处理
     * @param {IReturnData} ex
     * @returns
     */
    static exception(ex: IReturnData<null>): ReturnData<null>;
    /**
     * 返回拒绝
     * @returns ReturnData
     */
    static deny(msg?: string): ReturnData<null>;
    /**
     * 网络异常返回类
     * @returns ReturnData
     */
    static networkError(msg?: string): ReturnData<null>;
    /**
     * 中断类
     * @returns ReturnData
     */
    static interrupt(msg?: string): ReturnData<null>;
    /**
     * 是否是中断返回
     * @param data
     * @returns
     */
    static isInterrupt(data: any): boolean;
    /**
     * 取消返回类
     * @returns ReturnData
     */
    static cancel(msg?: string): ReturnData<null>;
    /**
     * 是否是取消返回
     * @param data
     * @returns
     */
    static isCancel(data: any): boolean;
    /**
     * 顶级错误类
     * @returns ReturnData
     */
    static error(msg?: string): ReturnData<null>;
    /**
     * 是否是顶级错误
     * @param data
     * @returns
     */
    static isError(data: any): boolean;
    static getStatusIsFunction(param: any): any;
    static getStatusValue(obj: any): any;
}
