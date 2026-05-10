import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { getTourById } from "../api/orchestratorApi";

const fallbackImage =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80";

function TourDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTour = async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await getTourById(id);
        setTour(data);
      } catch (err) {
        setError(err.response?.data?.message || "Không tải được chi tiết tour.");
      } finally {
        setLoading(false);
      }
    };

    loadTour();
  }, [id]);

  return (
    <>
      <Header />
      <main className="page-shell">
        {loading && <div className="status-box">Đang tải chi tiết tour...</div>}
        {error && <div className="alert alert-error">{error}</div>}

        {!loading && tour && (
          <section className="detail-layout">
            <img className="detail-image" src={tour.image || fallbackImage} alt={tour.name} />
            <div className="detail-content">
              <p className="eyebrow">Chi tiết tour</p>
              <h1>{tour.name}</h1>
              <p className="detail-description">{tour.description || "Chưa có mô tả cho tour này."}</p>

              <div className="detail-stats">
                <div>
                  <span>Giá tour</span>
                  <strong>{Number(tour.price || 0).toLocaleString("vi-VN")} đ</strong>
                </div>
                <div>
                  <span>Chỗ còn lại</span>
                  <strong>{tour.availableSeats ?? 0}</strong>
                </div>
              </div>

              <div className="form-actions">
                <button className="btn btn-outline" type="button" onClick={() => navigate("/tours")}>
                  Quay lại
                </button>
                <button className="btn btn-primary" type="button" onClick={() => navigate(`/booking/${tour.id}`)}>
                  Đặt tour
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default TourDetailPage;
