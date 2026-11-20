import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { products, useStore } from "../App";
import { formatPrice } from "../components/ProductCard";
import Icon from "../components/Icon";
import ProductVisual from "../components/ProductVisual";

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, favorites, toggleFavorite } = useStore();
  const product = products.find((item) => item.id === Number(productId));
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const isSoldOut = product?.badge === "Tugagan";

  if (!product)
    return (
      <div className="empty-state detail-not-found">
        <div className="empty-icon">
          <Icon name="search" size={30} />
        </div>
        <h3>Mahsulot topilmadi</h3>
        <Link className="primary-button" to="/">
          Bosh sahifaga qaytish
        </Link>
      </div>
    );

  const buyNow = () => {
    if (isSoldOut) return;
    for (let i = 0; i < quantity; i += 1) addToCart(product);
    navigate("/cart");
  };
  const addSelected = () => {
    if (isSoldOut) return;
    for (let i = 0; i < quantity; i += 1) addToCart(product);
    setAdded(true);
  };

  return (
    <div className="detail-page">
      <Link to="/" className="back-link">
        ← Mahsulotlarga qaytish
      </Link>
      <div className="detail-layout">
        <div className="detail-gallery">
          <span
            className={`product-badge ${product.badge?.startsWith("-") ? "sale" : ""}`}
          >
            {product.badge || "Original"}
          </span>
          <ProductVisual product={product} size={150} />
        </div>
        <section className="detail-info">
          <span className="product-category">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="detail-rating">
            <span className="rating">
              <Icon name="star" size={16} />
              <strong>{product.rating}</strong>
              <span>{product.reviews} ta sharh</span>
            </span>
            <span className={`stock-dot ${isSoldOut ? "out-of-stock" : ""}`} />
            {isSoldOut ? "Sotuvda yo‘q" : "Mavjud"}
          </div>
          <div className="detail-price">
            <strong>{formatPrice(product.price)}</strong>
            {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
            <span>12 oyga bo‘lib to‘lash imkoniyati mavjud</span>
          </div>
          <p className="detail-description">
            Kundalik ish va ijod uchun yaratilgan zamonaviy qurilma. Yuqori
            tezlik, chiroyli dizayn va ishonchli ishlash — barchasi bitta
            mahsulotda.
          </p>
          <div className="detail-features">
            <div>
              <strong>24 oy</strong>
              <span>Kafolat</span>
            </div>
            <div>
              <strong>1–2 kun</strong>
              <span>Yetkazib berish</span>
            </div>
            <div>
              <strong>Original</strong>
              <span>Mahsulot</span>
            </div>
          </div>
          <div className="detail-actions">
            <div className="quantity">
              <button
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              >
                <Icon name="minus" size={15} />
              </button>
              <strong>{quantity}</strong>
              <button onClick={() => setQuantity((value) => value + 1)}>
                <Icon name="plus" size={15} />
              </button>
            </div>
            <button
              className="detail-cart-button"
              onClick={addSelected}
              disabled={isSoldOut}
            >
              {isSoldOut
                ? "Sotuvda yo‘q"
                : added
                  ? "Savatga qo‘shildi ✓"
                  : "Savatga qo‘shish"}
              <Icon name="bag" size={18} />
            </button>
            <button
              className={`detail-favorite ${favorites.includes(product.id) ? "liked" : ""}`}
              onClick={() => toggleFavorite(product.id)}
              aria-label="Sevimlilarga qo‘shish"
            >
              <Icon name="heart" size={20} />
            </button>
          </div>
          <button className="buy-now" onClick={buyNow} disabled={isSoldOut}>
            {isSoldOut ? "Sotuvda yo‘q" : "Hozir xarid qilish"}
            {!isSoldOut && <Icon name="arrow" size={18} />}
          </button>
        </section>
      </div>
    </div>
  );
}
