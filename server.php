<?php
// Database configuration
$host = 'localhost';
$dbname = 'autocompletion';
$username = 'root';
$password = '';

try {
    // Create PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get the search term from AJAX request
    if (isset($_POST['search'])) {
        $search = $_POST['search'];
        
        // Modified query to include image from the images table
        $stmt = $pdo->prepare("
            SELECT f.id, f.title, f.release_date, f.genre, f.director, i.image_url 
            FROM films f 
            LEFT JOIN images i ON f.id = i.film_id 
            WHERE f.title LIKE :search 
            LIMIT 10
        ");
        $stmt->execute(['search' => '%' . $search . '%']);
        
        // Fetch results
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Return results as JSON with proper headers
        header('Content-Type: application/json');
        echo json_encode($results);
    }
} catch(PDOException $e) {
    // Return error as JSON
    header('Content-Type: application/json');
    echo json_encode(['error' => "Connection failed: " . $e->getMessage()]);
}
?>





