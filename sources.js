(() => {
  const labels = { 'zh-Hant': { general:'一般來源', implementation:'功能實作／官方來源' }, 'zh-Hans': { general:'一般来源', implementation:'功能实现／官方来源' }, en: { general:'General source', implementation:'Feature implementation / official source' } };
  const lang = () => document.documentElement.lang === 'zh-Hans' ? 'zh-Hans' : document.documentElement.lang === 'en' ? 'en' : 'zh-Hant';
  function apply() { const l=lang(); document.querySelectorAll('[data-source-en]').forEach(n => { n.textContent = l==='en'?n.dataset.sourceEn:l==='zh-Hans'?n.dataset.sourceHans:n.dataset.sourceHant; }); document.querySelectorAll('[data-source-kind]').forEach(n => { n.textContent=labels[l][n.dataset.sourceKind]||n.textContent; }); }
  new MutationObserver(apply).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',apply); else apply();
})();
