(function(){"use strict";var e={1940:function(e,t,n){var o=n(5130),s=n(6768);function i(e,t){const n=(0,s.g2)("router-view");return(0,s.uX)(),(0,s.Wv)(n)}var a=n(1241);const r={},d=(0,a.A)(r,[["render",i]]);var c=d,l=n(1387);const h=e=>((0,s.Qi)("data-v-8acc8cc4"),e=e(),(0,s.jt)(),e),m=h((()=>(0,s.Lk)("div",{id:"bg"},null,-1))),g=h((()=>(0,s.Lk)("div",{id:"title-header"}," madeline hess ",-1))),u=h((()=>(0,s.Lk)("div",{id:"title-text"}," some description will go here or something ",-1))),p=h((()=>(0,s.Lk)("div",null,[(0,s.Lk)("div"),(0,s.Lk)("div")],-1))),x=h((()=>(0,s.Lk)("div",{class:"segment-text",id:"calculator-text"}," i started my programming journey in middle school when i found a graphing calculator at a thrift store for $5. at the time i was only interested in it because it let me play games in math class, but it served as a good introduction to code and how programs run. for the next 7 years i spent most of my time in math and chemistry making games on my calculator. ",-1))),w=h((()=>(0,s.Lk)("div",{class:"segment-text",id:"commodore-text"}," noticing my interest in the basic programming language, and being a programmer himself, my dad introduced me to his old commodore 64. i mainly just ran old floppy disks he had laying around, but i also followed a good handful of c64 basic tutorials from old magazines. it was around this same time my father showed me some of his programming books. i read books about data structures and other boring stuff during off campus sports events. at the beginning of high school i even carried a regular expressions reference book in my backpack. ",-1))),f=h((()=>(0,s.Lk)("div",{class:"segment-text",id:"book-text"}," palceholder for books ",-1))),b=h((()=>(0,s.Lk)("div",{class:"segment-text",id:"laptop-text"}," placeholder for laptop ",-1))),v=h((()=>(0,s.Lk)("div",{class:"segment-text",id:"monitor text"}," placehilder for monitor ",-1)));function y(e,t,n,i,a,r){const d=(0,s.g2)("segment-piece");return(0,s.uX)(),(0,s.CE)("div",{class:"home-wrapper",onWheel:t[0]||(t[0]=(0,o.D$)(((...e)=>r.scrollSegment&&r.scrollSegment(...e)),["prevent"]))},[m,(0,s.bF)(d,{id:"title-segment",bg:"0, 0, 255",index:"0",segmentindex:a.segmentIndex},{default:(0,s.k6)((()=>[g,u,p])),_:1},8,["segmentindex"]),(0,s.bF)(d,{bg:"255, 0, 0",index:"1",segmentindex:a.segmentIndex},{default:(0,s.k6)((()=>[x])),_:1},8,["segmentindex"]),(0,s.bF)(d,{bg:"0, 255, 0",index:"2",segmentindex:a.segmentIndex},{default:(0,s.k6)((()=>[w])),_:1},8,["segmentindex"]),(0,s.bF)(d,{bg:"255, 255, 0",index:"3",segmentindex:a.segmentIndex},{default:(0,s.k6)((()=>[f])),_:1},8,["segmentindex"]),(0,s.bF)(d,{bg:"255, 0, 255",index:"4",segmentindex:a.segmentIndex},{default:(0,s.k6)((()=>[b])),_:1},8,["segmentindex"]),(0,s.bF)(d,{bg:"0, 255, 255",index:"5",segmentindex:a.segmentIndex},{default:(0,s.k6)((()=>[v])),_:1},8,["segmentindex"])],32)}const S=["index","bg"];function k(e,t,n,o,i,a){return(0,s.uX)(),(0,s.CE)("div",{class:"segment-piece",index:n.index,bg:n.bg},[(0,s.RG)(e.$slots,"default",{},void 0,!0)],8,S)}var P={name:"SegmentPiece",props:["bg","index","segmentindex"],methods:{setBg(){const e=void 0===this.bg?"255, 255, 255":this.bg;this.$el.style.backgroundColor=`rgba(${e}, .2)`},handleScroll(){this.$el.style.top=-100*(this.segmentindex-this.index)+"vh"}},mounted(){this.handleScroll()},watch:{segmentindex(){this.handleScroll()}}};const z=(0,a.A)(P,[["render",k],["__scopeId","data-v-7bde384c"]]);var I=z,Y=n(8776),E=n(1353),M=n(8640),j=n(3235),L=n(6541),O=n(8068),R={name:"HomeView",data(){return{segmentIndex:0,scrollStamp:0,touchYStart:0,touchYEnd:0,mobile:!1,outline:[],camera:{posSpeed:15,rotSpeed:1,pos:{x:0,y:800,z:1e3},rot:{x:-20,y:0,z:0},tPos:{x:0,y:800,z:1e3},tRot:{x:-20,y:0,z:0}}}},methods:{scrollSegment(e){e.stopPropagation(),e.timeStamp<this.scrollStamp+1e3||(e.wheelDeltaY<-10&&this.handleSegment(1),e.wheelDeltaY>10&&this.handleSegment(-1),this.scrollStamp=e.timeStamp)},handleSegment(e){this.segmentIndex+=e;const t=document.querySelectorAll(".segment-piece").length-1;this.segmentIndex<0&&(this.segmentIndex=0),this.segmentIndex>t&&(this.segmentIndex=t)},changeBg(e,t){const n=document.querySelector(`[index="${t}"]`).getAttribute("bg"),o=document.querySelector(`[index="${e}"]`).getAttribute("bg");console.log(n,o),document.querySelector(".home-wrapper").style.backgroundColor=`rgba(${o}, .2)`},initBg(){const e=new E.B,t=document.querySelector("#bg"),n=new Y.Z58,o=new Y.ubm(50,window.innerWidth/window.innerHeight,150,1e3),s=new Y.WTh(o);n.add(s);const i=o;n.add(i);const a=new Y.$p8(16777215);n.add(a);const r=(new Y.Tap).load("assets/textures/carpet.jpg");r.wrapS=Y.GJx,r.wrapT=Y.GJx,r.repeat.set(45,45);const d=new Y.eaF(new Y.bdM(1e4,1e4,100,100),new Y.V9B({side:Y.$EB,wireframe:!1,map:r}));d.position.x=0,d.position.y=0,d.position.z=0,n.add(d),d.lookAt(0,1,0);const c=(new Y.Tap).load("assets/textures/wood4.jpg");c.wrapS=Y.GJx,c.wrapT=Y.GJx,c.repeat.set(45,45);const l=new Y.eaF(new Y.bdM(1e4,1e4,100,100),new Y.V9B({map:c,side:Y.$EB,wireframe:!1}));let h,m,g,u,p,x,w;l.position.z=-400,n.add(l),l.lookAt(0,0,1),e.load("assets/models/desk.glb",(e=>(e=e.scene,h=e,n.add(e),e.scale.set(75,75,75),e.rotateY(1.570795),e.position.set(-45,0,50),h)),(e=>{console.log(e.loaded)}),(e=>{console.log(e)})),e.load("assets/models/calc.glb",(e=>{e=e.scene,m=e,n.add(e),e.scale.set(5,5,5),e.position.set(315,310,25)}),(e=>{console.log(e.loaded)}),(e=>{console.log(e)})),e.load("assets/models/c64.glb",(e=>{e=e.scene,g=e,n.add(e),e.scale.set(50,50,50),e.position.set(-100,660,610),e.rotateZ(Math.PI/180*0),e.rotateY(Math.PI/180*10),e.rotateX(Math.PI/180*-30)}),(e=>{console.log(e.loaded)}),(e=>{console.log(e)})),e.load("assets/models/c64monitor.glb",(e=>{e=e.scene,u=e,n.add(e),e.scale.set(400,400,400),e.position.set(-250,350,-160),e.rotateZ(Math.PI/180*0),e.rotateY(Math.PI/180*10)}),(e=>{console.log(e.loaded)}),(e=>{console.log(e)})),e.load("assets/models/bookshelf.glb",(e=>{e=e.scene,p=e,n.add(e),e.scale.set(400,400,400),e.position.set(700,0,-200)}),(e=>{console.log(e.loaded)}),(e=>{console.log(e)})),e.load("assets/models/laptop.glb",(e=>{e=e.scene,x=e,n.add(e),e.scale.set(100,100,100),e.position.set(20,280,-90),e.rotateY(Math.PI/180*180)}),(e=>{console.log(e.loaded)}),(e=>{console.log(e)})),e.load("assets/models/monitor.glb",(e=>{e=e.scene,w=e,n.add(e),e.scale.set(.35,.35,.35),e.position.set(220,322,-140),e.rotateY(Math.PI/180*-100)}),(e=>{console.log(e.loaded)}),(e=>{console.log(e)}));const f=new Y.JeP({antialias:!0,gammaOutput:!0,alpha:!0});f.setPixelRatio(window.devicePixelRatio),f.setSize(window.innerWidth,window.innerHeight),f.setClearColor(16488422,0);const b=new M.s(f),v=new j.i(6,n,i);b.addPass(v);const y=new L.G(new Y.I9Y(window.innerWidth,window.innerHeight),n,i);b.addPass(y);const S=new O.X;function k(){requestAnimationFrame(k),P()}b.addPass(S),y.edgeStrength=50,t.appendChild(f.domElement);const P=()=>{o.position.set(this.camera.pos.x,this.camera.pos.y,this.camera.pos.z),o.near=.01,o.far=5e3,o.updateProjectionMatrix(),0===this.segmentIndex&&(this.outline=[]),1===this.segmentIndex&&(this.outline=[m]),2===this.segmentIndex&&(this.outline=[g,u]),3===this.segmentIndex&&(this.outline=[p]),4===this.segmentIndex&&(this.outline=[x]),5===this.segmentIndex&&(this.outline=[w]),y.selectedObjects=this.outline,i.up.set(0,1,0),i.rotation.set(this.camera.rot.x*(Math.PI/180),this.camera.rot.y*(Math.PI/180),this.camera.rot.z*(Math.PI/180)),s.update(),s.visible=!1;const e=["x","y","z"];e.forEach((e=>{const t=this.camera.pos,n=this.camera.tPos,o=this.camera.rot,s=this.camera.tRot;if(t[e]!==n[e]){if(t[e]>n[e]&&t[e]-this.camera.posSpeed<=n[e])return void(t[e]=n[e]);if(t[e]<n[e]&&t[e]+this.camera.posSpeed>=n[e])return void(t[e]=n[e]);t[e]>n[e]?t[e]-=this.camera.posSpeed:t[e]+=this.camera.posSpeed}if(o[e]!==s[e]){if(o[e]>s[e]&&o[e]-this.camera.rotSpeed<=s[e])return void(o[e]=s[e]);if(o[e]<s[e]&&o[e]+this.camera.rotSpeed>=s[e])return void(o[e]=s[e]);o[e]>s[e]?o[e]-=this.camera.rotSpeed:o[e]+=this.camera.rotSpeed}})),window.addEventListener("resize",(()=>{o.aspect=window.innerWidth/window.innerHeight,o.updateProjectionMatrix(),f.setSize(window.innerWidth,window.innerHeight)})),f.setViewport(0,0,window.innerWidth,window.innerHeight),b.setSize(window.innerWidth,window.innerHeight),b.render()};k()},handleSwipe(){this.touchYStart>this.touchYEnd&&this.handleSegment(1),this.touchYStart<this.touchYEnd&&this.handleSegment(-1)}},components:{SegmentPiece:I},mounted(){this.initBg(),document.addEventListener("touchstart",(e=>{this.touchYStart=e.changedTouches[0].screenY})),document.addEventListener("touchend",(e=>{this.touchYEnd=e.changedTouches[0].screenY,this.handleSwipe()})),this.mobile=window.innerHeight>window.innerWidth,this.mobile&&(this.camera.pos={x:0,y:800,z:1700},this.camera.tPos={x:0,y:800,z:1700})},watch:{segmentIndex(e,t){this.changeBg(e,t),0===e&&(this.mobile?(this.camera.tPos={x:0,y:800,z:1700},this.camera.tRot={x:-20,y:0,z:0}):(this.camera.tPos={x:0,y:800,z:1e3},this.camera.tRot={x:-20,y:0,z:0})),1==e&&(this.mobile?(this.camera.tPos={x:315,y:480,z:80},this.camera.tRot={x:-90,y:0,z:0}):(this.camera.tPos={x:400,y:480,z:30},this.camera.tRot={x:-90,y:0,z:0})),2==e&&(this.mobile?(this.camera.tPos={x:-100,y:550,z:400},this.camera.tRot={x:-10,y:18,z:0}):(this.camera.tPos={x:-100,y:700,z:300},this.camera.tRot={x:-40,y:30,z:20})),3==e&&(this.mobile?(this.camera.tPos={x:550,y:900,z:300},this.camera.tRot={x:-10,y:-30,z:-5}):(this.camera.tPos={x:550,y:700,z:300},this.camera.tRot={x:-10,y:-30,z:-5}))}}};const $=(0,a.A)(R,[["render",y],["__scopeId","data-v-8acc8cc4"]]);var _=$;const B=[{path:"/",name:"home",component:_}],W=(0,l.aE)({history:(0,l.Bt)(),routes:B});var F=W;(0,o.Ef)(c).use(F).mount("#app")}},t={};function n(o){var s=t[o];if(void 0!==s)return s.exports;var i=t[o]={exports:{}};return e[o].call(i.exports,i,i.exports,n),i.exports}n.m=e,function(){var e=[];n.O=function(t,o,s,i){if(!o){var a=1/0;for(l=0;l<e.length;l++){o=e[l][0],s=e[l][1],i=e[l][2];for(var r=!0,d=0;d<o.length;d++)(!1&i||a>=i)&&Object.keys(n.O).every((function(e){return n.O[e](o[d])}))?o.splice(d--,1):(r=!1,i<a&&(a=i));if(r){e.splice(l--,1);var c=s();void 0!==c&&(t=c)}}return t}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[o,s,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={524:0};n.O.j=function(t){return 0===e[t]};var t=function(t,o){var s,i,a=o[0],r=o[1],d=o[2],c=0;if(a.some((function(t){return 0!==e[t]}))){for(s in r)n.o(r,s)&&(n.m[s]=r[s]);if(d)var l=d(n)}for(t&&t(o);c<a.length;c++)i=a[c],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(l)},o=self["webpackChunkmhess42"]=self["webpackChunkmhess42"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[504],(function(){return n(1940)}));o=n.O(o)})();
//# sourceMappingURL=app.c69dbe56.js.map