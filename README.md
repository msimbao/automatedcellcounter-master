# ICY Cell Counter

Automated Cell Counter to count cells in yeast corn mash and clear cultures at biorefineries.

## Description

The ICY Cell counter was a program made for the Green Plains Innovation Center at York to allow the lab to perform cell counts quickly using a digital microscope camera instead of manually which takes a lot of time. The automated system could count cells up to 2x faster and had a precision close to 95% in non-zero hour fermentation cultures.
The system uses an inhouse algorithm designed for k-means cell segmentation via color and morphology. 

## To Use

Project is currently live at [This site](https://msimbao.github.io/icycellcounter/)

The project needs a usb microscope camera to run like the HDCE-X5 camera otherwise it will simply use the most readily available webcam

### Features

* Manual Cell Counting using keyboard controls
* Automated cell counting using opencv and kmeans clustering
* Image Capture
* Data Collection to determine morphology of cellular objects in camera feed

### Algorithm


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
