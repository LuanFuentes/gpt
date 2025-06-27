import { useEffect, useState } from 'react';
import { api } from '../services/mockApi';
import { useAppContext } from '../hooks/useAppContext';
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import SaleForm from '../components/forms/SaleForm';
import Pagination from '../components/ui/Pagination';

export default function Sales() {
  const { tenant } = useAppContext();
  const [sales, setSales] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (tenant) api.getDashboardData(tenant.id).then(() => setSales([]));
  }, [tenant]);

  return (
    <div>
      <button className="bg-primary-500 text-white px-3 py-1 rounded mb-2" onClick={() => setShowForm(true)}>
        Nueva Venta
      </button>
      <Table headers={["ID", "Total", "Estado"]}>
        {sales.map((sale) => (
          <tr key={sale.id} className="border-t">
            <td className="px-2 py-1">{sale.id}</td>
            <td className="px-2 py-1">{sale.total}</td>
            <td className="px-2 py-1">{sale.status}</td>
          </tr>
        ))}
      </Table>
      <Pagination page={page} totalPages={1} onChange={setPage} />
      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <SaleForm onSubmit={(data) => tenant && api.createSale(tenant.id, data)} />
      </Modal>
    </div>
  );
}
