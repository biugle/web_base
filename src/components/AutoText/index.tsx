import React, { ReactNode } from 'react';
import { Tooltip, Typography, TooltipProps } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

type EllipsisConfig = {
  rows?: number;
  expandable?: boolean;
  tooltip: boolean | ReactNode | TooltipProps;
  onEllipsis: (ellipsis: boolean) => void;
};

type CustomComponentProps = {
  text: string;
  color?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  icon?: ReactNode;
  tips?: ReactNode;
  title?: ReactNode;
  tooltipProps?: TooltipProps;
  style?: React.CSSProperties;
  ellipsisConfig?: boolean | EllipsisConfig;
};

const CustomComponent: React.FC<CustomComponentProps> = ({
  text,
  color,
  prefix,
  suffix,
  title,
  tooltipProps,
  ellipsisConfig,
  style,
  icon,
  tips,
  ...rest
}) => {
  const tooltipTitle = title || text;

  return (
    <div
      className="autoText"
      {...rest}
      style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color, ...style, maxWidth: '100%' }}
    >
      {prefix && prefix}
      <span style={{ margin: 2, maxWidth: '100%' }}>
        <Tooltip title={tooltipTitle} color={color} {...tooltipProps}>
          <Text style={{ color }} ellipsis={ellipsisConfig}>
            {text}
          </Text>
        </Tooltip>
      </span>
      {tips && (
        <span style={{ margin: 2, marginTop: 3 }}>
          <Tooltip title={tips}>{icon}</Tooltip>
        </span>
      )}
      {suffix && suffix}
    </div>
  );
};

CustomComponent.defaultProps = {
  icon: <QuestionCircleOutlined />,
  tooltipProps: {},
  style: {},
  ellipsisConfig: true,
  color: 'black',
};

export default CustomComponent;
