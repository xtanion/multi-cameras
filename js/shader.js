function fragmentShader() {
    return `
	// #version 500 es
	// out vec4 fragColor;
	// in vec4 gl_FragCoord;

	precision highp float;

	//uniforms
	uniform vec2 iResolution;
	uniform float iTime;
	uniform float iTimeDelta;

	uniform vec3 camPos;

	void main(){
		gl_FragColor = vec4(sin(camPos)*0.5 + 0.5, 1.0);
	}

`;
}
export { fragmentShader };
