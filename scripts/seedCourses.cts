import "dotenv/config"

import dbConnect from "../lib/mongo"
import { Course } from "../models/Course"
import type { ICourseData } from "../types"

async function seed(){
    console.log("Conectando a MongoDB...")
    await dbConnect();

    //!Cursos
    const coursesSeed: Omit<ICourseData, "createdAt" | "updatedAt">[] = [
{
  languageToLearn: "Spanish",
  topCourses: true,

  title: "Clases privadas de español",
  subTitle: "Aprendizaje personalizado con atención 100% individual",
  price: "Desde 25 €/h (precio estándar por hora)",
  hoursPerWeek: "Tú eliges el ritmo",
  longDesc:
    "Las clases privadas de español están diseñadas para ofrecer una experiencia completamente personalizada, adaptada a tus objetivos, tu ritmo y tu estilo de aprendizaje. Cada sesión se ajusta a tus necesidades reales: conversación, gramática, pronunciación, preparación de entrevistas, apoyo académico o práctica para situaciones específicas. Al trabajar cara a cara con tu profesor, recibirás retroalimentación inmediata, correcciones detalladas y un plan de estudio exclusivo para ti, garantizando un progreso rápido y efectivo.",

  maxPeople: "1 (posibilidad de 2 alumnos)",
  duration: undefined, // no aplica en este formato
  format: "Online (con opción presencial en casos específicos)",
  level: undefined, // válido para todos los niveles
  requirements:
    "No se requieren conocimientos previos. Las clases se adaptan por completo a tu nivel y objetivos.",

  learningObjetives:
    "Mejorar tus habilidades de comunicación en español, reforzar los aspectos esenciales del idioma, ampliar vocabulario útil y aumentar tu confianza al hablar, siempre adaptando el contenido a tus necesidades específicas.",

  modules: [
    {
      title: "Diagnóstico inicial y plan de estudio personalizado",
      type: "assessment",
      duration: "1 sesión (60 min aproximados)",
      submodules: [
        {
          title: "Evaluación de nivel y necesidades",
          duration: "30–45 min",
          type: "entrevista + prueba diagnóstica",
        },
        {
          title: "Definición de objetivos y calendario",
          duration: "15–30 min",
          type: "planificación",
        },
      ],
    },
    {
      title: "Construcción de bases sólidas de gramática y vocabulario",
      type: "grammar + vocabulary",
      duration: "Bloque flexible según tus objetivos",
      submodules: [
        {
          title: "Gramática clave adaptada a tu nivel",
          duration: "Sesiones de 60 min",
          type: "explicación + práctica guiada",
        },
        {
          title: "Vocabulario útil para tu día a día",
          duration: "Sesiones de 60 min",
          type: "actividades comunicativas",
        },
      ],
    },
    {
      title: "Comunicación real y mejora de la fluidez",
      type: "speaking + listening",
      duration: "Bloque continuo durante el curso",
      submodules: [
        {
          title: "Conversaciones guiadas sobre temas de interés",
          duration: "Sesiones de 60 min",
          type: "roleplays + discusión",
        },
        {
          title: "Corrección en tiempo real de errores frecuentes",
          duration: "Durante cada sesión",
          type: "feedback personalizado",
        },
      ],
    },
    {
      title: "Objetivos específicos del estudiante",
      type: "tailored",
      duration: "Diseñado a medida",
      submodules: [
        {
          title: "Preparación de entrevistas, exámenes o presentaciones",
          duration: "Sesiones adaptadas",
          type: "simulaciones y práctica intensiva",
        },
        {
          title: "Situaciones reales: trabajo, estudios o vida en España",
          duration: "Sesiones adaptadas",
          type: "casos prácticos",
        },
      ],
    },
    {
      title: "Seguimiento, evaluación y próximos pasos",
      type: "progress tracking",
      duration: "1 sesión cada cierto tiempo",
      submodules: [
        {
          title: "Revisión de progreso y objetivos cumplidos",
          duration: "30–60 min",
          type: "feedback + autoevaluación",
        },
        {
          title: "Recomendaciones para seguir mejorando",
          duration: "15–30 min",
          type: "plan de continuidad",
        },
      ],
    },
  ],

  technicalRequirements: "", 
  modality: "Private",
  startDate: "Tú decides cuándo empezar tu aventura con el español",
  access: "", 
  support:
    "Acompañamiento cercano del profesor, resolución de dudas entre clases según acuerdo y adaptación constante de materiales y actividades a tu progreso.",
  gains:
    "Mayor confianza al hablar, sensación de avance real en cada sesión, mejoras visibles en fluidez, precisión gramatical y vocabulario útil para tu vida personal, académica o profesional.",
  certificate: "", 

  imageUrl:
    "/courses/clases-privadas-espanol.jpg", 
  status: "private",
  slug: "clases-privadas-espanol",
        },
        
{
  languageToLearn: "Spanish",
  topCourses: true,

  title: "Curso Semi-intensivo de español A2",
  subTitle: "Aprende español en grupo con un ritmo equilibrado",
  price: "Desde 150€ al mes",
  hoursPerWeek: "4.5",
  longDesc:
    "Este curso A2 semi-intensivo está diseñado para estudiantes que desean seguir avanzando en su aprendizaje del español con un ritmo equilibrado, permitiendo una progresión constante sin la presión de un programa intensivo. A lo largo del curso ampliarás tu vocabulario, reforzarás la gramática del nivel y desarrollarás mayor soltura para comunicarte en situaciones cotidianas más variadas. Trabajarás comprensión oral, lectura, conversación y escritura a través de actividades prácticas y dinámicas que te ayudarán a ganar confianza y precisión. El enfoque progresivo del formato semi-intensivo te permitirá asimilar los contenidos con mayor profundidad mientras mejoras tu capacidad para describir experiencias, expresar opiniones simples y desenvolverte de manera más natural en español.",

  maxPeople: "6",
  duration: "Aprox. 5 meses (20 semanas)",
  format: "Online",
  level: "A2",
  requirements: "Conocimientos previos de nivel A1",

  learningObjetives:
    "Reforzar las bases del idioma, ampliar vocabulario útil, mejorar la comprensión y expresión oral y escrita, utilizar nuevas estructuras gramaticales con seguridad y desarrollar mayor naturalidad en situaciones cotidianas.",

  modules: [
    {
      title: "Unidad 1 – Hábitos, duración, dificultades y sentimientos",
      type: "communication",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Hablar de hábitos", type: "speaking" },
        { title: "Expresar dificultades", type: "functional language" },
        { title: "Recomendaciones y sentimientos", type: "grammar + speaking" }
      ]
    },
    {
      title: "Unidad 2 – Relatar y conectar acciones en el pasado",
      type: "past tenses",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Relatar acciones pasadas", type: "speaking" },
        { title: "Duración e inicio de acciones", type: "grammar" }
      ]
    },
    {
      title: "Unidad 3 – Descripción física y relaciones personales",
      type: "description",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Describir personas", type: "vocabulary" },
        { title: "Relaciones y parecidos", type: "speaking" }
      ]
    },
    {
      title: "Unidad 4 – Gustos, preferencias y descripción de espacios",
      type: "functional communication",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Expresar gustos", type: "conversation" },
        { title: "Describir una casa", type: "vocabulary" },
        { title: "Comparar y ubicar objetos", type: "grammar" }
      ]
    },
    {
      title: "Unidad 5 – Interacciones sociales básicas",
      type: "practical communication",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Saludos y presentaciones", type: "roleplay" },
        { title: "Pedir cosas y favores", type: "functional language" },
        { title: "Dar excusas y justificar", type: "speaking" }
      ]
    },
    {
      title: "Unidad 6 – Experiencias pasadas e intenciones",
      type: "past + future plans",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Hablar de experiencias", type: "speaking" },
        { title: "Expresar intenciones y deseos", type: "grammar" }
      ]
    },
    {
      title: "Unidad 7 – Alimentación y recetas",
      type: "vocabulary + speaking",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Gustos alimentarios", type: "conversation" },
        { title: "Cómo se prepara un plato", type: "procedural language" }
      ]
    },
    {
      title: "Unidad 8 – Salud y estados de ánimo",
      type: "functional communication",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Describir síntomas", type: "vocabulary" },
        { title: "Consejos y recomendaciones", type: "speaking" }
      ]
    },
    {
      title: "Unidad 9 – Pasado narrativo y argumentación básica",
      type: "past tenses",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Hábitos y costumbres en el pasado", type: "speaking" },
        { title: "Situar acciones en el tiempo", type: "grammar" }
      ]
    },
    {
      title: "Unidad 10 – Secuencias narrativas y emociones",
      type: "storytelling",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Relatar en pasado", type: "speaking" },
        { title: "Expresar emociones al narrar", type: "functional language" }
      ]
    }
  ],

  technicalRequirements: "",
  modality: "SemiIntensive",
  startDate: "Por confirmar",
  access: "",
  support:
    "Acompañaremos al estudiante con seguimiento continuo, corrección personalizada, actividades extra opcionales y orientación para resolver dudas fuera del horario de clase.",
  gains:
    "Mayor soltura para comunicarte, vocabulario más amplio, seguridad con las estructuras del pasado, mejor comprensión oral y mayor naturalidad en conversaciones de la vida real.",
  certificate: "",

  imageUrl: "/courses/curso-semiintensivo-espanol-a2.jpg",
  status: "soon",
  slug: "curso-semiintensivo-espanol-a2",
        },
{
  languageToLearn: "Spanish",
  topCourses: true,

  title: "Curso Semi-intensivo de español B1",
  subTitle: "Avanza hacia un español más autónomo y natural con un ritmo equilibrado",
  price: "Desde 150€ al mes",
  hoursPerWeek: "4.5",
  longDesc:
    "Este curso B1 semi-intensivo está diseñado para estudiantes que ya dominan los contenidos de nivel A2 y quieren avanzar hacia un uso más independiente del español. A lo largo de 20 semanas ampliarás notablemente tu vocabulario, mejorarás la precisión gramatical y ganarás fluidez para desenvolverte en situaciones cotidianas y semi-formales. El programa se centra en reforzar la comunicación real: comprender textos y audios más complejos, expresar opiniones, relatar experiencias con claridad, afrontar imprevistos y participar en conversaciones más espontáneas. Gracias al ritmo semi-intensivo, podrás progresar de manera constante mientras asimilas con profundidad las estructuras necesarias para comunicarte con mayor naturalidad y seguridad en español.",

  maxPeople: "6",
  duration: "Aprox. 6 meses y medio (27 semanas) – 80 sesiones de 1h30m",
  format: "Online",
  level: "B1",
  requirements: "Haber completado el nivel A2 o tener conocimientos equivalentes.",

  learningObjetives:
    "Desarrollar autonomía comunicativa, ampliar vocabulario especializado y funcional, mejorar la comprensión oral y escrita de materiales más complejos, reforzar estructuras del nivel B1, expresar opiniones, argumentos, planes e hipótesis con claridad y desenvolverse con seguridad en situaciones cotidianas menos previsibles.",

  modules: [
    {
      title: "Unidad 1 – Prohibición, obligatoriedad y hábitos",
      type: "functional language",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Expresar obligación/prohibición", type: "grammar" },
        { title: "Hablar de hábitos", type: "speaking" },
        { title: "Dar opiniones y consejos", type: "speaking" }
      ]
    },
    {
      title: "Unidad 2 – Hábitos presentes y experiencias pasadas",
      type: "communication + past tenses",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Hábitos en el presente", type: "conversation" },
        { title: "Experiencias pasadas", type: "speaking" },
        { title: "Inicio/duración de acciones", type: "grammar" }
      ]
    },
    {
      title: "Unidad 3 – Futuro, condiciones e hipótesis",
      type: "future + conditionals",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Hablar del futuro", type: "grammar" },
        { title: "Expresar condiciones", type: "functional language" },
        { title: "Hipótesis sobre el futuro", type: "speaking" }
      ]
    },
    {
      title: "Unidad 4 – Relatos, resúmenes y humor",
      type: "storytelling",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Relatar en presente", type: "speaking" },
        { title: "Resumir libros y películas", type: "communication" },
        { title: "Entender chistes", type: "listening" }
      ]
    },
    {
      title: "Unidad 5 – Instrucciones, consejos y anuncios",
      type: "functional language",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Recomendar y aconsejar", type: "speaking" },
        { title: "Dar instrucciones", type: "functional language" },
        { title: "Describir anuncios", type: "interpretation" }
      ]
    },
    {
      title: "Unidad 6 – Deseos, reclamaciones y soluciones",
      type: "communication",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Expresar deseos", type: "grammar" },
        { title: "Reclamaciones y necesidades", type: "roleplay" },
        { title: "Proponer soluciones y escribir una carta abierta", type: "writing" }
      ]
    },
    {
      title: "Unidad 7 – Comunicación telefónica y videollamadas",
      type: "practical language",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Tomar y dejar recados", type: "listening + speaking" },
        { title: "Transmitir mensajes, órdenes y consejos", type: "functional language" }
      ]
    },
    {
      title: "Unidad 8 – Anecdotario, interés y causalidad",
      type: "storytelling + connectors",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Contar anécdotas", type: "speaking" },
        { title: "Mostrar interés al escuchar", type: "conversation" },
        { title: "Causas y consecuencias", type: "grammar" }
      ]
    },
    {
      title: "Unidad 9 – Intereses, relaciones y desacuerdos",
      type: "communication",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Expresar intereses y sentimientos", type: "speaking" },
        { title: "Hablar de relaciones", type: "conversation" },
        { title: "Mostrar y suavizar desacuerdo", type: "functional language" }
      ]
    },
    {
      title: "Unidad 10 – Objetos: características y usos",
      type: "description",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Describir funcionamiento de objetos", type: "speaking" },
        { title: "Opinar sobre objetos", type: "functional language" }
      ]
    },
    {
      title: "Unidad 11 – Valoración y opiniones sobre conductas",
      type: "argumentation",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Valorar situaciones y hechos", type: "speaking" },
        { title: "Opinar sobre acciones y conductas", type: "discussion" }
      ]
    },
    {
      title: "Unidad 12 – Hipótesis, misterios y grados de seguridad",
      type: "speculation",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Hacer hipótesis y conjeturas", type: "speaking" },
        { title: "Relatar sucesos misteriosos", type: "storytelling" },
        { title: "Expresar grados de seguridad", type: "grammar" }
      ]
    }
  ],

  technicalRequirements: "",
  modality: "SemiIntensive",
  startDate: "Por confirmar",
  access: "",
  support:
    "Acompañamos al estudiante con seguimiento constante, correcciones personalizadas, actividades extra y orientación práctica para mejorar fuera de clase.",
  gains:
    "Mayor autonomía comunicativa, mejor comprensión de textos y audios complejos, precisión gramatical, manejo de conversaciones espontáneas y capacidad para expresar opiniones y argumentos con claridad.",
  certificate: "",

  imageUrl: "/courses/curso-semiintensivo-espanol-b1.jpg",
  status: "soon",
  slug: "curso-semiintensivo-espanol-b1",
        },
{
  languageToLearn: "Spanish",
  topCourses: true,

  title: "Curso Semi-intensivo de español B2",
  subTitle: "Avanza hacia un español más natural, fluido y seguro con un ritmo equilibrado",
  price: "Desde 150€ al mes",
  hoursPerWeek: "4.5",
  longDesc:
    "Este curso B2 semi-intensivo está diseñado para estudiantes que ya dominan el nivel B1 y desean avanzar hacia un uso más espontáneo, preciso y matizado del español. Durante 27 semanas trabajarás estructuras avanzadas, ampliarás tu vocabulario en temas actuales y complejos, mejorarás la comprensión de textos y audios auténticos y participarás en debates, análisis y actividades comunicativas reales. El curso se centra en la fluidez, la naturalidad y el control del discurso: expresar opiniones complejas, matizar, argumentar, contraargumentar, debatir, narrar con detalle y comprender a hablantes nativos en situaciones menos predecibles. Gracias al formato semi-intensivo podrás progresar de forma constante, asimilando en profundidad nuevos recursos lingüísticos que te permitirán desenvolverte con seguridad en entornos sociales, académicos y profesionales.",

  maxPeople: "6",
  duration: "Aprox. 6 meses y medio (27 semanas) – 80 sesiones de 1h30m",
  format: "Online",
  level: "B2",
  requirements: "Haber completado el nivel B1 o tener conocimientos equivalentes.",

  learningObjetives:
    "Desarrollar una comunicación fluida y espontánea, comprender textos y audios complejos, participar en conversaciones rápidas, argumentar y matizar opiniones, reconocer registros y tonos, mejorar la producción escrita avanzada y consolidar las estructuras gramaticales propias del nivel B2. Además, aprenderás a interpretar mejor la intención comunicativa, reaccionar ante imprevistos y desenvolverte en contextos sociales, laborales y académicos con seguridad.",

  modules: [
    {
      title: "Unidad 1 – Noticias y actualidad",
      type: "media + writing",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Comentar noticias", type: "speaking" },
        { title: "Redactar noticias", type: "writing" }
      ]
    },
    {
      title: "Unidad 2 – Opiniones, valoraciones y propuestas",
      type: "argumentation",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Opinar y valorar", type: "speaking" },
        { title: "Aludir a intervenciones previas", type: "discourse markers" },
        { title: "Condiciones y propuestas", type: "functional language" }
      ]
    },
    {
      title: "Unidad 3 – Consejos, deseos y situaciones imaginarias",
      type: "hypothesis + advice",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Dar consejos avanzados", type: "grammar + speaking" },
        { title: "Situaciones imaginarias y deseos", type: "conditional structures" },
        { title: "Opinar sobre conductas", type: "discussion" }
      ]
    },
    {
      title: "Unidad 4 – Causas, finalidad y personalidad",
      type: "description + connectors",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Expresar causa y finalidad", type: "grammar" },
        { title: "Hablar de carácter y personalidad", type: "vocabulary" },
        { title: "Cualidades de personas y objetos", type: "speaking" }
      ]
    },
    {
      title: "Unidad 5 – Ciudades, creencias y sentimientos",
      type: "description + opinion",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Describir ciudades y su calidad de vida", type: "speaking" },
        { title: "Creencias previas y expectativas", type: "functional language" },
        { title: "Expresar sentimientos", type: "conversation" }
      ]
    },
    {
      title: "Unidad 6 – Condiciones y requisitos",
      type: "conditionals",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Establecer condiciones y requisitos", type: "grammar" },
        { title: "Lenguaje formal para condiciones", type: "register" }
      ]
    },
    {
      title: "Unidad 7 – Movimiento, cuerpo y emociones",
      type: "description + body language",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Describir actividades y movimientos", type: "vocabulary" },
        { title: "Postura corporal y estados de ánimo", type: "speaking" },
      ]
    },
    {
      title: "Unidad 8 – Finalidad, promesas y compromisos",
      type: "functional language",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Expresar finalidad e intencionalidad", type: "grammar" },
        { title: "Estilo indirecto de promesas y compromisos", type: "reported speech" },
        { title: "Reclamar el cumplimiento de compromisos", type: "formal language" }
      ]
    },
    {
      title: "Unidad 9 – Relatos avanzados y estilo indirecto",
      type: "narrative + reported speech",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Combinar tiempos del pasado", type: "grammar" },
        { title: "Contar relatos (cuentos, leyendas…)", type: "storytelling" },
        { title: "Transmitir peticiones y advertencias", type: "reported speech" }
      ]
    },
    {
      title: "Unidad 10 – Futuro y medioambiente",
      type: "future + discourse",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Hacer predicciones sobre el futuro", type: "speaking" },
        { title: "Problemas medioambientales: causas y consecuencias", type: "discussion" },
        { title: "Cohesionar textos avanzados", type: "writing" }
      ]
    },
    {
      title: "Unidad 11 – Mundo laboral y textos formales",
      type: "work + formal language",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Hablar de trabajos y funciones", type: "speaking" },
        { title: "Describir una empresa", type: "presentation" },
        { title: "Características de textos formales", type: "reading + writing" }
      ]
    },
    {
      title: "Unidad 12 – Pasado hipotético y reproches",
      type: "hypothesis in the past",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Valorar hechos pasados", type: "speaking" },
        { title: "Hechos hipotéticos y consecuencias", type: "grammar" },
        { title: "Hacer reproches de forma adecuada", type: "pragmatics" }
      ]
    }
  ],

  technicalRequirements: "",
  modality: "SemiIntensive",
  startDate: "Por confirmar",
  access: "",
  support:
    "Ofrecemos seguimiento cercano, correcciones detalladas, feedback sobre producciones orales y escritas, y orientación para mejorar tu desempeño en contextos académicos, laborales y sociales.",
  gains:
    "Mayor fluidez y precisión, capacidad para participar en debates y conversaciones rápidas, mejor comprensión de textos y audios complejos, dominio de estructuras avanzadas y confianza para desenvolverte en contextos exigentes.",
  certificate: "",

  imageUrl: "/courses/curso-semiintensivo-espanol-b2.jpg",
  status: "soon",
  slug: "curso-semiintensivo-espanol-b2",
        },
{
  languageToLearn: "Spanish",
  topCourses: true,

  title: "Curso Semi-intensivo de español C1",
  subTitle: "Perfecciona tu español avanzado y alcanza fluidez y precisión en cualquier situación",
  price: "Desde 200€ al mes",
  hoursPerWeek: "4.5",
  longDesc:
    "Este curso C1 semi-intensivo está diseñado para estudiantes que ya dominan el nivel B2 y desean avanzar hacia un uso altamente espontáneo, preciso y matizado del español. A lo largo de 20 semanas trabajarás estructuras avanzadas, ampliarás tu vocabulario en temas actuales y complejos, mejorarás la comprensión de textos y audios auténticos y participarás en debates, análisis críticos y actividades comunicativas exigentes. El curso se centra en la fluidez, la naturalidad y el control del discurso: expresar opiniones complejas, matizar, argumentar, contraargumentar, debatir, narrar con detalle y comprender a hablantes nativos en situaciones menos predecibles. Gracias al formato semi-intensivo podrás progresar de forma constante, asimilando recursos lingüísticos avanzados que te permitirán desenvolverte con seguridad en contextos sociales, académicos y profesionales.",

  maxPeople: "6",
  duration: "5 meses (20 semanas)",
  format: "Online",
  level: "C1",
  requirements: "Haber completado el nivel B2 o tener conocimientos equivalentes.",

  learningObjetives:
    "Lograr fluidez y espontaneidad en la comunicación oral y escrita, comprender textos complejos y especializados, argumentar y debatir con claridad, manejar registros formales e informales, utilizar conectores y estructuras avanzadas, expresar matices y opiniones de forma precisa y desenvolverse con seguridad en entornos académicos, laborales y sociales exigentes.",

  modules: [
    {
      title: "Unidad 1 – Indiferencia y límites personales",
      type: "pragmatics",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Expresar indiferencia", type: "speaking" },
        { title: "Pedir no inmiscuirse", type: "pragmatic language" }
      ]
    },
    {
      title: "Unidad 2 – Narración avanzada y perspectivas",
      type: "narrative",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Narrar desde distintas perspectivas", type: "storytelling" },
        { title: "Intenciones informativas", type: "discourse analysis" }
      ]
    },
    {
      title: "Unidad 3 – Cortesía y actos de habla complejos",
      type: "pragmatics",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Cortesía en peticiones y órdenes", type: "register" },
        { title: "Rechazo adecuado", type: "interaction" }
      ]
    },
    {
      title: "Unidad 4 – Marcadores discursivos avanzados I",
      type: "discourse markers",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Regular el propio discurso", type: "connectors" }
      ]
    },
    {
      title: "Unidad 5 – Cumplidos y respuestas",
      type: "pragmatics",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Dar cumplidos", type: "speaking" },
        { title: "Responder a cumplidos", type: "interaction" }
      ]
    },
    {
      title: "Unidad 6 – Marcadores discursivos II",
      type: "discourse markers",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Regular la interacción con otros", type: "pragmatics" }
      ]
    },
    {
      title: "Unidad 7 – Inferencias y connotaciones",
      type: "semiotics",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Inferencias del discurso", type: "interpretation" },
        { title: "Connotaciones y matices", type: "semantics" }
      ]
    },
    {
      title: "Unidad 8 – Actos del habla e ironía",
      type: "pragmatics + rhetoric",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Actos del habla", type: "communication" },
        { title: "Ironía, sarcasmo y ambigüedad", type: "pragmatics" }
      ]
    },
    {
      title: "Unidad 9 – Noticias, rumores y cotilleo",
      type: "media literacy",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Comentar noticias sin fuentes claras", type: "interpretation" },
        { title: "Cotillear y transmitir información dudosa", type: "speaking" }
      ]
    },
    {
      title: "Unidad 10 – Elementos paralingüísticos",
      type: "communication theory",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Interpretar gestos, tono y ritmo", type: "paralanguage" }
      ]
    }
  ],

  technicalRequirements: "",
  modality: "SemiIntensive",
  startDate: "Por confirmar",
  access: "",
  support:
    "Ofrecemos acompañamiento cercano, retroalimentación detallada en producciones orales y escritas, entrenamiento en matices comunicativos, y apoyo específico para contextos académicos, profesionales y sociales avanzados.",
  gains:
    "Dominio de estructuras avanzadas, fluidez en debates y argumentación, comprensión precisa de matices, control del discurso, mejora general en producción oral y escrita, y confianza para desenvolverte en contextos altamente exigentes.",
  certificate: "",

  imageUrl: "/courses/curso-semiintensivo-espanol-c1.jpg",
  status: "soon",
  slug: "curso-semiintensivo-espanol-c1",
        },
{
  languageToLearn: "Spanish",
  topCourses: true,

  title: "Curso Semi-intensivo de español A1",
  subTitle: "Aprende español desde cero y construye una base sólida para comunicarte en situaciones cotidianas",
  price: "Desde 150€ al mes",
  hoursPerWeek: "4.5",
  longDesc:
    "Inicia tu camino en el español con un curso claro, práctico y dinámico. Aprenderás a presentarte, describir tu entorno, hablar de tu rutina, pedir información básica y desenvolverte en las situaciones más comunes del día a día. Gracias al formato semi-intensivo progresarás de forma constante, consolidando las estructuras fundamentales del idioma para comunicarte con seguridad desde el primer mes.",

  maxPeople: "6",
  duration: "5 meses (20 semanas)",
  format: "Online",
  level: "A1",
  requirements:
    "No se requieren conocimientos previos. Ideal para personas que empiezan desde cero.",

  learningObjetives:
    "Aprender a presentarse y dar información personal básica, describir personas y objetos, hablar del día a día, pedir y dar información simple, desenvolverse en tiendas y restaurantes, comprender expresiones frecuentes, usar estructuras básicas del español y adquirir vocabulario esencial para la vida cotidiana.",

  modules: [
    {
      title: "Unidad 0 – Primeros pasos en español",
      type: "basics",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Saludos y despedidas", type: "speaking" },
        { title: "Objetos de la clase", type: "vocabulary" },
        { title: "Números del 1 al 10", type: "basics" },
        { title: "Abecedario y pronunciación", type: "phonetics" },
        { title: "Recursos para desenvolverse en clase", type: "functional language" }
      ]
    },
    {
      title: "Unidad 1 – Presentaciones y datos personales",
      type: "communication",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Dar y pedir datos personales", type: "speaking" },
        { title: "Saludar y despedirse", type: "interaction" }
      ]
    },
    {
      title: "Unidad 2 – Intenciones y habilidades",
      type: "functional language",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Expresar intenciones", type: "grammar" },
        { title: "Explicar motivos", type: "speaking" },
        { title: "Hablar de lo que sabemos hacer", type: "vocabulary" }
      ]
    },
    {
      title: "Unidad 3 – Lugares y clima",
      type: "description",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Describir lugares", type: "vocabulary" },
        { title: "Expresar existencia y ubicación", type: "grammar" },
        { title: "Hablar del clima y del tiempo", type: "speaking" }
      ]
    },
    {
      title: "Unidad 4 – Objetos, compras y preferencias",
      type: "daily life",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Identificar objetos", type: "vocabulary" },
        { title: "Expresar necesidad", type: "grammar" },
        { title: "Comprar en tiendas", type: "practical situations" },
        { title: "Hablar de preferencias", type: "speaking" }
      ]
    },
    {
      title: "Unidad 5 – Personas, gustos y relaciones",
      type: "description + interaction",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Describir aspecto y carácter", type: "vocabulary" },
        { title: "Contrastar gustos e intereses", type: "speaking" },
        { title: "Hablar de relaciones personales", type: "communication" }
      ]
    },
    {
      title: "Unidad 6 – Rutinas y hábitos",
      type: "daily life",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Hablar de hábitos y frecuencia", type: "grammar" },
        { title: "Decir la hora", type: "basics" }
      ]
    },
    {
      title: "Unidad 7 – Bares, restaurantes y comida",
      type: "practical situations",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Desenvolverse en restaurantes", type: "roleplay" },
        { title: "Hablar de comida y hábitos gastronómicos", type: "vocabulary" }
      ]
    },
    {
      title: "Unidad 8 – Ciudades y orientación",
      type: "description + navigation",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Describir pueblos y ciudades", type: "vocabulary" },
        { title: "Pedir y dar direcciones", type: "interaction" },
        { title: "Expresar gustos y destacar aspectos", type: "speaking" }
      ]
    },
    {
      title: "Unidad 9 – Experiencias y habilidades",
      type: "storytelling",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Hablar de experiencias pasadas", type: "past tense basics" },
        { title: "Hablar de cualidades y defectos", type: "vocabulary" }
      ]
    }
  ],

  technicalRequirements: "",
  modality: "SemiIntensive",
  startDate: "Por confirmar",
  access: "",
  support:
    "Acompañamiento constante del profesor, correcciones en clase, materiales adaptados para principiantes y apoyo para construir confianza desde la primera semana.",
  gains:
    "Seguridad para comunicarte en situaciones básicas, vocabulario esencial del día a día, comprensión clara de estructuras fundamentales, inicio en el uso del pasado y capacidad para desenvolverte en tiendas, bares, restaurantes y conversaciones simples.",
  certificate: "",

  imageUrl: "/courses/curso-semiintensivo-espanol-a1.jpg",
  status: "soon",
  slug: "curso-semiintensivo-espanol-a1",
        },
{
  languageToLearn: "Spanish",
  topCourses: true,

  title: "Curso Intensivo de español A1",
  subTitle: "Aprende español desde cero y construye una base sólida para comunicarte en situaciones cotidianas",
  price: "Desde 380€ al mes",
  hoursPerWeek: "10",
  longDesc:
    "Inicia tu camino en el español con un curso claro, práctico y dinámico diseñado para avanzar rápidamente desde cero. Aprenderás a presentarte, describir tu entorno, hablar de tu rutina, pedir información básica y desenvolverte en las situaciones más comunes del día a día. Gracias al formato intensivo progresarás con mayor rapidez, incorporando y practicando diariamente las estructuras fundamentales del idioma para comunicarte con seguridad desde las primeras semanas.",

  maxPeople: "6",
  duration: "2 meses y 2 semanas (10 semanas)",
  format: "Online",
  level: "A1",
  requirements:
    "No se requieren conocimientos previos. Ideal para personas que empiezan desde cero.",

  learningObjetives:
    "Aprender a presentarse y dar información personal básica, describir personas y objetos, hablar del día a día, pedir y dar información simple, desenvolverse en tiendas, restaurantes y otros servicios, comprender frases frecuentes, usar estructuras básicas del español y adquirir vocabulario esencial para la vida cotidiana.",

  modules: [
    {
      title: "Unidad 0 – Primeros pasos en español",
      type: "basics",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Saludos y despedidas", type: "speaking" },
        { title: "Objetos de la clase", type: "vocabulary" },
        { title: "Números del 1 al 10", type: "basics" },
        { title: "Abecedario y pronunciación", type: "phonetics" },
        { title: "Recursos para desenvolverse en clase", type: "functional language" }
      ]
    },
    {
      title: "Unidad 1 – Presentaciones y datos personales",
      type: "communication",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Dar y pedir datos personales", type: "speaking" },
        { title: "Saludar y despedirse", type: "interaction" }
      ]
    },
    {
      title: "Unidad 2 – Intenciones y habilidades",
      type: "functional language",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Expresar intenciones", type: "grammar" },
        { title: "Explicar motivos", type: "speaking" },
        { title: "Hablar de lo que sabemos hacer", type: "vocabulary" }
      ]
    },
    {
      title: "Unidad 3 – Lugares y clima",
      type: "description",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Describir lugares", type: "vocabulary" },
        { title: "Expresar existencia y ubicación", type: "grammar" },
        { title: "Hablar del clima y del tiempo", type: "speaking" }
      ]
    },
    {
      title: "Unidad 4 – Objetos, compras y preferencias",
      type: "daily life",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Identificar objetos", type: "vocabulary" },
        { title: "Expresar necesidad", type: "grammar" },
        { title: "Comprar en tiendas", type: "practical situations" },
        { title: "Hablar de preferencias", type: "speaking" }
      ]
    },
    {
      title: "Unidad 5 – Personas, gustos y relaciones",
      type: "description + interaction",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Describir aspecto y carácter", type: "vocabulary" },
        { title: "Contrastar gustos e intereses", type: "speaking" },
        { title: "Hablar de relaciones personales", type: "communication" }
      ]
    },
    {
      title: "Unidad 6 – Rutinas y hábitos",
      type: "daily life",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Hablar de hábitos y frecuencia", type: "grammar" },
        { title: "Preguntar y decir la hora", type: "basics" }
      ]
    },
    {
      title: "Unidad 7 – Bares, restaurantes y comida",
      type: "practical situations",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Desenvolverse en bares y restaurantes", type: "roleplay" },
        { title: "Hablar de hábitos gastronómicos", type: "vocabulary" }
      ]
    },
    {
      title: "Unidad 8 – Ciudades y orientación",
      type: "description + navigation",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Describir pueblos, barrios y ciudades", type: "vocabulary" },
        { title: "Pedir y dar indicaciones para llegar a un lugar", type: "interaction" },
        { title: "Expresar gustos y resaltar aspectos", type: "speaking" }
      ]
    },
    {
      title: "Unidad 9 – Experiencias y cualidades personales",
      type: "storytelling",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Hablar de experiencias pasadas (iniciación)", type: "past tense basics" },
        { title: "Hablar de habilidades, cualidades y defectos", type: "vocabulary" }
      ]
      }
  ],

  technicalRequirements: "",
  modality: "Intensive",
  startDate: "Por confirmar",
  access: "",
  support:
    "Acompañamiento cercano del profesor, práctica diaria guiada, corrección constante y materiales pensados para avanzar rápido sin perder claridad.",
  gains:
    "Progreso rápido en comunicación básica, seguridad para desenvolverte en situaciones cotidianas, vocabulario esencial y dominio de las estructuras fundamentales del español en poco tiempo.",
  certificate: "",

  imageUrl: "/courses/curso-intensivo-espanol-a1.jpg",
  status: "soon",
  slug: "curso-intensivo-espanol-a1",
        },
{
  languageToLearn: "Spanish",
  topCourses: true,

  title: "Curso Intensivo de español A2",
  subTitle: "Aprende español en un ritmo intensivo que acelera tu progreso y refuerza tus bases comunicativas",
  price: "Desde 380€ al mes",
  hoursPerWeek: "10",
  longDesc:
    "Este curso A2 intensivo está diseñado para estudiantes que desean avanzar de manera rápida y eficaz en su aprendizaje del español. A lo largo del programa ampliarás tu vocabulario, reforzarás las estructuras gramaticales del nivel y ganarás mayor soltura para desenvolverte en situaciones cotidianas más variadas. Gracias al ritmo intensivo, practicarás a diario comprensión oral, lectura, conversación y escritura mediante actividades dinámicas que aceleran tu progreso y fortalecen tu confianza. Este enfoque concentrado te permitirá asimilar contenidos clave en menos tiempo, mejorar tu capacidad para describir experiencias, expresar opiniones simples y comunicarte con más naturalidad y seguridad.",

  maxPeople: "6",
  duration: "Aprox. 2 meses y medio (10 semanas)",
  format: "Online",
  level: "A2",
  requirements: "Conocimientos previos de A1.",

  learningObjetives:
    "Reforzar y consolidar las bases del idioma, ampliar rápidamente el vocabulario útil, mejorar comprensión y expresión oral/escrita de manera acelerada, aplicar nuevas estructuras con seguridad y desarrollar mayor naturalidad en situaciones cotidianas más variadas.",

  modules: [
    {
      title: "Unidad 1 – Hábitos, dificultades y recomendaciones",
      type: "communication",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Hablar de hábitos y duración", type: "speaking" },
        { title: "Describir sentimientos", type: "vocabulary" },
        { title: "Hacer recomendaciones", type: "functional language" }
      ]
    },
    {
      title: "Unidad 2 – Pasado y duración de acciones",
      type: "past tenses",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Relatar acontecimientos pasados", type: "storytelling" },
        { title: "Inicio y duración de acciones", type: "grammar" }
      ]
    },
    {
      title: "Unidad 3 – Personas y relaciones",
      type: "description",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Describir personas físicamente", type: "vocabulary" },
        { title: "Parecidos y relaciones", type: "speaking" }
      ]
    },
    {
      title: "Unidad 4 – Gustos, casas y objetos",
      type: "daily life",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Expresar gustos y preferencias", type: "speaking" },
        { title: "Describir una casa", type: "vocabulary" },
        { title: "Comparaciones y coincidencia", type: "grammar" },
        { title: "Ubicar objetos en el espacio", type: "spatial language" }
      ]
    },
    {
      title: "Unidad 5 – Situaciones cotidianas formales",
      type: "practical situations",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Saludos y presentaciones", type: "interaction" },
        { title: "Pedir favores y acciones", type: "functional language" },
        { title: "Pedir y conceder permiso", type: "pragmatics" },
        { title: "Justificar y dar excusas", type: "speaking" }
      ]
    },
    {
      title: "Unidad 6 – Experiencias e intenciones",
      type: "storytelling + future",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Hablar de experiencias pasadas y valorarlas", type: "past tenses" },
        { title: "Hablar de intenciones y deseos", type: "future basics" }
      ]
    },
    {
      title: "Unidad 7 – Alimentación y recetas",
      type: "daily life",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Gustos y hábitos alimentarios", type: "vocabulary" },
        { title: "Explicar cómo se prepara un plato", type: "process description" }
      ]
    },
    {
      title: "Unidad 8 – Salud, estados y consejos",
      type: "health + communication",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Describir dolores y molestias", type: "vocabulary" },
        { title: "Hablar de estados de ánimo", type: "speaking" },
        { title: "Dar consejos", type: "functional language" }
      ]
    },
    {
      title: "Unidad 9 – Pasado y debate",
      type: "argumentation",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Hábitos y circunstancias en el pasado", type: "grammar" },
        { title: "Situar acciones en pasado y presente", type: "timeline" },
        { title: "Argumentar y debatir", type: "discussion" }
      ]
    },
    {
      title: "Unidad 10 – Relato y emociones",
      type: "storytelling",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Relatar en pasado", type: "narration" },
        { title: "Secuenciar acciones", type: "connectors" },
        { title: "Expresar emociones", type: "speaking" }
      ]
    }
  ],

  technicalRequirements: "",
  modality: "Intensive",
  startDate: "Por confirmar",
  access: "",
  support:
    "Acompañamiento cercano, práctica diaria guiada, correcciones constantes y materiales diseñados para avanzar con rapidez sin perder claridad.",
  gains:
    "Progreso acelerado en vocabulario y estructuras, mejora notable en soltura comunicativa, mayor seguridad en situaciones cotidianas, capacidad para relatar experiencias y expresarse con más naturalidad.",
  certificate: "",

  imageUrl: "/courses/curso-intensivo-espanol-a2.jpg",
  status: "soon",
  slug: "curso-intensivo-espanol-a2",
        },
{
  languageToLearn: "Spanish",
  topCourses: true,

  title: "Curso Intensivo de español B1",
  subTitle: "Avanza hacia un español más autónomo y natural con un ritmo acelerado",
  price: "Desde 380€ al mes",
  hoursPerWeek: "10",
  longDesc:
    "Este curso B1 intensivo está diseñado para estudiantes que ya dominan los contenidos de nivel A2 y quieren avanzar rápidamente hacia un uso más independiente del español. A lo largo de 12 semanas ampliarás notablemente tu vocabulario, mejorarás la precisión gramatical y ganarás fluidez para desenvolverte en situaciones cotidianas y semi-formales. El programa se centra en reforzar la comunicación real: comprender textos y audios más complejos, expresar opiniones, relatar experiencias con claridad, afrontar imprevistos y participar en conversaciones más espontáneas. Gracias al ritmo intensivo, progresarás rápidamente mientras asimilas las estructuras necesarias para comunicarte con mayor naturalidad y seguridad en español.",

  maxPeople: "6",
  duration: "Aprox. 3 meses (12 semanas)",
  format: "Online",
  level: "B1",
  requirements: "Haber completado el nivel A2 o tener conocimientos equivalentes.",

  learningObjetives:
    "Desarrollar autonomía comunicativa de forma rápida, ampliar vocabulario especializado y funcional, mejorar la comprensión de conversaciones más rápidas y textos más detallados, reforzar estructuras gramaticales del nivel y expresar opiniones, experiencias, planes y argumentos con claridad en un contexto intensivo.",

  modules: [
    {
      title: "Unidad 1 – Obligación, prohibición y hábitos",
      type: "functional language",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Expresar obligación y prohibición", type: "grammar" },
        { title: "Hablar de hábitos", type: "speaking" },
        { title: "Opinar y aconsejar", type: "functional language" }
      ]
    },
    {
      title: "Unidad 2 – Hábitos, pasado y duración",
      type: "communication + past tenses",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Hábitos en el presente", type: "conversation" },
        { title: "Relatar experiencias pasadas", type: "storytelling" },
        { title: "Inicio y duración de acciones", type: "grammar" },
        { title: "Localizar acciones en el tiempo", type: "time expressions" }
      ]
    },
    {
      title: "Unidad 3 – Futuro, condiciones e hipótesis",
      type: "future + conditionals",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Hablar de acciones futuras", type: "grammar" },
        { title: "Expresar condiciones", type: "functional language" },
        { title: "Formular hipótesis sobre el futuro", type: "speaking" }
      ]
    },
    {
      title: "Unidad 4 – Relatos, resúmenes y humor",
      type: "storytelling",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Relatar en presente", type: "narration" },
        { title: "Resumir libros y películas", type: "communication" },
        { title: "Entender chistes", type: "listening + pragmatics" }
      ]
    },
    {
      title: "Unidad 5 – Instrucciones, consejos y anuncios",
      type: "functional language",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Recomendar y aconsejar", type: "speaking" },
        { title: "Dar instrucciones", type: "imperatives" },
        { title: "Describir y analizar anuncios", type: "media literacy" }
      ]
    },
    {
      title: "Unidad 6 – Deseos, reclamaciones y soluciones",
      type: "communication",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Expresar deseos", type: "grammar" },
        { title: "Reclamaciones y necesidades", type: "roleplay" },
        { title: "Proponer soluciones", type: "discussion" },
        { title: "Escribir una carta abierta", type: "writing" }
      ]
    },
    {
      title: "Unidad 7 – Teléfono y videollamadas",
      type: "practical communication",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Desenvolverse por teléfono y videollamada", type: "roleplay" },
        { title: "Tomar y dejar recados", type: "listening + speaking" },
        { title: "Transmitir mensajes, órdenes y consejos", type: "reported speech basics" }
      ]
    },
    {
      title: "Unidad 8 – Anécdotas, interés y causalidad",
      type: "storytelling + connectors",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Recursos para contar anécdotas", type: "speaking" },
        { title: "Mostrar interés al escuchar", type: "interaction" },
        { title: "Hablar de causas y consecuencias", type: "grammar" }
      ]
    },
    {
      title: "Unidad 9 – Relaciones, sentimientos y desacuerdos",
      type: "communication + pragmatics",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Expresar intereses y sentimientos", type: "speaking" },
        { title: "Hablar de relaciones", type: "conversation" },
        { title: "Mostrar desacuerdo y suavizarlo", type: "pragmatics" },
        { title: "Contraargumentar", type: "discussion" }
      ]
    },
    {
      title: "Unidad 10 – Objetos y funcionamiento",
      type: "description",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Describir características de objetos", type: "vocabulary" },
        { title: "Explicar funcionamiento", type: "process description" },
        { title: "Opinar sobre objetos", type: "speaking" }
      ]
    },
    {
      title: "Unidad 11 – Valoraciones y conducta",
      type: "argumentation",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Valorar situaciones y hechos", type: "speaking" },
        { title: "Opinar sobre acciones y conductas", type: "discussion" }
      ]
    },
    {
      title: "Unidad 12 – Misterios, hipótesis y seguridad",
      type: "speculation",
      duration: "5 clases de 2h",
      submodules: [
        { title: "Hacer hipótesis y conjeturas", type: "speaking" },
        { title: "Relatar sucesos misteriosos", type: "storytelling" },
        { title: "Expresar grados de seguridad", type: "grammar" }
      ]
    }
  ],

  technicalRequirements: "",
  modality: "Intensive",
  startDate: "Por confirmar",
  access: "",
  support:
    "Seguimiento cercano del profesor, correcciones frecuentes, actividades extra para practicar entre clases y orientación para ganar seguridad en conversaciones reales.",
  gains:
    "Autonomía comunicativa acelerada, mayor fluidez en conversaciones espontáneas, comprensión de textos y audios más complejos y capacidad para expresar opiniones y argumentos con claridad en poco tiempo.",
  certificate: "",

  imageUrl: "/courses/curso-intensivo-espanol-b1.jpg",
  status: "soon",
  slug: "curso-intensivo-espanol-b1",
        },
{
  languageToLearn: "Spanish",
  topCourses: true,

  title: "Curso Intensivo de español B2",
  subTitle: "Avanza hacia un español más natural, fluido y seguro en menos tiempo",
  price: "Desde 380€ al mes",
  hoursPerWeek: "10",
  longDesc:
    "Este curso B2 intensivo está diseñado para estudiantes que ya dominan el nivel B1 y desean avanzar hacia un uso más espontáneo, preciso y matizado del español en menos tiempo. Trabajarás estructuras avanzadas, ampliarás tu vocabulario en temas actuales y complejos, mejorarás la comprensión de textos y audios auténticos y participarás en debates, análisis y actividades comunicativas reales. El curso se centra en la fluidez, la naturalidad y el control del discurso: expresar opiniones complejas, matizar, argumentar, contraargumentar, debatir, narrar con detalle y comprender a hablantes nativos en situaciones menos predecibles. Gracias al formato intensivo podrás progresar rápidamente y asimilar en profundidad nuevos recursos lingüísticos para desenvolverte con seguridad en contextos sociales, académicos y profesionales.",

  maxPeople: "6",
  duration: "Aprox. 6 meses y medio (27 semanas) – 80 sesiones de 1h30min",
  format: "Online",
  level: "B2",
  requirements: "Haber completado el nivel B1 o tener conocimientos equivalentes.",

  learningObjetives:
    "Desarrollar comunicación fluida y espontánea, comprender textos complejos, participar en conversaciones rápidas, argumentar y matizar opiniones, reconocer registros, mejorar la producción escrita avanzada y consolidar estructuras propias del nivel B2. También aprenderás a interpretar la intención comunicativa, reaccionar ante imprevistos y desenvolverte con seguridad en contextos sociales, laborales y académicos exigentes.",

  modules: [
    {
      title: "Unidad 1 – Noticias y opinión",
      type: "media + writing",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Comentar noticias", type: "speaking" },
        { title: "Redactar noticias", type: "writing" }
      ]
    },
    {
      title: "Unidad 2 – Opiniones, condiciones y propuestas",
      type: "argumentation",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Opinar y valorar", type: "speaking" },
        { title: "Aludir a intervenciones previas", type: "discourse markers" },
        { title: "Poner condiciones y hacer propuestas", type: "functional language" }
      ]
    },
    {
      title: "Unidad 3 – Consejos, hipótesis y deseos",
      type: "pragmatics",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Dar consejos avanzados", type: "grammar" },
        { title: "Evocar situaciones imaginarias", type: "conditionals" },
        { title: "Deseos y desconocimiento", type: "speaking" }
      ]
    },
    {
      title: "Unidad 4 – Sentimientos, personalidad y finalidad",
      type: "description + connectors",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Causa y finalidad", type: "grammar" },
        { title: "Sentimientos y carácter", type: "vocabulary" },
        { title: "Cualidades de personas y objetos", type: "speaking" }
      ]
    },
    {
      title: "Unidad 5 – Ciudades y creencias",
      type: "description",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Describir ciudades", type: "vocabulary" },
        { title: "Creencias previas", type: "pragmatics" },
        { title: "Expresar sentimientos", type: "speaking" }
      ]
    },
    {
      title: "Unidad 6 – Condiciones avanzadas",
      type: "conditionals",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Establecer condiciones y requisitos", type: "grammar" }
      ]
    },
    {
      title: "Unidad 7 – Instrucciones, postura corporal y estados",
      type: "communication",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Describir actividades y movimientos", type: "vocabulary" },
        { title: "Postura corporal", type: "description" },
        { title: "Sentimientos y estados de ánimo", type: "speaking" }
      ]
    },
    {
      title: "Unidad 8 – Finalidad, indirecto y compromisos",
      type: "functional language + reported speech",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Finalidad e intencionalidad", type: "grammar" },
        { title: "Promesas en estilo indirecto", type: "reported speech" },
        { title: "Reclamar compromisos", type: "pragmatics" }
      ]
    },
    {
      title: "Unidad 9 – Pasado complejo y relatos",
      type: "narration",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Combinar tiempos del pasado", type: "grammar" },
        { title: "Relatar cuentos y leyendas", type: "storytelling" },
        { title: "Transmitir peticiones y advertencias", type: "reported speech" }
      ]
    },
    {
      title: "Unidad 10 – Futuro y medio ambiente",
      type: "analysis + discourse",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Predicciones del futuro", type: "speaking" },
        { title: "Causas y consecuencias ambientales", type: "discussion" },
        { title: "Cohesión textual avanzada", type: "writing" }
      ]
    },
    {
      title: "Unidad 11 – Mundo laboral y textos formales",
      type: "professional language",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Hablar de trabajos y funciones", type: "speaking" },
        { title: "Describir empresas", type: "presentation" },
        { title: "Textos formales", type: "reading + writing" }
      ]
    },
    {
      title: "Unidad 12 – Pasado hipotético y reproches",
      type: "hypothesis in the past",
      duration: "6 clases de 1.5h",
      submodules: [
        { title: "Hechos hipotéticos y consecuencias", type: "grammar" },
        { title: "Reproches adecuados", type: "pragmatics" }
      ]
    }
  ],

  technicalRequirements: "",
  modality: "Intensive",
  startDate: "Por confirmar",
  access: "",
  support:
    "Seguimiento cercano, actividades avanzadas de conversación, análisis de textos reales, producción escrita corregida y orientación para debatir y argumentar con seguridad.",
  gains:
    "Fluidez real, comprensión avanzada, capacidad para debatir, argumentar y matizar, dominio de estructuras complejas y seguridad para desenvolverte en contextos académicos, sociales y profesionales.",
  certificate: "",

  imageUrl: "/courses/curso-intensivo-espanol-b2.jpg",
  status: "soon",
  slug: "curso-intensivo-espanol-b2",
        }
    ]
    //!Cursos
    for (const course of coursesSeed) {
        await Course.updateOne(
            { slug: course.slug },
            { $set: course },
            { upsert: true }
        );
        console.log(`Seed pricesado para: ${course.slug}`);
    }
    console.log("Todos los cursos han sido creados correctamente.");
    process.exit(0);

} seed().catch((err) => {
    console.log(err)
    process.exit(1)
});