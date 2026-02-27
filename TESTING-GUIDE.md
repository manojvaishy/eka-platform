# Testing Guide - Onboarding Flow

## 🧪 How to Test Onboarding as New User

### Method 1: Using Clear Data Button (Easiest)

1. Go to login page: `http://localhost:5176/login`
2. Click the **red button** "🔄 Clear Data & Test as New User"
3. Confirm the popup
4. Page will reload
5. Now login again:
   - Enter any phone number (e.g., +91 98765 43210)
   - Click "Send OTP"
   - Enter any 6 digits (e.g., 123456)
   - Click "Verify & Login"
6. ✅ You will be redirected to **Onboarding Page** (6 steps)
7. Complete all steps and see your data in profile!

### Method 2: Manual Clear (Developer Way)

1. Open browser DevTools (F12)
2. Go to Console tab
3. Type: `localStorage.clear()`
4. Press Enter
5. Refresh page
6. Login again
7. ✅ Will go to onboarding

### Method 3: Incognito/Private Window

1. Open incognito/private browser window
2. Go to `http://localhost:5176/login`
3. Login with any credentials
4. ✅ Will go to onboarding (no saved data)

## 📱 Complete Testing Flow

### Test 1: New User Journey
```
1. Clear data (use red button)
2. Login → Redirects to Onboarding ✅
3. Step 1: Enter name "Anjali", age "25", upload photo
4. Step 2: Select "Maharashtra", "Mumbai", "400001"
5. Step 3: Select "हिंदी (Hindi)" ✅
6. Step 4: Select skills: "Tailoring", "Cooking"
7. Step 5: Select education: "12th Pass", work: "Work from Home"
8. Step 6: Select roles: "Learner", "Skilled Worker"
9. Click "Complete Setup"
10. → Redirects to Dashboard ✅
11. Click Profile
12. ✅ See all your entered data!
13. ✅ See uploaded photo!
14. ✅ Interface in Hindi!
```

### Test 2: Existing User Journey
```
1. Login (with data already saved)
2. → Redirects directly to Dashboard ✅
3. No onboarding shown (already completed)
4. Profile shows saved data ✅
```

### Test 3: Language Change
```
1. Complete onboarding in Hindi
2. Go to Profile
3. Change language dropdown to "English"
4. ✅ Page reloads in English
5. Change back to "हिंदी"
6. ✅ Page reloads in Hindi
7. ✅ Language preference saved
```

### Test 4: Profile Image
```
1. In onboarding Step 1, click "Upload Photo"
2. Select an image from your computer
3. ✅ Image preview shows immediately
4. Complete onboarding
5. Go to Profile
6. ✅ Same image appears in profile
7. ✅ Image is saved (persists on refresh)
```

## 🔍 What to Check

### After Onboarding:
- [ ] Name appears in profile
- [ ] Age appears in profile
- [ ] Profile image displays correctly
- [ ] Location (state, city) appears
- [ ] Selected language is active
- [ ] Skills show in "About" tab
- [ ] Interests show in "About" tab
- [ ] Education level saved
- [ ] Work preferences saved
- [ ] Selected roles show as "Active Roles"
- [ ] Bio auto-generated from roles and skills

### Language Translation:
- [ ] Onboarding text changes when language selected
- [ ] Profile page text in selected language
- [ ] Dashboard welcome message in selected language
- [ ] Buttons and labels translated
- [ ] Language persists after page refresh

### Data Persistence:
- [ ] Refresh page → data still there
- [ ] Close browser → reopen → data still there
- [ ] Navigate between pages → data consistent
- [ ] Edit profile → changes saved
- [ ] Upload new image → image updates

## 🐛 Troubleshooting

### Issue: Goes to Dashboard instead of Onboarding
**Solution:** Click "Clear Data & Test as New User" button on login page

### Issue: Old data showing
**Solution:** Clear localStorage:
```javascript
localStorage.clear()
```

### Issue: Image not showing
**Solution:** 
- Check image size (must be < 5MB)
- Check format (JPEG, PNG, WebP only)
- Try different image

### Issue: Language not changing
**Solution:**
- Make sure to select language in Step 3 of onboarding
- Or change in profile page language dropdown
- Page will reload to apply changes

### Issue: Data not saving
**Solution:**
- Check browser console for errors (F12)
- Make sure localStorage is enabled
- Try different browser

## 📊 Expected Behavior

### First Time User:
```
Login → Onboarding (6 steps) → Dashboard → Profile (shows entered data)
```

### Returning User:
```
Login → Dashboard (skip onboarding) → Profile (shows saved data)
```

### Language Flow:
```
Select Hindi in Step 3 → Complete onboarding → 
Profile in Hindi → Change to English → 
Profile in English → Preference saved
```

## ✅ Success Criteria

Your onboarding is working correctly if:

1. ✅ New users see onboarding form after login
2. ✅ Existing users skip onboarding and go to dashboard
3. ✅ All 6 steps of onboarding work
4. ✅ Profile image uploads and displays
5. ✅ All entered data appears in profile
6. ✅ Language selection works and translates interface
7. ✅ Data persists across page refreshes
8. ✅ "Clear Data" button resets everything for testing

## 🎯 Quick Test Checklist

- [ ] Click "Clear Data" button
- [ ] Login with any credentials
- [ ] See onboarding page (not dashboard)
- [ ] Complete all 6 steps
- [ ] Upload a profile picture
- [ ] Select Hindi language
- [ ] Click "Complete Setup"
- [ ] See dashboard
- [ ] Go to profile
- [ ] Verify all data matches what you entered
- [ ] Verify image shows correctly
- [ ] Verify interface is in Hindi
- [ ] Change language to English
- [ ] Verify interface translates
- [ ] Refresh page
- [ ] Verify data still there

If all checkboxes pass ✅ - Everything is working perfectly!

## 📞 Support

If something doesn't work:
1. Check browser console (F12) for errors
2. Clear localStorage and try again
3. Try incognito/private window
4. Check network tab to see if data is saving
5. Verify you're using latest code

---

**Happy Testing! 🎉**
