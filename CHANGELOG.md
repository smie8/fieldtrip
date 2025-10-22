# Changelog

## Phase 1 - Layout Unification
- Unified HTML structure using canonical `index.html`
- Identified 5-row grid system with consistent flex behavior
- Mapped responsive breakpoints and viewport height logic
- Documented animation sequences and section navigation

## Phase 2 - CSS Consolidation
- Added unified viewport refactor block with `100dvh` + `--vh` fallback
- Merged `mobile-clean.css` rules into `styles.css`
- Consolidated duplicate media queries into single mobile block
- Normalized row behavior with consistent flex properties
- Removed duplicated safe-area padding from child elements

## Phase 3 - JavaScript Viewport Fallback
- Added global `setVHVar()` function for robust `--vh` calculation
- Consolidated resize/orientation event listeners into single handler
- Removed redundant `--vh` setting from `adjustMobileViewport()`
- Cleaned up debug console.log statements while preserving error handling
- Added passive event listeners for performance optimization

## Phase 4 - Row Behavior Consistency
- Enforced 5-row flex contract: `row-1,2,4,5 { flex: 0 0 auto }`, `row-3 { flex: 1 }`
- Removed unnecessary `!important` flags from row flex properties
- Consolidated safe-area handling to global `.app-container` level
- Finalized responsive system with clean breakpoint policy
- Verified no visual drift across all screen sizes

## Phase 5 - Token System & Breakpoint Policy
- Consolidated duplicate `:root` blocks into single design tokens system
- Organized tokens into categories: Spacing, Typography, Colors, Animation
- Finalized breakpoint policy: 480px, 768px, 769px+ (removed 1200px)
- Verified font loading with proper fallbacks and `font-display: swap`
- Ensured all spacing uses CSS variables instead of hard-coded values

## Phase 6 - Legacy Cleanup & Documentation
- Archived legacy files: `desktop-view/`, `mobile-view/`, `test.html`, `mobile-test.html`, `mobile-clean.css`
- Removed debug CSS blocks and `!important` overrides
- Added comprehensive `README.md` with architecture overview
- Created `CHANGELOG.md` documenting all refactor phases
- Finalized production-ready codebase with unified system
