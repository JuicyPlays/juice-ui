import { Component } from "react";
import NavBar from "./NavBar";

class RenderAccount extends Component {
  render() {
    return (
      <>
        <NavBar />
        <div style={{ padding: "100px 24px", textAlign: "center", color: "white", fontFamily: "'Inter', sans-serif" }}>
          <h2>My Account</h2>
          <p style={{ color: "var(--text-muted)" }}>Account management features coming soon.</p>
        </div>
      </>
    );
  }
}

export default RenderAccount;
