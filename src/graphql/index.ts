import {GraphQLClient} from 'graphql-request'
import {CurrentSemesterDataQueryVariables, getSdk, LectureRoomTimeTableQueryVariables, SubjectsQueryVariables} from "../types/graphql";

const api = import.meta.env.DEV ? `https://ssullabus.nlog.dev/graphql` : `${location.origin}/graphql`;
// const api = ;

const client = new GraphQLClient(api);
const sdk = getSdk(client);

export const getSubjects = (query: SubjectsQueryVariables) => sdk.subjects(query);
export const getCurrentSemesterData = (query: CurrentSemesterDataQueryVariables) => sdk.currentSemesterData(query);
export const getLectureRoomTimeTable = (query: LectureRoomTimeTableQueryVariables) => sdk.lectureRoomTimeTable(query);
