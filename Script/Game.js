        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext('2d');
        var map = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        var num_color = {
            0: "#ccc0b3",
            2: "#eee4da",
            4: "#ede0c8",
            8: "#f2b179",
            16: "#f59563",
            32: "#f67c5f",
            64: "#ec6544",
            128: "#e44d29",
            256: "#edcf72",
            512: "#c8a145",
            1024: "#a8832b",
            2048: "#86aa9c"
        };
        var num_size = {
            0: "60",
            2: "60",
            4: "60",
            8: "60",
            16: "60",
            32: "60",
            64: "60",
            128: "50",
            256: "50",
            512: "50",
            1024: "40",
            2048: "40"
        };
        var offsetx = {
            0: 53,
            2: 53,
            4: 53,
            8: 53,
            16: 34,
            32: 35,
            64: 35,
            128: 28,
            256: 28,
            512: 28,
            1024: 24,
            2048: 25
        };
        var keycom = {
            '38': [0, -1],
            '40': [0, 1],
            '37': [-1, 0],
            '39': [1, 0]
        }
        var space = 16,
            score = 0;

        function formap(func) {
            for (var i = 0; i < 4; i++)
                for (var j = 0; j < 4; j++) {
                    func(i, j);
                }
        }

        function produce() {
            var cot = ~~(Math.random() * space);
            var k = 0;
            formap(function(i, j) {
                if (map[i][j] == 0) {
                    if (cot == k) {
                        map[i][j] = 2;
                        draw();
                    }
                    k += 1;
                }
            });
            space -= 1;
        }

        function draw() {
            formap(function(i, j) {
                var num = map[i][j];
                ctx.fillStyle = num_color[num];
                ctx.fillRect(j * 120 + 20, i * 120 + 20, 100, 100);
                if (num != 0) {
                    ctx.font = "bold " + num_size[num] + "px Arial,Microsoft Yahei";
                    ctx.fillStyle = (num <= 4) ? "#776e65" : "white";
                    ctx.fillText(String(map[i][j]), j * 120 + offsetx[num], i * 120 + 70 + num_size[num] / 3);
                }
            });
            document.getElementById("score").innerText = "Score: " + String(score);
        }

        function move(dir) {
            function modify(x, y) {
                tx = x, ty = y;
                if (dir[0] == 0) tx = [ty, ty = tx][0];
                if (dir[1] > 0) tx = 3 - tx;
                if (dir[0] > 0) ty = 3 - ty;
                return [tx, ty];
            }
            for (var i = 0; i < 4; i++) {
                var tmp = Array();
                var isadd = false;
                for (var j = 0; j < 4; j++) {
                    var ti = modify(i, j)[0],
                        tj = modify(i, j)[1];
                    if (map[ti][tj] != 0) {
                        if (!isadd && map[ti][tj] == tmp[tmp.length - 1]) score += (tmp[tmp.length - 1] *= 2), isadd = true, space += 1;
                        else tmp.push(map[ti][tj]);
                    }
                }
                for (var j = 0; j < 4; j++) {
                    var ti = modify(i, j)[0],
                        tj = modify(i, j)[1];
                    map[ti][tj] = isNaN(tmp[j]) ? 0 : tmp[j];
                }
            }
            produce();
            if (space == 0) alert("game over");
            draw();
        }
        produce();
        produce();
        document.onkeydown = function(e) {
            dir = keycom[(e ? e : event).keyCode];
            move(dir);
        };
        var sx, sy, dx, dy, ex, ey;
        canvas.ontouchstart = function(event) {
            var touch = event.touches[0];
            sx = touch.clientX, sy = touch.clientY;
        }
        canvas.ontouchmove = function(event) {
            var touch = event.touches[0];
            ex = touch.clientX, ey = touch.clientY;
            dx = ex - sx, dy = ey - sy;
            event.preventDefault();
        }
        canvas.ontouchend = function(event) {
            if (dy < -50 && Math.abs(dy / dx) > 2) move([0, -1]);
            if (dy > 50 && Math.abs(dy / dx) > 2) move([0, 1]);
            if (dx < -50 && Math.abs(dx / dy) > 2) move([-1, 0]);
            if (dx > 50 && Math.abs(dx / dy) > 2) move([1, 0]);
        }