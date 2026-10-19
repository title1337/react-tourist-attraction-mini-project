import { useState } from "react";

function Display({ trips, onTagClick }) {
  const [copyStatus, setCopyStatus] = useState({});

  if (trips.length === 0) {
    return <p className="display-empty">ไม่พบสถานที่ท่องเที่ยวที่ตรงกับคำค้นหา</p>;
  }

  async function copyTripLink(trip) {
    try {
      await navigator.clipboard.writeText(trip.url);
      setCopyStatus((currentStatus) => ({
        ...currentStatus,
        [trip.eid]: "คัดลอกลิงก์แล้ว",
      }));
    } catch (error) {
      setCopyStatus((currentStatus) => ({
        ...currentStatus,
        [trip.eid]: "คัดลอกไม่สำเร็จ กรุณาลองอีกครั้ง",
      }));
    }
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
            <div className="trip-card-media-row">
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
              <div className="trip-card-share">
                <button
                  className="trip-card-share-button"
                  type="button"
                  aria-label={`คัดลอกลิงก์ ${trip.title}`}
                  onClick={() => copyTripLink(trip)}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 13.5a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.7 1.7M14 10.5a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 19.2l1.7-1.7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {copyStatus[trip.eid] && (
                  <span
                    className={`trip-card-share-status${copyStatus[trip.eid] === "คัดลอกไม่สำเร็จ กรุณาลองอีกครั้ง" ? " is-error" : ""}`}
                    role="status"
                  >
                    {copyStatus[trip.eid]}
                  </span>
                )}
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

export default Display;