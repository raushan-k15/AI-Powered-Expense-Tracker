import React, {
  useState
} from "react";

const ExpenseFilters = ({
  setSearch,
  setSortBy,
  setDirection,
  setPage
}) => {

  const [inputValue, setInputValue] =
    useState("");

  const [sortValue, setSortValue] =
    useState("date");

  const [directionValue, setDirectionValue] =
    useState("desc");


  const handleSearch = () => {

    setSearch(
      inputValue
    );

    setSortBy(
      sortValue
    );

    setDirection(
      directionValue
    );

    setPage(0);

  };


  const handleReset = () => {

    setInputValue("");

    setSearch("");

    setSortBy("date");

    setDirection("desc");

    setSortValue("date");

    setDirectionValue("desc");

    setPage(0);

  };


  return (

    <div className="bg-slate-900 p-6 rounded-3xl mb-8">

      <div className="grid md:grid-cols-5 gap-4">

        <input

          value={inputValue}

          onChange={(e)=>
            setInputValue(
              e.target.value
            )
          }

          placeholder="Search..."

          className="bg-slate-800 text-white p-3 rounded-xl"

        />


        <select

          value={sortValue}

          onChange={(e)=>
            setSortValue(
              e.target.value
            )
          }

          className="bg-slate-800 text-white p-3 rounded-xl"

        >

          <option value="date">

            Date

          </option>

          <option value="amount">

            Amount

          </option>

        </select>


        <select

          value={directionValue}

          onChange={(e)=>
            setDirectionValue(
              e.target.value
            )
          }

          className="bg-slate-800 text-white p-3 rounded-xl"

        >

          <option value="desc">

            Desc

          </option>

          <option value="asc">

            Asc

          </option>

        </select>


        <button

          onClick={handleSearch}

          className="bg-cyan-500 text-white rounded-xl"

        >

          Search

        </button>


        <button

          onClick={handleReset}

          className="bg-red-500 text-white rounded-xl"

        >

          Reset

        </button>

      </div>

    </div>

  );

};

export default ExpenseFilters;