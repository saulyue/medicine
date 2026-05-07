import Stable from '@/components/STable';
import { ColumnsType } from '@/components/STable/colums/type';

function myFunction() {
  const columns: ColumnsType = {
    统一编号: {
      title: '统一编号',
    },
    资产名称: {
      title: '资产名称',

    },
    资产类型: {
      title: '资产类型',
      valueType: 'select',
    },
    资产类别: {
      title: '资产类别',
      valueType: 'select',
    },
    规格型号: {
      title: '规格型号',
    },
    所属单位: {
      title: '所属单位',
      valueType: 'select',
    },
    生产厂家: {
      title: '生产厂家',
    },
    使用部门: {
      title: '使用部门',
      valueType: 'select',
    },
    序列号: {
      title: '序列号',
    },
    关联设备: {
      title: '关联设备',
      valueType: 'select',
    },
    证书编号: {
      title: '证书编号',
    },
    管理状态: {
      title: '管理状态',
      valueType: 'select',
    },
    使用人: {
      title: '使用人',
      valueType: 'select',
    },
    采购日期: {
      title: '采购日期',
      valueType: 'date',
    },
    采购单价: {
      title: '采购单价',
    },
    货币单位: {
      title: '货币单位',
      valueType: 'select',
    },
    计量单位: {
      title: '计量单位',
      valueType: 'select',
    },
    保修期: {
      title: '保修期',
    },
    使用人: {
      title: '使用人',
      valueType: 'select',
    },
    截止日期: {
      title: '截止日期',
      valueType: 'date',
    },
    ABC: {
      title: 'ABC',
      valueType: 'select',
    },
    安装地点: {
      title: '安装地点',
      valueType: 'select',
    },
    耐用年限: {
      title: '耐用年限',
    },
    预计报废: {
      title: '预计报废',
      valueType: 'date',
    },
    select: {
      title: '责任人',
      valueType: 'select',
    },
    date: {
      title: '计量日期',
      valueType: 'date',
    },
    计量周期: {
      title: '计量周期',
    },
    有效日期: {
      title: '有效日期',
      valueType: 'date',
    },
    登记人: {
      title: '登记人',
      valueType: 'select',
    },
    登记状态: {
      title: '登记状态',
      valueType: 'select',
    },
    报废残值: {
      title: '报废残值',
    },
    报废日期: {
      title: '报废日期',
      valueType: 'date',
    },
    处置人: {
      title: '处置人',
      valueType: 'select',
    },
    处置状态: {
      title: '处置状态',
      valueType: 'select',
    },
    备注信息: {
      title: '备注信息',
      valueType: 'textarea',
    },
    上传附件: {
      title: '上传附件',
      valueType: 'upload',
      hideInSearch: true,
      hideInTable: true,
    },
    id2: {
      title: '资产类别',
      valueType: 'select',
      dependencies: ['id11'],
      request: async (params: { [key: string]: string }) => {
        console.log(params);
        return [
          { label: params.id11, value: 'all' },
          { label: '未解决', value: 'open' },
          { label: '已解决', value: 'closed' },
          { label: '解决中', value: 'processing' },
        ];
      },
    },
  };
  return <Stable columns={columns} />;
}

export default myFunction;
