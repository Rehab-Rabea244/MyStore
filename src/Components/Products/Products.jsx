
import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

function Products() {
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function getProducts() {
    setLoading(true);
    setError("");

    try {
      const [skinResponse, beautyResponse] = await Promise.all([
        fetch("https://dummyjson.com/products/category/skin-care?limit=0"),
        fetch("https://dummyjson.com/products/category/beauty?limit=0"),
      ]);

      if (!skinResponse.ok || !beautyResponse.ok) {
        throw new Error("Could not load products.");
      }

      const skinData = await skinResponse.json();
      const beautyData = await beautyResponse.json();

      const skincareProducts = (skinData.products || []).map((product) => ({
        ...product,
        source: "dummyjson",
        productType: "skincare",
      }));

      const beautyProducts = (beautyData.products || []).map((product) => ({
        ...product,
        source: "dummyjson",
        productType: "makeup",
      }));

      let makeupProducts = [];

      try {
        const makeupResponse = await fetch(
          "https://makeup-api.herokuapp.com/api/v1/products.json"
        );

        if (makeupResponse.ok) {
          const makeupData = await makeupResponse.json();

          makeupProducts = makeupData
            .filter((product) => product.id && product.name)
            .map((product) => {
              let image = product.api_featured_image || "";

              if (image.startsWith("//")) {
                image = `https:${image}`;
              } else if (image.startsWith("/")) {
                image = `https://makeup-api.herokuapp.com${image}`;
              }

              return {
                id: `makeup-${product.id}`,
                originalId: product.id,
                source: "makeup",
                productType: "makeup",
                title: product.name,
                description:
                  product.description || "Discover this makeup product.",
                price: Number.parseFloat(product.price) || 0,
                rating: Number(product.rating) || 0,
                stock: 10,
                brand: product.brand || "Makeup Brand",
                category: product.product_type || "makeup",
                thumbnail: image,
                images: image ? [image] : [],
              };
            });
        }
      } catch (makeupError) {
        console.warn("Makeup API is unavailable:", makeupError);
      }

      const allProducts = [
        ...skincareProducts,
        ...beautyProducts,
        ...makeupProducts,
      ];

      const uniqueProducts = Array.from(
        new Map(allProducts.map((product) => [product.id, product])).values()
      );

      setProducts(uniqueProducts);

      console.log("Total products:", uniqueProducts.length);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while loading products.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== "all") {
      result = result.filter(
        (product) => product.productType === category
      );
    }

    if (search.trim()) {
      const searchText = search.toLowerCase();

      result = result.filter(
        (product) =>
          product.title?.toLowerCase().includes(searchText) ||
          product.brand?.toLowerCase().includes(searchText) ||
          product.category?.toLowerCase().includes(searchText)
      );
    }

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, search, category, sort]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status" />
        <p className="mt-3">Loading beauty products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <p className="text-danger">{error}</p>
        <button className="btn btn-dark" onClick={getProducts}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <main className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">Our Beauty Collection</h1>
        <p className="text-muted">
          Discover your favorite makeup and skincare products.
        </p>
      </div>

      {/* Search and filters */}
      <div className="row g-3 mb-4 justify-content-center align-items-center">
        <div className="col-12 col-md-4">
          <input
            type="search"
            className="form-control"
            placeholder="Search products or brands..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search products"
          />
        </div>

        <div className="col-6 col-md-2">
          <select
            className="form-select"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label="Filter by category"
          >
            <option value="all">All Products</option>
            <option value="makeup">Makeup</option>
            <option value="skincare">Skincare</option>
          </select>
        </div>

        <div className="col-6 col-md-2">
          <select
            className="form-select"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            aria-label="Sort products"
          >
            <option value="default">Default Sorting</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>
      </div>

      <p className="text-muted mb-4">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-5">
          <h4>No products found</h4>
          <p>Try another search or category.</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div
              className="col-12 col-sm-6 col-lg-4 col-xl-3"
              key={`${product.source}-${product.id}`}
            >
              <div className="card h-100 border-0 shadow-sm">
                <div
                  className="bg-light d-flex align-items-center justify-content-center p-3"
                  style={{ height: "240px" }}
                >
                  <img
                    src={
                      product.thumbnail ||
                      "https://placehold.co/300x300?text=Beauty+Product"
                    }
                    alt={product.title}
                    className="img-fluid"
                    style={{
                      maxHeight: "210px",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                    onError={(event) => {
                      event.currentTarget.src =
                        "https://placehold.co/300x300?text=Beauty+Product";
                    }}
                  />
                </div>

                <div className="card-body d-flex flex-column">
                  <span className="badge text-bg-light align-self-start mb-2">
                    {product.productType === "skincare"
                      ? "Skincare"
                      : "Makeup"}
                  </span>

                  <h5 className="card-title">{product.title}</h5>

                  <p className="text-muted small mb-2">
                    {product.brand || "Beauty Brand"}
                  </p>

                  <p className="mb-2">
                    ⭐{" "}
                    {product.rating
                      ? Number(product.rating).toFixed(1)
                      : "New"}
                  </p>

                  <h5 className="fw-bold mb-3">
                    ${Number(product.price).toFixed(2)}
                  </h5>

                  <div className="mt-auto d-grid gap-2">
                    <Link
                      to={`/products/${product.id}?source=${product.source}`}
                      className="btn btn-outline-dark"
                    >
                      View Details
                    </Link>

                    <button
                      className="btn btn-dark"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Products;

