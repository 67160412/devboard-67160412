import { useState, useEffect } from "react";

// 🌟 Challenge 3: สร้าง Custom Hook รับค่า URL เข้ามา
function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ฟังก์ชันดึงข้อมูล (เอาไว้ให้ภายนอกเรียกซ้ำได้ด้วย เช่น ปุ่มโหลดใหม่)
  async function fetchData() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(url);
      if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");
      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // ดึงข้อมูลอัตโนมัติเมื่อ URL มีการเปลี่ยนแปลงหรือโหลดครั้งแรก
  useEffect(() => {
    fetchData();
  }, [url]);

  // ส่งคืนค่าต่างๆ เพื่อให้ Component อื่นนำไปใช้งานต่อได้
  return { data, loading, error, refetch: fetchData };
}

export default useFetch;
