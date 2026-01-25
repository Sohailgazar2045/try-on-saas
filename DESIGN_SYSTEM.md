# 🎨 Frontend Design System - Quick Reference

## Color Palette

### Primary Colors
- `primary-400`: `#38bdf8` (Light Blue)
- `primary-500`: `#0ea5e9` (Main Blue)
- `primary-600`: `#0284c7` (Dark Blue)

### Accent Colors
- `sky-400`: `#38bdf8` (Sky Blue)
- `cyan-400`: `#22d3ee` (Cyan)
- `emerald-400`: `#34d399` (Success Green)

### Neutral Colors
- `slate-50`: Light
- `slate-950`: Dark (Background)
- `slate-900`: Card background
- `slate-800`: Borders

## Typography Scale

```
Large Headings    -> text-5xl lg:text-6xl (Landing page)
Page Heading      -> text-4xl (Dashboard title)
Section Heading   -> text-3xl (Feature sections)
Card Heading      -> text-lg-xl font-bold
Body Text         -> text-sm-base
Small Text        -> text-xs
Tiny Text         -> text-[10px]
```

## Spacing Scale

```
xs  -> 1 unit  (4px)
sm  -> 2 units (8px)
md  -> 3 units (12px)
lg  -> 4 units (16px)
xl  -> 6 units (24px)
2xl -> 8 units (32px)
```

## Component Reference

### Buttons

#### Primary Button
```tsx
<button className="primary-button">
  Action
</button>
```
- Blue gradient background
- White text
- Shadow effect
- Scale animation on hover

#### Large Primary Button
```tsx
<button className="primary-button-lg">
  Large Action
</button>
```
- Bigger padding & font
- For hero sections

#### Secondary Button
```tsx
<button className="secondary-button">
  Secondary
</button>
```
- Border style
- Darker background
- Subtle hover

### Cards

#### Elevated Card
```tsx
<div className="card-elevated">
  Content
</div>
```
- Rounded corners
- Border + background
- Subtle shadow
- Clean professional look

#### Interactive Card
```tsx
<div className="card-interactive">
  Hover over me
</div>
```
- Same as elevated
- Plus scale & border animation on hover

#### Premium Glass Panel
```tsx
<div className="glass-panel-premium">
  Premium Content
</div>
```
- Gradient background
- Glass effect
- Primary color accent
- Luxury appearance

### Input Fields

#### Standard Input
```tsx
<input className="input-field" />
```
- Standard size
- Border styling
- Focus state with blue ring

#### Large Input
```tsx
<input className="input-field-lg" />
```
- Bigger padding
- Larger text
- For prominent forms

### Badges

#### Primary Badge
```tsx
<span className="badge-primary">
  Badge Text
</span>
```
- Light blue background
- Blue text
- Subtle ring

#### Success Badge
```tsx
<span className="badge-success">
  Success
</span>
```
- Green color scheme
- For positive indicators

## Responsive Classes

```
sm:  -> 640px+ (tablets)
md:  -> 768px+ (larger tablets)
lg:  -> 1024px+ (desktops)
xl:  -> 1280px+ (large screens)
```

## Common Patterns

### Page Layout
```tsx
<main className="flex flex-1 flex-col overflow-hidden">
  <Header title="Page Title" />
  <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950 p-6">
    {/* Content */}
  </div>
</main>
```

### Card with Icon
```tsx
<div className="card-elevated">
  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500/20 ring-1 ring-primary-500/30">
    <Icon className="h-6 w-6 text-primary-400" />
  </div>
  <h3 className="mt-4 font-bold text-slate-100">Title</h3>
  <p className="mt-2 text-sm text-slate-400">Description</p>
</div>
```

