export class FileUtils {
  public static convertFilename(filename: string): string {
    if (!filename) {
      return "";
    }
    return filename
      .replace(/\.gcode|\.nc|\.tap/gi, "")
      .replace(/_/g, " ");
  }
}
