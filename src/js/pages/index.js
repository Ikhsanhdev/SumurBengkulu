moment.locale('id');
let map;
let awlrMarkers = [];
let arrMarkers = [];

function initMap() {
    const jakarta = { lat: -3.1004, lng: 102.2655 };

    // Inisialisasi peta
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: jakarta,
        gestureHandling: 'greedy',
        mapTypeId: google.maps.MapTypeId.HYBRID,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_LEFT
        },
        // ADD YOUR MAP ID HERE
        mapId: "YOUR_MAP_ID", // Add this line
        styles: [
            {
                featureType: "administrative.locality",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "administrative.neighborhood",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "road",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "transit",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "administrative.province",
                elementType: "labels",
                stylers: [{ visibility: "on" }]
            }
        ]
    });

    function loadDAS(url, color) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.features.forEach(f => {
                    if (!f.properties) f.properties = {};
                    f.properties.fillColor = color;
                });

                map.data.addGeoJson(data);
            });
    }

    loadDAS('/data/006_DAS_Bengkulu.json', 'red');
    loadDAS('/data/005_WS_Nasal-Padang_Guci.json', 'blue');
    loadDAS('/data/004_WS_Bengkulu-Alas-Talo.json', 'yellow');
    loadDAS('/data/003_WS_Sebelat-Ketahun-Lais.json', 'red');
    loadDAS('/data/002_WS_Teramang-Muar.json', 'orange');
    loadDAS('/data/001_WS_Silaut-Tarusan.json', 'green');

    map.data.setStyle(function(feature) {
        const fillColor = feature.getProperty('fillColor') || 'gray';
        return {
            fillColor: fillColor,
            fillOpacity: 0.3,
            strokeColor: 'white',
            strokeWeight: 0.7
        };
    });

    map.data.addListener('click', function(event) {
        const name = event.feature.getProperty('name');
        new google.maps.InfoWindow({
            content: `<strong>${name}</strong>`,
            position: event.latLng
        }).open(map);
    });

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: jakarta }, (results, status) => {
        if (status === "OK" && results[0]) {
            let province = '';
            for (const component of results[0].address_components) {
                if (component.types.includes("administrative_area_level_1")) {
                    province = component.long_name;
                    break;
                }
            }

            const infowindow = new google.maps.InfoWindow({
                content: `<strong>${province}</strong>`,
            });
            infowindow.open(map);
        }
    });

    const legend = document.createElement('div');
    legend.innerHTML = `
        <div style="background: white; padding: 10px; font-size: 13px; border: 1px solid #ccc; border-radius: 5px; line-height: 20px; min-width:160px;">
            <div style="display:flex; align-items:center; margin-bottom:5px;">
                <input type="checkbox" id="chk-duga" checked style="margin-right:6px;">
                <div style="width:16px; height:16px; background:blue; margin-right:6px; border-radius:3px;"></div>
                <label for="chk-duga" style="cursor:pointer;">Pos Duga Air</label>
            </div>
            <div style="display:flex; align-items:center;">
                <input type="checkbox" id="chk-curah" checked style="margin-right:6px;">
                <div style="width:16px; height:16px; background:green; margin-right:6px; border-radius:50%;"></div>
                <label for="chk-curah" style="cursor:pointer;">Pos Curah Hujan</label>
            </div>
        </div>`;

    legend.addEventListener('change', function(e) {
        if (e.target.id === 'chk-duga') {
            toggleMarkers('awlr', e.target.checked);
        } else if (e.target.id === 'chk-curah') {
            toggleMarkers('arr', e.target.checked);
        }
    });

    legend.style.margin = '10px';
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
}

function toggleMarkers(type, isVisible) {
    let markers = [];
    
    if (type === 'awlr') {
        markers = awlrMarkers;
    } else if (type === 'arr') {
        markers = arrMarkers;
    }

    console.log(`Toggling ${type} markers: ${isVisible ? 'show' : 'hide'}, total markers: ${markers.length}`);

    markers.forEach(marker => {
        if (isVisible) {
            marker.map = map; // Tampilkan marker
        } else {
            marker.map = null; // Sembunyikan marker
        }
    });
}

$(document).ready(function () {
    loadAwlrLastReading();
    loadArrLastReading();
});

