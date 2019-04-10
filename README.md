## 一、请求本地 json 文件，返回数据。
### 1）注意json格式；

```
// list.json
{
  "code":"000",
  "message":"message信息",
  "lists":[
      {
        "name":"小明",
        "sex":"男",
        "age": "3"
      },
      {
        "name":"小红",
        "sex":"女",
        "age":"3"
      }
    ]
}
```

### 2）==请求路径是相对路径==，相对于当前发送请求的文件。

```
// 项目路径
.
├──index.html
└──list.json
```


```
// index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <title>请求本地json文件数据</title>
    <!--<script src="../js/jquery-1.7.2.min.js"></script>-->
    <script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
</head>
<body>
<script type="text/javascript">
    $(function () {
        // 请求路径是当前文件的相对路径
        $.ajax({
            url:'list.json',
            contentType: 'application/json',
            type: 'POST',
            timeout: 50000,
            dataType:'JSON',
            data: JSON.stringify({schoolId: 123}),
            success: function (res) {
                if(res.code == '000'){
                    console.log(res);
                    $('body').html(JSON.stringify(res));
                }else{
                    alert(res.message);
                }
            },
            Error: function (xhr, type, errorThrown) {
                console.log(JSON.stringify(xhr));
                console.log(type);
                console.log(errorThrown);
            }
        });
    })
</script>
</body>
</html>
```



## 二、使用第三方框架（mockjs）,拦截ajax请求返回数据。

