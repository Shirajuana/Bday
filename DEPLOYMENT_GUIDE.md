# Deploy Birthday Vite App to PythonAnywhere - Step by Step Guide

## Prerequisites & Requirements

### What You Need:
1. ✅ **PythonAnywhere Account** - Free tier available at https://www.pythonanywhere.com/
2. ✅ **GitHub Account** (optional but recommended) - to push your code
3. ✅ **Node.js & npm** - installed locally (for building)
4. ✅ **Git** - for version control
5. ✅ **Your project files** - Already in `c:\Users\ASUS\OneDrive\Desktop\Bday\`

### Files in Your Project:
```
Bday/
├── index.html
├── package.json
├── vite.config.ts
├── script.js
├── style.css
├── Happy_birthday_official_lyrics__video_@sarinaagassi__@amircarlosagassi__#sarinaofrap_#amirofrap(256k).mp3
├── src/
└── README.md
```

---

## Step-by-Step Deployment Process

### STEP 1: Prepare Your Project Locally

#### 1.1 Build the Vite Project
```bash
cd c:\Users\ASUS\OneDrive\Desktop\Bday

# Install dependencies
npm install

# Build for production
npm run build
```

After running `npm run build`, you'll have a `dist/` folder containing:
- `index.html`
- Static files (CSS, JS, images)
- The audio file (if configured properly)

#### 1.2 Update vite.config.ts (if needed)
Make sure your Vite config is production-ready:
```typescript
export default {
  base: '/',  // Set to your domain if needed
  build: {
    outDir: 'dist',
    sourcemap: false,  // Disable for production
  }
}
```

#### 1.3 Ensure Audio File is in Build
Update your HTML or vite.config to ensure the MP3 file is copied to `dist/`:

**Option A: Copy manually**
- Place the MP3 file in the `public/` folder and reference it in index.html
- Vite will automatically copy files from `public/` to `dist/`

**Option B: Update index.html reference**
```html
<audio id="birthday-music" preload="auto">
    <source src="./Happy_birthday_official_lyrics__video_@sarinaagassi__@amircarlosagassi__#sarinaofrap_#amirofrap(256k).mp3" type="audio/mpeg">
</audio>
```

---

### STEP 2: Push Code to GitHub (Recommended)

#### 2.1 Create GitHub Repository
1. Go to https://github.com/new
2. Create repository: `BirthdayApp` (or any name)
3. Copy the repository URL

#### 2.2 Push Your Code
```bash
cd c:\Users\ASUS\OneDrive\Desktop\Bday

git init
git add .
git commit -m "Initial commit: Birthday Vite app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/BirthdayApp.git
git push -u origin main
```

---

### STEP 3: Create PythonAnywhere Account

#### 3.1 Sign Up
1. Go to https://www.pythonanywhere.com/pricing/
2. Click **"Create a Beginner account"**
3. Fill in:
   - Username: `your-username` (becomes your domain: `your-username.pythonanywhere.com`)
   - Email: Your email
   - Password: Your password
4. Click **"Register"**

#### 3.2 Verify Email
- Check your email and verify your PythonAnywhere account

---

### STEP 4: Setup in PythonAnywhere Console

#### 4.1 Open Bash Console
1. Log in to your PythonAnywhere dashboard
2. Under **Consoles**, click **"$ Bash"**
3. A terminal will open

#### 4.2 Clone from GitHub (or Upload Files)

**Option A: Clone from GitHub (Recommended)**
```bash
git clone https://github.com/YOUR-USERNAME/BirthdayApp.git
cd BirthdayApp
```

**Option B: Upload Files via Web Interface**
1. Go to **Files** tab
2. Upload your project files manually

#### 4.3 Install Dependencies
```bash
# Check Node.js is available
node --version
npm --version

# If not available, you can use Python's built-in server instead
# Skip this if using Python server (see Step 5)

# If Node is available:
cd ~/BirthdayApp
npm install
npm run build
```

> **Note:** If Node.js is not available on PythonAnywhere, use the Python HTTP server method (Step 5 Option A)

---

### STEP 5: Serve Your App on PythonAnywhere

#### Option A: Using Python's Simple HTTP Server (Easiest for Beginners)

**Step 1:** Copy your files to web directory
```bash
# From PythonAnywhere bash console
cp -r ~/BirthdayApp ~/mysite
cd ~/mysite
```

**Step 2:** Create a Python file to serve files: `serve.py`
```python
#!/usr/bin/env python
import os
import http.server
import socketserver

os.chdir('/home/your-username/mysite')

