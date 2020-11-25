var folder = draft.processTemplate("[[safe_title]]");

// create Dropbox object and vars
let db = Dropbox.create();
let endpoint = "https://api.dropboxapi.com/2/files/list_folder";
let args = {
    "path": "/Shared Folders/Drafts/" + folder + "/",
    "recursive": false,
    "include_media_info": false,
    "include_deleted": false,
    "include_has_explicit_shared_members": false,
    "include_mounted_folders": true
};

// make API request
let response = db.rpcRequest({
	"url": endpoint,
	"method": "POST",
	"data": args
});
if (response.statusCode != 200) {
	console.log("Dropbox Error: " + response.statusCode + ", " + response.error);
	context.fail();
} else {
	let p = Prompt.create();
	p.title = "Pick a file";
	let fileList = response.responseData.entries;
	Object.keys(fileList).forEach(function(key) {
		if (!fileList[key].name.endsWith('.md') && !fileList[key].name.endsWith('.html')) {
			p.addButton(fileList[key].name);
		}
	});
	let didSelect = p.show();
	if (didSelect) {
		editor.setSelectedText("![](" + p.buttonPressed + ")");
		let selectionRange = editor.getSelectedRange();
		editor.setSelectedRange(editor.getSelectedRange()[0]+2, 0);
	}
}
