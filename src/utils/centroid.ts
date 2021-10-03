const getCentroid = (arr: number[][]) => {
    var x = arr.map((xy) => xy[1]);
    var y = arr.map((xy) => xy[0]);
    var cx = (Math.min (...x) + Math.max (...x)) / 2;
    var cy = (Math.min (...y) + Math.max (...y)) / 2;
    return [cx, cy];
}

export default getCentroid