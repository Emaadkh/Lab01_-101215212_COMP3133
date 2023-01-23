const fs = require("fs");
const csv = require("csv-parser");

const canadaPath = "./canada.txt";
const usaPath = "./usa.txt";
const inputFile = "./input_countries.csv";

if (fs.existsSync(canadaPath)) {
  fs.rmSync(canadaPath);
}

if (fs.existsSync(usaPath)) {
  fs.rmSync(usaPath);
}

const rows = [];

fs.createReadStream(inputFile)
  .pipe(csv())
  .on("data", (data) => rows.push(data))
  .on("end", () => {
    let canadaData = "country,year,population";
    let usaData = "country,year,population";

    rows
      .filter((x) => x.country === "Canada")
      .forEach(
        (val) =>
          (canadaData += `\n${val.country},${val.year},${val.population}`)
      );
    rows
      .filter((x) => x.country === "United States")
      .forEach(
        (val) => (usaData += `\n${val.country},${val.year},${val.population}`)
      );

    fs.writeFileSync(canadaPath, canadaData);
    fs.writeFileSync(usaPath, usaData);
  });

