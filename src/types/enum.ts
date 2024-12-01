import {GradeRule, GradeScale, Language, Semester, SubjectProcess} from "./graphql";

export const SemesterValue = {
    [Semester.First]: '1학기',
    [Semester.Summer]: '여름학기',
    [Semester.Second]: '2학기',
    [Semester.Winter]: '겨울학기',
} as const;
export const SemesterValues = Object.keys(SemesterValue).map(k => ({
    value: k,
    display: SemesterValue[k as Semester]
})) as { value: Semester, display: string }[];

export const GradeScaleValue = {
    [GradeScale.Score]: "점수 100기준 입력",
    [GradeScale.Pf]: "Pass/Fail 입력",
    [GradeScale.Unknown]: "(알수없음)"
} as const;
export const GradeScaleValues = Object.keys(GradeScaleValue).map(k => ({
    value: k,
    display: GradeScaleValue[k as GradeScale]
})) as { value: GradeScale, display: string }[];


export const GradeRuleValue = {
    [GradeRule.Relative]: "상대평가",
    [GradeRule.Absolute]: "절대평가",
    [GradeRule.Unknown]: "(알수없음)"
} as const;
export const GradeRuleValues = Object.keys(GradeRuleValue).map(k => ({
    value: k,
    display: GradeRuleValue[k as GradeRule]
})) as { value: GradeRule, display: string }[];


export const LanguageValue = {
    [Language.Korean]: "한국어",
    [Language.English]: "영어",
    [Language.MixedEnglishKorean]: "영어-한국어혼합",
    [Language.Nation]: "원어",
    [Language.MixedNationKorean]: "원어-한국어혼합",
    [Language.Unknown]: "(알수없음)"
} as const;
export const LanguageValues = Object.keys(LanguageValue).map(k => ({
    value: k,
    display: LanguageValue[k as Language]
})) as { value: Language, display: string }[];

export const SubjectProcessValue = {
    [SubjectProcess.Haksa]: "학사과정",
    [SubjectProcess.Suksa]: "석사과정",
    [SubjectProcess.Sukbak]: "석박과정",
    [SubjectProcess.Unknown]: "(알수없음)"
} as const;
export const SubjectProcessValues = Object.keys(SubjectProcessValue).map(k => ({
    value: k,
    display: SubjectProcessValue[k as SubjectProcess]
})) as { value: SubjectProcess, display: string }[];
