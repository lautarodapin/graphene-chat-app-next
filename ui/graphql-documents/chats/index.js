import gql from "graphql-tag"

export const CHAT = gql`
fragment ChatRoom on ChatRoomType {
    id
    chatName
    createdAt
    modAt
    createdBy {
        id
        username
        email
    }
    modBy {
        id
        username
        email
    }
}`

export const CHATS = gql`
${CHAT}
query Chats {
    chats {
        ...ChatRoom
    }
}`

export const CHAT_QUERY = gql`
${CHAT}
query Chat($id: ID!) {
    chat(id: $id) {
        ...ChatRoom
    }
}`

export const JOIN_CHAT_MUTATION = gql`
mutation JoinChat($input: JoinChatMutationInput!) {
    joinChat(input: $input) {
        chatRoom
        join
        errors {
            field
            messages
        }
    }
}`
