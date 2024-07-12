"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJSScripts = void 0;
var require_1 = require("flex-dev-utils/dist/require");
var flex_dev_utils_1 = require("flex-dev-utils");
var fs_1 = require("fs");
var path_1 = require("path");
var clean_webpack_plugin_1 = __importDefault(require("clean-webpack-plugin"));
var webpack_1 = require("webpack");
var lodash_1 = require("flex-dev-utils/dist/lodash");
var fs_2 = require("flex-dev-utils/dist/fs");
var webpack_2 = require("webpack");
var fs_3 = require("../utils/fs");
var appPath = path_1.join(process.cwd(), 'package.json');
var flexUIPath = path_1.join(process.cwd(), 'node_modules', '@twilio/flex-ui', 'package.json');
var reactPath = path_1.join(process.cwd(), 'node_modules', 'react', 'package.json');
var reactDomPath = path_1.join(process.cwd(), 'node_modules', 'react-dom', 'package.json');
var appPkg = JSON.parse(fs_1.readFileSync(appPath, 'utf8'));
var FLEX_UI_VERSION = JSON.parse(fs_1.readFileSync(flexUIPath, 'utf8')).version;
var REACT_VERSION = JSON.parse(fs_1.readFileSync(reactPath, 'utf8')).version;
var REACT_DOM_VERSION = JSON.parse(fs_1.readFileSync(reactDomPath, 'utf8')).version;
var UNSUPPORTED_PLUGINS = ['SWPrecacheWebpackPlugin', 'ManifestPlugin'];
var FLEX_SHIM = 'flex-plugin-scripts/dev_assets/flex-shim.js';
var CSS_EXTRACT = 'mini-css-extract-plugin';
/**
 * Returns the JS scripts to inject into the index.html file
 * @param flexUIVersion   the flex-ui version
 * @param reactVersion    the react version
 * @param reactDOMVersion the react-dom version
 */
exports.getJSScripts = function (flexUIVersion, reactVersion, reactDOMVersion) {
    if (!flex_dev_utils_1.semver.satisfies(flexUIVersion, '>=1.19.0')) {
        return [
            "<script src=\"https://assets.flex.twilio.com/releases/flex-ui/" + flexUIVersion + "/twilio-flex.min.js\"></script>",
        ];
    }
    return [
        "<script crossorigin src=\"https://unpkg.com/react@" + reactVersion + "/umd/react.development.js\"></script>",
        "<script crossorigin src=\"https://unpkg.com/react-dom@" + reactDOMVersion + "/umd/react-dom.development.js\"></script>",
        "<script src=\"https://assets.flex.twilio.com/releases/flex-ui/" + flexUIVersion + "/twilio-flex.unbundled-react.min.js\"></script>",
    ];
};
/**
 * Configures webpack for building Flex plugins
 *
 * @param config  the {@link WebpackConfig}
 */
var configureWebpack = function (config) {
    require_1.addCWDNodeModule();
    var JSScripts = exports.getJSScripts(FLEX_UI_VERSION, REACT_VERSION, REACT_DOM_VERSION);
    config.output = config.output || {};
    config.plugins = config.plugins || [];
    config.optimization = config.optimization || {};
    config.resolve = config.resolve || {};
    config.devtool = 'cheap-module-source-map';
    config.output.filename = appPkg.name + ".js";
    config.output.chunkFilename = "[name].chunk.js";
    config.plugins = config.plugins
        .filter(function (plugin) { return !UNSUPPORTED_PLUGINS.includes(plugin.constructor.name); })
        .map(function (plugin) {
        if (plugin.constructor.name === 'HtmlWebpackPlugin') {
            plugin.options.inject = false;
            plugin.options.hash = false;
        }
        else if (plugin.constructor.name === 'InterpolateHtmlPlugin') {
            plugin.replacements = __assign(__assign({}, plugin.replacements), { FPM_JS_SCRIPTS: JSScripts.join('\n') });
        }
        return plugin;
    });
    config.resolve.alias = __assign(__assign({}, config.resolve.alias), { '@twilio/flex-ui': FLEX_SHIM });
    config.externals = {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'redux': 'Redux',
        'react-redux': 'ReactRedux',
    };
    config.plugins.push(new clean_webpack_plugin_1.default({
        cleanAfterEveryBuildPatterns: [
            path_1.join(process.cwd(), 'build/service-worker.js'),
            path_1.join(process.cwd(), 'build/precache-manifest*.js'),
            path_1.join(process.cwd(), 'build/index.html'),
        ],
    }));
    // config.plugins.push(new webpack_1.SourceMapDevToolPlugin({
    //     append: '\n//# sourceMappingURL=bundle.js.map',
    // }));
    var pkg = fs_2.readPackageJson();
    config.plugins.push(new webpack_2.DefinePlugin({
        __FPB_PLUGIN_UNIQUE_NAME: "'" + pkg.name + "'",
        __FBP_PLUGIN_VERSION: "'" + pkg.version + "'",
        __FPB_FLEX_PLUGIN_SCRIPTS_VERSION: "'" + fs_2.getDependencyVersion('flex-plugin-scripts') + "'",
        __FPB_FLEX_PLUGIN_VERSION: "'" + fs_2.getDependencyVersion('flex-plugin') + "'",
        __FPB_CRACO_CONFIG_FLEX_PLUGIN_VERSION: "'" + fs_2.getDependencyVersion('craco-config-flex-plugin') + "'",
        __FPB_FLEX_UI_VERSION: "'" + fs_2.getDependencyVersion('@twilio/flex-ui') + "'",
        __FPB_REACT_VERSION: "'" + fs_2.getDependencyVersion('react') + "'",
        __FPB_REACT_DOM_VERSION: "'" + fs_2.getDependencyVersion('react-dom') + "'",
    }));
    config.optimization.splitChunks = false;
    config.optimization.runtimeChunk = false;
    // Allow CSS to be bundled into the minified JS
    if (config.module && config.module.rules && config.mode === 'production') {
        config.module.rules
            .filter(function (rule) { return rule.oneOf; })
            .forEach(function (oneOf) {
            (oneOf.oneOf || [])
                .filter(function (rule) { return rule.use; })
                .map(function (rule) { return rule.use; })
                .forEach(function (use) {
                var index = use.findIndex(function (u) { return u.loader && u.loader.indexOf(CSS_EXTRACT) !== -1; });
                if (index !== -1) {
                    use.splice(index, 1);
                    // @ts-ignore
                    use.unshift(require.resolve('style-loader'));
                }
            });
        });
    }
    return config;
};
exports.default = {
    configure: function (config) {
        config = configureWebpack(config);
        // Now override if jest.config.js exists
        var webpackConfigOverride = fs_3.loadFile(process.cwd(), 'webpack.config.js');
        if (webpackConfigOverride) {
            webpackConfigOverride = lodash_1.clone(webpackConfigOverride);
            delete webpackConfigOverride.devServer;
            config = lodash_1.merge({}, config, webpackConfigOverride);
        }
        return config;
    },
};
//# sourceMappingURL=webpack.js.map