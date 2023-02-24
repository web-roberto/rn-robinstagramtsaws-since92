# compilar: no arrancar dos veces el servidor (solo una vez 'npm start': METRO)
npm start -- --reset-cache  
npx react-native run-android 
npx pod-install ios && npx react-native run-ios 

# snippet 'rnfc' de 'React Native Snippet' de  Santosh Anand:
# DEBUG-INSTALACIÓN: brew install --cask react-native-debugger
# DEBUG-EJECUCION OTRA CONSOLA: open "rndebugger://set-debugger-loc?host=localhost&port=8081"

# USUARIOS AWS:
 - ROOT: roberto.alonso.reactnative@gmail.com / Full
 - ID: NAME:RobertoNoRoot Pass:Lux..24
 - programatic: amplify-user/Access key ID:,Secret access key  ->  ~/.aws/credentials
   ID KEY:AKIAXVA324ZOKKTT76HG
   SECRET ACCES KEY: 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
   Acceso web usuario:https://robertoalonso.signin.aws.amazon.com/console (alias:robertoalonso)
   https://526191879772.signin.aws.amazon.com/console -> RobertoNoRoot
# yarn global add @aws-amplify/cli necesita: nvm use v16.19.0
# Facebook: https://developers.facebook.com/apps/732698205197922/settings/basic/
   Id Aplicacion:732698205197922  ClaveSecreta:2915d25c539454590b819012fd46cd7f
   App:AlonsoSocialNetwork  user:roberto.alonso.gandia@gmail.com/Adosat2020@
# Google: https://console.cloud.google.com/apis/dashboard?pli=1&project=authfirebase-375922
 ID cliente:135621889159-8380mlvo5mdrkpvg0hr2sg5ub9btvfk4.apps.googleusercontent.com
 secret client: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
 # error  coordinacion package.json de GRAPHQL en AWS y local
 La solución depende de la versión de React Native:
A)
 module.exports = {
  resolver: {
    blacklistRE: /#current-cloud-backend\/.*/
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

B) 
const exclusionList = require('metro-config/src/defaults/exclusionList');
module.exports = {
  resolver: {
    blacklistRE: exclusionList([/#current-cloud-backend\/.*/])
  }
};
And install metro-config as a dev dependency: yarn add metro-config -D

C) 

CONSOLE LOG DEPURACION: console.log(JSON.stringify(organizations, null, 2));

PRODUCCIÓ: paquete: com.robinstagramtsaws nombre: AlonsoInsta  bundle ios:com.alonsoinsta.webroberto