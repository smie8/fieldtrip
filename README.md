# FieldTrip Architecture

A unified, responsive website built with HTML/CSS/JS following a 5-row grid system with scroll-free section navigation.

## Architecture Overview

### Layout System
- **5-row grid system** (row-1–row-5) with consistent flex behavior
- **Scroll-free section swap** layout using absolute positioning
- **Unified height logic** using `100dvh` with `--vh` JavaScript fallback
- **Global safe-area padding** on `.app-container` for mobile browsers

### Design Tokens
- **Spacing**: `--spacing-xs` through `--spacing-xxl` (0.5rem to 4rem)
- **Typography**: `--base-font-size: 1.1rem` with system font fallbacks
- **Colors**: Primary `#083521`, background `#d7d3c1`, overlay `rgba(245, 243, 240, 0.9)`
- **Animation**: Consistent timing with `cubic-bezier(0.4,0,0.2,1)` easing

### Responsive Breakpoints
- **480px**: Small mobile adjustments (enhanced protection)
- **768px**: General mobile styles (universal mobile)
- **769px+**: Desktop optimizations (space-between layout)

### JavaScript Behavior
- **Single viewport listener** (`setVHVar`) for `--vh` fallback
- **JSON-driven content loading** from `copytexts.json`
- **Contact overlay behavior** with responsive rules
- **Illustration cycling** with sequential animation system

### File Structure
```
fieldtrip/
├── index.html          # Main HTML structure
├── styles.css          # Unified CSS with design tokens
├── app.js              # JavaScript behavior and viewport handling
├── copytexts.json      # Dynamic content for mobile/desktop
├── fieldtrip.png       # Logo asset
├── FONT/               # Custom font files
├── images/             # Animation assets
└── legacy/             # Archived legacy files
```

## Development Notes

### Testing Devices
- **Mobile**: iPhone 13 Safari, Android Chrome
- **Desktop**: Chrome, Firefox, Safari (latest 2 versions)
- **Viewport testing**: 320px, 375px, 414px, 768px, 1024px, 1440px

### Local Development
```bash
# Start local server
cd fieldtrip
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

### Commit Convention
- **Phase-based**: `feat(js): add unified --vh fallback`
- **Feature-based**: `refactor(layout): enforce 5-row flex contract`
- **Cleanup**: `chore(cleanup): archive legacy files`

### Key Features
- **No scrolling**: Section-based navigation with smooth transitions
- **Mobile-first**: Responsive design with viewport height handling
- **Performance**: Optimized animations and passive event listeners
- **Accessibility**: Keyboard navigation and reduced motion support
- **Maintainable**: Single source of truth for styles and behavior

## Browser Support
- iOS 15+, Android 11+
- Chrome, Firefox, Safari (last 2 versions)
- Modern CSS features: `100dvh`, `env()`, `clamp()`
- JavaScript ES6+ with passive event listeners
