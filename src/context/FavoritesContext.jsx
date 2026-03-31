import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  // 🌟 Challenge 3: ตอนเริ่มต้น ให้ไปแอบดูใน localStorage ก่อนว่ามีของเดิมไหม
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    // ถ้ามีให้แปลงกลับเป็น Array ถ้าไม่มีให้ใช้ Array ว่าง []
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // 🌟 Challenge 3: ใช้ useEffect เพื่อคอยเฝ้าดูว่าถ้า favorites เปลี่ยนแปลงเมื่อไหร่
  // ให้เอาค่าใหม่ไปเซฟทับใน localStorage อัตโนมัติทันที!
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(postId) {
    setFavorites((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId],
    );
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
  return useContext(FavoritesContext);
}
