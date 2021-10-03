import gql from "graphql-tag"

export const LOGIN = gql`
mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
        ok
        user {
            id
            username
        }
        token
        refreshToken
    }
}`
export const TOKEN_AUTH = gql`
mutation Login($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
        token
    }
}`

export const VERIFY_TOKEN = gql`
mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
        payload
    }
}
`

export const USER = gql`
query User {
    user {
        id
        username
        email
        isStaff
        isSuperuser
    }
}
`
