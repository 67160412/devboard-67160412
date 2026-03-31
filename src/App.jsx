import { useState } from "react";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import UserList from "./components/UserList";
import AddPostForm from "./components/AddPostForm";

function App() {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  function handleToggleFavorite(postId) {
    setFavorites((prev) => {
      const newFavorites = prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId];

      localStorage.setItem("favorites", JSON.stringify(newFavorites));

      return newFavorites;
    });
  }

  return (
    <div>
      <Navbar favoriteCount={favorites.length} />

      <div
        style={{
          maxWidth: "900px",
          margin: "2rem auto",
          padding: "0 1rem",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
        }}
      >
        {/* คอลัมน์ซ้าย */}
        <div>
          <AddPostForm onAddPost={() => {}} />

          <PostList
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>

        {/* คอลัมน์ขวา */}
        <div>
          <UserList />
        </div>
      </div>
    </div>
  );
}

export default App;
