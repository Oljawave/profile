import{_,I as v,c as t,a as s,f as d,w as h,b as m,r as w,t as k,F as f,d as T,v as u,o as n}from"./index-CSCGUd6Q.js";const b={components:{Icon:v},data(){const c="/profile/";return{albumTitle:"Las Vegas",photos:Array.from({length:17},(l,i)=>({src:`${c}lasvegas/lasvegas${i+2}.webp`,title:`Photo ${i+2}`,loading:!0})),selectedPhoto:null,showScrollTop:!1}},methods:{goBack(){this.$router.go(-1)},openPhoto(c){this.selectedPhoto=c},scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})},handleScroll(){this.showScrollTop=window.scrollY>100}},mounted(){window.scrollTo(0,0),window.addEventListener("scroll",this.handleScroll)},beforeUnmount(){window.removeEventListener("scroll",this.handleScroll)}},C={class:"photo-album"},L={class:"header"},P={class:"photo-grid"},S=["onClick"],x={key:0,class:"placeholder"},y=["src","alt","onLoad"],B=["src"];function I(c,l,i,V,e,r){const a=w("Icon");return n(),t("div",C,[s("div",L,[m(a,{icon:"lets-icons:expand-left-light",width:"24",height:"24",class:"back-icon",onClick:r.goBack},null,8,["onClick"]),s("h1",null,k(e.albumTitle),1)]),s("div",P,[(n(!0),t(f,null,T(e.photos,(o,p)=>(n(),t("div",{key:p,class:"photo-item",onClick:g=>r.openPhoto(o.src)},[o.loading?(n(),t("div",x)):d("",!0),h(s("img",{src:o.src,alt:o.title,onLoad:g=>o.loading=!1},null,40,y),[[u,!o.loading]])],8,S))),128))]),e.selectedPhoto?(n(),t("div",{key:0,class:"modal",onClick:l[0]||(l[0]=o=>e.selectedPhoto=null)},[s("img",{src:e.selectedPhoto,class:"modal-img"},null,8,B)])):d("",!0),h(s("button",{class:"scroll-top-btn",onClick:l[1]||(l[1]=(...o)=>r.scrollToTop&&r.scrollToTop(...o))},[m(a,{icon:"lets-icons:expand-up-light",width:"24",height:"24"})],512),[[u,e.showScrollTop]])])}const N=_(b,[["render",I]]);export{N as default};
