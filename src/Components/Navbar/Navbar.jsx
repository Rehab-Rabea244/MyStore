
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

export default function Navbar() {
  const { totalItems } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const getNavLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? "active" : ""}`;

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top py-3">
      <div className="container">
        {/* Brand */}
        <Link
          className="navbar-brand fw-bold fs-3 brand-name"
          to="/"
          onClick={closeMenu}
        >
          GLOWÉRA
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="mainNavbar"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((previous) => !previous)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div
          id="mainNavbar"
          className={`collapse navbar-collapse ${
            menuOpen ? "show" : ""
          }`}
        >
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-4">
            <NavLink
              className={getNavLinkClass}
              to="/"
              end
              onClick={closeMenu}
            >
              Home
            </NavLink>

            <NavLink
              className={getNavLinkClass}
              to="/products"
              onClick={closeMenu}
            >
              Products
            </NavLink>

            <NavLink
              className={getNavLinkClass}
              to="/cart"
              onClick={closeMenu}
            >
              Cart <span className="cart-badge">{totalItems}</span>
            </NavLink>

            <NavLink
              className={getNavLinkClass}
              to="/contact"
              onClick={closeMenu}
            >
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
