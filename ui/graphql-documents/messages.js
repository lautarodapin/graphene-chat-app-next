import gql from "graphql-tag"
import { MINIMAL_CHAT } from "@/graphql-documents/chats"
import { MINIMAL_USER } from "@/graphql-documents/users"

export const MINIMAL_MESSAGE = gql`
    fragment MinimalMessage on PaginationType {
        id
        createdAt
        message
        chat {
            id
        }
        createdBy {
            id
        }
        count
        hasMore
    }
`

export const MESSAGE = gql`
    ${MINIMAL_MESSAGE}
    ${MINIMAL_USER}
    fragment Message on PaginationType {
        ...MinimalMessage
        createdBy {
            ...MinimalUser
        }
        chat {
            id
            chatName
        }
    }
`

export const MESSAGE_LIST = gql`
    fragment MessageList on ChatMessageListType {
        items {
            ...Message
        }
        count
        hasMore
    }
    ${MESSAGE}
`

export const HISTORY_QUERY = gql`
    query History($chatRoom: ID!, $filters: FiltersInput) {
        ...MessageList
    }
    ${MESSAGE_LIST}
`

export const SEND_MESSAGE_MUTATION = gql`
    mutation SendMessage($input: SendChatMessageMutationInput!) {
        sendChatMessage(input: $input) {
            chatMessage {
                ...Message
            }
            errors {
                field
                messages
            }
        }
    }
    ${MESSAGE}
`
