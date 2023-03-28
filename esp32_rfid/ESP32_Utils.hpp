void ConnectWiFi_STA(bool useStaticIP = false)
{
Serial.println("");
WiFi.mode(WIFI_STA);
WiFi.begin(ssid, password);
if(useStaticIP) WiFi.config(ip, gateway, subnet);
while (WiFi.status()!= WL_CONNECTED)
{
  delay(100);
  Serial.print('.');
}
Serial.print("");
Serial.print("Iniciando STA:\t");
Serial.print(ssid);
Serial.print("IP addres: \t");
Serial.print(WiFi.localIP());

}