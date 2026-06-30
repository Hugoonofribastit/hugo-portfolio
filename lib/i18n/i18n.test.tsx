import { describe, it, expect } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { LanguageProvider } from "./LanguageProvider";
import { useT, useLang } from "./useT";
import { en } from "./en";
import { es } from "./es";

function Probe() {
  const t = useT();
  const { toggle } = useLang();
  return <button onClick={toggle}>{t.nav.about}</button>;
}

describe("i18n", () => {
  it("defaults to English and toggles to Spanish", () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    );
    const btn = screen.getByRole("button");
    expect(btn.textContent).toBe("About");
    act(() => {
      btn.click();
    });
    expect(btn.textContent).toBe("Perfil");
  });

  it("en and es share the same top-level keys", () => {
    expect(Object.keys(es)).toEqual(Object.keys(en));
  });
});
