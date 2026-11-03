(() => {
  'use strict';
  const controls = [...document.querySelectorAll('[data-board-control]')];
  const detail = document.getElementById('boardDetail');
  if (!controls.length || !detail) return;
  const text = {
    'zh-Hant': {
      title: '主機板接口通用示意', type: '非特定型號', hint: '選擇元件，核對接口', caption: '俯視通用布局；位置依型號而異，不作接線參考。', reference: '接口例證：GIGABYTE Z490M 手冊', source: '查看對應功能',
      cpu: ['01 / CPU 插座', '處理器置於專用插座；圖示為插座，不把浮空 CPU 或裝飾線當成實際接點。', '#module-cpu'],
      dimm: ['02 / DIMM 記憶體插槽', '四條長槽，帶固定卡扣與防呆缺口。DDR 世代、插法與優先槽位請依實際主板手冊。', '#module-memory'],
      pcie: ['03 / PCIe x16 插槽', '長型擴充槽，含定位缺口與尾端卡扣。實體 x16 長度不代表實際鏈路一定有 16 條通道。', '#module-gpu'],
      m2: ['04 / M.2 M-key 接口', 'SSD 由短邊接入帶鍵位的插座，另一端以螺絲柱固定；不是把 M.2 畫成一條 DIMM 插槽。', '#module-storage'],
      sata: ['05 / SATA 資料接口', 'SATA 資料口有 L 形防呆，與 M.2 插座不同；SATA 裝置的電源線另外接到電源供應器。', '#module-storage'],
      eps: ['06 / EPS 8-pin CPU 供電', '以 2×4 接點表示 CPU 供電；不可與顯示卡的 PCIe 6+2-pin 混用。此圖不提供接腳電壓定義。', null],
      atx: ['07 / ATX 24-pin 主供電', '以 2×12 接點表示主板主供電，與 EPS 8-pin 分開。供電插座本身不是 XinSpect 的資料讀取接口。', null]
    },
    'zh-Hans': {
      title: '主板接口通用示意', type: '非特定型号', hint: '选择元件，核对接口', caption: '俯视通用布局；位置因型号而异，不作接线参考。', reference: '接口例证：GIGABYTE Z490M 手册', source: '查看对应功能',
      cpu: ['01 / CPU 插座', '处理器置于专用插座；图示为插座，不把浮空 CPU 或装饰线当成实际接点。', '#module-cpu'],
      dimm: ['02 / DIMM 内存插槽', '四条长槽，带固定卡扣与防呆缺口。DDR 代际、插法与优先槽位请依实际主板手册。', '#module-memory'],
      pcie: ['03 / PCIe x16 插槽', '长型扩展槽，含定位缺口与尾端卡扣。实体 x16 长度不代表实际链路一定有 16 条通道。', '#module-gpu'],
      m2: ['04 / M.2 M-key 接口', 'SSD 由短边接入带键位的插座，另一端以螺丝柱固定；不是把 M.2 画成一条 DIMM 插槽。', '#module-storage'],
      sata: ['05 / SATA 数据接口', 'SATA 数据口有 L 形防呆，与 M.2 插座不同；SATA 设备的电源线另外接到电源供应器。', '#module-storage'],
      eps: ['06 / EPS 8-pin CPU 供电', '以 2×4 接点表示 CPU 供电；不可与显卡的 PCIe 6+2-pin 混用。此图不提供接脚电压定义。', null],
      atx: ['07 / ATX 24-pin 主供电', '以 2×12 接点表示主板主供电，与 EPS 8-pin 分开。供电插座本身不是 XinSpect 的数据读取接口。', null]
    },
    en: {
      title: 'Motherboard interface study', type: 'Generic layout', hint: 'Select a component to inspect', caption: 'Generic top view. Layout varies by model. Not a wiring guide.', reference: 'Reference example: GIGABYTE Z490M manual', source: 'Explore the related feature',
      cpu: ['01 / CPU socket', 'The processor seats in a dedicated socket. This shows the socket itself, not a floating CPU or decorative lines pretending to be contacts.', '#module-cpu'],
      dimm: ['02 / DIMM slots', 'Four long slots with retention clips and a keyed notch. DDR generation and preferred slots depend on the actual board manual.', '#module-memory'],
      pcie: ['03 / PCIe x16 slot', 'A long expansion slot with a key and retention latch. Physical x16 length does not guarantee a negotiated x16 electrical link.', '#module-gpu'],
      m2: ['04 / M.2 M-key socket', 'The SSD enters a keyed edge socket and is secured at its far end by a standoff. M.2 is not a DIMM slot.', '#module-storage'],
      sata: ['05 / SATA data ports', 'L-keyed data ports are distinct from M.2. SATA drives also require a separate power connection from the power supply.', '#module-storage'],
      eps: ['06 / EPS 8-pin CPU power', 'Shown as 2×4 contacts. Do not interchange it with a GPU PCIe 6+2-pin cable. This diagram does not define pin voltages.', null],
      atx: ['07 / ATX 24-pin main power', 'Shown as 2×12 contacts, separate from EPS CPU power. The power connector itself is not a XinSpect data-reading interface.', null]
    }
  };
  let active = 'cpu';
  const language = () => text[document.documentElement.lang] ? document.documentElement.lang : 'zh-Hant';
  function render(animate = false) {
    const t = text[language()];
    const [title, description, href] = t[active];
    document.querySelectorAll('[data-board-copy]').forEach(el => { el.textContent = t[el.dataset.boardCopy] || ''; });
    controls.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.boardControl === active)));
    document.querySelectorAll('[data-board-region]').forEach(region => region.classList.toggle('is-selected', region.dataset.boardRegion === active));
    document.getElementById('boardMapTitle').textContent = t.title;
    document.querySelector('.board-controls').setAttribute('aria-label', t.hint);
    document.getElementById('boardDetailTitle').textContent = title;
    document.getElementById('boardDetailText').textContent = description;
    const link = document.getElementById('boardDetailLink');
    link.hidden = !href;
    if (href) { link.href = href; link.textContent = `${t.source} →`; } else { link.removeAttribute('href'); }
    if (animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      detail.classList.remove('is-changing');
      requestAnimationFrame(() => detail.classList.add('is-changing'));
    }
  }
  controls.forEach(button => button.addEventListener('click', () => { active = button.dataset.boardControl; render(true); }));
  new MutationObserver(() => render()).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  render();
})();
