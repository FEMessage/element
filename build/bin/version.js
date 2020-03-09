var fs = require('fs');
var path = require('path');
var version = process.env.VERSION || require('../../packages/theme-chalk/package.json').version;
var content = {};
if (!content[version]) content[version] = '2.13';
fs.writeFileSync(path.resolve(__dirname, '../../examples/versions.json'), JSON.stringify(content));
