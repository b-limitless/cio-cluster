// import React, {useEffect} from 'react';
// import request

// export default function useSubmitForm() {
//     useEffect(() => {
//         const submitFormToServer = async () => {
//           try {
//             const response = await request({
//               url: APIS.auth.signup,
//               method: 'post',
//               body: {...form, role:'admin', permissions: ['all']}
//             });
        
//             const { verificationCode, user } = response; 
//             dispatch({ type: 'USER_REGISTRATION_SUCCESS' });
//             history.push('/auth/verify');
    
//           } catch (err: any) {
//             const { response: { data: { errors } } } = err;
//             errors.forEach((error: any, i: number) => {
//               dispatch({ type: 'FORM_ERROR', payload: { formHasError: true, name: error.field, value: error.message } })
//               dispatch({ type: 'FORM_SUBMITTED', payload: false });
//               dispatch({ type: 'SUBMITTING', payload: false });
//             });
//             console.log('err', errors);
//           }
    
    
//         }
    
//         if(formSubmitted && !formHasError) {
//           submitFormToServer();
//         }
        
//       }, [formHasError, formSubmitted]);
// }
