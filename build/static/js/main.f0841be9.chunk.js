(this.webpackJsonpbpm_cund_front=this.webpackJsonpbpm_cund_front||[]).push([[0],{15:function(e){e.exports=JSON.parse('{"BACKEND_SERVER":"http://localhost:5000","ENVIRONMENT":"dev"}')},27:function(e,t,n){},29:function(e,t,n){},36:function(e,t,n){"use strict";n.r(t);var c=n(0),s=n.n(c),o=n(11),a=n.n(o),r=(n(27),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,38)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,o=t.getLCP,a=t.getTTFB;n(e),c(e),s(e),o(e),a(e)}))}),i=n(8),u=n(14),l=n.n(u),j=n(22),b=n(9),h=n(19),d=n(15),f=(n(29),n(16)),p=n(1);function m(){return(m=Object(h.a)(l.a.mark((function e(t){var n,c,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new URL(d.BACKEND_SERVER+"/getlogs"),c={bpm:t},n.search=new URLSearchParams(c).toString(),console.log("fetch func:"+t),console.log(n.toString()),e.next=7,fetch(n).then((function(e){return console.log(e),e.json()})).catch((function(e){return console.log(e),{data:[],error:e}}));case 7:return s=e.sent,e.abrupt("return",s);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(e,t,n){console.log("message pop "+e);return Object(p.jsx)(f.a,{open:!0,modal:!0,closeOnDocumentClick:!0,onClose:function(){t(!1),n(!1)},children:Object(p.jsx)("span",{children:" messagegee mf "})})}var g=function(e){var t=s.a.useState(!1),n=Object(b.a)(t,2),c=n[0],o=n[1],a=s.a.useState([[]]),r=Object(b.a)(a,2),i=r[0],u=r[1],l=function(){(function(e){return m.apply(this,arguments)})(e.value).then((function(e){return e.data})).then((function(e){u(e)})).then(o(!0))};return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("button",{id:e.value,className:"button_a button_b",onClick:function(){return l()},children:"Last Logs"}),Object(p.jsx)(f.a,{open:c,modal:!0,closeOnDocumentClick:!0,onClose:function(){return o(!1)},children:Object(p.jsx)("div",{className:"popup-content",children:i.map((function(e){return console.log(e),Object(p.jsx)("p",{className:"logs",children:e.query})}))})})]})},x=function(e){var t=s.a.useState(!1),n=Object(b.a)(t,2),c=n[0],o=n[1];return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("button",{id:e.value,className:"button_a button_b",onClick:function(){console.log("restart clicked"),o(!c)},children:"Restart"}),c?O("Restart",o):null]})};function v(e){var t=e.bpm,n=t.name,c=t.port,s=t.description,o=t.state,a=n.substring(3,6);return Object(p.jsxs)("div",{children:[Object(p.jsx)("div",{className:function(e){return"true"===e?"green_state":"red_state"}(o)}),Object(p.jsx)("p",{className:"inline",children:n}),Object(p.jsxs)("p",{className:"inline",children:["Port: ",c]}),Object(p.jsxs)("p",{className:"inline",children:["Desc: ",s]}),Object(p.jsx)(g,{value:a,className:"inline"}),Object(p.jsx)(x,{value:a,className:"inline"})]})}var N=function(){var e=s.a.useState([]),t=Object(b.a)(e,2),n=t[0],c=t[1];return s.a.useEffect((function(){fetch(d.BACKEND_SERVER+"/getall").then((function(e){e.json().then((function(e){console.log(e),e.data.forEach((function(e){c((function(t){return[].concat(Object(j.a)(t),[e])}))}))}))})).catch((function(e){return console.log(e)}))}),[]),Object(p.jsx)("div",{class:"container",children:n.map((function(e){return Object(p.jsx)(v,{bpm:e},e.name)}))})},E=n.p+"static/media/logo.6c593496.jpg",R=(n.p,function(){return Object(p.jsx)(p.Fragment,{children:Object(p.jsxs)("div",{className:"topnav",children:[Object(p.jsx)("img",{className:"logo",src:E,alt:"",width:"70",height:"81"}),Object(p.jsx)("h2",{children:"Pais BPM Administrator"})]})})});a.a.render(Object(p.jsxs)("div",{className:"main",children:[Object(p.jsx)(R,{}),Object(p.jsx)(i.BrowserRouter,{children:Object(p.jsxs)(i.Switch,{children:[Object(p.jsx)(i.Route,{exact:!0,path:"/",component:N}),Object(p.jsx)(i.Route,{exact:!0,path:"/bp",component:N})]})})]}),document.getElementById("root")),r()}},[[36,1,2]]]);
//# sourceMappingURL=main.f0841be9.chunk.js.map