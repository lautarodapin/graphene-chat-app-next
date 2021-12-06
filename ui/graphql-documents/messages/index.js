const { default: gql } = require("graphql-tag");
const { CHAT_FRAGMENT } = require("../chats");

export const MESSAGE = gql`
    ${CHAT_FRAGMENT}
    fragment ChatMessage on ChatMessageType {
        id
        message
        createdAt
        modAt
        createdBy {
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
    ${MESSAGE}
    fragment ChatMessageList on ChatMessageListType {
        items {
            ...ChatMessage
        }
        count
        hasMore
    }
`

export const HISTORY_QUERY = gql`
    ${HISTORY}
    query History ($chatRoom: ID!, $filters: FiltersInput!){
        history(chatRoom: $chatRoom, filters: $filters) {
            ...ChatMessageList
        }
    }
`

export const SEND_CHAT_MESSAGE_MUTATION = gql`
${MESSAGE}
    mutation SendChatMessage($input: SendChatMessageMutationInput!) {
        sendChatMessage(input: $input) {
            chatMessage {
                ...ChatMessage
            }
            errors {
                field
                messages
            }
        }
    }
`


export const ON_NEW_CHAT_MESSAGE_SUBSCRIPTION = gql`
    ${MESSAGE}
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