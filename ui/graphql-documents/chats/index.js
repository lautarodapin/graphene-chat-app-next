import gql from "graphql-tag"

export const CHAT_FRAGMENT = gql`
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
}
`

export const CHATS = gql`
    ${CHAT_FRAGMENT}
    query Chats {
        chats {
            ...ChatRoom
        }
    }
`

export const CHAT = gql`
    ${CHAT_FRAGMENT}
    query Chat($id: ID!) {
        chat(id: $id) {
            ...ChatRoom
        }
    }
`

export const JOIN_CHAT_MUTATION = gql`
    mutation JoinChat($chatRoom: ID!, $join: Boolean!) {
        joinChat(chatRoom: $chatRoom, join: $join) {
            ok
        }
    }
`
