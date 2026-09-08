function Header({ title, subtitle }) {
  return (
    <header className="top-header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="header-actions">
        <button
          className="icon-button"
          type="button"
        >
          🔔
        </button>

        <div className="profile">
          <div className="avatar">
            Y
          </div>

          <div>
            <strong>
              Yaswanth
            </strong>

            <span>
              IT Administrator
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;