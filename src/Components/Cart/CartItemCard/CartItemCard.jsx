import { Button, Fade, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add, Remove } from "@mui/icons-material";
import { useEffect, useState } from "react";

import PopUpDialog from "../../PopUpDialog/PopUpDialog";
import { useDispatch, useSelector } from "react-redux";
import { handleRemoveItem } from "../../../config/addCartSlice";

const CartItemCard = ({ item }) => {
  const { id, name, img, quantity, unit, price, total } = item;
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  // Remove Item Handler
  const handleRemove = () => {
    dispatch(handleRemoveItem(id)); // Dispatching action to remove item from Redux store
    setOpenDialog(false);
  };

  return (
    <>
      <PopUpDialog
        open={openDialog}
        handleRemove={handleRemove}
        handleCancel={() => setOpenDialog(!openDialog)}
        message={"Want to remove this item"}
      />

      <Fade in={true}>
        <div className="grid max-w-[40rem] py-2.5 px-3 xl:grid-cols-5 sm:grid-cols-6 grid-cols-7 lg:gap-x-2.5 gap-x-2 rounded-md w-full bg-white hover:shadow-sm">
          {/*Img */}
          <div className="col flex items-center justify-center">
            <img src={img} className="lg:h-16 h-10" alt={name} />
          </div>

          <div className="col-span-2 overflow-hidden pt-2">
            <div className=" overflow-hidden lg:space-y-2 space-y-0.5">
              {/* Name */}
              <h4 className="font-semibold lg:max-h-none max-h-10 overflow-hidden lg:text-gray-700 sm:text-sm text-xs">
                {name}
              </h4>

              {/* Description */}
              <h6 className="text-justify text-xs text-gray-700">
                Best Quality
              </h6>
            </div>
          </div>

          <div className="flex sm:col-span-1 col-span-2 justify-center items-center">
            <div className="lg:space-y-1 md:space-y-0 sm:space-y-0.5">
              {/*Total Price */}
              <h3 className="font-semibold whitespace-nowrap sm:text-base text-sm text-green-600">
                $ {total}
              </h3>

              {/* Remove-Item btn */}
              <div className="text-center">
                <IconButton
                  onClick={() => setOpenDialog(!openDialog)}
                  sx={{ textTransform: "capitalize", opacity: 0.7 }}
                  color="inherit"
                  size="small"
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </div>
            </div>
          </div>

          {/* Item Quantity Control */}
          <div className="flex items-center justify-center xl:col-span-1 col-span-2">
            <QuantityController item={item} />
          </div>
        </div>
      </Fade>
    </>
  );
};

// Quantity Controller
const QuantityController = ({ item }) => {
  const { unit, quantity, price, id } = item;
  const [productQuantity, setProductQuantity] = useState(quantity);
  // Event Handlers
  const handleReduce = () => {
    productQuantity > 1 && setProductQuantity(productQuantity - 1);
  };
  const handleIncrement = () => {
    setProductQuantity(productQuantity + 1);
  };

  // Update Cart
  useEffect(() => {
    const updateCart = () => {
      const updatedItem = {
        ...item,
        quantity: productQuantity,
        total: (productQuantity * price).toFixed(2),
      };
      dispatch(handleAddToCartBtn(updatedItem)); // Dispatch action to update item in Redux store
    };
  }, [productQuantity]);

  return (
    <div
      className={
        "flex items-center justify-center my-auto lg:space-x-2.5 sm:space-x-2 space-x-1.5"
      }
    >
      {/* Reduce Quantity */}
      <IconButton
        size={"small"}
        disabled={productQuantity < 2}
        onClick={handleReduce}
      >
        <Remove fontSize="inherit" />
      </IconButton>

      {/* Current Quantity*/}
      <h1
        className={
          "my-auto lg:text-xl lg:font-medium font-semibold text-gray-700 whitespace-nowrap"
        }
      >
        {productQuantity}
        <span className="lg:text-sm text-xs"> {unit}</span>
      </h1>

      {/* Increase Quantity */}
      <IconButton size={"small"} onClick={handleIncrement} color="success">
        <Add fontSize="inherit" />
      </IconButton>
    </div>
  );
};

export default CartItemCard;
