# 🎯 Step-by-Step Guide (Hinglish with Screenshots Guide)

## Part 1: Terminal Commands (Aapke Computer Pe)

### Step 1: Terminal Kholo
- Windows PowerShell ya Command Prompt kholo
- Ya VS Code me integrated terminal use karo (Ctrl + `)

### Step 2: Ye Commands Run Karo (Ek-ek karke)

```cmd
cd C:\Users\rupesh\EKA
```
**Kya hoga**: Aap EKA folder me pahunch jaoge

```cmd
git add .
```
**Kya hoga**: Saari new/changed files Git me add ho jayengi
**Output dikhega**: Kuch nahi, ya file names list

```cmd
git commit -m "Setup GitHub Pages deployment"
```
**Kya hoga**: Files commit ho jayengi (save ho jayengi Git me)
**Output dikhega**: 
```
[main abc1234] Setup GitHub Pages deployment
 3 files changed, 150 insertions(+)
 create mode 100644 .github/workflows/deploy.yml
```

```cmd
git push origin main
```
**Kya hoga**: Aapki files GitHub server pe upload ho jayengi
**Output dikhega**:
```
Enumerating objects: 10, done.
Counting objects: 100% (10/10), done.
Writing objects: 100% (6/6), 2.5 KiB | 2.5 MiB/s, done.
To https://github.com/manojvaishy/EKA.git
   abc1234..def5678  main -> main
```

**✅ Terminal ka kaam khatam!** Ab browser me jao.

---

## Part 2: GitHub Website Pe Settings (Browser Me)

### Step 1: GitHub Repository Kholo
Browser me ye URL kholo:
```
https://github.com/manojvaishy/EKA
```

### Step 2: Settings Tab Pe Jao
- Repository page pe **upar right side** me "Settings" button dikhega
- Usko click karo
- **Location**: Repository name ke neeche, tabs me (Code | Issues | Pull requests | **Settings**)

### Step 3: Pages Section Kholo
- Settings page khulne ke baad, **left sidebar** me scroll karo
- Neeche "Pages" option dikhega (Code and automation section me)
- **Pages** pe click karo

### Step 4: Source Select Karo
Ab aapko ye dikhega:

**"Build and deployment" section:**

1. **Source** dropdown dikhega (currently "Deploy from a branch" selected hoga)
2. Us dropdown pe **click** karo
3. Options dikhenge:
   - Deploy from a branch
   - **GitHub Actions** ← YE SELECT KARO!
4. **GitHub Actions** pe click karo

**Kya hoga**: 
- Dropdown "GitHub Actions" show karega
- Neeche ek message aayega: "Use a workflow from your repository to build and deploy your site"
- Automatically save ho jayega (Save button nahi hai)

### Step 5: Actions Tab Check Karo
- Repository ke main page pe jao
- **Actions** tab pe click karo (Code ke baad, Issues se pehle)
- Aapko "Deploy to GitHub Pages" workflow running dikhegi
- Yellow dot (🟡) = Running
- Green checkmark (✅) = Success
- Red X (❌) = Failed

**Wait karo 2-3 minutes** jab tak green checkmark na aa jaye.

---

## Part 3: Website Check Karo

### Jab Green Checkmark Aa Jaye:

1. **Pages tab** pe wapas jao (Settings → Pages)
2. Upar ek **green box** dikhega:
   ```
   ✅ Your site is live at https://manojvaishy.github.io/EKA/
   ```
3. Us link pe **click** karo ya browser me type karo:
   ```
   https://manojvaishy.github.io/EKA/
   ```

**Aapki website live hai! 🎉**

---

## 📍 Exact Locations (Confusion Na Ho)

### Terminal Commands Location:
```
Kahan: Aapke computer ka terminal/command prompt
Kab: Sabse pehle
```

### GitHub Settings Location:
```
URL: https://github.com/manojvaishy/EKA/settings/pages
Path: Repository → Settings (top right) → Pages (left sidebar)
Kab: Terminal commands ke baad
```

### Source Dropdown Location:
```
Page: Settings → Pages
Section: "Build and deployment"
Field: "Source" dropdown
Options: "Deploy from a branch" ya "GitHub Actions"
Select: GitHub Actions
```

### Actions Tab Location:
```
URL: https://github.com/manojvaishy/EKA/actions
Path: Repository → Actions (top tabs)
Kab: Source select karne ke baad
```

---

## 🎬 Complete Flow (Sequence)

```
1. Terminal Kholo
   ↓
2. cd C:\Users\rupesh\EKA
   ↓
3. git add .
   ↓
4. git commit -m "Setup GitHub Pages deployment"
   ↓
5. git push origin main
   ↓
6. Browser Kholo
   ↓
7. https://github.com/manojvaishy/EKA
   ↓
8. Settings Tab (top right)
   ↓
9. Pages (left sidebar)
   ↓
10. Source Dropdown
    ↓
11. Select "GitHub Actions"
    ↓
12. Actions Tab (top)
    ↓
13. Wait for Green Checkmark (2-3 min)
    ↓
14. Pages Tab Again
    ↓
15. Click "Visit Site" Link
    ↓
16. Website Live! 🎉
```

---

## 🖼️ Visual Guide (Text Description)

### Terminal Output Example:
```
PS C:\Users\rupesh> cd C:\Users\rupesh\EKA
PS C:\Users\rupesh\EKA> git add .
PS C:\Users\rupesh\EKA> git commit -m "Setup GitHub Pages deployment"
[main 1a2b3c4] Setup GitHub Pages deployment
 3 files changed, 150 insertions(+)
 create mode 100644 .github/workflows/deploy.yml
PS C:\Users\rupesh\EKA> git push origin main
Enumerating objects: 10, done.
Counting objects: 100% (10/10), done.
To https://github.com/manojvaishy/EKA.git
   abc1234..def5678  main -> main
```

### GitHub Pages Settings Page:
```
┌─────────────────────────────────────────┐
│ Settings                                 │
├─────────────────────────────────────────┤
│ Left Sidebar:                           │
│  - General                              │
│  - Access                               │
│  - Code and automation:                 │
│    - Branches                           │
│    - Tags                               │
│    - Actions                            │
│    - Webhooks                           │
│    - Environments                       │
│    - Pages  ← CLICK HERE               │
│                                         │
│ Main Content:                           │
│ ┌─────────────────────────────────────┐│
│ │ Build and deployment                ││
│ │                                     ││
│ │ Source: [GitHub Actions ▼]         ││
│ │         ↑                           ││
│ │         CLICK THIS DROPDOWN         ││
│ │                                     ││
│ │ Options:                            ││
│ │ • Deploy from a branch              ││
│ │ • GitHub Actions ← SELECT THIS      ││
│ └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

### Actions Tab View:
```
┌─────────────────────────────────────────┐
│ Actions                                  │
├─────────────────────────────────────────┤
│ All workflows                           │
│                                         │
│ 🟡 Deploy to GitHub Pages              │
│    Running... (2 minutes ago)           │
│    ↓                                    │
│    Wait karo...                         │
│    ↓                                    │
│ ✅ Deploy to GitHub Pages              │
│    Completed successfully               │
│    (3 minutes ago)                      │
└─────────────────────────────────────────┘
```

---

## ⚠️ Common Mistakes (Galtiyan Jo Log Karte Hain)

### Mistake 1: Wrong Directory
```
❌ cd C:\Users\rupesh
✅ cd C:\Users\rupesh\EKA
```

### Mistake 2: Forgetting "git add ."
```
❌ git commit -m "message"
✅ git add .
✅ git commit -m "message"
```

### Mistake 3: Wrong Source Selection
```
❌ Source: Deploy from a branch
✅ Source: GitHub Actions
```

### Mistake 4: Not Waiting for Green Checkmark
```
❌ Immediately check website (404 error)
✅ Wait 2-3 minutes for deployment
✅ Then check website
```

---

## 🎯 Quick Checklist

Before starting:
- [ ] Terminal/Command Prompt ready hai
- [ ] Internet connection hai
- [ ] GitHub account me logged in ho

After terminal commands:
- [ ] "git push" successful hua
- [ ] Koi error nahi aaya

On GitHub website:
- [ ] Settings → Pages khola
- [ ] Source = "GitHub Actions" selected
- [ ] Actions tab me workflow running dikhi
- [ ] Green checkmark aaya (wait kiya)
- [ ] Website URL pe site load hui

---

## 🆘 Agar Kuch Samajh Na Aaye

### Terminal me error aaye:
Screenshot bhejo, main dekh lunga

### GitHub pe option nahi mil raha:
1. Repository public hai ya private? (Public honi chahiye)
2. Settings tab access hai? (Owner/Admin hona chahiye)

### Website 404 dikha raha:
1. 5 minutes wait karo
2. Browser cache clear karo (Ctrl + Shift + Delete)
3. Incognito/Private window me try karo

---

## 📞 Help Chahiye?

Agar kisi step me problem aaye:
1. Screenshot lo
2. Error message copy karo
3. Mujhe batao kis step pe atke ho

**Main help kar dunga! 😊**

---

## 🎊 Success Message

Jab sab kuch sahi hoga, aapko ye dikhega:

**GitHub Pages (Settings → Pages):**
```
✅ Your site is live at https://manojvaishy.github.io/EKA/

Visit site →
```

**Website pe:**
- Eka landing page load hoga
- "She Can Shine" heading dikhega
- Purple-orange gradient background
- "Get Started" button kaam karega

**Congratulations! Aapki website live hai! 🎉🎉🎉**

Share karo sabke saath: https://manojvaishy.github.io/EKA/
