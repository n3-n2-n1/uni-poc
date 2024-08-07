import React, { useState } from 'react';

interface ProductProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
  };
  onAdd: (product: { id: number; name: string; description: string; price: number; quantity: number; image: string }) => void;
}

const Product: React.FC<ProductProps> = ({ product, onAdd }) => {
  const [quantity, setQuantity] = useState(0);

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 0 ? quantity - 1 : 0);

  const handleAdd = () => {
    if (quantity > 0) {
      onAdd({ ...product, quantity });
    }
  };

  return (
    <div className="product border rounded p-4 flex flex-col items-center">
      <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mb-4" />
      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-gray-700">{product.description}</p>
      <p className="font-bold text-lg mb-4">Precio: ${product.price}</p>
      <div className="flex items-center mb-4">
        <button onClick={decrement} className="bg-gray-300 px-2 py-1 rounded">-</button>
        <span className="mx-2">{quantity}</span>
        <button onClick={increment} className="bg-gray-300 px-2 py-1 rounded">+</button>
      </div>
      <button onClick={handleAdd} className="bg-green-500 text-white py-1 px-4 rounded">Agregar</button>
    </div>
  );
};

export default Product;
