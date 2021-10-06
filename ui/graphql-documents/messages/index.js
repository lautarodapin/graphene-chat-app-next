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

export const HISTORY_FRAGMENT = gql`
    ${MESSAGE_FRAGMENT}
    fragment ChatMessageList on ChatMessageListType {
        items {
            ...ChatMessage
        }
        count
        hasMore
    }
`

export const HISTORY = gql`
    ${HISTORY_FRAGMENT}
    query History ($chatRoom: ID!, $filters: FiltersInput!){
        history(chatRoom: $chatRoom, filters: $filters) {
            ...ChatMessageList
        }
    }
`

export const SEND_CHAT_MESSAGE = gql`
    mutation SendChatMessage($chatRoom: ID!, $message: String!) {
        sendChatMessage(chatRoom: $chatRoom, message: $message) {
            ok
        }
    }
`


export const ON_NEW_CHAT_MESSAGE = gql`
    ${MESSAGE_FRAGMENT}
    subscription OnNewChatMessage($chatRoom: ID!) {
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
                ...ChatMessage
            }

        }
    }
`