let path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let conf = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'./dist'), //куда складываем результат
        filename: 'main.js',
        publicPath: 'dist/'
    },
    devServer:{
        overlay: true
    },
    module:{
        rules:[
            {
                test: /\.js$/, //что делаем с каждым типом файлов
                loader: 'babel-loader'
                //exclude: '/node_modules/'
            },
            {
                test: /\.css$/, 
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
                /*use: [ //берет импорт стилей из js и добавляет их все в тег head в html, просто перепечатывая
                    'style-loader', //порядок важен, сначала считываем, потом подключаем
                    'css-loader'
                ]*/
                
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
    ]
    //devtool: 'eval-sourcemap' //если экспортируем функцию ниже, то эта строка уже не нужна
};

module.exports = (env, options) => {
    console.log('OPTIONS BELOW');
    console.log(options);
    let production = options.mode === 'production';
    conf.devtool = production? 'source-map' : 'eval-sourcemap'; //в случае прода можно возвращать false, чтобы юзер не видел исходников
    return conf;
};