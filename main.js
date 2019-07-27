// Global Variables
var markerMap = document.getElementById('marker-map');
var ctx = markerMap.getContext('2d');
var markerSize = 3.555;
var markers = [];

// Generates a sheet of markers based on user inputs
function generateMarkerMap() {
    // Determine size of the page
    var sheetSize = determineSheetSize();

    // If an error occured, notify the user
    if (sheetSize.startsWith('Error')) {
        alert(sheetSize);
    } else {
        // Parse the response from the determineSheetSize() function
        width = parseInt(sheetSize.split(' ')[0]);
        height = parseInt(sheetSize.split(' ')[1]);

        // Set the canvas to the values from the determineSheetSize() response converted to pixels
        markerMap.width = toPixels(width);
        markerMap.height = toPixels(height);

        // Clear the canvas
        ctx.clearRect(0, 0, markerMap.width, markerMap.height);

        // Set the canvas background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0,  markerMap.width, markerMap.height);

        // Set the maximum size for the rows
        var rowMax = Math.floor(width / markerSize);
        var counter = 0;

        // Iterate over each marker in the markers array
        markers.forEach(function(marker) {
            for (i = 0; i < marker.count; i++) {
                // Card
                // Set the draw location in X and Y and the background color of the card
                var markerPosX = toPixels((counter % rowMax) * markerSize) + (1 * (counter % rowMax));
                var markerPosY = toPixels(Math.floor(counter / rowMax) * markerSize) + (1 * Math.floor(counter / rowMax));
                ctx.fillStyle = '#FFC220';
                // Draw the card on the canvas
                ctx.fillRect(markerPosX, markerPosY, toPixels(markerSize), toPixels(markerSize));

                // Text
                // Set the draw location in X and Y, color, font style, alignment, and baseline of the card text
                var textPosX = toPixels((counter % rowMax) * markerSize) + toPixels(markerSize / 2) + (1 * (counter % rowMax));
                var textPosY = toPixels(Math.floor(counter / rowMax) * markerSize) + toPixels(markerSize / (markerSize / 2)) + (1 * Math.floor(counter / rowMax));
                ctx.fillStyle = '#000000';
                ctx.font = '3in Bogle Black';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                // Draw the text on the canvas
                ctx.fillText(marker.text, textPosX, textPosY);

                // Increment the counter
                counter++;
            }
        });
    }
}

function determineSheetSize() {
    // Get total number of cards input by the user
    var totalMarkers = getTotalCards();

    // Test the length of the totalMarkers variable and determine the best ready-to-print sheet size
    if (totalMarkers == 0) {
        return 'Error: No markers added.';
    } else if (totalMarkers == 1) {
        return '4 6';
    } else if (totalMarkers <= 4) {
        return '8 8';
    } else if (totalMarkers <= 9) {
        return '11 14';
    } else if (totalMarkers <= 20) {
        return '16 20';
    } else if (totalMarkers <= 40) {
        return '20 30';
    } else if (totalMarkers <= 60) {
        return '24 36';
    } else {
        return 'Error: Maximum amount of 60 markers exceeded.';
    }
}

function getTotalCards() {
    // Read markers array and return a count of the total quantity of cards
    var count = 0;

    markers.forEach(function(marker) {
        count += marker.count;
    });

    return count;
}

function toPixels(inch) {
    // Convert inch sizes to pixels. Currently hardcoded to 96 DPI. Will be adjusted later.
    return inch * 96;
}