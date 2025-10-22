/**
 * Link Diagnostic Tool
 * 
 * Purpose: Investigate why Section 1 links stop working or appear shifted
 * when returning from Section 2 on both mobile and desktop.
 */

console.log('🔍 LINK DIAGNOSTIC TOOL');
console.log('========================');

// 1. Inspect HTML structure and link locations
console.log('\n📋 1. HTML STRUCTURE ANALYSIS');
console.log('-------------------------------');

const section1Links = document.querySelectorAll('section#section-1 a, section#section-1 button');
console.log('Section 1 links found:', section1Links.length);

section1Links.forEach((link, index) => {
    console.log(`Link ${index + 1}:`, {
        tagName: link.tagName,
        id: link.id,
        className: link.className,
        textContent: link.textContent?.trim() || 'No text',
        parentElement: link.parentElement?.className || 'No parent'
    });
});

// 2. Check CSS interaction layers
console.log('\n🎨 2. CSS INTERACTION LAYERS');
console.log('-----------------------------');

section1Links.forEach((link, index) => {
    const computedStyle = getComputedStyle(link);
    const rect = link.getBoundingClientRect();
    
    console.log(`Link ${index + 1} (${link.id || link.className}):`, {
        position: computedStyle.position,
        zIndex: computedStyle.zIndex,
        pointerEvents: computedStyle.pointerEvents,
        visibility: computedStyle.visibility,
        opacity: computedStyle.opacity,
        transform: computedStyle.transform,
        display: computedStyle.display,
        boundingRect: {
            top: Math.round(rect.top),
            left: Math.round(rect.left),
            width: Math.round(rect.width),
            height: Math.round(rect.height)
        }
    });
});

// 3. Check for overlapping elements
console.log('\n🔍 3. OVERLAPPING ELEMENTS CHECK');
console.log('--------------------------------');

// Test click at various positions around Section 1 links
const testPoints = [
    { x: window.innerWidth / 2, y: window.innerHeight - 100, name: 'Bottom center' },
    { x: window.innerWidth / 2, y: window.innerHeight - 150, name: 'Above bottom' },
    { x: window.innerWidth / 2, y: window.innerHeight - 200, name: 'Middle bottom' }
];

testPoints.forEach(point => {
    const element = document.elementFromPoint(point.x, point.y);
    console.log(`${point.name} (${point.x}, ${point.y}):`, {
        element: element?.tagName || 'None',
        className: element?.className || 'None',
        id: element?.id || 'None',
        textContent: element?.textContent?.trim().substring(0, 20) || 'None'
    });
});

// 4. Check section states
console.log('\n📱 4. SECTION STATES');
console.log('--------------------');

const section1 = document.querySelector('#section-1');
const section2 = document.querySelector('#section-2');

console.log('Section 1:', {
    hasActiveClass: section1?.classList.contains('section--active'),
    opacity: getComputedStyle(section1).opacity,
    visibility: getComputedStyle(section1).visibility,
    transform: getComputedStyle(section1).transform,
    zIndex: getComputedStyle(section1).zIndex,
    position: getComputedStyle(section1).position
});

console.log('Section 2:', {
    hasActiveClass: section2?.classList.contains('section--active'),
    opacity: getComputedStyle(section2).opacity,
    visibility: getComputedStyle(section2).visibility,
    transform: getComputedStyle(section2).transform,
    zIndex: getComputedStyle(section2).zIndex,
    position: getComputedStyle(section2).position
});

// 5. Check contact overlay state
console.log('\n🔗 5. CONTACT OVERLAY STATE');
console.log('--------------------------');

const contactOverlay = document.querySelector('.contact-overlay');
console.log('Contact Overlay:', {
    hasVisibleClass: contactOverlay?.classList.contains('contact-overlay--visible'),
    opacity: getComputedStyle(contactOverlay).opacity,
    visibility: getComputedStyle(contactOverlay).visibility,
    zIndex: getComputedStyle(contactOverlay).zIndex,
    position: getComputedStyle(contactOverlay).position
});

// 6. Test link clickability
console.log('\n🖱️ 6. LINK CLICKABILITY TEST');
console.log('----------------------------');

section1Links.forEach((link, index) => {
    const rect = link.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const elementAtCenter = document.elementFromPoint(centerX, centerY);
    const isClickable = elementAtCenter === link;
    
    console.log(`Link ${index + 1} clickability:`, {
        isClickable: isClickable,
        elementAtCenter: elementAtCenter?.tagName || 'None',
        centerPoint: `(${Math.round(centerX)}, ${Math.round(centerY)})`,
        boundingRect: {
            top: Math.round(rect.top),
            left: Math.round(rect.left),
            width: Math.round(rect.width),
            height: Math.round(rect.height)
        }
    });
});

// 7. Check for transform stacking contexts
console.log('\n🔄 7. TRANSFORM STACKING CONTEXTS');
console.log('----------------------------------');

const elementsWithTransform = document.querySelectorAll('*');
const transformElements = [];

elementsWithTransform.forEach(el => {
    const style = getComputedStyle(el);
    if (style.transform !== 'none' && style.transform !== 'matrix(1, 0, 0, 1, 0, 0)') {
        transformElements.push({
            element: el.tagName + (el.className ? '.' + el.className : '') + (el.id ? '#' + el.id : ''),
            transform: style.transform,
            zIndex: style.zIndex,
            position: style.position
        });
    }
});

console.log('Elements with transform:', transformElements);

// 8. Viewport and positioning check
console.log('\n📐 8. VIEWPORT & POSITIONING');
console.log('-----------------------------');

console.log('Viewport info:', {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio,
    isMobile: window.innerWidth <= 768
});

console.log('App container:', {
    boundingRect: document.querySelector('.app-container')?.getBoundingClientRect(),
    overflow: getComputedStyle(document.querySelector('.app-container')).overflow,
    position: getComputedStyle(document.querySelector('.app-container')).position
});

console.log('\n✅ DIAGNOSTIC COMPLETE');
console.log('======================');
console.log('Review the data above to identify link obstruction issues.');
