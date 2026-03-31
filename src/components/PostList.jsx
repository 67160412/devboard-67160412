import { useState } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount";
import LoadingSpinner from "./LoadingSpinner";
import useFetch from "../hooks/useFetch";

// 🌟 1. ลบ { favorites, onToggleFavorite } ออกจากวงเล็บ เพราะเราไม่ได้รับผ่าน props แล้ว
function PostList() {
  const {
    data: allPosts,
    loading,
    error,
    refetch: fetchPosts,
  } = useFetch("https://jsonplaceholder.typicode.com/posts");

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const posts = allPosts.slice(0, 20);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedAndFiltered.slice(
    indexOfFirstPost,
    indexOfLastPost,
  );

  const totalPages = Math.ceil(sortedAndFiltered.length / postsPerPage);

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
        <div style={{ display: "flex", gap: "0.5rem" }}>
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
            onClick={() => {
              setSortOrder(sortOrder === "desc" ? "asc" : "desc");
              setCurrentPage(1);
            }}
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
        onChange={handleSearchChange}
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
          {currentPosts.length === 0 && (
            <p
              style={{
                color: "#718096",
                textAlign: "center",
                padding: "2rem",
              }}
            >
              ไม่พบโพสต์ที่ค้นหา
            </p>
          )}

          {currentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}

          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                marginTop: "1.5rem",
                padding: "1rem 0",
              }}
            >
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  border: "1px solid #cbd5e0",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  opacity: currentPage === 1 ? 0.5 : 1,
                }}
              >
                ← ก่อนหน้า
              </button>

              <span style={{ fontWeight: "bold", color: "#4a5568" }}>
                หน้า {currentPage} / {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  border: "1px solid #cbd5e0",
                  cursor:
                    currentPage === totalPages ? "not-allowed" : "pointer",
                  opacity: currentPage === totalPages ? 0.5 : 1,
                }}
              >
                ถัดไป →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PostList;
