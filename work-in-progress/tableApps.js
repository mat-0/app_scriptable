const url =
    "https://raw.githubusercontent.com/MatBenfield/app_scriptable/data/apps.json";
let req = new Request(url);
let json = await req.loadJSON();

let table = new UITable();

for (line of json) {
    let row = new UITableRow();
    row.cellSpacing = 10;

    let dateCell = row.addText(line.Apps);
    dateCell.widthWeight = 100;
    dateCell.centerAligned();

    table.addRow(row);
}

QuickLook.present(table);
