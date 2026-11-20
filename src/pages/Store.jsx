import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { products, useStore } from "../App";
import ProductCard, { formatPrice } from "../components/ProductCard";
import Icon from "../components/Icon";

const categories = ["Hammasi", "Noutbuklar", "Audio", "Aksessuarlar"];
const recentOrders = [
  {
    id: "#1024",
    customer: "Azizbek Karimov",
    products: "MacBook Air M2 (1x), Logitech MX Master 3S (1x)",
    delivery: "Kuryer orqali",
    total: 13610000,
  },
  {
    id: "#1023",
    customer: "Malika Rustamova",
    products: "Sony WH-1000XM5 (1x)",
    delivery: "Do‘kondan olib ketish",
    total: 4200000,
  },
];

export default function Store() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { favorites } = useStore();
  const [category, setCategory] = useState("Hammasi");
  const [sort, setSort] = useState("Tavsiya etilgan");
  const [sortOpen, setSortOpen] = useState(false);
  const search = searchParams.get("q") || "";
  const onlyFavorites = searchParams.get("favorites") === "true";
  const visibleProducts = useMemo(() => {
    const normalized = search.toLowerCase();
    const filtered = products.filter((product) => {
      const byCategory =
        category === "Hammasi" || product.category === category;
      const bySearch =
        !normalized ||
        `${product.name} ${product.category}`
          .toLowerCase()
          .includes(normalized);
      const byFavorite = !onlyFavorites || favorites.includes(product.id);
      return byCategory && bySearch && byFavorite;
    });
    if (sort === "Narx: pastdan")
      return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "Narx: yuqoridan")
      return [...filtered].sort((a, b) => b.price - a.price);
    if (sort === "Reyting bo‘yicha")
      return [...filtered].sort((a, b) => b.rating - a.rating);
    return filtered;
  }, [category, favorites, onlyFavorites, search, sort]);
  const clearSearch = () => setSearchParams({});

  return (
    <div className="store-page">
      <section className="store-toolbar">
        <div className="tabs">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "selected" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="toolbar-right">
          <button
            className={`favorite-filter ${onlyFavorites ? "selected" : ""}`}
            onClick={() =>
              setSearchParams(onlyFavorites ? {} : { favorites: "true" })
            }
          >
            <Icon name="heart" size={17} />
            Faqat sevimlilar
          </button>
          <div className="sort-wrap">
            <button
              className="sort-button"
              onClick={() => setSortOpen((open) => !open)}
            >
              Saralash: <strong>{sort}</strong>
              <Icon name="chevronDown" size={15} />
            </button>
            {sortOpen && (
              <div className="sort-menu">
                {[
                  "Tavsiya etilgan",
                  "Narx: pastdan",
                  "Narx: yuqoridan",
                  "Reyting bo‘yicha",
                ].map((item) => (
                  <button
                    key={item}
                    className={item === sort ? "current" : ""}
                    onClick={() => {
                      setSort(item);
                      setSortOpen(false);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      {(search || onlyFavorites) && (
        <div className="active-filters">
          <span>
            {search ? `Qidiruv: ${search}` : "Sevimli mahsulotlar"}
            <button onClick={clearSearch}>×</button>
          </span>
          <b>{visibleProducts.length} ta mahsulot</b>
        </div>
      )}
      <section className="products-section">
        <div className="section-heading">
          <div>
            <h2>
              {search
                ? "Qidiruv natijalari"
                : onlyFavorites
                  ? "Sevimlilarim"
                  : "Mashhur mahsulotlar"}
            </h2>
            <p>{visibleProducts.length} ta mahsulot topildi</p>
          </div>
          <button
            className="view-all"
            onClick={() => {
              setCategory("Hammasi");
              clearSearch();
            }}
          >
            Barchasini ko‘rish
            <Icon name="arrow" size={17} />
          </button>
        </div>
        {visibleProducts.length > 0 ? (
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <Icon name="search" size={30} />
            </div>
            <h3>Mahsulot topilmadi</h3>
            <p>Qidiruv so‘rovingiz bo‘yicha hech narsa topilmadi.</p>
            <button className="primary-button" onClick={clearSearch}>
              Qidiruvni tozalash
            </button>
          </div>
        )}
      </section>
      <section className="orders-section">
        <div className="section-heading">
          <div>
            <h2>So‘nggi buyurtmalar</h2>
            <p>Buyurtmalaringiz holatini kuzating</p>
          </div>
          <button className="view-all" onClick={() => navigate("/orders")}>
            Barchasi
            <Icon name="arrow" size={17} />
          </button>
        </div>
        <div className="recent-orders-grid">
          {recentOrders.map((order) => (
            <article className="recent-order-card" key={order.id}>
              <div className="recent-order-head">
                <strong>
                  {order.id} — {order.customer}
                </strong>
                <span>
                  <i /> Qabul qilindi
                </span>
              </div>
              <p className="recent-order-products">{order.products}</p>
              <div className="recent-order-bottom">
                <span>{order.delivery}</span>
                <strong>{formatPrice(order.total)}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
