import { getInventoryDrug } from '@/pages/Inventory/api';
import {
  addStorage,
  addWarehousing,
  getStorage,
  newCode,
  updateStorage,
} from '@/pages/Storage/api';
import UpdateForm from '@/pages/Storage/components/UpdateForm';
import { removeRule } from '@/services/ant-design-pro/api';
import { ThunderboltFilled } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormMoney,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import Details from './list';
const { Text } = Typography;

const handleAdd = async (fields: any) => {
  const hide = message.loading('正在添加');
  try {
    await addStorage({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

const handleAdd2 = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addWarehousing({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: any, id: number) => {
  const hide = message.loading('Configuring');
  try {
    await updateStorage(fields, id);
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.RuleListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList: React.FC = () => {
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const [createModalOpen2, handleModalOpen2] = useState<boolean>(false);

  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [deliverModalOpen, handleDeliverModalOpen] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();

  const actionRef2 = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [warehouseOrderNumber, setWarehouseOrderNumber] = useState('');
  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '入库单号',
      dataIndex: 'warehouseOrderNumber',
      width: '130px',
    },
    {
      title: '入库日期',
      dataIndex: 'storageDate',
      valueType: 'date',
      width: '100px',
    },
    {
      title: '供商名称',
      dataIndex: 'supplierName',
    },
    {
      title: '联系人',
      dataIndex: 'contactPerson',
      hideInSearch: true,
    },
    {
      title: '联系电话',
      dataIndex: 'contactPhone',
      hideInSearch: true,
      width: '100px',
    },

    {
      title: '验收结论',
      dataIndex: 'acceptanceConclusion',
      hideInSearch: true,
    },
    {
      title: '经办人',
      dataIndex: 'processorName',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      hideInSearch: true,
    },
    {
      title: '应付',
      dataIndex: 'amountsPayable',
      hideInSearch: true,
      valueType: 'money',
      width: '100px',
      align: 'right',
      render: (_) => (
        <Text type={'warning'} strong>
          {_}
        </Text>
      ),
    },
    {
      title: '实付',
      dataIndex: 'theAmountActuallyPaid',
      hideInSearch: true,
      valueType: 'money',
      width: '100px',
      align: 'right',
      render: (_) => <Text>{_}</Text>
    },
    {
      title: '剩余',
      dataIndex: 'balance',
      hideInSearch: true,
      valueType: 'money',
      width: '100px',
      align: 'right',
      render: (_) => <Text>{_}</Text>,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        record.status === 0 && (
          <a
            key="config"
            onClick={() => {
              handleUpdateModalOpen(true);
              setCurrentRow(record);
            }}
          >
            编辑
          </a>
        ),
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
    <PageContainer>
      <ProTable
        headerTitle={'入库单管理'}
        actionRef={actionRef}
        rowKey="id"
        expandable={{
          expandedRowRender: (record) => (
            <Details
              warehouseOrderNumber={record.warehouseOrderNumber}
              actionRef={actionRef2}
              orgionRef={actionRef}
            />
          ),
        }}
        onDataSourceChange={(w) => {
          setWarehouseOrderNumber();
          console.log(w);
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              newCode().then((e) => {
                setWarehouseOrderNumber(e.data);
                handleModalOpen(true);
              });
            }}
          >
            登记入库
          </Button>,
        ]}
        onRow={(record) => {
          return {
            onClick: () => {
              if (record.warehouseOrderNumber) {
                console.log(record);
                setWarehouseOrderNumber(record.warehouseOrderNumber);
              }
            },
          };
        }}
        request={getStorage}
        columns={columns}
      />
      <UpdateForm
        title={'登记入库'}
        formRef={formRef}
        actionRef={actionRef}
        actionRef2={actionRef2}
        open={createModalOpen}
        handleModalOpen={handleModalOpen}
        warehouseOrderNumber={warehouseOrderNumber}
        onFinish={async (value) => {
          const { supplierName, ...res } = value;
          return await handleAdd({ ...res, supplierName: supplierName[0].value });
        }}
      />

      <UpdateForm
        title={'登记入库'}
        formRef={formRef}
        actionRef={actionRef}
        actionRef2={actionRef2}
        open={updateModalOpen}
        handleModalOpen={handleUpdateModalOpen}
        warehouseOrderNumber={currentRow?.warehouseOrderNumber}
        initialValues={currentRow}
        onFinish={async (value) => {
          console.log('value', value);
          const { supplierName,amountsPayable,balance, ...res } = value;
          return await handleUpdate({ ...res, supplierName: supplierName[0].value }, currentRow.id);
        }}
      />

      {/*<ModalForm*/}
      {/*  title={'编辑入库单'}*/}
      {/*  width="500px"*/}
      {/*  open={updateModalOpen}*/}
      {/*  modalProps={{*/}
      {/*    destroyOnClose: true,*/}
      {/*  }}*/}
      {/*  layout={'horizontal'}*/}
      {/*  onOpenChange={(e) => {*/}
      {/*    if (!e) {*/}
      {/*      setCurrentRow(undefined);*/}
      {/*    }*/}
      {/*    handleUpdateModalOpen(e);*/}
      {/*  }}*/}
      {/*  initialValues={currentRow}*/}
      {/*  onFinish={async (value) => {*/}
      {/*    console.log('value', value);*/}
      {/*    const success = await handleUpdate(value as API.RuleListItem, currentRow.id);*/}
      {/*    if (success) {*/}
      {/*      handleUpdateModalOpen(false);*/}
      {/*      setCurrentRow(undefined);*/}
      {/*      if (actionRef.current) {*/}
      {/*        actionRef.current.reload();*/}
      {/*      }*/}
      {/*    }*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <ProFormText label="入库单号" disabled name="warehouseOrderNumber" />*/}
      {/*  <ProFormDatePicker label="入库日期" disabled name={'storageDate'} size={'large'} />*/}
      {/*  <ProFormText*/}
      {/*    label="供货商"*/}
      {/*    name="supplierName"*/}
      {/*    tooltip={{*/}
      {/*      icon: <ThunderboltFilled style={{ color: '#faad14' }} />,*/}
      {/*      title: '快捷输入',*/}
      {/*    }}*/}
      {/*    debounceTime={100}*/}
      {/*    request={getSupplierDic}*/}
      {/*    fieldProps={{*/}
      {/*      maxCount: 1,*/}
      {/*      onChange: (value) => {*/}
      {/*        console.log(value);*/}
      {/*        formRef?.current.setFieldsValue({*/}
      {/*          contactPerson: '1',*/}
      {/*          contactPhone: '2',*/}
      {/*        });*/}
      {/*      },*/}
      {/*    }}*/}
      {/*  />*/}
      {/*  <ProFormText label="联系人员" name="contactPerson" />*/}
      {/*  <ProFormText label="联系电话" name="contactPhone" />*/}
      {/*  <ProFormSelect label="经办人员" name="processor" options={['张三', '李希']} />*/}
      {/*  <ProFormTextArea label="备注信息" name="remark" />*/}
      {/*</ModalForm>*/}

      <ModalForm
        title={'入库验收'}
        width="500px"
        open={deliverModalOpen}
        modalProps={{
          destroyOnClose: true,
        }}
        layout={'horizontal'}
        onOpenChange={(e) => {
          if (!e) {
            setCurrentRow(undefined);
          }
          handleDeliverModalOpen(e);
        }}
        initialValues={currentRow}
        onFinish={async (value) => {
          console.log('value', value);
          const success = await handleUpdate(value as API.RuleListItem, currentRow.id);
          if (success) {
            handleDeliverModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProForm.Group>
          <ProFormMoney label="应付金额" readonly name="amountsPayable" />
          <ProFormMoney label="剩余金额" readonly name="balance" />
        </ProForm.Group>

        <ProFormRadio.Group
          label="验收结论"
          name="acceptanceConclusion"
          options={['合格', '不合格']}
        />
        <ProFormMoney label="实付金额" name="theAmountActuallyPaid" />
      </ModalForm>

      <ModalForm
        title={'药品入库'}
        width="420px"
        open={createModalOpen2}
        layout={'horizontal'}
        onOpenChange={handleModalOpen2}
        modalProps={{
          destroyOnClose: true,
        }}
        initialValues={{
          warehouseOrderNumber,
        }}
        onFinish={async (value) => {
          console.log('value', value);
          const { drugCode, ...res } = value;
          const success = await handleAdd2({ ...res, drugCode: drugCode[0].value });
          if (success) {
            handleModalOpen2(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
            if (actionRef2.current) {
              actionRef2.current.reload();
            }
          }
        }}
      >
        <ProFormText label="入库单号" disabled name="warehouseOrderNumber" />
        <ProFormSelect.SearchSelect
          label="药品码"
          name="drugCode"
          multiple={false}
          tooltip={{
            icon: <ThunderboltFilled style={{ color: '#faad14' }} />,
            title: '快捷输入',
          }}
          debounceTime={100}
          request={(params) => getInventoryDrug({ drugCode: params.keyWords })}
          fieldProps={{
            maxCount: 1,
            optionItemRender: (item) => {
              return item.label + ' - ' + item.name;
            },
          }}
        />
        <ProFormDatePicker label="生产日期" name={'productionDate'} />
        <ProFormDatePicker label="有效期至" name={'validityPeriod'} />
        <ProFormDigit label="入库数量" name="inboundQuantity" onBlur={handleBCChange} />
        <ProFormMoney label="进货价格" name="purchasePrice" onBlur={handleBCChange} />
        <ProFormMoney label="小计金额" disabled name="lumpSum" />
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
