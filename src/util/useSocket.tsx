import {useEffect, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {io} from 'socket.io-client';
import {systemAction} from '../redux/system/actions';
export let socketIo = io('https://restaurantteam.herokuapp.com');
export const useSocket = () => {
  const token = useSelector((state: any) => state?.auth?.token);
  const dispatch = useDispatch();
  const socket = useMemo(() => {
    if (!token) {
      return;
    }
    socketIo = io('https://restaurantteam.herokuapp.com', {
      query: {
        token,
      },
      autoConnect: true,
    });
    return socketIo;
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
    socketIo.on('S-L-OrderById', (data) => {
      console.log('OrderById', data);
      dispatch(systemAction.updateOrderTable(data?.data?.data));
    });
    return () => {};
  }, [token]);
  return socket;
};
