import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Flower2,
  Images,
  Leaf,
  MapPin,
  Menu,
  Search,
  SlidersHorizontal,
  Sprout,
  Sun,
  Trees,
  X,
} from "lucide-react";
import "./App.css";
import Gallery from "./Gallery";

const photos = {
  autumn: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891",
  gold: "https://images.unsplash.com/photo-1445964047600-cdbdb873673d",
  blossom: "https://images.unsplash.com/photo-1522383225653-ed111181a951",
  forest: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  river: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8",
};
const image = (key, width = 900) =>
  `${photos[key]}?auto=format&fit=crop&w=${width}&q=85`;
const districts = [
  ["Patna", "Patna", "Riverfront & heritage", "river", "Ganga riverfront"],
  ["Nalanda", "Patna", "Hills & heritage", "gold", "Rajgir hills"],
  ["Gaya", "Magadh", "Sacred landscapes", "blossom", "Bodh Gaya"],
  [
    "West Champaran",
    "Tirhut",
    "Forests & wildlife",
    "forest",
    "Valmiki Tiger Reserve",
  ],
  [
    "Bhagalpur",
    "Bhagalpur",
    "River landscapes",
    "river",
    "Vikramshila heritage",
  ],
  [
    "Madhubani",
    "Darbhanga",
    "Art & countryside",
    "blossom",
    "Mithila art traditions",
  ],
  ["Araria", "Purnia"],
  ["Arwal", "Magadh"],
  ["Aurangabad", "Magadh"],
  ["Banka", "Bhagalpur"],
  ["Begusarai", "Munger"],
  ["Bhojpur", "Patna"],
  ["Buxar", "Patna"],
  ["Darbhanga", "Darbhanga"],
  ["East Champaran", "Tirhut"],
  ["Gopalganj", "Saran"],
  ["Jamui", "Munger"],
  ["Jehanabad", "Magadh"],
  ["Kaimur", "Patna"],
  ["Katihar", "Purnia"],
  ["Khagaria", "Munger"],
  ["Kishanganj", "Purnia"],
  ["Lakhisarai", "Munger"],
  ["Madhepura", "Kosi"],
  ["Munger", "Munger"],
  ["Muzaffarpur", "Tirhut"],
  ["Nawada", "Magadh"],
  ["Purnia", "Purnia"],
  ["Rohtas", "Patna"],
  ["Saharsa", "Kosi"],
  ["Samastipur", "Darbhanga"],
  ["Saran", "Saran"],
  ["Sheikhpura", "Munger"],
  ["Sheohar", "Tirhut"],
  ["Sitamarhi", "Tirhut"],
  ["Siwan", "Saran"],
  ["Supaul", "Kosi"],
  ["Vaishali", "Tirhut"],
].map(
  ([
    name,
    division,
    landscape = "Local landscapes",
    photo = "autumn",
    highlight = "Discover local heritage",
  ]) => ({ name, division, landscape, photo, highlight }),
);
const seasons = [
  { id: "All seasons", icon: Sun, label: "All seasons" },
  { id: "Autumn", icon: Leaf, label: "Autumn colours" },
  { id: "Blossom", icon: Flower2, label: "Cherry blossoms" },
  { id: "Green", icon: Trees, label: "Evergreen escapes" },
];
const phases = [
  [
    "Listen & survey",
    "Months 1-2",
    "Map public sites, secure landowner permissions, and review soil, drainage and local biodiversity with the district forest office.",
  ],
  [
    "Choose & prepare",
    "Months 3-4",
    "Ask local horticulturists to select locally suitable species. Confirm nursery stock, water access, maintenance partners and a site-specific budget.",
  ],
  [
    "Plant with the rains",
    "Local monsoon window",
    "Plant only after local rainfall and site readiness are confirmed. Arrange guards, mulch and a named caretaker for each planting site.",
  ],
  [
    "Care & measure",
    "At least 3 years",
    "Maintain watering and protection, record survival after each season, and replace losses with expert guidance. Publish observations, not assumed impact.",
  ],
];
function readSaved() {
  try {
    const value = JSON.parse(localStorage.getItem("bihar-saved") || "[]");
    return Array.isArray(value)
      ? value.filter((name) =>
          districts.some((district) => district.name === name),
        )
      : [];
  } catch {
    return [];
  }
}

