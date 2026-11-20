import { Component } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.jsx";

class AppErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{ padding: "40px", fontFamily: "system-ui", color: "#151625" }}
        >
          <h1>Ilovada xatolik yuz berdi</h1>
          <p style={{ marginTop: "12px", color: "#777b8e" }}>
            {this.state.error.message}
          </p>
          <button
            style={{
              marginTop: "20px",
              padding: "10px 14px",
              borderRadius: "8px",
              background: "#151625",
              color: "white",
            }}
            onClick={() => window.location.reload()}
          >
            Qayta yuklash
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById("root")).render(
  <AppErrorBoundary>
    <App />
  </AppErrorBoundary>,
);
