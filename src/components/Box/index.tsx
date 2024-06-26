import React from 'react';
import styled from '@emotion/styled';
import { cx } from '@emotion/css';

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  sx?: Record<string, any>;
  className?: string;
}

const Box: React.FC<BoxProps> = ({ sx, className, ...props }) => {
  const BoxElement = styled('div')(sx);

  return <BoxElement className={cx(className, 'BoxElement')} {...props} />;
};

export default Box;
