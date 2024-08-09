import React from 'react';

interface NavbarProps {
  cart: ProductType[];
  cartOpen: boolean;
  toggleCart: () => void;
  handleOrder: () => void;
}

interface ProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

export const Navbar: React.FC<NavbarProps> = ({ cart, cartOpen, toggleCart, handleOrder }) => {
  // Sumar las cantidades de todos los productos en el carrito
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div>
      <nav className="bg-white shadow-lg fixed top-0 w-full z-50">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Unilever POC</h1>
          <button onClick={toggleCart} className="relative">
            <span className="text-lg font-semibold">🛒 Carrito ({totalItems})</span>
          </button>
        </div>
      </nav>
      {cartOpen && (
        <div className="fixed right-0 bottom-0 m-4 bg-white shadow-lg rounded-lg p-4 w-64">
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
            className={`mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-full text-center shadow-md ${cart.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-300'}`}
            disabled={cart.length === 0}
          >
            Pedir
          </button>
        </div>
      )}
    </div>
  );
};
