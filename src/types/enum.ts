export const Semester = {
    FIRST: '1학기',
    SUMMER: '여름학기',
    SECOND: '2학기',
    WINTER: '겨울학기',
} as const;

type SemesterKey = keyof typeof Semester;

// enum GradeScale {
//     SCORE = "점수 100기준 입력",
//     PF = "Pass/Fail 입력",
//     UNKNOWN = ""
// }
//
// enum GradeRule {
//     RELATIVE = "상대평가",
//     ABSOLUTE = "절대평가",
//     UNKNOWN = ""
// }
//
// enum Language {
//     KOREAN = "한국어",
//     ENGLISH = "영어",
//     MIXED_ENGLISH_KOREAN = "영어-한국어혼합",
//     NATION = "원어",
//     MIXED_NATION_KOREAN = "원어-한국어혼합",
//     UNKNOWN = ""
// }
//
// enum SubjectProcess {
//     HAKSA = "학사과정",
//     SUKSA = "석사과정",
//     SUKBAK = "석박과정",
//     UNKNOWN = ""
// }

export type {SemesterKey};
