import { addClients, getClients, removeClients, updateClients } from '@/pages/Clients/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';

const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addClients({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};
const handleUpdate = async (fields: any, id: number) => {
  const hide = message.loading('Configuring');
  try {
    await updateClients(
      {
        ...fields,
      },
      id,
    );
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

const handleRemove = async (id: number) => {
  const hide = message.loading('正在删除');
  try {
    await removeClients(id);
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
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [removeModalOpen, handleRemoveModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '客户名称',
      dataIndex: 'clientsName',
      hideInSearch: true,
    },
    {
      title: '收货地址',
      dataIndex: 'shippingAddress',
      hideInSearch: true,
    },
    {
      title: '联系人',
      dataIndex: 'contactPerson',
      hideInSearch: true,
    },
    {
      title: '联系电话',
      dataIndex: 'contactNumber',
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
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
          key="config"
          onClick={() => {
            handleRemoveModalOpen(true);
            setCurrentRow(record);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'客户明细列表'}
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined />
            新增客户
          </Button>,
        ]}
        request={getClients}
        columns={columns}
      />
      <ModalForm
        title={'新增客户'}
        width="600px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        modalProps={{
          destroyOnClose: true,
        }}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RuleListItem);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText label="客户名称" name="clientsName" />
        <ProFormText label="收货地址" name="shippingAddress" />
        <ProFormText label="联系人" name="contactPerson" />
        <ProFormText label="联系电话" name="contactNumber" />
        <ProFormTextArea label="备注" name="remark" />
      </ModalForm>

      <ModalForm
        title={'编辑'}
        width="600px"
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
          }
        }}
      >
        <ProFormText label="客户名称" name="clientsName" />
        <ProFormText label="收货地址" name="shippingAddress" />
        <ProFormText label="联系人" name="contactPerson" />
        <ProFormText label="联系电话" name="contactNumber" />
        <ProFormTextArea label="备注" name="remark" />
      </ModalForm>
      <ModalForm
        title={'删除产品'}
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
        onFinish={async (value) => {
          const success = await handleRemove(currentRow.id);
          if (success) {
            handleRemoveModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        是不是删除 <a>{currentRow?.clientsName} </a> 这个客户?
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
