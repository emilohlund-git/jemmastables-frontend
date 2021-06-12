import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
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
};

export type Appointment = {
  __typename?: 'Appointment';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  from: Scalars['String'];
  to: Scalars['String'];
  date: Scalars['String'];
  booked: Scalars['Boolean'];
};

export type AppointmentInput = {
  from: Scalars['String'];
  to: Scalars['String'];
  date: Scalars['String'];
  booked: Scalars['Boolean'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Horse = {
  __typename?: 'Horse';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  name: Scalars['String'];
  nickname: Scalars['String'];
  owner: Scalars['String'];
  after: Scalars['String'];
  birthYear: Scalars['Float'];
  gender: Scalars['String'];
  color: Scalars['String'];
  image: Scalars['String'];
  images?: Maybe<Array<Scalars['String']>>;
  category: Scalars['String'];
};

export type HorseInput = {
  name: Scalars['String'];
  nickname: Scalars['String'];
  owner: Scalars['String'];
  after: Scalars['String'];
  birthYear: Scalars['Float'];
  gender: Scalars['String'];
  color: Scalars['String'];
  image: Scalars['String'];
  images?: Maybe<Array<Scalars['String']>>;
  category: Scalars['String'];
};

export type HorseUpdate = {
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  birthYear?: Maybe<Scalars['Float']>;
  gender?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Scalars['String']>>;
  category?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAppointment: Appointment;
  deleteAppointment: Scalars['Boolean'];
  updateAppointment: Appointment;
  createHorse: Horse;
  updateHorse?: Maybe<Horse>;
  deleteHorse: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationCreateAppointmentArgs = {
  input: AppointmentInput;
};


export type MutationDeleteAppointmentArgs = {
  id: Scalars['Float'];
};


export type MutationUpdateAppointmentArgs = {
  booked: Scalars['Boolean'];
  id: Scalars['Float'];
};


export type MutationCreateHorseArgs = {
  input: HorseInput;
};


export type MutationUpdateHorseArgs = {
  input: HorseUpdate;
  id: Scalars['Int'];
};


export type MutationDeleteHorseArgs = {
  id: Scalars['Float'];
};


export type MutationRegisterArgs = {
  options: UserNamePasswordInput;
};


export type MutationLoginArgs = {
  options: UserNamePasswordInput;
};

export type Query = {
  __typename?: 'Query';
  appointments: Array<Appointment>;
  appointment?: Maybe<Appointment>;
  horses: Array<Horse>;
  horsesByCategory: Array<Horse>;
  horse?: Maybe<Horse>;
  horseByName?: Maybe<Horse>;
  user?: Maybe<User>;
};


export type QueryAppointmentArgs = {
  id: Scalars['Float'];
};


export type QueryHorsesByCategoryArgs = {
  category: Scalars['String'];
};


export type QueryHorseArgs = {
  id: Scalars['Float'];
};


export type QueryHorseByNameArgs = {
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserNamePasswordInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularAppointmentFragment = (
  { __typename?: 'Appointment' }
  & Pick<Appointment, 'id' | 'from' | 'to' | 'date' | 'booked'>
);

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularHorseFragment = (
  { __typename?: 'Horse' }
  & Pick<Horse, 'id' | 'name' | 'nickname' | 'owner' | 'after' | 'birthYear' | 'gender' | 'color' | 'image' | 'images' | 'category'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type CreateAppointmentMutationVariables = Exact<{
  input: AppointmentInput;
}>;


export type CreateAppointmentMutation = (
  { __typename?: 'Mutation' }
  & { createAppointment: (
    { __typename?: 'Appointment' }
    & RegularAppointmentFragment
  ) }
);

export type CreateHorseMutationVariables = Exact<{
  input: HorseInput;
}>;


export type CreateHorseMutation = (
  { __typename?: 'Mutation' }
  & { createHorse: (
    { __typename?: 'Horse' }
    & RegularHorseFragment
  ) }
);

export type DeleteHorseMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteHorseMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteHorse'>
);

export type LoginMutationVariables = Exact<{
  options: UserNamePasswordInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: UserNamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type UpdateAppointmentMutationVariables = Exact<{
  id: Scalars['Float'];
  booked: Scalars['Boolean'];
}>;


export type UpdateAppointmentMutation = (
  { __typename?: 'Mutation' }
  & { updateAppointment: (
    { __typename?: 'Appointment' }
    & RegularAppointmentFragment
  ) }
);

export type UpdateHorseMutationVariables = Exact<{
  id: Scalars['Int'];
  input: HorseUpdate;
}>;


export type UpdateHorseMutation = (
  { __typename?: 'Mutation' }
  & { updateHorse?: Maybe<(
    { __typename?: 'Horse' }
    & RegularHorseFragment
  )> }
);

export type AppointmentQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type AppointmentQuery = (
  { __typename?: 'Query' }
  & { appointment?: Maybe<(
    { __typename?: 'Appointment' }
    & RegularAppointmentFragment
  )> }
);

export type AppointmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type AppointmentsQuery = (
  { __typename?: 'Query' }
  & { appointments: Array<(
    { __typename?: 'Appointment' }
    & RegularAppointmentFragment
  )> }
);

export type HorseQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type HorseQuery = (
  { __typename?: 'Query' }
  & { horse?: Maybe<(
    { __typename?: 'Horse' }
    & RegularHorseFragment
  )> }
);

export type HorseByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type HorseByNameQuery = (
  { __typename?: 'Query' }
  & { horseByName?: Maybe<(
    { __typename?: 'Horse' }
    & RegularHorseFragment
  )> }
);

export type HorsesQueryVariables = Exact<{ [key: string]: never; }>;


export type HorsesQuery = (
  { __typename?: 'Query' }
  & { horses: Array<(
    { __typename?: 'Horse' }
    & RegularHorseFragment
  )> }
);

export type HorsesByCategoryQueryVariables = Exact<{
  category: Scalars['String'];
}>;


export type HorsesByCategoryQuery = (
  { __typename?: 'Query' }
  & { horsesByCategory: Array<(
    { __typename?: 'Horse' }
    & RegularHorseFragment
  )> }
);

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export const RegularAppointmentFragmentDoc = gql`
    fragment RegularAppointment on Appointment {
  id
  from
  to
  date
  booked
}
    `;
export const RegularHorseFragmentDoc = gql`
    fragment RegularHorse on Horse {
  id
  name
  nickname
  owner
  after
  birthYear
  gender
  color
  image
  images
  category
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const CreateAppointmentDocument = gql`
    mutation CreateAppointment($input: AppointmentInput!) {
  createAppointment(input: $input) {
    ...RegularAppointment
  }
}
    ${RegularAppointmentFragmentDoc}`;
export type CreateAppointmentMutationFn = Apollo.MutationFunction<CreateAppointmentMutation, CreateAppointmentMutationVariables>;

/**
 * __useCreateAppointmentMutation__
 *
 * To run a mutation, you first call `useCreateAppointmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAppointmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAppointmentMutation, { data, loading, error }] = useCreateAppointmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAppointmentMutation(baseOptions?: Apollo.MutationHookOptions<CreateAppointmentMutation, CreateAppointmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAppointmentMutation, CreateAppointmentMutationVariables>(CreateAppointmentDocument, options);
      }
export type CreateAppointmentMutationHookResult = ReturnType<typeof useCreateAppointmentMutation>;
export type CreateAppointmentMutationResult = Apollo.MutationResult<CreateAppointmentMutation>;
export type CreateAppointmentMutationOptions = Apollo.BaseMutationOptions<CreateAppointmentMutation, CreateAppointmentMutationVariables>;
export const CreateHorseDocument = gql`
    mutation CreateHorse($input: HorseInput!) {
  createHorse(input: $input) {
    ...RegularHorse
  }
}
    ${RegularHorseFragmentDoc}`;
export type CreateHorseMutationFn = Apollo.MutationFunction<CreateHorseMutation, CreateHorseMutationVariables>;

/**
 * __useCreateHorseMutation__
 *
 * To run a mutation, you first call `useCreateHorseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHorseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHorseMutation, { data, loading, error }] = useCreateHorseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateHorseMutation(baseOptions?: Apollo.MutationHookOptions<CreateHorseMutation, CreateHorseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateHorseMutation, CreateHorseMutationVariables>(CreateHorseDocument, options);
      }
export type CreateHorseMutationHookResult = ReturnType<typeof useCreateHorseMutation>;
export type CreateHorseMutationResult = Apollo.MutationResult<CreateHorseMutation>;
export type CreateHorseMutationOptions = Apollo.BaseMutationOptions<CreateHorseMutation, CreateHorseMutationVariables>;
export const DeleteHorseDocument = gql`
    mutation DeleteHorse($id: Float!) {
  deleteHorse(id: $id)
}
    `;
export type DeleteHorseMutationFn = Apollo.MutationFunction<DeleteHorseMutation, DeleteHorseMutationVariables>;

/**
 * __useDeleteHorseMutation__
 *
 * To run a mutation, you first call `useDeleteHorseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHorseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHorseMutation, { data, loading, error }] = useDeleteHorseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteHorseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteHorseMutation, DeleteHorseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteHorseMutation, DeleteHorseMutationVariables>(DeleteHorseDocument, options);
      }
export type DeleteHorseMutationHookResult = ReturnType<typeof useDeleteHorseMutation>;
export type DeleteHorseMutationResult = Apollo.MutationResult<DeleteHorseMutation>;
export type DeleteHorseMutationOptions = Apollo.BaseMutationOptions<DeleteHorseMutation, DeleteHorseMutationVariables>;
export const LoginDocument = gql`
    mutation Login($options: UserNamePasswordInput!) {
  login(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
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
 *      options: // value for 'options'
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
  logout
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
    mutation Register($options: UserNamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
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
 *      options: // value for 'options'
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
export const UpdateAppointmentDocument = gql`
    mutation UpdateAppointment($id: Float!, $booked: Boolean!) {
  updateAppointment(id: $id, booked: $booked) {
    ...RegularAppointment
  }
}
    ${RegularAppointmentFragmentDoc}`;
export type UpdateAppointmentMutationFn = Apollo.MutationFunction<UpdateAppointmentMutation, UpdateAppointmentMutationVariables>;

/**
 * __useUpdateAppointmentMutation__
 *
 * To run a mutation, you first call `useUpdateAppointmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAppointmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAppointmentMutation, { data, loading, error }] = useUpdateAppointmentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      booked: // value for 'booked'
 *   },
 * });
 */
export function useUpdateAppointmentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAppointmentMutation, UpdateAppointmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAppointmentMutation, UpdateAppointmentMutationVariables>(UpdateAppointmentDocument, options);
      }
export type UpdateAppointmentMutationHookResult = ReturnType<typeof useUpdateAppointmentMutation>;
export type UpdateAppointmentMutationResult = Apollo.MutationResult<UpdateAppointmentMutation>;
export type UpdateAppointmentMutationOptions = Apollo.BaseMutationOptions<UpdateAppointmentMutation, UpdateAppointmentMutationVariables>;
export const UpdateHorseDocument = gql`
    mutation updateHorse($id: Int!, $input: HorseUpdate!) {
  updateHorse(id: $id, input: $input) {
    ...RegularHorse
  }
}
    ${RegularHorseFragmentDoc}`;
export type UpdateHorseMutationFn = Apollo.MutationFunction<UpdateHorseMutation, UpdateHorseMutationVariables>;

/**
 * __useUpdateHorseMutation__
 *
 * To run a mutation, you first call `useUpdateHorseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHorseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHorseMutation, { data, loading, error }] = useUpdateHorseMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateHorseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHorseMutation, UpdateHorseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateHorseMutation, UpdateHorseMutationVariables>(UpdateHorseDocument, options);
      }
export type UpdateHorseMutationHookResult = ReturnType<typeof useUpdateHorseMutation>;
export type UpdateHorseMutationResult = Apollo.MutationResult<UpdateHorseMutation>;
export type UpdateHorseMutationOptions = Apollo.BaseMutationOptions<UpdateHorseMutation, UpdateHorseMutationVariables>;
export const AppointmentDocument = gql`
    query Appointment($id: Float!) {
  appointment(id: $id) {
    ...RegularAppointment
  }
}
    ${RegularAppointmentFragmentDoc}`;

/**
 * __useAppointmentQuery__
 *
 * To run a query within a React component, call `useAppointmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppointmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppointmentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAppointmentQuery(baseOptions: Apollo.QueryHookOptions<AppointmentQuery, AppointmentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AppointmentQuery, AppointmentQueryVariables>(AppointmentDocument, options);
      }
export function useAppointmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AppointmentQuery, AppointmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AppointmentQuery, AppointmentQueryVariables>(AppointmentDocument, options);
        }
export type AppointmentQueryHookResult = ReturnType<typeof useAppointmentQuery>;
export type AppointmentLazyQueryHookResult = ReturnType<typeof useAppointmentLazyQuery>;
export type AppointmentQueryResult = Apollo.QueryResult<AppointmentQuery, AppointmentQueryVariables>;
export const AppointmentsDocument = gql`
    query Appointments {
  appointments {
    ...RegularAppointment
  }
}
    ${RegularAppointmentFragmentDoc}`;

/**
 * __useAppointmentsQuery__
 *
 * To run a query within a React component, call `useAppointmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppointmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppointmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAppointmentsQuery(baseOptions?: Apollo.QueryHookOptions<AppointmentsQuery, AppointmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AppointmentsQuery, AppointmentsQueryVariables>(AppointmentsDocument, options);
      }
export function useAppointmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AppointmentsQuery, AppointmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AppointmentsQuery, AppointmentsQueryVariables>(AppointmentsDocument, options);
        }
export type AppointmentsQueryHookResult = ReturnType<typeof useAppointmentsQuery>;
export type AppointmentsLazyQueryHookResult = ReturnType<typeof useAppointmentsLazyQuery>;
export type AppointmentsQueryResult = Apollo.QueryResult<AppointmentsQuery, AppointmentsQueryVariables>;
export const HorseDocument = gql`
    query Horse($id: Float!) {
  horse(id: $id) {
    ...RegularHorse
  }
}
    ${RegularHorseFragmentDoc}`;

/**
 * __useHorseQuery__
 *
 * To run a query within a React component, call `useHorseQuery` and pass it any options that fit your needs.
 * When your component renders, `useHorseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHorseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useHorseQuery(baseOptions: Apollo.QueryHookOptions<HorseQuery, HorseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HorseQuery, HorseQueryVariables>(HorseDocument, options);
      }
export function useHorseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HorseQuery, HorseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HorseQuery, HorseQueryVariables>(HorseDocument, options);
        }
export type HorseQueryHookResult = ReturnType<typeof useHorseQuery>;
export type HorseLazyQueryHookResult = ReturnType<typeof useHorseLazyQuery>;
export type HorseQueryResult = Apollo.QueryResult<HorseQuery, HorseQueryVariables>;
export const HorseByNameDocument = gql`
    query HorseByName($name: String!) {
  horseByName(name: $name) {
    ...RegularHorse
  }
}
    ${RegularHorseFragmentDoc}`;

/**
 * __useHorseByNameQuery__
 *
 * To run a query within a React component, call `useHorseByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useHorseByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHorseByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useHorseByNameQuery(baseOptions: Apollo.QueryHookOptions<HorseByNameQuery, HorseByNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HorseByNameQuery, HorseByNameQueryVariables>(HorseByNameDocument, options);
      }
export function useHorseByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HorseByNameQuery, HorseByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HorseByNameQuery, HorseByNameQueryVariables>(HorseByNameDocument, options);
        }
export type HorseByNameQueryHookResult = ReturnType<typeof useHorseByNameQuery>;
export type HorseByNameLazyQueryHookResult = ReturnType<typeof useHorseByNameLazyQuery>;
export type HorseByNameQueryResult = Apollo.QueryResult<HorseByNameQuery, HorseByNameQueryVariables>;
export const HorsesDocument = gql`
    query Horses {
  horses {
    ...RegularHorse
  }
}
    ${RegularHorseFragmentDoc}`;

/**
 * __useHorsesQuery__
 *
 * To run a query within a React component, call `useHorsesQuery` and pass it any options that fit your needs.
 * When your component renders, `useHorsesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHorsesQuery({
 *   variables: {
 *   },
 * });
 */
export function useHorsesQuery(baseOptions?: Apollo.QueryHookOptions<HorsesQuery, HorsesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HorsesQuery, HorsesQueryVariables>(HorsesDocument, options);
      }
export function useHorsesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HorsesQuery, HorsesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HorsesQuery, HorsesQueryVariables>(HorsesDocument, options);
        }
export type HorsesQueryHookResult = ReturnType<typeof useHorsesQuery>;
export type HorsesLazyQueryHookResult = ReturnType<typeof useHorsesLazyQuery>;
export type HorsesQueryResult = Apollo.QueryResult<HorsesQuery, HorsesQueryVariables>;
export const HorsesByCategoryDocument = gql`
    query HorsesByCategory($category: String!) {
  horsesByCategory(category: $category) {
    ...RegularHorse
  }
}
    ${RegularHorseFragmentDoc}`;

/**
 * __useHorsesByCategoryQuery__
 *
 * To run a query within a React component, call `useHorsesByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useHorsesByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHorsesByCategoryQuery({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useHorsesByCategoryQuery(baseOptions: Apollo.QueryHookOptions<HorsesByCategoryQuery, HorsesByCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HorsesByCategoryQuery, HorsesByCategoryQueryVariables>(HorsesByCategoryDocument, options);
      }
export function useHorsesByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HorsesByCategoryQuery, HorsesByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HorsesByCategoryQuery, HorsesByCategoryQueryVariables>(HorsesByCategoryDocument, options);
        }
export type HorsesByCategoryQueryHookResult = ReturnType<typeof useHorsesByCategoryQuery>;
export type HorsesByCategoryLazyQueryHookResult = ReturnType<typeof useHorsesByCategoryLazyQuery>;
export type HorsesByCategoryQueryResult = Apollo.QueryResult<HorsesByCategoryQuery, HorsesByCategoryQueryVariables>;
export const UserDocument = gql`
    query User {
  user {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

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