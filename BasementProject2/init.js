load('api_timer.js');
load('api_mqtt.js');
load('api_gpio.js');
load("api_adc.js");
load("api_dht.js");

//startFn();

// Digital Read Pin D2
let pin = 4;
let topic = '/flood/';
let analogPin = 0;

//GPIO.set_mode(4, GPIO.MODE_INPUT);
let abc=99;
let waterLevel =99;

Timer.set(1000,true,function()
{
  //abc = GPIO.read(pin); 
  waterLevel = ADC.read(analogPin);
  let dht = DHT.create(pin, DHT.DHT11);
  let celsius = dht.getTemp();
  let humidity = dht.getHumidity();
  let farenheit = celsius * 9/5 + 32;
  let farenheitRnd = Math.round(farenheit * 10)/10;
  //let f3 = f2.toString();
  
  print('Temperature:', farenheit);
  print(farenheitRnd);
  print('Humidity:', humidity);
  print(waterLevel);
  
  let waterLevel2 = 0;
  if (waterLevel > 10)
  {
    waterLevel2 = waterLevel;
  }
  
  let message = JSON.stringify({
    fahrenheit : farenheitRnd,
	  celsius : celsius,
	  humidity : dht.getHumidity(),
	  waterlevel: waterLevel2
  });
  let ok = MQTT.pub(topic, message, 1);
  print('Published:', ok ? 'yes' : 'no', 'topic:', topic, 'message:', message);
  
},null);

// Monitor network connectivity.
Net.setStatusEventHandler(function(ev, arg) {
 let evs = '???';
 if (ev === Net.STATUS_DISCONNECTED) {
   evs = 'DISCONNECTED';
 } else if (ev === Net.STATUS_CONNECTING) {
   evs = 'CONNECTING';
 } else if (ev === Net.STATUS_CONNECTED) {
   evs = 'CONNECTED';
 } else if (ev === Net.STATUS_GOT_IP) {
   evs = 'GOT_IP';
 }
 print('== Net event:', ev, evs);
}, null);


