function openFile() {
    console.log("getting here");

    dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] })
}