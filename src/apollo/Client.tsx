import { ApolloClient, InMemoryCache,ApolloLink, 
    ApolloProvider,createHttpLink, TypePolicies } from '@apollo/client';
import {createAuthLink,AuthOptions, AUTH_TYPE} from 'aws-appsync-auth-link'
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import config from '../aws-exports'
import { commentsByPost } from '../graphql/queries';
import { useAuthContext } from '../contexts/AuthContext';
import { useMemo } from 'react';

interface IClient {
    children: React.ReactNode
}


const url=config.aws_appsync_graphqlEndpoint;
const region=config.aws_appsync_region;

const httpLink =createHttpLink({uri:url})


const mergeList =(existing={items:[]},incoming={items:[]}) =>{
    return {
        ...existing,
        ...incoming,
        items:[...(existing.items||[]),...incoming.items]
    }
}

const typePolicies:TypePolicies = {
    Query:{
        fields: {
            commentsByPost:{
                keyArgs:['postID','createdAt','sortDirection','filter'],
                merge:mergeList
            },
            postsByDate:{
                keyArgs:['type','createdAt','sortDirection','filter'],
                merge:mergeList
            }
        }
    }
}

const Client = ({children}:IClient)=>{
    const {user}=useAuthContext()

       const client = useMemo(()=>{ //se ejecuta al cambiar el usario -> cogemos el token que nos crean
        const jwtToken = user?.getSignInUserSession()?.getAccessToken().getJwtToken() ||''
        const auth: AuthOptions={
            // type:config.aws_appsync_authenticationType as AUTH_TYPE.API_KEY,
            // apiKey:config.aws_appsync_apiKey
            type:config.aws_appsync_authenticationType as AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
            jwtToken,
        }
        const link =ApolloLink.from([
            createAuthLink({url, region, auth}),
            createSubscriptionHandshakeLink({url, region, auth},httpLink)
        ])
        
         return  new ApolloClient({
            link,
            cache: new InMemoryCache({typePolicies}), //cache en el móvil
           });
    
       },[user])
 return(
    <ApolloProvider client={client}>
    {children}
    </ApolloProvider>
)
}
export default Client;