import React, { useState, useEffect } from 'react';
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
    { id: 1, name: 'Aceite', description: 'Aceite de girasol mezcla', price: 3000, image: 'https://res.cloudinary.com/dh9c97uci/image/upload/v1723178507/eb3p2qe3plaayb1tvd6w.png' },
    { id: 2, name: 'Galletitas Oreo x6', description: 'Galletitas Oreo x4u', price: 1500, image: 'https://res.cloudinary.com/dh9c97uci/image/upload/v1723178692/fgrpwdrierza8avhktfg.png' },
    { id: 3, name: 'Pack de bebidas Sprite Zero', description: 'Pack de 6 bebidas', price: 3260, image: 'https://res.cloudinary.com/dh9c97uci/image/upload/v1723178726/nx6h8gc7lsxmjznu5ohi.webp' },
    { 
      id: 4, 
      name: 'Arroz Integral', 
      description: 'Bolsa de 1kg de arroz integral', 
      price: 2500, 
      image: 'https://res.cloudinary.com/dh9c97uci/image/upload/v1723218569/nowjcw4tsydomgl0bliy.webp' 
    },
    { 
      id: 5, 
      name: 'Leche Descremada', 
      description: 'Caja de 1 litro de leche descremada', 
      price: 1800, 
      image: 'https://res.cloudinary.com/dh9c97uci/image/upload/v1723218624/n3ulouwesspo2ihdv8on.webp' 
    },
    { 
      id: 6, 
      name: 'Café en Grano', 
      description: 'Paquete de 500g de café en grano', 
      price: 4500, 
      image: 'https://res.cloudinary.com/dh9c97uci/image/upload/v1723218660/kbylxkil1femt0olzyqv.jpg' 
    }
  ];

  const [cart, setCart] = useState<ProductType[]>([]);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product: Omit<ProductType, 'quantity'>, quantity: number) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(p => p.id === product.id);
      if (existingProduct) {
        return prevCart.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };


  const handleOrder = async () => {
    if (cart.length === 0) {
      setNotification({ message: "El carrito está vacío", type: "error" });
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
      setNotification({ message: "Pedido enviado correctamente", type: "success" });
      setCart([]); // Limpiar el carrito después de enviar el pedido
    } catch (error) {
      console.error('Error al enviar el pedido:', error);
      setNotification({ message: "Hubo un error al enviar el pedido. Por favor, intenta de nuevo.", type: "error" });
    }
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000); // Desaparece después de 3 segundos

      return () => clearTimeout(timer); // Limpiar el timeout si se desmonta el componente
    }
  }, [notification]);


  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-light to-white flex flex-col">
      <Navbar cart={cart} cartOpen={cartOpen} toggleCart={toggleCart} handleOrder={handleOrder} />

      {notification && (
        <div className={`fixed top-16 left-1/2 transform -translate-x-1/2 p-4 rounded shadow-lg text-white ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {notification.message}
        </div>
      )}

      <div className="flex-grow container mx-auto p-4 pt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Product key={product.id} product={{ ...product, quantity: 1 }} onAdd={(product) => addToCart(product, product.quantity)} />
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
