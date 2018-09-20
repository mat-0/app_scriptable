
let url = "https://lunch.thechels.uk/locations.json"
let req = new Request(url)
let json = await req.loadJSON()


function getRandomKeyFromJson(){
        var obj_keys = Object.keys(data);
        var ran_key = obj_keys[Math.floor(Math.random() *obj_keys.length)];
        console.log(ran_key);
}
