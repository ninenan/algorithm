type GetRefProps<T> = "ref" extends keyof T
  ? T extends { ref?: infer R | undefined }
    ? R
    : never
  : never;

const obj = {
  ref: "222",
};

const ref: GetRefProps<typeof obj> = "333";

export {};
