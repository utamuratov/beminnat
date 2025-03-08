export class StorageService {
  // DATA
  public static get accessToken(): string | null {
    return StorageService.getItem('accessToken');
  }
  public static set accessToken(v: string) {
    StorageService.setItem('accessToken', v);
  }

  // GENERAL METHODS
  public static setItem(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  public static getItem(key: string) {
    return localStorage.getItem(key);
  }

  public static removeItem(key: string) {
    localStorage.removeItem(key);
  }

  public static clear() {
    localStorage.clear();
  }
}
