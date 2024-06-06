
import { Book } from "../utils/interfaces/book";
import { Card, CardActionArea, CardMedia, Typography, Rating, Button, Alert, Stack } from "@mui/material";
import { formatVND } from "../utils/formatCurrency";
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import Link from "next/link";
import { updateCart } from "../utils/api/graphQL/query";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import ToastSuccess from "./toast/toastSuccess";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { useLoading } from "../utils/providers/loading";
import { useOrder } from "../utils/providers/order";
interface Props {
  product: Book
}
export default function CardItem({ product }: Props) {
  const { push } = useRouter()
  const [open, setOpen] = React.useState(false);
  const [mess, setMess] = React.useState('');
  const { setLoading }: any = useLoading()
  const {updateCart} = useOrder()

  const debouncedUpdate = useDebouncedCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert('Please sign in!');
        push('/auth/login');
        return;
      }
      const res = await updateCart(
        '1',
         product?.id,
         false
      )
      setMess('Product added successfully');
      setOpen(true);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, 500);
  const updateCartHandler = async () => {
    setLoading(true);
    await debouncedUpdate();
  };
  return (
    <div className="col-lg-4 col-sm-4">
      <ToastSuccess message={mess} isOpen={open} setIsOpen={setOpen} />
      <Card sx={{ maxWidth: 300 }}>
        <Link href={`/products/${product?.id}`}>
          <CardActionArea>
            <CardMedia
              component="img"
              sx={{ height: 250 }}
              image={product?.thumbnail}
              alt="green iguana"
            />
            <div className="px-4 mt-1">
              <Typography fontSize={16} gutterBottom variant="h5" component="div">
                {product?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product?.author?.name}
              </Typography>
              <Rating name="read-only" size="small" defaultValue={product?.rating} precision={0.5} readOnly />
            </div>
          </CardActionArea>
        </Link>
        <div className="flex justify-between items-center pl-4 pb-1">
          <Typography>
            {formatVND(product?.price)}
          </Typography>
          <Button onClick={updateCartHandler}>
            <AddShoppingCartOutlinedIcon />
          </Button>
        </div>
      </Card>
    </div>

  );
}
