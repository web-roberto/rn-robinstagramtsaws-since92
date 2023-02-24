import { CognitoUser } from "amazon-cognito-identity-js";
import { createContext,Dispatch,ReactNode, SetStateAction, useContext, useState,useEffect } from "react";
import {Auth,Hub} from  'aws-amplify'
import { ActivityIndicator,View } from "react-native";
import { HubCallback } from "@aws-amplify/core";

type UserType = CognitoUser|null|undefined
type AuthContextType ={
    user:UserType,
    userId:string,
   // setUser:Dispatch<SetStateAction<UserType>>, -> subsitutido por eventos
}
const AuthContext =createContext<AuthContextType>({
    user:undefined,
    userId: '',
    //setUser:()=>{} -> subsitutido por eventos
});


const AuthContextProvider =({children}:{children: ReactNode})=>{
    const [user, setUser] = useState<UserType>(undefined)
    console.log('---- AuthContextProvider---- El usuario es:  ',JSON.stringify(user, null, 2));
   // console.log("El usuario es: ",user)
    
    const checkUser= async() =>{
      try {
          const authUser =  await Auth.currentAuthenticatedUser({bypassCache:true})
          setUser(authUser)
      } catch (e) {setUser(null)}
    }

    useEffect(() => {
      checkUser()
    }, [])
    
    useEffect(() => {
      const listener:HubCallback=(data)=>{
        const  {event} =data?.payload;
        if (event==='signOut'){setUser(null)}
        //  console.log(data)
        if (event==='signIn') {checkUser()}

      }


      const escuchador=Hub.listen('auth',listener)
        // DEPRECATED: Hub.listen('auth',listener)
      return ()=>{
        // DEPRECATED: return Hub.remove('auth',listener)
        escuchador()
    }
    }, [])
    
    if (user===undefined){
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator />
            </View>
        )
     }
     console.log('---- El valor de USER dentro de AUTHCONTEXT: ---- user is: ',JSON.stringify(user, null, 2));
   // console.log('El valor de USER dentro de AUTHCONTEXT: ',user)

    return(
        <AuthContext.Provider value={{user,userId:user?.attributes?.sub}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider 
export const useAuthContext =()=> useContext(AuthContext)