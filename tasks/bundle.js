'use strict';

let path = require('path');
let jetpack = require('fs-jetpack');
let rollup = require('rollup').rollup;

let nodeBuiltInModules = ['assert', 'buffer', 'child_process', 'cluster',
    'console', 'constants', 'crypto', 'dgram', 'dns', 'domain', 'events',
    'fs', 'http', 'https', 'module', 'net', 'os', 'path', 'process', 'punycode',
    'querystring', 'readline', 'repl', 'stream', 'string_decoder', 'timers',
    'tls', 'tty', 'url', 'util', 'v8', 'vm', 'zlib'];

let electronBuiltInModules = ['electron'];

let generateExternalModulesList = function () {
    let appManifest = jetpack.read('./package.json', 'json');
    return [].concat(
        nodeBuiltInModules,
        electronBuiltInModules,
        Object.keys(appManifest.dependencies),
        Object.keys(appManifest.devDependencies)
    );
};

let cached = {};

module.exports = function (src, dest, opts) {
    opts = opts || {};
    opts.rollupPlugins = opts.rollupPlugins || [];
    return rollup({
        entry: src,
        external: generateExternalModulesList(),
        cache: cached[src],
        plugins: opts.rollupPlugins,
    })
    .then(function (bundle) {
        cached[src] = bundle;

        let jsFile = path.basename(dest);
        let result = bundle.generate({
            format: 'cjs',
            sourceMap: true,
            sourceMapFile: jsFile,
        });
        // Wrap code in self invoking function so the letiables don't
        // pollute the global namespace.
        let isolatedCode = '(function () {' + result.code + '\n}());';
        return Promise.all([
            jetpack.writeAsync(dest, isolatedCode + '\n//# sourceMappingURL=' + jsFile + '.map'),
            jetpack.writeAsync(dest + '.map', result.map.toString()),
        ]);
    });
};
