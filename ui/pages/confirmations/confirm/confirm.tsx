import React from 'react';

import { AlertActionHandlerProvider } from '../../../components/app/alert-system/contexts/alertActionHandler';
import { BlockaidLoadingIndicator } from '../components/confirm/blockaid-loading-indicator';
import ScrollToBottom from '../components/confirm/scroll-to-bottom';
import { Footer } from '../components/confirm/footer';
import { Header } from '../components/confirm/header';
import { Info } from '../components/confirm/info';
///: BEGIN:ONLY_INCLUDE_IF(build-mmi)
import { MMISignatureMismatchBanner } from '../../../components/app/mmi-signature-mismatch-banner';
///: END:ONLY_INCLUDE_IF
import { Nav } from '../components/confirm/nav';
import { Title } from '../components/confirm/title';
import EditGasFeePopover from '../components/edit-gas-fee-popover';
import { NetworkChangeToast } from '../components/confirm/network-change-toast';
import setCurrentConfirmation from '../hooks/setCurrentConfirmation';
import syncConfirmPath from '../hooks/syncConfirmPath';
import { LedgerInfo } from '../components/confirm/ledger-info';
import setConfirmationAlerts from '../hooks/setConfirmationAlerts';
import useConfirmationAlertActions from '../hooks/useConfirmationAlertActions';

const Confirm = () => {
  setCurrentConfirmation();
  syncConfirmPath();
  setConfirmationAlerts();
  const processAction = useConfirmationAlertActions();

  return (
    <TransactionModalContextProvider>
      {/* This context should be removed once we implement the new edit gas fees popovers */}
      <GasFeeContextProvider transaction={currentConfirmation}>
        <EIP1559TransactionGasModal />
        <ConfirmAlerts>
          <Page className="confirm_wrapper">
            <Nav />
            <Header />
            <ScrollToBottom>
              {
                ///: BEGIN:ONLY_INCLUDE_IF(build-mmi)
                <MMISignatureMismatchBanner />
                ///: END:ONLY_INCLUDE_IF
              }
              <BlockaidLoadingIndicator />
              <LedgerInfo />
              <Title />
              <Info />
              <PluggableSection />
            </ScrollToBottom>
            <Footer />
            <NetworkChangeToast />
          </Page>
        </ConfirmAlerts>
      </GasFeeContextProvider>
    </TransactionModalContextProvider>
  );
};

export default Confirm;
