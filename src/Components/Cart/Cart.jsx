import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

function Cart() {
const {
cartItems,
increaseQuantity,
decreaseQuantity,
removeFromCart,
clearCart,
totalPrice,
} = useContext(CartContext);

if (cartItems.length === 0) {
return ( <section className="container py-5"> <div className="text-center mb-5"> <p className="gold-text text-uppercase mb-2">
Your Selection </p>


      <h1 className="display-5 fw-bold">
        Shopping Bag
      </h1>

      <p className="text-muted">
        Your cart is currently empty.
      </p>
    </div>

    <div className="card shadow-sm text-center p-5 mx-auto empty-cart">
      <div className="fs-1 mb-3">🛍️</div>

      <h3 className="fw-bold">Your Bag Is Empty</h3>

      <p className="text-muted mb-4">
        Discover skincare essentials designed for your natural glow.
      </p>

      <div>
        <Link to="/products" className="btn btn-dark">
          EXPLORE PRODUCTS
        </Link>
      </div>
    </div>
  </section>
);


}

return ( <section className="container py-5"> <div className="text-center mb-5"> <p className="gold-text text-uppercase mb-2">
Your Selection </p>


    <h1 className="display-5 fw-bold">
      Shopping Bag
    </h1>
  </div>

  <div className="row g-4">
    {/* Cart Items */}
    <div className="col-12 col-lg-8">
      {cartItems.map((item) => (
        <div
          className="card shadow-sm mb-3 p-3"
          key={item.id}
        >
          <div className="row align-items-center g-3">
            {/* Product Image */}
            <div className="col-4 col-md-3">
              <img
                src={item.thumbnail}
                alt={item.title || "Skin Care Product"}
                className="cart-image img-fluid"
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* Product Information */}
            <div className="col-8 col-md-4">
              <h5 className="fw-bold mb-2">
                {item.title}
              </h5>

              <p className="price mb-0">
                ${Number(item.price).toFixed(2)}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="col-7 col-md-3">
              <div className="d-flex align-items-center gap-2">
                <button
                  type="button"
                  className="btn btn-outline-dark quantity-button"
                  onClick={() => decreaseQuantity(item.id)}
                  aria-label={`Decrease quantity of ${item.title}`}
                >
                  -
                </button>

                <span className="fw-bold">
                  {item.quantity}
                </span>

                <button
                  type="button"
                  className="btn btn-outline-dark quantity-button"
                  onClick={() => increaseQuantity(item.id)}
                  disabled={
                    typeof item.stock === "number" &&
                    item.quantity >= item.stock
                  }
                  aria-label={`Increase quantity of ${item.title}`}
                >
                  +
                </button>
              </div>
            </div>

            {/* Remove Button */}
            <div className="col-5 col-md-2 text-end">
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Order Summary */}
    <div className="col-12 col-lg-4">
      <div className="card shadow-sm p-4">
        <h3 className="fw-bold mb-4">
          Order Summary
        </h3>

        <div className="d-flex justify-content-between mb-3">
          <span>Total</span>

          <span className="price">
            ${Number(totalPrice).toFixed(2)}
          </span>
        </div>

        <button
          type="button"
          className="btn btn-dark w-100 mb-3"
          disabled={cartItems.length === 0}
        >
          CHECKOUT
        </button>

        <button
          type="button"
          className="btn btn-outline-danger w-100"
          onClick={clearCart}
        >
          CLEAR CART
        </button>

        <Link
          to="/products"
          className="btn btn-link text-dark mt-3"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  </div>
</section>


);
}

export default Cart;
