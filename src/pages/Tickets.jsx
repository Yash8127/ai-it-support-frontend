import Header from "../components/Header";
import TicketTable from "../components/TicketTable";

function Tickets({
  tickets,
  loading,
  search,
  setSearch,
  priorityFilter,
  setPriorityFilter,
  statusFilter,
  setStatusFilter,
  loadTickets,
  onSelectTicket,
  currentUser,
  unreadNotificationCount,
  setActivePage,
}) {
  const filteredTickets = tickets.filter(
    (ticket) => {
      const searchValue =
        search.trim().toLowerCase();

      const matchesSearch =
        !searchValue ||
        ticket.title
          ?.toLowerCase()
          .includes(searchValue) ||
        ticket.description
          ?.toLowerCase()
          .includes(searchValue) ||
        ticket.category
          ?.toLowerCase()
          .includes(searchValue);

      const matchesPriority =
        priorityFilter === "ALL" ||
        ticket.priority ===
          priorityFilter;

      const matchesStatus =
        statusFilter === "ALL" ||
        ticket.status === statusFilter;

      return (
        matchesSearch &&
        matchesPriority &&
        matchesStatus
      );
    }
  );

  return (
    <>
      <Header
        title="Tickets"
        subtitle="Manage and track your IT support tickets."
        currentUser={currentUser}
        unreadNotificationCount={unreadNotificationCount}
        setActivePage={setActivePage}
      />

      <div className="panel">

        {/* FILTERS */}

        <div className="ticket-toolbar">

          <div className="search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search tickets..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <select
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(
                e.target.value
              )
            }
          >
            <option value="ALL">
              All Priorities
            </option>

            <option value="CRITICAL">
              Critical
            </option>

            <option value="HIGH">
              High
            </option>

            <option value="MEDIUM">
              Medium
            </option>

            <option value="LOW">
              Low
            </option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
          >
            <option value="ALL">
              All Statuses
            </option>

            <option value="OPEN">
              Open
            </option>

            <option value="IN_PROGRESS">
              In Progress
            </option>

            <option value="RESOLVED">
              Resolved
            </option>

            <option value="CLOSED">
              Closed
            </option>
          </select>

          <button
            className="refresh-button"
            onClick={loadTickets}
          >
            ↻ Refresh
          </button>

        </div>

        {/* TICKET TABLE */}

        <TicketTable
          tickets={filteredTickets}
          loading={loading}
          onSelectTicket={
            onSelectTicket
          }
        />

      </div>
    </>
  );
}

export default Tickets;