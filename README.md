# Mini CRM UMKM Kuliner

Mini CRM sederhana untuk UMKM kuliner yang digunakan untuk mencatat data pelanggan dan histori pesanan.

Project ini dibuat sebagai work sample test untuk menunjukkan implementasi REST API menggunakan Node.js, Express, dan TypeScript serta frontend menggunakan React dan TypeScript.

## Project Status

Backend API selesai dan sedang dalam tahap pengembangan frontend.

---

## Tech Stack

### Backend

* Node.js
* Express
* TypeScript
* Zod
* UUID
* JSON file sebagai database

### Frontend

* React
* TypeScript
* Vite

---

## Features

### Backend

* Menambahkan customer
* Mengambil seluruh customer
* Menambahkan order
* Mengambil seluruh order
* Mengambil order berdasarkan customer
* Validasi input
* Error handling
* Penyimpanan data menggunakan `db.json`
* Struktur project modular

### Frontend

* Akan ditambahkan

---

## Project Structure

```text
mini-crm-umkm/
├── backend/
│   ├── db.json
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── app.ts
│       ├── controllers/
│       ├── middleware/
│       ├── routes/
│       ├── schemas/
│       ├── services/
│       ├── types/
│       └── utils/
│
├── frontend/
│   └── ...
│
├── .gitignore
└── README.md
```

---

# Backend API

Base URL:

```text
http://localhost:3000
```

## Health Check

### `GET /health`

Memeriksa apakah API sedang berjalan.

Example response:

```json
{
  "success": true,
  "message": "Mini CRM API is running"
}
```

---

## Customer

### `POST /customers`

Menambahkan customer baru.

Request body:

```json
{
  "name": "Abdullah",
  "email": "abdullah@gmail.com",
  "phone": "085156337575"
}
```

Example response:

```json
{
  "success": true,
  "data": {
    "id": "customer-id",
    "name": "Abdullah",
    "email": "abdullah@gmail.com",
    "phone": "085156337575",
    "created_at": "2026-08-27T12:00:00.000Z"
  }
}
```

### `GET /customers`

Mengambil seluruh data customer.

---

## Order

### `POST /orders`

Menambahkan order baru untuk customer.

Request body:

```json
{
  "customer_id": "customer-id",
  "items": [
    {
      "name": "Ayam Geprek",
      "quantity": 2,
      "price": 15000
    },
    {
      "name": "Es Teh",
      "quantity": 1,
      "price": 5000
    }
  ],
  "total_price": 35000
}
```

Setiap item memiliki:

* `name` — nama produk
* `quantity` — jumlah item
* `price` — harga item

### `GET /orders`

Mengambil seluruh order.

### `GET /orders?customer_id={customer_id}`

Mengambil seluruh order milik customer tertentu.

Contoh:

```text
GET /orders?customer_id=customer-id
```

---

# Validation

Request divalidasi menggunakan Zod.

Contoh validasi customer:

* Nama minimal 2 karakter
* Email harus memiliki format email yang valid
* Nomor telepon minimal 8 digit
* Nomor telepon hanya boleh berisi angka

Contoh input tidak valid:

```json
{
  "name": "Abdullah",
  "email": "invalid-email",
  "phone": "abcdefgh"
}
```

API akan mengembalikan HTTP `400 Bad Request`.

---

# Error Handling

API menggunakan centralized error handling middleware.

Contoh ketika order dibuat menggunakan customer yang tidak tersedia:

```json
{
  "success": false,
  "message": "Customer not found"
}
```

HTTP status:

```text
404 Not Found
```

---

# Database

Untuk memenuhi kebutuhan work sample, data disimpan menggunakan file JSON:

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

Pendekatan ini digunakan karena scope aplikasi masih sederhana dan requirement secara eksplisit menentukan penggunaan `db.json`.

---

# How to Run

## Backend

Masuk ke folder backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

API akan tersedia di:

```text
http://localhost:3000
```

## Build Backend

Untuk melakukan pengecekan TypeScript:

```bash
npm run build
```

Untuk menjalankan hasil build:

```bash
npm start
```

---

# Development Notes

Struktur backend dipisahkan berdasarkan tanggung jawab:

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Database Utility
   ↓
db.json
```

Validation dipisahkan ke dalam `schemas`, sedangkan error handling ditangani oleh middleware.

Pendekatan ini bertujuan agar kode lebih mudah dipahami, diuji, dan dikembangkan ketika fitur baru ditambahkan.

---

# Future Development

Beberapa pengembangan yang dapat dilakukan:

* React frontend