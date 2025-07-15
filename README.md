# 🛒 Type-Frontend — Modern eCommerce Frontend

This is a **modern frontend** built using **React 19 + TypeScript + Vite** for an eCommerce platform. It connects to a **custom Node.js backend** that I previously developed as part of my learning journey.

While the backend was created during my early exploration of full-stack development, this new frontend is fully redesigned and rebuilt from scratch using updated technologies and best practices.

---

## 🧠 About This Project

- 🔁 **Backend:** Custom-built earlier using Node.js, Express, and MongoDB
- 🧑‍🎨 **Frontend (this repo):** Newly created, clean UI with modern component-based structure, Tailwind CSS, and Zustand state management
- 🧪 **Testing:** Configured with Jest and React Testing Library for unit tests

---

## 🛠️ Tech Stack

| Layer       | Technology                    |
|-------------|-------------------------------|
| **Frontend** | React 19, TypeScript, Vite     |
| **State**    | Zustand                        |
| **Styling**  | Tailwind CSS, Lucide Icons     |
| **Routing**  | React Router DOM               |
| **Testing**  | Jest, React Testing Library    |
| **Backend**  | Node.js, Express, MongoDB *(Built by me earlier)* |

---

## ✨ Features

- 🔍 Product listing with filters (Category + Price)
- 🧾 Pagination and dynamic product count
- 🖼️ Graceful fallback for missing product images
- ❤️ Favorite icon UI (planned for feature enhancement)
- 🛒 Price display with discount logic
- 🔐 Authenticated routing (checks token in localStorage)
- 📱 Fully responsive with Tailwind
- 🧪 Basic unit test setup (with Zustand mocking support)

---

## 🧪 Run Locally

```bash
# Clone the repo
git clone https://github.com/Sandy-8-bit/Test.git
cd Test

# Install dependencies
npm install

# Start the dev server
npm run dev
