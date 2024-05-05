import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, details, deadline, priority } = req.body;

    if (!name || !details || !deadline || !priority) {
      return res.status(400).json({ message: "Toate câmpurile sunt obligatorii." });
    }

    try {
      const client = await clientPromise;
      const db = client.db();
      const projectsCollection = db.collection("projects");

      const existingProject = await projectsCollection.findOne({
        $or: [
          { name: name }
        ]
      });

      if (existingProject) {
        return res.status(400).json({ message: "Un proiect cu acest nume există deja." });
      }

      await projectsCollection.insertOne({ name, details, deadline, priority });

      return res.status(200).json({ message: "Proiectul a fost creat cu succes!" });
    } catch (error) {
      console.error("Eroare la adăugarea în baza de date:", error);
      return res.status(500).json({ message: "A apărut o eroare la crearea proiectului. Te rugăm să încerci din nou mai târziu." });
    }
  }

  return res.status(405).json({ message: "Metoda HTTP nu este permisă." });
}
