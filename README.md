# Map of The Silk Road
This is a submission for the final project of MUSA 620: Data Wrangling and Data Visualization (Instructor: Max Galka)

By Dorcas Chang and Ziqin Wang

## Web Scraping with R
Using R, we scraped data from [Yale Silk Road Database](http://digitalcollections.library.yale.edu/YaleSilkRoad/search.dl?q=Search+this+collection&qcx=1034.1&qqid=52950&qs=1), removed duplicates and cleaned data accordingly (e.g. errors in the database, missing information etc)


## Geocoding
We then batch geocoded the points online (https://www.doogal.co.uk/BatchGeocoding.php).

Unfortunately, because of the nature of the language and perhaps the obsurity of the sites, there were some points that failed to be geocoded and were removed from our dataset

## Data Visualization
The data was then vizualized spatially using Javascript
#### JS Libraries and tools used
- JQuery
- Underscore.js
- Mapbox
- Materials Design Lite

#### Some features of the map
You can...
- Change the basemap to your liking
- See how the traditional perception the Silk road routes move
- Stop the moving points
- Observe the geographical location of sites/sights studied in the Yale Silk Road database (interestingly, these sites extend beyond the conventional perceptions of routes of the Silk road!)
- Clicking on each point zooms to it and launches a popup that is a slideshow of some of the artefacts/sights along the silk road
- Reset the map to original view
