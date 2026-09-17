function Header({ 
    title,
    subtitle,
    currentUser,
    unreadNotificationCount,
    setActivePage,

  }) {
  return (
    <header className="top-header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="header-actions">
        <button
          className="icon-button notification-button"
          type="button"
          onClick={() => setActivePage("notifications")}
        >
          🔔 
           {unreadNotificationCount > 0 && (
                <span className="notification-badge">
                  {unreadNotificationCount > 99
                    ? "99+"
                    : unreadNotificationCount}
                </span>
              )}
            
        </button>

       <div className="profile">

          <div className="avatar">
            {currentUser.username
              ? currentUser.username.charAt(0).toUpperCase()
              : "U"}
          </div>

          <div>
            <strong>
              {currentUser.username || "User"}
            </strong>

            <span>
              {currentUser.role === "ADMIN"
                ? "IT Administrator"
                : "User"}
            </span>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;