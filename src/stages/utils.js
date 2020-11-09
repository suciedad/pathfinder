export const getSpriteName = (x, y, map) => {
  const char = map[y].charAt(x);

  switch (char) {
    case 'x':
      return 'empty-bounds';
      // return 'wall';

    case '-':
      return 'hover-block';

    case 'R':
      return 'hover-block';
      // return 'red-room';

    case 'G':
      return 'hover-block';
      // return 'green-room';

    case 'B':
      return 'hover-block';
      // return 'blue-room';

    case 'Y':
      return 'hover-block';
      // return 'yellow-room';

    case 'I':
      return 'infirmary';

    case 'P':
      return 'player';
  }
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

export const isFloor = (block) => (
  block === '-' ||
  block === 'R' ||
  block === 'G' ||
  block === 'B' ||
  block === 'Y' ||
  block === 'I'
);

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
