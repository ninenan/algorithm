// https://leetcode.cn/problems/distance-between-bus-stops/

const distanceBetweenBusStops = (distance: number[], start: number, destination: number) => {
  if (start === 1) 
  if (start > destination) {
    const temp = start;
    start = destination;
    destination = temp;
  }

  let sum1 = 0;
  let sum2 = 0;

  for (let index = 0; index < distance.length; index++) {
    if (index >= start && index < destination) {
      sum1 += distance[index];
    } else {
      sum2 += distance[index];
    }
  }

  return Math.min(sum2, sum1);
}

export {};
