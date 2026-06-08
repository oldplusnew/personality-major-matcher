const hollandTypes = {
  R: { name: "现实型", color: "#4f9d5d", desc: "喜欢动手实践、设备工具、工程建造和真实场景。" },
  I: { name: "研究型", color: "#2b6fe8", desc: "喜欢分析问题、探索规律、数据推理和科学研究。" },
  A: { name: "艺术型", color: "#d45b72", desc: "喜欢创作表达、视觉审美、内容生产和开放探索。" },
  S: { name: "社会型", color: "#0f9f8f", desc: "喜欢沟通协作、帮助他人、教育健康和社会服务。" },
  E: { name: "企业型", color: "#dd8b2b", desc: "喜欢组织资源、影响他人、商业决策和项目推进。" },
  C: { name: "常规型", color: "#7460c7", desc: "喜欢秩序流程、细节管理、数据处理和稳定执行。" }
};

const questions = [
  ["R", "我愿意把一个复杂设备拆开，弄清楚它为什么能运转。"],
  ["I", "遇到陌生问题时，我更想先找数据和原理，而不是立刻下结论。"],
  ["A", "我经常会被新鲜的表达方式、影像、文字或设计吸引。"],
  ["S", "同学遇到选择困难时，我愿意听他们讲完并一起梳理。"],
  ["E", "我喜欢带着小组推进目标，也愿意承担拍板责任。"],
  ["C", "我做事前通常会列清单，并希望过程尽量有章法。"],
  ["R", "相比纯理论讨论，我更喜欢看到实验、作品或真实场景。"],
  ["I", "我享受长时间钻研一个知识点，直到把逻辑链条想通。"],
  ["A", "如果有机会，我想做能体现个人风格的项目或作品。"],
  ["S", "我对心理、教育、公共服务、医护等与人相关的议题感兴趣。"],
  ["E", "我会主动关注商业、管理、传播、谈判或项目运营。"],
  ["C", "我能接受大量细致信息，只要它们能形成可靠结论。"],
  ["R", "我对智能制造、建筑、交通、能源或农业技术有好奇心。"],
  ["I", "我希望大学专业能训练严谨推理和研究能力。"],
  ["A", "我不太喜欢答案唯一的问题，更喜欢有创造空间的任务。"],
  ["S", "我希望未来工作能与人的成长、健康或社会福祉相关。"],
  ["E", "我愿意尝试竞赛、社团、创业项目或公开表达。"],
  ["C", "我对财务、统计、档案、法律条文或系统化管理不排斥。"]
].map(([type, text]) => ({ type, text }));

const majors = [
  ["计算机科学与技术", "工学", ["I", "R", "C"], "程序设计、数据结构、操作系统、人工智能导论", "软件工程师、算法工程师、系统架构师", "高", "热门竞争强，建议尽早积累编程项目和数学基础。"],
  ["临床医学", "医学", ["I", "S", "C"], "人体解剖学、生理学、内科学、外科学", "临床医师、医学科研、医院管理", "中高", "学习周期长，需确认对高强度训练和责任压力的接受度。"],
  ["法学", "法学", ["E", "S", "C"], "宪法、民法、刑法、诉讼法、法律写作", "律师、法务、公务员、合规顾问", "中高", "职业分化明显，表达、写作和资格考试很关键。"],
  ["心理学", "理学/教育学", ["S", "I", "A"], "普通心理学、实验心理学、统计测量、咨询基础", "心理咨询助理、用户研究、教育测评、人力资源", "中", "本科就业口径较宽，建议规划深造或复合技能。"],
  ["数字媒体艺术", "艺术学", ["A", "I", "E"], "交互设计、动态图形、三维基础、影视后期", "交互设计师、内容设计、游戏美术、品牌视觉", "中高", "作品集和审美迭代速度决定竞争力。"],
  ["会计学", "管理学", ["C", "E", "I"], "财务会计、审计、税法、财务管理", "审计、财务分析、税务、企业内控", "中", "基础岗位自动化提升，建议叠加数据分析能力。"],
  ["电子信息工程", "工学", ["R", "I", "C"], "电路、信号系统、通信原理、嵌入式开发", "硬件工程师、通信工程师、芯片测试、物联网开发", "高", "数学物理基础要求高，适合愿意持续动手调试的学生。"],
  ["新闻传播学", "文学", ["A", "E", "S"], "新闻采访、传播理论、舆情分析、短视频策划", "内容策划、品牌传播、新媒体运营、记者编辑", "中", "行业变化快，需兼具内容判断与数据运营。"],
  ["师范类教育学", "教育学", ["S", "C", "A"], "教育心理学、课程设计、班级管理、学科教学法", "中小学教师、教研、教育产品、升学规划", "中", "适合愿意长期陪伴人成长、并能接受稳定重复训练的学生。"],
  ["数据科学与大数据技术", "工学", ["I", "C", "E"], "统计建模、机器学习、数据库、数据可视化", "数据分析师、机器学习工程师、商业分析、风控建模", "高", "需要数学、编程和业务理解三线并进。"]
].map(([name, discipline, code, courses, careers, salary, risk]) => ({ name, discipline, code, courses, careers, salary, risk }));

