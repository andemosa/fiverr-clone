import { useState, useRef } from "react";

import { gigs } from "data";

import GigCard from "@components/Card";

const Gigs = () => {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef<HTMLInputElement | null>(null);
  const maxRef = useRef<HTMLInputElement | null>(null);

  const reSort = (type: string) => {
    setSort(type);
    setOpen(false);
  };

  return (
    <div className="gigs">
      <div className="gigs__container">
        <span className="gigs__breadcrumbs">
          Fiverr &gt; Graphics & Design &gt;{" "}
        </span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Fiverr's AI artists
        </p>
        <div className="gigs__menu">
          <div className="gigs__menu-left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button>Apply</button>
          </div>
          <div className="gigs__menu-right">
            <span className="gigs__menu-sortBy">Sort by</span>
            <div>
              <span className="gigs__menu-sortType">
                {sort === "sales" ? "Best Selling" : "Newest"}
              </span>
              <img
                src="./img/down.webp"
                alt=""
                onClick={() => setOpen(!open)}
              />
            </div>
            {open && (
              <div className="gigs__menu-rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="gigs__cards">
          {gigs.map((gig) => (
            <GigCard key={gig.id} {...gig} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
