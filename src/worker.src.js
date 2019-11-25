function loadText(fontSource, data = {}) {
    return new Promise((reslove, reject) => {
        const loader = new THREE.FontLoader();
        loader.load(fontSource, data, res => {
            reslove(res);
        },
        xhr => {},
        err => {
        });
    });
}

function loadTextGeometry(data) {
    const promise1 = this.loadText(data.url, {substring: data.text+'? '});
    const promise2 = this.loadText(data.defaultFontUrl, {substring: data.text+'?'});
    return Promise.all([promise1, promise2]).then((res) => {
        const fontLoader = res[0];
        const defalutLoader = res[1];
        if (defalutLoader.data && defalutLoader.data.glyphs) {
            fontLoader.data.defaultGlyphs = defalutLoader.data.glyphs;
        }
        return new Promise((reslove, reject) => {
            let { fontSize, depth, bevelThickness, bevelSize, lineHeight, letterSpacing } = data;
            bevelSize *= 0.4;
            // 没看到有字体间距和行距的。 : 需要自己扩展Three.js，还有字体的加载方式也改一改
            const options = {
                // 字号大小，一般为大写字母的高度
                size: fontSize,
                // 文字的厚度
                depth,
                // 值为'normal'或'bold'，表示是否加粗
                weight: 'normal',
                // 字体，默认是'helvetiker'，需对应引用的字体文件
                font: fontLoader,
                // 值为'normal'或'italics'，表示是否斜体
                style: 'italics',
                // 倒角厚度
                bevelThickness,
                // 倒角宽度
                bevelSize,
                // 弧线分段数，使得文字的曲线更加光滑
                curveSegments: 50,
                // 布尔值，是否使用倒角，意为在边缘处斜切
                bevelEnabled: true,
                // 字距，自定义
                letterSpacing,
                // 行高，自定义
                lineHeight,
                steps: 1,
                bevelSegments: 50,
                bevelType: "quadEllipse",
            };
            // 改字体模型，减少不必要的计算浪费。
            const shapes = fontLoader.generateShapes(data.text, data.size, data.lineHeight, data.letterSpacing);
            const geometry = new THREE.ExtrudeBufferGeometry(shapes, options);
            // const geometry = new THREE.TextGeometry(data.text, options);
            geometry.center();
            geometry.computeBoundingBox();
            geometry.computeVertexNormals();
            reslove(geometry);
        });
    });
}

function startGetGeometry (data) {
    loadTextGeometry(data).then((geomrtry) => {
        geomrtry.objectId = data.objectId;
        self.postMessage(geomrtry);
    });
}

self.addEventListener('message', (e) => {
    var data = e.data;
    startGetGeometry(data);
});