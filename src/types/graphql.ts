import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export enum GradeRule {
  Absolute = 'ABSOLUTE',
  Relative = 'RELATIVE',
  Unknown = 'UNKNOWN'
}

export enum GradeScale {
  Pf = 'PF',
  Score = 'SCORE',
  Unknown = 'UNKNOWN'
}

export type IntSectionQuery = {
  max: Scalars['Int']['input'];
  min: Scalars['Int']['input'];
};

export enum Language {
  English = 'ENGLISH',
  Korean = 'KOREAN',
  MixedEnglishKorean = 'MIXED_ENGLISH_KOREAN',
  MixedNationKorean = 'MIXED_NATION_KOREAN',
  Nation = 'NATION',
  Unknown = 'UNKNOWN'
}

export type LectureRoomTimeTable = {
  __typename?: 'LectureRoomTimeTable';
  code: Scalars['String']['output'];
  day: Scalars['String']['output'];
  time_end: Scalars['String']['output'];
  time_start: Scalars['String']['output'];
};

export type LectureRoomTimeTableGroup = {
  __typename?: 'LectureRoomTimeTableGroup';
  place: Scalars['String']['output'];
  value: Array<LectureRoomTimeTable>;
};

export type MultiMajor = {
  __typename?: 'MultiMajor';
  department: Scalars['String']['output'];
  detail_department: Scalars['String']['output'];
  isu_name: Scalars['String']['output'];
  univ: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  credits: Array<Scalars['Float']['output']>;
  lecture_room_timetable: Array<LectureRoomTimeTableGroup>;
  lecture_rooms: Array<Scalars['String']['output']>;
  major_lists: Array<SubjectMajor>;
  multi_major_lists: Array<MultiMajor>;
  subject: Array<Subject>;
};


export type QueryCreditsArgs = {
  semester: Semester;
  year: Scalars['Int']['input'];
};


export type QueryLecture_Room_TimetableArgs = {
  place: Array<Scalars['String']['input']>;
  semester: Semester;
  year: Scalars['Int']['input'];
};


export type QueryLecture_RoomsArgs = {
  semester: Semester;
  year: Scalars['Int']['input'];
};


export type QueryMajor_ListsArgs = {
  semester: Semester;
  year: Scalars['Int']['input'];
};


export type QueryMulti_Major_ListsArgs = {
  semester: Semester;
  year: Scalars['Int']['input'];
};


export type QuerySubjectArgs = {
  bunban?: InputMaybe<Array<Scalars['String']['input']>>;
  code?: InputMaybe<Array<Scalars['String']['input']>>;
  credit?: InputMaybe<Array<Scalars['Float']['input']>>;
  grade_rule?: InputMaybe<Array<GradeRule>>;
  grade_scale?: InputMaybe<Array<GradeScale>>;
  is_capstone?: InputMaybe<Scalars['Boolean']['input']>;
  is_el?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Array<Scalars['String']['input']>>;
  lang?: InputMaybe<Array<Language>>;
  limited_target?: InputMaybe<Scalars['Boolean']['input']>;
  listen_count?: InputMaybe<Array<IntSectionQuery>>;
  majors?: InputMaybe<Array<Scalars['String']['input']>>;
  multi_majors?: InputMaybe<Array<Scalars['String']['input']>>;
  open_department?: InputMaybe<Array<Scalars['String']['input']>>;
  process?: InputMaybe<Array<SubjectProcess>>;
  remain_count?: InputMaybe<Array<IntSectionQuery>>;
  semester: Semester;
  target?: InputMaybe<Array<Scalars['String']['input']>>;
  year: Scalars['Int']['input'];
};

export enum Semester {
  First = 'FIRST',
  Second = 'SECOND',
  Summer = 'SUMMER',
  Winter = 'WINTER'
}

