# ICY Cell Counter

Automated Cell Counter to count cells in yeast corn mash and clear cultures at biorefineries. Project was designed to be used at a cell counting station and could pickout yeast cells from corn debris in sample microscope images.

![Cell Counter Station](https://github.com/msimbao/icycellcounter/blob/master/images/cellcounterstation.jpg)

![Test Input](https://github.com/msimbao/icycellcounter/blob/master/images/final.png)

![Test Output](https://github.com/msimbao/icycellcounter/blob/master/images/final%20with%20live%20dead.png)

## Description

The ICY Cell counter was a program made for the Green Plains Innovation Center at York to allow the lab to perform cell counts quickly using a digital microscope camera instead of manually which takes a lot of time. The automated system could count cells up to 2x faster and had a precision close to 95% in non-zero hour fermentation cultures which was an improvement on the current best cell counter in industry (Cellometer) that only has around an 85% precision for yeast corn mash samples since it fails to accurately select between corn mash and yeast cells.

The system uses an inhouse algorithm designed for k-means cell segmentation via color and morphology. 

## To Use

Project is currently live at [This site](https://msimbao.github.io/icycellcounter/)

The project needs a usb microscope camera to run like the HDCE-X5 camera otherwise it will simply use the most readily available webcam

### Features

* Manual Cell Counting using keyboard controls
* Automated cell counting using opencv and kmeans clustering
* Image Capture
* Data Collection to determine morphology of cellular objects in camera feed

* 0.2
    * Optimized kmeans for morphology and color
    * Added capture function
    * Improved UI
* 0.1
    * Initial Release

## License

This project is licensed under the MIT License

##Acknolwedgments

* Peter Drake - Supervisor
