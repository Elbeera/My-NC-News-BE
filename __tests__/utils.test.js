const formatData = require("../db/utils/data-manipulation.js");

describe("formatData", () => {
  test("returns and empty object when passed an empty array", () => {
    const rows = [];
    const expectedFormatedRows = [];
    expect(formatData(rows)).toEqual(expectedFormatedRows);
  });
  test("adds each topic_id on a key of topics(slug)", () => {
    const rows = [{ slug: 'mitch', topic_id: 1 }];
    const expectedFormattedRows = [[ 'mitch', 1 ]];
    expect(formatData(rows)).toEqual(expectedFormattedRows);
  });
  test('works for multiple objects in an array', () => {
        const rows = [{ slug: 'mitch', topic_id: 1 }, { slug: 'cats', topic_id: 2}];
        const expectedFormattedRows = [[ 'mitch', 1 ], [ 'cats', 2 ]];
        expect(formatData(rows)).toEqual(expectedFormattedRows);
  });
  test("does not mutate original input", () => {
    const rows = [{ slug: 'mitch', shop_id: 1 }];
    formatData(rows);
    expect(rows).toEqual([{ slug: 'mitch', shop_id: 1 }]);
  });
});