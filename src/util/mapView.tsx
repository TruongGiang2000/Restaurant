import React from 'react';
export const getScreenByList = (
  Navigator: any,
  list: any[],
  componentDefault?: any,
  initialParams?: any,
) => {
  return list.map((it, index) => {
    return (
      <Navigator.Screen
        initialParams={{data: it?.data} || initialParams}
        key={it.key + index}
        name={it.key}
        component={componentDefault}
      />
    );
  });
};
