// Get current date and format it
const setDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const days = date.getDay();

  const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
  ];
  const dayNames = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  const formattedDate = `${dayNames[days]}, ${day} ${monthNames[month]} ${year}`;
  document.getElementById("date").innerText = formattedDate;
};

// Fetch weather data and update the UI
const fetchWeather = async (search) => {
  const apiKey = "9aa3d44b0ef448748f952434251201";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${search}&aqi=no`;

  try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch weather data.");

      const result = await response.json();

      // Update the weather details
      const degree = result.current.temp_c;
      const cloud = result.current.condition.text;
      const icons = result.current.condition.icon;
      const pressure = result.current.pressure_mb;
      const humidity = result.current.humidity;
      const wind = result.current.wind_kph;
      const country = result.location.country;
      const cityName = result.location.name;
      const location = `${cityName}, ${country}`;

      document.getElementById("deg").innerHTML = degree;
      document.getElementById("clouds").innerHTML = cloud;
      document.getElementById("fulllocation").innerHTML = location;
      document.getElementById("icons").src = icons;
      document.getElementById("pressure").innerHTML = pressure;
      document.getElementById("wind").innerHTML = wind;
      document.getElementById("humidity").innerHTML = humidity;

      console.log(`Current degree: ${degree}`);
      console.log(`Condition: ${cloud}`);
      console.log(`Location: ${location}`);
  } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Could not fetch weather data. Please try again.");
  }
};

// Handle the search button click
const handleSearch = (search, event) => {
  if (!search) {
      alert("Please enter a location!");
      return;
  }

  // Display the weather container
  document.querySelector(".container").style.display = "block";

  // Trigger search if Enter is pressed
  if (event && event.key === "Enter") {
      document.getElementById("searchButton").click();
  }

  // Fetch and update weather data
  fetchWeather(search);
};

// Add event listener for Enter key
document.getElementById("query").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
      handleSearch(event.target.value, event);
  }
});

// Set the current date on page load
window.onload = () => {
  setDate();
};
