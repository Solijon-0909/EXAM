/* eslint-disable react-refresh/only-export-components */
import { useStore } from "../App";
import { Link } from "react-router-dom";
import Icon from "./Icon";
import ProductVisual from "./ProductVisual";

const formatPrice = (price) =>
  new Intl.NumberFormat("ru-RU").format(price).replace(/\u00a0/g, " ") + " so‘m";

export default function ProductCard({ product }) {
  const { favorites, toggleFavorite, addToCart } = useStore();
  const isFavorite = favorites.includes(product.id);
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        {product.badge && (
          <span
            className={`product-badge ${product.badge.startsWith("-") ? "sale" : ""} ${product.badge === "Tugagan" ? "sold-out" : ""}`}
          >
            {product.badge}
          </span>
        )}
        <button
          className={`favorite-button ${isFavorite ? "liked" : ""}`}
          onClick={() => toggleFavorite(product.id)}
          aria-label="Sevimlilarga qo‘shish"
        >
          <Icon name="heart" size={19} />
        </button>
        <Link to={`/product/${product.id}`} className="product-image-link">
          <ProductVisual product={product} />
        </Link>
      </div>
      <div className="product-details">
        <span className="product-category">{product.category}</span>
        <h3>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="rating">
          <Icon name="star" size={14} />
          <strong>{product.rating}</strong>
          <span>({product.reviews})</span>
        </div>
        <div className="product-bottom">
          <div>
            <strong className="product-price">
              {formatPrice(product.price)}
            </strong>
            {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
          </div>
          <button
            className="add-button"
            onClick={() => addToCart(product)}
            disabled={product.badge === "Tugagan"}
          >
            <Icon name="plus" size={17} />
            <span>
              {product.badge === "Tugagan" ? "Mavjud emas" : "Savatga"}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}

export { formatPrice };
