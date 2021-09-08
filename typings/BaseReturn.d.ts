export interface IReturnData<T = any> {
    getStatus(): string;
    getData(): T;
    getMsg(): string;
}
export default class BaseReturn<IData = any> implements IReturnData {
    private status;
    private msg;
    private data;
    constructor(status?: string, data?: IData | null | undefined, msg?: string);
    setStatus(status: string): void;
    setMsg(msg: string): void;
    setData(data: IData): void;
    getStatus(): string;
    getData(): IData | null;
    getMsg(): string;
    static getStatusIsFunction(param: any): any;
    /**
     * 判断是否成功
     * @param {any} data
     * @returns boolean
     */
    static isOk(data: any): boolean;
    static isFail(data: any): boolean;
    static isDeny(data: any): boolean;
}
