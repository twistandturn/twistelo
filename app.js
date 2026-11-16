const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let S=JSON.parse(JSON.stringify(SEED)),cart=[],V={view:'shop',cat:'All',q:'',tab:'products',edit:null,coupon:null};
try{cart=JSON.parse(localStorage.getItem('tw_cart')||'[]')}catch(e){}
const saveCart=()=>{try{localStorage.setItem('tw_cart',JSON.stringify(cart))}catch(e){}};
const R=n=>'₹'+Math.round(n).toLocaleString('en-IN');
const P=id=>S.products.find(p=>p.id==id);
const imgs=p=>p.imgs&&p.imgs.length?p.imgs:(p.img?[p.img]:[]);
const img=(p,c='pi')=>{const s=imgs(p)[0];return s?`<img class="${c}" src="${esc(s)}" alt="${esc(p.name)}" loading="lazy">`:`<div class="ph">${esc(p.emoji||'🧩')}</div>`};
const gal=p=>{const L=imgs(p);if(!L.length)return `<div class="gal"><div class="ph" style="height:100%">${esc(p.emoji||'🧩')}</div></div>`;return `<div class="gal"><div class="sl" id="sl">${L.map(s=>`<img src="${esc(s)}" alt="">`).join('')}</div>${L.length>1?`<button class="ar l" data-a="sl" data-d="-1">‹</button><button class="ar r" data-a="sl" data-d="1">›</button><div class="dots" id="dots">${L.map((s,i)=>`<i class="${i?'':'on'}"></i>`).join('')}</div>`:''}</div>`};
function toast(m){const t=document.createElement('div');t.className='toast';t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),2400)}
function calc(){let sub=cart.reduce((a,i)=>a+i.price*i.qty,0),disc=0,c=V.coupon,fs=false;
 if(c){if(sub<c.min){V.coupon=null;c=null}else if(c.type=='pct')disc=sub*c.val/100;else if(c.type=='flat')disc=c.val;else fs=true}
 disc=Math.min(disc,sub);const after=sub-disc;const ship=!cart.length?0:(fs||after>=S.settings.free)?0:S.settings.fee;return{sub,disc,ship,total:after+ship,after}}
function shop(){const cats=['All',...new Set(S.products.map(p=>p.cat))];
 const list=S.products.filter(p=>(V.cat=='All'||p.cat==V.cat)&&p.name.toLowerCase().includes(V.q.toLowerCase()));
 const n=cart.reduce((a,i)=>a+i.qty,0);const tk='R U R’ U’ F2 D’ B L2 U’ R2 F’ D B2 L R’ U2 &nbsp; '.repeat(14);
 $('#app').innerHTML=`${S.settings.ann?`<div class="ann">${esc(S.settings.ann)}</div>`:''}
 <header><div class="wrap"><div class="logo">Twist<b>E</b>lo<small>CUBING MERCH &amp; MORE</small></div><div class="nav"><button class="ib" data-a="cart">🛒<span class="cnt">${n}</span></button></div></div></header>
 <section class="hero"><div class="tick" style="top:14px">${tk}</div><div class="tick" style="bottom:14px">${tk}</div><div class="wrap"><h1>TURN YOUR<br><span>PASSION.</span></h1><p>Official merch &amp; gear from the creators of Twist &amp; Turn online cubing battles. Wear it. Solve on it. Flex it.</p><div class="row"><a class="btn" href="#shop">Shop Now</a><a class="btn ghost" href="https://twistandturn.co.in" target="_blank" rel="noopener">Twist &amp; Turn Comps</a></div></div></section>
 <div class="wrap"><div class="perks"><div class="perk"><b>🚚 Free shipping</b>On orders above ${R(S.settings.free)}</div><div class="perk"><b>💬 Order on WhatsApp</b>Checkout in 1 tap</div><div class="perk"><b>🏆 By cubers, for cubers</b>Made for the community</div></div>
 ${S.offers.length?`<h2 class="t">Offers</h2><div class="offers">${S.offers.map(o=>`<div class="offer">${o.img?`<img src="${esc(o.img)}" alt="">`:''}<div><b>${esc(o.title)}</b><br><span style="color:var(--mu)">${esc(o.text)}</span><br>${o.code?`<span class="code" data-a="copy" data-c="${esc(o.code)}">${esc(o.code)}</span>`:''}</div></div>`).join('')}</div>`:''}
 <h2 class="t" id="shop">Shop</h2><div class="bar">${cats.map(c=>`<span class="chip ${c==V.cat?'on':''}" data-a="cat" data-c="${esc(c)}">${esc(c)}</span>`).join('')}<input id="sq" placeholder="Search products…" value="${esc(V.q)}"></div>
 <div class="grid">${list.map((p,i)=>`<div class="card ${p.stock?'':'soldout'}" data-a="open" data-id="${p.id}" style="animation-delay:${i*50}ms">${p.stock?(p.isNew?'<span class="tag">NEW</span>':''):'<span class="tag o">OUT OF STOCK</span>'}${img(p)}<div class="in"><h3>${esc(p.name)}</h3><div class="pr">${R(p.price)}${p.mrp>p.price?`<s>${R(p.mrp)}</s>`:''}</div></div></div>`).join('')||'<p style="color:var(--mu)">No products found.</p>'}</div></div>
 <footer><div class="wrap">© 2026 Twistelo · A <a href="https://twistandturn.co.in" target="_blank" rel="noopener">Twist &amp; Turn</a> store</div></footer>`;
 const q=$('#sq');$('#app').classList.toggle('na',!!V.noAnim);if(q)q.oninput=e=>{V.noAnim=true;V.q=e.target.value;const f=q.selectionStart;shop();const x=$('#sq');x.focus();x.setSelectionRange(f,f)}}
