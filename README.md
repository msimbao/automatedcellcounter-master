# ICY Cell Counter

Automated Cell Counter to count cells in yeast corn mash and clear cultures at biorefineries. Project was designed to be used at a cell counting station and could pickout yeast cells from corn debris in sample microscope images.

![Cell Counter Station](https://github.com/msimbao/icycellcounter/blob/master/images/cellcounterstation.jpg)

![Test Input](https://github.com/msimbao/icycellcounter/blob/master/images/final.png)

![Test Output](https://github.com/msimbao/icycellcounter/blob/master/images/final%20with%20live%20dead.png)

## Description

The ICY Cell counter was a program made for the Green Plains Innovation Center at York to allow the lab to perform adaptive autoamted cell counts quickly using a digital microscope camera instead of manually which takes a lot of time.

The algorith is adaptive because it is able to get consistent results regardless of slight differences in microscope lighting and focus or sample preparation due to differences in operation between the people performing the counts and is able to actively distinguish between debris and yeast cells.

The automated system could count cells up to 2x faster and had a precision close to 94% in non-zero hour fermentation cultures which was an improvement on the current best cell counter in industry (Cellometer) that only has around an 85% precision for yeast corn mash samples since it fails to accurately differentiate between corn mash and yeast cells whereas our method can.

The system uses an inhouse algorithm designed for segmentation via color and morphology. 

## Accuracy Testing

| Total Accuracy | Viability | Accuracy |
| --- | --- | --- |
| | 92.23	| 96.15 |
| | 94.16 |	94.01 |
| | 99.11 |	94.53 |
| | 95.33 |	89.07 |
| | 91.94 |	93.71 |
| | 93.4 | 89.13 |
| Mean | 94.3616666666667 |	92.7666666666667 |
| Standard Deviation | 2.64038949147006 | 2.96252369892063 |

## Algorithm Summary 

![Algorithm Summary](https://github.com/msimbao/icycellcounter/blob/master/images/Cell%20Counting%20Algorithm%20Summary.jpg)

## To Use

Project is currently live at [This site](https://msimbao.github.io/icycellcounter/)

The project needs a usb microscope camera to run like the HDCE-X5 camera otherwise it will simply use the most readily available webcam

### Features

* Manual Cell Counting using keyboard controls
* Automated cell counting using opencv and kmeans clustering
* Image Capture
* Data Collection to determine morphology of cellular objects in camera feed

## License

This project is licensed under the MIT License

##Acknolwedgments

* Peter Drake - Supervisor
