import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { FC } from "react";
import { Header } from "../layout/header";
import { ChatList } from "./chat-list";
const drawerWidth = 240;

export const ChatDrawer: FC = ({ children }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Header />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <ChatList />
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}