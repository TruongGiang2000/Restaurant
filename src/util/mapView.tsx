import React from 'react';
export const getScreenByList = (
  Navigator: any,
  list: any[],
  componentDefault?: any,
  initialParams?: any,
) => {
  return list.map((it, index) => {
    const nameTab = it?.menuName || it?.category?.categoryName;
    return (
      <Navigator.Screen
        initialParams={
          {data: it?.foodItems, ...initialParams} ||
          initialParams
        }
        key={it.menuCode + index}
        name={nameTab}
        component={componentDefault}

      />
    );
  });
};