function App() {
  const [tab, setTab] = useState("Explore districts");
  const [season, setSeason] = useState("All seasons");
  const [query, setQuery] = useState("");
  const [division, setDivision] = useState("All divisions");
  const [saved, setSaved] = useState(readSaved);
  const [onlySaved, setOnlySaved] = useState(false);
  const [selected, setSelected] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [limit, setLimit] = useState(6);
  const [hero, setHero] = useState(0);
  const [notice, setNotice] = useState("");
  const [planDistrict, setPlanDistrict] = useState("Patna");
  const [treeCount, setTreeCount] = useState(50);
  const [completed, setCompleted] = useState([]);
  const filtered = districts.filter(
    (district) =>
      district.name.toLowerCase().includes(query.toLowerCase()) &&
      (division === "All divisions" || district.division === division) &&
      (!onlySaved || saved.includes(district.name)),
  );
  const heroPhotos = ["autumn", "blossom", "forest"];
  function navigate(next) {
    setTab(next);
    setMenuOpen(false);
    document.getElementById("discover")?.scrollIntoView({ behavior: "smooth" });
  }
  function toggleSaved(name) {
    const next = saved.includes(name)
      ? saved.filter((item) => item !== name)
      : [...saved, name];
    setSaved(next);
    try {
      localStorage.setItem("bihar-saved", JSON.stringify(next));
    } catch {
      setNotice(
        "Browser storage is unavailable. Saved places will last for this session.",
      );
    }
  }
  function downloadPlan() {
    const text = `BIHAR IN BLOOM | PERSONAL DRAFT\nDistrict: ${planDistrict}\nProposed trees: ${treeCount}\nNot a government project or approved planting commitment.\n\n${phases.map((phase, index) => `${index + 1}. ${phase[0]} (${phase[1]})\n${phase[2]}\nStatus: ${completed.includes(index) ? "Reviewed" : "To review"}`).join("\n\n")}\n\nSpecies and seasonal colour require local expert assessment. Temperate cherry cultivars may not suit Bihar's climate. Prioritize locally appropriate species.\nSources: https://state.bihar.gov.in/forest/ and https://tourism.bihar.gov.in/`;
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `bihar-${planDistrict.toLowerCase().replaceAll(" ", "-")}-draft.txt`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("Draft download requested. Check your browser's downloads.");
  }
  return (
    <>
      <a className="skip-link" href="#discover">
        Skip to explore
      </a>
      <header className="header">
        <a className="brand" href="#" aria-label="Bihar in Bloom home">
          <span className="brand-icon">
            <Sprout size={27} />
          </span>
          <span>
            Bihar<span className="brand-light"> in bloom</span>
            <small>ROOTED IN BEAUTY. GROWING TOGETHER.</small>
          </span>
        </a>
        <nav
          className={menuOpen ? "main-nav open" : "main-nav"}
          aria-label="Main navigation"
        >
          {[
            "Discover Bihar",
            "The seasons",
            "Photo gallery",
            "Planting roadmap",
            "Our vision",
          ].map((label, index) => (
            <button
              key={label}
              className={
                index === 0 && tab === "Explore districts" ? "nav-active" : ""
              }
              onClick={() =>
                navigate(
                  [
                    "Explore districts",
                    "Seasonal stories",
                    "Photo gallery",
                    "Planting roadmap",
                    "Our vision",
                  ][index],
                )
              }
            >
              {label}
            </button>
          ))}
        </nav>
        <button
          className="saved-header"
          onClick={() => {
            setOnlySaved(true);
            navigate("Explore districts");
          }}
          title="View saved districts"
        >
          <Bookmark size={17} />
          <span>My saved places</span>
          {saved.length > 0 && <b>{saved.length}</b>}
        </button>
        <button
          className="menu-toggle icon-button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu />
        </button>
      </header>

      <main>
        <section className="hero" aria-label="Bihar in bloom">
          <img
            key={hero}
            className="hero-image"
            src={image(heroPhotos[hero], 3840)}
            alt={
              [
                "A quiet road beneath golden autumn trees",
                "Pink cherry blossom trees in spring",
                "Sunlit green woodland",
              ][hero]
            }
            fetchPriority="high"
          />
          <div className="hero-shade" />
          <div className="hero-content">
            <span className="eyebrow hero-eyebrow">
              <span /> A NEW PERSPECTIVE ON BIHAR
            </span>
            <h1>
              Bihar, <em>in bloom.</em>
            </h1>
            <p>
              A land of timeless stories.
              <br />A future rooted in a million possibilities.
            </p>
            <button
              className="button button-white"
              onClick={() => {
                setOnlySaved(false);
                navigate("Explore districts");
              }}
            >
              Find your beautiful Bihar <ArrowUpRight size={18} />
            </button>
            <div className="hero-bottom-line">
              <span>
                <MapPin size={14} /> 38 districts. Endless discoveries.
              </span>
              <span className="hero-credit">
                Seasonal inspiration photography
              </span>
            </div>
          </div>
          <div className="hero-pagination">
            <span>
              0{hero + 1}
              <i> / 03</i>
            </span>
            <button
              className="glass-button"
              aria-label="Previous landscape"
              onClick={() => setHero((hero + 2) % 3)}
            >
              <ChevronLeft size={19} />
            </button>
            <button
              className="glass-button"
              aria-label="Next landscape"
              onClick={() => setHero((hero + 1) % 3)}
            >
              <ChevronRight size={19} />
            </button>
          </div>
          <span className="vertical-label">
            A MORE BEAUTIFUL TOMORROW STARTS HERE
          </span>
        </section>

        <section className="intro-strip" aria-label="Project highlights">
          <div>
            <span className="intro-icon">
              <Leaf size={24} />
            </span>
            <p>
              Rediscover our roots.
              <br />
              <strong>Reimagine our landscapes.</strong>
            </p>
          </div>
          <div className="stat">
            <strong>38</strong>
            <span>Districts to discover</span>
          </div>
          <div className="stat">
            <strong>4</strong>
            <span>Seasons of wonder</span>
          </div>
          <div className="stat">
            <strong>1</strong>
            <span>Shared green vision</span>
          </div>
          <a href="#discover">
            Every district has a story{" "}
            <ArrowRight size={17} className="down-arrow" />
          </a>
        </section>

        <section id="discover" className="discovery section-width">
          <div className="section-top">
            <div>
              <span className="eyebrow green">
                THE BEAUTY IS CLOSER THAN YOU THINK
              </span>
              <h2>
                A different Bihar.
                <br className="mobile-break" /> In every direction.
              </h2>
            </div>
            <p>
              From the foothills of Valmiki to the banks of the Ganga,
              <br className="desktop-break" /> find a place that stays with you.
            </p>
          </div>
          <div
            className="tabs"
            role="tablist"
            aria-label="Discover Bihar views"
            onKeyDown={(event) => {
              if (
                !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
              )
                return;
              event.preventDefault();
              const buttons = [
                ...event.currentTarget.querySelectorAll('[role="tab"]'),
              ];
              const current = buttons.indexOf(document.activeElement);
              const next =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? buttons.length - 1
                    : (current +
                        (event.key === "ArrowRight" ? 1 : -1) +
                        buttons.length) %
                      buttons.length;
              buttons[next].focus();
              buttons[next].click();
            }}
          >
            {[
              ["Explore districts", MapPin],
              ["Seasonal stories", Leaf],
              ["Photo gallery", Images],
              ["Planting roadmap", Sprout],
            ].map(([label, Icon]) => (
              <button
                key={label}
                role="tab"
                id={`tab-${label.replaceAll(" ", "-")}`}
                aria-selected={tab === label}
                aria-controls="view-panel"
                tabIndex={
                  tab === label ||
                  (tab === "Our vision" && label === "Explore districts")
                    ? 0
                    : -1
                }
                className={tab === label ? "active" : ""}
                onClick={() => setTab(label)}
              >
                <Icon size={17} />
                {label}
                {label === "Planting roadmap" && (
                  <span className="new-tag">THE VISION</span>
                )}
              </button>
            ))}
          </div>

          <div id="view-panel" role="tabpanel" aria-label={tab}>
            {tab === "Photo gallery" && <Gallery />}
            {tab === "Explore districts" && (
              <>
                <div className="explore-toolbar">
                  <div
                    className="season-filters"
                    aria-label="Seasonal inspiration"
                  >
                    {seasons.map(({ id, icon: Icon, label }) => (
                      <button
                        key={id}
                        onClick={() => setSeason(id)}
                        aria-pressed={season === id}
                        className={season === id ? "selected" : ""}
                      >
                        <Icon size={15} />
                        {label}
                      </button>
                    ))}
                  </div>
                  <label className="search-box">
                    <Search size={17} />
                    <input
                      aria-label="Search districts"
                      placeholder="Find a district..."
                      value={query}
                      onChange={(event) => {
                        setQuery(event.target.value);
                        setLimit(6);
                      }}
                    />
                    {query && (
                      <button
                        className="icon-button"
                        aria-label="Clear search"
                        onClick={() => setQuery("")}
                      >
                        <X size={15} />
                      </button>
                    )}
                  </label>
                </div>
                <div className="results-line">
                  <p>
                    <strong>{filtered.length} districts</strong> to make your
                    own{" "}
                    <span>
                      {season !== "All seasons"
                        ? ` / ${season === "Green" ? "Evergreen" : season} inspiration`
                        : "/ Start somewhere beautiful"}
                    </span>
                  </p>
                  <div className="result-actions">
                    <button
                      className={
                        onlySaved ? "saved-filter enabled" : "saved-filter"
                      }
                      onClick={() => setOnlySaved(!onlySaved)}
                      aria-pressed={onlySaved}
                    >
                      <Bookmark size={14} /> Saved
                      {onlySaved && <Check size={13} />}
                    </button>
                    <label className="division-select">
                      <SlidersHorizontal size={14} />
                      <select
                        aria-label="Filter by division"
                        value={division}
                        onChange={(event) => {
                          setDivision(event.target.value);
                          setLimit(6);
                        }}
                      >
                        <option>All divisions</option>
                        {[
                          ...new Set(
                            districts.map((district) => district.division),
                          ),
                        ]
                          .sort()
                          .map((value) => (
                            <option key={value}>{value}</option>
                          ))}
                      </select>
                      <ChevronDown size={13} />
                    </label>
                  </div>
                </div>
                <div className="district-grid">
                  {filtered.slice(0, limit).map((district, index) => {
                    const photo =
                      season === "Autumn"
                        ? index % 2
                          ? "gold"
                          : "autumn"
                        : season === "Blossom"
                          ? "blossom"
                          : season === "Green"
                            ? "forest"
                            : district.photo;
                    return (
                      <article className="district-card" key={district.name}>
                        <div className="card-image-wrap">
                          <button
                            className="card-photo-button"
                            onClick={() => setSelected(district)}
                            aria-label={`Explore ${district.name}`}
                          >
                            <img
                              src={image(photo)}
                              alt={`${season === "Blossom" || photo === "blossom" ? "Flowering" : "Woodland"} landscape inspiration for ${district.name}; not a photograph of the district`}
                              loading="lazy"
                            />
                          </button>
                          <span className={`photo-tag tag-${photo}`}>
                            <span />
                            {photo === "blossom"
                              ? "BLOSSOM INSPIRATION"
                              : photo === "forest"
                                ? "INTO THE GREEN"
                                : photo === "gold" || photo === "autumn"
                                  ? "AUTUMN INSPIRATION"
                                  : "NATURE & STILLNESS"}
                          </span>
                          <button
                            className={`bookmark-button ${saved.includes(district.name) ? "is-saved" : ""}`}
                            title={
                              saved.includes(district.name)
                                ? "Remove saved district"
                                : "Save district"
                            }
                            aria-label={`${saved.includes(district.name) ? "Unsave" : "Save"} ${district.name}`}
                            aria-pressed={saved.includes(district.name)}
                            onClick={() => toggleSaved(district.name)}
                          >
                            <Bookmark
                              size={17}
                              fill={
                                saved.includes(district.name)
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          </button>
                          <span className="image-note">
                            Landscape inspiration
                          </span>
                        </div>
                        <div className="card-content">
                          <div>
                            <span className="district-location">
                              <MapPin size={12} />{" "}
                              {district.division.toUpperCase()} DIVISION
                            </span>
                            <h3>
                              <button onClick={() => setSelected(district)}>
                                {district.name}
                              </button>
                            </h3>
                            <p>{district.landscape}</p>
                          </div>
                          <button
                            className="card-arrow"
                            aria-label={`View ${district.name} details`}
                            onClick={() => setSelected(district)}
                          >
                            <ArrowUpRight size={20} />
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
                {filtered.length === 0 && (
                  <div className="empty-state">
                    <Search size={28} />
                    <h3>No districts found</h3>
                    <p>Try another name or reset your filters.</p>
                    <button
                      className="button button-green"
                      onClick={() => {
                        setQuery("");
                        setDivision("All divisions");
                        setOnlySaved(false);
                      }}
                    >
                      Reset filters
                    </button>
                  </div>
                )}
                {filtered.length > limit && (
                  <div className="load-more">
                    <button
                      className="button button-outline"
                      onClick={() => setLimit(limit + 12)}
                    >
                      Discover more districts <ArrowRight size={16} />
                    </button>
                    <span>
                      Showing {Math.min(limit, filtered.length)} of{" "}
                      {filtered.length} districts
                    </span>
                  </div>
                )}
              </>
            )}

            {tab === "Seasonal stories" && (
              <section className="seasonal-view">
                <div className="view-heading">
                  <h3>Nature has its own calendar.</h3>
                  <p>
                    Seasonal inspiration, with a little room for possibility.
                  </p>
                </div>
                <div className="story-grid">
                  {[
                    [
                      "gold",
                      "Autumn, imagined",
                      "A canopy of warm colour",
                      "Temperate autumn forests are a visual reference, not a promise of Bihar foliage. Explore locally suitable deciduous trees with a horticulturist.",
                    ],
                    [
                      "blossom",
                      "A delicate possibility",
                      "The cherry blossom dream",
                      "Cherry cultivars have specific chilling and climate needs. Any Bihar trial needs expert cultivar selection, site assessment and small-scale monitoring.",
                    ],
                    [
                      "forest",
                      "Rooted in the local",
                      "A greener kind of beautiful",
                      "Start with local ecology. Ask the district forest office about appropriate native shade, flowering and habitat trees before planting.",
                    ],
                  ].map(([photo, eyebrow, title, copy]) => (
                    <article className="story" key={photo}>
                      <img
                        src={image(photo)}
                        alt={`${eyebrow}, seasonal reference photography`}
                        loading="lazy"
                      />
                      <span className="eyebrow green">{eyebrow}</span>
                      <h3>{title}</h3>
                      <p>{copy}</p>
                      <button
                        className="text-link"
                        onClick={() => navigate("Planting roadmap")}
                      >
                        Explore the roadmap <ArrowUpRight size={16} />
                      </button>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {tab === "Planting roadmap" && (
              <section className="roadmap-view">
                <div className="view-heading">
                  <span className="eyebrow green">
                    A COMMUNITY CONCEPT, NOT AN APPROVED SCHEME
                  </span>
                  <h3>Good roots. A thoughtful roadmap.</h3>
                  <p>
                    A personal planning framework. Every site and species needs
                    local approval.
                  </p>
                </div>
                <div className="planner-controls">
                  <label>
                    YOUR DISTRICT
                    <select
                      aria-label="Plan district"
                      value={planDistrict}
                      onChange={(event) => {
                        setPlanDistrict(event.target.value);
                        setCompleted([]);
                      }}
                    >
                      {[...districts]
                        .sort((first, second) =>
                          first.name.localeCompare(second.name),
                        )
                        .map((district) => (
                          <option key={district.name}>{district.name}</option>
                        ))}
                    </select>
                  </label>
                  <label>
                    PROPOSED TREES
                    <input
                      aria-label="Proposed trees"
                      type="number"
                      min="1"
                      max="10000"
                      value={treeCount}
                      onChange={(event) =>
                        setTreeCount(
                          event.target.value === ""
                            ? ""
                            : Math.min(
                                10000,
                                Math.max(1, Number(event.target.value)),
                              ),
                        )
                      }
                      onBlur={() => {
                        if (!treeCount) setTreeCount(1);
                      }}
                    />
                  </label>
                  <button
                    className="button button-green"
                    onClick={downloadPlan}
                  >
                    <Download size={17} /> Export draft plan
                  </button>
                </div>
                <div className="phase-grid">
                  {phases.map(([title, time, copy], index) => (
                    <article className="phase" key={title}>
                      <span className="phase-number">0{index + 1}</span>
                      <span className="phase-time">{time}</span>
                      <h4>{title}</h4>
                      <p>{copy}</p>
                      <label className="review-check">
                        <input
                          type="checkbox"
                          checked={completed.includes(index)}
                          onChange={() =>
                            setCompleted(
                              completed.includes(index)
                                ? completed.filter((item) => item !== index)
                                : [...completed, index],
                            )
                          }
                        />{" "}
                        Reviewed for my plan
                      </label>
                    </article>
                  ))}
                </div>
                <p className="planning-note">
                  <Sprout size={20} /> {completed.length} of 4 phases reviewed.
                  No trees are booked or planted through this website. Consult
                  the{" "}
                  <a
                    href="https://state.bihar.gov.in/forest/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Bihar Environment & Forest Department{" "}
                    <ArrowUpRight size={13} />
                  </a>{" "}
                  before acting.
                </p>
              </section>
            )}

            {tab === "Our vision" && (
              <section className="vision-view">
                <Sprout size={38} />
                <span className="eyebrow green">
                  BEAUTY WITH RESPONSIBILITY
                </span>
                <h3>
                  A love letter to Bihar.
                  <br />A little care for its tomorrow.
                </h3>
                <p>
                  Bihar in Bloom is an independent discovery and
                  planting-concept project, not a government initiative. We
                  celebrate the state's landscapes while imagining greener
                  public spaces, district by district.
                </p>
                <p>
                  Our seasonal photographs are inspiration from Unsplash, not
                  verified images of Bihar. Autumn colour and cherry blossoms
                  are design references, not claims about local growing
                  conditions. Local biodiversity, water availability and
                  long-term care must come first.
                </p>
                <div className="photo-sources">
                  <h4>Seasonal photo sources</h4>
                  {Object.keys(photos).map((photo) => (
                    <a
                      key={photo}
                      className="text-link"
                      href={image(photo, 3840)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {photo === "gold"
                        ? "Autumn canopy"
                        : photo === "river"
                          ? "Forest lake"
                          : photo === "blossom"
                            ? "Cherry blossoms"
                            : photo === "forest"
                              ? "Green woodland"
                              : "Autumn avenue"}{" "}
                      · 4K image <ArrowUpRight size={14} />
                    </a>
                  ))}
                  <a
                    className="text-link"
                    href="https://bihar.s3waas.gov.in/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Official Bihar district directory <ArrowUpRight size={14} />
                  </a>
                </div>
                <a
                  className="button button-green"
                  href="https://tourism.bihar.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Explore official Bihar Tourism <ArrowUpRight size={17} />
                </a>
              </section>
            )}
          </div>
        </section>

        <section className="vision-band">
          <div className="vision-band-image">
            <img
              src={image("gold", 1600)}
              alt="Tall woodland trees, inspiration for greener public spaces"
              loading="lazy"
            />
          </div>
          <div className="vision-band-content">
            <span className="eyebrow">
              NOT JUST A PLACE TO VISIT. A PLACE TO NURTURE.
            </span>
            <h2>
              What if beauty
              <br />
              could take root?
            </h2>
            <p>
              Imagine shaded streets, flowering neighbourhoods, and communities
              growing together. A thoughtful beginning for every district.
            </p>
            <button
              className="button button-white"
              onClick={() => navigate("Planting roadmap")}
            >
              Explore our planting vision <Sprout size={17} />
            </button>
            <span className="concept-note">
              Community concept. Locally informed. Care comes first.
            </span>
          </div>
        </section>
        <section className="closing section-width">
          <span className="eyebrow green">THE JOURNEY IS ONLY BEGINNING</span>
          <h2>
            Some places you visit.
            <br />
            <em>Some places you grow with.</em>
          </h2>
          <button
            className="text-link"
            onClick={() => {
              setOnlySaved(false);
              navigate("Explore districts");
            }}
          >
            Find your place in Bihar <ArrowRight size={17} />
          </button>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-main">
          <a className="brand" href="#">
            <Sprout size={26} />
            <span>
              Bihar<span className="brand-light"> in bloom</span>
            </span>
          </a>
          <span>An independent vision for a more beautiful Bihar.</span>
          <div>
            <button onClick={() => navigate("Our vision")}>
              About & sources
            </button>
            <a
              href="https://tourism.bihar.gov.in/"
              target="_blank"
              rel="noreferrer"
            >
              Bihar Tourism <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Made with care, for Bihar.</span>
          <span>
            Inspiration photography:{" "}
            <a href="https://unsplash.com" target="_blank" rel="noreferrer">
              Unsplash
            </a>{" "}
            ·{" "}
            <a
              href="https://unsplash.com/license"
              target="_blank"
              rel="noreferrer"
            >
              Image license
            </a>{" "}
            ·{" "}
            <a
              href="https://state.bihar.gov.in/main/CitizenHome.html"
              target="_blank"
              rel="noreferrer"
            >
              Official state portal
            </a>
          </span>
        </div>
      </footer>

      {selected && (
        <div
          className="modal-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <dialog
            className="district-modal"
            open
            ref={(element) => {
              if (element && !element.dataset.focused) {
                element.dataset.focused = "true";
                element.querySelector("button")?.focus();
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") setSelected(null);
              if (event.key === "Tab") {
                const items = event.currentTarget.querySelectorAll("button, a");
                const first = items[0];
                const last = items[items.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                  event.preventDefault();
                  last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                  event.preventDefault();
                  first.focus();
                }
              }
            }}
            aria-modal="true"
            aria-labelledby="district-title"
          >
            <button
              className="modal-close icon-button"
              aria-label="Close district details"
              onClick={() => setSelected(null)}
            >
              <X size={22} />
            </button>
            <img
              src={image(selected.photo, 1400)}
              alt="Landscape inspiration, not a district photograph"
            />
            <div className="modal-content">
              <span className="eyebrow green">
                {selected.division} DIVISION · BIHAR
              </span>
              <h2 id="district-title">{selected.name}</h2>
              <p className="modal-highlight">
                <MapPin size={17} />
                {selected.highlight}
              </p>
              <p>
                Discover {selected.name}'s local landscapes and cultural
                heritage through official tourism resources. The photograph
                above is seasonal inspiration, not a verified image of this
                district.
              </p>
              <div className="modal-callout">
                <Sprout size={22} />
                <div>
                  <strong>A greener {selected.name}</strong>
                  <p>
                    Start a draft roadmap with site permissions, locally
                    suitable species and a long-term care plan. Cherry blossoms
                    and autumn colour require expert feasibility review.
                  </p>
                </div>
              </div>
              <div className="modal-actions">
                <button
                  className="button button-green"
                  onClick={() => {
                    setPlanDistrict(selected.name);
                    setSelected(null);
                    navigate("Planting roadmap");
                  }}
                >
                  Plan for this district <ArrowRight size={16} />
                </button>
                <button
                  className="button button-outline"
                  onClick={() => toggleSaved(selected.name)}
                >
                  <Bookmark size={16} />
                  {saved.includes(selected.name) ? "Saved" : "Save place"}
                </button>
              </div>
              <a
                className="text-link"
                href="https://tourism.bihar.gov.in/"
                target="_blank"
                rel="noreferrer"
              >
                Visit official Bihar Tourism <ArrowUpRight size={15} />
              </a>
            </div>
          </dialog>
        </div>
      )}
      {notice && (
        <div className="toast" role="status">
          <Check size={18} />
          <span>{notice}</span>
          <button
            className="icon-button"
            aria-label="Dismiss notification"
            onClick={() => setNotice("")}
          >
            <X size={16} />
          </button>
        </div>
      )}
    </>
  );
}
export default App;
