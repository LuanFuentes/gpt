import { ReactNode } from 'react';

interface Props {
  headers: string[];
  children: ReactNode;
}

export default function Table({ headers, children }: Props) {
  return (
    <table className="min-w-full border text-sm bg-white">
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h} className="border px-2 py-1 text-left bg-gray-100">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