PORT = 8080
Handler = http.server.SimpleHTTPRequestHandler
httpd = socketserver.TCPServer(("", PORT), Handler)
print(f"Server running on http://127.0.0.1:{PORT}")
httpd.serve_forever()
```

**Step 3:** Deploy via PythonAnywhere Web App Interface
1. Go to **Web** tab
2. Click **"Add a new web app"**
3. Choose **"Manual configuration"**
4. Select **Python 3.8** (or latest)
5. Configure WSGI file (see Step 6)

#### Option B: Using Flask (More Flexible)

**Step 1:** Create `app.py`
```python
from flask import Flask, send_from_directory, render_template
import os

app = Flask(__name__, static_folder='dist', static_url_path='')

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:filename>')
def serve_file(filename):
    return send_from_directory(app.static_folder, filename)

@app.errorhandler(404)
def not_found(error):
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=False)
```

**Step 2:** Create `requirements.txt`
```
Flask==3.0.0
Werkzeug==3.0.0
```

**Step 3:** Add requirements to PythonAnywhere
```bash
cd ~/BirthdayApp
pip install -r requirements.txt
```

---

### STEP 6: Configure Web App on PythonAnywhere

#### 6.1 Add Web App
1. Log into PythonAnywhere
2. Go to **Web** tab
3. Click **"Add a new web app"**
4. Choose **"Manual configuration"**
5. Select **Python version** (3.8+)

#### 6.2 Configure WSGI File

The WSGI file path should be: `/home/your-username/mysite/wsgi.py` (or similar)

**For Flask:** Replace content with:
```python
import sys
import os

path = '/home/your-username/BirthdayApp'
if path not in sys.path:
    sys.path.insert(0, path)

from app import app as application
```

#### 6.3 Set Virtual Environment (if used)
1. Go to **Virtualenv** section
2. If you created a virtual environment, enter path: `/home/your-username/psusenv`
3. Leave blank if using system Python

#### 6.4 Set Virtualenv (Optional)
```bash
# Create if needed
virtualenv /home/your-username/myenv
source /home/your-username/myenv/bin/activate
pip install Flask
```

---

### STEP 7: Handle Static Files (Audio File)

#### 7.1 Copy Audio File
```bash
# Ensure audio is in dist folder
cp ~/BirthdayApp/'Happy_birthday_official_lyrics__video_@sarinaagassi__@amircarlosagassi__#sarinaofrap_#amirofrap(256k).mp3' ~/BirthdayApp/dist/
```

#### 7.2 Update PythonAnywhere Static Files
1. In **Web** tab, scroll to **Static files** section
2. Add mapping:
   - **URL:** `/`
   - **Directory:** `/home/your-username/BirthdayApp/dist`

---

### STEP 8: Deploy & Test

#### 8.1 Reload Web App
1. In **Web** tab, click **"Reload your-username.pythonanywhere.com"** button
2. Wait 30-60 seconds

#### 8.2 Test Your App
1. Open browser and go to: `https://your-username.pythonanywhere.com/`
2. You should see the birthday envelope
3. Test the functionality:
   - Click "Open" button
   - Countdown should work (3, 2, 1)
   - Candles fade
   - Music should play
   - Happy Birthday appears on cake bottom tier

#### 8.3 Check Logs for Errors
1. Go to **Web** tab
2. Click **"View logs"** to see error messages if needed

---

## Troubleshooting

### Issue: Audio file not playing
- **Solution:** Verify audio file path in index.html matches the served location
- Check browser console for CORS errors

### Issue: Page not loading
- **Solution:** Check WSGI configuration file
- Verify Python version compatibility
- Check error logs in PythonAnywhere

### Issue: Styles/JS not loading (404 errors)
- **Solution:** Update static files mapping
- Rebuild with `npm run build`
- Ensure dist folder has all files

### Issue: Module not found errors
- **Solution:** Install dependencies: `pip install -r requirements.txt`
- Verify Python version

---

## Quick Reference: File Paths on PythonAnywhere

```
/home/your-username/
├── BirthdayApp/          (Your project)
│   ├── src/
│   ├── dist/            (Built files after npm run build)
│   ├── index.html
│   ├── package.json
│   └── ...
├── mysite/              (Web directory)
│   └── dist/            (Symlink or copy of dist)
└── myenv/               (Virtual environment - optional)
```

---

## Summary Checklist

- [ ] Run `npm run build` locally
- [ ] Push code to GitHub
- [ ] Create PythonAnywhere account
- [ ] Clone repo in PythonAnywhere bash
- [ ] Install npm dependencies
- [ ] Create app.py (Flask) or serve.py
- [ ] Add web app in PythonAnywhere
- [ ] Configure WSGI file
- [ ] Map static files
- [ ] Copy audio file to dist
- [ ] Reload web app
- [ ] Test at your-username.pythonanywhere.com
- [ ] Check logs if issues occur

---

## Need Help?

- **PythonAnywhere Docs:** https://help.pythonanywhere.com/
- **Vite Docs:** https://vitejs.dev/
- **Flask Docs:** https://flask.palletsprojects.com/
