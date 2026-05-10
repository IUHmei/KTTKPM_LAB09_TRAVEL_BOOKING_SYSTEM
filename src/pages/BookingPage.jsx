import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { bookTour, getTourById } from "../api/orchestratorApi";

function BookingPage() {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const [tour, setTour] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [bookingResult, setBookingResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const totalAmount = useMemo(() => Number(tour?.price || 0) * Number(quantity || 0), [tour, quantity]);

  useEffect(() => {
    const loadTour = async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await getTourById(tourId);
        setTour(data);
      } catch (err) {
        setError(err.response?.data?.message || "Không tải được thông tin tour.");
      } finally {
        setLoading(false);
      }
    };

    loadTour();
  }, [tourId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setBookingResult(null);

    if (!currentUser?.id) {
      setError("Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.");
      return;
    }

    if (quantity < 1) {
      setError("Số lượng người phải lớn hơn 0.");
      return;
    }

    try {
      setSubmitting(true);
      const { data } = await bookTour({
        userId: currentUser.id,
        tourId: tour.id,
        quantity: Number(quantity),
        paymentMethod,
      });

      if (!data?.success) {
        setError(data?.message || "Thanh toán thất bại, vui lòng thử lại.");
        return;
      }

      setBookingResult(data.booking);
    } catch (err) {
      setError(err.response?.data?.message || "Thanh toán thất bại, vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="page-shell">
        {loading && <div className="status-box">Đang tải thông tin đặt tour...</div>}
        {error && <div className="alert alert-error">{error}</div>}

        {!loading && tour && (
          <section className="booking-layout">
            <div className="booking-summary">
              <p className="eyebrow">Đặt tour</p>
              <h1>{tour.name}</h1>
              <p className="muted">{tour.description || "Chưa có mô tả cho tour này."}</p>
              <div className="summary-row">
                <span>Giá mỗi người</span>
                <strong>{Number(tour.price || 0).toLocaleString("vi-VN")} đ</strong>
              </div>
              <div className="summary-row">
                <span>Chỗ còn lại</span>
                <strong>{tour.availableSeats ?? 0}</strong>
              </div>
            </div>

            <form className="booking-form" onSubmit={handleSubmit}>
              <label htmlFor="quantity">Số lượng người</label>
              <input
                id="quantity"
                min="1"
                max={tour.availableSeats || undefined}
                type="number"
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
              />

              <label htmlFor="paymentMethod">Phương thức thanh toán</label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(event) => setPaymentMethod(event.target.value)}
              >
                <option value="CASH">CASH</option>
                <option value="BANKING">BANKING</option>
                <option value="MOMO">MOMO</option>
              </select>

              <div className="total-box">
                <span>Tổng tiền</span>
                <strong>{totalAmount.toLocaleString("vi-VN")} đ</strong>
              </div>

              <div className="form-actions">
                <button className="btn btn-outline" type="button" onClick={() => navigate(-1)}>
                  Quay lại
                </button>
                <button className="btn btn-primary" type="submit" disabled={submitting}>
                  {submitting ? "Đang đặt tour..." : "Xác nhận đặt tour"}
                </button>
              </div>

              {bookingResult && (
                <div className="alert alert-success">
                  <strong>Đặt tour thành công!</strong>
                  <span>Mã booking: {bookingResult.bookingId}</span>
                  <span>Trạng thái: {bookingResult.status}</span>
                  <span>Tổng tiền: {Number(bookingResult.totalAmount || totalAmount).toLocaleString("vi-VN")} đ</span>
                </div>
              )}
            </form>
          </section>
        )}
      </main>
    </>
  );
}

export default BookingPage;
