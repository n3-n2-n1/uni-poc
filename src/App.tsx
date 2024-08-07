import React, { useState } from 'react';
import Product from './components/Product';
import './App.css';

// Define the Product type
interface ProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

const App: React.FC = () => {
  const products: Omit<ProductType, 'quantity'>[] = [
    { id: 1, name: 'Aceite', description: 'Aceite de oliva extra virgen', price: 3000, image: '/images/aceite.jpg' },
    { id: 2, name: 'Galletitas Oreo x6', description: 'Galletitas integrales', price: 1500, image: '/images/galletitas.jpg' },
    { id: 3, name: 'Pack de bebidas Sprite Zero', description: 'Pack de 6 bebidas', price: 3260, image: '/images/bebidas.jpg' },
  ];

  const [cart, setCart] = useState<ProductType[]>([]);

  const addToCart = (product: ProductType) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(p => p.id === product.id);
      if (existingProduct) {
        return prevCart.map(p => 
          p.id === product.id ? { ...p, quantity: p.quantity + product.quantity } : p
        );
      } else {
        return [...prevCart, product];
      }
    });
  };

  const handleOrder = async () => {
    try {
      const response = await fetch('https://uni-back-iota.vercel.app/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
      });
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const data = await response.json();
      console.log('Pedido enviado:', data);
    } catch (error) {
      console.error('Error al enviar el pedido:', error);
    }
  };

  return (
    <div className="app container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Unilever POC</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map(product => (
          <Product key={product.id} product={{ ...product, quantity: 1 }} onAdd={addToCart} />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button onClick={handleOrder} className="order-button mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Pedir
        </button>
      </div>
    </div>
  );
};

export default App;
