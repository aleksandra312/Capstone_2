const getWikiPageExtract = (res) => {
  let page = Object.keys(res.query.pages);
  let fullExtract = res.query.pages[page].extract;
  let splittedExtract = fullExtract.split(/\r?\n/g);
  return splittedExtract[0];
};

const getYearsRange = (range) => {
  let years = [];
  let endYear = new Date().getFullYear() - 2;
  let startYear = endYear - range;
  while (startYear <= endYear) {
    years.push(startYear++);
  }
  return years;
};

export { getWikiPageExtract, getYearsRange };
