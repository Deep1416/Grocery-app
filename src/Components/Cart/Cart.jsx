import { useNavigate } from "react-router-dom";
import EmptyCart from "./EmptyCart/EmptyCart";
import { Container, Fade } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";
import OrderSummary from "./OrderSummary/OrderSummary";
import CartItems from "./CartItems/CartItems";
import { groceryContext } from "../Layout/Layout";
import DeliveryForm from "./DeliveryForm/DeliveryForm";
import { useSelector } from "react-redux";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/Firebasestore";
export const checkoutContext = createContext();
const Cart = () => {
  // Scrolling Bug Fixed
  const [isProceedToCheckout, setIsProceedToCheckout] = useState(false);
  window.scroll({ top: 0 });
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);
  
//   const getData = async () => {
//     const docRef = doc(db, "users");
//     const docSnap = await getDocs(docRef);
//     console.log(docSnap + " log");
//     // if (docSnap.exists()) {
//     //   console.log("Document data:", docSnap.data());
//     // } else {
//     //   // docSnap.data() will be undefined in this case
//     //   console.log("No such document!");
//     // }

//   };


//   getData();
  // const getData = async () => {
  //   try {
  //     const docRef = collection(db, "users"); // Replace "userId" with the actual user ID or document ID
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       console.log("Document data:", docSnap.data());
  //     } else {
  //       console.log("No such document!");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching document:", error);
  //   }
  // };
  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <checkoutContext.Provider
      value={[isProceedToCheckout, setIsProceedToCheckout]}
    >
      <section
        className={`${
          cartItems.length > 0 ? "min-h-screen " : "h-screen "
        }pt-20 pb-10`}
      >
        {cartItems.length > 0 ? (
          <Container
            sx={{ display: "flex", justifyContent: "center", height: "100%" }}
          >
            <section className="grid lg:gap-x-0 gap-x-5 gap-y-8 w-full xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-12 ">
              <div className="col xl:col-span-2 lg:col-span-1 md:col-span-8">
                {!isProceedToCheckout ? <CartItems /> : <DeliveryForm />}
              </div>
              <OrderSummary />
            </section>
          </Container>
        ) : (
          <EmptyCart />
        )}
      </section>
    </checkoutContext.Provider>
  );
};

export default Cart;
