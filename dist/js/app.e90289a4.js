(function(){"use strict";var e={4139:function(e,n,t){var o=t(5130),i=t(6768);function r(e,n){const t=(0,i.g2)("router-view");return(0,i.uX)(),(0,i.Wv)(t)}var s=t(1241);const d={},a=(0,s.A)(d,[["render",r]]);var l=a,c=t(1387);const u=e=>((0,i.Qi)("data-v-19e2a098"),e=e(),(0,i.jt)(),e),m=u((()=>(0,i.Lk)("div",{id:"bg"},null,-1))),g=u((()=>(0,i.Lk)("div",{id:"title-header"}," madeline hess ",-1))),h=u((()=>(0,i.Lk)("div",{id:"title-text"}," some description will go here or something ",-1))),p=u((()=>(0,i.Lk)("div",{id:"title-text"},[(0,i.Lk)("div",null,"scroll to see more"),(0,i.Lk)("div",null,"vvvvvvvvv")],-1))),f=u((()=>(0,i.Lk)("div",null," there's like more info here ",-1)));function v(e,n,t,r,s,d){const a=(0,i.g2)("segment-piece");return(0,i.uX)(),(0,i.CE)("div",{class:"home-wrapper",onWheel:n[0]||(n[0]=(0,o.D$)(((...e)=>d.scrollSegment&&d.scrollSegment(...e)),["prevent"]))},[m,(0,i.bF)(a,{id:"title-segment",bg:"0, 0, 255",index:"0",segmentindex:s.segmentIndex},{default:(0,i.k6)((()=>[g,h,p])),_:1},8,["segmentindex"]),(0,i.bF)(a,{bg:"255, 0, 0",index:"1",segmentindex:s.segmentIndex},{default:(0,i.k6)((()=>[f])),_:1},8,["segmentindex"])],32)}const w=["index","bg"];function x(e,n,t,o,r,s){return(0,i.uX)(),(0,i.CE)("div",{class:"segment-piece",index:t.index,bg:t.bg},[(0,i.RG)(e.$slots,"default",{},void 0,!0)],8,w)}var b={name:"SegmentPiece",props:["bg","index","segmentindex"],methods:{setBg(){},handleScroll(){this.$el.style.top=-100*(this.segmentindex-this.index)+"vh"}},mounted(){this.setBg(),this.handleScroll()},watch:{segmentindex(){this.handleScroll()}}};const k=(0,s.A)(b,[["render",x],["__scopeId","data-v-157be43e"]]);var y=k,S=t(8776),I=t(427),O={name:"HomeView",data(){return{segmentIndex:0,scrollStamp:0}},methods:{scrollSegment(e){if(e.stopPropagation(),e.timeStamp<this.scrollStamp+1e3)return;e.wheelDeltaY<-10&&this.segmentIndex++,e.wheelDeltaY>10&&this.segmentIndex--;const n=document.querySelectorAll(".segment-piece").length-1;this.segmentIndex<0&&(this.segmentIndex=0),this.segmentIndex>n&&(this.segmentIndex=n),this.scrollStamp=e.timeStamp},changeBg(e,n){const t=document.querySelector(`[index="${n}"]`).getAttribute("bg"),o=document.querySelector(`[index="${e}"]`).getAttribute("bg");console.log(t,o),document.querySelector(".home-wrapper").style.backgroundColor=`rgba(${o}, .2)`},initBg(){const e=document.querySelector("#bg"),n=new I.L,t=new S.Z58,o=new S.ubm(50,window.innerWidth/window.innerHeight,1,1e4);o.position.z=2500;const i=new S.ubm(50,window.innerWidth/window.innerHeight,150,1e3),r=new S.WTh(i);t.add(r);const s=new S.YJl;s.add(i),t.add(s);const d=new S.$p8(65535);t.add(d);const a=new S.ZyN(255);t.add(a);const l=new S.eaF(new S.Gu$(100,16,8),new S.V9B({color:16777215,wireframe:!0}));t.add(l);const c=new S.eaF(new S.bdM(1e4,1e4,100,100),new S.V9B({color:16322559,side:S.$EB,wireframe:!0}));c.position.x=0,c.position.y=0,c.position.z=0,t.add(c),c.lookAt(0,1,0),n.load("assets/desk.obj",(e=>{t.add(e),e.scale.set(75,75,75),e.rotateY(-1.570795)}),(e=>{console.log(e.loaded)}),(e=>{console.log(e)}));const u=new S.JeP({antialias:!0,gammaOutput:!0,alpha:!0});function m(){requestAnimationFrame(m),g()}function g(){l.position.z=0,l.position.x=0,l.position.y=0,i.position.set(0,500,1500),i.near=.01,i.far=5e3,i.updateProjectionMatrix(),r.update(),r.visible=!1,s.lookAt(l.position),u.setViewport(0,0,window.innerWidth,window.innerHeight),u.render(t,i)}u.setPixelRatio(window.devicePixelRatio),u.setSize(window.innerWidth,window.innerHeight),u.setClearColor(16488422,0),e.appendChild(u.domElement),m()}},components:{SegmentPiece:y},mounted(){this.initBg()},watch:{segmentIndex(e,n){this.changeBg(e,n)}}};const _=(0,s.A)(O,[["render",v],["__scopeId","data-v-19e2a098"]]);var B=_;const j=[{path:"/",name:"home",component:B}],A=(0,c.aE)({history:(0,c.Bt)(),routes:j});var P=A;(0,o.Ef)(l).use(P).mount("#app")}},n={};function t(o){var i=n[o];if(void 0!==i)return i.exports;var r=n[o]={exports:{}};return e[o].call(r.exports,r,r.exports,t),r.exports}t.m=e,function(){var e=[];t.O=function(n,o,i,r){if(!o){var s=1/0;for(c=0;c<e.length;c++){o=e[c][0],i=e[c][1],r=e[c][2];for(var d=!0,a=0;a<o.length;a++)(!1&r||s>=r)&&Object.keys(t.O).every((function(e){return t.O[e](o[a])}))?o.splice(a--,1):(d=!1,r<s&&(s=r));if(d){e.splice(c--,1);var l=i();void 0!==l&&(n=l)}}return n}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[o,i,r]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={524:0};t.O.j=function(n){return 0===e[n]};var n=function(n,o){var i,r,s=o[0],d=o[1],a=o[2],l=0;if(s.some((function(n){return 0!==e[n]}))){for(i in d)t.o(d,i)&&(t.m[i]=d[i]);if(a)var c=a(t)}for(n&&n(o);l<s.length;l++)r=s[l],t.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return t.O(c)},o=self["webpackChunkmhess42_github_io"]=self["webpackChunkmhess42_github_io"]||[];o.forEach(n.bind(null,0)),o.push=n.bind(null,o.push.bind(o))}();var o=t.O(void 0,[504],(function(){return t(4139)}));o=t.O(o)})();
//# sourceMappingURL=app.e90289a4.js.map