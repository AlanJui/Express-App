# 專案指引

DevExtreme 做為 Web 前端的開發工具，其功能固然強大，但也因此致使「掌握用法」之事變得有些困難。

為了「避重就輕」，使「研究」工作變得「簡易」些，因而有了本專案，企圖......

 - 利用 [ExpressJS](http://expressjs.com/) 具有「Web Page Template」的特性，避免重複輸入的麻煩；更重要的是，對於 NavBar 超連結的維護工作，僅需在單一處修改即可

 - 使用 [JSON Server ](https://github.com/typicode/json-server) 當「偽 RESTful Web API Service」，僅需提供 JSON 格式的文字檔案，就能與 Web 前台介接，提供與 DB 存／取資料的服務 

為能正常操作以下「步驟」，請依據「事前準備」章節，備妥應安裝之軟體套件及資料庫。

---

## 開發作業程序

想要試用本專案之實作成果，請依下述程序進行操作。

#### （1）下載專案檔案
自 GitHub 下載本專案所需使用檔案。

```
$ git clone git@github.com:AlanJui/Express-App.git
```

#### （2）進入專案資料夾
進入專案的「根路徑」。

```
$ cd Express-App
```

#### （3）安裝專案所需的 NodeJS 套件
安裝如： JSON Server, Local Web Server...... 等 NodeJS 套件。

```
$ npm install
```

#### （4）安裝 Web 前端套件
安裝如：DevExtreme, jQuery, Bootstrap...... 等之 Web 前端套件。

```
$ bower install
```

#### （5）啟動 DB 伺服器
啟動 JSON Server ，提供 DevExtreme 在 CustomStore 所需使用的 RESTful Web API Service。（預設 DB Port : 5000）

```
$ npm run db
```

【驗證作業】： 啟動 Web 瀏覽器，輸入以下 URL 網址。 

```
http://localhost:5000/api/orders
```

#### （6）啟動 Local Web Server
啟動個人電腦上的 Local Web Server（nodemon），觀察 Web 輸出結果。（預設 Web Port : 3000）

```
$ npm start
```

【驗證作業】： 啟動 Web 瀏覽器，輸入以下 URL 網址。 

```
http://localhost:3000/
```

#### （7）使用編輯器／IDE工具進行開發工作
使用編輯器或 IDE 工具，進行程式開發工作。

由於 `nodemon` 的特性，無論是後端的 NodeJS 程式碼， Web 前端的 JavaScript 程式碼，只要檔案的內容有所異動，在完成「存檔」工作之後， `nodemon` 會立即進行「Reload」作業，也就是 Web 瀏覽器的內容亦會隨之更新。

---

## 新增網頁作業程序

#### (1) 自專案路徑：/views/pages/_new.ejs 產生「新網頁」檔案。
所有「網頁」，置於 `〔專案根路徑〕/views/pages/` 目錄之中。所有的網頁，其「模版」的來源，出自檔案：  `〔專案根路徑〕/views/boilerplate.ejs` 。 

【_new.ejs檔案內容】：
```HTML
<!-- views/pages/_new.ejs -->

<% layout('./boilerplate') -%>

<!-- Contents -->
<div id="gridContainer"></div>

<!-- App -->
<script src="/javascripts/json-server-orders.js"></script>

```

複製檔案 Bash 指令
```bash
$ cd views/pages
$ cp _new.ejs [NewWebPage].ejs
```

#### (2) 設定 Web Page 的 Routing Path
修訂檔案：  `〔專案根路徑〕/routes/index.js` 。

以「網頁」： `oders.ejs` ，對映之「路徑」： `/orders` 為例，其 NodeJS 程式碼如下：

```JavaScript
router.get('/orders', function (req, res, next) {
  res.render('pages/orders', {});
}); 
```

#### (3) 設定左側邊的功能表操作介面（Side Bar）
編輯檔案： `〔專案根路徑〕/views/boilerplate.ejs` ，修訂 HTML Tag ，以便將網頁的 Routing Path 放入。

```JavaScript
<!-- Sidebar Links -->
<ul class="list-unstyled components">
    <li class="active"><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>

    <li><!-- Link with dropdown items -->
        <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">DevExtreme Demo</a>
        <ul class="collapse list-unstyled" id="homeSubmenu">
            <li><a href="/orders">Order (Web API)</a></li>
            <li><a href="/json-server-orders">Order (JSON Server)</a></li>
            <li><a href="#">Page</a></li>
        </ul>

    <li><a href="#">Portfolio</a></li>
    <li><a href="#">Contact</a></li>
</ul>
```

#### (4) 驗證網頁新增作業已正確完成
操作 Web 瀏覽器的 Side Bar ，用以確認：(1) 網頁；(2) Routing Path；(3) Side Bar 操作介面，三項與新增網頁相關的工作，都已正確完成。

#### (5) 編輯「新增網頁」
目前的網頁內容，應如下所示：

```HTML
<!-- views/pages/_new.ejs -->

<% layout('./boilerplate') -%>

<!-- Contents -->
<div id="gridContainer"></div>

<!-- App -->
<script src="/javascripts/json-server-orders.js"></script>

```

記得依需要修改 `Contents` 與 `App` 兩項「註解」之下的 HTML Tag 內容。

#### (6) 發展 JavaScript 
請依上述步驟，在 `<script src="/javascripts/[NewJavaScript].js"></script>` 中填入的內容，進行 JavaScript 的開發工作。


---

## 作業前置準備

使用本專案的原始程式碼之前，須在開發機中，先完成以下軟體之安裝。

 - [Git](https://git-scm.com/)：程式／文件的版本控管工具
 - [NodeJS & NPM](https://nodejs.org/en/)：採用 V8 引掣的 JavaScript 執行平台及套件管理工具
 - [Bower](https://bower.io/)：Web 前端程式館管理工具
 - [ExpressJS](http://expressjs.com/) ：採用 NodeJS 做為基礎，可自行開發 Web Server 的平台 
 - [JSON Server](https://github.com/typicode/json-server)：不僅寫程式，僅需提供 JSON 格式檔，就能提供 RESTful Web API Service 的工具
