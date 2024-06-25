import { getKey } from 'js-xxx';
import React from 'react';
import ReactDOM from 'react-dom';

const destroyFns = new Set();

export const fire = (Component, options?: any) => {
  // @ts-ignore
  const isReact18 = !!ReactDOM?.createRoot;

  const createComponent = (props0?: any) => {
    const props = { ...(props0 ?? {}) };

    const onClose = (...args) => {
      props?.onClose?.(...args);
      props?.onCancel?.(...args);
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
    // @ts-ignore
    const root = isReact18 ? ReactDOM.createRoot(wrapDOM) : null;

    document.body.appendChild(wrapDOM);

    const render = (props) => {
      // ConfigProvider 兼容
      const node = <Component key={getKey()} {...props} getContainer={wrapDOM} />;

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
          props?.afterClose?.(...args);
        }
      }, 1500);
    };

    const update = (newProps) => {
      render({ ...currentProps, ...newProps });
    };

    render(currentProps);
    destroyFns.add(close);

    return { update, close };
  };

  return createComponent;
};

export function destroyAllFireComponents() {
  // @ts-ignore
  destroyFns.forEach((destroy) => destroy?.());
}
