export let Matrix3 = {

    // Creates a 3x3 row-major translation matrix, that translates 2D homogeneous points by tx in x direction and ty in y direction.
    translation: function (tx, ty) {
        // Lab 02, Aufgabe 3(a)
        return [
            1, 0, tx,
            0, 1, ty,
            0, 0, 1,
        ];
    },

    // Creates a 3x3 row-major rotation matrix, that rotates 2D homogeneous points anti-clockwise.
    rotation: function (angleInRadians) {
        // Lab 02, Aufgabe 3(a)
        return [
            Math.cos(angleInRadians), -Math.sin(angleInRadians) , 0,
            Math.sin(angleInRadians), Math.cos(angleInRadians), 0,
            0, 0, 1,
        ];
    },

    // Creates a 3x3 row-major scale matrix, that scales 2D homogeneous points by sx in x and by sy in y direction.
    scaling: function (sx, sy) {
        // Lab 02, Aufgabe 3(a)
        return [
            sx, 0, 0,
            0, sy, 0,
            0, 0, 1,
        ];
    },

    // Returns the product of two 3x3 matrices.
    multiply: function (a, b) {
        // Lab 03, Aufgabe 3(a)
        let i, j, k, t;
        let res = []; //a1*b1 + a2*b2 + a3*b3
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                t = 0
                for(k = 0; k < 3; k++) {
                    t += a[i*3+k]*b[k*3+j];
                }
                res.push(t)
            }
        }
        return res;
    },

    // Creates a 3x3 homogeneous matrix that scales a [-1;1]x[-1;1] coordinate frame such that no skewing happens when mapping to a [0;w-1]x[0;h-1] pixel grid
    // w, h are the width and height of the pixel grid, respectively.
    aspect: function (w, h)
    {
        let a = w/h;
        let b = h/w;
        // Lab 02, Aufgabe 3(c)
        return [
            b, 0, 0,
            0, 1, 0,
            0, 0, 1,
        ];

    }
};