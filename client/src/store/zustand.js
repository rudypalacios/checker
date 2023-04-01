import create from "zustand";

const _GENERAL_RULES = [
  {
    text: "No usar <strong>etc</strong>",
    regex: "\\betc\\b",
  },

  {
    text: "No usar <strong>(grande, pequeño, muchos, pocos, algunos)</strong>",
    regex:
      "\\b(grande|pequeñ(o|a)s?|much(o|a)s?|poc(o|a)s?|algun(o|a)s?|((ya|de|puesto)sque))\\b",
  },

  {
    text: "No usar <strong>(ya que, de que, puesto que)</strong>",
    regex: "\\b((ya|de|puesto)\\sque)\\b",
  },

  {
    text: "No usar <strong>coma (,) antes de (Y) y (O)</strong>",
    regex: "(\\b)?(,\\s?(y|o))\\b",
  },

  {
    text: "No utilizar conjugaciones del verbo <strong>Poder</strong>",
    array: [
      "poder",
      "pudiendo",
      "podido",
      "puedo",
      "puedes",
      "puede",
      "podemos",
      "podéis",
      "pueden",
      "podés",
      "podía",
      "podías",
      "podíamos",
      "podíais",
      "podían",
      "pude",
      "pudiste",
      "pudo",
      "pudimos",
      "pudisteis",
      "pudieron",
      "podré",
      "podrás",
      "podrá",
      "podremos",
      "podréis",
      "podrán",
      "podría",
      "podrías",
      "podríamos",
      "podríais",
      "podrían",
      "pueda",
      "puedas",
      "podamos",
      "podáis",
      "puedan",
      "podás",
      "pudiera",
      "pudiese",
      "pudieras",
      "pudieses",
      "pudiera",
      "pudiéramos",
      "pudiésemos",
      "pudierais",
      "pudieseis",
      "pudieran",
      "pudiesen",
      "pudieras",
      "pudiere",
      "pudieres",
      "pudiéremos",
      "pudiereis",
      "pudieren",
      "poded",
    ],
  },
  {
    text: "No usar los posesivos <strong>su</strong> o <strong>sus</strong>",
    regex: "\\bsu(s)?\\b",
  },
  {
    text: "No usar la palabra <strong>pretende</strong>",
    regex: "\\bpretende(s)?\\b",
  },
  {
    text: "No usar <strong>y</strong> más de 2 veces en un párrafo",
    match: { pattern: /\by\b/gim, condition: (a) => a?.length > 2 },
  },
];

const useStore = create((set) => ({
  words: [],
  lowerCaseWords: [],
  setWords: (words) => {
    set((state) => {
      return {
        ...state,
        words,
        lowerCaseWords: words.map((element) => element.toLowerCase()),
      };
    });
  },

  duplicatesList: [],
  setDuplicatesList: (duplicatesList) => {
    set((state) => {
      return {
        ...state,
        duplicatesList,
      };
    });
  },

  searchWord: "",
  setSearchWord: (searchWord) => {
    set((state) => {
      return {
        ...state,
        searchWord,
      };
    });
  },

  synonymsList: "",
  setSynonymsList: (synonymsList) => {
    set((state) => {
      return {
        ...state,
        synonymsList,
      };
    });
  },

  participleList: [],
  setParticipleList: (participleList) => {
    set((state) => {
      return {
        ...state,
        participleList,
      };
    });
  },

  gerundList: [],
  setGerundList: (gerundList) => {
    set((state) => {
      return {
        ...state,
        gerundList,
      };
    });
  },

  content: "",
  setContent: (content) => {
    set((state) => {
      return {
        ...state,
        content,
      };
    });
  },

  generalRules: _GENERAL_RULES,
  setGeneralRules: (generalRules) => {
    set((state) => {
      return {
        ...state,
        generalRules,
      };
    });
  },

  spinners: {
    duplicates: false,
    participle: false,
    gerund: false,
    generalErrors: false,
  },
  setSpinners: (spinner) => {
    set((state) => {
      return {
        ...state,
        spinners: { ...state.spinners, ...spinner },
      };
    });
  },

  resetStore: () => set({ words: [] }),
}));

export default useStore;
