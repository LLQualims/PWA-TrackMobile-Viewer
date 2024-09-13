import React, { useEffect } from 'react';
import { Global } from '@emotion/react';
import { styled} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

const drawerBleeding = 86;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: grey[100],
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.background.default,
  }),
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: 'absolute',
  top: 10,
  left: 'calc(50% - 15px)',
  ...theme.applyStyles('dark', {
    backgroundColor: grey[900],
  }),
}));

const StyledBox = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.EQM.fade,
    ...theme.applyStyles('dark', {
      backgroundColor: grey[700],
    }),
  }));



function SwipeableEdgeDrawer(props) {

  const { window, ouvre = true } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    setOpen(ouvre);
  }, [ouvre]);

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(40% - ${drawerBleeding}px)`,
            overflow: 'visible', backgroundColor: '#eaf2e9'
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
         <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 4, fontSize: "1.2rem" }}>Autres</Typography>
          </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

export default SwipeableEdgeDrawer;