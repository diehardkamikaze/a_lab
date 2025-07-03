const { serializeArray, deserializeString } = require("./index.js");

function generateRandomNumber(from, to) {
  return Math.floor(Math.random() * (to - from) + from);
}

function generateArray(from, to, len) {
  return Array.from({ length: len }, () => generateRandomNumber(from, to));
}

function getBitLength(str) {
  return new TextEncoder().encode(str).length;
}

const randomNumbersTestCases = [
  {
    name: "Random 50 single digit numbers",
    input: [1, 9, 50],
  },
  {
    name: "Random 50 two-digit numbers",
    input: [10, 99, 50],
  },
  {
    name: "Random 50 three-digit numbers",
    input: [100, 300, 50],
  },
  {
    name: "Random 50 numbers",
    input: [1, 300, 50],
  },
  {
    name: "Random 100 single digit numbers",
    input: [1, 9, 100],
  },
  {
    name: "Random 100 two-digit numbers",
    input: [10, 99, 100],
  },
  {
    name: "Random 100 three-digit numbers",
    input: [100, 300, 100],
  },
  {
    name: "Random 100 numbers",
    input: [1, 300, 100],
  },
  {
    name: "Random 500 single digit numbers",
    input: [1, 9, 500],
  },
  {
    name: "Random 500 two-digit numbers",
    input: [10, 99, 500],
  },
  {
    name: "Random 500 three-digit numbers",
    input: [100, 300, 500],
  },
  {
    name: "Random 500 numbers",
    input: [1, 300, 500],
  },
  {
    name: "Random 1000 single digit numbers",
    input: [1, 9, 1000],
  },
  {
    name: "Random 1000 two-digit numbers",
    input: [10, 99, 1000],
  },
  {
    name: "Random 1000 three-digit numbers",
    input: [100, 300, 1000],
  },
  {
    name: "Random 1000 numbers",
    input: [1, 300, 1000],
  },
];

