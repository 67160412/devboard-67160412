import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import LoadingSpinner from "./LoadingSpinner";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ใช้ useEffect และ fetch ดึงข้อมูลตรงๆ โดยไม่พึ่ง useFetch
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลสมาชิก:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2
        style={{
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
          marginBottom: "1rem",
          color: "#2d3748",
        }}
      >
        รายชื่อสมาชิก
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {users.map((user) => (
          <UserCard key={user.id} name={user.name} email={user.email} />
        ))}
      </div>
    </div>
  );
}

export default UserList;
