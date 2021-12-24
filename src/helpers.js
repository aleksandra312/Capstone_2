const getWikiPageExtract = (res) => {
  let page = Object.keys(res.query.pages);
  let fullExtract = res.query.pages[page].extract;
  let splittedExtract = fullExtract.split(/\r?\n/g);
  return splittedExtract[0];
};

export { getWikiPageExtract };
