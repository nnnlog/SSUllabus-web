import {gql, request} from 'graphql-request'
import {QuerySubjectArgs, Subject} from "../types/graphql";

const api = `http://127.0.0.1:8000/graphql`;
// const api = `${location.origin}/graphql`;

export const getSubjects = (query: QuerySubjectArgs, responseKeys: (keyof Subject)[]) => {
    const variables: Record<keyof QuerySubjectArgs, string> = {
        year: "Int!",
        semester: "Semester!",

        grade_scale: "[GradeScale!]",
        grade_rule: "[GradeRule!]",

        lang: "[Language!]",

        is_el: "Boolean",
        limited_target: "Boolean",

        keyword: "[String!]",

        code: "[String!]",
//        name: [String!],
//        professor: [String!],
        bunban: "[String!]",
        open_department: "[String!]",

        credit: "[Float!]",
        listen_count: "[IntSectionQuery!]",
        remain_count: "[IntSectionQuery!]",

        process: "[SubjectProcess!]",
        target: "[String!]",

        majors: "[String!]",
        multi_majors: "[String!]",
    };

    const document = gql`
        query (
        ${Object.keys(query).map(s => `$${s}: ${variables[s as keyof QuerySubjectArgs]}`).join("\n")}
        ) {
            subject (
            ${Object.keys(query).map(s => `${s}: $${s}`).join("\n")}
            ) {
            ${responseKeys.join("\n")}
        }
        }`;

    let tmp: Record<string, any> = query;
    return request<{ subject: Subject[] }>(api, document, tmp);
};
