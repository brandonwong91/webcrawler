# Webcrawler - Chotot.com

Task: To scrape through 50000 phone numbers from https://chotot.com

Intention:

- To use RemixJS as my FullStack solution, to build out fast solutions.
- To use an useEffect with a timeout to scrape the phone numbers through pages of 20 listings each second.
- Show current live phone numbers scraped.
- Add a database viewer for the scraped results.

# Discovery / Challenges

1. Phone numbers on listings can't be obtained directly from any of the list backend APIs which includes:

   ```
   // Main homepage
   https://gateway.chotot.com/v1/public/recommender/homepage?fingerprint=undefined&page=1

   // Listing page
   https://passport.chotot.com/v1/public/ad-listing/phone?e=<encoded_string>
   ```

1. Phone number can then be revealed after clicking on the button on individual listing page, which requires interaction -> headless UI manipulation
1. From the main page, after retrieving the listings from the API, to obtain the url to navigate to the listing page, it is categorised, there is an API for the category but the combination of the url path is not directly mappable with the category API.
   ```
   https://gateway.chotot.com/v1/public/web-proxy-api/loadC2CCategories
   ```
1. Next attempt is to scrape for the `href` attributes from the main page but the `div` with the `href` classes can't be found with the `playwright`
1. Finally able to use the `All category` page to scrape for my intended `a[href]` elements for me to build the list of listings.
1. `Playwright` crashed the application upon automating through the list of listings.

# Using My Favourite Remix Frontend Template to start!

- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```

## This project includes the following added packages:

1. tailwindcss
1. prettier config
1. clsx
1. playwright - for webscraping purposes
