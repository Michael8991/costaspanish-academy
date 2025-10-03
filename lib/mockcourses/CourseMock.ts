// Solo datos puros (para mocks, front, props, etc.)
export interface ICourseData {
    _id: any;
    languageToLearn: string;
    topCourses: boolean;
    title: string;
    subTitle: string;
    price: string;
    hoursPerWeek: string;
    longDesc: string;
    maxPeople: string;
    duration?: string;
    format: string;
    level?: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
    requirements?: string;
    learningObjetives: string;
    modules: string;
    technicalRequirements?: string;
    modality?: "Intensive" | "SemiIntensive" | "Standar" | "Private";
    startDate?: string;
    access?: string;
    support?: string;
    gains?: string;
    certificate?: string;
    imageUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
    status?: "inProgress" | "soon" | "pending";
}

// Para Mongoose (extiende Document, solo lo usas en el modelo)
export interface ICourse extends ICourseData, Document { }