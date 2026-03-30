function PostSkeleton() {
  // สร้าง Array เปล่าๆ 3 ช่องเพื่อเอามาวนลูป
  const skeletons = [1, 2, 3];

  return (
    <>
      {skeletons.map((item) => (
        <div
          key={item}
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1rem",
            background: "white",
          }}
        >
          {/* ส่วนจำลอง Title */}
          <div
            style={{
              height: "24px",
              width: "60%",
              background: "#e2e8f0",
              borderRadius: "4px",
              marginBottom: "1rem",
            }}
          ></div>
          {/* ส่วนจำลอง Body บรรทัดที่ 1 */}
          <div
            style={{
              height: "16px",
              width: "100%",
              background: "#e2e8f0",
              borderRadius: "4px",
              marginBottom: "0.5rem",
            }}
          ></div>
          {/* ส่วนจำลอง Body บรรทัดที่ 2 */}
          <div
            style={{
              height: "16px",
              width: "80%",
              background: "#e2e8f0",
              borderRadius: "4px",
            }}
          ></div>
        </div>
      ))}
    </>
  );
}

export default PostSkeleton;
