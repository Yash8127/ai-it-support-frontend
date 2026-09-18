function Sidebar({
  activePage,
  setActivePage,
  ticketCount,
  onLogout,
  currentUser,
   mobileSidebarOpen,
  setMobileSidebarOpen,
}) {
  return (
    <>
    <aside
        className={`sidebar ${
          mobileSidebarOpen
            ? "mobile-open"
            : ""
        }`}
      >
        <button
          className="mobile-close-button"
          type="button"
          onClick={() => setMobileSidebarOpen(false)}
        >
          ×
        </button>

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
          onClick={() => {
            setActivePage("dashboard");
            setMobileSidebarOpen(false);
          }}
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
          onClick={() =>{
            setActivePage("tickets")
            setMobileSidebarOpen(false);
            
          }}
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
          onClick={() =>{
            setActivePage("create")
            setMobileSidebarOpen(false);
          }}
        >
          <span>＋</span>
          Create Ticket
        </button>
        {currentUser?.role === "ADMIN" && (
        <button
          className={`menu-item ${
            activePage === "deleted"
              ? "active"
              : ""
          }`}
          onClick={() =>{
            setActivePage("deleted")
            setMobileSidebarOpen(false);
          }}
        >
            <span>◫</span>
            Deleted Tickets
          </button>
        )}

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
          onClick={() =>{
            setActivePage("assistant")
            setMobileSidebarOpen(false);
          }}
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
            {currentUser.username
              ? currentUser.username.charAt(0).toUpperCase()
              : "U"}
          </div>

          <div>
            <strong>
              {currentUser.username || "User"}
            </strong>

            <small>
              {currentUser.role === "ADMIN"
                ? "Administrator"
                : "User"}
            </small>
          </div>

        </div>

        {/* LOGOUT */}
        <button
          className="logout-button"
          onClick={onLogout}
        >
          <span>↪</span>
          Logout
        </button>

      </div>

    </aside>

    {mobileSidebarOpen && (
        <div
          className="mobile-sidebar-overlay"
          onClick={() => setMobileSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Sidebar;