const state = {
  view: "home",
  current: 0,
  answers: Array(questions.length).fill(0),
  unlocked: false,
  showPaywall: false,
  selectedMajor: "",
  saved: [],
  profile: { name: "", grade: "高三", goal: "还不确定" }
};

const app = document.querySelector("#app");

function icon(name) {
  const icons = {
    spark: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2l1.7 5.3L19 9l-5.3 1.7L12 16l-1.7-5.3L5 9l5.3-1.7L12 2z" fill="currentColor"/><path d="M19 14l.9 2.6 2.6.9-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9L19 14z" fill="currentColor"/></svg>',
    play: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7L8 5z" fill="currentColor"/></svg>',
    next: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    back: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };
  return icons[name] || "";
}

function scores() {
  const result = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  questions.forEach((q, index) => result[q.type] += state.answers[index] || 0);
  return result;
}

function hollandCode() {
  return Object.entries(scores()).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([key]) => key).join("");
}

function matchMajors() {
  const sc = scores();
  const max = Math.max(...Object.values(sc), 1);
  return majors.map((major) => {
    const raw = major.code.reduce((sum, key, index) => sum + (sc[key] / max) * [48, 36, 28][index], 0);
    return { ...major, match: Math.max(45, Math.min(98, Math.round(raw))) };
  }).sort((a, b) => b.match - a.match);
}

function navButton(label, view) {
  return `<button class="${state.view === view ? "active" : ""}" data-view="${view}">${label}</button>`;
}

function renderShell(content) {
  app.innerHTML = `
    <div class="app-shell">
      <header class="topbar">
        <div class="topbar-inner">
          <div class="brand"><span class="brand-mark">${icon("spark")}</span><span>志向星图</span></div>
          <nav class="nav">
            ${navButton("首页测评", "home")}
            ${navButton("问卷", "quiz")}
            ${navButton("匹配报告", "results")}
            ${navButton("专业库", "library")}
            ${navButton("个人档案", "profile")}
          </nav>
        </div>
      </header>
      <main class="main">${content}</main>
      ${state.showPaywall ? paywallModal() : ""}
    </div>`;
  bindCommon();
}

