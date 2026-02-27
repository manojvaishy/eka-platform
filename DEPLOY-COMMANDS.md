# 🚀 Quick Deploy Commands

## Abhi Ye Commands Run Karo:

### Step 1: Build Test Karo (Optional but Recommended)
```cmd
cd eka-prototype
npm run build
```
Agar koi error aaye toh batao, warna next step pe jao.

### Step 2: Git Add & Commit
```cmd
cd ..
git add .
git commit -m "Setup GitHub Pages with automatic deployment"
```

### Step 3: Push to GitHub
```cmd
git push origin main
```

### Step 4: GitHub Settings Configure Karo
1. Browser me jao: https://github.com/manojvaishy/EKA/settings/pages
2. **Source** dropdown me select karo: **GitHub Actions**
3. Save (automatically save ho jayega)

### Step 5: Check Deployment
1. Jao: https://github.com/manojvaishy/EKA/actions
2. Latest workflow "Deploy to GitHub Pages" ko click karo
3. Green checkmark ka wait karo (2-3 minutes)

### Step 6: Website Kholo
```
https://manojvaishy.github.io/EKA/
```

---

## Agar Error Aaye Toh:

### Error: "npm run build" fails
```cmd
cd eka-prototype
npm install
npm run build
```

### Error: Git push rejected
```cmd
git pull origin main
git push origin main
```

### Error: 404 on GitHub Pages
Wait karo 5 minutes, phir refresh karo. Pehli baar deploy hone me time lagta hai.

---

## Quick Check Commands:

### Check if Node.js installed:
```cmd
node --version
```
Should show: v20.x.x or higher

### Check if Git installed:
```cmd
git --version
```
Should show: git version 2.x.x

### Check current directory:
```cmd
cd
```
Should show: C:\Users\rupesh\EKA

---

## Summary (Hinglish):

1. **Build test karo**: `cd eka-prototype && npm run build`
2. **Git add karo**: `cd .. && git add .`
3. **Commit karo**: `git commit -m "Deploy setup"`
4. **Push karo**: `git push origin main`
5. **GitHub Settings**: Source = GitHub Actions
6. **Wait karo**: 2-3 minutes
7. **Website kholo**: https://manojvaishy.github.io/EKA/

**Done! 🎉**
