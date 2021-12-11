import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  GenericScalar: any;
};

export type ChatType = {
  __typename?: 'ChatType';
  activeUsers: Array<UserType>;
  chatName?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<UserType>;
  id: Scalars['ID'];
  lastMessage?: Maybe<MessageType>;
  messages: Array<MessageType>;
  modAt: Scalars['DateTime'];
  modBy?: Maybe<UserType>;
};

export type ErrorType = {
  __typename?: 'ErrorType';
  field: Scalars['String'];
  messages: Array<Scalars['String']>;
};

export type FiltersInput = {
  page?: Scalars['Int'];
  pageSize?: InputMaybe<Scalars['Int']>;
};

export type JoinChatInput = {
  chat: Scalars['String'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  join?: InputMaybe<Scalars['Boolean']>;
};

export type JoinChatPayload = {
  __typename?: 'JoinChatPayload';
  chat: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Maybe<ErrorType>>>;
  join?: Maybe<Scalars['Boolean']>;
};

export type Login = {
  __typename?: 'Login';
  errors?: Maybe<Array<Maybe<ErrorType>>>;
  user?: Maybe<UserType>;
};

export type Logout = {
  __typename?: 'Logout';
  ok: Scalars['Boolean'];
};

export type MessageListType = {
  __typename?: 'MessageListType';
  count: Scalars['Int'];
  hasMore: Scalars['Boolean'];
  items: Array<MessageType>;
};

export type MessageType = PaginationType & {
  __typename?: 'MessageType';
  chat: ChatType;
  count?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<UserType>;
  hasMore?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  message: Scalars['String'];
  modAt: Scalars['DateTime'];
  modBy?: Maybe<UserType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  joinChat?: Maybe<JoinChatPayload>;
  login?: Maybe<Login>;
  logout?: Maybe<Logout>;
  refreshToken?: Maybe<Refresh>;
  register?: Maybe<RegisterPayload>;
  sendMessage?: Maybe<SendMessagePayload>;
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  verifyToken?: Maybe<Verify>;
};


export type MutationJoinChatArgs = {
  input: JoinChatInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRefreshTokenArgs = {
  token: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationSendMessageArgs = {
  input: SendMessageInput;
};


export type MutationTokenAuthArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationVerifyTokenArgs = {
  token: Scalars['String'];
};

export type ObtainJsonWebToken = {
  __typename?: 'ObtainJSONWebToken';
  token?: Maybe<Scalars['String']>;
};

export type OnNewMessage = {
  __typename?: 'OnNewMessage';
  chat: ChatType;
  message: MessageType;
  sender: UserType;
};

export type PaginationType = {
  count?: Maybe<Scalars['Int']>;
  hasMore?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  chat?: Maybe<ChatType>;
  chats?: Maybe<Array<ChatType>>;
  hello?: Maybe<Scalars['String']>;
  history?: Maybe<MessageListType>;
  user?: Maybe<UserType>;
  users?: Maybe<Array<UserType>>;
};


export type QueryChatArgs = {
  id: Scalars['ID'];
};


export type QueryHistoryArgs = {
  chat: Scalars['ID'];
  filters?: InputMaybe<FiltersInput>;
};

export type Refresh = {
  __typename?: 'Refresh';
  payload?: Maybe<Scalars['GenericScalar']>;
  token?: Maybe<Scalars['String']>;
};

export type RegisterInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  password1: Scalars['String'];
  password2: Scalars['String'];
  username: Scalars['String'];
};

export type RegisterPayload = {
  __typename?: 'RegisterPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Maybe<ErrorType>>>;
  user?: Maybe<UserType>;
};

export type SendMessageInput = {
  chat: Scalars['ID'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  message: Scalars['String'];
};

export type SendMessagePayload = {
  __typename?: 'SendMessagePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Maybe<ErrorType>>>;
  message?: Maybe<MessageType>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onNewMessage?: Maybe<OnNewMessage>;
};


export type SubscriptionOnNewMessageArgs = {
  chat: Scalars['ID'];
};

export type UserType = {
  __typename?: 'UserType';
  activeChats: Array<ChatType>;
  dateJoined: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isStaff: Scalars['Boolean'];
  isSuperuser: Scalars['Boolean'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  lastName: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Verify = {
  __typename?: 'Verify';
  payload?: Maybe<Scalars['GenericScalar']>;
};

export type MinimalChatFragment = { __typename?: 'ChatType', id: string, chatName?: string | null | undefined, lastMessage?: { __typename?: 'MessageType', id: string, createdAt: any, modAt: any, message: string, createdBy?: { __typename?: 'UserType', id: string, username: string, firstName: string, lastName: string, email: string } | null | undefined, chat: { __typename?: 'ChatType', id: string }, modBy?: { __typename?: 'UserType', id: string } | null | undefined } | null | undefined };

export type ChatFragment = { __typename?: 'ChatType', createdAt: any, modAt: any, id: string, chatName?: string | null | undefined, createdBy?: { __typename?: 'UserType', id: string, username: string, firstName: string, lastName: string, email: string } | null | undefined, modBy?: { __typename?: 'UserType', id: string, username: string, firstName: string, lastName: string, email: string } | null | undefined, activeUsers: Array<{ __typename?: 'UserType', id: string, username: string, firstName: string, lastName: string, email: string }>, lastMessage?: { __typename?: 'MessageType', id: string, createdAt: any, modAt: any, message: string, createdBy?: { __typename?: 'UserType', id: string, username: string, firstName: string, lastName: string, email: string } | null | undefined, chat: { __typename?: 'ChatType', id: string }, modBy?: { __typename?: 'UserType', id: string } | null | undefined } | null | undefined };

export type ChatQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ChatQuery = { __typename?: 'Query', chat?: { __typename?: 'ChatType', createdAt: any, modAt: any, id: string, chatName?: string | null | undefined, createdBy?: { __typename?: 'UserType', id: string, username: string, firstName: string, lastName: string, email: string } | null | undefined, modBy?: { __typename?: 'UserType', id: string, username: string, firstName: string, lastName: string, email: string } | null | undefined, activeUsers: Array<{ __typename?: 'UserType', id: string, username: string, firstName: string, lastName: string, email: string }>, lastMessage?: { __typename?: 'MessageType', id: string, createdAt: any, modAt: any, message: string, createdBy?: { __typename?: 'UserType', id: string, username: string, firstName: string, lastName: string, email: string } | null | undefined, chat: { __typename?: 'ChatType', id: string }, modBy?: { __typename?: 'UserType', id: string } | null | undefined } | null | undefined } | null | undefined };

export type ChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type ChatsQuery = { __typename?: 'Query', chats?: Array<{ __typename?: 'ChatType', id: string, chatName?: string | null | undefined, lastMessage?: { __typename?: 'MessageType', id: string, createdAt: any, modAt: any, message: string, createdBy?: { __typename?: 'UserType', id: string, username: string, firstName: string, lastName: string, email: string } | null | undefined, chat: { __typename?: 'ChatType', id: string }, modBy?: { __typename?: 'UserType', id: string } | null | undefined } | null | undefined }> | null | undefined };

export type JoinChatMutationVariables = Exact<{
  input: JoinChatInput;
}>;


export type JoinChatMutation = { __typename?: 'Mutation', joinChat?: { __typename?: 'JoinChatPayload', chat: string, join?: boolean | null | undefined, errors?: Array<{ __typename?: 'ErrorType', messages: Array<string>, field: string } | null | undefined> | null | undefined } | null | undefined };

export type OnNewMessageSubscriptionVariables = Exact<{
  chat: Scalars['ID'];
}>;


export type OnNewMessageSubscription = { __typename?: 'Subscription', onNewMessage?: { __typename?: 'OnNewMessage', sender: { __typename?: 'UserType', id: string, username: string, firstName: string, lastName: string, email: string }, chat: { __typename?: 'ChatType', id: string, chatName?: string | null | undefined, lastMessage?: { __typename?: 'MessageType', id: string, createdAt: any, modAt: any, message: string, createdBy?: { __typename?: 'UserType', id: string, username: string, firstName: string, lastName: string, email: string } | null | undefined, chat: { __typename?: 'ChatType', id: string }, modBy?: { __typename?: 'UserType', id: string } | null | undefined } | null | undefined }, message: { __typename?: 'MessageType', id: string, createdAt: any, modAt: any, message: string, createdBy?: { __typename?: 'UserType', id: string, username: string, firstName: string, lastName: string, email: string } | null | undefined, modBy?: { __typename?: 'UserType', id: string, username: string, firstName: string, lastName: string, email: string } | null | undefined, chat: { __typename?: 'ChatType', id: string, chatName?: string | null | undefined, lastMessage?: { __typename?: 'MessageType', id: string, createdAt: any, modAt: any, message: string, createdBy?: { __typename?: 'UserType', id: string, username: string, firstName: string, lastName: string, email: string } | null | undefined, chat: { __typename?: 'ChatType', id: string }, modBy?: { __typename?: 'UserType', id: string } | null | undefined } | null | undefined } } } | null | undefined };

export type MinimalMessageFragment = { __typename?: 'MessageType', id: string, createdAt: any, modAt: any, message: string, chat: { __typename?: 'ChatType', id: string }, createdBy?: { __typename?: 'UserType', id: string } | null | undefined, modBy?: { __typename?: 'UserType', id: string } | null | undefined };

export type MessageFragment = { __typename?: 'MessageType', id: string, createdAt: any, modAt: any, message: string, createdBy?: { __typename?: 'UserType', id: string, username: string, firstName: string, lastName: string, email: string } | null | undefined, modBy?: { __typename?: 'UserType', id: string, username: string, firstName: string, lastName: string, email: string } | null | undefined, chat: { __typename?: 'ChatType', id: string, chatName?: string | null | undefined, lastMessage?: { __typename?: 'MessageType', id: string, createdAt: any, modAt: any, message: string, createdBy?: { __typename?: 'UserType', id: string, username: string, firstName: string, lastName: string, email: string } | null | undefined, chat: { __typename?: 'ChatType', id: string }, modBy?: { __typename?: 'UserType', id: string } | null | undefined } | null | undefined } };

export type HistoryQueryVariables = Exact<{
  chat: Scalars['ID'];
  filters?: InputMaybe<FiltersInput>;
}>;


export type HistoryQuery = { __typename?: 'Query', history?: { __typename?: 'MessageListType', count: number, hasMore: boolean, items: Array<{ __typename?: 'MessageType', id: string, createdAt: any, modAt: any, message: string, createdBy?: { __typename?: 'UserType', id: string, username: string, firstName: string, lastName: string, email: string } | null | undefined, modBy?: { __typename?: 'UserType', id: string, username: string, firstName: string, lastName: string, email: string } | null | undefined, chat: { __typename?: 'ChatType', id: string, chatName?: string | null | undefined, lastMessage?: { __typename?: 'MessageType', id: string, createdAt: any, modAt: any, message: string, createdBy?: { __typename?: 'UserType', id: string, username: string, firstName: string, lastName: string, email: string } | null | undefined, chat: { __typename?: 'ChatType', id: string }, modBy?: { __typename?: 'UserType', id: string } | null | undefined } | null | undefined } }> } | null | undefined };

export type SendMessageMutationVariables = Exact<{
  input: SendMessageInput;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage?: { __typename?: 'SendMessagePayload', message?: { __typename?: 'MessageType', id: string, createdAt: any, modAt: any, message: string, createdBy?: { __typename?: 'UserType', id: string, username: string, firstName: string, lastName: string, email: string } | null | undefined, modBy?: { __typename?: 'UserType', id: string, username: string, firstName: string, lastName: string, email: string } | null | undefined, chat: { __typename?: 'ChatType', id: string, chatName?: string | null | undefined, lastMessage?: { __typename?: 'MessageType', id: string, createdAt: any, modAt: any, message: string, createdBy?: { __typename?: 'UserType', id: string, username: string, firstName: string, lastName: string, email: string } | null | undefined, chat: { __typename?: 'ChatType', id: string }, modBy?: { __typename?: 'UserType', id: string } | null | undefined } | null | undefined } } | null | undefined, errors?: Array<{ __typename?: 'ErrorType', messages: Array<string>, field: string } | null | undefined> | null | undefined } | null | undefined };

export type MinimalUserFragment = { __typename?: 'UserType', id: string, username: string, firstName: string, lastName: string, email: string };

export type UserFragment = { __typename?: 'UserType', lastLogin?: any | null | undefined, isSuperuser: boolean, isStaff: boolean, isActive: boolean, dateJoined: any, id: string, username: string, firstName: string, lastName: string, email: string, activeChats: Array<{ __typename?: 'ChatType', id: string }> };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'UserType', lastLogin?: any | null | undefined, isSuperuser: boolean, isStaff: boolean, isActive: boolean, dateJoined: any, id: string, username: string, firstName: string, lastName: string, email: string, activeChats: Array<{ __typename?: 'ChatType', id: string }> } | null | undefined };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'UserType', id: string, username: string, firstName: string, lastName: string, email: string }> | null | undefined };

export type ErrorFragment = { __typename?: 'ErrorType', messages: Array<string>, field: string };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'Login', user?: { __typename?: 'UserType', lastLogin?: any | null | undefined, isSuperuser: boolean, isStaff: boolean, isActive: boolean, dateJoined: any, id: string, username: string, firstName: string, lastName: string, email: string, activeChats: Array<{ __typename?: 'ChatType', id: string }> } | null | undefined, errors?: Array<{ __typename?: 'ErrorType', messages: Array<string>, field: string } | null | undefined> | null | undefined } | null | undefined };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: { __typename?: 'Logout', ok: boolean } | null | undefined };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'RegisterPayload', user?: { __typename?: 'UserType', lastLogin?: any | null | undefined, isSuperuser: boolean, isStaff: boolean, isActive: boolean, dateJoined: any, id: string, username: string, firstName: string, lastName: string, email: string, activeChats: Array<{ __typename?: 'ChatType', id: string }> } | null | undefined, errors?: Array<{ __typename?: 'ErrorType', messages: Array<string>, field: string } | null | undefined> | null | undefined } | null | undefined };

