import React from 'react';

// Define las props que el componente Navbar va a recibir
interface NavbarProps {
  cart: ProductType[];
  cartOpen: boolean;
  toggleCart: () => void;
  handleOrder: () => void;
}

// Define el tipo de Producto
interface ProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

export const Navbar: React.FC<NavbarProps> = ({ cart, cartOpen, toggleCart, handleOrder }) => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Unilever - NTT Data | POC</h1>
        <button onClick={toggleCart} className="relative">
          <span className="text-lg font-semibold">🛒 Carrito ({cart.length})</span>
          {cartOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Tu Carrito</h2>
              {cart.length > 0 ? (
                <ul>
                  {cart.map(item => (
                    <li key={item.id} className="flex justify-between items-center mb-2">
                      <div>
                        <span>{item.name}</span> x {item.quantity}
                      </div>
                      <span>${item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">El carrito está vacío</p>
              )}
              <button
                onClick={handleOrder}
                className={`mt-4 w-full bg-gold-500 text-white py-2 px-4 rounded-full text-center shadow-md ${cart.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gold-600'}`}
                disabled={cart.length === 0}
              >
                Pedir
              </button>
            </div>
          )}
        </button>
      </div>
    </nav>
  );
}
