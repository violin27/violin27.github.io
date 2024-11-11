// Fungsi untuk mengambil daftar pengguna dari localStorage
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Menangani proses login
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Mencegah reload halaman

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const users = getUsers(); // Ambil data pengguna dari localStorage

    // Mencari pengguna berdasarkan email dan password
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Simpan status login dan nama pengguna ke sessionStorage
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', user.name); // Menyimpan nama lengkap pengguna
        sessionStorage.setItem('role', user.role || 'user'); // Menyimpan role pengguna

        alert('Login berhasil!');
        window.location.href = '/index.html'; // Redirect ke halaman index di root
    } else {
        alert('Akun tidak tersedia. Pastikan email dan password benar.');
    }

    loginForm.reset(); // Mengosongkan form setelah mencoba login
});
