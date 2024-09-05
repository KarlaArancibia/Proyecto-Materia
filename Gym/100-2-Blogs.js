$(document).ready(function() {
    function displayBlogs() {
        var blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        $('#blogList').empty();
        blogs.forEach(function(blog) {
            $('#blogList').append(
                '<div class="blog-card">' +
                '<img class="blog-image" src="' + blog.image + '" alt="' + blog.title + '">' +
                '<div class="blog-category">' + blog.category + '</div>' +
                '<h2 class="blog-title">' + blog.title + '</h2>' +
                '<p class="blog-date"><strong>Fecha:</strong> ' + blog.date + '</p>' +
                '<p class="blog-content">' + blog.content.substring(0, 100) + '...</p>' +
                '</div>'
            );
        });
    }
    displayBlogs();
});  