function loadAwlrLastReading() {
    const data = [
        {
            lat: -3.79082652717697,
            lng: 102.36347289412156,
            name: "AWLR BENGKULU HILIR",
            deviceId: "HGT741",
            das: "DAS BENGKULU",
            reading_at: "1 September 2025 11:45 WIB",
            water_level: 1.01,
            slug: "awlr-bengkulu-hilir"
        },
        {
            lat: -2.6242039234005485,
            lng: 101.29243288189173,
            name: "AWLR AIR DIKIT",
            deviceId: "HGT753",
            das: "DAS DIKIT",
            reading_at: "1 September 2025 11:45 WIB",
            water_level: 1.33,
            slug: "awlr-air-dikit"
        },
        {
            lat: -3.781495,
            lng: 102.282005,
            name: "AWLR AIR BENGKULU (EWS)",
            deviceId: "HGT859",
            das: "DAS BENGKULU",
            reading_at: "1 September 2025 11:45 WIB",
            water_level: 1.62,
            slug: "awlr-tanjung-jaya-(ews)"
        },
        {
            lat: -3.761304231675983,
            lng: 102.42001103431923,
            name: "AWLR BENGKULU HULU",
            deviceId: "HGT729",
            das: "DAS BENGKULU",
            reading_at: "1 September 2025 11:45 WIB",
            water_level: 0.47,
            slug: "awlr-bengkulu-hulu"
        }
    ];

    data.forEach((st, index) => {
        let infowindow = new google.maps.InfoWindow({
            maxWidth: 400,
            minWidth: 280
        });

        var contentString = `
            <div class="table-responsive">
                <table class="table mb-2 font-12">
                    <tbody>
                        <tr>
                            <td class="px-0 py-2 pt-1 pe-3" colspan="3">
                                <div class="d-flex align-items-start">
                                    <img class="me-2 rounded-3" src="/assets/images/logo-pu.png" width="35" height="35" alt="${st.name}">
                                    <div class="w-100">
                                        <h5 class="mt-0 mb-1 fw-bold font-12" style="color: #2A62A6;">${st.name}</h5>
                                        <div class="d-flex align-items-center">
                                            <span><small class="mdi mdi-circle text-success"></small> Online</span>
                                            <span class="badge badge-outline-secondary rounded-1 ms-1">${st.deviceId}</span>
                                        <div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="py-1 px-0">Sungai</td>
                            <td class="py-1 px-2">:</td>
                            <td class="py-1 px-0">${st.das}</td>
                        </tr>
                        <tr>
                            <td class="py-1 px-0">Update</td>
                            <td class="py-1 px-2">:</td>
                            <td class="py-1 px-0">${st.reading_at}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="d-flex justify-content-around align-items-center mb-1 reading-text">
                <div class="col-4 text-center font-14 fw-bold text-dark">
                    ${st.water_level} <sup>m</sup>
                </div>
                <div class="col-4 text-center font-14 fw-bold text-dark">
                    - 
                </div>
                <div class="col-4 text-center font-15 fw-bold text-dark">
                    <span class="badge bg-success font-10">NORMAL</span>
                </div>
            </div>
            <div class="d-flex justify-content-around reading-text mb-2">
                <div class="col-4 text-center font-12 text-nowrap">
                    TMA
                </div>
                <div class="col-4 text-center font-12 text-nowrap">
                    Debit
                </div>
                <div class="col-4 text-center font-12 text-nowrap">
                    Status
                </div>
            </div>
            <a href="https://hkasumatera7.higertech.com/Station/Detail/${st.slug}" target="_blank" class="btn btn-sm btn-primary rounded-pill waves-effect waves-light text-white w-100">Lihat Detail</a>`;
            
        const customAwlrMarker = document.createElement("div");
        customAwlrMarker.className = `awlr-marker`;

        const awlrMarker = new google.maps.marker.AdvancedMarkerElement({
            map,
            position: { lat: st.lat, lng: st.lng },
            content: customAwlrMarker
        });

        awlrMarkers.push(awlrMarker);

        awlrMarker.addListener("gmp-click", () => {
            if (infowindow) {
                infowindow.close();
            }

            // Open a new infowindow
            infowindow.setContent(contentString);
            infowindow.open({
                anchor: awlrMarker,
                map
            });
        });
    });
}

