(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5557:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(5408)}])},5408:function(e,t,n){"use strict";n.r(t),n.d(t,{GlobalStateProvider:function(){return GlobalStateProvider},default:function(){return Home},useGlobalState:function(){return useGlobalState}});var o=n(5893),s=n(7294),r=n(4617),i=n.n(r);function Footer(){return(0,o.jsx)("footer",{className:i().footer,children:(0,o.jsxs)("p",{className:i().footerText,children:["Github Repository:"," ",(0,o.jsxs)("a",{href:"https://github.com/y17godara/next-chrome-extension-starter",target:"_blank",className:i().footerLink,children:["@y17godara",(0,o.jsx)("img",{src:"icons/icon16.png",alt:"Logo",width:16,height:16})]})]})})}var a=n(5348),l=n.n(a);function Header(){let{satus:e}=useGlobalState();return(0,o.jsxs)("header",{className:l().header,children:["for Content Creators"," ",e.settings.showVersion&&(0,o.jsx)("span",{className:l().version,children:"v1.0.0"})]})}function Popup(){let{activePage:e,navigateToPage:t,satus:n,setSatus:s}=useGlobalState();return(0,o.jsxs)("div",{className:"content",children:["index"===e&&(0,o.jsx)("div",{children:(0,o.jsx)("h1",{children:"Home"})}),"new"===e&&(0,o.jsx)("div",{children:(0,o.jsx)("h1",{children:"New"})}),"settings"===e&&(0,o.jsxs)("div",{children:[(0,o.jsx)("h1",{children:"Settings"}),(0,o.jsx)("code",{children:(0,o.jsx)("pre",{children:JSON.stringify(n,null,2)})}),(0,o.jsx)("button",{onClick:()=>s(e=>({...e,settings:{...e.settings,showVersion:!e.settings.showVersion}})),children:"Toggle Version"})]}),(0,o.jsxs)("div",{children:[(0,o.jsx)("button",{onClick:()=>t("index"),children:"Home"}),(0,o.jsx)("button",{onClick:()=>t("new"),children:"New"}),(0,o.jsx)("button",{onClick:()=>t("settings"),children:"Settings"})]})]})}let c=(0,s.createContext)(),GlobalStateProvider=e=>{let{children:t}=e,[n,r]=(0,s.useState)("index"),[i,a]=(0,s.useState)({components:{},events:{data:{}},locale:{data:{}},storage:{data:{},type:"extension"},settings:{showVersion:!0}}),l=(0,s.useCallback)(e=>{["index","new","settings"].includes(e)&&r(e)},[]),d=(0,s.useCallback)(e=>{a(t=>({...t,settings:{...t.settings,...e}}))},[]),u=(0,s.useMemo)(()=>({activePage:n,navigateToPage:l,satus:i,setSatus:a,updateSettings:d}),[n,l,i,a,d]);return(0,o.jsx)(c.Provider,{value:u,children:t})},useGlobalState=()=>(0,s.useContext)(c);function HomeComponent(){return(0,o.jsxs)("main",{className:"container",children:[(0,o.jsx)(Header,{}),(0,o.jsx)(Popup,{}),(0,o.jsx)(Footer,{})]})}function Home(){return(0,o.jsx)(GlobalStateProvider,{children:(0,o.jsx)(HomeComponent,{})})}},4617:function(e){e.exports={footer:"Footer_footer__nR8_M",footerText:"Footer_footerText__2Z5sQ",footerLink:"Footer_footerLink__FSwqk"}},5348:function(e){e.exports={header:"Header_header__vV_Vo",headerText:"Header_headerText__O_4yl",headerLink:"Header_headerLink__KEwMI"}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=5557)}),_N_E=e.O()}]);