// FieldTrip Flex Chain Verification Script
// Run this in browser console on http://localhost:8001/index.html

console.log('🔍 FieldTrip Flex Chain Verification');
console.log('=====================================');

// 1. Run the exact verification commands
console.log('\n1. FLEX CHAIN HEIGHT ANALYSIS:');
['.layout-container','.section','.row-3','.row-4','.row-5'].forEach(sel=>{
  const n=document.querySelector(sel);
  if(!n) return;
  const r=n.getBoundingClientRect();
  const cs = getComputedStyle(n);
  console.log(sel,'height:',Math.round(r.height),'flex:',cs.flex,'min-height:',cs.minHeight);
});

console.log('\n2. SCROLLBAR DETECTION:');
const scrollbarsPresent = document.body.scrollHeight > document.documentElement.clientHeight;
console.log('Scrollbars present?', scrollbarsPresent);
console.log('Body scrollHeight:', document.body.scrollHeight);
console.log('Document clientHeight:', document.documentElement.clientHeight);

// 2. Detailed row analysis
console.log('\n3. DETAILED ROW ANALYSIS:');
const rows = ['.row-1', '.row-2', '.row-3', '.row-4', '.row-5'];
let totalRowHeight = 0;

rows.forEach(sel => {
  const el = document.querySelector(sel);
  if (el) {
    const rect = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    totalRowHeight += rect.height;
    
    console.log(`${sel}:`, {
      height: Math.round(rect.height),
      flex: cs.flex,
      flexGrow: cs.flexGrow,
      flexShrink: cs.flexShrink,
      minHeight: cs.minHeight,
      maxHeight: cs.maxHeight,
      display: cs.display
    });
  }
});

// 3. Container height analysis
console.log('\n4. CONTAINER HEIGHT ANALYSIS:');
const layoutContainer = document.querySelector('.layout-container');
const appContainer = document.querySelector('.app-container');
const viewportHeight = window.innerHeight;

if (layoutContainer) {
  const layoutRect = layoutContainer.getBoundingClientRect();
  const layoutCs = getComputedStyle(layoutContainer);
  
  console.log('Layout Container:', {
    height: Math.round(layoutRect.height),
    flex: layoutCs.flex,
    minHeight: layoutCs.minHeight,
    maxHeight: layoutCs.maxHeight
  });
}

if (appContainer) {
  const appRect = appContainer.getBoundingClientRect();
  const appCs = getComputedStyle(appContainer);
  
  console.log('App Container:', {
    height: Math.round(appRect.height),
    overflow: appCs.overflow,
    display: appCs.display,
    flexDirection: appCs.flexDirection
  });
}

console.log('Viewport Height:', Math.round(viewportHeight));

// 4. Row-5 specific analysis (arrow)
console.log('\n5. ROW-5 (ARROW) ANALYSIS:');
const row5 = document.querySelector('.row-5');
if (row5) {
  const rect = row5.getBoundingClientRect();
  const cs = getComputedStyle(row5);
  
  console.log('Row-5 (Arrow):', {
    height: Math.round(rect.height),
    top: Math.round(rect.top),
    bottom: Math.round(rect.bottom),
    visible: rect.top >= 0 && rect.bottom <= viewportHeight,
    flex: cs.flex,
    minHeight: cs.minHeight,
    maxHeight: cs.maxHeight,
    hasPositiveHeight: rect.height > 60
  });
}

// 5. Row-4 specific analysis (CTA)
console.log('\n6. ROW-4 (CTA) ANALYSIS:');
const row4 = document.querySelector('.row-4');
if (row4) {
  const rect = row4.getBoundingClientRect();
  const cs = getComputedStyle(row4);
  
  console.log('Row-4 (CTA):', {
    height: Math.round(rect.height),
    top: Math.round(rect.top),
    bottom: Math.round(rect.bottom),
    visible: rect.top >= 0 && rect.bottom <= viewportHeight,
    flex: cs.flex,
    minHeight: cs.minHeight,
    maxHeight: cs.maxHeight
  });
}

// 6. Row-3 analysis (illustration container)
console.log('\n7. ROW-3 (ILLUSTRATION) ANALYSIS:');
const row3 = document.querySelector('.row-3');
if (row3) {
  const rect = row3.getBoundingClientRect();
  const cs = getComputedStyle(row3);
  const maxHeight = parseFloat(cs.maxHeight);
  
  console.log('Row-3 (Illustration):', {
    height: Math.round(rect.height),
    maxHeight: cs.maxHeight,
    maxHeightValue: maxHeight,
    withinLimit: rect.height <= maxHeight,
    flex: cs.flex,
    flexGrow: cs.flexGrow,
    flexShrink: cs.flexShrink,
    minHeight: cs.minHeight
  });
}

// 7. Total height comparison
console.log('\n8. TOTAL HEIGHT COMPARISON:');
const containerHeight = layoutContainer ? layoutContainer.getBoundingClientRect().height : 0;
const overflow = totalRowHeight - containerHeight;

console.log('Height Analysis:', {
  totalRowHeight: Math.round(totalRowHeight),
  containerHeight: Math.round(containerHeight),
  viewportHeight: Math.round(viewportHeight),
  overflow: Math.round(overflow),
  fitsInContainer: totalRowHeight <= containerHeight,
  fitsInViewport: totalRowHeight <= viewportHeight
});

// 8. Recommendations
console.log('\n9. RECOMMENDATIONS:');
if (overflow > 0) {
  console.log(`⚠️  OVERFLOW DETECTED: ${Math.round(overflow)}px`);
  console.log('Suggested fixes:');
  console.log('- Reduce .row-3 max-height by 5dvh');
  console.log('- Check if illustrations are oversized');
  console.log('- Verify flex-shrink is working on all containers');
} else {
  console.log('✅ No overflow detected - layout is stable');
}

if (row5 && row5.getBoundingClientRect().height < 60) {
  console.log('⚠️  Row-5 (arrow) height is too small');
  console.log('Suggested fixes:');
  console.log('- Increase .row-5 min-height');
  console.log('- Check if .row-3 is consuming too much space');
}

if (scrollbarsPresent) {
  console.log('⚠️  Scrollbars detected - this should not happen');
  console.log('Check:');
  console.log('- .app-container overflow: hidden');
  console.log('- No elements exceeding viewport height');
}

console.log('\n🎯 VERIFICATION COMPLETE');
console.log('Check the results above for any issues');
