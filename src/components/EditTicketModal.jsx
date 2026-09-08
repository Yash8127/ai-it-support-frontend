function EditTicketModal({
  ticket,
  editForm,
  setEditForm,
  onSave,
  onCancel,
  saving,
}) {
  return (
    <div
      className="modal-overlay"
      onClick={onCancel}
    >
      <div
        className="ticket-modal edit-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <span className="modal-ticket-id">
              Edit Ticket #{ticket.id}
            </span>

            <h2>
              Update Ticket
            </h2>
          </div>

          <button
            className="close-button"
            onClick={onCancel}
            disabled={saving}
          >
            ×
          </button>
        </div>

        <form onSubmit={onSave}>
          <div className="form-group">
            <label>
              Ticket Title
            </label>

            <input
              type="text"
              value={editForm.title}
              onChange={(e) =>
                setEditForm((previous) => ({
                  ...previous,
                  title: e.target.value,
                }))
              }
              required
              disabled={saving}
            />
          </div>

          <div className="form-group">
            <label>
              Description
            </label>

            <textarea
              value={editForm.description}
              onChange={(e) =>
                setEditForm((previous) => ({
                  ...previous,
                  description: e.target.value,
                }))
              }
              required
              disabled={saving}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                Category
              </label>

              <select
                value={editForm.category}
                onChange={(e) =>
                  setEditForm((previous) => ({
                    ...previous,
                    category: e.target.value,
                  }))
                }
                disabled={saving}
              >
                <option value="NETWORK">
                  Network
                </option>

                <option value="HARDWARE">
                  Hardware
                </option>

                <option value="SOFTWARE">
                  Software
                </option>

                <option value="LOGIN">
                  Login
                </option>

                <option value="SECURITY">
                  Security
                </option>

                <option value="OTHER">
                  Other
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>
                Priority
              </label>

              <select
                value={editForm.priority}
                onChange={(e) =>
                  setEditForm((previous) => ({
                    ...previous,
                    priority: e.target.value,
                  }))
                }
                disabled={saving}
              >
                <option value="LOW">
                  Low
                </option>

                <option value="MEDIUM">
                  Medium
                </option>

                <option value="HIGH">
                  High
                </option>

                <option value="CRITICAL">
                  Critical
                </option>
              </select>
            </div>
          </div>

          <div className="edit-info">
            <span>ℹ️</span>

            <p>
              Status is managed separately using
              the Change Status section.
            </p>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onCancel}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "✓ Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTicketModal;