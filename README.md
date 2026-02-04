# XBrace-Calculator

I am a avid follower of [@RRBuilding on YouTube](https://www.youtube.com/@RRBuildings). 
Most of Kyle and Greg's videos are about building modern post and beam buildings
("pole barns").

When constructing larger building, bracing in the form of "x"s are placed in the frame.
Adding the "X braces" requires the angle and length of the lumber to be calculated. The
video below shows how Kyle goes about calculating and installing his "X" braces.
[![X-Brace example](./img/xbrace.png)](https://youtube.com/watch?v=ifftqxVZ_Hk&t=50m37s "Kyle explains how he calculates x brace dimensions")

Here is a diagram of what the geometry looks like:
![X Brace geometry](./html/img/xbrace-diagram.svg "X Brace geometry")

In the video, Kyle approximates the angle "*t*" using a triangle with sides "*w*" and "*h/n*" 
(the acutal angle "t" has sides "w" and "*h<sub>1</sub>*"). The approximate angle "t" allows Kyle to
calculate the value of h2. The value h1 is calculates from "h/n" minus the approximated 
h2. A final value for "t" and the length of the brace, "l" is then calculated.

My curiosity got the best of me and I wanted to see if it was possible to derive the 
dimensions for the x brace ("t" and "l") without using the approximation. I believe I have 
an answer which is [documented here](https://philking98.github.io/XBrace-Calculator/html/themath.html).

I implemented the calculation in [javascript and html](https://philking98.github.io/XBrace-Calculator/html/index.html).

In the example in the video I linked above, the height of the bay ("h") is 222", the width of 
the bay ("w") is 7' 2 1/4", the lumber is 2x6 so the width of the brace ("d") is 5 1/2", and 
2 braces are being constructed. Using Kyle's method, he calculates a brace length ("l") as 
133 5/8" and angle ("t") of 49.80° or pitch of 14 3/16". Using my x brace calculater, I 
get a brace length ("l") of 133 15/16" and an angle ("t") of 49.91° or pitch of 14 1/4".

As Kyle days "the math doesn't lie".
