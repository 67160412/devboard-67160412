import PostList from "../components/PostList";
import AddPostForm from "../components/AddPostForm";

function HomePage() {
  const handleAddPost = (newPost) => {
    console.log("ข้อมูลที่ต้องการเพิ่ม:", newPost);
    alert(`ระบบได้รับโพสต์ใหม่แล้ว! (โหมดจำลอง)\nหัวข้อ: ${newPost.title}`);

    // หมายเหตุ: เนื่องจากเราใช้ Fake API ของ JSONPlaceholder
    // โพสต์ใหม่จะไม่ถูกบันทึกลงฐานข้อมูลจริงและจะไม่ไปโผล่ในหน้ารวมโพสต์นะครับ
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      <AddPostForm onAddPost={handleAddPost} />
      <PostList />
    </div>
  );
}

export default HomePage;
