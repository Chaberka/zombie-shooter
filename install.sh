#!/bin/bash

echo "========================================"
echo " INSTALATOR SERWERA ZOMBIE MULTIPLAYER"
echo "========================================"
echo ""

# Sprawdź czy Node.js jest zainstalowany
if ! command -v node &> /dev/null
then
    echo "[BŁĄD] Node.js nie jest zainstalowany!"
    echo ""
    echo "Zainstaluj Node.js:"
    echo ""
    echo "Ubuntu/Debian:"
    echo "  curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -"
    echo "  sudo apt-get install -y nodejs"
    echo ""
    echo "Mac (Homebrew):"
    echo "  brew install node"
    echo ""
    echo "Lub pobierz z: https://nodejs.org/"
    echo ""
    exit 1
fi

echo "[OK] Node.js jest zainstalowany"
node --version

# Sprawdź czy package.json istnieje
if [ ! -f "package.json" ]; then
    echo "[BŁĄD] Brak pliku package.json!"
    echo ""
    echo "Upewnij się że znajdujesz się w folderze z plikami gry."
    exit 1
fi

echo "[OK] Znaleziono package.json"
echo ""

# Instaluj zależności
echo "Instalowanie zależności..."
echo "To może potrwać chwilę..."
echo ""
npm install

if [ $? -ne 0 ]; then
    echo "[BŁĄD] Nie udało się zainstalować zależności!"
    exit 1
fi

echo ""
echo "========================================"
echo " INSTALACJA ZAKOŃCZONA POMYŚLNIE!"
echo "========================================"
echo ""
echo "Aby uruchomić serwer, użyj:"
echo "  ./start-server.sh"
echo ""
echo "lub wpisz w terminalu:"
echo "  npm start"
echo ""
