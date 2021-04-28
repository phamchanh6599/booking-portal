import React, { useState, useEffect } from 'react';
import { Select, Form, Input, Button } from 'antd';
import DatePicker from 'react-datepicker';
import { useHistory } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

import { getEvents } from '../../api/eventApi';
import { addBooking } from '../../api/bookingApi';
import './BookingForm.scss';

export const BookingForm = () => {
  const { Option } = Select;
  const [options, setOptions] = useState([]);
  const [type, setType] = useState('');
  const [dateFirst, setDateFirst] = useState(new Date());
  const [dateSecond, setDateSecond] = useState(new Date());
  const [dateLast, setDateLast] = useState(new Date());
  const [location, setLocation] = useState('');

  const history = useHistory();
  const handleChange = (value) => setType(value.value);

  useEffect(() => {
    const getOptionEvents = async () => {
      try {
        const res = await getEvents('api/event/all');
        if (res.type.length) setOptions(res.type);
      } catch (err) {
        console.log('err', err);
      }
    };
    getOptionEvents();
  }, []);

  const submit = async () => {
    const booking = {
      type,
      date_time_1: dateFirst,
      date_time_2: dateSecond,
      date_time_3: dateLast,
      location,
    };

    try {
      const res = await addBooking('api/booking', booking);
      const { success } = res;
      if (success) history.push('/');
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <div className='BookingForm'>
      <div className='BookingForm__card'>
        <div className='BookingForm__group'>
          <span> Type of event</span>
          <Select
            labelInValue
            style={{ width: 120 }}
            name='type'
            onChange={handleChange}
          >
            {options.length
              && options.map((x, idx) => (
                <Option value={x.type} key={idx}>
                  {x.type}
                </Option>
              ))}
          </Select>
        </div>
        <div className='BookingForm__group'>
          <span> Location of Event </span>
          <Form.Item
            name='location'
            rules={[
              {
                required: true,
                message: 'Please input your location!',
              },
            ]}
          >
            <Input
              name='location'
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Item>
        </div>
        <div className='BookingForm__group'>
          <span>Date time 1</span>
          <DatePicker
            onChange={(date) => setDateFirst(date)}
            selected={dateFirst}
          />
        </div>
        <div className='BookingForm__group'>
          <span>Date time 2</span>
          <DatePicker
            onChange={(date) => setDateSecond(date)}
            selected={dateSecond}
          />
        </div>
        <div className='BookingForm__group'>
          <span>Date time 3</span>
          <DatePicker
            onChange={(date) => setDateLast(date)}
            selected={dateLast}
          />
        </div>
        <div className='BookingForm__button'>
          <Button type='primary' onClick={submit}>
            Save
          </Button>
          <Button type='primary' danger onClick={() => history.replace('/')}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
