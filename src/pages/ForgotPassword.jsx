import { useState } from "react";
import "./Auth.css";
import { API_BASE } from "../config/api";

function ForgotPassword({
  onGoToLogin,
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE}/api/auth/forgot-password?email=${encodeURIComponent(
          email
        )}`,
        {
          method: "POST",
        }
      );

      const data = await response.text();

      if (!response.ok) {
        throw new Error(
          data || "Unable to process password reset request."
        );
      }

      setSuccess(data);

      setEmail("");

    } catch (err) {
      console.error(
        "Forgot password error:",
        err
      );

      setError(
        err.message ||
        "Unable to process password reset request."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* Background decorative circles */}
      <div className="auth-bg-circle auth-bg-circle-one"></div>
      <div className="auth-bg-circle auth-bg-circle-two"></div>
      <div className="auth-bg-circle auth-bg-circle-three"></div>

      <div className="auth-container">

        {/* LEFT BRAND SECTION */}
        <section className="auth-brand-section">

          <div className="auth-brand">
            <div className="auth-brand-icon">
              🤖
            </div>

            <div>
              <h1>AI IT Support</h1>
              <span>Service Management</span>
            </div>
          </div>

          <div className="auth-brand-content">

            <div className="auth-eyebrow">
              <span>✦</span>
              ACCOUNT RECOVERY
            </div>

            <h2>
              Secure your
              <br />
              <span>account again.</span>
            </h2>

            <p>
              Forgot your password? No problem.
              We'll help you securely regain access
              to your AI IT Support workspace.
            </p>

            <div className="auth-features">

              <div className="auth-feature">
                <div className="auth-feature-icon">
                  🔐
                </div>

                <div>
                  <strong>Secure Recovery</strong>

                  <span>
                    Your password reset request
                    is securely processed.
                  </span>
                </div>
              </div>

              <div className="auth-feature">
                <div className="auth-feature-icon">
                  ✉
                </div>

                <div>
                  <strong>Email Verification</strong>

                  <span>
                    Receive a secure password
                    reset link in your email.
                  </span>
                </div>
              </div>

              <div className="auth-feature">
                <div className="auth-feature-icon">
                  ⏱
                </div>

                <div>
                  <strong>Time-Limited Link</strong>

                  <span>
                    Reset links expire after
                    15 minutes for security.
                  </span>
                </div>
              </div>

            </div>
          </div>

          <div className="auth-brand-footer">
            <span>
              AI-powered IT support platform
            </span>

            <span className="auth-footer-dot">
              •
            </span>

            <span>
              Secure & Intelligent
            </span>
          </div>

        </section>

        {/* RIGHT FORM SECTION */}
        <section className="auth-form-section">

          <div className="auth-form-card">

            <div className="auth-form-icon">
              🔑
            </div>

            <div className="auth-form-heading">

              <h2>
                Forgot password?
              </h2>

              <p>
                Enter your registered email and
                we'll send you a secure reset link.
              </p>

            </div>

            {/* ERROR */}
            {error && (
              <div className="auth-error">
                <span>⚠</span>

                <p>
                  {error}
                </p>
              </div>
            )}

            {/* SUCCESS */}
            {success && (
              <div className="auth-success">
                <span>✓</span>

                <p>
                  {success}
                </p>
              </div>
            )}

            <form onSubmit={handleForgotPassword}>

              <div className="auth-form-group">

                <label>
                  Email
                </label>

                <div className="auth-input-wrapper">

                  <span className="auth-input-icon">
                    ✉
                  </span>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter your registered email"
                    required
                    disabled={loading}
                  />

                </div>

              </div>

              <button
                type="submit"
                className="auth-submit-button"
                disabled={loading}
              >

                <span>
                  {loading
                    ? "SENDING..."
                    : "SEND RESET LINK"}
                </span>

                {!loading && (
                  <span className="auth-button-arrow">
                    →
                  </span>
                )}

              </button>

            </form>

            {/* BACK TO LOGIN */}
            <div className="auth-switch">

              <span>
                Remember your password?
              </span>

              <button
                type="button"
                onClick={onGoToLogin}
              >
                Sign in
                <span> →</span>
              </button>

            </div>

            <div className="auth-security">

              <div className="auth-security-icon">
                🔒
              </div>

              <div>

                <strong>
                  Secure password recovery
                </strong>

                <p>
                  Your reset link is protected
                  and expires after 15 minutes.
                </p>

              </div>

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}

export default ForgotPassword;