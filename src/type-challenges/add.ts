type CreateTupple<
  S extends number,
  Res extends 1[] = []
> = Res["length"] extends S ? Res : CreateTupple<S, [...Res, 1]>;

type Add<A extends number, B extends number> = [
  ...CreateTupple<A>,
  ...CreateTupple<B>
]["length"];

const num: Add<999, 99> = 1098;

console.log(num);

export {};
