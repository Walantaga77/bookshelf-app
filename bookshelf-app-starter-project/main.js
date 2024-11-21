// document.getElementById('bookForm').addEventListener('submit', function (event) {
//     event.preventDefault();

//     // Ambil data dari form
//     const title = document.getElementById('bookFormTitle').value;
//     const author = document.getElementById('bookFormAuthor').value;
//     const year = document.getElementById('bookFormYear').value;
//     const isComplete = document.getElementById('bookFormIsComplete').checked;

//     // Buat elemen buku baru
//     const bookId = Date.now().toString();
//     const bookList = isComplete ? document.getElementById('completeBookList') : document.getElementById('incompleteBookList');

//     const bookElement = document.createElement('div');
//     bookElement.setAttribute('data-bookid', bookId);
//     bookElement.setAttribute('data-testid', 'bookItem');
//     bookElement.innerHTML = `
//         <p>ID Buku: ${book.id}</p>
//         <h3 data-testid="bookItemTitle">${title}</h3>
//         <p data-testid="bookItemAuthor">Penulis: ${author}</p>
//         <p data-testid="bookItemYear">Tahun: ${year}</p>
//         <div>
//             <button data-testid="bookItemIsCompleteButton">${isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}</button>
//             <button data-testid="bookItemDeleteButton">Hapus Buku</button>
//             <button data-testid="bookItemEditButton">Edit Buku</button>
//         </div>
//     `;

//     // Tambahkan elemen ke daftar
//     bookList.appendChild(bookElement);

//     // Kosongkan form
//     event.target.reset();
// });

// document.body.addEventListener('click', function (event) {
//     if (event.target.dataset.testid === 'bookItemIsCompleteButton') {
//         const bookElement = event.target.closest('[data-testid="bookItem"]');
//         const bookList = event.target.textContent === 'Selesai dibaca' ? document.getElementById('completeBookList') : document.getElementById('incompleteBookList');
//         const buttonText = event.target.textContent === 'Selesai dibaca' ? 'Belum selesai dibaca' : 'Selesai dibaca';

//         // Pindahkan elemen
//         bookElement.remove();
//         bookList.appendChild(bookElement);

//         // Ubah teks tombol
//         event.target.textContent = buttonText;
//     }
// });

// document.body.addEventListener('click', function (event) {
//     if (event.target.dataset.testid === 'bookItemDeleteButton') {
//         const bookElement = event.target.closest('[data-testid="bookItem"]');
//         bookElement.remove();
//     }
// });

// document.getElementById('searchBook').addEventListener('submit', function (event) {
//     event.preventDefault();

//     const searchQuery = document.getElementById('searchBookTitle').value.toLowerCase();
//     const bookItems = document.querySelectorAll('[data-testid="bookItem"]');

//     bookItems.forEach(book => {
//         const title = book.querySelector('[data-testid="bookItemTitle"]').textContent.toLowerCase();
//         book.style.display = title.includes(searchQuery) ? 'block' : 'none';
//     });
// });

// Event listener untuk formulir pencarian
document.getElementById('searchBook').addEventListener('submit', function (event) {
    event.preventDefault(); // Mencegah reload halaman

    // Ambil kata kunci pencarian
    const searchQuery = document.getElementById('searchBookTitle').value.trim().toLowerCase();

    // Ambil semua elemen buku
    const bookItems = document.querySelectorAll('[data-testid="bookItem"]');

    // Filter elemen berdasarkan judul
    bookItems.forEach((book) => {
        const title = book.querySelector('[data-testid="bookItemTitle"]').textContent.toLowerCase();
        if (title.includes(searchQuery)) {
            book.style.display = 'block'; // Tampilkan buku
        } else {
            book.style.display = 'none'; // Sembunyikan buku
        }
    });
});

// // Tombol reset pencarian 
// document.getElementById('searchBookTitle').addEventListener('input', function () {
//     if (this.value === '') {
//         // Reset tampilan buku jika input kosong
//         const bookItems = document.querySelectorAll('[data-testid="bookItem"]');
//         bookItems.forEach((book) => {
//             book.style.display = 'block';
//         });
//     }
// });


// // Membuat objek buku baru
// const book = {
//     id: new Date().getTime().toString(), // Menghasilkan ID unik
//     title: document.getElementById('bookFormTitle').value.trim(),
//     author: document.getElementById('bookFormAuthor').value.trim(),
//     year: Number(document.getElementById('bookFormYear').value),
//     isComplete: document.getElementById('bookFormIsComplete').checked,
// };

// // Tambahkan buku ke daftar buku
// books.push(book);

// // Tambahkan buku ke tampilan
// renderBook(book);

// Array untuk menyimpan data buku
let books = [];

