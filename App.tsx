import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { Fragment, useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Routes } from './src/routes/routes';
import { HOME } from './src/constants/Textkeys';


export const navigationRef = React.createRef<any>();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function reset(object: any) {
  navigationRef.current?.reset(object);
}

export default function App() {

  return (
     <Fragment>
        <SafeAreaProvider>
              {/* <AutocompleteDropdownContextProvider> */}
                <Routes initialRoute={HOME} />
                {/*{openDialog && (
                //   <BlurView
                //     style={StyleSheet.absoluteFill}
                //     blurType="dark"
                //     blurAmount={8}
                //     reducedTransparencyFallbackColor={'#0D0D0DB2'}
                //   />
                // )} 
              {/* </AutocompleteDropdownContextProvider> */}
        </SafeAreaProvider>
    </Fragment>
  )
}

const styles = StyleSheet.create({})