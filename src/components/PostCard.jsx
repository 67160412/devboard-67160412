import { useState } from "react";
import CommentList from "./CommentList"; // ⚠️ ต้องสร้างไฟล์ CommentList (Activity 3) ก่อนนะครับ

function PostCard({ post, isFavorite, onToggleFavorite }) {
  // State สำหรับเปิด/ปิด การแสดงความคิดเห็น
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
      {/* ดึง title และ body มาจาก object post */}
      <h3 style={{ margin: "0 0 0.5rem", color: "#1e40af" }}>{post.title}</h3>
      <p style={{ margin: "0 0 0.75rem", color: "#4a5568", lineHeight: 1.6 }}>
        {post.body}
      </p>

      {/* จับปุ่มทั้ง 2 อันมาใส่ div เดียวกันแล้วเรียงเป็นแนวนอน (Flex) */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {/* ปุ่มถูกใจ (ของเดิม) */}
        <button
          onClick={onToggleFavorite}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem", // ปรับขนาดตัวอักษรลงนิดหน่อยให้เข้ากับปุ่มคอมเมนต์
            padding: "0.25rem 0.5rem",
            borderRadius: "4px",
            color: isFavorite ? "#e53e3e" : "#a0aec0",
          }}
        >
          {isFavorite ? "❤️ ถูกใจแล้ว" : "🤍 ถูกใจ"}
        </button>

        {/* ปุ่มดูความคิดเห็น (ของใหม่) */}
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

      {/* ถ้า showComments เป็น true ถึงจะแสดง Component นี้ และส่ง id โพสต์ไปหาข้อมูล */}
      {showComments && <CommentList postId={post.id} />}
    </div>
  );
}

export default PostCard;
