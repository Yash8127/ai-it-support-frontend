import Header from "../components/Header";
function AIAssistant({
  chatMessage,
  setChatMessage,
  chatMessages,
  chatLoading,
  sendChatMessage,
  currentUser,
}) {
  return (
    <>
      <Header
        title="AI Assistant"
        subtitle="Ask questions about your IT support tickets."
        currentUser={currentUser}
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
                {message.text}
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