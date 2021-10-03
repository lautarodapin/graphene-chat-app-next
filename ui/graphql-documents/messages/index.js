const { default: gql } = require("graphql-tag");
const { CHAT_FRAGMENT } = require("../chats");

export const MESSAGE_FRAGMENT = gql`
    ${CHAT_FRAGMENT}
    fragment ChatMessage on ChatMessageType {
        id
        message
        createdAt
        modAt
        user {
            id
            username
            email
        }
        chat {
            ...ChatRoom
        }
    }
`

export const HISTORY = gql`
    ${MESSAGE_FRAGMENT}
    query History ($chatRoom: String!){
        history(chatRoom: $chatRoom) {
            ...ChatMessage
        }
    }
`

export const SEND_CHAT_MESSAGE = gql`
    mutation SendChatMessage($chatRoom: Int!, $message: String!) {
        sendChatMessage(chatRoom: $chatRoom, message: $message) {
            ok
        }
    }
`


export const ON_NEW_CHAT_MESSAGE = gql`
    subscription OnNewChatMessage($chatRoom: String!) {
        onNewChatMessage(chatRoom: $chatRoom) {
            sender {
                id
                username
                email
            }
            chatRoom {
                id
                chatName
            }
            message {
                id
                createdAt
                user {
                    id
                    username
                    email
                }
            }

        }
    }
`