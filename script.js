// API key and API URL
const API_KEY = '5d4b338b-5ffe-435e-be9b-08fdb2869327';
const API_URL = 'https://content.guardianapis.com/search?';

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
  // Adding show-fields parameter to get thumbnails and body text
  const url = `${API_URL}q=${query}&show-fields=thumbnail,bodyText&api-key=${API_KEY}`;
  
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
      displayNews(data.response.results);
    })
    .catch(error => {
      console.error("Error fetching news:", error);
      hideLoadingSpinner();
      newsContainer.innerHTML = `<p class="placeholder">${error.message}</p>`;
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

    const thumbnail = article.fields.thumbnail 
      ? `<img src="${article.fields.thumbnail}" alt="Article thumbnail">`
      : '';

    newsCard.innerHTML = `
      ${thumbnail}
      <h2>${article.webTitle}</h2>
      <p>${article.fields.bodyText?.substring(0, 200) || "No description available."}...</p>
      <a href="${article.webUrl}" target="_blank">Read more</a>
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
