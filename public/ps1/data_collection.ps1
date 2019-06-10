$HOSTNAME = $env:COMPUTERNAME

$SOFTWARE = Get-ItemProperty HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*,
                HKLM:\SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\* |
                Where {![String]::IsNullOrWhiteSpace($_.DisplayName)} |
                Sort DisplayName |
                Select displayName, publisher, displayVersion, installDate -Unique | ConvertTo-Json

#$IPS = Get-NetIPAddress | select interfaceAlias, ipAddress
 
#$MACS = Get-CimInstance win32_networkadapterconfiguration | select description, macaddress | Where {$_.MACAddress -notlike ""} 

#$SRVC = Get-Service | select DisplayName, Status | sort DisplayName

#$CONN = Get-NetTCPConnection -State Established -AppliedSetting Internet | select OwningProcess, LocalAddress, LocalPort, RemoteAddress, RemotePort 

#$PROCESS = get-process | select Id, ProcessName 

#$ADMINS = Get-LocalGroupMember Administrators | select Name 

#$FIREWALL = Get-NetFirewallProfile | select Name, Enabled

$URL = 'http://localhost:8000/windows/software/'+$HOSTNAME

$JSON = [PSCustomObject]@{
    'hostname' = $hostname
    'admins' = $ADMIN
    'software' = $SOFTWARE
    'ips' = $IPS
    'macs' = $MACS
    'services' = $SRVC

} | ConvertTo-Json

Invoke-WebRequest -Uri $URL -ContentType 'application/json' -Method POST -Body $SOFTWARE