import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from 'devextreme-react/tabs';
import PasswordForm from '../password-form';

const PasswordDetails = ({ onSubmitHandler, newpassword, isNew }) => {
  // const [selectedIndex, setSelectedIndex] = useState(0);

  // const tabs = [
  //   {
  //     id: 0,
  //     text: 'Password',
  //     icon: 'key',
  //     content: (
  //       <PasswordForm
  //         newpassword={newpassword}
  //         onSubmitHandler={onSubmitHandler}
  //       />
  //     ),
  //   },
  //   {
  //     id: 1,
  //     text: 'Auth',
  //     icon: 'comment',
  //     content: 'Comment tab content',
  //   },
  // ];

  // const onTabsSelectionChanged = (args) => {
  //   if (args.name === 'selectedItem') {
  //     if (args.value) {
  //       setSelectedIndex(args.value.id);
  //     }
  //   }
  // };

  return (
    // <>
    //   <Tabs
    //     dataSource={tabs}
    //     selectedIndex={selectedIndex}
    //     onOptionChanged={onTabsSelectionChanged}
    //   />
    //   <div>{tabs[selectedIndex].content}</div>
    // </>
    <PasswordForm
      newpassword={newpassword}
      onSubmitHandler={onSubmitHandler}
      isNew
    />
  );
};

export default PasswordDetails;
