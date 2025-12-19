# ToDO-iDo

Tentang ToDO-iDo
--

Banyak mahasiswa yang kesulitan dalam menjalankan kegiatan yang direncanakan karena sering lupa atau tidak konsisten, sehingga kebiasaan positif dalam manajemen waktu tidak terwujud. Untuk mengatasi masalah tersebut aplikasi toDo-iDo hadir untuk membantu mengelola kegiatan dan membantu konsistensi untuk membangun kebiasaan positif dalam manajemen waktu. toDo-iDO adalah aplikasi todo list berbasis website yang dapat mengelola kegiatan yang telah direncanakan agar berjalan sesuai planning dan konsisten.


Manfaat dan Kelebihan ToDo-iDo:
--
- Sebagai Pengingat Task yang akan dikerjakan daily todo
- Report Weekly dan Monthly berbentuk Line Chart sebagai Progress User
- Kata kata motivasi untuk mendukungmu membangun kebiasan positif secara konsisten
- Aplikasi ini dapat digunakan pada device mobile maupun desktop.


Capstone Project SIB Kampus merdeka Dicoding Batch 3 - Team ID : C22-164
--
1. F251X0546 - TM Veri Agustian
2. F492Y1031 - Djihan Amartia
3. F492X1030 - Dedi Fakhriansyah 


Project Resources
--
Teknologi yang kami gunakan:
- **Frontend Framework**: React 19
- **Routing**: React Router v7
- **Backend**: ExpressJS
- **Build Tools**: Webpack, Babel
- **Module Bundler**: Webpack 5
- **NodeJS**: v14.x atau lebih tinggi

Bahasa Pemrograman yang digunakan:
- JavaScript (ES6+)
- JSX (React)
- CSS3

Framework CSS yang digunakan:
- Bootstrap 5
- Custom CSS with animations

Assets yang digunakan:
- Freepik.com
- Unsplash.com
- Storyset.com
- Google Image
- Chart JS
- Font Awesome

Deploy:
- Vercel.com


Fitur Utama:
--
- ✅ **Secure**: Input sanitization dan proper error handling
- ⚡ **Fast**: Optimized dengan React hooks dan memoization
- 🎨 **Beautiful**: Modern UI dengan Bootstrap 5
- 📱 **Responsive**: Mobile-first design
- 🔔 **Smart Notifications**: Browser notifications untuk deadline reminder
- 💾 **Local Storage Sync**: Automatic sync dengan backend
- 🚀 **Performance**: Code splitting dan lazy loading


Cara Penggunaan:
--
### Backend
#### Project Install

```bash
npm install
```

#### Server Start

```bash
npm run start
```


### Frontend (React Application)
#### Project Install

```bash
npm install
```


#### Development Server (dengan hot reload)

```bash
npm run start
```
atau
```bash
npm run dev
```

Server akan berjalan di `http://localhost:9000`


#### Project Build (Production)

```bash
npm run build
```

Build output akan ada di folder `dist/`


## Struktur Project

```
TDID-C22-164-FE/
├── src/
│   ├── components/        # React components
│   │   ├── About.js
│   │   ├── Calendar.js
│   │   ├── Daily.js
│   │   ├── Navbar.js
│   │   ├── Recap.js
│   │   └── TodoList.js
│   ├── services/          # API dan utility services
│   │   ├── api.js
│   │   ├── dateUtils.js
│   │   └── notifications.js
│   ├── styles/            # CSS files
│   │   └── main.css
│   ├── App.js             # Main app component
│   ├── index.js           # Entry point
│   └── index.html         # HTML template
├── dist/                  # Build output (generated)
├── webpack.common.js      # Webpack common config
├── webpack.dev.js         # Webpack dev config
├── webpack.prod.js        # Webpack prod config
└── package.json           # Dependencies
```

## Teknologi Upgrade (v2.0.0)

Aplikasi ini telah di-refactor dari vanilla JavaScript menjadi React framework dengan peningkatan:

1. **Component-Based Architecture**: Modular dan reusable components
2. **State Management**: Menggunakan React Hooks (useState, useEffect, useCallback)
3. **Client-Side Routing**: React Router untuk navigasi SPA
4. **Optimized Performance**: Memoization dan prevention of unnecessary re-renders
5. **Better Code Organization**: Separation of concerns dengan services dan utilities
6. **Enhanced Security**: Input validation dan sanitization
7. **Improved Maintainability**: Easier to test, debug, and extend
