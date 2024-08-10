import { Button, useMediaQuery } from "@mui/material";
import { useContext } from "react";
import { checkoutContext } from "../Cart"; // Adjust path as per your file structure
import { useSelector } from "react-redux";

const OrderSummary = () => {
  const [isProceedToCheckout, setIsProceedToCheckout] = useContext(checkoutContext); 

  // Media Query
  const isMediumScreen = useMediaQuery("(max-width:1024px)");

  // Get Cart Items from Redux state
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <div className="flex justify-center md:pt-16 col md:col-span-4 lg:col-span-1">
      <div
        className={`lg:space-y-4 sticky top-0 bottom-0 w-full max-w-[25rem] space-y-3`}
      >
        {/* Title */}
        <h3 className="lg:text-xl text-lg sm:font-semibold font-bold tracking-wide">
          Order Summary
        </h3>

        {/* Total Bill */}
        <table className="table-auto h-28 text-sm w-full">
          <tbody>
            {/* Subtotal */}
            <tr className="font-medium lg:text-gray-800 text-gray-600">
              <td>Subtotal</td>
              <td>₹ {subtotal.toFixed(2)} </td>
            </tr>
            {/* Delivery Charge */}
            <tr className="font-medium text-sm lg:text-gray-800 text-gray-600">
              <td>Delivery charge</td>
              <td>₹ 5.99 </td>
            </tr>
            {/* Total */}
            <tr className="lg:font-medium font-semibold lg:text-lg">
              <td>Total</td>
              <td style={{ color: "green" }}>
                ₹{(subtotal + 5.99).toFixed(2)}{" "}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Proceed to checkout Button */}
        <Button
          fullWidth
          onClick={() => setIsProceedToCheckout(!isProceedToCheckout)}
          sx={{
            textTransform: "capitalize",
            transition: "opacity 0.3s ease-in-out",
            opacity: isProceedToCheckout ? 0 : 1,
          }}
          variant="contained"
          size={isMediumScreen ? "small" : "medium"}
          color="success"
        >
          Proceed to checkout
        </Button>
      </div>
    </div>
  );
};


export default OrderSummary;
