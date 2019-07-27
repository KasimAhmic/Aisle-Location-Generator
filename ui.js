// Global Variables
var addMarkerButton = document.getElementById('add-marker');
var generateMarkersButton = document.getElementById('generate');

// Create event listeners
addMarkerButton.addEventListener('click', addInput);
generateMarkersButton.addEventListener('click', runGenerator);

// Adds additional inputs for additional cards
function addInput() {
    var inputsWrapper = document.getElementById('inputs');
    var inputTemplate = `<input type="text" maxlength="2" placeholder="Marker Text" class="marker-text"><input type="number" maxlength="2" placeholder="Number" class="marker-count">`;

    inputsWrapper.insertAdjacentHTML('beforeend', inputTemplate);
}

// Adds all user created cards to and array and runs the generateMarkerMap() function
function runGenerator() {
    // Get the marker text and marker quantities
    var textInput = document.querySelectorAll('#inputs .marker-text');
    var countInput = document.querySelectorAll('#inputs .marker-count');

    // Clear the array
    markers.length = 0;

    // Iterate over the textInput array
    textInput.forEach(function(entry, index) {
        // If a value is present in both the text and quantity boxes...
        if (entry.value && countInput[index].value) {
            // Push an object to the marker array (e.g. {text: 'F', count: '5'})
            markers.push({text: entry.value, count: parseInt(countInput[index].value)});
        }
    });

    // Run generateMarkerMap()
    generateMarkerMap();
}