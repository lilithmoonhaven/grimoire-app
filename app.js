/* Ritual Spell Generator — standalone free-gift prototype.
   Data copied verbatim from ritual-blocks-extracted-2026-10-28.md (Canva design DAHY3PbwAsU).
   No browser speechSynthesis is used for narration: narration plays pre-recorded MP3 blocks.
   Atmosphere step 2 and free-typed personal focus text are DISPLAYED only, not spoken
   (they are personalised, so no single pre-recorded clip covers them). */
"use strict";

const INTENTIONS = [
  { id: "protection", name: "Protection & Shielding", titles: ["The Golden Circle of Protection", "The Steadfast Shield", "A Sanctuary of Boundaries"], tool: "a small stone or a written boundary", action: "Name one boundary you can communicate or uphold today.", affirmation: "I can protect my space through clear boundaries and thoughtful action.", reflection: "What practical boundary would support me now?" },
  { id: "self-love", name: "Self-Love & Confidence", titles: ["The Gentle Mirror", "A Hearth for Self-Love", "The Kindness Within"], tool: "a journal or a small mirror", action: "Write yourself one compassionate sentence without demanding perfection.", affirmation: "I am worthy of patient, imperfect care.", reflection: "What kindness can I offer myself this week?" },
  { id: "love-relationships", name: "Love & Relationships", titles: ["The Open Heart", "A Lantern for Connection", "The Garden of Mutual Care"], tool: "a journal or a meaningful object", action: "Name one way to invite connection while respecting everyone's choices.", affirmation: "I welcome connection rooted in mutual respect and choice.", reflection: "What does respectful connection ask of me?" },
  { id: "abundance", name: "Abundance & Prosperity", titles: ["The Open Door of Abundance", "Seeds of Possibility", "The Prosperity Path"], tool: "a note card or an optional LED candle", action: "Write down one realistic step toward an opportunity you can explore.", affirmation: "I notice possibilities and take grounded steps toward them.", reflection: "Which next step is within my control?" },
  { id: "luck", name: "Luck & Opportunity", titles: ["The Lantern of Opportunity", "A Door Left Open", "The Turning Path"], tool: "paper or a pocket stone", action: "Choose one low-pressure action that increases your chance of meeting a new possibility.", affirmation: "I stay open to possibility while taking thoughtful action.", reflection: "Where can I make room for an opportunity?" },
  { id: "healing", name: "Healing & Emotional Renewal", titles: ["A Quiet Place for Renewal", "The Gentle Return", "The Resting Garden"], tool: "a comfortable seat and optional journal", action: "Name a feeling without judging it, then choose one manageable act of care.", affirmation: "I give myself room to feel, rest, and seek support.", reflection: "What gentle act of care feels possible?" },
  { id: "release", name: "Release & Letting Go", titles: ["The Unburdening Tide", "A Soft Farewell", "The Open Hand"], tool: "a bowl of water or a piece of paper", action: "Write down a thought you wish to loosen your grip on, then fold the page and put it away.", affirmation: "I can release what no longer needs my constant attention.", reflection: "What can I set down without denying what I have learned?" },
  { id: "clarity", name: "Clarity & Wisdom", titles: ["The Lantern of Clarity", "The Clear Path", "The Still Mirror"], tool: "a quiet seat or a journal", action: "Name your three most important priorities, then choose the next useful step.", affirmation: "I allow clarity to emerge through attention, not pressure.", reflection: "Which priority matters most right now?" },
  { id: "peace", name: "Peace & Grounding", titles: ["The Stillwater Ritual", "A Sanctuary of Calm", "The Quiet Ground"], tool: "a comfortable seat or a small stone", action: "Notice your feet on the floor and identify three ordinary things you can sense.", affirmation: "I can return to the present moment, one breath at a time.", reflection: "What helps me feel more grounded?" },
  { id: "courage", name: "Courage & Personal Power", titles: ["The Courageous Spark", "The Steady Flame", "A Path Through Uncertainty"], tool: "paper, if you would like it", action: "Name one concrete action you can take today and decide when you will do it.", affirmation: "I can act with care even when I feel uncertain.", reflection: "What is one concrete action within my control?" },
  { id: "manifestation", name: "Manifestation & Goal Setting", titles: ["The First Step Spell", "The Blueprint of Intention", "The Becoming Path"], tool: "paper and a pen", action: "Write your goal in specific terms and choose a realistic first step.", affirmation: "I turn intention into achievable action.", reflection: "What is the next measurable step?" },
  { id: "spiritual-connection", name: "Spiritual Connection", titles: ["The Thread of Meaning", "The Inner Compass", "A Circle of Connection"], tool: "a quiet place or a meaningful symbol", action: "Reflect on what connection means in your own beliefs or experience.", affirmation: "I make room for meaning in a way that is true to me.", reflection: "Which value would I like to honour?" },
  { id: "creativity", name: "Creativity & Inspiration", titles: ["The Unwritten Page", "The Muse's Lantern", "A Spark of Making"], tool: "paper and any drawing or writing tool", action: "Make a small, imperfect sketch or list of ideas without editing yourself.", affirmation: "I give my ideas permission to begin imperfectly.", reflection: "Which idea deserves ten more minutes?" },
  { id: "boundaries", name: "Boundaries & Personal Strength", titles: ["The Golden Threshold", "The Circle of Clear Limits", "The Steadfast Voice"], tool: "paper or a small grounding object", action: "Write one clear boundary using kind, direct language.", affirmation: "I may be kind and clear about my limits.", reflection: "How could I communicate my needs clearly?" },
  { id: "new-beginnings", name: "New Beginnings", titles: ["The First Dawn", "A New Page Opens", "The Threshold Ritual"], tool: "a fresh page or a small keepsake", action: "Name what you would like to begin and choose a first step small enough to do soon.", affirmation: "I can begin before I know the whole path.", reflection: "What first step feels possible?" }
];

