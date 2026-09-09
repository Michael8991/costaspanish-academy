// models/Course.ts
import mongoose, { Document, Model, Schema } from "mongoose";
import type { ICourseData, IModuleData, ISubModules } from "@/types/courses";

export interface ICourse extends Document, ICourseData {}

// Submódulos
const subModuleSchema = new Schema<ISubModules>(
  {
    title: { type: String, required: true },
    type: { type: String },
    duration: { type: String },
  },
  { _id: false }
);

// Módulos
const moduleSchema = new Schema<IModuleData>(
  {
    title: { type: String, required: true },
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

    level: {
      type: String,
      enum: ["A1", "A2", "B1", "B2", "C1", "C2"],
    },

    requirements: { type: String, required: false },

    // Descripción completa
    learningObjetives: { type: String, required: true },
    modules: { type: [moduleSchema], required: true },

    technicalRequirements: { type: String },

    modality: {
      type: String,
      enum: ["Intensive", "SemiIntensive", "Standar", "Private"],
    },

    startDate: { type: String, required: false },
    access: { type: String },

    support: { type: String, required: false },

    // Resultados y beneficios
    gains: { type: String, required: false },
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
