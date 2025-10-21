<p align="center">
  <img src="/bnnr.png" alt="Shadhin Bangla Logo" width="120" />
</p>

<h1 align="center">🏴‍☠️ Shadhin Bangla 2.0</h1>

<p align="center">
  <strong>বাংলার কণ্ঠস্বর, নতুন প্রজন্মের জন্য ডিজিটাল বাংলাদেশ।</strong><br>
  July Movement, স্বাধীনতা, শহীদদের স্মৃতি ও আধুনিক বাংলাদেশের গল্প একসাথে।
</p>

<p align="center">
  <a href="https://github.com/kamrul2006/shadin-bangla-2.0/stargazers">
    <img src="https://img.shields.io/github/stars/kamrul2006/shadin-bangla-2.0?style=flat-square&color=gold" alt="Stars">
  </a>
  <a href="https://github.com/kamrul2006/shadin-bangla-2.0/issues">
    <img src="https://img.shields.io/github/issues/kamrul2006/shadin-bangla-2.0?style=flat-square&color=red" alt="Issues">
  </a>
  <a href="https://github.com/kamrul2006/shadin-bangla-2.0/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
  </a>
  <a href="https://vercel.com">
    <img src="https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square" alt="Vercel">
  </a>
</p>

---

## 🌐 Live Preview  

🔗 [https://shadin-bangla-2-0.vercel.app](https://shadin-bangla-2-0.vercel.app)

---

## 🚀 Project Overview  

**Shadhin Bangla 2.0** হলো বাংলাদেশের সামাজিক ও ছাত্র আন্দোলনের ডিজিটাল প্রতিফলন।  
এখানে ব্যবহারকারীরা স্বাধীনতা সংগ্রামের স্মৃতি, জুলাই আন্দোলনের মুহূর্ত, ব্লগ, ইতিহাস ও চিত্র দেখতে পারবেন।  

এই প্রজেক্টটি তৈরি করা হয়েছে:

- ⚛️ **React.js (v19)** এবং **Vite** দ্বারা  
- 🎨 **TailwindCSS** এবং **DaisyUI** দিয়ে আধুনিক ও রেসপনসিভ UI  
- 💫 **react-awesome-reveal** দিয়ে animation  
- 🔀 **React Router v7** দিয়ে Single Page Navigation  

---

## 🧩 Tech Stack  

| Category        | Technology |
|-----------------|-------------|
| **Frontend**    | React (v19), React Router (v7) |
| **Styling**     | TailwindCSS, DaisyUI |
| **Animation**   | react-awesome-reveal |
| **Icons**       | react-icons |
| **Build Tool**  | Vite |
| **Linting**     | ESLint |
| **Package Manager** | npm / yarn / pnpm |

---

## 🗂️ Folder Structure  

```

shadin-bangla-ui/
├─ public/
│  ├─ backgrounds/
│  ├─ graphys/
│  ├─ icons/
│  ├─ media/
│  ├─ others/
│  ├─ sohid/
│  ├─ blogs.json
│  └─ julyGallery.json
│
├─ src/
│  ├─ assets/
│  │  └─ react.svg
│  ├─ Auth/
│  ├─ Components/
│  │  ├─ Fixed/
│  │  │  ├─ ErrorPage.jsx
│  │  │  ├─ Footer.jsx
│  │  │  └─ NavBar.jsx
│  │  └─ Other/
│  │     ├─ Blogs/
│  │     │  └─ BlogPageBanner.jsx
│  │     ├─ History/
│  │     │  └─ HistoyBanner.jsx
│  │     ├─ Home/
│  │     │  ├─ HeroSection.jsx
│  │     │  └─ MediaSection.jsx
│  │     ├─ JulayGallery/
│  │     │  ├─ JulyGalleryBanner.jsx
│  │     │  └─ JulyGalleryGrid.jsx
│  │     └─ Sohid/
│  │        ├─ ShohidBanner.jsx
│  │        └─ SohidList.jsx
│  ├─ Layouts/
│  │  ├─ BlogPageLayOut.jsx
│  │  ├─ HistoryPageLayOuts.jsx
│  │  ├─ HomePageLayOut.jsx
│  │  ├─ JulyGalleryLayouts.jsx
│  │  ├─ RootLayots.jsx
│  │  └─ SohidPageLayOut.jsx
│  ├─ Pages/
│  ├─ Router/
│  │  └─ routs.jsx
│  ├─ index.css
│  └─ main.jsx
│
├─ package.json
└─ vite.config.js

```

---

## ⚙️ Installation & Setup  

```bash
# 1️⃣ Clone the repository
git clone https://github.com/kamrul2006/shadin-bangla-2.0.git
cd shadin-bangla-2.0

# 2️⃣ Install dependencies
npm install

# 3️⃣ Run locally
npm run dev
````

👉 Your app will run at: **[http://localhost:5173](http://localhost:5173)**

---

## 💡 Core Features

- **Dynamic Home Page** — আন্দোলনের প্রতিচ্ছবি ও সাম্প্রতিক তথ্য
- **Photo / Media Gallery** — জুলাই আন্দোলন, শহীদের ছবি, গ্রাফি
- **Blog Section** — ইতিহাস, মতামত ও বাস্তব কাহিনি
- **Animated Hero Sections** — পারালাক্স ও fade-in অ্যানিমেশন
- **Responsive Navbar & Footer**
- **Smooth SPA Navigation with React Router**
- **Modern Tailwind-based UI**

---

## 🔮 Future Plans

| Feature                             | Description                                          |
| ----------------------------------- | ---------------------------------------------------- |
| **Firebase Authentication**         | ব্যবহারকারীরা লগইন করে ব্লগ বা ছবি পোস্ট করতে পারবেন |
| **Admin Dashboard**                 | কনটেন্ট ম্যানেজমেন্ট ও ইউজার নিয়ন্ত্রণ               |
| **Realtime Comment System**         | পাঠকদের মতামত প্রদর্শন                               |
| **Deployment on Firebase / Vercel** | দ্রুত ও নিরাপদ লাইভ হোস্টিং                          |
| **SEO Optimization**                | গুগল সার্চে উচ্চ র‍্যাংকিং ও মেটা ট্যাগ সাপোর্ট      |
| **Dark / Light Mode**               | ব্যবহারকারীর পছন্দ অনুযায়ী থিম পরিবর্তন              |

---

## 🧑‍💻 Contributing

We welcome all contributions from the open-source community!

**To contribute:**

```bash
# Step 1: Fork the repo
# Step 2: Create a new branch
git checkout -b feature/your-feature-name

# Step 3: Make changes
# Step 4: Commit & push
git commit -m "Added a new feature"
git push origin feature/your-feature-name
```

Then, open a **Pull Request** — and we’ll review it promptly.

---

## 📜 License

This project is open-source under the **MIT License**.
You are free to use, modify, and distribute it with proper attribution.

---

## 👨‍🎨 Author

**Project Creator:** [Kamrul Islam Apurba](https://github.com/kamrul2006)
📧 **Email:** [kamrulislamapurba@gmail.com](mailto:kamrulislamapurba@gmail.com)
🌍 **GitHub:** [github.com/kamrul2006](https://github.com/kamrul2006)

---

<p align="center">
  <b>Shadhin Bangla 2.0 – Voices of the New Generation 🇧🇩</b>
</p>
```
