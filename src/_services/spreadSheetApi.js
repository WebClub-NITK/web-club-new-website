class SpreadSheetApi {
  async getWorkSheetData(workSheetId) {
    var url =
      "https://spreadsheets.google.com/feeds/list/" +
      workSheetId +
      "/od6/public/values?alt=json";
    var json = await fetch(url);
    json = await json.json();
    var finalArray = [];
    var key, value;
    json.feed.entry.forEach((entry) => {
      json = {};
      entry.content["$t"].split(",").forEach((obj) => {
        key = obj.split(":")[0].toString();
        key = key.trim();
        value = "";
        obj.split(":").forEach((obj, i) => {
          if (
            i === 1 &&
            (obj.toString().trim() === "https" ||
              obj.toString().trim() === "http")
          )
            value = value + obj + ":";
          else if (i !== 0) value = value + obj;
        });
        value = value.trim();
        json[key] = value;
      });

      finalArray.push(json);
    });
    return finalArray;

  }
}

var instance = new SpreadSheetApi();
export default instance;
