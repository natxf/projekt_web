# projekt_web

Temat projektu: Baza osób zaginionych

Aby uruchomić projekt na swoim urządzeniu należy:

1. utworzyć bazę danych i uruchomić w niej skrypt db.sql (projekt korzysta z bazy postgres)
2. zainstalować node
3. W terminalu wykonać komendę: ```npm run install:all```
4. W terminalu wejść do katalogu server poleceniem cd server a następnie uruchomić backend poleceniem ```npm run dev```\*
5. Otworzyć drugi terminal
6. W drugim teminalu wejść do katalogu client poleceniem ```cd client``` a następnie uruchomić frontend poleceniem ```npm start```

Dokładniejsza dokumentacja projektu znajduje się tutaj: https://docs.google.com/document/d/197IR0DnzY-I-6DQYRp6WA0ffMVzLhWAzgA-BzL3e3ns/edit?usp=sharing

\*przed uruchomieniem backendu należy utwożyć plik .env, w którym trzeba umieścić parametry do połączenia z bazą danych w formacie:
DB_USER=<użytkownik>
DB_HOST=localhost
DB_NAME=<nazwa_bazy>
DB_PASS=<hasło>
DB_PORT=<nr_portu>
