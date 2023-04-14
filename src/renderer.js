
document.querySelector('#ipButton').addEventListener("click", () => {
    var ipValue = document.getElementById("ipText").value;
    window.electron.store.set('ipaddress', ipValue);
    window.electron.ipc.send('ipLoad');
    window.electron.ipc.send('childClose');
});
