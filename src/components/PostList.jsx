import { useState } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount";

function PostList({ posts, favorites, onToggleFavorite }) {
  const [search, setSearch] = useState("");

  // 🌟 Challenge 2: สร้าง State สำหรับเก็บรูปแบบการเรียง (desc = ใหม่สุดก่อน, asc = เก่าสุดก่อน)
  const [sortOrder, setSortOrder] = useState("desc");

  // กรองโพสต์ตามคำค้นหาก่อน
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  // 🌟 Challenge 2: นำโพสต์ที่กรองแล้ว มาเรียงลำดับ (Sort)
  // ใช้ [...filtered] เพื่อก๊อปปี้ Array ออกมาก่อน sort จะได้ไม่ไปกระทบข้อมูลต้นฉบับ
  const sortedAndFiltered = [...filtered].sort((a, b) => {
    // โพสต์ใหม่สุดจะมี id เยอะสุด (เพราะเราใช้ Date.now() สร้าง id ตอนเพิ่มโพสต์)
    if (sortOrder === "desc") {
      return b.id - a.id; // มากไปน้อย (ใหม่สุดก่อน)
    } else {
      return a.id - b.id; // น้อยไปมาก (เก่าสุดก่อน)
    }
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        <h2 style={{ color: "#2d3748", margin: 0 }}>โพสต์ล่าสุด</h2>

        {/* 🌟 Challenge 2: ปุ่มกดสลับการเรียงลำดับ */}
        <button
          onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          style={{
            background: "#edf2f7",
            border: "1px solid #cbd5e0",
            padding: "0.25rem 0.75rem",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        >
          {sortOrder === "desc" ? "🔽 ใหม่สุดก่อน" : "🔼 เก่าสุดก่อน"}
        </button>
      </div>

      <PostCount count={sortedAndFiltered.length} />

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

      {sortedAndFiltered.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      {/* เปลี่ยนมาใช้ตัวแปร sortedAndFiltered ที่ผ่านการเรียงลำดับแล้วมาแสดงผล */}
      {sortedAndFiltered.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          body={post.body}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
    </div>
  );
}

export default PostList;
