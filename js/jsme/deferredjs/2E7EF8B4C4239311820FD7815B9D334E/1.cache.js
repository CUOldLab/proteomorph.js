$wnd.jsme.runAsyncCallback1('var vP="Any",wP="Aromatic",xP="Nonring",yP="Reset",zP="Ring";function AP(a,b){if(0>b||b>=a.pb.options.length)throw new cv;}function BP(a,b){AP(a,b);return a.pb.options[b].value}function CP(){this.pb=$doc.createElement("select");this.pb[Zc]="gwt-ListBox"}r(371,346,Zh,CP);function DP(){DP=s}\nfunction EP(a,b){if(null==b)throw new Br("Missing message: awt.103");var c=-1,d,e,f;f=a.rc.a.pb;e=$doc.createElement(wf);e.text=b;e.removeAttribute("bidiwrapped");e.value=b;d=f.options.length;(0>c||c>d)&&(c=d);c==d?f.add(e,null):(c=f.options[c],f.add(e,c))}function FP(){DP();Zx.call(this);new Gi;this.rc=new GP(($x(),this))}r(435,422,{46:1,48:1,55:1,67:1,73:1},FP);_.ie=function(){return dy(this.rc,this)};\n_.xe=function(){return(null==this.oc&&(this.oc=Lx(this)),this.oc)+ya+this.zc+ya+this.Ac+ya+this.wc+Vg+this.mc+(this.vc?l:",hidden")+",current="+BP(this.rc.a,this.rc.a.pb.selectedIndex)};function HP(){IL.call(this,7)}r(448,1,Vh,HP);function IP(a){KL.call(this,a,0)}r(453,422,ki,IP);function JP(a){var b=a.j;hM(a.rc.c,b.a,b.b);!Nx(a)&&cL(a);YK(a)}\nfunction KP(a,b,c){eM.call(this);this.rc&&DL(this.rc.c,!1);AL(this,!1);my(this,new IL(0));a=new KL(a,1);Z(this,a,null);a=new ry;Z(a,this.i,null);Z(this,a,null);b&&(this.j=Ox(b),zL(this),dM(this.j,~~(Vm(b.dc.pb,tf)/2)-~~(this.wc/2),~~(Vm(b.dc.pb,sf)/2)-~~(this.mc/2)));c&&Y(this,c)}r(586,587,XH,KP);_.vg=function(){return"OK"};r(594,595,vh);_.Tc=function(){JP(new KP(this.b,this.a,(jB(),lB)))};r(597,595,vh);_.Tc=function(){!this.a.Mb?this.a.Mb=new LP(this.a):this.a.Mb.rc.c.hb?WM(this.a.Mb.rc.c):JP(this.a.Mb)};\nfunction MP(a,b){UK(b)==a.a?Y(b,(Ny(),Wy)):Y(b,a.a)}\nfunction NP(a){var b,c,d,e;e=l;d=!1;UK(OP)!=a.a?(e=wa,d=!0):UK(PP)!=a.a?(e="!#6",d=!0):UK(QP)!=a.a?(Y(RP,(Ny(),Wy)),Y(SP,Wy),Y(TP,Wy),Y(UP,Wy),e="F,Cl,Br,I"):(b=UK(VP)!=a.a,c=UK(WP)!=a.a,UK(XP)!=a.a&&(b?e+="c,":c?e+="C,":e+="#6,"),UK(YP)!=a.a&&(b?e+="n,":c?e+="N,":e+="#7,"),UK(ZP)!=a.a&&(b?e+="o,":c?e+="O,":e+="#8,"),UK($P)!=a.a&&(b?e+="s,":c?e+="S,":e+="#16,"),UK(aQ)!=a.a&&(b?e+="p,":c?e+="P,":e+="#15,"),UK(RP)!=a.a&&(e+="F,"),UK(SP)!=a.a&&(e+="Cl,"),UK(TP)!=a.a&&(e+="Br,"),UK(UP)!=a.a&&(e+="I,"),\nsF(e,ya)&&(e=e.substr(0,e.length-1-0)),1>e.length&&!a.b&&(b?e=rc:c?e=ub:(Y(OP,(Ny(),Wy)),e=wa)));b=l;d&&UK(VP)!=a.a&&(b+=";a");d&&UK(WP)!=a.a&&(b+=";A");UK(bQ)!=a.a&&(b+=";R");UK(cQ)!=a.a&&(b+=";!R");UK(OP)!=a.a&&0<b.length?e=b.substr(1,b.length-1):e+=b;d=dQ.rc.a.pb.selectedIndex;0<d&&(--d,e+=";H"+d);d=eQ.rc.a.pb.selectedIndex;0<d&&(--d,e+=";D"+d);UK(fQ)!=a.a&&(e="~");UK(gQ)!=a.a&&(e=jb);UK(hQ)!=a.a&&(e=tb);UK(iQ)!=a.a&&(e="!@");Tz(a.e.rc,e)}\nfunction jQ(a){kQ(a);lQ(a);var b=dQ.rc.a;AP(b,0);b.pb.options[0].selected=!0;b=eQ.rc.a;AP(b,0);b.pb.options[0].selected=!0;Y(VP,a.a);Y(WP,a.a);Y(bQ,a.a);Y(cQ,a.a);Y(dQ,a.a);Y(eQ,a.a);mQ(a)}function kQ(a){Y(XP,a.a);Y(YP,a.a);Y(ZP,a.a);Y($P,a.a);Y(aQ,a.a);Y(RP,a.a);Y(SP,a.a);Y(TP,a.a);Y(UP,a.a)}function lQ(a){Y(OP,a.a);Y(PP,a.a);Y(QP,a.a)}function mQ(a){Y(fQ,a.a);Y(gQ,a.a);Y(hQ,a.a);Y(iQ,a.a);a.b=!1}\nfunction LP(a){BL.call(this,"Atom/Bond Query");this.i=new uL(this.vg());Gy(this.q,new fM(this));this.a=(jB(),lB);this.c=a;this.d||(a=Ox(a),this.d=new ML(a),dM(this.d,-150,10));this.j=this.d;my(this,new HP);Y(this,this.a);a=new ry;my(a,new mz(0,3,1));Z(a,new IP("Atom type :"),null);OP=new uL(vP);PP=new uL("Any except C");QP=new uL("Halogen");Z(a,OP,null);Z(a,PP,null);Z(a,QP,null);Z(this,a,null);a=new ry;my(a,new mz(0,3,1));Z(a,new KL("Or select one or more from the list :",0),null);Z(this,a,null);\na=new ry;my(a,new mz(0,3,1));XP=new uL(yb);YP=new uL(Tb);ZP=new uL(Yb);$P=new uL(bc);aQ=new uL(Zb);RP=new uL(Gb);SP=new uL(Bb);TP=new uL(wb);UP=new uL(Kb);Z(a,XP,null);Z(a,YP,null);Z(a,ZP,null);Z(a,$P,null);Z(a,aQ,null);Z(a,RP,null);Z(a,SP,null);Z(a,TP,null);Z(a,UP,null);Z(this,a,null);a=new ry;my(a,new mz(0,3,1));dQ=new FP;EP(dQ,vP);EP(dQ,$a);EP(dQ,bb);EP(dQ,db);EP(dQ,ib);Z(a,new IP("Number of hydrogens :  "),null);Z(a,dQ,null);Z(this,a,null);a=new ry;my(a,new mz(0,3,1));eQ=new FP;EP(eQ,vP);EP(eQ,\n$a);EP(eQ,bb);EP(eQ,db);EP(eQ,ib);EP(eQ,"4");EP(eQ,"5");EP(eQ,"6");Z(a,new KL("Number of connections :",0),null);Z(a,eQ,null);Z(a,new KL(" (H\'s don\'t count.)",0),null);Z(this,a,null);a=new ry;my(a,new mz(0,3,1));Z(a,new IP("Atom is :"),null);VP=new uL(wP);Z(a,VP,null);WP=new uL("Nonaromatic");Z(a,WP,null);bQ=new uL(zP);Z(a,bQ,null);cQ=new uL(xP);Z(a,cQ,null);Z(this,a,null);a=new ry;Y(a,cz(UK(this)));my(a,new mz(0,3,1));Z(a,new IP("Bond is :"),null);fQ=new uL(vP);Z(a,fQ,null);gQ=new uL(wP);Z(a,gQ,\nnull);hQ=new uL(zP);Z(a,hQ,null);iQ=new uL(xP);Z(a,iQ,null);Z(this,a,null);a=new ry;my(a,new mz(1,3,1));this.e=new Sz(wa,20);Z(a,this.e,null);Z(a,new uL(yP),null);Z(a,this.i,null);Z(this,a,null);this.rc&&DL(this.rc.c,!1);AL(this,!1);kQ(this);lQ(this);mQ(this);Y(VP,this.a);Y(WP,this.a);Y(bQ,this.a);Y(cQ,this.a);Y(dQ,this.a);Y(eQ,this.a);MP(this,OP);zL(this);a=this.j;hM(this.rc.c,a.a,a.b);!Nx(this)&&cL(this);YK(this)}r(608,587,XH,LP);\n_.wg=function(a,b){var c;G(b,yP)?(jQ(this),MP(this,OP),NP(this)):D(a.f,45)?(mQ(this),gs(a.f)===gs(OP)?(kQ(this),lQ(this)):gs(a.f)===gs(PP)?(kQ(this),lQ(this)):gs(a.f)===gs(QP)?(kQ(this),lQ(this)):gs(a.f)===gs(bQ)?Y(cQ,this.a):gs(a.f)===gs(cQ)?(Y(bQ,this.a),Y(VP,this.a)):gs(a.f)===gs(VP)?(Y(WP,this.a),Y(cQ,this.a)):gs(a.f)===gs(WP)?Y(VP,this.a):gs(a.f)===gs(fQ)||gs(a.f)===gs(gQ)||gs(a.f)===gs(hQ)||gs(a.f)===gs(iQ)?(jQ(this),this.b=!0):lQ(this),MP(this,a.f),NP(this)):D(a.f,46)&&(mQ(this),c=a.f,0==c.rc.a.pb.selectedIndex?\nY(c,this.a):Y(c,(Ny(),Wy)),NP(this));107!=this.c.i&&(this.c.i=107,wy(this.c));return!0};_.xg=function(){return Wm(this.e.rc.a.pb,Pg)};_.yg=function(){return this.b};_.b=!1;_.c=null;_.d=null;var OP=_.e=null,fQ=null,PP=null,VP=null,gQ=null,TP=null,XP=null,eQ=null,dQ=null,SP=null,RP=null,QP=null,UP=null,YP=null,WP=null,cQ=null,iQ=null,ZP=null,aQ=null,bQ=null,hQ=null,$P=null;function GP(a){yH();AH.call(this);this.a=new CP;Ku(this.a,new nQ(this,a),(kJ(),kJ(),lJ))}r(654,652,{},GP);_.Re=function(){return this.a};\n_.a=null;function nQ(a,b){this.a=a;this.b=b}r(655,1,{},nQ);_._c=function(a){$x();iM(a,this.b,BP(this.a.a,this.a.a.pb.selectedIndex))};_.a=null;_.b=null;V(586);V(608);V(435);V(654);V(655);V(371);x(TH)(1);\n//@ sourceURL=1.js\n')