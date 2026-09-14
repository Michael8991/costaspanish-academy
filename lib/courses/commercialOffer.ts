// Prices absent from the Course document. Duo prices cover the entire 1:2 lesson.
export const COMMERCIAL_OFFER = {
  "clases-privadas-espanol": {
    private: {
      "1:1": { packages: { 4: 85, 8: 160, 12: 220 } },
      "1:2": { single: 35, packages: { 4: 119, 8: 224, 12: 308 } },
    },
  },
  "curso-semiintensivo-espanol-a1": {},
  "curso-semiintensivo-espanol-a2": {},
  "curso-intensivo-espanol-b1": { fourWeeks: 630 },
} as const;
