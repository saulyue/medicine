import { getInventoryDrug } from '@/pages/Inventory/api';
import { getStaffDic } from '@/pages/Staff/api';
import { addWarehousing, getWarehousing, updateWarehousing } from '@/pages/Storage/api';
import { getSupplierDic } from '@/pages/Supplier/api';
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  CheckOutlined,
  MinusOutlined,
  PlusOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  ThunderboltFilled,
} from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormMoney,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';

const handleAddInfo = async (fields: any) => {
  const hide = message.loading('正在添加');
  let data = {};
  try {
    if (fields.id) {
      data = await updateWarehousing({ ...fields }, fields.id);
    } else {
      data = await addWarehousing({ ...fields });
    }
    hide();
    message.success('Added successfully');
    return data;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

const handleAdd = async (fields: any, ref: any) => {
  console.log(fields);
};

function mutationData(item) {
  const medicine = item.medicine;
  return {
    ...item,
    drugCode: [
      {
        value: item.drugCode,
        alias: medicine.alias,
        manufacturer: medicine.manufacturer,
        specification: medicine.specification,
        dosageForm: medicine.dosageForm,
        package: medicine.package,
        approvalNumber: medicine.approvalNumber,
      },
    ],
  };
}

const UpdateForm = (props: any) => {
  const {
    formRef,
    actionRef,
    actionRef2,
    open,
    handleModalOpen,
    warehouseOrderNumber,
    initialValues,
    title,
    onFinish,
  } = props;
  const formRef2 = useRef(null);
  const [index, setIndex] = useState(0);
  const [total, setTotal] = useState(1);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(0);
  return (
    <ModalForm
      title={title}
      width="1000px"
      formRef={formRef}
      open={open}
      layout={'horizontal'}
      grid
      rowProps={{
        gutter: 24,
      }}
      initialValues={
        initialValues
          ? initialValues
          : {
              warehouseOrderNumber,
              storageDate: dayjs().format('YYYY-MM-DD'),
            }
      }
      modalProps={{
        destroyOnClose: true,
      }}
      onOpenChange={handleModalOpen}
      onFinish={async (value) => {
        if(status===0){
          const success = await onFinish(value);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }else{
          message.error('请先保存单据');
        }

      }}
    >
      <ProForm.Group
        rowProps={{
          gutter: 16,
        }}
      >
        <ProFormText label="入库单号" name="warehouseOrderNumber" disabled colProps={{ span: 8 }} />
        <ProFormDatePicker
          label="入库日期"
          name={'storageDate'}
          colProps={{ span: 8 }}
          width={'100%'}
        />
        <ProFormSelect.SearchSelect
          label="供货商"
          name="supplierName"
          tooltip={{
            icon: <ThunderboltFilled style={{ color: '#faad14' }} />,
            title: '快捷输入',
          }}
          debounceTime={100}
          request={getSupplierDic}
          fieldProps={{
            popupMatchSelectWidth: 240,
            maxCount: 1,
            onChange: (value) => {
              if (value.length > 0) {
                formRef?.current.setFieldsValue({
                  contactPerson: value[0].contactPerson,
                  contactPhone: value[0].contactNumber,
                });
              }
            },
          }}
          colProps={{ span: 8 }}
        />
      </ProForm.Group>

      <ProForm.Group
        rowProps={{
          gutter: 16,
        }}
      >
        <ProFormText label="联系人员" name="contactPerson" colProps={{ span: 8 }} />
        <ProFormText label="联系电话" name="contactPhone" colProps={{ span: 8 }} />
        <ProFormSelect
          label="验收结论"
          name="acceptanceConclusion"
          options={['合格', '不合格']}
          colProps={{ span: 8 }}
        />
      </ProForm.Group>

      <ProForm
        onValuesChange={(changeValues) => {
          setStatus(1);
          if (['inboundQuantity', 'purchasePrice'].includes(Object.keys(changeValues)[0])) {
            const inboundQuantity = formRef2?.current?.getFieldValue('inboundQuantity') || 0;
            const purchasePrice = formRef2?.current?.getFieldValue('purchasePrice') || 0;
            formRef2.current.setFieldsValue({
              lumpSum: inboundQuantity * purchasePrice,
            });
          }
        }}
        grid
        layout={'horizontal'}
        submitter={false}
        style={{
          border: '1px solid #d9d9d9',
          borderBottom: 'none',
          marginBottom: 24,
          padding: '0 16px 0',
        }}
        rowProps={{
          gutter: 16,
        }}
        formRef={formRef2}
        request={async () => {
          const data = await getWarehousing({ warehouseOrderNumber });
          setTotal(data.total || 1);
          setIndex(0);
          setData(data.data.map((item) => mutationData(item)));
          return mutationData(data.data[0]);
        }}
        onFinish={async (values) => {
          const { drugCode, ...res } = values;
          console.log({ ...res, drugCode: drugCode[0].value });
          const success = await handleAddInfo({
            ...res,
            drugCode: drugCode[0].value,
            warehouseOrderNumber,
          });
          const newData = [...data];
          newData[index] = values;
          console.log('newData', newData);
          setData(newData);
          formRef2.current.setFieldsValue({
            id: success.id,
          });
          if (actionRef?.current) {
            actionRef?.current.reload();
          }
          if (actionRef2?.current) {
            actionRef2?.current.reload();
          }
          return success;
        }}
      >
        <ProForm.Group
          title={`验收入库明细(${total}) - ${index + 1}`}
          titleStyle={{
            margin: '0 -16px 16px',
            background: 'rgba(0, 0, 0, 0.02)',
            padding: '6px 12px',
            borderBottom: '1px solid #d9d9d9',
          }}
          rowProps={{
            gutter: 16,
          }}
        >
          <ProFormText hidden name="id" />
          <ProFormSelect.SearchSelect
            label="药品码"
            name="drugCode"
            tooltip={{
              icon: <ThunderboltFilled style={{ color: '#faad14' }} />,
              title: '快捷输入',
            }}
            debounceTime={100}
            request={(params) => getInventoryDrug({ drugCode: params.keyWords })}
            fieldProps={{
              popupMatchSelectWidth: 240,
              maxCount: 1,
              optionItemRender: (item) => {
                return item.label + '-' + item.name;
              },
            }}
            colProps={{ span: 8 }}
          />
          <ProFormText
            label="药品名称"
            disabled
            name={['drugCode', '0', 'alias']}
            colProps={{ span: 8 }}
          />
          <ProFormText
            label="生产厂家"
            disabled
            name={['drugCode', '0', 'manufacturer']}
            colProps={{ span: 8 }}
          />
          <ProFormText
            label="规格型号"
            disabled
            name={['drugCode', '0', 'specification']}
            colProps={{ span: 6 }}
          />
          <ProFormText
            label="药品剂型"
            disabled
            name={['drugCode', '0', 'dosageForm']}
            colProps={{ span: 6 }}
          />

          <ProFormText
            label="批准文号"
            disabled
            name={['drugCode', '0', 'approvalNumber']}
            colProps={{ span: 6 }}
          />
          <ProFormText
            label="药品包装"
            disabled
            name={['drugCode', '0', 'package']}
            colProps={{ span: 6 }}
          />

          <ProFormDatePicker
            label="生产日期"
            name="productionDate"
            colProps={{ span: 6 }}
            width={'md'}
          />
          <ProFormDatePicker
            label="有效期至"
            name="validityPeriod"
            colProps={{ span: 6 }}
            width={'md'}
          />
          <ProFormDigit label="入库数量" name="inboundQuantity" colProps={{ span: 6 }} />
          <ProFormMoney label="进货价格" name="purchasePrice" colProps={{ span: 6 }} />
          <ProFormMoney label="小计金额" disabled name="lumpSum" colProps={{ span: 6 }} />
          <Button.Group
            style={{
              width: 'calc(100% + 18px)',
              display: 'flex',
              justifyContent: 'center',
              margin: '0 -9px',
            }}
          >
            <Button
              style={{ flex: 1, borderRadius: 0 }}
              disabled={status === 0}
              onClick={async () => {
                setStatus(0);
                formRef2.current?.submit();
              }}
            >
              <CheckOutlined />
              保存
            </Button>
            <Button
              style={{ flex: 1, borderRadius: 0 }}
              disabled={status === 1}
              onClick={async () => {
                setStatus(1);
                setIndex(total);
                setData([...data, {}]);
                setTotal(total + 1);
                formRef2.current?.setFieldsValue({
                  drugCode: null,
                  productionDate: null,
                  validityPeriod: null,
                  inboundQuantity: null,
                  purchasePrice: null,
                  lumpSum: null,
                  id: null,
                });
                console.log(formRef2.current);
              }}
            >
              <PlusOutlined />
              添加
            </Button>
            <Button style={{ flex: 1 }} disabled={status === 1}>
              <MinusOutlined />
              删除
            </Button>
            <Button
              style={{ flex: 1 }}
              disabled={index === 0||status === 1}
              onClick={async () => {
                formRef2.current?.setFieldsValue({
                  ...data[0],
                });
                setIndex(0);
              }}
            >
              <StepBackwardOutlined />
            </Button>
            <Button
              style={{ flex: 1 }}
              disabled={index === 0||status === 1}
              onClick={async () => {
                formRef2.current?.setFieldsValue({
                  ...data[index - 1],
                });
                setIndex(index - 1);
              }}
            >
              <CaretLeftOutlined />
            </Button>
            <Button
              style={{ flex: 1 }}
              disabled={index === total - 1 || total === 0||status === 1}
              onClick={async () => {
                formRef2.current?.setFieldsValue({
                  ...data[index + 1],
                });
                setIndex(index + 1);
              }}
            >
              <CaretRightOutlined />
            </Button>
            <Button
              style={{ flex: 1, borderRadius: 0 }}
              disabled={index === total - 1 || total === 0||status === 1}
              onClick={async () => {
                formRef2.current?.setFieldsValue({
                  ...data[total - 1],
                });
                setIndex(total - 1);
              }}
            >
              <StepForwardOutlined />
            </Button>
          </Button.Group>
        </ProForm.Group>
      </ProForm>

      <ProForm.Group
        rowProps={{
          gutter: 16,
        }}
      >
        <ProFormMoney label="应付金额" name="amountsPayable" disabled colProps={{ span: 6 }} />
        <ProFormMoney label="付款金额" name="theAmountActuallyPaid" colProps={{ span: 6 }} />
        <ProFormMoney label="欠款金额" name="balance" disabled colProps={{ span: 6 }} />
        <ProFormSelect
          label="经办人员"
          name="processor"
          request={getStaffDic}
          debounceTime={100}
          colProps={{ span: 6 }}
        />
      </ProForm.Group>

      <ProFormTextArea label="备注信息" name="remark" />
    </ModalForm>
  );
};
export default UpdateForm;
