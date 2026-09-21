import { useState } from "react";
import "./Auth.css";

function Register({
  registerForm,
  setRegisterForm,
  onRegister,
  registerLoading,
  registerError,
  registerSuccess,
  onGoToLogin,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

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
              GET STARTED WITH AI IT SUPPORT
            </div>


            <h2>
              Build smarter.
              <br />
              <span>Support better.</span>
            </h2>


            <p>
              Create your account and experience an
              intelligent IT support platform designed
              to simplify ticket management.
            </p>


            {/* FEATURES */}

            <div className="auth-features">

              <div className="auth-feature">

                <div className="auth-feature-icon">
                  ✦
                </div>

                <div>
                  <strong>
                    AI-Powered Assistance
                  </strong>

                  <span>
                    Get intelligent suggestions and
                    automated ticket analysis.
                  </span>
                </div>

              </div>


              <div className="auth-feature">

                <div className="auth-feature-icon">
                  ◈
                </div>

                <div>
                  <strong>
                    Organized Support
                  </strong>

                  <span>
                    Manage your IT requests from one
                    centralized platform.
                  </span>
                </div>

              </div>


              <div className="auth-feature">

                <div className="auth-feature-icon">
                  ♢
                </div>

                <div>
                  <strong>
                    Secure Account
                  </strong>

                  <span>
                    Your account is protected with secure
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
            RIGHT REGISTER SECTION
            =================================================== */}

        <section className="auth-form-section">

          <div className="auth-form-card">

            {/* TOP ICON */}

            <div className="auth-form-icon">
              +
            </div>


            {/* HEADING */}

            <div className="auth-form-heading">

              <h2>
                Create your account
              </h2>

              <p>
                Register to access your intelligent
                support workspace.
              </p>

            </div>


            {/* ERROR */}

            {registerError && (

              <div className="auth-error">

                <span>
                  ⚠
                </span>

                <p>
                  {registerError}
                </p>

              </div>

            )}


            {/* SUCCESS */}

            {registerSuccess && (

              <div className="auth-success">

                <span>
                  ✓
                </span>

                <p>
                  {registerSuccess}
                </p>

              </div>

            )}


            {/* FORM */}

            <form onSubmit={onRegister}>

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
                    value={registerForm.username}
                    onChange={(e) =>
                      setRegisterForm((previous) => ({
                        ...previous,
                        username: e.target.value,
                      }))
                    }
                    placeholder="Choose a username"
                    required
                    disabled={registerLoading}
                  />

                </div>

              </div>

              {/* EMAIL */}

              <div className="auth-form-group">
                <label>Email</label>

                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">✉</span>

                  <input
                    type="email"
                    value={registerForm.email}
                    onChange={(e) =>
                      setRegisterForm((previous) => ({
                        ...previous,
                        email: e.target.value,
                      }))
                    }
                    placeholder="Enter your email"
                    required
                    disabled={registerLoading}
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
                    value={registerForm.password}
                    onChange={(e) =>
                      setRegisterForm((previous) => ({
                        ...previous,
                        password: e.target.value,
                      }))
                    }
                    placeholder="Create a password"
                    required
                    disabled={registerLoading}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (previous) => !previous
                      )
                    }
                    disabled={registerLoading}
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
                    value={
                      registerForm.confirmPassword
                    }
                    onChange={(e) =>
                      setRegisterForm((previous) => ({
                        ...previous,
                        confirmPassword:
                          e.target.value,
                      }))
                    }
                    placeholder="Confirm your password"
                    required
                    disabled={registerLoading}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        (previous) => !previous
                      )
                    }
                    disabled={registerLoading}
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword
                      ? "🙈"
                      : "👁"}
                  </button>

                </div>

              </div>


              {/* REGISTER BUTTON */}

              <button
                type="submit"
                className="auth-submit-button"
                disabled={registerLoading}
              >

                <span>
                  {registerLoading
                    ? "Creating account..."
                    : "CREATE ACCOUNT"}
                </span>

                {!registerLoading && (
                  <span className="auth-button-arrow">
                    →
                  </span>
                )}

              </button>

            </form>


            {/* LOGIN SWITCH */}

            <div className="auth-switch">

              <span>
                Already have an account?
              </span>

              <button
                type="button"
                onClick={onGoToLogin}
              >
                Sign in
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
                  Secure registration
                </strong>

                <p>
                  Your credentials are protected with
                  secure password encryption.
                </p>

              </div>

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}

export default Register;