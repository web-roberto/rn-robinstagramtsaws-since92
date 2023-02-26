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

PRODUCCIÓ: paquete: com.robinstagramtsaws nombre: AlonsoInsta  bundle ios:com.AlonsoInsta.webroberto

## HABIA UN ERROR EN ANDROID: ... DUPLICATED...
SOLUCION: en android/build.gradle
buildscript {
    ext {
        // ...
        kotlin_version = '1.6.10' // <- add this line
    }

    dependencies {
        // ...
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version" // <- add this line
        // ...
    }
}
##  Otro error es cambiar la linea:
Cambiar esta linea por
    implementation "com.facebook.react:react-native:+"  // From node_modules

Por esta (en node_modules/react_native/package.json ver la version, la mia es 0.70.6)
    implementation "com.facebook.react:react-native:0.70.6"  // From node_modules

## BORRAR CACHE DE ANDROID:
cd %USERPROFILE%\.android\cache
rm * /F /Q
npx react-native run-andorid 

# VERSIONES DE GRADLE DISPONIBLES: https://mvnrepository.com/artifact/com.android.tools.build/gradle?repo=google
# instalar Gradle 8 -> https://gradle.org/install/#manually
# brew install gradle
/Users/cash/Desktop/notjustdev/robinstagramtsaws-aws/android/gradle/wrapper
20.36
gradle-8.0.1-all.zip
# Policy: https://www.privacypolicies.com/live/9ad1e6bd-8722-435f-830f-fe7e78cc994f

# GRADLE: https://gradle.org/releases/, brew info gradle-> /usr/local/Cellar/gradle/8.0.1
==> Downloading https://formulae.brew.sh/api/formula.json
# SDK: brew install sdk,brew install --cask android-sdk, sdk list gradle, sdk install gradle 8.0.1, sdk use gradle 8.0.1, sdk default gradle 8.0.1

# EN Podfile(dentro de ios), añadir:

  post_install do |installer|
    react_native_post_install(installer,
      # Set `mac_catalyst_enabled` to `true` in order to apply patches
    # necessary for Mac Catalyst builds
    :mac_catalyst_enabled => false)
    __apply_Xcode_12_5_M1_post_install_workaround(installer)

    # This is necessary for Xcode 14, because it signs resource bundles by default
    # when building for devices.
    installer.target_installation_results.pod_target_installation_results
      .each do |pod_name, target_installation_result|
      target_installation_result.resource_bundle_targets.each do |resource_bundle_target|
        resource_bundle_target.build_configurations.each do |config|
          config.build_settings['CODE_SIGNING_ALLOWED'] = 'NO'
        end
      end
    end
  end

  # en Info.plist, añado
  <key>CFBundleIconName</key>
	<string>AppIcon</string>
  y al final, andes de </dict> añado: 
  <key>ITSAppUsesNonExemptEncryption</key>
<false/>