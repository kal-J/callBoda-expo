import React, { useState, createContext } from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [app_state, setAppState] = useState({
    stages: [
      {
        id: 1,
        name: 'Lira University Trading Center',
        bodas: [
          {
            id: 1,
            name: 'Morris',
            tel: '0787113924',
            rating: 5,
            profile_picture_url:
              'https://images.unsplash.com/photo-1565884280295-98eb83e41c65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
          },
          {
            id: 2,
            name: 'Okello',
            tel: '0787113924',
            rating: 5,
            profile_picture_url:
              'https://images.unsplash.com/photo-1572316787289-4d87404eea4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
          },
        ],
      },
      {
        id: 2,
        name: 'st. Peters Hostel',
        bodas: [
          {
            id: 1,
            name: 'Morris',
            tel: '0787113924',
            rating: 5,
            profile_picture_url:
              'https://images.unsplash.com/photo-1565884280295-98eb83e41c65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
          },
          {
            id: 2,
            name: 'Okello',
            tel: '0787113924',
            rating: 5,
            profile_picture_url:
              'https://images.unsplash.com/photo-1572316787289-4d87404eea4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
          },
        ],
      },
      {
        id: 3,
        name: 'Lira University Health Faculty',
        bodas: [
          {
            id: 1,
            name: 'Morris',
            tel: '0787113924',
            rating: 5,
            profile_picture_url:
              'https://images.unsplash.com/photo-1565884280295-98eb83e41c65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
          },
          {
            id: 2,
            name: 'Okello',
            tel: '0787113924',
            rating: 5,
            profile_picture_url:
              'https://images.unsplash.com/photo-1572316787289-4d87404eea4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
          },
        ],
      },
      {
        id: 4,
        name: 'Okullu Pub, Barapwo Lira',
        bodas: [
          {
            id: 1,
            name: 'Morris',
            tel: '0787113924',
            rating: 5,
            profile_picture_url:
              'https://images.unsplash.com/photo-1565884280295-98eb83e41c65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
          },
          {
            id: 2,
            name: 'Okello',
            tel: '0787113924',
            rating: 5,
            profile_picture_url:
              'https://images.unsplash.com/photo-1572316787289-4d87404eea4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
          },
        ],
      },
    ],
  });
  return (
    <StoreContext.Provider value={{ app_state, setAppState }}>
      {children}
    </StoreContext.Provider>
  );
};
