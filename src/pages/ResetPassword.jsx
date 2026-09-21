import { useEffect,useState } from "react";
import "./Auth.css";
import { API_BASE } from "../config/api";

function ResetPassword({
  onGoToLogin,
  onGoToForgotPassword,
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");
    
const [validatingToken, setValidatingToken] =
  useState(true);

const [tokenValid, setTokenValid] =
  useState(false);


useEffect(() => {
  const validateToken = async () => {

    const params = new URLSearchParams(
      window.location.search
    );

    const token = params.get("token");

    if (!token) {
      setError(
        "This password reset link is invalid or has expired."
      );
      setTokenValid(false);
      setValidatingToken(false);
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/api/auth/validate-reset-token?token=${encodeURIComponent(
          token
        )}`
      );

      const isValid = await response.json();

      setTokenValid(isValid);

      if (!isValid) {
        setError(
          "This password reset link is invalid or has expired."
        );
      }

    } catch (err) {
      console.error(
        "Token validation error:",
        err
      );

      setTokenValid(false);

      setError(
        "Unable to validate the password reset link."
      );

    } finally {
      setValidatingToken(false);
    }
  };

  validateToken();
}, []);


  const handleResetPassword = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    const params = new URLSearchParams(
      window.location.search
    );

    const token = params.get("token");

    if (!token) {
      setError(
        "Invalid password reset link."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE}/api/auth/reset-password?token=${encodeURIComponent(
          token
        )}&newPassword=${encodeURIComponent(
          password
        )}`,
        {
          method: "POST",
        }
      );

      const data = await response.text();

      if (!response.ok) {
        throw new Error(
          data || "Unable to reset password."
        );
      }

      if (
        data ===
        "Invalid or expired reset token"
      ) {
        setError(
          "This password reset link is invalid or has expired."
        );
        return;
      }

      if (
        data ===
        "Password reset successfully"
      ) {
        setSuccess(
          "Password reset successfully! You can now sign in."
        );

        setPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          onGoToLogin();
        }, 2000);

        return;
      }

      setError(
        "Unable to reset password. Please try again."
      );

    } catch (err) {
      console.error(
        "Reset password error:",
        err
      );

      setError(
        err.message ||
        "Unable to reset password."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

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
              <span>
                Service Management
              </span>
            </div>

          </div>

          <div className="auth-brand-content">

            <div className="auth-eyebrow">
              <span>✦</span>
              SECURE ACCOUNT RECOVERY
            </div>

            <h2>
              Create a new
              <br />
              <span>secure password.</span>
            </h2>

            <p>
              Choose a new password to regain
              secure access to your AI IT Support
              workspace.
            </p>

            <div className="auth-features">

              <div className="auth-feature">

                <div className="auth-feature-icon">
                  🔐
                </div>

                <div>
                  <strong>
                    Secure Password
                  </strong>

                  <span>
                    Your new password is securely
                    encrypted before storage.
                  </span>
                </div>

              </div>

              <div className="auth-feature">

                <div className="auth-feature-icon">
                  ⏱
                </div>

                <div>
                  <strong>
                    Time-Limited Link
                  </strong>

                  <span>
                    Password reset links expire
                    after 15 minutes.
                  </span>
                </div>

              </div>

              <div className="auth-feature">

                <div className="auth-feature-icon">
                  ✓
                </div>

                <div>
                  <strong>
                    One-Time Use
                  </strong>

                  <span>
                    The reset link becomes invalid
                    after successful use.
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
                Reset password
              </h2>

              <p>
                Enter and confirm your new password.
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

          {validatingToken ? (
            <div className="auth-reset-status">
                <div className="auth-reset-spinner"></div>

                <p>
                Validating your password reset link...
                </p>
            </div>

            ) : tokenValid ? (

            <form onSubmit={handleResetPassword}>

                {/* PASSWORD */}

                <div className="auth-form-group">

                <label>
                    New Password
                </label>

                <div className="auth-input-wrapper">

                    <span className="auth-input-icon">
                    🔒
                    </span>

                    <input
                    type={
                        showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    placeholder="Enter new password"
                    required
                    disabled={loading || !!success}
                    />

                    <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                        setShowPassword(
                        (previous) => !previous
                        )
                    }
                    disabled={loading}
                    >
                    {showPassword ? "🙈" : "👁"}
                    </button>

                </div>

                </div>

                {/* CONFIRM PASSWORD */}

                <div className="auth-form-group">

                <label>
                    Confirm Password
                </label>

                <div className="auth-input-wrapper">

                    <span className="auth-input-icon">
                    🔒
                    </span>

                    <input
                    type={
                        showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                        setConfirmPassword(
                        e.target.value
                        )
                    }
                    placeholder="Confirm new password"
                    required
                    disabled={loading || !!success}
                    />

                    <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                        setShowConfirmPassword(
                        (previous) => !previous
                        )
                    }
                    disabled={loading}
                    >
                    {showConfirmPassword
                        ? "🙈"
                        : "👁"}
                    </button>

                </div>

                </div>

                <button
                type="submit"
                className="auth-submit-button"
                disabled={loading || !!success}
                >

                <span>
                    {loading
                    ? "RESETTING..."
                    : "RESET PASSWORD"}
                </span>

                {!loading && !success && (
                    <span className="auth-button-arrow">
                    →
                    </span>
                )}

                </button>

            </form>

            ) : (

            <div className="auth-reset-expired">

                <div className="auth-reset-expired-icon">
                ⏱
                </div>

                <h3>
                Reset link expired
                </h3>

                <p>
                This password reset link is invalid
                or has expired.
                </p>

                <button
                type="button"
                className="auth-submit-button"
                onClick={onGoToForgotPassword}
                >
                <span>
                    REQUEST NEW RESET LINK
                </span>

                <span className="auth-button-arrow">
                    →
                </span>
                </button>

            </div>
            )}

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
                  Secure password reset
                </strong>

                <p>
                  Your password is protected
                  with secure encryption.
                </p>

              </div>

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}

export default ResetPassword;