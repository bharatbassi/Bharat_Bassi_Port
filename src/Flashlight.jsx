import {useEffect,useRef} from 'react';
const weak=()=>{const n=navigator;return (n.hardwareConcurrency&&n.hardwareConcurrency<=2)||(n.deviceMemory&&n.deviceMemory<=2)};
/** Torch that reveals `reveal` through a dark overlay laid above `children`.
 *  Props: radius (px), feather (0–1 falloff share), darkness (0–1), glow (0–1), disabled.
 *  Pointer moves write CSS variables inside rAF, so React never re-renders. */
export default function Flashlight({children,reveal,radius=230,feather=.6,darkness=.6,glow=.16,disabled=false,className=''}){
  const ref=useRef();
  useEffect(()=>{
    const el=ref.current,mq=matchMedia('(prefers-reduced-motion: reduce)');
    const off=disabled||mq.matches||weak();
    el.dataset.static=off?'1':'0';
    if(off)return;
    let raf=0,tx=0,ty=0,x=0,y=0,r=el.getBoundingClientRect();
    const set=()=>{el.style.setProperty('--x',x+'px');el.style.setProperty('--y',y+'px')};
    const tick=()=>{x+=(tx-x)*.2;y+=(ty-y)*.2;set();raf=Math.abs(tx-x)+Math.abs(ty-y)>.5?requestAnimationFrame(tick):0};
    const go=()=>{if(!raf)raf=requestAnimationFrame(tick)};
    const move=e=>{r=el.getBoundingClientRect();tx=e.clientX-r.left;ty=e.clientY-r.top;el.dataset.touch=e.pointerType==='touch'?'1':'0';go()};
    const size=()=>{r=el.getBoundingClientRect();tx=x=r.width*.72;ty=y=r.height*.42;set()};
    size();
    el.addEventListener('pointermove',move);el.addEventListener('pointerdown',move);addEventListener('resize',size);
    return()=>{cancelAnimationFrame(raf);el.removeEventListener('pointermove',move);el.removeEventListener('pointerdown',move);removeEventListener('resize',size)};
  },[disabled]);
  return(<div ref={ref} className={'fl '+className} data-static="0"
    style={{'--r':radius+'px','--f':feather,'--d':darkness,'--g':glow}}>
    <div className="fl-base">{children}</div>
    <div className="fl-reveal" aria-hidden="true">{reveal}</div>
    <div className="fl-dark" aria-hidden="true"/><div className="fl-glow" aria-hidden="true"/>
  </div>);
}
