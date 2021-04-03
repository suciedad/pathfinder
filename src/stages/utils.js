export const getSpriteName = (x, y, map) => {
  const char = map[y].charAt(x);
  const spriteNameMap = {
    'x': 'empty-bounds',
    '-': 'hover-block',
    'R': 'hover-block',
    'G': 'hover-block',
    'B': 'hover-block',
    'Y': 'hover-block',
    'F': 'hover-block',
    'I': 'infirmary',
    'P': 'player',
  };

  return spriteNameMap[char];
};

export const getRoomCoords = (key, map) => {
  for (let y = 0; y < map.length; y += 1) {
    for (let x = 0; x < map[y].length; x += 1) {
      if (key === map[y].charAt(x)) {
        return { x, y };
      }
    }
  }

  return null;
};

export const getRoomCoordsByPlayerColor = (color, map) => {
  const colorMap = {
    'red': 'R',
    'green': 'G',
    'blue': 'B',
    'yellow': 'Y',
    'sick': 'I',
  };
  const key = colorMap[color];

  return getRoomCoords(key, map);
}

const floorBlocks = ['-', 'R', 'G', 'B', 'Y', 'I', 'F'];

export const isFloor = (block) => floorBlocks.includes(block);

const range = (from, to) => {
  return Array.from(
    [...Array(Math.abs(to - from) + 1).keys()],
    (x) => {
      if (from < to) {
        return Math.min(from, to) + x;
      }

      if (to < from) {
        return Math.max(from, to) - x;
      }

      return from;
    }
  )
};

export const isCanBePath = (startPoint, endPoint, map) => {
  const { x: startX, y: startY } = startPoint;
  const { x: endX, y: endY } = endPoint;

  // Horizontal
  if (startY === endY) {
    const coords = range(startX, endX).map((x) => ({ x, y: startY }));
    const possiblyWalk = coords.map(({ x, y }) => isFloor(map[y].charAt(x)));

    return !possiblyWalk.some((item) => item === false);
  }

  // Vertical
  if (startX === endX) {
    const coords = range(startY, endY).map((y) => ({ x: startX, y }));
    const possiblyWalk = coords.map(({ x, y }) => isFloor(map[y].charAt(x)));

    return !possiblyWalk.some((item) => item === false);
  }

  return false;
};
