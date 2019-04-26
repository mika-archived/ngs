import { cast, validate } from "../src/validator";

describe("validator", () => {
  describe("#cast", () => {
    describe("default values is", () => {
      let value!: any;

      beforeAll(async () => {
        value = await cast({});
      });

      it("a is undefined", () => {
        expect(value.a).toBeUndefined();
      });

      it("b is ffffff", () => {
        expect(value.b).toBe("ffffff");
      });

      it("c is undefined", () => {
        expect(value.c).toBeUndefined();
      });

      it("cr is 0:0:1:1", () => {
        expect(value.cr).toBe("0:0:1:1");
      });

      it("f is auto", () => {
        expect(value.f).toBe("auto");
      });

      it("g is 4", () => {
        expect(value.g).toBe(4);
      });

      it("h is undefined", () => {
        expect(value.h).toBeUndefined();
      });

      it("o is true", () => {
        expect(value.o).toBeTruthy();
      });

      it("r is 1", () => {
        expect(value.r).toBe("1");
      });

      it("through is undefined", () => {
        expect(value.through).toBeUndefined();
      });

      it("u is true", () => {
        expect(value.u).toBeTruthy();
      });

      it("v is undefined", () => {
        expect(value.v).toBeUndefined();
      });

      it("w is undefined", () => {
        expect(value.w).toBeUndefined();
      });
    });

    describe("casted value is", () => {
      let value!: any;

      beforeAll(async () => {
        value = await cast({
          a: "1",
          b: "cccccc",
          c: "0:0:100:100",
          cr: "0.25:0.25:0.75:0.75",
          f: "webp",
          g: "1",
          h: 1080,
          o: "1",
          r: "auto",
          through: "png",
          u: "0",
          v: "2",
          w: 1920
        });
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

      it("o is true", () => {
        expect(value.o).toBeTruthy();
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

  describe("#validate", () => {
    describe("parameter a", () => {
      describe("is valid", () => {
        it("that passed 0, returns true", async () => {
          expect(await validate({ a: "0" })).toBeTruthy();
        });
      });

      describe("is invalid", () => {
        it("that passes -1, returns false", async () => {
          expect(await validate({ a: -1 })).toBeFalsy();
        });

        it("that passed 4, returns false", async () => {
          expect(await validate({ a: 4 })).toBeFalsy();
        });

        it("that passed str, returns false", async () => {
          expect(await validate({ a: "str" })).toBeFalsy();
        });
      });
    });

    describe("parameter b", () => {
      describe("is valid", () => {
        it("that passed 1290ad, returns true", async () => {
          expect(await validate({ b: "1290ad" })).toBeTruthy();
        });

        it("that passed 1290abef, returns true", async () => {
          expect(await validate({ b: "1290abef" })).toBeTruthy();
        });
      });

      describe("is invalid", () => {
        it("that passed ccc, returns false", async () => {
          expect(await validate({ b: "ccc" })).toBeFalsy();
        });

        it("that passed 1290fg, returns false", async () => {
          expect(await validate({ b: "1290fg" })).toBeFalsy();
        });

        it("that passed 1290ff1h, returns false", async () => {
          expect(await validate({ b: "1290ff1h" })).toBeFalsy();
        });
      });
    });

    describe("parameter c", () => {
      describe("is valid", () => {
        test("that passed 1:2:3:4, returns true", async () => {
          expect(await validate({ c: "1:2:3:4" })).toBeTruthy();
        });
      });

      describe("is invalid", () => {
        test("that passed 01:2:3:4, returns false", async () => {
          expect(await validate({ c: "01:2:3:4" })).toBeFalsy();
        });

        test("that passed 1:2:3, returns false", async () => {
          expect(await validate({ c: "1:2:3" })).toBeFalsy();
        });

        test("that passed 1:2:3:4:5, returns false", async () => {
          expect(await validate({ c: "1:2:3:4:5" })).toBeFalsy();
        });
      });
    });

    describe("parameter cr", () => {
      describe("is valid", () => {
        test("that passed 0:1:0:1, returns true", async () => {
          expect(await validate({ cr: "0:1:0:1" })).toBeTruthy();
        });

        test("that passed 0:0.2:0.123456789:1, returns true", async () => {
          expect(await validate({ cr: "0:0.2:0.123456789:1" })).toBeTruthy();
        });
      });

      describe("is invalid", () => {
        test("that passed 01:0:1:0, returns false", async () => {
          expect(await validate({ cr: "01:0:1:0" })).toBeFalsy();
        });

        test("that passed 1:0:1, returns false", async () => {
          expect(await validate({ cr: "1:0:1" })).toBeFalsy();
        });

        test("that passed 1:0:1:0:1, returns false", async () => {
          expect(await validate({ cr: "1:0:1:0:1" })).toBeFalsy();
        });

        test("that passed 1.2:0:1:0, returns false", async () => {
          expect(await validate({ cr: "1.2:0:1:0" })).toBeFalsy();
        });
      });
    });
  });
});
