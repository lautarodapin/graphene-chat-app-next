import gql from "graphql-tag"

export const USER_FRAGMENT = gql`
fragment User on UserType {
    id
    username
    firstName
    lastName
    emailisStaff
    isActive
    isSuperuser
    lastLogin
    dateJoined
    activeRooms {
        id
    }
}`

export const USER_QUERY = gql`
${USER_FRAGMENT}
query user($id: ID!) {
    user(id: $id) {
        ...User
    }
}`

export const USERS_QUERY = gql`
${USER_FRAGMENT}
query users() {
    users {
        ...User
    }
}`


export const VERIFY_TOKEN_QUERY = gql`
mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
        payload
    }
}
`

export const LOGIN_MUTATION = gql`
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
export const TOKEN_AUTH_MUTATION = gql`
mutation Login($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
        token
    }
}`
