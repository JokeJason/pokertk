const getColor = (type: string) => {
  let returnColor: string;
  switch (type) {
    case 'grass':
      returnColor = '#a8ff98';
      break;
    case 'poison':
      returnColor = '#d6a2e4';
      break;
    case 'normal':
      returnColor = '#dcdcdc';
      break;
    case 'fire':
      returnColor = '#ffb971';
      break;
    case 'water':
      returnColor = '#8cc4e2';
      break;
    case 'electric':
      returnColor = '#ffe662';
      break;
    case 'ice':
      returnColor = '#8cf5e4';
      break;
    case 'fighting':
      returnColor = '#da7589';
      break;
    case 'ground':
      returnColor = '#e69a74';
      break;
    case 'flying':
      returnColor = '#bbc9e4';
      break;
    case 'psychic':
      returnColor = '#ffa5da';
      break;
    case 'bug':
      returnColor = '#bae05f';
      break;
    case 'rock':
      returnColor = '#C9BB8A';
      break;
    case 'ghost':
      returnColor = '#8291e0';
      break;
    case 'dark':
      returnColor = '#8e8c94';
      break;
    case 'dragon':
      returnColor = '#88a2e8';
      break;
    case 'steel':
      returnColor = '#9fb8b9';
      break;
    case 'fairy':
      returnColor = '#fdb9e9';
      break;
    default:
      returnColor = 'gainsboro';
      break;
  }

  return returnColor;
};

export const colorTypeGradients = (
  type1: string,
  type2: string,
  length: number,
) => {
  let color2;

  const color1 = getColor(type1);

  if (length === 2) {
    color2 = getColor(type2);
  } else if (length === 1) {
    color2 = color1;
  }

  return [color1, color2];
};
