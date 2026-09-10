function Register({
  registerForm,
  setRegisterForm,
  onRegister,
  registerLoading,
  registerError,
  registerSuccess,
  onGoToLogin,
}) {
  return (
    <div className="login-page">

      <div className="login-card">

        {/* BRAND */}
        <div className="login-brand">

          <div className="login-brand-icon">
            🤖
          </div>

          <div>
            <h1>AI IT Support</h1>
            <p>Service Management</p>
          </div>

        </div>

        {/* HEADING */}
        <div className="login-heading">

          <h2>Create an account</h2>

          <p>
            Register to access the AI IT support platform.
          </p>

        </div>

        {/* ERROR */}
        {registerError && (
          <div className="login-error">
            {registerError}
          </div>
        )}
        
        {/* SUCCESS */}
        {registerSuccess && (
          <div className="register-success">
            {registerSuccess}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={onRegister}>

          {/* USERNAME */}
          <div className="login-form-group">

            <label>
              Username
            </label>

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

          {/* PASSWORD */}
          <div className="login-form-group">

            <label>
              Password
            </label>

            <input
              type="password"
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

          </div>

          {/* CONFIRM PASSWORD */}
          <div className="login-form-group">

            <label>
              Confirm Password
            </label>

            <input
              type="password"
              value={registerForm.confirmPassword}
              onChange={(e) =>
                setRegisterForm((previous) => ({
                  ...previous,
                  confirmPassword: e.target.value,
                }))
              }
              placeholder="Confirm your password"
              required
              disabled={registerLoading}
            />

          </div>

          {/* REGISTER BUTTON */}
          <button
            type="submit"
            className="login-button"
            disabled={registerLoading}
          >
            {registerLoading
              ? "Creating account..."
              : "Create Account"}
          </button>

        </form>

        {/* LOGIN LINK */}
        <div className="register-login-link">

          <span>
            Already have an account?
          </span>

          <button
            type="button"
            onClick={onGoToLogin}
          >
            Sign in
          </button>

        </div>

        {/* FOOTER */}
        <div className="login-footer">
          <span>
            AI-powered IT support platform
          </span>
        </div>

      </div>

    </div>
  );
}

export default Register;