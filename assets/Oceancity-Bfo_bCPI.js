import{_,I as u,c as s,a as t,f as a,b as p,r as v,t as w,F as g,d as k,o as l,w as f,v as b}from"./index-C1rqClHP.js";const y={components:{Icon:u},data(){const n="/me/";return{albumTitle:"Ocean City",photos:Array.from({length:50},(c,i)=>({src:`${n}oceancity/oceancity${i+1}.webp`,title:`Photo ${i+1}`,loading:!0})),selectedPhoto:null,showScrollTop:!1}},methods:{goBack(){this.$router.go(-1)},openPhoto(n){this.selectedPhoto=n},scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})},handleScroll(){this.showScrollTop=window.scrollY>100}},mounted(){window.scrollTo(0,0),window.addEventListener("scroll",this.handleScroll)},beforeUnmount(){window.removeEventListener("scroll",this.handleScroll)}},C={class:"photo-album"},P={class:"header"},T={class:"photo-grid"},S=["onClick"],L={key:0,class:"placeholder"},B=["src","alt","onLoad"],x=["src"];function I(n,c,i,$,e,r){const d=v("Icon");return l(),s("div",C,[t("div",P,[p(d,{icon:"lets-icons:expand-left-light",width:"24",height:"24",class:"back-icon",onClick:r.goBack},null,8,["onClick"]),t("h1",null,w(e.albumTitle),1)]),t("div",T,[(l(!0),s(g,null,k(e.photos,(o,h)=>(l(),s("div",{key:h,class:"photo-item",onClick:m=>r.openPhoto(o.src)},[o.loading?(l(),s("div",L)):a("",!0),f(t("img",{src:o.src,alt:o.title,onLoad:m=>o.loading=!1},null,40,B),[[b,!o.loading]])],8,S))),128))]),e.selectedPhoto?(l(),s("div",{key:0,class:"modal",onClick:c[0]||(c[0]=o=>e.selectedPhoto=null)},[t("img",{src:e.selectedPhoto,class:"modal-img"},null,8,x)])):a("",!0)])}const N=_(y,[["render",I]]);export{N as default};
