import {useEffect, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {io} from 'socket.io-client';
import {systemAction} from '../redux/system/actions';
export const useSocket = () => {
  const token = useSelector((state) => state?.auth?.token);
  const dispatch = useDispatch();
  const socket = useMemo(() => {
    if (!token) {
      return;
    }
    const socketCache = io('https://restaurantteam.herokuapp.com', {
      query: {
        token,
      },
      autoConnect: true,
    });
    return socketCache;
  }, [token]);
  useEffect(() => {
    if (!token) {
      return;
    }
    socket.connect();
    socket.on('connect', () => {
      console.log('connect');
      dispatch(systemAction.setConnectSocket(true));
    });
    socket.on('disconnect', () => {
      console.log('disconnect');
      dispatch(systemAction.setConnectSocket(false));
    });
    socket.on('S-L-OrderById', (data) => console.log('OrderById', data));
    return () => {};
  }, [token]);
  return socket;
};
