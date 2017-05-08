library('RSelenium')

# Launch
remDr <- remoteDriver(browserName="firefox", port=4444)
remDr$open()
geo_data <- data.frame(GEO = character(),namegeo = character(),urlname = character(), stringsAsFactors=FALSE)


  
# Web Scrap 
  for( a in 257:257) {
    b <- 72*(a-1) +1 
    searching <- paste0("http://digitalcollections.library.yale.edu/YaleSilkRoad/search.dl?q=Search+this+collection&qcx=1034.1&qqid=52950&qs=",b)
 

  for(i in 23:24) {
    
    searchforROW <- paste0(".srch_result_tbl > tbody > tr:nth-child(",i,") ")
    
    for(x in 1:3) {
       
      #remDr$navigate("http://digitalcollections.library.yale.edu/YaleSilkRoad/search.dl?q=Search+this+collection&qcx=1034.1&qqid=52950&qs=1")  
      remDr$navigate(searching)  
      
      searchfor <- paste0(searchforROW,"> td:nth-child(",x,") > a:nth-child(7)")
      #print(x
      pic1 <- remDr$findElement("css selector",searchfor)
      pic1$clickElement()
      Sys.sleep(3)
      
      allListItems <- remDr$findElements("tag name","ul")
      #unlist(lapply(allListItems, function(x){x$getElementText()}))
      object_geo <- allListItems[[2]]$getElementText() 
      geo_1 <- as.character(object_geo)
      title <- allListItems[[1]]$getElementText()
      title1 <- as.character(title)
      
      pic2 <- remDr$findElement("css selector","body > div.vcResults > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(1) > td > a > img")
      src <- pic2$getElementAttribute("src")
      src1 <- as.character(src)
      #geo_data[x+3*(i-1),1] <- geo_1
      k <- paste0("SET2",a,"G",i,"G",x)
      geo_data[k,1] <- geo_1
      geo_data[k,2] <- title1
      geo_data[k,3] <- src1
      Sys.sleep(3)
    }
  }
  print(a)
  remDr$navigate(searching) 
  Sys.sleep(3)
  }


# result<-rbind(r1, r2, r3, r4, r5)     # if data set was split e.g. 2 computers scraping seperately, and need to be joined

# Remove duplicates and write csv
newr <- result[!duplicated(result$namegeo), ] 
write.csv(result, file="C:/Users/Dorcas Chang/Downloads/Data Wrangling/big.csv")
  
                         