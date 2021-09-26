const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

const showSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const hideSpinner = () => {
  if (!loader.hidden) quoteContainer.hidden = false;
  loader.hidden = true;
};

// Generate New Quote
const newQuote = (quotesArr) => {
  showSpinner();
  // Pick a random quote from quotesArr
  let randomIndex = Math.floor(Math.random() * quotesArr.length);
  const quote = quotesArr[randomIndex];
  // Check for null author
  !quote.author
    ? (authorText.textContent = "Unknown")
    : (authorText.textContent = quote.author);

  // Check quote length to determine font size
  quote.text.length > 100
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  hideSpinner();
};

// Get Quotes From API
const getQuotes = async () => {
  showSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    let apiQuotes = await response.json();
    newQuote(apiQuotes);
  } catch (error) {
    // Catch Error Here
    console.log(error);
  }
};

// Tweet Quote
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet/?text="${quoteText.textContent}" - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

// On Load
getQuotes(); // via API

// Event Listeners
newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);
