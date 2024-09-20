import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {useRegisterMutation} from '../../store';
import {setUserEmail} from '../../store/slices/authSlice';

declare interface useData {
  email: string;
  password: string;
  name: string;
}

type RouteName = {
  routeName: unknown;
};

export const useSignUp = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [register, registerResult] = useRegisterMutation();

  useEffect(() => {
    if (registerResult.isSuccess) {
      navigation.navigate('verification');
      dispatch(setUserEmail(registerResult.data?.email));
    }
  }, [registerResult]);

  const onSubmit = async (userData: useData) => {
    console.log('userata', userData);
    try {
      const res = await register(userData);
    } catch (error: any) {
      console.log(error);
    }
  };

  return {
    onSubmit,
    dispatch,
    navigation,
    register,
    registerResult,
  };
};
