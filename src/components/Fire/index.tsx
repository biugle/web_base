import { DrawerProps, ModalProps } from 'antd';
import { getKey } from 'js-xxx';
import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

type FireDomProps = ModalProps &
  DrawerProps & {
    content?: ReactNode;
    [key: string]: any;
  };

const destroyFns = new Set();

export const fire = (Component, options?: any) => {
  // @ts-ignore
  const isReact18 = !!ReactDOM?.createRoot;

  const createComponent = (props0?: FireDomProps) => {
    const props = { ...(props0 ?? {}) };
    props.key = props.key ?? getKey();

    const onClose = (...args) => {
      // @ts-ignore
      props?.onClose?.(...args);
      // @ts-ignore
      props?.onCancel?.(...args);
      // @ts-ignore
      props?.close?.(...args);

      close(...args);
    };

    const currentProps = {
      visible: true,
      open: true,
      show: true,
      onCancel: onClose,
      onClose: onClose,
      close: onClose,
      ...props,
    };

    const wrapDOM = document.createElement('div');
    wrapDOM.className = options?.className ?? 'fireWrap';
    wrapDOM.setAttribute('key', props.key);
    // @ts-ignore
    const root = isReact18 ? ReactDOM.createRoot(wrapDOM) : null;

    document.body.appendChild(wrapDOM);

    const render = (props) => {
      // ConfigProvider 兼容
      const node = <Component {...props} getContainer={wrapDOM} />;

      if (isReact18) {
        root.render(node);
      } else {
        ReactDOM.render(node, wrapDOM);
      }
    };

    const destroy = () => {
      if (isReact18) {
        root.unmount();
        wrapDOM.parentNode?.removeChild(wrapDOM);
      } else {
        const unmountRet = ReactDOM.unmountComponentAtNode(wrapDOM);
        unmountRet && wrapDOM.parentNode?.removeChild(wrapDOM);
      }

      destroyFns.delete(close);
    };

    const close = (...args) => {
      update({
        visible: false,
        open: false,
        show: false,
      });

      setTimeout(() => {
        destroy();
        if (props?.afterClose) {
          // @ts-ignore
          props?.afterClose?.(...args);
        }
      }, 1111);
    };

    const update = (newProps) => {
      render({ ...currentProps, ...newProps });
    };

    render(currentProps);
    destroyFns.add(close);

    return { update, close, props };
  };

  return createComponent;
};

export function destroyAllFireComponents() {
  // @ts-ignore
  destroyFns.forEach((destroy) => destroy?.());
}
