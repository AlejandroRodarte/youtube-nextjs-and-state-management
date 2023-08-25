// (1) interface used by BehaviorSubjectWithStorage
// (2) this is so we could have a Storageable[] list and be able to
// loop through it and call all these methods in one go
export interface Storageable {
  syncWithStorageValue(): void;
  startPersiting(): void;
  stopPersisting(): void;
}
