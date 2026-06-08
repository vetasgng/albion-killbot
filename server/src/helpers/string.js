/** Strips `**` markdown and truncates to `maxChars`, appending `…` when shortened. */
function truncatePlainTextEllipsis(raw, maxChars) {
  const cleaned = raw.replace(/\*\*/g, "");
  if (cleaned.length <= maxChars) {
    return cleaned;
  }
  return `${cleaned.slice(0, Math.max(0, maxChars - 1))}…`;
}

/** Approximate monospace column count in Discord code blocks (emoji/CJK ≈ 2). */
function monospaceDisplayWidth(text) {
  let width = 0;
  for (const char of text) {
    width += isWideMonospaceChar(char) ? 2 : 1;
  }
  return width;
}

/** Pad to a target monospace column width (see {@link monospaceDisplayWidth}). */
function padMonospace(text, width, alignment) {
  const pad = Math.max(0, width - monospaceDisplayWidth(text));
  const spaces = " ".repeat(pad);
  return alignment === "right" ? spaces + text : text + spaces;
}

function isWideMonospaceChar(char) {
  if (/\p{Extended_Pictographic}/u.test(char)) {
    return true;
  }
  const cp = char.codePointAt(0);
  if (cp === undefined) {
    return false;
  }
  return (
    (cp >= 0x1100 && cp <= 0x11ff) ||
    (cp >= 0x2e80 && cp <= 0x9fff) ||
    (cp >= 0xf900 && cp <= 0xfaff) ||
    (cp >= 0xfe10 && cp <= 0xfe19) ||
    (cp >= 0xff01 && cp <= 0xff60)
  );
}

module.exports = {
  monospaceDisplayWidth,
  padMonospace,
  truncatePlainTextEllipsis,
};
