# 🎨 Design System - Smooth Scroll Project

מערכת עיצוב מקיפה לפרויקט Smooth Scroll, המבוססת על עקרונות עיצוב מודרניים ונגישות.

## 🎨 Colors / צבעים

### Primary Colors - צבעים עיקריים
```css
/* Blue - כחול */
--color-primary: #3b82f6
primary-50 through primary-900 (Tailwind scale)

/* Purple - סגול */
--color-secondary: #d946ef
secondary-50 through secondary-900 (Tailwind scale)

/* Orange - כתום */
--color-accent: #f97316
accent-50 through accent-900 (Tailwind scale)

/* Pink - ורוד */
--color-pink: #ec4899
pink-50 through pink-900 (Tailwind scale)
```

### Surface Colors - צבעי רקע
```css
--color-surface-white: #ffffff
--color-surface-light: rgba(255, 255, 255, 0.2) /* זכוכית בהירה */
--color-surface-dark: rgba(0, 0, 0, 0.2) /* זכוכית כהה */
```

### Gradients - גרדיאנטים
```css
.bg-gradient-hero     /* כחול לסגול */
.bg-gradient-smooth   /* סגול לוורוד */
.bg-gradient-gsap     /* ורוד לכתום */
.bg-gradient-accent   /* כתום לכתום כהה */
```

## 📝 Typography / טיפוגרפיה

### Font Sizes - גדלי גופן
```css
.text-hero        /* 64px - כותרות ראשיות */
.text-display     /* 48px - כותרות גדולות */
.text-heading-1   /* 40px - כותרות H1 */
.text-heading-2   /* 32px - כותרות H2 */
.text-heading-3   /* 24px - כותרות H3 */
.text-body-large  /* 20px - טקסט גדול */
.text-body        /* 16px - טקסט רגיל */
.text-body-small  /* 14px - טקסט קטן */
```

### Text Components - קומפוננטות טקסט
```html
<h1 class="text-hero">כותרת ראשית</h1>
<h2 class="text-display">כותרת תצוגה</h2>
<h3 class="text-heading-1">כותרת H1</h3>
<p class="text-body-large">טקסט גדול</p>
<p class="text-body">טקסט רגיל</p>
```

## 🔘 Buttons / כפתורים

### Button Styles - סגנונות כפתורים
```html
<!-- כפתור עיקרי -->
<button class="btn-primary">Primary Button</button>

<!-- כפתור משני -->
<button class="btn-secondary">Secondary Button</button>

<!-- כפתור מקווקו -->
<button class="btn-outline">Outline Button</button>

<!-- כפתור אקסנט -->
<button class="btn-accent">Accent Button</button>
```

### Custom Button Classes
```css
.btn-primary    /* רקע כחול + אפקט זוהר */
.btn-secondary  /* רקע סגול + אפקט זוהר סגול */
.btn-outline    /* מקווקו לבן + מעבר לרקע לבן */
.btn-accent     /* רקע כתום */
```

## 📦 Sections / קטעים

### Section Components - קומפוננטות קטעים
```html
<!-- קטע ראשי -->
<section class="section-hero">
  <div class="content-container">
    <!-- תוכן -->
  </div>
</section>

<!-- קטע smooth -->
<section class="section-smooth">
  <div class="content-container-medium">
    <!-- תוכן -->
  </div>
</section>

<!-- קטע GSAP -->
<section class="section-gsap">
  <div class="content-container-medium">
    <!-- תוכן -->
  </div>
</section>

<!-- קטע אקסנט -->
<section class="section-accent">
  <div class="content-container">
    <!-- תוכן -->
  </div>
</section>
```

### Section Classes
```css
.section-base     /* בסיס לכל הקטעים */
.section-hero     /* גרדיאנט כחול-סגול */
.section-smooth   /* גרדיאנט סגול-ורוד */
.section-gsap     /* גרדיאנט ורוד-כתום */
.section-accent   /* גרדיאנט כתום */
```

## 🎴 Cards / כרטיסים

### Card Components
```html
<!-- כרטיס בסיסי -->
<div class="card-base">
  <!-- תוכן -->
</div>

<!-- כרטיס זכוכית -->
<div class="card-glass">
  <!-- תוכן -->
</div>

<!-- קופסה גדולה -->
<div class="big-box">
  תוכן קופסה
</div>
```

### Card Classes
```css
.card-base    /* רקע שקוף + צללים -->
.card-glass   /* אפקט זכוכית + blur */
.big-box      /* קופסה גדולה למדגמים */
```

## 📏 Spacing / מרווחים

