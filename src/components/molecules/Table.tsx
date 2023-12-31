import React, { memo, useMemo, useRef, useState } from 'react';
import { Button, Icon, Typography } from '@/components/atoms';
import { Input } from '@/components/molecules';
import { convertToExcel } from '@/utils';

export interface IColumnType {
  accessor: string;
  Header: string;
  Cell?: (cell:any) => void;
}

export interface TableProps {
  columns: any[];
  data: any[] | undefined | null;
  isConvertExcel?: boolean;
}

export const Table: React.FC<TableProps> = memo(({
  columns,
  data,
  isConvertExcel = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const tableRef = useRef(null);
  
  const getNestedValue = (obj:any, accessor:string, idx:number) => {
    const keys = accessor.split('.');
    
    return keys.reduce((result, key) => {
      if (key === 'no') {
        return idx + 1;
      }
      return result[key] || '-';
    }, obj);
  };

  const filteredData = useMemo(() => {
    if(data) {
      return data.filter((row) =>
        columns.some((column) =>
          getNestedValue(row, column.accessor, 0)
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      );
    }
    return [];
   
  }, [columns, data, searchTerm]);

  const columnsExcel = useMemo(() => columns.map(item => item.accessor).filter(x => x !== 'no') ?? [], [columns]);
  
  const bodyExcel = filteredData.map(obj => {
    const newObj:any = {};
    for (const prop of columnsExcel) {
      if (obj.hasOwnProperty(prop)) {
        newObj[prop] = obj[prop];
      }
    }
    return newObj;
  });

  return (
    <div className="overflow-x-auto">
      <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
        <div className="flex justify-end items-center my-5 space-x-4">
          {isConvertExcel && <Button onClick={() => convertToExcel(columnsExcel, bodyExcel)} variant="success" className="rounded"> <Icon name="file-excel"/> </Button>}
          <Input label="Search" className="max-w-[210px]" onChange={setSearchTerm}/>
        </div>
        
        <table className="w-full min-w-[640px] table-auto" ref={tableRef}>
          <thead>
            <tr>
              {(columns || []).map((el, _idx) => (
                <th
                  key={_idx}
                  className="border-b border-blue-gray-50 py-3 px-5 text-left"
                >
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    {el.Header}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(filteredData || []).map((row, _idx) => (
              <tr key={_idx}>
                {(columns || []).map((column, _idxColumn) => (
                  <td key={_idxColumn} className="py-3 px-5 border-b border-blue-gray-50">
                    <div className="block antialiased font-sans text-xs/[13px] text-blue-gray-600">
                      {column.Cell ? column.Cell(row) : getNestedValue(row, column?.accessor, _idx)}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
