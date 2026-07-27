const fs = require('fs');
const content = fs.readFileSync('./node_modules/vanta/dist/vanta.clouds2.min.js', 'utf8');
console.log('Length:', content.length);
console.log('Contains export:', content.includes('export'));
console.log('Contains VANTA:', content.includes('VANTA'));
