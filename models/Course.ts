import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICourse extends Document {
    //Hero del curso
    title: string;
    subTitle: string;
    price: string;
    hoursPerWeek: string;
    longDesc: string;

    //Resumen rapido del curso
    maxPeople: string;
    duration?: string;
    format: string;
    level?: string;
    requirements?: string;

    //Descripción completa
    learningObjetives: string;
    modules: string;
    technicalRequirements?: string;
    modality: string;
    startDate?: string;
    access?: string;
    support?: string;

    //Resultados y beneficios
    gains?: string;
    certificate?: string;

    //Extras
    imageUrl?: string;
}

const CourseSchema: Schema<ICourse> = new Schema(
    {
        // Hero del curso
        title: { type: String, required: true },
        subTitle: { type: String, required: true },
        price: { type: String, required: true },
        hoursPerWeek: { type: String, required: true },
        longDesc: { type: String, required: true },

        // Resumen rápido del curso
        maxPeople: { type: String, required: true },
        duration: { type: String },
        format: { type: String, required: true },
        level: { type: String },
        requirements: { type: String },

        // Descripción completa
        learningObjetives: { type: String, required: true },
        modules: { type: String, required: true },
        technicalRequirements: { type: String },
        modality: { type: String, required: true },
        startDate: { type: String },
        access: { type: String },
        support: { type: String },

        // Resultados y beneficios
        gains: { type: String },
        certificate: { type: String },

        // Extras
        imageUrl: { type: String },
    },
    { timestamps: true }
);

export const Course: Model<ICourse> = mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);