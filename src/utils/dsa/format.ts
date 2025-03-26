export function formatFileName(name: string, fallback: string = "_"): string {
  const invalids = /[<>:"/\\|?*]/g;

  name = name.replace(invalids, fallback);

  name = name.trim().replace(/^\.+|\.+$/g, "");

  name = name.length > 255 ? name.substring(0, 255) : name;

  return name || "default_name";
}
