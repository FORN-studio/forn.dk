<script>
    import { onMount, onDestroy } from 'svelte';
    
    let canvas;
    let gl;
    let program;
    let animationId;
    let startTime = Date.now();
    
    let gridSize = 500;
    let seed = $state(764);
    let speed = $state(3.2);
    let threshold = $state(0.99);
    let scale = $state(3.0);
    
    // Reset time when seed changes for consistent starting position
    $effect(() => {
        if (seed) startTime = Date.now();
    })
    
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;
    
    const fragmentShaderSource = `
      precision highp float;
      
      uniform float u_time;
      uniform float u_seed;
      uniform float u_speed;
      uniform float u_threshold;
      uniform float u_scale;
      uniform vec2 u_resolution;
      
      // Simplex 2D noise
      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  
      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }
      
      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution; 
        vec2 pos = st * u_scale;
        
        float t = u_time * u_speed * 0.3;
        
        // Use seed to create deterministic offsets
        float seedOffset = u_seed * 0.1;
        vec2 seedVec = vec2(
            sin(u_seed * 0.543) * 10.0,
            cos(u_seed * 0.876) * 10.0
        );
        
        // Create flow field using layered noise with rotating offsets
        // Seed affects the spatial offset, ensuring deterministic starting positions
        float angle = 0.0;
        angle += snoise(pos + seedVec + vec2(cos(t * 0.1) * 0.5, sin(t * 0.1) * 0.5)) * 3.14159;
        angle += snoise(pos * 1.5 + seedVec * 0.7 + vec2(sin(t * 0.15) * 0.3, cos(t * 0.15) * 0.3)) * 1.5;
        angle += snoise(pos * 0.5 + seedVec * 1.3 + vec2(cos(t * 0.05 + 1.57), sin(t * 0.05 + 1.57))) * 0.5;
        
        // Map angle to 0-1 (upward = 0, downward = 1)
        float value = (sin(angle + seedOffset) + 1.0) * 0.5;
        
        // Hard threshold for blob shapes
        float shape = smoothstep(u_threshold - 0.02, u_threshold + 0.02, value);

        vec3 shapeColor = vec3(0.754, 0.754, 0.754); // #EEDDC3
        vec3 bgColor = vec3(1.0, 1.0, 1.0); // Black background

        vec3 finalColor = mix(bgColor, shapeColor, shape);
        
        // Output
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;
    
    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }
    
    function createProgram(gl, vertexShader, fragmentShader) {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(program));
        return null;
      }
      return program;
    }
    
    function initWebGL() {
      gl = canvas.getContext('webgl');
      if (!gl) {
        console.error('WebGL not supported');
        return;
      }
      
      const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
      const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
      program = createProgram(gl, vertexShader, fragmentShader);
      
      // Create quad vertices
      const vertices = new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
         1,  1,
      ]);
      
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
      
      const positionLocation = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    }
    
    function render(time) {
      if (!gl || !program) return;
      
      canvas.width = gridSize;
      canvas.height = gridSize;
      gl.viewport(0, 0, gridSize, gridSize);
      
      gl.useProgram(program);
      
      // Set uniforms
      const currentTime = (Date.now() - startTime) * 0.001;
      gl.uniform1f(gl.getUniformLocation(program, 'u_time'), currentTime);
      gl.uniform1f(gl.getUniformLocation(program, 'u_seed'), seed);
      gl.uniform1f(gl.getUniformLocation(program, 'u_speed'), speed);
      gl.uniform1f(gl.getUniformLocation(program, 'u_threshold'), threshold);
      gl.uniform1f(gl.getUniformLocation(program, 'u_scale'), scale);
      gl.uniform2f(gl.getUniformLocation(program, 'u_resolution'), gridSize, gridSize);
      
      // Draw
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      
      animationId = requestAnimationFrame(render);
    }
    
    onMount(() => {
      initWebGL();
      render(0);
    });
    
    onDestroy(() => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    });
  </script>
  
  <div class="container">
    <canvas bind:this={canvas} width={gridSize} height={gridSize}></canvas>
  </div>
  
  <style lang="scss">

    @use 'src/lib/scss/variables.scss' as *;

    .container {
      display: flex;
      height: 100%;
      width: 100%;
      border: solid 1px $ultralight-grey;
      border-radius: 40px;

      @media (min-width: 1920px) {
        max-height: 420px;
      }
    }
    
    canvas {
      image-rendering: crisp-edges;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 40px;
    }
  </style>