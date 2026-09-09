import Header from "../components/Header";
import StatCard from "../components/StatCard";
import TicketTable from "../components/TicketTable";

function Dashboard({
  tickets,
  loading,
  error,
  loadTickets,
  setActivePage,
  onSelectTicket,
  currentUser,
}) {
  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "OPEN"
  ).length;

  const criticalTickets = tickets.filter(
    (ticket) => ticket.priority === "CRITICAL"
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "RESOLVED"
  ).length;

  return (
    <>
      <Header
        title={`Good afternoon, ${
          currentUser.username || "User"
        } 👋`}
        subtitle="Here's what's happening with your IT support tickets."
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

      {/* STATISTICS */}

      <div className="stats-grid">
        <StatCard
          title="Total Tickets"
          value={totalTickets}
          icon="▤"
          type="blue"
        />

        <StatCard
          title="Open Tickets"
          value={openTickets}
          icon="●"
          type="green"
        />

        <StatCard
          title="Critical Tickets"
          value={criticalTickets}
          icon="!"
          type="red"
        />

        <StatCard
          title="Resolved"
          value={resolvedTickets}
          icon="✓"
          type="purple"
        />
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
                Current workload
              </p>
            </div>
          </div>

          {/* OPEN */}

          <div className="overview-item">

            <div>
              <span className="overview-label">
                Open
              </span>

              <strong>
                {openTickets}
              </strong>
            </div>

            <div className="progress">
              <div
                style={{
                  width:
                    totalTickets > 0
                      ? `${(openTickets / totalTickets) * 100}%`
                      : "0%",
                }}
              />
            </div>

          </div>

          {/* CRITICAL */}

          <div className="overview-item">

            <div>
              <span className="overview-label">
                Critical
              </span>

              <strong>
                {criticalTickets}
              </strong>
            </div>

            <div className="progress critical">
              <div
                style={{
                  width:
                    totalTickets > 0
                      ? `${(criticalTickets / totalTickets) * 100}%`
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