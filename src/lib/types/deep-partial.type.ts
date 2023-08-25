export type DeepPartial<T extends object> = {
  [K in keyof T]?: T[K] extends any[]
    ? T[K]
    : T[K] extends object
    ? DeepPartial<T[K]>
    : T[K];
};
