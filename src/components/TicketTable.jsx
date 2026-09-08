function TicketTable({
  tickets,
  loading,
  compact = false,
  onSelectTicket,
}) {
  return (
    <div
      className={`table-wrapper ${
        compact ? "compact" : ""
      }`}
    >
      {loading ? (
        <div className="empty-state">
          <div className="spinner"></div>
          <p>Loading tickets...</p>
        </div>
      ) : tickets.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            📭
          </div>

          <h3>No tickets found</h3>

          <p>
            There are no tickets matching your
            current filters.
          </p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ticket</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>

              {!compact && (
                <th>Action</th>
              )}
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>
                  <span className="ticket-id">
                    #{ticket.id}
                  </span>
                </td>

                <td>
                  <div className="ticket-name">
                    <strong>
                      {ticket.title}
                    </strong>

                    {!compact && (
                      <span>
                        {ticket.description
                          ? ticket.description.substring(
                              0,
                              60
                            )
                          : ""}

                        {ticket.description &&
                        ticket.description.length >
                          60
                          ? "..."
                          : ""}
                      </span>
                    )}
                  </div>
                </td>

                <td>
                  <span className="category-text">
                    {ticket.category}
                  </span>
                </td>

                <td>
                  <span
                    className={`badge priority-${ticket.priority?.toLowerCase()}`}
                  >
                    {ticket.priority}
                  </span>
                </td>

                <td>
                  <span
                    className={`badge status-${ticket.status
                      ?.toLowerCase()
                      .replace("_", "-")}`}
                  >
                    {ticket.status}
                  </span>
                </td>

                {!compact && (
                  <td>
                    <button
                      className="view-button"
                      onClick={() =>
                        onSelectTicket(ticket)
                      }
                    >
                      View
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TicketTable;