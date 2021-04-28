import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

export const TableBooking = ({ columns, loading, data }) => (
  <div className='TableBooking'>
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={false}
    />
  </div>
);

TableBooking.propTypes = {
  columns: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
};
