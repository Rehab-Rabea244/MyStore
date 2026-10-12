
import { useContext, useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

function ProductsDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function getProduct() {
      setLoading(true);
      setError("");
      setProduct(null);

      try {
        const source = searchParams.get("source");

        let foundProduct;

        if (source === "makeup" || id.startsWith("makeup-")) {
          const makeupId = id.replace("makeup-", "");

          const response = await fetch(
            "https://makeup-api.herokuapp.com/api/v1/products.json",
            { signal: controller.signal }
          );

          if (!response.ok) {
            throw new Error("Could not load makeup products.");
          }

          const makeupProducts = await response.json();

          const makeupProduct = makeupProducts.find(
            (item) => String(item.id) === makeupId
          );

          if (!makeupProduct) {
            throw new Error("Product not found.");
          }

          let image = makeupProduct.api_featured_image || "";

          if (image.startsWith("//")) {
            image = `https:${image}`;
          } else if (image.startsWith("/")) {
            image = `https://makeup-api.herokuapp.com${image}`;
          }

          foundProduct = {
            id: `makeup-${makeupProduct.id}`,
            title: makeupProduct.name,
            description:
              makeupProduct.description || "Discover this makeup product.",
            price: Number.parseFloat(makeupProduct.price) || 0,
            rating: Number(makeupProduct.rating) || 0,
            stock: 10,
            brand: makeupProduct.brand || "Makeup Brand",
            category: makeupProduct.product_type || "makeup",
            thumbnail: image,
            images: image ? [image] : [],
            productType: "makeup",
            source: "makeup",
          };
        } else {
          const response = await fetch(
            `https://dummyjson.com/products/${id}`,
            { signal: controller.signal }
          );

          if (!response.ok) {
            throw new Error("Could not load product details.");
          }

          foundProduct = await response.json();

          foundProduct.productType =
            foundProduct.category === "skin-care"
              ? "skincare"
              : "makeup";

          foundProduct.source = "dummyjson";
        }

        setProduct(foundProduct);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError("Could not load this product. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    getProduct();

    return () => controller.abort();
  }, [id, searchParams]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status" />
        <p className="mt-3">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-5 text-center">
        <p className="text-danger">
          {error || "Product not found."}
        </p>

        <Link to="/products" className="btn btn-dark">
          Back to Products
        </Link>
      </div>
    );
  }

  const image =
    product.thumbnail ||
    product.images?.[0] ||
    "https://placehold.co/400x400?text=Beauty+Product";

  return (
    <main className="container py-5">
      <div className="row g-5 align-items-center">
        <div className="col-12 col-md-6">
          <div
            className="bg-light rounded d-flex justify-content-center align-items-center p-4"
            style={{ minHeight: "350px" }}
          >
            <img
              src={image}
              alt={product.title}
              className="img-fluid"
              style={{
                maxHeight: "400px",
                objectFit: "contain",
              }}
              onError={(event) => {
                event.currentTarget.src =
                  "https://placehold.co/400x400?text=Beauty+Product";
              }}
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <span className="badge text-bg-light mb-3">
            {product.productType === "skincare"
              ? "Skincare"
              : "Makeup"}
          </span>

          <h1 className="fw-bold mb-3">{product.title}</h1>

          <p className="text-muted">
            Brand: {product.brand || "Beauty Brand"}
          </p>

          <p className="mb-3">
            ⭐{" "}
            {product.rating
              ? Number(product.rating).toFixed(1)
              : "No rating available"}
          </p>

          <h2 className="fw-bold mb-4">
            ${Number(product.price || 0).toFixed(2)}
          </h2>

          <h5>Description</h5>

          <p className="text-muted">
            {product.description || "No description available."}
          </p>

          <p>
            <strong>Category:</strong>{" "}
            {product.category || "Beauty"}
          </p>

          <p>
            <strong>Availability:</strong>{" "}
            {product.stock > 0 ? "In Stock" : "Availability not confirmed"}
          </p>

          <div className="d-flex flex-wrap gap-3 mt-4">
            <button
              className="btn btn-dark px-4"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>

            <Link
              to="/products"
              className="btn btn-outline-dark px-4"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductsDetails;

