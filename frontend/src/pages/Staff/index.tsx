import { addStaff, getStaff, removeStaff, updateStaff } from '@/pages/Staff/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProFormText,
  ProFormTextArea,
  ProTable,
  ProFormRadio
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';

const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addStaff({ ...fields });
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
    await updateStaff(
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
    await removeStaff(id);
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
      title: '工号',
      dataIndex: 'jobNumber',
      hideInSearch: true,
    },
    {
      title: '员工名称',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      hideInSearch: true,
    },
    {
      title: '联系电话',
      dataIndex: 'contactNumber',
      hideInSearch: true,
    },
    {
      title: '联系地址',
      dataIndex: 'contactAddress',
      hideInSearch: true,
    },
    {
      title: '头像',
      dataIndex: 'avatar',
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
        headerTitle={'供应商列表'}
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
            新增
          </Button>,
        ]}
        request={getStaff}
        columns={columns}
      />
      <ModalForm
        title={'新增'}
        width="500px"
        layout={'horizontal'}
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        modalProps={{
          destroyOnClose: true,
        }}
        onFinish={async (value) => {
          console.log('value', value);
          const success = await handleAdd(value as API.RuleListItem);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText label="工号" name="jobNumber" />
        <ProFormText label="姓名" name="name" />
        <ProFormRadio.Group  options={['男', '女']} label="性别" name="sex" />
        <ProFormText label="电话" name="contactNumber" />
        <ProFormText label="地址" name="contactAddress" />
        <ProFormText label="头像" name="avatar" />
        <ProFormTextArea label="备注" name="remark" />
      </ModalForm>

      <ModalForm
        title={'编辑'}
        width="500px"
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
          }
        }}
      >
        <ProFormText label="工号" name="jobNumber" />
        <ProFormText label="姓名" name="name" />
        <ProFormRadio.Group  options={['男', '女']} label="性别" name="sex" />
        <ProFormText label="电话" name="contactNumber" />
        <ProFormText label="地址" name="contactAddress" />
        <ProFormText label="头像" name="avatar" />
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
        onFinish={async () => {
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
