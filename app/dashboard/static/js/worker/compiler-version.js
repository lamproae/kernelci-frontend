/* globals onmessage: true, postMessage: true */
/**
 * Extract the compilers used for the build.
 *
 * @param {Object} message
**/
onmessage = function(message) {
    'use strict';
    var gCompilers;

    gCompilers = {};

    function parseBuildData(build) {
        var compiler;
        var compilerArray;

        compiler = build.compiler_version_full;
        if (compiler) {
            if (!gCompilers.hasOwnProperty(build.arch)) {
                gCompilers[build.arch] = compilerArray = [];
            } else {
                compilerArray = gCompilers[build.arch];
            }

            if (compilerArray.indexOf(compiler) === -1) {
                compilerArray.push(compiler);
            }
        }
    }

    if (message.data) {
        message.data.forEach(parseBuildData);
    }

    postMessage(gCompilers);
};
