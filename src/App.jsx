import { useEffect, useState } from "react";
import "./App.css";

// =========================================================
// COMPONENT IMPORTS
// =========================================================

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import CreateTicket from "./pages/CreateTicket";
import AIAssistant from "./pages/AIAssistant";
import EditTicketModal from "./components/EditTicketModal";
import TicketModal from "./components/TicketModal";
import Toast from "./components/Toast";

// =========================================================
// API
// =========================================================

import { API_BASE } from "./config/api";





// =========================================================
// MAIN APP
// =========================================================

function App() {
  const [activePage, setActivePage] =
    useState("dashboard");

  const [tickets, setTickets] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =========================================================
  // TOAST
  // =========================================================

  const [toast, setToast] =
    useState(null);

  const showToast = (
    message,
    type = "success"
  ) => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // =========================================================
  // SEARCH / FILTER
  // =========================================================

  const [search, setSearch] =
    useState("");

  const [priorityFilter, setPriorityFilter] =
    useState("ALL");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  // =========================================================
  // SELECTED TICKET
  // =========================================================

  const [selectedTicket, setSelectedTicket] =
    useState(null);

  // =========================================================
  // EDIT TICKET
  // =========================================================

  const [editingTicket, setEditingTicket] =
    useState(null);

  const [savingEdit, setSavingEdit] =
    useState(false);

  const [editForm, setEditForm] =
    useState({
      title: "",
      description: "",
      category: "NETWORK",
      priority: "MEDIUM",
    });

  // =========================================================
  // STATUS
  // =========================================================

  const [selectedStatus, setSelectedStatus] =
    useState("");

  const [savingStatus, setSavingStatus] =
    useState(false);

  // =========================================================
  // CREATE TICKET
  // =========================================================

  const [newTicket, setNewTicket] =
    useState({
      title: "",
      description: "",
    });

  const [createdTicket, setCreatedTicket] =
    useState(null);
  const [creatingTicket, setCreatingTicket] = useState(false);

  // =========================================================
  // AI CHAT
  // =========================================================

  const [chatMessage, setChatMessage] =
    useState("");

  const [chatMessages, setChatMessages] =
    useState([
      {
        role: "assistant",
        text:
          "Hello Yaswanth! 👋 I'm your AI IT Support Assistant. How can I help you today?",
      },
    ]);

  const [chatLoading, setChatLoading] =
    useState(false);

  // =========================================================
  // LOAD TICKETS
  // =========================================================

  const loadTickets = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await fetch(
          `${API_BASE}/api/tickets`
        );

      if (!response.ok) {
        throw new Error(
          "Unable to load tickets"
        );
      }

      const data =
        await response.json();

      setTickets(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load tickets. Please make sure Spring Boot is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  // =========================================================
  // CREATE TICKET
  // =========================================================

  const createTicket = async (e) => {
    e.preventDefault();
      setCreatingTicket(true);

    try {
      const response =
        await fetch(
          `${API_BASE}/api/tickets`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              title:
                newTicket.title.trim(),
              description:
                newTicket.description.trim(),
            }),
          }
        );

      if (!response.ok) {
        throw new Error(
          "Failed to create ticket"
        );
      }

      const created =
        await response.json();

      setCreatedTicket(
        created
      );

      showToast(
        "Ticket created and analyzed successfully.",
        "success"
      );

      await loadTickets();
    } catch (err) {
      console.error(err);

      showToast(
        "Unable to create ticket.",
        "error"
      );
    }finally{
         setCreatingTicket(false);
    }
  };

  // =========================================================
  // DELETE TICKET
  // =========================================================

  const deleteTicket = async (
    id
  ) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete ticket #${id}?`
      );

    if (!confirmed) {
      return;
    }

    try {
      const response =
        await fetch(
          `${API_BASE}/api/tickets/${id}`,
          {
            method: "DELETE",
          }
        );

      if (!response.ok) {
        throw new Error(
          "Delete failed"
        );
      }

      showToast(
        "Ticket deleted successfully.",
        "success"
      );

      setSelectedTicket(
        null
      );

      await loadTickets();
    } catch (err) {
      console.error(err);

      showToast(
        "Unable to delete ticket.",
        "error"
      );
    }
  };

  // =========================================================
  // START EDIT
  // =========================================================

  const startEditTicket = (
    ticket
  ) => {
    setEditingTicket(
      ticket
    );

    setEditForm({
      title:
        ticket.title || "",
      description:
        ticket.description || "",
      category:
        ticket.category ||
        "NETWORK",
      priority:
        ticket.priority ||
        "MEDIUM",
    });
  };

  // =========================================================
  // CANCEL EDIT
  // =========================================================

  const cancelEditTicket =
    () => {
      if (savingEdit) {
        return;
      }

      setEditingTicket(
        null
      );
    };

  // =========================================================
  // UPDATE TICKET
  // =========================================================

  const updateTicket =
    async (e) => {
      e.preventDefault();

      if (!editingTicket) {
        return;
      }

      try {
        setSavingEdit(true);

        const response =
          await fetch(
            `${API_BASE}/api/tickets/${editingTicket.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                title:
                  editForm.title,
                description:
                  editForm.description,
                category:
                  editForm.category,
                priority:
                  editForm.priority,
              }),
            }
          );

        if (!response.ok) {
          throw new Error(
            "Failed to update ticket"
          );
        }

        const updatedTicket =
          await response.json();

        setTickets(
          (previousTickets) =>
            previousTickets.map(
              (ticket) =>
                ticket.id ===
                editingTicket.id
                  ? updatedTicket
                  : ticket
            )
        );

        setSelectedTicket(
          updatedTicket
        );

        setEditingTicket(
          null
        );

        showToast(
          "Ticket updated successfully.",
          "success"
        );

        await loadTickets();
      } catch (err) {
        console.error(err);

        showToast(
          "Unable to update ticket.",
          "error"
        );
      } finally {
        setSavingEdit(false);
      }
    };

  // =========================================================
  // UPDATE STATUS
  // =========================================================

  const updateTicketStatus =
    async () => {
      if (
        !selectedTicket ||
        !selectedStatus
      ) {
        return;
      }

      if (
        selectedStatus ===
        selectedTicket.status
      ) {
        showToast(
          "Ticket is already in this status.",
          "info"
        );

        return;
      }

      try {
        setSavingStatus(
          true
        );

        const response =
          await fetch(
            `${API_BASE}/api/tickets/${selectedTicket.id}/status?status=${encodeURIComponent(
              selectedStatus
            )}`,
            {
              method: "PUT",
            }
          );

        if (!response.ok) {
          throw new Error(
            "Failed to update ticket status"
          );
        }

        const updatedTicket =
          await response.json();

        setTickets(
          (previousTickets) =>
            previousTickets.map(
              (ticket) =>
                ticket.id ===
                selectedTicket.id
                  ? updatedTicket
                  : ticket
            )
        );

        setSelectedTicket(
          updatedTicket
        );

        setSelectedStatus(
          updatedTicket.status
        );

        showToast(
          "Ticket status updated successfully.",
          "success"
        );

        await loadTickets();
      } catch (err) {
        console.error(err);

        showToast(
          "Unable to update ticket status.",
          "error"
        );
      } finally {
        setSavingStatus(
          false
        );
      }
    };

  // =========================================================
  // AI CHAT
  // =========================================================

  const sendChatMessage =
    async (e) => {
      e.preventDefault();

      if (
        !chatMessage.trim() ||
        chatLoading
      ) {
        return;
      }

      const message =
        chatMessage.trim();

      setChatMessages(
        (previousMessages) => [
          ...previousMessages,
          {
            role: "user",
            text: message,
          },
        ]
      );

      setChatMessage("");

      setChatLoading(
        true
      );

      try {
        const response =
          await fetch(
            `${API_BASE}/api/ai/chat?message=${encodeURIComponent(
              message
            )}`,
            {
              method: "POST",
            }
          );

        if (!response.ok) {
          throw new Error(
            "AI request failed"
          );
        }

        const data =
          await response.text();

        setChatMessages(
          (previousMessages) => [
            ...previousMessages,
            {
              role: "assistant",
              text: data,
            },
          ]
        );
      } catch (err) {
        console.error(err);

        setChatMessages(
          (previousMessages) => [
            ...previousMessages,
            {
              role: "assistant",
              text:
                "Sorry, I couldn't connect to the AI service. Please make sure Spring Boot and Ollama are running.",
            },
          ]
        );
      } finally {
        setChatLoading(
          false
        );
      }
    };

  // =========================================================
  // SELECT TICKET
  // =========================================================

  const handleSelectTicket =
    (ticket) => {
      setSelectedTicket(
        ticket
      );

      setSelectedStatus(
        ticket.status ||
          "OPEN"
      );
    };

  // =========================================================
  // PAGE ROUTING
  // =========================================================

  const renderPage = () => {
    switch (activePage) {
      case "tickets":
        return (
          <Tickets
            tickets={tickets}
            loading={loading}
            search={search}
            setSearch={setSearch}
            priorityFilter={priorityFilter}
            setPriorityFilter={
              setPriorityFilter
            }
            statusFilter={statusFilter}
            setStatusFilter={
              setStatusFilter
            }
            loadTickets={loadTickets}
            onSelectTicket={
              handleSelectTicket
            }
          />
        );

      case "create":
        return (
          <CreateTicket
            newTicket={newTicket}
            setNewTicket={setNewTicket}
            createTicket={createTicket}
            setActivePage={setActivePage}
            createdTicket={createdTicket}
            setCreatedTicket={setCreatedTicket}
            creatingTicket={creatingTicket}
            />
          );

      case "assistant":
        return (
          <AIAssistant
            chatMessage={chatMessage}
            setChatMessage={setChatMessage}
            chatMessages={chatMessages}
            chatLoading={chatLoading}
            sendChatMessage={sendChatMessage}
          />
        );

      default:
        return (
          <Dashboard
            tickets={tickets}
            loading={loading}
            error={error}
            loadTickets={
              loadTickets
            }
            setActivePage={
              setActivePage
            }
            onSelectTicket={
              handleSelectTicket
            }
          />
        );
    }
  };

  // =========================================================
  // APP UI
  // =========================================================

  return (
    <div className="app">

      <Toast
        toast={toast}
        onClose={() =>
          setToast(null)
        }
      />

      {/* SIDEBAR IS NOW IMPORTED FROM components/Sidebar.jsx */}

      <Sidebar
        activePage={
          activePage
        }
        setActivePage={
          setActivePage
        }
        ticketCount={
          tickets.length
        }
      />

      <main className="main-content">
        {renderPage()}
      </main>

      {/* VIEW TICKET MODAL */}

      {selectedTicket && (
        <TicketModal
          ticket={
            selectedTicket
          }
          selectedStatus={
            selectedStatus
          }
          setSelectedStatus={
            setSelectedStatus
          }
          savingStatus={
            savingStatus
          }
          onStatusChange={
            updateTicketStatus
          }
          onClose={() =>
            setSelectedTicket(
              null
            )
          }
          onDelete={
            deleteTicket
          }
          onEdit={
            startEditTicket
          }
        />
      )}

      {/* EDIT TICKET MODAL */}

      {editingTicket && (
        <EditTicketModal
          ticket={
            editingTicket
          }
          editForm={
            editForm
          }
          setEditForm={
            setEditForm
          }
          onSave={
            updateTicket
          }
          onCancel={
            cancelEditTicket
          }
          saving={
            savingEdit
          }
        />
      )}

    </div>
  );
}

export default App;