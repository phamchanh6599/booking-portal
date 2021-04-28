import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

export const ModalBooking = ({
  title,
  isShowModal,
  handleOk,
  handleClose,
  content,
}) => (
  <>
    <Modal
      title={title}
      visible={isShowModal}
      onOk={handleOk}
      onCancel={handleClose}
    >
      <p>{content}</p>
    </Modal>
  </>
);

ModalBooking.propTypes = {
  title: PropTypes.string,
  isShowModal: PropTypes.bool,
  handleOk: PropTypes.func,
  handleClose: PropTypes.func,
  content: PropTypes.string,
  children: PropTypes.any,
};
