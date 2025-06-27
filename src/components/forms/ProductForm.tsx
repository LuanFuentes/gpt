import { useState } from 'react';
import { Product } from '../../types';

interface Props {
  initial?: Product;
  onSubmit: (p: Product) => void;
}

export default function ProductForm({ initial, onSubmit }: Props) {
  const [product, setProduct] = useState<Product>(
    initial || { id: '', name: '', description: '', category: { id: '', name: '' }, price: 0, stock: 0, imageUrl: '' }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input name="name" value={product.name} onChange={handleChange} placeholder="Nombre" className="w-full border px-2 py-1" />
      <input name="price" type="number" value={product.price} onChange={handleChange} placeholder="Precio" className="w-full border px-2 py-1" />
      <button type="submit" className="bg-primary-500 text-white px-3 py-1 rounded">
        Guardar
      </button>
    </form>
  );
}
