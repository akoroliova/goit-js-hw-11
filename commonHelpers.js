import{S as m,i as f}from"./assets/vendor-7659544d.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const o of e.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function a(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function i(t){if(t.ep)return;t.ep=!0;const e=a(t);fetch(t.href,e)}})();const p="42062449-cea48752956c1d9094f31db98",d=document.querySelector("form.search-form"),u=document.querySelector(".loader"),c=document.querySelector(".gallery"),y=new m(".gallery .gallery-link",{captions:!0,captionsData:"alt",captionPosition:"bottom"});function g(n){n.preventDefault(),h(),c.innerHTML="";let s=[];const a=encodeURIComponent(n.target.elements["search-field"].value);function i(){return fetch(`https://pixabay.com/api/?key=${p}&q=${a}&image_type=photo&orientation=horizontal&safesearch=true`).then(e=>{if(!e.ok)throw new Error(e.status);return e.json()})}i().then(e=>{e.total===0?(l(),f.error({position:"topRight",title:"",message:"Sorry, there are no images matching your search query. Please, try again!"})):(s=e.hits.map(r=>({href:r.largeImageURL,src:r.webformatURL,alt:r.tags,likes:r.likes,views:r.views,comments:r.comments,downloads:r.downloads})),l(),t(s),d.reset())}).catch(e=>{console.log(e),l()});function t(e){const o=e.map(r=>`<li class="gallery-card"><a class="gallery-link" href="${r.href}"><img class="gallery-image" src="${r.src}" alt="${r.alt}" /><div class="image-stats-card"><div class="image-stats-block"><p>Likes</p>${r.likes}</div><div class="image-stats-block"><p>Views</p>${r.views}</div><div class="image-stats-block"><p>Comments</p>${r.comments}</div><div class="image-stats-block"><p>Downloads</p>${r.downloads}</div></div></a></li>`).join("");c.insertAdjacentHTML("beforeend",o),y.refresh()}}d.addEventListener("submit",g);function h(){u.style.display="block"}function l(){u.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
