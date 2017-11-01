/* Arduino Tutorial - Watel Level Sensor 40mm
   More info: */

const int read = A0; //Sensor AO pin to Arduino pin A0
int waterLevel;     		 //Variable to store the incomming data

void setup()
{
	//Begin serial communication
	Serial.begin(9600);
	
}

void loop()
{
	waterLevel = analogRead(read); //Read data from analog pin and store it to waterLevel variable
	
	if (waterLevel<=480){ 
		Serial.println("Water level: 0mm - Empty!"); 
	}
	else if (waterLevel>480 && waterLevel<=530){ 
		Serial.println("Water level: 0mm to 5mm"); 
	}
	else if (waterLevel>530 && waterLevel<=615){ 
		Serial.println("Water level: 5mm to 10mm"); 
	}
	else if (waterLevel>615 && waterLevel<=660){ 
		Serial.println("Water level: 10mm to 15mm"); 
	}	
	else if (waterLevel>660 && waterLevel<=680){ 
		Serial.println("Water level: 15mm to 20mm"); 
	}
	else if (waterLevel>680 && waterLevel<=690){ 
		Serial.println("Water level: 20mm to 25mm"); 
	}
	else if (waterLevel>690 && waterLevel<=700){ 
		Serial.println("Water level: 25mm to 30mm"); 
	}
	else if (waterLevel>700 && waterLevel<=705){ 
		Serial.println("Water level: 30mm to 35mm"); 
	}
	else if (waterLevel>705){ 
		Serial.println("Water level: 35mm to 40mm"); 
	}
	
	delay(5000); // Check for new waterLevel every 5 sec
}
