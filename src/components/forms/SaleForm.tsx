import { useState } from 'react';
import { SaleFormData, SaleStatus } from '../../types';

interface Props {
  onSubmit: (form: SaleFormData) => void;
}

export default function SaleForm({ onSubmit }: Props) {
  const [customerId, setCustomerId] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ customerId, status: SaleStatus.PENDING, items: [{ productId, quantity }] });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        placeholder="Cliente ID"
        className="w-full border px-2 py-1"
      />
      <input
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Producto ID"
        className="w-full border px-2 py-1"
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(+e.target.value)}
        className="w-full border px-2 py-1"
      />
      <button type="submit" className="bg-primary-500 text-white px-3 py-1 rounded">
        Guardar
      </button>
    </form>
  );
}
