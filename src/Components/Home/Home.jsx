 import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="container text-center py-5">
      <p
        className="text-uppercase mb-2"
        style={{
          color: "#a7803e",
          letterSpacing: "3px",
        }}
      >
        Natural Beauty
      </p>

      <h1 className="display-4 fw-bold">Welcome to Glowéra Store</h1>

      <p className="text-muted fs-5 mb-4">
        Discover skincare products for your daily routine.
      </p>

      <Link to="/products" className="btn btn-dark">
        Shop Now
      </Link>
    </section>
  );
}