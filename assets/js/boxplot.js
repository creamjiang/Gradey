(function () {
    // Based on http://strongriley.github.com/d3/ex/box.html
    // Uses https://github.com/d3/d3-plugins
    var w = 120,
        h = 500,
        m = [10, 50, 20, 50], // top right bottom left
        min = Infinity,
        max = -Infinity;

    var chart = d3.box()
        .whiskers(iqr(1.5))
        .width(w - m[1] - m[3])
        .height(h - m[0] - m[2]);

    var boxes = [
        [1,1,850],
        [1,2,740],
        [1,3,900],
        [1,4,1070],
        [1,5,930],
        [1,6,850],
        [1,7,950],
        [1,8,980],
        [1,9,980],
        [1,10,880],
        [1,11,1000],
        [1,12,980],
        [1,13,930],
        [1,14,650],
        [1,15,760],
        [1,16,810],
        [1,17,1000],
        [1,18,1000],
        [1,19,960],
        [1,20,960],
        [2,1,960],
        [2,2,940],
        [2,3,960],
        [2,4,940],
        [2,5,880],
        [2,6,800],
        [2,7,850],
        [2,8,880],
        [2,9,900],
        [2,10,840],
        [2,11,830],
        [2,12,790],
        [2,13,810],
        [2,14,880],
        [2,15,880],
        [2,16,830],
        [2,17,800],
        [2,18,790],
        [2,19,760],
        [2,20,800],
        [3,1,880],
        [3,2,880],
        [3,3,880],
        [3,4,860],
        [3,5,720],
        [3,6,720],
        [3,7,620],
        [3,8,860],
        [3,9,970],
        [3,10,950],
        [3,11,880],
        [3,12,910],
        [3,13,850],
        [3,14,870],
        [3,15,840],
        [3,16,840],
        [3,17,850],
        [3,18,840],
        [3,19,840],
        [3,20,840],
        [4,1,890],
        [4,2,810],
        [4,3,810],
        [4,4,820],
        [4,5,800],
        [4,6,770],
        [4,7,760],
        [4,8,740],
        [4,9,750],
        [4,10,760],
        [4,11,910],
        [4,12,920],
        [4,13,890],
        [4,14,860],
        [4,15,880],
        [4,16,720],
        [4,17,840],
        [4,18,850],
        [4,19,850],
        [4,20,780],
        [5,1,890],
        [5,2,840],
        [5,3,780],
        [5,4,810],
        [5,5,760],
        [5,6,810],
        [5,7,790],
        [5,8,810],
        [5,9,820],
        [5,10,850],
        [5,11,870],
        [5,12,870],
        [5,13,810],
        [5,14,740],
        [5,15,810],
        [5,16,940],
        [5,17,950],
        [5,18,800],
        [5,19,810],
        [5,20,870],
        ];

    (function () {
        var data = [];

        for (var i=0; i<boxes.length; i++) {
            var entry = boxes[i];
            var e = Math.floor(entry[0] - 1);
            var r = Math.floor(entry[1] - 1);
            var s = Math.floor(entry[2]);
            var d = data[e];
            if (!d) {
                data[e] = [s];
            } else {
                d.push(s);
            }
            if (s >max) {
                max = s;
            }
            if (s < min) {
                min = s;
            }
        };

        chart.domain([min, max]);

        var vis = d3.select("#chart").selectAll("svg")
            .data(data)
            .enter().append("svg:svg")
            .attr("class", "box")
            .attr("width", w)
            .attr("height", h)
            .append("svg:g")
            .attr("transform", "translate(" + m[3] + "," + m[0] + ")")
            .call(chart);
    })();

    // Returns a function to compute the interquartile range.
    function iqr(k) {
    return function(d, i) {
        var q1 = d.quartiles[0],
            q3 = d.quartiles[2],
            iqr = (q3 - q1) * k,
            i = -1,
            j = d.length;
        while (d[++i] < q1 - iqr);
        while (d[--j] > q3 + iqr);
        return [i, j];
    };
    }
})();
