import { describe, expect, it } from "vitest";

import {
  buildVirtualPageSnapshot,
  createVirtualPageViewTracker,
} from "@/lib/analytics/virtualPageView";

describe("virtual SPA pageviews", () => {
  it("does not duplicate the initial page or a previously emitted route", () => {
    const tracker = createVirtualPageViewTracker();
    tracker.reset(
      "https://www.costaspanishclass.com",
      "/en/contactUs",
      "Contact Costa Spanish Academy | Learn Spanish Online",
    );

    expect(tracker.capture(
      "https://www.costaspanishclass.com",
      "/en/contactUs",
      "Contact Costa Spanish Academy | Learn Spanish Online",
    )).toBeNull();
  });

  it("waits for the new route title and never reuses the previous title", () => {
    const tracker = createVirtualPageViewTracker();
    const oldTitle = "Contact Costa Spanish Academy | Learn Spanish Online";
    tracker.reset(
      "https://www.costaspanishclass.com",
      "/en/contactUs",
      oldTitle,
    );

    expect(tracker.capture(
      "https://www.costaspanishclass.com",
      "/en",
      oldTitle,
    )).toBeNull();

    expect(tracker.capture(
      "https://www.costaspanishclass.com",
      "/en",
      "Learn Spanish Online | Costa Spanish Academy",
    )).toEqual({
      event: "costa_virtual_page_view",
      costa_page: {
        page_location: "https://www.costaspanishclass.com/en",
        page_title: "Learn Spanish Online | Costa Spanish Academy",
      },
    });
  });

  it("emits each committed route only once", () => {
    const tracker = createVirtualPageViewTracker();
    tracker.reset("https://www.costaspanishclass.com", "/en", "Home");

    const first = tracker.capture(
      "https://www.costaspanishclass.com",
      "/en/spanish",
      "Spanish courses",
    );
    const duplicate = tracker.capture(
      "https://www.costaspanishclass.com",
      "/en/spanish",
      "Spanish courses",
    );

    expect(first?.costa_page.page_location).toBe(
      "https://www.costaspanishclass.com/en/spanish",
    );
    expect(duplicate).toBeNull();
  });

  it("strips query strings and fragments from page_location", () => {
    const snapshot = buildVirtualPageSnapshot(
      "https://www.costaspanishclass.com",
      "/en?email=private@example.com#secret",
      "Costa Spanish Academy",
    );

    expect(snapshot).toEqual({
      page_location: "https://www.costaspanishclass.com/en",
      page_title: "Costa Spanish Academy",
    });
    expect(JSON.stringify(snapshot)).not.toContain("private@example.com");
    expect(JSON.stringify(snapshot)).not.toContain("secret");
  });
});
