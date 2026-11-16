const LIVE=!!(window.CFG&&CFG.firebase.apiKey&&!CFG.firebase.apiKey.startsWith('YOUR'));
let db=null,auth=null;
if(LIVE){firebase.initializeApp(CFG.firebase);db=firebase.firestore();if(firebase.auth)auth=firebase.auth()}
async function loadData(){
  if(!LIVE)return null;
  try{
    const[s,p,c,o]=await Promise.all([db.doc('settings/main').get(),db.collection('products').get(),db.collection('coupons').get(),db.collection('offers').get()]);
    if(p.empty&&!s.exists)return null;
    const m=q=>q.docs.map(d=>({id:d.id,...d.data()}));
    return{settings:{...SEED.settings,...(s.data()||{})},products:m(p).sort((a,b)=>(b.ts||0)-(a.ts||0)),coupons:m(c),offers:m(o)};
  }catch(e){console.warn('Firestore error',e);return null}
}
