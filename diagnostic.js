// FieldTrip Layout Diagnostic Script
// Run this in browser console to analyze bottom element visibility issues

console.log('=== FieldTrip Layout Diagnostic ===');

// 1) Presence & Visibility
console.log('\n1. ELEMENT PRESENCE & VISIBILITY:');
['.row-4','.row-5','.cta-button','.nav-arrow'].forEach(sel=>{
  const n=document.querySelector(sel);
  if(!n) return console.log(sel,'MISSING');
  const cs=getComputedStyle(n);
  console.log(sel,{
    display:cs.display,
    visibility:cs.visibility,
    opacity:cs.opacity,
    position:cs.position,
    zIndex:cs.zIndex
  });
});

// 2) Flex and Layout Distribution
console.log('\n2. FLEX & LAYOUT DISTRIBUTION:');
function boxInfo(sel){
  const n=document.querySelector(sel);
  if(!n) return {sel,missing:true};
  const cs=getComputedStyle(n);
  const r=n.getBoundingClientRect();
  return {
    sel,
    height: Math.round(r.height),
    minHeight: cs.minHeight,
    maxHeight: cs.maxHeight,
    flex: cs.flex,
    flexGrow: cs.flexGrow,
    flexShrink: cs.flexShrink,
    flexBasis: cs.flexBasis,
    overflow: cs.overflow,
    padding: [cs.paddingTop,cs.paddingBottom],
    display: cs.display,
    position: cs.position
  };
}

const layoutInfo = ['.app-container','.layout-container','.section.section--active','.row-1','.row-2','.row-3','.row-4','.row-5']
  .map(boxInfo);

layoutInfo.forEach(x=>console.table(x));

// Calculate total height
const totalRowHeight = layoutInfo.slice(3).reduce((sum, row) => sum + (row.height || 0), 0);
const containerHeight = layoutInfo[1].height || 0;
console.log(`\nTotal row heights: ${totalRowHeight}px`);
console.log(`Container height: ${containerHeight}px`);
console.log(`Overflow: ${totalRowHeight > containerHeight ? 'YES' : 'NO'} (${totalRowHeight - containerHeight}px)`);

// 3) Overflow & Clipping
console.log('\n3. OVERFLOW & CLIPPING ANALYSIS:');
let node=document.querySelector('.row-5');
const overflowChain = [];
while(node && node!==document.body){
  const cs=getComputedStyle(node);
  overflowChain.push({
    element: node.className||node.tagName,
    overflow: cs.overflow,
    height: cs.height,
    maxHeight: cs.maxHeight,
    position: cs.position
  });
  node=node.parentElement;
}
overflowChain.forEach(item => console.log(item));

// 4) Viewport + Variable Consistency
console.log('\n4. VIEWPORT & VARIABLE CONSISTENCY:');
const viewportInfo = {
  innerHeight: window.innerHeight,
  visualViewportHeight: window.visualViewport ? window.visualViewport.height : 'N/A',
  '--vh': getComputedStyle(document.documentElement).getPropertyValue('--vh'),
  '--vh-calculated': window.innerHeight * 0.01 + 'px',
  screenHeight: window.screen.height,
  devicePixelRatio: window.devicePixelRatio
};
console.table(viewportInfo);

// 5) Media Query & Breakpoint Check
console.log('\n5. ACTIVE BREAKPOINTS:');
['(max-width:480px)','(max-width:768px)','(min-width:769px)']
  .forEach(q=>console.log(q, matchMedia(q).matches));

// 6) Illustration / Image Constraints
console.log('\n6. ILLUSTRATION CONSTRAINTS:');
const ill=document.querySelector('.row-3 img');
if(ill){
  const cs=getComputedStyle(ill);
  const rect = ill.getBoundingClientRect();
  console.log('illustration',{
    height:cs.height,
    maxHeight:cs.maxHeight,
    minHeight:cs.minHeight,
    objectFit:cs.objectFit,
    actualHeight: Math.round(rect.height),
    naturalHeight: ill.naturalHeight,
    naturalWidth: ill.naturalWidth
  });
}

// 7) Inline or Script-Set Styles
console.log('\n7. INLINE STYLES CHECK:');
['.app-container','.layout-container','.section.section--active','.row-3','.row-4','.row-5']
  .forEach(s=>{
    const n=document.querySelector(s);
    if(n && n.getAttribute('style')) {
      console.log(s,'inline:',n.getAttribute('style'));
    }
  });

// 8) Row-3 Specific Analysis
console.log('\n8. ROW-3 DETAILED ANALYSIS:');
const row3 = document.querySelector('.row-3');
if(row3) {
  const cs = getComputedStyle(row3);
  const rect = row3.getBoundingClientRect();
  console.log('Row-3 details:', {
    flex: cs.flex,
    flexGrow: cs.flexGrow,
    flexShrink: cs.flexShrink,
    height: cs.height,
    minHeight: cs.minHeight,
    maxHeight: cs.maxHeight,
    actualHeight: Math.round(rect.height),
    paddingTop: cs.paddingTop,
    paddingBottom: cs.paddingBottom,
    marginTop: cs.marginTop,
    marginBottom: cs.marginBottom
  });
}

// 9) Safe Area Analysis
console.log('\n9. SAFE AREA ANALYSIS:');
const safeAreaInfo = {
  'env(safe-area-inset-top)': getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-top)'),
  'env(safe-area-inset-bottom)': getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-bottom)'),
  'env(safe-area-inset-left)': getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-left)'),
  'env(safe-area-inset-right)': getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-right)')
};
console.table(safeAreaInfo);

// 10) Bottom Element Position Analysis
console.log('\n10. BOTTOM ELEMENT POSITION:');
const bottomElements = ['.row-4', '.row-5', '.cta-button', '.nav-arrow'];
bottomElements.forEach(sel => {
  const el = document.querySelector(sel);
  if(el) {
    const rect = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    console.log(sel, {
      top: Math.round(rect.top),
      bottom: Math.round(rect.bottom),
      height: Math.round(rect.height),
      visible: rect.top >= 0 && rect.bottom <= window.innerHeight,
      viewportBottom: window.innerHeight,
      distanceFromBottom: window.innerHeight - rect.bottom
    });
  }
});

console.log('\n=== DIAGNOSTIC COMPLETE ===');
