import { Button, Fade, TextField } from "@mui/material";
import { useState } from "react";
import GoBackButton from "../GoBackButton/GoBackButton";
import PopUpDialog from "../../PopUpDialog/PopUpDialog";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleClearItem } from "../../../config/addCartSlice";

const DeliveryForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const cartItems = useSelector((store) => store.cart.cartItems);
  const dispatch = useDispatch();
//   console.log(cartItems);

  // Handle Dialog
  const handleOK = () => {
    // Reset the Cart_items
    setOpenDialog(!openDialog);
    setName("");
    setEmail("");
    setAddress("");
    dispatch(handleClearItem());
    navigate("/");
  };
  const hanldePalce = () => {
    setOpenDialog(!openDialog);
  };
  console.log(name, email, address);

  return (
    <>
      <PopUpDialog
        open={openDialog}
        message={"Order Placed successfully"}
        handleOk={handleOK}
        placeOrder={true}
      />
      <div className="md:mx-0 mx-auto space-y-4 max-w-[37rem]">
        {/* Go back Btn */}
        <GoBackButton />
        <div className="space-y-9 lg:space-y-10 ">
          {/* Title */}
          <h1 className="lg:text-2xl text-xl font-semibold text-gray-600">
            Complete Delivery Details
          </h1>

          {/* Delivery Form */}
          <Fade in={true}>
            <div className="lg:space-y-8  space-y-7">
              {/* Full */}
              <TextField
                label="Full Name"
                size="small"
                fullWidth
                color="success"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              {/* Email */}
              <TextField
                label="Email"
                size="small"
                fullWidth
                color="success"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Address */}
              <TextField
                label="Address"
                size="small"
                fullWidth
                placeholder="street, city, state"
                color="success"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ textTransform: "capitalize" }}
                color="success"
                onClick={hanldePalce}
              >
                Place Order
              </Button>
            </div>
          </Fade>
        </div>
      </div>
    </>
  );
};

export default DeliveryForm;
