![](https://raw.githubusercontent.com/williamniemiec/puzzle5star-app/master/docs/images/logo/logo.jpg)

<h1 align='center'>puzzle5star-app</h1>
<p align='center'>Five pointed star puzzle.</p>
<p align="center">
	<a href="https://github.com/williamniemiec/puzzle5star-app/actions/workflows/windows.yml"><img src="https://github.com/williamniemiec/puzzle5star-app/actions/workflows/windows.yml/badge.svg" alt=""></a>
	<a href="https://github.com/williamniemiec/puzzle5star-app/actions/workflows/macos.yml"><img src="https://github.com/williamniemiec/puzzle5star-app/actions/workflows/macos.yml/badge.svg" alt=""></a>
	<a href="https://github.com/williamniemiec/puzzle5star-app/actions/workflows/ubuntu.yml"><img src="https://github.com/williamniemiec/puzzle5star-app/actions/workflows/ubuntu.yml/badge.svg" alt=""></a>
	<a href="http://node.dev"><img src="https://img.shields.io/badge/NodeJS-15+-D0008F.svg" alt="NodeJS compatibility"></a>
    <a href="https://ionicframework.com"><img src="https://img.shields.io/badge/Ionic-5-D0008F.svg" alt="Ionic compatibility"></a>
	<a href="https://github.com/williamniemiec/puzzle5star-app/releases"><img src="https://img.shields.io/github/v/release/williamniemiec/puzzle5star-app" alt="Release"></a>
	<a href="https://github.com/williamniemiec/puzzle5star-app/blob/master/LICENSE"><img src="https://img.shields.io/github/license/williamniemiec/puzzle5star-app" alt="License"></a>
</p>

<div height=100 align='center'>
  <a href='https://play.google.com/store/apps/details?id=wniemiec.app.puzzle5star'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' width=200 align='center' /></a>
    <a href='https://wniemiec-web-puzzle5star.herokuapp.com/'><img alt='Deploy' src='https://www.herokucdn.com/deploy/button.svg' width=200 align='center' /></a>
  
</div>

<hr />

## ❇ Introduction
Puzzle is a genre of video game or some video games that focuses on solving puzzles. The types of puzzles to be solved can test different skills of the player, such as logic, strategy, pattern recognition, solving sequences and having to complete words. In this work, an application will be made whose objective is to teach how to play the five pointed star puzzle.

In this puzzle, there is a five-pointed star with 10 points that are formed by the encounters and intersections of line segments. Five pointed star puzzle consists of, from a starting point freely chosen among the 10 available, to mark another point distant from this point in a straight line (both points must not be marked yet). The objective is to mark as many points as possible (which are 9). It is worth mentioning that the waypoint is independent of marking. This is a problem that is not comprehensively available on the internet, and this is the main motivation of this work.

At last, puzzle5star is an application built with Ionic Framework along with Angular. You can interact with the project through the Heroku platform ([click here to access](https://wniemiec-web-puzzle5star.herokuapp.com/)).

## Acknowledgements
Special thanks to [Renan Magagnin](https://github.com/renanmagagnin) for developing the solver.


## ⚠ Warnings
The hosting service Heroku may have a certain delay (~ 1 min) for uploading the application so the loading of the website may have a certain delay. 

## ✔ Requiremens
- [NodeJS](https://nodejs.dev);
- [Cordova](https://cordova.apache.org);
- [Ionic Framework](https://ionicframework.com);

## ℹ How to run

Type in your terminal:

1. npm install

2. sudo ionic serve

## 🖼 Gallery

<div style="display: flex; flex-direction: row; justify-content: center; align-items: center; flex-wrap: wrap">

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/puzzle5star-app/master/docs/images/screens/screen1.png" alt="image 1" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/puzzle5star-app/master/docs/images/screens/screen2.png" alt="image 2" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/puzzle5star-app/master/docs/images/screens/screen3.png" alt="image 3" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/puzzle5star-app/master/docs/images/screens/screen4.png" alt="image 4" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/puzzle5star-app/master/docs/images/screens/screen5.png" alt="image 5" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/puzzle5star-app/master/docs/images/screens/screen6.png" alt="image 6" />

<img height=400 src="https://raw.githubusercontent.com/williamniemiec/puzzle5star-app/master/docs/images/screens/screen7.png" alt="image 7" />

</div>

## 🚩 Changelog
Details about each version are documented in the [releases section](https://github.com/williamniemiec/puzzle5star-app/releases).

## 🗺 Project structure
![architecture](https://raw.githubusercontent.com/williamniemiec/puzzle5star-app/master/docs/images/design/architecture.jpg)

## 📁 Files

### /
|        Name        |Type|Description|
|----------------|-------------------------------|-----------------------------|
|docs|`Directory`|Documentation files|
|resources|`Directory`|When building the app for different platforms (like iOS or android), this folder will be automatically generated with the app resources like the logo and the splash screen image|
|src|`Directory`|Application and test files|

### /src
|        Name        |Type|Description|
|----------------|-------------------------------|-----------------------------|
|app|`Directory`|Has all the components, modules, pages, services and styles needed for building the application|
|assets|`Directory`|Application static files|
|environments|`Directory`|Configuration files used by the Angular CLI to manage the different environment variables|
|theme|`Directory`|It includes all the theming, variables and sass mixins to be used in the application|
|global.scss|`File`|Style used by multiple pages|
|index.html|`File`|Application point entry|
|main.ts|`File`|Application point entry|
|test.ts|`File`|Test file|
|zone-flag.ts|`File`|Prevents Angular change detection from running with certain Web Component callbacks|

### /src/app
|        Name        |Type|Description|
|----------------|-------------------------------|-----------------------------|
|config|`Directory`|Configuration classes|
|models|`Directory`|Application model classes, including domain classes|
|pages|`Directory`|Application pages|
|services|`Directory`|Classes responsible for providing data from APIs and utility services|
|app-routing.module.ts|`File`|Application page routes|
|app.component.html|`File`|Application main HTML|
|app.component.ts|`File`|Application main component|
|app.module.ts|`File`|Context of application main component|
