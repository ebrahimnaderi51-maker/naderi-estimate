# برآورد قیمت نادری (اپ موبایل / PWA)

فایل‌ها: `index.html` (خود برنامه، همان فایل قبلی با همان فرمول‌ها)، `manifest.webmanifest`، `sw.js`، آیکون‌ها.

## انتشار روی گیت‌هاب
1. یک مخزن جدید بساز (مثلاً `naderi-estimate`).
2. همه فایل‌های این پوشه را در ریشه مخزن آپلود کن (Add file ← Upload files).
3. Settings ← Pages ← Source: `Deploy from a branch` ← Branch: `main` و پوشه `/ (root)` ← Save.
4. بعد از ۱ تا ۲ دقیقه آدرس `https://USERNAME.github.io/naderi-estimate/` فعال می‌شود.

## نصب روی گوشی
- اندروید (Chrome): منو ⋮ ← Install app / Add to Home screen.
- آیفون (Safari): دکمه Share ← Add to Home Screen.

## به‌روزرسانی
بعد از تغییر `index.html`، در `sw.js` عدد `VERSION` را یکی بالا ببر (`naderi-v2`) تا گوشی‌ها نسخه جدید را بگیرند.

## نکته
عددهای هر گوشی فقط در همان گوشی ذخیره می‌شود. برای انتقال بین دستگاه‌ها از بخش «ارسال و دریافت با واتساپ» داخل خود برنامه استفاده کن.
