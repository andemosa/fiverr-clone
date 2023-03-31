import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import GigCard from "@components/Card";
import LoadingSpinner from "@components/Spinner";

import { axiosInstance } from "@services/index";
import { Gig } from "@customTypes/gig";

const Gigs = () => {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef<HTMLInputElement | null>(null);
  const maxRef = useRef<HTMLInputElement | null>(null);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: (): Promise<Gig[]> =>
      axiosInstance
        .get(
          `/gigs?category=${category ?? ""}&min=${minRef.current?.value}&max=${
            maxRef.current?.value
          }&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  const reSort = (type: string) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };

  return (
    <section className="gigs">
      <div className="gigs__container">
        <span className="gigs__breadcrumbs">
          Fiverr&nbsp;
          {category && <>&gt;&nbsp;{category}&nbsp;&gt;</>}
        </span>
        <h1>{category ? <>{category} Gigs</> : <>All Gigs</>}</h1>
        <p>
          Explore the boundaries of art and technology with Fiverr's sellers
        </p>
        <div className="gigs__menu">
          <div className="gigs__menu-left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
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
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <>Something went wrong</>
          ) : data?.length === 0 ? (
            <>No search results.</>
          ) : (
            data?.map((gig) => <GigCard key={gig._id} {...gig} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default Gigs;
