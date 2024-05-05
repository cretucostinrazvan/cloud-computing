Aplicație de manageriere a proiectelor personale

O aplicație simplă de management de proiect creată cu MongoDB și Next.js. Utilizatorii pot crea, vizualiza și elimina proiecte cu această aplicație, ceea ce le face mai ușor să rămână organizați și să își termine sarcinile la timp.

Caracteristici
Utilizatorii pot stabili noi proiecte dându-le un nume, câteva detalii, un termen limită și o prioritate.
Vizualizați proiecte: aplicația arată numele, detaliile, termenele limită și prioritățile fiecărui proiect care este în desfășurare.
Ștergeți proiecte: utilizatorii au opțiunea de a elimina un anumit proiect sau lista completă de proiecte.
Starea conexiunii: în timpul redării pe partea de server, aplicația verifică starea conexiunii sale la baza de date MongoDB.

Înființat
Utilizați aceste instrucțiuni pentru a rula această aplicație local:

Luați o copie a acestui depozit la nivel local.
Instalarea Npm trebuie utilizată pentru a instala dependențele.
Configurați o bază de date MongoDB și obțineți adresa URL pentru conexiune.
În directorul principal, creați un fișier.env.local și adăugați MNGODB_URI=<your_connection_uri> ca URI de conexiune MongoDB.
Utilizați npm run dev pentru a lansa serverul de dezvoltare.
Deschideți browserul web și navigați la http://localhost:3000.

Utilizare
Stabilirea unui proiect: Completați formularul din partea stângă a cererii cu informațiile necesare (nume, detalii, termen și prioritate).
Faceți clic pe „Creați” pentru a include proiectul.
Examinați proiectele:
Partea dreaptă a aplicației afișează fiecare proiect care este în desfășurare.
Scaparea de proiecte: Selectați proiectul făcând clic pe butonul de ștergere de lângă acesta.
Faceți clic pe butonul „Ștergeți lista” din colțul din dreapta sus al listei de proiecte pentru a elimina fiecare proiect.
Starea conexiunii: în timpul redării pe partea de server, programul monitorizează starea conexiunii la baza de date MongoDB.
Aplicația funcționează normal dacă conexiunea este stabilită. În cazul în care nu, apare un mesaj de eroare.
