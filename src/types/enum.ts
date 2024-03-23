import {GradeRule, GradeScale, Language, Semester, SubjectProcess} from "./graphql";

export const SemesterValue = {
    [Semester.First]: '1학기',
    [Semester.Summer]: '여름학기',
    [Semester.Second]: '2학기',
    [Semester.Winter]: '겨울학기',
} as const;
export const SemesterValues = Object.keys(SemesterValue) as Semester[];

export const GradeScaleValue = {
    [GradeScale.Score]: "점수 100기준 입력",
    [GradeScale.Pf]: "Pass/Fail 입력",
    [GradeScale.Unknown]: "(알수없음)"
} as const;
export const GradeScaleValues = Object.keys(GradeScaleValue) as GradeScale[];


export const GradeRuleValue = {
    [GradeRule.Relative]: "상대평가",
    [GradeRule.Absolute]: "절대평가",
    [GradeRule.Unknown]: "(알수없음)"
} as const;
export const GradeRuleValues = Object.keys(GradeRuleValue) as GradeRule[];


export const LanguageValue = {
    [Language.Korean]: "한국어",
    [Language.English]: "영어",
    [Language.MixedEnglishKorean]: "영어-한국어혼합",
    [Language.Nation]: "원어",
    [Language.MixedNationKorean]: "원어-한국어혼합",
    [Language.Unknown]: "(알수없음)"
} as const;
export const LanguageValues = Object.keys(LanguageValue) as Language[];

export const SubjectProcessValue = {
    [SubjectProcess.Haksa]: "학사과정",
    [SubjectProcess.Suksa]: "석사과정",
    [SubjectProcess.Sukbak]: "석박과정",
    [SubjectProcess.Unknown]: "(알수없음)"
} as const;
export const SubjectProcessValues = Object.keys(SubjectProcessValue) as SubjectProcess[];
