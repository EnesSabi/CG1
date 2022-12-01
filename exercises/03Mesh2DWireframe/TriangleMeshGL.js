// @ts-check
import { SimpleMeshModelIO } from "./../../lib/helper/simple-mesh-model-io.js"

export class TriangleMeshGL{

    /**
     * Creates a triangle mesh with positions, colors and texture coordinates
     * drawable with WebGL2.
     * 
     * @param {WebGL2RenderingContext} gl WebGL Rendering Context
     * @param {SimpleMeshModelIO} simpleMeshIO Simple Mesh IO
     */ 
    constructor(gl, simpleMeshIO) {
        this.gl = gl;
        this.nTriangleIndices = simpleMeshIO.indices.length;
        this.vao = 0;
        
        const triangles     = simpleMeshIO.indices;
        const positions     = simpleMeshIO.positions;
        const colors        = simpleMeshIO.colors;

        const positionAttributeLocation = 0;
        const colorAttributeLocation = 1;

        // Lab 02, Aufgabe 1(a)
        const indices = triangles;
        //Vertex Array Object
        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);
        //Vertex Buffer Positions
        const pb = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, pb);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
        //Vertex Buffer Colors
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
        //Element Array Buffer
        const ib = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indices), gl.STATIC_DRAW);

        const cb = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cb);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(colorAttributeLocation);
        gl.vertexAttribPointer(colorAttributeLocation, 3, gl.FLOAT, false, 0, 0);

        // Erzeuge 2 VAO
        this.vaowf = gl.createVertexArray();
        // Daran die Position binden (man muss keine Daten neu hochladen)
        gl.bindVertexArray(this.vaowf);
        
        
        gl.bindBuffer(gl.ARRAY_BUFFER, pb);
        
        //Vertex Buffer Colors
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
        
        // Neuer Element Array Buffer anlegen, für Wireframe
        const WireframeBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, WireframeBuffer);
        let wireFrameIndices = [];
        // über alle dreiecke iterieren
        for(let i = 0; i < indices.length; i=i+3) 
        {
            let a = indices[i + 0];
            let b = indices[i + 1];
            let c = indices[i + 2];

            wireFrameIndices.push(a, b, b, c, c, a);
        }

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(wireFrameIndices), gl.STATIC_DRAW);


    }
    drawWireFrame()
    {
        // Bind Wireframe
        this.gl.bindVertexArray(this.vaowf);
        this.gl.drawElements(this.gl.LINES, this.nTriangleIndices * 2, this.gl.UNSIGNED_INT, 0);

    }

    /**
     * Draws a mesh with solid.
     */
    draw()
    {
        // Lab 02, Aufgabe 1(b)
        this.gl.bindVertexArray(this.vao);
        this.gl.drawElements(this.gl.TRIANGLES, this.nTriangleIndices, this.gl.UNSIGNED_INT, 0);
        
    }
}