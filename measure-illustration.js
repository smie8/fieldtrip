// Quick measurement script for illustration efficiency
console.log('🔍 ILLUSTRATION EFFICIENCY MEASUREMENT');
console.log('=====================================');

const section = document.querySelector('.section.section--active');
const row3 = document.querySelector('.row-3');
const img = row3?.querySelector('img');

if (section && row3 && img) {
    const sectionRect = section.getBoundingClientRect();
    const row3Rect = row3.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();
    
    const efficiency = Math.round((imgRect.height / row3Rect.height) * 100);
    
    console.log('MEASUREMENTS:');
    console.log('Section height:', Math.round(sectionRect.height));
    console.log('Row-3 height:', Math.round(row3Rect.height));
    console.log('Image height:', Math.round(imgRect.height));
    console.log('EFFICIENCY:', efficiency + '%');
    
    if (efficiency < 90) {
        console.log('⚠️  LOW EFFICIENCY DETECTED - Applying fixes...');
    } else {
        console.log('✅ Good efficiency');
    }
} else {
    console.log('❌ Missing elements');
}
