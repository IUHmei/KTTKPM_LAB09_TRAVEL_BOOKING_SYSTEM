import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../api/orchestratorApi";

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const currentUser = localStorage.getItem("user");

  if (currentUser) {
    return <Navigate to="/tours" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.username.trim() || !form.password.trim()) {
      setError("Vui lòng nhập đầy đủ username và password.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await login(form);

      if (!data?.success || !data?.user) {
        setError(data?.message || "Đăng nhập thất bại.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/tours", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Không thể đăng nhập. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="login-copy">
          <p className="eyebrow">Orchestration-Driven SOA</p>
          <h1>Travel Booking System</h1>
          <p>Đăng nhập để xem tour, kiểm tra chỗ trống và đặt tour qua Orchestrator Service.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="user1"
            value={form.username}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="123456"
            value={form.password}
            onChange={handleChange}
          />

          {error && <div className="alert alert-error">{error}</div>}

          <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
