let score = 0; // Houdt de score van de speler bij
let blockPassed = false; // Vlag om te controleren of het blok de speler gepasseerd is
var character = document.getElementById("character");
var block = document.getElementById("block");

// Voeg een event listener toe aan de herstartknop
document.getElementById('restart-button').addEventListener('click', function() {
    location.reload(); // Herlaadt de pagina om het spel te herstarten
});

// Functie om het karakter te laten springen
function jump() {
    if (character.classList.contains("animate")) { return } // Als het karakter al springt, doe dan niets
    character.classList.add("animate"); // Voeg de animatie toe
    setTimeout(function() {
        character.classList.remove("animate"); // Verwijder de animatie na 500ms
    }, 500); 
}

// Controleert elke 10 milliseconden de status van het spel
var checkGame = setInterval(function() {
    // Haal de huidige positie van het karakter en het blok op
    var characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

    // De breedte van het karakter en het obstakel
    var characterWidth = character.offsetWidth;
    var blockWidth = block.offsetWidth;

    // Botsingsdetectie: Controleer of het obstakel het karakter raakt
    if (
        blockLeft < characterLeft + characterWidth && // Blok links van karakter
        blockLeft + blockWidth > characterLeft && // Blok rechts van karakter
        characterBottom <= 0 // Karakter staat op de grond
    ) {
        block.style.animation = "none"; // Stop de beweging van het blok
        block.style.display = "none"; // Verberg het blok
        alert("je bent geraakt door een obstakel"); // Laat de speler weten dat hij dood is
    }

    // Controleer of het blok voorbij de speler is gegaan (verhoog de score één keer per passage)
    if (blockLeft < characterLeft && !blockPassed) {
        updateScore(); // Verhoog de score
        blockPassed = true; // Zet de vlag om te voorkomen dat de score meerdere keren wordt verhoogd
    }

    // Reset de blockPassed vlag wanneer het blok weer ver genoeg naar rechts beweegt
    if (blockLeft > characterLeft + characterWidth) {
        blockPassed = false; // Zet de vlag terug naar false voor de volgende passage
    }

}, 10);

// Functie om de score te updaten
function updateScore() {
    score++; // Verhoog de score met 1
    document.getElementById('score').innerText = 'Score: ' + score; // Update de score op de pagina
}
