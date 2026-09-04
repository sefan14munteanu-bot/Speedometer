```javascript
// ========================================
// SPEEDOMETER
// ========================================

let currentUnit = "kmh";
let currentSpeed = 0;
let watchID = null;


// ========================================
// ELEMENTE HTML
// ========================================

const speedElement =
    document.getElementById("speed");

const unitElement =
    document.getElementById("unit");

const kmhButton =
    document.getElementById("kmhButton");

const mphButton =
    document.getElementById("mphButton");

const startButton =
    document.getElementById("startButton");

const gpsMessage =
    document.getElementById("gpsMessage");

const statusText =
    document.getElementById("statusText");

const statusDot =
    document.getElementById("statusDot");


// ========================================
// BUTON KM/H
// ========================================

kmhButton.addEventListener("click", function () {

    currentUnit = "kmh";

    kmhButton.classList.add("active");

    mphButton.classList.remove("active");

    updateSpeedDisplay();

});


// ========================================
// BUTON MPH
// ========================================

mphButton.addEventListener("click", function () {

    currentUnit = "mph";

    mphButton.classList.add("active");

    kmhButton.classList.remove("active");

    updateSpeedDisplay();

});


// ========================================
// ACTUALIZARE VITEZĂ
// ========================================

function updateSpeedDisplay() {

    let speedToShow;


    if (currentUnit === "kmh") {

        speedToShow = currentSpeed;

        unitElement.textContent = "KM/H";

    } else {

        speedToShow = currentSpeed * 0.621371;

        unitElement.textContent = "MPH";

    }


    speedElement.textContent =
        Math.round(speedToShow);

}


// ========================================
// PORNIRE / OPRIRE GPS
// ========================================

startButton.addEventListener("click", function () {

    // Dacă GPS-ul este deja pornit,
    // îl oprim.

    if (watchID !== null) {

        stopGPS();

        return;

    }


    // Verificăm dacă browserul suportă GPS

    if (!navigator.geolocation) {

        gpsMessage.textContent =
            "❌ GPS-ul nu este suportat.";

        statusText.textContent =
            "GPS indisponibil";

        return;

    }


    // Mesaj în timpul conectării

    gpsMessage.textContent =
        "📡 Se caută semnal GPS...";

    statusText.textContent =
        "Conectare GPS...";


    statusDot.style.background =
        "#00c6ff";

    statusDot.style.boxShadow =
        "0 0 10px #00c6ff";


    startButton.textContent =
        "📡 SE CONECTEAZĂ...";


    // ========================================
    // CEREM LOCAȚIA
    // ========================================

    watchID = navigator.geolocation.watchPosition(

        function (position) {

            // GPS-ul returnează viteza
            // în metri pe secundă.

            const gpsSpeed =
                position.coords.speed;


            if (
                gpsSpeed !== null &&
                gpsSpeed >= 0
            ) {

                // m/s → km/h

                currentSpeed =
                    gpsSpeed * 3.6;

            } else {

                currentSpeed = 0;

            }


            // Actualizăm numărul

            updateSpeedDisplay();


            // ========================================
            // GPS ACTIV
            // ========================================

            gpsMessage.textContent =
                "🟢 GPS activ";

            statusText.textContent =
                "GPS conectat";


            statusDot.style.background =
                "#00ff88";

            statusDot.style.boxShadow =
                "0 0 10px #00ff88";


            startButton.textContent =
                "⛔ OPREȘTE GPS";

        },


        // ========================================
        // EROARE GPS
        // ========================================

        function (error) {

            watchID = null;


            startButton.textContent =
                "📍 ACTIVEAZĂ GPS";


            statusDot.style.background =
                "#ff4040";

            statusDot.style.boxShadow =
                "0 0 10px #ff4040";


            if (error.code === 1) {

                gpsMessage.textContent =
                    "❌ Accesul la locație a fost refuzat.";

                statusText.textContent =
                    "Locație refuzată";


            } else if (error.code === 2) {

                gpsMessage.textContent =
                    "❌ Locația nu este disponibilă.";

                statusText.textContent =
                    "Locație indisponibilă";


            } else if (error.code === 3) {

                gpsMessage.textContent =
                    "❌ GPS-ul a răspuns prea târziu.";

                statusText.textContent =
                    "Timeout GPS";


            } else {

                gpsMessage.textContent =
                    "❌ Eroare GPS.";

                statusText.textContent =
                    "Eroare";

            }

        },


        // ========================================
        // SETĂRI GPS
        // ========================================

        {
            enableHighAccuracy: true,

            maximumAge: 1000,

            timeout: 10000
        }

    );

});


// ========================================
// OPRIRE GPS
// ========================================

function stopGPS() {

    if (watchID !== null) {

        navigator.geolocation.clearWatch(
            watchID
        );

        watchID = null;

    }


    currentSpeed = 0;

    updateSpeedDisplay();


    gpsMessage.textContent =
        "GPS-ul este dezactivat";

    statusText.textContent =
        "GPS oprit";


    statusDot.style.background =
        "#ffb000";

    statusDot.style.boxShadow =
        "0 0 10px #ffb000";


    startButton.textContent =
        "📍 ACTIVEAZĂ GPS";

}
```
