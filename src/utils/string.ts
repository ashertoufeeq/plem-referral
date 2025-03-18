
export const getFinalStringForSearch = (
    searchKeys: Array<string>,
    customTitle: string,
    item: Record<string, any>
  ) => {
    let s = "";
    if (item[customTitle]) s = s.concat(item[customTitle]);
    searchKeys.forEach((i) => {
      if (item[i]) {
        s = s.concat(" ");
        s = s.concat(item[i]);
      }
    });
    return s;
  };