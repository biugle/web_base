import React from 'react';
import { Modal } from 'antd';
import { fire } from './index';

const FireConfirmDialog = (props: any) => {
  console.log({ props });
  return (
    <Modal centered loading wrapClassName="fireConfirm" style={{ top: '-15%' }} {...props}>
      {props?.content}
    </Modal>
  );
};

export const fireConfirm = fire(FireConfirmDialog);
