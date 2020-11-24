var http = require('http');
var fs = require('fs');
var koaStatic = require('koa-static');
var path = require('path');
var koaBody = require('koa-body');
var Koa = require('koa2');

var app = new Koa();
var port = '3000';

var uploadHost = `http://localhost:${port}/uploads/`;



//开启静态文件访问
app.use(koaStatic(
    path.resolve(__dirname, './static')
));

app.use(koaBody({
	formidable: {
        //设置文件的默认保存目录，不设置则保存在系统临时目录下  os
        uploadDir: path.resolve(__dirname, './static/upload')
    },
    multipart: true
}));


//二次处理文件，修改名称
app.use((ctx) => {
	 ctx.set('Access-Control-Allow-Origin', '*');
	 ctx.body = JSON.stringify(ctx.request);
    if (ctx.path === '/upfile') {
        var file = ctx.request.files ? ctx.request.files.f1 : null; //得到文件对象
		if (file) {

            var path = file.path.replace(/\\/g, '/');
            var fname = file.name; //原文件名称
            var nextPath = '';
			console.log(fname);
            if (file.size > 0 && path) {
                //得到扩展名
                var extArr = fname.split('.');
                var ext = extArr[extArr.length - 1];
                nextPath = path + '.' + ext;
                //重命名文件
                fs.renameSync(path, nextPath);
            }
            //以 json 形式输出上传文件地址
            ctx.body = getRenderData({
                data: `${uploadHost}${nextPath.slice(nextPath.lastIndexOf('/') + 1)}`
            });
        }
        

    }

});

/**
 * 
 * @param {设置返回结果} opt 
 */
function getRenderData(opt) {
    return Object.assign({
        code:0,
        msg:'',
        data:null
    },opt);
}

/**
 * http server
 */
var server = http.createServer(app.callback());
server.listen(port);
console.log('upload file server start 3000 ......   ');