---
presentation:
  enableSpeakerNotes: true
  transition: zoom
  controls: false
---

<!-- slide data-notes:"- There has been a lot of talk lately about Internet-of-Things \n- like all good buzzwords we need a 3 letter acronym; IoT\n- IoT generally references home automation.\n- let me show you what I did." -->
<h1 style="color: #275d38">Internet-of-Things</h1>
<h3 style="color: #275d38">IoT</h3>
<h3 style="color: #275d38">Home Automation</h3>

<!-- slide data-background-video:"/docs/assets/20170419_202922.mp4" data-notes:"- Notice that the longest part of user setup is plugging the device in\n- The problem I am trying to solve is simple..." -->

<!-- slide data-notes:"- control devices from anywhere\n- I realize that there are plenty of out-of-the-box solutions..." -->
<h2 style="color: #275d38">The Problem</h2>
![Physical_Layout](/docs/assets/Problem.png)


<!-- slide data-notes:"- TALK NICE FIRST\n- but they did not meet my goals" -->
<h2 style="color: #275d38">Existing Solutions</h2>
<ul>
  <li class="fragment fade-up">Homekit</li>
  <li class="fragment fade-up">Philips Hue</li>
  <li class="fragment fade-up">Z-Wave</li>
  <!-- <li class="fragment fade-up">Temporary Access Point</li> -->
</ul>

<!-- slide data-notes:"- (I wanted it to be extensible, I did not want to be locked-in, this could make a system limitless)\n- We have seen the (admittedly) rough implmentation already, but let me show you the part that I am most proud of. -- the part that makes what I built beautiful" -->
<h2 style="color: #275d38">Goals</h2>
<ul>
  <li class="fragment fade-up">Cheaper</li>
  <li class="fragment fade-up">Secure</li>
  <li class="fragment fade-up">Easier</li>
  <li class="fragment fade-up">Total control</li>
  <!-- <li class="fragment fade-up">Limitless</li> -->
  <li class="fragment fade-up">Extensible</li>
</ul>

<!-- slide data-notes:"- The specific hardware that I used to implement the system" -->
<h2 style="color: #275d38">Physical Layout</h2>
![Physical_Layout](/docs/assets/Physical_Layout.png)

<!-- slide data-notes:"- DHT11 is a temperature/humidity sensor\n- logically the setup is a bit different" -->
<h2 style="color: #275d38">Physical Specifics</h2>
![Physical Specifics](/docs/assets/Physical_Specifics.png)

<!-- slide data-notes:"- explain that the server is running three different servers that could be hosted on different machines\n- I am very proud of the end result, but I learned quite a few things before getting to this point" -->
<h2 style="color: #275d38">Logical View</h2>
![Logical View](/docs/assets/logical_view.png)

<!-- slide data-notes:"- One of my goals was to have an extensible design, and I think I achieved this. here are some of my plans for the platform" -->
<h2 style="color: #275d38">Lessons Learned</h2>
<ul>
<li class="fragment fade-up">Need more man power</li>
<li class="fragment fade-up">Adding features while the data model is still in flux is bad</li>
<li class="fragment fade-up">Scope creep is real even without clients</li>
<li class="fragment fade-up">The balance of time spent planning and implementing is delicate</li>
<li class="fragment fade-up">Frameworks are fantastic, but they have bugs too</li>
<li class="fragment fade-up">Front end web development is as complex as the back end</li>
</ul>

<!-- slide data-notes:"show me the code" -->
<h2 style="color: #275d38">Future Plans/Possibilities</h2>
<ul>
<li class="fragment fade-up">External API data</li>
<li class="fragment fade-up">Time series data</li>
<li class="fragment fade-up">True constraints for triggers</li>
<li class="fragment fade-up">Better user interface</li>
<li class="fragment fade-up">Artificial Intelligence</li>
<li class="fragment fade-up">IaaS and SaaS</li>
<li class="fragment fade-up">Better physical devices (fewer fire hazards)</li>
<li class="fragment fade-up">More types of device</li>
</ul>

<!-- slide -->
[https://github.com/handsofblue67/home-js](https://github.com/handsofblue67/home-js)
