export class FileUtils {
  public static convertFilename(filename:string) : string {
    return filename
      .replace(/\.gcode|\.nc|\.tap/gi, "")
      .replace(/_/g, " ");
  }
}
