import { useState, FormEvent, useEffect } from "react";
import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

type Project = {
  _id: string;
  name: string;
  details: string;
  deadline: Date; 
  priority: string;
};

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
  const [projects, setProjects] = useState<Project[]>([]);
  const [registerName, setRegisterName] = useState(""); 
  const [registerDetails, setRegisterDetails] = useState("");
  const [registerDeadline, setRegisterDeadline] = useState(""); 
  const [registerPriority, setRegisterPriority] = useState(""); 
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/getProject");
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          setError("A apărut o eroare la obținerea proiectelor.");
        }
      } catch (error) {
        console.error("Eroare la obținerea proiectelor:", error);
        setError("A apărut o eroare la obținerea proiectelor.");
      }
    }

    fetchProjects();
  }, []);

  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!registerName || !registerDetails || !registerDeadline || !registerPriority) {
      setError("Te rog completează toate câmpurile!");
      return;
    }

    try {
      const response = await fetch("/api/createProject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          name: registerName, 
          details: registerDetails, 
          deadline: new Date(registerDeadline),
          priority: registerPriority 
        }),
      });

      if (response.ok) {
        setError("");
        setRegisterName("");
        setRegisterDetails("");
        setRegisterDeadline("");
        setRegisterPriority("");
        alert("Proiectul a fost creat cu succes!");
        window.location.reload();
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error("Eroare la înregistrare:", error);
      setError("A apărut o eroare la crearea proiectului.");
    }
  };

  const handleDeleteAllProjects = async () => {
    try {
      const response = await fetch("/api/deleteAllProjects", {
        method: "DELETE",
      });

      if (response.ok) {
        setError("");
        setProjects([]);
        alert("Toate proiectele au fost șterse cu succes!");
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error("Eroare la ștergerea proiectelor:", error);
      setError("A apărut o eroare la ștergerea proiectelor.");
    }
  };
  return (
    <div style={{ 
      maxWidth: "1000px", 
      margin: "0 auto", 
      textAlign: "center", 
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f0f0f0",
      borderRadius: "10px",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <div style={{ width: "45%", padding: "1rem" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Project Manager</h2>
        <form onSubmit={handleRegisterSubmit} style={{ marginTop: "20px" }}>
          {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="registerName" style={{ display: "block", marginBottom: "0.5rem", textAlign:"left" ,       fontFamily: "Arial, sans-serif"  }}>Denumire:</label>
            <input
              type="text"
              id="registerName"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              style={{ width: "100%", border: "1px solid #ced4da", borderRadius: "0.25rem", padding: "0.5rem",       fontFamily: "Arial, sans-serif" }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="registerDetails" style={{ display: "block", marginBottom: "0.5rem",  textAlign:"left",       fontFamily: "Arial, sans-serif"}}>Detalii:</label>
            <input
              type="text"
              id="registerDetails"
              value={registerDetails}
              onChange={(e) => setRegisterDetails(e.target.value)}
              style={{ width: "100%", border: "1px solid #ced4da", borderRadius: "0.25rem", padding: "0.5rem",       fontFamily: "Arial, sans-serif" }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="registerDeadline" style={{ display: "block", marginBottom: "0.5rem", textAlign:"left",       fontFamily: "Arial, sans-serif" }}>Deadline:</label>
            <input
              type="date"
              id="registerDeadline"
              value={registerDeadline}
              onChange={(e) => setRegisterDeadline(e.target.value)}
              style={{ width: "100%" ,border: "1px solid #ced4da", borderRadius: "0.25rem", padding: "0.5rem"  }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="registerPriority" style={{ display: "block", marginBottom: "0.5rem", textAlign:"left",       fontFamily: "Arial, sans-serif" }}>Prioritate:</label>
            <select
              id="registerPriority"
              value={registerPriority}
              onChange={(e) => setRegisterPriority(e.target.value)}
              style={{ width: "100%", border: "1px solid #ced4da", borderRadius: "0.25rem", padding: "0.5rem",       fontFamily: "Arial, sans-serif" }}
            >
              <option value="" style={{fontFamily:"Arial, sans-serif"}}>Alegeți prioritatea</option>
              <option value="Scăzută" style={{fontFamily:"Arial, sans-serif"}}>Scăzută</option>
              <option value="Medie" style={{fontFamily:"Arial, sans-serif"}}>Medie</option>
              <option value="Ridicată" style={{fontFamily:"Arial, sans-serif"}}>Ridicată</option>
            </select>
          </div>
          <button 
            type="submit" 
            style={{ 
              marginTop: "10px", 
              backgroundColor: "#007bff", 
              color: "white", 
              border: "none", 
              borderRadius: "0.25rem", 
              padding: "0.5rem 1rem", 
              cursor: "pointer" 
            }}
          >
            Creare
          </button>
        </form>
      </div>
      <div style={{ width: "65%", padding: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Proiecte</h2>
          <button 
            onClick={handleDeleteAllProjects} 
            style={{ 
              backgroundColor: "red", 
              color: "white", 
              border: "none", 
              borderRadius: "0.25rem", 
              padding: "0.5rem 1rem", 
              cursor: "pointer" 
            }}
          >
            Golește lista
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
          {projects.map((project) => (
            <div key={project._id} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "0.25rem" }}>
              <h3 style={{ marginBottom: "0.5rem", fontSize: "1.2rem" }}><strong style={{color: "blue"}}>Denumire:</strong> {project.name}</h3>
              <p style={{ marginBottom: "0.25rem" }}><strong>Detalii:</strong> {project.details}</p>
              <p style={{ marginBottom: "0.25rem" }}><strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}</p>
              <p style={{ marginBottom: "0.25rem" }}><strong>Prioritate:</strong> {project.priority}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
