import React from 'react';
import styled from '@emotion/styled';
import { cx } from '@emotion/css';

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  sx?: any;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

// 将 styled 组件移到组件外部
const createStyledElement = (styles: any) => styled.div(styles);

const Box: React.FC<BoxProps> = ({ sx, className, children, ...props }) => {
  // 使用 useMemo 缓存 styled 组件，避免每次渲染重新创建 styled 组件，影响 dom tree 的构建。
  const BoxElement = React.useMemo(() => createStyledElement(sx), [sx]);

  return (
    <BoxElement className={cx(className, 'BoxElement')} {...props}>
      {children}
    </BoxElement>
  );
};

export default Box;
