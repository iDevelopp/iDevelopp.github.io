// The cosmos canvas animation from the reference site.
// Renders: stars, constellation nodes with connecting lines, 3D atom orbits with electrons, nucleus.
// Mouse parallax. Pauses when tab hidden. Respects prefers-reduced-motion.

export default function initCosmos(canvasId) {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canvas = document.getElementById(canvasId);
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, CX, CY, dpr, scale;

  var COL = {
    core:  [205,232,255],
    elec:  [127,227,255],
    blue:  [61,139,255],
    violet:[138,155,240],
    star:  [220,234,255],
    deep:  [90,150,255]
  };
  function rgba(c,a){ return 'rgba('+c[0]+','+c[1]+','+c[2]+','+a+')'; }

  var nucleus=[], orbits=[], stars=[], nodes=[];

  function rot3(p,ax,ay){
    var cy=Math.cos(ay),sy=Math.sin(ay);
    var x1=p.x*cy-p.z*sy, z1=p.x*sy+p.z*cy;
    var cx=Math.cos(ax),sx=Math.sin(ax);
    var y1=p.y*cx-z1*sx, z2=p.y*sx+z1*cx;
    return {x:x1,y:y1,z:z2};
  }

  function build(){
    nucleus=[]; orbits=[]; stars=[]; nodes=[];
    for(var i=0;i<34;i++){
      var r=Math.random()*30,t=Math.random()*6.283,p=Math.acos(2*Math.random()-1);
      nucleus.push({x:r*Math.sin(p)*Math.cos(t),y:r*Math.sin(p)*Math.sin(t),z:r*Math.cos(p),ph:Math.random()*6.283});
    }
    var defs=[
      {rad:150,tiltX:0.5,tiltY:0.2,e:2,speed:0.95,col:COL.elec},
      {rad:210,tiltX:-0.7,tiltY:0.9,e:2,speed:-0.7,col:COL.blue},
      {rad:270,tiltX:0.3,tiltY:-1.0,e:1,speed:0.55,col:COL.elec},
      {rad:120,tiltX:1.1,tiltY:1.4,e:2,speed:1.25,col:COL.violet},
      {rad:330,tiltX:-0.4,tiltY:0.5,e:1,speed:-0.45,col:COL.deep}
    ];
    defs.forEach(function(d){
      var el=[];
      for(var k=0;k<d.e;k++) el.push({angle:Math.random()*6.283});
      orbits.push({rad:d.rad,tiltX:d.tiltX,tiltY:d.tiltY,speed:d.speed,col:d.col,electrons:el});
    });
    var starCount=Math.floor(Math.min(W,H)/1.7);
    for(var s=0;s<starCount;s++){
      var rr=380+Math.random()*1000,tt=Math.random()*6.283,pp=Math.acos(2*Math.random()-1);
      stars.push({x:rr*Math.sin(pp)*Math.cos(tt),y:rr*Math.sin(pp)*Math.sin(tt),z:rr*Math.cos(pp),
        bright:Math.random()>0.84,cool:Math.random()>0.5,a:Math.random()*0.55+0.18,tw:Math.random()*0.018+0.004,dir:Math.random()>0.5?1:-1});
    }
    for(var n=0;n<62;n++){
      var kr=300+Math.random()*380,kt=Math.random()*6.283,kp=Math.acos(2*Math.random()-1);
      nodes.push({x:kr*Math.sin(kp)*Math.cos(kt),y:kr*Math.sin(kp)*Math.sin(kt),z:kr*Math.cos(kp)});
    }
  }

  function resize(){
    dpr=Math.min(window.devicePixelRatio||1,2);
    W=innerWidth; H=innerHeight;
    canvas.width=W*dpr; canvas.height=H*dpr;
    canvas.style.width=W+'px'; canvas.style.height=H+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    CX=W/2; CY=H*0.42; scale=Math.min(W,H)/820;
    build();
  }

  var PERSP=850;
  function project(p){var d=PERSP/(PERSP+p.z);return{sx:CX+p.x*d*scale,sy:CY+p.y*d*scale,d:d};}

  var mx=0,my=0,tmx=0,tmy=0;
  if(!reduced) addEventListener('mousemove',function(e){tmx=(e.clientX/W-0.5)*0.7;tmy=(e.clientY/H-0.5)*0.55;},{passive:true});

  var t0=performance.now(),paused=false;
  document.addEventListener('visibilitychange',function(){paused=document.hidden;if(!paused)frame(performance.now());});

  function frame(now){
    if(paused) return;
    var time=(now-t0)/1000;
    mx+=(tmx-mx)*0.05; my+=(tmy-my)*0.05;
    var ay=time*0.09+mx, ax=-0.25+my;
    ctx.clearRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';
    for(var i=0;i<stars.length;i++){
      var s=stars[i],rp=rot3(s,ax*0.35,ay*0.35),pr=project(rp);
      if(!reduced){s.a+=s.tw*s.dir;if(s.a>0.7||s.a<0.14)s.dir*=-1;}
      var col=s.bright?COL.elec:(s.cool?COL.star:COL.deep);
      var size=(s.bright?1.7:1.0)*pr.d*scale;
      ctx.beginPath();ctx.fillStyle=rgba(col,s.a*pr.d);
      ctx.arc(pr.sx,pr.sy,Math.max(0.35,size),0,6.283);ctx.fill();
    }
    var proj=[];
    for(var k=0;k<nodes.length;k++) proj.push(project(rot3(nodes[k],ax*0.5,ay*0.5)));
    ctx.lineWidth=1;
    for(var a=0;a<proj.length;a++){
      for(var b=a+1;b<proj.length;b++){
        var dx=proj[a].sx-proj[b].sx,dy=proj[a].sy-proj[b].sy,dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<150){var al=(1-dist/150)*0.22*Math.min(proj[a].d,proj[b].d);ctx.strokeStyle=rgba(COL.blue,al);ctx.beginPath();ctx.moveTo(proj[a].sx,proj[a].sy);ctx.lineTo(proj[b].sx,proj[b].sy);ctx.stroke();}
      }
    }
    for(var c=0;c<proj.length;c++){ctx.beginPath();ctx.fillStyle=rgba(COL.elec,0.55*proj[c].d);ctx.arc(proj[c].sx,proj[c].sy,1.5*proj[c].d*scale,0,6.283);ctx.fill();}
    for(var o=0;o<orbits.length;o++){
      var orb=orbits[o];
      ctx.beginPath();
      for(var seg=0;seg<=72;seg++){
        var ang=(seg/72)*6.283,rp2={x:Math.cos(ang)*orb.rad,y:Math.sin(ang)*orb.rad,z:0};
        rp2=rot3(rp2,orb.tiltX,orb.tiltY);rp2=rot3(rp2,ax,ay);
        var pp2=project(rp2);
        if(seg===0)ctx.moveTo(pp2.sx,pp2.sy);else ctx.lineTo(pp2.sx,pp2.sy);
      }
      ctx.strokeStyle=rgba(orb.col,0.18);ctx.lineWidth=1;ctx.stroke();
      for(var ei=0;ei<orb.electrons.length;ei++){
        var el=orb.electrons[ei];
        if(!reduced)el.angle+=orb.speed*0.013;
        var ep={x:Math.cos(el.angle)*orb.rad,y:Math.sin(el.angle)*orb.rad,z:0};
        ep=rot3(ep,orb.tiltX,orb.tiltY);ep=rot3(ep,ax,ay);
        var epp=project(ep),er=4.6*epp.d*scale;
        var g=ctx.createRadialGradient(epp.sx,epp.sy,0,epp.sx,epp.sy,er*7);
        g.addColorStop(0,rgba(orb.col,0.95*epp.d));
        g.addColorStop(0.4,rgba(orb.col,0.3*epp.d));
        g.addColorStop(1,rgba(orb.col,0));
        ctx.fillStyle=g;ctx.beginPath();ctx.arc(epp.sx,epp.sy,er*7,0,6.283);ctx.fill();
        ctx.fillStyle=rgba([255,255,255],0.98*epp.d);
        ctx.beginPath();ctx.arc(epp.sx,epp.sy,Math.max(1,er*0.55),0,6.283);ctx.fill();
      }
    }
    var halo=ctx.createRadialGradient(CX,CY,0,CX,CY,100*scale);
    halo.addColorStop(0,rgba(COL.blue,0.55));halo.addColorStop(0.45,rgba(COL.elec,0.16));halo.addColorStop(1,rgba(COL.blue,0));
    ctx.fillStyle=halo;ctx.beginPath();ctx.arc(CX,CY,100*scale,0,6.283);ctx.fill();
    for(var v=0;v<nucleus.length;v++){
      var np=rot3(nucleus[v],ax,ay),npp=project(np);
      var pulse=reduced?1:(0.7+0.3*Math.sin(time*2.2+nucleus[v].ph));
      ctx.fillStyle=rgba(COL.core,0.9*npp.d*pulse);
      ctx.beginPath();ctx.arc(npp.sx,npp.sy,2.2*npp.d*scale,0,6.283);ctx.fill();
    }
    ctx.globalCompositeOperation='source-over';
    if(!reduced)requestAnimationFrame(frame);
  }

  resize();
  var rt;
  addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){resize();if(reduced)frame(performance.now());},180);});
  frame(performance.now());
}