export type Subject = {
  __typename?: 'Subject';
  bunban?: Maybe<Scalars['String']['output']>;
  code: Scalars['String']['output'];
  credit: Scalars['Float']['output'];
  grade_rule: GradeRule;
  grade_scale: GradeScale;
  is_capstone: Scalars['Boolean']['output'];
  is_el: Scalars['Boolean']['output'];
  lang: Language;
  limited_target: Scalars['Boolean']['output'];
  listen_count: Scalars['Int']['output'];
  majors: Array<Scalars['String']['output']>;
  multi_majors: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  open_department?: Maybe<Scalars['String']['output']>;
  process: SubjectProcess;
  professor?: Maybe<Scalars['String']['output']>;
  remain_count: Scalars['Int']['output'];
  semester: Semester;
  syllabus?: Maybe<Scalars['String']['output']>;
  target?: Maybe<Scalars['String']['output']>;
  time_place?: Maybe<Array<SubjectLectureRoomTime>>;
  year: Scalars['Int']['output'];
};

export type SubjectLectureRoomTime = {
  __typename?: 'SubjectLectureRoomTime';
  day: Scalars['String']['output'];
  place?: Maybe<Scalars['String']['output']>;
  time_end: Scalars['String']['output'];
  time_start: Scalars['String']['output'];
};

export type SubjectMajor = {
  __typename?: 'SubjectMajor';
  is_main: Scalars['Boolean']['output'];
  isu_name: Scalars['String']['output'];
};

export enum SubjectProcess {
  Haksa = 'HAKSA',
  Sukbak = 'SUKBAK',
  Suksa = 'SUKSA',
  Unknown = 'UNKNOWN'
}

export type SubjectsQueryVariables = Exact<{
  year: Scalars['Int']['input'];
  semester: Semester;
  grade_scale?: InputMaybe<Array<GradeScale>>;
  grade_rule?: InputMaybe<Array<GradeRule>>;
  lang?: InputMaybe<Array<Language>>;
  is_el?: InputMaybe<Scalars['Boolean']['input']>;
  is_capstone?: InputMaybe<Scalars['Boolean']['input']>;
  limited_target?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Array<Scalars['String']['input']>>;
  code?: InputMaybe<Array<Scalars['String']['input']>>;
  bunban?: InputMaybe<Array<Scalars['String']['input']>>;
  open_department?: InputMaybe<Array<Scalars['String']['input']>>;
  credit?: InputMaybe<Array<Scalars['Float']['input']>>;
  listen_count?: InputMaybe<Array<IntSectionQuery>>;
  remain_count?: InputMaybe<Array<IntSectionQuery>>;
  process?: InputMaybe<Array<SubjectProcess>>;
  target?: InputMaybe<Array<Scalars['String']['input']>>;
  majors?: InputMaybe<Array<Scalars['String']['input']>>;
  multi_majors?: InputMaybe<Array<Scalars['String']['input']>>;
}>;


export type SubjectsQuery = { __typename?: 'Query', subject: Array<{ __typename?: 'Subject', year: number, semester: Semester, grade_scale: GradeScale, grade_rule: GradeRule, lang: Language, is_el: boolean, is_capstone: boolean, limited_target: boolean, code: string, name: string, bunban?: string | null, process: SubjectProcess, open_department?: string | null, professor?: string | null, credit: number, listen_count: number, remain_count: number, target?: string | null, majors: Array<string>, multi_majors: Array<string>, time_place?: Array<{ __typename?: 'SubjectLectureRoomTime', place?: string | null, day: string, time_start: string, time_end: string }> | null }> };

export type SubjectsSyllabusQueryVariables = Exact<{
  year: Scalars['Int']['input'];
  semester: Semester;
  code: Array<Scalars['String']['input']>;
}>;


export type SubjectsSyllabusQuery = { __typename?: 'Query', subject: Array<{ __typename?: 'Subject', code: string, syllabus?: string | null }> };

export type SubjectsSimpleQueryVariables = Exact<{
  year: Scalars['Int']['input'];
  semester: Semester;
  code: Array<Scalars['String']['input']>;
}>;


export type SubjectsSimpleQuery = { __typename?: 'Query', subject: Array<{ __typename?: 'Subject', code: string, name: string, professor?: string | null }> };

export type CurrentSemesterDataQueryVariables = Exact<{
  year: Scalars['Int']['input'];
  semester: Semester;
}>;


export type CurrentSemesterDataQuery = { __typename?: 'Query', credits: Array<number>, lecture_rooms: Array<string>, major_lists: Array<{ __typename?: 'SubjectMajor', isu_name: string, is_main: boolean }>, multi_major_lists: Array<{ __typename?: 'MultiMajor', univ: string, department: string, detail_department: string, isu_name: string }> };

