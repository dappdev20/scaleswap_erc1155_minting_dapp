
import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core'
import { makeStyles } from '@material-ui/core/styles';
import { useEagerConnect, useInactiveListener } from 'utils/hooks.js'
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/core/styles';

import { AppContext } from 'contexts';

import theme from 'styles/theme';
import BullCard from 'components/BullCards/BullCard';
import Footer from 'components/Footer/Footer';
import GetAlert from 'components/GetsAlert/GetAlert';
import NavigationBar from 'components/NavigationBar/NavigationBar';
import NftPass from 'components/NftPass/NftPass';

import Notifications from 'components/Notifications';

const useStyles = makeStyles(() => ({
  primaryTextColor: {
    color: '#fff'
  }
}));

const App = () => {
  
  const classes = useStyles();
  const context = useWeb3React();
  const { connector, library, chainId, account, deactivate, active } = context;
  const [activatingConnector, setActivatingConnector] = useState();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager || !!activatingConnector)

  const [loadingInfo, setLoadingInfo] = useState(false);

  return (
    <AppContext.Provider
      value={{
        loadingInfo,
        library,
        active,
        setLoadingInfo,
        account,
        chainId,
        deactivate
      }}>
        <ThemeProvider theme={theme}>
        <SnackbarProvider
          classes={{
            variantSuccess: classes.primaryTextColor,
            variantError: classes.primaryTextColor,
            variantWarning: classes.primaryTextColor,
            variantInfo: classes.primaryTextColor
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          maxSnack={3}>
            <Notifications notifications={''} notificationType={'success'} />
            <NavigationBar context={context}></NavigationBar>
            <NftPass></NftPass>
            <BullCard context={context}></BullCard>
            
            <GetAlert></GetAlert>
            <Footer></Footer>
        </SnackbarProvider>
        </ThemeProvider>
    </AppContext.Provider>
  )
};

export default App;