function renderHome() {
  renderShell(`
    <section class="hero">
      <div class="hero-copy">
        <h1>用性格画像找到更适合你的大学专业。</h1>
        <p>面向高中生和家长的专业匹配工具。通过霍兰德兴趣模型识别学生的核心倾向，生成可解释的专业推荐、学习适配度和职业方向提示。</p>
        <div class="authority-panel">
          <div><strong>什么是霍兰德代码？</strong><span>RIASEC 把职业兴趣分为现实型 R、研究型 I、艺术型 A、社会型 S、企业型 E、常规型 C 六类。测评会找出你最突出的前三类，形成类似 ISA、SEC 的兴趣代码。</span></div>
          <div><strong>为什么选专业前要测？</strong><span>专业不仅看热门程度，也看你是否喜欢它背后的任务：研究、表达、助人、管理、动手或处理数据。先看兴趣结构，可以减少盲选和跟风。</span></div>
        </div>
        <div class="hero-actions">
          <button class="button-primary" data-action="start">${icon("play")}开始测评</button>
          <button class="button-secondary" data-view="results">查看示例报告</button>
        </div>
      </div>
      <div class="hero-visual">${studentPanel()}</div>
    </section>
    <section class="section authority-section">
      <div class="section-head">
        <div>
          <h2>为什么这套模型有参考价值？</h2>
          <p>霍兰德 RIASEC 模型不是算命，也不是替你直接决定专业；它的价值在于把“我喜欢什么样的任务”转成可讨论、可比较的兴趣结构。</p>
        </div>
      </div>
      <div class="authority-grid">
        <div class="authority-card"><b>职业兴趣的通用语言</b><span>RIASEC 用六个维度描述人与职业环境的匹配关系，很多职业探索工具都会把人的兴趣和职业/岗位的兴趣特征放在同一框架里比较。</span></div>
        <div class="authority-card"><b>被 O*NET 职业系统采用</b><span>美国 O*NET Interest Profiler 以 Holland RIASEC 模型为基础，用于教育规划、职业探索和职业指导，并把结果连接到职业数据库。</span></div>
        <div class="authority-card"><b>适合专业选择的早期筛选</b><span>高中阶段信息不完整，先用兴趣画像排除明显不适合的专业，再结合成绩、城市、家庭资源和就业信息做最终选择。</span></div>
      </div>
      <p class="authority-note">提示：本工具提供专业探索参考，不替代学校升学指导、心理咨询或最终决策。</p>
    </section>
    <section class="section">
      <div class="section-head"><div><h2>工具闭环</h2><p>先录入基础信息，再完成 18 道轻量测评，最终得到可解释的专业排序与完整解读。</p></div></div>
      <div class="mini-board">
        <div class="mini-card"><strong>RIASEC</strong><span>霍兰德六维兴趣评分，输出前三位性格代码。</span></div>
        <div class="mini-card"><strong>10+</strong><span>首批专业样例库，包含课程、就业、薪资、风险提示。</span></div>
        <div class="mini-card"><strong>本地</strong><span>演示版报告保存在浏览器内，后续可接支付和账号系统。</span></div>
        <div class="mini-card"><strong>9.9</strong><span>免费版可看基础结论，完整版解锁专业详情和完整报告。</span></div>
      </div>
    </section>`);
  bindProfileForm();
}

function studentPanel() {
  return `
    <div class="assessment-panel">
      <h2>考生基础信息</h2>
      <div class="student-form">
        <div class="field"><label>姓名</label><input data-field="name" value="${state.profile.name}" placeholder="可选" /></div>
        <div class="field"><label>年级</label><select data-field="grade">${["高一", "高二", "高三", "复读生", "家长代填"].map((item) => `<option ${state.profile.grade === item ? "selected" : ""}>${item}</option>`).join("")}</select></div>
        <div class="field full"><label>当前状态</label><select data-field="goal">${["还不确定", "偏理工方向", "偏人文社科", "偏艺术传媒", "偏医学教育", "想看完整报告"].map((item) => `<option ${state.profile.goal === item ? "selected" : ""}>${item}</option>`).join("")}</select></div>
      </div>
      <div class="mini-board">
        <div class="mini-card"><strong>${state.profile.grade}</strong><span>当前学习阶段</span></div>
        <div class="mini-card"><strong>${state.profile.goal}</strong><span>用于报告文案参考，不参与硬性筛选</span></div>
      </div>
    </div>`;
}

function renderQuiz() {
  const q = questions[state.current];
  const progress = Math.round((state.answers.filter(Boolean).length / questions.length) * 100);
  renderShell(`
    <section class="section">
      <div class="section-head">
        <div><h2>性格测评问卷</h2><p>根据真实倾向作答即可，没有好坏对错。当前进度 ${progress}%</p></div>
        <button class="button-secondary" data-action="reset">重置答案</button>
      </div>
      <div class="progress-track"><div class="progress-bar" style="width:${progress}%"></div></div>
      <div class="question-layout">
        <div class="question-card">
          <h3>${state.current + 1}. ${q.text}</h3>
          <div class="scale">${["很不符合", "不太符合", "一般", "比较符合", "非常符合"].map((label, i) => `<button class="${state.answers[state.current] === i + 1 ? "selected" : ""}" data-answer="${i + 1}">${i + 1}<br>${label}</button>`).join("")}</div>
          <div class="question-tools">
            <button class="button-secondary" data-action="prev" ${state.current === 0 ? "disabled" : ""}>${icon("back")}上一题</button>
            <button class="button-primary" data-action="next">${state.current === questions.length - 1 ? "生成报告" : "下一题"}${icon("next")}</button>
          </div>
        </div>
        <aside class="side-panel"><h3>六维实时评分</h3><div class="type-list">${typeRows()}</div></aside>
      </div>
    </section>`);
}

