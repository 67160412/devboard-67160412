import { Link, useNavigate } from "react-router-dom"; // 🌟 นำ useNavigate มาใช้เปลี่ยนหน้า
import { useFavorites } from "../context/FavoritesContext";
import { useState } from "react";

function Navbar() {
  const { favorites } = useFavorites();
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  // 🌟 เมื่อกด Enter ในช่องค้นหา ให้เปลี่ยนหน้าไปที่ /search?q=คำค้นหา
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${searchInput}`);
      setSearchInput(""); // ล้างช่องค้นหาหลังกด Enter
    }
  };

  return (
    <nav
      style={{
        background: "#1e40af",
        color: "white",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>DevBoard</h1>
      </Link>

      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        {/* 🌟 ฟอร์มช่องค้นหาใน Navbar */}
        <form
          onSubmit={handleSearch}
          style={{ display: "flex", gap: "0.25rem" }}
        >
          <input
            type="text"
            placeholder="ค้นหาโพสต์..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={{
              padding: "0.25rem 0.5rem",
              borderRadius: "4px",
              border: "none",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              cursor: "pointer",
              border: "none",
              background: "white",
              borderRadius: "4px",
            }}
          >
            🔍
          </button>
        </form>

        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          หน้าหลัก
        </Link>
        <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>
          สมาชิก
        </Link>
        <Link
          to="/favorites"
          style={{
            color: "white",
            textDecoration: "none",
            background: favorites.length > 0 ? "#e53e3e" : "transparent",
            padding: "0.25rem 0.75rem",
            borderRadius: "20px",
            fontSize: "0.9rem",
          }}
        >
          ❤️ ถูกใจ {favorites.length > 0 && `(${favorites.length})`}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
