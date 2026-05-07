import { getInventoryInfo } from '@/pages/Inventory/api';
import { removeWarehousing, updateWarehousing } from '@/pages/Storage/api';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { message, Typography } from 'antd';
import React, { useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
const { Text } = Typography;
const handleUpdate = async (fields: FormValueType, id: number) => {
  const hide = message.loading('Configuring');
  try {
    await updateWarehousing(fields, id);
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};
const handleRemove = async (id) => {
  const hide = message.loading('正在删除');
  try {
    await removeWarehousing(id);
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList: React.FC = ({ drugCode, actionRef }) => {
  const [removeModalOpen, handleRemoveModalOpen] = useState<boolean>(false);
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '入库单号',
      dataIndex: 'warehouseOrderNumber',
      width: 160,
    },
    {
      title: '生产日期',
      dataIndex: 'productionDate',
      hideInSearch: true,
      valueType: 'date',
      width: 160,
    },
    {
      title: '有效期至',
      dataIndex: 'validityPeriod',
      hideInSearch: true,
      valueType: 'date',
      width: 160,
    },
    {
      title: '入库数量',
      dataIndex: 'inboundQuantity',
      hideInSearch: true,
    },
    {
      title: '销售数量',
      dataIndex: 'salesTotally',
      hideInSearch: true,
    },
    {
      title: '成本价',
      dataIndex: 'purchasePrice',
      hideInSearch: true,
      valueType: 'money',
    },
    {
      title: '金额',
      dataIndex: 'lumpSum',
      hideInSearch: true,
      valueType: 'money',
    },
  ];

  return (
    <>
      <ProTable
        headerTitle={'明细'}
        actionRef={actionRef}
        bordered
        rowKey="id"
        search={false}
        params={{ drugCode }}
        request={getInventoryInfo}
        columns={columns}
        size={'small'}
        pagination={false}
        options={false}
      />
    </>
  );
};

export default TableList;
