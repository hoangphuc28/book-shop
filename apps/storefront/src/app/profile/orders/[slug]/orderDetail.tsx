import { Box, Typography, List, ListItem } from "@mui/material";
import { Order } from "../../../../utils/interfaces/order";
import { Fragment } from "react";
import { formatVND } from "../../../../utils/formatCurrency";
import { truncateParagraph } from "../../../../utils/truncate";

interface Props {
  orderDetail: Order
}
export default function OrderDetail({orderDetail}: Props) {

    return (
        <Fragment>
            <Typography variant="h6" className="mb-4">
                Products Ordered
            </Typography>
            <List>
                {orderDetail?.orderItems.map((item, index) => (
                    <Box key={index} className="border-solid border-b border-gray-300">
                    <ListItem  className=" mb-2 rounded p-4 flex flex-col items-start">
                        <Typography variant="body1" className="font-bold">{item.book?.title}</Typography>
                        <Typography variant="body2" className="text-gray-400">{truncateParagraph(item.book.description, 200)}</Typography>
                        {/* <Typography variant="body2" className="mt-2">Product ID: {item.id}</Typography> */}
                        <Box className="mt-2 flex justify-between w-full">
                            <Typography variant="body1" className="font-bold">x{item.quantity}</Typography>
                            <Typography variant="body1" className="font-bold">{formatVND(item?.extendPrice?.toString())}</Typography>
                        </Box>
                    </ListItem>
                    </Box>
                ))}
            </List>
        </Fragment>

    )
}
