# TODO

## Task: Perbaiki bagian details agar lebih rapi dan sama di detail.html

- [ ] 1) Review file `client/src/pages/details/index.js` (bagian Event Details/Keypoints/Map/Card) dan samakan struktur/teks dengan `details.html`.
- [ ] 2) Jika diperlukan, sesuaikan `client/src/index.css` untuk memastikan kelas yang dipakai konsisten.
- [ ] 3) Jalankan `npm test`/`npm run dev`/build (pilih yang tersedia) dan cek halaman `/details`.

## Updates
- [x] Fix mismatch `Join Now` link di `details/index.js` (hapus `/checkout` karena belum ada route di `client/src/routes/index.js`; arahkan ke route yang ada/masuk akal).
- [x] Samakan behavior hover map dengan `details.html` (mouseOver/mouseOut) menggunakan React (useEffect) agar `hoverMe` dan `btn-maps` berfungsi.
- [x] Rapikan formatting dan indentasi JSX, serta sejajarkan struktur comment/section agar lebih maintainable.



