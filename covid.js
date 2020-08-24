// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: user-md;

const countriesList = ['UK', 'US']

const formatter = new Intl.NumberFormat('en-US')
const rtf = new Intl.RelativeTimeFormat('en-US');


const formatDate = (d) => {
  let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) {
    month = '0' + month
  }
  if (day.length < 2) {
    day = '0' + day
  }

  return [year, month, day].join('-');
}
const getDateWithAddedDays = (days) => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date;
}
const relativeTime = (str) => {
  const date = new Date(str)
  const now = new Date()
  return rtf.format(Math.ceil((date.valueOf() - now) / (1000 * 60)), 'minutes')
}
if (config.runsInWidget) {
  // create and show widget
  let widget = new ListWidget()
  let preTxt = widget.addText("COVID 19")
  preTxt.textColor = Color.white()
  preTxt.textOpacity = 0.8
  preTxt.textSize = 28
  const aDayAfter = getDateWithAddedDays(1)
  const yesterday = getDateWithAddedDays(-1)
  
  for(let index = 0; index < countriesList.length; index += 1) {
    const cn = countriesList[index];
    // const req = new Request(`https://coronavirus-19-api.herokuapp.com/countries/${countriesList[index]}`)
    const req1 = new Request(`https://api.coronatracker.com/v3/analytics/newcases/country?countryCode=${cn}&startDate=${formatDate(yesterday)}&endDate=${formatDate(aDayAfter)}`)
    const res1 = (await req1.loadJSON())[0];
    const req2 = new Request(`https://api.coronatracker.com/v3/stats/worldometer/country?countryCode=${cn}`)
    const res2 = (await req2.loadJSON())[0];
    renderCountryStats(widget, res1, res2)
  }

  let lastWidgetUpdate = widget.addText(`Widget updated ${relativeTime(new Date())}`)
  lastWidgetUpdate.textColor = Color.lightGray()
  lastWidgetUpdate.textSize = 8

  widget.backgroundColor = Color.black()
  widget.centerAlignContent()
  
  Script.setWidget(widget)
  Script.complete()
}

function renderCountryStats(widget, res1, res2) {
  
  let titleTxt = widget.addText(res2.country)
  titleTxt.textColor = new Color('#039BE5')
  titleTxt.textSize = 22
  
  let todayTxt = widget.addText(`Today ${formatter.format(res1.new_infections)}`)
  todayTxt.textColor = Color.red()
  todayTxt.textOpacity = 0.8
  todayTxt.textSize = 18

  let totalTxt = widget.addText(`Total ${formatter.format(res2.totalConfirmed)}`)
  totalTxt.textColor = Color.white()
  totalTxt.textOpacity = 0.8
  totalTxt.textSize = 18

  let deathTxt = widget.addText(`☠️ ${formatter.format(res2.totalDeaths)}`)
  deathTxt.textColor = Color.white()
  deathTxt.textOpacity = 0.8
  deathTxt.textSize = 16

  let lastWidgetUpdate = widget.addText(`updated ${relativeTime(res2.lastUpdated)}`)
  lastWidgetUpdate.textColor = Color.lightGray()
  lastWidgetUpdate.textSize = 8
}