const MOONS = [
  { id: "new-moon", label: "● New Moon — Beginnings & Intentions", name: "New Moon — Beginnings & Intentions", step: "Consider beginning and setting intentions. Write a simple intention for the beginning you want to nurture." },
  { id: "waxing-crescent", label: "☽ Waxing Crescent — Growth & Possibility", name: "Waxing Crescent — Growth & Possibility", step: "Consider growth and possibility. Identify one opportunity to nurture with a practical next step." },
  { id: "first-quarter", label: "◐ First Quarter — Action & Determination", name: "First Quarter — Action & Determination", step: "Consider decision and determined action. Choose one concrete action and decide when you will take it." },
  { id: "waxing-gibbous", label: "◕ Waxing Gibbous — Refinement & Preparation", name: "Waxing Gibbous — Refinement & Preparation", step: "Consider refinement and preparation. Adjust one part of your plan so it is more workable." },
  { id: "full-moon", label: "○ Full Moon — Culmination & Reflection", name: "Full Moon — Culmination & Reflection", step: "Consider observation and reflection. Notice what is already present without forcing a conclusion." },
  { id: "waning-gibbous", label: "◕ Waning Gibbous — Gratitude & Integration", name: "Waning Gibbous — Gratitude & Integration", step: "Consider gratitude and integration. Name something you have learned and how you might carry it forward." },
  { id: "last-quarter", label: "◑ Last Quarter — Release & Reassessment", name: "Last Quarter — Release & Reassessment", step: "Consider release and reassessment. Identify one expectation you can revise or set down." },
  { id: "waning-crescent", label: "☾ Waning Crescent — Rest & Renewal", name: "Waning Crescent — Rest & Renewal", step: "Consider rest and renewal. Choose something nonessential to pause so you can make room for rest." },
  { id: "any-moon", label: "✧ Any Moon Phase — Choose what feels right", name: "Any Moon Phase — Choose what feels right", step: "Consider following your own rhythm. Choose whether beginning, growing, reflecting, or resting feels most supportive today." }
];

