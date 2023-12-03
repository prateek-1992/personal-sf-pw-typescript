export interface IPageActions {
  load(): Promise<void>;
  reload(): Promise<void>;
  loadUrl(url: string);
  verifyIfPageHasLoaded(): Promise<void>;
}
