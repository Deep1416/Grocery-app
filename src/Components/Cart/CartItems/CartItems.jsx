import React from "react";
import CartItemCard from "../CartItemCard/CartItemCard";
import { useSelector } from "react-redux";

const CartItems = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <div className="lg:space-y-10 space-y-5">
      {/* Title */}
      <h2 className="lg:text-2xl sm:text-xl text-lg sm:font-semibold font-bold ">
        Selected Items
      </h2>

      {/* Items Card list */}
      <div className="space-y-3">
        {cartItems.map((cartItem) => (
          <CartItemCard item={cartItem} key={cartItem.id} />
        ))}
      </div>
    </div>
  );
};

export default CartItems;
