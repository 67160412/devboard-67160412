import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount";
import LoadingSpinner from "./LoadingSpinner";

function PostList({ favorites, onToggleFavorite }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  // 🌟 Challenge 1: แยกฟังก์ชันดึงข้อมูลออกมาไว้ข้างนอก useEffect
  // เพื่อให้ปุ่ม "โหลดใหม่" สามารถเรียกใช้งานได้ด้วย
  async function fetchPosts() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");
      const data = await res.json();
      setPosts(data.slice(0, 20));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // เรียกใช้ครั้งแรกตอนโหลดหน้าเว็บ
  useEffect(() => {
    fetchPosts();
  }, []);

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedAndFiltered = [...filtered].sort((a, b) => {
    if (sortOrder === "desc") {
      return b.id - a.id;
    } else {
      return a.id - b.id;
    }
  });

  return (
    <div>
      {/* ส่วนหัวข้อและปุ่มจัดการต่างๆ */}
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

        {/* จัดกลุ่มปุ่มให้อยู่ด้วยกัน */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {/* 🌟 Challenge 1: ปุ่มโหลดใหม่ที่เรียกใช้ฟังก์ชัน fetchPosts */}
          <button
            onClick={fetchPosts}
            style={{
              background: "white",
              border: "1px solid #cbd5e0",
              padding: "0.25rem 0.75rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            🔄 โหลดใหม่
          </button>

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

      {/* 🌟 ย้ายการเช็ค Loading และ Error มาไว้ตรงนี้ เพื่อให้กรอบด้านบนยังคงอยู่เวลาโหลด */}
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div
          style={{
            padding: "1.5rem",
            background: "#fff5f5",
            border: "1px solid #fc8181",
            borderRadius: "8px",
            color: "#c53030",
          }}
        >
          เกิดข้อผิดพลาด: {error}
        </div>
      ) : (
        <>
          {sortedAndFiltered.length === 0 && (
            <p
              style={{ color: "#718096", textAlign: "center", padding: "2rem" }}
            >
              ไม่พบโพสต์ที่ค้นหา
            </p>
          )}

          {sortedAndFiltered.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isFavorite={favorites.includes(post.id)}
              onToggleFavorite={() => onToggleFavorite(post.id)}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default PostList;
