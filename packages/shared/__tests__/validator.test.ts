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

      it("q is 75", () => {
        expect(value.q).toBe(75);
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
          h: "1080",
          o: "1",
          q: "100",
          r: "auto",
          through: "png",
          u: "0",
          v: "2",
          w: "1920"
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

  describe("#validate", () => {
    describe("parameter a is", () => {
      describe("valid (returns true)", () => {
        it("passed 0", async () => {
          await expect(validate({ a: "0" })).resolves.toBeTruthy();
        });
      });

      describe("invalid (returns false)", () => {
        it("passed null", async () => {
          await expect(validate({ a: null })).rejects.toThrow();
        });

        it("passed -1", async () => {
          await expect(validate({ a: -1 })).rejects.toThrow();
        });

        it("passed 4", async () => {
          await expect(validate({ a: 4 })).rejects.toThrow();
        });

        it("passed str", async () => {
          await expect(validate({ a: "str" })).rejects.toThrow();
        });
      });
    });

    describe("parameter b is", () => {
      describe("valid (returns true)", () => {
        it("passed 1290ad", async () => {
          await expect(validate({ b: "1290ad" })).resolves.toBeTruthy();
        });

        it("passed 1290abef", async () => {
          await expect(validate({ b: "1290abef" })).resolves.toBeTruthy();
        });
      });

      describe("invalid (returns false)", () => {
        it("passed null", async () => {
          await expect(validate({ b: null })).rejects.toThrow();
        });

        it("passed ccc", async () => {
          await expect(validate({ b: "ccc" })).rejects.toThrow();
        });

        it("passed 1290fg", async () => {
          await expect(validate({ b: "1290fg" })).rejects.toThrow();
        });

        it("passed 1290ff1h", async () => {
          await expect(validate({ b: "1290ff1h" })).rejects.toThrow();
        });
      });
    });

    describe("parameter c is", () => {
      describe("valid (returns true)", () => {
        it("passed 1:2:3:4", async () => {
          await expect(validate({ c: "1:2:3:4" })).resolves.toBeTruthy();
        });
      });

      describe("invalid (returns false)", () => {
        it("passed null", async () => {
          await expect(validate({ c: null })).rejects.toThrow();
        });

        it("passed 01:2:3:4", async () => {
          await expect(validate({ c: "01:2:3:4" })).rejects.toThrow();
        });

        it("passed 1:2:3", async () => {
          await expect(validate({ c: "1:2:3" })).rejects.toThrow();
        });

        it("passed 1:2:3:4:5", async () => {
          await expect(validate({ c: "1:2:3:4:5" })).rejects.toThrow();
        });
      });
    });

    describe("parameter cr is", () => {
      describe("valid (returns true)", () => {
        it("passed 0:1:0:1", async () => {
          await expect(validate({ cr: "0:1:0:1" })).resolves.toBeTruthy();
        });

        it("passed 0:0.2:0.123456789:1", async () => {
          await expect(validate({ cr: "0:0.2:0.123456789:1" })).resolves.toBeTruthy();
        });
      });

      describe("invalid (returns false)", () => {
        it("passed null", async () => {
          await expect(validate({ cr: null })).rejects.toThrow();
        });

        it("passed 01:0:1:0", async () => {
          await expect(validate({ cr: "01:0:1:0" })).rejects.toThrow();
        });

        it("passed 1:0:1", async () => {
          await expect(validate({ cr: "1:0:1" })).rejects.toThrow();
        });

        it("passed 1:0:1:0:1", async () => {
          await expect(validate({ cr: "1:0:1:0:1" })).rejects.toThrow();
        });

        it("passed 1.2:0:1:0", async () => {
          await expect(validate({ cr: "1.2:0:1:0" })).rejects.toThrow();
        });
      });
    });

    describe("parameter f is", () => {
      describe("valid (returns true)", () => {
        it("passed jpg", async () => {
          await expect(validate({ f: "jpg" })).resolves.toBeTruthy();
        });

        it("passed webp", async () => {
          await expect(validate({ f: "webp" })).resolves.toBeTruthy();
        });
      });

      describe("invalid (returns false)", () => {
        it("passed null", async () => {
          await expect(validate({ f: null })).rejects.toThrow();
        });

        it("passed bmp", async () => {
          await expect(validate({ f: "bmp" })).rejects.toThrow();
        });
      });
    });

    describe("parameter g is", () => {
      describe("valid (returns true)", () => {
        it("passed 1", async () => {
          await expect(validate({ g: "1" })).resolves.toBeTruthy();
        });

        it("passed 9", async () => {
          await expect(validate({ g: "9" })).resolves.toBeTruthy();
        });
      });

      describe("invalid (returns false)", () => {
        it("passed null", async () => {
          await expect(validate({ g: null })).rejects.toThrow();
        });

        it("passed 0", async () => {
          await expect(validate({ g: "0" })).rejects.toThrow();
        });

        it("passed 10", async () => {
          await expect(validate({ g: "10" })).rejects.toThrow();
        });
      });
    });

    describe("parameter h is", () => {
      describe("valid (returns true)", () => {
        it("passed 1", async () => {
          await expect(validate({ h: "1" })).resolves.toBeTruthy();
        });

        it("passed 1080", async () => {
          await expect(validate({ h: "9999" })).resolves.toBeTruthy();
        });
      });

      describe("invalid (returns false)", () => {
        it("passed null", async () => {
          await expect(validate({ h: null })).rejects.toThrow();
        });

        it("passed 0", async () => {
          await expect(validate({ h: "0" })).rejects.toThrow();
        });

        it("passed -1", async () => {
          await expect(validate({ h: "-1" })).rejects.toThrow();
        });
      });
    });

    describe("parameter o is", () => {
      describe("valid (returns true)", () => {
        it("passed 0", async () => {
          await expect(validate({ o: "0" })).resolves.toBeTruthy();
        });

        it("passed 1", async () => {
          await expect(validate({ o: "1" })).resolves.toBeTruthy();
        });
        it("passed false", async () => {
          await expect(validate({ o: "false" })).resolves.toBeTruthy();
        });

        it("passed true", async () => {
          await expect(validate({ o: "true" })).resolves.toBeTruthy();
        });
      });

      describe("invalid (returns false)", () => {
        it("passed null", async () => {
          await expect(validate({ o: null })).rejects.toThrow();
        });

        it("passed str", async () => {
          await expect(validate({ o: "str" })).rejects.toThrow();
        });
      });
    });

    describe("parameter q is", () => {
      describe("valid (returns true)", () => {
        it("passed 1", async () => {
          await expect(validate({ q: "1" })).resolves.toBeTruthy();
        });

        it("passed 100", async () => {
          await expect(validate({ q: "100" })).resolves.toBeTruthy();
        });
      });

      describe("invalid (returns false)", () => {
        it("passed null", async () => {
          await expect(validate({ q: null })).rejects.toThrow();
        });

        it("passed -1", async () => {
          await expect(validate({ q: "-1" })).rejects.toThrow();
        });

        it("passed 101", async () => {
          await expect(validate({ q: "101" })).rejects.toThrow();
        });
      });
    });

    describe("parameter r is", () => {
      describe("valid (returns true)", () => {
        it("passed 1", async () => {
          await expect(validate({ r: "1" })).resolves.toBeTruthy();
        });

        it("passed 8", async () => {
          await expect(validate({ r: "8" })).resolves.toBeTruthy();
        });

        it("passed auto", async () => {
          await expect(validate({ r: "auto" })).resolves.toBeTruthy();
        });
      });

      describe("invalid (returns false)", () => {
        it("passed null", async () => {
          await expect(validate({ r: null })).rejects.toThrow();
        });

        it("passed 0", async () => {
          await expect(validate({ r: "0" })).rejects.toThrow();
        });

        it("passed 9", async () => {
          await expect(validate({ r: "9" })).rejects.toThrow();
        });
      });
    });

    describe("parameter through is", () => {
      describe("valid (returns true)", () => {
        it("passed jpg", async () => {
          await expect(validate({ through: "jpg" })).resolves.toBeTruthy();
        });

        it("passed jpg:png", async () => {
          await expect(validate({ through: "jpg:png" })).resolves.toBeTruthy();
        });
      });

      describe("invalid (returns false)", () => {
        it("passed null", async () => {
          await expect(validate({ through: null })).rejects.toThrow();
        });

        it("passed bmp", async () => {
          await expect(validate({ through: "bmp" })).rejects.toThrow();
        });

        it("passed jpg:", async () => {
          await expect(validate({ through: "jpg:" })).rejects.toThrow();
        });

        it("passed jpg:bmp", async () => {
          await expect(validate({ through: "jpg:bmp" })).rejects.toThrow();
        });
      });
    });

    describe("parameter u is", () => {
      describe("valid (returns true)", () => {
        it("passed 0", async () => {
          await expect(validate({ u: "0" })).resolves.toBeTruthy();
        });

        it("passed 1", async () => {
          await expect(validate({ u: "1" })).resolves.toBeTruthy();
        });
        it("passed false", async () => {
          await expect(validate({ u: "false" })).resolves.toBeTruthy();
        });

        it("passed true", async () => {
          await expect(validate({ u: "true" })).resolves.toBeTruthy();
        });
      });

      describe("invalid (returns false)", () => {
        it("passed null", async () => {
          await expect(validate({ u: null })).rejects.toThrow();
        });

        it("passed str", async () => {
          await expect(validate({ u: "str" })).rejects.toThrow();
        });
      });
    });

    describe("parameter v is", () => {
      describe("valid (returns true)", () => {
        it("passed str", async () => {
          await expect(validate({ v: "str" })).resolves.toBeTruthy();
        });
      });

      describe("invalid (returns false)", () => {
        it("passed null", async () => {
          await expect(validate({ v: null })).rejects.toThrow();
        });
      });
    });

    describe("parameter w is", () => {
      describe("valid (returns true)", () => {
        it("passed 1", async () => {
          await expect(validate({ w: "1" })).resolves.toBeTruthy();
        });

        it("passed 1080", async () => {
          await expect(validate({ w: "9999" })).resolves.toBeTruthy();
        });
      });

      describe("invalid (returns false)", () => {
        it("passed null", async () => {
          await expect(validate({ w: null })).rejects.toThrow();
        });

        it("passed 0", async () => {
          await expect(validate({ w: "0" })).rejects.toThrow();
        });

        it("passed -1", async () => {
          await expect(validate({ w: "-1" })).rejects.toThrow();
        });
      });
    });
  });
});
