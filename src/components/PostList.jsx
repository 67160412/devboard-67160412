import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount";
import PostSkeleton from "./PostSkeleton";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sortOrder, setSortOrder] = useState("desc");

  // 🌟 ฟังก์ชันนี้ทำหน้าที่ดึง API ล้วนๆ (เปลี่ยน State เฉพาะตอนได้ข้อมูลกลับมาแล้ว ซึ่งทำได้ปกติ)
  const fetchPosts = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");
        return res.json();
      })
      .then((data) => {
        setPosts(data.slice(0, 20));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  // โหลดครั้งแรกตอนเปิดเว็บ (ไม่มีการตั้งค่า State ซ้ำซ้อนให้ Linter บ่นแล้ว)
  useEffect(() => {
    fetchPosts();
  }, []);

  // 🌟 ฟังก์ชันใหม่สำหรับ "ปุ่มกด" โดยเฉพาะ (การเปลี่ยน State ทันทีใน Event เป็นสิ่งที่ถูกต้องตามหลัก React)
  const handleManualRefresh = () => {
    setLoading(true); // โชว์ Skeleton หน้าโหลด
    setError(null); // เคลียร์ Error เก่า
    fetchPosts(); // สั่งดึงข้อมูลใหม่
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOrder === "desc") {
      return b.id - a.id;
    } else {
      return a.id - b.id;
    }
  });

  if (error) {
    return (
      <div style={{ padding: "1rem", background: "#fff5f5", color: "#c53030" }}>
        เกิดข้อผิดพลาด: {error}
      </div>
    );
  }

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
        <h2 style={{ margin: 0, color: "#2d3748" }}>โพสต์ล่าสุด</h2>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          {/* 🌟 3.1 Challenge: เปลี่ยนมาเรียกใช้ฟังก์ชัน handleManualRefresh แทน */}
          <button
            onClick={handleManualRefresh}
            style={{
              background: "#ebf8ff",
              border: "1px solid #90cdf4",
              padding: "0.25rem 0.75rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.9rem",
              color: "#2b6cb0",
              fontWeight: "bold",
            }}
          >
            🔄 โหลดใหม่
          </button>

          <button
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            style={{
              background: "#f7fafc",
              border: "1px solid #cbd5e0",
              padding: "0.25rem 0.75rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.9rem",
              color: "#4a5568",
            }}
          >
            {sortOrder === "desc" ? "🔽 ใหม่สุดก่อน" : "🔼 เก่าสุดก่อน"}
          </button>
        </div>
      </div>

      {!loading && <PostCount count={posts.length} />}

      {loading ? (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : (
        sortedPosts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}

export default PostList;
