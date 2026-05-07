import { getInventory } from '@/pages/Inventory/api';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import Details from './list';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const actionRef2 = useRef<ActionType>();
  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '药品编码',
      dataIndex: 'drugCode',
    },
    {
      title: '药品名称',
      dataIndex: ['medicine', 'drugName'],
    },
    {
      title: '药品通用名',
      dataIndex: ['medicine', 'alias'],
      hideInSearch: true,
    },
    {
      title: '规格',
      dataIndex: ['medicine', 'specification'],
      hideInSearch: true,
    },
    // {
    //   title: '上市许可持有人',
    //   dataIndex:['medicine','manufacturer'],
    //   hideInSearch: true,
    // },
    {
      title: '生产厂家',
      dataIndex: ['medicine', 'marketingAuthorizationHolder'],
      hideInSearch: true,
    },
    {
      title: '剂型',
      dataIndex: ['medicine', 'dosageForm'],
      hideInSearch: true,
    },
    {
      title: '包装',
      dataIndex: ['medicine', 'package'],
      hideInSearch: true,
    },
    {
      title: '批准文号',
      dataIndex: ['medicine', 'approvalNumber'],
      hideInSearch: true,
    },
    {
      title: '入库总数',
      dataIndex: 'totalInventory',
      hideInSearch: true,
    },
    {
      title: '销售总数',
      dataIndex: 'salesTotally',
      hideInSearch: true,
    },
    {
      title: '实际库存',
      dataIndex: 'physicalInventory',
      hideInSearch: true,
    },
    {
      title: '库存总值',
      dataIndex: 'totalInventoryPrice',
      valueType: 'money',
      hideInSearch: true,
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle={'药械库存'}
        actionRef={actionRef}
        rowKey="drugCode"
        expandable={{
          expandedRowRender: (record) => (
            <Details drugCode={record.drugCode} actionRef={actionRef2} />
          ),
        }}
        request={getInventory}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
