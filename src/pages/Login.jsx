import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../App";
import Icon from "../components/Icon";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { login } = useStore();

  return (
    <div className="auth-page">
      <section className="auth-form">
        <div className="auth-card-top">
          <span className="auth-tag">Kirish</span>
          <Link to="/" className="auth-back">
            ← Do‘konga qaytish
          </Link>
        </div>
        <div className="auth-heading">
          <h2>Hisobga kirish</h2>
          <p>
            Buyurtmalar tarixi va savatingizni ko‘rish uchun hisobingizga
            kiring.
          </p>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            login({
              name: email.split("@")[0] || "Foydalanuvchi",
              email,
              phone: "",
            });
            navigate("/");
          }}
        >
          <label>
            Elektron pochta
            <input
              type="email"
              placeholder="sizning@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </label>
          <label>
            Parol
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Parolingizni kiriting"
                autoComplete="current-password"
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
          <label className="check-label">
            <input type="checkbox" />
            <span>Meni eslab qol</span>
          </label>
          <button className="auth-submit">
            Kirish
            <Icon name="arrow" size={18} />
          </button>
        </form>
        <div className="auth-switch">
          Hali hisobingiz yo‘qmi? <Link to="/register">Ro‘yxatdan o‘ting</Link>
        </div>
      </section>
    </div>
  );
}
