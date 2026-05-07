import { addDelivery, addSalesDetails, getDelivery, updateDelivery } from '@/pages/Delivery/api';
import { getInventoryDrug, getInventoryOrder } from '@/pages/Inventory/api';
import { removeRule } from '@/services/ant-design-pro/api';
import { ThunderboltFilled } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProForm,
  ProFormDatePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormMoney, ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import Details from './list';
const { Text } = Typography;

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addDelivery({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};
const handleAdd2 = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addSalesDetails({ ...fields });
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
    await updateDelivery(fields, id);
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
      title: '销售单号',
      dataIndex: 'salesOrderNumber',
      width: '140px',
    },
    {
      title: '发货日期',
      dataIndex: 'shipDate',
      valueType: 'date',
      width: '120px',
    },
    {
      title: '客户名称',
      dataIndex: 'clientsName',
    },
    {
      title: '收货地址',
      dataIndex: 'shippingAddress',
    },
    {
      title: '联系电话',
      dataIndex: 'contactPhone',
      hideInSearch: true,
      width: '100px',
    },
    {
      title: '经办人',
      dataIndex: 'processor',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      hideInSearch: true,
    },
    {
      title: '应收',
      dataIndex: 'amountReceivable',
      hideInSearch: true,
      valueType: 'money',
      width: '100px',
      align: 'right',
      render: (_, r) => (
        <Text type={'warning'} strong>
          {_}
        </Text>
      ),
    },
    {
      title: '实收',
      dataIndex: 'amountActuallyReceived',
      hideInSearch: true,
      valueType: 'money',
      width: '100px',
      align: 'right',
      render: (_, r) => (
        <Text type={'warning'} strong>
          {_}
        </Text>
      ),
    },
    {
      title: '剩余',
      dataIndex: 'balance',
      hideInSearch: true,
      valueType: 'money',
      width: '100px',
      align: 'right',
      render: (_, r) => <Text>{_}</Text>,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '180px',
      render: (_, record) => [
        <a
          key="config1"
          onClick={() => {
            handleModalOpen2(true);
            setCurrentRow(record);
          }}
        >
          添加产品
        </a>,
        <a
          key="config2"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          编辑
        </a>,
        <a
          key="config3"
          onClick={() => {
            handleDeliverModalOpen(true);
            setCurrentRow(record);
          }}
        >
          结单
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
    <PageContainer>
      <ProTable
        headerTitle={'销售记录'}
        actionRef={actionRef}
        rowKey="id"
        expandable={{
          expandedRowRender: (record) => (
            <Details
              salesOrderNumber={record.salesOrderNumber}
              actionRef={actionRef2}
              orgionRef={actionRef}
            />
          ),
        }}
        toolBarRender={(action) => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            生成销售单
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
        request={getDelivery}
        columns={columns}
      />

      <ModalForm
        title={'生成销售单'}
        width="500px"
        open={createModalOpen}
        layout={'horizontal'}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText label="销售单号" name="salesOrderNumber" />
        <ProFormDatePicker label="发货日期" name={'shipDate'} />
        <ProFormText
          label="客户名称"
          name="clientsName"
          tooltip={{
            icon: <ThunderboltFilled style={{ color: '#faad14' }} />,
            title: '快捷输入',
          }}
        />
        <ProFormText label="收货地址" name="shippingAddress" />
        <ProFormText label="联系电话" name="contactPhone" />
        <ProFormSelect label="经办人员" name="processor" options={['张三', '李希']} />
        <ProFormTextArea label="备注信息" name="remark" />
      </ModalForm>

      <ModalForm
        title={'编辑入库单'}
        width="500px"
        open={updateModalOpen}
        modalProps={{
          destroyOnClose: true,
        }}
        layout={'horizontal'}
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
          }
        }}
      >
        <ProFormText label="入库单号" disabled name="warehouseOrderNumber" />
        <ProFormDatePicker label="入库日期" disabled name={'storageDate'} />
        <ProFormText
          label="供货商"
          name="supplierName"
          tooltip={{
            icon: <ThunderboltFilled style={{ color: '#faad14' }} />,
            title: '快捷输入',
          }}
        />
        <ProFormText label="联系人员" name="contactPerson" />
        <ProFormText label="联系电话" name="contactPhone" />
        <ProFormSelect label="经办人员" name="processor" options={['张三', '李希']} />
        <ProFormTextArea label="备注信息" name="remark" />
      </ModalForm>

      <ModalForm
        title={'添加产品'}
        width="420px"
        formRef={formRef}
        open={createModalOpen2}
        layout={'horizontal'}
        onOpenChange={handleModalOpen2}
        modalProps={{
          destroyOnClose: true,
        }}
        initialValues={{
          salesOrderNumber: currentRow?.salesOrderNumber,
        }}
        onFinish={async (value) => {
          console.log('value', value);
          const { drugCode, warehouseOrderNumber, ...res } = value;
          const success = await handleAdd2({
            ...res,
            drugCode: drugCode[0].value,
            warehouseOrderNumber: warehouseOrderNumber[0].value,
          });
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
        <ProFormText label="销售单号" disabled name="salesOrderNumber" />
        <ProFormSelect.SearchSelect
          label="药品编码"
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

        <ProFormDependency name={['drugCode']}>
          {(drugCode) => {
            return (
              <ProFormSelect.SearchSelect
                label={'药品批号'}
                name="warehouseOrderNumber"
                multiple={false}
                params={{ drugCode: drugCode?.drugCode?.[0]?.value ?? '' }}
                tooltip={{
                  icon: <ThunderboltFilled style={{ color: '#faad14' }} />,
                  title: '快捷输入',
                }}
                debounceTime={100}
                request={getInventoryOrder}
                fieldProps={{
                  maxCount: 1,
                }}
              />
            );
          }}
        </ProFormDependency>
        <ProForm.Group>
          <ProFormText
            label={'生产日期'}
            name={['warehouseOrderNumber', '0', 'productionDate']}
            readonly
          />
          <ProFormText
            label="有效期至"
            name={['warehouseOrderNumber', '0', 'validityPeriod']}
            readonly
          />
          <ProFormText
            label="库存数量"
            name={['warehouseOrderNumber', '0', 'inboundQuantity']}
            readonly
          />
        </ProForm.Group>

        <ProFormDigit label="销售数量" name="salesVolume" onBlur={handleBCChange} />
        <ProFormMoney label="销售价格" name="sellingPrice" onBlur={handleBCChange} />
        <ProFormMoney label="小计金额" disabled name="lumpSum" />
      </ModalForm>


      <ModalForm
        title={'结单'}
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

    </PageContainer>
  );
};

export default TableList;
