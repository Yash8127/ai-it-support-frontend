import { useEffect, useState } from "react";
import Header from "../components/Header";

function DeletedTickets({
  currentUser,
  unreadNotificationCount,
  setActivePage,
  setMobileSidebarOpen,
}) {

  const [deletedTickets, setDeletedTickets] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    const loadDeletedTickets = async () => {

      try {

        setLoading(true);
        setError("");

        const token =
          localStorage.getItem("token");

        const response =
          await fetch(
            "http://localhost:8080/api/tickets/deleted",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        if (!response.ok) {
          throw new Error(
            "Unable to load deleted tickets"
          );
        }

        const data =
          await response.json();

        setDeletedTickets(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (err) {

        console.error(err);

        setError(
          "Unable to load deleted tickets."
        );

      } finally {

        setLoading(false);

      }

    };

    loadDeletedTickets();

  }, []);


 return (
  <>
      <Header
      title="Deleted Tickets"
      subtitle="Review tickets removed from the active support system."
      currentUser={currentUser}
      unreadNotificationCount={unreadNotificationCount}
      setActivePage={setActivePage}
      setMobileSidebarOpen={setMobileSidebarOpen}
    />
   <div className="page-header">
      <div className="audit-badge">
        <span>◫</span>
        Admin Audit Log
      </div>
    </div>

    {loading && (
      <div className="audit-empty">
        <div className="audit-loading-icon">⟳</div>
        <strong>Loading audit records...</strong>
        <span>Please wait while we retrieve deleted tickets.</span>
      </div>
    )}

    {error && (
      <div className="error-banner">
        ⚠️ {error}
      </div>
    )}

    {!loading &&
      !error &&
      deletedTickets.length === 0 && (
        <div className="audit-empty">
          <div className="audit-empty-icon">✓</div>
          <strong>No deleted tickets</strong>
          <span>
            There are currently no deleted ticket records.
          </span>
        </div>
      )}

    {!loading &&
      !error &&
      deletedTickets.length > 0 && (
        <div className="audit-card">

          <div className="audit-card-header">
            <div>
              <h2>Deletion History</h2>
              <p>
                {deletedTickets.length} deleted{" "}
                {deletedTickets.length === 1
                  ? "ticket"
                  : "tickets"}{" "}
                recorded
              </p>
            </div>

            <span className="audit-count">
              {deletedTickets.length}
            </span>
          </div>

          <div className="audit-list">

            {deletedTickets.map((item) => (
              <div
                className="audit-item"
                key={item.id}
              >

                <div className="audit-item-icon">
                  🗑
                </div>

                <div className="audit-item-content">

                  <div className="audit-item-top">

                    <div>
                      <strong>
                        Ticket #{item.ticketId}
                      </strong>

                      <span className="deleted-badge">
                        DELETED
                      </span>
                    </div>

                    <span className="audit-date">
                      {new Date(
                        item.createdAt
                      ).toLocaleString()}
                    </span>

                  </div>

                  <div className="audit-details">

                    <div>
                      <span>Deleted by</span>
                      <strong>
                        {item.username}
                      </strong>
                    </div>

                    <div>
                      <span>Previous status</span>
                      <strong>
                        {item.oldValue || "-"}
                      </strong>
                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>
      )}
  </>
);
}

export default DeletedTickets;