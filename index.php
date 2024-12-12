<!DOCTYPE html>
<html>
<head>
    <title>Movie Search</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <div class="search-container">
        <div class="search-wrapper">
            <input type="text" id="searchInput" placeholder="Search for movies...">
            <button type="button" id="searchButton" class="submit-btn">Search</button>
        </div>
        <div class="loader"></div>
        <div id="searchResults" class="autocomplete-items"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>