### Interactive List
```tsx
<div className="space-y-3">
  {items.map((item) => (
    <div key={item.id} className="group flex items-start gap-3 p-3 hover:bg-slate-800/30 transition-colors">
      <Icon className="h-4 w-4 text-primary-400" />
      <div className="flex-1">
        <p className="font-semibold text-slate-100">{item.title}</p>
        <p className="text-xs text-slate-500">{item.desc}</p>
      </div>
    </div>
  ))}
</div>
```

### Grid of Cards
```tsx
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {items.map((item) => (
    <div key={item.id} className="card-interactive">
      {/* Card content */}
    </div>
  ))}
</div>
```

## Animation Classes

```
.animate-float           -> Gentle floating
.animate-pulse-subtle    -> Soft pulsing
.animate-bounce-subtle   -> Gentle bounce
.animate-pulse-slow      -> Slow pulse
.animate-spin-slow       -> Slow rotation
.animate-slide-in        -> Slide entrance
.animate-glow-pulse      -> Glowing effect
```

## Hover Effects

### Text Hover
```tsx
<a className="text-slate-400 hover:text-slate-200 transition-colors">
  Link
</a>
```

### Scale Hover
```tsx
<button className="transition-transform hover:scale-105">
  Button
</button>
```

### Background Hover
```tsx
<div className="bg-slate-900/50 hover:bg-slate-900 transition-colors">
  Hover Area
</div>
```

### Glow Hover
```tsx
<div className="hover:shadow-lg hover:shadow-primary-500/20 transition-all">
  Glowing Area
</div>
```

## Gradient Patterns

### Background Gradient
```tsx
<div className="bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950">
  Content
</div>
```

### Text Gradient
```tsx
<h1 className="bg-gradient-to-r from-primary-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
  Gradient Text
</h1>
```

### Button Gradient
```tsx
<button className="bg-gradient-to-r from-primary-500 to-primary-600">
  Gradient Button
</button>
```

## Shadow Patterns

### Subtle Shadow
```tsx
<div className="shadow-lg shadow-slate-900/30">
  Content
</div>
```

### Color Shadow
```tsx
<div className="shadow-lg shadow-primary-500/20">
  Glowing content
</div>
```

## Border Patterns

### Standard Border
```tsx
<div className="border border-slate-800">
  Content
</div>
```

### Colored Border
```tsx
<div className="border border-primary-500/20 hover:border-primary-500/50 transition-colors">
  Content
</div>
```

### Ring Border
```tsx
<div className="ring-1 ring-slate-800/50">
  Content
</div>
```

## Common Combinations

### Professional Card Hover
```tsx
<div className="card-interactive hover:scale-[1.02] hover:border-primary-500/30 hover:shadow-lg">
  Content
</div>
```

### Professional Button
```tsx
<button className="primary-button flex items-center gap-2 hover:scale-105">
  <Icon className="h-5 w-5" />
  <span>Action</span>
</button>
```

### Professional Input
```tsx
<input className="input-field-lg focus:border-primary-400 focus:ring-2 focus:ring-primary-500/70" />
```

### Professional Page
```tsx
<main className="flex flex-1 flex-col overflow-hidden">
  <Header title="Title" subtitle="Subtitle" />
  <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950 p-6">
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Card items */}
    </div>
  </div>
</main>
```

## Pro Tips

✨ Always use `.transition-all` for smooth changes  
✨ Use `.duration-300` for standard transitions  
✨ Use `group` and `group-hover:` for child element animations  
✨ Combine multiple hover classes for layered effects  
✨ Use semantic HTML with proper contrast  
✨ Keep animations under 500ms for responsiveness  
✨ Use `relative` + `absolute` sparingly, prefer flexbox/grid  
✨ Test animations on actual devices  

## 🎯 Recommended Usage

- Use **card-elevated** for default card style
- Use **card-interactive** when cards are clickable
- Use **glass-panel-premium** for premium sections
- Use **primary-button** for main actions
- Use **secondary-button** for alternative actions
- Use **input-field-lg** for prominent forms
- Use gradient text for important titles

---

**All components are production-ready and tested across devices!**
