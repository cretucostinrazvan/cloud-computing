import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Toate campurile sunt obligatorii." });
    }

    try {
      const client = await clientPromise;
      const db = client.db();
      const usersCollection = db.collection("users");
      const existingUser = await usersCollection.findOne({ email, password });

      if (!existingUser) {
        return res.status(400).json({ message: "Email sau parola este incorectă." });
      }

      return res.status(200).json({ message: "Autentificare reușită!" });
    } catch (error) {
      console.error("Eroare la căutarea în baza de date:", error);
      return res.status(500).json({ message: "A apărut o eroare la autentificare. Te rugăm să încerci din nou mai târziu." });
    }
  }

  return res.status(405).json({ message: "Metoda HTTP nu este permisă." });
}
