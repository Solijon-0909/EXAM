import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../App";
import Icon from "../components/Icon";

export default function Profile() {
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(false);
  const [address, setAddress] = useState(
    "Toshkent shahri, Yunusobod tumani, Amir Temur ko‘chasi, 108-uy",
  );
  const [addressDraft, setAddressDraft] = useState("");
  const [addressForm, setAddressForm] = useState(false);
  const [addressMenuOpen, setAddressMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useStore();
  const [profileDraft, setProfileDraft] = useState(() => ({
    name: user?.name || "Akmal Karimov",
    email: user?.email || "akmal@mail.com",
    phone: user?.phone || "+998 90 123 45 67",
    birthDate: "12.08.2001",
  }));
  const profileName = profileDraft.name;
  const profileEmail = profileDraft.email;
  return (
    <div className="profile-page">
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Shaxsiy kabinet</p>
          <h1>Profilim</h1>
        </div>
        <span className="profile-updated">Oxirgi kirish: bugun, 10:24</span>
      </div>
      <div className="profile-layout">
        <aside className="profile-sidebar">
          <div className="profile-user">
            <span className="profile-avatar">
              {profileName.charAt(0).toUpperCase()}
            </span>
            <strong>{profileName}</strong>
            <span>{profileEmail}</span>
          </div>
          <nav className="profile-nav">
            <Link className="active" to="/profile">
              <Icon name="user" size={18} /> Profil ma’lumotlari
            </Link>
            <Link to="/orders">
              <Icon name="bag" size={18} /> Buyurtmalarim <b>2</b>
            </Link>
            <Link to="/?favorites=true">
              <Icon name="heart" size={18} /> Sevimlilarim
            </Link>
          </nav>
          <button
            type="button"
            className="profile-logout"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Chiqish
          </button>
        </aside>
        <section className="profile-content">
          <div className="profile-card">
            <div className="profile-card-title">
              <div>
                <h2>Shaxsiy ma’lumotlar</h2>
                <p>Ma’lumotlaringizni yangilab turing</p>
              </div>
              <button
                type="button"
                className="edit-button"
                onClick={() => {
                  setEditing((value) => !value);
                  setSaved(false);
                }}
              >
                {editing ? "Tahrirlashni bekor qilish" : "Tahrirlash"}
              </button>
            </div>
            <div className="profile-form">
              <label>
                Ism va familiya
                <input
                  value={profileDraft.name}
                  onChange={(event) =>
                    setProfileDraft({
                      ...profileDraft,
                      name: event.target.value,
                    })
                  }
                  disabled={!editing}
                />
              </label>
              <label>
                E-pochta manzili
                <input
                  value={profileDraft.email}
                  type="email"
                  onChange={(event) =>
                    setProfileDraft({
                      ...profileDraft,
                      email: event.target.value,
                    })
                  }
                  disabled={!editing}
                />
              </label>
              <label>
                Telefon raqam
                <input
                  value={profileDraft.phone}
                  onChange={(event) =>
                    setProfileDraft({
                      ...profileDraft,
                      phone: event.target.value,
                    })
                  }
                  disabled={!editing}
                />
              </label>
              <label>
                Tug‘ilgan sana
                <input
                  value={profileDraft.birthDate}
                  onChange={(event) =>
                    setProfileDraft({
                      ...profileDraft,
                      birthDate: event.target.value,
                    })
                  }
                  disabled={!editing}
                />
              </label>
            </div>
            {editing && (
              <button
                type="button"
                className="save-profile"
                onClick={() => {
                  updateProfile(profileDraft);
                  setEditing(false);
                  setSaved(true);
                }}
              >
                O‘zgarishlarni saqlash
              </button>
            )}
            {saved && <p className="profile-feedback">Ma’lumotlar saqlandi.</p>}
          </div>
          <div className="profile-card address-card">
            <div className="profile-card-title">
              <div>
                <h2>Yetkazib berish manzili</h2>
                <p>Buyurtmalar shu manzilga yuboriladi</p>
              </div>
              <button
                type="button"
                className="edit-button"
                onClick={() => {
                  setAddressDraft("");
                  setAddressForm(true);
                }}
              >
                + Yangi manzil
              </button>
            </div>
            {address ? (
              <div className="address-item">
                <span className="address-icon">
                  <Icon name="location" size={19} />
                </span>
                <span className="address-copy">
                  <strong>Uy manzili</strong>
                  <small>{address}</small>
                </span>
                <span className="address-actions-wrap">
                  <button
                    type="button"
                    className="address-more"
                    aria-label="Manzil amallari"
                    aria-expanded={addressMenuOpen}
                    onClick={() => setAddressMenuOpen((open) => !open)}
                  >
                    •••
                  </button>
                  {addressMenuOpen && (
                    <span className="address-actions-menu">
                      <button
                        type="button"
                        onClick={() => {
                          setAddressDraft(address);
                          setAddressForm(true);
                          setAddressMenuOpen(false);
                        }}
                      >
                        Tahrirlash
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAddress("");
                          setAddressMenuOpen(false);
                        }}
                      >
                        O‘chirish
                      </button>
                    </span>
                  )}
                </span>
              </div>
            ) : (
              <p className="profile-feedback">Manzil hali qo‘shilmagan.</p>
            )}
            {addressForm && (
              <form
                className="address-edit-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!addressDraft.trim()) return;
                  setAddress(addressDraft.trim());
                  setAddressForm(false);
                }}
              >
                <label>
                  Manzil
                  <input
                    autoFocus
                    value={addressDraft}
                    onChange={(event) => setAddressDraft(event.target.value)}
                    placeholder="Shahar, tuman, ko‘cha va uy raqami"
                    required
                  />
                </label>
                <button type="submit" className="save-profile">
                  Saqlash
                </button>
                <button
                  type="button"
                  className="edit-button"
                  onClick={() => setAddressForm(false)}
                >
                  Bekor qilish
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
