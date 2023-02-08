// We use the gql tag to parse our query string into a query document
import {gql} from "apollo-angular";

const QUERY_ALL_MESSAGES = gql`
  query Messages($id: String!)
  {
    messages(id: $id)  {
      content,
      from,
      to,
      roomId
    }
  }
`

const QUERY_ALL_CHATROOM = gql`
  query Chatrooms
  {
    chatrooms{
      id,
      name,
      type,
      users{
        id,
        firstname,
        lastname,
        email,

      }
    }
  }
`

const QUERY_ALL_USERS = gql`
  query users{
    users{
      id,
      firstname,
      lastname,
      email,
    }
  }
`

const QUERY_ONE_CHATROOM = gql`
  query Chatroom($id: String!){
    chatroom(id: $id)
    {
      id,
      name,
      type,
      users{
        id,
        firstname,
        lastname,
        email,

      }
    }
  }
`

const MUTATION_LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(
      email:$email,
      password: $password
    ){
      token
    }
  }
`

const MUTATION_SIGNUP = gql`
  mutation signup($email: String!, $password: String!, $firstname: String = "",
    $lastname: String = "", $passwordRepeat: String!) {
    signup(
      firstname: $firstname,
      lastname: $lastname,
      email: $email ,
      password: $password,
      passwordRepeat: $passwordRepeat
    ){
      token
    }
  }
`

const MUTATION_UPDATE_CHATROOM = gql`
  mutation updateRoom($id : String!, $name: String!, $users: [String!]!, $privateRoom: Boolean!){
    updateChatroom(
      updateChatroomInput: {
        id: $id,
        name:$name,
        privateRoom: $privateRoom,
        users: $users
      }
    ){
      id,
      name,
      type,
      users{
        id,
        firstname,
        lastname
      }
    }
  }
`

const MUTATION_CREATE_CHATROOM = gql`
  mutation createRoom($name: String!, $users: [String!]!, $privateRoom: Boolean!){
    createChatroom(
      createChatroomInput: {
        name:$name,
        privateRoom: $privateRoom,
        users: $users
      }
    ){
      id,
      name,
      type,
      users{
        id,
        firstname,
        lastname
      }
    }
  }
`

const MUTATION_DELETE_CHATROOM = gql`
  mutation deleteChatroom ($roomId:String!){
    removeChatroom(
      id:$roomId
    ){
      id
    }
  }
`

const WHO_AM_I = gql`
  query whoAmI {
    whoAmI
    {
      id,
      firstname,
      lastname,
      email,
      role
    }
  }
`

const SUBSCRIPTION_NEW_MESSAGE = gql`
  subscription newMessage($roomId : String!) {
    newMessage (roomId: $roomId) {
      content
      from
      roomId
      to
    }
  }
`

const SUBSCRIPTION_NEW_MINDMAP = gql`
    subscription newMindmap($roomId : String!) {
        newMindmap (roomId: $roomId) {
            title,
            parent_id,
            chatroom_id
            children{
                id,
                title,
                parent_id,
                chatroom_id
            }
        }
    }
`

const MUTATION_CREATE_MESSAGE = gql`
  mutation createMessage($content: String!,$from: String!, $roomId:String!){
    createMessage(
      createMessageInput: {
        content: $content,
        from: $from,
        roomId:$roomId
      }
    ){
      content, from, to, roomId
    }
  }
`
const MUTATION_UPDATE_PROFILE = gql`
  mutation updateUser($id: String!, $firstname: String!, $lastname: String!,
    $email: String!, $oldPassword: String!,
    $newPassword: String!,  $newPasswordRepeat: String!){
    updateUser(
      updateUserInput: {
        id: $id,
        firstname: $firstname,
        lastname: $lastname,
        email:$email,
        oldPassword: $oldPassword ,
        newPassword: $newPassword,
        newPasswordRepeat: $newPasswordRepeat
      }
    ){
      email,
      firstname,
      lastname,
      email
    }
  }
`
const MUTATION_DELETE_PROFILE = gql`
  mutation deleteUser($id:String!){
    deleteUser(id:$id){
    deleted
    }
  }
`
