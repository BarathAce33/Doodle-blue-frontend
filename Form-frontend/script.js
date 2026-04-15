document.addEventListener('DOMContentLoaded', () => {
    const d = document, get = id => d.getElementById(id);
    const addOption = (select, text, value) => select?.add(new Option(text, value));

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
        { code: "+48", flag: "🇵🇱" }, { code: "+43", flag: "🇦🇹" }, { code: "+30", flag: "🇬🇷" },
        { code: "+351", flag: "🇵🇹" }, { code: "+353", flag: "🇮🇪" }, { code: "+64", flag: "🇳🇿" },
        { code: "+65", flag: "🇸🇬" }, { code: "+60", flag: "🇲🇾" }, { code: "+971", flag: "🇦🇪" },
        { code: "+966", flag: "🇸🇦" }, { code: "+254", flag: "🇰🇪" }, { code: "+94", flag: "🇱🇰" },
        { code: "+977", flag: "🇳🇵" }, { code: "+880", flag: "🇧🇩" }
    ];

    const directSelect = get('directMobileCountryCode'), pocSelect = get('pocMobileCountryCode');
    countryCodes.forEach(({ code, flag }) => {
        addOption(directSelect, `${flag} ${code}`, code);
        addOption(pocSelect, `${flag} ${code}`, code);
    });

    const locationData = {
        "India": { "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane"], "Delhi": ["New Delhi", "Dwarka", "Rohini"], "Karnataka": ["Bangalore", "Mysore", "Mangalore", "Hubli"], "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy"] },
        "USA": { "California": ["Los Angeles", "San Francisco", "San Diego"], "New York": ["New York City", "Buffalo", "Rochester"], "Texas": ["Houston", "Austin", "Dallas", "San Antonio"] },
        "UK": { "England": ["London", "Manchester", "Birmingham", "Liverpool"], "Scotland": ["Edinburgh", "Glasgow", "Aberdeen"], "Wales": ["Cardiff", "Swansea", "Newport"] },
        "Australia": { "New South Wales": ["Sydney", "Newcastle", "Wollongong"], "Victoria": ["Melbourne", "Geelong", "Ballarat"], "Queensland": ["Brisbane", "Gold Coast", "Cairns"] }
    };

    const countrySelect = get('countryDropdown'), stateSelect = get('stateDropdown'), citySelect = get('cityDropdown');
    
    if (countrySelect && stateSelect && citySelect) {
        Object.keys(locationData).forEach(c => addOption(countrySelect, c, c));

        countrySelect.addEventListener('change', function() {
            stateSelect.innerHTML = '<option value="" disabled selected>Select State</option>';
            citySelect.innerHTML = '<option value="" disabled selected>Select City</option>';
            const states = locationData[this.value];
            stateSelect.disabled = !states;
            citySelect.disabled = true;
            if (states) Object.keys(states).forEach(s => addOption(stateSelect, s, s));
        });

        stateSelect.addEventListener('change', function() {
            citySelect.innerHTML = '<option value="" disabled selected>Select City</option>';
            const cities = locationData[countrySelect.value]?.[this.value];
            citySelect.disabled = !cities;
            if (cities) cities.forEach(city => addOption(citySelect, city, city));
        });
    }

    const form = get('creator-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const dataObject = Object.fromEntries(new FormData(form));
        
        ['publicFigure', 'animetaVerified', 'aniAppOnboarded', 'delistCreator'].forEach(field => {
            dataObject[field] = form.elements[field].checked;
        });

        console.log("%c=== Form Data Submitted ===", "color: #f43f5e; font-size: 14px; font-weight: bold;");
        console.log(dataObject);
        console.log("%c===========================", "color: #f43f5e; font-size: 14px; font-weight: bold;");
        alert("Form submitted successfully! Check your browser console to view the data.");
    });
});
