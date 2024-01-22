import { addDays, subDays } from "date-fns";

const now = new Date();

export default [
  { x: subDays(now, 2).toISOString(), y: 25 },
  { x: subDays(now, 1).toISOString(), y: 52 },
  { x: now.toISOString(), y: 64 },
  { x: addDays(now, 1).toISOString(), y: 75 },
];
