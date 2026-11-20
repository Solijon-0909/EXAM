import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../App";
import { formatPrice } from "../components/ProductCard";
import Icon from "../components/Icon";
import ProductVisual from "../components/ProductVisual";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart, user } = useStore();
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoMessage, setPromoMessage] = useState("");
  const [delivery, setDelivery] = useState("courier");
  const [payment, setPayment] = useState("cash");
  const [customerName, setCustomerName] = useState(user?.name || "");
  const [customerPhone, setCustomerPhone] = useState(user?.phone || "");
  const [orderError, setOrderError] = useState("");
  const [ordered, setOrdered] = useState(false);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const deliveryPrice = delivery === "courier" ? 30000 : 0;
  const total = subtotal - discount + deliveryPrice;
  const applyPromo = () => {
    const isValid = promo.trim().toUpperCase() === "SALE10";
    setPromoApplied(isValid);
    setPromoMessage(
      isValid ? "SALE10 promokodi qo‘llandi" : "Promokod topilmadi",
    );
  };
  const placeOrder = () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      setOrderError("Buyurtma uchun ism va telefon raqamingizni kiriting.");
      return;
    }
    setOrderError("");
    clearCart();
    setOrdered(true);
  };
  if (ordered)
    return (
      <div className="success-state">
        <div className="success-icon">
          <Icon name="check" size={34} />
        </div>
        <h1>Buyurtmangiz qabul qilindi!</h1>
        <p>
          Tez orada menejerimiz {customerPhone} raqami orqali siz bilan
          bog‘lanadi.
        </p>
        <p className="order-confirmation-detail">
          To‘lov usuli: {payment === "cash" ? "Naqd pul" : "Karta orqali"}
        </p>
        <Link className="primary-button" to="/">
          Bosh sahifaga qaytish
        </Link>
      </div>
    );
  return (
    <div className="cart-page">
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Xaridlaringiz</p>
          <h1>Savat</h1>
        </div>
        <Link to="/" className="back-link">
          ← Xarid qilishda davom etish
        </Link>
      </div>
      {cart.length === 0 ? (
        <div className="cart-empty">
          <div className="empty-icon">
            <Icon name="bag" size={30} />
          </div>
          <h2>Savatingiz bo‘sh</h2>
          <p>Yoqtirgan mahsulotlaringizni savatga qo‘shing.</p>
          <Link to="/" className="primary-button">
            Mahsulotlarni ko‘rish
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-items">
            <div className="cart-section-head">
              <h2>Tanlangan mahsulotlar</h2>
              <span>
                {cart.reduce((sum, item) => sum + item.quantity, 0)} ta mahsulot
              </span>
            </div>
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  <ProductVisual product={item} size={31} />
                </div>
                <div className="cart-item-info">
                  <span>{item.category}</span>
                  <h3>{item.name}</h3>
                  <div className="rating">
                    <Icon name="star" size={14} />
                    <strong>{item.rating}</strong>
                  </div>
                </div>
                <div className="quantity">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Icon name="minus" size={15} />
                  </button>
                  <strong>{item.quantity}</strong>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Icon name="plus" size={15} />
                  </button>
                </div>
                <strong className="cart-item-price">
                  {formatPrice(item.price * item.quantity)}
                </strong>
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="O‘chirish"
                >
                  <Icon name="trash" size={18} />
                </button>
              </div>
            ))}
          </section>
          <aside className="checkout-card">
            <h2>Buyurtmani rasmiylashtirish</h2>
            <div className="customer-fields">
              <label>
                Ism va familiya
                <input
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  placeholder="Ismingizni kiriting"
                  autoComplete="name"
                />
              </label>
              <label>
                Telefon raqam
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(event) => setCustomerPhone(event.target.value)}
                  placeholder="+998 90 123 45 67"
                  autoComplete="tel"
                />
              </label>
            </div>
            <div className="promo-row">
              <input
                placeholder="Promokod"
                value={promo}
                onChange={(event) => setPromo(event.target.value.toUpperCase())}
              />
              <button onClick={applyPromo}>Qo‘llash</button>
            </div>
            {promoMessage && (
              <p
                className={`promo-success ${promoApplied ? "" : "promo-error"}`}
              >
                {promoApplied && <Icon name="check" size={14} />}
                {promoMessage}
              </p>
            )}
            <div className="checkout-divider" />
            <h3>To‘lov usuli</h3>
            <div className="payment-options">
              <button
                type="button"
                className={payment === "card" ? "chosen" : ""}
                onClick={() => setPayment("card")}
              >
                <span className="delivery-radio" /> Karta orqali
              </button>
              <button
                type="button"
                className={payment === "cash" ? "chosen" : ""}
                onClick={() => setPayment("cash")}
              >
                <span className="delivery-radio" /> Naqd pul
              </button>
            </div>
            <div className="checkout-divider" />
            <h3>Yetkazib berish usuli</h3>
            <div className="delivery-options">
              <button
                className={delivery === "courier" ? "chosen" : ""}
                onClick={() => setDelivery("courier")}
              >
                <span className="delivery-radio" />
                <span>
                  <strong>Kuryer orqali</strong>
                  <small>Bugun, 18:00 gacha</small>
                </span>
                <b>30 000 so‘m</b>
              </button>
              <button
                className={delivery === "pickup" ? "chosen" : ""}
                onClick={() => setDelivery("pickup")}
              >
                <span className="delivery-radio" />
                <span>
                  <strong>Olib ketish</strong>
                  <small>Tekin • Ertaga tayyor</small>
                </span>
                <b>Bepul</b>
              </button>
            </div>
            <div className="checkout-divider" />
            <div className="price-line">
              <span>Mahsulotlar</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            {promoApplied && (
              <div className="price-line discount">
                <span>Chegirma (10%)</span>
                <strong>−{formatPrice(discount)}</strong>
              </div>
            )}
            <div className="price-line">
              <span>Yetkazib berish</span>
              <strong>
                {deliveryPrice ? formatPrice(deliveryPrice) : "Bepul"}
              </strong>
            </div>
            <div className="checkout-total">
              <span>Jami</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <button className="checkout-button" onClick={placeOrder}>
              Buyurtma berish
              <Icon name="arrow" size={18} />
            </button>
            {orderError && (
              <p className="order-error" role="alert">
                {orderError}
              </p>
            )}
            <p className="secure-note">🔒 To‘lovingiz xavfsiz himoyalangan</p>
          </aside>
        </div>
      )}
    </div>
  );
}
