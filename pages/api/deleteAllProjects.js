// pages/api/deleteAllProjects.js

import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    // Șterge toate proiectele
    await db.collection("projects").deleteMany({});

    res.status(200).json({ message: "Toate proiectele au fost șterse cu succes!" });
  } catch (error) {
    console.error("Eroare la ștergerea tuturor proiectelor:", error);
    res.status(500).json({ message: "A apărut o eroare la ștergerea tuturor proiectelor." });
  }
}
