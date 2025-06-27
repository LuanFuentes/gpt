import { useEffect, useState } from 'react';
import { api } from '../services/mockApi';
import { useAppContext } from '../hooks/useAppContext';
import Card from '../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { tenant } = useAppContext();
  const [data, setData] = useState<{ salesToday: number; monthlySales: { month: string; total: number }[] }>();

  useEffect(() => {
    if (tenant) api.getDashboardData(tenant.id).then(setData);
  }, [tenant]);

  if (!data) return null;
  return (
    <div className="space-y-4">
      <Card>Ventas hoy: {data.salesToday}</Card>
      <Card>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.monthlySales}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