const METHODS = [
  { id: "crystal", name: "Crystal Resonance", tool: "an optional smooth crystal or ordinary stone", action: "Hold the stone and feel its weight as a cue to ground yourself." },
  { id: "candle", name: "Candle Ritual", tool: "an optional LED candle or a safely supervised candle", action: "Watch an LED candle, or a real candle in a stable heat-safe holder. Never leave a flame unattended." },
  { id: "herbal", name: "Herbal Magic", tool: "an optional sprig of rosemary or a drawing of a plant", action: "Observe or draw a plant as a symbol of your intention. Do not ingest ritual materials." },
  { id: "journaling", name: "Written Intention & Journaling", tool: "paper and a pen", action: "Write freely for a few lines about your intention and a compassionate next step." },
  { id: "meditation", name: "Meditation & Visualization", tool: "a comfortable place to sit", action: "Observe thoughts as they pass, then return to a natural breath." },
  { id: "water", name: "Water Ritual", tool: "a small bowl of plain water; no drinking required", action: "Watch a little water settle in a bowl as a symbol of change. Pour it away normally afterward." },
  { id: "incense", name: "Incense & Aromatics", tool: "an optional familiar scent or a scent-free open window", action: "Notice fresh air or a familiar unburned scent. Skip scents if they bother you." },
  { id: "tarot", name: "Tarot & Symbolic Reflection", tool: "an optional tarot card or a hand-drawn symbol", action: "Use a card or symbol as a reflection prompt, not a prediction." },
  { id: "sigil", name: "Sigil Creation", tool: "paper and a pen", action: "Draw a small personal symbol to remind you of your next step." },
  { id: "nature", name: "Nature-Based Ritual", tool: "an outdoor view, leaf, or imagined landscape", action: "Observe a natural shape nearby, or imagine one, and notice what it brings to mind." },
  { id: "breathwork", name: "Breathwork & Grounding", tool: "no special tools", action: "Feel your feet supported and breathe at your own natural pace." },
  { id: "simple", name: "Simple Ritual — No Special Tools", tool: "no special tools", action: "Place your feet on the ground and name one small action within your control." }
];

const OPENINGS = [
  "Find a comfortable, accessible space. Take a moment to settle in.",
  "Settle somewhere comfortable and notice the support beneath you.",
  "Pause in a place that feels comfortable enough for a few moments of reflection."
];
const CLOSINGS = [
  "Return your attention to the room around you. Put away any materials safely.",
  "Notice your surroundings again, and leave the practice with one small next step in mind.",
  "Take your time returning to the present. Set aside any materials safely."
];
const TOOLS_SUBSTITUTE = "You may use an ordinary substitute or simply imagine the materials.";
const TOOLS_DISCLAIMER = "Materials are suggestions. Substitutes are welcome, and no purchase is required.";
const FOCUS_DEFAULT = "Bring your chosen intention to mind without pressure to get it exactly right.";
const CLOSING_DISCLAIMER = "A ritual is a symbolic, creative or reflective practice—not a guarantee of results. Pair intentions with appropriate real-world action and support. Never ingest ritual materials or leave a flame unattended.";

/* Voice registry — the 6 sample voices Krystal chose (2026-10-27).
   Two are recorded and live in blocks/ now. The other four use the SAME clip
   naming in their own folder; to enable one, copy its 153 clips into
   blocks/<folder>/ and set available: true below (and remove its disabled flag).
   No browser speechSynthesis is used as the main voice. */
const VOICES = [
  { id: "none", label: "No Voice", folder: null, available: true },
  { id: "voice-a-female-warm", label: "Warm Female", folder: "voice-a-female-warm", available: true },
  { id: "voice-b-male-reassuring", label: "Gentle Male", folder: "voice-b-male-reassuring", available: true },
  { id: "voice-c-female-soothing", label: "Soothing Female", folder: "voice-c-female-soothing", available: true },
  { id: "voice-d-female-sultry", label: "Sultry Female", folder: "voice-d-female-sultry", available: true },
  { id: "voice-e-male-calming-deep", label: "Calming Deep Male", folder: "voice-e-male-calming-deep", available: true },
  { id: "voice-f-male-deep-british", label: "Deep British Male", folder: "voice-f-male-deep-british", available: true }
];

const MUSIC = {
  none: null,
  heartbeat: "https://raw.githubusercontent.com/lilithmoonhaven/grimoire-audio/main/new-cleaned/heartbeat.mp3",
  birds: "https://raw.githubusercontent.com/lilithmoonhaven/grimoire-audio/main/new-cleaned/birds.mp3",
  flute: "https://raw.githubusercontent.com/lilithmoonhaven/grimoire-audio/main/new-cleaned/flute.mp3",
  windchimes: "https://raw.githubusercontent.com/lilithmoonhaven/grimoire-audio/main/new-cleaned/windchimes.mp3",
  guitar: "https://raw.githubusercontent.com/lilithmoonhaven/grimoire-audio/main/new-cleaned/guitar.mp3",
  "tibetan-bowls": "https://raw.githubusercontent.com/lilithmoonhaven/grimoire-audio/main/new-cleaned/tibetan-bowls.mp3"
};

function pick(arr, rnd) { return arr[Math.floor((rnd || Math.random)() * arr.length)]; }
function find(arr, id) { return arr.find(function (x) { return x.id === id; }); }

