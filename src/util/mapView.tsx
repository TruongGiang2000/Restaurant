import React from 'react';
export const getScreenByList = (
  Navigator: any,
  list: any[],
  componentDefault?: any,
  initialParams?: any,
) => {
  return list.map((it, index) => {
    console.log('it', it.menuName);
    return (
      <Navigator.Screen
        initialParams={{data: it?.foodItems} || initialParams}
        key={it.menuCode + index}
        name={it.menuName}
        component={componentDefault}
      />
    );
  });
};
