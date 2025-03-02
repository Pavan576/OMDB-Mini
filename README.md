# 🎥 IMDB/OMDB - MINI PROJECT 🍿

A React-based movie search and details app using the OMDB API. Find movies, view details, and save your favorites! 🚀

## ✨ Features
✅ Search for movies using the OMDB API 🔍🎞️  
✅ View detailed movie information 📝🎬  
✅ Add/remove movies from favorites ❤️❌  
✅ Smooth UI with Framer Motion animations 🎨💫  

## 📸 Preview
![image](https://github.com/user-attachments/assets/b8f4b9b2-9737-4424-8034-f102cdda5333)
![image](https://github.com/user-attachments/assets/7b2d6301-17ae-4417-bfba-ccc813591acc)
![image](https://github.com/user-attachments/assets/e5718b40-dc34-4fd2-ad6a-f1c92ceb90a7)
![image](https://github.com/user-attachments/assets/c34570e2-bfc9-435a-84ce-ab43290aeb77)




## 🚀 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Pavan576/OMDB-Mini.git
   cd OMDB-Mini
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up your OMDB API key:
   - Open the `src/api/omdb.jsx` file.
   - Paste your API key inside the file. 🔑

4. Start the development server:
   ```sh
   npm start
   ```

5. Refresh the URL in the Simple Browser to see the output. 🔄🌐
   
   ![Simple Browser Refresh](https://github.com/user-attachments/assets/30a2295e-97cc-419f-a9e9-9b27ffb70934)


## 🔑 API Configuration
- This project uses the OMDB API 🎥.
- Get your API key from [OMDB API](https://www.omdbapi.com/apikey.aspx).
- Replace the placeholder with your actual API key inside `src/api/omdb.jsx`.

## 📂 Project Structure
```
OMDB-Mini/
│── node_modules/
│── public/
│── src/
│   ├── api/
│   │   ├── omdb.jsx
│   ├── components/
│   │   ├── MovieCard.jsx
│   │   ├── MovieGrid.jsx
│   │   ├── NavBar.jsx
│   │   ├── SearchBar.jsx
│   ├── context/
│   │   ├── FavoritesContext.jsx
│   ├── pages/
│   │   ├── Favorites.jsx
│   │   ├── Home.jsx
│   │   ├── MovieDetails.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│── .eslintrc.cjs
│── .gitignore
│── eslint.config.js
│── index.html
│── jsconfig.json
│── package.json
│── package-lock.json
│── postcss.config.js
│── README.md
│── tailwind.config.js
```

## 🚀 Deployment
To deploy the app:
1. Build the project:
   ```sh
   npm run build
   ```
2. Deploy to Netlify, Vercel, or GitHub Pages.
   - **Netlify**: Drag & drop the `build` folder 🌍.
   - **Vercel**: Use `vercel deploy` ⚡.
   - **GitHub Pages**:
     ```sh
     npm install gh-pages --save-dev
     ```
     Update `package.json`:
     ```json
     "homepage": "https://Pavan576.github.io/OMDB-Mini",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
     ```
     Then run:
     ```sh
     npm run deploy
     ```

## 📜 License
📝 MIT License

---
Happy Coding! 🚀🎬
