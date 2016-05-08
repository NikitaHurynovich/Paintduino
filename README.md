# Paintduino
Painting app on arduino Uno + TFT Touch LED display 320x480 with connecting through Serialport to node.js server and React front-end.

# Hardware:

1) Arduino Uno (can be analogs).

2) TFT Touch LED display 320x480 (can be analogs).

# Arduino software side:

Libs ( Arduino/lib ):

1) Adafruit-GFX-Library.

2) MCUFRIEND_kbv.

3) TFTLCD.

4) Touch-Screen-Library


Sketch:

Arduino/paintduino.ino

# PC software side:

1) Node.js  v5.x.x

2) Webpack

# Start application:

Frontend side:

$ cd frontend/

$ npm i

$ npm run deploy/npm run dev(for hot server on localhost:5000)

Server side:

$ cd api/

$ npm i

$ node server

Enjoy!






