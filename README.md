# Manoj Simulator

A simulator for Manoj Nathwani's big LED display he intends to bring to EMF.

## Usage

Install the package using npm.

```
npm install manoj-simulator
```

Run the application in your shell.

```
manoj-simulator
```

You can then use the API described below to print to the screen.

## API

The idea is that once the actual display is built, you'll be able to interact with it using the same API, so if you build things against this simulator now, you should just be able to swap out hostname and port and control the actual display with your same programs.

* `GET '/'`
  * Provides the configuration of the display (x and y length) in JSON format
* `POST '/'`
  * Takes a body of ascii triplets, converts each character to 8 bit integers, and streams it to the display the image. The length of the body should be a multiple of three, and length/3 of the body should be equal to the area of the display in pixels.

