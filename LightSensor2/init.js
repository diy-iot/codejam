load('api_config.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_net.js');
load('api_sys.js');
load('api_timer.js');
load("api_adc.js");

let analogPin = 0;
let relayPin = 4;
let led = Cfg.get('pins.led');
let button = Cfg.get('pins.button');
let topic = '/light/lamp/';
//let activationTopic = '/light/lamp/active/';
let activationTopic = '/light/lamp/active/';
let lightLevel = -99;

print('LED GPIO:', led, 'button GPIO:', button);

let getInfo = function() {
  return JSON.stringify({
    total_ram: Sys.total_ram(),
    free_ram: Sys.free_ram()
  });
};

// Blink built-in LED every second
Timer.set(1000 /* 1 sec */, true /* repeat */, function() {
  //let value = GPIO.toggle(led);
  GPIO.set_mode(4, GPIO.MODE_OUTPUT);
  let lightLevel = ADC.read(analogPin);
//  print(value ? 'Tick' : 'Tock', 'uptime:', Sys.uptime(), getInfo());
  //print("Checking Light");
  //print("Light Level", lightLevel);
    // LED gets brighter the darker it is at the sensor
  // that means we have to -invert- the reading from 0-1023 back to 1023-0
  let photocellReading = 1023 - lightLevel;
  //now we have to map 0-1023 to 0-255 since thats the range analogWrite uses
  //print("PhotocellReading", photocellReading);
  if(photocellReading < 100)
  {
    print("Turning On Light");
    GPIO.write(relayPin, 1);
    let message = JSON.stringify(
     {
       on : true
     });   
    let ok = MQTT.pub(topic, message, 1);
    print('Published:', ok, topic, message);
  }else{
    //print("Turning Off Light");
    GPIO.write(relayPin, 0);
    let message = JSON.stringify(
     {
       on : false
     });   
    let ok = MQTT.pub(topic, message, 1);    
  }
  
  //else if(lightLevel > 800){
  //  print("Turning Off Light");
  //  GPIO.write(relayPin, 0);
  //}
  
  //print("Done Checking Light");
}, null);

MQTT.sub(activationTopic, function(conn, activationTopic, msg) {
    print('Topic:', activationTopic, 'message:', msg);  
}, null);


