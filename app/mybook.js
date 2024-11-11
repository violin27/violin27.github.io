document.addEventListener("DOMContentLoaded", function () {
    const bookListContainer = document.getElementById("book-list");

    // Menampilkan nama pengguna dari sessionStorage
    window.onload = function () {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        const usernameDisplay = document.getElementById('username-display');

        if (isLoggedIn === 'true') {
            const username = sessionStorage.getItem('username');
            if (username) {
                usernameDisplay.textContent = username; // Menampilkan nama pengguna
            } else {
                usernameDisplay.textContent = 'Nama Pengguna Tidak Ditemukan';
            }
        } else {
            usernameDisplay.textContent = 'Pengguna Belum Login';
        }

        // Tampilkan buku yang dibookmark saat halaman dimuat
        displayBookmarkedBooks();
    };

    // Menampilkan daftar buku yang dibookmark
    function displayBookmarkedBooks(filteredBooks = null) {
        const bookmarkedBooks = JSON.parse(localStorage.getItem("bookmarks")) || [];

        // Jika ada filter pencarian, filter buku berdasarkan nama
        const booksToDisplay = filteredBooks || bookmarkedBooks;

        // Cek jika tidak ada buku yang dibookmark
        if (booksToDisplay.length === 0) {
            bookListContainer.innerHTML = "<p>Tidak ada buku di MyBook.</p>";
            return;
        }

        // Hapus daftar buku yang ada
        bookListContainer.innerHTML = "";

        // Loop dan tampilkan buku
        booksToDisplay.forEach(book => {
            const bookElement = document.createElement("div");
            bookElement.classList.add("book");

            bookElement.innerHTML = `
                <img src="${book.image}" alt="${book.title}" />
                <h3>${book.title}</h3>
                <p>${book.description}</p>
                <button class="read-btn" data-title="${book.title}">Read</button> <!-- Tombol Read -->
                <button class="remove-btn" data-title="${book.title}">Hapus dari MyBook</button>
            `;

            // Event untuk menghapus buku dari MyBook
            const removeButton = bookElement.querySelector(".remove-btn");
            removeButton.addEventListener("click", function () {
                removeFromMyBooks(book.title);
            });

            // Event untuk memindahkan buku ke halaman 'bookmark.html' sebagai buku yang dibaca
            const readButton = bookElement.querySelector(".read-btn");
            readButton.addEventListener("click", function () {
                moveToReadBooks(book.title);
            });

            bookListContainer.appendChild(bookElement);
        });
    }

    // Fungsi untuk menghapus buku dari MyBook
    function removeFromMyBooks(bookTitle) {
        let bookmarkedBooks = JSON.parse(localStorage.getItem("bookmarks")) || [];

        // Filter buku berdasarkan judul untuk menghapus yang sesuai
        bookmarkedBooks = bookmarkedBooks.filter(book => book.title !== bookTitle);

        // Simpan kembali ke localStorage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarkedBooks));

        // Muat ulang MyBook
        displayBookmarkedBooks();
    }

    // Fungsi untuk memindahkan buku dari MyBook ke Read (Bookmark ke halaman bookmark.html)
    function moveToReadBooks(bookTitle) {
        let bookmarkedBooks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        let readBooks = JSON.parse(localStorage.getItem("readBooks")) || [];

        // Temukan buku di daftar bookmarkedBooks
        const bookToMove = bookmarkedBooks.find(book => book.title === bookTitle);

        if (bookToMove) {
            // Pindahkan buku ke daftar readBooks
            readBooks.push(bookToMove);

            // Hapus buku dari daftar bookmarkedBooks
            bookmarkedBooks = bookmarkedBooks.filter(book => book.title !== bookTitle);

            // Simpan kembali ke localStorage
            localStorage.setItem("bookmarks", JSON.stringify(bookmarkedBooks));
            localStorage.setItem("readBooks", JSON.stringify(readBooks));

            // Perbarui tampilan buku yang dibookmark
            displayBookmarkedBooks();

            // Pindahkan ke halaman bookmark.html
            window.location.href = "bookmark.html"; // Pindah ke halaman bookmark.html
        }
    }

    // Fungsi untuk pencarian buku
    function searchBooks() {
        const searchTerm = document.getElementById('search-bar').value.toLowerCase();

        // Ambil daftar buku yang dibookmark dari localStorage
        const bookmarkedBooks = JSON.parse(localStorage.getItem("bookmarks")) || [];

        // Filter buku berdasarkan judul
        const filteredBooks = bookmarkedBooks.filter(book => {
            return book.title.toLowerCase().includes(searchTerm);
        });

        // Tampilkan buku yang sesuai dengan pencarian
        displayBookmarkedBooks(filteredBooks);
    }

    // Event listener untuk pencarian
    const searchInput = document.getElementById('search-bar');
    if (searchInput) {
        searchInput.addEventListener('input', searchBooks);
    }

    // Panggil fungsi untuk memuat buku saat halaman dimuat
    displayBookmarkedBooks();
});
