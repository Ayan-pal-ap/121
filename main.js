function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  Classifier=ml5.imageClassifier("MobileNet",ModalLoaded);
}
function ModalLoaded(){
  console.log("Model loaded");
}
function draw(){
  image(video,0,0,300,300);
  Classifier.classify(video,gotResult);
}
var previos_results="";
function gotResult(error,result){
  if(error){
    console.error(error);
  }
  else{
    if((result[0].confidence>0.8) && (previos_results!=result[0].label)){
      console.log(result);
     var previos_results=result[0].label;
     var synth=window.speechSynthesis;
     speek_data="object detected is "+result[0].label;
     var utter_this=new SpeechSynthesisUtterance(speek_data);
     synth.speak(utter_this);
     document.getElementById("span1").innerHTML=result[0].label;
     document.getElementById("span2").innerHTML=result[0].confidence.toFixed(2);
    }
  }
}