export type TokenAuthMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type TokenAuthMutation = { __typename?: 'Mutation', tokenAuth?: { __typename?: 'ObtainJSONWebToken', token?: string | null | undefined } | null | undefined };

export const MinimalMessageFragmentDoc = gql`
    fragment MinimalMessage on MessageType {
  id
  createdAt
  modAt
  message
  chat {
    id
  }
  createdBy {
    id
  }
  modBy {
    id
  }
}
    `;
export const MinimalUserFragmentDoc = gql`
    fragment MinimalUser on UserType {
  id
  username
  firstName
  lastName
  email
}
    `;
export const MinimalChatFragmentDoc = gql`
    fragment MinimalChat on ChatType {
  id
  chatName
  lastMessage {
    ...MinimalMessage
    createdBy {
      ...MinimalUser
    }
  }
}
    ${MinimalMessageFragmentDoc}
${MinimalUserFragmentDoc}`;
export const ChatFragmentDoc = gql`
    fragment Chat on ChatType {
  ...MinimalChat
  createdAt
  modAt
  createdBy {
    ...MinimalUser
  }
  modBy {
    ...MinimalUser
  }
  activeUsers {
    ...MinimalUser
  }
}
    ${MinimalChatFragmentDoc}
${MinimalUserFragmentDoc}`;
export const MessageFragmentDoc = gql`
    fragment Message on MessageType {
  ...MinimalMessage
  createdBy {
    ...MinimalUser
  }
  modBy {
    ...MinimalUser
  }
  chat {
    ...MinimalChat
  }
}
    ${MinimalMessageFragmentDoc}
${MinimalUserFragmentDoc}
${MinimalChatFragmentDoc}`;
export const UserFragmentDoc = gql`
    fragment User on UserType {
  ...MinimalUser
  lastLogin
  isSuperuser
  isStaff
  isActive
  dateJoined
  activeChats {
    id
  }
}
    ${MinimalUserFragmentDoc}`;
