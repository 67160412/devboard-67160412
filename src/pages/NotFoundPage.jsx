import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 2rem",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "6rem",
          color: "#cbd5e0",
          margin: "0 0 1rem 0",
          lineHeight: "1",
        }}
      >
        404
      </h1>
      <h2 style={{ color: "#2d3748", marginBottom: "0.5rem" }}>
        โอ๊ะโอ! ไม่พบหน้าที่คุณค้นหา
      </h2>
      <p style={{ color: "#718096", marginBottom: "2rem" }}>
        ดูเหมือนว่า URL นี้จะไม่มีอยู่จริง หรืออาจจะถูกลบไปแล้วครับ
      </p>

      {/* ปุ่มพากลับหน้าหลักโดยใช้ Link ของ react-router-dom */}
      <Link
        to="/"
        style={{
          background: "#1e40af",
          color: "white",
          textDecoration: "none",
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
      >
        🏠 กลับสู่หน้าหลัก
      </Link>
    </div>
  );
}

export default NotFoundPage;
