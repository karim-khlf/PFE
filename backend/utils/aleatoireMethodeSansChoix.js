function getRandomElements(arr, n) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, n);
}
const aleatoireMethodeSansChoix = (themesIds, groupesIds) => {
  const maxNumberOfGroupesByTheme = Math.floor(
    groupesIds.length / themesIds.length
  );

  const restOfDivision = groupesIds.length % themesIds.length;

  const randomThemesIds = getRandomElements(themesIds, restOfDivision);
  const newThemesArray = themesIds.map((item) => {
    const value = randomThemesIds.includes(item)
      ? maxNumberOfGroupesByTheme + 1
      : maxNumberOfGroupesByTheme;

    return { id: item, maxNumberOfGroupesByTheme: value };
  });

  const themesGroupesIds = groupesIds.map((item) => {
    const randomIndex = Math.floor(Math.random() * newThemesArray.length);
    newThemesArray[randomIndex].maxNumberOfGroupesByTheme--;
    const themeId = newThemesArray[randomIndex].id;
    newThemesArray[randomIndex].maxNumberOfGroupesByTheme === 0
      ? newThemesArray.splice(randomIndex, 1)
      : null;

    return { groupeId: item, themeId };
  });
  return themesGroupesIds;
};

export default aleatoireMethodeSansChoix;
