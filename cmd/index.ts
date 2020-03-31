import parse from 'csv-parse';

import fs from 'fs';

// Create the parser
const parser = parse({
    delimiter: ',',
    skip_lines_with_error: true,
    columns: true,
});

const csvData: any = [];
const output = fs.createWriteStream(__dirname + '/crimes.json');

fs.createReadStream(__dirname + '/Chicago_Crimes_2001_to_2004.csv')
    .pipe(parser)
    .on('data', function (csvrow) {
        // csvrow
        csvData.push(Buffer.from(JSON.stringify(csvrow)));
        console.log(csvData.length);
        // output.write(JSON.stringify(csvrow))
    })
    .on('end', function () {
        // do something with csvData
        parser.end();

        output.end();

        fs.writeFileSync(
            __dirname + '/console_games.json',
            JSON.stringify(csvData),
        );
    });
