import { Fragment, useEffect, useReducer } from "react";
import { fetchLineFoods } from "../apis/line_foods";
import { initialState, lineFoodsActionTypes, lineFoodsReducer } from "../reducers/lineFoods";
import { postOrder } from "../apis/orders";
import styled from "styled-components";
import { REQUEST_STATE } from "../constants";
import { Link } from "react-router-dom";
import MainLogo from "../images/logo.png";
import { CircularProgress } from "@mui/material";
import { OrderDetailItem } from "./OrderDetailItem";
import OrderButton from "./Buttons/OrderButton";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const OrderListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const OrderItemWrapper = styled.div`
  margin-bottom: 50px;
`;

const Orders = () => {
  const [state, dispach] = useReducer(lineFoodsReducer, initialState)  

  useEffect(() => {
    dispach({type: lineFoodsActionTypes.FETCHING})
    fetchLineFoods()
      .then((data) =>
        dispach({
          type: lineFoodsActionTypes.FETCH_SUCCESS,
          payload: {
            lineFoodsSummary: data
          }
        })
      )
      .catch((e) => console.error(e));
  }, []);

  const postLineFoods = () => {
    dispach({type: lineFoodsActionTypes.POSTING})
    postOrder({
      line_food_ids: state.lineFoodsSummary.line_food_ids,
    }).then(() => {
      dispach({type: lineFoodsActionTypes.POST_SUCCESS})
      window.location.reload();
    })
  }

  const orderBUttonLabel = () => {
    switch (state.postState) {
      case REQUEST_STATE.LOADING:
        return '注文中...'
      case REQUEST_STATE.OK:
        return '注文が完了しました'
      default:
        return '注文を確定する' 
    };
  }

  return (
    <Fragment>
      <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
      </HeaderWrapper>
      <OrderListWrapper>
        <div>
          <OrderItemWrapper>
            {
              state.fetchState === REQUEST_STATE.LOADING 
              ?
                <CircularProgress />
              :
              state.lineFoodsSummary &&
                <OrderDetailItem
                  restaurantFee={state.lineFoodsSummary.restaurant.fee}
                  restaurantName={state.lineFoodsSummary.restaurant.name}
                  restaurantId={state.lineFoodsSummary.restaurant.id}
                  timeRequired={state.lineFoodsSummary.restaurant.time_required}
                  foodCount={state.lineFoodsSummary.count}
                  price={state.lineFoodsSummary.amount}
                />
            }
          </OrderItemWrapper>

          <div>
            {
              state.fetchState === REQUEST_STATE.OK && state.lineFoodsSummary && 
                <OrderButton
                  onClick={() => postLineFoods()}
                  disabled={state.postState === REQUEST_STATE.LOADING || state.postState === REQUEST_STATE.OK}
                >
                  {orderBUttonLabel()}
                </OrderButton>
            }
            {
              state.fetchState === REQUEST_STATE.OK && !(state.lineFoodsSummary) &&
              <p>注文予定の商品はありません</p>
            }
          </div>
        </div>
      </OrderListWrapper>
    </Fragment>
  )
}

export default Orders