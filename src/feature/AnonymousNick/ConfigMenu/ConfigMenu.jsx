import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';

import ConfigTextFieldItem from 'component/ConfigTextFieldItem';

import { MODULE_ID, MODULE_NAME } from '../ModuleInfo';
import { setExtraPrefix, setPrefixList, setSuffixList } from '../slice';

const ConfigMenu = React.forwardRef(
  // eslint-disable-next-line prefer-arrow-callback
  function ConfigMenu(_props, ref) {
    const {
      config: { prefixList, suffixList, extraPrefix },
    } = useSelector((state) => state[MODULE_ID]);
    const dispatch = useDispatch();

    const onSavePrefixList = useCallback(
      (value) => {
        const updatedList = value.split('\n').filter((v) => v !== '');
        dispatch(setPrefixList(updatedList));
        return false;
      },
      [dispatch],
    );

    const onSaveSuffixList = useCallback(
      (value) => {
        const updatedList = value.split('\n').filter((v) => v !== '');
        dispatch(setSuffixList(updatedList));
        return false;
      },
      [dispatch],
    );

    const onChangeExtraPrefix = useCallback(
      (e) => {
        dispatch(setExtraPrefix(e.target.value));
      },
      [dispatch],
    );

    return (
      <Box ref={ref}>
        <Typography variant="subtitle1">{MODULE_NAME}</Typography>
        <Paper>
          <List>
            <ConfigTextFieldItem
              divider
              headerText="익명화 앞단어"
              initialValue={prefixList.join('\n')}
              onSave={onSavePrefixList}
            />
            <ConfigTextFieldItem
              divider
              headerText="익명화 뒷단어"
              initialValue={suffixList.join('\n')}
              onSave={onSaveSuffixList}
            />
            <ListItem>
              <ListItemText
                primary="익명화 보조단어"
                secondary="단어 조합보다 댓글이 더 많을 경우 사용됩니다."
              />
            </ListItem>
            <ListItem>
              <TextField
                variant="outlined"
                fullWidth
                value={extraPrefix}
                onChange={onChangeExtraPrefix}
              />
            </ListItem>
          </List>
        </Paper>
      </Box>
    );
  },
);

ConfigMenu.displayName = `ConfigMenu(${MODULE_ID})`;
export default ConfigMenu;