[官网](http://mockjs.com/)   [gitHub源码地址](https://github.com/nuysoft/Mock)

### 1）引入mockjs,可以是在线地址，或者是下载到本地引入，一般==在body结束标签前引入==。

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <title>第三方框架，mockjs拦截ajax请求返回数据</title>
</head>
<body>

<!--内容-->

<!--body结束标签前引用-->
<script type="text/javascript" src="http://mockjs.com/dist/mock.js"></script>
</body>
</html>
```

### 2）根据数据模板生成模拟数据。（一般场景配置两个参数够用了Mock.mock( rurl, template )）
* Mock.mock( rurl?, rtype?, template|function( options ) )
* rurl（可选）。表示需要拦截的 URL，可以是 URL 字符串或 URL 正则。例如 /\/domain\/list\.json/、'/domian/list.json'。
* rtype（可选）。表示需要拦截的 Ajax 请求类型。例如 GET、POST、PUT、DELETE 等。
* template （可选）。表示数据模板，可以是对象或字符串。例如 { 'data|1-10':[{}] }、'@EMAIL'。
* function(options)（可选）。表示用于生成响应数据的函数。
* options 指向本次请求的 Ajax 选项集，含有 url、type 和 body 三个属性

```
<script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
<!-- （必选）加载 Mock -->
<script type="text/javascript" src="http://mockjs.com/dist/mock.js"></script>
<script type="text/javascript">
    $(function () {

     /*
    * Mock.mock( rurl, template )
    * rurl:表示需要拦截的 URL，可以是 URL 字符串或 URL 正则。
    * template：表示数据模板，可以是对象或字符串
    * */

//         mock拦截ajax请求并返回数据
        Mock.mock(/\.json/, {
            'code':'000',
            'message':'message信息',
            'list|1-10': [{
                'id|+1': 1,
                'email': '@EMAIL',
                'name': '@name'
            }]
        })


        $.ajax({
            url:'list.json',
            contentType: 'application/json',
            type: 'POST',
            timeout: 50000,
            dataType:'JSON',
            data: JSON.stringify({schoolId: 123}),
            success: function (res) {
                if(res.code == 000){
                    console.log(res);
                    $('<pre>').text(JSON.stringify(res, null, 4)).appendTo('body');
                }else{
                    alert(res.message);
                }
            },
            Error: function (xhr, type, errorThrown) {
                console.log(JSON.stringify(xhr));
                console.log(type);
                console.log(errorThrown);
            }
        });
    })
</script>
```

* 把html文件在浏览器里打开，出现以下格式的json数据；
* ==注意：每次打开页面或刷新一次页面数据会随机改变==；
 ```
 {
    "code": "000",
    "message": "message信息",
    "list": [
        {
            "id": 1,
            "email": "u.skubdwsbs@nfuzlwgd.et",
            "name": "Michael Clark"
        },
        {
            "id": 2,
            "email": "u.sokjrkoja@lnmxlkx.kp",
            "name": "Brian Davis"
        },
        {
            "id": 3,
            "email": "t.chpjw@jnidn.se",
            "name": "Margaret Allen"
        }
    ]
}
 ```

### 3）（可选）配置拦截ajax请求时的行为；
 * Mock.setup( settings )；
 * settings必选，支持的配置项有：timeout；
 * 指定被拦截的 Ajax 请求的响应时间，单位是毫秒。
 *

```
<script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
<!-- （必选）加载 Mock -->
<script type="text/javascript" src="http://mockjs.com/dist/mock.js"></script>
<script type="text/javascript">
    $(function () {
//         mock拦截ajax请求并返回数据
        Mock.mock(/\.json/, {
            'code':'000',
            'message':'message信息',
            'list|1-10': [{
                'id|+1': 1,
                'email': '@EMAIL',
                'name': '@name'
            }]
        })
       /*
        * Mock.setup( settings )
        * 配置拦截 Ajax 请求时的行为。支持的配置项有：timeout。
        * settings必选。配置项集合。timeout可选。指定被拦截的 Ajax 请求的响应时间，单位是毫秒。值可以是正整数，例如 400，表示 400 毫秒 后才会返回响应内容；也可以是横杠 '-' 风格的字符串，例如 '200-600'，表示响应时间介于 200 和 600 毫秒之间。默认值是'10-100'。*/
        Mock.setup({
            timeout: 4000
        })

        $.ajax({
            url:'list.json',
            contentType: 'application/json',
            type: 'POST',
            timeout: 50000,
            dataType:'JSON',
            data: JSON.stringify({schoolId: 123}),
            success: function (res) {
                if(res.code == 000){
                    console.log(res);
                    $('<pre>').text(JSON.stringify(res, null, 4)).appendTo('body');
                }else{
                    alert(res.message);
                }
            },
            Error: function (xhr, type, errorThrown) {
                console.log(JSON.stringify(xhr));
                console.log(type);
                console.log(errorThrown);
            }
        });
    })
</script>

```
* 配置`Mock.setup({timeout: 4000})`之后网页打开4000毫秒之后才会返回数据;

### 4） Mock.Random 是一个工具类，用于生成各种随机数据。（其实上面例子中已经有使用）

* Mock.Random 提供的完整方法（占位符）如下：
* 基本：boolean, natural, integer, float, character, string, range,
* 时间：date, time, datetime, now；
* 图片：image, dataImage；
* 颜色：color，hex，rgb，rgba，hsl；
* 文本：paragraph, sentence, word, title, cparagraph, csentence, cword, ctitle；
* 名字：first, last, name, cfirst, clast, cname；
* web：url, domain, email, ip, tld；
* 地址：region，province，city，county，zip；
* Helper：capitalize, upper, lower, pick, shuffle；
* Miscellaneous：guid, id, increment;

使用方法：在模板数据中定义参数,值为@加上对应的占位符用引号引起来，比如`'nowTime':'@now'`,请求返回的数据就是当前发送请求时的时间 "2017-09-02 11:42:06"；下面我使用了三个占位符，

```
Mock.mock(/\.json/, {
    'code':'000',
    'message':'message信息',
    'list|1-10': [{
        'id|+1': 1,
        'email': '@EMAIL', //邮箱
        'name': '@name'， //名字
        'time':'@now'    //当前时间
    }]
})
```


页面显示：
```
{
    "code": "000",
    "message": "message信息",
    "list": [
        {
            "id": 1,
            "email": "z.urorqdo@prrfhjnly.mil",
            "name": "Joseph Taylor",
            "time": "2017-09-02 11:42:06"
        },
        {
            "id": 2,
            "email": "m.oshsxmd@ewcolhl.na",
            "name": "Mary Harris",
            "time": "2017-09-02 11:42:06"
        },
        {
            "id": 3,
            "email": "l.zcbunjphx@hvdgteo.ir",
            "name": "Susan Thomas",
            "time": "2017-09-02 11:42:06"
        }
    ]
}
```

这里简单介绍一下mockjs怎么使用的，想了解更详细的使用，请参[考官方文档](https://github.com/nuysoft/Mock/wiki)和[官方示例](http://mockjs.com/examples.html)，写的很详细，这里就不多说了还有`Mock.valid( template, data )`效验真实数据的方法，个人觉得用的不多，想了解的自行查看文档。


## 三、使用node搭建简单服务器接收请求返回数据

### 1) 首先安装node

* 可以参考[菜鸟教程node.js安装配置](http://www.runoob.com/nodejs/nodejs-install-setup.html)，或者自行搜索安装教程，访问官网下载慢的这里提供node-v8.40.msi安装包下载，百度网盘地址链接: https://pan.baidu.com/s/1boWTBQn 密码: w32w；

* 安装node 会自动安装npm包管理工具；
* 检查是否有安装node和 npm包管理工具，打开cmd命令行工具，输入`node -v` 和`npm -v`，会输出对应的版本号，如下所示：

```
C:\Users\liuzk
$ node -v
v8.4.0

C:\Users\liuzk
$ npm -v
5.3.0

```

* 全局安装 npm ,最好同时安装cnpm 淘宝npm镜像，如果npm 安装依赖包的时候报错，有时候是网络不好，可以使用淘宝镜像cnpm来安装；

```
npm install -g npm

```

```
npm install -g cnpm

```


### 2）安装express应用程序生成器
[官网](http://expressjs.com/zh-cn/)

* 全局安装`express-generator`;

```
npm install -g express-generator
```

* 有安装Git Bash Here等第三方命令行工具，我们打开文件管理，进入到想要生成项目的位置后，右键打开Git Bash Here 就可以在当前位置启动命令行工具了；
* 如果没有安装git等第三方cmd命令行工具，我们打开文件管理，进入到想要生成项目的位置后，直接在地址栏输入cmd，会在当前目录打开cdm命令行工具；
* 在我们想要的位置打开命令行工具之后，就可以开始以下步骤：


* 创建一个名为myapp的express应用程序
```
express --view=pug myapp
```
成功后会自动在目标位置创建一个名为myapp的项目并生成很多文件，命令行显示效果如下：

```
E:\my_work
$ express --view=pug myapp

   create : myapp
   create : myapp/package.json
   create : myapp/app.js
   create : myapp/public
   create : myapp/routes
   create : myapp/routes/index.js
   create : myapp/routes/users.js
   create : myapp/views
   create : myapp/views/index.pug
   create : myapp/views/layout.pug
   create : myapp/views/error.pug
   create : myapp/bin
   create : myapp/bin/www
   create : myapp/public/javascripts
   create : myapp/public/images
   create : myapp/public/stylesheets
   create : myapp/public/stylesheets/style.css

   install dependencies:
     > cd myapp && npm install

   run the app:
     > SET DEBUG=myapp:* & npm start
```

在命令行最下面有提示，`install dependencies: cd myapp && npm install` 然后 `run the app: npm start`,我们按照提示来；

* 进入myapp项目；

```
cd myapp
```

* 安装package.json文件中的依赖；

```
npm install
```

* 网络不好可以用cnpm安装

```
cnpm install
```

* 运行项目

```
E:\my_work\myapp
$ npm start

> myapp@0.0.0 start E:\my_work\myapp
> node ./bin/www
```

* 在浏览器输入localhost:3000，会打开一个页面显示Welcome to Express，说明已经成功启动服务了。

### 3）配置

* 打开myapp项目，可以看到目录是下面这样的；

```
.
├── app.js
├── bin
│   └── www
├── node_modules //安装的依赖
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug
```

* 这个时候，浏览器打开localhost:3000/users,可以看到页面显示respond with a resource
* 打开routes 文件夹下的users看到以下代码：

```
// routes/users.js文件

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

```
* 可以看到页面显示的内容就是users.js文件中返回的内容，我们定义自己想要返回的内容。

```
// routes/users.js文件

var express = require('express');
var router = express.Router();
var data = {
    'code':'000',
    'message':'message消息',
    'lists':[
        {
          'naem':'小明',
            'age': '12',
            'sex':'男'
        },{
          'naem':'小红',
            'age': '12',
            'sex':'女'
        }
    ]

}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(data);
});

