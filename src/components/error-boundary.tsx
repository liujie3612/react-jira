import React from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

// type PropsWithChildren<P> = P & {children?: ReactNode}

// https://github.com/bvaughn/react-error-boundary
// 全局错误的兜底方案
// PropsWithChildren除了children剩下的类型
// state { error: Error | null }

// 只能写class组件
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  // 当子组件抛出异常，这里会接收到并且调用
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
