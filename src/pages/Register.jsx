import { useState } from "react";

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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="auth-page">

      {/* LEFT BRANDING SECTION */}
      <div className="auth-brand-section">

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


          <div className="auth-features">

            <div className="auth-feature">

              <div className="auth-feature-icon">
                ✦
              </div>

              <div>
                <strong>AI-Powered Assistance</strong>

                <span>
                  Get intelligent suggestions and
                  automated ticket analysis.
                </span>
              </div>

            </div>


            <div className="auth-feature">

              <div className="auth-feature-icon">
                ✓
              </div>

              <div>
                <strong>Organized Support</strong>

                <span>
                  Manage your IT requests from one
                  centralized platform.
                </span>
              </div>

            </div>


            <div className="auth-feature">

              <div className="auth-feature-icon">
                🔒
              </div>

              <div>
                <strong>Secure Account</strong>

                <span>
                  Your account is protected with secure
                  authentication.
                </span>
              </div>

            </div>

          </div>

        </div>


        <div className="auth-brand-footer">

          <span>AI-powered IT support platform</span>

          <span>•</span>

          <span>Secure & Intelligent</span>

        </div>

      </div>


      {/* RIGHT REGISTER SECTION */}
      <div className="auth-form-section">

        {/* MOBILE BRAND */}
        <div className="auth-mobile-brand">

          <div className="auth-brand-icon">
            🤖
          </div>

          <div>
            <strong>AI IT Support</strong>
            <span>Service Management</span>
          </div>

        </div>


        <div className="auth-form-card">

          {/* HEADING */}
          <div className="auth-form-heading">

            <div className="auth-form-icon">
              +
            </div>

            <div>

              <h2>
                Create your account
              </h2>

              <p>
                Register to access your intelligent
                support workspace.
              </p>

            </div>

          </div>


          {/* ERROR */}
          {registerError && (

            <div className="auth-error">

              <span>⚠</span>

              <p>
                {registerError}
              </p>

            </div>

          )}


          {/* SUCCESS */}
          {registerSuccess && (

            <div className="auth-success">

              <span>✓</span>

              <p>
                {registerSuccess}
              </p>

            </div>

          )}


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
                  : "Create Account"}
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

            <span>🔒</span>

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


        <div className="auth-mobile-footer">
          AI-powered IT support platform
        </div>

      </div>

    </div>
  );
}

export default Register;