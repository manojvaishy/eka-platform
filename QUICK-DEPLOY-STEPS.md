# ⚡ QUICK DEPLOY - 5 Minute Guide

## 🎯 New Repository → Live Website (Fast Track)

---

## Step 1: New Repo Banao (1 min)
```
https://github.com/new
```
- Name: `eka-platform`
- Public
- Blank (kuch add mat karo)
- Create!

---

## Step 2: Terminal Commands (2 min)
```cmd
cd C:\Users\rupesh\EKA
git init
git config user.email "manojvaishy@example.com"
git config user.name "Manoj Vaishy"
git remote add origin https://github.com/manojvaishy/eka-platform.git
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

---

## Step 3: GitHub Pages Setup (1 min)
```
https://github.com/manojvaishy/eka-platform/settings/pages
```
- Source → **GitHub Actions**

---

## Step 4: Wait (2 min)
```
https://github.com/manojvaishy/eka-platform/actions
```
- Green checkmark ka wait karo ✅

---

## Step 5: Website Live! (0 min)
```
https://manojvaishy.github.io/eka-platform/
```

---

## 🎉 DONE!

**Total: 5-6 minutes**

---

## ⚠️ Important Notes:

1. **Repository name** change karo toh URL me bhi change hoga:
   - Repo: `eka-platform` → URL: `/eka-platform/`
   - Repo: `my-website` → URL: `/my-website/`

2. **Public repository** honi chahiye (free GitHub Pages ke liye)

3. **Personal Access Token** ready rakho (agar password maange)

4. **vite.config.ts** me `base` path sahi ho:
   ```javascript
   base: '/eka-platform/', // Repository name
   ```

---

## 🔧 If Something Goes Wrong:

### Git Error?
```cmd
git init
```

### Push Failed?
```cmd
git push -u origin main --force
```

### 404 on Website?
- Wait 5 minutes
- Clear cache (Ctrl + Shift + R)
- Check Actions tab for errors

---

**Ready? Start with Step 1! 🚀**
