import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@material-ui/core';

import { KeyIcon } from 'component';

import { setInteraction } from '../slice';
import { MODULE_ID, MODULE_NAME } from '../ModuleInfo';

const ConfigMenu = React.forwardRef(
  // eslint-disable-next-line prefer-arrow-callback
  function ConfigMenu(_props, ref) {
    const {
      config: { interactionType },
    } = useSelector((state) => state[MODULE_ID]);
    const dispatch = useDispatch();

    const handleInteraction = useCallback(
      (e) => {
        dispatch(setInteraction(e.target.value));
      },
      [dispatch],
    );

    return (
      <Box ref={ref}>
        <Typography variant="subtitle1">{MODULE_NAME}</Typography>
        <Paper>
          <List>
            <ListItem>
              <ListItemText>메뉴 호출 방식</ListItemText>
              <ListItemSecondaryAction>
                <Select
                  variant="outlined"
                  value={interactionType}
                  onChange={handleInteraction}
                >
                  <MenuItem value="r">R Click</MenuItem>
                  <MenuItem value="sr">Shift + R Click</MenuItem>
                </Select>
              </ListItemSecondaryAction>
            </ListItem>
            <Box clone mx={2} mb={2}>
              <Paper variant="outlined">
                <List disablePadding>
                  <ListItem divider>
                    <ListItemText primary="리프레셔 메뉴" />
                    <ListItemSecondaryAction>
                      <Box display="flex" alignItems="center">
                        {interactionType !== 'r' && (
                          <>
                            <KeyIcon title="Shift" />
                            +
                            <KeyIcon title="R Click" />
                          </>
                        )}
                        {interactionType === 'r' && <KeyIcon title="R Click" />}
                      </Box>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="브라우저 메뉴" />
                    <ListItemSecondaryAction>
                      <Box display="flex" alignItems="center">
                        {interactionType === 'r' && (
                          <>
                            <KeyIcon title="Shift" />
                            +
                            <KeyIcon title="R Click" />
                          </>
                        )}
                        {interactionType !== 'r' && <KeyIcon title="R Click" />}
                      </Box>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Paper>
            </Box>
          </List>
        </Paper>
      </Box>
    );
  },
);

ConfigMenu.displayName = `ConfigMenu(${MODULE_ID})`;
export default ConfigMenu;