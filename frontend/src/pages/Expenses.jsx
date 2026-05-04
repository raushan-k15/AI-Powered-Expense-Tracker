import React,{
  useEffect,
  useState
} from "react";

import API from "../services/api";

import ExpenseFilters from "../components/expenses/ExpenseFilters";

import ExpenseTable from "../components/expenses/ExpenseTable";

const Expenses = () => {

  const [expenses,setExpenses] =
    useState([]);

  const [page,setPage] =
    useState(0);

  const [totalPages,setTotalPages] =
    useState(0);

  const [search,setSearch] =
    useState("");

  const [sortBy,setSortBy] =
    useState("date");

  const [direction,setDirection] =
    useState("desc");


  useEffect(() => {

    loadExpenses();

  },[
    page,
    search,
    sortBy,
    direction
  ]);


  const loadExpenses =
    async () => {

      try{

        const response =
          await API.get(

`/expenses/filter?page=${page}&size=20&search=${search}&sortBy=${sortBy}&direction=${direction}`

          );

        setExpenses(
          response.data.content
        );

        setTotalPages(
          response.data.totalPages
        );

      }

      catch(error){

        console.log(error);

      }

    };


  return (

    <div>

      <h1 className="text-white text-4xl font-bold mb-8">

        Expenses

      </h1>


      <ExpenseFilters

        search={search}
        setSearch={setSearch}

        sortBy={sortBy}
        setSortBy={setSortBy}

        direction={direction}
        setDirection={setDirection}

        setPage={setPage}

      />


      <ExpenseTable

        expenses={expenses}

        refreshExpenses={loadExpenses}

      />


      <div className="flex justify-center gap-4 mt-6">

        <button

          disabled={page===0}

          onClick={()=>
            setPage(
              page-1
            )
          }

          className="bg-slate-800 px-4 py-2 rounded-xl"

        >

          Prev

        </button>


        <p className="text-white">

          {page+1} / {totalPages}

        </p>


        <button

          disabled={page+1>=totalPages}

          onClick={()=>
            setPage(
              page+1
            )
          }

          className="bg-slate-800 px-4 py-2 rounded-xl"

        >

          Next

        </button>

      </div>

    </div>

  );

};

export default Expenses;