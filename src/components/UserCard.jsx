function UserCard({ name, email }) {
  const initials = name.charAt(0).toUpperCase();

  // Challenge 1.2: อัลกอริทึมคำนวณรหัสสีจากตัวอักษรแรก
  const charCode = name.charCodeAt(0);
  const colors = ["#1e40af", "#047857", "#6b21a8", "#b91c1c", "#d97706"];
  const avatarColor = colors[charCode % colors.length];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "0.75rem 1rem",
        marginBottom: "0.75rem",
        background: "white",
      }}
    >
      {/* Challenge 1.2: นำสีที่คำนวณได้มาใช้งานที่ background */}
      <div
        style={{
          width: "40px",
          height: "40px",
          background: avatarColor,
          color: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
      >
        {initials}
      </div>
      <div>
        <div style={{ fontWeight: "bold", color: "#2d3748" }}>{name}</div>
        <div style={{ fontSize: "0.85rem", color: "#718096" }}>{email}</div>
      </div>
    </div>
  );
}

export default UserCard;
