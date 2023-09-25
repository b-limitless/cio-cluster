export const splitTitleToUrl = (menuTitle: string) => {
  if (!menuTitle) {
    return "#";
  }
  return (
    "/" +
    menuTitle
      .split("_")
      .map((item) => item.toLowerCase())
      .join("/")
  );
};
