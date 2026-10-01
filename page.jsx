'use client';
import { useEffect, useMemo, useState } from 'react';
import pageHtml from './legacyPage';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export default function Home(){
  const [apiStatus,setApiStatus]=useState('checking');
  const [products,setProducts]=useState([]);

  useEffect(()=>{
    fetch(`${API_BASE}/products`)
      .then(r=>{ if(!r.ok) throw new Error('API error'); return r.json(); })
      .then(data=>{ setProducts(Array.isArray(data?.data)?data.data:data); setApiStatus('connected'); })
      .catch(()=>setApiStatus('offline'));
  },[]);

  useEffect(()=>{
    const w=window;
    const allDistributors=[
      {id:1,nama:'Produsen',kota:'Solok',alamat:'Dusun Kampung Baru, Jorong Sawah Taluak, Nagari Cupak, Gunung Talang, Kabupaten Solok, Sumatera Barat - Indonesia',wa:'6285110500792',shopee:'https://shopee.co.id',lat:-0.8677431373323472,lng:100.6336641388682},
      {id:2,nama:'Distributor Kabupaten Solok',kota:'Solok',alamat:'Dusun Kampung Baru, Jorong Sawah Taluak, Nagari Cupak, Gunung Talang, Kabupaten Solok, Sumatera Barat - Indonesia',wa:'6285110500792',shopee:'https://shopee.co.id',lat:-0.8677431373323472,lng:100.6336641388682}
    ];
    let map=null,markers=[];
    const closePromoModal=()=>{const el=document.getElementById('promoModal'); if(!el)return; el.classList.add('opacity-0','pointer-events-none'); setTimeout(()=>el.remove(),300)};
    const switchView=(viewName)=>{document.querySelectorAll('.view-page').forEach(el=>el.classList.add('hidden'));const target=document.getElementById('view-'+viewName);if(target){target.classList.remove('hidden'); if(w.gsap)w.gsap.fromTo(target,{opacity:0,y:15},{opacity:1,y:0,duration:.4});}document.querySelectorAll('.nav-btn').forEach(btn=>{btn.getAttribute('data-target')===viewName?btn.classList.add('text-brand-cyan','bg-cyan-50'):btn.classList.remove('text-brand-cyan','bg-cyan-50')});if(viewName==='temukan')setTimeout(()=>{initMap();map?.invalidateSize()},100);w.scrollTo({top:0,behavior:'smooth'})};
    const toggleMobileMenu=()=>document.getElementById('mobileMenu')?.classList.toggle('hidden');
    const calculateHydration=()=>{const weight=parseFloat(document.getElementById('calcWeight')?.value)||60;const act=parseFloat(document.getElementById('calcActivity')?.value)||1;const ml=weight*35*act;document.getElementById('resultLiters').innerText=(ml/1000).toFixed(1)+' Liter / Hari';document.getElementById('resultGlasses').innerText='Setara ± '+Math.round(ml/250)+' botol (250ml)'};
    const renderDistributors=(data)=>{const c=document.getElementById('distributorListContainer');if(!c)return;c.innerHTML='';if(!data.length){c.innerHTML='<p class="text-xs text-slate-400 italic">Tidak ditemukan agen/distributor di kota ini.</p>';return}data.forEach(item=>{const d=document.createElement('div');d.className='p-4 rounded-2xl bg-white border border-slate-200 cursor-pointer hover:border-brand-cyan hover:shadow-md transition-all';d.innerHTML=`<h4 class="font-bold text-brand-navy text-sm">${item.nama}</h4><p class="text-xs text-slate-500 mt-1">${item.alamat}</p><span class="inline-block mt-2 text-[10px] bg-cyan-50 text-brand-cyan font-bold px-2 py-0.5 rounded-full">${item.kota}</span>`;d.onclick=()=>selectDistributor(item);c.appendChild(d)})};
    const selectDistributor=(item)=>{const n=document.getElementById('selectedDistName'),a=document.getElementById('selectedDistAddress'),wa=document.getElementById('selectedDistWa'),sh=document.getElementById('selectedDistShopee'),gm=document.getElementById('selectedDistMaps');if(n)n.innerText=item.nama;if(a)a.innerText=item.alamat;if(wa)wa.href=`https://wa.me/${item.wa}?text=Halo%20${encodeURIComponent(item.nama)},%20saya%20ingin%20pesan%20Neo%20Nero`;if(sh)sh.href=item.shopee||'https://shopee.co.id';if(gm)gm.href=`https://www.google.com/maps?q=${item.lat},${item.lng}`;if(map){map.flyTo([item.lat,item.lng],13,{animate:true,duration:1.5});markers.find(m=>m.id===item.id)?.markerInstance.openPopup()}};
    const searchDistributor=()=>{const q=(document.getElementById('searchLocationInput')?.value||'').toLowerCase();renderDistributors(allDistributors.filter(x=>x.nama.toLowerCase().includes(q)||x.kota.toLowerCase().includes(q)||x.alamat.toLowerCase().includes(q)))};
    const initMap=()=>{if(map||!w.L||!document.getElementById('leafletMap'))return;map=w.L.map('leafletMap').setView([-.9242,100.3626],8);w.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',{attribution:'Tiles © Esri'}).addTo(map);allDistributors.forEach(dist=>{const marker=w.L.marker([dist.lat,dist.lng]).addTo(map);marker.bindPopup(`<b>${dist.nama}</b><br>${dist.kota}`);marker.on('click',()=>{selectDistributor(dist);w.open(`https://www.google.com/maps?q=${dist.lat},${dist.lng}`,'_blank')});markers.push({id:dist.id,markerInstance:marker})})};
    const openOrderModal=(productName='Neo Nero Pure Water 600 ml')=>{const s=document.getElementById('orderProductSelect');if(s)s.value=productName;document.getElementById('orderModal')?.classList.remove('hidden')};
    const closeOrderModal=()=>document.getElementById('orderModal')?.classList.add('hidden');
    const openPartnerModal=()=>document.getElementById('partnerModal')?.classList.remove('hidden'); const closePartnerModal=()=>document.getElementById('partnerModal')?.classList.add('hidden');
    const waOpen=(text)=>w.open('https://wa.me/6285110500792?text='+encodeURIComponent(text),'_blank');
    const handleOrderSubmit=(e)=>{e.preventDefault();waOpen(`Halo Admin Neo Nero, saya mau pesan:\n\nNama/Instansi: ${e.target.orderNama?.value||''}\nNo. WA: ${e.target.orderWa?.value||''}\nProduk: ${e.target.orderProductSelect?.value||''}\nJumlah: ${e.target.orderJumlah?.value||''}\nAlamat: ${e.target.orderAlamat?.value||''}`);closeOrderModal();e.target.reset()};
    const handlePartnerSubmit=(e)=>{e.preventDefault();waOpen(`Halo Admin Neo Nero, saya berminat mendaftar Mitra/Distributor:\n\nNama/Instansi: ${e.target.partnerNama?.value||''}\nNo. WA: ${e.target.partnerWa?.value||''}\nKota/Wilayah: ${e.target.partnerKota?.value||''}\nJenis Kemitraan: ${e.target.partnerJenis?.value||''}\nCatatan: ${e.target.partnerCatatan?.value||''}`);closePartnerModal();e.target.reset()};
    const handleContactSubmit=(e)=>{e.preventDefault();waOpen(`Halo Customer Care Neo Nero, saya ingin mengajukan pertanyaan:\n\nNama/Instansi: ${e.target.nama?.value||''}\nEmail: ${e.target.email?.value||''}\nSubjek: ${e.target.subjek?.value||''}\nPesan: ${e.target.pesan?.value||''}`);e.target.reset()};
    const toggleFaq=(el)=>{el.querySelector('p')?.classList.toggle('hidden');el.querySelector('i')?.classList.toggle('rotate-180')};
    Object.assign(w,{closePromoModal,switchView,toggleMobileMenu,calculateHydration,searchDistributor,selectDistributor,openOrderModal,closeOrderModal,openPartnerModal,closePartnerModal,handleOrderSubmit,handlePartnerSubmit,handleContactSubmit,toggleFaq});
    const ready=setInterval(()=>{if(w.lucide){w.lucide.createIcons();clearInterval(ready)}},200);
    const timer=setTimeout(()=>{renderDistributors(allDistributors); const s=document.getElementById('tdsSlider'); const update=(val)=>{const v=Number(val);const d=document.getElementById('tdsValueDisplay'),t=document.getElementById('tdsCategoryTitle'),b=document.getElementById('tdsBadge'),c=document.getElementById('tdsCategoryDesc');if(!d||!t||!b||!c)return;d.innerHTML=`${v} <span class="text-xs font-normal text-slate-400">PPM</span>`;if(v<=30){t.innerText='Demineral (Neo Nero Pure Water Standard)';b.innerText='Sangat Murni';c.innerText='Air bebas dari zat padat terlarut dan endapan logam serta memberikan sensasi ringan di tenggorokan.'}else if(v<=150){t.innerText='MINERAL';b.innerText='Standar Ringan';c.innerText='Mengandung mineral alami.'}else{t.innerText='Air Keran / Sedimen Tinggi';b.innerText='Kadar Tinggi';c.innerText='Kandungan endapan dan logam terlarut tinggi. Memerlukan penyaringan lanjutan sebelum dikonsumsi.'}};if(s){s.addEventListener('input',e=>update(e.target.value));update(s.value||5)}},500);
    return()=>{clearInterval(ready);clearTimeout(timer)};
  },[]);

  return <>
    <div dangerouslySetInnerHTML={{__html:pageHtml}} />
    <div className="fixed bottom-4 right-4 z-[90] text-[10px] bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border shadow-sm text-slate-500">API: {apiStatus}{products.length?` • ${products.length} produk`:''}</div>
  </>;
}
