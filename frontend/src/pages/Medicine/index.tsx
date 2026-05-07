import { addMedicine, getMedicine, removeMedicine, updateMedicine } from '@/services/nestjs/api';
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
    await addMedicine({ ...fields });
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
    await updateMedicine(
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

const handleRemove = async (id:number) => {
  const hide = message.loading('正在删除');
  try {
    await removeMedicine(id);
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
      title: '药品编码',
      dataIndex: 'drugCode',
      hideInSearch: true,
    },
    {
      title: '药品名称',
      dataIndex: 'drugName',
      hideInSearch: true,
    },
    {
      title: '药品通用名',
      dataIndex: 'alias',
      hideInSearch: true,
    },
    {
      title: '规格',
      dataIndex: 'specification',
      hideInSearch: true,
    },
    {
      title: '上市许可持有人',
      dataIndex: 'manufacturer',
      hideInSearch: true,
    },
    {
      title: '生产厂家',
      dataIndex: 'marketingAuthorizationHolder',
      hideInSearch: true,
    },
    {
      title: '剂型',
      dataIndex: 'dosageForm',
      hideInSearch: true,
    },
    {
      title: '包装',
      dataIndex: 'package',
      hideInSearch: true,
    },
    {
      title: '批准文号',
      dataIndex: 'approvalNumber',
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
        headerTitle={'药品目录列表'}
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
            新增产品
          </Button>,
        ]}
        request={getMedicine}
        columns={columns}
      />
      <ModalForm
        title={'新增产品'}
        width="900px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        grid
        rowProps={{
          gutter: [16, 0],
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
        <ProFormText
          label="药品编码"
          name="drugCode"
          colProps={{
            span: 8,
          }}
        />
        <ProFormText
          label="药品名称"
          name="drugName"
          colProps={{
            span: 8,
          }}
        />

        <ProFormText
          label="药品通用名"
          name="alias"
          colProps={{
            span: 8,
          }}
        />

        <ProFormText
          label="规格"
          name="specification"
          colProps={{
            span: 8,
          }}
        />
        <ProFormText
          label="上市许可持有人"
          name="marketingAuthorizationHolder"
          colProps={{
            span: 8,
          }}
        />
        <ProFormText
          label="生产厂家"
          name="manufacturer"
          colProps={{
            span: 8,
          }}
        />

        <ProFormText
          label="剂型"
          name="dosageForm"
          colProps={{
            span: 8,
          }}
        />
        <ProFormText
          label="包装"
          name="package"
          colProps={{
            span: 8,
          }}
        />
        <ProFormText
          label="批准文号"
          name="approvalNumber"
          colProps={{
            span: 8,
          }}
        />

        <ProFormTextArea label="备注信息" name="remark" />
      </ModalForm>

      <ModalForm
        title={'编辑产品'}
        width="900px"
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
        grid
        rowProps={{
          gutter: [16, 0],
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
        <ProFormText
          label="药品编码"
          name="drugCode"
          disabled
          colProps={{
            span: 8,
          }}
        />
        <ProFormText
          label="药品名称"
          name="drugName"
          colProps={{
            span: 8,
          }}
        />

        <ProFormText
          label="药品通用名"
          name="alias"
          colProps={{
            span: 8,
          }}
        />

        <ProFormText
          label="规格"
          name="specification"
          colProps={{
            span: 8,
          }}
        />
        <ProFormText
          label="上市许可持有人"
          name="marketingAuthorizationHolder"
          colProps={{
            span: 8,
          }}
        />
        <ProFormText
          label="生产厂家"
          name="manufacturer"
          colProps={{
            span: 8,
          }}
        />

        <ProFormText
          label="剂型"
          name="dosageForm"
          colProps={{
            span: 8,
          }}
        />
        <ProFormText
          label="包装"
          name="package"
          colProps={{
            span: 8,
          }}
        />
        <ProFormText
          label="批准文号"
          name="approvalNumber"
          colProps={{
            span: 8,
          }}
        />

        <ProFormTextArea label="备注信息" name="remark" />
      </ModalForm>
      <ModalForm
        title={'删除产品'}
        open={removeModalOpen}
        width={"400px"}
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
        是不是删除 <a>{currentRow?.drugName} / {currentRow?.alias}</a> 这个产品?

      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
