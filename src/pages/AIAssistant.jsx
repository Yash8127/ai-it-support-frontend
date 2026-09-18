import Header from "../components/Header";
import { useEffect, useRef } from "react";
function AIAssistant({
  chatMessage,
  setChatMessage,
  chatMessages,
  chatLoading,
  sendChatMessage,
  currentUser,
  unreadNotificationCount,
 setActivePage,
 setMobileSidebarOpen,
}) {
    const chatBottomRef = useRef(null);
      useEffect(() => {
    chatBottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chatMessages, chatLoading]);

  const renderMessage = (message) => {
  if (
    message.role === "assistant" &&
    message.text.startsWith("🎫 Found ")
  ) {
    const blocks = message.text
      .split("\n\n")
      .filter((block) =>
        block.startsWith("🎫 Ticket #")
      );

    const heading = message.text
      .split("\n\n")[0];

    return (
      <div className="ai-ticket-result">
        <div className="ai-ticket-count">
          {heading}
        </div>

        {blocks.map((block, index) => {
          const lines = block.split("\n");

          const ticketNumber =
            lines[0]
              ?.replace("🎫 Ticket #", "")
              .trim();

          const title =
            lines[1]
              ?.replace("Title:", "")
              .trim();

          const category =
            lines[2]
              ?.replace("Category:", "")
              .trim();

          const priority =
            lines[3]
              ?.replace("Priority:", "")
              .trim();

          const status =
            lines[4]
              ?.replace("Status:", "")
              .trim();

          return (
            <div
              className="ai-ticket-card"
              key={index}
            >
              <div className="ai-ticket-card-header">
                <strong>
                  🎫 Ticket #{ticketNumber}
                </strong>
              </div>

              <h4>{title}</h4>

              <div className="ai-ticket-details">

                <div>
                  <span>Category</span>
                  <strong>{category}</strong>
                </div>

                <div>
                  <span>Priority</span>
                  <strong>{priority}</strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong>{status}</strong>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return message.text;
};
  return (
    <>
      <Header
        title="AI Assistant"
        subtitle="Ask questions about your IT support tickets."
        currentUser={currentUser}
        unreadNotificationCount={unreadNotificationCount}
        setActivePage={setActivePage}
        setMobileSidebarOpen={setMobileSidebarOpen}
      />

      <div className="chat-container">
        <div className="chat-header">
          <div className="chat-avatar">✦</div>

          <div>
            <h3>
              AI IT Support Assistant
            </h3>

            <div className="online">
              <span></span>
              Online
            </div>
          </div>
        </div>

        <div className="chat-body">
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${
                message.role === "user"
                  ? "user-message"
                  : ""
              }`}
            >
              {message.role === "assistant" && (
                <div className="message-avatar">
                  ✦
                </div>
              )}

              <div className="message-bubble">
                 {renderMessage(message)}
              </div>
            </div>
          ))}

        {chatLoading && (
            <div className="message assistant">
                <div className="message-avatar">
                ✦
                </div>

                <div className="ai-processing-message">
                <div className="processing-header">
                    <div className="processing-spinner"></div>

                    <strong>
                    Request is being processed...
                    </strong>
                </div>

                <p>
                    Please wait while I retrieve the ticket
                    information. You'll get the results shortly.
                </p>

                <div className="processing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                </div>
            </div>
            )}
             <div ref={chatBottomRef} />
        </div>

        <form
          className="chat-input-area"
          onSubmit={sendChatMessage}
        >
          <input
            type="text"
            placeholder="Ask about tickets, status, priority..."
            value={chatMessage}
            onChange={(e) =>
              setChatMessage(e.target.value)
            }
          />

          <button
            type="submit"
            disabled={chatLoading}
          >
            ➤
          </button>
        </form>

        <div className="chat-suggestions">
          <button
            type="button"
            onClick={() =>
              setChatMessage(
                "Show me all critical tickets"
              )
            }
          >
            Critical tickets
          </button>

          <button
            type="button"
            onClick={() =>
              setChatMessage(
                "Show me all open tickets"
              )
            }
          >
            Open tickets
          </button>

          <button
            type="button"
            onClick={() =>
              setChatMessage(
                "Show me all high priority tickets"
              )
            }
          >
            High priority
          </button>

          <button
            type="button"
            onClick={() =>
              setChatMessage(
                "Find laptop tickets"
              )
            }
          >
            Laptop issues
          </button>
        </div>
      </div>
    </>
  );
}
export default AIAssistant;