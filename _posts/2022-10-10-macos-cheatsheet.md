---
categories: [cheatsheet]
tags: [macos,cheatsheet]
---


A list of very useful commands for macOS I can never remember!

## Flush DNS cache
```bash
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```
## Check if port is open on a remote server
```bash
nc -vz SERVER PORT
```

## To List all available WIFI networks, Run:
```bash
/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -s
```

## To connect to any of these available networks, run:
```bash
networksetup -setairportnetwork en0 <SSID_OF_NETWORK> <PASSWORD>
```