### Spacing Tokens - אסימוני מרווחים
```css
--spacing-section: 20vh    /* מרווח אנכי לקטעים */
--spacing-content: 3rem    /* מרווח תוכן */
--spacing-component: 1.5rem /* מרווח קומפוננטות */
--spacing-element: 1rem    /* מרווח אלמנטים */
--spacing-tight: 0.5rem    /* מרווח צפוף */
```

### Spacing Classes
```css
.spacing-section    /* padding אנכי לקטעים */
.spacing-content    /* padding תוכן */
.spacing-component  /* padding קומפוננטות */
```

## 🎭 Shadows / צללים

### Shadow Tokens
```css
--shadow-soft     /* צל רך */
--shadow-medium   /* צל בינוני */
--shadow-strong   /* צל חזק */
--shadow-glow     /* זוהר כחול */
--shadow-glow-purple /* זוהר סגול */
```

### Shadow Classes
```css
.shadow-soft      /* צל רך */
.shadow-medium    /* צל בינוני */
.shadow-strong    /* צל חזק */
.shadow-glow      /* זוהר כחול */
.shadow-glow-purple /* זוהר סגול */
```

## 🔄 Animations / אנימציות

### Animation Classes
```css
.animate-fade-in    /* הופעה עם fade */
.animate-slide-up   /* החלקה מלמטה */
.animate-float      /* ריחוף */
.animate-glow-pulse /* פעימת זוהר */
```

### Hover Effects - אפקטי hover
```css
.glow-hover         /* זוהר כחול בhover */
.glow-hover-purple  /* זוהר סגול בhover */
.glass-effect       /* אפקט זכוכית */
```

## 📱 Responsive / רספונסיביות

### Breakpoints - נקודות שבירה
```css
xs: 475px   /* טלפונים קטנים */
sm: 640px   /* טלפונים */
md: 768px   /* טאבלטים */
lg: 1024px  /* מחשבים קטנים */
xl: 1280px  /* מחשבים גדולים */
2xl: 1536px /* מסכים גדולים */
```

## 🎯 Usage Examples / דוגמאות שימוש

### כפתור עם ScrollToButton
```tsx
<ScrollToButton 
  target="#next-section" 
  className="btn-primary"
>
  המשך לקטע הבא
</ScrollToButton>
```

### קטע עם תוכן
```tsx
<section className="section-hero">
  <div className="content-container">
    <h1 className="text-hero">כותרת ראשית</h1>
    <p className="text-body-large">תיאור הקטע</p>
    <div className="flex gap-4 justify-center">
      <button className="btn-primary">פעולה ראשית</button>
      <button className="btn-outline">פעולה משנית</button>
    </div>
  </div>
</section>
```

### כרטיס עם אפקט זכוכית
```tsx
<div className="card-glass p-6">
  <h3 className="text-heading-2">כותרת כרטיס</h3>
  <p className="text-body">תוכן הכרטיס</p>
</div>
```

## 🚀 Implementation Guidelines / הנחיות יישום

### 1. שימוש בכיתות עיצוב
- השתמש בכיתות המוגדרות במערכת העיצוב
- הימנע מסגנונות inline או CSS מותאמים אישית
- השתמש בטוקנים של מערכת העיצוב

### 2. עקביות צבעים
- השתמש בפלטת הצבעים המוגדרת
- הקפד על יחסי ניגודיות נגישים
- השתמש בגרדיאנטים המוגדרים

### 3. טיפוגרפיה
- השתמש בכיתות הגופן המוגדרות
- הקפד על היררכיה ברורה
- השתמש בגוונים מתאימים לרקע

### 4. מרווחים
- השתמש בטוקני המרווחים המוגדרים
- הקפד על עקביות במרווחים
- השתמש ברשת של 8px (0.5rem)

### 5. אינטראקטיביות
- הוסף אפקטי hover מתאימים
- השתמש במעברי transition חלקים
- הקפד על נגישות עם מקלדת

### 6. רספונסיביות
- תכנן mobile-first
- השתמש בnפודות השבירה המוגדרות
- בדוק בכל הגדלים השכיחים

## 🔧 Development Tools / כלי פיתוח

### Tailwind Classes Inspector
```bash
# בדוק אילו כיתות זמינות
npx tailwindcss --help

# בנה את ה-CSS
npm run build
```

### Browser DevTools
- השתמש בכלי הפיתוח לבדיקת סגנונות
- בדוק נגישות עם Lighthouse
- בדוק ביצועים ואופטימיזציה

---

📞 **צריך עזרה?** פנה לצוות הפיתוח לתמיכה במערכת העיצוב. 