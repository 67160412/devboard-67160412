import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", padding: "5rem 1rem" }}>
      <h1 style={{ fontSize: "4rem", color: "#1e40af", margin: "0 0 1rem" }}>
        404
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#4a5568", marginBottom: "2rem" }}>
        ไม่พบหน้าที่คุณต้องการ
      </p>
      <Link
        to="/"
        style={{
          background: "#1e40af",
          color: "white",
          padding: "0.75rem 1.5rem",
          textDecoration: "none",
          borderRadius: "6px",
          fontWeight: "bold",
        }}
      >
        ← กลับหน้าหลัก
      </Link>
    </div>
  );
}

export default NotFoundPage;
