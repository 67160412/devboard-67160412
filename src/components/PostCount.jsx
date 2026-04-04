function PostCount({ count }) {
  return (
    <div
      style={{
        background: "#ebf8ff",
        color: "#2b6cb0",
        padding: "0.5rem 1rem",
        borderRadius: "20px",
        display: "inline-block",
        fontWeight: "bold",
        marginBottom: "1rem",
        fontSize: "0.9rem",
      }}
    >
      📝 จำนวนโพสต์ทั้งหมด: {count} โพสต์
    </div>
  );
}

export default PostCount;
