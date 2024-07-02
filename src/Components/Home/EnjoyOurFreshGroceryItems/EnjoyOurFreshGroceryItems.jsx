import { Button, Container, useMediaQuery } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import ProductCard, {
  ProductCardSkeleton,
} from "../../Products/ProductCard/ProductCard";
import { useNavigate } from "react-router-dom";
import { products } from "../../../store/products";

const EnjoyOurFreshGroceryItems = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // MediaQuery
  const isExtraSmallScreen = useMediaQuery("(max-width: 640px)");

  // Get Grocery Items
  useEffect(() => {
    const getData = (async function () {
      console.log(selectedCategory);
      const url = `https://ecommerce-backend-yvgg.onrender.com/api/v1/data/${selectedCategory}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setItems(data.items.slice(0, 3));
        console.log(data.items.slice(0, 3));
        setIsLoading(false);
      } catch (error) {
        throw new Error("EnjoyFreshItems Fetch Failed", error);
      }
    })();
  }, [selectedCategory]);

  return (
    <Container>
      <div className="space-y-7 xl:space-y-8">
        {/* Title */}
        <h1 className="text-center pb-0 md:text-2xl text-xl font-semibold capitalize tracking-wide">
          Enjoy Our Healthy And Fresh <br />
          Grocery Items
        </h1>
        {/* Items Toggler  */}
        <ItemsToggler
          alignment={selectedCategory}
          setAlignment={setSelectedCategory}
        />

        {/*Grocery Items */}
        <div
          className="grid md:grid-cols-3 sm:grid-cols-2 
                lg:gap-6 gap-x-5 gap-y-5"
        >
          {!isLoading
            ? items.map((item) => <ProductCard key={item.id} product={item} />)
            : Array.from({ length: 3 }).map((pd, i) => {
                return <ProductCardSkeleton key={i} />;
              })}
        </div>
        <Button
          onClick={() => navigate("/products")}
          color="success"
          size={isExtraSmallScreen ? "small" : "medium"}
          variant="outlined"
          sx={{ textTransform: "capitalize", display: "block", mx: "auto" }}
        >
          View All Products
        </Button>
      </div>
    </Container>
  );
};

// Grocery Items Toggler
const ItemsToggler = ({ alignment, setAlignment }) => {
  // MediaQuery
  const isExtraSmallScreen = useMediaQuery("(max-width: 640px)");
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="space-x-3 md:space-x-5 text-center">
      {[
        // { id: 0, name: "Meat" },
        { id: 0, name: "Meat", bgColor: "#FEF4EA" },
        { id: 1, name: "Vegetables", bgColor: "#F5F5F5" },
        { id: 2, name: "Fruits", bgColor: "#EAF5E3" },
        { id: 3, name: "Dairy", bgColor: "#eaf4f4" },
        { id: 4, name: "Grains", bgColor: "#FAF9D7" },
        { id: 5, name: "Soft-Drinks", bgColor: "#E3E8E9" },
        { id: 6, name: "Snacks", bgColor: "#ECFDF1" },
        { id: 7, name: "Biscutes", bgColor: "#dcdbe9" },
        { id: 8, name: "Dry-Fruits", bgColor: "#D3F4FB" },
        { id: 9, name: "Masalas", bgColor: "#E6D7D5" },
      ].map((category) => (
        <Button
          sx={{
            textTransform: "capitalize",
            transition: "all 150ms ease-in-out",
          }}
          size={
            isExtraSmallScreen ? "small" : isLargeScreen ? "large" : "medium"
          }
          color="success"
          variant={alignment === category.id ? "contained" : "text"}
          key={category.id}
          onClick={(e) => setAlignment(category.name)}
          value={category.id}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default EnjoyOurFreshGroceryItems;