function modal(id){const p=P(id);if(!p)return;const sel={};
 $('#ov').innerHTML=`<div class="ov" data-a="close"><div class="md">${gal(p)}<div class="b"><h2 style="font:700 28px Rajdhani;margin:0">${esc(p.name)}</h2><div class="pr" style="font-size:20px;margin:4px 0">${R(p.price)}${p.mrp>p.price?`<s>${R(p.mrp)}</s>`:''}</div><p style="color:var(--mu)">${esc(p.desc)}</p>
 ${(p.opts||[]).map((o,i)=>`<div class="opt"><label>${esc(o.n)}</label><div class="pills">${o.v.map(v=>`<span class="pill" data-o="${i}" data-v="${esc(v)}">${esc(v)}</span>`).join('')}</div></div>`).join('')}
 <div id="me" class="err"></div><div style="display:flex;gap:10px;margin-top:14px"><button class="btn" id="add" ${p.stock?'':'disabled'}>${p.stock?'Add to Cart':'Out of Stock'}</button><button class="btn ghost" data-a="close">Close</button></div></div></div></div>`;
 const sl=$('#sl');if(sl)sl.onscroll=()=>{const k=Math.round(sl.scrollLeft/sl.clientWidth);document.querySelectorAll('#dots i').forEach((d,j)=>d.classList.toggle('on',j==k))};
 $('#ov').onclick=e=>{const t=e.target.closest('.pill');if(t){sel[t.dataset.o]=t.dataset.v;document.querySelectorAll(`.pill[data-o="${t.dataset.o}"]`).forEach(x=>x.classList.toggle('on',x==t))}};
 $('#add').onclick=()=>{if((p.opts||[]).some((o,i)=>!sel[i])){$('#me').textContent='Please select '+p.opts.filter((o,i)=>!sel[i]).map(o=>o.n).join(' & ');return}
 const v=p.opts.map((o,i)=>o.n+': '+sel[i]).join(', ');const k=p.id+'|'+v;const ex=cart.find(i=>i.k==k);if(ex)ex.qty++;else cart.push({k,id:p.id,name:p.name,v,price:p.price,qty:1});saveCart();$('#ov').innerHTML='';shop();toast('Added to cart ✓')}}
function drawer(step=1){const c=calc(),s=S.settings,left=s.free-c.after;
 const items=cart.map((i,x)=>{const p=P(i.id)||{};return `<div class="ci">${img(p,'')}<div class="m"><b>${esc(i.name)}</b><br><small>${esc(i.v)}</small><br><span class="q"><button data-a="dec" data-i="${x}">−</button><span>${i.qty}</span><button data-a="inc" data-i="${x}">+</button></span> <small>${R(i.price*i.qty)}</small></div><button class="ib" style="height:30px" data-a="rm" data-i="${x}">✕</button></div>`}).join('');
 const sum=`<div class="sm2"><div><span>Subtotal</span><span>${R(c.sub)}</span></div>${c.disc?`<div class="g"><span>Discount (${esc(V.coupon.code)})</span><span>−${R(c.disc)}</span></div>`:''}<div><span>Shipping</span><span>${c.ship?R(c.ship):'FREE'}</span></div><div class="tot"><span>Total</span><span>${R(c.total)}</span></div></div>`;
 let body;
 if(!cart.length)body='<p style="color:var(--mu);text-align:center;margin-top:40px">Your cart is empty 🧩</p>';
 else if(step==1)body=`<div class="ship">${left>0?`Add <b>${R(left)}</b> more for FREE shipping`:'🎉 You get FREE shipping!'}<div class="prog"><i style="width:${Math.min(100,c.after/s.free*100)}%"></i></div></div>${items}<div style="display:flex;gap:8px"><input id="cc" placeholder="Coupon code" value="${V.coupon?esc(V.coupon.code):''}"><button class="btn sm" data-a="apply">Apply</button></div><div id="cm" class="err" style="margin-top:6px">${V.coupon?'<span class="ok">Coupon applied ✓</span>':''}</div>${sum}<button class="btn" style="width:100%;margin-top:14px" data-a="co">Proceed to Checkout</button>`;
 else body=`<div class="fr"><input id="cn" placeholder="Full name"><input id="cm2" placeholder="Mobile number (10 digits)" inputmode="numeric" maxlength="10"><textarea id="ca" rows="3" placeholder="Full address (house, street, city, state)"></textarea><input id="cp" placeholder="Pincode" inputmode="numeric" maxlength="6"><select id="cy"><option>UPI / Online</option><option>Cash on Delivery</option></select><input id="cx" placeholder="Note (optional)"></div>${sum}<div id="ce" class="err"></div><button class="btn wa" style="width:100%;margin-top:12px" data-a="wa">Order on WhatsApp</button><button class="btn ghost" style="width:100%;margin-top:8px" data-a="back">← Back to cart</button>`;
 $('#ov').innerHTML=`<div class="ov" data-a="close" style="justify-content:flex-end;padding:0"><div class="dr"><div class="hd">${step==1?'Your Cart':'Checkout'}<button class="ib" data-a="close">✕</button></div><div class="bd">${body}</div></div></div>`}
