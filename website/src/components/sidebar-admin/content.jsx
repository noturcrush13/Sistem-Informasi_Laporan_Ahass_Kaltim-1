import React from 'react';
import {Nav, NavItem, Navbar, NavDropdown, MenuItem, Glyphicon} from 'react-bootstrap';
import WidgetsIcon from '@mui/icons-material/Widgets';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import BarChartIcon from '@mui/icons-material/BarChart';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from '@mui/material/styles';
import {
  Snackbar,
  Alert,
  Box,
  Divider,
  Drawer,
  List,
  Toolbar,
  ListItem,
  Typography,
  Avatar,
  Skeleton,
  Container,
  ListItemButton,
  ListItemIcon,
  useMediaQuery
} from '@mui/material';
import { useState, useEffect } from 'react';
import AstraLogo from '../../assets/img/Logo-Astra.png';

function SidebarAdmin() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const listMenu = [
    {
      name: 'Dashboard',
      link: '/dashboard',
      icon: <WidgetsIcon sx={{ color: '8B8C91' }} />,
      iconActive: <WidgetsIcon />,
    },
    {
      name: 'Laporan',
      link: '/laporan',
      icon: <InsertDriveFileIcon />,
      subMenu: [
        {
          name: 'Buat Laporan',
          link: '/laporan/buat-laporan',
        },
        {
          name: 'Laporan Harian',
          link: '/laporan/laporan-harian',
        },
        {
          name: 'Laporan Bulanan',
          link: '/laporan/laporan-bulanan',
        },
        {
          name: 'Laporan Tahunan',
          link: '/laporan/laporan-tahunan',
        },
      ],
    },
    {
      name: 'Rangking',
      link: '/rangking',
      icon: <BarChartIcon />,
      subMenu: [
        {
          name: 'Rangking Bulanan',
          link: '/rangking/rangking-bulanan',
        },
        {
          name: 'Rangking Tahunan',
          link: '/rangking/rangking-tahunan',
        },
      ],
    },
    {
      name: 'Dealer',
      link: '/dealer',
      icon: <BusinessIcon />,
      subMenu: [
        {
          name: 'Tambah Dealer',
          link: '/dealer/tambah-dealer',
        },
        {
          name: 'Daftar Dealer',
          link: '/dealer/daftar-dealer',
        },
      ],
    },
    {
      name: 'User',
      link: '/user',
      icon: <PeopleIcon />,
      subMenu: [
        {
          name: 'Tambah User',
          link: '/user/tambah-user',
        },
        {
          name: 'Daftar User',
          link: '/user/daftar-user',
        },
      ],
    },
    {
      name: 'Admin',
      link: '/admin',
      icon: <ManageAccountsIcon />,
      subMenu: [
        {
          name: 'Tambah Admin',
          link: '/admin/tambah-admin',
        },
        {
          name: 'Daftar Admin',
          link: '/admin/daftar-admin',
        },
      ],
    },
    {
      name: 'Logout',
      link: '/login',
      icon: <LogoutIcon />,
    },
  ];

  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
        <Drawer
            variant="permanent"
            maxWidth={ isSmallScreen ? 'sm' : 'xl' }
            sx={{
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', backgroundColor:"#820000", color:"white" },
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                    py: [5],
                    mt: [3],
                    ml: [3],
                }}
            >   
                <Avatar alt="Astra Dashboard" src={AstraLogo} sx={{ width: 50, height: 50}} />
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, marginRight: 1, color:"white" }}
                >
                    Astra Motor
                </Typography>
            </Toolbar>
            <Divider />
            <List sx={{marginLeft:3}}>
                {listMenu.map((item, index) => (
                    <ListItem key = {index} disablePadding>
                        {item.subMenu ? (
                            <ListItemButton onClick={handleClick}>
                                <ListItemIcon sx={{color:"white"}}>{item.icon}</ListItemIcon>
                                <Typography variant="body2" noWrap component="div">
                                    {item.name}
                                </Typography>
                            </ListItemButton>
                        ) : (
                            <ListItemButton>
                                <ListItemIcon sx={{color:"white"}}>{item.icon}</ListItemIcon>
                                <Typography variant="body2" noWrap component="div">
                                    {item.name}
                                </Typography>
                            </ListItemButton>
                        )}
                    </ListItem>
                ))}
            </List>
        </Drawer>
    </div>
  )
}

export default SidebarAdmin;
