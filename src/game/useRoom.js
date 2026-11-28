import {useEffect,useRef,useState} from 'react';
import {CHAPTERS} from './chapters.js';
import {drawRoom} from './art.js';
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export const canStand=(chapter,x,y,r=8)=>x>=39&&x<=601&&y>=91&&y<=439&&!CHAPTERS[chapter].colliders.some(([bx,by,w,h])=>{
  const dx=x-Math.max(bx,Math.min(x,bx+w)), dy=y-Math.max(by,Math.min(y,by+h));
  return Math.hypot(dx,dy)<r;
});
const actor=(x,y)=>({x,y,facing:'up',walkTime:0,walking:false,petTimer:0});
const facing=(dx,dy)=>Math.abs(dx)>Math.abs(dy)?(dx<0?'left':'right'):(dy<0?'up':'down');
const keyMap={w:'up',a:'left',s:'down',d:'right',arrowup:'up',arrowleft:'left',arrowdown:'down',arrowright:'right'};

export function useRoom({rootRef,story,active,blocked,onInteract,onClose}) {
  const canvasRef=useRef(null), gameRef=useRef(null), keys=useRef({}), touch=useRef({});
  const latest=useRef({story,active,blocked,onInteract,onClose});
  const [nearby,setNearby]=useState(null);
  useEffect(()=>{latest.current={story,active,blocked,onInteract,onClose};},[story,active,blocked,onInteract,onClose]);
  useEffect(()=>{
    const ctx=canvasRef.current?.getContext('2d');
    if(!ctx)return;
    gameRef.current={chapter:story.chapter,elapsed:0,player:actor(320,400),cat:actor(355,400),nearby:null,stars:story.stars};
    keys.current={};touch.current={};
    setNearby(null);
    let frame,last=performance.now(),lastId=null;
    const loop=now=>{
      const game=gameRef.current, state=latest.current;
      const dt=Math.min(.04,(now-last)/1000);last=now;
      game.elapsed+=dt;game.stars=state.story.stars;
      const p=game.player,c=game.cat;
      p.petTimer=Math.max(0,p.petTimer-dt);c.petTimer=Math.max(0,c.petTimer-dt);
      const pressed=k=>keys.current[k]||touch.current[k];
      let dx=0,dy=0;
      if(state.active&&!state.blocked&&!p.petTimer){
        dx=Number(!!pressed('right'))-Number(!!pressed('left'));
        dy=Number(!!pressed('down'))-Number(!!pressed('up'));
      }
      const oldX=p.x,oldY=p.y;
      if(dx||dy){
        p.facing=facing(dx,dy);const scale=152*dt/Math.hypot(dx,dy);
        if(canStand(game.chapter,p.x+dx*scale,p.y))p.x+=dx*scale;
        if(canStand(game.chapter,p.x,p.y+dy*scale))p.y+=dy*scale;
      }
      p.walking=Math.hypot(p.x-oldX,p.y-oldY)>.05;
      if(p.walking)p.walkTime+=dt;
      const cx=c.x,cy=c.y;
      if(state.active&&!state.blocked&&!c.petTimer&&distance(c,p)>32){
        const tx=p.x-c.x,ty=p.y-c.y,scale=Math.min(1,dt*3.6);
        if(canStand(game.chapter,c.x+tx*scale,c.y,5))c.x+=tx*scale;
        if(canStand(game.chapter,c.x,c.y+ty*scale,5))c.y+=ty*scale;
        if(distance(c,p)>160&&canStand(game.chapter,p.x+20,p.y,5)){c.x=p.x+20;c.y=p.y;}
      }
      const moved=Math.hypot(c.x-cx,c.y-cy);c.walking=moved>.035;
      if(c.walking){c.facing=facing(c.x-cx,c.y-cy);c.walkTime+=moved*.15;}
      let closest=null,best=Infinity;
      if(state.active)for(const item of CHAPTERS[game.chapter].objects){const d=distance(p,item);if(d<item.radius&&d<best){closest=item;best=d;}}
      if(state.active&&!closest&&distance(p,c)<44)closest={id:'cat',label:'ลูบหัวน้องแมว',x:c.x,y:c.y};
      game.nearby=closest;
      if(closest?.id!==lastId){lastId=closest?.id;setNearby(closest);}
      drawRoom(ctx,game);
      frame=requestAnimationFrame(loop);
    };
    frame=requestAnimationFrame(loop);
    return ()=>cancelAnimationFrame(frame);
  },[story.chapter,active]);
  useEffect(()=>{
    const clear=()=>{keys.current={};touch.current={};};
    const down=e=>{
      if(!latest.current.active||!rootRef.current?.contains(document.activeElement)||/INPUT|TEXTAREA|SELECT/.test(e.target?.tagName))return;
      const key=e.key.toLowerCase(),dir=keyMap[key];
      if(dir){if(!latest.current.blocked){e.preventDefault();keys.current[dir]=true;}return;}
      if((key==='e'|| (key==='enter'&&e.target?.tagName!=='BUTTON'))&&!e.repeat){
        e.preventDefault();if(latest.current.blocked)latest.current.onClose();else latest.current.onInteract();
      }
      if(key==='escape')latest.current.onClose();
    };
    const up=e=>{delete keys.current[keyMap[e.key.toLowerCase()]];};
    window.addEventListener('keydown',down);window.addEventListener('keyup',up);window.addEventListener('blur',clear);
    const root=rootRef.current;root?.addEventListener('focusout',clear);
    return()=>{window.removeEventListener('keydown',down);window.removeEventListener('keyup',up);window.removeEventListener('blur',clear);root?.removeEventListener('focusout',clear);};
  },[rootRef]);
  useEffect(()=>{if(blocked){keys.current={};touch.current={};}},[blocked]);
  const pet=()=>{
    const game=gameRef.current;if(!game)return;
    const p=game.player,c=game.cat;p.facing=facing(c.x-p.x,c.y-p.y);c.facing=facing(p.x-c.x,p.y-c.y);
    p.petTimer=.9;c.petTimer=1.5;keys.current={};touch.current={};
  };
  const bind=dir=>({
    onPointerDown:e=>{e.preventDefault();e.currentTarget.setPointerCapture(e.pointerId);touch.current[dir]=true;},
    onPointerUp:()=>delete touch.current[dir],
    onPointerCancel:()=>delete touch.current[dir],
    onLostPointerCapture:()=>delete touch.current[dir],
  });
  return {canvasRef,gameRef,nearby,pet,bind};
}
