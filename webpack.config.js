const path = require('path');

module.exports = {
    entry: {
        ThreeTextWorker: './ThreeTextWorker.js',
        ThreeTextEle: './ThreeTextEle.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude:/(node_modules|bower_components)/,//排除掉node_module目录
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env'], //转码规则
                        overrides: [{compact: true}],
                    }
                },
            }
        ]
    },
    mode: 'production'
};