export const GTM_VIRTUAL_PAGE_VIEW_EVENT = "costa_virtual_page_view" as const;
export const GTM_PAGE_ENVELOPE = "costa_page" as const;
export const MAX_PAGE_TITLE_LENGTH = 200;

const CONTROL_CHARACTERS = /[\u0000-\u001F\u007F]/;

export type VirtualPageSnapshot = {
  page_location: string;
  page_title: string;
};

export type VirtualPageViewEvent = {
  event: typeof GTM_VIRTUAL_PAGE_VIEW_EVENT;
  [GTM_PAGE_ENVELOPE]: VirtualPageSnapshot;
};

export function buildVirtualPageSnapshot(
  origin: string,
  pathname: string,
  title: string,
): VirtualPageSnapshot | null {
  if (!pathname.startsWith("/") || pathname.startsWith("//")) return null;

  const pageTitle = title.trim();
  if (
    pageTitle.length === 0
    || pageTitle.length > MAX_PAGE_TITLE_LENGTH
    || CONTROL_CHARACTERS.test(pageTitle)
  ) {
    return null;
  }

  try {
    const parsedOrigin = new URL(origin);
    if (parsedOrigin.protocol !== "https:" && parsedOrigin.protocol !== "http:") {
      return null;
    }

    const cleanPathname = pathname.split(/[?#]/, 1)[0];
    return {
      page_location: `${parsedOrigin.origin}${cleanPathname}`,
      page_title: pageTitle,
    };
  } catch {
    return null;
  }
}

export function createVirtualPageViewTracker() {
  let lastLocation: string | null = null;
  let lastTitle: string | null = null;

  function reset(origin: string, pathname: string, title: string): void {
    const snapshot = buildVirtualPageSnapshot(origin, pathname, title);
    if (!snapshot) return;
    lastLocation = snapshot.page_location;
    lastTitle = snapshot.page_title;
  }

  function capture(
    origin: string,
    pathname: string,
    title: string,
  ): VirtualPageViewEvent | null {
    const snapshot = buildVirtualPageSnapshot(origin, pathname, title);
    if (!snapshot || snapshot.page_location === lastLocation) return null;

    if (snapshot.page_title === lastTitle) return null;

    lastLocation = snapshot.page_location;
    lastTitle = snapshot.page_title;
    return {
      event: GTM_VIRTUAL_PAGE_VIEW_EVENT,
      [GTM_PAGE_ENVELOPE]: snapshot,
    };
  }

  return { capture, reset };
}
