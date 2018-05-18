# FurnituAR ![](http://progressed.io/bar/100?title=progress)    

A mobile app that can empower users to “foresee” how furniture looks in their home utilizing Augmented Reality technology. It is available on App Store.

## Getting Started

### Prerequisites


An ARKit supported iPhone (iPhone 6s or newer)

or

An ARCore supported Android phone: [list](https://developers.google.com/ar/discover/) 


### Installing

```
Easiest way: Search FurnituAR on iOS App Store
```
Please press the 'Profile Icon' of each furniture store to get into the AR scenes.

Or

```
1.Check out the project from the terminal: git clone http://gitlab.nectar.auckland.ac.nz/the-cold-cobras/miftybox.git
2.Make sure you have node and npm|yarn installed. 
3.From the terminal, navigate to the project and run npm install or yarn install if using yarn to install the node modules.
4.Download the Viro Testbed app from App Store or Google Play. We used Viro React as a wrapper for ARKit and ARCore.
5.In the project root directory, run 'npm start' to start the package server.
6.Find your ngrok url (https://xxxxxx.ngrok.io) which is printed at the top of the terminal window where you ran npm start.
7.In the Viro Testbed App, tap on the menu icon in the top left and tap on "Enter Testbed". Enter the ngrok url into the empty text field on the Testbed screen (xxxxxx.ngrok.io) and press "Go".
```

Or

```
Use Xcode or Android Studio (What we did)
Please follow those (quite a lot) steps for 
```
[Xcode](https://docs.viromedia.com/docs/starting-a-new-viro-project-1) or
[Android Studio](https://docs.viromedia.com/docs/installing-viro-android)

Note: Since we don't have an Android device, we only tested the app using Android simulator.

## Running the tests
npm test

**Troubleshooting**
- rm package-lock.json
- npm install
- npm test



