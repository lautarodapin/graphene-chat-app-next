import gql from "graphql-tag"

export const MINIMAL_USER = gql`
    fragment MinimalUser on UserType {
        id
        username
        firstName
        lastName
        email
    }
`

export const USER = gql`
    ${MINIMAL_USER}
    fragment User on UserType {
        ...MinimalUser
        lastLogin
        isSuperuser
        isStaff
        isActive
        dateJoined
        activeRooms {
            id
        }
    }
`

export const USER_QUERY = gql`
    query User {
        user {
            ...User
        }
    }
    ${USER}
`

export const USERS_QUERY = gql`
    query Users {
        users {
            ...MinimalUser
        }
    }
    ${MINIMAL_USER}
`

export const LOGIN_MUTATION = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            user {
                ...User
            }
            errors {
                messages
                field
            }
        }
    }
    ${USER}
`

export const LOGOUT_MUTATION = gql`
    mutation Logout {
        logout {
            ok
        }
    }
`

export const REGISTER_MUTATION = gql`
    mutation Register($input: RegisterMutationInput!) {
        register(input: $input) {
            user {
                ...User
            }
            errors {
                messages
                field
            }
        }
    }
    ${USER}
`

export const TOKEN_AUTH_MUTATION = gql`
    mutation TokenAuth($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
            token
        }
    }
`

export const VERIFY_TOKEN_MUTATION = gql`
    mutation VerifyToken($token: String!) {
        verifyToken(token: $token) {
            payload
        }
    }
`

export const REFRESH_TOKEN_MUTATION = gql`
    mutation RefreshToken($token: String!) {
        refreshToken(token: $token) {
            token
            payload
        }
    }
`