import { useEffect, useState } from 'react';
import { api } from '../services/mockApi';
import { useAppContext } from '../hooks/useAppContext';
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import ProductForm from '../components/forms/ProductForm';
import Pagination from '../components/ui/Pagination';
import { Product } from '../types';

export default function Products() {
  const { tenant } = useAppContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (tenant) api.getProducts(tenant.id).then(setProducts);
  }, [tenant]);

  const handleCreate = (p: Product) => {
    if (tenant) api.createCustomer(tenant.id, p as any); // placeholder
  };

  return (
    <div>
      <button className="bg-primary-500 text-white px-3 py-1 rounded mb-2" onClick={() => setShowForm(true)}>
        Nuevo Producto
      </button>
      <Table headers={["ID", "Nombre", "Precio"]}>
        {products.map((product) => (
          <tr key={product.id} className="border-t">
            <td className="px-2 py-1">{product.id}</td>
            <td className="px-2 py-1">{product.name}</td>
            <td className="px-2 py-1">{product.price}</td>
          </tr>
        ))}
      </Table>
      <Pagination page={page} totalPages={1} onChange={setPage} />
      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <ProductForm onSubmit={handleCreate} />
      </Modal>
    </div>
  );
}
