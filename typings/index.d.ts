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
    constructor(status: string, data?: T | null | undefined, msg?: string);
    getStatus(): string;
    getData(): T | null;
    getMsg(): string;
    setMsg(msg: string): void;
    /**
     * 判断是否成功
     * @param {any} data
     * @returns boolean
     */
    static isOk(data: any): boolean;
    static isFail(data: any): boolean;
    static isDeny(data: any): boolean;
    /**
     * 返回成功
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
    static deny(): ReturnData<null>;
}
