import { Container, Fade } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import ProductCard, { ProductCardSkeleton } from "./ProductCard/ProductCard";
import { useParams } from "react-router-dom";

const Products = ({ categoryProducts }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { categoryName } = useParams();

  // Scrolling Bug Fixed
  window.scroll({ top: 0 });

  // Get Products
  useEffect(() => {
    const getData = (async function () {
      const allProductsUrl =
        "https://ecommerce-backend-yvgg.onrender.com/api/v1/data";
      const categoryProductsUrl = `https://ecommerce-backend-yvgg.onrender.com/api/v1/data/${
        categoryName === "Meat"
          ? "Meat"
          : categoryName === "Vegetables"
          ? "Vegetables"
          : categoryName === "Fruits"
          ? "Fruits"
          : categoryName === "Dairy"
          ? "Dairy"
          : categoryName === "Grains"
          ? "Grains"
          : categoryName === "Snacks"
          ? "Snacks"
          : categoryName === "Soft-Drinks"
          ? "Soft-Drinks"
          : categoryName === "Biscutes"
          ? "Biscutes"
          : categoryName === "Dry-Fruits"
          ? "Dry-Fruits"
          : categoryName === "Masalas"
          ? "Masalas"
          : 2
      }`;
      try {
        const res = await fetch(
          categoryName ? categoryProductsUrl : allProductsUrl
        );
        const data = await res.json();
        console.log(data[0]);
        setProducts(
          categoryName
            ? data[0].items
            : data[0].items.concat(
                data[1].items,
                data[2].items,
                data[3].items,
                data[4].items,
                data[5].items,
                data[6].items,
                data[7].items,
                data[8].items,
                data[9].items
              )
        );
        setIsLoading(!isLoading);
      } catch (error) {
        throw new Error("Products Fetch Failed", error);
      }
    })();
  }, []);
  // console.log(products);

  return (
    <main className="min-h-screen space-y-5 pt-20 mb-9">
      <Fade in={true}>
        <Container className="xl:space-y-10 sm:space-y-8 space-y-6">
          {/* Title */}
          <h1 className="pb-0 md:text-2xl text-xl font-semibold text-gray-700 capitalize">
            {categoryName ? categoryName : "All Products"}
          </h1>

          {/* Product_cards*/}
          <section
            className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 
                lg:gap-6 gap-x-5 gap-y-5"
          >
            {!isLoading
              ? products?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              : Array.from({ length: 8 }).map((pd, i) => {
                  return <ProductCardSkeleton key={i} />;
                })}
          </section>
        </Container>
      </Fade>
    </main>
  );
};

export default Products;
