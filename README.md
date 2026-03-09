# Simple Node Blog 📝

A fully responsive, full-stack CRUD (Create, Read, Update, Delete) blog application built from scratch to master server-side routing, file system management, and dynamic templating.

**🔗 [Live Demo](https://simple-node-blog.onrender.com)** > ### ⚠️ Important Notes for Visitors
> **1. The 50-Second Cold Start:** This project is hosted on Render's free tier, which puts the server to "sleep" after 15 minutes of inactivity. **If the site takes 30 to 50 seconds to load the first time you click the link, please be patient!** The server is simply waking up. Once it's awake, it will be lightning fast.
> 
> **2. Ephemeral Data (It will disappear!):** To focus entirely on backend file routing rather than database management, this app saves data to local memory and temporary server folders. Because Render's free tier resets the server periodically, **any posts or images you upload will eventually be deleted.** Feel free to test it out—just don't use it to store your passwords!

---

## 🚀 Features

* **Full CRUD Operations:** Users can seamlessly create, read, edit, and delete their own blog posts.
* **Media Handling:** Integrated image uploads using `multer`, complete with a custom vanilla JavaScript lightbox modal for viewing images.
* **Automated Server Cleanup:** The backend utilizes the native Node `fs` (File System) module to automatically delete orphaned or replaced image files, preventing server bloat.
* **Security & Validation:** Implements strict server-side data validation (`express-validator`) and input sanitization (`sanitize-html`) to prevent Cross-Site Scripting (XSS) attacks.
* **Dynamic UI Elements:** Features live character counters, elegant error handling, interactive hover states, and a fully responsive CSS Grid layout with a sticky sidebar.

## 💻 Tech Stack

* **Backend:** Node.js, Express.js
* **Frontend:** EJS (Embedded JavaScript templating), HTML5, Vanilla CSS3, Vanilla JavaScript
* **Middleware & Tools:** Multer (multipart/form-data), Express-Validator, Sanitize-HTML

## 🛠️ Local Installation

If you want to run this project on your own machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Abdur-Rahman10/Simple-Node-Blog.git
   
Navigate into the project directory:
Bash
```cd Simple-Node-Blog```

Install the dependencies:
Bash
```npm install```

Start the server:
Bash
```npm start```

Open your browser:
Visit http://localhost:3000 to view the app locally.
