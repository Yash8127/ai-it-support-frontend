import Header from "../components/Header";

function CreateTicket({
  newTicket,
  setNewTicket,
  createTicket,
  setActivePage,
  createdTicket,
  setCreatedTicket,
  creatingTicket,
  currentUser,
}) {
  return (
    <>
      <Header
        title="Create Ticket"
        subtitle="Create a new IT support request."
        currentUser={currentUser}
      />

      <div className="form-layout">

        <div className="panel form-panel">

          {/* =================================================
              AI ANALYZING / LOADING STATE
          ================================================= */}

          {creatingTicket ? (
            <div className="ticket-analyzing">

              <div className="analyzing-icon">
                ✦
              </div>

              <h2>
                Creating Your Ticket
              </h2>

              <p className="analyzing-main-text">
                Please wait while AI analyzes your ticket.
              </p>

              <div className="ai-loading-box">

                <div className="loading-spinner"></div>

                <div>
                  <strong>
                    AI is analyzing your ticket
                  </strong>

                  <p>
                    Detecting category, priority and
                    suggested resolution...
                  </p>
                </div>

              </div>

              <div className="analyzing-steps">

                <div className="analyzing-step active">
                  <span>✓</span>
                  <p>
                    Reading ticket details
                  </p>
                </div>

                <div className="analyzing-step active">
                  <span className="small-spinner"></span>
                  <p>
                    AI classification in progress
                  </p>
                </div>

                <div className="analyzing-step">
                  <span>○</span>
                  <p>
                    Preparing resolution suggestion
                  </p>
                </div>

              </div>

              <p className="please-wait">
                Please do not close or refresh the page.
              </p>

            </div>

          ) : !createdTicket ? (

            /* =================================================
               CREATE FORM
            ================================================= */

            <>
              <div className="form-header">

                <div className="large-form-icon">
                  ＋
                </div>

                <div>
                  <h2>
                    New Support Ticket
                  </h2>

                  <p>
                    Describe your problem and AI will
                    automatically classify it.
                  </p>
                </div>

              </div>

              <form onSubmit={createTicket}>

                {/* TITLE */}

                <div className="form-group">

                  <label htmlFor="ticket-title">
                    Ticket Title
                  </label>

                  <input
                    id="ticket-title"
                    type="text"
                    placeholder="Example: Laptop cannot connect to WiFi"
                    value={newTicket.title}
                    onChange={(e) =>
                      setNewTicket((previous) => ({
                        ...previous,
                        title: e.target.value,
                      }))
                    }
                    required
                    autoComplete="off"
                  />

                </div>

                {/* DESCRIPTION */}

                <div className="form-group">

                  <label htmlFor="ticket-description">
                    Description
                  </label>

                  <textarea
                    id="ticket-description"
                    placeholder="Describe the problem in detail..."
                    value={newTicket.description}
                    onChange={(e) =>
                      setNewTicket((previous) => ({
                        ...previous,
                        description: e.target.value,
                      }))
                    }
                    required
                  />

                </div>

                {/* AI INFORMATION */}

                <div className="ai-create-info">

                  <div className="ai-create-icon">
                    ✦
                  </div>

                  <div className="ai-create-content">

                    <strong>
                      AI will analyze this ticket
                    </strong>

                    <p>
                      You only need to describe the
                      problem. AI will automatically
                      determine the category, priority
                      and suggested resolution.
                    </p>

                  </div>

                </div>

                {/* ACTIONS */}

                <div className="form-actions">

                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() =>
                      setActivePage("dashboard")
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="primary-button"
                  >
                    Create Ticket →
                  </button>

                </div>

              </form>
            </>

          ) : (

            /* =================================================
               TICKET CREATED
            ================================================= */

            <div className="ticket-created-result">

              <div className="success-icon">
                ✓
              </div>

              <h2>
                Ticket Created Successfully
              </h2>

              <p>
                Ticket #{createdTicket.id} has been
                created and analyzed by AI.
              </p>

              <div className="ai-analysis-card">

                <div className="analysis-header">

                  <span>✦</span>

                  <h3>
                    AI Analysis
                  </h3>

                </div>

                <div className="analysis-grid">

                  <div>

                    <span>
                      Category
                    </span>

                    <strong>
                      {createdTicket.category}
                    </strong>

                  </div>

                  <div>

                    <span>
                      Priority
                    </span>

                    <strong>
                      {createdTicket.priority}
                    </strong>

                  </div>

                </div>

                <div className="suggestion-box">

                  <strong>
                    Suggested Resolution
                  </strong>

                  <p>
                    {createdTicket.aiSuggestion ||
                      "No AI suggestion available."}
                  </p>

                </div>

              </div>

              <div className="form-actions">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => {
                    setCreatedTicket(null);

                    setNewTicket({
                      title: "",
                      description: "",
                    });
                  }}
                >
                  Create Another
                </button>

                <button
                  type="button"
                  className="primary-button"
                  onClick={() =>
                    setActivePage("tickets")
                  }
                >
                  View Tickets →
                </button>

              </div>

            </div>
          )}

        </div>

        {/* =================================================
            RIGHT AI INFORMATION PANEL
        ================================================= */}

        <div className="panel ai-info-panel">

          <div className="ai-circle">
            ✦
          </div>

          <h2>
            AI-Powered Support
          </h2>

          <p>
            Your ticket is analyzed automatically to
            identify the category, priority and
            suggested resolution.
          </p>

          <div className="ai-feature">
            <span>✓</span>
            Automatic classification
          </div>

          <div className="ai-feature">
            <span>✓</span>
            Priority detection
          </div>

          <div className="ai-feature">
            <span>✓</span>
            Resolution suggestions
          </div>

        </div>

      </div>
    </>
  );
}

export default CreateTicket;