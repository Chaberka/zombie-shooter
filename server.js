// server.js - Serwer Node.js dla gry multiplayer zombie
// Instalacja: npm install express socket.io
// Uruchomienie: node server.js

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3000;

// Przechowywanie pokoi
const rooms = new Map();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/zombie-game-online.html');
});

io.on('connection', (socket) => {
    console.log('Gracz połączony:', socket.id);

    // Dołączenie do pokoju
    socket.on('join-room', (roomId) => {
        if (!roomId) {
            roomId = 'room_' + Math.random().toString(36).substr(2, 9);
        }

        socket.join(roomId);
        socket.roomId = roomId;

        if (!rooms.has(roomId)) {
            rooms.set(roomId, {
                players: [],
                gameState: null,
                zombies: [],
                host: socket.id
            });
        }

        const room = rooms.get(roomId);
        room.players.push(socket.id);

        socket.emit('room-joined', {
            roomId: roomId,
            playerId: socket.id,
            isHost: room.host === socket.id,
            playerCount: room.players.length
        });

        // Powiadom innych graczy
        socket.to(roomId).emit('player-joined', {
            playerId: socket.id,
            playerCount: room.players.length
        });

        console.log(`Gracz ${socket.id} dołączył do pokoju ${roomId}. Graczy: ${room.players.length}`);

        // Jeśli jest dwóch graczy, rozpocznij grę
        if (room.players.length === 2) {
            io.to(roomId).emit('game-start');
            console.log(`Gra startuje w pokoju ${roomId}`);
        }
    });

    // Aktualizacja stanu gracza
    socket.on('player-update', (data) => {
        if (socket.roomId) {
            socket.to(socket.roomId).emit('player-update', {
                playerId: socket.id,
                ...data
            });
        }
    });

    // Aktualizacja zombie (tylko host)
    socket.on('zombies-update', (zombies) => {
        if (socket.roomId) {
            const room = rooms.get(socket.roomId);
            if (room && room.host === socket.id) {
                room.zombies = zombies;
                socket.to(socket.roomId).emit('zombies-update', zombies);
            }
        }
    });

    // Aktualizacja stanu gry (tylko host)
    socket.on('game-state-update', (gameState) => {
        if (socket.roomId) {
            const room = rooms.get(socket.roomId);
            if (room && room.host === socket.id) {
                room.gameState = gameState;
                socket.to(socket.roomId).emit('game-state-update', gameState);
            }
        }
    });

    // Strzał
    socket.on('bullet-fired', (bullet) => {
        if (socket.roomId) {
            socket.to(socket.roomId).emit('bullet-fired', {
                ...bullet,
                ownerId: socket.id
            });
        }
    });

    // Rozłączenie
    socket.on('disconnect', () => {
        console.log('Gracz rozłączony:', socket.id);
        
        if (socket.roomId) {
            const room = rooms.get(socket.roomId);
            if (room) {
                room.players = room.players.filter(id => id !== socket.id);
                
                if (room.players.length === 0) {
                    rooms.delete(socket.roomId);
                    console.log(`Pokój ${socket.roomId} usunięty`);
                } else {
                    // Jeśli host się rozłączył, przypisz nowego hosta
                    if (room.host === socket.id) {
                        room.host = room.players[0];
                        io.to(room.host).emit('you-are-host');
                    }
                    
                    socket.to(socket.roomId).emit('player-left', {
                        playerId: socket.id,
                        playerCount: room.players.length
                    });
                }
            }
        }
    });
});

http.listen(PORT, () => {
    console.log(`🧟 Serwer zombie uruchomiony na porcie ${PORT}`);
    console.log(`Dostępny pod: http://localhost:${PORT}`);
});
