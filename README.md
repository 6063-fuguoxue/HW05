# HW05 Notes

This week's homework is to do a data visualization of a dataset. 

## Ideation
The dataset I chose is ["2018 Central Park Squirrel Census - Squirrel Data"](https://data.cityofnewyork.us/Environment/2018-Central-Park-Squirrel-Census-Squirrel-Data/vfnx-vebw) from NYC Open Data. It would be interesting to create a map using data visualization, so I browsed through Open Data on AWS, Kaggle, and NYC Open Data to see if there are datasets containing longitude and latitude information. Then, I found this squirrel-themed dataset attracted my attention because I like animals. 

There are many columns in the CSV file, including longitude, latitude, squirrel fur color, number of squirrels at the spot, and so on. Therefore, I planned to turn my canvas into a Central Park map that showcases the squirrel data. 

The parameters I chose in this dataset include longitude('X'), latitude('Y'), date('Date'), fur color('Primary Fur Color'), and number of squirrels('Hectare Squirrel Number'). In total, 3023 rows of records are visualized. This visualization assumes that each squirrel is not repeatedly recorded in one day. 

## Implementation
To start with, I drew circles on each 
