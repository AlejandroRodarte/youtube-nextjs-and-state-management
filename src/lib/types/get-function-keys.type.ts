// get keys from object that relate to functions
export type GetFunctionKeys<ObjectType> = {
  [Key in keyof ObjectType]: ObjectType[Key] extends (...args: any[]) => any
    ? Key
    : never;
}[keyof ObjectType];
