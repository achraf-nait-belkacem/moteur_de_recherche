<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Moteur de Recherche</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="search-container">
        <h1>Moteur de Recherche</h1>
        <form action="https://www.google.com/search" method="get">
            <input type="text" name="q" class="search-bar" placeholder="Recherchez ici..." required>
            <button type="submit" class="search-button">Rechercher</button>
        </form>
    </div>
</body>

<!-- Socket.IO Client (required) -->
<script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>

<!-- Add Chat Widget -->
<script src="https://chat-api-28qc.onrender.com/widget.js"></script>
<script>
    ChatWidget.init({
        apiKey: 'LaplateformeKG',
        position: 'bottom-left',
        userData: {
            username: 'John Doe',
            userId: '123'
        }
    });
</script>
</html>
