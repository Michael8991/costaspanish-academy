// types/courses.ts

// ----- Submódulos -----
export interface ISubModules {
  type?: string;
  duration?: string;
  title: string;
}

// ----- Módulos -----
export interface IModuleData {
  title: string;
  duration?: string;
  type?: string;
  submodules?: ISubModules[];
}

// ----- Tipos auxiliares -----
export type CourseLanguage = "Spanish" | "English";
export type CourseModality = "Intensive" | "SemiIntensive" | "Standar" | "Private";
export type CourseLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export type CourseStatus = "inProgress" | "soon" | "pending" | "private";

// ----- Datos puros del curso -----
export interface ICourseData {
  // Meta
  languageToLearn: string;      
  topCourses: boolean;          

  // Hero del curso
  title: string;
  subTitle: string;
  price: string;
  hoursPerWeek: string;
  longDesc: string;

  // Resumen rápido del curso
  maxPeople: string;
  duration?: string;
  format: string;
  level?: CourseLevel;
  requirements?: string;

  // Descripción completa
  learningObjetives: string;
  modules: IModuleData[];
  technicalRequirements?: string;
  modality?: CourseModality;
  startDate?: string;
  access?: string;
  support?: string;

  // Resultados y beneficios
  gains?: string;
  certificate?: string;

  // Extras
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: CourseStatus;
  slug: string;
}

// FAQ 
export interface IFaqData {
  question: string;
  answer: string;
}


export type CourseFilters = {
  language?: CourseLanguage;
  modality?: CourseModality;
  level?: CourseLevel;
  status?: CourseStatus; 
};

export type ICourseDTO = ICourseData & { _id: string };
