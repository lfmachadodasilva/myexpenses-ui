(this.webpackJsonpmyexpenses=this.webpackJsonpmyexpenses||[]).push([[0],{129:function(e){e.exports=JSON.parse('{"HEADER":{"TITLE":"MyExpenses","GROUPS":"Groups","LABELS":"Labels","EXPENSES":"Expenses","LOGOUT":"Logout","LOGIN_REGISTER":"Login/Register"},"AUTH":{"EMAIL":"Email","PASSWORD":"Password","FACEBOOK":{"BUTTON":"Facebook"},"LOGIN":{"TITLE":"Login by email","BUTTON":"Login"},"REGISTER":{"TITLE":"Register by email","BUTTON":"Register"},"RESET":{"TITLE":"Reset password","BUTTON":"Reset"}},"GROUPS":{"LIST":{"TITLE":"Show all groups"},"MANAGE":{"ADD":{"TITLE":"Add new group"},"EDIT":{"TITLE":"Edit group"}}},"LABELS":{"LIST":{"TITLE":"Show all labels"}},"EXPENSES":{"LIST":{"TITLE":"Show all expenses"},"MANAGE_PAGE":{"TITLE":"Manage expenses"}},"SEARCH":{"TITLE":"Search","BUTTON":"Search","MONTHS":{"1":"January","2":"February","3":"March","4":"April","5":"May","6":"June","7":"July","8":"August","9":"September","10":"October","11":"November","12":"December"}},"COMMON":{"YOU":"You","NAME":"Name","ADD":"Add","EDIT":"Edit","YEAR":"Year","MONTH":"Month","GROUP":"Group","MODEL":{"GROUP":{"USERS":"Users"}},"ERROR":"An error occurred. Please try again later."}}')},154:function(e,t,a){e.exports=a(207)},161:function(e,t,a){},207:function(e,t,a){"use strict";a.r(t);var n=a(51),r=a(0),c=a.n(r),l=a(15),o=a.n(l),u=a(37),i=a.n(u),s=(a(161),a(105)),m=a(67),p={en:{translation:a(129)}};s.a.use(m.e).init({resources:p,lng:"en",fallbackLng:"en",interpolation:{escapeValue:!1}});s.a;var d=a(6),f=a(96),b=a(38),E=a.n(b),h=a(262),O=a(301),g=a(141),v=a(294),j=a(295),y=a(282),k=a(266),w=a(8),x=a.n(w),C=a(14),S=a(27),T=a(10),A=a(300),N=a(302),R=a(142),I=a(270),M=a(271),L=a(272),U=a(273),D=a(265),G=a(267),F=a(42),P=a(268),z=a(209),B=a(269),H=a(210),W=a(297),V=a(100),Y=a.n(V),J=a(134),q=a.n(J),K=a(133),X=a.n(K),_=a(99),Q=a.n(_),Z=a(101),$=a.n(Z),ee=a(102),te=a.n(ee),ae=a(103),ne=a.n(ae),re=c.a.createContext({user:null,initialising:!1,isReady:!1}),ce=function(e){return null!==e&&void 0!==e&&("string"!==typeof e&&!Array.isArray(e)||e.length>0)},le=function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return t.find((function(e){return ce(e)}))},oe=(a(180),new u.auth.FacebookAuthProvider),ue=function(){var e=Object(C.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.a.auth().signInWithPopup(oe);case 3:return e.abrupt("return",e.sent);case 6:throw e.prev=6,e.t0=e.catch(0),console.error(e.t0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(){return e.apply(this,arguments)}}(),ie=function(){var e=Object(C.a)(x.a.mark((function e(t,a){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.a.auth().signInWithEmailAndPassword(t,a);case 3:e.next=9;break;case 5:throw e.prev=5,e.t0=e.catch(0),console.error(e.t0),e.t0;case 9:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t,a){return e.apply(this,arguments)}}(),se=function(){var e=Object(C.a)(x.a.mark((function e(t,a){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.a.auth().createUserWithEmailAndPassword(t,a);case 3:e.next=9;break;case 5:throw e.prev=5,e.t0=e.catch(0),console.error(e.t0),e.t0;case 9:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t,a){return e.apply(this,arguments)}}(),me=function(){var e=Object(C.a)(x.a.mark((function e(t){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.a.auth().sendPasswordResetEmail(t);case 3:return e.abrupt("return",e.sent);case 6:throw e.prev=6,e.t0=e.catch(0),console.error(e.t0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t){return e.apply(this,arguments)}}(),pe=a(33),de=function e(){Object(pe.a)(this,e)};de.home="/",de.auth="/auth",de.groups="/groups",de.labels="/labels",de.expenses="/expenses";var fe=Object(h.a)((function(e){var t;return{root:{flexGrow:1,display:"flex"},appBar:(t={zIndex:e.zIndex.drawer+999},Object(S.a)(t,e.breakpoints.up("sm"),{zIndex:e.zIndex.drawer}),Object(S.a)(t,"position","static"),t),title:{flexGrow:1,cursor:"pointer"},buttons:{color:"inherit"},menu:{paper:{width:240}},sectionMobile:Object(S.a)({display:"flex"},e.breakpoints.up("sm"),{display:"none"}),sectionDesktop:Object(S.a)({display:"none"},e.breakpoints.up("sm"),{display:"flex"}),drawer:{width:240,flexShrink:0},drawerPaper:{width:240},drawerContainer:{overflow:"auto"},container:{padding:0},small:{width:e.spacing(3),height:e.spacing(3)}}})),be=Object(r.memo)((function(){var e=Object(r.useContext)(re).user,t=Object(T.g)(),a=Object(T.h)(),n=Object(A.a)(),l=Object(d.a)(n,1)[0],o=Object(r.useState)(!1),u=Object(d.a)(o,2),s=u[0],m=u[1],p=fe(),f=Object(r.useState)(null),b=Object(d.a)(f,2),E=b[0],h=b[1],O=Object(r.useCallback)((function(){h(null)}),[]),g=Object(r.useCallback)((function(){m(!s)}),[s]),v=Object(r.useCallback)((function(){m(!1),h(null),t.push(de.home)}),[t]),j=Object(r.useCallback)((function(){m(!1),h(null),t.push(de.groups)}),[t]),y=Object(r.useCallback)((function(){m(!1),h(null),ce(a.search)?t.push({pathname:de.labels,search:a.search}):t.push(de.labels)}),[t,a]),w=Object(r.useCallback)((function(){m(!1),h(null),ce(a.search)?t.push({pathname:de.expenses,search:a.search}):t.push(de.expenses)}),[t,a]),S=Object(r.useCallback)((function(){m(!1),h(null),t.push(de.auth)}),[t]),V=Object(r.useCallback)(Object(C.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return h(null),m(!1),e.next=4,i.a.auth().signOut();case 4:setTimeout((function(){return t.push(de.home)}));case 5:case"end":return e.stop()}}),e)}))),[t]),J=Object(r.useMemo)((function(){return ce(null===e||void 0===e?void 0:e.photoURL)?c.a.createElement(N.a,{alt:null===e||void 0===e?void 0:e.email,src:null===e||void 0===e?void 0:e.photoURL,className:p.small}):c.a.createElement(Q.a,null)}),[p.small,e]),K=Object(r.useMemo)((function(){var t;return ce(null===e||void 0===e?void 0:e.displayName)?null===e||void 0===e||null===(t=e.displayName)||void 0===t?void 0:t.split(" ")[0]:null===e||void 0===e?void 0:e.email}),[e]);return c.a.createElement("div",{className:p.root},c.a.createElement(D.a,{className:p.appBar},c.a.createElement(k.a,{maxWidth:"md",className:p.container},c.a.createElement(G.a,null,c.a.createElement(z.a,{edge:"start",color:"inherit","aria-label":"menu",className:p.sectionMobile,onClick:g},c.a.createElement(X.a,null)),c.a.createElement(F.a,{variant:"h6",className:p.title,onClick:v},l("HEADER.TITLE")),c.a.createElement("div",{className:p.sectionDesktop},c.a.createElement(P.a,{className:p.buttons,size:"small",onClick:j,startIcon:c.a.createElement(Y.a,null)},l("HEADER.GROUPS")),c.a.createElement(P.a,{className:p.buttons,size:"small",onClick:y,startIcon:c.a.createElement($.a,null)},l("HEADER.LABELS")),c.a.createElement(P.a,{className:p.buttons,size:"small",onClick:w,startIcon:c.a.createElement(te.a,null)},l("HEADER.EXPENSES")),c.a.createElement(z.a,{"data-testid":"avatar-element",edge:"end","aria-label":"account of current user","aria-controls":"primary-search-account-menu","aria-haspopup":"true",onClick:function(t){ce(e)?h(t.currentTarget):(h(null),S())},color:"inherit"},J),c.a.createElement(R.a,{"data-testid":"avatar-menu-element",id:"simple-menu",anchorEl:E,keepMounted:!0,open:Boolean(E),onClose:O},c.a.createElement(I.a,{onClick:O},c.a.createElement(M.a,null,J),c.a.createElement(L.a,{primary:K})),c.a.createElement(I.a,{onClick:V},c.a.createElement(M.a,null,c.a.createElement(ne.a,{fontSize:"small"})),c.a.createElement(L.a,{primary:l("HEADER.LOGOUT")}))))))),c.a.createElement(W.a,{className:p.drawer.concat(p.sectionMobile),open:s,classes:{paper:p.drawerPaper},onClose:function(){return m(!1)},onOpen:function(){return m(!0)}},c.a.createElement(G.a,null),c.a.createElement("div",{className:p.drawerContainer},c.a.createElement(B.a,null,c.a.createElement(H.a,{button:!0,key:"home"},c.a.createElement(M.a,null,c.a.createElement(q.a,null)),c.a.createElement(L.a,{primary:"Home",onClick:v})),c.a.createElement(U.a,null),c.a.createElement(H.a,{button:!0,key:"groups",onClick:j},c.a.createElement(M.a,null,c.a.createElement(Y.a,null)),c.a.createElement(L.a,{primary:l("HEADER.GROUPS")})),c.a.createElement(H.a,{button:!0,key:"labels",onClick:y},c.a.createElement(M.a,null,c.a.createElement($.a,null)),c.a.createElement(L.a,{primary:l("HEADER.LABELS")})),c.a.createElement(H.a,{button:!0,key:"expenses",onClick:w},c.a.createElement(M.a,null,c.a.createElement(te.a,null)),c.a.createElement(L.a,{primary:l("HEADER.EXPENSES")}))),c.a.createElement(U.a,null),ce(e)&&c.a.createElement(B.a,null,c.a.createElement(H.a,{button:!0,key:"user"},c.a.createElement(M.a,null,J),c.a.createElement(L.a,{primary:K})),c.a.createElement(H.a,{button:!0,key:"logout",onClick:V},c.a.createElement(M.a,null,c.a.createElement(ne.a,null)),c.a.createElement(L.a,{primary:l("HEADER.LOGOUT")}))),!ce(e)&&c.a.createElement(B.a,null,c.a.createElement(H.a,{button:!0,key:"login",onClick:S},c.a.createElement(M.a,null,c.a.createElement(Q.a,null)),c.a.createElement(L.a,{primary:l("HEADER.LOGIN_REGISTER")}))))))})),Ee=a(44),he=function e(){Object(pe.a)(this,e),this.apiUrl="https://myexpenses-backend-dev.herokuapp.com",this.buildVersion="local"},Oe=a(104),ge=a.n(Oe),ve=function(){function e(){Object(pe.a)(this,e)}return Object(Ee.a)(e,null,[{key:"get",value:function(){var e=ge.a.get("ApplicationConfiguration"),t=new he;return Object.assign(t,e),t}}]),e}();ve.set=function(e){ge.a.set({ApplicationConfiguration:e},{freeze:!1})};var je,ye=a(87),ke=a(86);!function(e){e[e.OK=200]="OK"}(je||(je={}));var we,xe=function(){var e=Object(C.a)(x.a.mark((function e(t){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.response&&t.response.status>=je.OK&&(console.error("Request Failed:",t.config),console.error("Status:",t.response.status),console.error("Data:",t.response.data),console.error("Headers:",t.response.headers)),e.abrupt("return",Promise.reject(t));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Ce=function(){function e(t){Object(pe.a)(this,e),this.config=t}return Object(Ee.a)(e,[{key:"get",value:function(){var e=Object(C.a)(x.a.mark((function e(t,a){var n;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,E.a.get(t,{baseURL:this.config.apiUrl,withCredentials:!0,headers:{Accept:"application/json; charset=utf=8",Authorization:"Bearer "+E.a.defaults.headers.common.Authorization},params:a});case 3:return n=e.sent,e.abrupt("return",n.data);case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",xe(e.t0));case 10:case"end":return e.stop()}}),e,this,[[0,7]])})));return function(t,a){return e.apply(this,arguments)}}()},{key:"post",value:function(){var e=Object(C.a)(x.a.mark((function e(t,a){var n;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,E.a.post(t,a,{baseURL:this.config.apiUrl,withCredentials:!0,headers:{Accept:"application/json; charset=utf=8",Authorization:"Bearer "+E.a.defaults.headers.common.Authorization}});case 3:return n=e.sent,e.abrupt("return",n.data);case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",xe(e.t0));case 10:case"end":return e.stop()}}),e,this,[[0,7]])})));return function(t,a){return e.apply(this,arguments)}}()},{key:"put",value:function(){var e=Object(C.a)(x.a.mark((function e(t,a){var n;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,E.a.put(t,a,{baseURL:this.config.apiUrl,withCredentials:!0,headers:{Accept:"application/json; charset=utf=8",Authorization:"Bearer "+E.a.defaults.headers.common.Authorization}});case 3:return n=e.sent,e.abrupt("return",n.data);case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",xe(e.t0));case 10:case"end":return e.stop()}}),e,this,[[0,7]])})));return function(t,a){return e.apply(this,arguments)}}()},{key:"delete",value:function(){var e=Object(C.a)(x.a.mark((function e(t){var a;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,E.a.delete(t,{baseURL:this.config.apiUrl,withCredentials:!0,headers:{Accept:"application/json; charset=utf=8",Authorization:"Bearer "+E.a.defaults.headers.common.Authorization}});case 3:return a=e.sent,e.abrupt("return",a.data);case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",xe(e.t0));case 10:case"end":return e.stop()}}),e,this,[[0,7]])})));return function(t){return e.apply(this,arguments)}}()}]),e}(),Se=function(e){Object(ye.a)(a,e);var t=Object(ke.a)(a);function a(e){var n;return Object(pe.a)(this,a),(n=t.call(this,e)).config=e,n}return Object(Ee.a)(a,[{key:"getAll",value:function(){var e=Object(C.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.get("/api/user");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"addOrUpdate",value:function(){var e=Object(C.a)(x.a.mark((function e(t){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.post("/api/user",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),a}(Ce),Te=a(274),Ae=a(276),Ne=a(296),Re=a(275),Ie=a(277);!function(e){e[e.circular=0]="circular",e[e.linear=1]="linear"}(we||(we={}));var Me,Le=Object(h.a)((function(e){return Object(O.a)({linear:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}})})),Ue=Object(r.memo)((function(e){var t,a=Le();return ce(e.error)?c.a.createElement(Te.a,{container:!0,justify:"center",alignItems:"center"},c.a.createElement(Ne.a,{severity:"error"},c.a.createElement(Re.a,null,"Error"),e.error)):e.showLoading?c.a.createElement(Te.a,{container:!0,justify:"center",alignItems:"center"},(!ce(e.type)||e.type===we.circular)&&c.a.createElement(Ae.a,{size:null!==(t=e.size)&&void 0!==t?t:40,"data-testid":"loading-element"}),e.type===we.linear&&c.a.createElement("div",{className:a.linear},c.a.createElement(Ie.a,null))):c.a.createElement(c.a.Fragment,null,e.children)})),De=a(65),Ge=a.n(De),Fe=function(e){Object(ye.a)(a,e);var t=Object(ke.a)(a);function a(e){var n;return Object(pe.a)(this,a),(n=t.call(this,e)).config=e,n.baseUrl="/api/group",n}return Object(Ee.a)(a,[{key:"getAll",value:function(){var e=Object(C.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.get(this.baseUrl);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getFullAll",value:function(){var e=Object(C.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.get(this.baseUrl+"/full");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"add",value:function(){var e=Object(C.a)(x.a.mark((function e(t){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.post(this.baseUrl,t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"update",value:function(){var e=Object(C.a)(x.a.mark((function e(t){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.put(this.baseUrl,t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"remove",value:function(){var e=Object(C.a)(x.a.mark((function e(t){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.delete(this.baseUrl+"/"+t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),a}(Ce),Pe=a(88),ze=function(e){var t=e.component;e.path,Object(Pe.a)(e,["component","path"]);return Object(r.useContext)(re).user?c.a.createElement(t,null):c.a.createElement(T.a,{to:"/auth"})},Be=a(137),He=a.n(Be),We=a(136),Ve=a.n(We),Ye=a(135),Je=a.n(Ye),qe=a(278),Ke=Object(h.a)((function(e){return{cards:{flex:1},header:{padding:e.spacing(2),paddingBottom:0},content:{padding:e.spacing(2),"&:last-child":{paddingBottom:e.spacing(2)}},deleteButton:{marginLeft:e.spacing(3)}}})),Xe=c.a.memo((function(e){var t=Ke(),a=c.a.useState(!1),n=Object(d.a)(a,2),r=n[0],l=n[1],o=c.a.useState(!1),u=Object(d.a)(o,2),i=u[0],s=u[1],m=c.a.useCallback((function(){(l(!0),ce(e.onEdit))&&(0,e.onEdit)(e.id).then((function(){})).finally((function(){return l(!1)}))}),[e]),p=c.a.useCallback((function(){(s(!0),ce(e.onDelete))&&(0,e.onDelete)(e.id).then((function(){})).finally((function(){return s(!1)}))}),[e]);return c.a.createElement(c.a.Fragment,null,c.a.createElement(H.a,null,c.a.createElement(L.a,{key:e.id,primary:e.title,secondary:e.children}),c.a.createElement(qe.a,null,c.a.createElement(c.a.Fragment,null,ce(e.onEdit)&&c.a.createElement(z.a,{size:"small",onClick:m,disabled:i},c.a.createElement(Ue,{showLoading:r,size:17},c.a.createElement(Je.a,{fontSize:"inherit","data-testid":"edit-element"}))),ce(e.onDelete)&&c.a.createElement(z.a,{size:"small",onClick:p,disabled:r,className:t.deleteButton},c.a.createElement(Ue,{showLoading:i,size:17},c.a.createElement(Ve.a,{fontSize:"inherit","data-testid":"delete-element"})))))),c.a.createElement(U.a,null))})),_e=a(284),Qe=a(304),Ze=a(298),$e=a(285),et=a(4),tt=a(19),at=a(283),nt=a(279),rt=a(280),ct=a(281),lt=a(66),ot=a.n(lt),ut=Object(et.a)((function(e){var t,a;return Object(O.a)({root:(t={marginTop:50},Object(S.a)(t,e.breakpoints.up("sm"),{marginTop:0}),Object(S.a)(t,"padding",e.spacing(2)),t),closeButton:(a={marginTop:50},Object(S.a)(a,e.breakpoints.up("sm"),{marginTop:0}),Object(S.a)(a,"position","absolute"),Object(S.a)(a,"right",e.spacing(1)),Object(S.a)(a,"top",e.spacing(1)),Object(S.a)(a,"color",e.palette.grey[500]),a)})}))((function(e){var t=e.children,a=e.classes,n=e.onClose,r=Object(Pe.a)(e,["children","classes","onClose"]);return c.a.createElement(nt.a,Object.assign({disableTypography:!0,className:a.root},r),c.a.createElement(F.a,{variant:"h6"},t),n?c.a.createElement(z.a,{"aria-label":"close",className:a.closeButton,onClick:n},c.a.createElement(ot.a,null)):null)})),it=Object(et.a)((function(e){return{root:{padding:e.spacing(2)}}}))(rt.a),st=Object(et.a)((function(e){return{root:{margin:0,padding:e.spacing(1)}}}))(ct.a),mt=c.a.memo((function(e){var t=Object(tt.a)(),a=Object(A.a)(),n=Object(d.a)(a,1)[0],r=Object(y.a)(t.breakpoints.down("xs")),l=c.a.useState(!1),o=Object(d.a)(l,2),u=o[0],i=o[1],s=c.a.useState(""),m=Object(d.a)(s,2),p=m[0],f=m[1],b=c.a.useCallback((function(){e.onClose()}),[e]),E=c.a.useCallback((function(){i(!0),e.onAction().catch((function(){return f(n("COMMON.ERROR"))})).finally((function(){return i(!1)}))}),[e,n]);return c.a.useEffect((function(){f("")}),[e.show]),c.a.createElement(c.a.Fragment,null,c.a.createElement(at.a,{fullScreen:r,open:e.show,onClose:b,"aria-labelledby":"responsive-dialog-title"},c.a.createElement(ut,{id:"responsive-dialog-title",onClose:b},e.title),c.a.createElement(it,null,c.a.createElement(c.a.Fragment,null,ce(p)&&c.a.createElement(Ne.a,{severity:"error"},p),e.children)),c.a.createElement(st,null,c.a.createElement(P.a,{variant:"contained",autoFocus:!0,color:"primary",onClick:E,endIcon:u&&c.a.createElement(Ae.a,{size:12}),startIcon:ce(p)&&c.a.createElement(ot.a,{color:"secondary"}),disabled:e.disableAction||u},e.actionText))))})),pt=a(303),dt=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return e.id===t?a:ce(e.displayName)?e.displayName.split(" ")[0]:e.email.split("@")[0]},ft=Object(h.a)((function(){return{chip:{margin:2}}})),bt=Object(r.memo)((function(e){var t=ft(),a=Object(r.useContext)(re).user,n=Object(A.a)(),l=Object(d.a)(n,1)[0];return c.a.createElement(pt.a,{label:dt(e.user,null===a||void 0===a?void 0:a.uid,l("COMMON.YOU")),className:t.chip,avatar:c.a.createElement(N.a,{alt:e.user.email,src:e.user.photoUrl},dt(e.user)[0])})})),Et=Object(r.memo)((function(e){var t=Object(r.useContext)(re).user,a=Object(A.a)(),n=Object(d.a)(a,1)[0];return c.a.createElement(c.a.Fragment,null,c.a.createElement(M.a,null,c.a.createElement(N.a,{alt:e.user.email,src:e.user.photoUrl},dt(e.user)[0])),c.a.createElement(L.a,{primary:dt(e.user,null===t||void 0===t?void 0:t.uid,n("COMMON.YOU")),secondary:e.user.email}))})),ht=Object(h.a)((function(e){return Object(O.a)({formControl:{margin:e.spacing(1),minWidth:120,maxWidth:300},chips:{display:"flex",flexWrap:"wrap"},chip:{margin:2},noLabel:{marginTop:e.spacing(3)}})})),Ot={PaperProps:{style:{maxHeight:224,width:250}}},gt=c.a.memo((function(e){var t=c.a.useContext(re).user,a=ht(),n=Object(A.a)(),r=Object(d.a)(n,1)[0],l=c.a.useState(ve.get()),o=Object(d.a)(l,1)[0],u=c.a.useState(""),i=Object(d.a)(u,2),s=i[0],m=i[1],p=c.a.useState(""),f=Object(d.a)(p,2),b=f[0],E=f[1],h=c.a.useState(!1),O=Object(d.a)(h,2),g=O[0],v=O[1],j=c.a.useState(""),y=Object(d.a)(j,2),k=y[0],w=y[1],S=c.a.useState([]),T=Object(d.a)(S,2),N=T[0],R=T[1],M=c.a.useState(!1),L=Object(d.a)(M,2),U=L[0],D=L[1],G=c.a.useState([]),F=Object(d.a)(G,2),P=F[0],z=F[1],B=c.a.useState(""),H=Object(d.a)(B,2),W=H[0],V=H[1],Y=c.a.useMemo((function(){return N.map((function(e){return e.id}))}),[N]),J=c.a.useCallback((function(e){w(e.target.value)}),[]),q=c.a.useCallback((function(){v(!1),e.onClose()}),[e]),K=c.a.useCallback((function(e){var t=e.target.value.map((function(e){return P.find((function(t){return t.id===e}))}));R(t)}),[P]),X=c.a.useCallback(Object(C.a)(x.a.mark((function t(){var a;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!ce(e.group)){t.next=4;break}return t.abrupt("return",new Fe(o).update({id:null===(a=e.group)||void 0===a?void 0:a.id,name:k,users:N}).then((function(){e.onAction(),q()})));case 4:return t.abrupt("return",new Fe(o).add({id:0,name:k,users:N}).then((function(){e.onAction(),q()})));case 5:case"end":return t.stop()}}),t)}))),[e,k,N,o,q]),_=c.a.useMemo((function(){return P.map((function(e){return c.a.createElement(I.a,{key:"menu-".concat(e.id),value:e.id,disabled:e.id===(null===t||void 0===t?void 0:t.uid)},c.a.createElement(Et,{user:e}))}))}),[t,P]),Q=c.a.useCallback((function(e){return c.a.createElement("div",{className:a.chips},e.map((function(e){return c.a.createElement(bt,{key:"multiple-".concat(e),user:P.find((function(t){return t.id===e}))})})))}),[P,a.chips]);return c.a.useEffect((function(){if(v(e.show),e.show)if(e.show&&0===P.length&&(D(!0),new Se(o).getAll().then((function(e){return z(e)})).catch((function(){return V(r("COMMON.ERROR"))})).finally((function(){return D(!1)}))),ce(e.group)){var a=e.group;w(a.name),R(a.users),m(r("GROUPS.MANAGE.EDIT.TITLE")),E(r("COMMON.EDIT"))}else w(""),ce(P)&&R([P.find((function(e){return e.id===(null===t||void 0===t?void 0:t.uid)}))]),m(r("GROUPS.MANAGE.ADD.TITLE")),E(r("COMMON.ADD"))}),[e,o,P,t,r]),c.a.createElement(c.a.Fragment,null,c.a.createElement(mt,{show:g,title:s,actionText:b,disableAction:!ce(k)||!ce(N)||U,onAction:X,onClose:q},c.a.createElement(Te.a,{container:!0,spacing:3},c.a.createElement(Te.a,{item:!0,xs:12},c.a.createElement(_e.a,{fullWidth:!0},c.a.createElement(Qe.a,{htmlFor:"name"},r("COMMON.NAME")),c.a.createElement($e.a,{required:!0,id:"name",onChange:J,value:k}))),c.a.createElement(Te.a,{item:!0,xs:12},c.a.createElement(_e.a,{fullWidth:!0},c.a.createElement(Qe.a,{id:"mutiple-users-label"},r("COMMON.MODEL.GROUP.USERS")),c.a.createElement(Ue,{showLoading:U,error:W},c.a.createElement(Ze.a,{labelId:"mutiple-users-label",id:"users-mutiple-chip",multiple:!0,value:Y,onChange:K,input:c.a.createElement($e.a,{id:"select-multiple-chip"}),renderValue:function(e){return Q(e)},MenuProps:Ot},_)))))))})),vt=Object(h.a)((function(e){return{root:{flexGrow:1,"&:last-child":{paddingBottom:e.spacing(2)}},title:{margin:e.spacing(2),marginLeft:0},list:{width:"100%"}}})),jt=c.a.memo((function(){var e=c.a.useContext(re).isReady,t=vt(),a=Object(A.a)(),n=Object(d.a)(a,1)[0],r=c.a.useState(ve.get()),l=Object(d.a)(r,1)[0],o=c.a.useState([]),u=Object(d.a)(o,2),i=u[0],s=u[1],m=c.a.useState(!1),p=Object(d.a)(m,2),f=p[0],b=p[1],E=c.a.useState(!1),h=Object(d.a)(E,2),O=h[0],g=h[1],v=c.a.useState(),j=Object(d.a)(v,2),y=j[0],k=j[1],w=c.a.useState(!0),S=Object(d.a)(w,2),T=S[0],N=S[1],R=c.a.useState(""),I=Object(d.a)(R,2),M=I[0],L=I[1],D=c.a.useCallback(function(){var e=Object(C.a)(x.a.mark((function e(t){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return k(i.find((function(e){return e.id===t}))),g(!0),e.abrupt("return",Promise.resolve());case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[i]),G=c.a.useCallback(function(){var e=Object(C.a)(x.a.mark((function e(t){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Fe(l).remove(t).then((function(){N(!0)})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[l]),z=c.a.useCallback((function(){k(void 0),g(!0)}),[]),H=c.a.useCallback((function(){N(!0),g(!1)}),[]),W=c.a.useCallback((function(){g(!1)}),[]);return c.a.useEffect((function(){e&&T&&(N(!1),b(!0),new Fe(l).getFullAll().then((function(e){s(e)})).catch((function(){return L(n("COMMON.ERROR"))})).finally((function(){b(!1)})))}),[l,e,T,n]),c.a.createElement(c.a.Fragment,null,c.a.createElement(Te.a,{container:!0,justify:"space-between",alignItems:"center",className:t.root,spacing:1},c.a.createElement(F.a,{variant:"h5",className:t.title},n("GROUPS.LIST.TITLE")),c.a.createElement(P.a,{variant:"contained",color:"primary",startIcon:c.a.createElement(He.a,null),onClick:z},n("COMMON.ADD"))),c.a.createElement(Te.a,{container:!0,justify:"flex-start",alignItems:"center",className:t.root,spacing:1},c.a.createElement(Ue,{showLoading:f||!e,error:M},c.a.createElement(B.a,{className:t.list},i.map((function(e){return c.a.createElement(c.a.Fragment,null,c.a.createElement(Xe,{key:e.id,id:e.id,title:e.name,onEdit:D,onDelete:G},c.a.createElement(Te.a,{container:!0,justify:"flex-start",alignItems:"center"},e.users.map((function(e){return c.a.createElement(bt,{key:"groups-page-".concat(e.id),user:e})})))),c.a.createElement(U.a,null))}))))),c.a.createElement(gt,{group:y,show:O,onAction:H,onClose:W}))})),yt=c.a.createContext({isLoading:!1,groups:[],years:[(new Date).getFullYear()],month:(new Date).getMonth(),year:(new Date).getFullYear()}),kt=a(139),wt=a.n(kt),xt=a(138),Ct=a.n(xt),St=a(299),Tt=a(288),At=a(287),Nt=a(289),Rt=Object(h.a)((function(e){return Object(O.a)({title:{maxWidth:180},formControl:{width:"100%"},details:{alignItems:"center"}})})),It=Object(r.memo)((function(e){var t,a,n=Rt(),r=Object(T.g)(),l=Object(T.h)(),o=Object(A.a)(),u=Object(d.a)(o,1)[0],i=c.a.useState(!1),s=Object(d.a)(i,2),m=s[0],p=s[1],f=c.a.useState([]),b=Object(d.a)(f,2),E=b[0],h=b[1],O=c.a.useState([1,2,3,4,5,6,7,8,9,10,11,12]),g=Object(d.a)(O,1)[0],v=c.a.useState([(new Date).getFullYear()]),j=Object(d.a)(v,2),y=j[0],k=j[1],w=c.a.useState(null!==(t=null===(a=e.group)||void 0===a?void 0:a.id)&&void 0!==t?t:""),x=Object(d.a)(w,2),C=x[0],S=x[1],N=c.a.useMemo((function(){var e,t;return null!==(e=null===(t=E.find((function(e){return e.id===C})))||void 0===t?void 0:t.name)&&void 0!==e?e:""}),[E,C]),R=c.a.useState((new Date).getMonth()),M=Object(d.a)(R,2),L=M[0],D=M[1],G=c.a.useState((new Date).getFullYear()),z=Object(d.a)(G,2),B=z[0],H=z[1],W=c.a.useMemo((function(){return E.map((function(e){return c.a.createElement(I.a,{key:e.id,value:e.id},e.name)}))}),[E]),V=c.a.useMemo((function(){return g.map((function(e){return c.a.createElement(I.a,{key:e,value:e},u("SEARCH.MONTHS."+e))}))}),[g,u]),Y=c.a.useMemo((function(){return y.map((function(e){return c.a.createElement(I.a,{key:e,value:e},e)}))}),[y]),J=c.a.useCallback((function(e){S(e.target.value)}),[]),q=c.a.useCallback((function(e){D(e.target.value)}),[]),K=c.a.useCallback((function(e){H(e.target.value)}),[]),X=c.a.useCallback((function(e,t){p(t)}),[]),_=c.a.useCallback((function(){r.push({pathname:l.pathname,search:Ge.a.stringify({group:C,month:L,year:B})}),p(!1)}),[r,l,C,L,B]);return c.a.useEffect((function(){var t,a;h(e.groups),k(e.years),S(null!==(t=null===(a=e.group)||void 0===a?void 0:a.id)&&void 0!==t?t:""),D(e.month),H(e.year)}),[e.groups,e.years,e.group,e.month,e.year]),c.a.createElement(c.a.Fragment,null,c.a.createElement(St.a,{onChange:X,disabled:e.loading,expanded:m},c.a.createElement(At.a,{expandIcon:c.a.createElement(Ct.a,null),"aria-controls":"panel1c-content",id:"panel1c-header"},c.a.createElement(Ue,{showLoading:e.loading,size:25,type:we.linear},m&&c.a.createElement(F.a,{variant:"h6"},c.a.createElement("strong",null,u("SEARCH.TITLE"))),!m&&c.a.createElement(Te.a,{container:!0,direction:"row",justify:"space-around",alignItems:"center"},c.a.createElement(F.a,{variant:"body1",noWrap:!0,className:n.title},N),c.a.createElement(U.a,{orientation:"vertical",flexItem:!0}),c.a.createElement(F.a,{variant:"body1"},u("SEARCH.MONTHS."+L)),c.a.createElement(U.a,{orientation:"vertical",flexItem:!0}),c.a.createElement(F.a,{variant:"body1"},B)))),c.a.createElement(Tt.a,{className:n.details},c.a.createElement(Te.a,{container:!0,justify:"center",spacing:2},c.a.createElement(Te.a,{item:!0,xs:12,sm:4},c.a.createElement(_e.a,{className:n.formControl},c.a.createElement(Qe.a,{id:"group-select-label"},u("COMMON.GROUP")),c.a.createElement(Ze.a,{labelId:"group-select-label",id:"group-select",defaultValue:"",value:C,onChange:J},W))),c.a.createElement(Te.a,{item:!0,xs:12,sm:4},c.a.createElement(_e.a,{className:n.formControl},c.a.createElement(Qe.a,{id:"month-select-label"},u("COMMON.MONTH")),c.a.createElement(Ze.a,{labelId:"month-select-label",id:"month-select",defaultValue:"",value:L,onChange:q},V))),c.a.createElement(Te.a,{item:!0,xs:12,sm:4},c.a.createElement(_e.a,{className:n.formControl},c.a.createElement(Qe.a,{id:"year-select-label"},u("COMMON.YEAR")),c.a.createElement(Ze.a,{labelId:"year-select-label",id:"year-select",defaultValue:"",value:B,onChange:K},Y))))),c.a.createElement(U.a,null),c.a.createElement(Nt.a,null,c.a.createElement(P.a,{variant:"contained",color:"primary",startIcon:c.a.createElement(wt.a,null),onClick:_},u("SEARCH.BUTTON")))))})),Mt=c.a.memo((function(){var e,t=c.a.useContext(yt);return console.log(t),c.a.createElement(c.a.Fragment,null,c.a.createElement(It,{loading:t.isLoading,groups:t.groups,years:t.years,group:t.group,month:t.month,year:t.year}),"Search for ",null===(e=t.group)||void 0===e?void 0:e.name," - ",t.month," - ",t.year)})),Lt=c.a.memo((function(){var e,t=c.a.useContext(yt);return console.log(t),c.a.createElement(c.a.Fragment,null,c.a.createElement(It,{loading:t.isLoading,groups:t.groups,years:t.years,group:t.group,month:t.month,year:t.year}),"Search for ",null===(e=t.group)||void 0===e?void 0:e.name," - ",t.month," - ",t.year," ")})),Ut=a(306),Dt=a(290),Gt=a(291),Ft=a(292),Pt=a(293);!function(e){e.LOGIN="LOGIN",e.REGISTER="REGISTER",e.RESET="RESET"}(Me||(Me={}));var zt=Object(h.a)((function(e){return Object(O.a)({root:{"& .MuiTextField-root":{margin:e.spacing(1),width:"25ch"}}})}));function Bt(e){return c.a.createElement(Ne.a,Object.assign({elevation:6,variant:"filled"},e))}var Ht=Object(r.memo)((function(e){var t=zt(),a=Object(A.a)(),n=Object(d.a)(a,1)[0],l=Object(T.g)(),o=Object(r.useState)(),u=Object(d.a)(o,2),i=u[0],s=u[1],m=Object(r.useState)(""),p=Object(d.a)(m,2),f=p[0],b=p[1],E=Object(r.useState)(""),h=Object(d.a)(E,2),O=h[0],g=h[1],v=Object(r.useMemo)((function(){return e.type===Me.RESET?!ce(f):!(ce(f)&&ce(O))}),[f,O,e.type]),j=Object(r.useCallback)((function(e){b(e.target.value)}),[]),y=Object(r.useCallback)((function(e){g(e.target.value)}),[]),k=Object(r.useState)(!1),w=Object(d.a)(k,2),S=w[0],N=w[1],R=Object(r.useCallback)(Object(C.a)(x.a.mark((function t(){var a;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:N(!0),s(void 0),t.t0=e.type,t.next=t.t0===Me.LOGIN?5:t.t0===Me.REGISTER?7:t.t0===Me.RESET?9:11;break;case 5:return a=ie(f,O),t.abrupt("break",11);case 7:return a=se(f,O),t.abrupt("break",11);case 9:return a=me(f),t.abrupt("break",11);case 11:a.then((function(){setTimeout((function(){return l.push(de.home)}))})).catch((function(e){s(e.message)})).finally((function(){N(!1)}));case 12:case"end":return t.stop()}}),t)}))),[f,O,l,e.type]),I=Object(r.useMemo)((function(){return[n("AUTH.".concat(e.type,".TITLE")),n("AUTH.".concat(e.type,".BUTTON"))]}),[e.type,n]),M=Object(d.a)(I,2),L=M[0],U=M[1];return c.a.createElement(c.a.Fragment,null,c.a.createElement(Dt.a,null,c.a.createElement(Gt.a,{title:L}),c.a.createElement(Ft.a,null,ce(i)&&c.a.createElement(Bt,{severity:"error"},i),c.a.createElement("form",{className:t.root,noValidate:!0,autoComplete:"off"},c.a.createElement(Te.a,{container:!0},c.a.createElement(Te.a,{container:!0,item:!0,xs:12},c.a.createElement(Ut.a,{required:!0,id:"".concat(e.type,"-email-required"),label:n("AUTH.EMAIL"),disabled:S,value:f,onChange:j})),e.type!==Me.RESET&&c.a.createElement(Te.a,{container:!0,item:!0,xs:12},c.a.createElement(Ut.a,{required:!0,id:"".concat(e.type,"-password-required"),label:n("AUTH.PASSWORD"),type:"password",disabled:S,value:O,onChange:y}))))),c.a.createElement(Pt.a,null,c.a.createElement(P.a,{id:"".concat(e.type,"-action"),variant:"contained",color:"primary",size:"small",endIcon:S&&c.a.createElement(Ae.a,{size:12}),disabled:S||v,onClick:R},U))))})),Wt=a(140),Vt=a.n(Wt),Yt=Object(r.memo)((function(){var e=Object(A.a)(),t=Object(d.a)(e,1)[0],a=Object(T.g)(),n=Object(r.useState)(!1),l=Object(d.a)(n,2),o=l[0],u=l[1],i=Object(r.useState)(!1),s=Object(d.a)(i,2),m=s[0],p=s[1],f=Object(r.useCallback)(Object(C.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return u(!0),p(!1),e.prev=2,e.next=5,ue();case 5:setTimeout((function(){return a.push(de.home)})),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),p(!0);case 11:return e.prev=11,u(!1),e.finish(11);case 14:case"end":return e.stop()}}),e,null,[[2,8,11,14]])}))),[a]);return c.a.createElement(c.a.Fragment,null,c.a.createElement(P.a,{variant:"contained",color:"primary",startIcon:c.a.createElement(Vt.a,null),onClick:f,endIcon:c.a.createElement(c.a.Fragment,null,o&&c.a.createElement(Ae.a,{size:15}),m&&c.a.createElement(ot.a,{color:"secondary","data-testid":"facebook-close-icon"})),disabled:o},t("AUTH.FACEBOOK.BUTTON")))})),Jt=Object(h.a)((function(e){return Object(O.a)({root:{flexGrow:1},center:{textAlign:"center"}})})),qt=Object(r.memo)((function(){var e=Jt();return c.a.createElement("div",{className:e.root},c.a.createElement(Te.a,{container:!0,direction:"row",justify:"center",alignItems:"flex-start",spacing:3},c.a.createElement(Te.a,{item:!0,xs:12,className:e.center},c.a.createElement(Yt,null)),Object.values(Me).map((function(e){return c.a.createElement(Te.a,{item:!0,xs:12,sm:6,md:4},c.a.createElement(Ht,{type:e}))}))))})),Kt=c.a.memo((function(){var e=c.a.useContext(re).isReady,t=Object(T.g)(),a=Object(T.h)(),n=c.a.useState(ve.get()),r=Object(d.a)(n,1)[0],l=c.a.useState([]),o=Object(d.a)(l,2),u=o[0],i=o[1],s=c.a.useState([(new Date).getFullYear()]),m=Object(d.a)(s,1)[0],p=c.a.useState(),f=Object(d.a)(p,2),b=f[0],E=f[1],h=c.a.useState((new Date).getMonth()),O=Object(d.a)(h,2),g=O[0],v=O[1],j=c.a.useState((new Date).getFullYear()),y=Object(d.a)(j,2),k=y[0],w=y[1],S=c.a.useState(!1),A=Object(d.a)(S,2),N=A[0],R=A[1];return c.a.useEffect((function(){if(e){var n=JSON.stringify(Ge.a.parse(a.search)),c=JSON.parse(n);R(!0),function(){var e=Object(C.a)(x.a.mark((function e(){var n,l,o,u,s,m;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,new Fe(r).getFullAll();case 3:o=e.sent,e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),o=[];case 9:i(o),ce(c.group)&&o.some((function(e){return e.id===c.group}))?u=o.find((function(e){return e.id===c.group})):ce(o)&&(u=o[0]),E(u),s=ce(c.month)&&c.month>=1&&c.month<=12?c.month:(new Date).getMonth(),v(s),m=ce(c.year)?c.year:(new Date).getFullYear(),w(m),console.log(c,{group:null===(n=u)||void 0===n?void 0:n.id,month:s,year:m}),t.push({pathname:a.pathname,search:Ge.a.stringify({group:null===(l=u)||void 0===l?void 0:l.id,month:s,year:m})}),R(!1);case 19:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(){return e.apply(this,arguments)}}()()}}),[r,a.search,e]),c.a.createElement(c.a.Fragment,null,c.a.createElement(yt.Provider,{value:{isLoading:N,groups:u,years:m,group:b,month:g,year:k}},c.a.createElement(T.d,null,c.a.createElement(ze,{path:de.groups,component:jt}),c.a.createElement(ze,{path:de.labels,component:Mt}),c.a.createElement(ze,{path:de.expenses,component:Lt}),c.a.createElement(T.b,{path:de.auth,component:qt}),c.a.createElement(T.b,{exact:!0,path:de.home},c.a.createElement(c.a.Fragment,null,c.a.createElement(F.a,{variant:"h3"},"HOME"),c.a.createElement(F.a,{variant:"h6"},"Build Version: ",r.buildVersion))),c.a.createElement(T.b,{path:"*"},c.a.createElement("h1",null," 404 ")))))})),Xt=Object(h.a)((function(e){return Object(O.a)({container:{flexGrow:1,marginTop:10}})})),_t=c.a.memo((function(){var e=Xt(),t=c.a.useState(ve.get()),a=Object(d.a)(t,1)[0],n=function(){var e=Object(r.useState)((function(){var e=Object(u.auth)().currentUser;return{initialising:!e,user:e}})),t=Object(d.a)(e,2),a=t[0],n=t[1],l=function(e){n({initialising:!1,user:e})};return c.a.useEffect((function(){var e=i.a.auth().onAuthStateChanged(l);return function(){return e()}}),[]),a}(),l=n.user,o=n.initialising,s=c.a.useState(!1),m=Object(d.a)(s,2),p=m[0],b=m[1];c.a.useEffect((function(){!o&&l&&ce(l)&&l.getIdTokenResult().then((function(e){E.a.defaults.headers.common.Authorization=e.token,new Se(a).addOrUpdate({id:l.uid,email:l.email,displayName:l.displayName,photoUrl:l.photoURL}),b(!0)}))}),[l,o,a]);var h=Object(y.a)("(prefers-color-scheme: dark)"),O=c.a.useMemo((function(){return Object(g.a)({palette:{type:h?"dark":"light"},typography:{button:{textTransform:"none"}}})}),[h]);return c.a.createElement(c.a.Fragment,null,c.a.createElement(v.a,{theme:O},c.a.createElement(j.a,null),c.a.createElement(re.Provider,{value:{user:l,initialising:o,isReady:p}},c.a.createElement(f.a,null,c.a.createElement(be,null),c.a.createElement(k.a,{maxWidth:"md",className:e.container},c.a.createElement(Ue,{showLoading:o},c.a.createElement(Kt,null)))))))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Qt={apiKey:"AIzaSyAVfjm2M_d7mmVbD4kOwVWxp57CQZV8jqQ",authDomain:"myexpenses-6e402.firebaseapp.com",databaseURL:"https://myexpenses-6e402.firebaseio.com",projectId:"myexpenses-6e402",storageBucket:"myexpenses-6e402",messagingSenderId:"my-sender-id"};!function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=new he;t=Object(n.a)(Object(n.a)({},t),{},{buildVersion:le("7",e.buildVersion,t.buildVersion),apiUrl:le("https://myexpenses-backend-dev.herokuapp.com",e.apiUrl,t.apiUrl)}),ve.set(Object(n.a)(Object(n.a)({},t),e))}(),Object(u.initializeApp)(Object(n.a)({},Qt)),o.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(_t,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[154,1,2]]]);
//# sourceMappingURL=main.62ee0697.chunk.js.map