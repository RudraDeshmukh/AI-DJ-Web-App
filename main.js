song="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scorerightwrist=0;
scoreleftwrist=0;

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
    fill("#FF0000")
    stroke("FF0000")
    if(scoreleftwrist > 0.2){
        circle(leftwristx,leftwristy,20)
        Innumber=Number(leftwristy)
        remove_decimal=floor(Innumber)
        volume=remove_decimal/500
        song.setVolume(volume);
        document.getElementById("volume").innerHTML="volume = "+ volume;
    }
    if(scorerightwrist > 0.2){
        circle(rightwristx,rightwristy,20)
        if(rightwristy > 0 && rightwristy <= 100){
            song.rate(0.5);
            document.getElementById("speed").innerHTML="speed = 0.5";
        }
        if(rightwristy > 100 && rightwristy <= 200){
            song.rate(1);
            document.getElementById("speed").innerHTML="speed = 1";
        }
        if(rightwristy > 200 && rightwristy <= 300){
            song.rate(1.5);
            document.getElementById("speed").innerHTML="speed = 1.5";
        }
        if(rightwristy > 300 && rightwristy <= 400){
            song.rate(2);
            document.getElementById("speed").innerHTML="speed = 2";
        }
        if(rightwristy > 400 && rightwristy <= 500){
            song.rate(2.5);
            document.getElementById("speed").innerHTML="speed = 2.5";
        }
}
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

        scoreleftwrist=results[0].pose.keypoints[9].score
        scorerightwrist=results[0].pose.keypoints[10].score
    }

}