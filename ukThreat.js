let url = "https://www.mi5.gov.uk/UKThreatLevel/UKThreatLevel.xml"
let r = new Request(url)
let xml = await r.loadString()

let start = xml.split("<description>")
let content = start[2]
let end = content.split("</description>")
let output = end[0]

if (config.runsWithSiri) {
 Speech.speak(output);
}
console.log(output);
// Safari.openInApp(url)