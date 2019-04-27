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
    describe("parameter a is", () => {
      describe("valid (returns true)", () => {
        it("passed 0", async () => {
          expect(await validate({ a: "0" })).toBeTruthy();
        });
      });

      describe("invalid (returns false)", () => {
        it("passed null", async () => {
          expect(await validate({ a: null })).toBeFalsy();
        });

        it("passed -1", async () => {
          expect(await validate({ a: -1 })).toBeFalsy();
        });

        it("passed 4", async () => {
          expect(await validate({ a: 4 })).toBeFalsy();
        });

        it("passed str", async () => {
          expect(await validate({ a: "str" })).toBeFalsy();
        });
      });
    });

    describe("parameter b is", () => {
      describe("valid (returns true)", () => {
        it("passed 1290ad", async () => {
          expect(await validate({ b: "1290ad" })).toBeTruthy();
        });

        it("passed 1290abef", async () => {
          expect(await validate({ b: "1290abef" })).toBeTruthy();
        });
      });

      describe("invalid (returns false)", () => {
        it("passed null", async () => {
          expect(await validate({ b: null })).toBeFalsy();
        });

        it("passed ccc", async () => {
          expect(await validate({ b: "ccc" })).toBeFalsy();
        });

        it("passed 1290fg", async () => {
          expect(await validate({ b: "1290fg" })).toBeFalsy();
        });

        it("passed 1290ff1h", async () => {
          expect(await validate({ b: "1290ff1h" })).toBeFalsy();
        });
      });
    });

    describe("parameter c is", () => {
      describe("valid (returns true)", () => {
        it("passed 1:2:3:4", async () => {
          expect(await validate({ c: "1:2:3:4" })).toBeTruthy();
        });
      });

      describe("invalid (returns false)", () => {
        it("passed null", async () => {
          expect(await validate({ c: null })).toBeFalsy();
        });

        it("passed 01:2:3:4", async () => {
          expect(await validate({ c: "01:2:3:4" })).toBeFalsy();
        });

        it("passed 1:2:3", async () => {
          expect(await validate({ c: "1:2:3" })).toBeFalsy();
        });

        it("passed 1:2:3:4:5", async () => {
          expect(await validate({ c: "1:2:3:4:5" })).toBeFalsy();
        });
      });
    });

    describe("parameter cr is", () => {
      describe("valid (returns true)", () => {
        it("passed 0:1:0:1", async () => {
          expect(await validate({ cr: "0:1:0:1" })).toBeTruthy();
        });

        it("passed 0:0.2:0.123456789:1", async () => {
          expect(await validate({ cr: "0:0.2:0.123456789:1" })).toBeTruthy();
        });
      });

      describe("invalid (returns false)", () => {
        it("passed null", async () => {
          expect(await validate({ cr: null })).toBeFalsy();
        });

        it("passed 01:0:1:0", async () => {
          expect(await validate({ cr: "01:0:1:0" })).toBeFalsy();
        });

        it("passed 1:0:1", async () => {
          expect(await validate({ cr: "1:0:1" })).toBeFalsy();
        });

        it("passed 1:0:1:0:1", async () => {
          expect(await validate({ cr: "1:0:1:0:1" })).toBeFalsy();
        });

        it("passed 1.2:0:1:0", async () => {
          expect(await validate({ cr: "1.2:0:1:0" })).toBeFalsy();
        });
      });
    });

    describe("parameter f is", () => {
      describe("valid (returns true)", () => {
        it("passed jpg", async () => {
          expect(await validate({ f: "jpg" })).toBeTruthy();
        });

        it("passed webp", async () => {
          expect(await validate({ f: "webp" })).toBeTruthy();
        });
      });

      describe("invalid (returns false)", () => {
        it("passed null", async () => {
          expect(await validate({ f: null })).toBeFalsy();
        });

        it("passed bmp", async () => {
          expect(await validate({ f: "bmp" })).toBeFalsy();
        });
      });
    });

    describe("parameter g is", () => {
      describe("valid (returns true)", () => {
        it("passed 1", async () => {
          expect(await validate({ g: "1" })).toBeTruthy();
        });

        it("passed 9", async () => {
          expect(await validate({ g: "9" })).toBeTruthy();
        });
      });

      describe("invalid (returns false)", () => {
        it("passed null", async () => {
          expect(await validate({ g: null })).toBeFalsy();
        });

        it("passed 0", async () => {
          expect(await validate({ g: "0" })).toBeFalsy();
        });

        it("passed 10", async () => {
          expect(await validate({ g: "10" })).toBeFalsy();
        });
      });
    });

    describe("parameter h is", () => {
      describe("valid (returns true)", () => {
        it("passed 1", async () => {
          expect(await validate({ h: "1" })).toBeTruthy();
        });

        it("passed 1080", async () => {
          expect(await validate({ h: "9999" })).toBeTruthy();
        });
      });

      describe("invalid (returns false)", () => {
        it("passed null", async () => {
          expect(await validate({ h: null })).toBeFalsy();
        });

        it("passed 0", async () => {
          expect(await validate({ h: "0" })).toBeFalsy();
        });

        it("passed -1", async () => {
          expect(await validate({ h: "-1" })).toBeFalsy();
        });
      });
    });

    describe("parameter o is", () => {
      describe("valid (returns true)", () => {
        it("passed 0", async () => {
          expect(await validate({ o: "0" })).toBeTruthy();
        });

        it("passed 1", async () => {
          expect(await validate({ o: "1" })).toBeTruthy();
        });
        it("passed false", async () => {
          expect(await validate({ o: "false" })).toBeTruthy();
        });

        it("passed true", async () => {
          expect(await validate({ o: "true" })).toBeTruthy();
        });
      });

      describe("invalid (returns false)", () => {
        it("passed null", async () => {
          expect(await validate({ o: null })).toBeFalsy();
        });

        it("passed str", async () => {
          expect(await validate({ o: "str" })).toBeFalsy();
        });
      });
    });

    describe("parameter r is", () => {
      describe("valid (returns true)", () => {
        it("passed 1", async () => {
          expect(await validate({ r: "1" })).toBeTruthy();
        });

        it("passed 8", async () => {
          expect(await validate({ r: "8" })).toBeTruthy();
        });

        it("passed auto", async () => {
          expect(await validate({ r: "auto" })).toBeTruthy();
        });
      });

      describe("invalid (returns false)", () => {
        it("passed null", async () => {
          expect(await validate({ r: null })).toBeFalsy();
        });

        it("passed 0", async () => {
          expect(await validate({ r: "0" })).toBeFalsy();
        });

        it("passed 9", async () => {
          expect(await validate({ r: "9" })).toBeFalsy();
        });
      });
    });

    describe("parameter through is", () => {
      describe("valid (returns true)", () => {
        it("passed jpg", async () => {
          expect(await validate({ through: "jpg" })).toBeTruthy();
        });

        it("passed jpg:png", async () => {
          expect(await validate({ through: "jpg:png" })).toBeTruthy();
        });
      });

      describe("invalid (returns false)", () => {
        it("passed null", async () => {
          expect(await validate({ through: null })).toBeFalsy();
        });

        it("passed bmp", async () => {
          expect(await validate({ through: "bmp" })).toBeFalsy();
        });

        it("passed jpg:", async () => {
          expect(await validate({ through: "jpg:" })).toBeFalsy();
        });

        it("passed jpg:bmp", async () => {
          expect(await validate({ through: "jpg:bmp" })).toBeFalsy();
        });
      });
    });

    describe("parameter u is", () => {
      describe("valid (returns true)", () => {
        it("passed 0", async () => {
          expect(await validate({ u: "0" })).toBeTruthy();
        });

        it("passed 1", async () => {
          expect(await validate({ u: "1" })).toBeTruthy();
        });
        it("passed false", async () => {
          expect(await validate({ u: "false" })).toBeTruthy();
        });

        it("passed true", async () => {
          expect(await validate({ u: "true" })).toBeTruthy();
        });
      });

      describe("invalid (returns false)", () => {
        it("passed null", async () => {
          expect(await validate({ u: null })).toBeFalsy();
        });

        it("passed str", async () => {
          expect(await validate({ u: "str" })).toBeFalsy();
        });
      });
    });

    describe("parameter v is", () => {
      describe("valid (returns true)", () => {
        it("passed str", async () => {
          expect(await validate({ v: "str" })).toBeTruthy();
        });
      });

      describe("invalid (returns false)", () => {
        it("passed null", async () => {
          expect(await validate({ v: null })).toBeFalsy();
        });
      });
    });

    describe("parameter w is", () => {
      describe("valid (returns true)", () => {
        it("passed 1", async () => {
          expect(await validate({ w: "1" })).toBeTruthy();
        });

        it("passed 1080", async () => {
          expect(await validate({ w: "9999" })).toBeTruthy();
        });
      });

      describe("invalid (returns false)", () => {
        it("passed null", async () => {
          expect(await validate({ h: null })).toBeFalsy();
        });

        it("passed 0", async () => {
          expect(await validate({ w: "0" })).toBeFalsy();
        });

        it("passed -1", async () => {
          expect(await validate({ w: "-1" })).toBeFalsy();
        });
      });
    });
  });
});
