
# 📦 API ATRIA System

Sebuah API sederhana untuk integrasi sistem ATRIA yang berfungsi menghitung dan menginsert point dari transaksi pembelian berdasarkan Store dan Item (EndPoint lainnya menyusul ya mas bro).

---

## 🚀 Teknologi yang Digunakan

- **Node.js** (v18)
- **Express.js** – Framework backend
- **JWT** – Autentikasi token
- **Axios** – Untuk HTTP request ke API eksternal
- **Crypto** – Untuk hash SHA256 pembuatan `p_keypass`
- **dotenv** – Untuk menyimpan konfigurasi rahasia
- **express-rate-limit** – Untuk proteksi rate limiting
- **Custom Middleware** – Untuk validasi API key dan JWT token

---

## 🔐 Autentikasi

### Login Endpoint

`POST /api/login`

#### Request:
```json
{
  "username": "nova",
  "password": "Jakasembung"
}
```

#### Response:
```json
{
  "token": "<JWT_TOKEN>"
}
```

---

## 🔑 API Key

- API Key dikirim melalui header: `x-api-key`
- Nilainya bisa diatur dari `.env` dengan variable: `API_KEY`

---

## 📌 Endpoint List

### 1. 🧮 Hitung Point

**Endpoint**: `POST /api/consume-point`

**Deskripsi**: Mengirimkan data Store dan Item untuk menghitung point dari API eksternal.

#### Header:
```http
Authorization: Bearer <JWT_TOKEN>
x-api-key: <API_KEY>
Content-Type: application/json
```

#### Body:
```json
{
  "p_StoreNo": "80011",
  "p_ItemNo": "24010811"
}
```

#### Contoh CURL:
```bash
curl --location 'http://localhost:3000/api/consume-point' --header 'Authorization: Bearer <JWT_TOKEN>' --header 'x-api-key: <API_KEY>' --header 'Content-Type: application/json' --data '{
  "p_StoreNo": "80011",
  "p_ItemNo": "24010811"
}'
```

#### Response:
```json
{
  "status": "success",
  "data": {
    "Distribution Group Code": "JAKARTA",
    "StoreNo": "80011",
    "ItemNo": "24010811",
    "HargaNormal": 3602703,
    "DiscPercent": 50.26256564,
    "HargaSetelahDiscount": 1989000,
    "Percentage": 0.025,
    "PointCashback": 0,
    "PointRegular": 49700,
    "DescPoint": "Point Regular"
  }
}
```

---

### 2. 📝 Insert Point

**Endpoint**: `POST /api/insert-point`

**Deskripsi**: Mengirimkan data Store, Receipt, dan Point ke API eksternal untuk disimpan.

#### Header:
```http
Authorization: Bearer <JWT_TOKEN>
x-api-key: <API_KEY>
Content-Type: application/json
```

#### Body:
```json
{
  "p_StoreNo": "80011",
  "p_ReceiptNo": "111000022",
  "p_PointAmt": 100000
}
```

#### Contoh CURL:
```bash
curl --location 'http://localhost:3000/api/insert-point' --header 'Authorization: Bearer <JWT_TOKEN>' --header 'x-api-key: <API_KEY>' --header 'Content-Type: application/json' --data '{
  "p_StoreNo": "80011",
  "p_ReceiptNo": "111000022",
  "p_PointAmt": 100000
}'
```

#### Response:
```json
{
  "status": "success",
  "data": {
    "response_code": 200,
    "response_desc": "Insert berhasil"
  }
}
```

---

## ⚙️ Environment Variables (.env)

```env
PORT=3000
API_KEY=your_api_key_here
JWT_SECRET=your_jwt_secret_here
SYSTEM_KEYPASS=your_internal_keypass_here
```

---

## 📁 Struktur Folder

```
├── middleware/
│   └── auth.js             # Middleware untuk token & API key
├── routes/
│   └── api.js              # Semua endpoint utama
├── config/
│   └── config.js           # Konfigurasi JWT
├── app.js                  # Entry point aplikasi
├── .env                    # Config rahasia
└── README.md               # Dokumentasi ini
```

---

## 🏁 Menjalankan Aplikasi

```bash
npm install
npm start
```

Akses API di: `http://localhost:3000/api`

---

## 📬 Kontak

Jika ada kendala, hubungi tim IT ATRIA.
