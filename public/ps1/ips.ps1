$IPS = Get-NetIPAddress | select interfaceAlias, ipAddress | ConvertTo-Json
$URL = 'http://localhost:8000/windows/ip/'+$HOSTNAME
Invoke-WebRequest -Uri $URL -ContentType 'application/json' -Method POST -Body $IPS