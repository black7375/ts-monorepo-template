export default function hello() {
  console.log("Hello, World!!");
}

export function printNum(msg: number) {
  console.log("num: "+ msg);
}

export function add(...args: number[]) {
  return args.reduce((a, b) => a + b, 0)
}
