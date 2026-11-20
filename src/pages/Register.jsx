import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../App";
import Icon from "../components/Icon";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useStore();

  return (
    <div className="auth-page">
      <section className="auth-form register-form">
        <div className="auth-card-top">
          <span className="auth-tag">Ro‘yxatdan o‘tish</span>
          <Link to="/" className="auth-back">
            ← Do‘konga qaytish
          </Link>
        </div>
        <div className="auth-heading">
          <h2>Yangi hisob yaratish</h2>
          <p>
            Tezkor buyurtma berish va sevimlilarni saqlash uchun ro‘yxatdan
            o‘ting.
          </p>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            if (form.get("password") !== form.get("confirmPassword")) {
              setMessage("Parollar bir xil emas.");
              return;
            }
            setMessage("");
            login({
              name: form.get("name"),
              email: form.get("email"),
              phone: form.get("phone"),
            });
            navigate("/");
          }}
        >
          <label>
            To‘liq ism
            <input
              name="name"
              type="text"
              placeholder="Azizbek Karimov"
              autoComplete="name"
              required
            />
          </label>
          <div className="two-fields">
            <label>
              Elektron pochta
              <input
                name="email"
                type="email"
                placeholder="azizbek@example.com"
                autoComplete="email"
                required
              />
            </label>
            <label>
              Telefon raqam
              <input
                name="phone"
                type="tel"
                placeholder="+998 90 123 45 67"
                autoComplete="tel"
                required
              />
            </label>
          </div>
          <div className="two-fields">
            <label>
              Parol
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Kamida 8 ta belgi"
                  minLength="8"
                  name="password"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  aria-label={
                    showPassword ? "Parolni yashirish" : "Parolni ko‘rsatish"
                  }
                  onClick={() => setShowPassword((visible) => !visible)}
                >
                  <Icon name="eye" size={19} />
                </button>
              </div>
            </label>
            <label>
              Parolni tasdiqlang
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Parolni qayta kiriting"
                minLength="8"
                name="confirmPassword"
                autoComplete="new-password"
                required
              />
            </label>
          </div>
          {message && (
            <p className="auth-feedback error" role="alert">
              {message}
            </p>
          )}
          <button className="auth-submit">
            Ro‘yxatdan o‘tish
            <Icon name="arrow" size={18} />
          </button>
        </form>
        <div className="auth-switch">
          Allaqachon hisobingiz bormi? <Link to="/login">Kirish</Link>
        </div>
      </section>
    </div>
  );
}