module.exports = router;


```

* 改了之后再请求没有改变，查看命令行信息，304发现我们的请求给我们缓存了；

```
GET /users 304 2.543 ms - -
```

* 我们重新启动一下试试，刷新页面返回：

```
{
    "code": "000",
    "message": "message消息",
    "lists": [
        {
            "naem": "小明",
            "age": "12",
            "sex": "男"
        },
        {
            "naem": "小红",
            "age": "12",
            "sex": "女"
        }
    ]
}
```

* 这样虽然可以请求，但是有缓存问题，而且接口多的话每次都得配置一个路径，太复杂，所以要封装一下，重复使用，每次请求重新请求不加载缓存。

在项目下新建一个config文件夹并新建一个`api.js`,配置一下：

```
// config/api.js

var fs = require('fs');

/**
 * 检查请求的路径是否存在
 * @param apiName 请求路径
 * @param method  请求方式
 * @param params   请求参数
 * @param res 返回请求
 */
function getDataFromPath (apiName,method,params,res){
    if(apiName){
        fs.access(
            // 提取请求路径中的js文件
            apiName.substring(1)+'.js',
            // 回调函数，检查请求的路径是否有效失败返回一个错误参数
            function(err){
                if(!err){
                    // 每次请求都清除模块缓存重新请求
                    delete require.cache[require.resolve('..'+apiName)];
                    try{
                        addApiResult(res,require('..'+apiName).getData(method,params));
                    }catch(e){
                        console.error(e.stack);
                        res.status(500).send(apiName+' has an error,please check the code.');
                    }
                }else{
                    addApiResult(res);
                }
            }
        );
    }else{
        addApiResult(res);
    }
};
/**
 *  响应头
 * @param res
 */
