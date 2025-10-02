export type CourseFilters = {
    language: "Spanish" | "English";
    modality?: "Intensive" | "Semi-Intensive" | "Standar" | "Private";
    level?: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
    status?: "inProgress" | "soon" | "pending"
};