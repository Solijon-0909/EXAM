import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../App";
import Icon from "./Icon";

export default function Navbar() {
  const { cart, favorites, user, logout } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const query = new URLSearchParams(location.search).get("q") || "";
  const showProfile = Boolean(user);
  const profileName = user?.name || "Foydalanuvchi";
  const profileInitial = profileName.charAt(0).toUpperCase();
  const submitSearch = (event) => {
    event.preventDefault();
    const searchValue = event.currentTarget.elements.namedItem("q").value.trim();
    navigate(searchValue ? `/?q=${encodeURIComponent(searchValue)}` : "/");
  };

  const go = (path) => {
    setProfileOpen(false);
    setMobileOpen(false);
    navigate(path);
  };
  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="logo" aria-label="TexnoBozor bosh sahifa">
          <span className="brand-mark">TB</span>
          <span>
            Texno<span>Bozor</span>
          </span>
        </Link>
        <form className="search-box" onSubmit={submitSearch}>
          <Icon name="search" size={19} />
          <input
            key={location.search}
            name="q"
            defaultValue={query}
            placeholder="Mahsulotlarni qidiring..."
            aria-label="Mahsulot qidirish"
          />
          {query && (
            <button
              type="button"
              className="clear-search"
              onClick={() => navigate("/")}
            >
              ×
            </button>
          )}
        </form>
        <nav className={`nav-actions ${mobileOpen ? "is-open" : ""}`}>
          <Link
            to="/?favorites=true"
            className={`nav-link ${location.search.includes("favorites") ? "active" : ""}`}
          >
            <span className="nav-icon-wrap">
              <Icon name="heart" size={20} />
              {favorites.length > 0 && <b>{favorites.length}</b>}
            </span>
            <span>Sevimlilar</span>
          </Link>
          <Link to="/cart" className="nav-link">
            <span className="nav-icon-wrap">
              <Icon name="bag" size={20} />
              {cart.length > 0 && (
                <b>{cart.reduce((sum, item) => sum + item.quantity, 0)}</b>
              )}
            </span>
            <span>Savat</span>
          </Link>
          {showProfile ? (
            <div className="profile-area">
              <button
                className="profile-trigger"
                onClick={() => setProfileOpen((open) => !open)}
              >
                <span className="avatar">{profileInitial}</span>
                <span>{profileName.split(" ")[0]}</span>
                <Icon name="chevronDown" size={15} />
              </button>
              {profileOpen && (
                <div className="profile-menu">
                  <div className="profile-heading">
                    <span className="avatar">{profileInitial}</span>
                    <span>
                      <strong>{profileName}</strong>
                      <small>{user?.email}</small>
                    </span>
                  </div>
                  <button onClick={() => go("/profile")}>
                    <Icon name="user" size={17} /> Profilim
                  </button>
                  <button onClick={() => go("/orders")}>
                    <Icon name="bag" size={17} /> Buyurtmalarim
                  </button>
                  <button onClick={() => go("/?favorites=true")}>
                    <Icon name="heart" size={17} /> Sevimlilarim
                  </button>
                  <div className="menu-divider" />
                  <button
                    className="danger"
                    onClick={() => {
                      logout();
                      go("/login");
                    }}
                  >
                    Chiqish
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="auth-nav-button">
                Kirish
              </Link>
              <Link to="/register" className="auth-nav-button primary">
                Ro‘yxatdan o‘tish
              </Link>
            </>
          )}
        </nav>
        <button
          type="button"
          className="mobile-menu"
          aria-label={mobileOpen ? "Menyuni yopish" : "Menyuni ochish"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <Icon name="menu" />
        </button>
      </div>
    </header>
  );
}
