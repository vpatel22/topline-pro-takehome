# Viraj Patel - Topline Pro Pixabay Image Search Takehome

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Things I would change with more time

This web app is very raw and only covers the barebone requirements asked of us in the takehome description. Though this list is not all encompassing, here are a few things I would definitely change with more time:

1. ~~Add pagination so that we can see all of the images, not just the top 20~~

- I got this to work after an extra hour or so. Default page length is set to 50 (API defines it as 20 but I went larger).
- NOTE: I obtained some weird behavior for cases where the total number of hits were equal to 500. It seems as if the API gives an extra page of data (but only 1? - need to confirm but any page past the extra 1 leads to an error). I did NOT special case this logic within my application but could in the future if needed.

2. Leverage a better component structure to break out some of the code (search bar functionality and states, image results and pagination, etc.)
3. Move API key into a more secure location (I commented on this in the code)
4. Add a lot of styling to make everything look a lot nicer
   - Card components for each image after a search
   - Better formatting for the user details and image tags on the image details page
5. Allow the "Return to Home" button to maintain where the user was before they navigated to the specific image's details page.
