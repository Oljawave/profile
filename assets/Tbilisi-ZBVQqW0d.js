import{_ as w,I as g,c as t,a as s,f as d,w as h,b as m,r as v,t as b,F as T,d as k,v as u,o as n}from"./index-C1rqClHP.js";const f={components:{Icon:g},data(){const c="/me/";return{albumTitle:"Tbilisi",photos:Array.from({length:14},(l,r)=>({src:`${c}tbilisi/tbilisi${r+1}.webp`,title:`Photo ${r+1}`,loading:!0})),selectedPhoto:null,showScrollTop:!1}},methods:{goBack(){this.$router.go(-1)},openPhoto(c){this.selectedPhoto=c},scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})},handleScroll(){this.showScrollTop=window.scrollY>100}},mounted(){window.scrollTo(0,0),window.addEventListener("scroll",this.handleScroll)},beforeUnmount(){window.removeEventListener("scroll",this.handleScroll)}},C={class:"photo-album"},P={class:"header"},S={class:"photo-grid"},L=["onClick"],x={key:0,class:"placeholder"},y=["src","alt","onLoad"],B=["src"];function I(c,l,r,E,e,i){const a=v("Icon");return n(),t("div",C,[s("div",P,[m(a,{icon:"lets-icons:expand-left-light",width:"24",height:"24",class:"back-icon",onClick:i.goBack},null,8,["onClick"]),s("h1",null,b(e.albumTitle),1)]),s("div",S,[(n(!0),t(T,null,k(e.photos,(o,p)=>(n(),t("div",{key:p,class:"photo-item",onClick:_=>i.openPhoto(o.src)},[o.loading?(n(),t("div",x)):d("",!0),h(s("img",{src:o.src,alt:o.title,onLoad:_=>o.loading=!1},null,40,y),[[u,!o.loading]])],8,L))),128))]),e.selectedPhoto?(n(),t("div",{key:0,class:"modal",onClick:l[0]||(l[0]=o=>e.selectedPhoto=null)},[s("img",{src:e.selectedPhoto,class:"modal-img"},null,8,B)])):d("",!0),h(s("button",{class:"scroll-top-btn",onClick:l[1]||(l[1]=(...o)=>i.scrollToTop&&i.scrollToTop(...o))},[m(a,{icon:"lets-icons:expand-up-light",width:"24",height:"24"})],512),[[u,e.showScrollTop]])])}const V=w(f,[["render",I]]);export{V as default};
