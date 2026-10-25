import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Flower2,
  Images,
  Leaf,
  Maximize2,
  Search,
  Trees,
  X,
} from "lucide-react";

const galleryPhotos = [
  {
    id: "1476820865390-c52aeebb9891",
    title: "The golden avenue",
    category: "Autumn trees",
    description: "A quiet road framed by autumn trees.",
  },
  {
    id: "1445964047600-cdbdb873673d",
    title: "Under an autumn canopy",
    category: "Autumn trees",
    description: "Looking up into a colourful woodland canopy.",
  },
  {
    id: "1760508583739-c88b8a06a3b1",
    title: "A carpet of crimson",
    category: "Autumn trees",
    description: "A path covered in red fallen leaves beneath autumn trees.",
    photographer: "Damir Korotaj",
    source: "https://unsplash.com/photos/3Jeol9xdAhk",
  },
  {
    id: "1508255139162-e1f7b7288ab7",
    title: "Golden larch country",
    category: "Autumn trees",
    description: "Golden larch trees below jagged grey mountain peaks.",
    photographer: "Federica Galli",
    source: "https://unsplash.com/photos/pF1ug8ysTtY",
  },
  {
    id: "1761228742350-41f09f19864c",
    title: "The maple's moment",
    category: "Autumn trees",
    description: "A vibrant maple tree with colourful autumn leaves.",
    photographer: "John Apps",
    source: "https://unsplash.com/photos/VwViDcdWLMU",
  },
  {
    id: "1724344526531-5168ab8b034b",
    title: "The long way home",
    category: "Autumn trees",
    description: "A road lined with trees covered in fall leaves.",
    photographer: "Michael Hamments",
    source: "https://unsplash.com/photos/F9F-4QSSxOg",
  },
  {
    id: "1571514507804-28e1f9ab5b94",
    title: "An autumn promenade",
    category: "Autumn trees",
    description: "Trees beside light posts along a seasonal promenade.",
    photographer: "Daniel J. Schwarz",
    source: "https://unsplash.com/photos/7-oM8eFUkFQ",
  },
  {
    id: "1761897526074-260e1fe3f394",
    title: "Follow the fallen leaves",
    category: "Autumn trees",
    description: "A path through a forest with autumn foliage.",
    photographer: "Benjamin Chambon",
    source: "https://unsplash.com/photos/YE5zGpJLet0",
  },
  {
    id: "1759892588920-b449913d0ffd",
    title: "Where the river wanders",
    category: "Autumn trees",
    description: "A misty autumn forest with a winding river.",
    photographer: "Royce Fonseca",
    source: "https://unsplash.com/photos/EZLEqP08UTA",
  },
  {
    id: "1508144322886-717c284ab392",
    title: "A canopy from above",
    category: "Autumn trees",
    description: "An aerial view of a forest in seasonal colour.",
    photographer: "Luca Bravo",
    source: "https://unsplash.com/photos/A-fubu9QJxE",
  },
  {
    id: "1761228486788-116c786318b4",
    title: "Maple, in full colour",
    category: "Autumn trees",
    description: "A vibrant maple tree with orange and red leaves.",
    photographer: "John Apps",
    source: "https://unsplash.com/photos/erU831FalVc",
  },
  {
    id: "1510065323172-bd8a4e8ae1e2",
    title: "Trees on the horizon",
    category: "Autumn trees",
    description: "A distant view of tall trees in a seasonal landscape.",
    photographer: "Cristina Gottardi",
    source: "https://unsplash.com/photos/B6IJL3Ph7NI",
  },
  {
    id: "1725803884849-b832a0639931",
    title: "The unhurried path",
    category: "Autumn trees",
    description: "A dirt road surrounded by colourful trees.",
    photographer: "Nastia Petruk",
    source: "https://unsplash.com/photos/LyNyFHSPMf8",
  },
  {
    id: "1507100403890-47482dcd79e0",
    title: "Autumn by the water",
    category: "Autumn trees",
    description: "Fall trees beside a body of water in daylight.",
    photographer: "Dan Freeman",
    source: "https://unsplash.com/photos/VAWqURK_Th0",
  },
  {
    id: "1522383225653-ed111181a951",
    title: "A sky full of blossoms",
    category: "Cherry blossoms",
    description: "Cherry trees in bloom, a springtime reference.",
  },
  {
    id: "1441974231531-c6227db76b6e",
    title: "Light through the leaves",
    category: "Green canopies",
    description: "Sunlight falling through a green woodland.",
  },
  {
    id: "1473448912268-2022ce9509d8",
    title: "A quieter kind of green",
    category: "Green canopies",
    description: "A lush forest canopy, full of texture and light.",
  },
  {
    id: "1448375240586-882707db888b",
    title: "Among the tall trees",
    category: "Green canopies",
    description: "Tall trunks and the rhythm of a forest.",
  },
];
const categories = [
  ["All photos", Images],
  ["Autumn trees", Leaf],
  ["Cherry blossoms", Flower2],
  ["Green canopies", Trees],
];
const photoUrl = (photo, width = 800) =>
  `https://images.unsplash.com/photo-${photo.id}?auto=format&fit=crop&w=${width}&q=85`;

