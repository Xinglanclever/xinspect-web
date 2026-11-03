/* XinSpect overlay theme switcher
 * Toggles between two design overlays:
 *   dark  — Laboratory glass (gemini-redesign-dark.css)
 *   light — Swiss modernist (gemini-redesign-light.css)
 * Persists the choice in localStorage. */
(function () {
  "use strict";

  var VERSION = "20261104-v2";
  var THEMES = {
    dark: { href: "./gemini-redesign-dark.css?v=" + VERSION, buttonLabel: "\u2600 \u6DFA\u8272", buttonTitle: "\u5207\u63DB\u5230\u745E\u58EB\u73FE\u4EE3\u4E3B\u7FA9\u6DFA\u8272\u4E3B\u984C" },
    light: { href: "./gemini-redesign-light.css?v=" + VERSION, buttonLabel: "\u263E \u6DF1\u8272", buttonTitle: "\u5207\u63DB\u5230\u5BE6\u9A57\u5BA4\u6DF1\u8272\u4E3B\u984C" }
  };
  var KEY = "xinspect-overlay-theme";
  var DEFAULT = "dark";

  function current() {
    try {
      var v = localStorage.getItem(KEY);
      return (v === "light" || v === "dark") ? v : DEFAULT;
    } catch (e) { return DEFAULT; }
  }

  function apply(name) {
    var link = document.getElementById("gemini-theme-css");
    if (link) link.setAttribute("href", THEMES[name].href);
    document.documentElement.setAttribute("data-overlay-theme", name);
    var btn = document.getElementById("overlay-theme-toggle");
    if (btn) {
      btn.textContent = THEMES[name].buttonLabel;
      btn.title = THEMES[name].buttonTitle;
    }
  }

  function injectButton() {
    if (document.getElementById("overlay-theme-toggle")) { apply(current()); return; }
    var btn = document.createElement("button");
    btn.id = "overlay-theme-toggle";
    btn.type = "button";
    btn.style.cssText =
      "position:fixed;top:14px;right:16px;z-index:99999;padding:8px 16px;" +
      "font:600 13px/1 'Segoe UI',system-ui,sans-serif;color:#fff;background:#111;" +
      "border:1px solid #fff;border-radius:2px;cursor:pointer;letter-spacing:0.04em;" +
      "box-shadow:0 2px 8px rgba(0,0,0,.35);transition:background-color .12s,color .12s;";
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      try { localStorage.setItem(KEY, next); } catch (e) {}
      apply(next);
    });
    document.body.appendChild(btn);
    apply(current());
  }

  // 如果頁面腳本重建了 body 頂層節點，確保按鈕一直在
  var observer = new MutationObserver(function () {
    if (!document.getElementById("overlay-theme-toggle")) injectButton();
  });
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      injectButton();
      observer.observe(document.body, { childList: true });
    });
  } else {
    injectButton();
    observer.observe(document.documentElement, { childList: true, subtree: false });
  }
})();
