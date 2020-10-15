(this.webpackJsonpmyexpenses=this.webpackJsonpmyexpenses||[]).push([[0],{32:function(e){e.exports=JSON.parse('{"MONTHS":{"1":"January","2":"February","3":"March","4":"April","5":"May","6":"June","7":"July","8":"August","9":"September","10":"October","11":"November","12":"December"},"SEARCH":{"GROUP":"Group","MONTH":"Month","YEAR":"Year"}}')},39:function(e,a,t){e.exports=t(68)},54:function(e,a,t){},62:function(e,a,t){},68:function(e,a,t){"use strict";t.r(a);var n=t(14),r=t(1),l=t.n(r),o=t(30),u=t.n(o),c=t(31);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i=t(27),m=t(17),s={en:{translation:t(32)}};i.a.use(m.e).init({resources:s,lng:"en",fallbackLng:"en",interpolation:{escapeValue:!1}});i.a,t(54);var p,E=t(15),g=t(35),f=t(24),b=t.n(f),h=function(e){return null!==e&&void 0!==e&&("string"!==typeof e&&!Array.isArray(e)||e.length>0)},d=function(){for(var e=arguments.length,a=new Array(e),t=0;t<e;t++)a[t]=arguments[t];return a.find((function(e){return h(e)}))};!function(e){e.FIREBASE="FIREBASE",e.LOCAL_STORAGE="LOCAL_STORAGE",e.TOTAL_FAKE="TOTAL_FAKE"}(p||(p={}));var v=function e(){Object(E.a)(this,e),this.apiUrl="localhost",this.buildVersion="local",this.requestDelay=2e3,this.firebaseApiKey="AIzaSyDMDE7eTQbjwkQglMJf5KnFtMr48-pAoVM",this.firebaseProject="lfmachadodasilva-dev"},A=function(){function e(){Object(E.a)(this,e)}return Object(g.a)(e,null,[{key:"get",value:function(){var e=b.a.get("ApplicationConfiguration"),a=new v;return Object.assign(a,e),a}}]),e}();A.set=function(e){b.a.set({ApplicationConfiguration:e},{freeze:!1})};var O=t(11),y=t(23),S=t(3),C=function e(){Object(E.a)(this,e)};C.home="/",C.auth="/auth",C.settings="/settings",C.group="/group",C.label="/label",C.expense="/expense";var k,_=l.a.memo((function(e){var a=Object(S.f)(),t=l.a.useCallback((function(e){a.push(e)}),[a]);return l.a.createElement(l.a.Fragment,null,"Header Component",l.a.createElement("nav",null,l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement("div",{onClick:function(){return t(C.home)}},"Home")),l.a.createElement("li",null,l.a.createElement("div",{onClick:function(){return t(C.group)}},"Group")),l.a.createElement("li",null,l.a.createElement("div",{onClick:function(){return t(C.label)}},"Label")),l.a.createElement("li",null,l.a.createElement("div",{onClick:function(){return t(C.expense)}},"Expense")),l.a.createElement("li",null,l.a.createElement("div",{onClick:function(){return t(C.settings)}},"Settings")),l.a.createElement("li",null,l.a.createElement("div",{onClick:function(){return t(C.auth)}},"Auth")))))})),j=l.a.memo((function(e){return l.a.createElement(l.a.Fragment,null,"Auth page")})),M=t(69),R=(t(62),l.a.memo((function(e){var a=Object(M.a)(),t=Object(O.a)(a,1)[0],n=l.a.useState([1,2,3,4,5,6,7,8,9,10,11,12]),r=Object(O.a)(n,1)[0],o=l.a.useState(e.group),u=Object(O.a)(o,2),c=u[0],i=u[1],m=l.a.useState(e.month),s=Object(O.a)(m,2),p=s[0],E=s[1],g=l.a.useState(e.year),f=Object(O.a)(g,2),b=f[0],h=f[1];l.a.useEffect((function(){i(e.group),E(e.month),h(e.year)}),[e.group,e.month,e.year]);var d=l.a.useCallback((function(e){i(e.target.value)}),[]),v=l.a.useCallback((function(e){E(e.target.value)}),[]),A=l.a.useCallback((function(e){h(e.target.value)}),[]),y=l.a.useCallback((function(){console.log(c,p,b)}),[c,p,b]),S=l.a.useMemo((function(){return e.groups.map((function(e){return l.a.createElement("option",{key:"GROUP_"+e.id,value:e.id},e.name)}))}),[e.groups]),C=l.a.useMemo((function(){return r.map((function(e){return l.a.createElement("option",{key:"MONTH_"+e,value:e},t("MONTHS."+e))}))}),[r,t]),k=l.a.useMemo((function(){return e.years.map((function(e){return l.a.createElement("option",{key:"YEAR_"+e,value:e},e)}))}),[e.years]);return l.a.createElement(l.a.Fragment,null,"Search Component",l.a.createElement("br",null),l.a.createElement("label",null,t("SEARCH.GROUP")),l.a.createElement("select",{className:"group",id:"group",value:c,onChange:d},S),l.a.createElement("label",null,t("SEARCH.MONTH")),l.a.createElement("select",{className:"month",id:"month",value:p,onChange:v},C),l.a.createElement("label",null,t("SEARCH.YEAR")),l.a.createElement("select",{className:"year",id:"year",value:b,onChange:A},k),l.a.createElement("input",{type:"date",id:"date",name:"trip-start",value:"2018-07-22"}),l.a.createElement("button",{onClick:y},"Search"))}))),T=[{id:1,name:"Group 1"},{id:2,name:"Group 2"},{id:3,name:"Group 3"},{id:4,name:"Group 4"}],F=l.a.memo((function(e){var a=l.a.useMemo((function(){return{groups:T,group:2,month:10,years:[2019,2020],year:2020}}),[]);return l.a.createElement(l.a.Fragment,null,"Expense page",l.a.createElement("br",null),l.a.createElement(R,a))})),P=l.a.memo((function(e){return l.a.createElement(l.a.Fragment,null,"Group page")})),I=l.a.memo((function(e){var a={groups:[{id:1,name:"Group 1"},{id:2,name:"Group 2"}],group:2,month:10,years:[2019,2020],year:2020};return l.a.createElement(l.a.Fragment,null,"Label page",l.a.createElement("br",null),l.a.createElement(R,a))})),w=l.a.memo((function(e){return l.a.createElement(l.a.Fragment,null,"Settings page")})),D=l.a.memo((function(e){var a=l.a.useState(A.get()),t=Object(O.a)(a,1)[0];return l.a.createElement(l.a.Fragment,null,l.a.createElement(y.a,{basename:"/"},l.a.createElement(_,null),l.a.createElement(S.c,null,l.a.createElement(S.a,{key:C.group,path:C.group,component:P}),l.a.createElement(S.a,{key:C.label,path:C.label,component:I}),l.a.createElement(S.a,{key:C.expense,path:C.expense,component:F}),l.a.createElement(S.a,{key:C.settings,path:C.settings,component:w}),l.a.createElement(S.a,{key:C.auth,path:C.auth,component:j}),l.a.createElement(S.a,{key:C.home,exact:!0,path:C.home},l.a.createElement(l.a.Fragment,null,l.a.createElement("h3",null,"HOME"),l.a.createElement("h6",null,"Build Version: ",t.buildVersion))),l.a.createElement(S.a,{key:"*",path:"*"},l.a.createElement("h1",null," 404 ")))))})),G=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=new v;return a=Object(n.a)(Object(n.a)({},a),{},{buildVersion:d("60",e.buildVersion,a.buildVersion),apiUrl:d(Object({NODE_ENV:"production",PUBLIC_URL:"/myexpenses-ui",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,REACT_APP_BUILD_VERSION:"60",REACT_APP_FIREBASE_API_KEY:"AIzaSyDMDE7eTQbjwkQglMJf5KnFtMr48-pAoVM",REACT_APP_FIREBASE_PROJECT:"lfmachadodasilva-dev"}).REACT_APP_API_URL,e.apiUrl,a.apiUrl)}),A.set(Object(n.a)(Object(n.a)({},a),e)),A.get()}();Object(c.initializeApp)(Object(n.a)({},(k=d("lfmachadodasilva-dev",G.firebaseProject),{apiKey:d("AIzaSyDMDE7eTQbjwkQglMJf5KnFtMr48-pAoVM",G.firebaseApiKey),authDomain:"".concat(k,".firebaseapp.com"),databaseURL:"https://".concat(k,".firebaseio.com"),projectId:k,storageBucket:k,messagingSenderId:"my-sender-id"}))),u.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(D,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[39,1,2]]]);
//# sourceMappingURL=main.8036a246.chunk.js.map