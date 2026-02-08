export function parseTXT(content) {
  const lines = content.split("\n");
  const data = {};

  for (const line of lines) {
    const [key, ...rest] = line.split(":");
    if (!key || rest.length === 0) continue;

    data[key.trim()] = rest.join(":").trim();
  }

  return data;
}
