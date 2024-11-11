// Cek apakah pengguna sudah login
window.onload = function () {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const usernameDisplay = document.getElementById('username-display');

    // Pastikan menampilkan buku setelah login
    if (isLoggedIn === 'true') {
        const username = sessionStorage.getItem('username');
        if (username) {
            usernameDisplay.textContent = username; // Menampilkan nama pengguna
        } else {
            console.log('Nama pengguna tidak ditemukan di sessionStorage');
            usernameDisplay.textContent = 'Nama Pengguna Tidak Ditemukan'; // Menangani jika data tidak ada
        }

        // Tampilkan semua buku setelah login
        displayBooks(books);
    } else {
        usernameDisplay.textContent = 'Pengguna Belum Login'; // Jika belum login, tampilkan teks ini
    }
};

// Daftar Buku (Bisa Diperluas dengan Menambah Data Buku)
const books = [
    {
        title: 'Kode Dasar HTML',
        release: '17 Mei 2021',
        description: 'Teknik Menguasai HTML Bagi Pemula...',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTxb4WqmpgkX51oVJyXHbtPD19uU61t4c9rQ&s'
    },
    {
        title: 'Cara Praktis Merancang Database',
        release: '27 Agustus 2018',
        description: 'Buku ini Membantu Merancang...',
        image: 'https://cdn.gramedia.com/uploads/items/9786230020735_Cov_Panduan_Cepat_Belajar_HTML_PHP_MYSQL.jpg'
    },
    {
        title: 'Metode Penelitian Bisnis',
        release: '29 Oktober 2012',
        description: 'Belajar Tentang Bisnis Yang Efisien...',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWBCzeC0FQh8NBdHjFbW2AKDq0yeefWhRiQ&s'
    },
    {
        title: 'Pengantar JavaScript',
        release: '10 Januari 2020',
        description: 'Belajar Dasar-Dasar JavaScript...',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFomi3fJ93P3yXHvn32Ss3qYDvS4Ytcma7gQ&s'
    },
    {
        title: 'CSS untuk Pemula',
        release: '15 Maret 2019',
        description: 'Pelajari CSS Untuk Desain Web...',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPpPHwG6jZ-MiZ4pgxMFFpUmjT7AYF3kDVFg&s'
    },
    {
        title: 'Desain Grafis dengan Adobe Illustrator',
        release: '3 Agustus 2018',
        description: 'Membuat Desain Grafis Profesional...',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ62bKEIInAAz9PrOxA-KJVBsFqxHOa2bWa2Q&s'
    },
    {
        title: 'Game Development Unity',
        release: '10 Januari 2020',
        description: 'Belajar Dasar-Dasar Game Develop...',
        image: 'https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/picture_meta/2023/1/5/94xxupq3sahemin9zy4o6r.jpg'
    },
    {
        title: 'Golang Untuk Pemula',
        release: '15 Maret 2019',
        description: 'Pelajari Dasar-Dasar Pada Golang...',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQpyfcNEq-QPfSxa5a2RstL7tq09d3wUuh3w&s'
    },
    {
        title: 'Desain Grafis dengan Adobe PhotoShop',
        release: '3 Agustus 2018',
        description: 'Membuat Desain Grafis Profesional...',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCOBlS89qXxXAmAp6-wCkSf5GZ1Q1vfjZa0w&s'
    }
];

// Menampilkan buku ke halaman
function displayBooks(filteredBooks) {
    const bookListContainer = document.getElementById('book-list');
    bookListContainer.innerHTML = ''; // Bersihkan daftar buku yang ada

    filteredBooks.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>Tanggal Rilis: ${book.release}</p>
            <p>${book.description}</p>
            <div class="star" onclick="toggleBookmark(${books.indexOf(book)})" style="cursor: pointer;">
                ${book.bookmarked ? '★' : '☆'}
            </div>
            <button onclick="goToMyBookPage(${books.indexOf(book)})" style="cursor: pointer;">Read</button>
        `;
        bookListContainer.appendChild(bookDiv);
    });
}

// Fungsi untuk mengarahkan pengguna ke halaman bookmark.html
function goToMyBookPage(index) {
    const selectedBook = books[index];

    // Menyimpan buku yang dibaca di localStorage dengan kunci 'readBooks'
    let readBooks = JSON.parse(localStorage.getItem('readBooks')) || [];
    readBooks.push(selectedBook);
    localStorage.setItem('readBooks', JSON.stringify(readBooks));

    // Arahkan ke halaman buku yang dibaca
    window.location.href = '/app/bookmark.html'; // Pastikan path menuju book.html benar
}

// Fungsi untuk mengubah status bookmark saat klik bintang
function toggleBookmark(index) {
    const selectedBook = books[index];
    
    // Menyimpan status bookmark ke localStorage untuk 'bookmarks'
    let bookmarkedBooks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    
    const bookIndex = bookmarkedBooks.findIndex(book => book.title === selectedBook.title);
    
    if (bookIndex === -1) {
        // Jika belum dibookmark, tambahkan ke array bookmarks
        bookmarkedBooks.push(selectedBook);
    } else {
        // Jika sudah dibookmark, hapus dari array bookmarks
        bookmarkedBooks.splice(bookIndex, 1);
    }

    // Update localStorage dengan daftar buku yang dibookmark
    localStorage.setItem('bookmarks', JSON.stringify(bookmarkedBooks));

    // Perbarui tampilan buku di halaman utama
    displayBooks(books);
}


// Fungsi untuk pencarian buku
function searchBooks() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    
    const filteredBooks = books.filter(book => {
        return book.title.toLowerCase().includes(searchTerm);
    });

    displayBooks(filteredBooks);
}
