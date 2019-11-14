let capture
let tracker

// --- 
let xspacing = 16; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 180.0; // Start angle at 0
let amplitude = 30.0; // Height of wave
let period = 200.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave
let old_x = 0;
let old_y = 0;
let X = 0;
let Y = 0;
let start_x;
let start_y;
let a = 0;
//---  

function setup() {

    createCanvas(800, 800)
    print('VErsion: 1');

    // start capturing video
    capture = createCapture(VIDEO)
    capture.size(800, 600)
    capture.hide()

    // create the tracker
    tracker = new clm.tracker()
    tracker.init()
    tracker.start(capture.elt)    

    // -- 
    w = width + 16;
    dx = (TWO_PI / period) * xspacing;
    yvalues = new Array(floor(w / xspacing));
    start_x = height / 2;
    start_y = 200;

}

function calcWave() {
    // Increment theta (try different values for
    // 'angular velocity' here)
    theta -= 0.08;

    // For every x value, calculate a y value with sine function
    let x = theta;
    for (let i = 0; i < yvalues.length; i++) {
        yvalues[i] = sin(x) * amplitude;
        x += dx;
    }
}

function renderWave(a, color) {
    push();
    stroke(color);
    strokeWeight(30);
    old_x = start_y + 0 * xspacing;
    old_y = start_x + a + yvalues[0];
    // A simple way to draw the wave with an ellipse at each location
    for (let x = 0; x < yvalues.length; x++) {
        // ellipse(x * xspacing, height / 2 + yvalues[x], 16, 16);
        Y = start_x + a + yvalues[x];
        X = start_y + x * xspacing;
        line(old_y, old_x, Y, X);
        old_x = X;
        old_y = Y;
    }
    pop();
}


function draw() {    

    background(0)
    
    // show the video feed
    image(capture, 0, 0, capture.width, capture.height)

    // get data from tracker
    let positions = tracker.getCurrentPosition()

    // make sure we have data to work with
    if (positions.length > 0) {

        stroke(255)
        fill(255)

        // draw the data
        let i = 0
        while (i < positions.length - 1) {
            ellipse(positions[i][0], positions[i][1], 4, 4)
            text(i, positions[i][0], positions[i][1])
            line(positions[i][0], positions[i][1], positions[i+1][0], positions[i+1][1])

            i += 1
        }
    }
    // let noseX = positions[62][0]
    // let l_lip_x = positions[44][0];
    // let l_lip_y = positions[44][1];

    // let r_lip_x = positions[50][0] - 5;
    // let r_lip_y = positions[50][1];

    // let u_lip_x = positions[60][0];
    // let u_lip_y = positions[60][1];

    // let d_lip_x = positions[57][0];
    // let d_lip_y = positions[57][1];
    // //l m 44
    // //r m 50 - 5
    // //u t 60
    // //d 57 
    // if(dist(u_lip_x, u_lip_y, d_lip_x, d_lip_y) > 20) {
    //     calcWave();
    //     renderWave(0, 'red'); //red
    //     renderWave(30, 'orange'); //orange
    //     renderWave(60, 'yellow'); //yellow
    //     renderWave(90, 'green'); //green
    //     renderWave(120, 'lightblue'); //light_blue
    //     renderWave(150, 'blue'); //blue
    //     renderWave(180, 'purple'); //purple
    // }  
}

