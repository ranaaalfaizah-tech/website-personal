# Neo Nero — Next.js + React + Laravel

Migrasi dari `original-index.html` ke arsitektur modern.

## Frontend
- Next.js + React
- Tailwind CSS
- GSAP
- Leaflet
- Lucide

`frontend/app/page.jsx` mempertahankan tampilan dan interaksi halaman lama melalui React client component, sambil menyiapkan koneksi API Laravel.

## Backend
- Laravel API
- CRUD `/api/products`
- `/api/health`
- migration `products`

## Menjalankan frontend
```bash
cd frontend
npm install
npm run dev
```
Buka http://localhost:3000

Set `NEXT_PUBLIC_API_URL` jika Laravel tidak berada di `http://127.0.0.1:8000/api`.

## Menjalankan Laravel
Gunakan project Laravel baru sebagai basis, lalu salin folder `backend/app`, `backend/routes/api.php`, dan migration ini. Setelah `.env` diisi:
```bash
php artisan migrate
php artisan serve
```

## Catatan asset
HTML asli merujuk gambar lokal seperti `logoneoneroo.png`, `botoluk600ml.png`, `berita3.jpeg`, dll. Jika file gambarnya belum ikut ter-upload ke percakapan, letakkan file tersebut di `frontend/public/assets/` dengan nama yang sama.
