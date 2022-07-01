song="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelloaded);
    poseNet.on('pose',gotposes)
}

function modelloaded(){
    console.log("poseNet is initialized")
}

function draw(){
    image(video,0,0,600,500);
}

function play_song(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotposes(results){
    if(results.length > 0){
        console.log(results)
        leftwristx = results[0].pose.leftWrist.x
        leftwristy = results[0].pose.leftWrist.y
        rightwristx = results[0].pose.rightWrist.x
        rightwristy = results[0].pose.rightWrist.y

        console.log("left wrist x =" + leftwristx + " left wrist y = " + leftwristy)
        console.log("right wrist x =" + rightwristx + " right wrist y = " + rightwristy)
    }

}