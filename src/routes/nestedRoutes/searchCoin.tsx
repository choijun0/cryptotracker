import React, {useState} from "react";
import styled from "styled-components";
import {useForm} from "react-hook-form"
import {useRecoilState} from "recoil";
import {search_query_manager} from "../../Atom";
import { useNavigate } from "react-router-dom";
import {queryClient} from "../../queryClient"

import {check} from "../CoinList";


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
  const [search_word, set_search_word] = useRecoilState(search_query_manager);
  const navigate = useNavigate();

  //react-hook-form
  const {register, handleSubmit, formState : {errors}, setError} = useForm<Iform>({
  defaultValues : {
    query : "",
  }
  });
  const formValidation = (data: Iform) => {
    //setError func emerges error and registers error in formState 
    //grobal error
    //setError("extraError", { message: "Server is Local" });

    //Existance & move router);
    const coinList: coin[] | undefined = queryClient.getQueryData('coinList');
    const matching_coin: coin[] | undefined = coinList?.filter(coin => check(coin, search_word));
    
    if(matching_coin !== undefined && matching_coin.length > 0){
      const coinData = matching_coin[0]; 
      const state = {
       name: coinData?.name,
      }
      navigate(`/${coinData?.id}`, {state});
    }
    else{
      setError("query", {
        message: "no matched coin",
      })
      navigate('/')
    }
    set_search_word("");
  }
  
  //change 이벤트 발생시 값을 바꿔주기 위한 오버라이딩
  const onChangeOverRide = (event: React.ChangeEvent<HTMLInputElement>) => {
    register("query").onChange(event);
    
    //change recoil state
    const input = event.target.value;
    //limit length is three char
    if(input.trim().length < 3) {
      set_search_word("");
      return;
    }
    set_search_word(event.target.value);
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