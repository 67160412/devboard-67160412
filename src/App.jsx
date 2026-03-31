import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";
import ProfilePage from "./pages/ProfilePage";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  return (
    // 🌟 1. ครอบทุกอย่างด้วย FavoritesProvider เพื่อให้ทุกหน้าใช้ Context ได้
    <FavoritesProvider>
      // 🌟 2. ครอบด้วย BrowserRouter เพื่อเปิดใช้งานระบบเปลี่ยนหน้า (Routing)
      <BrowserRouter>
        <Navbar />

        {/* 🌟 3. Routes คือตัวกำหนดว่า URL ไหน ให้แสดงผลหน้าอะไร */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