function sendWA(){const g=i=>$('#'+i).value.trim(),e=$('#ce'),n=g('cn'),m=g('cm2'),a=g('ca'),pc=g('cp');
 if(n.length<2)return e.textContent='Enter your name';if(!/^[6-9]\d{9}$/.test(m))return e.textContent='Enter a valid 10-digit mobile number';if(a.length<10)return e.textContent='Enter your full address';if(!/^\d{6}$/.test(pc))return e.textContent='Enter a valid 6-digit pincode';
 const c=calc(),id='TW'+Date.now().toString().slice(-6);
 const t=`*NEW ORDER – TWISTELO* 🧩\nOrder ID: ${id}\n\n*Customer*\nName: ${n}\nMobile: ${m}\nAddress: ${a}\nPincode: ${pc}\n\n*Items*\n${cart.map((i,x)=>`${x+1}. ${i.name}${i.v?' ('+i.v+')':''} × ${i.qty} = ${R(i.price*i.qty)}`).join('\n')}\n\nSubtotal: ${R(c.sub)}\n${c.disc?`Coupon (${V.coupon.code}): −${R(c.disc)}\n`:''}Shipping: ${c.ship?R(c.ship):'FREE'}\n*TOTAL TO PAY: ${R(c.total)}*\n\nPayment: ${g('cy')}${g('cx')?'\nNote: '+g('cx'):''}`;
 const u='https://wa.me/'+S.settings.wa.replace(/\D/g,'')+'?text='+encodeURIComponent(t);
 const w=window.open(u,'_blank');if(!w)location.href=u;cart=[];V.coupon=null;saveCart();$('#ov').innerHTML='';shop();toast('Opening WhatsApp…')}
document.addEventListener('click',async e=>{const t=e.target.closest('[data-a]');if(!t)return;const a=t.dataset.a,id=t.dataset.id,i=+t.dataset.i,g=x=>$('#'+x).value.trim();
 if(a=='cat'){V.cat=t.dataset.c;shop()}else if(a=='open')modal(id);else if(a=='close'){if(e.target==t||t.classList.contains('ib')||t.classList.contains('btn'))$('#ov').innerHTML=''}
 else if(a=='cart')drawer();else if(a=='back')drawer();else if(a=='co')drawer(2);else if(a=='wa')sendWA();
 else if(a=='inc'){cart[i].qty++;saveCart();drawer();shop()}else if(a=='dec'){cart[i].qty>1?cart[i].qty--:cart.splice(i,1);saveCart();drawer();shop()}else if(a=='rm'){cart.splice(i,1);saveCart();drawer();shop()}
 else if(a=='apply'){const c=S.coupons.find(x=>x.on&&x.code.toLowerCase()==g('cc').toLowerCase()),sub=calc().sub;if(!c){drawer();$('#cm').textContent='Invalid coupon code';return}if(sub<c.min){drawer();$('#cm').textContent='Minimum order '+R(c.min)+' required';return}V.coupon=c;drawer()}
 else if(a=='sl'){const s=$('#sl');s.scrollBy({left:+t.dataset.d*s.clientWidth,behavior:'smooth'})}else if(a=='copy'){try{navigator.clipboard.writeText(t.dataset.c)}catch(x){}toast('Code copied: '+t.dataset.c)}});
shop();
loadData().then(d=>{if(d){S=d;V.noAnim=true;shop()}});
