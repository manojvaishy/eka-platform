# DEBUG - Blank Page Issue

## TURANT YEH KARO:

### 1. F12 Press Karo
Site pe jao: https://manojvaishy.github.io/eka-platform/
F12 press karo
Console tab kholo
Screenshot bhejo - kya errors dikha rahe hain?

### 2. Network Tab Check Karo
F12 mein "Network" tab kholo
Page refresh karo (Ctrl+F5)
Dekho kaunsi files load ho rahi hain:
- index.html - 200 OK hona chahiye
- index-*.js - 200 OK hona chahiye
- index-*.css - 200 OK hona chahiye

Agar 404 errors hain = path galat hai
Screenshot bhejo Network tab ka

### 3. Sources Tab Check Karo
F12 mein "Sources" tab kholo
Left side mein dekho kya files loaded hain
Screenshot bhejo

### 4. Direct File Access Try Karo
Browser mein yeh URLs try karo:
```
https://manojvaishy.github.io/eka-platform/index.html
https://manojvaishy.github.io/eka-platform/assets/
```

Kya dikhta hai? Screenshot bhejo

## Possible Issues:

1. **404 Errors** = Files deploy nahi hui
2. **CORS Errors** = Configuration issue
3. **Blank Console** = JavaScript error
4. **No errors but blank** = React mounting issue

Screenshot bhejo Console aur Network tab ka!
