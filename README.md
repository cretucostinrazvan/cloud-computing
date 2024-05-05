Titlu: Aplicație de manageriere a proiectelor personale
Nume: Crețu
Prenume: Costin-Răzvan
Grupa: 1131
- link video: 
- link publicare: https://cloud-computing-nine.vercel.app/
1. Introducere
Această aplicație este un manager de proiecte care permite utilizatorilor să înregistreze, să vizualizeze și să șteargă proiecte.
Este construită folosind Next.js pentru partea de frontend și MongoDB pentru partea de backend, cu datele stocate pe platforma MongoDB Atlas.
Deploy-ul aplicației a fost realizat pe Vercel.
3. Descriere problemă
Problema abordată este gestionarea proiectelor.
Utilizatorii trebuie să poată înregistra noi proiecte, să vizualizeze proiectele existente și să șteargă toate proiectele.
Această aplicație este soluția pentru această problemă.
5. Descriere API
Trei puncte finale principale alcătuiesc API-ul:
Punctul final pentru pornirea unui nou proiect este /api/createProject.
/api/getProject: Acest punct final preia toate proiectele active în prezent.
Punctul final pentru eliminarea tuturor proiectelor este /api/deleteAllProjects.
Metodele HTTP POST, GET și DELETE sunt acceptate de punctele finale, în această ordine.
7. Flux de date
Exemple de request / response și metode HTTP:
Endpoint: /api/createProject
Metoda HTTP: POST
Request:
{
  "name": "Nume proiect",
  "details": "Detalii proiect",
  "deadline": "Data deadline-ului",
  "priority": "Prioritate proiect"
}
Response (success):
{
  "message": "Proiectul a fost creat cu succes!"
}
Response (error):
{
  "message": "A apărut o eroare la crearea proiectului."
}
Endpoint: /api/getProject
Metoda HTTP: GET
Response (success):
[
  {
    "_id": "id_proiect",
    "name": "Nume proiect",
    "details": "Detalii proiect",
    "deadline": "Data deadline-ului",
    "priority": "Prioritate proiect"
  },
  {
    "_id": "id_proiect_2",
    "name": "Nume proiect 2",
    "details": "Detalii proiect 2",
    "deadline": "Data deadline-ului 2",
    "priority": "Prioritate proiect 2"
  },
  ...
]
Response (error):
{
  "message": "A apărut o eroare la obținerea proiectelor."
}
Endpoint: /api/deleteAllProjects
Metoda HTTP: DELETE
Response (success):
{
  "message": "Toate proiectele au fost șterse cu succes!"
}
Response (error):
{
  "message": "A apărut o eroare la ștergerea tuturor proiectelor."
}
5. Capturi ecran aplicație
![image](https://github.com/cretucostinrazvan/cloud-computing/assets/115085746/0a6da929-0e5e-41c0-853f-e84f7e042e38)
![image](https://github.com/cretucostinrazvan/cloud-computing/assets/115085746/c666b3da-5ce9-483d-9912-20157766a3a7)

7. Referințe
https://vercel.com/docs/deployments/overview
https://www.mongodb.com/docs/atlas/cli/stable/atlas-cli-getting-started/
https://nextjs.org/docs/app/building-your-application/routing/error-handling
