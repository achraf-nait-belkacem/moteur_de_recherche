$(document).ready(function(){
    let searchTimeout;

    function performSearch() {
        var search = $('#searchInput').val();
        
        if(search != ''){
            // Show loader and disable button
            $('.loader').addClass('show');
            $('#searchButton').prop('disabled', true);
            
            $.ajax({
                url: 'server.php',
                method: 'POST',
                data: {search: search},
                dataType: 'json',
                success: function(data){
                    var html = '';
                    
                    if(data && data.length > 0){
                        data.forEach(function(movie){
                            // Default image if none is provided
                            const imageUrl = movie.image_url || 'default-movie-poster.jpg';
                            
                            html += `
                                <div class="movie-result">
                                    <img src="${imageUrl}" alt="${movie.title}" class="movie-image" 
                                         onerror="this.src='default-movie-poster.jpg'">
                                    <div class="movie-details">
                                        <div class="movie-title">${movie.title}</div>
                                        <div class="movie-info">
                                            ${movie.release_date} | ${movie.genre} | Dir: ${movie.director}
                                        </div>
                                    </div>
                                </div>`;
                        });
                    } else {
                        html = '<div class="movie-result">No movies found</div>';
                    }
                    
                    $('#searchResults')
                        .html(html)
                        .addClass('show');

                    // Hide loader and enable button
                    $('.loader').removeClass('show');
                    $('#searchButton').prop('disabled', false);
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                    $('#searchResults')
                        .html('<div class="movie-result">Error occurred while searching</div>')
                        .addClass('show');
                    $('.loader').removeClass('show');
                    $('#searchButton').prop('disabled', false);
                }
            });
        } else {
            $('#searchResults')
                .removeClass('show')
                .html('');
        }
    }

    // Handle button click
    $('#searchButton').click(function() {
        clearTimeout(searchTimeout);
        performSearch();
    });

    // Handle input keyup with debounce
    $('#searchInput').keyup(function(e){
        if(e.key === "Enter") {
            clearTimeout(searchTimeout);
            performSearch();
            return;
        }
        
        clearTimeout(searchTimeout);
        
        if($(this).val() != ''){
            searchTimeout = setTimeout(performSearch, 300);
        } else {
            $('#searchResults')
                .removeClass('show')
                .html('');
        }
    });
    
    // Handle click on search result
    $(document).on('click', '.movie-result', function(){
        var movieTitle = $(this).find('.movie-title').text();
        $('#searchInput').val(movieTitle);
        $('#searchResults')
            .removeClass('show')
            .html('');
    });

    // Close results when clicking outside
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.search-container').length) {
            $('#searchResults')
                .removeClass('show')
                .html('');
        }
    });

    // Handle escape key to close results
    $(document).on('keyup', function(event) {
        if (event.key === "Escape") {
            $('#searchResults')
                .removeClass('show')
                .html('');
        }
    });
});