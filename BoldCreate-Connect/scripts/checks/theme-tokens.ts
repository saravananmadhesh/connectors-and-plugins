/** Reads the opaque colour tokens of one theme block in a stylesheet as relative luminances. */

const srgbToLinear = (value: number) =>
  value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;

function oklchLuminance(lightness: number, chroma: number, hue: number): number {
  const radians = (hue * Math.PI) / 180;
  const a = chroma * Math.cos(radians);
  const b = chroma * Math.sin(radians);
  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const red = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const green = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const blue = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  const clamp = (value: number) => Math.min(1, Math.max(0, value));
  return 0.2126 * clamp(red) + 0.7152 * clamp(green) + 0.0722 * clamp(blue);
}

function hexLuminance(hex: string): number {
  const [red, green, blue] = [1, 3, 5].map((at) =>
    srgbToLinear(Number.parseInt(hex.slice(at, at + 2), 16) / 255),
  );
  return 0.2126 * red! + 0.7152 * green! + 0.0722 * blue!;
}

/** Relative luminance of every opaque `oklch()` or hex token in the block, following `var()` aliases. */
export function themeLuminances(css: string, selector: string): Map<string, number> {
  const start = css.indexOf(`${selector} {`);
  const block = css.slice(start, css.indexOf('}', start));
  const raw = new Map<string, string>();
  for (const [, name, value] of block.matchAll(/--([a-z-]+):\s*([^;]+);/g)) {
    raw.set(name!, value!.trim());
  }
  const tokens = new Map<string, number>();
  const resolve = (value: string, depth = 0): number | undefined => {
    const alias = /^var\(--([a-z-]+)\)$/.exec(value);
    if (alias)
      return depth < 5 && raw.has(alias[1]!) ? resolve(raw.get(alias[1]!)!, depth + 1) : undefined;
    if (/^#[\da-f]{6}$/i.test(value)) return hexLuminance(value);
    const match = /^oklch\(([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)\)$/.exec(value);
    if (!match) return undefined;
    const lightness = Number(match[1]) / (match[2] ? 100 : 1);
    return oklchLuminance(lightness, Number(match[3]), Number(match[4]));
  };
  for (const [name, value] of raw) {
    const luminance = resolve(value);
    if (luminance !== undefined) tokens.set(name, luminance);
  }
  return tokens;
}

export function contrastRatio(theme: Map<string, number>, foreground: string, background: string) {
  const a = theme.get(foreground) ?? Number.NaN;
  const b = theme.get(background) ?? Number.NaN;
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
