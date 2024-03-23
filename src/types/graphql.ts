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

export type MultiMajor = {
  __typename?: 'MultiMajor';
  department: Scalars['String']['output'];
  detail_department: Scalars['String']['output'];
  isu_name: Scalars['String']['output'];
  univ: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  major_lists: Array<SubjectMajor>;
  multi_major_lists: Array<MultiMajor>;
  subject: Array<Subject>;
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
  time_place?: Maybe<Array<TimePlaceDb_Subject>>;
  year: Scalars['Int']['output'];
};

export type SubjectMajor = {
  __typename?: 'SubjectMajor';
  is_main: Scalars['Boolean']['output'];
  isu_name?: Maybe<Scalars['String']['output']>;
};

export enum SubjectProcess {
  Haksa = 'HAKSA',
  Sukbak = 'SUKBAK',
  Suksa = 'SUKSA',
  Unknown = 'UNKNOWN'
}

export type TimePlaceDb_Subject = {
  __typename?: 'TimePlaceDB_Subject';
  day?: Maybe<Scalars['String']['output']>;
  place?: Maybe<Scalars['String']['output']>;
  time_end?: Maybe<Scalars['String']['output']>;
  time_start?: Maybe<Scalars['String']['output']>;
};



export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;