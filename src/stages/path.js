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

const isPathHasNode = (x, y, path) =>
  path.some(({ x: itemX, y: itemY }) => itemX === x && itemY === y);

const isCanBeNewNode = (newX, newY, path) => {
  const last = path[path.length - 1];
  const { x: lastX, y: lastY } = last;

  if (
    !isPathHasNode(newX, newY, path) &&
    (
      (newX === lastX) && (Math.abs(newY - lastY) === 1) ||
      (newY === lastY) && (Math.abs(newX - lastX) === 1)
    )
  ) {
    return true;
  }

  return false;
};

const newPath = (x, y) => [{ x, y }];

const addNode = (x, y, path) => {
  if (!isCanBeNewNode(x, y, path)) {
    return path;
  }

  return [...path, { x, y }];
};

export const addNodesFromTo = (startPoint, endPoint, path) => {
  const { x: startX, y: startY } = startPoint;
  const { x: endX, y: endY } = endPoint;

  let coords;
  let newPath = path;

  // Horizontal
  if (startY === endY) {
    coords = range(startX, endX).map((x) => ({ x, y: startY }));
  }

  // Vertical
  if (startX === endX) {
    coords = range(startY, endY).map((y) => ({ x: startX, y }));
  }

  if (!coords) {
    return path;
  }

  coords.forEach(({ x, y }) => {
    newPath = addNode(x, y, newPath);
  });

  return newPath;
};

const firstNode = (path) => path[0];

const lastNode = (path) => path[path.length - 1];

const tailNodes = (path) => path.filter((node, idx) => idx !== 0);

const indexOfNode = (x, y, path) => path.findIndex((node) => x === node.x && y === node.y);

const deletePathFromNode = (x, y, path) => {
  const index = indexOfNode(x, y, path);

  if (index < 0) {
    return path;
  }

  const newPath = path.slice(0, index);

  return newPath.length > 0 ? newPath : path;
};

export {
  addNode,
  deletePathFromNode,
  firstNode,
  indexOfNode,
  lastNode,
  tailNodes,
  isCanBeNewNode,
  isPathHasNode,
  newPath,
};
