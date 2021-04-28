/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useCallback } from 'react';
import { Tag, notification, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as actions from '../../redux/action/index';
import { getBooking, deleteBooking, updateBooking } from '../../api/bookingApi';
import { getUser } from '../../api/userApi';
import { covertTimeZone } from '../../utils/convertTime';

import { ModalBooking } from '../../core-components/ModalBooking/ModalBooking';
import { TableBooking } from '../../core-components/TableBooking/TableBooking';
import './Home.scss';

export const Home = () => {
  const Context = React.createContext();
  const history = useHistory();

  const [currentStatus, setCurrentStatus] = useState('');
  const [currentId, setCurrentId] = useState(null);
  const [isShowModal, setShowModal] = useState(false);
  const [titleMoadl, setTitleModal] = useState('');
  const [contentModal, setContentModal] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const userAuth = useSelector((state) => state);
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  const fetchUser = async () => {
    try {
      const res = await getUser('api/user');
      const { username, role } = res.user;
      dispatch(
        actions.loginUser({
          role,
          username,
        }),
      );
    } catch (err) {
      console.log('err', err);
    }
  };

  const fetchBooking = async () => {
    setLoading(true);
    try {
      const res = await getBooking('api/booking/all');
      if (res && res?.bookings) setBookings(res.bookings);
    } catch (err) {
      console.log('err', err);
    } finally {
      setLoading(false);
    }
  };

  const openNotification = (type, message) => {
    if (type === 'success') {
      api.success({
        message: `${type} !`,
        description: <Context.Consumer>{() => `${message}`}</Context.Consumer>,
      });
    }
  };

  const removeBooking = async (id) => {
    setLoading(true);
    try {
      const res = await deleteBooking(`api/booking/cancel/${id}`);
      const { success, message } = res;
      if (success) {
        fetchBooking();
        openNotification('success', message);
      }
    } catch (err) {
      openNotification('error', err);
      console.log('err', err);
    } finally {
      setLoading(false);
    }
  };

  const changeBooking = async (id, booking) => {
    setLoading(true);
    try {
      const res = await updateBooking(`api/booking/update/${id}`, booking);
      const { success, message } = res;
      if (success) {
        fetchBooking();
        openNotification('success', message);
      }
    } catch (err) {
      openNotification('error', err);
      console.log('err', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
    fetchUser();
  }, []);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(!isShowModal);
  const handleAction = (type, id) => {
    openModal();
    setCurrentId(id);
    setCurrentStatus(type);
    setTitleModal(type.toUpperCase());
    setContentModal(`Do you want to ${type.toUpperCase()} this booking`);
  };

  const handleOkAction = () => {
    setShowModal(false);
    if (currentStatus === 'delete') removeBooking(currentId);
    else {
      const booking = { status: `${currentStatus.toUpperCase()}D` };
      changeBooking(currentId, booking);
    }
  };

  const getColor = useCallback((status) => {
    let color = '';
    switch (status) {
      case 'PENDING': {
        color = 'green';
        break;
      }
      case 'APPROVED': {
        color = 'geekblue';
        break;
      }
      default:
        color = 'volcano';
    }
    return color;
  }, []);

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => <span>{type}</span>,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Date 1',
      dataIndex: 'date_time_1',
      key: 'date_time_1',
      render: (date_time_1) => <span>{covertTimeZone(date_time_1)}</span>,
      responsive: ['md'],
    },
    {
      title: 'Date 2',
      dataIndex: 'date_time_2',
      key: 'date_time_2',
      render: (date_time_2) => <span>{covertTimeZone(date_time_2)}</span>,
      responsive: ['md'],
    },
    {
      title: 'Date 3',
      dataIndex: 'date_time_3',
      key: 'date_time_3',
      render: (date_time_3) => <span>{covertTimeZone(date_time_3)}</span>,
      responsive: ['md'],
    },
    {
      title: 'Created by',
      dataIndex: 'user',
      key: 'user',
      render: (user) => <span>{user.username}</span>,
      responsive: ['md'],
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => (
        <>
          <Tag color={getColor(status)}>{status.toUpperCase()}</Tag>
        </>
      ),
      responsive: ['md'],
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, row) => (
        <div className='Home__table-action'>
          {userAuth.role === 'ADMIN' && row.status === 'PENDING' && (
            <React.Fragment>
              <Button
                type='primary'
                onClick={() => handleAction('APPROVE', row._id)}
              >
                Approve
              </Button>
              <Button
                type='primary'
                danger
                onClick={() => handleAction('REJECTE', row._id)}
              >
                Reject
              </Button>
            </React.Fragment>
          )}
          {row.status === 'PENDING' && (
            <Button danger onClick={() => handleAction('delete', row._id)}>
              Delete
            </Button>
          )}
        </div>
      ),
    },
  ];
  return (
    <Context.Provider>
      {contextHolder}
      <div className='Home'>
        <div className='Home__add-btn'>
          <Button type='primary' onClick={() => history.push('/booking/form')}>
            ADD NEW BOOKING
          </Button>
        </div>

        <TableBooking columns={columns} data={bookings} loading={loading} />
        <ModalBooking
          isShowModal={isShowModal}
          handleClose={closeModal}
          handleOk={handleOkAction}
          title={titleMoadl}
          content={contentModal}
        />
      </div>
    </Context.Provider>
  );
};
