import React, { memo } from 'react';
import { Typography } from '@/components/atoms';

export interface TableProps {
  columns: any[];
  data: any[];
}

export const Table: React.FC<TableProps> = memo(({
  columns,
  data
}) => {
  return (
    <div className="overflow-x-auto">
      <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {(columns || []).map((el : any) => (
                <th
                  key={el}
                  className="border-b border-blue-gray-50 py-3 px-5 text-left"
                >
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    {el}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(data || []).map((data, _idx) => (
              <tr key={_idx}>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">{_idx + 1}</p>
                </td>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">{data?.email}</p>
                </td>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">{data?.country || '-'}</p>
                </td>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">{data?.phone ?? '-'}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
