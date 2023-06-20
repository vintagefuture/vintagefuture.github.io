---
layout: post
title: How to connect to your Raspberry Pi using the serial port
date: 2023-06-14 20:19
categories: [tech]
tags: [raspberrypi]
author: vintagefuture
---

# pi-serial-connection

I recently discovered a very cool method to connect to my Pis, that doesn't require the complications of SSH: **serial connection**.

In its simplest form, you connect **GROUND RXD0 TXD0** pins as follows:

![](/assets/img/pi2-pinout.jpg)

On a Linux terminal, make sure you have `screen` installed, then run:

```
sudo screen /dev/ttyUSB0 115200
```

where /dev/ttyUSB0 is the particular device I'm using, a FT232RL USB to TTL Serial Interface Adapter:


![](/assets/img/FT232RL-diagram.jpg)

![](/assets/img/FT232RL.jpg)
