import { ICourseData } from "@/lib/mockcourses/CourseMock";

export const mockCourses: ICourseData[] = [
  // Inglés Intensivo B1
  {
    _id: "eng-int-b1",
    languageToLearn: "English",
    title: "Inglés Intensivo B1",
    subTitle: "Avanza rápido con clases intensivas",
    price: "180€",
    hoursPerWeek: "8h",
    longDesc:
      "Magna laborum dolor non irure incididunt esse incididunt commodo nisi exercitation proident. Magna velit ullamco irure est aliqua do minim. Minim minim ea fugiat ea nostrud do sint anim. Nostrud reprehenderit sit magna cillum officia ipsum occaecat in reprehenderit Lorem ipsum ad eiusmod. Eiusmod consectetur aute elit laborum consectetur reprehenderit elit velit amet incididunt. Magna ea sunt mollit ut sint nisi velit pariatur minim duis. Tempor nisi amet do ullamco laborum cupidatat mollit id anim.Enim veniam est sunt in magna labore.Et incididunt Lorem aliqua veniam eiusmod dolor nisi sit voluptate culpa id qui fugiat minim.Nulla est aliquip laboris exercitation et esse exercitation aute incididunt veniam velit qui ea anim.Anim anim tempor adipisicing do magna nisi.Qui qui magna consectetur duis nulla ad ullamco anim nostrud.Et quis dolore id anim enim amet incididunt.",
    maxPeople: "10",
    duration: "4 semanas",
    format: "Online",
    level: "B1",
    requirements: "Nivel B1 certificado o experiencia previa",
    learningObjetives:
      "Mejorar comprensión auditiva y expresión oral; ampliar vocabulario y gramática avanzada.",
    modules: [
      {
        title: "Introduction to the Course",
        type: "Lecture",
        duration: "30 min",
        submodules: [
          { title: "Welcome & Objectives", duration: "10 min", type: "video" },
          { title: "Course Structure Overview", duration: "20 min" },
        ],
      },
      {
        title: "Basic Grammar",
        type: "Theory",
        duration: "2h",
        submodules: [
          { title: "Nouns and Articles", duration: "30 min" },
          { title: "Pronouns", duration: "30 min" },
          { title: "Verbs: Present Simple", duration: "1h" },
        ],
      },
      {
        title: "Vocabulary Building",
        type: "Practice",
        duration: "1h 30min",
        submodules: [
          { title: "Everyday Words", duration: "30 min" },
          { title: "Food & Drink", duration: "30 min" },
          { title: "Travel & Directions", duration: "30 min" },
        ],
      },
      {
        title: "Listening & Speaking",
        type: "Conversation",
        duration: "2h",
        submodules: [
          { title: "Listening Comprehension Exercises", duration: "1h" },
          { title: "Pair Speaking Practice", duration: "1h" },
        ],
      },
      {
        title: "Reading & Writing",
        type: "Exercises",
        duration: "1h 45min",
        submodules: [
          { title: "Reading Short Texts", duration: "45 min" },
          { title: "Writing Simple Paragraphs", duration: "1h" },
        ],
      },
      {
        title: "Pronunciation & Phonetics",
        type: "Workshop",
        duration: "1h",
        submodules: [
          { title: "Vowel Sounds", duration: "30 min" },
          { title: "Consonant Clusters", duration: "30 min" },
        ],
      },
      {
        title: "Cultural Insights",
        type: "Extra Material",
        duration: "45 min",
        submodules: [
          { title: "Festivals & Traditions", duration: "20 min" },
          { title: "Everyday Life", duration: "25 min" },
        ],
      },
      {
        title: "Mid-course Test",
        type: "Assessment",
        duration: "1h",
        submodules: [
          { title: "Grammar Test", duration: "30 min" },
          { title: "Vocabulary Quiz", duration: "30 min" },
        ],
      },
      {
        title: "Final Project / Presentation",
        type: "Project",
        duration: "2h",
        submodules: [
          { title: "Prepare Presentation", duration: "1h" },
          { title: "Deliver Presentation", duration: "1h" },
        ],
      },
      {
        title: "Optional Conversation Club",
        type: "Extra Practice",
        duration: "1h",
        submodules: [
          { title: "Group Discussion", duration: "30 min" },
          { title: "Q&A with Teacher", duration: "30 min" },
        ],
      },
    ],
    technicalRequirements:
      "Ordenador o tablet con cámara y micrófono; conexión a internet estable",
    modality: "Intensive",
    startDate: "2025-11-05",
    access: "Plataforma online propia",
    support: "Tutor personal vía chat y email",
    gains: "Nivel B1 consolidado y habilidades comunicativas reforzadas",
    certificate: "Certificado de asistencia y progreso",
    imageUrl: "/assets/intensiveGroup.png",
    createdAt: new Date(),
    updatedAt: new Date(),
    topCourses: true,
    status: "soon",
    slug: "eng-int-b1",
  },

  // Inglés Semi-intensivo B1
  {
    _id: "eng-semi-b1",
    languageToLearn: "English",
    title: "Inglés Semi-intensivo B1",
    subTitle: "Mejora tu inglés sin saturarte",
    price: "120€",
    hoursPerWeek: "4h",
    longDesc:
      "Magna laborum dolor non irure incididunt esse incididunt commodo nisi exercitation proident. Magna velit ullamco irure est aliqua do minim. Minim minim ea fugiat ea nostrud do sint anim. Nostrud reprehenderit sit magna cillum officia ipsum occaecat in reprehenderit Lorem ipsum ad eiusmod. Eiusmod consectetur aute elit laborum consectetur reprehenderit elit velit amet incididunt. Magna ea sunt mollit ut sint nisi velit pariatur minim duis. Tempor nisi amet do ullamco laborum cupidatat mollit id anim.Enim veniam est sunt in magna labore.Et incididunt Lorem aliqua veniam eiusmod dolor nisi sit voluptate culpa id qui fugiat minim.Nulla est aliquip laboris exercitation et esse exercitation aute incididunt veniam velit qui ea anim.Anim anim tempor adipisicing do magna nisi.Qui qui magna consectetur duis nulla ad ullamco anim nostrud.Et quis dolore id anim enim amet incididunt.",
    maxPeople: "15",
    duration: "6 semanas",
    format: "Online",
    level: "B1",
    requirements: "Nivel B1 certificado o experiencia previa",
    learningObjetives:
      "Refuerzo de gramática y vocabulario, mejora de conversación y comprensión.",
    modules: [
      {
        title: "Introduction to the Course",
        type: "Lecture",
        duration: "30 min",
        submodules: [
          { title: "Welcome & Objectives", duration: "10 min" },
          { title: "Course Structure Overview", duration: "20 min" },
        ],
      },
      {
        title: "Basic Grammar",
        type: "Theory",
        duration: "2h",
        submodules: [
          { title: "Nouns and Articles", duration: "30 min" },
          { title: "Pronouns", duration: "30 min" },
          { title: "Verbs: Present Simple", duration: "1h" },
        ],
      },
      {
        title: "Vocabulary Building",
        type: "Practice",
        duration: "1h 30min",
        submodules: [
          { title: "Everyday Words", duration: "30 min" },
          { title: "Food & Drink", duration: "30 min" },
          { title: "Travel & Directions", duration: "30 min" },
        ],
      },
      {
        title: "Listening & Speaking",
        type: "Conversation",
        duration: "2h",
        submodules: [
          { title: "Listening Comprehension Exercises", duration: "1h" },
          { title: "Pair Speaking Practice", duration: "1h" },
        ],
      },
      {
        title: "Reading & Writing",
        type: "Exercises",
        duration: "1h 45min",
        submodules: [
          { title: "Reading Short Texts", duration: "45 min" },
          { title: "Writing Simple Paragraphs", duration: "1h" },
        ],
      },
      {
        title: "Pronunciation & Phonetics",
        type: "Workshop",
        duration: "1h",
        submodules: [
          { title: "Vowel Sounds", duration: "30 min" },
          { title: "Consonant Clusters", duration: "30 min" },
        ],
      },
      {
        title: "Cultural Insights",
        type: "Extra Material",
        duration: "45 min",
        submodules: [
          { title: "Festivals & Traditions", duration: "20 min" },
          { title: "Everyday Life", duration: "25 min" },
        ],
      },
      {
        title: "Mid-course Test",
        type: "Assessment",
        duration: "1h",
        submodules: [
          { title: "Grammar Test", duration: "30 min" },
          { title: "Vocabulary Quiz", duration: "30 min" },
        ],
      },
      {
        title: "Final Project / Presentation",
        type: "Project",
        duration: "2h",
        submodules: [
          { title: "Prepare Presentation", duration: "1h" },
          { title: "Deliver Presentation", duration: "1h" },
        ],
      },
      {
        title: "Optional Conversation Club",
        type: "Extra Practice",
        duration: "1h",
        submodules: [
          { title: "Group Discussion", duration: "30 min" },
          { title: "Q&A with Teacher", duration: "30 min" },
        ],
      },
    ],
    technicalRequirements:
      "Ordenador o tablet con cámara y micrófono; conexión a internet estable",
    modality: "SemiIntensive",
    startDate: "2025-11-10",
    access: "Plataforma online propia",
    support: "Tutor personal vía chat y email",
    gains: "Mayor fluidez y confianza en conversaciones B1",
    certificate: "Certificado de progreso",
    imageUrl: "/assets/intensiveGroup.png",
    createdAt: new Date(),
    updatedAt: new Date(),
    topCourses: true,
    status: "soon",
    slug: "eng-semi-b1",
  },

  // Inglés Privado (nivel adaptado)
  {
    _id: "eng-privado",
    languageToLearn: "English",
    title: "Inglés Privado",
    subTitle: "Clases personalizadas al nivel del estudiante",
    price: "220€",
    hoursPerWeek: "6h",
    longDesc:
      "Magna laborum dolor non irure incididunt esse incididunt commodo nisi exercitation proident. Magna velit ullamco irure est aliqua do minim. Minim minim ea fugiat ea nostrud do sint anim. Nostrud reprehenderit sit magna cillum officia ipsum occaecat in reprehenderit Lorem ipsum ad eiusmod. Eiusmod consectetur aute elit laborum consectetur reprehenderit elit velit amet incididunt. Magna ea sunt mollit ut sint nisi velit pariatur minim duis. Tempor nisi amet do ullamco laborum cupidatat mollit id anim.Enim veniam est sunt in magna labore.Et incididunt Lorem aliqua veniam eiusmod dolor nisi sit voluptate culpa id qui fugiat minim.Nulla est aliquip laboris exercitation et esse exercitation aute incididunt veniam velit qui ea anim.Anim anim tempor adipisicing do magna nisi.Qui qui magna consectetur duis nulla ad ullamco anim nostrud.Et quis dolore id anim enim amet incididunt.",

    maxPeople: "1",
    format: "Online",
    learningObjetives:
      "Mejorar todas las competencias lingüísticas según necesidades personales.",
    modules: [
      {
        title: "Introduction to the Course",
        type: "Lecture",
        duration: "30 min",
        submodules: [
          { title: "Welcome & Objectives", duration: "10 min" },
          { title: "Course Structure Overview", duration: "20 min" },
        ],
      },
      {
        title: "Basic Grammar",
        type: "Theory",
        duration: "2h",
        submodules: [
          { title: "Nouns and Articles", duration: "30 min" },
          { title: "Pronouns", duration: "30 min" },
          { title: "Verbs: Present Simple", duration: "1h" },
        ],
      },
      {
        title: "Vocabulary Building",
        type: "Practice",
        duration: "1h 30min",
        submodules: [
          { title: "Everyday Words", duration: "30 min" },
          { title: "Food & Drink", duration: "30 min" },
          { title: "Travel & Directions", duration: "30 min" },
        ],
      },
      {
        title: "Listening & Speaking",
        type: "Conversation",
        duration: "2h",
        submodules: [
          { title: "Listening Comprehension Exercises", duration: "1h" },
          { title: "Pair Speaking Practice", duration: "1h" },
        ],
      },
      {
        title: "Reading & Writing",
        type: "Exercises",
        duration: "1h 45min",
        submodules: [
          { title: "Reading Short Texts", duration: "45 min" },
          { title: "Writing Simple Paragraphs", duration: "1h" },
        ],
      },
      {
        title: "Pronunciation & Phonetics",
        type: "Workshop",
        duration: "1h",
        submodules: [
          { title: "Vowel Sounds", duration: "30 min" },
          { title: "Consonant Clusters", duration: "30 min" },
        ],
      },
      {
        title: "Cultural Insights",
        type: "Extra Material",
        duration: "45 min",
        submodules: [
          { title: "Festivals & Traditions", duration: "20 min" },
          { title: "Everyday Life", duration: "25 min" },
        ],
      },
      {
        title: "Mid-course Test",
        type: "Assessment",
        duration: "1h",
        submodules: [
          { title: "Grammar Test", duration: "30 min" },
          { title: "Vocabulary Quiz", duration: "30 min" },
        ],
      },
      {
        title: "Final Project / Presentation",
        type: "Project",
        duration: "2h",
        submodules: [
          { title: "Prepare Presentation", duration: "1h" },
          { title: "Deliver Presentation", duration: "1h" },
        ],
      },
      {
        title: "Optional Conversation Club",
        type: "Extra Practice",
        duration: "1h",
        submodules: [
          { title: "Group Discussion", duration: "30 min" },
          { title: "Q&A with Teacher", duration: "30 min" },
        ],
      },
    ],
    modality: "Private",
    access: "Plataforma online propia",
    support: "Tutor personal vía chat y email",
    certificate: "Certificado de progreso personalizado",
    imageUrl: "/assets/onetoone.png",
    createdAt: new Date(),
    updatedAt: new Date(),
    topCourses: true,
    status: "pending",
    slug: "eng-privado",
  },

  // Español Intensivo B1
  {
    _id: "esp-int-b1",
    languageToLearn: "Spanish",
    title: "Español Intensivo B1",
    subTitle: "Aprende español de forma intensiva",
    price: "180€",
    hoursPerWeek: "8h",
    longDesc:
      "Magna laborum dolor non irure incididunt esse incididunt commodo nisi exercitation proident. Magna velit ullamco irure est aliqua do minim. Minim minim ea fugiat ea nostrud do sint anim. Nostrud reprehenderit sit magna cillum officia ipsum occaecat in reprehenderit Lorem ipsum ad eiusmod. Eiusmod consectetur aute elit laborum consectetur reprehenderit elit velit amet incididunt. Magna ea sunt mollit ut sint nisi velit pariatur minim duis. Tempor nisi amet do ullamco laborum cupidatat mollit id anim.Enim veniam est sunt in magna labore.Et incididunt Lorem aliqua veniam eiusmod dolor nisi sit voluptate culpa id qui fugiat minim.Nulla est aliquip laboris exercitation et esse exercitation aute incididunt veniam velit qui ea anim.Anim anim tempor adipisicing do magna nisi.Qui qui magna consectetur duis nulla ad ullamco anim nostrud.Et quis dolore id anim enim amet incididunt.",
    maxPeople: "10",
    duration: "4 semanas",
    format: "Online",
    level: "B1",
    requirements: "Nivel B1 certificado o experiencia previa",
    learningObjetives: "Refuerzo de gramática, vocabulario y fluidez oral.",
    modules: [
      {
        title: "Introduction to the Course",
        type: "Lecture",
        duration: "30 min",
        submodules: [
          { title: "Welcome & Objectives", duration: "10 min" },
          { title: "Course Structure Overview", duration: "20 min" },
        ],
      },
      {
        title: "Basic Grammar",
        type: "Theory",
        duration: "2h",
        submodules: [
          { title: "Nouns and Articles", duration: "30 min" },
          { title: "Pronouns", duration: "30 min" },
          { title: "Verbs: Present Simple", duration: "1h" },
        ],
      },
      {
        title: "Vocabulary Building",
        type: "Practice",
        duration: "1h 30min",
        submodules: [
          { title: "Everyday Words", duration: "30 min" },
          { title: "Food & Drink", duration: "30 min" },
          { title: "Travel & Directions", duration: "30 min" },
        ],
      },
      {
        title: "Listening & Speaking",
        type: "Conversation",
        duration: "2h",
        submodules: [
          { title: "Listening Comprehension Exercises", duration: "1h" },
          { title: "Pair Speaking Practice", duration: "1h" },
        ],
      },
      {
        title: "Reading & Writing",
        type: "Exercises",
        duration: "1h 45min",
        submodules: [
          { title: "Reading Short Texts", duration: "45 min" },
          { title: "Writing Simple Paragraphs", duration: "1h" },
        ],
      },
      {
        title: "Pronunciation & Phonetics",
        type: "Workshop",
        duration: "1h",
        submodules: [
          { title: "Vowel Sounds", duration: "30 min" },
          { title: "Consonant Clusters", duration: "30 min" },
        ],
      },
      {
        title: "Cultural Insights",
        type: "Extra Material",
        duration: "45 min",
        submodules: [
          { title: "Festivals & Traditions", duration: "20 min" },
          { title: "Everyday Life", duration: "25 min" },
        ],
      },
      {
        title: "Mid-course Test",
        type: "Assessment",
        duration: "1h",
        submodules: [
          { title: "Grammar Test", duration: "30 min" },
          { title: "Vocabulary Quiz", duration: "30 min" },
        ],
      },
      {
        title: "Final Project / Presentation",
        type: "Project",
        duration: "2h",
        submodules: [
          { title: "Prepare Presentation", duration: "1h" },
          { title: "Deliver Presentation", duration: "1h" },
        ],
      },
      {
        title: "Optional Conversation Club",
        type: "Extra Practice",
        duration: "1h",
        submodules: [
          { title: "Group Discussion", duration: "30 min" },
          { title: "Q&A with Teacher", duration: "30 min" },
        ],
      }
    ],
    technicalRequirements:
      "Ordenador o tablet con cámara y micrófono; conexión a internet estable",
    modality: "Intensive",
    startDate: "2025-11-05",
    access: "Plataforma online propia",
    support: "Tutor personal vía chat y email",
    gains: "Nivel B1 consolidado y habilidades comunicativas reforzadas",
    certificate: "Certificado de asistencia y progreso",
    imageUrl: "/assets/intensiveGroup.png",
    createdAt: new Date(),
    updatedAt: new Date(),
    topCourses: true,
    status: "pending",
    slug: "esp-int-b1",
  },

  // Español Semi-intensivo B1
  {
    _id: "esp-semi-b1",
    languageToLearn: "Spanish",
    title: "Español Semi-intensivo B1",
    subTitle: "Aprende español sin saturarte",
    price: "120€",
    hoursPerWeek: "4h",
    longDesc:
      "Magna laborum dolor non irure incididunt esse incididunt commodo nisi exercitation proident. Magna velit ullamco irure est aliqua do minim. Minim minim ea fugiat ea nostrud do sint anim. Nostrud reprehenderit sit magna cillum officia ipsum occaecat in reprehenderit Lorem ipsum ad eiusmod. Eiusmod consectetur aute elit laborum consectetur reprehenderit elit velit amet incididunt. Magna ea sunt mollit ut sint nisi velit pariatur minim duis. Tempor nisi amet do ullamco laborum cupidatat mollit id anim.Enim veniam est sunt in magna labore.Et incididunt Lorem aliqua veniam eiusmod dolor nisi sit voluptate culpa id qui fugiat minim.Nulla est aliquip laboris exercitation et esse exercitation aute incididunt veniam velit qui ea anim.Anim anim tempor adipisicing do magna nisi.Qui qui magna consectetur duis nulla ad ullamco anim nostrud.Et quis dolore id anim enim amet incididunt.",
    maxPeople: "15",
    duration: "6 semanas",
    format: "Online",
    level: "B1",
    requirements: "Nivel B1 certificado o experiencia previa",
    learningObjetives: "Refuerzo de gramática, vocabulario y fluidez oral.",
    modules: [
      {
        title: "Introduction to the Course",
        type: "Lecture",
        duration: "30 min",
        submodules: [
          { title: "Welcome & Objectives", duration: "10 min" },
          { title: "Course Structure Overview", duration: "20 min" },
        ],
      },
      {
        title: "Basic Grammar",
        type: "Theory",
        duration: "2h",
        submodules: [
          { title: "Nouns and Articles", duration: "30 min" },
          { title: "Pronouns", duration: "30 min" },
          { title: "Verbs: Present Simple", duration: "1h" },
        ],
      },
      {
        title: "Vocabulary Building",
        type: "Practice",
        duration: "1h 30min",
        submodules: [
          { title: "Everyday Words", duration: "30 min" },
          { title: "Food & Drink", duration: "30 min" },
          { title: "Travel & Directions", duration: "30 min" },
        ],
      },
      {
        title: "Listening & Speaking",
        type: "Conversation",
        duration: "2h",
        submodules: [
          { title: "Listening Comprehension Exercises", duration: "1h" },
          { title: "Pair Speaking Practice", duration: "1h" },
        ],
      },
      {
        title: "Reading & Writing",
        type: "Exercises",
        duration: "1h 45min",
        submodules: [
          { title: "Reading Short Texts", duration: "45 min" },
          { title: "Writing Simple Paragraphs", duration: "1h" },
        ],
      },
      {
        title: "Pronunciation & Phonetics",
        type: "Workshop",
        duration: "1h",
        submodules: [
          { title: "Vowel Sounds", duration: "30 min" },
          { title: "Consonant Clusters", duration: "30 min" },
        ],
      },
      {
        title: "Cultural Insights",
        type: "Extra Material",
        duration: "45 min",
        submodules: [
          { title: "Festivals & Traditions", duration: "20 min" },
          { title: "Everyday Life", duration: "25 min" },
        ],
      },
      {
        title: "Mid-course Test",
        type: "Assessment",
        duration: "1h",
        submodules: [
          { title: "Grammar Test", duration: "30 min" },
          { title: "Vocabulary Quiz", duration: "30 min" },
        ],
      },
      {
        title: "Final Project / Presentation",
        type: "Project",
        duration: "2h",
        submodules: [
          { title: "Prepare Presentation", duration: "1h" },
          { title: "Deliver Presentation", duration: "1h" },
        ],
      },
      {
        title: "Optional Conversation Club",
        type: "Extra Practice",
        duration: "1h",
        submodules: [
          { title: "Group Discussion", duration: "30 min" },
          { title: "Q&A with Teacher", duration: "30 min" },
        ],
      },
    ],
    technicalRequirements:
      "Ordenador o tablet con cámara y micrófono; conexión a internet estable",
    modality: "SemiIntensive",
    startDate: "2025-11-10",
    access: "Plataforma online propia",
    support: "Tutor personal vía chat y email",
    gains: "Mayor fluidez y confianza en conversaciones B1",
    certificate: "Certificado de progreso",
    imageUrl: "/assets/intensiveGroup.png",
    createdAt: new Date(),
    updatedAt: new Date(),
    topCourses: true,
    status: "soon",
    slug: "esp-semi-b1",
  },

  // Español Privado (nivel adaptado)
  {
    _id: "esp-privado",
    languageToLearn: "Spanish",
    title: "Español Privado",
    subTitle: "Clases personalizadas al nivel del estudiante",
    price: "220€",
    hoursPerWeek: "6h",
    longDesc:
      "Magna laborum dolor non irure incididunt esse incididunt commodo nisi exercitation proident. Magna velit ullamco irure est aliqua do minim. Minim minim ea fugiat ea nostrud do sint anim. Nostrud reprehenderit sit magna cillum officia ipsum occaecat in reprehenderit Lorem ipsum ad eiusmod. Eiusmod consectetur aute elit laborum consectetur reprehenderit elit velit amet incididunt. Magna ea sunt mollit ut sint nisi velit pariatur minim duis. Tempor nisi amet do ullamco laborum cupidatat mollit id anim.Enim veniam est sunt in magna labore.Et incididunt Lorem aliqua veniam eiusmod dolor nisi sit voluptate culpa id qui fugiat minim.Nulla est aliquip laboris exercitation et esse exercitation aute incididunt veniam velit qui ea anim.Anim anim tempor adipisicing do magna nisi.Qui qui magna consectetur duis nulla ad ullamco anim nostrud.Et quis dolore id anim enim amet incididunt.",
    maxPeople: "1",
    format: "Online",
    learningObjetives:
      "Mejorar todas las competencias lingüísticas según necesidades personales.",
    modules: [
      {
        title: "Introduction to the Course",
        type: "Lecture",
        duration: "30 min",
        submodules: [
          { title: "Welcome & Objectives", duration: "10 min" },
          { title: "Course Structure Overview", duration: "20 min" },
        ],
      },
      {
        title: "Basic Grammar",
        type: "Theory",
        duration: "2h",
        submodules: [
          { title: "Nouns and Articles", duration: "30 min" },
          { title: "Pronouns", duration: "30 min" },
          { title: "Verbs: Present Simple", duration: "1h" },
        ],
      },
      {
        title: "Vocabulary Building",
        type: "Practice",
        duration: "1h 30min",
        submodules: [
          { title: "Everyday Words", duration: "30 min" },
          { title: "Food & Drink", duration: "30 min" },
          { title: "Travel & Directions", duration: "30 min" },
        ],
      },
      {
        title: "Listening & Speaking",
        type: "Conversation",
        duration: "2h",
        submodules: [
          { title: "Listening Comprehension Exercises", duration: "1h" },
          { title: "Pair Speaking Practice", duration: "1h" },
        ],
      },
      {
        title: "Reading & Writing",
        type: "Exercises",
        duration: "1h 45min",
        submodules: [
          { title: "Reading Short Texts", duration: "45 min" },
          { title: "Writing Simple Paragraphs", duration: "1h" },
        ],
      },
      {
        title: "Pronunciation & Phonetics",
        type: "Workshop",
        duration: "1h",
        submodules: [
          { title: "Vowel Sounds", duration: "30 min" },
          { title: "Consonant Clusters", duration: "30 min" },
        ],
      },
      {
        title: "Cultural Insights",
        type: "Extra Material",
        duration: "45 min",
        submodules: [
          { title: "Festivals & Traditions", duration: "20 min" },
          { title: "Everyday Life", duration: "25 min" },
        ],
      },
      {
        title: "Mid-course Test",
        type: "Assessment",
        duration: "1h",
        submodules: [
          { title: "Grammar Test", duration: "30 min" },
          { title: "Vocabulary Quiz", duration: "30 min" },
        ],
      },
      {
        title: "Final Project / Presentation",
        type: "Project",
        duration: "2h",
        submodules: [
          { title: "Prepare Presentation", duration: "1h" },
          { title: "Deliver Presentation", duration: "1h" },
        ],
      },
      {
        title: "Optional Conversation Club",
        type: "Extra Practice",
        duration: "1h",
        submodules: [
          { title: "Group Discussion", duration: "30 min" },
          { title: "Q&A with Teacher", duration: "30 min" },
        ],
      },
    ],
    modality: "Private",
    access: "Plataforma online propia",
    support: "Tutor personal vía chat y email",
    certificate: "Certificado de progreso personalizado",
    imageUrl: "/assets/onetoone.png",
    createdAt: new Date(),
    updatedAt: new Date(),
    topCourses: true,
    status: "inProgress",
    slug: "esp-privado",
  },
  {
    _id: "eng-int-b1-2",
    languageToLearn: "English",
    title: "Inglés Intensivo B1 Extra 1",
    subTitle: "Curso intensivo adicional",
    price: "180€",
    hoursPerWeek: "8h",
    longDesc:
      "Magna laborum dolor non irure incididunt esse incididunt commodo nisi exercitation proident. Magna velit ullamco irure est aliqua do minim. Minim minim ea fugiat ea nostrud do sint anim. Nostrud reprehenderit sit magna cillum officia ipsum occaecat in reprehenderit Lorem ipsum ad eiusmod. Eiusmod consectetur aute elit laborum consectetur reprehenderit elit velit amet incididunt. Magna ea sunt mollit ut sint nisi velit pariatur minim duis. Tempor nisi amet do ullamco laborum cupidatat mollit id anim.Enim veniam est sunt in magna labore.Et incididunt Lorem aliqua veniam eiusmod dolor nisi sit voluptate culpa id qui fugiat minim.Nulla est aliquip laboris exercitation et esse exercitation aute incididunt veniam velit qui ea anim.Anim anim tempor adipisicing do magna nisi.Qui qui magna consectetur duis nulla ad ullamco anim nostrud.Et quis dolore id anim enim amet incididunt.",
    maxPeople: "10",
    duration: "4 semanas",
    format: "Online",
    level: "B1",
    learningObjetives: "Refuerzo de todas las competencias B1",
    modules: [
      {
        title: "Introduction to the Course",
        type: "Lecture",
        duration: "30 min",
        submodules: [
          { title: "Welcome & Objectives", duration: "10 min" },
          { title: "Course Structure Overview", duration: "20 min" },
        ],
      },
      {
        title: "Basic Grammar",
        type: "Theory",
        duration: "2h",
        submodules: [
          { title: "Nouns and Articles", duration: "30 min" },
          { title: "Pronouns", duration: "30 min" },
          { title: "Verbs: Present Simple", duration: "1h" },
        ],
      },
      {
        title: "Vocabulary Building",
        type: "Practice",
        duration: "1h 30min",
        submodules: [
          { title: "Everyday Words", duration: "30 min" },
          { title: "Food & Drink", duration: "30 min" },
          { title: "Travel & Directions", duration: "30 min" },
        ],
      },
      {
        title: "Listening & Speaking",
        type: "Conversation",
        duration: "2h",
        submodules: [
          { title: "Listening Comprehension Exercises", duration: "1h" },
          { title: "Pair Speaking Practice", duration: "1h" },
        ],
      },
      {
        title: "Reading & Writing",
        type: "Exercises",
        duration: "1h 45min",
        submodules: [
          { title: "Reading Short Texts", duration: "45 min" },
          { title: "Writing Simple Paragraphs", duration: "1h" },
        ],
      },
      {
        title: "Pronunciation & Phonetics",
        type: "Workshop",
        duration: "1h",
        submodules: [
          { title: "Vowel Sounds", duration: "30 min" },
          { title: "Consonant Clusters", duration: "30 min" },
        ],
      },
      {
        title: "Cultural Insights",
        type: "Extra Material",
        duration: "45 min",
        submodules: [
          { title: "Festivals & Traditions", duration: "20 min" },
          { title: "Everyday Life", duration: "25 min" },
        ],
      },
      {
        title: "Mid-course Test",
        type: "Assessment",
        duration: "1h",
        submodules: [
          { title: "Grammar Test", duration: "30 min" },
          { title: "Vocabulary Quiz", duration: "30 min" },
        ],
      },
      {
        title: "Final Project / Presentation",
        type: "Project",
        duration: "2h",
        submodules: [
          { title: "Prepare Presentation", duration: "1h" },
          { title: "Deliver Presentation", duration: "1h" },
        ],
      },
      {
        title: "Optional Conversation Club",
        type: "Extra Practice",
        duration: "1h",
        submodules: [
          { title: "Group Discussion", duration: "30 min" },
          { title: "Q&A with Teacher", duration: "30 min" },
        ],
      },
    ],
    modality: "Intensive",
    imageUrl: "/assets/intensiveGroup.png",
    createdAt: new Date(),
    updatedAt: new Date(),
    topCourses: false,
    status: "inProgress",
    slug: "eng-int-b1-2",
  },
  {
    _id: "eng-int-b1-3",
    languageToLearn: "English",
    title: "Inglés Intensivo B1 Extra 2",
    subTitle: "Curso intensivo adicional",
    price: "180€/Semana",
    hoursPerWeek: "8h",
    longDesc:
      "Magna laborum dolor non irure incididunt esse incididunt commodo nisi exercitation proident. Magna velit ullamco irure est aliqua do minim. Minim minim ea fugiat ea nostrud do sint anim. Nostrud reprehenderit sit magna cillum officia ipsum occaecat in reprehenderit Lorem ipsum ad eiusmod. Eiusmod consectetur aute elit laborum consectetur reprehenderit elit velit amet incididunt. Magna ea sunt mollit ut sint nisi velit pariatur minim duis. Tempor nisi amet do ullamco laborum cupidatat mollit id anim.Enim veniam est sunt in magna labore.Et incididunt Lorem aliqua veniam eiusmod dolor nisi sit voluptate culpa id qui fugiat minim.Nulla est aliquip laboris exercitation et esse exercitation aute incididunt veniam velit qui ea anim.Anim anim tempor adipisicing do magna nisi.Qui qui magna consectetur duis nulla ad ullamco anim nostrud.Et quis dolore id anim enim amet incididunt.",
    maxPeople: "10",
    duration: "4 semanas",
    format: "Online",
    level: "B1",
    learningObjetives: "Refuerzo de todas las competencias B1",
    modules: [
      {
        title: "Introduction to the Course",
        type: "Lecture",
        duration: "30 min",
        submodules: [
          { title: "Welcome & Objectives", duration: "10 min" },
          { title: "Course Structure Overview", duration: "20 min" },
        ],
      },
      {
        title: "Basic Grammar",
        type: "Theory",
        duration: "2h",
        submodules: [
          { title: "Nouns and Articles", duration: "30 min" },
          { title: "Pronouns", duration: "30 min" },
          { title: "Verbs: Present Simple", duration: "1h" },
        ],
      },
      {
        title: "Vocabulary Building",
        type: "Practice",
        duration: "1h 30min",
        submodules: [
          { title: "Everyday Words", duration: "30 min" },
          { title: "Food & Drink", duration: "30 min" },
          { title: "Travel & Directions", duration: "30 min" },
        ],
      },
      {
        title: "Listening & Speaking",
        type: "Conversation",
        duration: "2h",
        submodules: [
          { title: "Listening Comprehension Exercises", duration: "1h" },
          { title: "Pair Speaking Practice", duration: "1h" },
        ],
      },
      {
        title: "Reading & Writing",
        type: "Exercises",
        duration: "1h 45min",
        submodules: [
          { title: "Reading Short Texts", duration: "45 min" },
          { title: "Writing Simple Paragraphs", duration: "1h" },
        ],
      },
      {
        title: "Pronunciation & Phonetics",
        type: "Workshop",
        duration: "1h",
        submodules: [
          { title: "Vowel Sounds", duration: "30 min" },
          { title: "Consonant Clusters", duration: "30 min" },
        ],
      },
      {
        title: "Cultural Insights",
        type: "Extra Material",
        duration: "45 min",
        submodules: [
          { title: "Festivals & Traditions", duration: "20 min" },
          { title: "Everyday Life", duration: "25 min" },
        ],
      },
      {
        title: "Mid-course Test",
        type: "Assessment",
        duration: "1h",
        submodules: [
          { title: "Grammar Test", duration: "30 min" },
          { title: "Vocabulary Quiz", duration: "30 min" },
        ],
      },
      {
        title: "Final Project / Presentation",
        type: "Project",
        duration: "2h",
        submodules: [
          { title: "Prepare Presentation", duration: "1h" },
          { title: "Deliver Presentation", duration: "1h" },
        ],
      },
      {
        title: "Optional Conversation Club",
        type: "Extra Practice",
        duration: "1h",
        submodules: [
          { title: "Group Discussion", duration: "30 min" },
          { title: "Q&A with Teacher", duration: "30 min" },
        ],
      },
    ],
    modality: "Intensive",
    imageUrl: "/assets/intensiveGroup.png",
    createdAt: new Date(),
    updatedAt: new Date(),
    topCourses: false,
    status: "pending",
    slug: "eng-int-b1-3",
  },
  {
    _id: "eng-int-b1-4",
    languageToLearn: "English",
    title: "Inglés Intensivo B1 Extra 3",
    subTitle: "Curso intensivo adicional",
    price: "180€",
    hoursPerWeek: "8h",
    longDesc:
      "Magna laborum dolor non irure incididunt esse incididunt commodo nisi exercitation proident. Magna velit ullamco irure est aliqua do minim. Minim minim ea fugiat ea nostrud do sint anim. Nostrud reprehenderit sit magna cillum officia ipsum occaecat in reprehenderit Lorem ipsum ad eiusmod. Eiusmod consectetur aute elit laborum consectetur reprehenderit elit velit amet incididunt. Magna ea sunt mollit ut sint nisi velit pariatur minim duis. Tempor nisi amet do ullamco laborum cupidatat mollit id anim.Enim veniam est sunt in magna labore.Et incididunt Lorem aliqua veniam eiusmod dolor nisi sit voluptate culpa id qui fugiat minim.Nulla est aliquip laboris exercitation et esse exercitation aute incididunt veniam velit qui ea anim.Anim anim tempor adipisicing do magna nisi.Qui qui magna consectetur duis nulla ad ullamco anim nostrud.Et quis dolore id anim enim amet incididunt.",
    maxPeople: "10",
    duration: "4 semanas",
    format: "Online",
    level: "B1",
    learningObjetives: "Refuerzo de todas las competencias B1",
    modules: [
      { title: "Evaluación inicial", duration: "0.5h", type: "diagnostic" },
      { title: "Gramática personalizada", duration: "1h", type: "video" },
      { title: "Conversación individual", duration: "1h", type: "práctica" },
      {
        title: "Comprensión auditiva personalizada",
        duration: "1h",
        type: "listening",
      },
      { title: "Proyecto final / ejercicios", duration: "1h", type: "writing" },
    ],
    modality: "Intensive",
    imageUrl: "/assets/intensiveGroup.png",
    createdAt: new Date(),
    updatedAt: new Date(),
    topCourses: false,
    status: "inProgress",
    slug: "eng-int-b1-4",
  },
  {
    _id: "eng-int-b1-5",
    languageToLearn: "English",
    title: "Inglés Intensivo B1 Extra 4",
    subTitle: "Curso intensivo adicional",
    price: "180€",
    hoursPerWeek: "8h",
    longDesc:
      "Magna laborum dolor non irure incididunt esse incididunt commodo nisi exercitation proident. Magna velit ullamco irure est aliqua do minim. Minim minim ea fugiat ea nostrud do sint anim. Nostrud reprehenderit sit magna cillum officia ipsum occaecat in reprehenderit Lorem ipsum ad eiusmod. Eiusmod consectetur aute elit laborum consectetur reprehenderit elit velit amet incididunt. Magna ea sunt mollit ut sint nisi velit pariatur minim duis. Tempor nisi amet do ullamco laborum cupidatat mollit id anim.Enim veniam est sunt in magna labore.Et incididunt Lorem aliqua veniam eiusmod dolor nisi sit voluptate culpa id qui fugiat minim.Nulla est aliquip laboris exercitation et esse exercitation aute incididunt veniam velit qui ea anim.Anim anim tempor adipisicing do magna nisi.Qui qui magna consectetur duis nulla ad ullamco anim nostrud.Et quis dolore id anim enim amet incididunt.",
    maxPeople: "10",
    duration: "4 semanas",
    format: "Online",
    level: "B1",
    learningObjetives: "Refuerzo de todas las competencias B1",
    modules: [
      { title: "Gramática avanzada", duration: "2h", type: "video" },
      { title: "Conversación práctica", duration: "1.5h", type: "práctica" },
      { title: "Comprensión auditiva", duration: "1h", type: "listening" },
      { title: "Lectura y vocabulario", duration: "1h", type: "reading" },
      { title: "Expresión escrita", duration: "1h", type: "writing" },
    ],
    modality: "Intensive",
    imageUrl: "/assets/intensiveGroup.png",
    createdAt: new Date(),
    updatedAt: new Date(),
    topCourses: false,
    status: "inProgress",
    slug: "eng-int-b1-5",
  },

  // -------------------
  // Cursos adicionales Español (topCourses: false)
  {
    _id: "esp-int-b1-2",
    languageToLearn: "Spanish",
    title: "Español Intensivo B1 Extra 1",
    subTitle: "Curso intensivo adicional",
    price: "180€",
    hoursPerWeek: "8h",
    longDesc:
      "Magna laborum dolor non irure incididunt esse incididunt commodo nisi exercitation proident. Magna velit ullamco irure est aliqua do minim. Minim minim ea fugiat ea nostrud do sint anim. Nostrud reprehenderit sit magna cillum officia ipsum occaecat in reprehenderit Lorem ipsum ad eiusmod. Eiusmod consectetur aute elit laborum consectetur reprehenderit elit velit amet incididunt. Magna ea sunt mollit ut sint nisi velit pariatur minim duis. Tempor nisi amet do ullamco laborum cupidatat mollit id anim.Enim veniam est sunt in magna labore.Et incididunt Lorem aliqua veniam eiusmod dolor nisi sit voluptate culpa id qui fugiat minim.Nulla est aliquip laboris exercitation et esse exercitation aute incididunt veniam velit qui ea anim.Anim anim tempor adipisicing do magna nisi.Qui qui magna consectetur duis nulla ad ullamco anim nostrud.Et quis dolore id anim enim amet incididunt.",
    maxPeople: "10",
    duration: "4 semanas",
    format: "Online",
    level: "B1",
    learningObjetives: "Refuerzo de todas las competencias B1",
    modules: [
      {
        title: "Introduction to the Course",
        type: "Lecture",
        duration: "30 min",
        submodules: [
          { title: "Welcome & Objectives", duration: "10 min" },
          { title: "Course Structure Overview", duration: "20 min" },
        ],
      },
      {
        title: "Basic Grammar",
        type: "Theory",
        duration: "2h",
        submodules: [
          { title: "Nouns and Articles", duration: "30 min" },
          { title: "Pronouns", duration: "30 min" },
          { title: "Verbs: Present Simple", duration: "1h" },
        ],
      },
      {
        title: "Vocabulary Building",
        type: "Practice",
        duration: "1h 30min",
        submodules: [
          { title: "Everyday Words", duration: "30 min" },
          { title: "Food & Drink", duration: "30 min" },
          { title: "Travel & Directions", duration: "30 min" },
        ],
      },
      {
        title: "Listening & Speaking",
        type: "Conversation",
        duration: "2h",
        submodules: [
          { title: "Listening Comprehension Exercises", duration: "1h" },
          { title: "Pair Speaking Practice", duration: "1h" },
        ],
      },
      {
        title: "Reading & Writing",
        type: "Exercises",
        duration: "1h 45min",
        submodules: [
          { title: "Reading Short Texts", duration: "45 min" },
          { title: "Writing Simple Paragraphs", duration: "1h" },
        ],
      },
      {
        title: "Pronunciation & Phonetics",
        type: "Workshop",
        duration: "1h",
        submodules: [
          { title: "Vowel Sounds", duration: "30 min" },
          { title: "Consonant Clusters", duration: "30 min" },
        ],
      },
      {
        title: "Cultural Insights",
        type: "Extra Material",
        duration: "45 min",
        submodules: [
          { title: "Festivals & Traditions", duration: "20 min" },
          { title: "Everyday Life", duration: "25 min" },
        ],
      },
      {
        title: "Mid-course Test",
        type: "Assessment",
        duration: "1h",
        submodules: [
          { title: "Grammar Test", duration: "30 min" },
          { title: "Vocabulary Quiz", duration: "30 min" },
        ],
      },
      {
        title: "Final Project / Presentation",
        type: "Project",
        duration: "2h",
        submodules: [
          { title: "Prepare Presentation", duration: "1h" },
          { title: "Deliver Presentation", duration: "1h" },
        ],
      },
      {
        title: "Optional Conversation Club",
        type: "Extra Practice",
        duration: "1h",
        submodules: [
          { title: "Group Discussion", duration: "30 min" },
          { title: "Q&A with Teacher", duration: "30 min" },
        ],
      },
    ],
    modality: "Intensive",
    imageUrl: "/assets/intensiveGroup.png",
    createdAt: new Date(),
    updatedAt: new Date(),
    topCourses: false,
    status: "soon",
    slug: "esp-int-b1-2",
  },
  {
    _id: "esp-int-b1-3",
    languageToLearn: "Spanish",
    title: "Español Intensivo B1 Extra 2",
    subTitle: "Curso intensivo adicional",
    price: "180€",
    hoursPerWeek: "8h",
    longDesc:
      "Magna laborum dolor non irure incididunt esse incididunt commodo nisi exercitation proident. Magna velit ullamco irure est aliqua do minim. Minim minim ea fugiat ea nostrud do sint anim. Nostrud reprehenderit sit magna cillum officia ipsum occaecat in reprehenderit Lorem ipsum ad eiusmod. Eiusmod consectetur aute elit laborum consectetur reprehenderit elit velit amet incididunt. Magna ea sunt mollit ut sint nisi velit pariatur minim duis. Tempor nisi amet do ullamco laborum cupidatat mollit id anim.Enim veniam est sunt in magna labore.Et incididunt Lorem aliqua veniam eiusmod dolor nisi sit voluptate culpa id qui fugiat minim.Nulla est aliquip laboris exercitation et esse exercitation aute incididunt veniam velit qui ea anim.Anim anim tempor adipisicing do magna nisi.Qui qui magna consectetur duis nulla ad ullamco anim nostrud.Et quis dolore id anim enim amet incididunt.",
    maxPeople: "10",
    duration: "4 semanas",
    format: "Online",
    level: "B1",
    learningObjetives: "Refuerzo de todas las competencias B1",
    modules: [
      {
        title: "Introduction to the Course",
        type: "Lecture",
        duration: "30 min",
        submodules: [
          { title: "Welcome & Objectives", duration: "10 min" },
          { title: "Course Structure Overview", duration: "20 min" },
        ],
      },
      {
        title: "Basic Grammar",
        type: "Theory",
        duration: "2h",
        submodules: [
          { title: "Nouns and Articles", duration: "30 min" },
          { title: "Pronouns", duration: "30 min" },
          { title: "Verbs: Present Simple", duration: "1h" },
        ],
      },
      {
        title: "Vocabulary Building",
        type: "Practice",
        duration: "1h 30min",
        submodules: [
          { title: "Everyday Words", duration: "30 min" },
          { title: "Food & Drink", duration: "30 min" },
          { title: "Travel & Directions", duration: "30 min" },
        ],
      },
      {
        title: "Listening & Speaking",
        type: "Conversation",
        duration: "2h",
        submodules: [
          { title: "Listening Comprehension Exercises", duration: "1h" },
          { title: "Pair Speaking Practice", duration: "1h" },
        ],
      },
      {
        title: "Reading & Writing",
        type: "Exercises",
        duration: "1h 45min",
        submodules: [
          { title: "Reading Short Texts", duration: "45 min" },
          { title: "Writing Simple Paragraphs", duration: "1h" },
        ],
      },
      {
        title: "Pronunciation & Phonetics",
        type: "Workshop",
        duration: "1h",
        submodules: [
          { title: "Vowel Sounds", duration: "30 min" },
          { title: "Consonant Clusters", duration: "30 min" },
        ],
      },
      {
        title: "Cultural Insights",
        type: "Extra Material",
        duration: "45 min",
        submodules: [
          { title: "Festivals & Traditions", duration: "20 min" },
          { title: "Everyday Life", duration: "25 min" },
        ],
      },
      {
        title: "Mid-course Test",
        type: "Assessment",
        duration: "1h",
        submodules: [
          { title: "Grammar Test", duration: "30 min" },
          { title: "Vocabulary Quiz", duration: "30 min" },
        ],
      },
      {
        title: "Final Project / Presentation",
        type: "Project",
        duration: "2h",
        submodules: [
          { title: "Prepare Presentation", duration: "1h" },
          { title: "Deliver Presentation", duration: "1h" },
        ],
      },
      {
        title: "Optional Conversation Club",
        type: "Extra Practice",
        duration: "1h",
        submodules: [
          { title: "Group Discussion", duration: "30 min" },
          { title: "Q&A with Teacher", duration: "30 min" },
        ],
      },
    ],
    modality: "Intensive",
    imageUrl: "/assets/intensiveGroup.png",
    createdAt: new Date(),
    updatedAt: new Date(),
    topCourses: false,
    status: "inProgress",
    slug: "esp-int-b1-3",
  },
  {
    _id: "esp-int-b1-4",
    languageToLearn: "Spanish",
    title: "Español Intensivo B1 Extra 3",
    subTitle: "Curso intensivo adicional",
    price: "180€",
    hoursPerWeek: "8h",
    longDesc:
      "Magna laborum dolor non irure incididunt esse incididunt commodo nisi exercitation proident. Magna velit ullamco irure est aliqua do minim. Minim minim ea fugiat ea nostrud do sint anim. Nostrud reprehenderit sit magna cillum officia ipsum occaecat in reprehenderit Lorem ipsum ad eiusmod. Eiusmod consectetur aute elit laborum consectetur reprehenderit elit velit amet incididunt. Magna ea sunt mollit ut sint nisi velit pariatur minim duis. Tempor nisi amet do ullamco laborum cupidatat mollit id anim.Enim veniam est sunt in magna labore.Et incididunt Lorem aliqua veniam eiusmod dolor nisi sit voluptate culpa id qui fugiat minim.Nulla est aliquip laboris exercitation et esse exercitation aute incididunt veniam velit qui ea anim.Anim anim tempor adipisicing do magna nisi.Qui qui magna consectetur duis nulla ad ullamco anim nostrud.Et quis dolore id anim enim amet incididunt.",
    maxPeople: "10",
    duration: "4 semanas",
    format: "Online",
    level: "B1",
    learningObjetives: "Refuerzo de todas las competencias B1",
    modules: [
      {
        title: "Introduction to the Course",
        type: "Lecture",
        duration: "30 min",
        submodules: [
          { title: "Welcome & Objectives", duration: "10 min" },
          { title: "Course Structure Overview", duration: "20 min" },
        ],
      },
      {
        title: "Basic Grammar",
        type: "Theory",
        duration: "2h",
        submodules: [
          { title: "Nouns and Articles", duration: "30 min" },
          { title: "Pronouns", duration: "30 min" },
          { title: "Verbs: Present Simple", duration: "1h" },
        ],
      },
      {
        title: "Vocabulary Building",
        type: "Practice",
        duration: "1h 30min",
        submodules: [
          { title: "Everyday Words", duration: "30 min" },
          { title: "Food & Drink", duration: "30 min" },
          { title: "Travel & Directions", duration: "30 min" },
        ],
      },
      {
        title: "Listening & Speaking",
        type: "Conversation",
        duration: "2h",
        submodules: [
          { title: "Listening Comprehension Exercises", duration: "1h" },
          { title: "Pair Speaking Practice", duration: "1h" },
        ],
      },
      {
        title: "Reading & Writing",
        type: "Exercises",
        duration: "1h 45min",
        submodules: [
          { title: "Reading Short Texts", duration: "45 min" },
          { title: "Writing Simple Paragraphs", duration: "1h" },
        ],
      },
      {
        title: "Pronunciation & Phonetics",
        type: "Workshop",
        duration: "1h",
        submodules: [
          { title: "Vowel Sounds", duration: "30 min" },
          { title: "Consonant Clusters", duration: "30 min" },
        ],
      },
      {
        title: "Cultural Insights",
        type: "Extra Material",
        duration: "45 min",
        submodules: [
          { title: "Festivals & Traditions", duration: "20 min" },
          { title: "Everyday Life", duration: "25 min" },
        ],
      },
      {
        title: "Mid-course Test",
        type: "Assessment",
        duration: "1h",
        submodules: [
          { title: "Grammar Test", duration: "30 min" },
          { title: "Vocabulary Quiz", duration: "30 min" },
        ],
      },
      {
        title: "Final Project / Presentation",
        type: "Project",
        duration: "2h",
        submodules: [
          { title: "Prepare Presentation", duration: "1h" },
          { title: "Deliver Presentation", duration: "1h" },
        ],
      },
      {
        title: "Optional Conversation Club",
        type: "Extra Practice",
        duration: "1h",
        submodules: [
          { title: "Group Discussion", duration: "30 min" },
          { title: "Q&A with Teacher", duration: "30 min" },
        ],
      },
    ],
    modality: "Intensive",
    imageUrl: "/assets/intensiveGroup.png",
    createdAt: new Date(),
    updatedAt: new Date(),
    topCourses: false,
    status: "inProgress",
    slug: "esp-int-b1-4",
  },
  {
    _id: "esp-int-b1-5",
    languageToLearn: "Spanish",
    title: "Español Intensivo B1 Extra 4",
    subTitle: "Curso intensivo adicional",
    price: "180€",
    hoursPerWeek: "8h",
    longDesc:
      "Magna laborum dolor non irure incididunt esse incididunt commodo nisi exercitation proident. Magna velit ullamco irure est aliqua do minim. Minim minim ea fugiat ea nostrud do sint anim. Nostrud reprehenderit sit magna cillum officia ipsum occaecat in reprehenderit Lorem ipsum ad eiusmod. Eiusmod consectetur aute elit laborum consectetur reprehenderit elit velit amet incididunt. Magna ea sunt mollit ut sint nisi velit pariatur minim duis. Tempor nisi amet do ullamco laborum cupidatat mollit id anim.Enim veniam est sunt in magna labore.Et incididunt Lorem aliqua veniam eiusmod dolor nisi sit voluptate culpa id qui fugiat minim.Nulla est aliquip laboris exercitation et esse exercitation aute incididunt veniam velit qui ea anim.Anim anim tempor adipisicing do magna nisi.Qui qui magna consectetur duis nulla ad ullamco anim nostrud.Et quis dolore id anim enim amet incididunt.",
    maxPeople: "10",
    duration: "4 semanas",
    format: "Online",
    level: "B1",
    learningObjetives: "Refuerzo de todas las competencias B1",
    modules: [
      {
        title: "Introduction to the Course",
        type: "Lecture",
        duration: "30 min",
        submodules: [
          { title: "Welcome & Objectives", duration: "10 min" },
          { title: "Course Structure Overview", duration: "20 min" },
        ],
      },
      {
        title: "Basic Grammar",
        type: "Theory",
        duration: "2h",
        submodules: [
          { title: "Nouns and Articles", duration: "30 min" },
          { title: "Pronouns", duration: "30 min" },
          { title: "Verbs: Present Simple", duration: "1h" },
        ],
      },
      {
        title: "Vocabulary Building",
        type: "Practice",
        duration: "1h 30min",
        submodules: [
          { title: "Everyday Words", duration: "30 min" },
          { title: "Food & Drink", duration: "30 min" },
          { title: "Travel & Directions", duration: "30 min" },
        ],
      },
      {
        title: "Listening & Speaking",
        type: "Conversation",
        duration: "2h",
        submodules: [
          { title: "Listening Comprehension Exercises", duration: "1h" },
          { title: "Pair Speaking Practice", duration: "1h" },
        ],
      },
      {
        title: "Reading & Writing",
        type: "Exercises",
        duration: "1h 45min",
        submodules: [
          { title: "Reading Short Texts", duration: "45 min" },
          { title: "Writing Simple Paragraphs", duration: "1h" },
        ],
      },
      {
        title: "Pronunciation & Phonetics",
        type: "Workshop",
        duration: "1h",
        submodules: [
          { title: "Vowel Sounds", duration: "30 min" },
          { title: "Consonant Clusters", duration: "30 min" },
        ],
      },
      {
        title: "Cultural Insights",
        type: "Extra Material",
        duration: "45 min",
        submodules: [
          { title: "Festivals & Traditions", duration: "20 min" },
          { title: "Everyday Life", duration: "25 min" },
        ],
      },
      {
        title: "Mid-course Test",
        type: "Assessment",
        duration: "1h",
        submodules: [
          { title: "Grammar Test", duration: "30 min" },
          { title: "Vocabulary Quiz", duration: "30 min" },
        ],
      },
      {
        title: "Final Project / Presentation",
        type: "Project",
        duration: "2h",
        submodules: [
          { title: "Prepare Presentation", duration: "1h" },
          { title: "Deliver Presentation", duration: "1h" },
        ],
      },
      {
        title: "Optional Conversation Club",
        type: "Extra Practice",
        duration: "1h",
        submodules: [
          { title: "Group Discussion", duration: "30 min" },
          { title: "Q&A with Teacher", duration: "30 min" },
        ],
      },
    ],
    modality: "Intensive",
    imageUrl: "/assets/intensiveGroup.png",
    createdAt: new Date(),
    updatedAt: new Date(),
    topCourses: false,
    status: "soon",
    slug: "esp-int-b1-5",
  },
];
