# Map of The Silk Road 
This is a submission for the final project of MUSA 620: Data Wrangling and Data Visualization (Instructor: Max Galka)  
By Dorcas Chang and Ziqin Wang

### [Live Site](https://dorcas25sg.github.io/Silkroad/)

## Web Scraping with R 
Using R, we scraped data from [Yale Silk Road Database](http://digitalcollections.library.yale.edu/YaleSilkRoad/search.dl?q=Search+this+collection&qcx=1034.1&qqid=52950&qs=1), removed duplicates and cleaned data accordingly (e.g. errors in the database, missing information etc).

Since there are could be many records of different sights/artefacts/architecture at each site, their images urls were compiled into an array so that a slide show can be made at each point (where there are more than 1 record at that site).

## Geocoding 
We then batch geocoded the points online (https://www.doogal.co.uk/BatchGeocoding.php). 

Unfortunately, because of the nature of the language and perhaps the obsurity of the sites, there were some points that failed to be geocoded and were removed from our dataset.

The geocoded records were then converted into [Geojson](http://geojson.io)

## Data Visualization 

The data was then vizualized spatially using Javascript. 

The routes were taken from [ArcGIS Online](https://www.arcgis.com/home/item.html?id=6ee51d446e21407b97a3e3ea4b8aeae2). The raw data is a multi-line string shapefile had to be edited into separate line strings for each route. Since the points in the line were not in order of their lat/lon (but rather randomly in space), we had to comb for the first and last point along each route to create animated markers that moved from start to end. We managed to do that by manually drawing the lines using draw and convert graph to feature tools in ArcGIS and then export to geojson. 

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
