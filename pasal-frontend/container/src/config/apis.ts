export const BASE_URI = 'http://pasal.dev'
export const API_PRIFIX = 'api';
export const REQUEST_BASE_URI = `${BASE_URI}/${API_PRIFIX}`;

// /api/products/v1/upload

export const APIS = { 
    product: {
        upload: `${REQUEST_BASE_URI}/products/v1/upload`,
        new: `${REQUEST_BASE_URI}/products/v1`, 
        
    }, 
    user: {
        checkEmail: `${REQUEST_BASE_URI}/users/team/check-email`
    }
}