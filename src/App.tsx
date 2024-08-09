import React, { useState } from 'react';
import Product from './components/Product';
import './App.css';
import { Navbar } from './components/Navbar';

// Define el tipo de Producto
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
    { id: 1, name: 'Aceite', description: 'Aceite de oliva extra virgen', price: 3000, image: 'https://res.cloudinary.com/dh9c97uci/image/upload/v1723178507/eb3p2qe3plaayb1tvd6w.png' },
    { id: 2, name: 'Galletitas Oreo x6', description: 'Galletitas Integrales', price: 1500, image: 'https://res.cloudinary.com/dh9c97uci/image/upload/v1723178692/fgrpwdrierza8avhktfg.png' },
    { id: 3, name: 'Pack de bebidas Sprite Zero', description: 'Pack de 6 bebidas', price: 3260, image: 'https://res.cloudinary.com/dh9c97uci/image/upload/v1723178726/nx6h8gc7lsxmjznu5ohi.webp' },
  ];

  const [cart, setCart] = useState<ProductType[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product: ProductType) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(p => p.id === product.id);
      if (existingProduct) {
        return prevCart.map(p => 
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleOrder = async () => {
    if (cart.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    try {
      const response = await fetch('https://uni-back-iota.vercel.app/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }), // Envío del carrito en el cuerpo de la solicitud
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const data = await response.json();
      console.log('Pedido enviado:', data);
      alert('Pedido enviado correctamente');
      setCart([]); // Limpiar el carrito después de enviar el pedido
    } catch (error) {
      console.error('Error al enviar el pedido:', error);
      alert('Hubo un error al enviar el pedido. Por favor, intenta de nuevo.');
    }
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-beige-light via-beige-dark to-white flex flex-col">
      <Navbar cart={cart} cartOpen={cartOpen} toggleCart={toggleCart} handleOrder={handleOrder} />
      <div className="flex-grow container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Product key={product.id} product={{ ...product, quantity: 1 }} onAdd={addToCart} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={handleOrder}
            className={`w-full sm:w-auto mt-4 bg-gold-500 text-white py-2 px-12 rounded-full text-center shadow-md ${cart.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gold-600'}`}
            disabled={cart.length === 0}
          >
            Pedir
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
