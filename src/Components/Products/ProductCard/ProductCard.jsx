import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Fade,
  Rating,
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import { Star } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
// Adjust the import path based on your project structure
import SuccessAlert from "../../SuccessAlert/SuccessAlert";
import { handleAddToCartBtn } from "../../../config/addCartSlice";

const ProductCard = ({ product }) => {
  const { img, name, price, reviews, reviewCount, quantity, unit } = product;

  // Media Query
  const isMediumScreen = useMediaQuery(
    "(min-width: 768px) and (max-width: 1024px)"
  );
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  const [openAlert, setOpenAlert] = useState(false);
  const dispatch = useDispatch();

  // Handle Add To Cart
  const handleAddToCart = () => {
    dispatch(handleAddToCartBtn(product));
    setOpenAlert(true);
  };

  return (
    <div>
      <SuccessAlert
        state={[openAlert, setOpenAlert]}
        message={"Item added successfully"} // Corrected "massage" to "message"
      />

      <Fade in={true}>
        <Card
          sx={{
            maxWidth: isSmallScreen ? 275 : 295,
            mx: "auto",
            boxShadow: "0 2px 4px -1px rgb(0 0 0 / 0.1)",
            backgroundColor: "white",
          }}
        >
          {/* Product Image */}
          <div className="md:h-36 py-3 w-full bg-white flex items-center justify-center">
            <img
              className="md:max-h-28 max-h-24"
              loading="lazy"
              src={img}
              alt={name}
            />
          </div>
          <div className="p-1.5">
            <CardContent className="md:space-y-2 space-y-1.5 ">
              {/* Title */}
              <h3 className="md:text-xl lg:text-2xl text-xl text-gray-700 font-semibold text-center capitalize">
                {name}
              </h3>
              <div className="md:space-y-1.5 space-y-2 lg:space-y-2">
                <div className="flex justify-center space-x-5">
                  {/* Amount */}
                  <span className="block text-sm md:text-xs lg:text-sm">
                    ± {quantity} {unit}
                  </span>
                  {/* Price */}
                  <span className="block text-sm md:text-xs lg:text-sm">
                    $ {price} USD
                  </span>
                </div>

                <div className="flex justify-center">
                  <div className="flex items-center space-x-1">
                    {/* Rating */}
                    <Rating
                      size="small"
                      name="product_ratings"
                      value={reviews}
                      readOnly
                      precision={0.5}
                      emptyIcon={<Star fontSize="inherit" />}
                    />

                    {/* Number of Reviews */}
                    <span className="text-sm md:text-xs lg:text-sm text-gray-500">
                      ( {reviewCount} Reviews )
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardActions>
              <Button
                sx={{
                  textTransform: "capitalize",
                  marginX: "auto",
                  ":hover": {
                    bgcolor: "#2e7d32",
                    color: "white",
                    transition: "all 235ms ease-in-out",
                  },
                }}
                fullWidth
                onClick={handleAddToCart}
                size={isMediumScreen ? "small" : "medium"}
                variant="outlined"
                color="success"
              >
                Add to cart
              </Button>
            </CardActions>
          </div>
        </Card>
      </Fade>
    </div>
  );
};

// ProductCard Skeleton
export const ProductCardSkeleton = () => (
  <div>
    <Card
      sx={{
        maxWidth: 308,
        mx: "auto",
        boxShadow:
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        backgroundColor: "white",
      }}
    >
      {/* Product Image */}
      <Skeleton variant="rectangular" height={170} width={"100%"} />
      <div className="px-1.5 pb-2">
        <CardContent className="space-y-2" sx={{ pb: 1 }}>
          {/* Title */}
          <Skeleton
            sx={{ mx: "auto" }}
            variant="text"
            height={"3rem"}
            width={"55%"}
          />
          <div className="md:space-y-1.5 space-y-2 lg:space-y-2">
            <div className="flex justify-center space-x-5">
              {/* Amount */}
              <Skeleton variant="text" height={"1.3rem"} width={"30%"} />
              {/* Price */}
              <Skeleton variant="text" height={"1.3rem"} width={"25%"} />
            </div>
            <div className="flex justify-center">
              {/* Ratings */}
              <Skeleton variant="text" height={"1.6rem"} width={"80%"} />
            </div>
          </div>
        </CardContent>
        {/* Add To Cart Button */}
        <CardActions sx={{ pt: 0 }}>
          <Skeleton variant="rounded" height={"1.9rem"} width={"100%"} />
        </CardActions>
      </div>
    </Card>
  </div>
);

export default ProductCard;