describe("Random numbers", () => {
  test.each(randomNumbersTestCases)("$name", ({ input }) => {
    const array = generateArray(...input).sort();

    const bitsUsedBeforeCompression = getBitLength(array.join());
    const bitsShouldCompressedAtLeast = bitsUsedBeforeCompression / 2;

    const serialized = serializeArray(array);
    const bitsUsedAfterCompression = getBitLength(serialized);
    const deserialized = deserializeString(serialized).sort();

    expect(deserialized).toEqual(array);

    expect(bitsUsedAfterCompression).toBeLessThanOrEqual(
      bitsShouldCompressedAtLeast
    );

    console.log(
      "Compression:",
      bitsUsedAfterCompression / bitsShouldCompressedAtLeast
    );
  });

  describe("Same numbers", () => {
    test("Same single-digit numbers", () => {
      const array = new Array(1000).fill(5).sort();

      const bitsUsedBeforeCompression = getBitLength(array.join());
      const bitsShouldCompressedAtLeast = bitsUsedBeforeCompression / 2;

      const serialized = serializeArray(array);
      const bitsUsedAfterCompression = getBitLength(serialized);
      const deserialized = deserializeString(serialized).sort();

      expect(deserialized).toEqual(array);

      expect(bitsUsedAfterCompression).toBeLessThanOrEqual(
        bitsShouldCompressedAtLeast
      );

      console.log(
        "Compression:",
        bitsUsedAfterCompression / bitsShouldCompressedAtLeast
      );
    });

    test("Same two-digit numbers", () => {
      const array = new Array(1000).fill(27).sort();

      const bitsUsedBeforeCompression = getBitLength(array.join());
      const bitsShouldCompressedAtLeast = bitsUsedBeforeCompression / 2;

      const serialized = serializeArray(array);
      const bitsUsedAfterCompression = getBitLength(serialized);
      const deserialized = deserializeString(serialized).sort();

      expect(deserialized).toEqual(array);

      expect(bitsUsedAfterCompression).toBeLessThanOrEqual(
        bitsShouldCompressedAtLeast
      );

      console.log(
        "Compression:",
        bitsUsedAfterCompression / bitsShouldCompressedAtLeast
      );
    });

    test("Same three-digit numbers", () => {
      const array = new Array(1000).fill(256).sort();

      const bitsUsedBeforeCompression = getBitLength(array.join());
      const bitsShouldCompressedAtLeast = bitsUsedBeforeCompression / 2;

      const serialized = serializeArray(array);
      const bitsUsedAfterCompression = getBitLength(serialized);
      const deserialized = deserializeString(serialized).sort();

      expect(deserialized).toEqual(array);

      expect(bitsUsedAfterCompression).toBeLessThanOrEqual(
        bitsShouldCompressedAtLeast
      );

      console.log(
        "Compression:",
        bitsUsedAfterCompression / bitsShouldCompressedAtLeast
      );
    });
  });

  describe("Unique numbers", () => {
    test("300 unique numbers", () => {
      const array = Array.from({ length: 300 }, (v, i) => i + 1).sort();
      const bitsUsedBeforeCompression = getBitLength(array.join());
      const bitsShouldCompressedAtLeast = bitsUsedBeforeCompression / 2;

      const serialized = serializeArray(array);
      const bitsUsedAfterCompression = getBitLength(serialized);
      const deserialized = deserializeString(serialized).sort();

      expect(deserialized).toEqual(array);

      expect(bitsUsedAfterCompression).toBeLessThanOrEqual(
        bitsShouldCompressedAtLeast
      );

      console.log(
        "Compression:",
        bitsUsedAfterCompression / bitsShouldCompressedAtLeast
      );
    });
  });

  describe("Simplest cases", () => {
    test("three three-digit numbers", () => {
      const array = [121, 100, 230].sort();

      const bitsUsedBeforeCompression = getBitLength(array.join());
      const bitsShouldCompressedAtLeast = bitsUsedBeforeCompression / 2;

      const serialized = serializeArray(array);
      const bitsUsedAfterCompression = getBitLength(serialized);
      const deserialized = deserializeString(serialized).sort();

      expect(deserialized).toEqual(array);

      expect(bitsUsedAfterCompression).toBeLessThanOrEqual(
        bitsShouldCompressedAtLeast
      );

      console.log(
        "Compression:",
        bitsUsedAfterCompression / bitsShouldCompressedAtLeast
      );
    });

    test("three two-digit numbers", () => {
      const array = [44, 56, 99].sort();

      const bitsUsedBeforeCompression = getBitLength(array.join());
      const bitsShouldCompressedAtLeast = bitsUsedBeforeCompression / 2;

      const serialized = serializeArray(array);
      const bitsUsedAfterCompression = getBitLength(serialized);
      const deserialized = deserializeString(serialized).sort();

      expect(deserialized).toEqual(array);

      expect(bitsUsedAfterCompression).toBeLessThanOrEqual(
        bitsShouldCompressedAtLeast
      );

      console.log(
        "Compression:",
        bitsUsedAfterCompression / bitsShouldCompressedAtLeast
      );
    });

    test("three single-digit numbers", () => {
      const array = [5, 4, 4].sort();

      const bitsUsedBeforeCompression = getBitLength(array.join());
      const bitsShouldCompressedAtLeast = bitsUsedBeforeCompression / 2;

      const serialized = serializeArray(array);
      const bitsUsedAfterCompression = getBitLength(serialized);
      const deserialized = deserializeString(serialized).sort();

      expect(deserialized).toEqual(array);

      expect(bitsUsedAfterCompression).toBeLessThanOrEqual(
        bitsShouldCompressedAtLeast
      );

      console.log(
        "Compression:",
        bitsUsedAfterCompression / bitsShouldCompressedAtLeast
      );
    });

    test("two three-digit numbers", () => {
      const array = [121, 100].sort();

      const bitsUsedBeforeCompression = getBitLength(array.join());
      const bitsShouldCompressedAtLeast = bitsUsedBeforeCompression / 2;

      const serialized = serializeArray(array);
      const bitsUsedAfterCompression = getBitLength(serialized);
      const deserialized = deserializeString(serialized).sort();

      expect(deserialized).toEqual(array);

      expect(bitsUsedAfterCompression).toBeLessThanOrEqual(
        bitsShouldCompressedAtLeast
      );

      console.log(
        "Compression:",
        bitsUsedAfterCompression / bitsShouldCompressedAtLeast
      );
    });

    test.skip("two two-digit numbers", () => {
      const array = [44, 56].sort();

      const bitsUsedBeforeCompression = getBitLength(array.join());
      const bitsShouldCompressedAtLeast = bitsUsedBeforeCompression / 2;

      const serialized = serializeArray(array);
      const bitsUsedAfterCompression = getBitLength(serialized);
      const deserialized = deserializeString(serialized).sort();

      expect(deserialized).toEqual(array);

      expect(bitsUsedAfterCompression).toBeLessThanOrEqual(
        bitsShouldCompressedAtLeast
      );

      console.log(
        "Compression:",
        bitsUsedAfterCompression / bitsShouldCompressedAtLeast
      );
    });

    test("two single-digit numbers", () => {
      const array = [5, 4].sort();

      const bitsUsedBeforeCompression = getBitLength(array.join());
      const bitsShouldCompressedAtLeast = bitsUsedBeforeCompression / 2;

      const serialized = serializeArray(array);
      const bitsUsedAfterCompression = getBitLength(serialized);
      const deserialized = deserializeString(serialized).sort();

      expect(deserialized).toEqual(array);

      expect(bitsUsedAfterCompression).toBeLessThanOrEqual(
        bitsShouldCompressedAtLeast
      );

      console.log(
        "Compression:",
        bitsUsedAfterCompression / bitsShouldCompressedAtLeast
      );
    });

    test.skip("One three-digit number", () => {
      const array = [121];

      const bitsUsedBeforeCompression = getBitLength(array.join());
      const bitsShouldCompressedAtLeast = bitsUsedBeforeCompression / 2;

      const serialized = serializeArray(array);
      const bitsUsedAfterCompression = getBitLength(serialized);
      const deserialized = deserializeString(serialized).sort();

      expect(deserialized).toEqual(array);

      expect(bitsUsedAfterCompression).toBeLessThanOrEqual(
        bitsShouldCompressedAtLeast
      );

      console.log(
        "Compression:",
        bitsUsedAfterCompression / bitsShouldCompressedAtLeast
      );
    });

    test.skip("One two-digit number", () => {
      const array = [44];

      const bitsUsedBeforeCompression = getBitLength(array.join());
      const bitsShouldCompressedAtLeast = bitsUsedBeforeCompression / 2;

      const serialized = serializeArray(array);
      const bitsUsedAfterCompression = getBitLength(serialized);
      const deserialized = deserializeString(serialized).sort();

      expect(deserialized).toEqual(array);

      expect(bitsUsedAfterCompression).toBeLessThanOrEqual(
        bitsShouldCompressedAtLeast
      );

      console.log(
        "Compression:",
        bitsUsedAfterCompression / bitsShouldCompressedAtLeast
      );
    });

    test.skip("one single-digit number", () => {
      const array = [5];

      const bitsUsedBeforeCompression = getBitLength(array.join());
      const bitsShouldCompressedAtLeast = bitsUsedBeforeCompression / 2;

      const serialized = serializeArray(array);
      const bitsUsedAfterCompression = getBitLength(serialized);
      const deserialized = deserializeString(serialized).sort();

      expect(deserialized).toEqual(array);

      expect(bitsUsedAfterCompression).toBeLessThanOrEqual(
        bitsShouldCompressedAtLeast
      );

      console.log(
        "Compression:",
        bitsUsedAfterCompression / bitsShouldCompressedAtLeast
      );
    });
  });
});
