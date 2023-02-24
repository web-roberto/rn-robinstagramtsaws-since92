/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

// module.exports = {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: true,
//       },
//     }),
//   },
// };

// module.exports = {
//   resolver: {
//     blacklistRE: /#current-cloud-backend\/.*/
//   },
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: false,
//       },
//     }),
//   },
// };

// const blacklist = require('metro-config/src/defaults/blacklist');
// module.exports = {
//   resolver: {
//     blacklistRE: blacklist([/#current-cloud-backend\/.*/]),
//   },
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: false,
//       },
//     }),
//   },
// };

const { getDefaultConfig } = require("metro-config");
const { resolver: defaultResolver } = getDefaultConfig.getDefaultValues();
const exclusionList = require('metro-config/src/defaults/exclusionList');
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
  blacklistRE: exclusionList([/#current-cloud-backend\/.*/]),
  sourceExts: [...defaultResolver.sourceExts, "cjs"],
},
};

// video 7.6 SETUP APOLLO CLIENT- LO TENGO COMENTADO PQ A MI NO ME DA ERROR LA APP

// exports.resolver = {
//   ...defaultResolver,
//   sourceExts: [...defaultResolver.sourceExts, "cjs"],
// };