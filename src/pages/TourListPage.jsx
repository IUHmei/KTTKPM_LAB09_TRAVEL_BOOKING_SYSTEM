import { useEffect, useState } from "react";
import Header from "../components/Header";
import TourCard from "../components/TourCard";
import { getTours } from "../api/orchestratorApi";

function TourListPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTours = async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await getTours();
        setTours(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.response?.data?.message || "Không tải được danh sách tour.");
      } finally {
        setLoading(false);
      }
    };

    loadTours();
  }, []);

  return (
    <>
      <Header />
      <main className="page-shell">
        <section className="page-title">
          <p className="eyebrow">Tour hiện có</p>
          <h1>Chọn hành trình cho chuyến đi tiếp theo</h1>
        </section>

        {loading && <div className="status-box">Đang tải danh sách tour...</div>}
        {error && <div className="alert alert-error">{error}</div>}

        {!loading && !error && (
          <section className="tour-grid">
            {tours.length > 0 ? (
              tours.map((tour) => <TourCard key={tour.id} tour={tour} />)
            ) : (
              <div className="status-box">Hiện chưa có tour nào.</div>
            )}
          </section>
        )}
      </main>
    </>
  );
}

export default TourListPage;
