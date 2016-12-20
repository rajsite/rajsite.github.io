---
layout: post
title: Streaming Data With LabVIEW Web Services
---

LabVIEW Web Services can be used for HTTP

Traditionally Server -> Response, repeat

Makes latency high for certain use cases such as streaming live data.

The state of the art is to use WebSockets
Unlike HTTP, Websockets persistent 2-way connection
Labview support is limited
http://forums.ni.com/t5/LabVIEW-Idea-Exchange/Support-for-HTML5-and-SVG-in-Web-Publishing-Tool/idi-p/1437488
http://forums.ni.com/t5/LabVIEW-Idea-Exchange/Remote-Access-to-LabVIEW-using-HTML5/idi-p/1944781

However, community clever. One idea is to send messages before they are even requested
Not too easy with LabVIEW Web Services though http://jacquesmattheij.com/the-several-million-dollar-bug
As mentioned in that post this is the basis of the HTTP/2 Server Push technology

What about keeping the connection open and just keep pushing data?
Called HTTP long polling and various names such as Comet or push
This is standardized as HTTP Server Sent Events

Can totally do this with LabVIEW Web Services! In fact I tried it out a few months ago in a vaguely worded tweet: https://twitter.com/rajsite/status/722840800770396160

The Server Sent Events protocol is really direct, I encourage you to read the spec here: https://html.spec.whatwg.org/multipage/comms.html#server-sent-events

https://gomix.com/community/
