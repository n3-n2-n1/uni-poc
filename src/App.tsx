import React, { useState, useEffect } from 'react';
import Product from './components/Product';
import './App.css';
import { Navbar } from './components/Navbar';
import axios from 'axios';

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
  const [products, setProducts] = useState<Omit<ProductType, 'quantity'>[]>([]);
  const [cart, setCart] = useState<ProductType[]>([]);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  // Fetch products from a Shopify collection
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://uni-poc.vercel.app/api/shopify/products');
        const fetchedProducts = response.data.products.map((product: any) => ({
          id: product.id,
          name: product.title,
          description: product.body_html,
          price: parseFloat(product.variants[0].price),
          image: product.image.src,
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

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
            className={`w-full sm:w-auto mt-4 bg-blue-500 text-white py-2 px-12 rounded-full text-center shadow-md ${cart.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-300'}`}
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
