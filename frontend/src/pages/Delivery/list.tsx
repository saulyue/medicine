import { getSalesDetails, removeSalesDetails, updateSalesDetails } from '@/pages/Delivery/api';
import type { ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormMoney,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { message, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
const { Text } = Typography;
const handleUpdate = async (fields: FormValueType, id: number) => {
  const hide = message.loading('Configuring');
  try {
    await updateSalesDetails(fields, id);
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
    await removeSalesDetails(id);
    hide();
    message.success('Deleted successfully and will refresh soon');

    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList: React.FC = ({ salesOrderNumber, actionRef, orgionRef }) => {
  const [removeModalOpen, handleRemoveModalOpen] = useState<boolean>(false);
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '药品批号',
      dataIndex: 'warehouseOrderNumber',
    },
    {
      title: '药品编码',
      dataIndex: 'drugCode',
    },
    {
      title: '药品名称',
      dataIndex: ['medicine', 'drugName'],
      hideInSearch: true,
      width: '100px',
    },
    {
      title: '药品通用名',
      dataIndex: ['medicine', 'alias'],
      hideInSearch: true,
      width: '120px',
    },
    {
      title: '规格型号',
      dataIndex: ['medicine', 'specification'],
      hideInSearch: true,
      width: '120px',
    },
    // {
    //   title: '上市许可持有人',
    //   dataIndex: ['medicine', 'marketingAuthorizationHolder'],
    //   hideInSearch: true,
    //   width: '160px',
    // },
    {
      title: '生产厂家',
      dataIndex: ['medicine', 'manufacturer'],
      hideInSearch: true,
      width: '120px',
    },
    {
      title: '剂型',
      dataIndex: ['medicine', 'dosageForm'],
      hideInSearch: true,
      width: '60px',
    },
    {
      title: '包装',
      dataIndex: ['medicine', 'package'],
      width: '60px',
    },
    {
      title: '批准文号',
      dataIndex: ['medicine', 'approvalNumber'],
      hideInSearch: true,
      width: '120px',
    },
    {
      title: '生产日期',
      dataIndex: ['warehouseOrder', 'productionDate'],
      hideInSearch: true,
      valueType: 'date',
      width: '120px',
    },
    {
      title: '有效期至',
      dataIndex: ['warehouseOrder', 'validityPeriod'],
      hideInSearch: true,
      valueType: 'date',
      width: '120px',
    },
    {
      title: '数量',
      dataIndex: 'salesVolume',
      hideInSearch: true,
      width: '80px',
    },
    {
      title: '单价',
      dataIndex: 'sellingPrice',
      hideInSearch: true,
      valueType: 'money',
      width: '100px',
    },
    {
      title: '金额',
      dataIndex: 'lumpSum',
      hideInSearch: true,
      valueType: 'money',
      width: '120px',
      align: 'right',
      render: (_) => (
        <Text type={'warning'} strong>
          {_}
        </Text>
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '120px',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          编辑
        </a>,
        <a
          key="del"
          onClick={() => {
            handleRemoveModalOpen(true);
            setCurrentRow(record);
          }}
        >
          <Text type="danger">删除</Text>
        </a>,
      ],
    },
  ];
  const formRef = useRef(null);
  const handleBCChange = () => {
    const salesVolume = formRef?.current?.getFieldValue('salesVolume') || 0;
    const sellingPrice = formRef?.current?.getFieldValue('sellingPrice') || 0;
    const result = salesVolume * sellingPrice;
    formRef?.current?.setFieldsValue({
      lumpSum: result,
    });
  };

  return (
    <>
      <ProTable
        headerTitle={'明细'}
        actionRef={actionRef}
        bordered
        rowKey="id"
        search={false}
        params={{ salesOrderNumber }}
        request={getSalesDetails}
        columns={columns}
        size={'small'}
        pagination={false}
        options={false}
      />
      <ModalForm
        formRef={formRef}
        title={'编辑明细'}
        width="420px"
        layout={'horizontal'}
        open={updateModalOpen}
        modalProps={{
          destroyOnClose: true,
        }}
        onOpenChange={(e) => {
          if (!e) {
            setCurrentRow(undefined);
          }
          handleUpdateModalOpen(e);
        }}
        initialValues={currentRow}
        onFinish={async (value) => {
          console.log('value', value);
          const {warehouseOrder, ...rest} = value;
          const success = await handleUpdate(rest as API.RuleListItem, currentRow.id);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
            if (orgionRef.current) {
              orgionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText label="销售单号" disabled name="salesOrderNumber" />
        <ProFormText label="药品编码" disabled name="drugCode" />
        <ProFormText label="药品批号" disabled name="warehouseOrderNumber" />
        <ProForm.Group>
          <ProFormText label={'生产日期'} name={['warehouseOrder', 'productionDate']} readonly />
          <ProFormText label="有效期至" name={['warehouseOrder', 'validityPeriod']} readonly />
          <ProFormText label="库存数量" name={['warehouseOrder', 'inboundQuantity']} readonly />
        </ProForm.Group>
        <ProFormDigit label="销售数量" name="salesVolume" onBlur={handleBCChange} />
        <ProFormMoney label="销售价格" name="sellingPrice" onBlur={handleBCChange} />
        <ProFormMoney label="小计金额" disabled name="lumpSum" />
      </ModalForm>

      <ModalForm
        title={'删除明细'}
        open={removeModalOpen}
        width={'400px'}
        modalProps={{
          destroyOnClose: true,
        }}
        onOpenChange={(e) => {
          handleRemoveModalOpen(e);
          if (!e) {
            setCurrentRow(undefined);
          }
        }}
        onFinish={async () => {
          console.log('currentRow', currentRow);

          const success = await handleRemove(currentRow.id);
          if (success) {
            handleRemoveModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
            if (orgionRef.current) {
              orgionRef.current.reload();
            }
          }
        }}
      >
        是不是删除 <a>{currentRow?.drugName} </a> 的明细?
      </ModalForm>
    </>
  );
};

export default TableList;
