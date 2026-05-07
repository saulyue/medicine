import {  getColumns } from '@/components/STable/colums/type';
import { getClients } from '@/pages/Clients/api';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { ActionType, ProTableProps } from '@ant-design/pro-table/es/typing';
import { Button, Modal } from 'antd';
import React from 'react';
import { FormInstance } from 'antd/lib';
import { BetaSchemaForm } from '@ant-design/pro-form';

function Stable(props) {
  const { columns } = props;
  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const createFormRef = React.useRef<FormInstance>();
  const tableRef = React.useRef<ActionType>();

  // 新增对话框
  function handleCreateDialog(open: boolean = true) {
    setCreateModalOpen(open);
    if(!open && createFormRef.current){
      createFormRef.current.resetFields();
    }
  }

  // 获取数据
  const fetchData = async() => {};
  // 修改对话框
  function handleModifyDialog() {}
  // 删除对话框
  function handleRemoveDialog() {}

  const _columns = getColumns({ columns, handleModifyDialog, handleRemoveDialog, fetchData });

  const request = (params) => {
    return new Promise((resolve) => {
      console.log(params);
      handleCreateDialog(false);
      resolve({
        data: [],
        success: true,
      });
    });
  };

  return (
    <>
      <ProTable
        rowKey="id"
        actionRef={tableRef}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => handleCreateDialog(true)}>
            <PlusOutlined /> 新增
          </Button>,
        ]}
        request={getClients}
        columns={_columns}
      />

      <Modal
        title={'新增客户'}
        width="1200px"
        open={createModalOpen}
        onOk={() => handleCreateDialog(false)}
        onCancel={() => handleCreateDialog(false)}
        footer={null}
      >
        {/*<ProTable*/}
        {/*  rowKey="id"*/}
        {/*  type="form"*/}
        {/*  formRef={createFormRef}*/}
        {/*  request={request}*/}
        {/*  columns={_columns}*/}
        {/*/>*/}
        <BetaSchemaForm
          formRef={createFormRef}
          rowProps={{
            gutter: [16, 16],
          }}
          colProps={{
            span: 8,
          }}
          grid={true}
          shouldUpdate={false}
          onFinish={request}
          columns={_columns}
        />
      </Modal>
    </>
  );
}
export default Stable;
