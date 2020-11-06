import { promisify } from "util";

const wait = promisify((a, b) =>
setTimeout(b, a)
);

export default wait;