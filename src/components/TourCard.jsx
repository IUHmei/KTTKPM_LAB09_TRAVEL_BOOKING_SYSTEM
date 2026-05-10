import { useNavigate } from "react-router-dom";

const fallbackImage =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80";

function TourCard({ tour }) {
  const navigate = useNavigate();
  const description =
    tour.description?.length > 120 ? `${tour.description.slice(0, 120)}...` : tour.description;

  return (
    <article className="tour-card">
      <img className="tour-image" src={tour.image || fallbackImage} alt={tour.name} />
      <div className="tour-card-body">
        <div>
          <h3>{tour.name}</h3>
          <p className="muted">{description || "Chưa có mô tả cho tour này."}</p>
        </div>

        <div className="tour-meta">
          <span>{Number(tour.price || 0).toLocaleString("vi-VN")} đ</span>
          <span>{tour.availableSeats ?? 0} chỗ còn lại</span>
        </div>

        <div className="card-actions">
          <button className="btn btn-outline" type="button" onClick={() => navigate(`/tours/${tour.id}`)}>
            Xem chi tiết
          </button>
          <button className="btn btn-primary" type="button" onClick={() => navigate(`/booking/${tour.id}`)}>
            Đặt tour
          </button>
        </div>
      </div>
    </article>
  );
}

export default TourCard;
