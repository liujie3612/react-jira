import { useCallback } from "react";
import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (
  endpoint: string, // path
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        // fetch不管服务端抛出什么状态 都不会抛出异常
        // axios 和 fetch 的表现不一样，axios 可以直接在返回状态不为 2XX 的时候抛出异常
        return Promise.reject(data);
      }
    });
};

// 自动携带token的hook
export const useHttp = () => {
  const { user } = useAuth();
  // ts中的typeof是在静态的时候运行的
  // js中的typeof是在runtime时运行的
  // 拿到函数的参数
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  );
};

// TS操作符 工具类型
// 联合类型
// let myFavoriteNumber: string | number

// 类型别名
// type FavoriteNumber = string | number;
// let rosesFavoriteNumber: FavoriteNumber = '6'
// 类型别名在很多时候可以和interface互换
// 1. 联合类型和交叉类型：interface没办法替代type
// 2. interface没办法实现utility types
// 不侵入原来类型 可选
// type Person = {
//   name: string;
//   age: number;
// };

// 可选属性
// const XiaoMing: Partial<Person> = { name: "xiaoming" };
// const XiaoMing1: Partial<Person> = {};

//  删除某个属性
// const ShenMiRen: Omit<Person, "name"> = { age: 1 };

// 删除多个属性
// const ShenMiRen1: Omit<Person, "name" | "age"> = {};

// 对象类型的key取出来 形成联合类型
// type PersonKeys = keyof Person;
// type PersonOnlyName = Pick<Person, "name">;
// Omit、Pick、Partial 操作的是键值对
// Exclude操作的是联合类型
// type Age = Exclude<PersonKeys, "name">;

// type Partial<T> = {
//   [P in keyof T]?: T[P];
// };

// extends K必须是T类型键值的子集
// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P];
// };

// T为联合类型，遍历这里的key和U比对，符合就返回never 达到删除的效果
// type Exclude<T, U> = T extends U ? never : T;
