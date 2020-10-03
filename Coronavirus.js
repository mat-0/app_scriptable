// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: user-md;

const axios = require("axios");

const endpoint = (
    'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaName=cheltenham&' +
    'structure={"date":"date","newCases":"newCasesByPublishDate","deaths":"newDeathsByDeathDate"}'
);


const getData = async ( url ) => {

    const { data, status, statusText } = await axios.get(url, { timeout: 10000 });

    if ( status >= 400 )
        throw new Error(statusText);

    return data

};  // getData


const main = async () => {

    const result = await getData(endpoint);

    console.log(result);

};  // main


main().catch(err => {
    console.error(err);
    process.exitCode = 1;
});
