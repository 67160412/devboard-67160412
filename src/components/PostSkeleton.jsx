function PostSkeleton() {
  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        background: "#f7fafc",
        opacity: 0.7,
      }}
    >
      {/* กล่องหลอกหัวข้อโพสต์ */}
      <div
        style={{
          height: "1.5rem",
          background: "#cbd5e0",
          width: "60%",
          marginBottom: "0.5rem",
          borderRadius: "4px",
        }}
      ></div>
      {/* กล่องหลอกเนื้อหาบรรทัด 1 */}
      <div
        style={{
          height: "1rem",
          background: "#e2e8f0",
          width: "100%",
          marginBottom: "0.25rem",
          borderRadius: "4px",
        }}
      ></div>
      {/* กล่องหลอกเนื้อหาบรรทัด 2 */}
      <div
        style={{
          height: "1rem",
          background: "#e2e8f0",
          width: "80%",
          borderRadius: "4px",
        }}
      ></div>
    </div>
  );
}

export default PostSkeleton;
