export const Semester = {
    FIRST: '1학기',
    SUMMER: '여름학기',
    SECOND: '2학기',
    WINTER: '겨울학기',
} as const;

type SemesterKey = keyof typeof Semester;
export const SemesterKeys = Object.keys(Semester) as SemesterKey[];

export const GradeScale = {
    SCORE: "점수 100기준 입력",
    PF: "Pass/Fail 입력",
    UNKNOWN: ""
} as const;

type GradeScaleKey = keyof typeof GradeScale;
export const GradeScaleKeys = Object.keys(GradeScale) as GradeScaleKey[];


export const GradeRule = {
    RELATIVE: "상대평가",
    ABSOLUTE: "절대평가",
    UNKNOWN: ""
} as const;

type GradeRuleKey = keyof typeof GradeRule;
export const GradeRuleKeys = Object.keys(GradeRule) as GradeScaleKey[];


export const Language = {
    KOREAN: "한국어",
    ENGLISH: "영어",
    MIXED_ENGLISH_KOREAN: "영어-한국어혼합",
    NATION: "원어",
    MIXED_NATION_KOREAN: "원어-한국어혼합",
    UNKNOWN: ""
} as const;

type LanguageKey = keyof typeof Language;
export const LanguageKeys = Object.keys(Language) as GradeScaleKey[];

export const SubjectProcess = {
    HAKSA: "학사과정",
    SUKSA: "석사과정",
    SUKBAK: "석박과정",
    UNKNOWN: ""
} as const;

type SubjectProcessKey = keyof typeof SubjectProcess;
export const SubjectProcessKeys = Object.keys(SubjectProcess) as GradeScaleKey[];

export type {SemesterKey, GradeScaleKey, GradeRuleKey, LanguageKey, SubjectProcessKey};
