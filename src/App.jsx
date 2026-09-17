import { useEffect, useState } from "react";
import "./App.css";

// =========================================================
// COMPONENT IMPORTS
// =========================================================
import Register from "./pages/Register";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import CreateTicket from "./pages/CreateTicket";
import AIAssistant from "./pages/AIAssistant";
import EditTicketModal from "./components/EditTicketModal";
import TicketModal from "./components/TicketModal";
import Toast from "./components/Toast";
import DeletedTickets from "./pages/DeletedTickets";
import Notifications from "./pages/Notifications";

// =========================================================
// API
// =========================================================

import { API_BASE } from "./config/api";





// =========================================================
// MAIN APP
// =========================================================

function App() {

  const [isAuthenticated, setIsAuthenticated] =
  useState(() => {
    return Boolean(localStorage.getItem("token"));
  });

const [loginForm, setLoginForm] =
  useState({
    username: "",
    password: "",
  });


const [loginLoading, setLoginLoading] =
  useState(false);

const [loginError, setLoginError] =
  useState("");

  
// =========================================================
// REGISTER STATE
// =========================================================

  const [showRegister, setShowRegister] =
    useState(false);

  const [registerForm, setRegisterForm] =
    useState({
      username: "",
      password: "",
      confirmPassword: "",
    });

  const [registerLoading, setRegisterLoading] =
    useState(false);

  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");



  const [activePage, setActivePage] =
    useState("dashboard");

  const [tickets, setTickets] =
    useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

    const [currentUser, setCurrentUser] = useState(() => ({
      username: localStorage.getItem("username") || "",
      role: localStorage.getItem("role") || "",
    }));

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
        text: `Hello ${currentUser?.username || "there"}! 👋 I'm your AI IT Support Assistant. How can I help you today?`
      },
    ]);

  const [chatLoading, setChatLoading] =
    useState(false);
  // =========================================================
  // LOGINN USER
  // =========================================================
    const loginUser = async (e) => {
      e.preventDefault();

      setLoginLoading(true);
      setLoginError("");

      try {
        const response = await fetch(
          `${API_BASE}/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginForm),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Invalid username or password"
          );
        }

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "username",
          data.username
        );

        localStorage.setItem(
          "role",
          data.role
        );
        setCurrentUser({
        username: data.username,
        role: data.role,
      });

        setIsAuthenticated(true);

        setLoginForm({
          username: "",
          password: "",
        });

      } catch (err) {
        console.error(err);

        setLoginError(
          err.message ||
            "Unable to login. Please try again."
        );
      } finally {
        setLoginLoading(false);
      }
    };

  // =========================================================
  // REGISTER USER
  // =========================================================
      const registerUser = async (e) => {
        e.preventDefault();

        setRegisterError("");
        setRegisterSuccess("");

        if (
          registerForm.password !==
          registerForm.confirmPassword
        ) {
          setRegisterError(
            "Passwords do not match."
          );
          return;
        }

        setRegisterLoading(true);

        try {
          const response = await fetch(
            `${API_BASE}/api/auth/register?username=${encodeURIComponent(
              registerForm.username
            )}&password=${encodeURIComponent(
              registerForm.password
            )}`,
            {
              method: "POST",
            }
          );

          const data = await response.text();

          if (!response.ok) {
            throw new Error(
              data || "Unable to create account"
            );
          }

          if (data === "Username already exists") {
            setRegisterError(
              "Username already exists. Please choose another username."
            );
            return;
          }

          setRegisterSuccess(
            "Account created successfully! You can now sign in."
          );

          setRegisterForm({
            username: "",
            password: "",
            confirmPassword: "",
          });

          setTimeout(() => {
            setShowRegister(false);
            setRegisterSuccess("");
          }, 1500);

        } catch (err) {
          console.error(err);

          setRegisterError(
            err.message ||
            "Unable to create account"
          );
        } finally {
          setRegisterLoading(false);
        }
      };

  // =========================================================
  // LOAD TICKETS
  // =========================================================

    const loadTickets = async () => {
      try {
        setLoading(true);
        setError("");

        const token =
          localStorage.getItem("token");

        const response =
          await fetch(
            `${API_BASE}/api/tickets`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        if (!response.ok) {
            if (
              response.status === 401 ||
              response.status === 403
            ) {
              handleUnauthorized();
              return;
            }

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
        await loadAnalytics();

      } catch (err) {
        console.error(err);

        setError(
          "Unable to load tickets. Please make sure Spring Boot is running."
        );
      } finally {
        setLoading(false);
      }
    };
     // =========================================================
    // LOAD ANALYTICS
    // =========================================================
   
    const loadAnalytics = async () => {
        try {
          const token = localStorage.getItem("token");

          const response = await fetch(
            "http://localhost:8080/api/dashboard/analytics",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to load dashboard analytics");
          }

          const data = await response.json();

          setAnalytics(data);
        } catch (error) {
          console.error("Analytics error:", error);
        }
      };

      useEffect(() => {
      if (isAuthenticated) {
        loadTickets();
        loadAnalytics();
        loadNotificationCount();
      }
    }, [isAuthenticated]);


  // =========================================================
  // LOAD NOTIFICATIONNS
  // =========================================================

  const loadNotificationCount = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_BASE}/api/notifications/unread/count`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        "Failed to load notification count"
      );
    }

    const count = await response.json();

    setUnreadNotificationCount(count);

  } catch (error) {
    console.error(
      "Notification count error:",
      error
    );
  }
};

  // =========================================================
  // CREATE TICKET
  // =========================================================

  const createTicket = async (e) => {
    e.preventDefault();
      setCreatingTicket(true);

    try {
      const token =
  localStorage.getItem("token");
      const response =
        await fetch(
          `${API_BASE}/api/tickets`,
          {
            method: "POST",
           headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${token}`,
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
        if (
          response.status === 401 ||
          response.status === 403
        ) {
          handleUnauthorized();
          return;
        }

        throw new Error("Unable to create ticket");
      }

      const created =
        await response.json();

      setCreatedTicket(
        created
      );

      await loadNotificationCount();

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
      const token =
      localStorage.getItem("token");
      const response =
        await fetch(
          `${API_BASE}/api/tickets/${id}`,
          {
            method: "DELETE",
             headers: {
              Authorization:
                `Bearer ${token}`,
                  
                    }
          }      
        );

      if (!response.ok) {
        if (
          response.status === 401 ||
          response.status === 403
        ) {
          handleUnauthorized();
          return;
        }

        throw new Error("Unable to delete ticket");
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
        const token =
          localStorage.getItem("token");

        const response =
          await fetch(
            `${API_BASE}/api/tickets/${editingTicket.id}`,
            {
              method: "PUT",
             headers: {
              "Content-Type":
                "application/json",
              Authorization:
                `Bearer ${token}`,
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
          if (
            response.status === 401 ||
            response.status === 403
          ) {
            handleUnauthorized();
            return;
          }

          throw new Error("Unable to update ticket");
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
        await loadNotificationCount();
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
        const token =
            localStorage.getItem("token");

        const response =
          await fetch(
            `${API_BASE}/api/tickets/${selectedTicket.id}/status?status=${encodeURIComponent(
              selectedStatus
            )}`,
            {
              method: "PUT",
               headers: {
                Authorization:
                  `Bearer ${token}`,
                        },
    
            }
          );

        if (!response.ok) {
        if (
          response.status === 401 ||
          response.status === 403
        ) {
          handleUnauthorized();
          return;
        }

        throw new Error("Unable to update ticket status");
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
        const token =
          localStorage.getItem("token");
        const response =
          await fetch(
            `${API_BASE}/api/ai/chat?message=${encodeURIComponent(
              message
            )}`,
            {
              method: "POST",
               headers: {
                    Authorization:
                      `Bearer ${token}`,
                  },
            }
          );

        if (!response.ok) {
        if (
          response.status === 401 ||
          response.status === 403
        ) {
          handleUnauthorized();
          return;
        }

        throw new Error(
          "Unable to get AI response"
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
            currentUser={currentUser}
            unreadNotificationCount={unreadNotificationCount}
            setActivePage={setActivePage}
            
          />
        );

      case "create":
        return (
          <CreateTicket
            newTicket={newTicket}
            setNewTicket={setNewTicket}
            createTicket={createTicket}
            setActivePage={setActivePage}
            loadNotificationCount={loadNotificationCount}
            unreadNotificationCount={unreadNotificationCount}
            createdTicket={createdTicket}
            setCreatedTicket={setCreatedTicket}
            creatingTicket={creatingTicket}
            currentUser={currentUser}
            
            />
          );
      
      case "deleted":
        return (
          <DeletedTickets />
        );

      case "notifications":
        return (
          <Notifications
            currentUser={currentUser}
            unreadNotificationCount={unreadNotificationCount}
             setUnreadNotificationCount={setUnreadNotificationCount}
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
            currentUser={currentUser}
            unreadNotificationCount={unreadNotificationCount}       
            setActivePage={setActivePage}
          />
        );

      default:
        return (
          <Dashboard
            tickets={tickets}
            analytics={analytics}
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
             currentUser={currentUser}
             unreadNotificationCount={unreadNotificationCount}
          />
        );
    }
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");

  setCurrentUser({
    username: "",
    role: "",
  });

  setIsAuthenticated(false);

  setTickets([]);

  setActivePage("dashboard");
  setSelectedTicket(null);
  setEditingTicket(null);
};

const handleUnauthorized = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");

  setCurrentUser({
    username: "",
    role: "",
  });

  setIsAuthenticated(false);
  setTickets([]);

  setActivePage("dashboard");
  setSelectedTicket(null);
  setEditingTicket(null);
};

  // =========================================================
  // APP UI
  // =========================================================
      if (!isAuthenticated) {

        if (showRegister) {
          return (
            <Register
              registerForm={registerForm}
              setRegisterForm={setRegisterForm}
              onRegister={registerUser}
              registerLoading={registerLoading}
              registerError={registerError}
              registerSuccess={registerSuccess}
              onGoToLogin={() => {
                setShowRegister(false);
                setRegisterError("");
                setRegisterSuccess("");
              }}
            />
          );
        }

        return (
          <Login
            loginForm={loginForm}
            setLoginForm={setLoginForm}
            onLogin={loginUser}
            loginLoading={loginLoading}
            loginError={loginError}
            onGoToRegister={() => {
              setShowRegister(true);
              setLoginError("");
            }}
          />
        );
      }
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
        onLogout={logoutUser}
        currentUser={currentUser}
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
          currentUser={currentUser}
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