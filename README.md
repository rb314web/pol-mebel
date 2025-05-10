# Pol-Mebel — Meble na wymiar

**Pol-Mebel** to profesjonalna firma zajmująca się projektowaniem i produkcją mebli na wymiar. Nasza strona internetowa prezentuje ofertę, realizacje oraz umożliwia szybki kontakt z klientami, którzy szukają indywidualnych rozwiązań meblarskich.

## 🛠 Technologie wykorzystane w projekcie

- **HTML5** i **CSS3** — struktura i styl strony
- **JavaScript** — interaktywność elementów
- **SCSS** — organizacja i łatwa modyfikacja styli
- **Swiper.js** — dynamiczne i responsywne karuzele zdjęć realizacji
- **Formspree** (lub inna usługa) — obsługa formularza kontaktowego
- **Responsive Design** — dopasowanie layoutu do urządzeń mobilnych i desktopowych

## 🎨 Kluczowe funkcje strony

1. **Galeria realizacji**
   - Atrakcyjny slider pokazujący meble kuchenne, łazienkowe, biurowe i pokojowe
   - Możliwość oglądania zdjęć w pełnym ekranie

2. **Formularz kontaktowy**
   - Zintegrowany z Formspree (lub alternatywnie backend własny)
   - Weryfikacja danych i potwierdzenie wysłania zapytania

3. **Sekcja "O nas"**
   - Krótka prezentacja firmy, doświadczenia i misji
   - Zdjęcia zespołu i warsztatu

4. **Responsywność i dostępność**
   - Nawigacja dostosowana do urządzeń mobilnych
   - Teksty i przyciski zgodne ze standardami WCAG

5. **Optymalizacja SEO**
   - Metatagi i przyjazne adresy URL
   - Szybki czas ładowania dzięki minimalizacji zasobów

## 🚀 Uruchomienie projektu lokalnie

1. Sklonuj repozytorium:
   ```bash
   git clone https://github.com/rb314web/pol-mebel.git
   cd pol-mebel
   ```

2. Instalacja (jeśli używasz narzędzi SCSS lub bundlera):
   ```bash
   npm install       # lub yarn install
   npm run dev       # uruchomienie watchera SCSS/bundlera
   ```

3. Otwórz `index.html` w przeglądarce lub skorzystaj z lokalnego serwera:
   ```bash
   npx http-server    # lub inny prosty serwer
   ```

4. Edycja zawartości:
   - Pliki HTML znajdziesz w głównym katalogu
   - Style w katalogu `scss/`
   - Skrypty JS w `js/`

## 📦 Struktura katalogów

```plaintext
pol-mebel/
├── index.html         # Strona główna
├── about.html         # O nas
├── gallery.html       # Galeria realizacji
├── contact.html       # Kontakt z formularzem
├── scss/              # Pliki źródłowe SCSS
│   └── styles.scss
├── css/               # Skompilowane pliki CSS
│   └── styles.css
├── js/                # Skrypty JavaScript
│   └── main.js
├── img/               # Zdjęcia i grafiki
└── README.md          # Ten plik
```

## 📞 Kontakt

Jeśli masz pytania lub potrzebujesz wyceny, napisz do nas:

- 📧 email: kontakt@pol-mebel.pl
- ☎️ telefon: +48 123 456 789
- 📍 adres: ul. Przykładowa 10, 00-000 Warszawa

---

## 📝 Licencja

Projekt dostępny na licencji MIT. Szczegóły w pliku [LICENSE](LICENSE).
