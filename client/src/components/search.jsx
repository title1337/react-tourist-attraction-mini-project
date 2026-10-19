function Search({ value, onChange }) {
  return (
    <section className="search-area" aria-label="ค้นหาที่เที่ยว">
      <label htmlFor="destination-search">ค้นหาที่เที่ยว</label>
      <input
        id="destination-search"
        name="keywords"
        type="search"
        placeholder="หาที่เที่ยวแล้วไปกัน ..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </section>
  );
}

export default Search;