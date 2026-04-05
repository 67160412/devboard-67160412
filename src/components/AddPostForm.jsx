import { useState } from "react";

function AddPostForm({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    onAddPost({ title, body });
    setTitle("");
    setBody("");
  }

  // Challenge 2.1: คำนวณตัวอักษรที่เหลือและเงื่อนไขการเปลี่ยนสีแจ้งเตือน
  const charsLeft = 100 - title.length;
  const counterColor = charsLeft <= 10 ? "#e53e3e" : "#718096";

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1.5rem",
        background: "#f7fafc",
      }}
    >
      <h3 style={{ margin: "0 0 0.75rem", color: "#2d3748" }}>
        เพิ่มโพสต์ใหม่
      </h3>

      {/* Challenge 2.1: บังคับความยาวด้วย maxLength */}
      <input
        type="text"
        placeholder="หัวข้อโพสต์"
        value={title}
        maxLength={100}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "0.25rem",
          border: "1px solid #cbd5e0",
          borderRadius: "4px",
          fontSize: "1rem",
          boxSizing: "border-box",
        }}
      />

      {/* Challenge 2.1: แสดงตัวเลขบอกจำนวนตัวอักษรแบบ Real-time */}
      <div
        style={{
          textAlign: "right",
          fontSize: "0.8rem",
          color: counterColor,
          marginBottom: "0.75rem",
        }}
      >
        {title.length}/100
      </div>

      <textarea
        placeholder="เนื้อหาโพสต์"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "4px",
          fontSize: "1rem",
          resize: "vertical",
          boxSizing: "border-box",
        }}
      />

      <button
        type="submit"
        style={{
          background: "#1e40af",
          color: "white",
          border: "none",
          padding: "0.5rem 1.5rem",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        โพสต์
      </button>
    </form>
  );
}

export default AddPostForm;
