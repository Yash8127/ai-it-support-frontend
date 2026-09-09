function Login({
  loginForm,
  setLoginForm,
  onLogin,
  loginLoading,
  loginError,
  onGoToRegister,
}) {
  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-brand">
          <div className="login-brand-icon">
            🤖
          </div>

          <div>
            <h1>AI IT Support</h1>
            <p>Service Management</p>
          </div>
        </div>

        <div className="login-heading">
          <h2>Welcome back</h2>
          <p>
            Sign in to access your IT support dashboard.
          </p>
        </div>

        {loginError && (
          <div className="login-error">
            {loginError}
          </div>
        )}

        <form onSubmit={onLogin}>

          <div className="login-form-group">
            <label>Username</label>

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

          <div className="login-form-group">
            <label>Password</label>

            <input
              type="password"
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
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loginLoading}
          >
            {loginLoading
              ? "Signing in..."
              : "Sign In"}
          </button>

        </form>

          <div className="register-login-link">

                <span>
                    Don't have an account?
                </span>

                <button
                    type="button"
                    onClick={onGoToRegister}
                >
                    Create account
                </button>

        </div>

        <div className="login-footer">
          <span>AI-powered IT support platform</span>
        </div>

      

      </div>
    </div>
  );
}

export default Login;