export const ErrorFragmentDoc = gql`
    fragment Error on ErrorType {
  messages
  field
}
    `;
export const ChatDocument = gql`
    query Chat($id: ID!) {
  chat(id: $id) {
    ...Chat
  }
}
    ${ChatFragmentDoc}`;

/**
 * __useChatQuery__
 *
 * To run a query within a React component, call `useChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useChatQuery(baseOptions: Apollo.QueryHookOptions<ChatQuery, ChatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChatQuery, ChatQueryVariables>(ChatDocument, options);
      }
export function useChatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatQuery, ChatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChatQuery, ChatQueryVariables>(ChatDocument, options);
        }
export type ChatQueryHookResult = ReturnType<typeof useChatQuery>;
export type ChatLazyQueryHookResult = ReturnType<typeof useChatLazyQuery>;
export type ChatQueryResult = Apollo.QueryResult<ChatQuery, ChatQueryVariables>;
export const ChatsDocument = gql`
    query Chats {
  chats {
    ...MinimalChat
  }
}
    ${MinimalChatFragmentDoc}`;

/**
 * __useChatsQuery__
 *
 * To run a query within a React component, call `useChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useChatsQuery(baseOptions?: Apollo.QueryHookOptions<ChatsQuery, ChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChatsQuery, ChatsQueryVariables>(ChatsDocument, options);
      }
export function useChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatsQuery, ChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChatsQuery, ChatsQueryVariables>(ChatsDocument, options);
        }
export type ChatsQueryHookResult = ReturnType<typeof useChatsQuery>;
export type ChatsLazyQueryHookResult = ReturnType<typeof useChatsLazyQuery>;
export type ChatsQueryResult = Apollo.QueryResult<ChatsQuery, ChatsQueryVariables>;
export const JoinChatDocument = gql`
    mutation JoinChat($input: JoinChatInput!) {
  joinChat(input: $input) {
    chat
    join
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type JoinChatMutationFn = Apollo.MutationFunction<JoinChatMutation, JoinChatMutationVariables>;

/**
 * __useJoinChatMutation__
 *
 * To run a mutation, you first call `useJoinChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinChatMutation, { data, loading, error }] = useJoinChatMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useJoinChatMutation(baseOptions?: Apollo.MutationHookOptions<JoinChatMutation, JoinChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinChatMutation, JoinChatMutationVariables>(JoinChatDocument, options);
      }
export type JoinChatMutationHookResult = ReturnType<typeof useJoinChatMutation>;
export type JoinChatMutationResult = Apollo.MutationResult<JoinChatMutation>;
export type JoinChatMutationOptions = Apollo.BaseMutationOptions<JoinChatMutation, JoinChatMutationVariables>;
export const OnNewMessageDocument = gql`
    subscription OnNewMessage($chat: ID!) {
  onNewMessage(chat: $chat) {
    sender {
      ...MinimalUser
    }
    chat {
      ...MinimalChat
    }
    message {
      ...Message
    }
  }
}
    ${MinimalUserFragmentDoc}
${MinimalChatFragmentDoc}
${MessageFragmentDoc}`;

/**
 * __useOnNewMessageSubscription__
 *
 * To run a query within a React component, call `useOnNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnNewMessageSubscription({
 *   variables: {
 *      chat: // value for 'chat'
 *   },
 * });
 */