function atmosphereText(p) {
  let t = "Shape the practice through a " + p.atmosphere + " atmosphere, " + p.energy + " energy, and " + p.element + " symbolism. Give it " + p.minutes + " minutes, moving at a pace that fits the chosen duration.";
  if (p.keywords) t += " Keep these personal keywords in view: " + p.keywords + ".";
  if (p.notes) t += " Additional note: " + p.notes + ".";
  return t;
}

function generateRitual(intentionId, moonId, methodId, personal, rnd) {
  const intention = find(INTENTIONS, intentionId);
  const moon = find(MOONS, moonId);
  const method = find(METHODS, methodId);
  if (!intention || !moon || !method) throw new Error("Unknown intention, moon, or method.");
  const p = personal || {};
  const atmosphere = p.atmosphere || "gentle";
  const energy = p.energy || "grounded";
  const element = p.element || "earth";
  const minutes = p.minutes || "5";
  const style = p.style || "Gentle & Reflective";
  const tone = p.tone || "Gentle & Encouraging";
  const focus = p.focus || "";
  const titleIndex = Math.floor((rnd || Math.random)() * 3);
  const openingIndex = Math.floor((rnd || Math.random)() * 3);
  const closingIndex = Math.floor((rnd || Math.random)() * 3);
  const title = intention.titles[titleIndex];
  const step5 = intention.action + " " + (focus ? "Hold this personal focus in mind: " + focus + "." : FOCUS_DEFAULT);
  const steps = [OPENINGS[openingIndex], atmosphereText({ atmosphere: atmosphere, energy: energy, element: element, minutes: minutes, keywords: p.keywords || "", notes: p.notes || "" }), method.action, moon.step, step5, CLOSINGS[closingIndex]];
  const toolsLine = method.tool + "; " + intention.tool + ". " + TOOLS_SUBSTITUTE;
  return {
    title: title, titleIndex: titleIndex, openingIndex: openingIndex, closingIndex: closingIndex,
    personalFocus: focus,
    meta: moon.name + " · " + method.name + " · " + minutes + " minutes · " + style + " · " + tone,
    intentionName: intention.name, toolsLine: toolsLine, steps: steps,
    affirmation: intention.affirmation, reflection: intention.reflection,
    intentionId: intention.id, moonId: moon.id, methodId: method.id
  };
}

