function Display({ trips, onTagClick }) {
  if (trips.length === 0) {
    return <p className="display-empty">ไม่พบสถานที่ท่องเที่ยวที่ตรงกับคำค้นหา</p>;
  }

  return (
    <section className="display-area" aria-label="ผลการค้นหาสถานที่ท่องเที่ยว">
      {trips.map((trip) => (
        <article className="trip-card" key={trip.eid}>
          {trip.photos?.[0] && (
            <img
              className="trip-card-cover"
              src={trip.photos[0]}
              alt={trip.title}
              loading="lazy"
            />
          )}

          <div className="trip-card-content">
            <h2 className="trip-card-title">
              <a href={trip.url} target="_blank" rel="noreferrer">
                {trip.title}
              </a>
            </h2>
            <p className="trip-card-description">{trip.description}</p>
            <div className="trip-card-tags" aria-label="หมวดหมู่">
              {trip.tags.map((tag) => (
                <button
                  className="trip-card-tag"
                  key={tag}
                  onClick={() => onTagClick(tag)}
                  type="button"
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="trip-card-photos" aria-label="ภาพเพิ่มเติม">
              {trip.photos.slice(1, 4).map((photo, index) => (
                <img
                  className="trip-card-thumbnail"
                  key={photo}
                  src={photo}
                  alt={`${trip.title} ภาพที่ ${index + 2}`}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

export default Display;