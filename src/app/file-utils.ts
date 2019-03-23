export class FileUtils {
  public static convertFilename(filename:string) : string {
    return filename
      .replace(/\.gcode|\.nc/gi, "")
      .replace(/_/g, " ");
  }
}
