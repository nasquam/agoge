$MACS = Get-CimInstance win32_networkadapterconfiguration | select description, macAddress | Where {$_.MACAddress -notlike ""} | ConvertTo-Json
$URL = 'http://localhost:8000/windows/mac/'+$HOSTNAME
Invoke-WebRequest -Uri $URL -ContentType 'application/json' -Method POST -Body $MACS