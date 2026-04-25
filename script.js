(() => {
  const $ = (sel) => document.querySelector(sel);
  const els = {};
  const pageTopicId = document.body?.dataset?.topicId || "";

  const refreshDomRefs = () => {
    els.themeToggle = $("#themeToggle");
    els.heroArt = $("#heroArt");
    els.pageTitle = $("#pageTitle");
    els.pageSubtitle = $("#pageSubtitle");
    els.difficultyWrapper = $("#difficultyWrapper");
    els.restartTopicBtn = $("#restartTopicBtn");
    els.topicPageArt = $("#topicPageArt");
    els.topicScreen = $("#topicScreen");
    els.quizScreen = $("#quizScreen");
    els.topicGrid = $("#topicGrid");
    els.topicBar = $("#topicBar");
    els.topicFooter = $("#topicFooter");
    els.modeSelectionScreen = $("#modeSelectionScreen");
    els.modeChangeBtn = $("#modeChangeBtn");
    els.changeTopicBtn = $("#changeTopicBtn");
    els.changeTopicBtnModal = $("#changeTopicBtnModal");
    els.scoreValue = $("#scoreValue");
    els.scoreMeta = $("#scoreMeta");
    els.streakValue = $("#streakValue");
    els.timerValue = $("#timerValue");
    els.progressValue = $("#progressValue");
    els.progressBar = $("#progressBar");
    els.skipBtn = $("#skipBtn");
    els.hintBtn = $("#hintBtn");
    els.newProblemBtn = $("#newProblemBtn");
    els.answerInput = $("#answerInput");
    els.checkBtn = $("#checkBtn");
    els.feedback = $("#feedback");
    els.explanation = $("#explanation");
    els.problemCard = $("#problemCard");
    els.problemTypeTag = $("#problemTypeTag");
    els.difficultyTag = $("#difficultyTag");
    els.problemPrompt = $("#problemPrompt");
    els.achievements = $("#achievements");
    els.endModal = $("#endModal");
    els.endTitle = $("#endTitle");
    els.endBody = $("#endBody");
    els.playAgainBtn = $("#playAgainBtn");
    els.statsBtn = $("#statsBtn");
    els.statsModal = $("#statsModal");
    els.statsBody = $("#statsBody");
    els.closeStatsBtn = $("#closeStatsBtn");
    els.closeModalBtn = $("#closeModalBtn");
    els.timerBox = $("#timerBox");
  };

  const ensureTopicPageShell = () => {
    if (!pageTopicId || $("#quizScreen")) return;
    document.body.innerHTML = `
      <button class="btn btn--ghost themeToggle" id="themeToggle" type="button" aria-label="Toggle color theme">
        ☀️
      </button>

      <main id="quizScreen" class="screen topicPage" aria-label="Math quiz">
        <div class="topicPageHeader">
          <div>
            <div class="topicPageHeader__top">
              <a class="topicPageBack" href="index.html">← Back to topics</a>
            </div>
            <div class="brand">
              <div class="brand__mark" aria-hidden="true">∑</div>
              <div>
                <h1 id="pageTitle">Math Arcade</h1>
                <p class="subtle" id="pageSubtitle">
                  10-question arcade run.
                  <span class="modeIndicator" id="modeIndicator">Arcade</span>
                </p>
                <p id="highScoreDisplay" class="highScoreDisplay" style="display:none;">🎯 No high score yet</p>
              </div>
            </div>
          </div>
          <img class="topicPageArt" id="topicPageArt" src="assets/problem-spark.svg" alt="Math challenge illustration" />
          <div class="topicPageControls">
            <div>
              <div class="topicTile__diffLabel">Difficulty</div>
              <div class="custom-select-wrapper" id="difficultyWrapper">
                <div class="custom-select-display">Easy</div>
                <ul class="custom-select-options">
                  <li class="custom-select-option selected" data-value="easy">Easy</li>
                  <li class="custom-select-option" data-value="medium">Medium</li>
                  <li class="custom-select-option" data-value="hard">Hard</li>
                </ul>
              </div>
            </div>
            <button class="btn btn--primary" id="restartTopicBtn" type="button">Restart run</button>
          </div>
        </div>

        <div class="quizTop">
          <div class="stat">
            <div class="stat__label">Score</div>
            <div class="stat__value" id="scoreValue">0</div>
            <div class="stat__meta" id="scoreMeta">Each question is worth 1 point.</div>
          </div>
          <div class="stat">
            <div class="stat__label">Streak</div>
            <div class="stat__value" id="streakValue">0</div>
          </div>
          <div class="timer" id="timerBox" aria-live="polite">
            <div class="timer__label">Time</div>
            <div class="timer__value" id="timerValue">--:--</div>
          </div>
          <div class="progressWrap">
            <div class="progressHead">
              <div class="progressHead__label">Progress</div>
              <div class="progressHead__value" id="progressValue">0 / 10</div>
            </div>
            <div class="progress" aria-hidden="true">
              <div class="progress__bar" id="progressBar"></div>
            </div>
          </div>
        </div>

        <section class="panel panel--game" aria-label="Math problem">
          <div class="panel__title">Solve</div>
          <div class="problemCard" id="problemCard">
            <div class="tagRow">
              <span class="tag" id="problemTypeTag">—</span>
              <span class="tag tag--muted" id="difficultyTag">—</span>
            </div>

            <div class="prompt" id="problemPrompt">
              Loading your first question...
            </div>

            <div class="inputRow">
              <label class="srOnly" for="answerInput">Answer</label>
              <input
                id="answerInput"
                name="answer"
                class="answerInput"
                type="text"
                inputmode="text"
                placeholder="Type your answer…"
                disabled
                autocomplete="off"
              />
              <button class="btn btn--primary" id="checkBtn" disabled>Check</button>
            </div>

            <div class="feedback" id="feedback" role="status" aria-live="polite"></div>
            <div class="explain" id="explanation"></div>

            <div class="buttonRow">
              <button class="btn btn--ghost" id="hintBtn" disabled>Hint (-0.5 pt)</button>
              <button class="btn btn--ghost" id="skipBtn" disabled>Skip</button>
              <button class="btn btn--next" id="newProblemBtn" disabled>Next</button>
            </div>

            <div class="keyRow" aria-hidden="true">
              <span class="kbd">Enter</span> to check
              <span class="sep">•</span>
              <span class="kbd">H</span> for hint
              <span class="sep">•</span>
              <span class="kbd">S</span> for skip
            </div>
          </div>

          <div class="achievements" id="achievements" aria-label="Badges"></div>
        </section>
      </main>

      <div class="modal" id="endModal" aria-hidden="true" role="dialog" aria-label="Run results" hidden>
        <div class="modal__card">
          <div class="modal__title" id="endTitle">Run complete</div>
          <div class="modal__body" id="endBody">—</div>
          <div class="modal__row">
            <button class="btn btn--primary" id="playAgainBtn">Play again</button>
            <button class="btn btn--ghost" id="changeTopicBtnModal">Pick another topic</button>
            <button class="btn btn--ghost" id="statsBtn">View stats</button>
            <button class="btn btn--ghost" id="closeModalBtn">Close</button>
          </div>
        </div>
      </div>

      <div class="modal" id="statsModal" aria-hidden="true" role="dialog" aria-label="High scores" hidden>
        <div class="modal__card" style="max-height:80vh; overflow-y:auto;">
          <div class="modal__title">🏆 High Scores</div>
          <div class="modal__body" id="statsBody" style="font-size:0.9em; line-height:1.6;">Loading scores...</div>
          <div class="modal__row">
            <button class="btn btn--ghost" id="closeStatsBtn">Close</button>
          </div>
        </div>
      </div>
    `;
  };

  refreshDomRefs();
  ensureTopicPageShell();
  refreshDomRefs();

  // Convert select elements to custom dropdowns with padded options
  let customizeSelectsGlobalListenerAdded = false;

  const customizeSelectElement = (select) => {
    try {
      if (select.dataset.customized === "true") {
        return;
      }

      select.dataset.customized = "true";

      const wrapper = document.createElement("div");
      wrapper.className = "custom-select-wrapper";
      
      const display = document.createElement("div");
      display.className = "custom-select-display";
      display.textContent = select.options[select.selectedIndex]?.text || "Select...";
      display.dataset.selectId = select.id;

      const optionsList = document.createElement("ul");
      optionsList.className = "custom-select-options";
      optionsList.dataset.selectId = select.id;

      // Build options array first
      const optionsData = [];
      for (let i = 0; i < select.options.length; i++) {
        optionsData.push({
          text: select.options[i].text,
          value: select.options[i].value,
          selected: select.options[i].selected
        });
      }

      // Create list items
      optionsData.forEach((optData, idx) => {
        const li = document.createElement("li");
        li.className = "custom-select-option";
        li.textContent = optData.text;
        li.setAttribute("data-index", idx);
        if (optData.selected) {
          li.classList.add("selected");
        }
        optionsList.appendChild(li);
      });

      display.addEventListener("click", (e) => {
        e.stopPropagation();
        optionsList.classList.toggle("active");
        wrapper.classList.toggle("open");
      });

      wrapper.appendChild(display);
      wrapper.appendChild(optionsList);
      
      if (select.parentNode) {
        select.parentNode.replaceChild(wrapper, select);
        wrapper.appendChild(select);
        select.style.display = "none";
      }

      // Set up global listener only once
      if (!customizeSelectsGlobalListenerAdded) {
        document.addEventListener("click", (e) => {
          // Handle option clicks with event delegation
          if (e.target.classList.contains("custom-select-option")) {
            const li = e.target;
            const optionsList = li.parentElement;
            const selectId = optionsList.dataset.selectId;
            const idx = parseInt(li.getAttribute("data-index"), 10);
            const hiddenSelect = document.getElementById(selectId);
            
            if (hiddenSelect) {
              hiddenSelect.selectedIndex = idx;
              hiddenSelect.value = hiddenSelect.options[idx].value;
              
              const display = optionsList.parentElement.querySelector(".custom-select-display");
              if (display) {
                display.textContent = li.textContent;
              }
              
              // Update selected class
              const items = optionsList.querySelectorAll(".custom-select-option");
              for (let i = 0; i < items.length; i++) {
                items[i].classList.remove("selected");
              }
              li.classList.add("selected");
              
              // Close dropdown
              optionsList.classList.remove("active");
              optionsList.parentElement.classList.remove("open");
              
              // Dispatch change
              hiddenSelect.dispatchEvent(new Event("change", { bubbles: true }));
            }
          } else {
            // Close all dropdowns when clicking outside
            const allWrappers = document.querySelectorAll(".custom-select-wrapper");
            for (let i = 0; i < allWrappers.length; i++) {
              const w = allWrappers[i];
              if (!w.contains(e.target)) {
                const opts = w.querySelector(".custom-select-options");
                if (opts) opts.classList.remove("active");
                w.classList.remove("open");
              }
            }
          }
        });
        customizeSelectsGlobalListenerAdded = true;
      }
    } catch(e) {
      console.error("Error customizing select:", e);
    }
  };

  const customizeSelects = () => {
    const selects = document.querySelectorAll("select:not([data-customized='true'])");
    
    for (let i = 0; i < selects.length; i++) {
      customizeSelectElement(selects[i]);
    }
  };

  const THEME_KEY = "math-arcade-theme";

  const getPreferredTheme = () => {
    const saved = window.localStorage?.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  };

  const updateThemeToggleLabel = (theme) => {
    if (!els.themeToggle) return;
    els.themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
    els.themeToggle.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
  };

  const applyTheme = (theme) => {
    document.body.dataset.theme = theme;
    updateThemeToggleLabel(theme);
  };

  const toggleTheme = () => {
    const nextTheme = document.body.dataset.theme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    window.localStorage?.setItem(THEME_KEY, nextTheme);
  };

  const setupSvgatorLoop = (objectEl) => {
    if (!objectEl || objectEl.dataset.loopAttached === "true") return;
    const loopMs = Number(objectEl.getAttribute("data-loop-ms"));
    if (!Number.isFinite(loopMs) || loopMs <= 0) return;
    const frontLayer = objectEl.querySelector(".heroArt__layer--front");
    const backLayer = objectEl.querySelector(".heroArt__layer--back");
    if (!frontLayer || !backLayer) return;
    const frontBase = frontLayer.getAttribute("data");
    const backBase = backLayer.getAttribute("data");
    if (!frontBase || !backBase) return;
    objectEl.dataset.loopAttached = "true";
    let showingFront = true;
    let loopIndex = 0;
    const refreshLayer = (layer, baseData) => {
      const separator = baseData.includes("?") ? "&" : "?";
      layer.data = `${baseData}${separator}loop=${Date.now()}-${loopIndex}`;
    };
    window.setInterval(() => {
      loopIndex += 1;
      if (showingFront) {
        refreshLayer(backLayer, backBase);
        backLayer.style.opacity = "1";
        frontLayer.style.opacity = "0";
      } else {
        refreshLayer(frontLayer, frontBase);
        frontLayer.style.opacity = "1";
        backLayer.style.opacity = "0";
      }
      showingFront = !showingFront;
    }, loopMs);
  };

  applyTheme(getPreferredTheme());
  setupSvgatorLoop(els.heroArt);

  const TOPIC_ART = {
    addsub: { glyph: "+ −", label: "FAST", a: "#2DE2E6", b: "#FF4F9F" },
    multiply: { glyph: "×", label: "POWER", a: "#7CFF9B", b: "#2DE2E6" },
    exactDiv: { glyph: "÷", label: "CLEAN", a: "#2DE2E6", b: "#FFD166" },
    powers: { glyph: "x²", label: "BOOST", a: "#A983FF", b: "#FF4F9F" },
    sqrtPerfect: { glyph: "√", label: "ROOT", a: "#7CFF9B", b: "#A983FF" },
    mod: { glyph: "%", label: "REM", a: "#FFD166", b: "#FF8C42" },
    hcfLcm: { glyph: "HCF", label: "MATCH", a: "#2DE2E6", b: "#A983FF" },
    primeYesNo: { glyph: "2 3 5", label: "PRIME", a: "#FF4F9F", b: "#FFD166" },
    factorCount: { glyph: "12", label: "FACTORS", a: "#7CFF9B", b: "#2DE2E6" },
    simplifyFraction: { glyph: "3/4", label: "REDUCE", a: "#2DE2E6", b: "#FF8C42" },
    fractionToPercent: { glyph: "%", label: "FLIP", a: "#FF4F9F", b: "#FFCF5A" },
    percentToDecimal: { glyph: "0.25", label: "SHIFT", a: "#2DE2E6", b: "#7CFF9B" },
    linearEq: { glyph: "x", label: "SOLVE", a: "#FFCF5A", b: "#FF4F9F" },
    rectangle: { glyph: "▭", label: "SHAPE", a: "#2DE2E6", b: "#A983FF" },
    distance: { glyph: "↗", label: "PATH", a: "#7CFF9B", b: "#2DE2E6" },
    expectedValueDice: { glyph: "🎲", label: "LUCK", a: "#FF8C42", b: "#FF4F9F" },
    statsMeanMedian: { glyph: "AVG", label: "DATA", a: "#A983FF", b: "#2DE2E6" },
    tableSprint: { glyph: "□×", label: "TABLE", a: "#FFD166", b: "#2DE2E6" },
    primeBoost: { glyph: "11", label: "BOOST", a: "#FF4F9F", b: "#7CFF9B" },
    divisibilityRules: { glyph: "÷?", label: "RULES", a: "#2DE2E6", b: "#FFD166" },
    mathBingo: { glyph: "B 7", label: "BINGO", a: "#FF4F9F", b: "#2DE2E6" },
    mentalMath: { glyph: "⚡", label: "MENTAL", a: "#FFD166", b: "#FF4F9F" },
    primeNumbers: { glyph: "13", label: "NEXT", a: "#7CFF9B", b: "#A983FF" },
    skipCounting: { glyph: "2·4·6", label: "COUNT", a: "#2DE2E6", b: "#FF8C42" },
  };

  const svgDataUri = (svg) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

  const getTopicArt = (topic) => {
    const art = TOPIC_ART[topic.id] || { glyph: "∑", label: "PLAY", a: "#2DE2E6", b: "#FF4F9F" };
    const safeTitle = (topic.title || "Math Arcade").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    const safeGlyph = String(art.glyph).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    const safeLabel = String(art.label).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    return svgDataUri(`
      <svg width="640" height="420" viewBox="0 0 640 420" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g" x1="82" y1="46" x2="574" y2="360" gradientUnits="userSpaceOnUse">
            <stop stop-color="${art.a}"/>
            <stop offset="1" stop-color="${art.b}"/>
          </linearGradient>
        </defs>
        <rect width="640" height="420" rx="34" fill="#140B27"/>
        <circle cx="140" cy="84" r="94" fill="${art.a}" fill-opacity="0.18"/>
        <circle cx="532" cy="318" r="108" fill="${art.b}" fill-opacity="0.22"/>
        <rect x="54" y="52" width="532" height="316" rx="30" fill="url(#g)" fill-opacity="0.14" stroke="rgba(248,251,255,0.16)"/>
        <rect x="118" y="112" width="404" height="158" rx="24" fill="#1B1233" stroke="url(#g)" stroke-width="5"/>
        <text x="320" y="215" text-anchor="middle" font-size="78" font-family="Fredoka, Arial, sans-serif" font-weight="700" fill="#F8FBFF">${safeGlyph}</text>
        <rect x="176" y="292" width="288" height="38" rx="19" fill="#F8FBFF" fill-opacity="0.1"/>
        <text x="320" y="319" text-anchor="middle" font-size="24" font-family="Fredoka, Arial, sans-serif" font-weight="700" fill="#F8FBFF">${safeLabel}</text>
        <text x="60" y="390" font-size="28" font-family="Fredoka, Arial, sans-serif" font-weight="700" fill="#F8FBFF" fill-opacity="0.92">${safeTitle}</text>
      </svg>
    `);
  };

  const renderMathIfPossible = (root = document) => {
    // KaTeX renders any span with class "math" using its textContent as LaTeX.
    // This keeps the generators simple while making the UI readable.
    if (!window.katex || typeof window.katex.render !== "function") return;
    root.querySelectorAll("span.math").forEach((el) => {
      if (el.querySelector(".katex")) return; // already rendered
      const tex = (el.textContent || "").trim();
      if (!tex) return;
      try {
        window.katex.render(tex, el, {
          throwOnError: false,
          displayMode: false,
        });
      } catch {
        // Leave as-is if KaTeX can't parse it.
      }
    });
  };

  const getDifficultyValue = () => {
    if (!els.difficultyWrapper) return "easy";
    const selected = els.difficultyWrapper.querySelector(".custom-select-option.selected");
    return selected?.dataset?.value || "easy";
  };

  const setDifficultyValue = (value) => {
    if (!els.difficultyWrapper) return;
    const display = els.difficultyWrapper.querySelector(".custom-select-display");
    const options = els.difficultyWrapper.querySelectorAll(".custom-select-option");
    
    options.forEach(opt => {
      if (opt.dataset.value === value) {
        opt.classList.add("selected");
        const label = value.charAt(0).toUpperCase() + value.slice(1);
        display.textContent = label;
      } else {
        opt.classList.remove("selected");
      }
    });
  };

  const setupDifficultyDropdown = () => {
    if (!els.difficultyWrapper) return;
    
    const display = els.difficultyWrapper.querySelector(".custom-select-display");
    const optionsList = els.difficultyWrapper.querySelector(".custom-select-options");
    const options = els.difficultyWrapper.querySelectorAll(".custom-select-option");
    
    display.addEventListener("click", () => {
      optionsList.classList.toggle("active");
      els.difficultyWrapper.classList.toggle("open");
    });
    
    options.forEach(option => {
      option.addEventListener("click", () => {
        const value = option.dataset.value;
        setDifficultyValue(value);
        optionsList.classList.remove("active");
        els.difficultyWrapper.classList.remove("open");
        startQuiz(pageTopicId, value, state.gameMode, state.timeLimit);
        syncTopicPageMeta();
        syncTopicPageQuery();
      });
    });
    
    document.addEventListener("click", (e) => {
      if (!els.difficultyWrapper.contains(e.target)) {
        optionsList.classList.remove("active");
        els.difficultyWrapper.classList.remove("open");
      }
    });
  };

  const randInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

  const setupHomeModeSelector = () => {
    const wrapper = document.getElementById("homeModeSelector");
    if (!wrapper) return;
    
    const display = wrapper.querySelector(".custom-select-display");
    const optionsList = wrapper.querySelector(".custom-select-options");
    const options = wrapper.querySelectorAll(".custom-select-option");
    
    display.addEventListener("click", () => {
      optionsList.classList.toggle("active");
      wrapper.classList.toggle("open");
    });
    
    options.forEach(option => {
      option.addEventListener("click", () => {
        options.forEach(opt => {
          opt.classList.remove("selected");
        });
        option.classList.add("selected");
        display.textContent = option.textContent;
        optionsList.classList.remove("active");
        wrapper.classList.remove("open");
        // Store selected mode globally
        window.selectedGameMode = option.dataset.value;
      });
    });
    
    // Initialize with first option
    window.selectedGameMode = options[0]?.dataset?.value || "arcade";
    
    document.addEventListener("click", (e) => {
      if (!wrapper.contains(e.target)) {
        optionsList.classList.remove("active");
        wrapper.classList.remove("open");
      }
    });
  };

  const showModeSelectionScreen = () => {
    if (!els.modeSelectionScreen) refreshDomRefs();
    if (els.modeSelectionScreen) {
      els.modeSelectionScreen.style.display = "flex";
      if (els.topicBar) els.topicBar.style.display = "none";
      if (els.topicGrid) els.topicGrid.style.display = "none";
      if (els.topicFooter) els.topicFooter.style.display = "none";
    }
  };

  const hideModeSelectionScreen = () => {
    if (!els.modeSelectionScreen) refreshDomRefs();
    if (els.modeSelectionScreen) {
      els.modeSelectionScreen.style.display = "none";
      if (els.topicBar) els.topicBar.style.display = "flex";
      if (els.topicGrid) els.topicGrid.style.display = "grid";
      if (els.topicFooter) els.topicFooter.style.display = "block";
    }
  };

  const setupModeSelectionButtons = () => {
    const buttons = document.querySelectorAll(".modeSelectBtn");
    
    buttons.forEach((btn) => {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        const mode = this.dataset.mode;
        window.selectedGameMode = mode;
        
        // Update the selector display
        const wrapper = document.getElementById("homeModeSelector");
        if (wrapper) {
          const display = wrapper.querySelector(".custom-select-display");
          const options = wrapper.querySelectorAll(".custom-select-option");
          if (display && options.length > 0) {
            options.forEach(opt => {
              opt.classList.remove("selected");
              if (opt.dataset.value === mode) {
                opt.classList.add("selected");
                display.textContent = opt.textContent;
              }
            });
          }
        }

        hideModeSelectionScreen();
      });
    });
    
    const changeBtn = document.getElementById("modeChangeBtn");
    if (changeBtn) {
      changeBtn.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        showModeSelectionScreen();
      });
    }
  };

  const hcf = (a, b) => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const t = a % b;
      a = b;
      b = t;
    }
    return a;
  };
  const lcm = (a, b) => {
    if (a === 0 || b === 0) return 0;
    return Math.abs((a / hcf(a, b)) * b);
  };

  const isPrime = (n) => {
    n = Math.floor(n);
    if (n < 2) return false;
    if (n % 2 === 0) return n === 2;
    if (n % 3 === 0) return n === 3;
    const limit = Math.floor(Math.sqrt(n));
    for (let i = 5; i <= limit; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  };

  const divisorsCount = (n) => {
    n = Math.abs(n);
    if (n === 0) return 0;
    let count = 0;
    const r = Math.floor(Math.sqrt(n));
    for (let d = 1; d <= r; d++) {
      if (n % d === 0) {
        count += d * d === n ? 1 : 2;
      }
    }
    return count;
  };

  const reduceFraction = (n, d) => {
    if (d === 0) return { n: NaN, d: NaN };
    const sign = d < 0 ? -1 : 1;
    n *= sign;
    d *= sign;
    const g = hcf(n, d);
    return { n: n / g, d: d / g };
  };

  const formatNumber = (n, places = 2) => {
    if (!Number.isFinite(n)) return String(n);
    // Keep trailing zeros for predictable validation.
    return n.toFixed(places);
  };

  const parseNumberLoose = (s) => {
    const cleaned = s.trim().replace(",", ".");
    if (!cleaned) return null;
    const n = Number(cleaned);
    if (!Number.isFinite(n)) return null;
    return n;
  };

  const parseYesNo = (s) => {
    const v = s.trim().toLowerCase();
    if (["yes", "y", "true", "t"].includes(v)) return true;
    if (["no", "n", "false", "f"].includes(v)) return false;
    return null;
  };

  const parseFractionInput = (s) => {
    const cleaned = s.trim().replace(/\s+/g, "");
    // Accept both forward slash and backslash as fraction separators
    // so mobile keyboards that expose "\" still work for fraction answers.
    const parts = cleaned.split(/[\\/]/);
    if (parts.length !== 2) return null;
    const n = Number(parts[0]);
    const d = Number(parts[1]);
    if (!Number.isInteger(n) || !Number.isInteger(d)) return null;
    if (d === 0) return null;
    return { n, d };
  };

  const formatSignedNumber = (n) => (n < 0 ? `- ${Math.abs(n)}` : `+ ${n}`);

  const DIFFICULTY = {
    easy: {
      label: "Easy",
      // Ranges are inclusive; keep answers small.
      ranges: {
        add: [0, 20],
        mul: [2, 12],
        divQ: [2, 12],
        divD: [2, 10],
        expB: [2, 8],
        expE: [2, 4],
        sqrtK: [2, 15],
        modA: [0, 80],
        modB: [2, 12],
        hcfA: [10, 60],
        hcfB: [8, 55],
        primeN: [2, 60],
        factorsN: [6, 96],
        fracA: [2, 10],
        fracB: [2, 10],
        fracC: [2, 6],
        linearA: [2, 10],
        linearB: [-20, 20],
        circleR: [1, 10],
        rectW: [2, 18],
        rectH: [2, 14],
        pointBase: 9,
        fibF: [1, 9],
        diceSides: [6],
        diceDice: [1, 2, 3],
        statsN: [3, 7],
      },
    },
    medium: {
      label: "Medium",
      ranges: {
        add: [-10, 60],
        mul: [3, 18],
        divQ: [3, 18],
        divD: [2, 15],
        expB: [2, 10],
        expE: [2, 5],
        sqrtK: [3, 25],
        modA: [0, 180],
        modB: [2, 20],
        hcfA: [20, 120],
        hcfB: [10, 90],
        primeN: [2, 150],
        factorsN: [8, 180],
        fracA: [2, 18],
        fracB: [2, 12],
        fracC: [2, 8],
        linearA: [2, 14],
        linearB: [-40, 40],
        circleR: [2, 14],
        rectW: [4, 26],
        rectH: [3, 20],
        pointBase: 14,
        fibF: [1, 14],
        diceSides: [6, 8, 10],
        diceDice: [2, 3, 4],
        statsN: [4, 9],
      },
    },
    hard: {
      label: "Hard",
      ranges: {
        add: [-40, 140],
        mul: [5, 28],
        divQ: [5, 30],
        divD: [2, 25],
        expB: [2, 12],
        expE: [2, 6],
        sqrtK: [6, 40],
        modA: [0, 500],
        modB: [2, 30],
        hcfA: [40, 240],
        hcfB: [20, 210],
        primeN: [2, 300],
        factorsN: [18, 360],
        fracA: [3, 24],
        fracB: [2, 18],
        fracC: [2, 10],
        linearA: [2, 20],
        linearB: [-80, 80],
        circleR: [4, 18],
        rectW: [6, 42],
        rectH: [5, 34],
        pointBase: 22,
        fibF: [2, 18],
        diceSides: [6, 8, 10, 12],
        diceDice: [3, 4, 5],
        statsN: [5, 11],
      },
    },
  };

  // Each generator returns a question object:
  // { id, typeLabel, difficultyLabel, promptHTML, hintHTML, explanationHTML, validate(input):boolean }
  const PROBLEM_TYPES = [
    {
      id: "addsub",
      title: "Sum & Difference Dash",
      generate: (diffKey) => {
        const r = DIFFICULTY[diffKey].ranges;
        const a = randInt(r.add[0], r.add[1]);
        const b = randInt(r.add[0], r.add[1]);
        const op = Math.random() < 0.5 ? "+" : "-";
        const ans = op === "+" ? a + b : a - b;
        const promptHTML = `Compute <span class="math">${a} ${op} ${b}</span>.`;
        return {
          typeLabel: "Add/Subtract",
          promptHTML,
          hintHTML: `Use the operation rule: ${op === "+" ? "add" : "subtract"} the second number.`,
          explanationHTML: `${a} ${op} ${b} = <span class="math">${ans}</span>.`,
          validate: (input) => {
            const n = parseNumberLoose(input);
            return n !== null && n === ans;
          },
          expectedDisplay: String(ans),
        };
      },
    },
    {
      id: "multiply",
      title: "Times Table Turbo",
      generate: (diffKey) => {
        const r = DIFFICULTY[diffKey].ranges;
        const a = randInt(r.mul[0], r.mul[1]);
        const b = randInt(r.mul[0], r.mul[1]);
        const ans = a * b;
        const promptHTML = `Compute <span class="math">${a} \\times ${b}</span>.`;
        return {
          typeLabel: "Multiply",
          promptHTML,
          hintHTML: `Think of multiplication as repeated addition: add <span class="math">${a}</span> a total of <span class="math">${b}</span> times, or use your times tables.`,
          explanationHTML: `<span class="math">${a} \\times ${b} = ${ans}</span>.`,
          validate: (input) => {
            const n = parseNumberLoose(input);
            return n !== null && n === ans;
          },
          expectedDisplay: String(ans),
        };
      },
    },
    {
      id: "exactDiv",
      title: "Clean-Cut Division",
      generate: (diffKey) => {
        const r = DIFFICULTY[diffKey].ranges;
        const d = randInt(r.divD[0], r.divD[1]);
        const q = randInt(r.divQ[0], r.divQ[1]);
        const a = d * q;
        const promptHTML = `Compute <span class="math">${a} \\div ${d}</span> (an exact division).`;
        return {
          typeLabel: "Exact Division",
          promptHTML,
          hintHTML: `Think multiplication backward: what number times ${d} gives ${a}?`,
          explanationHTML: `<span class="math">${a} \\div ${d} = ${q}</span>.`,
          validate: (input) => {
            const n = parseNumberLoose(input);
            return n !== null && n === q;
          },
          expectedDisplay: String(q),
        };
      },
    },
    {
      id: "powers",
      title: "Power-Up Exponents",
      generate: (diffKey) => {
        const r = DIFFICULTY[diffKey].ranges;
        const base = randInt(r.expB[0], r.expB[1]);
        const exp = randInt(r.expE[0], r.expE[1]);
        const ans = base ** exp;
        const promptHTML = `Compute <span class="math">${base}^{${exp}}</span>.`;
        return {
          typeLabel: "Powers",
          promptHTML,
          hintHTML: `Multiply by the base repeatedly: ${base}^${exp} = ${base} x ... x ${base}.`,
          explanationHTML: `${base}^{${exp}} = <span class="math">${ans}</span>.`,
          validate: (input) => {
            const n = parseNumberLoose(input);
            return n !== null && n === ans;
          },
          expectedDisplay: String(ans),
        };
      },
    },
    {
      id: "sqrtPerfect",
      title: "Square Root Secrets",
      generate: (diffKey) => {
        const r = DIFFICULTY[diffKey].ranges;
        const k = randInt(r.sqrtK[0], r.sqrtK[1]);
        const n = k * k;
        const promptHTML = `Compute <span class="math">\\sqrt{${n}}</span> (an integer).`;
        return {
          typeLabel: "Square Root",
          promptHTML,
          hintHTML: `Find the number whose square is ${n}.`,
          explanationHTML: `Because <span class="math">${k}^2 = ${n}</span>, we get <span class="math">\\sqrt{${n}} = ${k}</span>.`,
          validate: (input) => {
            const val = parseNumberLoose(input);
            return val !== null && val === k;
          },
          expectedDisplay: String(k),
        };
      },
    },
    {
      id: "mod",
      title: "Remainder Rumble",
      generate: (diffKey) => {
        const r = DIFFICULTY[diffKey].ranges;
        const a = randInt(r.modA[0], r.modA[1]);
        const b = randInt(r.modB[0], r.modB[1]);
        const ans = a % b;
        const promptHTML = `Find the remainder when <span class="math">${a}</span> is divided by <span class="math">${b}</span>.`;
        return {
          typeLabel: "Mod (Remainders)",
          promptHTML,
          hintHTML: `Think: ${a} ÷ ${b}. What number is left over after making equal groups of ${b}?`,
          explanationHTML: `After dividing ${a} by ${b}, the remainder is <span class="math">${ans}</span>.`,
          validate: (input) => {
            const n = parseNumberLoose(input);
            return n !== null && n === ans;
          },
          expectedDisplay: String(ans),
        };
      },
    },
    {
      id: "hcfLcm",
      title: "HCF vs LCM Arena",
      generate: (diffKey) => {
        const r = DIFFICULTY[diffKey].ranges;
        const a = randInt(r.hcfA[0], r.hcfA[1]);
        const b = randInt(r.hcfB[0], r.hcfB[1]);
        const askGcd = Math.random() < 0.5;
        const ans = askGcd ? hcf(a, b) : lcm(a, b);
        const label = askGcd ? "HCF" : "LCM";
        const promptHTML = `Find the <span class="math">${label}(${a}, ${b})</span>.`;
        const hintHTML = askGcd
          ? `HCF is the biggest number that divides both <span class="math">${a}</span> and <span class="math">${b}</span>.`
          : `LCM is the smallest common multiple of <span class="math">${a}</span> and <span class="math">${b}</span>.`;
        const explanationHTML = askGcd
          ? `The HCF of ${a} and ${b} is <span class="math">${ans}</span>.`
          : `The LCM of ${a} and ${b} is <span class="math">${ans}</span>.`;
        return {
          typeLabel: label,
          promptHTML,
          hintHTML,
          explanationHTML,
          validate: (input) => {
            const n = parseNumberLoose(input);
            return n !== null && n === ans;
          },
          expectedDisplay: String(ans),
        };
      },
    },
    {
      id: "primeYesNo",
      title: "Prime Detective",
      generate: (diffKey) => {
        const r = DIFFICULTY[diffKey].ranges;
        const n = randInt(r.primeN[0], r.primeN[1]);
        const ans = isPrime(n);
        const promptHTML = `Is <span class="math">${n}</span> prime? Type <span class="math">yes</span> or <span class="math">no</span>.`;
        return {
          typeLabel: "Prime Check",
          promptHTML,
          hintHTML: `A prime has exactly two positive divisors: 1 and itself.`,
          explanationHTML: ans
            ? `<span class="math">${n}</span> has no divisors other than 1 and itself, so it is prime.`
            : `<span class="math">${n}</span> has divisors other than 1 and itself, so it is not prime.`,
          validate: (input) => {
            const v = parseYesNo(input);
            return v === ans;
          },
          expectedDisplay: ans ? "yes" : "no",
        };
      },
    },
    {
      id: "factorCount",
      title: "Factor Factory",
      generate: (diffKey) => {
        const r = DIFFICULTY[diffKey].ranges;
        const n = randInt(r.factorsN[0], r.factorsN[1]);
        const ans = divisorsCount(n);
        const promptHTML = `How many positive factors does <span class="math">${n}</span> have?`;
        return {
          typeLabel: "Factors",
          promptHTML,
          hintHTML: `Factors come in pairs: if d divides n, then n/d also divides n.`,
          explanationHTML: `List or pair the positive divisors of ${n}. Counting them gives <span class="math">${ans}</span> total positive factors.`,
          validate: (input) => {
            const val = parseNumberLoose(input);
            return val !== null && val === ans;
          },
          expectedDisplay: String(ans),
        };
      },
    },
    {
      id: "simplifyFraction",
      title: "Fraction Makeover",
      generate: (diffKey) => {
        const r = DIFFICULTY[diffKey].ranges;
        let a = randInt(r.fracA[0], r.fracA[1]);
        let b = randInt(r.fracB[0], r.fracB[1]);
        let c = randInt(Math.max(2, r.fracC[0]), Math.max(2, r.fracC[1]));
        let numerator = a * c;
        let denominator = b * c;
        let reduced = reduceFraction(numerator, denominator);
        let attempts = 0;

        while (reduced.n === numerator && reduced.d === denominator && attempts < 40) {
          a = randInt(r.fracA[0], r.fracA[1]);
          b = randInt(r.fracB[0], r.fracB[1]);
          c = randInt(Math.max(2, r.fracC[0]), Math.max(2, r.fracC[1]));
          numerator = a * c;
          denominator = b * c;
          reduced = reduceFraction(numerator, denominator);
          attempts += 1;
        }
        const promptHTML = `Simplify <span class="math">${numerator}/${denominator}</span>. Type your answer as <span class="math">p/q</span>.`;
        const hintHTML = `Reduce by dividing numerator and denominator by their HCF (common factor).`;
        const explanationHTML = `hcf(${numerator}, ${denominator}) reduces the fraction to <span class="math">${reduced.n}/${reduced.d}</span>.`;
        return {
          typeLabel: "Fraction Simplify",
          promptHTML,
          hintHTML,
          explanationHTML,
          validate: (input) => {
            const frac = parseFractionInput(input);
            if (!frac) return false;
            const r2 = reduceFraction(frac.n, frac.d);
            return r2.n === reduced.n && r2.d === reduced.d;
          },
          expectedDisplay: `${reduced.n}/${reduced.d}`,
        };
      },
    },
    {
      id: "fractionToPercent",
      title: "Fraction → Percent Flip",
      generate: () => {
        const mapping = [
          { n: 1, d: 10, p: 10 },
          { n: 1, d: 5, p: 20 },
          { n: 1, d: 4, p: 25 },
          { n: 2, d: 5, p: 40 },
          { n: 1, d: 2, p: 50 },
          { n: 3, d: 5, p: 60 },
          { n: 3, d: 4, p: 75 },
          { n: 4, d: 5, p: 80 },
          { n: 9, d: 10, p: 90 },
        ];
        const { n, d, p } = pick(mapping);
        const promptHTML = `What percent is <span class="math">${n}/${d}</span>? Type a number like <span class="math">25</span>.`;
        return {
          typeLabel: "Percent",
          promptHTML,
          hintHTML: `Percent means “out of 100.” Convert the fraction to a decimal, then multiply by <span class="math">100</span>.`,
          explanationHTML: `<span class="math">${n}/${d}</span> = <span class="math">${p}/100</span>, so the percent is <span class="math">${p}</span>%.`,
          validate: (input) => {
            const val = parseNumberLoose(input);
            return val !== null && Math.round(val) === p;
          },
          expectedDisplay: String(p),
        };
      },
    },
    {
      id: "percentToDecimal",
      title: "Percent Shrink Ray",
      generate: (diffKey) => {
        const easySet = [10, 20, 25, 30, 40, 50, 60, 75, 80, 90];
        const mediumSet = [5, 10, 12, 15, 20, 25, 33, 40, 50, 60, 75, 80];
        const hardSet = [5, 7, 10, 12, 15, 18, 20, 22, 25, 30, 35, 40, 45, 50];
        const set = diffKey === "easy" ? easySet : diffKey === "medium" ? mediumSet : hardSet;
        const p = pick(set);
        const ans = p / 100;
        const promptHTML = `Convert <span class="math">${p}%</span> to a decimal (no percent sign).`;
        const expected2 = formatNumber(ans, 2);
        return {
          typeLabel: "Percent -> Decimal",
          promptHTML,
          hintHTML: `To convert percent to decimal, divide by 100 (move decimal point two places left).`,
          explanationHTML: `${p}% = <span class="math">${p}/100</span> = <span class="math">${expected2}</span>.`,
          validate: (input) => {
            const normalized = input.trim().replace("%", "");
            const val = parseNumberLoose(normalized);
            if (val === null) return false;
            return Math.abs(val - ans) <= 0.01;
          },
          expectedDisplay: expected2,
        };
      },
    },
    {
      id: "linearEq",
      title: "Solve for x Quest",
      generate: (diffKey) => {
        const r = DIFFICULTY[diffKey].ranges;
        const a = randInt(r.linearA[0], r.linearA[1]);
        const x = randInt(-10, 10);
        const b = randInt(r.linearB[0], r.linearB[1]);
        const c = a * x + b;
        // ax + b = c
        const promptHTML = `Solve for <span class="math">x</span>: <span class="math">${a}x ${formatSignedNumber(b)} = ${c}</span>.`;
        const hintHTML = b >= 0
          ? `Subtract <span class="math">${b}</span> from both sides, then divide by <span class="math">${a}</span>.`
          : `Add <span class="math">${Math.abs(b)}</span> to both sides, then divide by <span class="math">${a}</span>.`;
        const explanationHTML = b >= 0
          ? `Subtract <span class="math">${b}</span> from both sides: <span class="math">${a}x = ${c - b}</span>. Then divide by <span class="math">${a}</span> to get <span class="math">x = ${x}</span>.`
          : `Add <span class="math">${Math.abs(b)}</span> to both sides: <span class="math">${a}x = ${c - b}</span>. Then divide by <span class="math">${a}</span> to get <span class="math">x = ${x}</span>.`;
        return {
          typeLabel: "Linear Equation",
          promptHTML,
          hintHTML,
          explanationHTML,
          validate: (input) => {
            const val = parseNumberLoose(input);
            return val !== null && val === x;
          },
          expectedDisplay: String(x),
        };
      },
    },
    {
      id: "rectangle",
      title: "Rectangle Lab",
      generate: (diffKey) => {
        const r = DIFFICULTY[diffKey].ranges;
        const w = randInt(r.rectW[0], r.rectW[1]);
        const h = randInt(r.rectH[0], r.rectH[1]);
        const askArea = Math.random() < 0.5;
        const promptHTML = askArea
          ? `A rectangle has width <span class="math">${w}</span> and height <span class="math">${h}</span>. What is its <b>area</b>?`
          : `A rectangle has width <span class="math">${w}</span> and height <span class="math">${h}</span>. What is its <b>perimeter</b>?`;
        const ans = askArea ? w * h : 2 * (w + h);
        const label = askArea ? "Area" : "Perimeter";
        const hintHTML = askArea
          ? `Area = width <span class="math-thin">×</span> height.`
          : `Perimeter = 2(width + height).`;
        const explanationHTML = askArea
          ? `<span class="math">${w} \\times ${h} = ${ans}</span>.`
          : `2(${w} + ${h}) = <span class="math">${ans}</span>.`;
        return {
          typeLabel: `Rectangle ${label}`,
          promptHTML,
          hintHTML,
          explanationHTML,
          validate: (input) => {
            const val = parseNumberLoose(input);
            return val !== null && val === ans;
          },
          expectedDisplay: String(ans),
        };
      },
    },
    {
      id: "distance",
      title: "Coordinate Racer",
      generate: (diffKey) => {
        const r = DIFFICULTY[diffKey].ranges;
        const triples = [
          { dx: 3, dy: 4, h: 5 },
          { dx: 5, dy: 12, h: 13 },
          { dx: 8, dy: 15, h: 17 },
          { dx: 7, dy: 24, h: 25 },
          { dx: 9, dy: 40, h: 41 },
          { dx: 12, dy: 35, h: 37 },
        ];
        const t = pick(triples);
        const base = r.pointBase;
        const x1 = randInt(-base, base);
        const y1 = randInt(-base, base);
        const signX = Math.random() < 0.5 ? -1 : 1;
        const signY = Math.random() < 0.5 ? -1 : 1;
        const x2 = x1 + signX * t.dx;
        const y2 = y1 + signY * t.dy;
        const promptHTML = `What is the distance between points <span class="math">(${x1}, ${y1})</span> and <span class="math">(${x2}, ${y2})</span>? (Use the distance formula)`;
        const hintHTML = `Use the distance formula: <span class="math">\\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}</span>. First find the horizontal and vertical differences.`;
        const explanationHTML = `The points are <span class="math">${Math.abs(x2 - x1)}</span> units apart horizontally and <span class="math">${Math.abs(y2 - y1)}</span> units apart vertically, so the distance is <span class="math">\\sqrt{${t.dx}^2 + ${t.dy}^2} = ${t.h}</span>.`;
        return {
          typeLabel: "Distance",
          promptHTML,
          hintHTML,
          explanationHTML,
          validate: (input) => {
            const val = parseNumberLoose(input);
            return val !== null && val === t.h;
          },
          expectedDisplay: String(t.h),
        };
      },
    },
    {
      id: "expectedValueDice",
      title: "Dice Expectation Lab",
      generate: (diffKey) => {
        const r = DIFFICULTY[diffKey].ranges;
        const sides = pick(r.diceSides);
        const diceCount = pick(r.diceDice);
        // Expected value of one die = (sides + 1) / 2
        const expected = diceCount * (sides + 1) / 2;
        const xText = diceCount === 1 ? "once" : `${diceCount} x`;
        const promptHTML = `You roll a fair ${sides}-sided die ${xText}. What is the expected value?`;
        const hint = `For one fair die, the mean (average) roll is <span class="math">(${sides} + 1)/2</span>. Then multiply by the number of dice.`;
        const expected2 = Math.abs(expected % 1) < 1e-9 ? String(expected.toFixed(0)) : expected.toFixed(1);
        return {
          typeLabel: "Expected Value",
          promptHTML,
          hintHTML: hint,
          explanationHTML: `One fair ${sides}-sided die has expected value <span class="math">(${sides} + 1)/2 = ${(sides + 1) / 2}</span>. For ${diceCount} dice, multiply by <span class="math">${diceCount}</span>: <span class="math">${diceCount} \\times ${(sides + 1) / 2} = ${expected2}</span>.`,
          validate: (input) => {
            const val = parseNumberLoose(input);
            if (val === null) return false;
            return Math.abs(val - expected) <= 0.1;
          },
          expectedDisplay: expected2,
        };
      },
    },
    {
      id: "statsMeanMedian",
      title: "Average and Median",
      generate: (diffKey) => {
        const r = DIFFICULTY[diffKey].ranges;
        const n = randInt(r.statsN[0], r.statsN[1]);
        const makeOdd = Math.random() < 0.6;
        const count = makeOdd ? (n % 2 === 0 ? n + 1 : n) : n + 1; // keep odd-ish for median stability
        const nums = [];
        for (let i = 0; i < count; i++) nums.push(randInt(-10, 30));
        const askMedian = Math.random() < 0.5;
        const sorted = [...nums].sort((a, b) => a - b);
        const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
        const median = sorted[Math.floor(sorted.length / 2)];
        const ans = askMedian ? median : mean;
        const promptHTML = askMedian
          ? `Find the <b>median</b> of this set: <span class="math">{ ${nums.join(", ")} }</span>.`
          : `Find the <b>average</b> of this set: <span class="math">{ ${nums.join(", ")} }</span>. (You can answer as a decimal.)`;
        const hintHTML = askMedian
          ? `Median is the middle value when the numbers are sorted.`
          : `Average = (sum of values) / (number of values).`;
        const explanationHTML = askMedian
          ? `When sorted, the middle (median) value is <span class="math">${median}</span>.`
          : `Add the numbers and divide by <span class="math">${nums.length}</span>. The average is <span class="math">${mean.toFixed(2)}</span>.`;
        return {
          typeLabel: askMedian ? "Median" : "Average",
          promptHTML,
          hintHTML,
          explanationHTML,
          validate: (input) => {
            const val = parseNumberLoose(input);
            if (val === null) return false;
            if (askMedian) return val === median;
            return Math.abs(val - mean) <= 0.05;
          },
          expectedDisplay: askMedian ? String(median) : mean.toFixed(2),
        };
      },
    },
    {
      id: "tableSprint",
      title: "Multiplication Table Sprint",
      generate: (diffKey) => {
        const r = DIFFICULTY[diffKey].ranges;
        const a = randInt(2, Math.min(12, r.mul[1]));
        const b = randInt(2, Math.min(12, r.mul[1]));
        const product = a * b;
        const hideFirst = Math.random() < 0.5;
        const promptHTML = hideFirst
          ? `Find the missing number (type what goes in the box): <span class="math">\\square \\times ${b} = ${product}</span>.`
          : `Find the missing number (type what goes in the box): <span class="math">${a} \\times \\square = ${product}</span>.`;
        const ans = hideFirst ? a : b;
        return {
          typeLabel: "Times Table",
          promptHTML,
          hintHTML: `Use division to find the missing factor: ${product} ÷ ${hideFirst ? b : a}.`,
          explanationHTML: `The missing number is <span class="math">${ans}</span>.`,
          validate: (input) => {
            const n = parseNumberLoose(input);
            return n !== null && n === ans;
          },
          expectedDisplay: String(ans),
        };
      },
    },
    {
      id: "primeBoost",
      title: "Prime Number Boost",
      generate: (diffKey) => {
        const r = DIFFICULTY[diffKey].ranges;
        const n = randInt(Math.max(2, r.primeN[0]), r.primeN[1]);
        const promptHTML = `What is the smallest prime factor of <span class="math">${n}</span>?`;
        let ans = n;
        if (!isPrime(n)) {
          ans = 2;
          while (ans <= n && n % ans !== 0) ans += 1;
        }
        return {
          typeLabel: "Prime Factors",
          promptHTML,
          hintHTML: `Try small primes first: 2, 3, 5, 7...`,
          explanationHTML: ans === n
            ? `${n} is prime, so its smallest prime factor is <span class="math">${ans}</span>.`
            : `Check the prime numbers in order. The first one that divides ${n} evenly is <span class="math">${ans}</span>.`,
          validate: (input) => {
            const v = parseNumberLoose(input);
            return v !== null && v === ans;
          },
          expectedDisplay: String(ans),
        };
      },
    },
    {
      id: "divisibilityRules",
      title: "Divisibility Rules",
      generate: (diffKey) => {
        const divisorPool = diffKey === "easy"
          ? [2, 3, 4, 5, 9, 10]
          : diffKey === "medium"
            ? [2, 3, 4, 5, 6, 8, 9, 10]
            : [2, 3, 4, 5, 6, 8, 9, 10, 11, 12];
        const d = pick(divisorPool);
        const shouldBeDivisible = Math.random() < 0.5;
        let n;
        if (shouldBeDivisible) {
          n = d * randInt(2, diffKey === "easy" ? 40 : diffKey === "medium" ? 90 : 160);
        } else {
          do {
            n = randInt(10, diffKey === "easy" ? 250 : diffKey === "medium" ? 800 : 1600);
          } while (n % d === 0);
        }
        const ans = n % d === 0;
        const digitSum = String(Math.abs(n)).split("").reduce((sum, digit) => sum + Number(digit), 0);
        const lastTwo = Math.abs(n) % 100;
        const lastThree = Math.abs(n) % 1000;
        const ruleText = d === 2
          ? `the last digit is even (${Math.abs(n) % 10})`
          : d === 3
            ? `the digit sum is <span class="math">${digitSum}</span>, and ${digitSum} ${digitSum % 3 === 0 ? "is" : "is not"} divisible by 3`
            : d === 4
              ? `the last two digits are <span class="math">${lastTwo}</span>, and ${lastTwo} ${lastTwo % 4 === 0 ? "is" : "is not"} divisible by 4`
              : d === 5
                ? `the last digit is <span class="math">${Math.abs(n) % 10}</span>, so it ${[0, 5].includes(Math.abs(n) % 10) ? "does" : "does not"} end in 0 or 5`
                : d === 6
                  ? `${n} ${n % 2 === 0 ? "is" : "is not"} even and its digit sum ${digitSum % 3 === 0 ? "is" : "is not"} divisible by 3`
                  : d === 8
                    ? `the last three digits are <span class="math">${lastThree}</span>, and ${lastThree} ${lastThree % 8 === 0 ? "is" : "is not"} divisible by 8`
                    : d === 9
                      ? `the digit sum is <span class="math">${digitSum}</span>, and ${digitSum} ${digitSum % 9 === 0 ? "is" : "is not"} divisible by 9`
                      : d === 10
                        ? `the last digit is <span class="math">${Math.abs(n) % 10}</span>, so it ${Math.abs(n) % 10 === 0 ? "does" : "does not"} end in 0`
                        : d === 11
                          ? `the alternating-digit test gives a multiple of 11`
                          : `${n} ${n % 3 === 0 && n % 4 === 0 ? "is" : "is not"} divisible by both 3 and 4`;
        return {
          typeLabel: "Divisibility",
          promptHTML: `Is <span class="math">${n}</span> divisible by <span class="math">${d}</span>? Type <span class="math">yes</span> or <span class="math">no</span>.`,
          hintHTML: `Use the divisibility rule for <span class="math">${d}</span> instead of long division.`,
          explanationHTML: `<span class="math">${n}</span> ${ans ? "is" : "is not"} divisible by <span class="math">${d}</span> because ${ruleText}.`,
          validate: (input) => parseYesNo(input) === ans,
          expectedDisplay: ans ? "yes" : "no",
        };
      },
    },
    {
      id: "mathBingo",
      title: "Math Bingo",
      generate: (diffKey) => {
        const step = diffKey === "easy" ? pick([2, 5, 10]) : diffKey === "medium" ? pick([3, 4, 6, 8]) : pick([6, 7, 9, 12]);
        const start = randInt(1, diffKey === "easy" ? 12 : diffKey === "medium" ? 18 : 25);
        const values = Array.from({ length: 9 }, (_, i) => start + i * step);
        const missingIndex = randInt(0, 8);
        const ans = values[missingIndex];
        const boardHTML = values.map((value, idx) => {
          if (idx === missingIndex) return `<span class="bingoCell bingoCell--missing">?</span>`;
          return `<span class="bingoCell"><span class="math">${value}</span></span>`;
        }).join("");
        return {
          typeLabel: "Bingo Pattern",
          promptHTML: `Find the missing number in this bingo board. The numbers are skip-counting by <span class="math">${step}</span>.<div class="bingoBoard">${boardHTML}</div>`,
          hintHTML: `Each box goes up by <span class="math">${step}</span>. Count forward or backward from a nearby box.`,
          explanationHTML: `This board counts by <span class="math">${step}</span>, so the missing number is <span class="math">${ans}</span>.`,
          validate: (input) => {
            const n = parseNumberLoose(input);
            return n !== null && n === ans;
          },
          expectedDisplay: String(ans),
        };
      },
    },
    {
      id: "mentalMath",
      title: "Mental Math",
      generate: (diffKey) => {
        const makeProblem = () => {
          if (diffKey === "easy") {
            const templates = [
              () => {
                const a = pick([25, 50, 75]);
                const b = pick([25, 50]);
                return { promptHTML: `Compute <span class="math">${a} + ${b}</span>.`, ans: a + b };
              },
              () => {
                const a = randInt(10, 40);
                const b = randInt(10, 40);
                return { promptHTML: `Compute <span class="math">${a} + ${b}</span>.`, ans: a + b };
              },
              () => {
                const a = pick([20, 30, 40, 50]);
                const b = randInt(1, 19);
                return { promptHTML: `Compute <span class="math">${a} - ${b}</span>.`, ans: a - b };
              },
              () => {
                const a = pick([5, 10, 25]);
                const b = pick([2, 4, 5]);
                return { promptHTML: `Compute <span class="math">${a} \\times ${b}</span>.`, ans: a * b };
              },
            ];
            return pick(templates)();
          }
          if (diffKey === "medium") {
            const templates = [
              () => ({ a: randInt(20, 80), b: randInt(11, 29), op: "+" }),
              () => ({ a: randInt(60, 140), b: randInt(11, 49), op: "-" }),
              () => ({ a: pick([15, 25, 50]), b: randInt(3, 9), op: "\\times" }),
              () => ({ a: pick([90, 120, 150]), b: pick([3, 4, 5, 6]), op: "\\div" }),
            ];
            const { a, b, op } = pick(templates)();
            const ans = op === "+" ? a + b : op === "-" ? a - b : op === "\\times" ? a * b : a / b;
            return { promptHTML: `Compute mentally: <span class="math">${a} ${op} ${b}</span>.`, ans };
          }
          const templates = [
            () => ({ a: randInt(80, 180), b: randInt(19, 49), op: "+" }),
            () => ({ a: randInt(150, 320), b: randInt(25, 95), op: "-" }),
            () => ({ a: pick([12, 15, 18, 25]), b: randInt(6, 12), op: "\\times" }),
            () => {
              const b = pick([6, 8, 9, 12]);
              return { a: b * randInt(12, 30), b, op: "\\div" };
            },
          ];
          const { a, b, op } = pick(templates)();
          const ans = op === "+" ? a + b : op === "-" ? a - b : op === "\\times" ? a * b : a / b;
          return { promptHTML: `Compute mentally: <span class="math">${a} ${op} ${b}</span>.`, ans };
        };

        const { promptHTML, ans } = makeProblem();
        return {
          typeLabel: "Mental Math",
          promptHTML,
          hintHTML: `Look for a shortcut: make tens, break a number apart, or use a known fact.`,
          explanationHTML: `Using a quick mental-math strategy gives <span class="math">${ans}</span>.`,
          validate: (input) => {
            const n = parseNumberLoose(input);
            return n !== null && n === ans;
          },
          expectedDisplay: String(ans),
        };
      },
    },
    {
      id: "primeNumbers",
      title: "Prime Numbers",
      generate: (diffKey) => {
        const start = randInt(diffKey === "easy" ? 5 : diffKey === "medium" ? 20 : 60, diffKey === "easy" ? 40 : diffKey === "medium" ? 120 : 250);
        let ans = start + 1;
        while (!isPrime(ans)) ans += 1;
        return {
          typeLabel: "Next Prime",
          promptHTML: `What is the next prime number after <span class="math">${start}</span>?`,
          hintHTML: `Check the numbers after <span class="math">${start}</span> one by one. A prime has exactly two positive divisors.`,
          explanationHTML: `The first prime after <span class="math">${start}</span> is <span class="math">${ans}</span>.`,
          validate: (input) => {
            const n = parseNumberLoose(input);
            return n !== null && n === ans;
          },
          expectedDisplay: String(ans),
        };
      },
    },
    {
      id: "skipCounting",
      title: "Skip Counting",
      generate: (diffKey) => {
        const step = diffKey === "easy" ? pick([2, 3, 5, 10]) : diffKey === "medium" ? pick([4, 6, 7, 8, 9]) : pick([6, 7, 8, 9, 11, 12]);
        const start = randInt(1, diffKey === "easy" ? 20 : diffKey === "medium" ? 35 : 60);
        const length = 5;
        const seq = Array.from({ length }, (_, i) => start + i * step);
        const missingIndex = randInt(1, length - 2);
        const ans = seq[missingIndex];
        const display = seq.map((value, idx) => idx === missingIndex ? "?" : value).join(", ");
        return {
          typeLabel: "Skip Counting",
          promptHTML: `Fill in the missing number: <span class="math">${display}</span>`,
          hintHTML: `The pattern goes up by <span class="math">${step}</span> each time.`,
          explanationHTML: `This sequence skip-counts by <span class="math">${step}</span>, so the missing number is <span class="math">${ans}</span>.`,
          validate: (input) => {
            const n = parseNumberLoose(input);
            return n !== null && n === ans;
          },
          expectedDisplay: String(ans),
        };
      },
    },
  ];
  const TOPIC_MAP = Object.fromEntries(PROBLEM_TYPES.map((type) => [type.id, type]));

  // --- Sequential Challenge Sequences ---
  const SEQUENCES = {
    powers: {
      generate: () => {
        const bases = [2, 3, 4, 5, 6, 7, 8, 9, 10];
        const exponents = [2, 3, 4, 5, 6, 7];
        const questions = [];
        bases.forEach(base => {
          exponents.forEach(exp => {
            const ans = Math.pow(base, exp);
            questions.push({
              promptHTML: `Compute <span class="math">${base}^{${exp}}</span>.`,
              hintHTML: `Multiply by the base repeatedly: ${base}^${exp}.`,
              explanationHTML: `${base}^{${exp}} = <span class="math">${ans}</span>.`,
              validate: (input) => parseNumberLoose(input) === ans,
              expectedDisplay: String(ans),
              typeLabel: "Powers (Sequential)",
            });
          });
        });
        return questions;
      }
    },
    addsub: {
      generate: () => {
        const questions = [];
        // Start simple: single digits
        for (let a = 0; a <= 10; a++) {
          for (let b = 0; b <= 10; b++) {
            const ans = a + b;
            questions.push({
              promptHTML: `Compute <span class="math">${a} + ${b}</span>.`,
              hintHTML: `Count up from ${a} by ${b}.`,
              explanationHTML: `${a} + ${b} = <span class="math">${ans}</span>.`,
              validate: (input) => parseNumberLoose(input) === ans,
              expectedDisplay: String(ans),
              typeLabel: "Addition (Sequential)",
            });
          }
        }
        // Then subtraction
        for (let a = 10; a <= 30; a++) {
          for (let b = 1; b <= 10; b++) {
            if (a > b) {
              const ans = a - b;
              questions.push({
                promptHTML: `Compute <span class="math">${a} - ${b}</span>.`,
                hintHTML: `Count down from ${a} by ${b}.`,
                explanationHTML: `${a} - ${b} = <span class="math">${ans}</span>.`,
                validate: (input) => parseNumberLoose(input) === ans,
                expectedDisplay: String(ans),
                typeLabel: "Subtraction (Sequential)",
              });
            }
          }
        }
        return questions;
      }
    },
    multiply: {
      generate: () => {
        const questions = [];
        for (let table = 1; table <= 12; table++) {
          for (let multiplier = 1; multiplier <= 12; multiplier++) {
            const product = table * multiplier;
            questions.push({
              promptHTML: `Compute <span class="math">${table} \\times ${multiplier}</span>.`,
              hintHTML: `Think of ${table} x ${multiplier} as ${multiplier} groups of ${table}.`,
              explanationHTML: `<span class="math">${table} \\times ${multiplier} = ${product}</span>.`,
              validate: (input) => parseNumberLoose(input) === product,
              expectedDisplay: String(product),
              typeLabel: "Multiply (Sequential)",
            });
          }
        }
        return questions;
      }
    },
    exactDiv: {
      generate: () => {
        const questions = [];
        for (let d = 2; d <= 10; d++) {
          for (let q = 1; q <= 20; q++) {
            const a = d * q;
            questions.push({
              promptHTML: `Compute <span class="math">${a} \\div ${d}</span>.`,
              hintHTML: `What times ${d} equals ${a}?`,
              explanationHTML: `${a} ÷ ${d} = <span class="math">${q}</span>.`,
              validate: (input) => parseNumberLoose(input) === q,
              expectedDisplay: String(q),
              typeLabel: "Division (Sequential)",
            });
          }
        }
        return questions;
      }
    },
    sqrtPerfect: {
      generate: () => {
        const questions = [];
        for (let n = 1; n <= 30; n++) {
          const square = n * n;
          questions.push({
            promptHTML: `Compute <span class="math">\\sqrt{${square}}</span>.`,
            hintHTML: `Find the number that when squared gives ${square}.`,
            explanationHTML: `${n}^2 = ${square}, so <span class="math">\\sqrt{${square}} = ${n}</span>.`,
            validate: (input) => parseNumberLoose(input) === n,
            expectedDisplay: String(n),
            typeLabel: "Square Roots (Sequential)",
          });
        }
        return questions;
      }
    },
    mod: {
      generate: () => {
        const questions = [];
        for (let divisor = 2; divisor <= 8; divisor++) {
          for (let q = 0; q <= 15; q++) {
            for (let r = 0; r < divisor; r++) {
              const a = divisor * q + r;
              questions.push({
                promptHTML: `Find the remainder: <span class="math">${a} \\bmod ${divisor}</span>.`,
                hintHTML: `After dividing ${a} by ${divisor}, what's left over?`,
                explanationHTML: `${a} ÷ ${divisor} leaves remainder <span class="math">${r}</span>.`,
                validate: (input) => parseNumberLoose(input) === r,
                expectedDisplay: String(r),
                typeLabel: "Mod (Sequential)",
              });
            }
          }
        }
        return questions;
      }
    },
    hcfLcm: {
      generate: () => {
        const questions = [];
        const pairs = [
          [2, 4], [2, 6], [3, 6], [4, 8], [5, 10], [6, 9], [8, 12], [10, 15],
          [12, 18], [15, 20], [6, 9], [8, 12], [10, 15], [12, 16], [15, 25],
          [20, 30], [12, 18], [18, 27], [16, 24], [20, 30]
        ];
        pairs.forEach(([a, b], idx) => {
          const askGcd = idx % 2 === 0;
          const g = hcf(a, b);
          const l = lcm(a, b);
          const ans = askGcd ? g : l;
          const label = askGcd ? "HCF" : "LCM";
          questions.push({
            promptHTML: `Find <span class="math">${label}(${a}, ${b})</span>.`,
            hintHTML: askGcd 
              ? `Largest number that divides both.`
              : `Smallest number both divide into.`,
            explanationHTML: `The ${label} of ${a} and ${b} is <span class="math">${ans}</span>.`,
            validate: (input) => parseNumberLoose(input) === ans,
            expectedDisplay: String(ans),
            typeLabel: `${label} (Sequential)`,
          });
        });
        return questions;
      }
    },
    primeYesNo: {
      generate: () => {
        const questions = [];
        for (let n = 2; n <= 100; n++) {
          const ans = isPrime(n);
          questions.push({
            promptHTML: `Is <span class="math">${n}</span> prime? Type yes or no.`,
            hintHTML: `A prime has exactly two divisors: 1 and itself.`,
            explanationHTML: ans
              ? `${n} is prime.`
              : `${n} is not prime.`,
            validate: (input) => parseYesNo(input) === ans,
            expectedDisplay: ans ? "yes" : "no",
            typeLabel: "Prime Check (Sequential)",
          });
        }
        return questions;
      }
    },
    factorCount: {
      generate: () => {
        const questions = [];
        for (let n = 6; n <= 200; n++) {
          const ans = divisorsCount(n);
          questions.push({
            promptHTML: `How many factors does <span class="math">${n}</span> have?`,
            hintHTML: `Factors come in pairs.`,
            explanationHTML: `<span class="math">${n}</span> has <span class="math">${ans}</span> positive factors.`,
            validate: (input) => parseNumberLoose(input) === ans,
            expectedDisplay: String(ans),
            typeLabel: "Factors (Sequential)",
          });
        }
        return questions;
      }
    },
    simplifyFraction: {
      generate: () => {
        const questions = [];
        const bases = [[2, 3], [3, 4], [4, 5], [5, 6], [2, 5], [3, 5], [4, 6], [6, 8]];
        for (let mult = 2; mult <= 8; mult++) {
          bases.forEach(([n, d]) => {
            const num = n * mult;
            const den = d * mult;
            const r = reduceFraction(num, den);
            questions.push({
              promptHTML: `Simplify <span class="math">${num}/${den}</span>.`,
              hintHTML: `Divide both by their HCF.`,
              explanationHTML: `<span class="math">${num}/${den} = ${r.n}/${r.d}</span>.`,
              validate: (input) => {
                const f = parseFractionInput(input);
                if (!f) return false;
                const r2 = reduceFraction(f.n, f.d);
                return r2.n === r.n && r2.d === r.d;
              },
              expectedDisplay: `${r.n}/${r.d}`,
              typeLabel: "Simplify (Sequential)",
            });
          });
        }
        return questions;
      }
    },
    fractionToPercent: {
      generate: () => {
        const questions = [];
        const mapping = [
          [1, 10], [1, 5], [1, 4], [2, 5], [1, 2], [3, 5], [3, 4], [4, 5], [9, 10],
          [1, 3], [2, 3], [1, 8], [3, 8], [5, 8], [7, 8]
        ];
        mapping.forEach(([n, d]) => {
          const p = (n / d) * 100;
          questions.push({
            promptHTML: `Convert <span class="math">${n}/${d}</span> to a percent.`,
            hintHTML: `Divide and multiply by 100.`,
            explanationHTML: `${n}/${d} = <span class="math">${p}%</span>.`,
            validate: (input) => {
              const v = parseNumberLoose(input);
              return v !== null && Math.abs(v - p) < 0.1;
            },
            expectedDisplay: String(Math.round(p)),
            typeLabel: "Frac→Percent (Sequential)",
          });
        });
        return questions;
      }
    },
    percentToDecimal: {
      generate: () => {
        const questions = [];
        const percents = [1, 5, 10, 15, 20, 25, 30, 33, 40, 50, 60, 66, 75, 80, 90, 99];
        percents.forEach(p => {
          const ans = p / 100;
          for (let rep = 0; rep < 3; rep++) {
            questions.push({
              promptHTML: `Convert <span class="math">${p}%</span> to decimal.`,
              hintHTML: `Divide by 100.`,
              explanationHTML: `${p}% = <span class="math">${ans.toFixed(2)}</span>.`,
              validate: (input) => {
                const v = parseNumberLoose(input);
                return v !== null && Math.abs(v - ans) <= 0.01;
              },
              expectedDisplay: ans.toFixed(2),
              typeLabel: "Percent→Decimal (Sequential)",
            });
          }
        });
        return questions;
      }
    },
    linearEq: {
      generate: () => {
        const questions = [];
        const coeffs = [1, 2, 3, 4, 5];
        const constants = [-5, -3, 0, 3, 5, 10];
        coeffs.forEach(a => {
          constants.forEach(b => {
            for (let x = -10; x <= 10; x++) {
              const c = a * x + b;
              questions.push({
                promptHTML: `Solve: <span class="math">${a}x ${b >= 0 ? '+' : ''} ${b} = ${c}</span>.`,
                hintHTML: `Isolate x.`,
                explanationHTML: `x = <span class="math">${x}</span>.`,
                validate: (input) => parseNumberLoose(input) === x,
                expectedDisplay: String(x),
                typeLabel: "Linear Eq (Sequential)",
              });
            }
          });
        });
        return questions.slice(0, 150);
      }
    },
    rectangle: {
      generate: () => {
        const questions = [];
        for (let w = 2; w <= 20; w++) {
          for (let h = 2; h <= 20; h++) {
            const askArea = (w + h) % 2 === 0;
            const ans = askArea ? w * h : 2 * (w + h);
            questions.push({
              promptHTML: askArea
                ? `Rectangle w=<span class="math">${w}</span>, h=<span class="math">${h}</span>. Area?`
                : `Rectangle w=<span class="math">${w}</span>, h=<span class="math">${h}</span>. Perimeter?`,
              hintHTML: askArea ? `Area = w × h.` : `Perimeter = 2(w + h).`,
              explanationHTML: `<span class="math">${ans}</span>.`,
              validate: (input) => parseNumberLoose(input) === ans,
              expectedDisplay: String(ans),
              typeLabel: askArea ? "Area (Sequential)" : "Perimeter (Sequential)",
            });
          }
        }
        return questions.slice(0, 150);
      }
    },
    distance: {
      generate: () => {
        const questions = [];
        const triples = [
          [3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10], [9, 12, 15]
        ];
        for (let rep = 0; rep < 5; rep++) {
          triples.forEach(([dx, dy, h]) => {
            const x1 = -10 + rep;
            const y1 = -10 + rep;
            const x2 = x1 + dx;
            const y2 = y1 + dy;
            questions.push({
              promptHTML: `Distance from <span class="math">(${x1}, ${y1})</span> to <span class="math">(${x2}, ${y2})</span>?`,
              hintHTML: `Use Pythagorean theorem.`,
              explanationHTML: `Distance = <span class="math">${h}</span>.`,
              validate: (input) => parseNumberLoose(input) === h,
              expectedDisplay: String(h),
              typeLabel: "Distance (Sequential)",
            });
          });
        }
        return questions;
      }
    },
    expectedValueDice: {
      generate: () => {
        const questions = [];
        const diceConfigs = [[6, 1], [6, 2], [6, 3], [8, 1], [8, 2], [10, 1], [10, 2]];
        diceConfigs.forEach(([sides, count]) => {
          const expected = count * (sides + 1) / 2;
          for (let rep = 0; rep < 3; rep++) {
            questions.push({
              promptHTML: `Expected value of ${count} fair ${sides}-sided ${count === 1 ? 'die' : 'dice'}?`,
              hintHTML: `Mean = (sides+1)/2 per die.`,
              explanationHTML: `E.V. = <span class="math">${expected.toFixed(1)}</span>.`,
              validate: (input) => {
                const v = parseNumberLoose(input);
                return v !== null && Math.abs(v - expected) <= 0.1;
              },
              expectedDisplay: expected.toFixed(1),
              typeLabel: "Expected Value (Sequential)",
            });
          }
        });
        return questions;
      }
    },
    statsMeanMedian: {
      generate: () => {
        const questions = [];
        const datasets = [
          [1, 2, 3], [5, 10, 15], [2, 4, 6, 8], [1, 5, 10, 15, 20], [3, 3, 3, 3, 3]
        ];
        datasets.forEach(data => {
          const sorted = [...data].sort((a, b) => a - b);
          const mean = data.reduce((a, b) => a + b, 0) / data.length;
          const median = sorted[Math.floor(sorted.length / 2)];
          
          questions.push({
            promptHTML: `Mean of { ${data.join(', ')} }?`,
            hintHTML: `Add and divide by count.`,
            explanationHTML: `Mean = <span class="math">${mean.toFixed(1)}</span>.`,
            validate: (input) => {
              const v = parseNumberLoose(input);
              return v !== null && Math.abs(v - mean) <= 0.1;
            },
            expectedDisplay: mean.toFixed(1),
            typeLabel: "Mean (Sequential)",
          });
          
          questions.push({
            promptHTML: `Median of { ${data.join(', ')} }?`,
            hintHTML: `Middle value when sorted.`,
            explanationHTML: `Median = <span class="math">${median}</span>.`,
            validate: (input) => parseNumberLoose(input) === median,
            expectedDisplay: String(median),
            typeLabel: "Median (Sequential)",
          });
        });
        return questions;
      }
    },
    tableSprint: {
      generate: () => {
        const questions = [];
        for (let table = 1; table <= 12; table++) {
          for (let multiplier = 1; multiplier <= 12; multiplier++) {
            const product = table * multiplier;
            const hideFirst = multiplier % 2 === 0;
            questions.push({
              promptHTML: hideFirst
                ? `<span class="math">\\square \\times ${multiplier} = ${product}</span>`
                : `<span class="math">${table} \\times \\square = ${product}</span>`,
              hintHTML: `Divide to find the missing factor.`,
              explanationHTML: `Missing factor = <span class="math">${hideFirst ? table : multiplier}</span>.`,
              validate: (input) => parseNumberLoose(input) === (hideFirst ? table : multiplier),
              expectedDisplay: String(hideFirst ? table : multiplier),
              typeLabel: "Tables (Sequential)",
            });
          }
        }
        return questions;
      }
    },
    primeBoost: {
      generate: () => {
        const questions = [];
        for (let n = 2; n <= 200; n++) {
          let spf = n;
          if (!isPrime(n)) {
            spf = 2;
            while (spf <= n && n % spf !== 0) spf += 1;
          }
          questions.push({
            promptHTML: `Smallest prime factor of <span class="math">${n}</span>?`,
            hintHTML: `Try 2, 3, 5, 7...`,
            explanationHTML: `S.P.F. = <span class="math">${spf}</span>.`,
            validate: (input) => parseNumberLoose(input) === spf,
            expectedDisplay: String(spf),
            typeLabel: "Prime Factors (Sequential)",
          });
        }
        return questions;
      }
    },
    divisibilityRules: {
      generate: () => {
        const questions = [];
        const rules = [2, 3, 4, 5, 6, 8, 9, 10];
        for (let n = 10; n <= 200; n++) {
          rules.forEach(rule => {
            const isDivisible = n % rule === 0;
            questions.push({
              promptHTML: `Is <span class="math">${n}</span> divisible by <span class="math">${rule}</span>? Type yes or no.`,
              hintHTML: `Use divisibility rules.`,
              explanationHTML: isDivisible ? `Yes, ${n} ÷ ${rule} = ${n/rule}.` : `No, ${n} is not divisible by ${rule}.`,
              validate: (input) => parseYesNo(input) === isDivisible,
              expectedDisplay: isDivisible ? "yes" : "no",
              typeLabel: "Divisibility (Sequential)",
            });
          });
        }
        return questions.slice(0, 150);
      }
    },
    mathBingo: {
      generate: () => {
        const questions = [];
        const steps = [2, 3, 4, 5, 6];
        steps.forEach(step => {
          for (let start = 1; start <= 40; start += 10) {
            for (let pos = 1; pos <= 8; pos++) {
              const seq = Array.from({length: 9}, (_, i) => start + (i * step));
              const missing = seq[pos];
              const display = seq.map((v, i) => i === pos ? "?" : v).join(", ");
              questions.push({
                promptHTML: `Pattern: ${display}<br>Step = ${step}. Missing number?`,
                hintHTML: `Add ${step} each time.`,
                explanationHTML: `Missing = <span class="math">${missing}</span>.`,
                validate: (input) => parseNumberLoose(input) === missing,
                expectedDisplay: String(missing),
                typeLabel: "Bingo (Sequential)",
              });
            }
          }
        });
        return questions.slice(0, 150);
      }
    },
    mentalMath: {
      generate: () => {
        const questions = [];
        for (let a = 10; a <= 50; a += 5) {
          for (let b = 5; b <= 30; b += 5) {
            questions.push({
              promptHTML: `<span class="math">${a} + ${b}</span>?`,
              hintHTML: `Break it into parts.`,
              explanationHTML: `<span class="math">${a + b}</span>.`,
              validate: (input) => parseNumberLoose(input) === a + b,
              expectedDisplay: String(a + b),
              typeLabel: "Mental (Sequential)",
            });
            questions.push({
              promptHTML: `<span class="math">${a} - ${b}</span>?`,
              hintHTML: `Count down.`,
              explanationHTML: `<span class="math">${a - b}</span>.`,
              validate: (input) => parseNumberLoose(input) === a - b,
              expectedDisplay: String(a - b),
              typeLabel: "Mental (Sequential)",
            });
          }
        }
        return questions;
      }
    },
    primeNumbers: {
      generate: () => {
        const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89];
        const questions = [];
        primes.forEach((prime, idx) => {
          if (idx < primes.length - 1) {
            const nextPrime = primes[idx + 1];
            questions.push({
              promptHTML: `Next prime after <span class="math">${prime}</span>?`,
              hintHTML: `Check numbers until you find one with only 1 and itself as factors.`,
              explanationHTML: `Next prime = <span class="math">${nextPrime}</span>.`,
              validate: (input) => parseNumberLoose(input) === nextPrime,
              expectedDisplay: String(nextPrime),
              typeLabel: "Primes (Sequential)",
            });
          }
        });
        return questions;
      }
    },
    skipCounting: {
      generate: () => {
        const questions = [];
        const steps = [2, 3, 4, 5, 6, 7, 8, 9, 10];
        steps.forEach(step => {
          for (let i = 1; i <= 50; i++) {
            const value = step * i;
            if (i < 50) {
              const nextValue = step * (i + 1);
              questions.push({
                promptHTML: `Skip count by ${step}: ...${value}, ____, ...?`,
                hintHTML: `Add ${step}.`,
                explanationHTML: `${value} + ${step} = <span class="math">${nextValue}</span>.`,
                validate: (input) => parseNumberLoose(input) === nextValue,
                expectedDisplay: String(nextValue),
                typeLabel: "Skip Count (Sequential)",
              });
            }
          }
        });
        return questions.slice(0, 200);
      }
    },
  };

  // --- UI / Game state ---
  const state = {
    mode: "arcade",
    difficultyKey: "easy",
    topicId: "",
    score: 0,
    streak: 0,
    bestStreak: 0,
    checked: false,
    hinted: false,
    questionIndex: 0,
    totalQuestions: 10,
    timeLeft: null,
    timerId: null,
    currentQuestion: null,
    achievementsSeen: new Set(),
    endReason: "",
    gameMode: "arcade",
    timeLimit: 60,
    autoAdvanceTimerId: null,
    sequenceQuestions: [],
    sequenceIndex: 0,
    seenQuestionSignatures: new Set(),
    arcadeQuestions: [],
    arcadeIndex: 0,
  };

  const CARD_THEMES = {
    addsub: {
      accentA: "rgba(110,231,255,.18)",
      accentB: "rgba(167,139,250,.18)",
      confetti: ["#6EE7FF", "#A78BFA", "#34D399"],
    },
    multiply: {
      accentA: "rgba(52,211,153,.18)",
      accentB: "rgba(110,231,255,.14)",
      confetti: ["#34D399", "#6EE7FF", "#A78BFA"],
    },
    exactDiv: {
      accentA: "rgba(110,231,255,.18)",
      accentB: "rgba(52,211,153,.14)",
      confetti: ["#6EE7FF", "#34D399", "#F9C74F"],
    },
    powers: {
      accentA: "rgba(167,139,250,.18)",
      accentB: "rgba(249,199,79,.14)",
      confetti: ["#A78BFA", "#F9C74F", "#6EE7FF"],
    },
    sqrtPerfect: {
      accentA: "rgba(52,211,153,.18)",
      accentB: "rgba(167,139,250,.14)",
      confetti: ["#34D399", "#A78BFA", "#6EE7FF"],
    },
    linearEq: {
      accentA: "rgba(249,199,79,.18)",
      accentB: "rgba(110,231,255,.14)",
      confetti: ["#F9C74F", "#6EE7FF", "#34D399"],
    },
    default: {
      accentA: "rgba(110,231,255,.18)",
      accentB: "rgba(167,139,250,.18)",
      confetti: ["#6EE7FF", "#A78BFA", "#34D399", "#F9C74F"],
    },
  };

  const ensureBurstLayer = () => {
    let layer = els.problemCard.querySelector(".burstLayer");
    if (!layer) {
      layer = document.createElement("div");
      layer.className = "burstLayer";
      els.problemCard.appendChild(layer);
    }
    return layer;
  };

  const clearBurst = () => {
    const layer = ensureBurstLayer();
    layer.innerHTML = "";
  };

  const spawnConfetti = (opts = {}) => {
    const layer = ensureBurstLayer();
    const {
      count = 18,
      colors = CARD_THEMES.default.confetti,
      dxRange = [-120, 120],
      topPctRange = [18, 40],
      leftPctRange = [38, 62],
      durationRangeMs = [650, 1050],
    } = opts;

    const [dxMin, dxMax] = dxRange;
    const [topMin, topMax] = topPctRange;
    const [leftMin, leftMax] = leftPctRange;
    const [durMin, durMax] = durationRangeMs;

    for (let i = 0; i < count; i++) {
      const piece = document.createElement("div");
      piece.className = "confettiPiece";

      const color = pick(colors);
      const dx = randInt(dxMin, dxMax);
      const top = randInt(topMin, topMax);
      const left = randInt(leftMin, leftMax);
      const dur = randInt(durMin, durMax);

      piece.style.setProperty("--confettiColor", color);
      piece.style.setProperty("--confettiDx", `${dx}px`);
      piece.style.setProperty("--confettiDur", `${dur}ms`);
      piece.style.top = `${top}%`;
      piece.style.left = `${left}%`;

      layer.appendChild(piece);
      window.setTimeout(() => piece.remove(), dur + 80);
    }
  };

  const applyCardEffect = (kind) => {
    els.problemCard.classList.remove("problemCard--good", "problemCard--bad", "problemCard--shake");
    if (kind) els.problemCard.classList.add(kind);
  };

  const setProblemAccent = (typeId) => {
    const theme = CARD_THEMES[typeId] || CARD_THEMES.default;
    els.problemCard.style.setProperty("--accentA", theme.accentA);
    els.problemCard.style.setProperty("--accentB", theme.accentB);
    return theme;
  };

  const timeToMMSS = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m.toString().padStart(1, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const formatScore = (score) => {
    const rounded = Math.round(score * 10) / 10;
    return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  };

  const updateScoreMeta = () => {
    if (!els.scoreMeta) return;
    els.scoreMeta.textContent = state.hinted
      ? "Hint used: this question is now worth 0.5 points."
      : "Each question is worth 1 point.";
  };

  const showFeedback = (kind, text) => {
    els.feedback.classList.remove("feedback--good", "feedback--bad", "feedback--neutral");
    els.feedback.classList.add(
      kind === "good" ? "feedback--good" : kind === "bad" ? "feedback--bad" : "feedback--neutral",
    );
    els.feedback.innerHTML = text;
  };

  const setControls = (phase) => {
    // phase: 'pre' | 'active' | 'locked'
    if (phase === "pre") {
      els.skipBtn.disabled = true;
      els.hintBtn.disabled = true;
      els.newProblemBtn.disabled = true;
      els.checkBtn.disabled = true;
      els.answerInput.disabled = true;
      els.answerInput.value = "";
      return;
    }
    if (phase === "active") {
      els.skipBtn.disabled = false;
      els.hintBtn.disabled = false;
      els.newProblemBtn.disabled = true;
      els.checkBtn.disabled = false;
      els.answerInput.disabled = false;
      els.answerInput.focus();
      return;
    }
    if (phase === "locked") {
      els.skipBtn.disabled = true;
      els.hintBtn.disabled = true;
      els.newProblemBtn.disabled = false;
      els.checkBtn.disabled = true;
      els.answerInput.disabled = true;
      return;
    }
  };

  const renderTopicGrid = () => {
    if (!els.topicGrid) return;
    els.topicGrid.innerHTML = "";
    PROBLEM_TYPES.forEach((t) => {
      const tile = document.createElement("div");
      tile.className = "topicTile";

      const art = document.createElement("img");
      art.className = "topicTile__art";
      art.src = getTopicArt(t);
      art.alt = `${t.title} illustration`;

      const title = document.createElement("div");
      title.className = "topicTile__title";
      title.textContent = t.title;

      const diffLabel = document.createElement("div");
      diffLabel.className = "topicTile__diffLabel";
      diffLabel.textContent = "Difficulty";

      const select = document.createElement("select");
      select.className = "topicTile__select";
      select.id = `difficulty-${t.id}`;
      select.name = `difficulty-${t.id}`;
      select.setAttribute("aria-label", `Difficulty for ${t.title}`);
      ["easy", "medium", "hard"].forEach((k) => {
        const opt = document.createElement("option");
        opt.value = k;
        opt.textContent = DIFFICULTY[k].label;
        select.appendChild(opt);
      });

      const play = document.createElement("button");
      play.type = "button";
      play.className = "topicTile__play btn btn--primary";
      play.textContent = "Play";

      play.addEventListener("click", () => {
        const params = new URLSearchParams();
        params.set("difficulty", select.value);
        const modeToPass = window.selectedGameMode || "arcade";
        params.set("mode", modeToPass);
        window.location.href = `${t.id}.html?${params.toString()}`;
      });

      tile.appendChild(art);
      tile.appendChild(title);
      tile.appendChild(diffLabel);
      tile.appendChild(select);
      tile.appendChild(play);
      els.topicGrid.appendChild(tile);
    });
  };

  const getQuestionSignature = (q) => {
    const prompt = String(q.promptHTML || "").replace(/\s+/g, " ").trim();
    const type = q.typeId || q.typeLabel || "";
    const expected = String(q.expectedDisplay ?? "").replace(/\s+/g, " ").trim();
    return `${type}::${prompt}::${expected}`;
  };

  const normalizeQuestionForRun = (q, fallbackTypeId = state.topicId) => {
    if (!q) return null;
    q.typeId = q.typeId || fallbackTypeId || "default";
    q.typeLabel = q.typeLabel || TOPIC_MAP[fallbackTypeId]?.title || "Question";
    return q;
  };

  const tryRegisterQuestion = (q) => {
    const signature = getQuestionSignature(q);
    if (!signature || state.seenQuestionSignatures.has(signature)) return false;
    state.seenQuestionSignatures.add(signature);
    return true;
  };

  const dedupeQuestions = (questions, fallbackTypeId = state.topicId) => {
    const seen = new Set();
    return (questions || []).filter((question) => {
      const q = normalizeQuestionForRun(question, fallbackTypeId);
      const signature = getQuestionSignature(q);
      if (!signature || seen.has(signature)) return false;
      seen.add(signature);
      return true;
    });
  };

  const getSequentialDifficultySlice = (questions, difficultyKey = "easy") => {
    const list = Array.isArray(questions) ? questions : [];
    if (list.length <= 3) return list;

    const third = Math.max(1, Math.floor(list.length / 3));
    const middleStart = Math.max(0, Math.floor((list.length - third) / 2));

    if (difficultyKey === "hard") {
      return list.slice(Math.max(0, list.length - third));
    }

    if (difficultyKey === "medium") {
      return list.slice(middleStart, Math.min(list.length, middleStart + third));
    }

    return list.slice(0, third);
  };

  const pickNextQuestion = () => {
    // Check if we're in arcade mode with pre-generated questions
    if (state.gameMode === "arcade" && state.arcadeQuestions) {
      const q = state.arcadeQuestions[state.arcadeIndex];
      if (q) {
        state.arcadeIndex++;
        return q;
      }
      return null;
    }
    
    // Check if we're in any sequential mode
    if (state.gameMode === "sequential" || state.gameMode === "sequential-arcade" || state.gameMode === "sequential-speed") {
      const q = state.sequenceQuestions[state.sequenceIndex];
      if (q) {
        return normalizeQuestionForRun(q, state.topicId);
      }
      return null;
    }
    
    // Normal random mode with repeat protection
    const type = TOPIC_MAP[state.topicId] || pick(PROBLEM_TYPES);
    let q = null;
    let attempts = 0;
    const maxAttempts = 250;

    while (attempts < maxAttempts) {
      q = type.generate(state.difficultyKey);
      normalizeQuestionForRun(q, type.id);
      attempts += 1;
      if (tryRegisterQuestion(q)) return q;
    }

    return null;
  };

  const setTags = (q) => {
    els.problemTypeTag.textContent = q.typeLabel;
    els.difficultyTag.textContent = DIFFICULTY[state.difficultyKey].label;
  };

  const updateProgressUI = () => {
    if (state.gameMode === "speed") {
      els.progressValue.textContent = `${state.score}`;
      els.progressBar.style.width = "0%";
      return;
    }
    if (state.gameMode === "sequential" || state.gameMode === "sequential-arcade" || state.gameMode === "sequential-speed") {
      const currentStep = state.currentQuestion ? state.sequenceIndex + 1 : state.sequenceIndex;
      const boundedStep = Math.min(currentStep, state.totalQuestions);
      els.progressValue.textContent = `${boundedStep} / ${state.totalQuestions}`;
      const pct = state.totalQuestions === 0 ? 0 : (boundedStep / state.totalQuestions) * 100;
      els.progressBar.style.width = `${clamp(pct, 0, 100)}%`;
      return;
    }
    if (state.mode !== "arcade") {
      els.progressValue.textContent = "∞";
      els.progressBar.style.width = "0%";
      return;
    }
    const currentQuestionNumber = state.currentQuestion ? state.questionIndex + 1 : state.questionIndex;
    const boundedQuestionNumber = Math.min(currentQuestionNumber, state.totalQuestions);
    els.progressValue.textContent = `${boundedQuestionNumber} / ${state.totalQuestions}`;
    const pct = state.totalQuestions === 0 ? 0 : (boundedQuestionNumber / state.totalQuestions) * 100;
    els.progressBar.style.width = `${clamp(pct, 0, 100)}%`;
  };

  const startTimer = () => {
    if (state.timerId) clearInterval(state.timerId);
    
    if (state.gameMode === "speed" || state.gameMode === "sequential-speed") {
      // Speed Challenge mode: count down from timeLimit
      state.timeLeft = state.timeLimit;
      els.timerBox.style.opacity = "1";
      els.timerValue.textContent = timeToMMSS(state.timeLeft);
      
      const setDanger = (danger) => {
        els.timerBox.classList.toggle("timer--danger", danger);
        els.timerValue.classList.toggle("timerPulse", danger);
      };
      setDanger(state.timeLeft <= 10);
      
      state.timerId = setInterval(() => {
        state.timeLeft -= 1;
        if (state.timeLeft <= 0) {
          state.timeLeft = 0;
          els.timerValue.textContent = "0:00";
          setDanger(false);
          clearInterval(state.timerId);
          state.timerId = null;
          finishRun("Time limit reached!");
        } else {
          els.timerValue.textContent = timeToMMSS(state.timeLeft);
          setDanger(state.timeLeft <= 10);
        }
      }, 1000);
    } else if (state.mode === "arcade" || state.gameMode === "sequential" || state.gameMode === "sequential-arcade") {
      // Arcade and Sequential modes: no timer
      state.timeLeft = 0;
      els.timerBox.style.opacity = "1";
      els.timerValue.textContent = "--:--";
    }
  };

  const stopTimer = () => {
    if (state.timerId) clearInterval(state.timerId);
    state.timerId = null;
  };

  const clearAutoAdvance = () => {
    if (state.autoAdvanceTimerId) clearTimeout(state.autoAdvanceTimerId);
    state.autoAdvanceTimerId = null;
  };

  const scheduleAutoAdvance = (delayMs = 900) => {
    clearAutoAdvance();
    state.autoAdvanceTimerId = window.setTimeout(() => {
      state.autoAdvanceTimerId = null;
      nextAfterAnswered();
    }, delayMs);
  };

  const showAchievements = () => {
    const { score, totalQuestions, streak } = state;
    const addBadge = (key, text) => {
      if (state.achievementsSeen.has(key)) return;
      state.achievementsSeen.add(key);
      const badge = document.createElement("div");
      badge.className = "badge";
      badge.innerHTML = `<span class="badge__spark" aria-hidden="true"></span>${text}`;
      els.achievements.appendChild(badge);
    };

    if (score >= 1) addBadge("first", "Warm-up: first correct answer");
    if (score >= Math.ceil(totalQuestions * 0.5)) addBadge("half", "Halfway champion");
    if (score >= totalQuestions - 1 && state.mode === "arcade") addBadge("close", "Almost perfect");
    if (score >= totalQuestions - 0 && state.mode === "arcade" && score === totalQuestions) addBadge("perfect", "Perfect run");
    if (streak >= 3) addBadge("streak3", "Streak x3");
    if (streak >= 5) addBadge("streak5", "Streak x5");
  };

  const resetFeedbackUI = () => {
    els.feedback.classList.remove("feedback--good", "feedback--bad", "feedback--neutral");
    els.feedback.textContent = "";
    els.explanation.innerHTML = "";
  };

  const setQuestionUI = (q) => {
    clearAutoAdvance();
    resetFeedbackUI();
    els.problemPrompt.innerHTML = q.promptHTML;
    els.explanation.innerHTML = "";
    els.answerInput.value = "";
    els.hintBtn.textContent = "Hint (-0.5 pt)";
    state.currentQuestion = q;
    state.checked = false;
    state.hinted = false;
    updateScoreMeta();
    setTags(q);
    clearBurst();
    applyCardEffect(null);
    setProblemAccent(q.typeId || "default");
    els.newProblemBtn.textContent = state.mode === "arcade" ? "Next" : "New Problem";
    updateProgressUI();
    setControls("active");
    renderMathIfPossible(els.problemCard);
  };

  const generateQuestion = () => {
    const q = pickNextQuestion();
    if (!q) {
      const reason = state.gameMode === "speed" || state.gameMode === "sequential-speed"
        ? "No more unique questions available."
        : "Run complete";
      finishRun(reason);
      return;
    }
    setQuestionUI(q);
  };

  // --- High Score System ---
  const HIGH_SCORES_KEY = "mathArcade_highScores_v1";
  
  const parseHighScoresCSV = () => {
    let stored = "";
    try {
      stored = window.localStorage?.getItem(HIGH_SCORES_KEY) || "";
    } catch {
      return [];
    }
    if (!stored) return [];
    
    return stored
      .split("\n")
      .filter(line => line.trim() && !line.startsWith("game,"))
      .map(line => {
        const [game, difficulty, mode, score, date] = line.split(",");
        return { game, difficulty, mode, score: parseFloat(score), date };
      })
      .filter(entry =>
        entry.game &&
        entry.difficulty &&
        entry.mode &&
        Number.isFinite(entry.score) &&
        entry.date
      );
  };
  
  const saveHighScore = (game, difficulty, mode, score, date = new Date().toISOString().split("T")[0]) => {
    // Convert mode to high score format
    const modeKey = mode === "arcade" ? "arcade" :
                    mode === "speed" ? "speed" : 
                    mode === "sequential" ? "sequential" :
                    mode === "sequential-arcade" ? "sequential-arcade" :
                    mode === "sequential-speed" ? "sequential-speed" : null;
    
    if (!modeKey) return null;
    
    const scores = parseHighScoresCSV();
    const key = `${game}|${difficulty}|${modeKey}`;
    
    // Find or create entry
    const existingIdx = scores.findIndex(s => `${s.game}|${s.difficulty}|${s.mode}` === key);
    
    if (existingIdx >= 0) {
      // Update if this score is better
      if (score > scores[existingIdx].score) {
        scores[existingIdx] = { game, difficulty, mode: modeKey, score, date };
      } else {
        return scores[existingIdx]; // Not a new high score
      }
    } else {
      // New entry
      scores.push({ game, difficulty, mode: modeKey, score, date });
    }
    
    // Save to localStorage
    const csv = ["game,difficulty,mode,score,date", ...scores.map(s => `${s.game},${s.difficulty},${s.mode},${s.score},${s.date}`)].join("\n");
    try {
      window.localStorage?.setItem(HIGH_SCORES_KEY, csv);
    } catch {
      return null;
    }
    
    return scores[existingIdx >= 0 ? existingIdx : scores.length - 1];
  };
  
  const getHighScore = (game, difficulty, mode) => {
    const modeKey = mode === "arcade" ? "arcade" :
                    mode === "speed" ? "speed" : 
                    mode === "sequential" ? "sequential" :
                    mode === "sequential-arcade" ? "sequential-arcade" :
                    mode === "sequential-speed" ? "sequential-speed" : null;
    
    if (!modeKey) return null;
    
    const scores = parseHighScoresCSV();
    const entry = scores.find(s => s.game === game && s.difficulty === difficulty && s.mode === modeKey);
    return entry ? entry.score : null;
  };
  
  const getAllHighScores = () => {
    return parseHighScoresCSV().sort((a, b) => b.score - a.score);
  };
  
  const getHighScoresForGame = (game) => {
    return parseHighScoresCSV().filter(s => s.game === game);
  };

  const formatModeLabel = (mode) => {
    if (mode === "speed") return "Speed";
    if (mode === "sequential") return "Sequential";
    if (mode === "sequential-arcade") return "Sequential Arcade";
    if (mode === "sequential-speed") return "Sequential Speed";
    return "Arcade";
  };

  const showStatsModal = () => {
    if (!els.statsModal || !els.statsBody) return;

    const scores = state.topicId ? getHighScoresForGame(state.topicId) : getAllHighScores();

    if (!scores.length) {
      els.statsBody.innerHTML = "No high scores yet. Finish a run to set the first one.";
    } else {
      els.statsBody.innerHTML = scores
        .sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return String(b.date).localeCompare(String(a.date));
        })
        .map((entry) => {
          const topicTitle = TOPIC_MAP[entry.game]?.title || entry.game;
          const topicLabel = state.topicId ? "" : `<div><b>Topic:</b> ${topicTitle}</div>`;
          const difficultyLabel = DIFFICULTY[entry.difficulty]?.label || entry.difficulty;
          return `
            <div class="statEntry">
              ${topicLabel}
              <div><b>Mode:</b> ${formatModeLabel(entry.mode)}</div>
              <div><b>Difficulty:</b> ${difficultyLabel}</div>
              <div><b>High score:</b> ${formatScore(entry.score)}</div>
              <div class="statEntryDate"><b>Set on:</b> ${entry.date}</div>
            </div>
          `;
        })
        .join("");
    }

    els.statsModal.hidden = false;
    els.statsModal.setAttribute("aria-hidden", "false");
  };

  const finishRun = (reason) => {
    clearAutoAdvance();
    stopTimer();
    els.timerBox.classList.remove("timer--danger");
    els.timerValue.classList.remove("timerPulse");
    state.endReason = reason;
    setControls("pre");

    let title = "Run complete";
    if ((state.mode === "arcade" || state.gameMode === "speed") && reason) title = reason;
    
    let scoreText;
    let displayScore = state.score;
    if (state.gameMode === "speed") {
      scoreText = `${formatScore(state.score)} correct answers in ${state.timeLimit}s`;
    } else if (state.mode === "arcade") {
      scoreText = `${formatScore(state.score)} / ${state.totalQuestions}`;
    } else {
      scoreText = formatScore(state.score);
    }
    
    // Save high score for all supported modes, including arcade
    let highScoreHTML = "";
    const prevHighScore = getHighScore(state.topicId, state.difficultyKey, state.gameMode);
    const result = saveHighScore(state.topicId, state.difficultyKey, state.gameMode, displayScore);
    
    if (result) {
      const isNewHigh = !prevHighScore || displayScore > prevHighScore;
      if (isNewHigh) {
        highScoreHTML = `<div class="highScoreNew"><b>🏆 New High Score!</b></div>`;
      } else if (prevHighScore) {
        highScoreHTML = `<div class="highScorePrev"><b>High Score:</b> ${formatScore(prevHighScore)}</div>`;
      }
    }
    
    els.endTitle.textContent = title;
    els.endBody.innerHTML = `
      <div><b>Score:</b> ${scoreText}</div>
      <div style="margin-top:6px;"><b>Best streak:</b> ${Math.max(state.bestStreak, state.streak, 0)}</div>
      ${highScoreHTML}
      <div class="endReason">${reason ? reason : ""} </div>
    `;

    state.currentQuestion = null;
    els.endModal.hidden = false;
    els.endModal.setAttribute("aria-hidden", "false");
    if (pageTopicId) syncTopicPageMeta();
    els.endModal.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const nextAfterAnswered = () => {
    clearAutoAdvance();
    if (state.gameMode === "sequential" || state.gameMode === "sequential-arcade" || state.gameMode === "sequential-speed") {
      state.sequenceIndex += 1;
      const sequentialLimit = state.gameMode === "sequential-arcade"
        ? Math.min(state.totalQuestions, state.sequenceQuestions.length)
        : state.sequenceQuestions.length;
      if (state.sequenceIndex >= sequentialLimit) {
        finishRun("Sequence complete! 🎉");
        return;
      }
    } else if (state.mode === "arcade") {
      state.questionIndex += 1;
      if (state.questionIndex >= state.totalQuestions) {
        finishRun("Run complete");
        return;
      }
    } else {
      state.questionIndex += 1;
    }
    generateQuestion();
  };

  const onCheck = () => {
    if (!state.currentQuestion) return;
    if (state.checked) return;
    const input = els.answerInput.value;
    const q = state.currentQuestion;
    if (!input || input.trim() === "") {
      showFeedback("neutral", "Please type an answer first.");
      els.explanation.innerHTML = "Enter your answer in the box, then press Check.";
      els.answerInput.focus();
      return;
    }

    const ok = q.validate(input);
    state.checked = true;

    if (ok) {
      const pointsAwarded = state.hinted ? 0.5 : 1;
      state.score += pointsAwarded;
      state.streak += 1;
      state.bestStreak = Math.max(state.bestStreak, state.streak);
      showFeedback(
        "good",
        `Correct! <span class="math">+${pointsAwarded}</span>${state.hinted ? " <span style=\"opacity:.9;\">(hint used)</span>" : ""}`,
      );
      els.explanation.innerHTML = q.explanationHTML;
      renderMathIfPossible(els.explanation);
      // Card juice + confetti
      applyCardEffect("problemCard--good");
      const theme = CARD_THEMES[q.typeId] || CARD_THEMES.default;
      const count = state.streak >= 5 ? 26 : state.streak >= 3 ? 22 : 18;
      spawnConfetti({ count, colors: theme.confetti, dxRange: [-140, 140] });
      window.setTimeout(() => applyCardEffect(null), 720);
      els.scoreValue.textContent = formatScore(state.score);
      els.streakValue.textContent = String(state.streak);
      showAchievements();
    } else {
      state.streak = 0;
      showFeedback("bad", `Nope. Try the next one.`);
      const expected = q.expectedDisplay ?? "—";
      els.explanation.innerHTML = `
        <div style="margin-bottom:6px;"><b>Correct answer:</b> <span class="math">${expected}</span></div>
        ${q.explanationHTML}
      `;
      renderMathIfPossible(els.explanation);
      applyCardEffect("problemCard--bad");
      els.problemCard.classList.add("problemCard--shake");
      spawnConfetti({
        count: 14,
        colors: ["#FF4D6D", "#FFFFFF", "#A78BFA"],
        dxRange: [-160, 160],
      });
      window.setTimeout(() => {
        applyCardEffect(null);
        els.problemCard.classList.remove("problemCard--shake");
      }, 520);
      els.streakValue.textContent = "0";
    }

    showAchievements();
    setControls("locked");
    scheduleAutoAdvance(ok ? 800 : 1150);
  };

  const onSkip = () => {
    if (!state.currentQuestion) return;
    if (state.checked) return;
    state.checked = true;
    state.streak = 0;
    const q = state.currentQuestion;
    showFeedback("neutral", "Skipped. Zero points.");
    const expected = q.expectedDisplay ?? "—";
    els.explanation.innerHTML = `
      <div style="margin-bottom:6px;"><b>Correct answer:</b> <span class="math">${expected}</span></div>
      ${q.explanationHTML}
    `;
    renderMathIfPossible(els.explanation);
    spawnConfetti({
      count: 10,
      colors: ["#EAF0FF", "#A78BFA", "#6EE7FF"],
      dxRange: [-120, 120],
      topPctRange: [22, 35],
      leftPctRange: [40, 60],
      durationRangeMs: [450, 780],
    });
    els.streakValue.textContent = "0";
    setControls("locked");
    showAchievements();
    scheduleAutoAdvance(950);
  };

  const onHint = () => {
    if (!state.currentQuestion) return;
    if (state.hinted) return;
    state.hinted = true;
    updateScoreMeta();
    showFeedback("neutral", "Hint unlocked. This answer is now worth 0.5 points.");
    els.explanation.innerHTML = qWrap(state.currentQuestion.hintHTML);
    els.hintBtn.disabled = true;
    els.hintBtn.textContent = "Hint used (0.5 pt)";
    renderMathIfPossible(els.explanation);
    const theme = CARD_THEMES[state.currentQuestion.typeId] || CARD_THEMES.default;
    spawnConfetti({
      count: 8,
      colors: theme.confetti,
      dxRange: [-110, 110],
      topPctRange: [26, 36],
      leftPctRange: [44, 56],
      durationRangeMs: [420, 700],
    });
  };

  // Wrap hint so we can keep a consistent look.
  const qWrap = (html) => `<div class="hintLabel">Hint:</div><div style="margin-top:6px;">${html}</div>`;

  const startQuiz = (topicId, difficultyKey = "easy", gameMode = "arcade", timeLimit = 60) => {
    if (topicId) state.topicId = topicId;
    if (difficultyKey) state.difficultyKey = difficultyKey;
    state.gameMode = gameMode;
    state.timeLimit = timeLimit;
    
    // Determine the base mode and whether we're using sequences
    const isSequentialVariant = gameMode.startsWith("sequential");
    const sequentialType = gameMode.replace("sequential", "").replace("-", "") || ""; // "arcade", "speed", or ""
    
    if (isSequentialVariant) {
      state.mode = "sequential";
    } else {
      state.mode = gameMode === "speed" ? "speed" : "arcade";
    }
    
    // Initialize sequential challenge for all sequential variants
    if (isSequentialVariant) {
      const sequenceGen = SEQUENCES[topicId];
      
      if (sequenceGen && typeof sequenceGen.generate === "function") {
        const fullSequence = dedupeQuestions(sequenceGen.generate(), topicId);
        state.sequenceQuestions = getSequentialDifficultySlice(fullSequence, state.difficultyKey);
        state.sequenceIndex = 0;
        
        // Set totalQuestions based on sequential type
        if (gameMode === "sequential") {
          // Base Sequential Challenge should show the full sequence length.
          state.totalQuestions = state.sequenceQuestions.length;
        } else if (sequentialType === "arcade") {
          // Sequential Arcade is a fixed 30-question run.
          state.totalQuestions = Math.min(30, state.sequenceQuestions.length);
        } else if (sequentialType === "speed") {
          // Sequential Speed = all questions (limited by timer)
          state.totalQuestions = state.sequenceQuestions.length;
        } else {
          // Default to all questions
          state.totalQuestions = state.sequenceQuestions.length;
        }
      } else {
        // Fallback: if no sequence for this topic, use arcade mode
        state.gameMode = "arcade";
        state.mode = "arcade";
        state.totalQuestions = 10;
      }
    } else if (gameMode === "speed") {
      state.totalQuestions = 9999; // Essentially unlimited - will end when timer expires
      state.timeLeft = timeLimit;
    } else {
      state.totalQuestions = 10;
      state.timeLeft = 0;
    }

    // Generate unique questions for arcade mode
    if (state.gameMode === "arcade") {
      const type = TOPIC_MAP[state.topicId] || pick(PROBLEM_TYPES);
      const questions = [];
      const seen = new Set();
      const maxQuestions = 10;
      for (let i = 0; i < maxQuestions; i++) {
        let attempts = 0;
        let found = false;
        while (attempts < 250 && !found) {
          const q = type.generate(state.difficultyKey);
          normalizeQuestionForRun(q, type.id);
          const signature = getQuestionSignature(q);
          if (!seen.has(signature)) {
            seen.add(signature);
            questions.push(q);
            found = true;
          }
          attempts++;
        }
        if (!found) break; // Can't find more unique questions
      }
      state.arcadeQuestions = questions;
      state.arcadeIndex = 0;
      // Adjust totalQuestions if fewer unique questions available
      state.totalQuestions = Math.min(10, questions.length);
    }

    // Screen swap
    if (els.topicScreen) els.topicScreen.hidden = true;
    if (els.quizScreen) els.quizScreen.hidden = false;

    state.score = 0;
    state.streak = 0;
    state.bestStreak = 0;
    state.checked = false;
    state.hinted = false;
    state.questionIndex = 0;
    state.achievementsSeen = new Set();
    state.seenQuestionSignatures = new Set();
    state.endReason = "";
    els.achievements.innerHTML = "";

    els.scoreValue.textContent = "0";
    updateScoreMeta();
    els.streakValue.textContent = "0";
    resetFeedbackUI();

    els.timerBox.style.display = "block";
    els.timerBox.classList.remove("timer--danger");
    els.timerValue.classList.remove("timerPulse");
    
    // Show timer for speed modes only
    if (gameMode === "speed") {
      els.timerValue.textContent = timeToMMSS(state.timeLeft);
    } else if (gameMode === "sequential-speed") {
      els.timerValue.textContent = timeToMMSS(state.timeLimit);
      state.timeLeft = state.timeLimit;
    } else {
      els.timerValue.textContent = "--:--";
    }

    els.progressBar.style.width = "0%";
    const isSpeed = gameMode === "speed" || gameMode === "sequential-speed";
    els.progressValue.textContent = isSpeed ? "0" : `0 / ${state.totalQuestions}`;

    clearBurst();
    applyCardEffect(null);

    setDifficultyValue(state.difficultyKey);

    generateQuestion();
    updateProgressUI();

    stopTimer();
    startTimer();
  };

  const resetAll = () => {
    clearAutoAdvance();
    stopTimer();
    els.timerBox.classList.remove("timer--danger");
    els.timerValue.classList.remove("timerPulse");
    clearBurst();
    applyCardEffect(null);

    state.score = 0;
    state.streak = 0;
    state.bestStreak = 0;
    state.checked = false;
    state.hinted = false;
    state.questionIndex = 0;
    state.currentQuestion = null;
    state.achievementsSeen = new Set();
    state.seenQuestionSignatures = new Set();
    state.arcadeQuestions = [];
    state.arcadeIndex = 0;

    if (els.achievements) els.achievements.innerHTML = "";
    if (els.scoreValue) els.scoreValue.textContent = "0";
    updateScoreMeta();
    if (els.streakValue) els.streakValue.textContent = "0";
    resetFeedbackUI();

    if (els.progressValue) els.progressValue.textContent = "0 / 10";
    if (els.progressBar) els.progressBar.style.width = "0%";
    if (els.problemPrompt) els.problemPrompt.innerHTML = `Pick a topic to start.`;
    if (els.problemTypeTag) els.problemTypeTag.textContent = "—";
    if (els.difficultyTag) els.difficultyTag.textContent = "—";
    if (els.timerValue) els.timerValue.textContent = "--:--";

    if (els.topicScreen) els.topicScreen.hidden = false;
    if (els.quizScreen) els.quizScreen.hidden = true;

    setControls("pre");

    // Close modal if open.                                                                                                                                                                                                                                       
    if (els.endModal) {
      els.endModal.hidden = true;
      els.endModal.setAttribute("aria-hidden", "true");
    }
  };

  const closeModal = () => {
    els.endModal.hidden = true;
    els.endModal.setAttribute("aria-hidden", "true");
  };

  const syncTopicPageMeta = () => {
    if (!pageTopicId) return;
    const topic = TOPIC_MAP[pageTopicId];
    if (!topic) return;
    document.title = `${topic.title} | Math Arcade`;
    if (els.pageTitle) els.pageTitle.textContent = topic.title;
    if (els.topicPageArt) {
      els.topicPageArt.src = getTopicArt(topic);
      els.topicPageArt.alt = `${topic.title} illustration`;
    }
    if (els.pageSubtitle) {
      // Update mode indicator
      const modeIndicator = document.getElementById("modeIndicator");
      if (modeIndicator) {
        let modeText = "Arcade";
        if (state.gameMode === "speed") {
          modeText = "Speed Challenge";
        } else if (state.gameMode === "sequential") {
          modeText = "Sequential Challenge";
        } else if (state.gameMode === "sequential-arcade") {
          modeText = "Sequential Arcade";
        } else if (state.gameMode === "sequential-speed") {
          modeText = "Sequential Speed";
        }
        modeIndicator.textContent = modeText;
      }
      
      // Update high score display for all supported modes
      const highScoreDisplay = document.getElementById("highScoreDisplay");
      if (highScoreDisplay) {
        const highScore = getHighScore(state.topicId, state.difficultyKey, state.gameMode);
        if (highScore !== null) {
          highScoreDisplay.innerHTML = `🏆 High Score: ${formatScore(highScore)}`;
        } else {
          highScoreDisplay.innerHTML = "🎯 No high score yet";
        }
        highScoreDisplay.style.display = "block";
      }
    }
  };

  const syncTopicPageQuery = () => {
    if (!pageTopicId || !window.history?.replaceState) return;
    const params = new URLSearchParams();
    params.set("difficulty", state.difficultyKey);
    if (state.gameMode && state.gameMode !== "arcade") {
      params.set("mode", state.gameMode);
    }
    if ((state.gameMode === "speed" || state.gameMode === "sequential-speed") && Number.isFinite(state.timeLimit)) {
      params.set("time", String(state.timeLimit));
    }
    const nextUrl = `${pageTopicId}.html?${params.toString()}`;
    window.history.replaceState(null, "", nextUrl);
  };

  const initTopicPage = () => {
    const topic = TOPIC_MAP[pageTopicId];
    if (!topic) return;

    const params = new URLSearchParams(window.location.search);
    const requestedDifficulty = params.get("difficulty");
    const initialDifficulty = DIFFICULTY[requestedDifficulty] ? requestedDifficulty : "easy";
    const gameMode = params.get("mode") || "arcade";
    const timeLimit = params.get("time") ? parseInt(params.get("time")) : 60;
    
    state.topicId = pageTopicId;
    state.difficultyKey = initialDifficulty;
    state.gameMode = gameMode;
    state.timeLimit = timeLimit;

    setupDifficultyDropdown();
    setDifficultyValue(initialDifficulty);

    if (els.restartTopicBtn) {
      els.restartTopicBtn.addEventListener("click", () => {
        startQuiz(pageTopicId, getDifficultyValue(), state.gameMode, state.timeLimit);
        syncTopicPageMeta();
        syncTopicPageQuery();
      });
    }

    syncTopicPageMeta();
    syncTopicPageQuery();
    startQuiz(pageTopicId, initialDifficulty, gameMode, timeLimit);
    syncTopicPageMeta();
  };

  // --- Events ---
  els.skipBtn.addEventListener("click", () => onSkip());
  els.hintBtn.addEventListener("click", () => onHint());
  els.newProblemBtn.addEventListener("click", () => {
    if (!state.currentQuestion) return;
    nextAfterAnswered();
  });
  els.checkBtn.addEventListener("click", () => onCheck());

  if (els.changeTopicBtn) {
    els.changeTopicBtn.addEventListener("click", () => {
      if (pageTopicId) {
        window.location.href = "index.html";
        return;
      }
      resetAll();
    });
  }

  if (els.themeToggle) {
    els.themeToggle.addEventListener("click", () => toggleTheme());
  }

  els.playAgainBtn.addEventListener("click", () => {
    closeModal();
    startQuiz(state.topicId, state.difficultyKey, state.gameMode, state.timeLimit);
  });
  if (els.changeTopicBtnModal) {
    els.changeTopicBtnModal.addEventListener("click", () => {
      if (pageTopicId) {
        window.location.href = "index.html";
        return;
      }
      resetAll();
    });
  }
  
  // Stats modal handlers
  if (els.statsBtn) {
    els.statsBtn.addEventListener("click", () => {
      showStatsModal();
    });
  }
  if (els.closeStatsBtn) {
    els.closeStatsBtn.addEventListener("click", () => {
      if (els.statsModal) {
        els.statsModal.hidden = true;
        els.statsModal.setAttribute("aria-hidden", "true");
      }
    });
  }
  
  els.closeModalBtn.addEventListener("click", () => {
    if (pageTopicId) {
      closeModal();
      return;
    }
    resetAll();
  });
  document.addEventListener("keydown", (e) => {
    if (!state.currentQuestion) return;

    if (e.key === "Enter" && !els.checkBtn.disabled) onCheck();
    const k = (e.key || "").toLowerCase();
    const typingInAnswer = document.activeElement === els.answerInput;
    if (!typingInAnswer && k === "h" && !els.hintBtn.disabled) onHint();
    if (!typingInAnswer && k === "s" && !els.skipBtn.disabled) onSkip();
  });

  // Init
  renderTopicGrid();
  customizeSelects();
  setupHomeModeSelector();
  setupModeSelectionButtons();
  if (pageTopicId) {
    initTopicPage();
  } else {
    resetAll();
    // Show mode selection screen initially on home page
    showModeSelectionScreen();
  }
})();
