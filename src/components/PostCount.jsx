function PostCount({ count }) {
  return (
    <div style={{ marginBottom: "1rem", color: "#4a5568", fontSize: "0.9rem" }}>
      โพสต์ทั้งหมด: <strong>{count}</strong> รายการ
    </div>
  );
}

export default PostCount;
