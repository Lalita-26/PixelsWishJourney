import { useRef, useState } from 'react';
import { CHAPTERS, ITEMS } from './chapters.js';
import { initialStory, interact, loadStory, saveStory } from './story.js';
import { useRoom } from './useRoom.js';
import { useRoomMusic } from './useRoomMusic.js';
import treasureImage from './assets/treasure.png';
import './game.css';

const choiceLabel = { read:'เปิดกล่องและอ่านจดหมาย', finish:'เก็บจดหมายไว้' };
function FinalLetter() {
  return <article className="pgt-letter">
    <small>A LETTER FOR PIXELS 🍀</small>
    <h3>To Pixels,</h3>
    <p>รู้ไหมว่า...</p>
    <p>เธอไม่จำเป็นต้องทำอะไรยิ่งใหญ่ตลอดเวลาก็ได้นะ</p>
    <p>เพียงแค่การเป็นตัวเธอเอง การได้พบเธอ การได้เห็นรอยยิ้ม และการได้ติดตามเรื่องราวของเธอ ก็เป็นความสุขเล็ก ๆ ที่มีความหมายสำหรับใครหลายคนแล้ว</p>
    <p>ของขวัญทั้งหมดในกล่องใบนี้ ไม่ใช่สิ่งที่เธอต้องออกไปตามหาเลย</p>
    <p><strong>เพราะสิ่งเหล่านั้นอยู่กับเธอมาตลอด</strong></p>
    <hr/><p>With love,</p><p><em>Your little stars ♡</em></p>
  </article>;
}

