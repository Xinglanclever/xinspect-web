/* XinSpect overlay theme switcher
 * Toggles between two design overlays:
 *   dark  — Laboratory glass (gemini-redesign-dark.css)
 *   light — Swiss modernist (gemini-redesign-light.css)
 * Persists the choice in localStorage. Button styling comes from each
 * theme's CSS (#overlay-theme-toggle), so it adapts to the active theme. */
(function () {
  "use strict";

  var VERSION = "20261104-v3";
  var THEMES = {
    dark: { href: "./gemini-redesign-dark.css?v=" + VERSION, label: "\u2600 \u6DFA\u8272", title: "\u5207\u63DB\u5230\u745E\u58EB\u6DFA\u8272\u4E3B\u984C" },
    light: { href: "./gemini-redesign-light.css?v=" + VERSION, label: "\u263E \u6DF1\u8272", title: "\u5207\u63DB\u5230\u5BE6\u9A57\u5BA4\u6DF1\u8272\u4E3B\u984C" }
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
      btn.textContent = THEMES[name].label;
      btn.title = THEMES[name].title;
    }
  }

  function injectButton() {
    if (document.getElementById("overlay-theme-toggle")) { apply(current()); return; }
    var btn = document.createElement("button");
    btn.id = "overlay-theme-toggle";
    btn.type = "button";
    btn.textContent = "";
    // 布局交给内联样式，颜色交给各主题 CSS 的 #overlay-theme-toggle 规则
    btn.style.cssText =
      "margin-left:10px;padding:7px 14px;font:600 13px/1 'Segoe UI',system-ui,sans-serif;" +
      "letter-spacing:0.04em;cursor:pointer;flex-shrink:0;";
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      try { localStorage.setItem(KEY, next); } catch (e) {}
      apply(next);
    });
    var bar = document.querySelector(".topbar");
    if (bar) {
      bar.appendChild(btn);
    } else {
      // 兜底：找不到顶栏就固定在右上角
      btn.style.cssText += "position:fixed;top:14px;right:16px;z-index:99999;";
      document.body.appendChild(btn);
    }
    apply(current());
  }

  // 若页面脚本重建了顶栏导致按钮丢失，自动补回
  var observer = new MutationObserver(function () {
    if (!document.getElementById("overlay-theme-toggle")) injectButton();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      injectButton();
      observer.observe(document.body, { childList: true, subtree: false });
    });
  } else {
    injectButton();
    observer.observe(document.documentElement, { childList: true, subtree: false });
  }
})();
