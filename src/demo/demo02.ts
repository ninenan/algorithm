type Fn = (...args: unknown[]) => Promise<ReturnType> | ReturnType

const pLimit = (concurrency: number) => {
  if (!Number.isInteger(concurrency) && concurrency < 0) {
    return Promise.resolve();
  }
  const queue: any[] = [];
  let activeCount = 0;

  const next = () => {
    activeCount--;
    if (queue.length > 0) {
      queue.shift()();
    }
  };
  const run = async (fn: Fn, resolve, args: unknown[]) => {
    activeCount++;

    const result = (async () => fn(...args))();
    resolve(result);

    try {
      await result;
    } catch {}

    next();
  };

  const enqueue = (fn: Fn, resolve,  args: unknown[]) => {
    queue.push(run.bind(undefined, fn, resolve, args));

    (async () => {
      await Promise.resolve();

      if (activeCount < concurrency && queue.length > 0) {
        queue.shift()();
      }
    })();
  };

  const generator = (fn: Function, ...args: unknown[]) =>
    new Promise((resolve) => enqueue(fn, resolve, args));

  return generator;
};

const delay = (timer: number) => new Promise((resolve) => setTimeout(resolve, timer));

const limit = pLimit(1);
