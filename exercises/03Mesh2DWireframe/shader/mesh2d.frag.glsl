#version 300 es
precision highp float;

// Lab 02, Aufgabe 2
in vec3 v_color;
out vec4 fragColor;
//add uniform vec3s to the frag
uniform vec3 u_color;
uniform vec3 w_color;
in vec2 wireFrame;

void main()
{
	if(wireFrame == true) {
		fragColor = vec4(u_color.rgb, 1.0);
	} else {
		fragColor = vec4

	}
	// Lab 02, Aufgabe 2
	fragColor = vec4(v_color, 1.0);
}