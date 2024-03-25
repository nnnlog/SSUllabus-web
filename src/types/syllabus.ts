interface Syllabus {
    name: string;
    professor: string;
    code: string;

    year: string;
    semester: string;
    target: string;

    isu_main_type: string;
    credit: string;
    lang: string;

    grade_scale: string;
    grade_rule: string;
    subject_type: string;

    must_listen_before: string;
    should_listen_before: string;
    class_progress_type: string;

    prof_room: string;
    prof_telno: string;
    prof_email: string;

    textbook_main: string;
    textbook_sub: string;
    class_type: string;

    abstract: string;

    need_for_study: string;

    etc: string;

    grading: ({
        name: string,
        score: string,
        weighted_score: string,
    })[];

    week: ({
        week: string,
        coreword: string,
        detail: string,
        teaching_way: string,
        textbook: string,
    })[];

    file: ({
        name: string;
        url: string;
    })[];
}

export type {Syllabus};
