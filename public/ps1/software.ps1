$SOFTWARE = Get-ItemProperty HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*,
                HKLM:\SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\* |
                Where {![String]::IsNullOrWhiteSpace($_.DisplayName)} |
                Sort DisplayName |
                Select DisplayName, Publisher, DisplayVersion, InstallDate -Unique | ConvertTo-Json
$URL = 'http://localhost:8000/windows/software/'+$HOSTNAME
Invoke-WebRequest -Uri $URL -ContentType 'application/json' -Method POST -Body $SOFTWARE