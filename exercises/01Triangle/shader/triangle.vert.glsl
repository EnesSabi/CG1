#version 300 es
layout (location = 0) in vec4 inVertex;

void main() 
{
  gl_Position = inVertex;
}