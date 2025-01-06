// API key and API URL
const API_KEY = '11d6d5ef829042d6ab74d94bb264c06d'; // Replace with your actual API key
const API_URL = 'https://newsapi.org/v2/top-headlines?country=us&';

const searchButton = document.getElementById("searchBtn");
const searchInput = document.getElementById("search");
const newsContainer = document.getElementById("news-container");
const loadingSpinner = document.getElementById("loading-spinner");

// Event listener for search button
searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (!query) {
    alert("Please enter a keyword to search!");
    return;
  }
  fetchNews(query);
});

// Function to fetch news
function fetchNews(query) {
  const url = `${API_URL}q=${query}&apiKey=${API_KEY}`;
  
  showLoadingSpinner();

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      hideLoadingSpinner();
      displayNews(data.articles);
    })
    .catch(error => {
      console.error("Error fetching news:", error);
      hideLoadingSpinner();
      newsContainer.innerHTML = `<p class="placeholder">Failed to fetch news. Please try again later.</p>`;
    });
}

// Function to display news
function displayNews(articles) {
  newsContainer.innerHTML = "";

  if (!articles || articles.length === 0) {
    newsContainer.innerHTML = `<p class="placeholder">No news found for the given keyword.</p>`;
    return;
  }

  articles.forEach(article => {
    const newsCard = document.createElement("div");
    newsCard.className = "news-card";

    newsCard.innerHTML = `
      <h2>${article.title}</h2>
      <p>${article.description || "No description available."}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;

    newsContainer.appendChild(newsCard);
  });
}

// Function to show loading spinner
function showLoadingSpinner() {
  loadingSpinner.classList.add("active");
}

// Function to hide loading spinner
function hideLoadingSpinner() {
  loadingSpinner.classList.remove("active");
}
