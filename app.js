/* Ticking Egg — Sprachumschalter.
   Merkt die Wahl im Browser, damit sie über alle Seiten gilt. */
(function () {
  var root = document.documentElement;
  var KEY = 'te-lang';

  function setLang(lang, remember) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);

    var title = document.body.getAttribute('data-title-' + lang);
    if (title) document.title = title;

    var desc = document.body.getAttribute('data-desc-' + lang);
    var tag = document.querySelector('meta[name="description"]');
    if (desc && tag) tag.setAttribute('content', desc);

    var buttons = document.querySelectorAll('[data-lang-btn]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', String(buttons[i].getAttribute('data-lang-btn') === lang));
    }

    if (remember) {
      try { localStorage.setItem(KEY, lang); } catch (e) {}
    }
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest ? event.target.closest('[data-lang-btn]') : null;
    if (button) setLang(button.getAttribute('data-lang-btn'), true);
  });

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}

  if (saved === 'de' || saved === 'en') {
    setLang(saved, false);
  } else if ((navigator.language || 'de').slice(0, 2).toLowerCase() !== 'de') {
    setLang('en', false);
  } else {
    setLang('de', false);
  }
})();
