#version 300 es
precision highp float;

layout(location = 0) in vec3 a_position;

// Lab 02, Aufgabe 2
layout(location = 1) 
in vec3 inColor;
out vec3 v_color;
// Lab 02, Aufgabe 3(b)

void main()
{
    // Lab 02, Aufgabe 3(b)
    gl_Position = vec4(a_position.xy, 1.0f, 1.0f);
    // Lab 02, Aufgabe 2
    v_color = (inColor.xyz);
    
}