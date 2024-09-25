export const restaurantsIndex = `${import.meta.env.VITE_API_URL}/restaurants`
export const foodsIndex = ( restaurantsId ) => `${import.meta.env.VITE_API_URL}/restaurants/${ restaurantsId }/foods`
export const lineFoods = `${import.meta.env.VITE_API_URL}/line_foods`;
export const lineFoodsReplace = `${import.meta.env.VITE_API_URL}/line_foods/replace`;
export const orders = `${import.meta.env.VITE_API_URL}/orders`;