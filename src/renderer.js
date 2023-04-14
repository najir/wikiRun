const remote = require('electron').remote;

document.getElementById('ipButton').addEventListener('click', ipSave);

function ipSave(){
    console.log(asdasd)
    var window = remote.getCurrentWindow();
    window.close();

    var ipValue = document.getElementById("ipText").value;
    store.set('ipaddress', 'ipValue');
    ipc.send('ipLoad');


}