import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { products, useStore } from "../App";
import { formatPrice } from "../components/ProductCard";
import Icon from "../components/Icon";

const createOrders = () => [
  {
    id: "TB-240531",
    date: "31 may, 2024",
    status: "Yetkazib berilmoqda",
    statusClass: "shipping",
    total: 15020000,
    product: products[0],
    quantity: 1,
  },
  {
    id: "TB-240418",
    date: "18 aprel, 2024",
    status: "Yetkazib berildi",
    statusClass: "delivered",
    total: 3990000,
    product: products[2],
    quantity: 1,
  },
];

export default function Orders() {
  const orders = createOrders();
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const visibleOrders = orders.filter(
    (order) => statusFilter === "all" || order.statusClass === statusFilter,
  );
  const inProgressCount = orders.filter(
    (order) => order.statusClass === "shipping",
  ).length;
  const deliveredCount = orders.filter(
    (order) => order.statusClass === "delivered",
  ).length;

  return (
    <div className="orders-page">
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Shaxsiy kabinet</p>
          <h1>Buyurtmalarim</h1>
        </div>
        <Link to="/" className="back-link">
          Xarid qilishda davom etish →
        </Link>
      </div>
      <div className="order-tabs">
        <button
          type="button"
          className={statusFilter === "all" ? "active" : ""}
          onClick={() => setStatusFilter("all")}
        >
          Barchasi <b>{orders.length}</b>
        </button>
        <button
          type="button"
          className={statusFilter === "shipping" ? "active" : ""}
          onClick={() => setStatusFilter("shipping")}
        >
          Jarayonda <b>{inProgressCount}</b>
        </button>
        <button
          type="button"
          className={statusFilter === "delivered" ? "active" : ""}
          onClick={() => setStatusFilter("delivered")}
        >
          Yetkazib berilgan <b>{deliveredCount}</b>
        </button>
      </div>
      <div className="full-orders">
        {visibleOrders.map((order) => (
          <article className="full-order-card" key={order.id}>
            <div className="full-order-head">
              <div>
                <strong>Buyurtma #{order.id}</strong>
                <span>{order.date}</span>
              </div>
              <span className={`full-order-status ${order.statusClass}`}>
                <i />
                {order.status}
              </span>
              <button
                type="button"
                className="order-arrow"
                aria-label={`${order.product.name} mahsulotini ko‘rish`}
                onClick={() => navigate(`/product/${order.product.id}`)}
              >
                <Icon name="chevronRight" size={19} />
              </button>
            </div>
            <div className="full-order-body">
              <div className="order-product-large">
                <img src={order.product.image} alt={order.product.name} />
                <div>
                  <strong>{order.product.name}</strong>
                  <span>
                    {order.product.category} · {order.quantity} dona
                  </span>
                </div>
              </div>
              <div className="full-order-total">
                <span>Jami summa</span>
                <strong>{formatPrice(order.total)}</strong>
              </div>
              <button
                type="button"
                className="repeat-order"
                onClick={() => {
                  for (let i = 0; i < order.quantity; i += 1) {
                    addToCart(order.product);
                  }
                  navigate("/cart");
                }}
              >
                Qayta xarid qilish <Icon name="arrow" size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
      {visibleOrders.length === 0 && (
        <div className="empty-state">
          <h3>Bu holatda buyurtmalar yo‘q</h3>
          <p>Boshqa buyurtma turini tanlang.</p>
        </div>
      )}
    </div>
  );
}
