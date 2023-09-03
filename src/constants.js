// This should realistically be saved in a secrets or env file, but
// considering we pass the API key as a query param, it's already
// publicly visible by anyone using the page so we can skip for now
export const PIXABAY_API_KEY = "39204582-795e0a0f587b4d7d9267cce65";

export const PIXABAY_API_URL =
  "https://pixabay.com/api/?key=" + PIXABAY_API_KEY;
