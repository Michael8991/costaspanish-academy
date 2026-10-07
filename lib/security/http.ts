import { NextResponse } from "next/server";

export const MAX_JSON_BODY_BYTES = 16 * 1024;

export type ApiErrorCode =
  | "INVALID_REQUEST"
  | "TOO_MANY_REQUESTS"
  | "INTERNAL_ERROR";

export class InvalidRequestError extends Error {
  constructor() {
    super("Invalid request");
    this.name = "InvalidRequestError";
  }
}

export async function readJsonBody(req: Request): Promise<unknown> {
  const contentType = req.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.includes("application/json")) {
    throw new InvalidRequestError();
  }

  const declaredLength = Number(req.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_JSON_BODY_BYTES) {
    throw new InvalidRequestError();
  }

  const rawBody = await req.text();
  if (!rawBody || new TextEncoder().encode(rawBody).byteLength > MAX_JSON_BODY_BYTES) {
    throw new InvalidRequestError();
  }

  try {
    return JSON.parse(rawBody) as unknown;
  } catch {
    throw new InvalidRequestError();
  }
}

export function successResponse() {
  return NextResponse.json({ success: true });
}

export function errorResponse(status: 400 | 429 | 500, error: ApiErrorCode) {
  return NextResponse.json({ success: false, error }, { status });
}

export function getClientIp(req: Request): string | undefined {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const candidate = forwardedFor?.split(",")[0]?.trim() || req.headers.get("x-real-ip")?.trim();
  return candidate && candidate.length <= 64 ? candidate : undefined;
}

export function logServerError(context: string, error: unknown) {
  console.error(`[${context}]`, {
    errorType: error instanceof Error ? error.name : "UnknownError",
  });
}
