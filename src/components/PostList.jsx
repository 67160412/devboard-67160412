import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount";
import LoadingSpinner from "./LoadingSpinner"; // อย่าลืมสร้างไฟล์นี้นะครับ (Activity 1)

function PostList({ favorites, onToggleFavorite }) {
  // 1. State สำหรับเก็บข้อมูลจาก API, สถานะโหลด, และ Error
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. State เดิมของระบบค้นหาและเรียงลำดับ (Challenge 2)
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  // 3. useEffect ดึงข้อมูลจาก API ทันทีที่โหลด Component นี้
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");
        const data = await res.json();
        setPosts(data.slice(0, 20)); // เอาแค่ 20 รายการแรกตามโจทย์
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []); // [] หมายถึงให้ทำแค่ครั้งเดียวตอนโหลดหน้าเว็บ

  // 4. กรองโพสต์และเรียงลำดับ (เหมือนเดิมที่คุณทำไว้)
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

  // 5. แสดงหน้าจอ Loading ตอนที่กำลังดึงข้อมูล
  if (loading) return <LoadingSpinner />;

  // 6. แสดงหน้าจอ Error ถ้าดึงข้อมูลพัง
  if (error)
    return (
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
    );

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

      {sortedAndFiltered.map((post) => (
        <PostCard
          key={post.id}
          post={post} // ⚠️ อัปเดตใหม่ตาม Task 3: ส่งข้อมูลไปทั้งก้อน post={post}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
    </div>
  );
}

export default PostList;
