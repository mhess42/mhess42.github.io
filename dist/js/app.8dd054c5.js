(function(){"use strict";var __webpack_modules__={3257:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){var _scripts_Terminal_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(2749),_components_SegmentPiece_vue__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(2893),three__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(8776),three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(1353),three_examples_jsm_loaders_DRACOLoader__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(5533),three_addons_postprocessing_EffectComposer_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(8640),three_addons_postprocessing_RenderPixelatedPass_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(3235),three_addons_postprocessing_OutlinePass_js__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(6541),three_addons_postprocessing_OutputPass_js__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(8068),three_addons_postprocessing_ClearPass_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(5366),three_addons_libs_stats_module_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(5687);__webpack_exports__.A={name:"HomeView",components:{SegmentPiece:_components_SegmentPiece_vue__WEBPACK_IMPORTED_MODULE_1__.A},data(){return{segmentIndex:0,scrollStamp:0,touchYStart:0,touchYEnd:0,mobile:!1,outline:[],loaded:!1,loadProgress:0,terminal:null,vaporwave:!1,showCredits:!1,credits:'"Books" (https://skfb.ly/6xZGL) by igor-tkachenko is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).\r\n"Simple Book Shelf | [FREE] | Agustin Honnun" (https://skfb.ly/6RJDF) by Agustín Hönnun is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).\r\n"Laptop AlienPredator" (https://skfb.ly/6SzrD) by Vivien Deroche is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).\r\n"Office Monitor / Workstation Monitor" (https://skfb.ly/6VD8p) by DatSketch is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).\r\n"Retro PC Monitor" (https://skfb.ly/oQSWE) by arti.aaa is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).\r\n"Commodore 64" (https://skfb.ly/6XLVO) by Digital Heritage Australia is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).\r\n"Wood Desk Table Interior 1" (https://skfb.ly/6Bqzx) by tofanarahman is licensed under Creative Commons Attribution-NonCommercial (http://creativecommons.org/licenses/by-nc/4.0/).',sv_cheats:0,camera:{posSpeed:15,rotSpeed:1,pos:{x:0,y:800,z:1e3},rot:{x:-20,y:0,z:0},tPos:{x:0,y:800,z:1e3},tRot:{x:-20,y:0,z:0},sv_cheats:{rotation:{x:0,y:0,z:0},rotationSpeed:2,position:{x:0,y:0,z:0},positionSpeed:6}}}},methods:{scrollSegment(e){e.stopPropagation(),e.timeStamp<this.scrollStamp+1e3||(e.wheelDeltaY<-10&&this.handleSegment(1),e.wheelDeltaY>10&&this.handleSegment(-1),this.scrollStamp=e.timeStamp)},handleSegment(e){this.segmentIndex+=e;const t=5;this.segmentIndex<0&&(this.segmentIndex=0),this.segmentIndex>t&&(this.segmentIndex=t)},changeBg(e){let t="0, 0, 0";0===e&&(t="255, 0, 0"),1===e&&(t="0, 255, 0"),2===e&&(t="0, 0, 255"),3===e&&(t="255, 255, 0"),4===e&&(t="0, 255, 255"),5===e&&(t="255, 0, 255"),document.querySelector(".home-wrapper").style.backgroundColor=`rgba(${t}, .2)`},load(e,t){this.loadProgress=e/t*100},initBg(){const e=new three__WEBPACK_IMPORTED_MODULE_2__.KPJ;e.onProgress=(e,t,s)=>{this.load(t,s)},e.onLoad=()=>{this.loaded=!0};const t=new three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_3__.B(e),s=new three_examples_jsm_loaders_DRACOLoader__WEBPACK_IMPORTED_MODULE_4__.Z;s.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/"),s.setDecoderConfig({type:"js"}),t.setDRACOLoader(s);const i=document.querySelector("#bg"),a=new three__WEBPACK_IMPORTED_MODULE_2__.Z58,n=new three__WEBPACK_IMPORTED_MODULE_2__.ubm(50,window.innerWidth/window.innerHeight,150,1e3),o=new three__WEBPACK_IMPORTED_MODULE_2__.WTh(n);a.add(o);const r=n;a.add(r),this.cameraRig=r;const _=new three__WEBPACK_IMPORTED_MODULE_2__.$p8(16777215);a.add(_);const d=new three_addons_libs_stats_module_js__WEBPACK_IMPORTED_MODULE_5__.A,c=(new three__WEBPACK_IMPORTED_MODULE_2__.Tap).load("assets/textures/carpet-min.jpg"),h=new three__WEBPACK_IMPORTED_MODULE_2__.V9B({side:three__WEBPACK_IMPORTED_MODULE_2__.$EB,map:c});c.wrapS=three__WEBPACK_IMPORTED_MODULE_2__.GJx,c.wrapT=three__WEBPACK_IMPORTED_MODULE_2__.GJx,c.repeat.set(45,45);const l=new three__WEBPACK_IMPORTED_MODULE_2__.eaF(new three__WEBPACK_IMPORTED_MODULE_2__.bdM(1e4,1e4,100,100),h);l.position.x=0,l.position.y=0,l.position.z=0,a.add(l),l.lookAt(0,1,0);const m=(new three__WEBPACK_IMPORTED_MODULE_2__.Tap).load("assets/textures/wood4-min.jpg"),p=new three__WEBPACK_IMPORTED_MODULE_2__.V9B({map:m,side:three__WEBPACK_IMPORTED_MODULE_2__.$EB});m.wrapS=three__WEBPACK_IMPORTED_MODULE_2__.GJx,m.wrapT=three__WEBPACK_IMPORTED_MODULE_2__.GJx,m.repeat.set(45,45);const u=new three__WEBPACK_IMPORTED_MODULE_2__.eaF(new three__WEBPACK_IMPORTED_MODULE_2__.bdM(1e4,1e4,100,100),p);u.position.z=-400,a.add(u),u.lookAt(0,0,1);const g=document.getElementById("monitor-canvas"),b=new three__WEBPACK_IMPORTED_MODULE_2__.GOR(g);console.log(b);const w=new three__WEBPACK_IMPORTED_MODULE_2__.eaF(new three__WEBPACK_IMPORTED_MODULE_2__.bdM(284,145,5,5),new three__WEBPACK_IMPORTED_MODULE_2__.V9B({map:b,side:three__WEBPACK_IMPORTED_MODULE_2__.$EB,wireframe:!1}));let E,v,P,x,k,y,f,M;w.position.set(222.5,421,-102.7),w.rotation.y=Math.PI/180*-10,a.add(w),t.load("assets/models/desk-compressed.glb",(e=>(e=e.scene,E=e,a.add(e),e.scale.set(75,75,75),e.rotateY(1.570795),e.position.set(-45,0,50),E)),(e=>e),(e=>{console.log(e)})),t.load("assets/models/calc.glb",(e=>{e=e.scene,v=e,a.add(e),e.scale.set(5,5,5),e.position.set(315,310,25)}),(e=>e),(e=>{console.log(e)})),t.load("assets/models/c64-compressed.glb",(e=>{e=e.scene,P=e,a.add(e),e.scale.set(50,50,50),e.position.set(-100,660,610),e.rotateZ(Math.PI/180*0),e.rotateY(Math.PI/180*10),e.rotateX(Math.PI/180*-30)}),(e=>e),(e=>{console.log(e)})),t.load("assets/models/c64monitor-compressed.glb",(e=>{e=e.scene,x=e,a.add(e),e.scale.set(400,400,400),e.position.set(-250,350,-160),e.rotateZ(Math.PI/180*0),e.rotateY(Math.PI/180*10)}),(e=>e),(e=>{console.log(e)})),t.load("assets/models/bookshelf-compressed.glb",(e=>(e=e.scene,k=e,a.add(e),e.scale.set(400,400,400),e.position.set(700,0,-200),k)),(e=>e),(e=>{console.log(e)})),t.load("assets/models/books.glb",(e=>(e=e.scene,y=e,a.add(e),e.scale.set(57,57,57),e.rotation.y=Math.PI/180*90,e.position.set(860,480,-200),y)),(e=>e),(e=>{console.log(e)})),t.load("assets/models/laptop-compressed.glb",(e=>{e=e.scene,f=e,a.add(e),e.scale.set(100,100,100),e.position.set(20,280,-90),e.rotateY(Math.PI/180*180)}),(e=>e),(e=>{console.log(e)})),t.load("assets/models/monitor.glb",(e=>{e=e.scene,M=e,a.add(e),e.scale.set(.35,.35,.35),e.position.set(220,322,-140),e.rotateY(Math.PI/180*-100)}),(e=>e),(e=>{console.log(e)}));const O=new three__WEBPACK_IMPORTED_MODULE_2__.JeP({alpha:!0});O.setPixelRatio(window.devicePixelRatio),O.setSize(window.innerWidth,window.innerHeight),O.autoClear=!0;const D=new three_addons_postprocessing_EffectComposer_js__WEBPACK_IMPORTED_MODULE_6__.s(O,new three__WEBPACK_IMPORTED_MODULE_2__.nWS(window.innerWidth,window.innerHeight,{stencilBuffer:!0})),I=new three_addons_postprocessing_ClearPass_js__WEBPACK_IMPORTED_MODULE_7__.N,C=new three_addons_postprocessing_RenderPixelatedPass_js__WEBPACK_IMPORTED_MODULE_8__.i(3,a,r),L=new three_addons_postprocessing_OutlinePass_js__WEBPACK_IMPORTED_MODULE_9__.G(new three__WEBPACK_IMPORTED_MODULE_2__.I9Y(window.innerWidth,window.innerHeight),a,r),A=new three_addons_postprocessing_OutputPass_js__WEBPACK_IMPORTED_MODULE_10__.X;function R(){requestAnimationFrame(R),d.update(),B()}L.edgeStrength=50,D.addPass(I),D.addPass(C),D.addPass(L),D.addPass(A),i.appendChild(O.domElement),i.appendChild(d.dom);const B=()=>{if(n.position.set(this.camera.pos.x,this.camera.pos.y,this.camera.pos.z),n.near=.01,n.far=5e3,n.updateProjectionMatrix(),b.needsUpdate=!0,this.vaporwave?(h.setValues({color:255,wireframe:!0,map:null}),u.visible=!1):(h.setValues({color:16777215,wireframe:!1,map:c}),u.visible=!0),1==this.sv_cheats?d.dom.style.opacity="0.9":d.dom.style.opacity="0",h.needsUpdate=!0,p.needsUpdate=!0,0===this.segmentIndex&&(this.outline=[]),1===this.segmentIndex&&(this.outline=[v]),2===this.segmentIndex&&(this.outline=[P,x]),3===this.segmentIndex&&(this.outline=[y]),4===this.segmentIndex&&(this.outline=[f]),5===this.segmentIndex&&(this.outline=[M]),42===this.segmentIndex&&(this.outline=[]),L.selectedObjects=this.outline,r.up.set(0,1,0),r.rotation.set(this.camera.rot.x*(Math.PI/180),this.camera.rot.y*(Math.PI/180),this.camera.rot.z*(Math.PI/180)),o.update(),o.visible=!1,1==this.sv_cheats){if(5==this.segmentIndex)n.rotation.set(Math.PI/180*-3,Math.PI/180*-10,Math.PI/180*-.45);else{n.position.set(this.camera.sv_cheats.position.x,this.camera.sv_cheats.position.y,this.camera.sv_cheats.position.z);const e=new three__WEBPACK_IMPORTED_MODULE_2__.Pq0(1,0,0),t=new three__WEBPACK_IMPORTED_MODULE_2__.Pq0(0,1,0),s=new three__WEBPACK_IMPORTED_MODULE_2__.Pq0(0,0,1);r.rotateOnWorldAxis(e,this.camera.sv_cheats.rotation.x*(Math.PI/180)),r.rotateOnWorldAxis(t,this.camera.sv_cheats.rotation.y*(Math.PI/180)),r.rotateOnWorldAxis(s,this.camera.sv_cheats.rotation.z*(Math.PI/180))}return O.clear(),void D.render()}const e=["x","y","z"];e.forEach((e=>{const t=this.camera.pos,s=this.camera.tPos,i=this.camera.rot,a=this.camera.tRot;if(t[e]!==s[e]){if(t[e]>s[e]&&t[e]-this.camera.posSpeed<=s[e])return void(t[e]=s[e]);if(t[e]<s[e]&&t[e]+this.camera.posSpeed>=s[e])return void(t[e]=s[e]);t[e]>s[e]?t[e]-=this.camera.posSpeed:t[e]+=this.camera.posSpeed}if(i[e]!==a[e]){if(i[e]>a[e]&&i[e]-this.camera.rotSpeed<=a[e])return void(i[e]=a[e]);if(i[e]<a[e]&&i[e]+this.camera.rotSpeed>=a[e])return void(i[e]=a[e]);i[e]>a[e]?i[e]-=this.camera.rotSpeed:i[e]+=this.camera.rotSpeed}})),window.addEventListener("resize",(()=>{n.aspect=window.innerWidth/window.innerHeight,n.updateProjectionMatrix(),O.setSize(window.innerWidth,window.innerHeight)})),O.setViewport(0,0,window.innerWidth,window.innerHeight),D.setSize(window.innerWidth,window.innerHeight),O.clear(),D.render()};R()},handleSwipe(){this.touchYStart>this.touchYEnd&&this.handleSegment(1),this.touchYStart<this.touchYEnd&&this.handleSegment(-1)},termCallback(data){return void 0!==data.vaporwave&&(this.vaporwave=data.vaporwave),data.credits&&(this.showCredits=!0,setTimeout((()=>{this.showCredits=!1}),5e3)),void 0!==data.sv_cheats&&(this.sv_cheats=data.sv_cheats,this.camera.sv_cheats.position={...this.camera.pos}),data.debug?eval(`this.${data.debug.join(".")}`):data.debugset?eval(`this.${data.debugset.slice(0,data.debugset.length-1).join(".")} = ${data.debugset[data.debugset.length-1]}`):void 0}},mounted(){this.initBg(),this.terminal=new _scripts_Terminal_js__WEBPACK_IMPORTED_MODULE_0__.A(document.getElementById("monitor-canvas").getContext("2d"),1280,720,this.termCallback),this.terminal.init(),this.terminal.paused=!0,document.addEventListener("touchstart",(e=>{this.touchYStart=e.changedTouches[0].screenY})),document.addEventListener("touchend",(e=>{this.touchYEnd=e.changedTouches[0].screenY,0==this.sv_cheats&&this.handleSwipe()})),document.addEventListener("keydown",(e=>{if(0==this.sv_cheats)"ArrowUp"!=e.key&&"ArrowLeft"!=e.key||this.handleSegment(-1),"ArrowDown"!=e.key&&"ArrowRight"!=e.key||this.handleSegment(1),"5"==e.key&&(this.segmentIndex=5);else{if("Escape"==e.key&&42!=this.segmentIndex?this.segmentIndex=42:"Escape"==e.key&&42==this.segmentIndex&&(this.segmentIndex=5),42!==this.segmentIndex)return;"ArrowUp"==e.key&&(this.camera.sv_cheats.rotation.x+=this.camera.sv_cheats.rotationSpeed),"ArrowDown"==e.key&&(this.camera.sv_cheats.rotation.x-=this.camera.sv_cheats.rotationSpeed),"ArrowLeft"==e.key&&(this.camera.sv_cheats.rotation.y+=this.camera.sv_cheats.rotationSpeed),"ArrowRight"==e.key&&(this.camera.sv_cheats.rotation.y-=this.camera.sv_cheats.rotationSpeed),"q"==e.key&&(this.camera.sv_cheats.rotation.z+=this.camera.sv_cheats.rotationSpeed),"e"==e.key&&(this.camera.sv_cheats.rotation.z-=this.camera.sv_cheats.rotationSpeed),"w"==e.key&&(this.camera.sv_cheats.position.z-=this.camera.sv_cheats.positionSpeed),"s"==e.key&&(this.camera.sv_cheats.position.z+=this.camera.sv_cheats.positionSpeed),"a"==e.key&&(this.camera.sv_cheats.position.x-=this.camera.sv_cheats.positionSpeed),"d"==e.key&&(this.camera.sv_cheats.position.x+=this.camera.sv_cheats.positionSpeed),"z"==e.key&&(this.camera.sv_cheats.position.y-=this.camera.sv_cheats.positionSpeed),"x"==e.key&&(this.camera.sv_cheats.position.y+=this.camera.sv_cheats.positionSpeed)}})),this.mobile=window.innerHeight>window.innerWidth,this.mobile&&(this.camera.pos={x:0,y:800,z:1700},this.camera.tPos={x:0,y:800,z:1700})},watch:{segmentIndex(e){this.changeBg(e),this.terminal.paused=5!==e,0===e&&(this.mobile?(this.camera.tPos={x:0,y:800,z:1700},this.camera.tRot={x:-20,y:0,z:0}):(this.camera.tPos={x:0,y:800,z:1e3},this.camera.tRot={x:-20,y:0,z:0})),1==e&&(this.mobile?(this.camera.tPos={x:315,y:480,z:70},this.camera.tRot={x:-90,y:0,z:0}):(this.camera.tPos={x:400,y:480,z:30},this.camera.tRot={x:-90,y:0,z:0})),2==e&&(this.mobile?(this.camera.tPos={x:-100,y:550,z:400},this.camera.tRot={x:-10,y:18,z:0}):(this.camera.tPos={x:-100,y:700,z:300},this.camera.tRot={x:-40,y:30,z:20})),3==e&&(this.mobile?(this.camera.tPos={x:550,y:720,z:300},this.camera.tRot={x:-40,y:-20,z:-25}):(this.camera.tPos={x:550,y:700,z:300},this.camera.tRot={x:-10,y:-30,z:-5})),4==e&&(this.mobile?(this.camera.tPos={x:-40,y:1e3,z:300},this.camera.tRot={x:-40,y:0,z:0}):(this.camera.tPos={x:0,y:850,z:120},this.camera.tRot={x:-50,y:0,z:0})),5==e&&(this.mobile?(this.camera.tPos={x:100,y:400,z:450},this.camera.tRot={x:0,y:-12.3,z:-.39}):(this.camera.tPos={x:185,y:410,z:110},this.camera.tRot={x:-3,y:-10,z:-.45}))}}}},3923:function(e,t,s){var i=s(5130),a=s(6768);function n(e,t){const s=(0,a.g2)("router-view");return(0,a.uX)(),(0,a.Wv)(s)}var o=s(1241);const r={},_=(0,o.A)(r,[["render",n]]);var d=_,c=s(1387),h=s(4232);const l=e=>((0,a.Qi)("data-v-21883c38"),e=e(),(0,a.jt)(),e),m=l((()=>(0,a.Lk)("div",{id:"bg"},null,-1))),p=l((()=>(0,a.Lk)("canvas",{id:"monitor-canvas",width:"1280",height:"720"},null,-1))),u={key:0,id:"loading-screen"},g={id:"loading-bar-wrapper"},b=l((()=>(0,a.Lk)("span",{id:"loading-text"},"loading",-1))),w=l((()=>(0,a.Lk)("div",{id:"title-header"}," madeline hess ",-1))),E={key:0,id:"title-text"},v=l((()=>(0,a.Lk)("br",null,null,-1))),P={key:1,id:"title-text"},x=l((()=>(0,a.Lk)("div",null,[(0,a.Lk)("div"),(0,a.Lk)("div")],-1))),k=l((()=>(0,a.Lk)("div",{class:"segment-text",id:"calculator-text"}," i started my programming journey in middle school when i found a graphing calculator at a thrift store for $5. at the time i was only interested in it because it let me play games in math class, but it served as a good introduction to code and how programs run. for the next 7 years i spent most of my time in math and chemistry making games on my calculator. ",-1))),y=l((()=>(0,a.Lk)("div",{class:"segment-text",id:"commodore-text"}," noticing my interest in the basic programming language, and being a programmer himself, my dad introduced me to his old commodore 64. i mainly just ran old floppy disks he had laying around, but i also followed a good handful of c64 basic tutorials from old magazines. it was around this same time my father showed me some of his programming books. i read books about data structures and other boring stuff during off campus sports events. at the beginning of high school i even carried a regular expressions reference book in my backpack. ",-1))),f=l((()=>(0,a.Lk)("div",{class:"segment-text",id:"book-text"}," palceholder for books ",-1))),M=l((()=>(0,a.Lk)("div",{class:"segment-text",id:"laptop-text"}," placeholder for laptop ",-1))),O=l((()=>(0,a.Lk)("div",{class:"segment-text",id:"monitor-text"},null,-1))),D={class:"segment-text",id:"credits-text"};function I(e,t,s,n,o,r){const _=(0,a.g2)("segment-piece");return(0,a.uX)(),(0,a.CE)("div",{class:"home-wrapper",onWheel:t[0]||(t[0]=(0,i.D$)(((...e)=>r.scrollSegment&&r.scrollSegment(...e)),["prevent"]))},[m,p,(0,a.bF)(i.eB,{name:"fade"},{default:(0,a.k6)((()=>[o.loaded?(0,a.Q3)("",!0):((0,a.uX)(),(0,a.CE)("div",u,[(0,a.Lk)("div",g,[b,(0,a.Lk)("div",{id:"loading-bar",style:(0,h.Tr)(`width: ${o.loadProgress}%`)},null,4)])]))])),_:1}),(0,a.bF)(i.eB,{name:"appear"},{default:(0,a.k6)((()=>[0===o.segmentIndex?((0,a.uX)(),(0,a.Wv)(_,{key:0,id:"title-segment",bg:"0, 0, 255",index:"0",segmentindex:o.segmentIndex},{default:(0,a.k6)((()=>[w,o.mobile?((0,a.uX)(),(0,a.CE)("div",P," scroll to navigate timeline ")):((0,a.uX)(),(0,a.CE)("div",E,[(0,a.eW)(" scroll or use arrow keys "),v,(0,a.eW)(" to navigate timeline ")])),x])),_:1},8,["segmentindex"])):(0,a.Q3)("",!0)])),_:1}),(0,a.bF)(i.eB,{name:"appear"},{default:(0,a.k6)((()=>[1===o.segmentIndex?((0,a.uX)(),(0,a.Wv)(_,{key:0,bg:"255, 0, 0",index:"1",segmentindex:o.segmentIndex},{default:(0,a.k6)((()=>[k])),_:1},8,["segmentindex"])):(0,a.Q3)("",!0)])),_:1}),(0,a.bF)(i.eB,{name:"appear"},{default:(0,a.k6)((()=>[2===o.segmentIndex?((0,a.uX)(),(0,a.Wv)(_,{key:0,bg:"0, 255, 0",index:"2",segmentindex:o.segmentIndex},{default:(0,a.k6)((()=>[y])),_:1},8,["segmentindex"])):(0,a.Q3)("",!0)])),_:1}),(0,a.bF)(i.eB,{name:"appear"},{default:(0,a.k6)((()=>[3===o.segmentIndex?((0,a.uX)(),(0,a.Wv)(_,{key:0,bg:"255, 255, 0",index:"3",segmentindex:o.segmentIndex},{default:(0,a.k6)((()=>[f])),_:1},8,["segmentindex"])):(0,a.Q3)("",!0)])),_:1}),(0,a.bF)(i.eB,{name:"appear"},{default:(0,a.k6)((()=>[4===o.segmentIndex?((0,a.uX)(),(0,a.Wv)(_,{key:0,bg:"255, 0, 255",index:"4",segmentindex:o.segmentIndex},{default:(0,a.k6)((()=>[M])),_:1},8,["segmentindex"])):(0,a.Q3)("",!0)])),_:1}),(0,a.bF)(i.eB,{name:"appear"},{default:(0,a.k6)((()=>[5===o.segmentIndex?((0,a.uX)(),(0,a.Wv)(_,{key:0,bg:"0, 255, 255",index:"5",segmentindex:o.segmentIndex},{default:(0,a.k6)((()=>[O])),_:1},8,["segmentindex"])):(0,a.Q3)("",!0)])),_:1}),(0,a.bF)(i.eB,{name:"appear"},{default:(0,a.k6)((()=>[o.showCredits?((0,a.uX)(),(0,a.Wv)(_,{key:0,bg:"0, 255, 255",index:"69",segmentindex:o.segmentIndex},{default:(0,a.k6)((()=>[(0,a.Lk)("div",D,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(o.credits.split("\n"),(e=>((0,a.uX)(),(0,a.CE)("div",{key:e},(0,h.v_)(e),1)))),128))])])),_:1},8,["segmentindex"])):(0,a.Q3)("",!0)])),_:1})],32)}var C=s(3257);const L=(0,o.A)(C.A,[["render",I],["__scopeId","data-v-21883c38"]]);var A=L;const R=[{path:"/",name:"home",component:A}],B=(0,c.aE)({history:(0,c.Bt)(),routes:R});var W=B;(0,i.Ef)(d).use(W).mount("#app")},2749:function(e,t,s){var i=s(1114);s(4114);class a{constructor(e,t,s,a){(0,i.A)(this,"history",["type 'help' for help"]),(0,i.A)(this,"input",""),(0,i.A)(this,"path","~"),(0,i.A)(this,"lineHeight",50),(0,i.A)(this,"cursorVisible",!0),(0,i.A)(this,"paused",!1),this.ctx=e,this.ctx.width=t,this.ctx.height=s,this.callback=a}init(){this.ctx.font="48px ariel",document.addEventListener("keydown",(e=>{this.handleInput(e.key)})),setInterval((()=>{this.cursorVisible=!this.cursorVisible,this.blit()}),500)}handleInput(e){if(this.paused)return;const t="abcdefghijklmnopqrstuvwxyz1234567890-=`~!@#$%^&*()_+[]{},.<>/?\\| ";"Backspace"===e&&(this.input=this.input.slice(0,this.input.length-1)),"Enter"===e&&this.handleCommand(),t.includes(e.toLowerCase())&&(this.input+=e),this.blit()}handleCommand(){let e=this.input.split(" ");this.history.push(`user:${this.path}$  ${this.input}`),this.input="";const t=e[0];switch(e=e.slice(1),t){case"help":this.addLine("run 'credits' to view the cc attributions"),this.addLine("run 'vapor' to change in and out of vaporwave mode");break;case"clear":this.history=[];break;case"echo":this.addLine(e.join(" "));break;case"vapor":if(!e[0]||"true"!==e[0].toLowerCase()&&"false"!==e[0].toLowerCase())return void this.addLine("vapor only accepts arguments 'true' or 'false'");"true"===e[0].toLowerCase()?(this.addLine("enabling vaporwave mode"),this.callback({vaporwave:!0})):(this.addLine("disabling vaporwave mode"),this.callback({vaporwave:!1}));break;case"credits":this.callback({credits:!0});break;case"sv_cheats":if(!e[0]||!"01".includes(e[0]))return void this.addLine("boolean only accepts 1 or 0");"1"==e[0]?(this.addLine("enabling cheats"),this.addLine("double click or press escape to focus the monitor"),this.callback({sv_cheats:1})):(this.addLine("disabling cheats"),this.callback({sv_cheats:0}));break;case"debug":if(!e[0])return;this.addLine(this.callback({debug:e}));break;case"debugset":if(e.length<2)return;this.addLine(this.callback({debugset:e}));break;default:this.addLine(`command '${t}' not recognized`)}}addLine(e){this.history.push(e)}blit(){this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.ctx.width,this.ctx.height),this.ctx.fillStyle="white";const e=this.cursorVisible?"|":"";this.ctx.fillText(`user:${this.path}$  ${this.input}${e}`,this.lineHeight,this.ctx.height-this.lineHeight),this.history.slice().reverse().forEach(((e,t)=>{this.ctx.fillText(e,this.lineHeight,this.ctx.height-this.lineHeight*(t+2))}))}}t.A=a},2893:function(e,t,s){s.d(t,{A:function(){return d}});var i=s(6768);const a=["index","bg"];function n(e,t,s,n,o,r){return(0,i.uX)(),(0,i.CE)("div",{class:"segment-piece",index:s.index,bg:s.bg},[(0,i.RG)(e.$slots,"default",{},void 0,!0)],8,a)}var o={name:"SegmentPiece",props:["bg","index","segmentindex"],methods:{setBg(){const e=void 0===this.bg?"255, 255, 255":this.bg;this.$el.style.backgroundColor=`rgba(${e}, .2)`},handleScroll(){}},mounted(){this.handleScroll()},watch:{segmentindex(){this.handleScroll()}}},r=s(1241);const _=(0,r.A)(o,[["render",n],["__scopeId","data-v-341249f8"]]);var d=_}},__webpack_module_cache__={};function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var s=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e].call(s.exports,s,s.exports,__webpack_require__),s.exports}__webpack_require__.m=__webpack_modules__,function(){var e=[];__webpack_require__.O=function(t,s,i,a){if(!s){var n=1/0;for(d=0;d<e.length;d++){s=e[d][0],i=e[d][1],a=e[d][2];for(var o=!0,r=0;r<s.length;r++)(!1&a||n>=a)&&Object.keys(__webpack_require__.O).every((function(e){return __webpack_require__.O[e](s[r])}))?s.splice(r--,1):(o=!1,a<n&&(n=a));if(o){e.splice(d--,1);var _=i();void 0!==_&&(t=_)}}return t}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[s,i,a]}}(),function(){__webpack_require__.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return __webpack_require__.d(t,{a:t}),t}}(),function(){__webpack_require__.d=function(e,t){for(var s in t)__webpack_require__.o(t,s)&&!__webpack_require__.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}}(),function(){__webpack_require__.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={524:0};__webpack_require__.O.j=function(t){return 0===e[t]};var t=function(t,s){var i,a,n=s[0],o=s[1],r=s[2],_=0;if(n.some((function(t){return 0!==e[t]}))){for(i in o)__webpack_require__.o(o,i)&&(__webpack_require__.m[i]=o[i]);if(r)var d=r(__webpack_require__)}for(t&&t(s);_<n.length;_++)a=n[_],__webpack_require__.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return __webpack_require__.O(d)},s=self["webpackChunkmhess42"]=self["webpackChunkmhess42"]||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}();var __webpack_exports__=__webpack_require__.O(void 0,[504],(function(){return __webpack_require__(3923)}));__webpack_exports__=__webpack_require__.O(__webpack_exports__)})();
//# sourceMappingURL=app.8dd054c5.js.map