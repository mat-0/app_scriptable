let url = "https://connect.garmin.com/status/"
let r = new Request(url)
let body = await r.loadString()
if (config.runsWithSiri) {
	  let needle = "offline"
	  if (body.includes(needle)) {
		Speech.speak("uh oh")
		Safari.openInApp(url)
	  } else {
		Speech.speak("All Systems Operational")
	  }
}