function voicePlaylist(ritual, voiceFolder, scope) {
  const base = "blocks/" + voiceFolder + "/";
  const clips = function () { const a = []; for (let i = 0; i < arguments.length; i++) a.push(base + arguments[i] + ".mp3"); return a; };
  // Atmosphere step 2 and personal focus text are deliberately NOT in this list:
  // they are personalised and have no pre-recorded clip. The voice skips step 2.
  const focusClips = ritual.personalFocus ? [] : ["fixed-focus-default"];
  const stepsOnly = clips("opening-" + (ritual.openingIndex + 1))
    .concat(clips("method-action-" + ritual.methodId, "moon-step-" + ritual.moonId, "intention-action-" + ritual.intentionId))
    .concat(focusClips.length ? clips(focusClips[0]) : [])
    .concat(clips("closing-" + (ritual.closingIndex + 1)));
  if (scope === "ritual-only") return stepsOnly;
  return clips("title-" + ritual.intentionId + "-" + (ritual.titleIndex + 1))
    .concat(clips("heading-your-intention"))
    .concat(clips("heading-suggested-tools", "tool-method-" + ritual.methodId, "tool-intention-" + ritual.intentionId, "fixed-tools-substitute", "fixed-tools-disclaimer"))
    .concat(clips("heading-the-ritual"))
    .concat(stepsOnly)
    .concat(clips("heading-words-of-intention", "affirmation-" + ritual.intentionId))
    .concat(clips("heading-closing-reflection", "reflection-" + ritual.intentionId))
    .concat(clips("fixed-closing-disclaimer"));
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { INTENTIONS: INTENTIONS, MOONS: MOONS, METHODS: METHODS, OPENINGS: OPENINGS, CLOSINGS: CLOSINGS, generateRitual: generateRitual, voicePlaylist: voicePlaylist, MUSIC: MUSIC, VOICES: VOICES };
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
    const $ = function (id) { return document.getElementById(id); };
    const intentionSel = $("intention"), moonSel = $("moon"), methodSel = $("method");
    const musicSel = $("music"), voiceSel = $("voice");
    INTENTIONS.forEach(function (i) { const o = document.createElement("option"); o.value = i.id; o.textContent = i.name; intentionSel.appendChild(o); });
    MOONS.forEach(function (m) { const o = document.createElement("option"); o.value = m.id; o.textContent = m.label; moonSel.appendChild(o); });
    METHODS.forEach(function (m) { const o = document.createElement("option"); o.value = m.id; o.textContent = m.name; methodSel.appendChild(o); });
    VOICES.forEach(function (v) { const o = document.createElement("option"); o.value = v.folder || "none"; o.textContent = v.label; if (!v.available) o.disabled = true; voiceSel.appendChild(o); });

    let current = null, currentPlaylist = [], voiceIndex = 0, voicePlaying = false, voicePaused = false;
    const musicAudio = new Audio(); musicAudio.preload = "auto";
    const voiceAudio = new Audio(); voiceAudio.preload = "auto";
    let currentTrack = "none";

    function musicVolume() { return currentTrack === "heartbeat" ? 1.0 : parseFloat($("music-volume").value); }
    function applyMusicVolume() { musicAudio.volume = musicVolume(); }
    function playMusic(track) {
      currentTrack = track;
      if (!track || track === "none" || !MUSIC[track]) { musicAudio.pause(); musicAudio.removeAttribute("src"); $("music-status").textContent = "No music selected."; return; }
      musicAudio.src = MUSIC[track];
      musicAudio.loop = $("music-repeat").checked;
      applyMusicVolume();
      musicAudio.play().then(function () { $("music-status").textContent = "Playing: " + musicSel.options[musicSel.selectedIndex].text; })
        .catch(function () { $("music-status").textContent = "Unable to play track. Please check network connection."; });
    }
    musicSel.addEventListener("change", function () { playMusic(musicSel.value); }); // auto-play, no Play press needed
    $("music-volume").addEventListener("input", applyMusicVolume);
    function fmt(t) { if (!isFinite(t)) return "0:00"; const m = Math.floor(t / 60), s = Math.floor(t % 60); return m + ":" + (s < 10 ? "0" + s : s); }
    musicAudio.addEventListener("timeupdate", function () {
      if (musicAudio.duration) $("music-progress").value = (musicAudio.currentTime / musicAudio.duration) * 100;
      $("music-time").textContent = fmt(musicAudio.currentTime) + " / " + fmt(musicAudio.duration);
    });
    $("music-progress").addEventListener("input", function () {
      if (musicAudio.duration) musicAudio.currentTime = (parseFloat(this.value) / 100) * musicAudio.duration;
    });
    $("music-repeat").addEventListener("change", function () { musicAudio.loop = this.checked; });
    $("music-play").addEventListener("click", function () { if (musicSel.value !== "none") playMusic(musicSel.value); });
    $("music-pause").addEventListener("click", function () { musicAudio.pause(); $("music-status").textContent = "Music paused."; });
    $("music-stop").addEventListener("click", function () { musicAudio.pause(); musicAudio.currentTime = 0; $("music-status").textContent = "Music stopped."; });

    function stopVoice() { if (typeof voiceTimer !== "undefined" && voiceTimer) { clearTimeout(voiceTimer); voiceTimer = null; } voicePlaying = false; voicePaused = false; voiceAudio.pause(); voiceAudio.removeAttribute("src"); voiceAudio.load(); $("voice-status").textContent = "Narration stopped."; if ($("voice-read")) $("voice-read").textContent = "✦ Read Ritual ✦"; }
    function playVoiceAt(index) {
      if (index >= currentPlaylist.length) { voicePlaying = false; $("voice-status").textContent = "Narration finished."; if ($("voice-read")) $("voice-read").textContent = "✦ Read Ritual ✦"; return; }
      voiceIndex = index;
      voiceAudio.src = currentPlaylist[index];
      voiceAudio.volume = parseFloat($("voice-volume").value);
      voiceAudio.playbackRate = parseFloat($("voice-pitch").value); // recorded audio: pitch moves with speed
      voiceAudio.play().catch(function () { $("voice-status").textContent = "Unable to play narration clip " + (index + 1) + ". Check that the blocks folder was copied with this page."; voicePlaying = false; });
    }
    let voiceTimer = null;
    function pauseAfterClip(src) {
      if (!src) return 800;
      if (src.indexOf("reflection-") !== -1) return 4000; // time to reflect after the reflection question
      if (src.indexOf("affirmation-") !== -1) return 2500; // let the affirmation land
      if (src.indexOf("heading-") !== -1) return 1200; // breath between sections
      if (src.indexOf("closing-") !== -1) return 1500;
      return 800; // gentle breath between all other clips
    }
    voiceAudio.addEventListener("ended", function () {
      if (!voicePlaying || voicePaused) return;
      const finished = currentPlaylist[voiceIndex];
      const pause = pauseAfterClip(finished);
      if (finished && finished.indexOf("reflection-") !== -1) $("voice-status").textContent = "Take a moment to reflect…";
      voiceTimer = setTimeout(function () { if (voicePlaying && !voicePaused) playVoiceAt(voiceIndex + 1); }, pause);
    });
    $("voice-volume").addEventListener("input", function () { voiceAudio.volume = parseFloat(this.value); });
    $("voice-pitch").addEventListener("input", function () { voiceAudio.playbackRate = parseFloat(this.value); });
    $("voice-read").addEventListener("click", function () {
      if (voicePlaying) { stopVoice(); return; }
      if (!current) { $("voice-status").textContent = "Generate a ritual first, then read it."; return; }
      if (voiceSel.value === "none") { $("voice-status").textContent = "Choose a voice first."; return; }
      currentPlaylist = voicePlaylist(current, voiceSel.value, $("reading-scope").value);
      voicePlaying = true; voicePaused = false;
      this.textContent = "■ Stop Reading";
      $("voice-status").textContent = "Reading ritual aloud… (atmosphere step and any personal focus text are shown in text only, not spoken — see note below.)";
      playVoiceAt(0);
    });

    $("personal-toggle").addEventListener("click", function () {
      const panel = $("personal-panel");
      panel.hidden = !panel.hidden;
      this.textContent = panel.hidden ? "✧ Make It Personal" : "✧ Hide Personal Details";
    });

    function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
    function render(ritual) {
      let html = "<h2>" + esc(ritual.title) + "</h2>";
      if (ritual.personalFocus) html += "<p class=\"personal-focus\">Personal focus: " + esc(ritual.personalFocus) + "</p>";
      html += "<p class=\"meta\">" + esc(ritual.meta) + "</p>";
      html += "<h3>YOUR INTENTION</h3><p>" + esc(ritual.intentionName) + "</p>";
      html += "<h3>SUGGESTED TOOLS</h3><p>" + esc(ritual.toolsLine) + "</p><p>" + esc(TOOLS_DISCLAIMER) + "</p>";
      html += "<h3>THE RITUAL</h3><ol>" + ritual.steps.map(function (s, i) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>";
      html += "<h3>WORDS OF INTENTION</h3><p>" + esc(ritual.affirmation) + "</p>";
      html += "<h3>CLOSING REFLECTION</h3><p>" + esc(ritual.reflection) + "</p>";
      html += "<p class=\"disclaimer\">" + esc(CLOSING_DISCLAIMER) + "</p>";
      $("output").innerHTML = html;
    }
    function personalValues() {
      return {
        atmosphere: $("p-atmosphere").value.trim() || "gentle",
        energy: $("p-energy").value.trim() || "grounded",
        element: $("p-element").value.trim() || "earth",
        minutes: $("p-minutes").value.trim() || "5",
        style: $("p-style").value.trim() || "Gentle & Reflective",
        tone: $("p-tone").value.trim() || "Gentle & Encouraging",
        keywords: $("p-keywords").value.trim(),
        notes: $("p-notes").value.trim(),
        focus: $("p-focus").value.trim()
      };
    }
    function awaken() {
      stopVoice();
      current = generateRitual(intentionSel.value, moonSel.value, methodSel.value, personalValues());
      render(current);
      if ($("auto-read").checked && voiceSel.value !== "none") {
        currentPlaylist = voicePlaylist(current, voiceSel.value, $("reading-scope").value);
        voicePlaying = true; voicePaused = false;
        $("voice-status").textContent = "Reading ritual aloud… (atmosphere step and any personal focus text are shown in text only, not spoken.)";
        if ($("voice-read")) $("voice-read").textContent = "■ Stop Reading";
        playVoiceAt(0);
      } else if (voiceSel.value === "none") {
        $("voice-status").textContent = "Voice: none selected. Choose a voice and press Read Ritual, or turn on Auto-read.";
      }
    }
    $("awaken").addEventListener("click", awaken);
    $("again").addEventListener("click", awaken);
  });
}
