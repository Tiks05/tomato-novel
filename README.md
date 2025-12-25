# Tomato Novel

A full-stack reconstruction of the **Tomato Novel** platform, featuring a modern React frontend and a .NET Web API backend.  
Supports multi-role users, multi-level pages, CRUD operations, comments/replies, and file uploads.

---

## ✨ Features

- 👥 Multi-role user system (Admin / Author / Reader)
- 📚 Multi-level novel & chapter management
- ✏️ Full CRUD operations
- 💬 Comments & replies
- 📎 File upload support
- 🔐 Authentication & authorization based on OpenIddict (BFF pattern)
- ⚡ Frontend state management with Zustand

---

## 🧱 Tech Stack

### Frontend

- React
- Zustand
- Ant Design
- Vite
- TypeScript
- pnpm

### Backend

- .NET Web API
- LINQ
- Entity Framework Core
- OpenIddict
- SQL Server

---

## 📁 Project Structure

```text
.
├── backend/
│   └── TomatoNovel
├── frontend/
│   └── TomatoNovel.Web
├── tomato_novel.sql
└── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Frontend

```bash
cd frontend/TomatoNovel.Web
pnpm install
pnpm dev
```

Frontend will be available at:

```
http://localhost:5173
```

---

### 2️⃣ Backend

#### Step 1: Configure Database

- Ensure SQL Server is running
- Update the connection string in `appsettings.json`

#### Step 2: Apply Migrations

```bash
dotnet ef database update
```

#### Step 3: Run Initial SQL Script

Execute the following file in your database:

```text
tomato_novel.sql
```

#### Step 4: Run Backend

```bash
dotnet run
```

Backend API default address:

```
http://localhost:7000
```

---

## 🔐 Authentication

- OpenIddict-based authentication
- BFF (Backend-for-Frontend) architecture
- Role-based access control

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Open a Pull Request

---

## 📄 License

MIT License
