import { useState, useEffect } from "react";
import PostCard from "./PostCard";
// Challenge 1.1: นำเข้า PostCount
import PostCount from "./PostCount";
// Challenge 1.3: นำเข้า PostSkeleton
import PostSkeleton from "./PostSkeleton";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Challenge 2.2: State สำหรับควบคุมการเรียงลำดับ (desc/asc)
  const [sortOrder, setSortOrder] = useState("desc");

  // Challenge 3.2: State สำหรับควบคุมระบบแบ่งหน้า (Pagination)
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Challenge 3.1: แยกฟังก์ชันสำหรับดึงข้อมูล เพื่อให้เรียกซ้ำได้
  const fetchPosts = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");
        return res.json();
      })
      .then((data) => {
        // Challenge 3.2: เก็บข้อมูลทั้งหมดโดยไม่ต้องหั่น เพื่อให้มีข้อมูลพอสำหรับแบ่งหน้า
        setPosts(data.slice(0, 100));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Challenge 3.1: ฟังก์ชันสำหรับปุ่มโหลดใหม่โดยเฉพาะ
  const handleManualRefresh = () => {
    setLoading(true);
    setError(null);
    // Challenge 3.2: เมื่อโหลดข้อมูลใหม่ ให้รีเซ็ตกลับมาที่หน้าแรกเสมอ
    setCurrentPage(1);
    fetchPosts();
  };

  // Challenge 2.2: คัดลอกและจัดเรียงข้อมูลโพสต์ตามเงื่อนไข
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOrder === "desc") {
      return b.id - a.id;
    } else {
      return a.id - b.id;
    }
  });

  // Challenge 3.2: คำนวณช่วงข้อมูลที่จะนำมาแสดงในแต่ละหน้า (ตัดจากที่จัดเรียงแล้ว)
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Challenge 3.2: ฟังก์ชันสำหรับเปลี่ยนหน้า (ก่อนหน้า / ถัดไป)
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

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
        {/* Challenge 3.2: อัปเดตหัวข้อให้แสดงหมายเลขหน้าปัจจุบัน */}
        <h2 style={{ margin: 0, color: "#dddfe4" }}>
          โพสต์ล่าสุด (หน้า {currentPage})
        </h2>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          {/* Challenge 3.1: ปุ่มโหลดข้อมูลใหม่ */}
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

          {/* Challenge 2.2: ปุ่มสลับการจัดเรียงโพสต์ */}
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

      {/* Challenge 1.1: แสดงจำนวนโพสต์ทั้งหมดเมื่อข้อมูลโหลดเสร็จ */}
      {!loading && <PostCount count={posts.length} />}

      {/* Challenge 1.3: แสดงกล่อง Skeleton ระหว่างที่ loading เป็น true */}
      {loading ? (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : (
        // Challenge 3.2: เปลี่ยนมาใช้ currentPosts เพื่อแสดงข้อมูลเฉพาะหน้าปัจจุบัน
        currentPosts.map((post) => <PostCard key={post.id} post={post} />)
      )}

      {/* Challenge 3.2: ชุดปุ่มควบคุมการแบ่งหน้า (Pagination Controls) */}
      {!loading && posts.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "1.5rem",
          }}
        >
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              border: "1px solid #cbd5e0",
              background: currentPage === 1 ? "#edf2f7" : "#fff",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              color: currentPage === 1 ? "#a0aec0" : "#4a5568",
              fontWeight: "bold",
            }}
          >
            ◀ ก่อนหน้า
          </button>

          <span
            style={{
              display: "flex",
              alignItems: "center",
              color: "#d6dde7",
              fontWeight: "bold",
            }}
          >
            หน้า {currentPage}
          </span>

          <button
            onClick={nextPage}
            disabled={indexOfLastPost >= posts.length}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              border: "1px solid #cbd5e0",
              background: indexOfLastPost >= posts.length ? "#edf2f7" : "#fff",
              cursor:
                indexOfLastPost >= posts.length ? "not-allowed" : "pointer",
              color: indexOfLastPost >= posts.length ? "#a0aec0" : "#4a5568",
              fontWeight: "bold",
            }}
          >
            ถัดไป ▶
          </button>
        </div>
      )}
    </div>
  );
}

export default PostList;
