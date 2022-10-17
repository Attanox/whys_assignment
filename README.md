# Ahoj uchazeči 👋,

tento súbor by ti mal lepšie určiť cieľ domácej úlohy a pomôcť pri orientácii v súboroch. V roote projektu si môžeš všimnúť dva adresáre `backend` a `frontend`. Ako iste tušíš ty budeš pracovať v zložke `frontend`, avšak najskôr musíme nastaviť niektoré veci v zložke `backend`. Táto časť je iba pár príkazov a má simulovať day-to-day vývoj tu u nás vo Whys.

## Verzie 🧰

Pre splnenie projektu bude dobré použíť verziu Node `16` (LTS verzia) a u NPM verziu `7+`

> Projekt bol testovaný na konkrétnych verziách Node v16.13.2 a NPM 8.1.2

## Backend ⚙

Prvým krokom je otvoriť root projektu v termináli. Odtiaľto prejdeme do adresára `backend`

```bash
cd backend
```

Tu spustíš príkazy

```bash
npm install

npx prisma generate

npx prisma db push

npx prisma db seed
```

Ak všetko prejde v poriadku v adresári `prisma` uvidíš nový súbor `dev.db` (jednoduchá SQLite databáza).

Teraz už len stačí spustiť

```bash
npm run dev
```

a backend je spustený na http://localhost:8000

## Frontend 🌈

V novom termináli si znovu otvor root projektu a prejdi do adresára `frontend`.

```bash
cd frontend
```

Tu spusti príkazy

```bash
npm install

npm run dev
```

a na http://localhost:5173 je spustený frontend aplikácie.

## Úkol 🏄‍♂️

Po menšom nastavovaní sa môžeme dostať k úkolu. Výsledkom tvojho úkolu bude SPA (single page application), na ktorej zobrazíš dáta zo serveru a vytvoríš možnosti pre ich vytvorenie, editáciu a zmazanie. Dáta, s ktorými budeš pracovať sú články, u ktorých chceme vidieť ich názov a text. Taktiež u každého článku chceme mať možnosť článok upraviť alebo rovno vymazať. To ako zobrazíš článok je na tebe, kartička alebo list alebo niečo úplne iné, len nech to vyzerá dobre.

Článkov príde mnoho a chceme, aby si ich užívateľ mohol prejsť postupne, takže bude treba použiť pagináciu. Na jednej stránke bude 10 článkov. Chceme taktiež nech je link prenosný, takže pri zmene stránky treba pridať do URL stránky search query param. To by vyzeralo napr. na stránke 3 takto

```
http://localhost:5173/?page=3
```

Ak si takýto link vložím do prehliadača, zobrazia sa mi výsledky na tretej stránke.

Na http://localhost:8000 ti beží server, ktorý pracuje s databázou a môžeme naň posielať requesty. Konkrétne requesty typu GET, POST, PATCH, DELETE. Poďme si ich prejsť.

- **GET**
  request je potreba posielať na endpoint http://localhost:8000/api/post, ktorý vráti array objektov, ktoré vyzerajú takto:
  ```ts
  {
    id: string;
    title: string;
    text: string;
    createdAt: string;
    updatedAt: string;
  }
  ```
- **POST**
  request je potreba posielať na endpoint http://localhost:8000/api/post, a do `body` requestu je potreba pridať objekt:

  ```ts
  {
    title: string; // obe povinné
    text: string;
  }
  ```

  a vráti odpoveď

  ```ts
  {
    status: "OK" | "ERROR";
    message: string;
  }
  ```

- **PATCH**
  request je potreba posielať na endpoint http://localhost:8000/api/post/:id/, kde :id je id článku. Do `body` requestu je potreba pridať objekt:

  ```ts
  {
    title?: string; // aspon jedno musi byt odoslane
    text?: string;
  }
  ```

  a vráti odpoveď

  ```ts
  {
    status: "OK" | "ERROR";
    message: string;
  }
  ```

- **DELETE**
  request je potreba posielať na endpoint http://localhost:8000/api/post/:id/, kde :id je id článku. Odpoveď sa vráti vo forme
  ```ts
  {
    status: "OK" | "ERROR";
    message: string;
  }
  ```

Ak u niektorého z endpointov nastane chyba (vráti sa status === "ERROR") takúto hlášku chceme užívateľovi zobraziť. Znova, spôsob necháme na teba.

V `package.json` si môžeš všimnúť stiahnuté `Material UI` balíky, ktoré pri riešení úkolu použi. Je to z dôvodu, že veľa našich projektov využíva práve tento balík, tak si ho aspoň vyskúšaš.

To je všetko k úkolu a nastaveniu projektu, ak by boli otázky vklidu nás kontaktuj a my ti nezrovnalosti skúsime objasniť.

Veľa šťastia a tešíme sa na výsledok 🙌