function typeRows() {
  const sc = scores();
  const max = Math.max(...Object.values(sc), 1);
  return Object.entries(hollandTypes).map(([key, item]) => `
    <div class="type-row"><span>${key}</span><div class="bar"><span style="width:${Math.round(sc[key] / max * 100)}%;background:${item.color}"></span></div><span>${sc[key]}</span></div>`).join("");
}

function renderResults() {
  const matched = matchMajors();
  if (!state.selectedMajor) state.selectedMajor = matched[0].name;
  const selected = matched.find((m) => m.name === state.selectedMajor) || matched[0];
  const visible = state.unlocked ? matched : matched.slice(0, 3);
  renderShell(`
    <section class="section">
      <div class="section-head">
        <div><h2>匹配报告</h2><p>${state.unlocked ? "完整版已解锁。" : "免费版展示基础画像和前三个推荐方向。"}当前霍兰德代码为 ${hollandCode()}，推荐结果只基于性格与兴趣倾向。</p></div>
        ${state.unlocked ? `<button class="button-primary" data-action="save">保存完整报告</button>` : `<button class="button-primary" data-action="pay">${icon("spark")}9.9 解锁完整版</button>`}
      </div>
      ${state.unlocked ? "" : freeNotice()}
      <div class="results-grid">
        <aside class="result-panel">
          <h3>性格画像</h3>
          <div class="code-display"><strong>${hollandCode()}</strong><span>${hollandCode().split("").map((k) => hollandTypes[k].name).join(" / ")}</span></div>
          <div class="radar-wrap">${radarSvg()}</div>
          <div class="type-list">${typeRows()}</div>
        </aside>
        <div class="major-list">${visible.map((m) => majorCard(m, selected.name === m.name)).join("")}${state.unlocked ? "" : lockedPreview(matched.length - visible.length)}</div>
      </div>
    </section>
    <section class="section">${state.unlocked ? majorDetail(selected) : lockedDetail(selected)}</section>`);
}

function freeNotice() {
  return `<div class="paywall-strip"><div><b>免费版已生成基础结论</b><span>解锁后可查看完整专业库排序、专业适配原因、课程难度、就业方向和风险提示。</span></div><button class="button-primary" data-action="pay">立即解锁 9.9</button></div>`;
}

function radarSvg() {
  const sc = scores();
  const keys = Object.keys(hollandTypes);
  const max = Math.max(...Object.values(sc), 1);
  const cx = 160, cy = 160, r = 112;
  const polygon = (scale) => keys.map((_, i) => {
    const a = -Math.PI / 2 + i * Math.PI * 2 / keys.length;
    return `${cx + Math.cos(a) * r * scale},${cy + Math.sin(a) * r * scale}`;
  }).join(" ");
  const points = keys.map((key, i) => {
    const a = -Math.PI / 2 + i * Math.PI * 2 / keys.length;
    return `${cx + Math.cos(a) * r * (sc[key] / max)},${cy + Math.sin(a) * r * (sc[key] / max)}`;
  }).join(" ");
  const axes = keys.map((key, i) => {
    const a = -Math.PI / 2 + i * Math.PI * 2 / keys.length;
    return `<line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(a) * r}" y2="${cy + Math.sin(a) * r}" stroke="#d9e2ea"/><text x="${cx + Math.cos(a) * (r + 24)}" y="${cy + Math.sin(a) * (r + 24)}" text-anchor="middle" dominant-baseline="middle" font-size="13" font-weight="800" fill="${hollandTypes[key].color}">${key}</text>`;
  }).join("");
  return `<svg viewBox="0 0 320 320" role="img" aria-label="霍兰德兴趣雷达图">${[0.33, 0.66, 1].map((s) => `<polygon points="${polygon(s)}" fill="none" stroke="#d9e2ea"/>`).join("")}${axes}<polygon points="${points}" fill="rgba(43,111,232,.24)" stroke="#2b6fe8" stroke-width="3"/></svg>`;
}

