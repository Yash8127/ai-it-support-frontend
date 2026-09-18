import { useEffect, useState } from "react";
import Header from "../components/Header";

function Notifications({ 
    currentUser, 
    unreadNotificationCount , 
    setUnreadNotificationCount,
     setActivePage,
    setMobileSidebarOpen,
    }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load notifications");
      }

      const data = await response.json();

      setNotifications(data);
    } catch (error) {
      console.error("Notification error:", error);
    } finally {
      setLoading(false);
    }
  };



  const markAsRead = async (notificationId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:8080/api/notifications/${notificationId}/read`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to mark notification as read");
    }

    // Update the notification immediately in the UI
    setNotifications((previousNotifications) =>
      previousNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
      
    );
    setUnreadNotificationCount((previousCount) =>
                        Math.max(previousCount - 1, 0)
                        );
  } catch (error) {
    console.error("Mark as read error:", error);
  }
};

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <div className="page">
      <Header
        title="Notifications"
        subtitle="Stay updated with your ticket activity."
        currentUser={currentUser}
        unreadNotificationCount={unreadNotificationCount}
         setActivePage={setActivePage}
         setMobileSidebarOpen={setMobileSidebarOpen}
      />

      <div className="notifications-container">
        <div className="notifications-card">
          <div className="notifications-header">
            <h2>All Notifications</h2>
            <span>
              {notifications.length} notifications
            </span>
          </div>

          {loading ? (
            <p className="notifications-empty">
              Loading notifications...
            </p>
          ) : notifications.length === 0 ? (
            <p className="notifications-empty">
              No notifications yet.
            </p>
          ) : (
            <div className="notification-list">
  {notifications.map((notification) => (
    <div
      className={`notification-item ${
        notification.read ? "read" : "unread"
      }`}
      key={notification.id}
    >
      <div className="notification-icon">
        🔔
      </div>

      <div className="notification-content">
        <strong>
          {notification.type.replaceAll("_", " ")}
        </strong>

        <p>{notification.message}</p>

        <span>
          {new Date(
            notification.createdAt
          ).toLocaleString()}
        </span>
      </div>

      {!notification.read && (
        <button
          className="mark-read-button"
          onClick={() =>
            markAsRead(notification.id)
          }
        >
          Mark as Read
        </button>
      )}
    </div>
  ))}
</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;