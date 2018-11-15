const url = "https://api.tfl.gov.uk/Line/Mode/tube/Status"
let req = new Request(url)
let json = await req.loadJSON()

let table = new UITable()
for (line of json) {
  let row = new UITableRow()
  let lineName = line.name
  let status = line.lineStatuses.map(s => s.statusSeverityDescription)

  let count = status.length
  let str = status.reduce((t,s,i) => {
    t = t + s
    if (i < (count- 1) && count > 0) { t = t + " &\n "}
    return t
    }, "")
    
  let height = 16 + Math.max(count,2) * 22
  row.height = height
  
  const cW = 80
  let c = new DrawContext()
  c.size = new Size(cW, height * 4)
  c.setFillColor(getLineColor(lineName))
  c.fill(new Rect(0, 0 , cW, height * 4))
  
  // ... populate the row with data ...
  let imageCell = row.addImage(c.getImage())
  let titleCell = row.addText(lineName)
  let statusCell = row.addText(str)
  
  // ... format columns and rows ...
  row.cellSpacing = 10
  imageCell.widthWeight = 5
  titleCell.widthWeight = 35
  statusCell.widthWeight = 60
  
  // ... add row to table ...
  table.addRow(row)
}

// ... and present table
QuickLook.present(table)

function getLineColor(line) {
  switch(line) {
    case "Bakerloo":
      return new Color("#B26300")
      break
    case "Central":
      return new Color("#DC241F")
      break
    case "Circle":
      return new Color("#FFD329")
      break
    case "District":
      return new Color("#007D32")
      break
    case "Hammersmith & City":
      return new Color("#F4A9BE")
      break
    case "Jubilee":
      return new Color("#A1A5A7")
      break
    case "Metropolitan":
      return new Color("#9B0058")
      break
    case "Northern":
      return new Color("#000")
      break
    case "Piccadilly":
      return new Color("#0019A8")
      break
    case "Victoria":
      return new Color("#0098D8")
      break
    case "Waterloo & City":
      return new Color("#93CEBA")
      break
    default:
      return new Color("CCC")
      break
  }
}