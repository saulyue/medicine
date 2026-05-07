import { getWarehousing, removeWarehousing, updateWarehousing } from '@/pages/Storage/api';
import type { ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormDatePicker,
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

const TableList: React.FC = ({ warehouseOrderNumber, actionRef, orgionRef }) => {
  const [removeModalOpen, handleRemoveModalOpen] = useState<boolean>(false);
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const columns: ProColumns<API.RuleListItem>[] = [
    // {
    //   title: '入库单号',
    //   dataIndex: 'warehouseOrderNumber',
    // },
    {
      title: '药品编码',
      dataIndex: 'drugCode',
      width: '100px',
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
      dataIndex: 'productionDate',
      hideInSearch: true,
      valueType: 'date',
      width: '120px',
    },
    {
      title: '有效期至',
      dataIndex: 'validityPeriod',
      hideInSearch: true,
      valueType: 'date',
      width: '120px',
    },
    {
      title: '数量',
      dataIndex: 'inboundQuantity',
      hideInSearch: true,
      width: '80px',
    },
    {
      title: '单价',
      dataIndex: 'purchasePrice',
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
    const inboundQuantity = formRef?.current?.getFieldValue('inboundQuantity') || 0;
    const purchasePrice = formRef?.current?.getFieldValue('purchasePrice') || 0;
    const result = inboundQuantity * purchasePrice;
    console.log(inboundQuantity, purchasePrice, result);
    formRef?.current?.setFieldsValue({
      lumpSum: result,
    });
  };

  return (
    <>
      <ProTable
        headerTitle={'入库单明细'}
        actionRef={actionRef}
        bordered
        rowKey="id"
        search={false}
        params={{ warehouseOrderNumber }}
        request={getWarehousing}
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
          const success = await handleUpdate(value as API.RuleListItem, currentRow.id);
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
        <ProFormText label="入库单号" disabled name="warehouseOrderNumber" />
        <ProFormText label="药品编码" disabled name="drugCode" />
        <ProFormDatePicker label="生产日期" name={'productionDate'} />
        <ProFormDatePicker label="有效期至" name={'validityPeriod'} />
        <ProFormDigit label="到货数量" name="inboundQuantity" onBlur={handleBCChange} />
        <ProFormMoney label="进货价格" name="purchasePrice" onBlur={handleBCChange} />
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
        是不是删除 <a>{currentRow?.drugCode} </a> 的明细?
      </ModalForm>
    </>
  );
};

export default TableList;
