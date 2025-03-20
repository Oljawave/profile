import{_ as u,I as y,c as o,a as e,w as v,b as c,r as w,F as h,d,v as T,o as s,t as a}from"./index-CSCGUd6Q.js";const B={components:{Icon:y},data(){return{baseURL:"/profile/",showScrollTop:!1,ratings:[{category:"Best series actress:",winner:"Eva Green",others:["Ursula Corberó","Gillian Anderson","Anya Taylor-Joy / Ester Exposito","Tatiana Maslany"],image:"rating/eva.jpg"},{category:"Best series actror:",winner:"Bryan Cranston",others:["Pedro Pascal","Cillian Murphy / Giancarlo Esposito","Matthew McConaughey","Henry Cavill","Tom Hiddleston / Charlie Cox"],image:"rating/bryan.jpg"},{category:"All time best series:",winner:"Breaking Bad",others:["Game of Thrones","Sherlock (BBC)","True Detective (S1)","Chernobyl"],image:"rating/breaking.jpg"},{category:"Best Marvel series:",winner:"Daredevil",others:["Loki","Moon Knight","The Punisher","Jessica Jones / Falcon and winter soldier"],image:"rating/daredevil.jpg"},{category:"Best Netflix series:",winner:"Better Call Saul",others:["Peaky Blinders / The Witcher","Dark / La Casa de Papel (1st)","Mindhunter / Narcos","CAOS / Sex education","Love, Death & Robots / You","Arcane / The Queen’s Gambit"],image:"rating/saul.jpg"},{category:"Best HBO series:",winner:"Game of Thrones",others:["Chernobyl","True Detective (S1)","The Last of Us","-"],image:"rating/game.jpg"},{category:"Best neutral series:",winner:"Penny Dreadful",others:["Luther","Mr. Robot","Cyberstalker"],image:"rating/penny.jpg"},{category:"The best comedy I have seen:",winner:"The Office",others:["-","How I Met Your Mother","-","Brooklyn Nine-Nine"],image:"rating/office.jpg"},{category:"Best Kazakh series:",winner:"5:32",others:["Sheker (1st)"],image:"rating/kserial.jpg"},{category:"Best Adventure animation:",winner:"Adventure Time",others:[" The Amazing World of Gumball","Gravity Falls","Over the Garden Wall"],image:"rating/adventure.jpg"},{category:"Best Story-driven animation:",winner:"Avatar: The Last Airbender",others:["The Legend of Korra"],image:"rating/avatar.jpg"},{category:"Best Action & heroes animation:",winner:"Teenage Mutant Ninja Turtles (2003 / 2012)",others:["Batman: The Animated Series","Ben 10"],image:"rating/tmnt.jpg"},{category:"Best Slice of Life animation:",winner:"Phineas and Ferb",others:["Regular Show","Futurama"],image:"rating/phineas.jpg"},{category:"Best Detective animation:",winner:"Scooby-Doo: Mystery Incorporated",others:[],image:"rating/scooby.png"}]}},methods:{goBack(){this.$router.go(-1)},scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})},handleScroll(){this.showScrollTop=window.scrollY>100}},mounted(){window.addEventListener("scroll",this.handleScroll)},beforeUnmount(){window.removeEventListener("scroll",this.handleScroll)}},_={class:"ratings-page"},b={class:"header"},f={class:"ratings-list"},S={class:"image-container"},k=["src"],C={class:"trophy-container"},j={class:"text-overlay"},L={class:"category"},A={class:"winner"},M={class:"rating-info"},D={class:"other-places"};function x(G,r,I,E,n,i){const l=w("Icon");return s(),o("div",_,[e("div",b,[c(l,{icon:"lets-icons:expand-left-light",width:"24",height:"24",class:"back-icon",onClick:i.goBack},null,8,["onClick"]),r[1]||(r[1]=e("h1",null,"TV Series",-1))]),e("div",f,[(s(!0),o(h,null,d(n.ratings,(t,p)=>(s(),o("div",{key:p,class:"rating-card"},[e("div",S,[e("img",{src:n.baseURL+t.image,alt:"rating.name",class:"rating-image"},null,8,k),r[3]||(r[3]=e("div",{class:"overlay"},null,-1)),e("div",C,[r[2]||(r[2]=e("div",{class:"trophy-bg"},null,-1)),c(l,{icon:"solar:cup-first-bold",class:"trophy-icon"})]),e("div",j,[e("span",L,a(t.category),1),e("h2",A,a(t.winner),1)])]),e("div",M,[e("div",D,[(s(!0),o(h,null,d(t.others,(m,g)=>(s(),o("p",{key:g,class:"other-place"}," #"+a(g+2)+" "+a(m),1))),128))])])]))),128))]),v(e("button",{class:"scroll-top-btn",onClick:r[0]||(r[0]=(...t)=>i.scrollToTop&&i.scrollToTop(...t))},[c(l,{icon:"lets-icons:expand-up-light",width:"24",height:"24"})],512),[[T,n.showScrollTop]])])}const P=u(B,[["render",x],["__scopeId","data-v-dc47c15d"]]);export{P as default};
