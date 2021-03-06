import { useEffect, useState, useRef } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  // eslint-disable-next-line
  }, []);
};

// ?要么不传，要传就是数字
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);

  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    remove: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};

export const useDocumentTitle = (
  title: string,
  keepOnUnmounted: boolean = true
) => {
  // 页面加载时: 旧 title
 const oldTitle = useRef(document.title).current;

  useEffect(() => {
    // 加载后: 新 title
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmounted) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmounted, oldTitle]);
};


export const resetRoute = () => (window.location.href = window.location.origin);
