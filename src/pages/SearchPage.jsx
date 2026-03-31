import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import PostCard from "../components/PostCard";
import LoadingSpinner from "../components/LoadingSpinner";

function SearchPage() {
  // 🌟 ใช้ useSearchParams เพื่ออ่านค่าหลัง ?q= ใน URL
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || ""; // ถ้าไม่มีให้เป็นค่าว่าง

  // ดึงข้อมูลโพสต์ทั้งหมดมาเตรียมไว้
  const {
    data: posts,
    loading,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/posts");

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <p style={{ color: "#c53030", textAlign: "center" }}>
        เกิดข้อผิดพลาด: {error}
      </p>
    );

  // กรองโพสต์ที่มีคำค้นหาอยู่ใน title หรือ body
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(q.toLowerCase()) ||
      post.body.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
          marginBottom: "1.5rem",
        }}
      >
        🔍 ผลการค้นหาสำหรับ: "{q}"
      </h2>

      {filteredPosts.length === 0 ? (
        <p style={{ color: "#718096", textAlign: "center", marginTop: "2rem" }}>
          ไม่พบโพสต์ที่ตรงกับคำค้นหา
        </p>
      ) : (
        filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}

export default SearchPage;
