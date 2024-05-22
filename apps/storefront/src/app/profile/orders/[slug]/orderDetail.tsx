import { Box, Typography, List, ListItem } from "@mui/material";
import { Fragment } from "react";

export default function OrderDetail() {
    const products = [
        {
            name: 'PC system All in One APPLE iMac (2023)',
            description: 'Apple M3, 24" Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, macOS Sonoma, Blue, Keyboard layout INT',
            quantity: 1,
            price: '$1,499',
            id: 'BJ8364850',
        },
        {
            name: 'Restored Apple Watch Series 8 (GPS)',
            description: '41mm Midnight Aluminum Case with Midnight Sport Band',
            quantity: 2,
            price: '$598',
            id: 'BJ8364851',
        },
        {
            name: 'Sony Playstation 5 Digital Edition Console',
            description: 'with Extra Blue Controller, White PULSE 3D Headset and Surge Dual Controller',
            quantity: 1,
            price: '$799',
            id: 'BJ8364852',
        },
        {
            name: 'Xbox Series X Diablo IV Bundle',
            description: '2 Xbox Wireless Controller Carbon Black + Controller Charger',
            quantity: 1,
            price: '$699',
            id: 'BJ8364853',
        },
    ];
    return (
        <Fragment>
            <Typography variant="h6" className="mb-4">
                Products Ordered
            </Typography>
            <List>
                {products.map((product, index) => (
                    <Box key={index} className="border-solid border-b border-gray-300">
                    <ListItem  className=" mb-2 rounded p-4 flex flex-col items-start">
                        <Typography variant="body1" className="font-bold">{product.name}</Typography>
                        <Typography variant="body2" className="text-gray-400">{product.description}</Typography>
                        <Typography variant="body2" className="mt-2">Product ID: {product.id}</Typography>
                        <Box className="mt-2 flex justify-between w-full">
                            <Typography variant="body1" className="font-bold">x{product.quantity}</Typography>
                            <Typography variant="body1" className="font-bold">{product.price}</Typography>
                        </Box>
                    </ListItem>
                    </Box>
                ))}
            </List>
        </Fragment>

    )
}