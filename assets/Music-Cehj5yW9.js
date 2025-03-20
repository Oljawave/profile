import{_ as y,I as p,c as o,a as e,w as S,b as c,r as k,F as h,d,v as B,o as n,t}from"./index-CSCGUd6Q.js";const w={components:{Icon:p},data(){return{baseURL:"/profile/",showScrollTop:!1,ratings:[{category:"Best female artist:",winner:"Dua Lipa",others:["Ariana Grande","Rihanna / Katy Perry","Billie Eilish / Alicia Keys","RAYE"],image:"rating/dua.jpg"},{category:"Best male Pop artist:",winner:"Justin Timberlake",others:["Harry Styles / Charlie Puth","Justin Bieber / Chris Brown","Shawn Mendes","Backstreet Boys"],image:"rating/justin.jpg"},{category:"Best French House artist:",winner:"Daft Punk",others:["Dabeull","Breakbot","Le Flex"],image:"rating/daftpunk.jpg"},{category:"My fav category:",winner:"French House",others:["Nu-Funk","Pop / Dance-Pop","Hip-hop","Jazz"],image:"rating/french.jpg"},{category:"Best Dua Lipa song:",winner:"Berlin Summer (unreleased)",others:["Ball & Chain (unreleased)","Be the One","Jealousy (unreleased)","Hard Days (unreleased)","Un Dia (One day)","Scared to Be Lonely","Blow Your Mind","Lost In Your Light","Electricity","Dua Lipa (Deluxe) album itself","All songs"],image:"rating/puma.jpg"},{category:"Best male Hip-Hop/Rap artist:",winner:"Future",others:["Kendrick Lamar / Drake","Stromae","Travis Scott / A$AP Rocky","Tyler, the Creator","Isaiah Rashad / Playboi Carti","Don Toliver / 21 savage"],image:"rating/future.jpg"},{category:"Best male oldschool artist:",winner:"Snoop Dogg",others:["Ice Cube / Kanye West","50 Cent / DMX","Dr. Dre"],image:"rating/snoop.jpg"},{category:"Best male R&B/Soul artist:",winner:"Brent Faiyaz",others:["Bruno Mars","Frank Ocean","Chris Brown","Tory Lanez"],image:"rating/brent.jpg"},{category:"Best Rock/Alternative artist:",winner:"Arctic Monkeys",others:["AC/DC","Tame Impala","The Neighbourhood","Gorillaz"],image:"rating/arctic.jpg"},{category:"Best band:",winner:"Maroon 5",others:["Twenty one pilots","Daft Punk (duo)","Imagine Dragons","Black Eyed Peas","Gorillaz","OneRepublic"],image:"rating/maroon.jpg"},{category:"Best kazakh female artist:",winner:"Yenlik",others:["Ayau"],image:"rating/yenlik.jpeg"},{category:"Best kazakh male artist:",winner:"Aikyn",others:["RAim","Son Pascal","De Lacure"],image:"rating/aikyn.png"},{category:"Best kazakh band:",winner:"Orda",others:["Berkut & Aisha","Irina Kairatkyzy"],image:"rating/orda.png"},{category:"Best French song:",winner:"Alors on danse - Stromae",others:["Ma Melilleure Ennemie - Stromae","Tous les Memes - Stromae","Vol - Merol","Tes Petites Fesses - Lynn","Peur des Filles - L'Imperatrice","Mal Barre - Marie-Flore"],image:"rating/stromae.jpg"},{category:"SOME SONGS:",winner:"Kozimnin Karasy - Abay",others:["Attention - Charlie Puth","Men Seni Suyemin - Son pascal","Love Me Again - John Newman","Tous les memes - Stromae","A Million Dreams - Z. Zaifman","What Goes Around - Justin Timberlake","Shoot to Thrill - AC/DC","What Lover's Do - Maroon 5","Tears of Gold - Farouzia","Crew - Brent Faiyaz","SOS - Innr Circle","Sex with me - Rihanna","Stay - Rihanna","Meet Me Halfway - Black Eyed Peas","Dancing With A Stranger - Sam Smith ","Going Bad - Meek Mill & Drake","Praise The Lord - A$AP Rocky","You - Regard, Troye Sivan","Earfquake - Tyler, The Creator","Motive - Ariana Grande","La La La - Naughty Boy & Sam Smith","Vamp Anthem - Playboi Carti","Magnolia - Playboi Carti","Riders On the Storm - Snoop Dogg","Qalamaymyn - Argonya","Uige - Sadriddin","Sex, Smeh, Smert  - Irina Kairatovna","Upset - Brent Faiyaz","Natalie Don't - RAYE","How Deep Is Your Love - Calvin Harris","Pyramids - Franck Ocean","BABY I'M BACK - The Kid LAROI","Neverender - Tame Impala","Scared to Be Lonely - Martin Garrix","Softcore - The Neighbourhood","Divenire - Ludovico Einaudi","Wat U Sed - Isaiah Rashad","Bitch, Don't Kill My Vide - Kendrick","Loyalty - Kendrick Lamar","Die Hard - Kendrick Lamar","Skyfall - Adele","Kids With Guns - Gorillaz","Chaise Longue - Wet Leg","Knockin' On Heaven's Door - Bob Dylan","The Winter - Antonio Vivaldi","Lose Control - JJ Lin","Waiting On a Miracle - Sean Millis"],image:"rating/abay.jpg"}]}},methods:{goBack(){this.$router.go(-1)},scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})},handleScroll(){this.showScrollTop=window.scrollY>100}},mounted(){window.addEventListener("scroll",this.handleScroll)},beforeUnmount(){window.removeEventListener("scroll",this.handleScroll)}},v={class:"ratings-page"},D={class:"header"},L={class:"ratings-list"},b={class:"image-container"},A=["src"],T={class:"trophy-container"},M={class:"text-overlay"},f={class:"category"},_={class:"winner"},C={class:"rating-info"},P={class:"other-places"};function I(R,a,F,K,i,s){const l=k("Icon");return n(),o("div",v,[e("div",D,[c(l,{icon:"lets-icons:expand-left-light",width:"24",height:"24",class:"back-icon",onClick:s.goBack},null,8,["onClick"]),a[1]||(a[1]=e("h1",null,"Music",-1))]),e("div",L,[(n(!0),o(h,null,d(i.ratings,(r,m)=>(n(),o("div",{key:m,class:"rating-card"},[e("div",b,[e("img",{src:i.baseURL+r.image,alt:"rating.name",class:"rating-image"},null,8,A),a[3]||(a[3]=e("div",{class:"overlay"},null,-1)),e("div",T,[a[2]||(a[2]=e("div",{class:"trophy-bg"},null,-1)),c(l,{icon:"solar:cup-first-bold",class:"trophy-icon"})]),e("div",M,[e("span",f,t(r.category),1),e("h2",_,t(r.winner),1)])]),e("div",C,[e("div",P,[(n(!0),o(h,null,d(r.others,(u,g)=>(n(),o("p",{key:g,class:"other-place"}," #"+t(g+2)+" "+t(u),1))),128))])])]))),128))]),S(e("button",{class:"scroll-top-btn",onClick:a[0]||(a[0]=(...r)=>s.scrollToTop&&s.scrollToTop(...r))},[c(l,{icon:"lets-icons:expand-up-light",width:"24",height:"24"})],512),[[B,i.showScrollTop]])])}const j=y(w,[["render",I],["__scopeId","data-v-bb169dbb"]]);export{j as default};
