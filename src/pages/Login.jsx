import { useState } from "react";
import "./Auth.css";

function Login({
  loginForm,
  setLoginForm,
  onLogin,
  loginLoading,
  loginError,
  onGoToRegister,
   onGoToForgotPassword,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-page">

      {/* =====================================================
          BACKGROUND DECORATION
          ===================================================== */}

      <div className="auth-bg-circle auth-bg-circle-one"></div>
      <div className="auth-bg-circle auth-bg-circle-two"></div>
      <div className="auth-bg-circle auth-bg-circle-three"></div>

      {/* =====================================================
          MAIN AUTH CONTAINER
          ===================================================== */}

      <div className="auth-container">

        {/* ===================================================
            LEFT BRANDING SECTION
            =================================================== */}

        <section className="auth-brand-section">

          {/* BRAND */}
          <div className="auth-brand">

            <div className="auth-brand-icon">
              🤖
            </div>

            <div>
              <h1>AI IT Support</h1>
              <span>Service Management</span>
            </div>

          </div>


          {/* BRAND CONTENT */}
          <div className="auth-brand-content">

            <div className="auth-eyebrow">
              <span>✦</span>
              AI POWERED SUPPORT
            </div>

            <h2>
              Welcome to
              <br />
              <span>AI IT Support</span>
            </h2>

            <p>
              Intelligent IT support designed to help teams
              manage, analyze and resolve support issues faster.
            </p>


            {/* FEATURES */}

            <div className="auth-features">

              <div className="auth-feature">

                <div className="auth-feature-icon">
                  ✦
                </div>

                <div>
                  <strong>AI-Powered Assistance</strong>

                  <span>
                    Intelligent suggestions and automated
                    ticket analysis.
                  </span>
                </div>

              </div>


              <div className="auth-feature">

                <div className="auth-feature-icon">
                  ◈
                </div>

                <div>
                  <strong>Smart Ticket Management</strong>

                  <span>
                    Track, organize and manage IT tickets
                    efficiently.
                  </span>
                </div>

              </div>


              <div className="auth-feature">

                <div className="auth-feature-icon">
                  ♢
                </div>

                <div>
                  <strong>Secure & Reliable</strong>

                  <span>
                    Role-based access with secure
                    authentication.
                  </span>
                </div>

              </div>

            </div>

          </div>


          {/* LEFT FOOTER */}

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


        {/* ===================================================
            RIGHT LOGIN SECTION
            =================================================== */}

        <section className="auth-form-section">

          <div className="auth-form-card">

            {/* TOP ICON */}

            <div className="auth-form-icon">
              →
            </div>


            {/* HEADING */}

            <div className="auth-form-heading">

              <h2>
                Sign in
              </h2>

              <p>
                Access your IT support workspace.
              </p>

            </div>


            {/* ERROR */}

            {loginError && (
              <div className="auth-error">

                <span>
                  ⚠
                </span>

                <p>
                  {loginError}
                </p>

              </div>
            )}


            {/* FORM */}

            <form onSubmit={onLogin}>

              {/* USERNAME */}

              <div className="auth-form-group">

                <label>
                  Username
                </label>

                <div className="auth-input-wrapper">

                  <span className="auth-input-icon">
                    ◉
                  </span>

                  <input
                    type="text"
                    value={loginForm.username}
                    onChange={(e) =>
                      setLoginForm((previous) => ({
                        ...previous,
                        username: e.target.value,
                      }))
                    }
                    placeholder="Enter your username"
                    required
                    disabled={loginLoading}
                  />

                </div>

              </div>


              {/* PASSWORD */}

              <div className="auth-form-group">

                <label>
                  Password
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
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm((previous) => ({
                        ...previous,
                        password: e.target.value,
                      }))
                    }
                    placeholder="Enter your password"
                    required
                    disabled={loginLoading}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (previous) => !previous
                      )
                    }
                    disabled={loginLoading}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword
                      ? "🙈"
                      : "👁"}
                  </button>

                </div>

              </div>

              {/* FORGOT PASSWORD */}
              <div className="forgot-password-row">
                <button
                  type="button"
                  className="forgot-password-link"
                  onClick={onGoToForgotPassword}
                  disabled={loginLoading}
                >
                  Forgot Password?
                </button>
              </div>


              {/* LOGIN BUTTON */}

              <button
                type="submit"
                className="auth-submit-button"
                disabled={loginLoading}
              >

                <span>
                  {loginLoading
                    ? "Signing in..."
                    : "SIGN IN"}
                </span>

                {!loginLoading && (
                  <span className="auth-button-arrow">
                    →
                  </span>
                )}

              </button>

            </form>


            {/* REGISTER SWITCH */}

            <div className="auth-switch">

              <span>
                Don't have an account?
              </span>

              <button
                type="button"
                onClick={onGoToRegister}
              >
                Create account
                <span> →</span>
              </button>

            </div>


            {/* SECURITY */}

            <div className="auth-security">

              <div className="auth-security-icon">
                🔒
              </div>

              <div>

                <strong>
                  Secure authentication
                </strong>

                <p>
                  Your credentials are protected with
                  secure authentication.
                </p>

              </div>

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}

export default Login;