/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient();
// User es el nombre de una tabla en schema.graphql
// env puede ser ´staging' o 'development'. Este en 'Configuracion'.'Environment variables'
// el Id esta en AWS AppSync,API -> aparecen todas las APIs. Que es el mismo para
// User, Like, Comment, Post
const env=process.env.ENV
const AppsyncID=process.env.API_ROBINSTAGRAMTSAWS_GRAPHQLAPIIDOUTPUT
const TableName =`User-${AppsyncID}-${env}`

const userExists= async (id)=>{
  //console.log(`Dentro de funcion userExists y la tabla es: ${TableName}`)
  //console.log(`Dentro de funcion userExists y el id es: ${id}`)
  const params = {
    TableName,
    Key: id,
  };
  try {
    // get devuelve un 'callback' y lo convertimos a 'promise' pasa usar 'await'
    const response =await docClient.get(params).promise()
    return !!response?.Item //sólo si es un valor 'truthy'-> !! lo convierte en booleano
  } catch (e) {
    return false;
  }
}

const saveUser=async (user)=>{
 // console.log(`Dentro de funcion saveUser y la tabla es: ${TableName}`)
 // console.log(`Dentro de funcion saveUser y el user.id es: ${user?.id} el user.name es: ${user?.name} el user.email es: ${user?.name}`)

  const date =new Date();
  const dateStr=date.toISOString();
  const timestamp=date.getTime();
  //console.log(`Dentro de funcion saveUser y dateStr es: ${dateStr}`)
  //console.log(`Dentro de funcion saveUser y timestamp es: ${timestamp}`)
  // vamos a DynamoDB y vemos que campos tiene la tabla
  const Item ={
    ...user, 
    __typename:'User',
    _version:1,
    _lastChangedAt:timestamp ,
    updatedAt:dateStr,
    createdAt:dateStr,

  }
  const params = {
    TableName,
     Item,
  };
  console.log(`Dentro de funcion saveUser y los params son -id-: ${params.Item.id}`)

  try {
      // get devuelve un 'callback' y lo convertimos a 'promise' pasa usar 'await'
      const response =await docClient.put(params).promise()
      //console.log(`Dentro de funcion saveUser,tras llamar a -docClient.put(params).promise()- y la respuest es: ${response}`)


  } catch (e) {console.log(e)
    console.log(`Error Dentro de funcion saveUser,tras llamar a -docClient.put(params).promise()- y 'e' es: ${e}`)
  }
 
}

exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger 
  console.log("roberto.....Funciona la funcion lambda")
  console.log(event)

  if(!event?.request?.userAttributes){
    console.log('No user data available')
    return;
  }
  // the lambda signUp function is called twice or more: let's register only first time
 
 // console.log(event.request)
 // console.log(event.request.userAttributes)

  const {sub,email,name} = event.request.userAttributes //{sub,email,name}
 // console.log(event.request.userAttributes.sub) 

  const newUser={
    id:sub,
   // antes owner: userAttributes.sub,   
    owner:sub,
    name,
    email,
    nofPosts:0,
    nofFollowers:0,
    nofFollowings:0,
  }
  console.log(`Dentro de funcion -exports.handler- y el newUser es: ${newUser}`)

  if( !(await userExists(newUser.id))){ 
    await saveUser(newUser)
    console.log(`User ${newUser.id} has been saved to the database`)} 
  else{
    console.log(`User ${newUser.id} already exists`)}
  return event
};