export function useOnNewMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<OnNewMessageSubscription, OnNewMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnNewMessageSubscription, OnNewMessageSubscriptionVariables>(OnNewMessageDocument, options);
      }
export type OnNewMessageSubscriptionHookResult = ReturnType<typeof useOnNewMessageSubscription>;
export type OnNewMessageSubscriptionResult = Apollo.SubscriptionResult<OnNewMessageSubscription>;
export const HistoryDocument = gql`
    query History($chat: ID!, $filters: FiltersInput) {
  history(chat: $chat, filters: $filters) {
    items {
      ...Message
    }
    count
    hasMore
  }
}
    ${MessageFragmentDoc}`;

/**
 * __useHistoryQuery__
 *
 * To run a query within a React component, call `useHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHistoryQuery({
 *   variables: {
 *      chat: // value for 'chat'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useHistoryQuery(baseOptions: Apollo.QueryHookOptions<HistoryQuery, HistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HistoryQuery, HistoryQueryVariables>(HistoryDocument, options);
      }
export function useHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HistoryQuery, HistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HistoryQuery, HistoryQueryVariables>(HistoryDocument, options);
        }
export type HistoryQueryHookResult = ReturnType<typeof useHistoryQuery>;
export type HistoryLazyQueryHookResult = ReturnType<typeof useHistoryLazyQuery>;
export type HistoryQueryResult = Apollo.QueryResult<HistoryQuery, HistoryQueryVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($input: SendMessageInput!) {
  sendMessage(input: $input) {
    message {
      ...Message
    }
    errors {
      ...Error
    }
  }
}
    ${MessageFragmentDoc}
${ErrorFragmentDoc}`;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const UserDocument = gql`
    query User {
  user {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    ...MinimalUser
  }
}
    ${MinimalUserFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    user {
      ...User
    }
    errors {
      ...Error
    }
  }
}
    ${UserFragmentDoc}
${ErrorFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    ok
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    user {
      ...User
    }
    errors {
      ...Error
    }
  }
}
    ${UserFragmentDoc}
${ErrorFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const TokenAuthDocument = gql`
    mutation TokenAuth($username: String!, $password: String!) {
  tokenAuth(username: $username, password: $password) {
    token
  }
}
    `;
export type TokenAuthMutationFn = Apollo.MutationFunction<TokenAuthMutation, TokenAuthMutationVariables>;

/**
 * __useTokenAuthMutation__
 *
 * To run a mutation, you first call `useTokenAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTokenAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tokenAuthMutation, { data, loading, error }] = useTokenAuthMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useTokenAuthMutation(baseOptions?: Apollo.MutationHookOptions<TokenAuthMutation, TokenAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TokenAuthMutation, TokenAuthMutationVariables>(TokenAuthDocument, options);
      }
export type TokenAuthMutationHookResult = ReturnType<typeof useTokenAuthMutation>;
export type TokenAuthMutationResult = Apollo.MutationResult<TokenAuthMutation>;
export type TokenAuthMutationOptions = Apollo.BaseMutationOptions<TokenAuthMutation, TokenAuthMutationVariables>;