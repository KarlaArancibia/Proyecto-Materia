$(document).ready(function () { 
    displayBlogs();

    $('#blogForm').submit(function (event) {
        event.preventDefault();

        var title = $('#title').val();
        var date = $('#date').val();
        var content = $('#content').val();
        var category = $('#category').val();
        var imageInput = $('#image')[0].files[0];

        if (imageInput) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var image = e.target.result;

                var blog = {
                    id: Date.now(), 
                    title: title,
                    date: date,
                    image: image,
                    content: content,
                    category: category
                };

                var blogs = JSON.parse(localStorage.getItem('blogs')) || [];
                blogs.push(blog);
                localStorage.setItem('blogs', JSON.stringify(blogs));

                $('#blogForm')[0].reset();

                displayBlogs();
            };

            reader.readAsDataURL(imageInput);
        } else {
            alert("Por favor, selecciona una imagen.");
        }
    });

    function displayBlogs() {
        var blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        $('#adminBlogList').empty();
        blogs.forEach(function (blog) {
            $('#adminBlogList').append(
                `<div class="admin-blog-card">
                    <img class="blog-image" src="${blog.image}" alt="${blog.title}">
                    <div class="blog-category">${blog.category}</div>
                    <h2 class="blog-title">${blog.title}</h2>
                    <p class="blog-date"><strong>Fecha:</strong> ${blog.date}</p>
                    <p class="blog-content">${blog.content.substring(0, 100)}...</p>
                    <button class="edit-blog" data-id="${blog.id}">Editar</button>
                    <button class="delete-blog" data-id="${blog.id}">Eliminar</button>
                </div>`
            );
        });

        $('.delete-blog').click(function () {
            var blogId = $(this).data('id');
            deleteBlog(blogId);
        });

        $('.edit-blog').click(function () {
            var blogId = $(this).data('id');
            editBlog(blogId);
        });
    }

    function deleteBlog(id) {
        var blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        var updatedBlogs = blogs.filter(blog => blog.id !== id);
        localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
        displayBlogs();
    }

    function editBlog(id) {
        var blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        var blogToEdit = blogs.find(blog => blog.id === id);

        if (blogToEdit) {
            $('#title').val(blogToEdit.title);
            $('#date').val(blogToEdit.date);
            $('#content').val(blogToEdit.content);
            $('#category').val(blogToEdit.category);

            deleteBlog(id);

            $('#title').focus();
        }
    }
});
