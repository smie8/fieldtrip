// Quick FieldTrip Diagnostic - Copy and paste this into browser console
// Run this on http://localhost:8001/index.html

console.log('🔍 FieldTrip Quick Diagnostic');

// 1. Check if bottom elements exist and are visible
const bottomElements = ['.row-4', '.row-5', '.cta-button', '.nav-arrow'];
console.log('\n1. BOTTOM ELEMENTS STATUS:');
bottomElements.forEach(sel => {
  const el = document.querySelector(sel);
  if (!el) {
    console.log(`❌ ${sel} - MISSING`);
    return;
  }
  const rect = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
  console.log(`${isVisible ? '✅' : '❌'} ${sel}:`, {
    visible: isVisible,
    top: Math.round(rect.top),
    bottom: Math.round(rect.bottom),
    height: Math.round(rect.height),
    distanceFromBottom: Math.round(window.innerHeight - rect.bottom),
    display: cs.display,
    opacity: cs.opacity
  });
});

// 2. Check row heights and flex distribution
console.log('\n2. ROW HEIGHT DISTRIBUTION:');
const rows = ['.row-1', '.row-2', '.row-3', '.row-4', '.row-5'];
let totalHeight = 0;
rows.forEach(sel => {
  const el = document.querySelector(sel);
  if (el) {
    const rect = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    totalHeight += rect.height;
    console.log(`${sel}:`, {
      height: Math.round(rect.height),
      flex: cs.flex,
      minHeight: cs.minHeight,
      maxHeight: cs.maxHeight
    });
  }
});

const container = document.querySelector('.layout-container');
const containerHeight = container ? container.getBoundingClientRect().height : 0;
console.log(`\nTotal rows height: ${Math.round(totalHeight)}px`);
console.log(`Container height: ${Math.round(containerHeight)}px`);
console.log(`Overflow: ${totalHeight > containerHeight ? 'YES' : 'NO'} (${Math.round(totalHeight - containerHeight)}px)`);

// 3. Check viewport consistency
console.log('\n3. VIEWPORT CONSISTENCY:');
const vh = getComputedStyle(document.documentElement).getPropertyValue('--vh');
const calculatedVh = window.innerHeight * 0.01 + 'px';
console.log({
  innerHeight: window.innerHeight,
  visualViewport: window.visualViewport ? window.visualViewport.height : 'N/A',
  '--vh': vh,
  '--vh-calculated': calculatedVh,
  match: vh === calculatedVh
});

// 4. Check active breakpoints
console.log('\n4. ACTIVE BREAKPOINTS:');
const breakpoints = [
  '(max-width:480px)',
  '(max-width:768px)', 
  '(min-width:769px)'
];
breakpoints.forEach(bp => {
  console.log(`${bp}: ${matchMedia(bp).matches}`);
});

// 5. Check illustration constraints
console.log('\n5. ILLUSTRATION ANALYSIS:');
const illustration = document.querySelector('.row-3 img');
if (illustration) {
  const rect = illustration.getBoundingClientRect();
  const cs = getComputedStyle(illustration);
  console.log('Illustration:', {
    actualHeight: Math.round(rect.height),
    naturalHeight: illustration.naturalHeight,
    maxHeight: cs.maxHeight,
    objectFit: cs.objectFit,
    isOversized: rect.height > window.innerHeight * 0.5
  });
}

// 6. Check for overflow clipping
console.log('\n6. OVERFLOW CLIPPING:');
const containers = ['.app-container', '.layout-container', '.section.section--active'];
containers.forEach(sel => {
  const el = document.querySelector(sel);
  if (el) {
    const cs = getComputedStyle(el);
    console.log(`${sel}:`, {
      overflow: cs.overflow,
      height: cs.height,
      maxHeight: cs.maxHeight
    });
  }
});

console.log('\n🎯 DIAGNOSTIC COMPLETE - Check results above for issues');
