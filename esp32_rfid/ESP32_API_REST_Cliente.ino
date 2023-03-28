#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

//Añadir librerías
#include <SPI.h>
#include <MFRC522.h>

#include "config.h"
#include "API.hpp"
#include "ESP32_Utils.hpp"

//Declaración de los pines que se usarán en la comunicación SPI.
const int RST_pin = 22;  //Pin para resetear el módulo
const int SS_pin = 5;    //Pin de selección del módulo/esclavo. También llamado SDA.
//Creación del objeto mfrc522
MFRC522 mfrc522(SS_pin, RST_pin);

void setup() {

  Serial.begin(115200);

  ConnectWiFi_STA();

  // GetAll();
  // GetItem(1);
  // GetQuery("ABC");
  // Create("New character");
  // ReplaceById(2, "New character");
  // UpdateById(3, "New character");
  // DeleteById(5);


  SPI.begin();         //Inicia comunicación por SPI
  mfrc522.PCD_Init();  //Inicia el módulo MFRC522 con el nombre de objeto declarado anteriormente

  Serial.println("Dispositivo iniciado , Listo para emparejar!");
}

void loop() {
  String RFIDvalue = "";

  if (mfrc522.PICC_IsNewCardPresent()) {
    if (mfrc522.PICC_ReadCardSerial()) {
      Serial.print("UID: ");
      for (byte i = 0; i < mfrc522.uid.size; i++) {
        RFIDvalue += String(mfrc522.uid.uidByte[i], HEX);
      }
      Serial.print(RFIDvalue);
      Create(RFIDvalue);
      Serial.println();      //Imprime un salto de línea.
      mfrc522.PICC_HaltA();  //Resetea el módulo para estar disponible a nuevas lecturas.
    }
  }

  delay(250);
}