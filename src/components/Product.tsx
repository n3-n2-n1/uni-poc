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

  const increment = () => setQuantity(prevQuantity => prevQuantity + 1);
  const decrement = () => setQuantity(prevQuantity => Math.max(prevQuantity - 1, 0));

  const handleAdd = () => {
    if (quantity > 0) {
      onAdd({ ...product, quantity }); // Aquí pasas la cantidad seleccionada
      setQuantity(0);  // Opcional: Resetea la cantidad después de agregar al carrito
    }
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center shadow-lg">
      <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mb-4 rounded-md" />
      <h3 className="font-semibold text-lg mb-2 text-gray-800 text-center">{product.name}</h3>
      <p className="text-gray-600 mb-4 text-center">{product.description}</p>
      <p className="font-bold text-xl text-gray-800 mb-4">Precio: ${product.price.toFixed(2)}</p>
      <div className="flex items-center mb-6">
        <button onClick={decrement} className="bg-gray-300 px-3 py-1 rounded-lg text-lg">-</button>
        <span className="mx-3 text-lg">{quantity}</span>
        <button onClick={increment} className="bg-gray-300 px-3 py-1 rounded-lg text-lg">+</button>
      </div>
      <button 
        onClick={handleAdd} 
        className="bg-gold-500 text-white py-2 px-6 rounded-lg w-full hover:bg-gold-600 transition-colors duration-200 shadow-md"
        disabled={quantity === 0}
      >
        Agregar
      </button>
    </div>
  );
};

export default Product;
