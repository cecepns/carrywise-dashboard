import React, { memo } from 'react';
import { Typography } from '@/components/atoms';

export interface TableProps {
  columns: any[];
  data: any[] | undefined | null;
}

export const Table: React.FC<TableProps> = memo(({
  columns,
  data
}) => {
  
  const getNestedValue = (obj:any, accessor:string, idx:number) => {
    const keys = accessor.split('.');
    return keys.reduce((result, key) => {
      if (key === 'no') {
        return idx + 1;
      }
      return result ? result[key] : undefined;
    }, obj);
  };
  
  return (
    <div className="overflow-x-auto">
      <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
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
            {(data || []).map((row, _idx) => (
              <tr key={_idx}>
                {(columns || []).map((column, _idxColumn) => (
                  <td key={_idxColumn} className="py-3 px-5 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-xs/[13px] text-blue-gray-600">
                      {column.Cell ? column.Cell({ cell:row }) : getNestedValue(row, column.accessor, _idx)}
                    </p>
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
