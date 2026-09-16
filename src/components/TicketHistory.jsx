import { useEffect, useState } from "react";

function TicketHistory({ ticketId,
                        ticketStatus,  
                        ticketPriority,
                        ticketTitle,
                        ticketDescription,
                        ticketCategory,
                       }) {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

    const fetchHistory = async () => {

      try {

        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:8080/api/tickets/${ticketId}/history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load ticket history"
          );
        }

        const data = await response.json();

        setHistory(data);

      } catch (err) {

        console.error(err);

        setError(
          "Unable to load activity history."
        );

      } finally {

        setLoading(false);

      }

    };


    if (ticketId) {
      fetchHistory();
    }

  }, [ticketId ,
      ticketStatus ,
      ticketPriority,
      ticketTitle,
      ticketDescription,
      ticketCategory,
    ]);


  return (
    <div className="ticket-history">

      <div className="history-header">

        <div>

          <h3>
            Activity
          </h3>

          <span>
            Ticket activity and changes
          </span>

        </div>

        {!loading && !error && (
          <span className="history-count">
            {history.length}{" "}
            {history.length === 1
              ? "event"
              : "events"}
          </span>
        )}

      </div>


      {loading && (
        <div className="history-message">
          Loading activity...
        </div>
      )}


      {error && (
        <div className="history-message history-error">
          {error}
        </div>
      )}


      {!loading &&
        !error &&
        history.length === 0 && (

          <div className="history-message">
            No activity recorded yet.
          </div>

        )}


      {!loading &&
        !error &&
        history.length > 0 && (

          <div className="history-list">

            {history.map((item) => (

              <div
                className="history-item"
                key={item.id}
              >

                <div className="history-dot">
                </div>


                <div className="history-content">

                  <div className="history-main">

                    <div>

                      <strong>
                        {item.action
                          .replaceAll("_", " ")}
                      </strong>


                      {item.oldValue !== null &&
                        item.newValue !== null && (

                          <p>
                            {item.oldValue}
                            {" → "}
                            {item.newValue}
                          </p>

                        )}


                      {item.action === "CREATED" &&
                        item.newValue && (

                          <p>
                            Status: {item.newValue}
                          </p>

                        )}

                    </div>


                    <div className="history-meta">

                      <span>
                        👤 {item.username}
                      </span>

                      <span>
                        📅{" "}
                        {new Date(
                          item.createdAt
                        ).toLocaleString()}
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

    </div>
  );
}

export default TicketHistory;