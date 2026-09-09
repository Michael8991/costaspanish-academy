// models/Course.ts
import mongoose, { Document, Model, Schema } from "mongoose";
import type { ICourseData, IModuleData, ISubModules } from "@/types/courses";

export interface ICourse extends Document, ICourseData {}

/**
 * i18n sub-schema reusable
 * NOTE: keep it ABOVE schemas that use it
 */
const i18nString = {
  es: { type: String, required: true },
  en: { type: String, required: true },
};

// Submódulos (i18n title)
const subModuleSchema = new Schema<ISubModules>(
  {
    title: { type: i18nString, required: true },
    type: { type: String },
    duration: { type: String },
  },
  { _id: false }
);

// Módulos (i18n title)
const moduleSchema = new Schema<IModuleData>(
  {
    title: { type: i18nString, required: true },
    duration: { type: String },
    type: { type: String },
    submodules: { type: [subModuleSchema], default: [] },
  },
  { _id: false }
);

// ----- Schema principal de Course -----
const CourseSchema: Schema<ICourse> = new Schema(
  {
    // Meta
    languageToLearn: { type: String, required: true },
    topCourses: { type: Boolean, default: false },

    // Hero del curso (i18n)
    title: { type: i18nString, required: true },
    subTitle: { type: i18nString, required: true },

    /**
     * IMPORTANT:
     * Price should be NUMBER to format per locale in UI.
     * (Your UI already uses Intl.NumberFormat)
     */
    price: { type: Number, required: true },

    // If you need different text per locale, move it to i18n too.
    hoursPerWeek: { type: String, required: true },

    longDesc: { type: i18nString, required: true },

    // Resumen rápido del curso
    maxPeople: { type: String, required: true },
    duration: { type: String },

    // If this is displayed as text, you may also want i18n here.
    format: { type: String, required: true },

    level: {
      type: String,
      enum: ["A1", "A2", "B1", "B2", "C1", "C2"],
    },

    requirements: { type: i18nString, required: false },

    // Descripción completa
    learningObjetives: { type: i18nString, required: true },
    modules: { type: [moduleSchema], required: true },

    technicalRequirements: { type: String },

    modality: {
      type: String,
      enum: ["Intensive", "SemiIntensive", "Standar", "Private"],
    },

    startDate: { type: i18nString, required: false },
    access: { type: String },

    support: { type: i18nString, required: false },

    // Resultados y beneficios
    gains: { type: i18nString, required: false },
    certificate: { type: String },

    // Extras
    imageUrl: { type: String, required: true },

    status: {
      type: String,
      enum: ["inProgress", "soon", "pending", "private"],
      default: "pending",
    },

    slug: { type: String, required: true, unique: true, index: true },
  },
  { timestamps: true }
);

// ----- Modelo Mongoose -----
export const Course: Model<ICourse> =
  mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);
