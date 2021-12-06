import { MINIMAL_MESSAGE } from "@/graphql-documents/messages"
import { MINIMAL_USER } from "@/graphql-documents/users"
import gql from "graphql-tag"

export const MINIMAL_CHAT = gql`
    fragment MinimalChat on ChatRoomType {
        id
        chatName
    }
`

export const CHAT = gql`
    ${MINIMAL_CHAT}
    ${MINIMAL_USER}
    fragment Chat on ChatRoomType {
        ...MinimalChat
        createdAt
        createdBy {
            ...MinimalUser
        }
        modAt
        modBy {
            ...MinimalUser
        }
        activeUsers {
            id
        }
    }
`

export const CHAT_QUERY = gql`
    query Chat($id: ID!) {
        chat(id: $id) {
            ...Chat
        }
    }
    ${CHAT}
`

export const CHATS_QUERY = gql`
    query Chats {
        chats {
            ...MinimalChat
        }
    }
    ${MINIMAL_CHAT}
`

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
    }
`

export const ON_NEW_CHAT_MESSAGE_SUBSCRIPTION = gql`
    subscription OnNewChatMessage($chatRoom: ID!) {
        onNewChatMessage(chatRoom: $chatRoom) {
            sender {
                ...MinimalUser
            }
            chatRoom {
                id
            }
            message {
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
        }
    }
    ${MINIMAL_USER}
`
