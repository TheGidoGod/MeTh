(() => {
  const $ = (sel) => document.querySelector(sel);
  const els = {
    topicScreen: $("#topicScreen"),
    quizScreen: $("#quizScreen"),
    topicGrid: $("#topicGrid"),
    changeTopicBtn: $("#changeTopicBtn"),
    changeTopicBtnModal: $("#changeTopicBtnModal"),
    scoreValue: $("#scoreValue"),
    streakValue: $("#streakValue"),
    timerValue: $("#timerValue"),
    progressValue: $("#progressValue"),
    progressBar: $("#progressBar"),
    skipBtn: $("#skipBtn"),
    hintBtn: $("#hintBtn"),
    newProblemBtn: $("#newProblemBtn"),
    answerInput: $("#answerInput"),
    checkBtn: $("#checkBtn"),
    feedback: $("#feedback"),
    explanation: $("#explanation"),
    problemCard: $("#problemCard"),
    problemTypeTag: $("#problemTypeTag"),
    difficultyTag: $("#difficultyTag"),
    problemPrompt: $("#problemPrompt"),
    achievements: $("#achievements"),
    endModal: $("#endModal"),
    endTitle: $("#endTitle"),
    endBody: $("#endBody"),
    playAgainBtn: $("#playAgainBtn"),
    closeModalBtn: $("#closeModalBtn"),
    timerBox: $("#timerBox"),
  };
  const answerPadButtons = Array.from(document.querySelectorAll("[data-answer-insert], [data-answer-action]"));

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

  const randInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

  const gcd = (a, b) => {
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
    return Math.abs((a / gcd(a, b)) * b);
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
    const g = gcd(n, d);
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
        gcdA: [10, 60],
        gcdB: [8, 55],
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
        gcdA: [20, 120],
        gcdB: [10, 90],
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
        gcdA: [40, 240],
        gcdB: [20, 210],
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
        const promptHTML = `Compute <span class="math">${a}</span> <span class="math-thin">x</span> <span class="math">${b}</span>.`;
        return {
          typeLabel: "Multiply",
          promptHTML,
          hintHTML: `Break it down: ${a} is ${a} (no trick), multiply by ${b}.`,
          explanationHTML: `${a} x ${b} = <span class="math">${ans}</span>.`,
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
          explanationHTML: `${a} \\div ${d} = <span class="math">${q}</span>.`,
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
          explanationHTML: `Because ${k}^2 = ${n}, we get \\sqrt{${n}} = <span class="math">${k}</span>.`,
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
      id: "gcdLcm",
      title: "GCD vs LCM Arena",
      generate: (diffKey) => {
        const r = DIFFICULTY[diffKey].ranges;
        const a = randInt(r.gcdA[0], r.gcdA[1]);
        const b = randInt(r.gcdB[0], r.gcdB[1]);
        const askGcd = Math.random() < 0.5;
        const ans = askGcd ? gcd(a, b) : lcm(a, b);
        const label = askGcd ? "GCD" : "LCM";
        const promptHTML = `Find the <span class="math">${label}(${a}, ${b})</span>.`;
        const hintHTML = askGcd
          ? `GCD is the biggest number that divides both <span class="math">${a}</span> and <span class="math">${b}</span>.`
          : `LCM is the smallest common multiple of <span class="math">${a}</span> and <span class="math">${b}</span>.`;
        const explanationHTML = askGcd
          ? `The GCD of ${a} and ${b} is <span class="math">${ans}</span>.`
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
          explanationHTML: `There are <span class="math">${ans}</span> positive factors of ${n}.`,
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
        const a = randInt(r.fracA[0], r.fracA[1]);
        const b = randInt(r.fracB[0], r.fracB[1]);
        const c = randInt(r.fracC[0], r.fracC[1]);
        const numerator = a * c;
        const denominator = b * c;
        const reduced = reduceFraction(numerator, denominator);
        const promptHTML = `Simplify <span class="math">${numerator}/${denominator}</span>. Type your answer as <span class="math">p/q</span>.`;
        const hintHTML = `Reduce by dividing numerator and denominator by their GCD (common factor).`;
        const explanationHTML = `gcd(${numerator}, ${denominator}) reduces the fraction to <span class="math">${reduced.n}/${reduced.d}</span>.`;
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
          hintHTML: `Percent means “out of 100”: compute <span class="math">(${n} / ${d}) <span class="math-thin>x</span 100</span>.`,
          explanationHTML: `(${n}/${d}) <span class="math-thin"> x </span> 100 = <span class="math">${p}</span>%.`,
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
        const promptHTML = `Solve for <span class="math">x</span>: <span class="math">${a}x + ${b} = ${c}</span>.`;
        const hintHTML = `Start by subtracting ${b} from both sides, then divide by ${a}.`;
        const explanationHTML = `Subtract: ${a}x = ${c} - ${b} = ${a} <span class="math-thin"> x </span> ${x}. Then divide by ${a}: x = <span class="math">${x}</span>.`;
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
          ? `Area = width <span class="math-thin"> x </span> height.`
          : `Perimeter = 2(width + height).`;
        const explanationHTML = askArea
          ? `${w} <span class="math-thin"> x </span> ${h} = <span class="math">${ans}</span>.`
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
        const hintHTML = `Use distance formula: distance = sqrt((x2 - x1)^2 + (y2 - y1)^2). First find how far apart the x-values and y-values are.`;
        const explanationHTML = `The x-values are ${Math.abs(x2 - x1)} apart and the y-values are ${Math.abs(y2 - y1)} apart. So distance = sqrt(${t.dx}^2 + ${t.dy}^2) = <span class="math">${t.h}</span>.`;
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
        const promptHTML = `You roll a fair ${sides}-sided die ${xText}. What is the average total you should expect?`;
        const hint = `Since this is a dice, you will need to use meridian (average): (number of sides + 1) / 2.`;
        const expected2 = Math.abs(expected % 1) < 1e-9 ? String(expected.toFixed(0)) : expected.toFixed(1);
        return {
          typeLabel: "Expected Value",
          promptHTML,
          hintHTML: hint,
          explanationHTML: `The expected value of one die is ${sides + 1} / 2 = <span class="math">${(sides + 1) / 2}</span>. So the expected value of ${diceCount} dice is ${diceCount} x <span class="math">${(sides + 1) / 2}</span> = <span class="math">${expected2}</span>.`,
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
          : `Average = (sum) / ${nums.length} = <span class="math">${mean.toFixed(2)}</span>.`;
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
          ? `Find the missing number (type what goes in the box): <span class="math">\\square <span class="math-thin"> x </span> ${b} = ${product}</span>.`
          : `Find the missing number (type what goes in the box): <span class="math">${a} <span class="math-thin"> x </span> \\square = ${product}</span>.`;
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
          explanationHTML: `The smallest prime factor of ${n} is <span class="math">${ans}</span>.`,
          validate: (input) => {
            const v = parseNumberLoose(input);
            return v !== null && v === ans;
          },
          expectedDisplay: String(ans),
        };
      },
    },
  ];

  // --- UI / Game state ---
  const state = {
    mode: "arcade",
    difficultyKey: "easy",
    topicId: "",
    score: 0,
    streak: 0,
    checked: false,
    hinted: false,
    questionIndex: 0,
    totalQuestions: 10,
    timeLeft: null,
    timerId: null,
    currentQuestion: null,
    achievementsSeen: new Set(),
    endReason: "",
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

  const showFeedback = (kind, text) => {
    els.feedback.classList.remove("feedback--good", "feedback--bad", "feedback--neutral");
    els.feedback.classList.add(
      kind === "good" ? "feedback--good" : kind === "bad" ? "feedback--bad" : "feedback--neutral",
    );
    els.feedback.innerHTML = text;
  };

  const setControls = (phase) => {
    const setPadDisabled = (disabled) => {
      answerPadButtons.forEach((btn) => {
        btn.disabled = disabled;
      });
    };
    // phase: 'pre' | 'active' | 'locked'
    if (phase === "pre") {
      els.skipBtn.disabled = true;
      els.hintBtn.disabled = true;
      els.newProblemBtn.disabled = true;
      els.checkBtn.disabled = true;
      els.answerInput.disabled = true;
      els.answerInput.value = "";
      setPadDisabled(true);
      return;
    }
    if (phase === "active") {
      els.skipBtn.disabled = false;
      els.hintBtn.disabled = false;
      els.newProblemBtn.disabled = true;
      els.checkBtn.disabled = false;
      els.answerInput.disabled = false;
      setPadDisabled(false);
      els.answerInput.focus();
      return;
    }
    if (phase === "locked") {
      els.skipBtn.disabled = true;
      els.hintBtn.disabled = true;
      els.newProblemBtn.disabled = false;
      els.checkBtn.disabled = true;
      els.answerInput.disabled = true;
      setPadDisabled(true);
      return;
    }
  };

  const renderTopicGrid = () => {
    els.topicGrid.innerHTML = "";
    PROBLEM_TYPES.forEach((t) => {
      const tile = document.createElement("div");
      tile.className = "topicTile";

      const title = document.createElement("div");
      title.className = "topicTile__title";
      title.textContent = t.title;

      const diffLabel = document.createElement("div");
      diffLabel.className = "topicTile__diffLabel";
      diffLabel.textContent = "Difficulty";

      const select = document.createElement("select");
      select.className = "topicTile__select";
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
        startQuiz(t.id, select.value);
      });

      tile.appendChild(title);
      tile.appendChild(diffLabel);
      tile.appendChild(select);
      tile.appendChild(play);
      els.topicGrid.appendChild(tile);
    });
  };

  const pickNextQuestion = () => {
    const type = PROBLEM_TYPES.find((t) => t.id === state.topicId) || pick(PROBLEM_TYPES);
    const q = type.generate(state.difficultyKey);
    // Attach the generator id so UI can theme the card.
    q.typeId = type.id;
    return q;
  };

  const setTags = (q) => {
    els.problemTypeTag.textContent = q.typeLabel;
    els.difficultyTag.textContent = DIFFICULTY[state.difficultyKey].label;
  };

  const updateProgressUI = () => {
    if (state.mode !== "arcade") {
      els.progressValue.textContent = "∞";
      els.progressBar.style.width = "0%";
      return;
    }
    els.progressValue.textContent = `${Math.min(state.questionIndex, state.totalQuestions)} / ${state.totalQuestions}`;
    const pct = state.totalQuestions === 0 ? 0 : (state.questionIndex / state.totalQuestions) * 100;
    els.progressBar.style.width = `${clamp(pct, 0, 100)}%`;
  };

  const startTimer = () => {
    if (state.timerId) clearInterval(state.timerId);
    if (state.mode !== "arcade") return;
    state.timeLeft = 180; // seconds
    els.timerBox.style.opacity = "1";
    els.timerValue.textContent = timeToMMSS(state.timeLeft);
    const setDanger = (danger) => {
      els.timerBox.classList.toggle("timer--danger", danger);
      els.timerValue.classList.toggle("timerPulse", danger);
    };
    setDanger(state.timeLeft <= 30);
    state.timerId = setInterval(() => {
      state.timeLeft -= 1;
      if (state.timeLeft <= 0) {
        state.timeLeft = 0;
        els.timerValue.textContent = timeToMMSS(0);
        setDanger(false);
        clearInterval(state.timerId);
        state.timerId = null;
        finishRun("Time's up!");
      } else {
        els.timerValue.textContent = timeToMMSS(state.timeLeft);
        setDanger(state.timeLeft <= 30);
      }
    }, 1000);
  };

  const stopTimer = () => {
    if (state.timerId) clearInterval(state.timerId);
    state.timerId = null;
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
    resetFeedbackUI();
    els.problemPrompt.innerHTML = q.promptHTML;
    els.explanation.innerHTML = "";
    els.answerInput.value = "";
    state.currentQuestion = q;
    state.checked = false;
    state.hinted = false;
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
    setQuestionUI(q);
  };

  const finishRun = (reason) => {
    stopTimer();
    els.timerBox.classList.remove("timer--danger");
    els.timerValue.classList.remove("timerPulse");
    state.endReason = reason;
    setControls("pre");

    let title = "Run complete";
    if (state.mode === "arcade" && reason) title = reason;
    const total = state.mode === "arcade" ? state.totalQuestions : state.questionIndex;
    const scoreText =
      state.mode === "arcade"
        ? `${formatScore(state.score)} / ${state.totalQuestions}`
        : `${formatScore(state.score)} correct answers`;
    els.endTitle.textContent = title;
    els.endBody.innerHTML = `
      <div><b>Score:</b> ${scoreText}</div>
      <div style="margin-top:6px;"><b>Best streak:</b> ${Math.max(state.streak, 0)}</div>
      <div style="margin-top:6px; color: rgba(234,240,255,.78);">${reason ? reason : ""} </div>
    `;

    state.currentQuestion = null;
    els.endModal.hidden = false;
    els.endModal.setAttribute("aria-hidden", "false");
    els.endModal.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const nextAfterAnswered = () => {
    if (state.mode === "arcade") {
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
      showFeedback("good", `Correct! <span class="math">+${pointsAwarded}</span>`);
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
  };

  const onHint = () => {
    if (!state.currentQuestion) return;
    if (state.hinted) return;
    state.hinted = true;
    showFeedback("neutral", "Hint unlocked.");
    els.explanation.innerHTML = qWrap(state.currentQuestion.hintHTML);
    els.hintBtn.disabled = true;
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
  const qWrap = (html) => `<div style="color: rgba(234,240,255,.92); font-weight:800;">Hint:</div><div style="margin-top:6px;">${html}</div>`;

  const insertIntoAnswer = (token) => {
    if (!els.answerInput || els.answerInput.disabled) return;
    const normalized = token === "backslash" ? "\\" : token;
    const start = Number.isInteger(els.answerInput.selectionStart)
      ? els.answerInput.selectionStart
      : els.answerInput.value.length;
    const end = Number.isInteger(els.answerInput.selectionEnd)
      ? els.answerInput.selectionEnd
      : els.answerInput.value.length;
    const before = els.answerInput.value.slice(0, start);
    const after = els.answerInput.value.slice(end);
    const next = `${before}${normalized}${after}`;
    const cursor = start + normalized.length;
    els.answerInput.value = next;
    els.answerInput.focus();
    els.answerInput.setSelectionRange(cursor, cursor);
  };

  const backspaceInAnswer = () => {
    if (!els.answerInput || els.answerInput.disabled) return;
    const start = Number.isInteger(els.answerInput.selectionStart)
      ? els.answerInput.selectionStart
      : els.answerInput.value.length;
    const end = Number.isInteger(els.answerInput.selectionEnd)
      ? els.answerInput.selectionEnd
      : els.answerInput.value.length;
    if (start !== end) {
      const before = els.answerInput.value.slice(0, start);
      const after = els.answerInput.value.slice(end);
      els.answerInput.value = `${before}${after}`;
      els.answerInput.focus();
      els.answerInput.setSelectionRange(start, start);
      return;
    }
    if (start <= 0) return;
    const before = els.answerInput.value.slice(0, start - 1);
    const after = els.answerInput.value.slice(end);
    const cursor = start - 1;
    els.answerInput.value = `${before}${after}`;
    els.answerInput.focus();
    els.answerInput.setSelectionRange(cursor, cursor);
  };

  const startQuiz = (topicId, difficultyKey = "easy") => {
    if (topicId) state.topicId = topicId;
    if (difficultyKey) state.difficultyKey = difficultyKey;
    state.mode = "arcade";
    state.totalQuestions = 10;

    // Screen swap
    if (els.topicScreen) els.topicScreen.hidden = true;
    if (els.quizScreen) els.quizScreen.hidden = false;

    state.score = 0;
    state.streak = 0;
    state.checked = false;
    state.hinted = false;
    state.questionIndex = 0;
    state.achievementsSeen = new Set();
    state.endReason = "";
    els.achievements.innerHTML = "";

    els.scoreValue.textContent = "0";
    els.streakValue.textContent = "0";
    resetFeedbackUI();

    els.timerBox.style.display = "block";
    els.timerBox.classList.remove("timer--danger");
    els.timerValue.classList.remove("timerPulse");
    els.timerValue.textContent = "--:--";

    els.progressBar.style.width = "0%";
    els.progressValue.textContent = `0 / ${state.totalQuestions}`;

    clearBurst();
    applyCardEffect(null);

    generateQuestion();
    updateProgressUI();

    stopTimer();
    startTimer();
  };

  const resetAll = () => {
    stopTimer();
    els.timerBox.classList.remove("timer--danger");
    els.timerValue.classList.remove("timerPulse");
    clearBurst();
    applyCardEffect(null);

    state.score = 0;
    state.streak = 0;
    state.checked = false;
    state.hinted = false;
    state.questionIndex = 0;
    state.currentQuestion = null;
    state.achievementsSeen = new Set();

    if (els.achievements) els.achievements.innerHTML = "";
    if (els.scoreValue) els.scoreValue.textContent = "0";
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

  // --- Events ---
  els.skipBtn.addEventListener("click", () => onSkip());
  els.hintBtn.addEventListener("click", () => onHint());
  els.newProblemBtn.addEventListener("click", () => {
    if (!state.currentQuestion) return;
    nextAfterAnswered();
  });
  els.checkBtn.addEventListener("click", () => onCheck());

  if (els.changeTopicBtn) {
    els.changeTopicBtn.addEventListener("click", () => resetAll());
  }

  els.playAgainBtn.addEventListener("click", () => {
    closeModal();
    startQuiz(state.topicId, state.difficultyKey);
  });
  if (els.changeTopicBtnModal) {
    els.changeTopicBtnModal.addEventListener("click", () => resetAll());
  }
  els.closeModalBtn.addEventListener("click", () => resetAll());
  answerPadButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.getAttribute("data-answer-action");
      if (action === "backspace") {
        backspaceInAnswer();
        return;
      }
      const token = btn.getAttribute("data-answer-insert");
      if (!token) return;
      insertIntoAnswer(token);
    });
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
  resetAll();
})();