export default function Gallery() {
  const [category, setCategory] = useState("All photos");
  const [query, setQuery] = useState("");
  const [activePhoto, setActivePhoto] = useState(null);
  const dialog = useRef(null);
  const filtered = galleryPhotos.filter(
    (photo) =>
      (category === "All photos" || photo.category === category) &&
      `${photo.title} ${photo.category} ${photo.description}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const activeIndex = filtered.findIndex(
    (photo) => photo.id === activePhoto?.id,
  );
  const isOpen = activePhoto !== null;

  useEffect(() => {
    if (!isOpen) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  function changePhoto(direction) {
    setActivePhoto(
      filtered[(activeIndex + direction + filtered.length) % filtered.length],
    );
  }

  return (
    <section className="gallery-view" aria-label="Seasonal photo gallery">
      <div className="gallery-heading">
        <div className="view-heading">
          <span className="eyebrow green">A LITTLE WONDER, FRAME BY FRAME</span>
          <h3>A thousand shades of trees.</h3>
          <p>Golden avenues, soft blossoms, and a world of green.</p>
        </div>
        <span className="gallery-total">
          <Leaf size={18} />
          <strong>
            {
              galleryPhotos.filter((photo) => photo.category === "Autumn trees")
                .length
            }
          </strong>{" "}
          autumn moments
        </span>
      </div>
      <div className="explore-toolbar gallery-toolbar">
        <div className="season-filters" aria-label="Gallery categories">
          {categories.map(([label, Icon]) => (
            <button
              key={label}
              aria-pressed={category === label}
              className={category === label ? "selected" : ""}
              onClick={() => setCategory(label)}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>
        <label className="search-box">
          <Search size={17} />
          <input
            aria-label="Search gallery"
            placeholder="Find a little inspiration..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query && (
            <button
              className="icon-button"
              aria-label="Clear gallery search"
              onClick={() => setQuery("")}
            >
              <X size={15} />
            </button>
          )}
        </label>
      </div>
      <div className="gallery-results">
        <p aria-live="polite">
          <strong>{filtered.length} photographs</strong>
          {category !== "All photos" && ` / ${category}`}
        </p>
        <span>Inspiration photography · Unsplash</span>
      </div>
      <div className="gallery-grid">
        {filtered.map((photo, index) => (
          <figure className="gallery-photo" key={photo.id}>
            <button
              className="gallery-image-button"
              aria-label={`View ${photo.title}`}
              onClick={() => setActivePhoto(photo)}
            >
              <img
                src={photoUrl(photo)}
                alt={photo.description}
                loading="lazy"
                width="800"
                height={index % 3 === 1 ? "1000" : "640"}
              />
              <span className="gallery-zoom">
                <Maximize2 size={18} />
              </span>
              <span className="gallery-image-category">{photo.category}</span>
            </button>
            <figcaption>
              <h4>
                <button onClick={() => setActivePhoto(photo)}>
                  {photo.title}
                </button>
              </h4>
              <span>SEASONAL INSPIRATION</span>
            </figcaption>
          </figure>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="empty-state">
          <Search size={28} />
          <h3>No photographs found</h3>
          <p>Try another search or explore every season.</p>
          <button
            className="button button-green"
            onClick={() => {
              setCategory("All photos");
              setQuery("");
            }}
          >
            Show all photos
          </button>
        </div>
      )}
      <p className="gallery-disclaimer">
        <Leaf size={16} /> A visual planting moodboard, not photographs of Bihar
        or a guarantee of local growing conditions. Autumn colours and cherry
        cultivars need local expert review.
      </p>
      <dialog
        ref={dialog}
        className="gallery-lightbox"
        aria-labelledby="gallery-photo-title"
        onCancel={() => setActivePhoto(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setActivePhoto(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            setActivePhoto(null);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            changePhoto(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            changePhoto(1);
          }
        }}
      >
        {activePhoto && (
          <div className="lightbox-content">
            <div className="lightbox-top">
              <span>
                <Leaf size={17} /> BIHAR IN BLOOM{" "}
                <i>
                  {activeIndex + 1} / {filtered.length}
                </i>
              </span>
              <button
                className="lightbox-icon"
                aria-label="Close gallery photo"
                onClick={() => setActivePhoto(null)}
                autoFocus
              >
                <X size={23} />
              </button>
            </div>
            <div className="lightbox-stage">
              <button
                className="lightbox-icon lightbox-previous"
                aria-label="Previous gallery photo"
                disabled={filtered.length < 2}
                onClick={() => changePhoto(-1)}
              >
                <ChevronLeft size={26} />
              </button>
              <img
                key={activePhoto.id}
                src={photoUrl(activePhoto, 1920)}
                alt={activePhoto.description}
              />
              <button
                className="lightbox-icon lightbox-next"
                aria-label="Next gallery photo"
                disabled={filtered.length < 2}
                onClick={() => changePhoto(1)}
              >
                <ChevronRight size={26} />
              </button>
            </div>
            <div className="lightbox-caption">
              <div>
                <span className="eyebrow">
                  {activePhoto.category} · INSPIRATION, NOT BIHAR
                </span>
                <h3 id="gallery-photo-title">{activePhoto.title}</h3>
                <p>{activePhoto.description}</p>
              </div>
              <a
                className="button button-white"
                href={photoUrl(activePhoto, 3840)}
                target="_blank"
                rel="noreferrer"
              >
                View 4K image <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="lightbox-sources">
              <a
                href={activePhoto.source || photoUrl(activePhoto, 3840)}
                target="_blank"
                rel="noreferrer"
              >
                {activePhoto.photographer
                  ? `Photo by ${activePhoto.photographer} on Unsplash`
                  : "Source image · Unsplash"}{" "}
                <ArrowUpRight size={12} />
              </a>
              <a
                href="https://unsplash.com/license"
                target="_blank"
                rel="noreferrer"
              >
                Image license <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
