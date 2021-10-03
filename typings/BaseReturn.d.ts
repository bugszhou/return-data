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
    private status;
    private msg;
    private data;
    private extraData;
    constructor(status?: string, data?: IData | null | undefined, msg?: string);
    setStatus(status: string): void;
    setMsg(msg: string): void;
    setData(data: IData): void;
    getStatus(): string;
    getData(): IData | null;
    getMsg(): string;
    getExtraData(): any;
    setExtraData(data: any): void;
    static getStatusIsFunction(param: any): any;
    static getStatusValue(obj: any): any;
    /**
     * 判断是否成功
     * @param {any} data
     * @returns boolean
     */
    static isOk(data: any): boolean;
    static isFail(data: any): boolean;
    static isDeny(data: any): boolean;
    /**
     * 是否是网络错误
     * @param data
     * @returns
     */
    static isNetWorkError(data: any): any;
    /**
     * 判断data是不是null或者undefined
     * @param param
     * @returns
     */
    static hasData(param: any): boolean;
}
