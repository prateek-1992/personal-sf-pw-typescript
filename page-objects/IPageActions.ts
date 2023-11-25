export interface IPageActions {
  load(): Promise<void>;
  verifyIfPageHasLoaded(): Promise<void>;
}
