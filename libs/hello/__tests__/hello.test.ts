import { describe, it, expect, vi } from "vitest";
import { printNum, add } from "../src/index";

// integrated test suites
describe("Add num prints", () => {
  it.concurrent("One num", () => {
    console.log = vi.fn();

    printNum(add());
    expect(console.log).toBeCalledWith("num: 0");
    printNum(add(0));
    expect(console.log).toBeCalledWith("num: 0");
    printNum(add(20));
    expect(console.log).toBeCalledWith("num: 20");
    printNum(add(20.5));
    expect(console.log).toBeCalledWith("num: 20.5");
  });

  it.concurrent("Multiple num", () => {
    console.log = vi.fn();

    printNum(add(0, 1));
    expect(console.log).toBeCalledWith("num: 1");
    printNum(add(1, 2, 3));
    expect(console.log).toBeCalledWith("num: 6");
    printNum(add(1, 2, 0.5));
    expect(console.log).toBeCalledWith("num: 3.5");
  });
});
