import {
  constructEvolutionChainFromResponse,
  findEnglishGenera,
  findFirstEnglishFlavorText,
} from './infoDialogSlice';

const bulbasaurEvolutionChainResponseData = {
  chain: {
    evolves_to: [
      {
        species: {
          name: 'ivysaur',
          url: 'https://pokeapi.co/api/v2/pokemon-species/2/',
        },
        evolves_to: [
          {
            species: {
              name: 'venusaur',
              url: 'https://pokeapi.co/api/v2/pokemon-species/3/',
            },
            evolves_to: [],
          },
        ],
      },
    ],
    species: {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
    },
  },
};
const charmanderEvolutionChainResponseData = {
  chain: {
    evolves_to: [
      {
        species: {
          name: 'charmeleon',
          url: 'https://pokeapi.co/api/v2/pokemon-species/5/',
        },
        evolves_to: [
          {
            species: {
              name: 'charizard',
              url: 'https://pokeapi.co/api/v2/pokemon-species/6/',
            },
            evolves_to: [],
          },
        ],
      },
    ],
    species: {
      name: 'charmander',
      url: 'https://pokeapi.co/api/v2/pokemon-species/4/',
    },
  },
};
const bulbasaurGenera = {
  genera: [
    {
      genus: 'たねポケモン',
      language: {
        name: 'ja-Hrkt',
        url: 'https://pokeapi.co/api/v2/language/1/',
      },
    },
    {
      genus: '씨앗포켓몬',
      language: {
        name: 'ko',
        url: 'https://pokeapi.co/api/v2/language/3/',
      },
    },
    {
      genus: 'Seed Pokémon',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/',
      },
    },
    {
      genus: 'たねポケモン',
      language: {
        name: 'ja',
        url: 'https://pokeapi.co/api/v2/language/11/',
      },
    },
    {
      genus: '种子宝可梦',
      language: {
        name: 'zh-Hans',
        url: 'https://pokeapi.co/api/v2/language/12/',
      },
    },
  ],
};
const flavor_text_entries = [
  {
    flavor_text:
      'A strange seed was\nplanted on its\nback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.',
    language: {
      name: 'en',
      url: 'https://pokeapi.co/api/v2/language/9/',
    },
    version: {
      name: 'red',
      url: 'https://pokeapi.co/api/v2/version/1/',
    },
  },
  {
    flavor_text:
      'A strange seed was\nplanted on its\nback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.',
    language: {
      name: 'en',
      url: 'https://pokeapi.co/api/v2/language/9/',
    },
    version: {
      name: 'blue',
      url: 'https://pokeapi.co/api/v2/version/2/',
    },
  },
  {
    flavor_text:
      'It can go for days\nwithout eating a\nsingle morsel.\fIn the bulb on\nits back, it\nstores energy.',
    language: {
      name: 'en',
      url: 'https://pokeapi.co/api/v2/language/9/',
    },
    version: {
      name: 'yellow',
      url: 'https://pokeapi.co/api/v2/version/3/',
    },
  },
  {
    flavor_text:
      'うまれたときから　せなかに\nふしぎな　タネが　うえてあって\nからだと　ともに　そだつという。',
    language: {
      name: 'ja-Hrkt',
      url: 'https://pokeapi.co/api/v2/language/1/',
    },
    version: {
      name: 'x',
      url: 'https://pokeapi.co/api/v2/version/23/',
    },
  },
  {
    flavor_text:
      '태어났을 때부터 등에\n이상한 씨앗이 심어져 있으며\n몸과 함께 자란다고 한다.',
    language: {
      name: 'ko',
      url: 'https://pokeapi.co/api/v2/language/3/',
    },
    version: {
      name: 'x',
      url: 'https://pokeapi.co/api/v2/version/23/',
    },
  },
];

describe('test infoDialogSlice', () => {
  describe('test utility functions', () => {
    test('constructEvolutionChainFromResponse works correctly for bulbasaur', () => {
      const evolutionChain = constructEvolutionChainFromResponse(
        bulbasaurEvolutionChainResponseData,
      );
      expect(evolutionChain.length).toBe(3);
      expect(evolutionChain[0]).toBe('bulbasaur');
      expect(evolutionChain[1]).toBe('ivysaur');
      expect(evolutionChain[2]).toBe('venusaur');
    });

    test('constructEvolutionChainFromResponse works correctly for charmander', () => {
      const evolutionChain = constructEvolutionChainFromResponse(
        charmanderEvolutionChainResponseData,
      );
      expect(evolutionChain.length).toBe(3);
      expect(evolutionChain[0]).toBe('charmander');
      expect(evolutionChain[1]).toBe('charmeleon');
      expect(evolutionChain[2]).toBe('charizard');
    });

    test('findEnglishGenera works correctly for bulbasaur', () => {
      const englishGenera = findEnglishGenera(bulbasaurGenera.genera);
      expect(englishGenera?.genus).toBe('Seed Pokémon');
    });

    test('findEnglishFlavorTextForRed works correctly for species 1', () => {
      const englishFlavorText = findFirstEnglishFlavorText(flavor_text_entries);
      expect(englishFlavorText).toBe(
        'A strange seed was\nplanted on its\nback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.',
      );
    });
  });
});
