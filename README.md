# JS Decryption Test

#### 提供大陆主流网站JS登录加密的解密例子(适合爬虫模拟登录)

本项目示范例子都是经过本人测试通过,部分搜集于网络,网站若更新不保证能用。

## 目前例子如下:

- 中关村

- 逗游

- 博客园

- 37游戏

- 188游戏中心

- 立德金融

- 民投金服

- 同花顺

- 金融街

- 4366

- 哔哩哔哩

- 中国移动

- shop99

- 连载阅读

- 国美WAP端

- 京东

- 58同城

- 拉钩

- 起点

- 滴滴打车

- 网易博客

- 手机百度

- 5173

- 懒人听书

- 阿里邮箱

- 虾米

- 唯品会

- 汽车之家

- 爱卡汽车

- 酷狗

- 搜狐

- 微信公众号

- 楚楚街

------

经过分析目前采用RSA非对称加密的网站较多,大部分加密大同小异,可以直接套用.使用本项目的JS代码可以先用我提供的**鬼鬼 JS调试工具**调试再进行使用.



#### 部分定义函数说明:
------

navigator 浏览器对象(包含浏览器UA 厂商版本等等)
	var navigator = {};//定义为空对象

window 浏览器里面的全局对象
	var window = this;

#### 快速寻找网页JS加密小技巧:

------

- (1)先打开浏览器F12,直接搜索参数

  pwd=
  pwd =
  pwd:
  pwd :

- (2)密码框右键检查查看id和name,再进行搜寻,大部分是在ajax提交那里可以找到

- (3)实用技巧:

  - 1 过滤掉css img文件
  - 2 有些是JQuery文件,注意查看头部是否有版本声明
  - 3 登录后有跳转页面,注意返回之前页面搜索
  - 4 password = 优先搜索这个
  - 5 location.protocol 一般就是指"http:",常见于rsa算法
  - 6 要特别注意RSA公钥是从文件直接定义的还是传进来的
  - 7 navigator.userAgent相关的可以先调试查到值后直接替换掉就行了
  - 8 有些登陆是用的框架,先右键查看框架源代码能省很多功夫
  - 9 找不到某些属性值时,优先找请求包里面的返回数据,没有的时候再找html源码

#### 常用加密方式:

**md5**:
	调用方式:hex_md5("abc")
**sha1**:
	调用方式:hex_sha1("abc") 
**RSA**:
1、p和q 是不相等的，足够大的两个质数。 p和q是保密的
2、n = p*q n是公开的
3、f(n) = (p-1)*(q-1)
4、e 是和f(n)互质的质数
5、计算参数d 
6、经过上面5步计算得到公钥KU=(e,n) 私钥KR=(d,n)
	RSA三步骤 :
		1:初始化 n = new JSEncrypt;
		2:设置公钥	n.setPublicKey(r);
		3:进行加密	var e = n.encrypt($("#input1").val())

##### RSA加密三步骤示例代码:		

```javascript
function getPwd(pwd){

	var key = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDcV30OSW6Bd8uWyoUzajb7Rwe7NH9J8czQZSgGv9LBk0QZevURdhbME0GbCHS79mOP3+/KgvYZR5NakGd/ZGcagxhoCCY6sDYKA5iTQaXCbg5dhpfviWnj3ck0iGIVCf26QaquJttWsHEU3C0lwkJzGDTC0QjPnV4HwgDd70BcuwIDAQAB";

	var encrypt = new JSEncrypt;

    encrypt.setPublicKey(key);

    return encrypt.encrypt(pwd);

}
```
