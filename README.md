# return-data

在开发时，会经常遇到模块返回的数据格式不一致，导致各种显示的判断逻辑，例如：`if (code === 'success') {...}`，这类判断会暴露模块内部的变量和值，不适合维护。

## Features

- 统一模块返回的数据格式

## Installing

Using npm:

```shell
npm install return-data
```

Using yarn:

```shell
yarn add return-data
```

## Usage

```javascript
import ReturnData from "return-data";

// 构造函数的
const returnData = new ReturnData("success", null, "成功");

returnData.getStatus() === "success";

console.log(returnData.getData()); // console null
console.log(returnData.getMsg()); // console 成功

// Update msg
returnData.setMsg("更新成功");
console.log(returnData.getMsg()); // console 更新成功
```

返回成功或正确的数据：

```javascript
import ReturnData from "return-data";

function demo() {
  return ReturnData.success({
    name: "Tom",
  });
}

const returnData = demo();

// 判断返回的数据是否是success
if (ReturnData.isOk(returnData)) {
  // 获取返回的数据，
  const data = returnData.getData();
  // data === {name: "Tom"}
  console.log(data);
}
```

返回失败的数据：

```javascript
import ReturnData from "return-data";

function demo() {
  return ReturnData.fail();
}

const returnData = demo();

// 判断返回的数据是否是fail
if (ReturnData.isFail(returnData)) {
  // do something
}
```

自定义异常类：

```javascript
import { BaseReturn } from "return-data";

class CustomException extends BaseReturn {
  static get NOT_FOUND_USER() {
    return new CustomException("NOT_FOUND_USER", null, "未找到用户");
  }

  static isNotFoundUser(obj: any) {
    return BaseReturn.getStatusValue(obj) === "NOT_FOUND_USER";
  }
}
```

## API

- ReturnData(status: string, data:any = null, msg?: string);
- static success(data?: any): ReturnData
- static fail(data?: any): ReturnData
- static deny(): ReturnData
- static exception(returnData: IReturnData): ReturnData
- static isOk(obj: any): boolean
- static isFail(obj: any): boolean
- static isDeny(obj: any): boolean

## `deny():ReturnData`

```javascript
import ReturnData from "return-data";

function demo() {
  return ReturnData.deny();
}

const returnData = demo();

// 判断返回的数据是否是deny
if (ReturnData.isDeny(returnData)) {
  // do something
}
```

## `exception(returnData: IReturnData): ReturnData`

用于返回自定义的异常错误类

```javascript
import ReturnData, { BaseReturn } from "return-data";

class CustomException extends BaseReturn {
  static get NOT_FOUND_USER() {
    return new CustomException("NOT_FOUND_USER", null, "未找到用户");
  }

  static isNotFoundUser(obj: any) {
    return BaseReturn.getStatusValue(obj) === "NOT_FOUND_USER";
  }
}

function demo() {
  return ReturnData.exception(CustomException.NOT_FOUND_USER);
}

const returnData = demo();

if (CustomException.isNotFoundUser(returnData)) {
  // do something
}
```
