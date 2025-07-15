# 🔗 URL Shortener Microservice

A simple Django-based URL shortening service with access token authentication. Built as part of the Affordmed Campus Drive test.

---

## 🚀 Features

- Shorten long URLs
- Custom shortcode support
- Expiry time (in minutes)
- Redirect to original URL
- Click tracking and last access time
- Token-based authentication using access token

---

## 🛠️ Tech Stack

- Python 3
- Django
- Django REST Framework
- SQLite (default)
- Token Authentication (via Bearer Token)

---

## 📦 Installation

### 1. Clone the Project
```bash
git clone <your_repo_url>
cd url_shortener_microservice
```

### 2. Create Virtual Environment (Recommended)

Using built-in venv:
```bash
python -m venv venv
```

Activate:

- **Windows CMD**: `venv\Scripts\activate`
- **PowerShell**: `.env\Scripts\Activate.ps1`
- **macOS/Linux**: `source venv/bin/activate`

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

---

## ⚙️ Setup

### .env File

Create a `.env` file and add:
```
ACCESS_TOKEN=abcdef123456
```

---

## 💡 API Usage

### 🔐 Add This Header to All Requests

```
Authorization: Bearer abcdef123456
```

### 1. Create Short URL

**POST** `/shorturls`

#### Body:
```json
{
  "url": "https://www.example.com",
  "shortcode": "abc123",     // optional
  "validity": 30             // in minutes
}
```

### 2. Redirect

**GET** `/:shortcode`  
Redirects to original URL if not expired.

### 3. Get Stats

**GET** `/shorturls/:shortcode`

#### Response:
```json
{
  "shortcode": "abc123",
  "original_url": "https://www.example.com",
  "created_at": "...",
  "expiry_time": "...",
  "clicks": 5,
  "last_clicked": "..."
}
```

---

## 🧪 Run the Server

```bash
python manage.py migrate
python manage.py runserver
```

Visit: [http://localhost:8000](http://localhost:8000)

---

## 📤 Deployment Tips

- Use `render.com`, `railway.app`, or Docker
- Change `localhost` to your domain in model method `.short_link()`

---

## 📄 License

This project is part of the Affordmed evaluation. Not for commercial reuse.
