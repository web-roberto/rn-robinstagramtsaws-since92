import 'react-native-get-random-values';
import Navigation from './src/navigation'
import { Amplify} from 'aws-amplify';
import config from './src/aws-exports';
import AuthContextProvider from './src/contexts/AuthContext'
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { Linking } from 'react-native';
import Client from './src/apollo/Client'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {MenuProvider} from 'react-native-popup-menu'
import relativeTime from 'dayjs/plugin/relativeTime';
import * as dayjs from 'dayjs';
dayjs.extend(relativeTime);



const urlOpener= async (url:string, redirectUrl:string)=>{
  await InAppBrowser.isAvailable()
  const response = await InAppBrowser.openAuth(url,redirectUrl,{
    showTitle:false,
    enableUrlBarHiding:true,
    enableDefaultShare:false,
    ephemeralWebSession:false
  })
  if (response.type==='success') {
    Linking.openURL(response.url)
  }
}



//pq no podemos modificar el fichero aws-exports.js
const updatedConfig={...config,
oauth:{...config.oauth,redirectSignIn:'alonsosocialnetwork://',redirectSignOut:'alonsosocialnetwork://',
urlOpener,
}
}

Amplify.configure(updatedConfig);

const App=()=>{
  return (
    <SafeAreaProvider>
      <MenuProvider>
      <AuthContextProvider>
        <Client>
          <Navigation />
        </Client>
      </AuthContextProvider>
      </MenuProvider>
   </SafeAreaProvider>
  )
}
export default App;


