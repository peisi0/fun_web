# Neon Thermometer

An interactive, visually stunning thermometer with neon glow effects built entirely with vanilla HTML, CSS, and JavaScript.

## ✨ Features

### Visual Effects
- **Neon Glow:** Dynamic neon lighting that changes color based on temperature
- **Color Transitions:** Smooth gradient from blue (cold) to red (hot)
- **Bubble Animation:** Animated bubbles that rise through the liquid
- **Ambient Lighting:** Background lighting that matches the thermometer color
- **Glass Effect:** Realistic glass tube appearance with reflections

### Interaction
- **Drag-to-Adjust:** Click and drag anywhere on the thermometer to change temperature
- **Real-time Updates:** Instant visual feedback
- **Dual Scale Display:** Shows both Celsius and Fahrenheit
- **Range:** -30°C to 50°C (-22°F to 122°F)

### Technical Details
- **CSS Variables:** Dynamic theming using CSS custom properties
- **CSS Animations:** Smooth transitions and bubble effects
- **No Dependencies:** Pure vanilla JavaScript
- **Mobile Responsive:** Works on touch devices

## 🎨 How It Works

### Color Mapping
Temperature is mapped to hue values:
- **-30°C (Blue):** Hue 220
- **0°C (Cyan):** Hue ~150
- **25°C (Yellow):** Hue ~60
- **50°C (Red):** Hue 0

### Height Mapping
Temperature determines liquid height:
- Minimum: 5% (even at -30°C for visibility)
- Maximum: 98% (at 50°C)
- Linear interpolation between values

### Bubble System
- Bubbles spawn at random intervals
- More bubbles appear at higher temperatures
- Each bubble has randomized:
  - Size (2-10px)
  - Position
  - Animation duration
- Automatically removed after animation

## 🎯 Code Highlights

### CSS Variables for Dynamic Theming
```css
:root {
    --liquid-hue: 200;
    --liquid-height: 20%;
}
```

### CLAHE-inspired Gradient
```css
background: linear-gradient(to top, 
    hsl(var(--liquid-hue), 100%, 40%), 
    hsl(var(--liquid-hue), 100%, 60%)
);
```

### Bubble Animation
```css
@keyframes rise {
    0% { transform: translateY(0) scale(0.5); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(-300px) scale(1.2); opacity: 0; }
}
```

## 🚀 Usage

Simply open `index.html` in a modern browser. No build step required!

```bash
# Option 1: Direct open
open index.html

# Option 2: Local server
python -m http.server 8000
```

## 🎮 Controls

- **Click/Touch and Drag:** Change temperature vertically
- **Up Movement:** Increase temperature
- **Down Movement:** Decrease temperature

## 🌡️ Scale Information

### Major Ticks (8 divisions)
- **Celsius:** -30, -20, -10, 0, 10, 20, 30, 40, 50
- **Fahrenheit:** -22, -4, 14, 32, 50, 68, 86, 104, 122

### Minor Ticks
- 4 subdivisions between each major tick
- Provides finer granularity

## 💻 Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

**Requirements:**
- CSS Variables support
- CSS Animations
- ES6 JavaScript

## 🎨 Customization

### Change Temperature Range
```javascript
const minTempC = -30;  // Change minimum
const maxTempC = 50;   // Change maximum
```

### Adjust Visual Style
```css
:root {
    --tube-width: 80px;      /* Thermometer width */
    --tube-height: 400px;    /* Thermometer height */
}
```

### Modify Bubble Frequency
```javascript
setInterval(() => {
    createBubbles();
}, 200);  // Adjust interval (milliseconds)
```

## 📚 Learning Points

This project demonstrates:
1. **CSS Custom Properties** for reactive styling
2. **Event Handling** for drag interactions
3. **Animation Management** with JavaScript
4. **Color Theory** (HSL color space)
5. **DOM Manipulation** for dynamic elements
6. **Mathematical Mapping** (linear interpolation)

## 🐛 Known Limitations

- No temperature unit toggle (always displays Fahrenheit in readout)
- Bubble animation pauses when window is not active (browser optimization)
- Input range slider is hidden (UX decision for cleaner look)

## 🔮 Future Enhancements

- [ ] Temperature unit toggle (°C/°F)
- [ ] Multiple thermometer themes (classic, modern, retro)
- [ ] Sound effects
- [ ] Temperature presets (body temp, room temp, etc.)
- [ ] Export temperature reading as image

## 📄 License

MIT License - Free to use and modify!

---

**Built with ❤️ and pure CSS magic**
