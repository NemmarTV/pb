# Prime Blog CFPT Package v21.7

## Overview
Updated private download page for Prime Blog CF-PH / CFPT exclusive package.

### Features
✅ **Prime Blog v21.7 Design System**
- Matches global site branding
- New CF-PH neon icon on the package card
- Glassmorphism cards, gradient buttons
- Animated logo ring on server lock screen

✅ **Server Lock Protection**
- Fixed countdown before enter button activates
- Password gate
- Anti-cheat scanning animation
- F12 & DevTools blocker

✅ **Download Modal**
- Progress bar simulation
- Per-file password confirmation
- Show/hide password toggle
- File download trigger

✅ **Package Changes**
- Switched from `CF-PH.rar` → **`CFPT.zip`**
- New launcher: `Start.bat` (auto-signs, waits for user to type START)
- Cleaner structure with Cert Sign Tools + DLL folders
- Updated icon and UI polish

## File Structure
```
/package
  ├── package.html          (Main page)
  ├── CFPT.zip              (Download file – new)
  ├── css/
  │   └── style.css
  ├── js/
  │   ├── main.js
  │   └── f12.js
  └── README.md             (This file)
```

## Passwords
| Gate | Password | Location |
|------|----------|----------|
| Server Lock | (see f12.js) | `js/f12.js` |
| CFPT Download | 1107 | data-password on the card |
| Resource 1101 | 1101 | data-password on the card |
| Resource 1105 | 1105 | data-password on the card |

## Integration
This page lives in the Prime Blog download folder:
```
prime-blog/
  ├── files/
  │   └── package/
  │       ├── package.html
  │       ├── CFPT.zip
  │       ├── css/style.css
  │       ├── js/main.js
  │       └── js/f12.js
  └── images/
      └── cfpt-icon.png     ← new CF-PH icon
```

## Customization
### Change Download File
Edit the `data-file` attribute on the card in `package.html`:
```html
data-file="CFPT.zip"
```

## Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

---

**Version:** v21.7  
**Updated:** September 2026  
**Brand:** Prime Blog
