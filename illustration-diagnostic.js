/**
 * Illustration Scaling Diagnostic Tool
 * 
 * Purpose: Identify why illustration inside .row-3 is smaller than expected
 * and ensure it scales to maximum available space without pushing other elements out of view.
 */

console.log('🔍 ILLUSTRATION SCALING DIAGNOSTIC');
console.log('=====================================');

// A. Measure Available vs Used Space
console.log('\n📏 A. HEIGHT CHAIN ANALYSIS');
console.log('----------------------------');

const app = document.querySelector('.app-container');
const layout = document.querySelector('.layout-container');
const section = document.querySelector('.section.section--active');
const row3 = document.querySelector('.row-3');
const ill = row3?.querySelector('img, video, canvas');

function box(name, el) {
  if (!el) return console.log(name, 'MISSING');
  const r = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  console.log(name, {
    height: Math.round(r.height),
    paddingTop: cs.paddingTop,
    paddingBottom: cs.paddingBottom,
    marginTop: cs.marginTop,
    marginBottom: cs.marginBottom
  });
}

box('app', app);
box('layout', layout);
box('section', section);
box('row-3', row3);
if (ill) box('illustration', ill);

// B. Identify Height Constraints
console.log('\n🔒 B. HEIGHT CONSTRAINTS ANALYSIS');
console.log('----------------------------------');

['.row-3','.row-3 img','.row-3 picture','.illustration'].forEach(sel=>{
  const n=document.querySelector(sel);
  if(!n) return;
  const cs=getComputedStyle(n);
  console.log(sel,{
    maxHeight: cs.maxHeight,
    minHeight: cs.minHeight,
    height: cs.height,
    flex: cs.flex,
    alignItems: cs.alignItems,
    justifyContent: cs.justifyContent,
    objectFit: cs.objectFit,
    aspectRatio: cs.aspectRatio,
    width: cs.width
  });
});

// C. Check Flex Behavior
console.log('\n📐 C. FLEX BEHAVIOR ANALYSIS');
console.log('-----------------------------');

['.layout-container','.section.section--active','.row-3'].forEach(sel=>{
  const n=document.querySelector(sel);
  if(n){
    const cs=getComputedStyle(n);
    console.log(sel,{
      display: cs.display,
      flexDirection: cs.flexDirection,
      alignItems: cs.alignItems,
      justifyContent: cs.justifyContent,
      flex: cs.flex,
      flexGrow: cs.flexGrow,
      flexShrink: cs.flexShrink,
      flexBasis: cs.flexBasis
    });
  }
});

// D. Padding & Margin Audit
console.log('\n📦 D. SPACING AUDIT');
console.log('--------------------');

const el=document.querySelector('.row-3');
if(el){
  const cs=getComputedStyle(el);
  console.log('row-3 spacing',{
    paddingTop: cs.paddingTop,
    paddingBottom: cs.paddingBottom,
    paddingLeft: cs.paddingLeft,
    paddingRight: cs.paddingRight,
    marginTop: cs.marginTop,
    marginBottom: cs.marginBottom,
    marginLeft: cs.marginLeft,
    marginRight: cs.marginRight
  });
}

// E. Calculate Available Space
console.log('\n🧮 E. AVAILABLE SPACE CALCULATION');
console.log('----------------------------------');

if (row3 && ill) {
  const row3Rect = row3.getBoundingClientRect();
  const illRect = ill.getBoundingClientRect();
  const row3Style = getComputedStyle(row3);
  
  const paddingTop = parseFloat(row3Style.paddingTop) || 0;
  const paddingBottom = parseFloat(row3Style.paddingBottom) || 0;
  const availableHeight = row3Rect.height - paddingTop - paddingBottom;
  const usedHeight = illRect.height;
  const efficiency = Math.round((usedHeight / availableHeight) * 100);
  
  console.log('Space utilization:', {
    availableHeight: Math.round(availableHeight),
    usedHeight: Math.round(usedHeight),
    efficiency: efficiency + '%',
    wastedSpace: Math.round(availableHeight - usedHeight)
  });
}

// F. Viewport Context
console.log('\n📱 F. VIEWPORT CONTEXT');
console.log('------------------------');

console.log('Viewport info:', {
  innerHeight: window.innerHeight,
  visualViewportHeight: window.visualViewport?.height || 'N/A',
  dvh: window.innerHeight,
  cssVh: getComputedStyle(document.documentElement).getPropertyValue('--vh'),
  devicePixelRatio: window.devicePixelRatio
});

// G. Media Query Status
console.log('\n📺 G. MEDIA QUERY STATUS');
console.log('-------------------------');

['(max-width: 480px)','(max-width: 768px)','(min-width: 769px)'].forEach(q=>{
  console.log(q, matchMedia(q).matches);
});

// H. Visual Debug (Optional)
console.log('\n👁️ H. VISUAL DEBUG (Check page for outlines)');
console.log('---------------------------------------------');

document.querySelectorAll('.row-1,.row-2,.row-3,.row-4,.row-5').forEach(n=>{
  n.style.outline='2px dashed rgba(255,0,0,0.5)';
  n.style.position='relative';
  const tag=document.createElement('div');
  tag.textContent=n.className + ' (' + Math.round(n.getBoundingClientRect().height) + 'px)';
  Object.assign(tag.style,{
    position:'absolute',
    top:'0',
    left:'0',
    fontSize:'10px',
    background:'rgba(255,0,0,0.8)',
    color:'white',
    padding:'2px',
    zIndex:'1000'
  });
  n.appendChild(tag);
});

console.log('\n✅ DIAGNOSTIC COMPLETE');
console.log('======================');
console.log('Check the page for red outlines showing row heights.');
console.log('Review the data above to identify scaling constraints.');
