import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';

import { setContextSnack } from './slice';
import Info from './FeatureInfo';

export default function ContextSnack() {
  const dispatch = useDispatch();
  const { snack, snackTime } = useSelector((state) => state[Info.ID]);

  const handleSnackClose = useCallback(() => {
    dispatch(setContextSnack(''));
  }, [dispatch]);

  return (
    <Snackbar
      open={!!snack}
      autoHideDuration={snackTime}
      onClose={handleSnackClose}
      message={snack}
    />
  );
}
