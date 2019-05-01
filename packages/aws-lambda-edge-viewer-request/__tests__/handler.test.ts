// eslint-disable-next-line import/no-unresolved
import { Context, CloudFrontRequestEvent, CloudFrontRequest } from "aws-lambda";
import handler from "../src/index";

function createEvent(request: CloudFrontRequest): CloudFrontRequestEvent {
  return {
    Records: [
      {
        cf: {
          config: {
            distributionDomainName: "ngs.mochizuki.moe",
            distributionId: "DISTRIBUTION_ID",
            eventType: "viewer-request",
            requestId: "CF_REQUEST_ID"
          },
          request
        }
      }
    ]
  };
}

describe("handler", () => {
  let event: CloudFrontRequestEvent;

  describe("#handler", () => {
    describe("passed fixtures/1.json", () => {
      beforeAll(async () => {
        event = createEvent(await import("./fixtures/1.json"));
      });

      it("returns /c/f=webp,h=128,v=10,w=128/anna.png", async () => {
        expect.assertions(2);
        await handler(event, {} as Context, (error, request) => {
          expect(error).toBeNull();
          expect((request as any).uri).toBe("/c/f=webp,h=128,v=10,w=128/anna.png");
        });
      });
    });

    describe("passed fixtures/2.json", () => {
      beforeAll(async () => {
        event = createEvent(await import("./fixtures/2.json"));
      });

      it("returns /c/f=webp,h=256,q=100,w=256/anna.png", async () => {
        expect.assertions(2);
        await handler(event, {} as Context, (error, request) => {
          expect(error).toBeNull();
          expect((request as any).uri).toBe("/c/f=webp,h=256,q=100,w=256/anna.png");
        });
      });
    });
  });
});
