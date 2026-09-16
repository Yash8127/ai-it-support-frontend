import Header from "../components/Header";
import TicketTable from "../components/TicketTable";

function Dashboard({
  tickets,
  analytics,
  loading,
  error,
  loadTickets,
  setActivePage,
  onSelectTicket,
  currentUser,
}) {
      const totalTickets = analytics?.totalTickets || 0;

      const openTickets = analytics?.openTickets || 0;

      const criticalTickets = analytics?.criticalTickets || 0;

      const resolvedTickets = analytics?.resolvedTickets || 0;
      const inProgressTickets =
        analytics?.inProgressTickets || 0;

      const closedTickets =
        analytics?.closedTickets || 0;

      const highPriorityTickets =
        analytics?.highPriorityTickets || 0;

      const mediumPriorityTickets =
        analytics?.mediumPriorityTickets || 0;

      const lowPriorityTickets =
        analytics?.lowPriorityTickets || 0;

    const currentHour = new Date().getHours();

      let greeting;

      if (currentHour < 12) {
        greeting = "Good morning";
      } else if (currentHour < 17) {
        greeting = "Good afternoon";
      } else {
        greeting = "Good evening";
      }

  return (
    <>
      <Header
        title={`${greeting}, ${
          currentUser.username || "User"
        } 👋`}
        subtitle={
          currentUser.role === "ADMIN"
            ? "Here's what's happening across the IT support system."
            : "Here's what's happening with your IT support tickets."
        }
        currentUser={currentUser}
      />

      {error && (
        <div className="error-banner">
          ⚠️ {error}

          <button onClick={loadTickets}>
            Retry
          </button>
        </div>
      )}


    {/* ANALYTICS */}

      <div className="analytics-grid">

        {/* STATUS ANALYTICS */}

        <div className="analytics-card">

          <div className="analytics-card-header">
            <div>
              <h3>Ticket Status</h3>
              <span>Current ticket distribution</span>
            </div>

            <div className="analytics-header-icon">
              ◉
            </div>
          </div>

          <div className="analytics-list">

            <div className="analytics-row">

              <div className="analytics-label">
                <div className="analytics-label-name">
                  <span className="analytics-dot open-dot"></span>
                  <span>Open</span>
                </div>

                <strong>{openTickets}</strong>
              </div>

              <div className="analytics-bar">
                <div
                  className="analytics-bar-fill open-bar"
                  style={{
                    width: `${
                      totalTickets
                        ? (openTickets / totalTickets) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>

            </div>


            <div className="analytics-row">

              <div className="analytics-label">
                <div className="analytics-label-name">
                  <span className="analytics-dot progress-dot"></span>
                  <span>In Progress</span>
                </div>

                <strong>{inProgressTickets}</strong>
              </div>

              <div className="analytics-bar">
                <div
                  className="analytics-bar-fill progress-bar"
                  style={{
                    width: `${
                      totalTickets
                        ? (inProgressTickets / totalTickets) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>

            </div>


            <div className="analytics-row">

              <div className="analytics-label">
                <div className="analytics-label-name">
                  <span className="analytics-dot resolved-dot"></span>
                  <span>Resolved</span>
                </div>

                <strong>{resolvedTickets}</strong>
              </div>

              <div className="analytics-bar">
                <div
                  className="analytics-bar-fill resolved-bar"
                  style={{
                    width: `${
                      totalTickets
                        ? (resolvedTickets / totalTickets) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>

            </div>


            <div className="analytics-row">

              <div className="analytics-label">
                <div className="analytics-label-name">
                  <span className="analytics-dot closed-dot"></span>
                  <span>Closed</span>
                </div>

                <strong>{closedTickets}</strong>
              </div>

              <div className="analytics-bar">
                <div
                  className="analytics-bar-fill closed-bar"
                  style={{
                    width: `${
                      totalTickets
                        ? (closedTickets / totalTickets) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>

            </div>

          </div>

        </div>


        {/* PRIORITY ANALYTICS */}

        <div className="analytics-card">

          <div className="analytics-card-header">
            <div>
              <h3>Priority Distribution</h3>
              <span>Tickets grouped by priority</span>
            </div>

            <div className="analytics-header-icon">
              !
            </div>
          </div>

          <div className="analytics-list">

            <div className="analytics-row">

              <div className="analytics-label">
                <div className="analytics-label-name">
                  <span className="analytics-dot critical-dot"></span>
                  <span>Critical</span>
                </div>

                <strong>{criticalTickets}</strong>
              </div>

              <div className="analytics-bar">
                <div
                  className="analytics-bar-fill critical-bar"
                  style={{
                    width: `${
                      totalTickets
                        ? (criticalTickets / totalTickets) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>

            </div>


            <div className="analytics-row">

              <div className="analytics-label">
                <div className="analytics-label-name">
                  <span className="analytics-dot high-dot"></span>
                  <span>High</span>
                </div>

                <strong>{highPriorityTickets}</strong>
              </div>

              <div className="analytics-bar">
                <div
                  className="analytics-bar-fill high-bar"
                  style={{
                    width: `${
                      totalTickets
                        ? (highPriorityTickets / totalTickets) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>

            </div>


            <div className="analytics-row">

              <div className="analytics-label">
                <div className="analytics-label-name">
                  <span className="analytics-dot medium-dot"></span>
                  <span>Medium</span>
                </div>

                <strong>{mediumPriorityTickets}</strong>
              </div>

              <div className="analytics-bar">
                <div
                  className="analytics-bar-fill medium-bar"
                  style={{
                    width: `${
                      totalTickets
                        ? (mediumPriorityTickets / totalTickets) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>

            </div>


            <div className="analytics-row">

              <div className="analytics-label">
                <div className="analytics-label-name">
                  <span className="analytics-dot low-dot"></span>
                  <span>Low</span>
                </div>

                <strong>{lowPriorityTickets}</strong>
              </div>

              <div className="analytics-bar">
                <div
                  className="analytics-bar-fill low-bar"
                  style={{
                    width: `${
                      totalTickets
                        ? (lowPriorityTickets / totalTickets) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* DASHBOARD CONTENT */}

      <div className="dashboard-grid">

        {/* RECENT TICKETS */}

        <div className="panel recent-panel">

          <div className="panel-header">
            <div>
              <h2>Recent Tickets</h2>

              <p>
                Latest IT support requests
              </p>
            </div>

            <button
              className="outline-button"
              onClick={() =>
                setActivePage("tickets")
              }
            >
              View all →
            </button>
          </div>

          <TicketTable
            tickets={tickets.slice(0, 6)}
            loading={loading}
            compact
            onSelectTicket={onSelectTicket}
          />

        </div>

        {/* TICKET OVERVIEW */}

   

          <div className="panel overview-panel">

            <div className="panel-header">
              <div>
                <h2>Ticket Overview</h2>

                <p>
                  Current workload summary
                </p>
              </div>
            </div>

            {/* TOTAL */}

            <div className="overview-summary">

              <div>
                <span className="overview-label">
                  Total Tickets
                </span>

                <strong className="overview-total">
                  {totalTickets}
                </strong>
              </div>

              <span className="overview-summary-icon">
                ▤
              </span>

            </div>


            {/* IN PROGRESS */}

            <div className="overview-item">

              <div>
                <span className="overview-label">
                  In Progress
                </span>

                <strong>
                  {inProgressTickets}
                </strong>
              </div>

              <div className="progress">
                <div
                  style={{
                    width:
                      totalTickets > 0
                        ? `${(inProgressTickets / totalTickets) * 100}%`
                        : "0%",
                  }}
                />
              </div>

            </div>


            {/* HIGH PRIORITY */}

            <div className="overview-item">

              <div>
                <span className="overview-label">
                  High Priority
                </span>

                <strong>
                  {highPriorityTickets}
                </strong>
              </div>

              <div className="progress high">
                <div
                  style={{
                    width:
                      totalTickets > 0
                        ? `${(highPriorityTickets / totalTickets) * 100}%`
                        : "0%",
                  }}
                />
              </div>

            </div>


            {/* RESOLVED */}

            <div className="overview-item">

              <div>
                <span className="overview-label">
                  Resolved
                </span>

                <strong>
                  {resolvedTickets}
                </strong>
              </div>

              <div className="progress resolved">
                <div
                  style={{
                    width:
                      totalTickets > 0
                        ? `${(resolvedTickets / totalTickets) * 100}%`
                        : "0%",
                  }}
                />
              </div>

            </div>


            {/* AI BUTTON */}

            <button
              className="primary-button full-width"
              onClick={() =>
                setActivePage("assistant")
              }
            >
              ✦ Ask AI Assistant
            </button>

          </div>

      </div>
    </>
  );
}

export default Dashboard;