// Fungsi untuk menyimpan data buku ke localStorage
function saveBooksToStorage() {
    localStorage.setItem('BOOKSHELF_APP', JSON.stringify(books));
}

// Fungsi untuk memuat data buku dari localStorage
function loadBooksFromStorage() {
    const storedBooks = localStorage.getItem('BOOKSHELF_APP');
    if (storedBooks) {
        books = JSON.parse(storedBooks); // Parsing data dari string ke array
        books.forEach(renderBook);      // Render setiap buku ke UI
    }
}

// Fungsi untuk menampilkan buku di rak
function renderBook(book) {
    const bookList = book.isComplete
        ? document.getElementById('completeBookList')
        : document.getElementById('incompleteBookList');

    const bookElement = document.createElement('div');
    bookElement.setAttribute('data-bookid', book.id);
    bookElement.setAttribute('data-testid', 'bookItem');
    bookElement.innerHTML = `
        <p>ID Buku: ${book.id}</p>
        <h3 data-testid="bookItemTitle">${book.title}</h3>
        <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
        <p data-testid="bookItemYear">Tahun: ${book.year}</p>
        <div>
            <button data-testid="bookItemIsCompleteButton">${book.isComplete ? 'Belum Selesai Dibaca' : 'Selesai Dibaca'}</button>
            <button data-testid="bookItemDeleteButton">Hapus Buku</button>
            <button data-testid="bookItemEditButton">Edit Buku</button>
        </div>
    `;

    bookList.appendChild(bookElement);

    addBookEventListeners(bookElement, book);
}

// Fungsi untuk menangani event pada setiap buku
function addBookEventListeners(bookElement, book) {
    // Tombol untuk memindahkan buku
    bookElement.querySelector('[data-testid="bookItemIsCompleteButton"]').addEventListener('click', function () {
        book.isComplete = !book.isComplete;
        bookElement.remove();
        renderBook(book);
        saveBooksToStorage(); // Simpan perubahan ke localStorage
    });

    // Tombol untuk menghapus buku
    bookElement.querySelector('[data-testid="bookItemDeleteButton"]').addEventListener('click', function () {
        books = books.filter((b) => b.id !== book.id);
        bookElement.remove();
        saveBooksToStorage(); // Simpan perubahan ke localStorage
    });

    // Tombol untuk mengedit buku
    bookElement.querySelector('[data-testid="bookItemEditButton"]').addEventListener('click', function () {
        populateFormForEdit(book);
    });
}

// Fungsi untuk mengisi form dengan data buku yang akan diedit
function populateFormForEdit(book) {
    document.getElementById('bookFormTitle').value = book.title;
    document.getElementById('bookFormAuthor').value = book.author;
    document.getElementById('bookFormYear').value = book.year;
    document.getElementById('bookFormIsComplete').checked = book.isComplete;

    const form = document.getElementById('bookForm');
    form.setAttribute('data-editing-bookid', book.id);

    const submitButton = document.getElementById('bookFormSubmit');
    submitButton.textContent = 'Simpan Perubahan';
}

// Fungsi untuk menambahkan atau memperbarui buku
document.getElementById('bookForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const form = event.target;
    const bookId = form.getAttribute('data-editing-bookid');

    if (bookId) {
        // Mode Edit
        const book = books.find((b) => b.id === bookId);
        if (book) {
            book.title = document.getElementById('bookFormTitle').value.trim();
            book.author = document.getElementById('bookFormAuthor').value.trim();
            book.year = Number(document.getElementById('bookFormYear').value);
            book.isComplete = document.getElementById('bookFormIsComplete').checked;

            const oldBookElement = document.querySelector(`[data-bookid="${book.id}"]`);
            oldBookElement.remove();
            renderBook(book);
            saveBooksToStorage(); // Simpan perubahan ke localStorage
        }

        form.removeAttribute('data-editing-bookid');
        form.reset();

        const submitButton = document.getElementById('bookFormSubmit');
        submitButton.textContent = 'Masukkan Buku ke Rak';
    } else {
        // Mode Tambah
        const book = {
            id: new Date().getTime().toString(), // ID unik
            title: document.getElementById('bookFormTitle').value.trim(),
            author: document.getElementById('bookFormAuthor').value.trim(),
            year: Number(document.getElementById('bookFormYear').value),
            isComplete: document.getElementById('bookFormIsComplete').checked,
        };

        books.push(book);
        renderBook(book);
        saveBooksToStorage(); // Simpan perubahan ke localStorage
        form.reset();
    }
});

// Muat buku dari localStorage saat halaman dimuat
document.addEventListener('DOMContentLoaded', function () {
    loadBooksFromStorage();
});



