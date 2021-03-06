import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";
/**
 * 返回页面 url 中，指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      // keys作为依赖项会导致无限循环
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    // setSearchParams 限定住searchParams里的类型
    (params: Partial<{ [key in K]: unknown }>) => {
      // iterator 遍历器
      // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file/src/index.js
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParams(o);
    },
  ] as const;
};
