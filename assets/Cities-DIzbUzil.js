import{_ as m,I as w,c as e,a as s,w as y,b as c,r as _,F as g,d as h,v,o as a,t as n}from"./index-CSCGUd6Q.js";const b={components:{Icon:w},data(){return{baseURL:"/profile/",showScrollTop:!1,ratings:[{category:"Best country so far:",winner:"THE UNITED STATES",others:["Kazakhstan","Malaysia","UAE / Azerbaijan","Indonesia / Turkey","Georgia"],image:"rating/usa.jpg"},{category:"Fastest-Growing Country:",winner:"Kazakhstan",others:["UAE","Indonesia","Turkey","USA"],image:"rating/kaz.jpg"},{category:"Best city so far:",winner:"Kuala-Lumpur",others:["Astana","Baku","Ocean city, NJ","Dubai"],image:"rating/kuala.jpg"},{category:"Best modern / new city:",winner:"Astana",others:["Dubai","Kuala-Lumpur","Abu-Dhabi","New-York"],image:"rating/astana.jpg"},{category:"Less beautiful city:",winner:"Tbilisi",others:["Istanbul"],image:"rating/tbilisi.jpg"},{category:"City with the best people:",winner:"Kuala-Lumpur",others:["Denpasar, Bali","Ocean city, NJ","Karaganda"],image:"rating/kuala.jpg"}]}},methods:{goBack(){this.$router.go(-1)},scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})},handleScroll(){this.showScrollTop=window.scrollY>100}},mounted(){window.addEventListener("scroll",this.handleScroll)},beforeUnmount(){window.removeEventListener("scroll",this.handleScroll)}},k={class:"ratings-page"},T={class:"header"},f={class:"ratings-list"},S={class:"image-container"},B=["src"],C={class:"trophy-container"},I={class:"text-overlay"},L={class:"category"},A={class:"winner"},E={class:"rating-info"},j={class:"other-places"};function D(U,o,K,N,i,r){const l=_("Icon");return a(),e("div",k,[s("div",T,[c(l,{icon:"lets-icons:expand-left-light",width:"24",height:"24",class:"back-icon",onClick:r.goBack},null,8,["onClick"]),o[1]||(o[1]=s("h1",null,"Cities and Countries",-1))]),s("div",f,[(a(!0),e(g,null,h(i.ratings,(t,u)=>(a(),e("div",{key:u,class:"rating-card"},[s("div",S,[s("img",{src:i.baseURL+t.image,alt:"rating.name",class:"rating-image"},null,8,B),o[3]||(o[3]=s("div",{class:"overlay"},null,-1)),s("div",C,[o[2]||(o[2]=s("div",{class:"trophy-bg"},null,-1)),c(l,{icon:"solar:cup-first-bold",class:"trophy-icon"})]),s("div",I,[s("span",L,n(t.category),1),s("h2",A,n(t.winner),1)])]),s("div",E,[s("div",j,[(a(!0),e(g,null,h(t.others,(p,d)=>(a(),e("p",{key:d,class:"other-place"}," #"+n(d+2)+" "+n(p),1))),128))])])]))),128))]),y(s("button",{class:"scroll-top-btn",onClick:o[0]||(o[0]=(...t)=>r.scrollToTop&&r.scrollToTop(...t))},[c(l,{icon:"lets-icons:expand-up-light",width:"24",height:"24"})],512),[[v,i.showScrollTop]])])}const z=m(b,[["render",D],["__scopeId","data-v-a0d8514f"]]);export{z as default};
