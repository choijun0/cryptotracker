import React, {useState} from "react";
import styled from "styled-components";
import {useForm} from "react-hook-form"
import {useSetRecoilState, useRecoilValue} from "recoil";
import {coinSearchQuery} from "../../Atom";
import { useNavigate } from "react-router-dom";
import {queryClient} from "../../queryClient"


interface coin {
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  rank: number;
  symbol: string;
  type: string;
}

interface Iform {
  query: string;
  extraError?: string;
}

const SearchCoin = () => {
  const navigate = useNavigate();
  const {register, handleSubmit, formState : {errors}, setError} = useForm<Iform>({
  defaultValues : {
    query : "",
  }
  });
  const setState = useSetRecoilState(coinSearchQuery)
  const formValidation = (data: Iform) => {
    //setError func emerges error and registers error in formState 
    //grobal error
    //setError("extraError", { message: "Server is Local" });

    //Existance & move router);
    const coinList: coin[] | undefined = queryClient.getQueryData('coinList');
    if(coinList){
      const shortList = coinList.slice(0,1000);
      const coinData = shortList.find(element => element.name.toLowerCase() === data.query.toLowerCase());
      if(coinData){
      const state = {
       name: coinData?.name,
      }
      navigate(`/${coinData?.id}`, {state});
      }
      else{
        setState("");
        setError("query", {
          message: "no matched coin",
        })
        navigate('/')
      }
    }
    
  }
  //Log errors of inputs not matched to register function's option
  const onChangeOverRide = (event: React.ChangeEvent<HTMLInputElement>) => {
    register("query").onChange(event);
    //const {query} = watch();
    //setState(query);
    setState(event.target.value);
  }
  
return (
  <>
    <div>
      <form onSubmit={handleSubmit(formValidation)}>
        <input {...register("query", {
    required : false, 
    minLength : {
      value : 3,
      message : "too short at least 3 character"
    },
      })} onChange={onChangeOverRide} placeholder="search coin"/>
        <button>
          Go
        </button>
      </form>
      <span>
        {errors?.query?.message}
      </span>
      <span>
        {errors?.extraError?.message}
      </span>
    </div>
  </>
)
}

export default SearchCoin;