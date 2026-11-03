(() => {
  const root = document.documentElement;
  const sidebar = document.getElementById('sidebar');
  const menuButton = document.getElementById('mobileMenu');
  const themeButton = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const languageSwitcher = document.getElementById('languageSwitcher');
  const navLinks = [...document.querySelectorAll('[data-nav-link]')];
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const featureList = document.getElementById('featureList');
  const featureSearch = document.getElementById('featureSearch');
  const featureCountStatus = document.getElementById('featureCountStatus');
  const featureLoadState = document.getElementById('featureLoadState');
  const localeCodes = { 'zh-Hant': 'zh-Hant', 'zh-Hans': 'zh-Hans', en: 'en' };

  const COPY = {
    'zh-Hant': {
      aiHomeLabel: "XinSpect-Ai 測試版：文件解釋、引用與有限的配置分析",
      aiModelType: "測試版模型",
      aiTrainingStatus: "功能有限，持續驗證中",
      aiIntro: "目前定位為解釋 XinSpect 相關文件、依檢索資料提供引用，以及少量配置分析；仍在測試，能力與結果有明確限制。",
      aiInfoOnly: "此頁僅介紹專案，無網站內 AI 對話。功能依檢索資料與部署設定而定；缺少來源片段時可能答錯或編造出處，重要內容請回查原始資料。",
      aiRepoLink: "查看 XinSpect-Ai 測試版與測試報告 ↗",

      neutralityTitle: "立場說明", neutralityText: "本網站與 XinSpect 軟體無任何政治立場；內容僅用於技術資訊、產品說明與工程討論。", neutralityNoDefault: "本站不預設任何政治立場。",
      legalTitle: "法律與資料處理說明", legalHosting: "本站部署於 Cloudflare Workers 全球網路。依 Cloudflare 官方文件，Workers 預設在接近請求的位置執行，靜態資產亦由接近請求的位置提供；實際路由與處理方式取決於服務及網站設定，不代表伺服器固定於任何單一國家。", legalResponsibility: "本網站的營運與資料處理須遵守適用法律。法規適用、跨境處理及供應商處理細節，應參照 Cloudflare 官方政策與本網站實際設定；供應商的政策或條款，不構成本網站已取得法律合規或資料保護認證的保證。", legalPractical: "本介紹網站不掃描裝置硬體；語言與主題偏好儲存在你的瀏覽器。問題回報只有在你自願勾選同意並明確提交後，才會將報告與通過檢查的文字／圖片附件送至 Cloudflare 私有資料庫；Turnstile 會把必要資料交給 Cloudflare 作人機驗證。未提交前不會由回報工具自動上傳。連線與請求資訊仍可能依供應商政策及網站設定被處理；GitHub 等外部網站各有其政策。", legalPlacementLink: "Cloudflare 官方執行位置說明", legalPrivacyLink: "Cloudflare 官方隱私政策",
      skip: `跳至主要內容`, siteNav: `網站導覽`, brandAria: `XinSpect 產品總覽`, brandPhrase: `「另種可能」`, brandEdition: `Windows 桌面版`, productNav: `產品導覽`, sectionNav: `產品區段`, navOverview: `產品總覽`, navCatalog: `事實目錄`, navModules: `功能與資料源`, navReconcile: `三源對帳`, navEvidence: `證據與快照`, navDocs: `文件與開源資料`, navHistory: `版本沿革`, navPrivacy: `隱私與邊界`, navDownload: `下載與需求`, sidebarNote: `這是產品介紹網站，<strong>不會讀取這台裝置的硬體數值</strong>。`, sourceStamp: `依據官方發布與原始碼`, openGithub: `開啟 GitHub 專案`, openNav: `開啟導覽`, closeNav: `關閉導覽`, languageLabel: `語言`, breadcrumb: `產品說明`, themeToggle: `切換明暗主題`, themeToLight: `切換明亮主題`, themeToDark: `切換深色主題`, pageTitle: `XinSpect「另種可能」— 讓事實有來源`, pageDescription: `認識 XinSpect Windows 桌面版功能、資料來源、文件與測試邊界。此網站不會掃描你的電腦。`, ogDescription: `認識 XinSpect Windows 桌面版功能、資料來源、文件與測試邊界。此網站不會掃描你的電腦。`,
      heroAlt: `XinSpect 硬體概念插畫：處理器、記憶體與主機板的 Swiss 現代風圖像`, eyebrow: `WINDOWS 原生工具`, heroTitleA: `硬體、韌體、Windows`, heroTitleB: `三種說法，一起核對。`, heroIntro: `XinSpect 是 Windows 上的硬體檢視、監控與安全稽核工具。它把讀值、資料來源與可用狀態放在一起，讓你知道每個數字由誰提供，也看見哪些仍無法確認。`, latestRelease: `下載 XinSpect v3.13`, browseSource: `閱讀功能文件`, heroMeta1: `免費開源`, heroMeta3: `預設唯讀`, corePrinciple: `核心原則`, heroSideTitle: `讀不到，不等於正常。`, heroSideSub: `來源可追溯<br>判讀留給使用者`, truthLead: `這裡沒有即時硬體讀值或測試按鈕。`, truthBody: `這是依官方發布、對應原始碼與可追溯文件整理的桌面軟體介紹；本網站不會掃描你的電腦。`, readDocs: `查看文件`,
      catalogTitle: `先看清楚：這些是目錄數，不是虛構讀值`, catalogIntro: `以下規模依 v3.13 官方 README 與對應目錄統計；可由來源連結回查。`, readmeEvidence: `v3.13 官方文件依據`, metricKeys: `編譯期事實鍵`, metricKeysDesc: `編譯期目錄中的資料項識別鍵；不是掃描結果，也不代表每台電腦都能讀到全部項目。`, metricDomains: `事實域`, metricDomainsDesc: `涵蓋硬體、韌體、作業系統、裝置與證據等不同資料範圍。`, metricDynamic: `動態鍵家族`, metricDynamicDesc: `表示可依裝置或讀取情境展開的事實項目家族。`, catalogFoot: `只描述 v3.13 原始碼目錄，不是掃描結果、準確率、完成度或硬體支援保證。`, countMethod: `查看領域計數程式`,
      modulesTitle: `功能介紹：每一類資料，都交代來源`, modulesIntro: `以下說明桌面程式具備的資料路徑。實際可讀項目會受硬體、韌體、驅動、權限與作業系統版本影響。`, modulesMeta: `功能依 v3.13 官方來源`, cpuTitle: `處理器與即時狀態`, cpuDesc: `把規格與當下狀態分開看：CPUID 提供識別與能力；感測器提供即時封裝與核心讀值，另有以 NtQuerySystemInformation 差分計算的逐邏輯處理器使用率與走勢；MSR 路徑則提供獨立的頻率、功耗與熱狀態讀取。`, sensor: `感測器`, caveat: `判讀邊界`, cpuCaveat: `即時走勢以秒級取樣，捕捉不到更短的尖峰；VBS／HVCI 也可能影響部分 MSR 讀值。`, cpuSource: `README · 處理器功能與限制`, memoryTitle: `記憶體模組與實際配置`, memoryDesc: `對照 SPD／SMBus 直讀、SMBIOS／WMI 回報與目前生效狀態：模組／插槽資訊、JEDEC 與 XMP／EXPO 設定檔、實際時序和使用量分別保留其來源。`, windows: `Windows`, memoryCaveat: `額定速度不等於目前生效速度；未填欄位留空，不猜通道數或補上推測值。`, memorySource: `README · 記憶體資料來源`, storageTitle: `儲存裝置健康與計數器`, storageDesc: `呈現 ATA SMART 與 NVMe 裝置回報的健康、磨耗、錯誤與累計計數器，並把控制器／裝置路徑分開，避免把韌體估算值寫成獨立量測。`, storageCaveat: `健康與磨耗常是裝置韌體自報；讀不到、裝置不支援與讀取失敗不是同一種狀態。`, storageSource: `README · 儲存資料與限制`, gpuTitle: `顯示卡與 PCIe 鏈路`, gpuDesc: `整合裝置識別、驅動回報與 PCIe 資訊；NVIDIA 裝置可使用 NVML 顯示溫度、功耗、時脈、風扇與 ECC 等欄位；多顯示卡可列出轉接器數量，並標示是否混合廠商。`, gpuCaveat: `NVML 不適用於所有顯示卡；來源未提供時顯示不可用，不以 0 代替。`, gpuSource: `README · 顯示卡功能`, boardTitle: `主機板、韌體與安全狀態`, boardDesc: `集中呈現 SMBIOS、ACPI、UEFI 變數、BIOS／微碼、PCI 資源與部分晶片組安全旗標；韌體安全頁把讀取通路與判讀依據一起列出。`, boardCaveat: `部分低階項目需要系統管理員權限及就緒的唯讀驅動；XinSpect 不替你刷寫 BIOS。`, boardSource: `README · 主機板與韌體安全`, osTitle: `Windows 系統與歷史脈絡`, osDesc: `整合 Windows 系統回報與 WMI 效能計數器，摘要最近 7 天 System 事件記錄中的嚴重／錯誤事件；另提供近期感測走勢、歷史回放、裝置診斷與 HTML／Markdown／純文字報告匯出。`, osCaveat: `事件與讀值同時出現不代表因果；Windows／驅動自報值會標為回報來源。`, osSource: `README · 系統與歷史功能`, monitoringLead: `即時值與規格值分開；每秒取樣不冒充毫秒級量測。`, monitoringDesc: `總覽圖表保留近 90 秒走勢；歷史回放保留近一小時的秒級樣本，較早資料按分鐘保存最小／平均／最大值。`, monitoringSource: `查看讀值與時間界線`,
      reconcileTitle: `不同來源，逐條對照`, reconcileIntro: `硬體、韌體與 Windows 不是互相替代的答案，而是各自帶著來源與限制的證詞。`, noHealthScore: `不合成單一整機健康判決`, sourcesAlt: `硬體、韌體與作業系統三種資料來源的概念插畫`, sourceHardwareTitle: `硬體自己說的`, sourceHardwareDesc: `CPUID、MSR、PCI、感測器，以及 SPD／SMBus、SMART／NVMe 等硬體或裝置讀取路徑。`, sourceFirmwareTitle: `韌體提供的`, sourceFirmwareDesc: `SMBIOS、ACPI、UEFI 變數與平台宣告；欄位空白時不自行補猜。`, sourceWindowsTitle: `Windows 回報的`, sourceWindowsDesc: `WMI／CIM、效能計數器、驅動與事件紀錄；回報值保留其來源性質。`, reconcileFoot: `對帳只陳述「一致、矛盾或無法驗證」及其依據。缺少來源時不把空白當成通過，也不替使用者下硬體好壞結論。`, statusTitle: `「沒有讀值」有不同原因`, statusPresent: `已讀到，來源路徑確認`, statusUnknown: `有值但來源／判讀未確認`, statusNA: `本機情境不適用`, statusUnsupported: `硬體或平台不支援`, statusPrivilege: `權限或驅動不足`, statusError: `嘗試讀取但失敗`, statusFoot: `不是 Present 的事實不以數字 0 填補；「零」只應代表真的量到零。`, trustTitle: `來源標籤不等於準確度保證`, measured: `直接量測`, measuredDesc: `程式直接讀取或量出，例如 MSR、感測器。`, reported: `外部回報`, reportedDesc: `由 Windows、驅動或韌體宣告，未由程式獨立驗證。`, derived: `衍生計算`, derivedDesc: `由其他事實推算；不是第二個獨立證據。`, unknown: `尚未確認`, unknownDesc: `來源或路徑不明，只能作為待查線索。`, trustFoot: `「實測」不代表不會錯；標籤描述的是來源性質。`, sourceTaxonomy: `來源：README 的六態與來源分類定義`,
      evidenceTitle: `從讀值，到能回頭核對的證據`, evidenceIntro: `保留每項事實的來源、可信度與時間，方便比對變化；不把變化直接說成故障、換件或竄改。`, hashNote: `完整性校驗<br>不是數位簽章`, snapshotTitle: `版本化「時間膠囊」快照`, snapshotDesc: `以 JSON 保存當時實際讀到的硬體事實，附建立時間、程式版本及 SHA-256 完整性雜湊；可用穩定鍵逐欄比對新增、消失與變更。`, snapshotCallout: `差異代表讀值不同，不自動推論原因。`, lineageTitle: `每欄保留資料血統`, lineageDesc: `可查看值由哪個來源提供、屬於哪種來源性質、何時讀取；沒有讀到的欄位不補成 0。`, lineageCallout: `來源回答「誰這樣說」。`, privacyShareTitle: `分享前檢視隱私欄位`, privacyShareDesc: `快照預設遮蔽標記為敏感的值；遮蔽範圍取決於事實的敏感標記，匯出或分享前仍應檢查內容。`, hashCaveat: `SHA-256 可檢查修改，不證明作者或來源。`, evidenceFoot: `資料只保存當時能讀到的項目；裝置、權限或通路不同，快照內容也會不同。`, evidenceSource: `閱讀證據實驗室說明`,
      docsTitle: `功能文件與開源資料`, docsIntro: `功能資料連到目前 main README、官方發布說明及主線方法／限制文件；各項均標明來源。`, docsMeta: `每項連回官方儲存庫`, docCurrent: `目前 main 官方 README · v3.13`, docEncyclopediaTitle: `功能百科（v3.13）`, docEncyclopediaDesc: `目前 main README 彙整 v3.13 功能、資料來源、可複算目錄數、判讀方式與限制。`, openEncyclopedia: `閱讀官方功能百科`, docMethod: `主線文件快照`, docMethodTitle: `量測方法與限制`, docMethodDesc: `方法文件描述已實作的資料契約、狀態與來源區分；已知限制頁列出不可讀、未支援與刻意不做的事項。`, methodLink: `量測方法`, limitsLink: `已知限制`, driverKicker: `低階硬體通路 · 權限與風險`, driverTitle: `WinRing0 與 Administrator：先看清楚再執行`, driverDesc: `v3.13 來源記載 WinRing0 負責 MSR／PCI 設定空間；MMIO 後端會先實際探測，XsRegProbe 僅限開發機。這些低階通路涉及核心驅動與權限，並非每項功能都使用。`, adminMismatch: `<strong>啟動權限來源仍有落差：</strong>v3.13 <code>app.manifest</code> 要求 <code>requireAdministrator</code>，但 v3.13 README 說明未提權時部分頁面仍可開啟、低階感測等讀值會顯示「—」。請留意下載檔實際出現的 Windows UAC 提示。`, manifestLink: `檢視 v3.13 manifest`, bridgeLink: `檢視 WinRing0 bridge`, releaseReqLink: `v3.13 官方發布與說明`, verificationTitle: `測試紀錄與執行範圍`, verificationIntro: `目前 main README 列出專案測試基線；本網站未執行 XinSpect 桌面程式測試。`, verifyRelease: `目前 main README 測試基線`, verifyReleaseDesc: `目前 main README 列出 7,820 條專案測試基線；v3.10 發布說明另記載受影響測試 109/109 通過。這些是上游紀錄，不是本網站的測試結果。`, releaseTestLink: `檢視目前 main 官方 README`, verifyCI: `CI 與平台覆蓋`, guardTests: `選取的守門測試`, verifyCIDesc: `GitHub Actions 使用 windows-latest，執行建置、選定守門測試與文件檢查；不在託管 runner 跑完整硬體相依測試。沒有專用 Server 2025 CI 矩陣。`, ciLink: `檢視主線 CI 工作流`, licenseTitle: `雙授權 · AGPL-3.0-or-later 或商業授權`, licenseDesc: `兩種授權二選一、功能相同且不可疊加；商業授權可涵蓋任何版本。AGPL 下散布修改版或以網路服務提供他人使用時，須遵守相同授權公開原始碼。商標與標誌不在授權範圍；第三方元件另有各自條款。`, licenseLink: `LICENSE`, thirdPartyLink: `第三方 notices`, sourceCodeLink: `原始碼倉庫`,
      privacyTitle: `一般資料在本機處理；外連由你選擇`, privacyIntro: `一般硬體讀取、監控與歷史資料由 Windows 桌面程式在本機處理。若選用雲端 AI 評價，所送資料與用途依你設定的服務及其政策而定；使用本機 Ollama 時，請依本機設定核對資料路徑。`, privacyPoint1: `唯讀是常見路徑`, privacyPoint1Desc: `少數會寫入系統或硬體的功能另有操作提示與限制；請依功能說明確認。`, privacyPoint2: `權限與驅動有影響`, privacyPoint2Desc: `低階感測／讀取受系統管理員權限、驅動及硬體支援度影響；WinRing0 風險見上方專節。`, privacyPoint3: `網站不讀取硬體`, privacyPoint3Desc: `此頁不呼叫硬體 API、不執行壓力測試，也不生成假讀值；內容只是產品說明。`, privacyReadme: `資料主權與隱私說明`, privacyLimits: `已知限制與刻意不做的事`, downloadTitle: `在 Windows 上，讀取真實來源。`, downloadDesc: `v3.13 官方 Release 附有主程式、獨立守護程式、安裝器、XsRegProbe 驅動及 SHA256SUMS.txt。最新 main README 的主程式位元組數已與 Release 附件一致；v3.13 標籤版 README 保留較早數字，詳見下方註記。`, downloadLatest: `下載 XinSpect.exe · v3.13`, viewSource: `檢視原始碼`, requirements: `系統需求 · v3.13`, osLabel: `作業系統`, archLabel: `架構`, runtimeLabel: `執行環境`, licenseLabel: `授權`, requirementsFoot: `依 v3.13 README：Windows 10 1903 以上／Windows 11、x64、.NET 10 Desktop Runtime；權限來源差異見上方說明。`, releaseNote: `執行前請在官方 v3.13 Release 頁確認實際附件與 SHA256SUMS.txt；下方註明標籤版 README 的舊位元組數與目前 main 的更正。`, footerPhrase: `讓事實有來源，讓未知保持未知。`, footerGithub: `GitHub 專案 ↗`, footerDocs: `文件索引 ↗`, footerLatest: `官方發布頁 ↗`, footerSource: `依 v3.13 官方發布、目前 main README、對應原始碼與可追溯文件整理；實際讀值仍取決於平台、權限、驅動及硬體支援。`,
      licenseValue: `AGPL-3.0-or-later 或商業授權（二選一）`, licenseFooter: `DUAL LICENSE · AGPL-3.0-OR-LATER OR COMMERCIAL · WINDOWS x64`, commercialLicenseLink: `商業授權條款`, releaseUpdateKicker: `OFFICIAL MAINLINE · v3.13 · 2026-11-01`, releaseUpdateTitle: `近期版本，改了哪些實際使用細節？`, releaseUpdateIntro: `以下摘要 v3.06–v3.13 正式主線中對使用者有影響的變更；實驗版另行標示，不混入正式版功能。`, releaseHistoryTitle: `監控規劃：十項工程設計試算`, releaseHistoryBody: `v3.13 新增十項監控設計計算（NVR 容量、接入頻寬、PoE、交換機、光纖、壓降、佈線、RAID、無線與 UPS／機櫃）。數值只由宣告輸入推導、不讀本機硬體；輸入不足時不補假數字。規劃 JSON 留在本機，只有儲存後才進入 plan.cctv.* 事實集與匯出報告；規劃仍需實地驗收。`, releaseTelemetryTitle: `藍色中隊預設關閉，並補上 Win11 安全基線`, releaseTelemetryBody: `新安裝預設不啟用常駐守護進程；唯讀態勢評估仍可用。新增 SMB、NTLM、ASR、Smart App Control、PowerShell 記錄、Defender PUA 與自動播放等檢查；讀不到的資訊標示「未評估」，不當作通過。`, releaseDeliveryTitle: `M.2／U.2 分析不再卡住主視窗`, releaseDeliveryBody: `M.2／U.2 分析改在背景收集、回 UI 執行緒套用；磁碟 WMI 查詢設 3 秒上限。逾時與讀取失敗分開說明，不再留白冒充「沒有磁碟」。`, releaseSourceLatest: `v3.13 正式版發布說明`, releaseTaggedReadme: `檢視 v3.13 標籤版 README`, releaseSourceTelemetry: `v3.13 安全與基線發布說明`, releaseSourceInstaller: `v3.06 部署器說明`, releaseSourceLicense: `v3.08 授權說明`, releaseExperimentalNote: `v3.11 Swiss／Helvetica 介面是 experiment/swiss-helvetica 分支的預發布實驗，不是 v3.13 正式版能力。此網站已改用 Helvetica 優先、搭配 Arial 與繁中文字體的系統 fallback。`, releaseSourceExperimental: `檢視 v3.11 實驗版來源`, assetMismatchNote: `附件查核（2026-11-01）：v3.13 Release 附有 XinSpect.exe（37,553,451 bytes）、BlueSquadronBridge.exe（6,502,948 bytes）、XinSpectDeploy.exe（16,896 bytes）、XsRegProbe.sys（24,064 bytes）及 SHA256SUMS.txt（334 bytes）。v3.13 標籤內 README 曾記主程式為 37,393,707 bytes；目前 main README 已修正為與 Release 附件相同的 37,553,451 bytes。請以官方發布頁附件與校驗清單為準。`, releaseChangesHeading: `主要變更`, releaseTestHeading: `測試／支援註記`, releaseFidelityHeading: `資料註記`, releaseLinkLabel: `官方 GitHub Release`, releaseNoTest: `該發布記錄未提供可核實的測試或支援細節。`, releaseNoChanges: `發布摘要未提供更多逐項變更。`, releaseLoadError: `版本摘要暫時無法載入。請使用官方 Releases 頁查看原始資料。`, releaseNoMatches: `沒有符合搜尋的版本。`, releaseCount: (shown, total) => `顯示 ${shown} / ${total} 筆`
    },
    'zh-Hans': {
      aiHomeLabel: "XinSpect-Ai 测试版：文档解释、引用与有限的配置分析",
      aiModelType: "测试版模型",
      aiTrainingStatus: "功能有限，持续验证中",
      aiIntro: "目前定位为解释 XinSpect 相关文档、依据检索资料提供引用，以及少量配置分析；仍在测试，能力与结果有明确限制。",
      aiInfoOnly: "此页仅介绍项目，不提供网站内 AI 对话。功能取决于检索资料与部署设置；缺少来源片段时可能答错或编造出处，重要内容请回查原始资料。",
      aiRepoLink: "查看 XinSpect-Ai 测试版与测试报告 ↗",

      neutralityTitle: "立场说明", neutralityText: "本网站与 XinSpect 软件无任何政治立场；内容仅用于技术信息、产品说明与工程讨论。", neutralityNoDefault: "本站不预设任何政治立场。",
      legalTitle: "法律与数据处理说明", legalHosting: "本站部署于 Cloudflare Workers 全球网络。根据 Cloudflare 官方文档，Workers 默认在接近请求的位置运行，静态资源也由接近请求的位置提供；实际路由与处理方式取决于服务及网站设置，不代表服务器固定于任何单一国家。", legalResponsibility: "本网站的运营与数据处理须遵守适用法律。法规适用、跨境处理及供应商处理详情，应参照 Cloudflare 官方政策与本网站实际设置；供应商的政策或条款，不构成本网站已取得法律合规或数据保护认证的保证。", legalPractical: "本介绍网站不扫描设备硬件；语言与主题偏好保存在你的浏览器中。问题反馈只有在你自愿勾选同意并明确提交后，才会将报告与通过检查的文本／图片附件发送至 Cloudflare 私有数据库；Turnstile 会将必要数据交给 Cloudflare 作人机验证。未提交前反馈工具不会自动上传。连接与请求信息仍可能依据供应商政策及网站设置被处理；GitHub 等外部网站各有其政策。", legalPlacementLink: "Cloudflare 官方运行位置说明", legalPrivacyLink: "Cloudflare 官方隐私政策",
      skip: `跳到主要内容`, siteNav: `网站导航`, brandAria: `XinSpect 产品总览`, brandPhrase: `“另种可能”`, brandEdition: `Windows 桌面版`, productNav: `产品导航`, sectionNav: `产品区段`, navOverview: `产品总览`, navCatalog: `事实目录`, navModules: `功能与数据源`, navReconcile: `三源对账`, navEvidence: `证据与快照`, navDocs: `文档与开源资料`, navHistory: `版本沿革`, navPrivacy: `隐私与边界`, navDownload: `下载与需求`, sidebarNote: `这是产品介绍网站，<strong>不会读取这台设备的硬件数值</strong>。`, sourceStamp: `依据官方发布与源代码`, openGithub: `打开 GitHub 项目`, openNav: `打开导航`, closeNav: `关闭导航`, languageLabel: `语言`, breadcrumb: `产品说明`, themeToggle: `切换明暗主题`, themeToLight: `切换浅色主题`, themeToDark: `切换深色主题`, pageTitle: `XinSpect“另种可能”——让事实有来源`, pageDescription: `了解 XinSpect Windows 桌面版功能、数据来源、文档与测试边界。本网站不会扫描你的电脑。`, ogDescription: `了解 XinSpect Windows 桌面版功能、数据来源、文档与测试边界。本网站不会扫描你的电脑。`,
      heroAlt: `XinSpect 硬件概念插画：处理器、内存与主板的 Swiss 现代风图像`, eyebrow: `WINDOWS 原生工具`, heroTitleA: `硬件、固件、Windows`, heroTitleB: `三种说法，一起核对。`, heroIntro: `XinSpect 是 Windows 上的硬件查看、监控与安全审计工具。它把读数、数据来源与可用状态放在一起，让你知道每个数字由谁提供，也看见哪些仍无法确认。`, latestRelease: `下载 XinSpect v3.13`, browseSource: `阅读功能文档`, heroMeta1: `免费开源`, heroMeta3: `默认只读`, corePrinciple: `核心原则`, heroSideTitle: `读不到，不等于正常。`, heroSideSub: `来源可追溯<br>判读留给用户`, truthLead: `这里没有实时硬件读数或测试按钮。`, truthBody: `这是依据官方发布、对应源代码与可追溯文档整理的桌面软件介绍；本网站不会扫描你的电脑。`, readDocs: `查看文档`,
      catalogTitle: `先看清楚：这些是目录数，不是虚构读数`, catalogIntro: `以下规模依据 v3.13 官方 README 与对应目录统计；可通过来源链接回查。`, readmeEvidence: `v3.13 官方文件依据`, metricKeys: `编译期事实键`, metricKeysDesc: `编译期目录中的数据项标识键；不是扫描结果，也不代表每台电脑都能读到全部项目。`, metricDomains: `事实域`, metricDomainsDesc: `涵盖硬件、固件、操作系统、设备与证据等不同数据范围。`, metricDynamic: `动态键族`, metricDynamicDesc: `表示可根据设备或读取情境展开的事实项族。`, catalogFoot: `仅描述 v3.13 源代码目录，不是扫描结果、准确率、完成度或硬件支持保证。`, countMethod: `查看领域计数程序`,
      modulesTitle: `功能介绍：每类数据都交代来源`, modulesIntro: `以下说明桌面程序具备的数据路径。实际可读取项目受硬件、固件、驱动、权限与操作系统版本影响。`, modulesMeta: `功能依据 v3.13 官方来源`, cpuTitle: `处理器与实时状态`, cpuDesc: `把规格与当前状态分开看：CPUID 提供识别与能力；传感器提供实时封装与核心读数，另有通过 NtQuerySystemInformation 差分计算的逐逻辑处理器使用率与趋势；MSR 路径则提供独立的频率、功耗与热状态读取。`, sensor: `传感器`, caveat: `判读边界`, cpuCaveat: `实时趋势按秒采样，捕捉不到更短的尖峰；VBS／HVCI 也可能影响部分 MSR 读数。`, cpuSource: `README · 处理器功能与限制`, memoryTitle: `内存模块与实际配置`, memoryDesc: `对照 SPD／SMBus 直读、SMBIOS／WMI 回报与当前生效状态：模块／插槽信息、JEDEC 与 XMP／EXPO 配置文件、实际时序和使用量分别保留其来源。`, windows: `Windows`, memoryCaveat: `额定速度不等于当前生效速度；未填写的字段保持空白，不猜通道数或补上推测值。`, memorySource: `README · 内存数据来源`, storageTitle: `存储设备健康与计数器`, storageDesc: `呈现 ATA SMART 与 NVMe 设备回报的健康、磨损、错误与累计计数器，并区分控制器／设备路径，避免把固件估算值写成独立测量。`, storageCaveat: `健康与磨损常由设备固件自行回报；读不到、设备不支持与读取失败不是同一种状态。`, storageSource: `README · 存储数据与限制`, gpuTitle: `显卡与 PCIe 链路`, gpuDesc: `整合设备识别、驱动回报与 PCIe 信息；NVIDIA 设备可使用 NVML 显示温度、功耗、时钟、风扇与 ECC 等字段；多张显卡可列出显示转接器数量，并标示是否为混合厂商。`, gpuCaveat: `NVML 不适用于所有显卡；来源未提供时显示不可用，不以 0 代替。`, gpuSource: `README · 显卡功能`, boardTitle: `主板、固件与安全状态`, boardDesc: `集中呈现 SMBIOS、ACPI、UEFI 变量、BIOS／微码、PCI 资源与部分芯片组安全标记；固件安全页会列出读取通道与判读依据。`, boardCaveat: `部分低层项目需要管理员权限及就绪的只读驱动；XinSpect 不会替你刷写 BIOS。`, boardSource: `README · 主板与固件安全`, osTitle: `Windows 系统与历史脉络`, osDesc: `整合 Windows 系统回报与 WMI 性能计数器，摘要最近 7 天 System 事件记录中的严重／错误事件；另提供近期传感趋势、历史回放、设备诊断与 HTML／Markdown／纯文本报告导出。`, osCaveat: `事件与读数同时出现不代表因果；Windows／驱动自行回报的值会标明为回报来源。`, osSource: `README · 系统与历史功能`, monitoringLead: `实时值与规格值分开；每秒采样不冒充毫秒级测量。`, monitoringDesc: `总览图表保留近 90 秒趋势；历史回放保留近一小时的秒级样本，更早的数据按分钟保存最小／平均／最大值。`, monitoringSource: `查看读数与时间边界`,
      reconcileTitle: `不同来源，逐条对照`, reconcileIntro: `硬件、固件与 Windows 不是互相替代的答案，而是各自带有来源与限制的证词。`, noHealthScore: `不合成单一整机健康判决`, sourcesAlt: `硬件、固件与操作系统三种数据来源的概念插画`, sourceHardwareTitle: `硬件自身提供`, sourceHardwareDesc: `CPUID、MSR、PCI、传感器，以及 SPD／SMBus、SMART／NVMe 等硬件或设备读取路径。`, sourceFirmwareTitle: `固件提供`, sourceFirmwareDesc: `SMBIOS、ACPI、UEFI 变量与平台声明；字段为空时不自行猜测补齐。`, sourceWindowsTitle: `Windows 回报`, sourceWindowsDesc: `WMI／CIM、性能计数器、驱动与事件记录；回报值保留其来源性质。`, reconcileFoot: `对账只陈述“一致、矛盾或无法验证”及其依据。缺少来源时不把空白当成通过，也不替用户判断硬件好坏。`, statusTitle: `“没有读数”有不同原因`, statusPresent: `已读取，来源路径已确认`, statusUnknown: `有值但来源／判读未确认`, statusNA: `当前情境不适用`, statusUnsupported: `硬件或平台不支持`, statusPrivilege: `权限或驱动不足`, statusError: `尝试读取但失败`, statusFoot: `非 Present 的事实不以数字 0 填补；“零”只应代表确实测得零。`, trustTitle: `来源标签不等于准确度保证`, measured: `直接测量`, measuredDesc: `由程序直接读取或测得，例如 MSR、传感器。`, reported: `外部回报`, reportedDesc: `由 Windows、驱动或固件声明，未经程序独立验证。`, derived: `推导计算`, derivedDesc: `根据其他事实推算；不是第二份独立证据。`, unknown: `尚未确认`, unknownDesc: `来源或路径不明，只能作为待查线索。`, trustFoot: `“实测”不代表不会出错；标签描述的是来源性质。`, sourceTaxonomy: `来源：README 的六种状态与来源分类定义`,
      evidenceTitle: `从读数，到可以回头核对的证据`, evidenceIntro: `保留每项事实的来源、可信度与时间，便于比较变化；不把变化直接说成故障、换件或篡改。`, hashNote: `完整性校验<br>不是数字签名`, snapshotTitle: `版本化“时间胶囊”快照`, snapshotDesc: `以 JSON 保存当时实际读取到的硬件事实，附创建时间、程序版本及 SHA-256 完整性哈希；可用稳定键逐项比较新增、消失与变化。`, snapshotCallout: `差异表示读数不同，不自动推断原因。`, lineageTitle: `每个字段保留数据血统`, lineageDesc: `可查看数值由哪个来源提供、属于哪种来源性质、何时读取；没有读到的字段不补成 0。`, lineageCallout: `来源回答“谁这样说”。`, privacyShareTitle: `分享前检查隐私字段`, privacyShareDesc: `快照默认遮蔽标记为敏感的值；遮蔽范围取决于事实的敏感标记，导出或分享前仍应检查内容。`, hashCaveat: `SHA-256 可检查修改，不证明作者或来源。`, evidenceFoot: `数据只保存当时能读取的项目；设备、权限或通道不同，快照内容也会不同。`, evidenceSource: `阅读证据实验室说明`,
      docsTitle: `功能文档与开源资料`, docsIntro: `功能资料链接至当前 main README、官方发布说明及主线方法／限制文档；各项均标明来源。`, docsMeta: `每项链接回官方仓库`, docCurrent: `当前 main 官方 README · v3.13`, docEncyclopediaTitle: `功能百科（v3.13）`, docEncyclopediaDesc: `当前 main README 汇总 v3.13 功能、数据来源、可复算目录数量、判读方式与限制。`, openEncyclopedia: `打开官方百科`, docMethod: `主线文档快照`, docMethodTitle: `测量方法与限制`, docMethodDesc: `方法文档描述已实现的数据契约、状态与来源区分；已知限制页列出不可读、不支持与刻意不做的事项。`, methodLink: `测量方法`, limitsLink: `已知限制`, driverKicker: `低层硬件通道 · 权限与风险`, driverTitle: `WinRing0 与 Administrator：先了解再运行`, driverDesc: `v3.13 来源记载 WinRing0 负责 MSR／PCI 配置空间；MMIO 后端会先实际探测，XsRegProbe 仅限开发机。这些底层路径涉及内核驱动与权限，并非每项功能都会使用。`, adminMismatch: `<strong>启动权限来源仍有差异：</strong>v3.13 <code>app.manifest</code> 要求 <code>requireAdministrator</code>，但 v3.13 README 说明未提权时部分页面仍可打开，底层传感器等读数会显示“—”。请留意下载文件实际出现的 Windows UAC 提示。`, manifestLink: `查看 v3.13 manifest`, bridgeLink: `查看 WinRing0 bridge`, releaseReqLink: `v3.13 官方发布与说明`, verificationTitle: `测试记录与运行范围`, verificationIntro: `当前 main README 列出项目测试基线；本网站未运行 XinSpect 桌面程序测试。`, verifyRelease: `当前 main README 测试基线`, verifyReleaseDesc: `当前 main README 列出 7,820 条项目测试基线；v3.10 发布说明另记载受影响测试 109/109 通过。这些是上游记录，不是本网站的测试结果。`, releaseTestLink: `查看当前 main 官方 README`, verifyCI: `CI 与平台覆盖`, guardTests: `选定的守门测试`, verifyCIDesc: `GitHub Actions 使用 windows-latest，运行构建、选定守门测试与文档检查；托管 runner 不运行完整硬件依赖测试。没有专用 Server 2025 CI 矩阵。`, ciLink: `查看主线 CI 工作流`, licenseTitle: `双重授权 · AGPL-3.0-or-later 或商业授权`, licenseDesc: `两种授权二选一、功能相同且不可叠加；商业授权可涵盖任何版本。AGPL 下分发修改版或作为网络服务提供给他人使用时，须遵守相同授权公开源代码。商标与标志不在授权范围；第三方组件另有各自条款。`, licenseLink: `LICENSE`, thirdPartyLink: `第三方 notices`, sourceCodeLink: `源代码仓库`,
      privacyTitle: `常规数据在本机处理；外连由你选择`, privacyIntro: `常规硬件读取、监控与历史数据由 Windows 桌面程序在本机处理。若选择云端 AI 评价，发送的数据与用途取决于你配置的服务及其政策；使用本机 Ollama 时，请根据本机配置核对数据路径。`, privacyPoint1: `只读是常见路径`, privacyPoint1Desc: `少数会写入系统或硬件的功能另有操作提示与限制；请根据功能说明确认。`, privacyPoint2: `权限与驱动会影响结果`, privacyPoint2Desc: `低层传感／读取受管理员权限、驱动及硬件支持度影响；WinRing0 风险见上方专节。`, privacyPoint3: `网站不读取硬件`, privacyPoint3Desc: `此页不调用硬件 API、不运行压力测试，也不生成假读数；内容只是产品说明。`, privacyReadme: `数据主权与隐私说明`, privacyLimits: `已知限制与刻意不做的事`, downloadTitle: `在 Windows 上，读取真实来源。`, downloadDesc: `v3.13 官方 Release 附有主程序、独立守护程序、安装器、XsRegProbe 驱动及 SHA256SUMS.txt。最新 main README 的主程序字节数已与 Release 附件一致；v3.13 标签版 README 保留较早数字，详见下方注记。`, downloadLatest: `下载 XinSpect.exe · v3.13`, viewSource: `查看源代码`, requirements: `系统要求 · v3.13`, osLabel: `操作系统`, archLabel: `架构`, runtimeLabel: `运行环境`, licenseLabel: `许可`, requirementsFoot: `依据 v3.13 README：Windows 10 1903 以上／Windows 11、x64、.NET 10 Desktop Runtime；权限来源差异见上方说明。`, releaseNote: `运行前请在官方 v3.13 Release 页面确认实际附件与 SHA256SUMS.txt；下方注明标签版 README 的旧字节数与当前 main 的更正。`, footerPhrase: `让事实有来源，让未知保持未知。`, footerGithub: `GitHub 项目 ↗`, footerDocs: `文档索引 ↗`, footerLatest: `官方发布页 ↗`, footerSource: `依据 v3.13 官方发布、当前 main README、对应源代码与可追溯文档整理；实际读值仍取决于平台、权限、驱动及硬件支持。`,
      licenseValue: `AGPL-3.0-or-later 或商业授权（二选一）`, licenseFooter: `DUAL LICENSE · AGPL-3.0-OR-LATER OR COMMERCIAL · WINDOWS x64`, commercialLicenseLink: `商业授权条款`, releaseUpdateKicker: `OFFICIAL MAINLINE · v3.13 · 2026-11-01`, releaseUpdateTitle: `近期版本具体改进了什么？`, releaseUpdateIntro: `以下概述 v3.06–v3.13 正式主线中影响使用者的变化；实验版本单独标注，不混入正式版功能。`, releaseHistoryTitle: `监控规划：十项工程设计试算`, releaseHistoryBody: `v3.13 新增十项监控设计计算（NVR 容量、接入带宽、PoE、交换机、光纤、压降、布线、RAID、无线与 UPS／机柜）。数值只由声明输入推导、不读取本机硬件；输入不足时不补假数字。规划 JSON 保存在本机，只有保存后才进入 plan.cctv.* 事实集与导出报告；规划仍需现场验收。`, releaseTelemetryTitle: `蓝色中队默认关闭，并补上 Win11 安全基线`, releaseTelemetryBody: `新安装默认不启用常驻守护进程；只读态势评估仍可用。新增 SMB、NTLM、ASR、Smart App Control、PowerShell 记录、Defender PUA 与自动播放等检查；读取不到的信息标注“未评估”，不当作通过。`, releaseDeliveryTitle: `M.2／U.2 分析不再卡住主窗口`, releaseDeliveryBody: `M.2／U.2 分析改为后台收集、回 UI 线程应用；磁盘 WMI 查询设 3 秒上限。超时与读取失败分开说明，不再留白冒充“没有磁盘”。`, releaseSourceLatest: `v3.13 正式版发布说明`, releaseTaggedReadme: `查看 v3.13 标签版 README`, releaseSourceTelemetry: `v3.13 安全与基线发布说明`, releaseSourceInstaller: `v3.06 部署器说明`, releaseSourceLicense: `v3.08 授权说明`, releaseExperimentalNote: `v3.11 Swiss／Helvetica 界面是 experiment/swiss-helvetica 分支的预发布实验，不是 v3.13 正式版能力。本网站已改用 Helvetica 优先，并搭配 Arial 与简体中文字体系统 fallback。`, releaseSourceExperimental: `查看 v3.11 实验版来源`, assetMismatchNote: `附件核查（2026-11-01）：v3.13 Release 附有 XinSpect.exe（37,553,451 bytes）、BlueSquadronBridge.exe（6,502,948 bytes）、XinSpectDeploy.exe（16,896 bytes）、XsRegProbe.sys（24,064 bytes）及 SHA256SUMS.txt（334 bytes）。v3.13 标签内 README 曾记主程序为 37,393,707 bytes；当前 main README 已修正为与 Release 附件相同的 37,553,451 bytes。请以官方发布页附件与校验清单为准。`, releaseChangesHeading: `主要变更`, releaseTestHeading: `测试／支持说明`, releaseFidelityHeading: `资料注记`, releaseLinkLabel: `官方 GitHub Release`, releaseNoTest: `该发布记录没有提供可核实的测试或支持细节。`, releaseNoChanges: `发布摘要没有提供更多逐项变更。`, releaseLoadError: `暂时无法加载版本摘要。请使用官方 Releases 页面查看原始资料。`, releaseNoMatches: `没有符合搜索条件的版本。`, releaseCount: (shown, total) => `显示 ${shown} / ${total} 条`
    },
    en: {
      aiHomeLabel: "XinSpect-Ai test build: document explanations, citations, and limited configuration analysis",
      aiModelType: "Test build",
      aiTrainingStatus: "Limited; still being validated",
      aiIntro: "Current scope: explain XinSpect materials, cite retrieved passages, and provide limited configuration analysis. This remains a test build with known limitations.",
      aiInfoOnly: "This page describes the project; it is not an in-site chat service. Results depend on retrieval data and deployment setup; without source passages, answers or citations may be wrong or fabricated. Verify important claims against the original material.",
      aiRepoLink: "View the XinSpect-Ai test build and report ↗",

      neutralityTitle: "Position statement", neutralityText: "This website and the XinSpect software take no political position. Their content is intended solely for technical information, product documentation, and engineering discussion.", neutralityNoDefault: "This website does not assume any political stance by default.",
      legalTitle: "Legal & data-processing notice", legalHosting: "This website is deployed on the Cloudflare Workers global network. Cloudflare documents that Workers run near the incoming request by default and static assets are served near the request. Actual routing and processing depend on the service and site configuration; this is not a claim of a fixed server country.", legalResponsibility: "Operation and data processing must comply with applicable laws. For legal applicability and processing details, including cross-border processing, consult Cloudflare’s official policies together with this website’s actual configuration. Provider policies and terms are not a certification or guarantee that this website complies with laws or holds a data-protection certification.", legalPractical: "This informational site does not scan device hardware. Language and theme preferences are stored in your browser. An issue report is sent to a private Cloudflare database only after you voluntarily consent and explicitly submit; Turnstile provides necessary data to Cloudflare for human verification. The report tool does not upload before submission. Connection and request information may still be processed under provider policies and site settings; external sites such as GitHub have their own policies.", legalPlacementLink: "Cloudflare official placement documentation", legalPrivacyLink: "Cloudflare official privacy policy",
      skip: `Skip to main content`, siteNav: `Site navigation`, brandAria: `XinSpect overview`, brandPhrase: `“Another possibility”`, brandEdition: `Windows desktop app`, productNav: `PRODUCT`, sectionNav: `Product sections`, navOverview: `Overview`, navCatalog: `Fact catalog`, navModules: `Features & sources`, navReconcile: `Cross-checking`, navEvidence: `Evidence & snapshots`, navDocs: `Documents and open source`, navHistory: `Release history`, navPrivacy: `Privacy & limits`, navDownload: `Download & requirements`, sidebarNote: `This is a product information site. <strong>It does not read this device's hardware values.</strong>`, sourceStamp: `Based on official releases and source`, openGithub: `Open GitHub project`, openNav: `Open navigation`, closeNav: `Close navigation`, languageLabel: `Language`, breadcrumb: `Product guide`, themeToggle: `Toggle light/dark theme`, themeToLight: `Switch to light theme`, themeToDark: `Switch to dark theme`, pageTitle: `XinSpect — Another possibility, with sources for facts`, pageDescription: `Explore XinSpect for Windows: features, data sources, documentation, and testing limits. This site does not scan your computer.`, ogDescription: `Explore XinSpect for Windows: features, data sources, documentation, and testing limits. This site does not scan your computer.`,
      heroAlt: `Swiss-modern concept illustration of XinSpect hardware: processor, memory, and motherboard`, eyebrow: `NATIVE WINDOWS TOOL`, heroTitleA: `Hardware, firmware, Windows`, heroTitleB: `Three accounts. Cross-checked.`, heroIntro: `XinSpect is a Windows hardware inspection, monitoring, and security-audit tool. It presents readings alongside their sources and availability so you can see who supplied each value—and what remains unknown.`, latestRelease: `Download XinSpect v3.13`, browseSource: `Read feature documentation`, heroMeta1: `Free and open source`, heroMeta3: `Read-only by default`, corePrinciple: `CORE PRINCIPLE`, heroSideTitle: `Unreadable<br>doesn't mean healthy.`, heroSideSub: `Trace the source<br>leave judgment to the user`, truthLead: `No live hardware readings or test buttons here.`, truthBody: `This desktop-app guide is based on official releases, corresponding source code, and traceable documents. This website does not scan your computer.`, readDocs: `Read the docs`,
      catalogTitle: `First, the numbers: catalog counts, not fabricated readings`, catalogIntro: `These counts follow the v3.13 official README and corresponding catalogs; use the source links to verify them.`, readmeEvidence: `v3.13 official documentation`, metricKeys: `compile-time fact keys`, metricKeysDesc: `Identifiers in the compile-time catalog—not scan results or a promise that every value is readable on every computer.`, metricDomains: `fact domains`, metricDomainsDesc: `Different data areas, including hardware, firmware, the operating system, devices, and evidence.`, metricDynamic: `dynamic-key families`, metricDynamicDesc: `Families of facts that expand according to device or collection context.`, catalogFoot: `These describe the v3.13 source inventory—not scan results, accuracy, completion, or guaranteed hardware support.`, countMethod: `View the domain-counting script`,
      modulesTitle: `What it does: each data class has a stated source`, modulesIntro: `These are data paths in the desktop application. What is available depends on hardware, firmware, drivers, permissions, and Windows version.`, modulesMeta: `Features from v3.13 official sources`, cpuTitle: `Processor and live state`, cpuDesc: `Keep specifications and current state separate: CPUID supplies identity and capabilities; sensors provide live package and core readings, while per-logical-processor utilization and trends are calculated by differencing NtQuerySystemInformation samples. The MSR path separately reads frequency, power, and thermal-status data.`, sensor: `Sensors`, caveat: `INTERPRETATION LIMIT`, cpuCaveat: `Live trends are sampled in seconds and can miss shorter spikes; VBS/HVCI may also affect some MSR readings.`, cpuSource: `README · processor features and limits`, memoryTitle: `Memory modules and current configuration`, memoryDesc: `Compare direct SPD/SMBus reads, SMBIOS/WMI reports, and the active state: module/slot details, JEDEC and XMP/EXPO profiles, active timings, and usage retain their respective source labels.`, windows: `Windows`, memoryCaveat: `Rated speed is not the same as the active speed. Blank fields stay blank; channel count is not guessed.`, memorySource: `README · memory sources`, storageTitle: `Storage health and counters`, storageDesc: `Shows health, wear, errors, and cumulative counters reported by ATA SMART and NVMe devices, while distinguishing controller and device paths so firmware estimates are not presented as independent measurements.`, storageCaveat: `Health and wear are often device-firmware reports. Unreadable, unsupported, and failed reads are distinct states.`, storageSource: `README · storage data and limits`, gpuTitle: `Graphics cards and PCIe links`, gpuDesc: `Combines device identity, driver-reported, and PCIe information. NVIDIA devices can use NVML for fields such as temperature, power, clocks, fans, and ECC; for multiple GPUs, it can list adapter count and whether vendors are mixed.`, gpuCaveat: `NVML does not apply to every GPU. An unavailable source is not replaced with zero.`, gpuSource: `README · graphics features`, boardTitle: `Motherboard, firmware, and security state`, boardDesc: `Brings together SMBIOS, ACPI, UEFI variables, BIOS/microcode, PCI resources, and selected chipset security flags. The firmware-security view shows the read path and the basis for each interpretation.`, boardCaveat: `Some low-level paths require Administrator privileges and a ready read-only driver. XinSpect does not flash your BIOS.`, boardSource: `README · board and firmware security`, osTitle: `Windows state and history`, osDesc: `Combines Windows-reported system data and WMI performance counters, and summarizes severe/error events from the System log over the last 7 days; it also provides recent sensor trends, history playback, device diagnostics, and HTML/Markdown/plain-text report export.`, osCaveat: `A reading and an event occurring together do not establish causation; Windows/driver-reported values retain that source label.`, osSource: `README · system and history features`, monitoringLead: `Live values stay separate from specifications; per-second sampling is not millisecond measurement.`, monitoringDesc: `The overview charts keep roughly 90 seconds of trends. History playback keeps about an hour of second-level samples, then stores per-minute minimum/average/maximum values for older data.`, monitoringSource: `Reading and time limits`,
      reconcileTitle: `Compare sources, rule by rule`, reconcileIntro: `Hardware, firmware, and Windows are not interchangeable answers; each is a statement with its own source and limits.`, noHealthScore: `No single overall hardware-health verdict`, sourcesAlt: `Concept illustration of hardware, firmware, and operating system as three data sources`, sourceHardwareTitle: `Reported by hardware`, sourceHardwareDesc: `Hardware or device read paths such as CPUID, MSR, PCI, sensors, SPD/SMBus, SMART, and NVMe.`, sourceFirmwareTitle: `Provided by firmware`, sourceFirmwareDesc: `SMBIOS, ACPI, UEFI variables, and platform declarations; blank fields are not guessed into existence.`, sourceWindowsTitle: `Reported by Windows`, sourceWindowsDesc: `WMI/CIM, performance counters, drivers, and event records; reports retain their source character.`, reconcileFoot: `Cross-checks state “consistent,” “conflicting,” or “unable to verify,” with supporting evidence. Missing sources are not treated as a pass, and the app does not issue a blanket good/bad hardware verdict.`, statusTitle: `“No reading” has different causes`, statusPresent: `Read and source path confirmed`, statusUnknown: `A value exists; source/interpretation unconfirmed`, statusNA: `Not applicable in this context`, statusUnsupported: `Unsupported by hardware or platform`, statusPrivilege: `Insufficient privilege or driver`, statusError: `Read attempted and failed`, statusFoot: `A non-Present fact is not filled with zero. Zero should mean an actual zero reading.`, trustTitle: `A source label is not an accuracy guarantee`, measured: `measured directly`, measuredDesc: `Read or measured directly by the program, e.g. MSR or a sensor.`, reported: `reported externally`, reportedDesc: `Declared by Windows, a driver, or firmware; not independently verified by the program.`, derived: `derived`, derivedDesc: `Calculated from other facts; it is not a second independent source.`, unknown: `unconfirmed`, unknownDesc: `The source or path is unclear; treat it as a lead to investigate.`, trustFoot: `“Measured” does not mean infallible; the label describes the source type.`, sourceTaxonomy: `Source: README definitions for the six states and source categories`,
      evidenceTitle: `From readings to evidence you can check later`, evidenceIntro: `Keep each fact's source, trust type, and time for comparison; a change is not automatically a fault, replacement, or tampering.`, hashNote: `Integrity check<br>not a digital signature`, snapshotTitle: `Versioned “time capsule” snapshots`, snapshotDesc: `JSON snapshots store hardware facts actually read at that time, with creation time, app version, and a SHA-256 integrity hash. Stable keys support field-by-field comparison of additions, removals, and changes.`, snapshotCallout: `A difference means the readings differ; it does not explain why.`, lineageTitle: `Data lineage for each field`, lineageDesc: `Inspect the source, source type, and time for a value. A field that was not read is not filled with zero.`, lineageCallout: `Source answers: “who said this?”`, privacyShareTitle: `Review privacy fields before sharing`, privacyShareDesc: `Snapshots default to redacting values marked sensitive; the scope depends on each fact's sensitivity marker, so inspect content before exporting or sharing.`, hashCaveat: `SHA-256 can detect changes; it does not prove authorship or origin.`, evidenceFoot: `Only values readable at the time are saved; snapshots vary with device, permission, and access path.`, evidenceSource: `Evidence Lab documentation`,
      docsTitle: `Feature documents and open source`, docsIntro: `Feature references link to the current main README, official release notes, and main-branch methodology/limits; each source is identified.`, docsMeta: `Links lead to the official repository`, docCurrent: `Current main README · v3.13`, docEncyclopediaTitle: `Feature encyclopedia (v3.13)`, docEncyclopediaDesc: `The current main README documents v3.13 features, data sources, reproducible catalog counts, interpretation, and limits.`, openEncyclopedia: `Read the official feature guide`, docMethod: `Main-branch document snapshot`, docMethodTitle: `Measurement method and limits`, docMethodDesc: `The methodology describes implemented data contracts, states, and source distinctions. The limitations page lists unreadable, unsupported, and deliberately out-of-scope items.`, methodLink: `Measurement method`, limitsLink: `Known limitations`, driverKicker: `LOW-LEVEL HARDWARE PATHS · PRIVILEGE & RISK`, driverTitle: `WinRing0 and Administrator: know the scope before running`, driverDesc: `The v3.13 sources state that WinRing0 handles MSR/PCI configuration-space access; the MMIO backend probes first, and XsRegProbe is development-only. These low-level paths involve kernel drivers and privileges, and not every feature uses them.`, adminMismatch: `<strong>Privilege documentation still conflicts:</strong> the v3.13 <code>app.manifest</code> requests <code>requireAdministrator</code>, while the v3.13 README describes some pages remaining available without elevation, with low-level sensor readings shown as “—”. Check the actual Windows UAC prompt for the downloaded file.`, manifestLink: `View v3.13 manifest`, bridgeLink: `View WinRing0 bridge`, releaseReqLink: `v3.13 official release and notes`, verificationTitle: `Test records and execution scope`, verificationIntro: `The current main README lists the project test baseline; this website did not run the XinSpect desktop tests.`, verifyRelease: `Current main README test baseline`, verifyReleaseDesc: `The current main README lists a 7,820-test project baseline; v3.10 notes separately report 109/109 affected tests passing. These are upstream records, not tests run by this website.`, releaseTestLink: `View the current main README`, verifyCI: `CI and platform coverage`, guardTests: `Selected guard tests`, verifyCIDesc: `GitHub Actions uses windows-latest for build, selected guard tests, and documentation checks; the hosted runner does not run the full hardware-dependent suite. There is no dedicated Server 2025 CI matrix.`, ciLink: `View main-branch CI workflow`, licenseTitle: `Dual licensing · AGPL-3.0-or-later or commercial`, licenseDesc: `Choose one license; the two paths provide the same features and are not combined. The commercial license can cover any version. Under AGPL, distributing a modified build or providing it as a network service requires source disclosure under the same license. Trademarks and logos are excluded; third-party components have their own terms.`, licenseLink: `LICENSE`, thirdPartyLink: `Third-party notices`, sourceCodeLink: `Source repository`,
      privacyTitle: `Routine data stays local; external sharing is your choice`, privacyIntro: `Routine hardware reads, monitoring, and history are handled locally by the Windows desktop app. If you use cloud AI review, the data sent and its use depend on the service you configure and its policies; check your local configuration when using Ollama.`, privacyPoint1: `Read-only is common`, privacyPoint1Desc: `A small number of system- or hardware-writing features have separate prompts and limits; check the feature documentation.`, privacyPoint2: `Privileges and drivers matter`, privacyPoint2Desc: `Low-level sensing and reads depend on Administrator privileges, drivers, and hardware support; see the WinRing0 note above.`, privacyPoint3: `This site reads no hardware`, privacyPoint3Desc: `This page calls no hardware API, runs no stress test, and generates no fake readings. It is product documentation only.`, privacyReadme: `Data sovereignty and privacy`, privacyLimits: `Known limits and deliberate exclusions`, downloadTitle: `Read real sources on Windows.`, downloadDesc: `The v3.13 Release includes the main app, standalone guard, installer, XsRegProbe driver, and SHA256SUMS.txt. The current main README now matches the attached executable’s size; the tagged v3.13 README retains an earlier figure, noted below.`, downloadLatest: `Download XinSpect.exe · v3.13`, viewSource: `View source code`, requirements: `SYSTEM REQUIREMENTS · v3.13`, osLabel: `Operating system`, archLabel: `Architecture`, runtimeLabel: `Runtime`, licenseLabel: `License`, requirementsFoot: `Per the v3.13 README: Windows 10 1903+ / Windows 11, x64, and .NET 10 Desktop Runtime; see the note above for the privilege-source discrepancy.`, releaseNote: `Before running, check the actual v3.13 Release assets and SHA256SUMS.txt. The note below distinguishes the older figure in the tagged README from the correction on current main.`, footerPhrase: `Facts have sources; unknowns stay unknown.`, footerGithub: `GitHub project ↗`, footerDocs: `Documentation index ↗`, footerLatest: `Official release page ↗`, footerSource: `Based on the v3.13 official release, current main README, corresponding source code, and traceable documents; actual readings still depend on platform, privileges, drivers, and hardware support.`,
      licenseValue: `AGPL-3.0-or-later or commercial (choose one)`, licenseFooter: `DUAL LICENSE · AGPL-3.0-OR-LATER OR COMMERCIAL · WINDOWS x64`, commercialLicenseLink: `Commercial license terms`, releaseUpdateKicker: `OFFICIAL MAINLINE · v3.13 · 2026-11-01`, releaseUpdateTitle: `What changed in the recent releases?`, releaseUpdateIntro: `A concise summary of user-facing changes in the v3.06–v3.13 stable mainline. Experimental work is labeled separately, not presented as stable functionality.`, releaseHistoryTitle: `Surveillance planning: 10 engineering estimates`, releaseHistoryBody: `v3.13 adds ten surveillance-design calculators for NVR storage, bandwidth, PoE, switching, fiber loss, voltage drop, cabling, RAID, Wi-Fi coverage, and UPS/rack capacity. Estimates come from declared inputs, not PC hardware; missing inputs stay unresolved. The plan is saved as local JSON, and only saved plans enter the plan.cctv.* fact set and exported reports. Field measurements remain necessary for acceptance.`, releaseTelemetryTitle: `Blue Squadron disabled by default, with a Win11 security baseline`, releaseTelemetryBody: `New installs leave the resident guard process off by default; read-only posture assessment remains available. New checks cover SMB, NTLM, ASR, Smart App Control, PowerShell logging, Defender PUA, and AutoPlay. Unreadable items are marked “not assessed,” not passed.`, releaseDeliveryTitle: `M.2/U.2 analysis no longer blocks the main window`, releaseDeliveryBody: `M.2/U.2 data is collected in the background and applied on the UI thread; disk WMI queries have a 3-second bound. Timeouts and read failures are distinguished instead of leaving a blank that could look like no disks.`, releaseSourceLatest: `v3.13 stable release notes`, releaseTaggedReadme: `View the v3.13-tag README`, releaseSourceTelemetry: `v3.13 security and baseline release notes`, releaseSourceInstaller: `v3.06 deployer notes`, releaseSourceLicense: `v3.08 licensing notes`, releaseExperimentalNote: `The v3.11 Swiss/Helvetica interface is a pre-release experiment on the experiment/swiss-helvetica branch, not a v3.13 stable feature. This website now uses Helvetica first, with Arial and system CJK fallbacks.`, releaseSourceExperimental: `View the v3.11 experimental source`, assetMismatchNote: `Asset check (2026-11-01): the v3.13 Release includes XinSpect.exe (37,553,451 bytes), BlueSquadronBridge.exe (6,502,948 bytes), XinSpectDeploy.exe (16,896 bytes), XsRegProbe.sys (24,064 bytes), and SHA256SUMS.txt (334 bytes). The v3.13-tag README previously listed the main app as 37,393,707 bytes; current main has corrected this to match the Release asset at 37,553,451 bytes. Use the official Release assets and checksum list.`, releaseChangesHeading: `Key changes`, releaseTestHeading: `Test / support note`, releaseFidelityHeading: `Source note`, releaseLinkLabel: `Official GitHub Release`, releaseNoTest: `This release record provides no verifiable test or support detail.`, releaseNoChanges: `The release summary provides no further itemized changes.`, releaseLoadError: `Release summaries could not be loaded. Use the official Releases page to view the source records.`, releaseNoMatches: `No releases match this search.`, releaseCount: (shown, total) => `${shown} / ${total} shown`
    }
  };

  const HISTORY_COPY = {
    'zh-Hant': {
      navHistory: '功能沿革', kicker: 'FEATURE HISTORY · OFFICIAL MILESTONES', title: '功能沿革：按能力追蹤新增與修復',
      intro: '只列官方發布說明明確記載的加入、擴充與修復。日期取 GitHub Release 的 published_at UTC 日期；提及不等於新增，無明確證據的首次加入日期不作推定。',
      all: '全部官方 Releases', summary: '項功能 · 精選里程碑，不逐版列出', search: '搜尋功能、版號或修復內容', placeholder: '例如 SMART、v2.83、SPD',
      loading: '正在載入功能沿革…', loadError: '功能沿革暫時無法載入，請查看官方 Releases。', noMatches: '沒有符合搜尋條件的功能。',
      listLabel: '按功能整理的官方發布里程碑', sourceNote: '每個新增、擴充或修復事件均連回官方 Release；日期依 GitHub published_at（UTC）標示。未明確記載的加入或修復不作推定。',
      eventKinds: { added: '新增', expanded: '擴充', fixed: '修復' }, count: (shown, total) => `顯示 ${shown} / ${total} 項功能`
    },
    'zh-Hans': {
      navHistory: '功能沿革', kicker: 'FEATURE HISTORY · OFFICIAL MILESTONES', title: '功能沿革：按能力追踪新增与修复',
      intro: '只列官方发布说明明确记载的加入、扩展与修复。日期取 GitHub Release 的 published_at UTC 日期；提及不等于新增，没有明确证据的首次加入日期不作推定。',
      all: '全部官方 Releases', summary: '项功能 · 精选里程碑，不逐版列出', search: '搜索功能、版本号或修复内容', placeholder: '例如 SMART、v2.83、SPD',
      loading: '正在加载功能沿革…', loadError: '功能沿革暂时无法加载，请查看官方 Releases。', noMatches: '没有符合搜索条件的功能。',
      listLabel: '按功能整理的官方发布里程碑', sourceNote: '每个新增、扩展或修复事件均链接到官方 Release；日期按 GitHub published_at（UTC）标示。未明确记载的加入或修复不作推定。',
      eventKinds: { added: '新增', expanded: '扩展', fixed: '修复' }, count: (shown, total) => `显示 ${shown} / ${total} 项功能`
    },
    en: {
      navHistory: 'Feature history', kicker: 'FEATURE HISTORY · OFFICIAL MILESTONES', title: 'Feature history: additions and fixes by capability',
      intro: 'Only additions, expansions, and fixes explicitly stated in official release notes are listed. Dates use the GitHub Release published_at calendar date (UTC). A mention alone does not establish when a feature was added; unsupported dates are not inferred.',
      all: 'All official Releases', summary: 'features · selected milestones, not a release-by-release log', search: 'Search features, versions, or fixes', placeholder: 'e.g. SMART, v2.83, SPD',
      loading: 'Loading feature history…', loadError: 'Feature history could not be loaded. See official Releases.', noMatches: 'No features match this search.',
      listLabel: 'Official release milestones grouped by feature', sourceNote: 'Each addition, expansion, or fix links to its official Release. Dates are the GitHub published_at calendar date (UTC); additions and fixes are labeled only when explicitly stated.',
      eventKinds: { added: 'Added', expanded: 'Expanded', fixed: 'Fixed' }, count: (shown, total) => `${shown} / ${total} features shown`
    }
  };

  const RICH_TEXT_KEYS = new Set(['sidebarNote', 'sourceStamp', 'heroSideTitle', 'heroSideSub', 'hashNote', 'adminMismatch', 'testCountDiscrepancy']);
  let currentLanguage = 'zh-Hant';
  let featureItems = [];
  let featureLoaded = false;
  let featureLoadError = false;

  function copy(key) {
    return globalThis.XinSpectSiteCopy?.[currentLanguage]?.[key] ?? COPY[currentLanguage]?.[key] ?? COPY['zh-Hant'][key] ?? key;
  }

  function setTheme(theme) {
    const next = theme === 'dark' ? 'dark' : 'light';
    root.dataset.theme = next;
    themeButton?.setAttribute('aria-pressed', String(next === 'dark'));
    themeButton?.setAttribute('aria-label', copy(next === 'dark' ? 'themeToLight' : 'themeToDark'));
    themeButton?.setAttribute('title', copy('themeToggle'));
    if (themeIcon) themeIcon.textContent = next === 'dark' ? '☼' : '☾';
    try { localStorage.setItem('xinspect-site-theme', next); } catch (_) {}
  }

  function detectDefaultLanguage() {
    const primary = navigator.languages?.[0] || navigator.language || 'en';
    try {
      const locale = new Intl.Locale(primary.replace(/_/g, '-'));
      if (locale.language !== 'zh') return 'en';
      if (locale.region === 'CN' || locale.region === 'SG') return 'zh-Hans';
      if (locale.region) return 'zh-Hant';
      return locale.script === 'Hans' ? 'zh-Hans' : 'zh-Hant';
    } catch (_) {
      return /^zh(?:-|_|$)/i.test(primary) ? 'zh-Hant' : 'en';
    }
  }

  function applyLanguage(language, { persist = false } = {}) {
    const next = Object.hasOwn(COPY, language) ? language : 'zh-Hant';
    currentLanguage = next;
    root.lang = localeCodes[next];
    document.title = copy('pageTitle');
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy('pageDescription'));
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', copy('pageTitle'));
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', copy('ogDescription'));

    document.querySelectorAll('[data-i18n]').forEach(node => {
      const value = copy(node.dataset.i18n);
      if (typeof value === 'string') {
        if (RICH_TEXT_KEYS.has(node.dataset.i18n)) node.innerHTML = value;
        else node.textContent = value;
      }
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(node => node.setAttribute('aria-label', copy(node.dataset.i18nAria)));
    document.querySelectorAll('[data-i18n-title]').forEach(node => node.setAttribute('title', copy(node.dataset.i18nTitle)));
    document.querySelectorAll('[data-i18n-placeholder]').forEach(node => node.setAttribute('placeholder', copy(node.dataset.i18nPlaceholder)));
    document.querySelectorAll('[data-i18n-alt]').forEach(node => node.setAttribute('alt', copy(node.dataset.i18nAlt)));
    renderHistoryStrings();
    if (languageSwitcher) languageSwitcher.value = next;
    if (menuButton) menuButton.setAttribute('aria-label', sidebar?.classList.contains('is-open') ? copy('closeNav') : copy('openNav'));
    setTheme(root.dataset.theme);
    if (persist) {
      try { localStorage.setItem('xinspect-site-language', next); } catch (_) {}
    }
    renderFeatureHistory();
  }

  function closeMenu() {
    sidebar?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', copy('openNav'));
  }

  themeButton?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
  languageSwitcher?.addEventListener('change', () => applyLanguage(languageSwitcher.value, { persist: true }));
  menuButton?.addEventListener('click', () => {
    const isOpen = sidebar?.classList.toggle('is-open') ?? false;
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', copy(isOpen ? 'closeNav' : 'openNav'));
  });
  navLinks.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach(link => {
        const active = link.getAttribute('href') === `#${visible.target.id}`;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-18% 0px -62% 0px', threshold: [0, 0.15, 0.35, 0.65] });
    sections.forEach(section => observer.observe(section));
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  }

  function renderHistoryStrings() {
    const text = HISTORY_COPY[currentLanguage];
    const assign = (id, value) => { const node = document.getElementById(id); if (node) node.textContent = value; };
    assign('historyKicker', text.kicker);
    assign('historyTitle', text.title);
    assign('historyIntro', text.intro);
    assign('allReleasesLabel', text.all);
    const summaryCount = featureLoaded ? featureItems.length : (featureLoadError ? '—' : 35);
    assign('historySummary', `${summaryCount} ${text.summary}`);
    assign('featureSearchLabel', text.search);
    assign('featureSourceNote', text.sourceNote);
    const search = document.getElementById('featureSearch');
    if (search) search.placeholder = text.placeholder;
    if (featureList) featureList.setAttribute('aria-label', text.listLabel);
    document.querySelectorAll('[data-i18n="navHistory"]').forEach(node => { node.textContent = text.navHistory; });
  }

  function localized(value) {
    return value && typeof value === 'object' ? (value[currentLanguage] || value['zh-Hant'] || '') : '';
  }

  function validReleaseUrl(value) {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && url.hostname === 'github.com' && url.pathname.startsWith('/Xinglanclever/XinSpect/releases/tag/');
    } catch (_) { return false; }
  }

  function createFeatureCard(item) {
    const card = element('article', 'feature-card');
    card.append(element('p', 'feature-category', localized(item.category)));
    card.append(element('h3', 'feature-title', localized(item.title)));
    card.append(element('p', 'feature-effect', localized(item.effect)));
    const events = element('ol', 'feature-events');
    (Array.isArray(item.events) ? item.events : []).forEach(event => {
      if (!['added', 'expanded', 'fixed'].includes(event.kind) || !validReleaseUrl(event.url) || !/^\d{4}-\d{2}-\d{2}$/.test(event.date || '')) return;
      const row = element('li', `feature-event event-${event.kind}`);
      const meta = element('div', 'feature-event-meta');
      meta.append(element('span', `event-kind kind-${event.kind}`, HISTORY_COPY[currentLanguage].eventKinds[event.kind]));
      const link = element('a', 'event-version', event.version);
      link.href = event.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      meta.append(link);
      const time = element('time', 'event-date', `${event.date} UTC`);
      time.dateTime = `${event.date}T00:00:00Z`;
      meta.append(time);
      row.append(meta);
      row.append(element('p', 'event-detail', localized(event.detail)));
      events.append(row);
    });
    card.append(events);
    return card;
  }

  function renderFeatureHistory() {
    if (!featureList) return;
    const text = HISTORY_COPY[currentLanguage];
    const totalNode = document.getElementById('featureTotal');
    if (totalNode && featureLoaded) totalNode.textContent = String(featureItems.length);
    const query = (featureSearch?.value || '').trim().toLocaleLowerCase(currentLanguage);
    const visible = featureItems.filter(item => {
      const events = Array.isArray(item.events) ? item.events : [];
      const searchable = [localized(item.category), localized(item.title), localized(item.effect), ...events.flatMap(event => [event.version, event.date, localized(event.detail)])].join(' ').toLocaleLowerCase(currentLanguage);
      return !query || searchable.includes(query);
    });
    const fragment = document.createDocumentFragment();
    visible.forEach(item => fragment.append(createFeatureCard(item)));
    featureList.replaceChildren(fragment);
    if (featureCountStatus) featureCountStatus.textContent = featureLoaded ? text.count(visible.length, featureItems.length) : '';
    if (featureLoadState) {
      if (!featureLoaded) {
        featureLoadState.hidden = false;
        featureLoadState.textContent = featureLoadError ? text.loadError : text.loading;
      } else if (!visible.length) {
        featureLoadState.hidden = false;
        featureLoadState.textContent = text.noMatches;
      } else {
        featureLoadState.hidden = true;
        featureLoadState.textContent = '';
      }
    }
  }

  async function loadFeatureHistory() {
    if (!featureList) return;
    featureLoadError = false;
    featureLoaded = false;
    renderFeatureHistory();
    try {
      const response = await fetch('./feature-history.json', { cache: 'no-cache' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      if (!payload || !Array.isArray(payload.items) || payload.items.length < 20) throw new Error('Invalid feature inventory');
      const valid = payload.items.every(item => item && typeof item.id === 'string' && item.title && item.effect && Array.isArray(item.events) && item.events.length > 0);
      if (!valid) throw new Error('Invalid feature record');
      featureItems = payload.items;
      featureLoaded = true;
      renderHistoryStrings();
      renderFeatureHistory();
    } catch (_) {
      featureItems = [];
      featureLoadError = true;
      featureLoaded = false;
      const totalNode = document.getElementById('featureTotal');
      if (totalNode) totalNode.textContent = '—';
      renderHistoryStrings();
      renderFeatureHistory();
    }
  }

  featureSearch?.addEventListener('input', renderFeatureHistory);

  try {
    const savedTheme = localStorage.getItem('xinspect-site-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') root.dataset.theme = savedTheme;
    const savedLanguage = localStorage.getItem('xinspect-site-language');
    applyLanguage(Object.hasOwn(COPY, savedLanguage) ? savedLanguage : detectDefaultLanguage());
  } catch (_) {
    applyLanguage(detectDefaultLanguage());
  }
  loadFeatureHistory();
})();