function loadArrLastReading() {
    const data = [
        {
            lat: -2.8905,
            lng: 101.455,
            name: "ARR SIDODADI",
            deviceId: "HGT111",
            reading_at: "1 September 2025 11:25 WIB",
            ch: 0,
            slug: "ARR-SIDODADI"
        },
        {
            lat: -4.368153,
            lng: 103.065737,
            name: "ARR SUKA MAJU",
            deviceId: "HGT173",
            reading_at: "1 September 2025 11:25 WIB",
            ch: 0,
            slug: "ARR-SUKA-MAJU"
        },
        {
            lat: -2.6275,
            lng: 101.2869,
            name: "ARR SARI BULAN",
            deviceId: "HGT109",
            reading_at: "1 September 2025 11:25 WIB",
            ch: 0,
            slug: "ARR-SARI-BULAN"
        },
        {
            lat: -2.744394,
            lng: 101.341934,
            name: "ARR NENGGALO",
            deviceId: "HGT818",
            reading_at: "1 September 2025 11:25 WIB",
            ch: 0,
            slug: "arr-nenggalo-2"
        },
        {
            lat: -3.703222,
            lng: 102.489222,
            name: "ARR BAJAK",
            deviceId: "HGT172",
            reading_at: "1 September 2025 11:25 WIB",
            ch: 0,
            slug: "ARR-BAJAK"
        },
        {
            lat: -3.785731565927591,
            lng: 102.29108836501837,
            name: "ARR TANJUNG JAYA",
            deviceId: "HGT746",
            reading_at: "1 September 2025 11:25 WIB",
            ch: 0,
            slug: "arr-tanjung-jaya"
        }
    ];

    data.forEach((st, index) => {
        let infowindow = new google.maps.InfoWindow({
            maxWidth: 400,
            minWidth: 280
        });

        var contentString = `
            <div class="table-responsive">
                <table class="table mb-2 font-12">
                    <tbody>
                        <tr>
                            <td class="px-0 py-2 pt-1" colspan="3">
                                <div class="d-flex align-items-start">
                                    <img class="me-2 rounded-3" src="/assets/images/logo-pu.png" width="35" height="35" alt="${st.name}">
                                    <div class="w-100">
                                        <h5 class="mt-0 mb-1 fw-bold font-12" style="color: #2A62A6;">${st.name}</h5>
                                        <div class="d-flex align-items-center">
                                            <span><small class="mdi mdi-circle text-success"></small> Online</span>
                                            <span class="badge badge-outline-secondary rounded-1 ms-1">${st.deviceId}</span>
                                        <div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="py-1 px-0">Update</td>
                            <td class="py-1 px-2">:</td>
                            <td class="py-1 px-0">${st.reading_at}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="d-flex justify-content-around align-items-center reading-text">
                <div class="col-6 text-center font-15 fw-bold text-dark">
                    0 <sup>mm</sup>
                </div>
                <div class="col-6 text-center font-15 fw-bold text-dark">
                    <img src="/assets/images/arr/berawan.png" alt="Tidak Ada Hujan" class="avatar-xs">
                </div>
            </div>
            <div class="d-flex justify-content-around reading-text mb-3">
                <div class="col-6 text-center font-12 text-nowrap">
                    Curah Hujan
                </div>
                <div class="col-6 text-center font-12 text-nowrap">
                    Tidak Ada Hujan
                </div>
            </div>
            <a href="https://hkasumatera7.higertech.com/Station/Detail/${st.slug}" target="_blank" class="btn btn-sm btn-primary rounded-pill waves-effect waves-light text-white w-100">Lihat Detail</a>`;

        const customArrMarker = document.createElement("div");
        customArrMarker.className = `arr-marker`;

        const arrMarker = new google.maps.marker.AdvancedMarkerElement({
            map,
            position: { lat: st.lat, lng: st.lng },
            content: customArrMarker
        });

        arrMarkers.push(arrMarker);

        arrMarker.addListener("gmp-click", () => {
            if (infowindow) {
                infowindow.close();
            }

            // Open a new infowindow
            infowindow.setContent(contentString);
            infowindow.open({
                anchor: arrMarker,
                map
            });
        });
    });
}