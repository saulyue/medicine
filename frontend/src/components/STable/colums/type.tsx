import { type ProColumns, ProFormUploadDragger } from '@ant-design/pro-components';
import { message } from 'antd';
import { ProColumnType } from '@ant-design/pro-table/es/typing';

interface Column extends ProColumnType{
  title: string;
  valueType?:
    | 'string'
    | 'number'
    | 'boolean'
    | 'date'
    | 'time'
    | 'dateTime'
    | 'enum'
    | 'option'
    | 'select'
    | 'update'
    | 'textarea'
    | 'upload';
  formType?: 'input' | 'select' | 'update' | 'date' | 'time' | 'dateTime';
  width?: number | string;
  readOnly?: boolean;
  options?: any;
  render?: any;
  request?: (e: { [key: string]: string }) => void;
  dependencies?: string[];
  fieldProps?: { options: [label: string, value: string][] };
  hideInSearch?: boolean;
}

export interface ColumnsType {
  [key: string]: Column;
}

interface GetColumnsType {
  columns: ColumnsType;
  handleModifyDialog?: (row: any, index: number) => void;
  handleRemoveDialog?: (row: any, index: number) => void;
  fetchData?: () => void;
}

export interface TableColumn extends ProColumnType {
  request: (e: Record<string, string>) => void;
  hideInSearch: boolean;
  dataIndex: string;
  valueType: Column['valueType'];
  width: number | string;
  fieldProps?: Column['fieldProps'];
  title: string;
  dependencies?: string[];
  renderFormItem?: (text: any, { defaultRender, ...rest }, form: any) => void;
}

export function getColumns(props: GetColumnsType): TableColumn[] {
  const { columns } = props;
  return Object.keys(columns).map((key) => {
    const obj = {
      ...columns[key],
      dataIndex: key,
      request: columns[key].request,
    };
    if (columns[key].valueType === 'upload') {
      // @ts-ignore
      obj.renderFormItem = () => {
        return <ProFormUploadDragger name={key}   action="https://www.mocky.io/v2/5cc8019d300000980a055e76"  onChange={(info) => {
          if (info.file.status === 'done') {
            message.success(`${info.file.name} 文件上传成功.`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败.`);
          }
        }}>
        </ProFormUploadDragger>;
      };
    }
    return obj;
  });
}
