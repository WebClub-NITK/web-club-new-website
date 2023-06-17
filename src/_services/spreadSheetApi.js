class SpreadSheetApi {
  async getWorkSheetData(workSheetId) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${workSheetId}/values/Sheet1!A1:M242?key=${process.env.REACT_APP_SHEETS_API_KEY}`;
    const res = await fetch(url)
    const data = await res.json();
    const keys = data.values.shift();

    return data.values.map(entry => {
      let obj = {};
      entry.forEach((item, j) => {
        obj[keys[j]] = item;
      });
      return obj;
    });
  }
}

var instance = new SpreadSheetApi();
export default instance;
   