# Mini CRM UMKM Kuliner - Frontend

Frontend aplikasi Mini CRM untuk membantu UMKM kuliner mencatat customer dan order.

## Fitur

- Menambahkan customer dengan validasi nama, email, dan nomor telepon.
- Menambahkan order untuk customer tertentu.
- Menampilkan total customer dan order.
- Melihat semua order atau memfilter order berdasarkan customer.
- Pagination customer dan order, masing-masing 5 data per halaman.
- Menyimpan draft form order secara otomatis menggunakan `localStorage`.
- Menghapus draft setelah order berhasil disimpan.
- Tampilan responsive untuk desktop dan mobile.

## Teknologi

- React 19
- TypeScript
- Vite
- Tailwind CSS v4

## Menjalankan Frontend

Dari folder `frontend`, install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Frontend tersedia di `http://localhost:5173`.

Pastikan backend sudah berjalan di `http://localhost:3000` karena frontend menggunakan alamat tersebut untuk request API.

## Script

```bash
npm run dev      # Menjalankan development server
npm run build    # Type-check dan membuat production build
npm run lint     # Menjalankan ESLint
npm run preview  # Menampilkan production build secara lokal
```

## Struktur Utama

```text
src/
├── components/
│   ├── CustomerForm.tsx
│   ├── CustomerList.tsx
│   ├── OrderForm.tsx
│   └── OrderList.tsx
├── services/
│   └── api.ts
├── types/
│   └── index.ts
├── App.tsx
└── index.css
```
