function Search() {
  return (
    <section className="search-area" aria-label="ค้นหาที่เที่ยว">
      <label htmlFor="destination-search">ค้นหาที่เที่ยว</label>
      <input
        id="destination-search"
        name="keywords"
        type="search"
        placeholder="หาที่เที่ยวแล้วไปกัน ..."
      />
    </section>
  );
}

export default Search;