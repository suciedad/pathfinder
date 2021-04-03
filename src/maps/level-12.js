const map = [
  'xxxxxxx',
  'xxYxxxx',
  'xx---xx',
  'xx-xFxx',
  'xR---xx',
  'xx-x-xx',
  'xB---xx',
  'xxxxGxx',
  'xxxxxxx',
];

// TODO: Падающие платформы
// Для тестирования падающей платформы
// const players = [
//   {
//     color: 'blue',
//     position: { x: 4, y: 4 },
//   },
//   {
//     color: 'yellow',
//     position: { x: 4, y: 6 },
//   },
// ];

const players = [
  {
    color: 'red',
    position: { x: 4, y: 2 },
  },
  {
    color: 'blue',
    position: { x: 4, y: 4 },
  },
  {
    color: 'green',
    position: { x: 2, y: 2 },
  },
  {
    color: 'yellow',
    position: { x: 3, y: 6 },
  },
];

export default {
  map,
  players,
};
