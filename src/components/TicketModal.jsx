function TicketModal({
  ticket,
  selectedStatus,
  setSelectedStatus,
  savingStatus,
  onStatusChange,
  onClose,
  onDelete,
  onEdit,
  currentUser,
}) {
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="ticket-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="modal-header">

          <div>
            <span className="modal-ticket-id">
              Ticket #{ticket.id}
            </span>

            <h2>
              {ticket.title}
            </h2>
          </div>

          <button
            className="close-button"
            onClick={onClose}
          >
            ×
          </button>

        </div>


        {/* =================================================
            TICKET INFORMATION
        ================================================= */}

        <div className="modal-grid">

          <div>
            <span>
              Category
            </span>

            <strong>
              {ticket.category}
            </strong>
          </div>

          <div>
            <span>
              Priority
            </span>

            <strong>
              {ticket.priority}
            </strong>
          </div>

          <div>
            <span>
              Status
            </span>

            <strong>
              {ticket.status}
            </strong>
          </div>

        </div>


        {/* =================================================
            CHANGE STATUS
        ================================================= */}

        {currentUser?.role === "ADMIN" && (
            <div className="status-management">

              <div className="status-management-header">

                <div>
                  <h3>
                    Change Status
                  </h3>

                  <p>
                    Update the current lifecycle
                    status of this ticket.
                  </p>
                </div>

                <span
                  className={`badge status-${selectedStatus
                    ?.toLowerCase()
                    .replace("_", "-")}`}
                >
                  {selectedStatus}
                </span>

              </div>

              <div className="status-controls">

                <select
                  value={selectedStatus}
                  onChange={(e) =>
                    setSelectedStatus(
                      e.target.value
                    )
                  }
                  disabled={savingStatus}
                >
                  <option value="OPEN">
                    OPEN
                  </option>

                  <option value="IN_PROGRESS">
                    IN_PROGRESS
                  </option>

                  <option value="RESOLVED">
                    RESOLVED
                  </option>

                  <option value="CLOSED">
                    CLOSED
                  </option>
                </select>

                <button
                  className="primary-button"
                  onClick={onStatusChange}
                  disabled={
                    savingStatus ||
                    selectedStatus === ticket.status
                  }
                >
                  {savingStatus
                    ? "Updating..."
                    : "✓ Update Status"}
                </button>

              </div>

            </div>
          )}


        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <div className="modal-section">

          <h3>
            Description
          </h3>

          <p>
            {ticket.description ||
              "No description available."}
          </p>

        </div>


        {/* =================================================
            AI SUGGESTION
        ================================================= */}

        {ticket.aiSuggestion && (

          <div className="ai-suggestion">

            <strong>
              ✦ AI Suggestion
            </strong>

            <p>
              {ticket.aiSuggestion}
            </p>

          </div>

        )}


        {/* =================================================
            ACTION BUTTONS
        ================================================= */}

        <div className="modal-actions">

          <button
            className="primary-button"
            onClick={() =>
              onEdit(ticket)
            }
          >
            ✎ Edit Ticket
          </button>


        {currentUser?.role === "ADMIN" && (
          <button
            className="danger-button"
            onClick={() =>
              onDelete(ticket.id)
            }
          >
            Delete Ticket
          </button>
        )}


          <button
            className="secondary-button"
            onClick={onClose}
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
}

export default TicketModal;