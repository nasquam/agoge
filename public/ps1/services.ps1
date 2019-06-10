$SERVICES = Get-Service | select DisplayName, Status | sort DisplayName | ConvertTo-Json
$URL = 'http://localhost:8000/windows/admin/'+$HOSTNAME
Invoke-WebRequest -Uri $URL -ContentType 'application/json' -Method POST -Body $SERVICES