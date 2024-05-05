import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const db = client.db();
      const projectsCollection = db.collection("projects");

      const projects = await projectsCollection.find({}).toArray();

      return res.status(200).json(projects);
    } catch (error) {
      console.error("Eroare la obținerea datelor din baza de date:", error);
      return res.status(500).json({ message: "A apărut o eroare la obținerea proiectelor." });
    }
  }

  return res.status(405).json({ message: "Metoda HTTP nu este permisă." });
}
