# 移动商城界面
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> 练习项目。用HTML5、PostCSS、ES6实现[手机版网易严选](http://m.you.163.com/)界面。使用gulp构建开发环境。

``` bash
# 下载依赖
npm install

# 编译至dist目录，运行browserSync，监听3000端口。默认打开Chrome
gulp
```

## 笔记

### 开发环境
在取舍gulp和webpack时，因为只需要browserSync和PostCSS两个关键插件，因此感觉gulp比webpack更轻量。但完全可以用npm script来实现，应该更简单，要学。

### postcss-cssnext
Bug：
- 不能识别多个后继nesting
- 以下代码中& block会被编译到头部，覆盖@import

解决方案：
bug来自postcss-cssnext的依赖更新不及时，所以所需的特性一个一个手动添加维护。


### 可拖动的导航栏实现隐藏滚动条效果
1. `overflow: auto;` + `::-webkit-scrollbar {display: none}`。最简单，但[IE、Edge不适用](http://caniuse.com/#search=-webkit-scrollbar)；
2. 外层`overflow: hidden`，内层`overflow: auto;` + `height/width: calc(100%+20px)`。属于奇技淫巧，尽量不用；
3. js监视touchmove事件，计算偏移量offset，设置`transform: translate(offset)`属性；


### flexbox
flex-basis是item块shrink和grow的分界线，默认auto就是width的数值。当flex items各自占据了basis指示的空间后，剩余空间按flex-grow的数值按比例分配。特例：  
`item1 { flex-grow: 1; flex-basis: 0; }`  
`item2 { flex-grow: 2; flex-basis: 0; }`  
此时item1和item2按1:2占据整行空间，大量例子都错误理解了，这里设置flex-basis是关键。


### grid
浏览器实现率已超过了70%。相当有意思的布局方式，非常符合设计直觉，比玩弄margin、padding、line-height、text-align之流不知高到哪里去了。


### h5 tag
像p、ul、li、a、button、h1-6这些标签，于语义来说都是极好的，但默认样式肯定要改，而且要覆盖它们在各个浏览器中的奇妙默认表现。


### 读取本地json文件
用Ajax，原生XMLHttpRequest就可以。


### omit optional tag
参考w3规范，可省略html,head,body,li,p标签。但影响editor的auto-indent和block解析，所以不弄这个玩了。
