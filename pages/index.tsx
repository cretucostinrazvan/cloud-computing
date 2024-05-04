import { useState, FormEvent } from "react";
import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useRouter } from "next/router";

type ConnectionStatus = {
  isConnected: boolean;
};

export const getServerSideProps: GetServerSideProps<ConnectionStatus> = async () => {
  try {
    await clientPromise;
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({ isConnected }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [loginEmail, setLoginEmail] = useState(""); 
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState(""); 
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerFirstName, setRegisterFirstName] = useState(""); 
  const [registerLastName, setRegisterLastName] = useState(""); 
  const [error, setError] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      setError("Te rog completează ambele câmpuri!");
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      if (response.ok) {
        router.push("/dashboard");
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error("Eroare la autentificare:", error);
      setError("A apărut o eroare la autentificare. Te rugăm să încerci din nou mai târziu.");
    }
  };

  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!registerEmail || !registerPassword || !registerFirstName || !registerLastName) { 
      setError("Te rog completează toate câmpurile!");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: registerEmail, password: registerPassword, firstName: registerFirstName, lastName: registerLastName }),
      });

      if (response.ok) {
        setError("");
        setRegisterEmail("");
        setRegisterPassword("");
        setRegisterFirstName("");
        setRegisterLastName("");
        alert("Contul a fost creat cu succes!");
        router.push("/dashboard");

      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error("Eroare la înregistrare:", error);
      setError("A apărut o eroare la crearea contului. Te rugăm să încerci din nou mai târziu.");
    }
  };

  const toggleForm = () => {
    setShowRegisterForm((prevValue) => !prevValue);
    setError("");
    setLoginEmail("");
    setLoginPassword("");
  };

  return (
    <div style={{ 
      maxWidth: "600px", 
      margin: "0 auto", 
      textAlign: "center", 
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f0f0f0",
      padding: "80px",
      borderRadius: "10px",
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }}>
      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
      {showRegisterForm ? (
        <form onSubmit={handleRegisterSubmit} style={{ marginTop: "20px" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Crează un cont nou</h1>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="registerFirstName" style={{ display: "block", marginBottom: "0.5rem" }}>Nume:</label>
            <input
              type="text"
              id="registerFirstName"
              value={registerFirstName}
              onChange={(e) => setRegisterFirstName(e.target.value)}
              style={{ width: "100%", border: "1px solid #ced4da", borderRadius: "0.25rem", padding: "0.5rem" }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="registerLastName" style={{ display: "block", marginBottom: "0.5rem" }}>Prenume:</label>
            <input
              type="text"
              id="registerLastName"
              value={registerLastName}
              onChange={(e) => setRegisterLastName(e.target.value)}
              style={{ width: "100%", border: "1px solid #ced4da", borderRadius: "0.25rem", padding: "0.5rem" }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="registerEmail" style={{ display: "block", marginBottom: "0.5rem" }}>Email:</label>
            <input
              type="text"
              id="registerEmail"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              style={{ width: "100%", border: "1px solid #ced4da", borderRadius: "0.25rem", padding: "0.5rem" }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="registerPassword" style={{ display: "block", marginBottom: "0.5rem" }}>Parolă:</label>
            <input
              type="password"
              id="registerPassword"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              style={{ width: "100%", border: "1px solid #ced4da", borderRadius: "0.25rem", padding: "0.5rem" }}
            />
          </div>
          <button type="submit" style={{ marginTop: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "0.25rem", padding: "0.5rem 1rem", cursor: "pointer" }}>Înregistrare</button>
          <button type="button" onClick={toggleForm} style={{ marginLeft: "30px", marginTop: "10px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "0.25rem", padding: "0.5rem 1rem", cursor: "pointer" }}>Am deja cont</button>
        </form>
      ) : (
        <form onSubmit={handleLoginSubmit} style={{ marginTop: "20px" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Autentificare</h1>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="loginEmail" style={{ display: "block", marginBottom: "0.5rem" }}>Email:</label>
            <input
              type="text"
              id="loginEmail"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              style={{ width: "100%", border: "1px solid #ced4da", borderRadius: "0.25rem", padding: "0.5rem" }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="loginPassword" style={{ display: "block", marginBottom: "0.5rem" }}>Parolă:</label>
            <input
              type="password"
              id="loginPassword"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              style={{ width: "100%", border: "1px solid #ced4da", borderRadius: "0.25rem", padding: "0.5rem" }}
            />
          </div>
          <button type="submit" style={{ marginTop: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "0.25rem", padding: "0.5rem 1rem", cursor: "pointer" }}>Autentificare</button>
          <button type="button" onClick={toggleForm} style={{ marginLeft: "30px", marginTop: "10px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "0.25rem", padding: "0.5rem 1rem", cursor: "pointer" }}>Nu am cont</button>
        </form>
      )}
    </div>
  );
}
