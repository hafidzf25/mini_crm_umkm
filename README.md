# Mini CRM UMKM Kuliner

Mini CRM sederhana untuk UMKM kuliner yang digunakan untuk mencatat data pelanggan dan histori pesanan.

Project ini dibuat sebagai work sample test dengan REST API menggunakan Node.js, Express, dan TypeScript serta frontend menggunakan React, TypeScript, Vite, dan Tailwind CSS.

## Fitur

### Customer

- Menambahkan customer baru.
- Menampilkan daftar customer.
- Validasi nama, email, dan nomor telepon.

### Order

- Menambahkan order untuk customer tertentu.
- Menampilkan daftar order.
- Melihat semua order milik satu customer.
- Menampilkan total harga dan detail item order.

### Frontend

- Pagination customer dan order dengan 5 data per halaman.
- Draft form order tersimpan otomatis di `localStorage`.
- Draft dihapus setelah order berhasil dibuat.
- Tampilan responsive untuk desktop dan mobile.

## Tech Stack

### Backend

- Node.js
- Express
- TypeScript
- Zod
- UUID
- `db.json` sebagai database sederhana

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS v4

## Struktur Project

```text
mini-crm/
├── backend/
│   ├── db.json
│   ├── package.json
│   └── src/
│       ├── app.ts
│       ├── controllers/
│       ├── middleware/
│       ├── routes/
│       ├── schemas/
│       ├── services/
│       ├── types/
│       └── utils/
├── frontend/
│   ├── package.json
│   └── src/
│       ├── components/
│       ├── services/
│       ├── types/
│       ├── App.tsx
│       └── index.css
└── README.md
```

## Menjalankan Project

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend berjalan di `http://localhost:3000`.

### Frontend

Buka terminal baru dari root project:

```bash
cd frontend
npm install
npm run dev
```

Frontend berjalan di `http://localhost:5173`.

## Script

### Backend

```bash
npm run dev    # Development server dengan watch mode
npm run build  # Type-check dan compile TypeScript
npm start      # Menjalankan hasil compile
```

### Frontend

```bash
npm run dev      # Development server
npm run build    # Type-check dan production build
npm run lint     # Menjalankan ESLint
npm run preview  # Preview production build
```

## API

Base URL:

```text
http://localhost:3000
```

### Health Check

```http
GET /health
```

### Customer

```http
POST /customers
GET /customers
```

Request `POST /customers`:

```json
{
  "name": "Abdullah",
  "email": "abdullah@gmail.com",
  "phone": "085156337575"
}
```

### Order

```http
POST /orders
GET /orders
GET /orders?customer_id={customer_id}
```

Request `POST /orders`:

```json
{
  "customer_id": "customer-id",
  "items": [
    {
      "name": "Ayam Geprek",
      "quantity": 2,
      "price": 15000
    }
  ],
  "total_price": 30000
}
```

## Validasi dan Error Handling

Request backend divalidasi menggunakan Zod. Contoh aturan customer:

- Nama minimal 2 karakter.
- Email harus memiliki format yang valid.
- Nomor telepon minimal 8 digit.
- Nomor telepon hanya boleh berisi angka.

Error ditangani melalui centralized error middleware dengan response berbentuk:

```json
{
  "success": false,
  "message": "Customer not found"
}
```

## Database

Data disimpan secara lokal di:

```text
backend/db.json
```

Struktur database:

```json
{
  "customers": [],
  "orders": []
}
```

Pendekatan ini sesuai untuk scope work sample yang sederhana dan tidak memerlukan database server eksternal.
