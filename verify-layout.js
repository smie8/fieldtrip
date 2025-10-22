// FieldTrip Layout Verification Script
// Run this in browser console to verify flex chain fixes

console.log('🔧 FieldTrip Layout Verification');

// 1. Check flex chain integrity
console.log('\n1. FLEX CHAIN VERIFICATION:');
const flexChain = [
  { selector: '.app-container', name: 'App Container' },
  { selector: '.section.section--active', name: 'Active Section' },
  { selector: '.layout-container', name: 'Layout Container' },
  { selector: '.row-1', name: 'Row 1 (Logo)' },
  { selector: '.row-2', name: 'Row 2 (Description)' },
  { selector: '.row-3', name: 'Row 3 (Illustration)' },
  { selector: '.row-4', name: 'Row 4 (CTA Button)' },
  { selector: '.row-5', name: 'Row 5 (Arrow)' }
];

flexChain.forEach(item => {
  const el = document.querySelector(item.selector);
  if (!el) {
    console.log(`❌ ${item.name}: MISSING`);
    return;
  }
  
  const cs = getComputedStyle(el);
  const rect = el.getBoundingClientRect();
  
  console.log(`✅ ${item.name}:`, {
    display: cs.display,
    flex: cs.flex,
    flexGrow: cs.flexGrow,
    flexShrink: cs.flexShrink,
    flexBasis: cs.flexBasis,
    minHeight: cs.minHeight,
    maxHeight: cs.maxHeight,
    height: Math.round(rect.height),
    overflow: cs.overflow
  });
});

// 2. Check bottom element visibility
console.log('\n2. BOTTOM ELEMENT VISIBILITY:');
const bottomElements = ['.row-4', '.row-5', '.cta-button', '.nav-arrow'];
bottomElements.forEach(sel => {
  const el = document.querySelector(sel);
  if (!el) {
    console.log(`❌ ${sel}: MISSING`);
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

// 3. Check row-3 constraints
console.log('\n3. ROW-3 CONSTRAINTS:');
const row3 = document.querySelector('.row-3');
if (row3) {
  const cs = getComputedStyle(row3);
  const rect = row3.getBoundingClientRect();
  const maxHeight = parseFloat(cs.maxHeight);
  const actualHeight = rect.height;
  
  console.log('Row-3 Analysis:', {
    flex: cs.flex,
    minHeight: cs.minHeight,
    maxHeight: cs.maxHeight,
    actualHeight: Math.round(actualHeight),
    withinLimit: actualHeight <= maxHeight,
    flexGrow: cs.flexGrow,
    flexShrink: cs.flexShrink
  });
}

// 4. Check illustration constraints
console.log('\n4. ILLUSTRATION CONSTRAINTS:');
const illustration = document.querySelector('.row-3 img');
if (illustration) {
  const cs = getComputedStyle(illustration);
  const rect = illustration.getBoundingClientRect();
  const parentRect = illustration.parentElement.getBoundingClientRect();
  
  console.log('Illustration Analysis:', {
    maxHeight: cs.maxHeight,
    objectFit: cs.objectFit,
    actualHeight: Math.round(rect.height),
    parentHeight: Math.round(parentRect.height),
    fitsInParent: rect.height <= parentRect.height
  });
}

// 5. Check total layout height
console.log('\n5. TOTAL LAYOUT HEIGHT:');
const rows = ['.row-1', '.row-2', '.row-3', '.row-4', '.row-5'];
let totalRowHeight = 0;
rows.forEach(sel => {
  const el = document.querySelector(sel);
  if (el) {
    totalRowHeight += el.getBoundingClientRect().height;
  }
});

const container = document.querySelector('.layout-container');
const containerHeight = container ? container.getBoundingClientRect().height : 0;
const viewportHeight = window.innerHeight;

console.log('Height Analysis:', {
  totalRowHeight: Math.round(totalRowHeight),
  containerHeight: Math.round(containerHeight),
  viewportHeight: Math.round(viewportHeight),
  fitsInContainer: totalRowHeight <= containerHeight,
  fitsInViewport: totalRowHeight <= viewportHeight,
  overflow: totalRowHeight > containerHeight ? Math.round(totalRowHeight - containerHeight) : 0
});

// 6. Check active breakpoints
console.log('\n6. ACTIVE BREAKPOINTS:');
const breakpoints = [
  '(max-width:480px)',
  '(max-width:768px)', 
  '(min-width:769px)'
];
breakpoints.forEach(bp => {
  console.log(`${bp}: ${matchMedia(bp).matches}`);
});

console.log('\n🎯 VERIFICATION COMPLETE');
console.log('✅ All bottom elements should be visible');
console.log('✅ No horizontal scrolling should occur');
console.log('✅ Row-3 should shrink gracefully when needed');
console.log('✅ Contact overlay should center correctly');
