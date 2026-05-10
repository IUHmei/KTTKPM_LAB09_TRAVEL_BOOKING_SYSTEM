import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <header className="app-header">
      <Link className="brand" to="/tours">
        <span className="brand-mark">TB</span>
        <span>Travel Booking System</span>
      </Link>

      <div className="user-area">
        {user && <span className="user-name">Xin chào, {user.fullName || user.username}</span>}
        <button className="btn btn-outline" type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
