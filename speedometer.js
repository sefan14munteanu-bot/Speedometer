let currentUnit = "kmh";
let currentSpeed = 0;
let watchID = null;

const speedElement = document.getElementById("speed");
const unitElement = document.getElementById("unit");
const kmhButton = document.getElementById("kmhButton");
const mphButton = document.getElementById("mphButton");
const startButton = document.getElementById("startButton");
const gpsMessage = document.getElementById("gpsMessage");
const statusText = document.getElementById("statusText");
const statusDot = document.getElementById("statusDot");


// KM/H
kmhButton.addEventListener("click", function () {
    currentUnit = "kmh";

    kmhButton.classList.add("active");
    mphButton.classList.remove("active");

    updateSpeedDisplay();
});


// MPH
mphButton.addEventListener("click", function () {
    currentUnit = "mph";

    mphButton.classList.add("active");
    kmhButton.classList.remove("active");

    updateSpeedDisplay();
});


// Actualizează viteza afișată
function updateSpeedDisplay() {

    if (currentUnit === "kmh") {
        speedElement.textContent = Math.round(currentSpeed);
        unitElement.textContent = "KM/H";
    } 
    
    else {
        speedElement.textContent = Math.round(currentSpeed * 0.621371);
        unitElement.textContent = "MPH";
    }
}


// Buton GPS
startButton.addEventListener("click", function () {

    if (watchID !== null) {
        stopGPS();
        return;
    }

    if (!navigator.geolocation) {
        gpsMessage.textContent = "❌ GPS-ul nu este suportat.";
        statusText.textContent = "GPS indisponibil";
        return;
    }

    gpsMessage.textContent = "📡 Se caută semnal GPS...";
    statusText.textContent = "Conectare GPS...";

    startButton.textContent = "📡 SE CONECTEAZĂ...";

    watchID = navigator.geolocation.watchPosition(

        function (position) {

            if (position.coords.speed !== null) {
                currentSpeed = position.coords.speed * 3.6;
            } 
            else {
                currentSpeed = 0;
            }

            updateSpeedDisplay();

            gpsMessage.textContent = "🟢 GPS activ";
            statusText.textContent = "GPS conectat";

            statusDot.style.background = "#00ff88";
            statusDot.style.boxShadow = "0 0 10px #00ff88";

            startButton.textContent = "⛔ OPREȘTE GPS";
        },

        function (error) {

            watchID = null;

            startButton.textContent = "📍 ACTIVEAZĂ GPS";

            statusDot.style.background = "#ff4040";
            statusDot.style.boxShadow = "0 0 10px #ff4040";

            if (error.code === 1) {
                gpsMessage.textContent = "❌ Ai refuzat accesul la locație.";
                statusText.textContent = "Locație refuzată";
            }

            else if (error.code === 2) {
                gpsMessage.textContent = "❌ Locația nu este disponibilă.";
                statusText.textContent = "Locație indisponibilă";
            }

            else if (error.code === 3) {
                gpsMessage.textContent = "❌ GPS-ul a răspuns prea târziu.";
                statusText.textContent = "Timeout GPS";
            }

            else {
                gpsMessage.textContent = "❌ Eroare GPS.";
                statusText.textContent = "Eroare";
            }
        },

        {
            enableHighAccuracy: true,
            maximumAge: 1000,
            timeout: 10000
        }
    );
});


// Oprește GPS-ul
function stopGPS() {

    if (watchID !== null) {
        navigator.geolocation.clearWatch(watchID);
        watchID = null;
    }

    currentSpeed = 0;

    updateSpeedDisplay();

    gpsMessage.textContent = "GPS-ul este dezactivat";
    statusText.textContent = "GPS oprit";

    statusDot.style.background = "#ffb000";
    statusDot.style.boxShadow = "0 0 10px #ffb000";

    startButton.textContent = "📍 ACTIVEAZĂ GPS";
}


// Pornim inițial pe KM/H
updateSpeedDisplay();
