export function omit<T extends object, K extends keyof T>(
    obj: T,
    keys: K[],
): Omit<T, K> {
    return obj
        ? Object.keys(obj).reduce(
              (o, key) => {
                  if (!keys.includes(key as K)) {
                      o[key] = obj[key];
                  }
                  return o;
              },
              {} as Omit<T, K>,
          )
        : null;
}

export type AuthenticatedRequest = Request & {
    user: {
        sub: string;
        username: string;
    };
};
