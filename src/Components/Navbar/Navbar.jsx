import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

export default function Navbar() {
const { totalItems } = useContext(CartContext);

const getNavLinkClass = ({ isActive }) =>
`nav-link ${isActive ? "active" : ""}`;

const getMobileLinkClass = ({ isActive }) =>
`btn btn-outline-dark text-start ${
      isActive ? "active" : ""
    }`;

return ( <nav className="navbar navbar-dark sticky-top py-3"> <div className="container">
{/* Brand Logo */} <Link
       className="navbar-brand fw-bold fs-3 brand-name"
       to="/"
     >
GLOWÉRA </Link>


    {/* Desktop Menu */}
    <div className="d-none d-lg-flex align-items-center gap-4">
      <NavLink className={getNavLinkClass} to="/" end>
        Home
      </NavLink>

      <NavLink className={getNavLinkClass} to="/products">
        Products
      </NavLink>

      <NavLink className={getNavLinkClass} to="/cart">
        Cart <span className="cart-badge">{totalItems}</span>
      </NavLink>

      <NavLink className={getNavLinkClass} to="/contact">
        Contact
      </NavLink>
    </div>

    {/* Mobile Menu Button */}
    <button
      className="btn btn-outline-light d-lg-none"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#mobileMenu"
      aria-controls="mobileMenu"
      aria-label="Open menu"
    >
      ☰
    </button>
  </div>

  {/* Mobile Offcanvas Menu */}
  <div
    className="offcanvas offcanvas-end"
    tabIndex="-1"
    id="mobileMenu"
    aria-labelledby="mobileMenuLabel"
  >
    <div className="offcanvas-header">
      <h5
        className="offcanvas-title brand-name fs-3"
        id="mobileMenuLabel"
      >
        GLOWÉRA
      </h5>

      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>

    <div className="offcanvas-body">
      <div className="d-flex flex-column gap-3">
        <NavLink
          className={getMobileLinkClass}
          to="/"
          end
          data-bs-dismiss="offcanvas"
        >
          Home
        </NavLink>

        <NavLink
          className={getMobileLinkClass}
          to="/products"
          data-bs-dismiss="offcanvas"
        >
          Products
        </NavLink>

        <NavLink
          className={getMobileLinkClass}
          to="/cart"
          data-bs-dismiss="offcanvas"
        >
          Cart ({totalItems})
        </NavLink>

        <NavLink
          className={getMobileLinkClass}
          to="/contact"
          data-bs-dismiss="offcanvas"
        >
          Contact
        </NavLink>
      </div>
    </div>
  </div>
</nav>


);
}


