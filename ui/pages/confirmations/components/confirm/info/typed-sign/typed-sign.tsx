import React from 'react';
import { useSelector } from 'react-redux';
import { isValidAddress } from 'ethereumjs-util';

import {
  ConfirmInfoRow,
  ConfirmInfoRowAddress,
  ConfirmInfoRowUrl,
} from '../../../../../../components/app/confirm/info/row';
import { useI18nContext } from '../../../../../../hooks/useI18nContext';
import { currentConfirmationSelector } from '../../../../../../selectors';
import { Box } from '../../../../../../components/component-library';
import {
  BackgroundColor,
  BorderRadius,
} from '../../../../../../helpers/constants/design-system';
import { SignatureRequestType } from '../../../../types/confirm';
import { parseTypedDataMessage } from '../../../../utils';
import { ConfirmInfoRowTypedSignData } from '../../row/typed-sign-data/typedSignData';

const TypedSignInfo: React.FC = () => {
  const t = useI18nContext();
  const currentConfirmation = useSelector(
    currentConfirmationSelector,
  ) as SignatureRequestType;

  if (!currentConfirmation?.msgParams) {
    return null;
  }

  const { domain } = parseTypedDataMessage(
    currentConfirmation.msgParams.data as string,
  );

  return (
    <>
      <Box
        backgroundColor={BackgroundColor.backgroundDefault}
        borderRadius={BorderRadius.MD}
        marginBottom={4}
        padding={0}
      >
        <Box padding={2}>
          <ConfirmInfoRow
            label={t('requestFrom')}
            tooltip={t('requestFromInfo')}
          >
            <ConfirmInfoRowUrl url={currentConfirmation.msgParams.origin} />
          </ConfirmInfoRow>
        </Box>
        {isValidAddress(domain.verifyingContract) && (
          <Box padding={2}>
            <ConfirmInfoRow label={t('interactingWith')}>
              <ConfirmInfoRowAddress address={domain.verifyingContract} />
            </ConfirmInfoRow>
          </Box>
        )}
      </Box>
      <Box
        backgroundColor={BackgroundColor.backgroundDefault}
        borderRadius={BorderRadius.MD}
        padding={2}
        marginBottom={4}
      >
        <ConfirmInfoRow label={t('message')}>
          <ConfirmInfoRowTypedSignData
            data={currentConfirmation.msgParams?.data as string}
          />
        </ConfirmInfoRow>
      </Box>
    </>
  );
};

export default TypedSignInfo;