export default function PixelsGame() {
  const rootRef=useRef(null);
  const [saved,setSaved]=useState(loadStory);
  const [story,setStory]=useState(initialStory);
  const [active,setActive]=useState(false);
  const [dialogue,setDialogue]=useState(null);
  const [bag,setBag]=useState(false);
  const [paused,setPaused]=useState(false);
  const [name,setName]=useState('Pixels');
  const chapter=CHAPTERS[story.chapter];
  const music=useRoomMusic({chapter:story.chapter,active,paused});
  const commit=(next)=>{setStory(next);saveStory(next);setSaved(next);};
  function choose(id,answer) {
    const result=interact(story,id,answer);
    if(result){commit(result.story);setDialogue(result.dialogue);rootRef.current?.focus();}
  }
  function close() {
    rootRef.current?.focus();
    if(dialogue){
      if(dialogue.choices?.length) return;
      setDialogue(null);
      if(dialogue.ending)setActive(false);
    }else if(bag)setBag(false);
    else if(paused){music.start(story.chapter);setPaused(false);}
  }
  function examine(){
    if(dialogue||bag||paused||!active)return;
    const item=room.gameRef.current?.nearby;
    if(item?.id==='cat')room.pet();
    else if(item)choose(item.id);
  }
  const room=useRoom({rootRef,story,active,blocked:!!dialogue||bag||paused,onInteract:examine,onClose:close});
  function begin(next) {
    music.start(next.chapter);
    setName(name.trim()||'Pixels');commit(next);setDialogue(null);setBag(false);setPaused(false);setActive(true);rootRef.current?.focus();
  }
  return <section className="pgt" ref={rootRef} tabIndex={-1}>
    <header className="pgt-heading"><small>DECEMBER 24 · A QUIET NIGHT</small><h1>Pixels &amp; The Green Treasure</h1><p>คืนคริสต์มาสที่มีความลับเล็ก ๆ รอให้ค้นพบ</p></header>
    <div className="pgt-shell">
      <div className="pgt-status">
        <div><small>CHAPTER {String(story.chapter+1).padStart(2,'0')} / 05</small><strong>{chapter.title}</strong></div>
        <div className="pgt-toolbar">
          <button type="button" onClick={music.toggle} aria-pressed={music.enabled && !music.blocked} title={music.blocked?'แตะเพื่อลองเล่นเพลงอีกครั้ง':'เปิดหรือปิดเพลงประกอบ'}>
            {music.enabled && !music.blocked ? '♫ ปิดเสียง' : '♪ เปิดเสียง'}
          </button>
          {active&&<><button onClick={()=>setBag(v=>!v)}>กระเป๋า ({story.inventory.length})</button><button onClick={()=>setPaused(true)}>พัก</button></>}
        </div>
      </div>
      <div className="pgt-stage">
        <canvas ref={room.canvasRef} width="640" height="480" aria-label="ห้องผจญภัยของ Pixels"/>
        {!active&&<div className="pgt-cover">
          <div className="pgt-intro"><small>🍀 A LITTLE CHRISTMAS ADVENTURE</small><h2>The Christmas Room</h2>
            <p>ออกสำรวจไปพร้อมกับน้องแมวสามสี แล้วค้นพบความลับที่ซ่อนอยู่</p>
            <label>ชื่อตัวละคร<input value={name} maxLength={18} onChange={e=>setName(e.target.value)}/></label>
            <button className="pgt-primary" onClick={()=>begin(initialStory())}>เริ่มการผจญภัย</button>
            {saved&&!saved.finished&&<button onClick={()=>begin(saved)}>เล่นต่อ Chapter {saved.chapter+1}</button>}
          </div>
        </div>}
      </div>
      {active&&<>
        <div className="pgt-task"><small>{name} · ภารกิจ</small><p>{chapter.hint}</p></div>
        <div className="pgt-controls">
          <div className="pgt-dpad">
            <span/><button aria-label="เดินขึ้น" {...room.bind('up')}>▲</button><span/>
            <button aria-label="เดินซ้าย" {...room.bind('left')}>◀</button>
            <button aria-label="เดินลง" {...room.bind('down')}>▼</button>
            <button aria-label="เดินขวา" {...room.bind('right')}>▶</button>
          </div>
          <button className="pgt-primary pgt-interact" onClick={examine} disabled={!room.nearby||!!dialogue||bag||paused}><b>E</b> {room.nearby?.label||'เข้าใกล้สิ่งของ'}</button>
        </div>
        <p className="pgt-help">WASD / ลูกศร เพื่อเดิน · E เพื่อสำรวจ · ใช้ปุ่มบนจอเมื่อเล่นบนมือถือ</p>
      </>}
    </div>
    {(dialogue||paused||bag)&&<div className="pgt-modal" role="dialog" aria-modal="true" aria-label={dialogue?.title||'เมนูเกม'}>
      <div className="pgt-dialog">
        {dialogue?<><h2>{dialogue.title}</h2>
          {dialogue.treasure&&<img className="pgt-treasure" src={treasureImage} alt="กล่องสมบัติสีเขียวเรืองแสง"/>}
          {dialogue.letter?<FinalLetter/>:<p>{dialogue.text}</p>}
          {dialogue.choices?.map(option=><button className="pgt-choice" key={option} onClick={()=>choose(dialogue.puzzle,option)}>{choiceLabel[option]||option}</button>)}
          {!dialogue.choices&&<button className="pgt-primary" onClick={close}>{dialogue.ending?'กลับสู่หน้าหลักเกม':'เข้าใจแล้ว'}</button>}
        </>:bag?<><h2>Inventory</h2><ul className="pgt-items">{story.inventory.map(id=><li key={id}>{ITEMS[id]}</li>)}</ul>{!story.inventory.length&&<p>ยังไม่มีไอเท็ม</p>}<button className="pgt-primary" onClick={close}>ปิดกระเป๋า</button></>
        :<><h2>พักการผจญภัย</h2><p>ความคืบหน้าถูกเก็บไว้ในเบราว์เซอร์นี้แล้ว</p><button className="pgt-primary" onClick={close}>เล่นต่อ</button><button onClick={()=>{setPaused(false);setActive(false);}}>กลับหน้าเริ่มเกม</button></>}
      </div>
    </div>}
  </section>;
}