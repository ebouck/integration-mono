const parseCode = require("./parseCode");

describe("parseCode", () => {
  test("it works", () => {
    expect(parseCode("/?code=1f42faab-ded3-4fde-b341-51e6a9cbb5f5")).toEqual(
      "1f42faab-ded3-4fde-b341-51e6a9cbb5f5"
    );
  });

  test("it throws if no url", () => {
    try {
      parseCode(undefined);
      expect(1).toEqual("Did not throw");
    } catch (error) {
      expect(String(error)).toMatch("missing url");
    }
  });

  test("it throws if bad URL", () => {
    expect(parseCode("/?code=1f42faab-ded3-4fde-b341-51e6a9cbb5f5")).toEqual(
      "1f42faab-ded3-4fde-b341-51e6a9cbb5f5"
    );

    try {
      parseCode("/?code=1f42faab-ded3-4fde-b341-51e");
      expect(1).toEqual("Did not throw");
    } catch (error) {
      expect(String(error)).toMatch("bad url");
    }
  });
});
