import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../util/authContext";

const styles = {
  wrapper: {
    
  },
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "12em",
  },
  submitButton: {
    marginTop: "1em",
  },
};

function LoginPage() {
  const { login } = useAuth();
  const history = useHistory();
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [isPending, setIsPending] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = formState;
    if (password.length < 8) {
      alert("Password must have at least 8 characters.");
    } else if (username.length < 6) {
      alert("Username must contain at least 6 characters.");
    } else if (username.length > 16) {
      alert("Username must not contain more than 16 characters.");
    } else {
      setIsPending(true);
      login({ username, password })
        .then(() => history.push("/"))
        .catch((error) => {
          console.log(error);
          alert("Username/password error.");
          setIsPending(false);
        });
    }
  };
  return (
    <div style={styles.wrapper} className="card">
      <h1 className="about-title mx-auto">Login</h1>
      <div>{isPending && "Loading..."}</div>{" "}
      <form disabled={isPending} style={styles.form} onSubmit={handleSubmit} className="mx-auto">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formState.username}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formState.password}
          onChange={handleInputChange}
        />
        <button type="submit" style={styles.submitButton}>
          Submit
        </button>
      </form>
      <div className="mx-auto">
        <a href="/signup">New here? Sign up!</a>

      </div>
    </div>
  );
}
export default LoginPage;
