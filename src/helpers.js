const getWikiPageExtract = (res) => {
  let page = Object.keys(res.query.pages);
  let fullExtract = res.query.pages[page].extract;
  let splittedExtract = fullExtract.split(/\r?\n/g);
  return splittedExtract[0];
};

const getYearsForRange = (numOfYrs, toYear) => {
  let years = [];
  let endYear = new Date().getFullYear() - toYear;
  let startYear = endYear - numOfYrs;
  while (startYear <= endYear) {
    years.push(startYear++);
  }
  return years;
};

const getDatesForSurvey = (numOfYrs) => {
  const toDate = `${new Date().getFullYear()}-12-31`;
  const fromDate = `${new Date().getFullYear() - numOfYrs}-01-01`;
  return { fromDate, toDate };
};

const sumPropValues = (items, prop) => {
  return items.reduce((acc, val) => {
    return acc + parseInt(val[prop]);
  }, 0);
};

export {
  getWikiPageExtract,
  getYearsForRange,
  getDatesForSurvey,
  sumPropValues,
};
