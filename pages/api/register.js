import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "Toate câmpurile sunt obligatorii." });
    }

    try {
      const client = await clientPromise;
      const db = client.db();
      const usersCollection = db.collection("users");

      const existingUser = await usersCollection.findOne({
        $or: [
          { email: email }
        ]
      });

      if (existingUser) {
        return res.status(400).json({ message: "Un utilizator cu aceste date există deja." });
      }

      await usersCollection.insertOne({ email, password, firstName, lastName });

      return res.status(200).json({ message: "Contul a fost creat cu succes!" });
    } catch (error) {
      console.error("Eroare la adăugarea în baza de date:", error);
      return res.status(500).json({ message: "A apărut o eroare la crearea contului. Te rugăm să încerci din nou mai târziu." });
    }
  }

  return res.status(405).json({ message: "Metoda HTTP nu este permisă." });
}
