import React, { ReactNode } from 'react';
import { Modal, ModalProps } from 'antd';
import { fire } from './index';

type CombinedProps = ModalProps & {
  content?: ReactNode;
  [key: string]: any;
};

const FireConfirmDialog = (props: CombinedProps) => {
  console.log({ props });
  return (
    <Modal centered wrapClassName="fireConfirm" style={{ top: '-15%' }} {...props}>
      {props?.content}
    </Modal>
  );
};

export const fireConfirm = fire(FireConfirmDialog);
