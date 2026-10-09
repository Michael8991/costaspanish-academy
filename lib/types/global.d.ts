declare global {
  interface Window {
    dataLayer?: Array<IArguments | Record<string, unknown>>;
  }

  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

export {};
