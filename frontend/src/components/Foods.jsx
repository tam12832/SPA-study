import { Fragment, useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { fetchfoods } from "../apis/foods";
import { foodsActionTypes, foodsReducer } from "../reducers/foods";
import { initialState as foodsInitialState } from "../reducers/foods";
import { HTTP_STATUS_CODE, REQUEST_STATE } from "../constants";
import { styled } from "styled-components";
import { COLORS } from "../style_constants";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import MainLogo from "../images/logo.png";
import FoodImage from "../images/food-image.jpg";
import { FoodWrapper } from "./FoodsWrapper";
import { Skeleton } from "@mui/material";
import { FoodOrderDialog } from "./FoodOrderDialog";
import { postLineFoods, replaceLineFoods } from "../apis/line_foods";
import NewOrderConfirmDialog from "./NewOrderConfirmDialog";


const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;       
`;

const BagIconWrapper = styled.div`
  padding-top: 24px
`

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`

const MainLogoImage = styled.img`
  height: 90px;
`

const FoodList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`

const ItemWrapper = styled.div`
  margin: 16px;
`

const Foods = () => {
  const { restaurantsId } = useParams();
  const navigate = useNavigate()
  const [foodsState, dispach] = useReducer(foodsReducer, foodsInitialState)
  const initialState = {
    isOpenOrderDialog: false,
    selectedFood: null,
    selectedFoodCount: 1,
    isOpenNewOrderDialog: false,
    existingRestaurantName: '',
    newRestaurantName: ''
  }
  const [state, setState] = useState(initialState)

  const submitOrder = () => {
    postLineFoods({
      foodId: state.selectedFood.id,
      count: state.selectedFoodCount
    }).then(() => navigate("/orders"))
      .catch((e) => {
        if (e.response.status === HTTP_STATUS_CODE.NOT_ACCEPTABLE) {
          setState({
            ...state,
            isOpenOrderDialog: false,
            isOpenNewOrderDialog: true,
            existingRestaurantName: e.response.data.existing_restaurant,
            newRestaurantName: e.response.data.new_restaurant
          })
        } else {
          throw e;
        }
      })
  };

  const replaceOrder = () => {
    replaceLineFoods({
      foodId: state.selectedFood.id,
      count: state.selectedFoodCount
    }).then(() => navigate("/orders"))
  }

  useEffect(() => {
    dispach({ type: foodsActionTypes.FETCHING });
    fetchfoods(restaurantsId)
      .then((data) => {
        dispach({
          type: foodsActionTypes.FETCH_SUCCESS,
          payload: {
            foods: data.foods
          }
        });
      })
  }, [])

  return (
    <Fragment>
      <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo"/>
        </Link>
        <BagIconWrapper>
          <Link to="/orders">
            <ColoredBagIcon fontSize="large" />
          </Link>
        </BagIconWrapper>
      </HeaderWrapper>
      <FoodList>
        {
          foodsState.fetchState === REQUEST_STATE.LOADING
          ? 
            <Fragment>
              {
                [...Array(12).keys()].map(i =>
                  <ItemWrapper key={i}>
                    <Skeleton key={i} variant="rect" width={450} height={180}/>
                  </ItemWrapper>
                )
              }
            </Fragment>
          : 
            foodsState.foodsList.map(food => 
              <ItemWrapper key={food.id}>
                <FoodWrapper 
                  food={food} 
                  onClickFoodWrapper={
                    (food) => setState({
                      ...state,
                      isOpenOrderDialog: true, 
                      selectedFood: food,
                    })
                  } 
                  imageUrl={FoodImage}
                />
              </ItemWrapper>
            )
        }
      </FoodList>
      {
        state.isOpenNewOrderDialog && 
          <NewOrderConfirmDialog
            isOpen={state.isOpenNewOrderDialog}
            onClose={() => setState({...state, isOpenNewOrderDialog: false })}
            existingRestaurantName={state.existingRestaurantName}
            newRestaurantName={state.newRestaurantName}
            onClickSubmit={() => replaceOrder()}
          />
      }
      {
        state.isOpenOrderDialog &&
        <FoodOrderDialog
          food={state.selectedFood}
          isOpen={state.isOpenOrderDialog}
          countNumber={state.selectedFoodCount}
          onClickCountUp={() => setState({
            ...state,
            selectedFoodCount: state.selectedFoodCount + 1,
           })}
          onClickCountDown={() => setState({
            ...state,
            selectedFoodCount: state.selectedFoodCount - 1,
          })}
          onClickOrder={() => submitOrder()}
          onClose={() => setState({
            ...state,
            isOpenOrderDialog: false,
            selectedFood: null,
            selectedFoodCount: 1
          })}
        />
      }
    </Fragment>
  )
}

export default Foods