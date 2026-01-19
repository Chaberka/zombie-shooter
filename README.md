# 🧟 Zombie Apocalypse - Online Multiplayer

## Jak uruchomić grę multiplayer?

### Opcja 1: Z serwerem Node.js (zalecane)

#### Krok 1: Zainstaluj Node.js
Pobierz i zainstaluj Node.js ze strony: https://nodejs.org/

#### Krok 2: Zainstaluj zależności
Otwórz terminal/cmd w folderze z plikami i uruchom:
```bash
npm install
```

#### Krok 3: Uruchom serwer
```bash
npm start
```

Serwer uruchomi się na porcie 3000.

#### Krok 4: Otwórz grę
- Gracz 1: Otwórz http://localhost:3000 w przeglądarce
- Gracz 2: Otwórz http://localhost:3000 w przeglądarce (może być na tym samym lub innym komputerze w sieci lokalnej)

#### Gra przez Internet:
Jeśli chcesz grać z kimś przez Internet:
1. Serwer musi być dostępny publicznie (użyj ngrok, Heroku lub VPS)
2. Oba komputery muszą połączyć się z tym samym adresem serwera

**Użycie ngrok (prosty sposób):**
```bash
# Zainstaluj ngrok z https://ngrok.com
ngrok http 3000
```
Ngrok da ci publiczny URL (np. https://abc123.ngrok.io) - użyj tego w polu "Adres serwera"

### Opcja 2: Bez serwera (tylko sieć lokalna - uproszczona)

Użyj pliku `zombie-game-online.html` - używa localStorage do synchronizacji (działa tylko na tym samym komputerze jako demonstracja).

## Pliki

- **zombie-game-online-websocket.html** - Gra z prawdziwym multiplayer przez WebSocket
- **server.js** - Serwer Node.js obsługujący połączenia
- **package.json** - Zależności Node.js
- **zombie-game-coop.html** - Lokalna wersja gry dla 2 graczy (jeden komputer, jedna klawiatura)
- **zombie-game.html** - Podstawowa wersja single player

## Sterowanie

**Gracz 1:**
- WASD - ruch
- Mysz - celowanie
- LPM - strzał
- R - przeładowanie

**Gracz 2** (tylko wersja coop):
- Strzałki - ruch
- Q/E - obracanie celownika
- Spacja - strzał
- P - przeładowanie

## Wymagania

- Node.js 14+ (dla wersji multiplayer)
- Nowoczesna przeglądarka (Chrome, Firefox, Edge)
- Połączenie internetowe lub sieć lokalna (dla multiplayer)

## Rozwiązywanie problemów

**Nie mogę się połączyć z serwerem:**
- Sprawdź czy serwer jest uruchomiony (powinieneś zobaczyć komunikat w terminalu)
- Sprawdź czy port 3000 nie jest zajęty
- Sprawdź czy firewall nie blokuje połączenia
- Upewnij się że wpisałeś poprawny adres serwera

**Drugi gracz nie może dołączyć:**
- Upewnij się że oba urządzenia są w tej samej sieci (lub używasz publicznego serwera)
- Wpisz to samo ID pokoju w obu przeglądarkach
- Spróbuj odświeżyć stronę

**Gra się laguje:**
- Zmniejsz częstotliwość synchronizacji w kodzie (zwiększ wartość w `if (now - lastSyncTime > 50)`)
- Użyj lepszego połączenia internetowego
- Uruchom serwer bliżej graczy (lokalnie lub na VPS w ich regionie)

## Hosting online

### Darmowe opcje:
1. **Glitch.com** - darmowy hosting Node.js
2. **Heroku** - do 550h/miesiąc za darmo
3. **Railway.app** - darmowy tier
4. **Render.com** - darmowy hosting

### Deploy na Heroku (przykład):
```bash
heroku create nazwa-twojej-gry
git init
git add .
git commit -m "Initial commit"
git push heroku master
```

## Licencja

Free to use and modify!
