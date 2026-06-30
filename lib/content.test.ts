import { describe, it, expect } from "vitest";
import { projects, stackGroups, timeline, socials } from "./content";

describe("content", () => {
  it("frames projects correctly (Client vs Product)", () => {
    const byId = Object.fromEntries(projects.map((p) => [p.id, p]));
    expect(byId.enippon.kind).toBe("Client");
    expect(byId.chimbela.kind).toBe("Client");
    expect(byId.instacheck.kind).toBe("Product");
  });

  it("the 3 preview projects have an https url and a /projects image", () => {
    ["enippon", "chimbela", "instacheck"].forEach((id) => {
      const p = projects.find((x) => x.id === id)!;
      expect(p.url).toMatch(/^https:\/\//);
      expect(p.image).toMatch(/^\/projects\//);
    });
  });

  it("has social links for email and linkedin", () => {
    const labels = socials.map((s) => s.label.toLowerCase());
    expect(labels).toEqual(expect.arrayContaining(["email", "linkedin"]));
  });

  it("stack groups and timeline are populated", () => {
    expect(stackGroups.length).toBeGreaterThanOrEqual(5);
    expect(timeline.length).toBe(4);
    stackGroups.forEach((g) => expect(g.items.length).toBeGreaterThan(0));
  });
});
