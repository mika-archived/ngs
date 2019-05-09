import * as assert from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/cdk";
import Stack from "../lib/ngs-us-east-1-stack";

describe("stack us-east-1", () => {
  describe("about lambda function", () => {
    it("not diff", () => {
      const stack = new Stack(new cdk.Stack(), "NgsUsEast1Stack");
      assert.expect(stack).to(
        assert.haveResourceLike("AWS::Lambda::Function", {
          Code: {}, // cannot detect diff
          Handler: "index.handler",
          Runtime: "nodejs8.10",
          MemorySize: 128,
          Timeout: 1
        })
      );
    });
  });
});
