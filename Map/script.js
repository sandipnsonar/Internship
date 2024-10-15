var map = L.map("map").setView([19.224836, 73.116630], 17);
    
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 30,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    var polyline;
    var drawnPoints = [];
    var popup = L.popup();

    function onMapClick(e) {
      drawnPoints.push(e.latlng);
      if (polyline) {
        map.removeLayer(polyline);
      }
      polyline = L.polyline(drawnPoints, { color: "blue" }).addTo(map);
      popup
        .setLatLng(e.latlng)
        .setContent(
          `You clicked the map at ${e.latlng.lat.toFixed(
            6
          )}, ${e.latlng.lng.toFixed(6)}`
        )
        .openOn(map);
      setTimeout(function () {
        map.closePopup();
      }, 5000);
    }

    map.on("click", onMapClick);

    navigator.geolocation.watchPosition(success, error);

    function success(pos) {
      const lat = pos.coords.latitude;
      const longi = pos.coords.longitude;

      var customIcon = L.icon({
        iconUrl: "https://img.icons8.com/color/96/visit.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      var icon = L.marker([lat, longi], { icon: customIcon }).addTo(map);
      icon.on("click", function (e) {
        popup
          .setLatLng(e.latlng)
          .setContent(
            `Your current location is at ${e.latlng.lat.toFixed(
              6
            )}, ${e.latlng.lng.toFixed(6)}`
          )
          .openOn(map);
        setTimeout(function () {
          map.closePopup();
        }, 5000);
      });

      L.circle([lat, longi], {
        color: "#222831",
        fillColor: "#AD88C6",
        fillOpacity: 0.2,
        radius: 500,
      }).addTo(map);
    }

    function error(err) {
      if (err.code === 1) {
        alert("Please allow geolocation access");
      } else {
        alert("Something went wrong");
      }
    }
