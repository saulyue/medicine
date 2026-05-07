import {
  ModalForm, ProForm, ProFormDatePicker, ProFormDateRangePicker,
   ProFormDigit, ProFormMoney,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import React from 'react';
import {ThunderboltFilled} from "@ant-design/icons";

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.RuleListItem>;
};

// const UpdateForm: React.FC<UpdateFormProps> = (props) => {
//   return (
//     <ModalForm
//       title={'生成入库单'}
//       width="900px"
//       open={createModalOpen}
//       onOpenChange={handleModalOpen}
//       layout={'horizontal'}
//       grid
//       rowProps={{
//         gutter: [16, 0],
//       }}
//       request={async () => {
//         await waitTime(10);
//         return {
//           warehouseOrderNumber: 'RK20240626002',
//           storageDate: '2024-06-26',
//         };
//       }}
//       onFinish={async (value) => {
//         console.log('value', value);
//         const success = await handleAdd(value as API.RuleListItem);
//         if (success) {
//           handleModalOpen(false);
//           if (actionRef.current) {
//             actionRef.current.reload();
//           }
//         }
//       }}
//     >
//       <ProFormText
//         label="入库单号"
//         name="warehouseOrderNumber"
//         readonly
//         colProps={{
//           span: 6,
//         }}
//       />
//       <ProFormDatePicker
//         label="入库日期"
//         name={'storageDate'}
//         width="md"
//         colProps={{
//           span: 6,
//         }}
//       />
//       <ProFormText
//         label="供货商"
//         name="supplierName"
//         tooltip={{
//           icon: <ThunderboltFilled style={{ color: '#faad14' }} />,
//           title: '快捷输入',
//         }}
//         colProps={{
//           span: 12,
//         }}
//       />
//
//       <ProFormText
//         label="联系人员"
//         name="contactPerson"
//         colProps={{
//           span: 6,
//         }}
//       />
//       <ProFormText
//         label="联系电话"
//         name="contactPhone"
//         colProps={{
//           span: 6,
//         }}
//       />
//       <ProFormSelect
//         colProps={{
//           span: 6,
//         }}
//         label="经办人员"
//         name="processor"
//         options={['合格222']}
//       />
//
//       <ProForm.Group
//         title={'验收入库明细'}
//         titleStyle={{ marginBottom: 12 }}
//         rowProps={{
//           gutter: [16, 0],
//         }}
//       >
//         <ProFormText
//           label="商品名"
//           name="drugName"
//           tooltip={{
//             icon: <ThunderboltFilled style={{ color: '#faad14' }} />,
//             title: '快捷输入',
//           }}
//           colProps={{
//             span: 6,
//           }}
//         />
//         <ProFormText
//           label="药品编码"
//           disabled
//           name="drugCode"
//           colProps={{
//             span: 6,
//           }}
//         />
//
//         <ProFormDateRangePicker
//           label="有效期至"
//           width="lg"
//           name={['contract', 'createTime']}
//           colProps={{
//             span: 12,
//           }}
//         />
//
//         <ProFormDigit
//           label="到货数量"
//           name="balancel"
//           colProps={{
//             span: 6,
//           }}
//         />
//         <ProFormMoney
//           label="进货价格"
//           name="balancez"
//           colProps={{
//             span: 6,
//           }}
//         />
//         <ProFormMoney
//           label="小计金额"
//           disabled
//           name="balancea"
//           colProps={{
//             span: 6,
//           }}
//         />
//
//       </ProForm.Group>
//
//
//
//       <ProFormRadio.Group
//         colProps={{
//           span: 12,
//         }}
//         label="验收结论"
//         name="acceptanceConclusion"
//         options={['合格', '不合格']}
//       />
//       <ProFormTextArea label="备注信息" name="remark" />
//     </ModalForm>
//   );
// };
const UpdateForm=()=>{}
export default UpdateForm;
