$HOSTNAME = $env:COMPUTERNAME
$FIREWALL = Get-NetFirewallProfile | select Name, enabled | ConvertTo-Json
$URL = 'http://localhost:8000/windows/firewall/'+$HOSTNAME
Invoke-WebRequest -Uri $URL -ContentType 'application/json' -Method POST -Body $FIREWALL


