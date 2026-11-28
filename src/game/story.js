import { CHAPTERS } from './chapters.js';
export const initialStory = () => ({ chapter:0, inventory:[], photos:[], stars:[], memoryStep:0, finished:false });
const order = ['การพบกันครั้งแรก','วันที่เราได้ยิ้มด้วยกัน','ความทรงจำที่ยังอยู่จนถึงวันนี้'];
export function interact(story,id,answer) {
  const next = {...story,inventory:[...story.inventory],photos:[...story.photos],stars:[...story.stars]};
  const has = item => next.inventory.includes(item);
  const add = item => { if(!has(item)) next.inventory.push(item); };
  const say = (title,text,extra={}) => ({story:next,dialogue:{title,text,...extra}});
  const chapter = CHAPTERS[story.chapter];
  const object = chapter.objects.find(o=>o.id===id);
  if (!object) return null;
  if (id==='door') {
    const requirements = [['ribbon','key'],['letter','bell'],['memory'],['clover']][story.chapter];
    if (!requirements?.every(has)) return say('ประตูยังล็อกอยู่',chapter.hint);
    next.chapter++;
    return say(CHAPTERS[next.chapter].title,'อีกห้องหนึ่งกำลังรอให้ค้นพบ',{transition:true});
  }
  if(story.chapter===0) {
    if(id==='tree') {add('ribbon');return say('A Little Ribbon','พบริบบิ้นสีแดงใต้ต้นคริสต์มาส');}
    if(id==='table') {add('note');return say('A Small Clue','โน้ตเขียนไว้ว่า กุญแจซ่อนอยู่ในลิ้นชักตู้');}
    if(id==='cabinet') {
      if(!has('note')) return say('Locked Cabinet','ลองตรวจดูของบนโต๊ะก่อนนะ');
      add('key');return say('An Old Key','พบกุญแจในลิ้นชัก ใช้เปิดประตูห้องถัดไปได้');
    }
  }
  if(story.chapter===1) {
    if(id==='mailbox') {add('letter');
      return say('Letters from Someone','ขอบคุณนะ เพราะรอยยิ้มของเธอ ทำให้วันธรรมดาของใครบางคนเป็นวันที่ดี');}
    if(id==='drawer') {
      if(!has('letter')) return say('A Quiet Drawer','ลองเปิดกล่องจดหมายก่อนนะ');
      add('bell');return say('The Golden Bell','พบกระดิ่งสีทอง เสียงเบา ๆ เหมือนคำขอบคุณ');
    }
  }
  if(story.chapter===2) {
    if(id.startsWith('photo')) {
      if(!next.photos.includes(id)) next.photos.push(id);
      return say(object.label,object.text);
    }
    if(id==='bookshelf') {
      if(has('memory')) return say('Little Memories','ความทรงจำทุกชิ้นถูกเก็บไว้อย่างดีแล้ว');
      if(next.photos.length<3) return say('Little Memories','สำรวจภาพทั้งสามภาพก่อนนะ');
      if(answer!==undefined) {
        if(answer===order[next.memoryStep]) next.memoryStep++;
        else {next.memoryStep=0;return say('ลองอีกครั้ง','เริ่มจากความทรงจำแรกนะ',{puzzle:id,choices:[order[2],order[0],order[1]]});}
      }
      if(next.memoryStep===3) {add('memory');return say('A Book of Memories','บางเรื่องอาจเล็กน้อย แต่ยังมีความหมายเสมอ');}
      return say('The Memory Puzzle',`เลือกเหตุการณ์ตามลำดับเวลา (${next.memoryStep+1}/3)`,{puzzle:id,choices:[order[2],order[0],order[1]]});
    }
  }
  if(story.chapter===3) {
    const messages={star1:'ขอบคุณสำหรับรอยยิ้ม',star2:'ขอบคุณสำหรับความทรงจำ',star3:'ขอบคุณที่ยังเป็นตัวเอง'};
    if(messages[id]) {if(!next.stars.includes(id))next.stars.push(id);return say('A Little Star',messages[id]);}
    if(id==='tree') {
      if(next.stars.length<3) return say('The Little Stars',`ดาวสว่างแล้ว ${next.stars.length}/3 ดวง`);
      add('clover');return say('The Clover Key','ดาวทุกดวงสว่างแล้ว พบกุญแจใบโคลเวอร์');
    }
  }
  if(story.chapter===4 && id==='chest') {
    if(!has('clover')) return say('The Green Treasure','ช่องล็อกเป็นรูปใบโคลเวอร์');
    if(answer==='finish') {next.finished=true;return say('The End','แม้ในวันที่เธอไม่รู้ว่าตัวเองมีความหมายกับใครมากแค่ไหน ก็ยังมีคนมากมายที่ดีใจที่ได้พบเธอ',{ending:true});}
    if(answer==='read') return say('A Letter for Pixels','',{letter:true,puzzle:id,choices:['finish']});
    return say('The Green Treasure','นี่คือกล่องสมบัติอย่างนั้นเหรอ…',{treasure:true,puzzle:id,choices:['read']});
  }
  return say(object.label,object.text || 'ลองสำรวจสิ่งของอื่นในห้อง');
}

export const SAVE_KEY='pixels-green-treasure-v1';
export function loadStory() {
  try {
    const s=JSON.parse(localStorage.getItem(SAVE_KEY));
    if(s && Number.isInteger(s.chapter) && CHAPTERS[s.chapter] && Array.isArray(s.inventory) && Array.isArray(s.photos) && Array.isArray(s.stars) && Number.isInteger(s.memoryStep)) return s;
  } catch { /* storage can be unavailable */ }
  return null;
}
export function saveStory(story) {
  try {localStorage.setItem(SAVE_KEY,JSON.stringify(story));} catch { /* keep playing */ }
}
