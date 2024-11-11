// Fungsi untuk mengambil daftar pengguna dari localStorage
function getUsers() {
    const users = localStorage.getItem('users');
    // Jika tidak ada data, kembalikan array kosong
    return users ? JSON.parse(users) : [];
}

// Fungsi untuk menyimpan daftar pengguna ke localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users)); // Menyimpan data dalam format JSON string
}

// Menangani pendaftaran pengguna baru
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Mencegah reload halaman

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    const users = getUsers(); // Mendapatkan pengguna yang sudah terdaftar di localStorage
    // Mengecek apakah email sudah terdaftar
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
        alert('Email sudah terdaftar. Silakan login.');
    } else {
        // Jika belum ada, daftarkan pengguna baru
        const newUser = { name, email, password };
        users.push(newUser); // Menambahkan pengguna baru ke dalam array
        saveUsers(users); // Menyimpan array pengguna yang sudah diperbarui ke localStorage
        alert('Pendaftaran berhasil! Silakan login.');
        window.location.href = 'login.html'; // Redirect ke halaman login
    }

    signupForm.reset(); // Mengosongkan form setelah pendaftaran
});
