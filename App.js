import Main from "./src/Main"
import {theme} from "./src/themes"
import React from 'react';
import { PaperProvider} from 'react-native-paper';
const App = () => {
  return (
      <PaperProvider theme={theme}>
       <Main/>
      </PaperProvider>
  )
}

export default App;