export type LectureRoomTimeTableQueryVariables = Exact<{
  year: Scalars['Int']['input'];
  semester: Semester;
  place: Array<Scalars['String']['input']>;
}>;


export type LectureRoomTimeTableQuery = { __typename?: 'Query', lecture_room_timetable: Array<{ __typename?: 'LectureRoomTimeTableGroup', place: string, value: Array<{ __typename?: 'LectureRoomTimeTable', code: string, day: string, time_start: string, time_end: string }> }> };


export const SubjectsDocument = gql`
    query subjects($year: Int!, $semester: Semester!, $grade_scale: [GradeScale!], $grade_rule: [GradeRule!], $lang: [Language!], $is_el: Boolean, $is_capstone: Boolean, $limited_target: Boolean, $keyword: [String!], $code: [String!], $bunban: [String!], $open_department: [String!], $credit: [Float!], $listen_count: [IntSectionQuery!], $remain_count: [IntSectionQuery!], $process: [SubjectProcess!], $target: [String!], $majors: [String!], $multi_majors: [String!]) {
  subject(
    year: $year
    semester: $semester
    grade_scale: $grade_scale
    grade_rule: $grade_rule
    lang: $lang
    is_el: $is_el
    is_capstone: $is_capstone
    limited_target: $limited_target
    keyword: $keyword
    code: $code
    bunban: $bunban
    open_department: $open_department
    credit: $credit
    listen_count: $listen_count
    remain_count: $remain_count
    process: $process
    target: $target
    majors: $majors
    multi_majors: $multi_majors
  ) {
    year
    semester
    grade_scale
    grade_rule
    lang
    is_el
    is_capstone
    limited_target
    code
    name
    bunban
    process
    open_department
    professor
    credit
    listen_count
    remain_count
    process
    target
    majors
    multi_majors
    time_place {
      place
      day
      time_start
      time_end
    }
  }
}
    `;
export const SubjectsSyllabusDocument = gql`
    query subjectsSyllabus($year: Int!, $semester: Semester!, $code: [String!]!) {
  subject(year: $year, semester: $semester, code: $code) {
    code
    syllabus
  }
}
    `;
export const SubjectsSimpleDocument = gql`
    query subjectsSimple($year: Int!, $semester: Semester!, $code: [String!]!) {
  subject(year: $year, semester: $semester, code: $code) {
    code
    name
    professor
  }
}
    `;
export const CurrentSemesterDataDocument = gql`
    query currentSemesterData($year: Int!, $semester: Semester!) {
  major_lists(year: $year, semester: $semester) {
    isu_name
    is_main
  }
  multi_major_lists(year: $year, semester: $semester) {
    univ
    department
    detail_department
    isu_name
  }
  credits(year: $year, semester: $semester)
  lecture_rooms(year: $year, semester: $semester)
}
    `;
export const LectureRoomTimeTableDocument = gql`
    query lectureRoomTimeTable($year: Int!, $semester: Semester!, $place: [String!]!) {
  lecture_room_timetable(year: $year, semester: $semester, place: $place) {
    place
    value {
      code
      day
      time_start
      time_end
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    subjects(variables: SubjectsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SubjectsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SubjectsQuery>(SubjectsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'subjects', 'query', variables);
    },
    subjectsSyllabus(variables: SubjectsSyllabusQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SubjectsSyllabusQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SubjectsSyllabusQuery>(SubjectsSyllabusDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'subjectsSyllabus', 'query', variables);
    },
    subjectsSimple(variables: SubjectsSimpleQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SubjectsSimpleQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SubjectsSimpleQuery>(SubjectsSimpleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'subjectsSimple', 'query', variables);
    },
    currentSemesterData(variables: CurrentSemesterDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CurrentSemesterDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CurrentSemesterDataQuery>(CurrentSemesterDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'currentSemesterData', 'query', variables);
    },
    lectureRoomTimeTable(variables: LectureRoomTimeTableQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LectureRoomTimeTableQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LectureRoomTimeTableQuery>(LectureRoomTimeTableDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'lectureRoomTimeTable', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;