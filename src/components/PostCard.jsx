import { useState } from "react";
import { Link } from "react-router-dom"; // ⚠️ อิมพอร์ต Link มาใช้เปลี่ยนหน้า
import { useFavorites } from "../context/FavoritesContext"; // ⚠️ อิมพอร์ต Context
import CommentList from "./CommentList";

// ⚠️ ไม่ต้องรับ props isFavorite, onToggleFavorite แล้ว (รับแค่ post อย่างเดียว)
function PostCard({ post }) {
  // ดึงข้อมูลการกดถูกใจมาจาก Context โดยตรง!
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(post.id);

  const [showComments, setShowComments] = useState(false);

  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        background: "white",
      }}
    >
      <h3 style={{ margin: "0 0 0.5rem" }}>
        {/* 🌟 จุดสำคัญ: ครอบชื่อโพสต์ด้วย Link เพื่อเปลี่ยนหน้าไปที่ /posts/เลขID */}
        <Link
          to={`/posts/${post.id}`}
          style={{ color: "#1e40af", textDecoration: "none" }}
        >
          {post.title}
        </Link>
      </h3>
      <p style={{ margin: "0 0 0.75rem", color: "#4a5568", lineHeight: 1.6 }}>
        {post.body}
      </p>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        {/* ปุ่มถูกใจ */}
        <button
          onClick={() => toggleFavorite(post.id)} // ⚠️ เรียกใช้ฟังก์ชันจาก Context
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            padding: "0.25rem 0.5rem",
            borderRadius: "4px",
            color: isFavorite ? "#e53e3e" : "#a0aec0",
          }}
        >
          {isFavorite ? "❤️ ถูกใจแล้ว" : "🤍 ถูกใจ"}
        </button>

        {/* ปุ่มดูความคิดเห็น */}
        <button
          onClick={() => setShowComments((prev) => !prev)}
          style={{
            background: "none",
            border: "1px solid #e2e8f0",
            cursor: "pointer",
            fontSize: "0.9rem",
            padding: "0.25rem 0.75rem",
            borderRadius: "4px",
            color: "#4a5568",
          }}
        >
          {showComments ? "▲ ซ่อน" : "▼ ดูความคิดเห็น"}
        </button>
      </div>

      {showComments && <CommentList postId={post.id} />}
    </div>
  );
}

export default PostCard;
