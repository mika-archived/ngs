import * as rewriter from "../src/rewriter";

describe("rewriter", () => {
  describe("#isCompatibleWithImageFlux", () => {
    describe("compatible with ImageFlux", () => {
      it("returns true", () => {
        expect(rewriter.isCompatibleWithImageFlux("https://mochizuki.moe/c/f=webp/anna.png")).toBeTruthy();
      });
    });

    describe("incompatible with ImageFlux", () => {
      it("returns false", () => {
        expect(rewriter.isCompatibleWithImageFlux("https://mochizuki.moe/f=webp/anna.png")).toBeFalsy();
      });
    });
  });

  describe("#isSupportWebP", () => {
    describe("accept header contains image/webp", () => {
      it("returns true", () => {
        // Chromium header
        const headers = {
          accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3"
        };

        expect(rewriter.isSupportWebP(headers)).toBeTruthy();
      });
    });

    describe("accept header does not contain image/webp", () => {
      it("returns false", () => {
        // Safari header
        const headers = {
          accept: "image/png,image/svg+xml,image/*;q=0.8,video/*;q=0.8,*/*;q=0.5"
        };

        expect(rewriter.isSupportWebP(headers)).toBeFalsy();
      });
    });
  });

  describe("#isSupportInputFormats", () => {
    describe("supported formats", () => {
      it("returns true", () => {
        expect(rewriter.isSupportInputFormats("/foobar.png")).toBeTruthy();
      });
    });

    describe("does not support formats", () => {
      it("returns false", () => {
        expect(rewriter.isSupportInputFormats("/foobar.bmp")).toBeFalsy();
      });
    });
  });

  describe("#rewrite", () => {
    const CHROMIUM_HEADERS = {
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3"
    };
    const SAFARI_HEADERS = {
      accept: "image/png,image/svg+xml,image/*;q=0.8,video/*;q=0.8,*/*;q=0.5"
    };

    describe("if url has compatible with ImageFlux", () => {
      describe("passed w=1920,h=1080,f=auto,q=80", () => {
        it("returns /c/f=webp,h=1080,q=80,w=1920", async () => {
          const url = await rewriter.rewrite("/c/w=1920,h=1080,f=auto,q=80/anna.png", CHROMIUM_HEADERS);
          expect(url).toBe("/c/f=webp,h=1080,q=80,w=1920/anna.png");
        });
      });
    });

    describe("if url does not have compatible with ImageFlux", () => {
      describe("url does not have parameters", () => {
        describe("if browser support webp (Chromium)", () => {
          describe("and input format supported by ngs", () => {
            it("returns webp encoded url", async () => {
              const url = await rewriter.rewrite("/anna.png", CHROMIUM_HEADERS);
              expect(url).toBe("/c/f=webp/anna.png");
            });
          });

          describe("but input format does not supported by ngs", () => {
            it("returns passed url", async () => {
              const url = await rewriter.rewrite("/anna.bmp", CHROMIUM_HEADERS);
              expect(url).toBe("/anna.bmp");
            });
          });
        });

        describe("if browser does not support webp (Safari)", () => {
          it("returns original url", async () => {
            const url = await rewriter.rewrite("/anna.png", SAFARI_HEADERS);
            expect(url).toBe("/anna.png");
          });
        });
      });

      describe("url has parameters", () => {
        describe("and input format supported by ngs", () => {
          describe("if browser support webp (Chromium)", () => {
            describe("passed f=auto", () => {
              it("returns /c/f=webp/anna.png", async () => {
                const url = await rewriter.rewrite("/anna.png?f=auto", CHROMIUM_HEADERS);
                expect(url).toBe("/c/f=webp/anna.png");
              });
            });

            describe("passed h=1080, w=1920 and q=80", () => {
              it("returns /c/h=1080,q=80,w=1920", async () => {
                const url = await rewriter.rewrite("/anna.png?h=1080&w=1920&q=80", CHROMIUM_HEADERS);
                expect(url).toBe("/c/f=webp,h=1080,q=80,w=1920/anna.png");
              });
            });
          });

          describe("if browser does not support webp (Safari)", () => {
            describe("passed f=auto", () => {
              it("returns /c/f=png/anna.png", async () => {
                const url = await rewriter.rewrite("/anna.png?f=auto", SAFARI_HEADERS);
                expect(url).toBe("/c/f=png/anna.png");
              });
            });

            describe("passed h=1080, w=1920 and q=80", () => {
              it("returns /c/h=1080,q=80,w=1920", async () => {
                const url = await rewriter.rewrite("/anna.png?h=1080&w=1920&q=80", SAFARI_HEADERS);
                expect(url).toBe("/c/f=png,h=1080,q=80,w=1920/anna.png");
              });
            });
          });
        });

        describe("but input format does not supported by ngs", () => {
          it("returns original url without parameters", async () => {
            const url = await rewriter.rewrite("/anna.bmp?f=auto", CHROMIUM_HEADERS);
            expect(url).toBe("/anna.bmp");
          });
        });
      });
    });
  });
});
