// Mengambil buku yang di-bookmark dari localStorage
let bookmarkedBooks = JSON.parse(localStorage.getItem('bookmarks')) || [];

// Mengambil buku yang telah dibaca dari localStorage
let readBooks = JSON.parse(localStorage.getItem('readBooks')) || [];

// Menampilkan nama pengguna dari sessionStorage
window.onload = function() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const usernameDisplay = document.getElementById('username-display');

    if (isLoggedIn === 'true') {
        const username = sessionStorage.getItem('username');
        usernameDisplay.textContent = username || 'Nama Pengguna Tidak Ditemukan';
    } else {
        usernameDisplay.textContent = 'Pengguna Belum Login';
    }

    // Tampilkan buku yang di-bookmark saat halaman dimuat
    displayBookmarkedBooks(bookmarkedBooks);

    // Tampilkan buku yang dibaca saat halaman dimuat
    displayReadBooks(readBooks);
};

// Fungsi untuk menampilkan buku yang di-bookmark
function displayBookmarkedBooks(filteredBooks) {
    const bookListContainer = document.getElementById('book-list');
    bookListContainer.innerHTML = ''; // Bersihkan daftar buku yang ada

    if (filteredBooks.length === 0) {
        bookListContainer.innerHTML = `<p>Tidak ada buku yang dibookmark.</p>`;
        return;
    }

    filteredBooks.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        
        bookDiv.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>Tanggal Rilis: ${book.release}</p>
            <p>${book.description}</p>
            <button onclick="viewBookDetail('${book.id}')">Read</button> <!-- Tombol Read -->
            <button onclick="removeBookmarkedBook('${book.title}')">Delete</button> <!-- Tombol Delete -->
        `;
        
        bookListContainer.appendChild(bookDiv);
    });
}

// Fungsi untuk menghapus buku dari daftar buku yang dibookmark
function removeBookmarkedBook(bookTitle) {
    // Hapus buku dari array 'bookmarkedBooks' berdasarkan judul
    bookmarkedBooks = bookmarkedBooks.filter(book => book.title !== bookTitle);

    // Simpan kembali array yang telah diperbarui ke localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarkedBooks));

    // Perbarui tampilan buku yang dibookmark
    displayBookmarkedBooks(bookmarkedBooks);
}

// Fungsi untuk menampilkan daftar buku yang telah dibaca
function displayReadBooks(filteredBooks) {
    const bookListContainer = document.getElementById('book-list');
    bookListContainer.innerHTML = ''; // Bersihkan daftar buku yang ada

    if (filteredBooks.length === 0) {
        bookListContainer.innerHTML = `<p>Tidak ada buku yang dibaca.</p>`;
        return;
    }

    filteredBooks.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        
        bookDiv.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>Tanggal Rilis: ${book.release}</p>
            <p>${book.description}</p>
            <button onclick="viewBookDetail('${book.id}')">Read</button> <!-- Tombol Read -->
            <button onclick="removeReadBook('${book.title}')">Delete</button> <!-- Tombol Delete -->
        `;
        
        bookListContainer.appendChild(bookDiv);
    });
}

// Fungsi untuk menghapus buku dari daftar buku yang telah dibaca
function removeReadBook(bookTitle) {
    // Hapus buku dari array 'readBooks' berdasarkan judul
    readBooks = readBooks.filter(book => book.title !== bookTitle);

    // Simpan kembali array yang telah diperbarui ke localStorage
    localStorage.setItem('readBooks', JSON.stringify(readBooks));

    // Perbarui tampilan buku yang dibaca
    displayReadBooks(readBooks);
}

// Fungsi untuk pencarian buku
function searchBooks(event) {
    const query = event.target.value.toLowerCase();

    // Menyaring buku yang di-bookmark berdasarkan query pencarian
    const filteredBookmarkedBooks = bookmarkedBooks.filter(book => 
        book.title.toLowerCase().includes(query) || book.description.toLowerCase().includes(query)
    );
    displayBookmarkedBooks(filteredBookmarkedBooks); // Menampilkan hasil pencarian

    // Menyaring buku yang telah dibaca berdasarkan query pencarian
    const filteredReadBooks = readBooks.filter(book => 
        book.title.toLowerCase().includes(query) || book.description.toLowerCase().includes(query)
    );
    displayReadBooks(filteredReadBooks); // Menampilkan hasil pencarian
}

// Event listener untuk search bar
const searchInput = document.getElementById('search-bar');
if (searchInput) {
    searchInput.addEventListener('input', searchBooks);
}

// Fungsi untuk melihat detail buku
function viewBookDetail(bookId) {
    // Arahkan pengguna ke halaman detail buku dengan ID buku yang sesuai
    window.location.href = `detail.html?id=${bookId}`;
}
