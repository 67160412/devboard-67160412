function UserCard({ name, email }) {
  // ดึงตัวอักษรแรกมาทำ avatar
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  // Logic สุ่มสี: แปลงตัวอักษรแรกเป็นรหัสตัวเลข แล้วหารเอาเศษด้วย 3
  const charCode = name.charCodeAt(0);
  const colorIndex = charCode % 3;

  // กำหนดชุดสี: 0=น้ำเงิน, 1=เขียว, 2=ม่วง
  const colors = ["#1e40af", "#047857", "#6b21a8"];
  const avatarColor = colors[colorIndex];
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
      <div
        style={{
          width: "40px",
          height: "40px",
          background: avatarColor, // <--- เปลี่ยนตรงนี้
          color: "white",
          borderRadius: "50%",
          display: "flex",

          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "0.9rem",
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