function majorCard(major, selected) {
  return `
    <button class="major-card ${selected ? "selected" : ""}" data-major="${major.name}">
      <div><h3>${major.name}</h3><p>${major.careers}</p><div class="major-meta"><span class="tag">${major.discipline}</span><span class="tag">${major.code.join("")}</span><span class="tag">${major.salary}薪资热度</span></div></div>
      <div class="score-ring" style="--score:${major.match}%"><span>${major.match}</span></div>
    </button>`;
}

function majorDetail(major) {
  return `
    <div class="detail-panel">
      <h3>${major.name}详情</h3>
      <div class="detail-grid">
        <div class="detail-item"><b>核心课程</b><span>${major.courses}</span></div>
        <div class="detail-item"><b>就业方向</b><span>${major.careers}</span></div>
        <div class="detail-item"><b>薪资热度</b><span>${major.salary}</span></div>
        <div class="detail-item"><b>适配性格</b><span>${major.code.map((k) => hollandTypes[k].name).join("、")}</span></div>
        <div class="detail-item"><b>适合人群</b><span>${major.code.map((k) => hollandTypes[k].desc).join(" ")}</span></div>
        <div class="detail-item"><b>风险提示</b><span>${major.risk}</span></div>
      </div>
    </div>`;
}

function lockedPreview(count) {
  return `<div class="locked-card"><div><h3>还有 ${count} 个高匹配专业未展示</h3><p>完整版会继续展开专业适配原因、课程难度、就业方向、薪资热度和风险提示。</p></div><button class="button-primary" data-action="pay">9.9 解锁</button></div>`;
}

function lockedDetail(major) {
  return `
    <div class="detail-panel locked-detail">
      <h3>${major.name}详情</h3>
      <div class="detail-grid">
        <div class="detail-item"><b>免费可看</b><span>${major.discipline} · 匹配度较高 · ${major.code.join("")} 画像</span></div>
        <div class="detail-item blur"><b>核心课程</b><span>${major.courses}</span></div>
        <div class="detail-item blur"><b>就业方向</b><span>${major.careers}</span></div>
      </div>
      <div class="unlock-panel"><b>解锁完整解读</b><span>查看课程、就业、薪资热度、风险提示、适配原因和保存完整报告。</span><button class="button-primary" data-action="pay">支付 9.9 解锁</button></div>
    </div>`;
}

function renderLibrary() {
  const matched = matchMajors();
  renderShell(`
    <section class="section">
      <div class="section-head"><div><h2>专业库</h2><p>这里展示按当前性格画像排序后的专业方向。免费版可预览，完整版开放全部详情。</p></div></div>
      <div class="planner-panel">
        <h3>${hollandCode()} 画像 · ${state.unlocked ? "完整专业库" : "免费预览"}</h3>
        ${state.unlocked ? `<div class="major-list library-list">${matched.map((m) => majorCard(m, false)).join("")}</div>` : `<div class="locked-card planner-lock"><div><h3>完整专业库属于完整版</h3><p>免费版先给出前三个方向，完整版展示全部专业排序、每个专业的适配原因、课程、就业和风险提示。</p></div><button class="button-primary" data-action="pay">9.9 解锁专业库</button></div>`}
      </div>
    </section>`);
}

function renderProfile() {
  renderShell(`
    <section class="section">
      <div class="section-head"><div><h2>个人档案</h2><p>演示版在本地浏览器保存报告，便于学生和家长回看。</p></div></div>
      <div class="profile-panel">
        ${studentPanel()}
        <h3 class="saved-title">已保存报告</h3>
        <div class="profile-grid">${state.saved.length ? state.saved.map((item) => `<div class="mini-card"><strong>${item.code}</strong><span>${item.time}<br>${item.top}</span></div>`).join("") : `<div class="empty-state">暂无保存记录。完成测评后可在匹配报告页保存。</div>`}</div>
      </div>
    </section>`);
  bindProfileForm();
}

