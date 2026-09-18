import { useState } from "react";
function Login({
  loginForm,
  setLoginForm,
  onLogin,
  loginLoading,
  loginError,
  onGoToRegister,
}) {
  const [showPassword, setShowPassword] = useState(false);
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
            INTELLIGENT IT SUPPORT
          </div>

          <h2>
            Smarter support.
            <br />
            <span>Faster solutions.</span>
          </h2>

          <p>
            Manage your IT support tickets with an
            intelligent assistant that helps analyze,
            organize and resolve issues faster.
          </p>


          <div className="auth-features">

            <div className="auth-feature">
              <div className="auth-feature-icon">
                ✦
              </div>

              <div>
                <strong>AI-Powered Analysis</strong>
                <span>
                  Automatically analyze support requests
                  and identify priority.
                </span>
              </div>
            </div>


            <div className="auth-feature">
              <div className="auth-feature-icon">
                ✓
              </div>

              <div>
                <strong>Smart Ticket Management</strong>
                <span>
                  Track, organize and manage your support
                  tickets efficiently.
                </span>
              </div>
            </div>


            <div className="auth-feature">
              <div className="auth-feature-icon">
                🔒
              </div>

              <div>
                <strong>Secure Access</strong>
                <span>
                  Role-based access with secure
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


      {/* RIGHT LOGIN SECTION */}
      <div className="auth-form-section">

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

          <div className="auth-form-heading">

            <div className="auth-form-icon">
              →
            </div>

            <div>
              <h2>Welcome back</h2>

              <p>
                Sign in to continue to your support dashboard.
              </p>
            </div>

          </div>


          {loginError && (
            <div className="auth-error">
              <span>⚠</span>
              <p>{loginError}</p>
            </div>
          )}


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
                  type={showPassword ? "text" : "password"}
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
                    setShowPassword((previous) => !previous)
                  }
                  disabled={loginLoading}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "🙈" : "👁"}
                </button>

              </div>

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
                  : "Sign In"}
              </span>

              {!loginLoading && (
                <span className="auth-button-arrow">
                  →
                </span>
              )}

            </button>

          </form>


          {/* REGISTER */}
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

            <span>🔒</span>

            <div>
              <strong>Secure authentication</strong>
              <p>
                Your account is protected with secure
                authentication.
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

export default Login;