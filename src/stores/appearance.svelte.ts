export const themeStore = $state({
  default: "dark",
  current: "dark",
  list: [
    {
      name: "dark",
      colors: [
        ["#101010", "#181818", "#252525", "#2f2f2f", "#3c3c3c"],
        ["#fff", "#ededed", "#dfdfdf", "#c6c6c6", "#afafaf"],
      ],
    },
    {
      name: "light",
      colors: [
        ["#fff", "#ededed", "#dfdfdf", "#c6c6c6", "#afafaf"],
        ["#101010", "#181818", "#252525", "#2f2f2f", "#3c3c3c"],
      ],
    },
  ],
});

export const layoutStore = $state({
  default: "flex",
  current: "flex",
  list: ["flex", "chaos"],
});

export const titlebarBtnGroup = $state({
  default: "circle",
  current: "circle",
  list: ["circle", "round"],
});