function paywallModal() {
  return `
    <div class="modal-backdrop" data-action="close-paywall">
      <div class="pay-modal" role="dialog" aria-modal="true" aria-label="解锁完整版" data-modal>
        <h2>解锁完整匹配报告</h2>
        <p>一次支付 9.9 元，开放完整专业排序、专业详情、适配原因、风险提示和本地保存。</p>
        <div class="price-row"><strong>￥9.9</strong><span>演示版点击即可解锁；正式上线需接入真实支付与订单校验。</span></div>
        <div class="unlock-list"><span>完整专业库推荐</span><span>专业适配原因</span><span>课程与就业解读</span><span>填报风险提示</span></div>
        <div class="modal-actions"><button class="button-secondary" data-action="close-paywall">先不解锁</button><button class="button-primary" data-action="unlock">模拟支付并解锁</button></div>
      </div>
    </div>`;
}

function bindCommon() {
  document.querySelectorAll("[data-view]").forEach((el) => el.addEventListener("click", () => { state.view = el.dataset.view; render(); window.scrollTo({ top: 0, behavior: "smooth" }); }));
  document.querySelectorAll("[data-action='start']").forEach((el) => el.addEventListener("click", () => { state.view = "quiz"; render(); }));
  document.querySelectorAll("[data-action='reset']").forEach((el) => el.addEventListener("click", () => { state.answers = Array(questions.length).fill(0); state.current = 0; renderQuiz(); }));
  document.querySelectorAll("[data-answer]").forEach((el) => el.addEventListener("click", () => { state.answers[state.current] = Number(el.dataset.answer); if (state.current < questions.length - 1) state.current += 1; renderQuiz(); }));
  document.querySelectorAll("[data-action='prev']").forEach((el) => el.addEventListener("click", () => { state.current = Math.max(0, state.current - 1); renderQuiz(); }));
  document.querySelectorAll("[data-action='next']").forEach((el) => el.addEventListener("click", () => { if (!state.answers[state.current]) state.answers[state.current] = 3; if (state.current < questions.length - 1) { state.current += 1; renderQuiz(); } else { state.view = "results"; renderResults(); } }));
  document.querySelectorAll("[data-major]").forEach((el) => el.addEventListener("click", () => { state.selectedMajor = el.dataset.major; state.view = "results"; renderResults(); }));
  document.querySelectorAll("[data-action='pay']").forEach((el) => el.addEventListener("click", () => { state.showPaywall = true; render(); }));
  document.querySelectorAll("[data-action='close-paywall']").forEach((el) => el.addEventListener("click", (event) => { if (event.target.dataset.action === "close-paywall") { state.showPaywall = false; render(); } }));
  document.querySelectorAll("[data-action='unlock']").forEach((el) => el.addEventListener("click", () => { state.unlocked = true; state.showPaywall = false; saveLocal(); render(); }));
  document.querySelectorAll("[data-action='save']").forEach((el) => el.addEventListener("click", () => { state.saved.unshift({ code: hollandCode(), top: matchMajors()[0].name, time: new Date().toLocaleString("zh-CN") }); saveLocal(); el.textContent = "已保存"; }));
}

function bindProfileForm() {
  document.querySelectorAll("[data-field]").forEach((el) => {
    const update = () => { state.profile[el.dataset.field] = el.value; saveLocal(); };
    el.addEventListener("input", update);
    el.addEventListener("change", update);
  });
}

function saveLocal() {
  localStorage.setItem("major-match-2026", JSON.stringify({ answers: state.answers, profile: state.profile, saved: state.saved, unlocked: state.unlocked }));
}

function loadLocal() {
  try {
    const data = JSON.parse(localStorage.getItem("major-match-2026") || "{}");
    if (data.answers) state.answers = data.answers;
    if (data.profile) state.profile = { ...state.profile, ...data.profile };
    if (data.saved) state.saved = data.saved;
    if (typeof data.unlocked === "boolean") state.unlocked = data.unlocked;
  } catch {
    localStorage.removeItem("major-match-2026");
  }
}

function render() {
  if (state.view === "quiz") return renderQuiz();
  if (state.view === "results") return renderResults();
  if (state.view === "library") return renderLibrary();
  if (state.view === "profile") return renderProfile();
  return renderHome();
}

loadLocal();
render();
