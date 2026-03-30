import { useState } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount"; // ยังคงเก็บ PostCount ของคุณไว้

function PostList({ posts, favorites, onToggleFavorite }) {
  // สร้าง state สำหรับเก็บข้อความที่พิมพ์ในช่องค้นหา
  const [search, setSearch] = useState("");

  // กรองโพสต์ตามคำค้นหา (ถ่า search ว่างเปล่า มันจะแสดงทั้งหมดปกติ)
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        โพสต์ล่าสุด
      </h2>

      {/* อัปเดต PostCount ให้แสดงจำนวนโพสต์ที่ค้นหาเจอ (แบบ Real-time) */}
      <PostCount count={filtered.length} />

      {/* ช่อง Search Input */}
      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          fontSize: "1rem",
          marginBottom: "1rem",
          boxSizing: "border-box",
        }}
      />

      {/* ถ้าพิมพ์หาแล้วไม่เจอโพสต์เลย ให้แสดงข้อความนี้ */}
      {filtered.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      {/* แสดงรายการโพสต์ (เปลี่ยนมาวนลูปจากตัวแปร filtered แทน posts) */}
      {filtered.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          body={post.body}
          isFavorite={favorites.includes(post.id)} // ตรวจสอบว่าโพสต์นี้ถูกใจหรือยัง
          onToggleFavorite={() => onToggleFavorite(post.id)} // ฟังก์ชันกดถูกใจ
        />
      ))}
    </div>
  );
}

export default PostList;
