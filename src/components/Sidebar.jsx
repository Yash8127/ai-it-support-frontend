function Sidebar({
  activePage,
  setActivePage,
  ticketCount,
}) {
  return (
    <aside className="sidebar">

      {/* BRAND */}
      <div className="brand">
        <div className="brand-icon">
          🤖
        </div>

        <div>
          <h2>AI IT Support</h2>
          <span>Service Management</span>
        </div>
      </div>

      {/* MAIN MENU */}
      <div className="menu-section">

        <p className="menu-title">
          MAIN MENU
        </p>

        <button
          className={`menu-item ${
            activePage === "dashboard"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActivePage("dashboard")
          }
        >
          <span>▦</span>
          Dashboard
        </button>

        <button
          className={`menu-item ${
            activePage === "tickets"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActivePage("tickets")
          }
        >
          <span>▤</span>
          Tickets

          <span className="menu-count">
            {ticketCount}
          </span>
        </button>

        <button
          className={`menu-item ${
            activePage === "create"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActivePage("create")
          }
        >
          <span>＋</span>
          Create Ticket
        </button>

      </div>

      {/* AI TOOLS */}
      <div className="menu-section">

        <p className="menu-title">
          AI TOOLS
        </p>

        <button
          className={`menu-item ${
            activePage === "assistant"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActivePage("assistant")
          }
        >
          <span>✦</span>
          AI Assistant
        </button>

      </div>

      {/* SIDEBAR BOTTOM */}
      <div className="sidebar-bottom">

        {/* SYSTEM STATUS */}
        <div className="system-status">

          <span className="status-dot"></span>

          <div>
            <strong>
              System Online
            </strong>

            <small>
              Spring Boot connected
            </small>
          </div>

        </div>

        {/* USER */}
        <div className="user-card">

          <div className="avatar">
            Y
          </div>

          <div>
            <strong>
              Yaswanth
            </strong>

            <small>
              Administrator
            </small>
          </div>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;