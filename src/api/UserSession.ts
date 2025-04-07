import { SmotretAnimeAPI } from './SmotretAnimeAPI';

export class UserSession {
  private api: SmotretAnimeAPI;
  private userToken?: string;

  constructor(apiBaseUrl?: string, userAgent?: string) {
    // Создаем экземпляр API-обёртки
    this.api = new SmotretAnimeAPI(apiBaseUrl, userAgent);
  }

  // Метод для установки токена для текущей сессии
  public setAccessToken(token: string): void {
    this.userToken = token;
    this.api.setAccessToken(token);
  }

  // Метод для авторизации, который сохраняет токен
  public async login(email: string, password: string): Promise<string> {
    const token = await this.api.login(email, password);
    this.setAccessToken(token);
    return token;
  }

  // Прокси-методы для доступа к API
  public getTranslations(feed: 'recent' | 'id' | 'all' = 'recent', afterId?: number) {
    return this.api.getTranslations(feed, afterId);
  }

}
