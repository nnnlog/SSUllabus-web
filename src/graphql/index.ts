import {GraphQLClient} from 'graphql-request'
import {getSdk, SubjectsQueryVariables} from "../types/graphql";

const api = `http://127.0.0.1:8000/graphql`;
// const api = `${location.origin}/graphql`;

const client = new GraphQLClient(api);
const sdk = getSdk(client);

export const getSubjects = (query: SubjectsQueryVariables) => sdk.subjects(query);
