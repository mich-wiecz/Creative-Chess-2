
export function transformColToLetter(col) {
  return String.fromCharCode(96 + col);
}

export function makeCoord(col, row) {
  const colNum = Number(col);
  const rowNum = Number(row);

  if (typeof colNum !== "number" || typeof rowNum !== "number") {
    throw new Error(
      `Passed argument (${col} or ${row}) are not valid. It should be number or string-number `
    );
  }

  return `${colNum}|${rowNum}`;
}

export function splitCoord(coord) {
  const [colString, rowString] = coord.split("|");

  const colNum = Number(colString);
  const rowNum = Number(rowString);

  if (typeof colNum !== "number" || typeof rowNum !== "number") {
    throw new Error(
      `Passed argument (${coord}) are not valid. It should key of coordMap type `
    );
  }

  return [colNum, rowNum];
}

export function calculateCoordDifference(
  coord1,
  coord2
) {
  const [col1, row1] = splitCoord(coord1);
  const [col2, row2] = splitCoord(coord2);

  return [col2 - col1, row2 - row1];
}

export function changeCoordName(
  map,
  oldCoord,
  newCoord
) {
  Object.defineProperty(
    map,
    newCoord,
    Object.getOwnPropertyDescriptor(map, oldCoord)
  );
  delete map[oldCoord];
}

export function assignCoordToNewMap(mapData) {
  const {
    newMap,
    oldMap,
    coord,
    newCoord = coord,
    newValue = oldMap[coord],
  } = mapData;

  function renewIfObject(item) {
    if (typeof item === "object") return { ...item };

    return item;
  }

  Object.defineProperty(newMap, newCoord, {
    value: renewIfObject(newValue),
    ...Object.getOwnPropertyDescriptor(oldMap, coord),
  });
}