function addApiHead(res){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.header('Access-Control-Allow-Origin', '*');
}

/**
 * 返回参数，如无返回参数返回404
 * @param res
 * @param result
 */
function addApiResult(res,result){
    if(result){
        res.send(result);
    }else{
        res.status(404).send();
    }
}

/*请求方式*/
// get
exports.get = function(req, res){
    addApiHead(res);
    getDataFromPath(req.path,'GET',req.query,res);
};

// post
exports.post = function(req, res){
    addApiHead(res);
    getDataFromPath(req.path,'POST',req.body,res);
};


```

* 打开根目录下`app.js`，在上面引入刚刚新建的文件`api.js`;

```

//引入API
var api = require('./config/api');
```


* 替换请求配置

```
/*配置请求*/
app.get('/', function(req, res){
    res.send('hello world');
});
app.get('/api/*', api.get);
app.post('/api/*', api.post);
app.options('/api/*', function(req, res, next){
    res.sendStatus(200);/*让options请求快速返回*/
});
```

* app.js最终代码：

```
// app.js

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
/*引入api*/
var api = require('./config/api');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//配置请求
app.get('/', function(req, res){
    res.send('hello world');
});
app.get('/api/*', api.get);
app.post('/api/*', api.post);
app.options('/api/*', function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.sendStatus(200);/*让options请求快速返回*/
});

module.exports = app;



```

* 根目录新建api文件夹，新建demo.js;
*
```
// api/demo.js

var dataDemo={
    'code':'000',
    'message':'message消息',
    'lists':[
        {
            'naem':'小明',
            'age': '12',
            'sex':'男'
        },{
            'naem':'小红',
            'age': '12',
            'sex':'女'
        }
    ]
}
exports.getData = function(method,data){
    var backData={
        "code":'000',
        "msg":"",
        "data":dataDemo
    }
    if(method=='DELETE'){
        backData={
            "code":'999',
            "msg":"不支持DELETE方法"
        }
    }
    return JSON.stringify(backData);
}kData);
}
```

* 重新运行npm start，浏览器打开localhost:3000，此时应该显示的是hello world；
* 打开localhost:3000/api/demo,页面显示

```
{
    "code": "000",
    "msg": "",
    "data": {
        "code": "000",
        "message": "message消息",
        "lists": [
            {
                "naem": "小明",
                "age": "12",
                "sex": "男"
            },
            {
                "naem": "小红",
                "age": "12",
                "sex": "女"
            }
        ]
    }
}
```

* 以上都成功了，那就说明配置成功了，复制一个js文件命名为demo2.js,改动一下数据，浏览器访问`localhost:3000/api/demo2`应该也是可以的；


### 4) 使用

* 假如线上接口是 `https://www.baidu.com/mydata/java/school/list`,我们在api文件夹按照路径新建文件夹和文件即可:

```

├── api
│   └── mydata
│       └── java
│           └── school
│               └── list.js


```
* 开发的时候指向本地服务器器接口，联调测试上线的时候只需要把指向本地服务器地址替换成线上地址一下就可以了。


```
<script type="text/javascript">
    $(function () {
        // var baseUrl = 'https://www.baidu.com';   //线上地址
        var baseUrl = 'http://localhost:3000/api';  //本地服务器地址
        $.ajax({
            url: baseUrl+'/mydata/java/school/list',
            contentType: 'application/json',
            type: 'POST',
            timeout: 50000,
            dataType:'JSON',
            data: JSON.stringify({schoolId: 123}),
            success: function (res) {
                if(res.code == '000'){
                    console.log(res);
                    $('body').html(JSON.stringify(res));
                }else{
                    alert(res.message);
                }
            },
            Error: function (xhr, type, errorThrown) {
                console.log(JSON.stringify(xhr));
                console.log(type);
                console.log(errorThrown);
            }
        });
    })
</script>

```