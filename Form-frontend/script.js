document.addEventListener('DOMContentLoaded', function() {
    
    // Country code prefix list
    const countryCodes = [
        { code: "+91", flag: "🇮🇳" }, { code: "+1", flag: "🇺🇸" }, { code: "+44", flag: "🇬🇧" },
        { code: "+61", flag: "🇦🇺" }, { code: "+49", flag: "🇩🇪" }, { code: "+33", flag: "🇫🇷" },
        { code: "+81", flag: "🇯🇵" }, { code: "+86", flag: "🇨🇳" }, { code: "+55", flag: "🇧🇷" },
        { code: "+7", flag: "🇷🇺" }, { code: "+27", flag: "🇿🇦" }, { code: "+82", flag: "🇰🇷" },
        { code: "+52", flag: "🇲🇽" }, { code: "+62", flag: "🇮🇩" }, { code: "+90", flag: "🇹🇷" },
        { code: "+39", flag: "🇮🇹" }, { code: "+34", flag: "🇪🇸" }, { code: "+54", flag: "🇦🇷" },
        { code: "+20", flag: "🇪🇬" }, { code: "+234", flag: "🇳🇬" }, { code: "+92", flag: "🇵🇰" },
        { code: "+63", flag: "🇵🇭" }, { code: "+84", flag: "🇻🇳" }, { code: "+66", flag: "🇹🇭" },
        { code: "+31", flag: "🇳🇱" }, { code: "+41", flag: "🇨🇭" }, { code: "+46", flag: "🇸🇪" },
        { code: "+47", flag: "🇳🇴" }, { code: "+45", flag: "🇩🇰" }, { code: "+358", flag: "🇫🇮" },
        { code: "+48", flag: "🇵🇱" }, { code: "+43", flag: "🇦🇹" }, { code: "+30", flag: "🇬🇷" }
    ];

    let directSelect = document.getElementById('directMobileCountryCode');
    let pocSelect = document.getElementById('pocMobileCountryCode');

    for (let i = 0; i < countryCodes.length; i++) {
        let country = countryCodes[i];

        if (directSelect !== null) {
            let option1 = document.createElement('option');
            option1.value = country.code;
            option1.textContent = country.flag + " " + country.code;
            directSelect.appendChild(option1);
        }

        if (pocSelect !== null) {
            let option2 = document.createElement('option');
            option2.value = country.code;
            option2.textContent = country.flag + " " + country.code;
            pocSelect.appendChild(option2);
        }
    }

    // Cascading dropdown locations
    const locationData = {
        "India": {
            "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane"],
            "Delhi": ["New Delhi", "Dwarka", "Rohini"],
            "Karnataka": ["Bangalore", "Mysore", "Mangalore", "Hubli"],
            "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy"]
        },
        "USA": {
            "California": ["Los Angeles", "San Francisco", "San Diego"],
            "New York": ["New York City", "Buffalo", "Rochester"],
            "Texas": ["Houston", "Austin", "Dallas", "San Antonio"]
        },
        "UK": {
            "England": ["London", "Manchester", "Birmingham", "Liverpool"],
            "Scotland": ["Edinburgh", "Glasgow", "Aberdeen"],
            "Wales": ["Cardiff", "Swansea", "Newport"]
        },
        "Australia": {
            "New South Wales": ["Sydney", "Newcastle", "Wollongong"],
            "Victoria": ["Melbourne", "Geelong", "Ballarat"],
            "Queensland": ["Brisbane", "Gold Coast", "Cairns"]
        }
    };

    let countrySelect = document.getElementById('countryDropdown');
    let stateSelect = document.getElementById('stateDropdown');
    let citySelect = document.getElementById('cityDropdown');

    if (countrySelect !== null && stateSelect !== null && citySelect !== null) {
        let allCountries = Object.keys(locationData);
        for (let i = 0; i < allCountries.length; i++) {
            let option = document.createElement('option');
            option.value = allCountries[i];
            option.textContent = allCountries[i];
            countrySelect.appendChild(option);
        }

        countrySelect.addEventListener('change', function() {
            stateSelect.innerHTML = '<option value="" disabled selected>Select State</option>';
            citySelect.innerHTML = '<option value="" disabled selected>Select City</option>';
            
            citySelect.disabled = true;

            let selectedCountry = countrySelect.value;
            let availableStates = locationData[selectedCountry];

            if (availableStates !== undefined) {
                stateSelect.disabled = false;
                
                let stateNames = Object.keys(availableStates);
                for (let i = 0; i < stateNames.length; i++) {
                    let option = document.createElement('option');
                    option.value = stateNames[i];
                    option.textContent = stateNames[i];
                    stateSelect.appendChild(option);
                }
            } else {
                stateSelect.disabled = true;
            }
        });

        stateSelect.addEventListener('change', function() {
            citySelect.innerHTML = '<option value="" disabled selected>Select City</option>';
            
            let selectedCountry = countrySelect.value;
            let selectedState = stateSelect.value;
            let availableCities = locationData[selectedCountry][selectedState];

            if (availableCities !== undefined) {
                citySelect.disabled = false;
                
                for (let i = 0; i < availableCities.length; i++) {
                    let option = document.createElement('option');
                    option.value = availableCities[i];
                    option.textContent = availableCities[i];
                    citySelect.appendChild(option);
                }
            } else {
                citySelect.disabled = true;
            }
        });
    }

    // Form submission processing
    let form = document.getElementById('creator-form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let formData = new FormData(form);
        let finalData = {};

        for (let [inputName, inputValue] of formData.entries()) {
            finalData[inputName] = inputValue;
        }

        let toggleNames = ['publicFigure', 'animetaVerified', 'aniAppOnboarded', 'delistCreator'];
        for (let i = 0; i < toggleNames.length; i++) {
            let fieldName = toggleNames[i];
            let checkboxHtmlElement = form.elements[fieldName];
            
            finalData[fieldName] = checkboxHtmlElement.checked;
        }

        console.log("=== Your Form Data Submitted ===");
        console.log("Raw object:", finalData);
        console.log("JSON string:\n" + JSON.stringify(finalData, null, 2));
        alert("Form saved successfully!");
    });
});
