export const PUBLIC_SPANISH_OFFERINGS = [
  {
    key: "private",
    slug: "clases-privadas-espanol",
    presentationRole: "private",
    statusKey: null,
  },
  {
    key: "a1",
    slug: "curso-semiintensivo-espanol-a1",
    presentationRole: "regularGroup",
    level: "A1",
    image: "/assets/AulaPrincipalGruposReducidos.png",
    statusKey: "activeGroups",
  },
  {
    key: "a2",
    slug: "curso-semiintensivo-espanol-a2",
    presentationRole: "regularGroup",
    level: "A2",
    image: "/assets/AulaPrincipalGruposReducidos.png",
    statusKey: "enrollmentOpen",
  },
  {
    key: "intensive",
    slug: "curso-intensivo-espanol-b1",
    presentationRole: "intensive",
    level: "B1",
    image: "/courses/curso-intensivo-espanol-b1.jpg",
    statusKey: "enrollmentOpen",
  },
] as const;

export type PublicSpanishOffering = (typeof PUBLIC_SPANISH_OFFERINGS)[number];
export type PublicOfferingKey = PublicSpanishOffering["key"];
