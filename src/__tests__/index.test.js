import css from '../index';

describe("css utility", () => {
  test("ignores non-string arguments", () => 
    expect(css(true, false, undefined, null, ["foo"], { bar: "bar" }, 9001)).toBe(""));
  test("ignores empty strings and strings containing only whitespace", () => 
    expect(css("  \t", " \n", "")).toBe(""));
  test("dedupes classnames while preserving final order of application", () => 
    expect(css("a b c a", "d c", "b")).toBe("a d c b"));
  test("trims excess whitespace", () => 
    expect(css("  a", "  b    ", "c   ")).toBe("a b c"));
  test("plays nice with unicode", () =>
    expect(css('\u03A9')).toBe("Ω"))
});