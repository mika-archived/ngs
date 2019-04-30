import sanitize from "../src/sanitizer";
import { Parameters } from "../src/types";
import { cast } from "../src/validator";

describe("sanitizer", () => {
  describe("#sanitize", () => {
    let value!: Parameters;

    describe("dropped default values", () => {
      beforeAll(async () => {
        value = sanitize(await cast({}));
      });

      it("b is undefined", () => {
        expect(value.b).toBeUndefined();
      });

      it("cr is undefined", () => {
        expect(value.cr).toBeUndefined();
      });

      it("f is undefined", () => {
        expect(value.f).toBeUndefined();
      });

      it("g is undefined", () => {
        expect(value.g).toBeUndefined();
      });

      it("o is undefined", () => {
        expect(value.o).toBeUndefined();
      });

      it("q is undefined", () => {
        expect(value.q).toBeUndefined();
      });

      it("r is undefined", () => {
        expect(value.r).toBeUndefined();
      });

      it("u is undefined", () => {
        expect(value.u).toBeUndefined();
      });
    });

    describe("does not drop modified values", () => {
      beforeAll(async () => {
        value = sanitize(
          await cast({
            a: "1",
            b: "cccccc",
            c: "0:0:100:100",
            cr: "0.25:0.25:0.75:0.75",
            f: "webp",
            g: "1",
            h: "1080",
            o: "0",
            q: "100",
            r: "auto",
            through: "png",
            u: "0",
            v: "2",
            w: "1920"
          })
        );
      });

      it("a is 1", () => {
        expect(value.a).toBe(1);
      });

      it("b is cccccc", () => {
        expect(value.b).toBe("cccccc");
      });

      it("c is 0:0:100:100", () => {
        expect(value.c).toBe("0:0:100:100");
      });

      it("cr is 0.25:0.25:0.75:0.75", () => {
        expect(value.cr).toBe("0.25:0.25:0.75:0.75");
      });

      it("f is webp", () => {
        expect(value.f).toBe("webp");
      });

      it("g is 1", () => {
        expect(value.g).toBe(1);
      });

      it("h is 1080", () => {
        expect(value.h).toBe(1080);
      });

      it("o is false", () => {
        expect(value.o).toBeFalsy();
      });

      it("q is 100", () => {
        expect(value.q).toBe(100);
      });

      it("r is auto", () => {
        expect(value.r).toBe("auto");
      });

      it("through is png", () => {
        expect(value.through).toBe("png");
      });

      it("u is false", () => {
        expect(value.u).toBeFalsy();
      });

      it("v is 2", () => {
        expect(value.v).toBe("2");
      });

      it("w is 1920", () => {
        expect(value.w).toBe(1920);
      });
    });
  });
});
